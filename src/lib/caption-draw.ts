import type { CaptionStyle } from "@/lib/caption-style";
import { fontStack } from "@/lib/caption-style";
import { wrapCaption } from "@/lib/cues";
import { isRtl } from "@/lib/languages";

export function captionBoxY(
  style: CaptionStyle,
  height: number,
  blockHeight: number,
): number {
  const margin = height * 0.08;
  const offset = (style.yOffset / 100) * height;
  if (style.position === "top") return margin + offset;
  if (style.position === "center") return height / 2 - blockHeight / 2 + offset;
  return height - margin - blockHeight + offset;
}

export function drawCaption(
  ctx: CanvasRenderingContext2D,
  text: string,
  style: CaptionStyle,
  width: number,
  height: number,
  lang = "es",
) {
  const lines = wrapCaption(text, style.uppercase ? 34 : 42);
  if (!lines.length) return;

  const display = style.uppercase ? lines.map((l) => l.toUpperCase()) : lines;
  const fontPx = Math.max(12, (style.fontSize / 100) * height);
  const font = `${style.fontWeight} ${fontPx}px ${fontStack(style.fontId)}`;
  ctx.font = font;
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  const rtl = isRtl(lang);
  ctx.direction = rtl ? "rtl" : "ltr";

  const gap = fontPx * (style.lineHeight - 1);
  const lineHeights = display.map(() => fontPx);
  const textWidths = display.map((line) => ctx.measureText(line).width);
  const contentW = Math.max(...textWidths, 0);
  const contentH = display.length * fontPx + Math.max(0, display.length - 1) * gap;

  const maxW = (style.maxWidth / 100) * width;
  const padX = style.boxEnabled ? style.boxPaddingX * (height / 720) : 0;
  const padY = style.boxEnabled ? style.boxPaddingY * (height / 720) : 0;
  const boxW = Math.min(maxW, contentW + padX * 2);
  const boxH = contentH + padY * 2;

  let boxX: number;
  if (style.align === "left") boxX = width * 0.08;
  else if (style.align === "right") boxX = width - width * 0.08 - boxW;
  else boxX = (width - boxW) / 2;

  const boxY = captionBoxY(style, height, boxH);

  if (style.boxEnabled) {
    ctx.save();
    ctx.fillStyle = hexToRgba(style.boxColor, style.boxOpacity);
    roundRect(ctx, boxX, boxY, boxW, boxH, style.boxRadius * (height / 720));
    ctx.fill();
    ctx.restore();
  }

  ctx.save();
  ctx.font = font;
  ctx.letterSpacing = `${style.letterSpacing * fontPx}px`;
  const shadowA = Math.round(style.shadowOpacity * 255)
    .toString(16)
    .padStart(2, "0");
  ctx.shadowColor = `${style.shadowColor}${shadowA}`;
  ctx.shadowBlur = style.shadowBlur * (height / 720);
  ctx.shadowOffsetX = style.shadowOffsetX * (height / 720);
  ctx.shadowOffsetY = style.shadowOffsetY * (height / 720);
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;
  ctx.strokeStyle = style.outlineColor;
  ctx.fillStyle = style.color;
  ctx.lineWidth = style.outlineWidth * (height / 720) * 2;

  display.forEach((line, i) => {
    const y = boxY + padY + i * (fontPx + gap);
    const tw = ctx.measureText(line).width;
    let x = boxX + padX;
    if (style.align === "center") x = boxX + (boxW - tw) / 2;
    if (style.align === "right") x = boxX + boxW - padX - tw;
    if (style.outlineWidth > 0) ctx.strokeText(line, x, y);
    ctx.fillText(line, x, y);
  });
  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = Number.parseInt(full.slice(0, 6), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
