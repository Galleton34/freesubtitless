import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { copy, type Locale } from "@/lib/copy";
import { useStudio } from "@/lib/studio-store";
import { cn, formatTimecode } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";

export function CueEditor({
  locale,
  onSeek,
}: {
  locale: Locale;
  onSeek: (t: number) => void;
}) {
  const t = copy[locale];
  const cues = useStudio((s) => s.cues);
  const selected = useStudio((s) => s.selectedCueId);
  const selectCue = useStudio((s) => s.selectCue);
  const updateCue = useStudio((s) => s.updateCue);
  const addCue = useStudio((s) => s.addCue);
  const removeCue = useStudio((s) => s.removeCue);
  const currentTime = useStudio((s) => s.currentTime);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {t.texts}
        </h3>
        <Button size="sm" variant="secondary" onClick={addCue}>
          <Plus className="size-3.5" />
          {t.addCue}
        </Button>
      </div>
      {cues.length === 0 ? (
        <p className="px-4 pb-4 text-sm text-muted-foreground">{t.emptyCues}</p>
      ) : (
        <ScrollArea className="min-h-0 flex-1">
          <ul className="flex flex-col gap-2 px-3 pb-6">
            {cues.map((cue) => {
              const active = currentTime >= cue.start && currentTime < cue.end;
              const open = selected === cue.id;
              return (
                <li
                  key={cue.id}
                  className={cn(
                    "rounded-lg bg-secondary p-2 shadow-[var(--shadow-border)]",
                    (active || open) && "ring-1 ring-primary/40",
                  )}
                >
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-1 py-1 text-left"
                    onClick={() => {
                      selectCue(cue.id);
                      onSeek(cue.start);
                    }}
                  >
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                      {formatTimecode(cue.start)}–{formatTimecode(cue.end)}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm">
                      {cue.text || "…"}
                    </span>
                  </button>
                  {open && (
                    <div className="mt-2 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          step="0.1"
                          min={0}
                          value={cue.start.toFixed(1)}
                          onChange={(e) =>
                            updateCue(cue.id, { start: Number(e.target.value) })
                          }
                          aria-label="start"
                        />
                        <Input
                          type="number"
                          step="0.1"
                          min={0}
                          value={cue.end.toFixed(1)}
                          onChange={(e) =>
                            updateCue(cue.id, { end: Number(e.target.value) })
                          }
                          aria-label="end"
                        />
                      </div>
                      <Textarea
                        rows={2}
                        value={cue.text}
                        onChange={(e) => updateCue(cue.id, { text: e.target.value })}
                      />
                      {cue.original && cue.original !== cue.text && (
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            {t.original}: {cue.original}
                          </p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateCue(cue.id, { text: cue.original })}
                          >
                            {t.restore}
                          </Button>
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => removeCue(cue.id)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}
