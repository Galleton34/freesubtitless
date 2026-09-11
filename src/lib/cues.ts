export type Word = {
  text: string;
  start: number;
  end: number;
};

export type Cue = {
  id: string;
  start: number;
  end: number;
  text: string;
  original?: string;
};

const MAX_CHARS = 84;
const MAX_DUR = 4.9;
const GAP = 0.55;
const MIN_DUR = 0.7;

export function wordsToCues(words: Word[]): Cue[] {
  const cleaned = words
    .map((w) => ({
      text: w.text.trim(),
      start: w.start,
      end: Math.max(w.end, w.start + 0.05),
    }))
    .filter((w) => w.text.length > 0);

  const cues: Cue[] = [];
  let current: Word[] = [];
  let n = 0;

  const flush = () => {
    if (!current.length) return;
    const start = current[0]!.start;
    const end = Math.max(current[current.length - 1]!.end, start + MIN_DUR);
    n += 1;
    cues.push({
      id: `c${n}`,
      start,
      end,
      text: current.map((w) => w.text).join(" ").replace(/\s+/g, " ").trim(),
    });
    current = [];
  };

  for (let i = 0; i < cleaned.length; i++) {
    const w = cleaned[i]!;
    const prev = current[current.length - 1];
    const gap = prev ? w.start - prev.end : 0;
    const dur = current.length ? w.end - current[0]!.start : 0;
    const chars =
      current.map((x) => x.text).join(" ").length + (current.length ? 1 : 0) + w.text.length;
    const punct = prev ? /[.!?…。！？]$/.test(prev.text) : false;

    if (current.length && (gap > GAP || dur > MAX_DUR || chars > MAX_CHARS || punct)) {
      flush();
    }
    current.push(w);
  }
  flush();
  return cues;
}

export function activeCueAt(cues: Cue[], time: number): Cue | null {
  for (const cue of cues) {
    if (time >= cue.start && time < cue.end) return cue;
  }
  return null;
}

export function wrapCaption(text: string, maxChars = 42): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  if (clean.length <= maxChars) return [clean];
  const words = clean.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  if (lines.length <= 3) return lines;
  return [lines[0]!, lines[1]!, lines.slice(2).join(" ")];
}

export function toSrt(cues: Cue[]): string {
  return cues
    .map((cue, i) => {
      return `${i + 1}\n${srtStamp(cue.start)} --> ${srtStamp(cue.end)}\n${cue.text}\n`;
    })
    .join("\n");
}

export function toVtt(cues: Cue[]): string {
  const body = cues
    .map((cue) => `${vttStamp(cue.start)} --> ${vttStamp(cue.end)}\n${cue.text}`)
    .join("\n\n");
  return `WEBVTT\n\n${body}\n`;
}

function srtStamp(seconds: number): string {
  const { h, m, s, ms } = splitTime(seconds);
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
}

function vttStamp(seconds: number): string {
  const { h, m, s, ms } = splitTime(seconds);
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms, 3)}`;
}

function splitTime(seconds: number) {
  const t = Math.max(0, seconds);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = Math.floor(t % 60);
  const ms = Math.round((t % 1) * 1000);
  return { h, m, s, ms };
}

function pad(n: number, w = 2) {
  return String(n).padStart(w, "0");
}

export function nextCueTimes(cues: Cue[], duration: number): { start: number; end: number } {
  const last = cues[cues.length - 1];
  const start = last ? Math.min(duration, last.end + 0.2) : 0;
  const end = Math.min(duration || start + 2, start + 2.4);
  return { start, end: Math.max(end, start + 0.8) };
}
