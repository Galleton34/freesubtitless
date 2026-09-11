import { copy, type Locale } from "@/lib/copy";
import { SOURCE_LANGUAGES, TARGET_LANGUAGES } from "@/lib/languages";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

export function LanguagePair({
  locale,
  source,
  target,
  onSource,
  onTarget,
  compact,
}: {
  locale: Locale;
  source: string;
  target: string;
  onSource: (v: string) => void;
  onTarget: (v: string) => void;
  compact?: boolean;
}) {
  const t = copy[locale];
  const name = (code: string, list: typeof SOURCE_LANGUAGES) => {
    const item = list.find((l) => l.code === code);
    if (!item) return code;
    return locale === "en" ? item.nameEn : item.name;
  };

  return (
    <div className={compact ? "flex min-w-0 items-end gap-2" : "grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end"}>
      <div className="min-w-0 space-y-1.5">
        {!compact && <Label htmlFor="source-lang">{t.source}</Label>}
        <Select value={source} onValueChange={onSource}>
          <SelectTrigger id="source-lang" className={compact ? "h-10" : undefined}>
            <SelectValue>{name(source, SOURCE_LANGUAGES)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {SOURCE_LANGUAGES.map((l) => (
              <SelectItem key={l.code} value={l.code}>
                {locale === "en" ? l.nameEn : l.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ArrowRight className="mb-3 hidden size-4 text-muted-foreground sm:block" />
      <div className="min-w-0 space-y-1.5">
        {!compact && <Label htmlFor="target-lang">{t.target}</Label>}
        <Select value={target} onValueChange={onTarget}>
          <SelectTrigger id="target-lang" className={compact ? "h-10" : undefined}>
            <SelectValue>{name(target, TARGET_LANGUAGES)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {TARGET_LANGUAGES.map((l) => (
              <SelectItem key={l.code} value={l.code}>
                {locale === "en" ? l.nameEn : l.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!compact && (
          <p className="text-xs leading-snug text-muted-foreground">{t.targetHint}</p>
        )}
      </div>
    </div>
  );
}
