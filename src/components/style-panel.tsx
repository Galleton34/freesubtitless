import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CAPTION_FONTS,
  STYLE_PRESETS,
  type CaptionAlign,
  type CaptionPosition,
} from "@/lib/caption-style";
import { copy, type Locale } from "@/lib/copy";
import { useStudio } from "@/lib/studio-store";
import { cn } from "@/lib/utils";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import type { ReactNode } from "react";

export function StylePanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const style = useStudio((s) => s.style);
  const update = useStudio((s) => s.updateStyle);
  const applyPreset = useStudio((s) => s.applyPreset);

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-6 p-4 pb-10">
        <section className="space-y-2">
          <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {t.presets}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {STYLE_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p.id)}
                className="h-8 rounded-md bg-secondary px-2.5 text-xs text-secondary-foreground shadow-[var(--shadow-border)] hover:bg-accent"
              >
                {locale === "en" ? p.nameEn : p.name}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {t.type}
          </h3>
          <Field label={t.font}>
            <Select value={style.fontId} onValueChange={(fontId) => update({ fontId })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CAPTION_FONTS.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    <span style={{ fontFamily: f.stack }}>{f.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <SliderField
            label={t.size}
            value={style.fontSize}
            min={3}
            max={10}
            step={0.1}
            display={style.fontSize.toFixed(1)}
            onChange={(fontSize) => update({ fontSize })}
          />
          <SliderField
            label={t.weight}
            value={style.fontWeight}
            min={400}
            max={700}
            step={100}
            display={String(style.fontWeight)}
            onChange={(fontWeight) => update({ fontWeight })}
          />
          <SliderField
            label={t.tracking}
            value={style.letterSpacing}
            min={-0.04}
            max={0.18}
            step={0.01}
            display={style.letterSpacing.toFixed(2)}
            onChange={(letterSpacing) => update({ letterSpacing })}
          />
          <SliderField
            label={t.leading}
            value={style.lineHeight}
            min={1}
            max={1.8}
            step={0.05}
            display={style.lineHeight.toFixed(2)}
            onChange={(lineHeight) => update({ lineHeight })}
          />
          <Row label={t.uppercase}>
            <Switch
              checked={style.uppercase}
              onCheckedChange={(uppercase) => update({ uppercase })}
            />
          </Row>
        </section>

        <section className="space-y-3">
          <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {t.color}
          </h3>
          <ColorField label={t.fill} value={style.color} onChange={(color) => update({ color })} />
          <ColorField
            label={t.outline}
            value={style.outlineColor}
            onChange={(outlineColor) => update({ outlineColor })}
          />
          <SliderField
            label={t.outlineW}
            value={style.outlineWidth}
            min={0}
            max={6}
            step={0.1}
            display={style.outlineWidth.toFixed(1)}
            onChange={(outlineWidth) => update({ outlineWidth })}
          />
        </section>

        <section className="space-y-3">
          <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {t.shadow}
          </h3>
          <ColorField
            label={t.shadow}
            value={style.shadowColor}
            onChange={(shadowColor) => update({ shadowColor })}
          />
          <SliderField
            label={t.blur}
            value={style.shadowBlur}
            min={0}
            max={24}
            step={1}
            display={String(style.shadowBlur)}
            onChange={(shadowBlur) => update({ shadowBlur })}
          />
          <SliderField
            label={t.offsetX}
            value={style.shadowOffsetX}
            min={-12}
            max={12}
            step={1}
            display={String(style.shadowOffsetX)}
            onChange={(shadowOffsetX) => update({ shadowOffsetX })}
          />
          <SliderField
            label={t.offsetY}
            value={style.shadowOffsetY}
            min={-12}
            max={12}
            step={1}
            display={String(style.shadowOffsetY)}
            onChange={(shadowOffsetY) => update({ shadowOffsetY })}
          />
          <SliderField
            label={t.opacity}
            value={style.shadowOpacity}
            min={0}
            max={1}
            step={0.05}
            display={style.shadowOpacity.toFixed(2)}
            onChange={(shadowOpacity) => update({ shadowOpacity })}
          />
        </section>

        <section className="space-y-3">
          <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {t.box}
          </h3>
          <Row label={t.enabled}>
            <Switch
              checked={style.boxEnabled}
              onCheckedChange={(boxEnabled) => update({ boxEnabled })}
            />
          </Row>
          <ColorField
            label={t.fill}
            value={style.boxColor}
            onChange={(boxColor) => update({ boxColor })}
          />
          <SliderField
            label={t.opacity}
            value={style.boxOpacity}
            min={0}
            max={1}
            step={0.05}
            display={style.boxOpacity.toFixed(2)}
            onChange={(boxOpacity) => update({ boxOpacity })}
          />
          <SliderField
            label={t.padding}
            value={style.boxPaddingX}
            min={4}
            max={28}
            step={1}
            display={String(style.boxPaddingX)}
            onChange={(v) => update({ boxPaddingX: v, boxPaddingY: Math.round(v * 0.6) })}
          />
          <SliderField
            label={t.radius}
            value={style.boxRadius}
            min={0}
            max={20}
            step={1}
            display={String(style.boxRadius)}
            onChange={(boxRadius) => update({ boxRadius })}
          />
        </section>

        <section className="space-y-3">
          <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {t.position}
          </h3>
          <div className="grid grid-cols-3 gap-1.5">
            {(["top", "center", "bottom"] as CaptionPosition[]).map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => update({ position: pos })}
                className={cn(
                  "h-9 rounded-md text-xs shadow-[var(--shadow-border)]",
                  style.position === pos
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent",
                )}
              >
                {pos === "top" ? t.top : pos === "center" ? t.center : t.bottom}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            {(["left", "center", "right"] as CaptionAlign[]).map((align) => {
              const Icon =
                align === "left" ? AlignLeft : align === "right" ? AlignRight : AlignCenter;
              return (
                <button
                  key={align}
                  type="button"
                  onClick={() => update({ align })}
                  aria-label={align}
                  className={cn(
                    "flex h-11 flex-1 items-center justify-center rounded-md shadow-[var(--shadow-border)]",
                    style.align === align
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent",
                  )}
                >
                  <Icon className="size-4" />
                </button>
              );
            })}
          </div>
          <SliderField
            label={t.yOffset}
            value={style.yOffset}
            min={-18}
            max={18}
            step={1}
            display={`${style.yOffset}`}
            onChange={(yOffset) => update({ yOffset })}
          />
          <SliderField
            label={t.maxWidth}
            value={style.maxWidth}
            min={50}
            max={94}
            step={1}
            display={`${style.maxWidth}%`}
            onChange={(maxWidth) => update({ maxWidth })}
          />
        </section>
      </div>
    </ScrollArea>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex h-11 items-center justify-between gap-3">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">{display}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(v) => onChange(v[0] ?? value)}
      />
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex h-11 items-center justify-between gap-3">
      <Label>{label}</Label>
      <label className="flex items-center gap-2">
        <span className="font-mono text-xs text-muted-foreground">{value}</span>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="size-8 overflow-hidden rounded-md shadow-[var(--shadow-border)]"
          aria-label={label}
        />
      </label>
    </div>
  );
}
