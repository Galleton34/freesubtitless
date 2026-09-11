import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { copy, type Locale } from "@/lib/copy";
import type { ProcessStep } from "@/lib/process";
import { useStudio } from "@/lib/studio-store";

export function ProcessOverlay({
  locale,
  onCancel,
}: {
  locale: Locale;
  onCancel: () => void;
}) {
  const t = copy[locale];
  const step = useStudio((s) => s.step);
  const progress = useStudio((s) => s.progress);
  const steps: ProcessStep[] = ["extract", "transcribe", "translate"];
  const labels: Record<ProcessStep, string> = {
    extract: t.extract,
    transcribe: t.transcribe,
    translate: t.translate,
  };

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 p-6 backdrop-blur-[2px]">
      <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-[var(--shadow-elevated)]">
        <p className="font-display text-xl text-foreground">{t.processing}</p>
        <ol className="mt-5 space-y-3">
          {steps.map((s) => {
            const active = step === s;
            const done =
              (s === "extract" && (step === "transcribe" || step === "translate")) ||
              (s === "transcribe" && step === "translate");
            return (
              <li key={s} className="flex items-center justify-between gap-3">
                <span className={active || done ? "text-sm text-foreground" : "text-sm text-muted-foreground"}>
                  {labels[s]}
                </span>
                {active && (
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {Math.round(progress * 100)}%
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <Progress className="mt-5" value={Math.round(progress * 100)} />
        <Button variant="ghost" className="mt-4 w-full" onClick={onCancel}>
          {t.cancel}
        </Button>
      </div>
    </div>
  );
}
