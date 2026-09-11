import { activeCueAt, type Cue } from "@/lib/cues";
import { drawCaption } from "@/lib/caption-draw";
import { ensureCaptionFont, type CaptionStyle } from "@/lib/caption-style";

export type ExportFormat = "mp4" | "webm";

function pickMime(hasAudio: boolean, preferred: ExportFormat): { mime: string; ext: string } {
  const webm = hasAudio
    ? [
        { mime: "video/webm;codecs=vp9,opus", ext: "webm" },
        { mime: "video/webm;codecs=vp8,opus", ext: "webm" },
        { mime: "video/webm", ext: "webm" },
      ]
    : [
        { mime: "video/webm;codecs=vp9", ext: "webm" },
        { mime: "video/webm;codecs=vp8", ext: "webm" },
        { mime: "video/webm", ext: "webm" },
      ];
  const mp4 = hasAudio
    ? [
        { mime: "video/mp4;codecs=avc1.42E01E,mp4a.40.2", ext: "mp4" },
        { mime: "video/mp4", ext: "mp4" },
      ]
    : [
        { mime: "video/mp4;codecs=avc1.42E01E", ext: "mp4" },
        { mime: "video/mp4", ext: "mp4" },
      ];
  const types = preferred === "webm" ? [...webm, ...mp4] : [...webm, ...mp4];
  for (const t of types) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t.mime)) {
      return t;
    }
  }
  return { mime: "video/webm", ext: "webm" };
}

function audioTracksFrom(video: HTMLVideoElement): MediaStreamTrack[] {
  const el = video as HTMLVideoElement & {
    captureStream?: () => MediaStream;
    mozCaptureStream?: () => MediaStream;
  };
  try {
    const stream = el.captureStream?.() ?? el.mozCaptureStream?.();
    return (stream?.getAudioTracks() ?? []).map((t) => t.clone());
  } catch {
    return [];
  }
}

export async function exportCaptionedVideo(opts: {
  video: HTMLVideoElement;
  cues: Cue[];
  style: CaptionStyle;
  lang: string;
  format?: ExportFormat;
  onProgress?: (p: number) => void;
  signal?: AbortSignal;
}): Promise<{ blob: Blob; ext: string }> {
  const { video, cues, style, lang, onProgress, signal } = opts;
  const wanted: ExportFormat = opts.format ?? "mp4";
  if (typeof MediaRecorder === "undefined") throw new Error("NO_RECORDER");

  await ensureCaptionFont(style.fontId, style.fontWeight);

  const w = video.videoWidth || 1280;
  const h = video.videoHeight || 720;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No canvas");

  const startAt = video.currentTime;
  const wasMuted = video.muted;
  const wasPaused = video.paused;

  video.pause();
  await seekTo(video, 0);
  ctx.drawImage(video, 0, 0, w, h);
  const cue0 = activeCueAt(cues, 0);
  if (cue0) drawCaption(ctx, cue0.text, style, w, h, lang);

  const canvasStream = canvas.captureStream(0);
  const mixed = new MediaStream();
  for (const t of canvasStream.getVideoTracks()) mixed.addTrack(t);
  const frameTrack = canvasStream.getVideoTracks()[0] as MediaStreamTrack & {
    requestFrame?: () => void;
  };
  const clonedAudio = audioTracksFrom(video);
  for (const t of clonedAudio) mixed.addTrack(t);

  const { mime, ext } = pickMime(clonedAudio.length > 0, wanted);
  const recorder = makeRecorder(mixed, mime);
  const chunks: Blob[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

  try {
    recorder.start(200);
  } catch {
    throw new Error("RECORD_FAIL");
  }

  try {
    video.muted = false;
    await playForExport(video);
  } catch {
    video.muted = true;
    await playForExport(video);
  }

  await recordUntilEnd(
    video,
    ctx,
    cues,
    style,
    lang,
    w,
    h,
    frameTrack,
    (p) => onProgress?.(wanted === "mp4" ? p * 0.7 : p),
    signal,
  );

  video.pause();
  let blob = await stopRecorder(recorder, chunks, mime);
  if (!blob.size) throw new Error("RECORD_EMPTY");

  for (const t of clonedAudio) t.stop();
  for (const t of canvasStream.getTracks()) t.stop();

  video.muted = wasMuted;
  await seekTo(video, startAt).catch(() => {
    video.currentTime = startAt;
  });
  if (!wasPaused) {
    try {
      await video.play();
    } catch {
      /* leave paused */
    }
  }

  let outExt = /mp4|m4v|quicktime/i.test(blob.type) || ext === "mp4" ? "mp4" : "webm";
  if (wanted === "mp4" && outExt !== "mp4") {
    try {
      const { webmToMp4 } = await import("@/lib/to-mp4");
      blob = await webmToMp4(blob, (p) => onProgress?.(0.7 + p * 0.3));
      outExt = "mp4";
    } catch {
      outExt = "webm";
    }
  }
  onProgress?.(1);
  return { blob, ext: outExt };
}

function makeRecorder(stream: MediaStream, mime: string): MediaRecorder {
  try {
    return new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 3_000_000 });
  } catch {
    try {
      return new MediaRecorder(stream, { mimeType: mime });
    } catch {
      return new MediaRecorder(stream);
    }
  }
}

