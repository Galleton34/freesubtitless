import { extractMono16k, splitWavChunks, type AudioChunk } from "@/lib/audio";
import { translateCues } from "@/lib/ai";
import { wordsToCues, type Cue, type Word } from "@/lib/cues";
import { normalizeLang, sameLanguage, sttLanguageParam } from "@/lib/languages";

export type ProcessStep = "extract" | "transcribe" | "translate";

export type ProcessProgress = {
  step: ProcessStep;
  progress: number;
  detail?: string;
};

export type ProcessResult = {
  cues: Cue[];
  detectedLang: string;
  duration: number;
  translated: boolean;
  translateError?: string;
};

type SttResponse = {
  text?: string;
  language?: string;
  duration?: number;
  words?: Record<string, unknown>[];
  error?: string;
};

export async function processVideoFile(opts: {
  file: Blob;
  sourceLang: string;
  targetLang: string;
  onProgress?: (p: ProcessProgress) => void;
  signal?: AbortSignal;
}): Promise<ProcessResult> {
  const { file, sourceLang, targetLang, onProgress, signal } = opts;
  onProgress?.({ step: "extract", progress: 0.15 });
  const { samples, duration } = await extractMono16k(file, signal);
  onProgress?.({ step: "extract", progress: 1 });

  const chunks = splitWavChunks(samples);
  onProgress?.({ step: "transcribe", progress: 0 });

  const words: Word[] = [];
  const leftover: { text: string; offset: number; duration: number }[] = [];
  let detected = normalizeLang(sourceLang === "auto" ? "und" : sourceLang);
  const langParam = sttLanguageParam(sourceLang);

  for (const chunk of chunks) {
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
    const data = await transcribeChunk(chunk, langParam, signal);
    const heard = normalizeLang(data.language ?? "");
    if (heard !== "und" && heard !== "auto") detected = heard;
    const offset = chunk.offset;
    const parsed = readWords(data.words, offset, chunk.index > 0);
    words.push(...parsed);
    if (typeof data.text === "string" && data.text.trim()) {
      leftover.push({
        text: data.text.trim(),
        offset,
        duration: data.duration ?? CHUNK_DURATION_FALLBACK,
      });
    }
    onProgress?.({
      step: "transcribe",
      progress: (chunk.index + 1) / Math.max(1, chunk.total),
      detail: data.language,
    });
  }

  if (!detected || detected === "auto") detected = "und";
  let cues = wordsToCues(words);
  if (cues.length === 0) cues = cuesFromPlain(leftover);

  const target = normalizeLang(targetLang);
  const explicitSame =
    sourceLang !== "auto" && sameLanguage(sourceLang, target);
  const shouldTranslate = cues.length > 0 && target !== "auto" && target !== "und" && !explicitSame;

  let translated = false;
  let translateError: string | undefined;

  if (shouldTranslate) {
    onProgress?.({ step: "translate", progress: 0.15 });
    const res = await translateCues({
      data: {
        cues: cues.map((c) => ({ id: c.id, text: c.text })),
        sourceLang: detected === "und" ? (sourceLang === "auto" ? "und" : sourceLang) : detected,
        targetLang: target,
      },
    });
    if (res.ok) {
      const byId = new Map(res.cues.map((c) => [c.id, c.text]));
      cues = cues.map((c) => ({
        ...c,
        original: c.text,
        text: byId.get(c.id)?.trim() || c.text,
      }));
      translated = true;
    } else {
      translateError = res.error;
    }
    onProgress?.({ step: "translate", progress: 1 });
  }

  return { cues, detectedLang: detected, duration, translated, translateError };
}

const CHUNK_DURATION_FALLBACK = 45;

function readWords(
  raw: Record<string, unknown>[] | undefined,
  offset: number,
  skipOverlap: boolean,
): Word[] {
  if (!raw?.length) return [];
  const out: Word[] = [];
  for (const w of raw) {
    const text = String(w.text ?? w.word ?? "").trim();
    if (!text) continue;
    const start = Number(w.start ?? w.start_time ?? 0) + offset;
    const end = Number(w.end ?? w.end_time ?? start) + offset;
    if (skipOverlap && start < offset + 0.18) continue;
    out.push({ text, start, end: Math.max(end, start + 0.05) });
  }
  return out;
}

function cuesFromPlain(chunks: { text: string; offset: number; duration: number }[]): Cue[] {
  const cues: Cue[] = [];
  let n = 0;
  for (const chunk of chunks) {
    const parts = chunk.text
      .split(/(?<=[.!?…])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const total = parts.reduce((sum, p) => sum + p.length, 0) || 1;
    let t = chunk.offset;
    for (const part of parts) {
      const dur = Math.max(1.2, (part.length / total) * Math.max(chunk.duration, 1.2));
      n += 1;
      cues.push({
        id: `c${n}`,
        start: t,
        end: t + dur,
        text: part,
      });
      t += dur;
    }
  }
  return cues;
}

async function transcribeChunk(
  chunk: AudioChunk,
  language: string | undefined,
  signal?: AbortSignal,
): Promise<SttResponse> {
  const form = new FormData();
  if (language) {
    form.append("language", language);
    form.append("format", "true");
  }
  form.append("offset", String(chunk.offset));
  form.append("file", chunk.blob, `chunk-${chunk.index}.wav`);
  const res = await fetch("/api/transcribe", { method: "POST", body: form, signal });
  const data = (await res.json()) as SttResponse;
  if (!res.ok) {
    throw new Error(data.error || `STT_${res.status}`);
  }
  return data;
}
