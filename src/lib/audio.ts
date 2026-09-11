const TARGET_RATE = 16000;
export const MAX_DURATION_SEC = 12 * 60;
export const CHUNK_SECONDS = 45;
const OVERLAP_SECONDS = 0.35;

export function encodeWavPcm16(samples: Float32Array, sampleRate: number): Blob {
  const numChannels = 1;
  const bitsPerSample = 16;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * 2;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, dataSize, true);
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i] ?? 0));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return new Blob([buffer], { type: "audio/wav" });
}

function writeAscii(view: DataView, offset: number, text: string) {
  for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
}

export async function extractMono16k(
  file: Blob,
  signal?: AbortSignal,
): Promise<{ samples: Float32Array; duration: number }> {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const ctx = new AudioContext();
  try {
    const buf = await file.arrayBuffer();
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
    const audio = await ctx.decodeAudioData(buf);
    const duration = audio.duration;
    if (duration > MAX_DURATION_SEC) {
      throw new Error("TOO_LONG");
    }
    const samples = await resampleMono(audio, TARGET_RATE);
    return { samples, duration };
  } finally {
    void ctx.close();
  }
}

async function resampleMono(audio: AudioBuffer, rate: number): Promise<Float32Array> {
  const length = Math.max(1, Math.ceil(audio.duration * rate));
  const offline = new OfflineAudioContext(1, length, rate);
  const mixed = offline.createBuffer(1, audio.length, audio.sampleRate);
  const out = mixed.getChannelData(0);
  const channels = audio.numberOfChannels;
  for (let i = 0; i < audio.length; i++) {
    let sum = 0;
    for (let c = 0; c < channels; c++) sum += audio.getChannelData(c)[i] ?? 0;
    out[i] = sum / channels;
  }
  const src = offline.createBufferSource();
  src.buffer = mixed;
  src.connect(offline.destination);
  src.start(0);
  const rendered = await offline.startRendering();
  return rendered.getChannelData(0);
}

export type AudioChunk = {
  blob: Blob;
  offset: number;
  index: number;
  total: number;
};

export function splitWavChunks(samples: Float32Array): AudioChunk[] {
  const chunkSamples = Math.floor(CHUNK_SECONDS * TARGET_RATE);
  const overlap = Math.floor(OVERLAP_SECONDS * TARGET_RATE);
  const chunks: AudioChunk[] = [];
  let start = 0;
  let index = 0;
  while (start < samples.length) {
    const end = Math.min(samples.length, start + chunkSamples);
    const slice = samples.subarray(start, end);
    chunks.push({
      blob: encodeWavPcm16(slice, TARGET_RATE),
      offset: start / TARGET_RATE,
      index,
      total: 0,
    });
    index += 1;
    if (end >= samples.length) break;
    start = end - overlap;
  }
  return chunks.map((c) => ({ ...c, total: chunks.length }));
}
