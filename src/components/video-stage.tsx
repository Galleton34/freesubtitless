import { CaptionLayer } from "@/components/caption-layer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { activeCueAt } from "@/lib/cues";
import { copy, type Locale } from "@/lib/copy";
import { useStudio } from "@/lib/studio-store";
import { formatTimecode } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";

export function VideoStage({
  locale,
  videoRef,
}: {
  locale: Locale;
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const t = copy[locale];
  const videoUrl = useStudio((s) => s.videoUrl);
  const cues = useStudio((s) => s.cues);
  const style = useStudio((s) => s.style);
  const targetLang = useStudio((s) => s.targetLang);
  const currentTime = useStudio((s) => s.currentTime);
  const duration = useStudio((s) => s.duration);
  const setTime = useStudio((s) => s.setTime);
  const [playing, setPlaying] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const cue = activeCueAt(cues, currentTime);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onTime = () => setTime(el.currentTime, el.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onTime);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onPause);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onTime);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onPause);
    };
  }, [setTime, videoRef, videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    const stage = stageRef.current;
    const overlay = overlayRef.current;
    if (!video || !stage || !overlay) return;
    const sync = () => {
      const vr = video.getBoundingClientRect();
      const sr = stage.getBoundingClientRect();
      overlay.style.width = `${vr.width}px`;
      overlay.style.height = `${vr.height}px`;
      overlay.style.left = `${vr.left - sr.left}px`;
      overlay.style.top = `${vr.top - sr.top}px`;
    };
    sync();
    video.addEventListener("loadedmetadata", sync);
    const ro = new ResizeObserver(sync);
    ro.observe(video);
    ro.observe(stage);
    return () => {
      ro.disconnect();
      video.removeEventListener("loadedmetadata", sync);
    };
  }, [videoRef, videoUrl]);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  };

  const seek = (tsec: number) => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = tsec;
    setTime(tsec, el.duration || duration);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div
        ref={stageRef}
        className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-xl bg-black shadow-[var(--shadow-elevated)]"
      >
        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              className="max-h-full max-w-full object-contain"
              playsInline
              onClick={toggle}
            />
            <div ref={overlayRef} className="pointer-events-none absolute overflow-hidden">
              {cue ? <CaptionLayer text={cue.text} style={style} lang={targetLang} /> : null}
            </div>
          </>
        ) : null}
      </div>
      <div className="flex items-center gap-3 px-1">
        <Button
          size="icon"
          variant="secondary"
          className="size-11 shrink-0"
          onClick={toggle}
          aria-label={playing ? t.pause : t.play}
        >
          {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
        </Button>
        <Slider
          min={0}
          max={Math.max(duration, 0.1)}
          step={0.05}
          value={[currentTime]}
          onValueChange={(v) => seek(v[0] ?? 0)}
        />
        <span className="w-24 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">
          {formatTimecode(currentTime)} / {formatTimecode(duration)}
        </span>
      </div>
    </div>
  );
}
