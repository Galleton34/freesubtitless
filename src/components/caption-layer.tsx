import { fontStack, type CaptionStyle } from "@/lib/caption-style";
import { wrapCaption } from "@/lib/cues";
import { isRtl } from "@/lib/languages";
import { cn } from "@/lib/utils";

export function CaptionLayer({
  text,
  style,
  lang,
}: {
  text: string;
  style: CaptionStyle;
  lang: string;
}) {
  const lines = wrapCaption(text, style.uppercase ? 34 : 42);
  if (!lines.length) return null;
  const display = style.uppercase ? lines.map((l) => l.toUpperCase()) : lines;
  const rtl = isRtl(lang);

  const justify =
    style.align === "left" ? "flex-start" : style.align === "right" ? "flex-end" : "center";
  const vPos =
    style.position === "top"
      ? "flex-start"
      : style.position === "center"
        ? "center"
        : "flex-end";

  const shadow = `${style.shadowOffsetX}px ${style.shadowOffsetY}px ${style.shadowBlur}px ${hexAlpha(style.shadowColor, style.shadowOpacity)}`;

  return (
    <div
      className="caption-layer pointer-events-none absolute inset-0 flex px-[8%]"
      style={{
        alignItems: vPos,
        justifyContent: justify,
        paddingTop: style.position === "top" ? "8%" : undefined,
        paddingBottom: style.position === "bottom" ? "8%" : undefined,
        transform: `translateY(${style.yOffset}%)`,
      }}
    >
      <div
        dir={rtl ? "rtl" : "ltr"}
        className={cn("caption-text max-w-full text-pretty")}
        style={{
          fontFamily: fontStack(style.fontId),
          fontSize: `${style.fontSize}cqh`,
          fontWeight: style.fontWeight,
          letterSpacing: `${style.letterSpacing}em`,
          lineHeight: style.lineHeight,
          color: style.color,
          textAlign: style.align,
          width: `${style.maxWidth}%`,
          WebkitTextStroke:
            style.outlineWidth > 0 ? `${style.outlineWidth * 0.06}cqh ${style.outlineColor}` : "0",
          textShadow: style.shadowOpacity > 0 ? shadow : "none",
          background: style.boxEnabled
            ? hexAlpha(style.boxColor, style.boxOpacity)
            : "transparent",
          padding: style.boxEnabled
            ? `${style.boxPaddingY * 0.12}cqh ${style.boxPaddingX * 0.14}cqh`
            : 0,
          borderRadius: style.boxEnabled ? style.boxRadius : 0,
        }}
      >
        {display.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

function hexAlpha(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = Number.parseInt(full.slice(0, 6), 16);
  if (Number.isNaN(n)) return `rgba(0,0,0,${alpha})`;
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
