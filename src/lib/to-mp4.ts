import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

let ffmpeg: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

async function getFfmpeg(): Promise<FFmpeg> {
  if (ffmpeg?.loaded) return ffmpeg;
  if (loadPromise) return loadPromise;
  loadPromise = (async () => {
    const instance = new FFmpeg();
    const base = `${window.location.origin}/ffmpeg`;
    await instance.load({
      coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
    });
    ffmpeg = instance;
    return instance;
  })();
  try {
    return await loadPromise;
  } catch (err) {
    loadPromise = null;
    throw err;
  }
}

function resetFfmpeg() {
  ffmpeg = null;
  loadPromise = null;
}

async function runExec(ff: FFmpeg, args: string[], ms: number): Promise<number> {
  let timedOut = false;
  const timer = window.setTimeout(() => {
    timedOut = true;
    resetFfmpeg();
  }, ms);
  try {
    return await ff.exec(args, ms);
  } finally {
    window.clearTimeout(timer);
    if (timedOut) throw new Error("MP4_TIMEOUT");
  }
}

export async function webmToMp4(
  input: Blob,
  onProgress?: (p: number) => void,
): Promise<Blob> {
  const ff = await getFfmpeg();
  onProgress?.(0.08);
  const inName = /mp4|m4v/i.test(input.type) ? "in.mp4" : "in.webm";
  await ff.writeFile(inName, await fetchFile(input));

  const onProg = ({ progress }: { progress: number }) => {
    onProgress?.(Math.min(0.95, Math.max(0.08, progress)));
  };
  ff.on("progress", onProg);

  const video = [
    "-fflags",
    "+genpts",
    "-i",
    inName,
    "-vf",
    "fps=30",
    "-c:v",
    "libx264",
    "-preset",
    "ultrafast",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
  ];

  try {
    let code = await runExec(ff, [...video, "-c:a", "aac", "-ac", "2", "out.mp4"], 45_000);
    if (code !== 0) {
      code = await runExec(ff, [...video, "-an", "out.mp4"], 45_000);
    }
    if (code !== 0) throw new Error("MP4_CONVERT");
    const data = await ff.readFile("out.mp4");
    const bytes = data instanceof Uint8Array ? new Uint8Array(data) : new Uint8Array();
    if (!bytes.byteLength) throw new Error("MP4_EMPTY");
    onProgress?.(1);
    return new Blob([bytes], { type: "video/mp4" });
  } finally {
    ff.off("progress", onProg);
    await ff.deleteFile(inName).catch(() => undefined);
    await ff.deleteFile("out.mp4").catch(() => undefined);
  }
}
