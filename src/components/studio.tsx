import { CueEditor } from "@/components/cue-editor";
import { Brand, LocaleToggle } from "@/components/landing";
import { InstallApp } from "@/components/install-app";
import { LanguagePair } from "@/components/language-pair";
import { ProcessOverlay } from "@/components/process-overlay";
import { StylePanel } from "@/components/style-panel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoStage } from "@/components/video-stage";
import { copy } from "@/lib/copy";
import { toSrt, toVtt } from "@/lib/cues";
import { exportCaptionedVideo } from "@/lib/export-video";
import { languageLabel } from "@/lib/languages";
import { processVideoFile } from "@/lib/process";
import { useStudio } from "@/lib/studio-store";
import { shareOrDownload, downloadBlob } from "@/lib/utils";
import { Download, LoaderCircle, Share2, Sparkles, Subtitles, Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function Studio() {
  const locale = useStudio((s) => s.locale);
  const t = copy[locale];
  const videoRef = useRef<HTMLVideoElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const autoRef = useRef(false);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const exportAbortRef = useRef<AbortController | null>(null);
  const status = useStudio((s) => s.status);
  const sourceLang = useStudio((s) => s.sourceLang);
  const targetLang = useStudio((s) => s.targetLang);
  const setLangs = useStudio((s) => s.setLangs);
  const file = useStudio((s) => s.file);
  const isDemo = useStudio((s) => s.isDemo);
  const aiAvailable = useStudio((s) => s.aiAvailable);
  const detectedLang = useStudio((s) => s.detectedLang);
  const cues = useStudio((s) => s.cues);
  const style = useStudio((s) => s.style);
  const videoName = useStudio((s) => s.videoName);
  const exportFormat = useStudio((s) => s.exportFormat);
  const setExportFormat = useStudio((s) => s.setExportFormat);
  const reset = useStudio((s) => s.reset);
  const setProcess = useStudio((s) => s.setProcess);
  const setCues = useStudio((s) => s.setCues);
  const setTime = useStudio((s) => s.setTime);

  const seek = (time: number) => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = time;
    setTime(time, el.duration || 0);
  };

  const runProcess = async () => {
    if (!file) {
      toast.error(t.errorGeneric);
      return;
    }
    if (!aiAvailable) {
      toast.message(t.aiOff);
      return;
    }
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setProcess("processing", "extract", 0.05);
    try {
      const result = await processVideoFile({
        file,
        sourceLang,
        targetLang,
        signal: ac.signal,
        onProgress: (p) => setProcess("processing", p.step, p.progress),
      });
      setCues(result.cues, result.detectedLang);
      if (result.cues.length === 0) {
        toast.message(t.noSpeech);
      } else if (result.translateError) {
        toast.error(t.translateFail);
      } else if (result.translated) {
        toast.success(
          t.translatedFrom
            .replace("{from}", languageLabel(result.detectedLang, locale))
            .replace("{to}", languageLabel(targetLang, locale)),
        );
      } else {
        toast.success(t.done);
      }
    } catch (err) {
      if ((err as { name?: string }).name === "AbortError") {
        setProcess("idle");
        return;
      }
      const msg = err instanceof Error ? err.message : "";
      setProcess("idle");
      if (msg === "TOO_LONG") toast.error(t.errorTooLong);
      else if (msg.includes("decode") || msg === "EncodingError") toast.error(t.errorAudio);
      else toast.error(t.errorGeneric);
    }
  };

  useEffect(() => {
    if (autoRef.current) return;
    if (!file || isDemo) return;
    autoRef.current = true;
    void runProcess();
    // Auto-run once when a user video is loaded.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, isDemo]);

  const onCancel = () => {
    abortRef.current?.abort();
    setProcess("idle");
  };

  const baseName = videoName.replace(/\.[^.]+$/, "") || "freesubtiless";

  const save = async (blob: Blob, filename: string, okMsg: string) => {
    const result = await shareOrDownload(blob, filename);
    if (result === "shared") toast.success(t.share);
    else if (result === "downloaded") toast.success(okMsg);
  };

  const exportSrt = () => {
    const body = `\uFEFF${toSrt(cues)}`;
    void save(new Blob([body], { type: "application/x-subrip;charset=utf-8" }), `${baseName}.srt`, t.savedSrt);
  };

  const exportVtt = () => {
    void save(new Blob([toVtt(cues)], { type: "text/vtt;charset=utf-8" }), `${baseName}.vtt`, t.savedVtt);
  };

  const onExportVideo = async () => {
    const el = videoRef.current;
    if (!el || exporting) return;
    exportAbortRef.current?.abort();
    const ac = new AbortController();
    exportAbortRef.current = ac;
    setExporting(true);
    setExportProgress(0);
    try {
      const { blob, ext } = await exportCaptionedVideo({
        video: el,
        cues,
        style,
        lang: targetLang,
        format: exportFormat,
        signal: ac.signal,
        onProgress: setExportProgress,
      });
      downloadBlob(blob, `${baseName}-subtitulos.${ext}`);
      if (exportFormat === "mp4" && ext !== "mp4") toast.message(t.savedWebmFallback);
      else if (ext === "mp4") toast.success(t.savedMp4);
      else toast.success(t.savedWebm);
    } catch (err) {
      if ((err as { name?: string }).name === "AbortError") return;
      toast.error(t.exportError);
    } finally {
      setExporting(false);
      setExportProgress(0);
    }
  };

  const exportLabel = exporting
    ? exportFormat === "mp4" && exportProgress >= 0.7
      ? t.converting
      : `${t.exporting.replace("…", "")} ${Math.round(exportProgress * 100)}%`
    : t.exportVideo;

  const langs = (
    <LanguagePair
      compact
      locale={locale}
      source={sourceLang}
      target={targetLang}
      onSource={(v) => setLangs(v, targetLang)}
      onTarget={(v) => setLangs(sourceLang, v)}
    />
  );

  const fromLabel = languageLabel(detectedLang || sourceLang, locale);
  const toLabel = languageLabel(targetLang, locale);

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-background">
      <header className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-3">
        <Brand />
        <div className="mx-auto hidden min-w-0 max-w-lg flex-1 lg:block">{langs}</div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => void runProcess()}
            disabled={status === "processing" || isDemo || !file}
          >
            {status === "processing" ? (
              <LoaderCircle className="size-3.5 animate-spin" />
            ) : (
              <Sparkles className="size-3.5" />
            )}
            <span className="hidden sm:inline">{t.generate}</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={exportSrt}
            disabled={cues.length === 0}
            title={t.srtHelp}
          >
            <Subtitles className="size-3.5" />
            <span className="hidden sm:inline">{t.exportSrt}</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={exportVtt}
            disabled={cues.length === 0}
            className="hidden sm:inline-flex"
          >
            {t.exportVtt}
          </Button>
          <Button size="sm" onClick={() => void onExportVideo()} disabled={exporting}>
            {exporting ? (
              <LoaderCircle className="size-3.5 animate-spin" />
            ) : (
              <Download className="size-3.5" />
            )}
            <span className="hidden sm:inline">{exportLabel}</span>
          </Button>
          <Button size="sm" variant="ghost" onClick={reset} aria-label={t.newVideo}>
            <Undo2 className="size-3.5 sm:hidden" />
            <span className="hidden sm:inline">{t.newVideo}</span>
          </Button>
          <InstallApp locale={locale} compact />
          <LocaleToggle />
        </div>
      </header>

      <div className="border-b border-border px-3 py-2 lg:hidden">{langs}</div>

      {cues.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-2 text-xs text-muted-foreground">
          <span>
            {fromLabel} → {toLabel}
          </span>
          <div className="flex rounded-md bg-secondary p-0.5">
            {(["mp4", "webm"] as const).map((f) => (
              <button
                key={f}
                type="button"
                disabled={exporting}
                onClick={() => setExportFormat(f)}
                className={`h-8 min-w-12 rounded px-2 text-xs font-medium ${
                  exportFormat === f ? "bg-card text-foreground" : "text-muted-foreground"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <Button size="sm" variant="secondary" className="h-8" onClick={exportSrt} title={t.srtHelp}>
            <Share2 className="size-3.5" />
            {t.exportSrt}
          </Button>
          <Button size="sm" variant="secondary" className="h-8" onClick={() => void onExportVideo()} disabled={exporting}>
            <Download className="size-3.5" />
            {exportLabel}
          </Button>
        </div>
      )}

      <div className="hidden min-h-0 flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-h-0 flex-col gap-3 p-4">
          <VideoStage locale={locale} videoRef={videoRef} />
          <div className="h-52 shrink-0 overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
            <CueEditor locale={locale} onSeek={seek} />
          </div>
        </div>
        <aside className="min-h-0 border-l border-border bg-card">
          <StylePanel locale={locale} />
        </aside>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <div className="flex min-h-0 flex-1 flex-col p-3">
          <VideoStage locale={locale} videoRef={videoRef} />
        </div>
        <Tabs defaultValue="style" className="shrink-0 border-t border-border">
          <TabsList className="mx-3 mt-3 w-auto self-start">
            <TabsTrigger value="style">{t.style}</TabsTrigger>
            <TabsTrigger value="texts">{t.texts}</TabsTrigger>
          </TabsList>
          <TabsContent value="style" className="h-72">
            <StylePanel locale={locale} />
          </TabsContent>
          <TabsContent value="texts" className="h-72">
            <CueEditor locale={locale} onSeek={seek} />
          </TabsContent>
        </Tabs>
      </div>

      {status === "processing" && <ProcessOverlay locale={locale} onCancel={onCancel} />}
    </div>
  );
}
