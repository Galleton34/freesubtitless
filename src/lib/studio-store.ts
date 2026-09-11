import { create } from "zustand";
import { DEFAULT_STYLE, STYLE_PRESETS, type CaptionStyle } from "@/lib/caption-style";
import { DEMO_CUES, type Locale } from "@/lib/copy";
import type { Cue } from "@/lib/cues";
import type { ExportFormat } from "@/lib/export-video";
import type { ProcessStep } from "@/lib/process";

export type StudioStatus = "idle" | "processing" | "ready";

type StudioState = {
  locale: Locale;
  sourceLang: string;
  targetLang: string;
  videoUrl: string | null;
  videoName: string;
  isDemo: boolean;
  file: File | Blob | null;
  cues: Cue[];
  style: CaptionStyle;
  status: StudioStatus;
  step: ProcessStep | null;
  progress: number;
  detectedLang: string | null;
  selectedCueId: string | null;
  currentTime: number;
  duration: number;
  aiAvailable: boolean;
  exportFormat: ExportFormat;
  setLocale: (locale: Locale) => void;
  setLangs: (source: string, target: string) => void;
  setAiAvailable: (v: boolean) => void;
  setExportFormat: (format: ExportFormat) => void;
  setTime: (t: number, duration?: number) => void;
  selectCue: (id: string | null) => void;
  updateStyle: (partial: Partial<CaptionStyle>) => void;
  applyPreset: (id: string) => void;
  updateCue: (id: string, patch: Partial<Cue>) => void;
  addCue: () => void;
  removeCue: (id: string) => void;
  loadVideo: (opts: {
    url: string;
    name: string;
    file: File | Blob | null;
    demo?: boolean;
    locale: Locale;
  }) => void;
  setProcess: (status: StudioStatus, step?: ProcessStep | null, progress?: number) => void;
  setCues: (cues: Cue[], detected?: string) => void;
  reset: () => void;
};

function loadLocale(): Locale {
  if (typeof window === "undefined") return "es";
  const saved = window.localStorage.getItem("linea-locale");
  if (saved === "en" || saved === "es") return saved;
  return "es";
}

export const useStudio = create<StudioState>((set, get) => ({
  locale: "es",
  sourceLang: "auto",
  targetLang: "es",
  videoUrl: null,
  videoName: "",
  isDemo: false,
  file: null,
  cues: [],
  style: { ...DEFAULT_STYLE },
  status: "idle",
  step: null,
  progress: 0,
  detectedLang: null,
  selectedCueId: null,
  currentTime: 0,
  duration: 0,
  aiAvailable: true,
  exportFormat: "mp4",
  setLocale: (locale) => {
    try {
      window.localStorage.setItem("linea-locale", locale);
    } catch {
      /* ignore */
    }
    set({ locale });
  },
  setLangs: (sourceLang, targetLang) => set({ sourceLang, targetLang }),
  setAiAvailable: (aiAvailable) => set({ aiAvailable }),
  setExportFormat: (exportFormat) => set({ exportFormat }),
  setTime: (currentTime, duration) =>
    set(duration !== undefined ? { currentTime, duration } : { currentTime }),
  selectCue: (selectedCueId) => set({ selectedCueId }),
  updateStyle: (partial) => set({ style: { ...get().style, ...partial } }),
  applyPreset: (id) => {
    const preset = STYLE_PRESETS.find((p) => p.id === id);
    if (!preset) return;
    set({ style: { ...DEFAULT_STYLE, ...preset.style } });
  },
  updateCue: (id, patch) =>
    set({
      cues: get().cues.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }),
  addCue: () => {
    const { cues, duration, currentTime } = get();
    const start = currentTime || (cues.at(-1)?.end ?? 0) + 0.15;
    const end = Math.min((duration || start + 2.2) , start + 2.2);
    const id = `c${Date.now()}`;
    const cue: Cue = { id, start, end: Math.max(end, start + 0.8), text: "" };
    set({ cues: [...cues, cue].sort((a, b) => a.start - b.start), selectedCueId: id });
  },
  removeCue: (id) => set({ cues: get().cues.filter((c) => c.id !== id) }),
  loadVideo: ({ url, name, file, demo, locale }) => {
    const prev = get().videoUrl;
    if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
    const cues = demo
      ? DEMO_CUES[locale].map((c, i) => ({
          id: `d${i + 1}`,
          start: c.start,
          end: c.end,
          text: c.text,
        }))
      : [];
    set({
      videoUrl: url,
      videoName: name,
      file,
      isDemo: Boolean(demo),
      cues,
      status: demo ? "ready" : "idle",
      step: null,
      progress: 0,
      detectedLang: demo ? (locale === "en" ? "en" : "es") : null,
      selectedCueId: cues[0]?.id ?? null,
      currentTime: 0,
    });
  },
  setProcess: (status, step = null, progress = 0) => set({ status, step, progress }),
  setCues: (cues, detected) =>
    set({
      cues,
      detectedLang: detected ?? get().detectedLang,
      selectedCueId: cues[0]?.id ?? null,
      status: "ready",
      step: null,
      progress: 1,
    }),
  reset: () => {
    const prev = get().videoUrl;
    if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
    set({
      videoUrl: null,
      videoName: "",
      isDemo: false,
      file: null,
      cues: [],
      status: "idle",
      step: null,
      progress: 0,
      detectedLang: null,
      selectedCueId: null,
      currentTime: 0,
      duration: 0,
    });
  },
}));

export function initLocale() {
  useStudio.getState().setLocale(loadLocale());
}
