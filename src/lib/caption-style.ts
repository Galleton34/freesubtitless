export type CaptionAlign = "left" | "center" | "right";
export type CaptionPosition = "top" | "center" | "bottom";

export type CaptionStyle = {
  fontId: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  lineHeight: number;
  uppercase: boolean;
  color: string;
  outlineColor: string;
  outlineWidth: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowOpacity: number;
  boxEnabled: boolean;
  boxColor: string;
  boxOpacity: number;
  boxPaddingX: number;
  boxPaddingY: number;
  boxRadius: number;
  position: CaptionPosition;
  yOffset: number;
  align: CaptionAlign;
  maxWidth: number;
};

export const DEFAULT_STYLE: CaptionStyle = {
  fontId: "noto",
  fontSize: 5.4,
  fontWeight: 600,
  letterSpacing: 0.02,
  lineHeight: 1.25,
  uppercase: false,
  color: "#f7f3ea",
  outlineColor: "#0c0b0a",
  outlineWidth: 2.2,
  shadowColor: "#000000",
  shadowBlur: 8,
  shadowOffsetX: 0,
  shadowOffsetY: 2,
  shadowOpacity: 0.55,
  boxEnabled: false,
  boxColor: "#0c0b0a",
  boxOpacity: 0.62,
  boxPaddingX: 14,
  boxPaddingY: 8,
  boxRadius: 6,
  position: "bottom",
  yOffset: 0,
  align: "center",
  maxWidth: 82,
};

export type StylePreset = {
  id: string;
  name: string;
  nameEn: string;
  style: Partial<CaptionStyle>;
};

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "clasico",
    name: "Clásico",
    nameEn: "Classic",
    style: {
      fontId: "noto",
      fontSize: 5.4,
      fontWeight: 600,
      letterSpacing: 0.02,
      uppercase: false,
      color: "#f7f3ea",
      outlineColor: "#0c0b0a",
      outlineWidth: 2.2,
      shadowOpacity: 0.55,
      shadowBlur: 8,
      boxEnabled: false,
      position: "bottom",
      align: "center",
    },
  },
  {
    id: "caja",
    name: "Caja",
    nameEn: "Box",
    style: {
      fontId: "figtree",
      fontSize: 4.8,
      fontWeight: 600,
      letterSpacing: 0.01,
      uppercase: false,
      color: "#f7f3ea",
      outlineWidth: 0,
      shadowOpacity: 0.15,
      boxEnabled: true,
      boxColor: "#0c0b0a",
      boxOpacity: 0.72,
      boxPaddingX: 16,
      boxPaddingY: 9,
      boxRadius: 8,
      position: "bottom",
      align: "center",
    },
  },
  {
    id: "editorial",
    name: "Editorial",
    nameEn: "Editorial",
    style: {
      fontId: "fraunces",
      fontSize: 5.8,
      fontWeight: 500,
      letterSpacing: 0,
      uppercase: false,
      color: "#f3efe6",
      outlineWidth: 0,
      shadowColor: "#0c0b0a",
      shadowBlur: 14,
      shadowOffsetY: 3,
      shadowOpacity: 0.7,
      boxEnabled: false,
      position: "bottom",
      align: "center",
    },
  },
  {
    id: "cartelera",
    name: "Cartelera",
    nameEn: "Billboard",
    style: {
      fontId: "bebas",
      fontSize: 7.2,
      fontWeight: 400,
      letterSpacing: 0.08,
      uppercase: true,
      color: "#f7f3ea",
      outlineColor: "#0c0b0a",
      outlineWidth: 1.6,
      shadowOpacity: 0.4,
      boxEnabled: false,
      position: "bottom",
      align: "center",
    },
  },
  {
    id: "documental",
    name: "Documental",
    nameEn: "Documentary",
    style: {
      fontId: "outfit",
      fontSize: 4.2,
      fontWeight: 500,
      letterSpacing: 0.01,
      uppercase: false,
      color: "#f3efe6",
      outlineWidth: 0,
      shadowBlur: 6,
      shadowOpacity: 0.5,
      boxEnabled: true,
      boxColor: "#0c0b0a",
      boxOpacity: 0.45,
      boxPaddingX: 12,
      boxPaddingY: 6,
      boxRadius: 4,
      position: "bottom",
      align: "left",
      maxWidth: 70,
      yOffset: -2,
    },
  },
];

export const CAPTION_FONTS: { id: string; label: string; family: string; stack: string }[] =
  [
    { id: "noto", label: "Noto Sans", family: "Noto Sans", stack: '"Noto Sans", sans-serif' },
    { id: "figtree", label: "Figtree", family: "Figtree", stack: '"Figtree", sans-serif' },
    { id: "outfit", label: "Outfit", family: "Outfit", stack: '"Outfit", sans-serif' },
    { id: "montserrat", label: "Montserrat", family: "Montserrat", stack: '"Montserrat", sans-serif' },
    { id: "oswald", label: "Oswald", family: "Oswald", stack: '"Oswald", sans-serif' },
    { id: "bebas", label: "Bebas Neue", family: "Bebas Neue", stack: '"Bebas Neue", sans-serif' },
    { id: "fraunces", label: "Fraunces", family: "Fraunces", stack: '"Fraunces", serif' },
    { id: "playfair", label: "Playfair", family: "Playfair Display", stack: '"Playfair Display", serif' },
    { id: "source", label: "Source Serif", family: "Source Serif 4", stack: '"Source Serif 4", serif' },
    { id: "courier", label: "Courier Prime", family: "Courier Prime", stack: '"Courier Prime", monospace' },
  ];

export function fontStack(fontId: string): string {
  return CAPTION_FONTS.find((f) => f.id === fontId)?.stack ?? '"Noto Sans", sans-serif';
}

export function fontFamilyName(fontId: string): string {
  return CAPTION_FONTS.find((f) => f.id === fontId)?.family ?? "Noto Sans";
}

export async function ensureCaptionFont(fontId: string, weight: number): Promise<void> {
  const family = fontFamilyName(fontId);
  try {
    await Promise.race([
      document.fonts.load(`${weight} 48px "${family}"`),
      new Promise<void>((resolve) => window.setTimeout(resolve, 1500)),
    ]);
  } catch {
    /* fallback stack is enough */
  }
}