function stopRecorder(recorder: MediaRecorder, chunks: Blob[], mime: string): Promise<Blob> {
  const type = recorder.mimeType || mime;
  return new Promise((resolve, reject) => {
    const finish = () => resolve(new Blob(chunks, { type }));
    if (recorder.state === "inactive") {
      finish();
      return;
    }
    const timer = window.setTimeout(finish, 2500);
    recorder.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("RECORD_FAIL"));
    };
    recorder.onstop = () => {
      window.clearTimeout(timer);
      finish();
    };
    try {
      recorder.stop();
    } catch {
      window.clearTimeout(timer);
      finish();
    }
  });
}

function recordUntilEnd(
  video: HTMLVideoElement,
  ctx: CanvasRenderingContext2D,
  cues: Cue[],
  style: CaptionStyle,
  lang: string,
  w: number,
  h: number,
  frameTrack: MediaStreamTrack & { requestFrame?: () => void },
  onProgress?: (p: number) => void,
  signal?: AbortSignal,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const duration = Math.max(0.2, Number.isFinite(video.duration) ? video.duration : 0.2);
    const hard = window.setTimeout(done, Math.min(duration * 1000 + 8000, 13 * 60 * 1000));
    let lastTime = video.currentTime;
    let stall = 0;

    const paint = () => {
      ctx.drawImage(video, 0, 0, w, h);
      const cue = activeCueAt(cues, video.currentTime);
      if (cue) drawCaption(ctx, cue.text, style, w, h, lang);
      frameTrack.requestFrame?.();
      onProgress?.(Math.min(1, video.currentTime / duration));
    };

    const tick = window.setInterval(() => {
      if (signal?.aborted) {
        onAbort();
        return;
      }
      const t = video.currentTime;
      paint();
      if (video.ended || t >= duration - 0.05) {
        done();
        return;
      }
      if (Math.abs(t - lastTime) < 0.01) {
        stall += 33;
        if (stall > 2000) {
          if (t >= duration - 0.25) {
            done();
            return;
          }
          if (video.paused) void video.play().catch(() => undefined);
          stall = 0;
        }
      } else {
        stall = 0;
        lastTime = t;
      }
    }, 33);

    const onAbort = () => {
      cleanup();
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
    video.addEventListener("ended", done, { once: true });

    function cleanup() {
      window.clearTimeout(hard);
      window.clearInterval(tick);
      video.removeEventListener("ended", done);
      signal?.removeEventListener("abort", onAbort);
    }

    function done() {
      cleanup();
      paint();
      onProgress?.(1);
      resolve();
    }
  });
}

async function playForExport(video: HTMLVideoElement) {
  const p = video.play();
  if (p) await p;
}

function seekTo(video: HTMLVideoElement, time: number): Promise<void> {
  return new Promise((resolve) => {
    const target = Math.max(0, time);
    const close = () => Math.abs(video.currentTime - target) < 0.12 && video.readyState >= 2 && !video.seeking;
    if (close() && !video.ended) {
      resolve();
      return;
    }
    const finish = () => {
      window.clearTimeout(timer);
      video.removeEventListener("seeked", finish);
      resolve();
    };
    const timer = window.setTimeout(finish, 1200);
    video.addEventListener("seeked", finish, { once: true });
    try {
      video.currentTime = target;
    } catch {
      finish();
    }
  });
}
