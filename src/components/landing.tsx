import { CaptionLayer } from "@/components/caption-layer";
import { InstallApp } from "@/components/install-app";
import { LanguagePair } from "@/components/language-pair";
import { DEFAULT_STYLE } from "@/lib/caption-style";
import { copy, DEMO_CUES, type Locale } from "@/lib/copy";
import { useStudio } from "@/lib/studio-store";
import { Film, Upload } from "lucide-react";
import { useMemo, useRef, useState } from "react";

const ACCEPT = "video/mp4,video/webm,video/quicktime,video/x-matroska,.mp4,.webm,.mov,.mkv";

export function Landing({
  locale,
  onFile,
  onDemo,
}: {
  locale: Locale;
  onFile: (file: File) => void;
  onDemo: () => void;
}) {
  const t = copy[locale];
  const sourceLang = useStudio((s) => s.sourceLang);
  const targetLang = useStudio((s) => s.targetLang);
  const setLangs = useStudio((s) => s.setLangs);
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const sample = useMemo(() => DEMO_CUES[locale][0]?.text ?? "", [locale]);

  const take = (file?: File | null) => {
    if (file && file.type.startsWith("video")) onFile(file);
  };

  return (
    <div className="film-grain mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 py-6 sm:px-8">
      <header className="flex items-center justify-between">
        <Brand />
        <LocaleToggle />
      </header>

      <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="max-w-xl">
          <h1 className="font-display text-4xl leading-tight tracking-[-0.03em] text-foreground sm:text-5xl">
            {t.tagline}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{t.blurb}</p>

          <div className="mt-8">
            <LanguagePair
              locale={locale}
              source={sourceLang}
              target={targetLang}
              onSource={(v) => setLangs(v, targetLang)}
              onTarget={(v) => setLangs(sourceLang, v)}
            />
          </div>

          <label
            onDragOver={(e) => {
              e.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setOver(false);
              take(e.dataTransfer.files[0]);
            }}
            className={`mt-6 flex w-full cursor-pointer rounded-2xl bg-card p-5 text-left shadow-[var(--shadow-border)] transition-[box-shadow] ${over ? "shadow-[var(--shadow-elevated)]" : ""}`}
          >
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
              suppressHydrationWarning
              onChange={(e) => take(e.target.files?.[0])}
            />
            <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex size-12 items-center justify-center rounded-lg bg-secondary">
                <Upload className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{t.dropTitle}</p>
                <p className="text-sm text-muted-foreground">{t.dropHint}</p>
              </div>
              <span className="inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
                {t.browse}
              </span>
            </div>
          </label>

          <button
            type="button"
            onClick={onDemo}
            className="mt-4 inline-flex h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Film className="size-4" />
            {t.demo}
          </button>
        </div>

        <div className="relative">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-[var(--shadow-elevated)]">
            <video
              src="/demo.mp4"
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <CaptionLayer text={sample} style={DEFAULT_STYLE} lang={locale === "en" ? "en" : "es"} />
          </div>
        </div>
      </div>

      <InstallApp locale={locale} />

      <p className="pb-4 pt-6 text-xs leading-relaxed text-muted-foreground">{t.footer}</p>
    </div>
  );
}

export function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-8 items-center justify-center rounded-md bg-primary">
        <span className="block h-1.5 w-4 rounded-full bg-primary-foreground" />
      </span>
      <span className="font-display text-lg tracking-tight sm:text-xl">FreeSubtiless</span>
    </div>
  );
}

export function LocaleToggle() {
  const locale = useStudio((s) => s.locale);
  const setLocale = useStudio((s) => s.setLocale);
  return (
    <div className="flex rounded-md bg-secondary p-0.5 shadow-[var(--shadow-border)]">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          className={`h-8 min-w-10 rounded px-2 text-xs font-medium ${locale === l ? "bg-card text-foreground" : "text-muted-foreground"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
