import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { languageLabel, normalizeLang, sameLanguage } from "@/lib/languages";

const CueIn = z.object({
  id: z.string().max(24),
  text: z.string().max(400),
});

export const getAiStatus = createServerFn({ method: "GET" }).handler(async () => {
  return { available: Boolean(process.env.XAI_API_KEY) };
});

export const translateCues = createServerFn({ method: "POST" })
  .validator(
    z.object({
      cues: z.array(CueIn).max(200),
      sourceLang: z.string().max(16),
      targetLang: z.string().max(16),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "AI_OFF" };
    if (data.cues.length === 0) return { ok: true as const, cues: data.cues };

    const target = normalizeLang(data.targetLang);
    const source = normalizeLang(data.sourceLang);
    if (sameLanguage(source, target)) {
      return { ok: true as const, cues: data.cues };
    }

    const batches: (typeof data.cues)[] = [];
    for (let i = 0; i < data.cues.length; i += 40) {
      batches.push(data.cues.slice(i, i + 40));
    }

    const out: { id: string; text: string }[] = [];
    for (const batch of batches) {
      const result = await translateBatch(apiKey, batch, source, target, false);
      if (!result.ok) return result;
      let mapped = applyIds(batch, result.cues);
      if (mostlyUnchanged(batch, mapped) || hasRedaction(mapped, batch)) {
        const retry = await translateBatch(apiKey, batch, source, target, true);
        if (retry.ok) mapped = applyIds(batch, retry.cues);
      }
      out.push(...mapped.map((c, i) => {
        const original = batch[i]!;
        if (isRedacted(c.text) && !isRedacted(original.text)) {
          return { id: c.id, text: original.text };
        }
        return c;
      }));
    }
    return { ok: true as const, cues: out };
  });

function applyIds(
  original: { id: string; text: string }[],
  translated: { id: string; text: string }[],
): { id: string; text: string }[] {
  const byId = new Map(translated.map((c) => [c.id, c.text]));
  return original.map((c) => ({
    id: c.id,
    text: (byId.get(c.id) ?? "").trim() || c.text,
  }));
}

function mostlyUnchanged(
  original: { text: string }[],
  translated: { text: string }[],
): boolean {
  if (!original.length) return false;
  let same = 0;
  for (let i = 0; i < original.length; i++) {
    const a = fold(original[i]?.text ?? "");
    const b = fold(translated[i]?.text ?? "");
    if (a && a === b) same += 1;
  }
  return same / original.length >= 0.7;
}

function hasRedaction(
  translated: { text: string }[],
  original: { text: string }[],
): boolean {
  return translated.some((c, i) => isRedacted(c.text) && !isRedacted(original[i]?.text ?? ""));
}

function isRedacted(s: string): boolean {
  return /[*]{2,}|#{3,}|\[\s*(?:expletive|censored|censor(?:ed)?|beep|explicit|redacted|nsfw|bleep)\s*\]|\b[a-záéíóúüñ]\*+[a-záéíóúüñ*]+\b/i.test(
    s,
  );
}

function fold(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function promptFor(
  sourceName: string,
  targetName: string,
  targetLang: string,
  strict: boolean,
): string {
  const core = `You are a professional subtitle translator working on existing recorded dialogue (films, interviews, songs, streams). Translate from ${sourceName} into ${targetName}.

Rules:
- Every output "text" MUST be in ${targetName} (${targetLang}).
- Translate what was SAID, not a cleaned version. Keep swearing, insults, sexual language, slurs, slang, dialect, filler, and intensity. Match the register (street stays street; formal stays formal).
- Never sanitize, never moralize, never replace words with asterisks, symbols, or tags like [expletive]/[censored]/[bleep].
- Do not add quotes, numbers, commentary, or content warnings.
- Preserve proper names. Keep the same ids and cue count.
- Spoken captions: aim for ~42 characters per line, up to 2–3 lines if needed. Do not drop words to make it shorter.
- JSON only: {"cues":[{"id":"c1","text":"..."}]}`;
  return strict
    ? `${core}\nThis is a retry: the previous pass left source language or redacted words. Output full uncensored ${targetName}.`
    : core;
}

async function translateBatch(
  apiKey: string,
  cues: { id: string; text: string }[],
  sourceLang: string,
  targetLang: string,
  strict: boolean,
): Promise<
  | { ok: true; cues: { id: string; text: string }[] }
  | { ok: false; error: string }
> {
  const targetName = languageLabel(targetLang, "en");
  const sourceName = languageLabel(sourceLang, "en");
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-4.5",
      temperature: strict ? 0 : 0.15,
      max_tokens: 8000,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: promptFor(sourceName, targetName, targetLang, strict),
        },
        {
          role: "user",
          content: JSON.stringify({
            instruction: `Translate these existing subtitle cues into ${targetName}. Do not censor.`,
            source_language: sourceName,
            target_language: targetName,
            cues,
          }),
        },
      ],
    }),
  });

  if (!res.ok) {
    return { ok: false, error: `xAI API error ${res.status}` };
  }

  const body = (await res.json()) as {
    choices?: { message?: { content?: string; refusal?: string } }[];
  };
  const message = body.choices?.[0]?.message;
  if (message?.refusal) return { ok: false, error: "TRANSLATE_REFUSED" };
  const raw = message?.content ?? "";
  const parsed = parseCuesJson(raw);
  if (!parsed) return { ok: false, error: "TRANSLATE_PARSE" };
  return { ok: true, cues: parsed };
}

function parseCuesJson(raw: string): { id: string; text: string }[] | null {
  const trimmed = raw
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
  try {
    const data = JSON.parse(trimmed) as unknown;
    const list = Array.isArray(data)
      ? data
      : data && typeof data === "object"
        ? ((data as { cues?: unknown; translations?: unknown }).cues ??
          (data as { translations?: unknown }).translations)
        : null;
    if (!Array.isArray(list)) return null;
    const cues: { id: string; text: string }[] = [];
    for (const item of list) {
      if (!item || typeof item !== "object") continue;
      const rec = item as { id?: unknown; text?: unknown; translation?: unknown };
      const text =
        typeof rec.text === "string"
          ? rec.text
          : typeof rec.translation === "string"
            ? rec.translation
            : null;
      if (typeof rec.id === "string" && text) {
        cues.push({ id: rec.id, text });
      }
    }
    return cues.length ? cues : null;
  } catch {
    return null;
  }
}
