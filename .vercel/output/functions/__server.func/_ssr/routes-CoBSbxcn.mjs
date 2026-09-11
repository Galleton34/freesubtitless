import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as normalizeLang, i as languageLabel, n as TARGET_LANGUAGES, o as sameLanguage, r as isRtl, s as sttLanguageParam, t as SOURCE_LANGUAGES } from "./languages-C-qhbtQW.mjs";
import { _ as ArrowRight, a as Sparkles, b as AlignCenter, c as Play, d as LoaderCircle, f as Film, g as Captions, h as Check, i as Trash2, l as Pause, m as ChevronDown, n as Undo2, o as Share2, p as Download, s as Plus, t as Upload, u as MonitorDown, v as AlignLeft, y as AlignRight } from "../_libs/lucide-react.mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route$1, r as translateCues } from "./router-lDxc3sUC.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { i as Viewport, n as ScrollAreaScrollbar, r as ScrollAreaThumb, t as Root$1 } from "../_libs/radix-ui__react-scroll-area.mjs";
import { n as Root$2, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CoBSbxcn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatTimecode(seconds) {
	if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
	const m = Math.floor(seconds / 60);
	const s = seconds % 60;
	return `${String(m).padStart(2, "0")}:${s.toFixed(1).padStart(4, "0")}`;
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.rel = "noopener";
	a.style.display = "none";
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 2500);
}
async function shareOrDownload(blob, filename) {
	const type = blob.type || "application/octet-stream";
	const file = new File([blob], filename, { type });
	const nav = navigator;
	if (typeof nav.canShare === "function" && typeof nav.share === "function") try {
		if (nav.canShare({ files: [file] })) {
			await nav.share({
				files: [file],
				title: filename
			});
			return "shared";
		}
	} catch (err) {
		if (err.name === "AbortError") return "cancelled";
	}
	downloadBlob(blob, filename);
	return "downloaded";
}
var DEFAULT_STYLE = {
	fontId: "noto",
	fontSize: 5.4,
	fontWeight: 600,
	letterSpacing: .02,
	lineHeight: 1.25,
	uppercase: false,
	color: "#f7f3ea",
	outlineColor: "#0c0b0a",
	outlineWidth: 2.2,
	shadowColor: "#000000",
	shadowBlur: 8,
	shadowOffsetX: 0,
	shadowOffsetY: 2,
	shadowOpacity: .55,
	boxEnabled: false,
	boxColor: "#0c0b0a",
	boxOpacity: .62,
	boxPaddingX: 14,
	boxPaddingY: 8,
	boxRadius: 6,
	position: "bottom",
	yOffset: 0,
	align: "center",
	maxWidth: 82
};
var STYLE_PRESETS = [
	{
		id: "clasico",
		name: "Clásico",
		nameEn: "Classic",
		style: {
			fontId: "noto",
			fontSize: 5.4,
			fontWeight: 600,
			letterSpacing: .02,
			uppercase: false,
			color: "#f7f3ea",
			outlineColor: "#0c0b0a",
			outlineWidth: 2.2,
			shadowOpacity: .55,
			shadowBlur: 8,
			boxEnabled: false,
			position: "bottom",
			align: "center"
		}
	},
	{
		id: "caja",
		name: "Caja",
		nameEn: "Box",
		style: {
			fontId: "figtree",
			fontSize: 4.8,
			fontWeight: 600,
			letterSpacing: .01,
			uppercase: false,
			color: "#f7f3ea",
			outlineWidth: 0,
			shadowOpacity: .15,
			boxEnabled: true,
			boxColor: "#0c0b0a",
			boxOpacity: .72,
			boxPaddingX: 16,
			boxPaddingY: 9,
			boxRadius: 8,
			position: "bottom",
			align: "center"
		}
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
			shadowOpacity: .7,
			boxEnabled: false,
			position: "bottom",
			align: "center"
		}
	},
	{
		id: "cartelera",
		name: "Cartelera",
		nameEn: "Billboard",
		style: {
			fontId: "bebas",
			fontSize: 7.2,
			fontWeight: 400,
			letterSpacing: .08,
			uppercase: true,
			color: "#f7f3ea",
			outlineColor: "#0c0b0a",
			outlineWidth: 1.6,
			shadowOpacity: .4,
			boxEnabled: false,
			position: "bottom",
			align: "center"
		}
	},
	{
		id: "documental",
		name: "Documental",
		nameEn: "Documentary",
		style: {
			fontId: "outfit",
			fontSize: 4.2,
			fontWeight: 500,
			letterSpacing: .01,
			uppercase: false,
			color: "#f3efe6",
			outlineWidth: 0,
			shadowBlur: 6,
			shadowOpacity: .5,
			boxEnabled: true,
			boxColor: "#0c0b0a",
			boxOpacity: .45,
			boxPaddingX: 12,
			boxPaddingY: 6,
			boxRadius: 4,
			position: "bottom",
			align: "left",
			maxWidth: 70,
			yOffset: -2
		}
	}
];
var CAPTION_FONTS = [
	{
		id: "noto",
		label: "Noto Sans",
		family: "Noto Sans",
		stack: "\"Noto Sans\", sans-serif"
	},
	{
		id: "figtree",
		label: "Figtree",
		family: "Figtree",
		stack: "\"Figtree\", sans-serif"
	},
	{
		id: "outfit",
		label: "Outfit",
		family: "Outfit",
		stack: "\"Outfit\", sans-serif"
	},
	{
		id: "montserrat",
		label: "Montserrat",
		family: "Montserrat",
		stack: "\"Montserrat\", sans-serif"
	},
	{
		id: "oswald",
		label: "Oswald",
		family: "Oswald",
		stack: "\"Oswald\", sans-serif"
	},
	{
		id: "bebas",
		label: "Bebas Neue",
		family: "Bebas Neue",
		stack: "\"Bebas Neue\", sans-serif"
	},
	{
		id: "fraunces",
		label: "Fraunces",
		family: "Fraunces",
		stack: "\"Fraunces\", serif"
	},
	{
		id: "playfair",
		label: "Playfair",
		family: "Playfair Display",
		stack: "\"Playfair Display\", serif"
	},
	{
		id: "source",
		label: "Source Serif",
		family: "Source Serif 4",
		stack: "\"Source Serif 4\", serif"
	},
	{
		id: "courier",
		label: "Courier Prime",
		family: "Courier Prime",
		stack: "\"Courier Prime\", monospace"
	}
];
function fontStack(fontId) {
	return CAPTION_FONTS.find((f) => f.id === fontId)?.stack ?? "\"Noto Sans\", sans-serif";
}
function fontFamilyName(fontId) {
	return CAPTION_FONTS.find((f) => f.id === fontId)?.family ?? "Noto Sans";
}
async function ensureCaptionFont(fontId, weight) {
	const family = fontFamilyName(fontId);
	try {
		await Promise.race([document.fonts.load(`${weight} 48px "${family}"`), new Promise((resolve) => window.setTimeout(resolve, 1500))]);
	} catch {}
}
var MAX_CHARS = 84;
var MAX_DUR = 4.9;
var GAP = .55;
var MIN_DUR = .7;
function wordsToCues(words) {
	const cleaned = words.map((w) => ({
		text: w.text.trim(),
		start: w.start,
		end: Math.max(w.end, w.start + .05)
	})).filter((w) => w.text.length > 0);
	const cues = [];
	let current = [];
	let n = 0;
	const flush = () => {
		if (!current.length) return;
		const start = current[0].start;
		const end = Math.max(current[current.length - 1].end, start + MIN_DUR);
		n += 1;
		cues.push({
			id: `c${n}`,
			start,
			end,
			text: current.map((w) => w.text).join(" ").replace(/\s+/g, " ").trim()
		});
		current = [];
	};
	for (let i = 0; i < cleaned.length; i++) {
		const w = cleaned[i];
		const prev = current[current.length - 1];
		const gap = prev ? w.start - prev.end : 0;
		const dur = current.length ? w.end - current[0].start : 0;
		const chars = current.map((x) => x.text).join(" ").length + (current.length ? 1 : 0) + w.text.length;
		const punct = prev ? /[.!?…。！？]$/.test(prev.text) : false;
		if (current.length && (gap > GAP || dur > MAX_DUR || chars > MAX_CHARS || punct)) flush();
		current.push(w);
	}
	flush();
	return cues;
}
function activeCueAt(cues, time) {
	for (const cue of cues) if (time >= cue.start && time < cue.end) return cue;
	return null;
}
function wrapCaption(text, maxChars = 42) {
	const clean = text.replace(/\s+/g, " ").trim();
	if (!clean) return [];
	if (clean.length <= maxChars) return [clean];
	const words = clean.split(" ");
	const lines = [];
	let line = "";
	for (const word of words) {
		const next = line ? `${line} ${word}` : word;
		if (next.length > maxChars && line) {
			lines.push(line);
			line = word;
		} else line = next;
	}
	if (line) lines.push(line);
	if (lines.length <= 3) return lines;
	return [
		lines[0],
		lines[1],
		lines.slice(2).join(" ")
	];
}
function toSrt(cues) {
	return cues.map((cue, i) => {
		return `${i + 1}\n${srtStamp(cue.start)} --> ${srtStamp(cue.end)}\n${cue.text}\n`;
	}).join("\n");
}
function toVtt(cues) {
	return `WEBVTT\n\n${cues.map((cue) => `${vttStamp(cue.start)} --> ${vttStamp(cue.end)}\n${cue.text}`).join("\n\n")}\n`;
}
function srtStamp(seconds) {
	const { h, m, s, ms } = splitTime(seconds);
	return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
}
function vttStamp(seconds) {
	const { h, m, s, ms } = splitTime(seconds);
	return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms, 3)}`;
}
function splitTime(seconds) {
	const t = Math.max(0, seconds);
	return {
		h: Math.floor(t / 3600),
		m: Math.floor(t % 3600 / 60),
		s: Math.floor(t % 60),
		ms: Math.round(t % 1 * 1e3)
	};
}
function pad(n, w = 2) {
	return String(n).padStart(w, "0");
}
function CaptionLayer({ text, style, lang }) {
	const lines = wrapCaption(text, style.uppercase ? 34 : 42);
	if (!lines.length) return null;
	const display = style.uppercase ? lines.map((l) => l.toUpperCase()) : lines;
	const rtl = isRtl(lang);
	const justify = style.align === "left" ? "flex-start" : style.align === "right" ? "flex-end" : "center";
	const vPos = style.position === "top" ? "flex-start" : style.position === "center" ? "center" : "flex-end";
	const shadow = `${style.shadowOffsetX}px ${style.shadowOffsetY}px ${style.shadowBlur}px ${hexAlpha(style.shadowColor, style.shadowOpacity)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "caption-layer pointer-events-none absolute inset-0 flex px-[8%]",
		style: {
			alignItems: vPos,
			justifyContent: justify,
			paddingTop: style.position === "top" ? "8%" : void 0,
			paddingBottom: style.position === "bottom" ? "8%" : void 0,
			transform: `translateY(${style.yOffset}%)`
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			dir: rtl ? "rtl" : "ltr",
			className: cn("caption-text max-w-full text-pretty"),
			style: {
				fontFamily: fontStack(style.fontId),
				fontSize: `${style.fontSize}cqh`,
				fontWeight: style.fontWeight,
				letterSpacing: `${style.letterSpacing}em`,
				lineHeight: style.lineHeight,
				color: style.color,
				textAlign: style.align,
				width: `${style.maxWidth}%`,
				WebkitTextStroke: style.outlineWidth > 0 ? `${style.outlineWidth * .06}cqh ${style.outlineColor}` : "0",
				textShadow: style.shadowOpacity > 0 ? shadow : "none",
				background: style.boxEnabled ? hexAlpha(style.boxColor, style.boxOpacity) : "transparent",
				padding: style.boxEnabled ? `${style.boxPaddingY * .12}cqh ${style.boxPaddingX * .14}cqh` : 0,
				borderRadius: style.boxEnabled ? style.boxRadius : 0
			},
			children: display.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block",
				children: line
			}, i))
		})
	});
}
function hexAlpha(hex, alpha) {
	const h = hex.replace("#", "");
	const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
	const n = Number.parseInt(full.slice(0, 6), 16);
	if (Number.isNaN(n)) return `rgba(0,0,0,${alpha})`;
	return `rgba(${n >> 16 & 255}, ${n >> 8 & 255}, ${n & 255}, ${alpha})`;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-accent shadow-[var(--shadow-border)]",
			outline: "bg-transparent text-foreground shadow-[var(--shadow-border)] hover:bg-accent",
			ghost: "bg-transparent text-foreground hover:bg-accent",
			destructive: "bg-destructive text-destructive-foreground hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var copy = {
	es: {
		app: "FreeSubtiless",
		tagline: "Lo que se dijo, en el idioma que elijas.",
		blurb: "Suelta un video. Transcribimos la voz tal cual — groserías, muletillas y tono — y la traducimos sin recortar ni suavizar.",
		source: "Idioma del audio",
		target: "Subtítulos en",
		targetHint: "Los subtítulos salen en esta lengua, fieles al audio. Nada se tapa.",
		dropTitle: "Suelta el video aquí",
		dropHint: "MP4, WebM o MOV. Hasta 12 minutos.",
		browse: "Elegir archivo",
		demo: "Ver un ejemplo",
		processing: "Procesando",
		extract: "Leyendo el audio",
		transcribe: "Transcribiendo la voz",
		translate: "Traduciendo subtítulos",
		ready: "Listo",
		cancel: "Cancelar",
		generate: "Generar subtítulos",
		generating: "Generando…",
		newVideo: "Otro video",
		exportVideo: "Descargar video",
		exportSrt: "SRT",
		srtHelp: "Archivo de subtítulos para VLC, el celular o la PC. El video y los textos van por separado.",
		exportVtt: "VTT",
		exporting: "Exportando…",
		converting: "Pasando a MP4…",
		exportError: "No se pudo armar el video. Prueba de nuevo o descarga el SRT.",
		format: "Formato",
		savedMp4: "Video MP4 descargado",
		savedWebm: "Video WebM descargado",
		savedWebmFallback: "No se pudo pasar a MP4. Te dejé WebM; ábrelo en VLC.",
		install: "Instalar app",
		installTitle: "Úsala como app, no como instalador",
		installBlurb: "FreeSubtiless vive en el navegador. Descargar video te da el clip subtitulado, no un .exe ni un .apk. Para tenerla en el celular o la PC, instálala aquí: queda el icono y se abre como cualquier app.",
		installIos: "En iPhone: toca Compartir y luego Añadir a pantalla de inicio.",
		installDesktop: "En Chrome o Edge de la computadora: Instalar, o el icono ⊕ junto a la dirección.",
		installDone: "Ya está instalada en este dispositivo.",
		style: "Estilo",
		texts: "Textos",
		type: "Tipografía",
		color: "Color",
		shadow: "Sombra",
		box: "Caja",
		position: "Posición",
		presets: "Presets",
		font: "Fuente",
		size: "Tamaño",
		weight: "Peso",
		tracking: "Tracking",
		leading: "Interlineado",
		uppercase: "Mayúsculas",
		fill: "Relleno",
		outline: "Contorno",
		outlineW: "Grosor",
		blur: "Desenfoque",
		offsetX: "Despl. X",
		offsetY: "Despl. Y",
		opacity: "Opacidad",
		enabled: "Activar",
		padding: "Relleno",
		radius: "Radio",
		align: "Alineación",
		maxWidth: "Ancho máx.",
		yOffset: "Altura",
		top: "Arriba",
		center: "Centro",
		bottom: "Abajo",
		left: "Izq.",
		right: "Der.",
		addCue: "Añadir línea",
		emptyCues: "Aún no hay subtítulos. Genera a partir del audio o escribe una línea.",
		noSpeech: "No se detectó voz en el video. Puedes escribir los textos a mano.",
		aiOff: "La transcripción automática no está disponible ahora. Puedes subtitular a mano.",
		done: "Subtítulos listos",
		translatedFrom: "Traducido de {from} a {to}.",
		translateFail: "Se transcribió el audio, pero no se pudo traducir. Pulsa Generar otra vez.",
		share: "Compartir",
		detected: "Audio detectado",
		errorGeneric: "No se pudo procesar el video.",
		errorAudio: "No se pudo leer el audio. Prueba con un MP4 o WebM.",
		errorTooLong: "El video supera los 12 minutos.",
		savedVideo: "Video descargado",
		savedSrt: "Archivo SRT descargado",
		savedVtt: "Archivo VTT descargado",
		play: "Reproducir",
		pause: "Pausar",
		original: "Original",
		restore: "Dejar el original",
		uiEs: "ES",
		uiEn: "EN",
		footer: "Transcribimos lo dicho, sin recortar. El montaje queda en tu navegador."
	},
	en: {
		app: "FreeSubtiless",
		tagline: "What was said, in the language you pick.",
		blurb: "Drop a video. We transcribe the voice as spoken — swearing, fillers, tone — and translate it without cutting or softening.",
		source: "Audio language",
		target: "Captions in",
		targetHint: "Captions land in this language, faithful to the audio. Nothing is covered up.",
		dropTitle: "Drop the video here",
		dropHint: "MP4, WebM or MOV. Up to 12 minutes.",
		browse: "Choose file",
		demo: "Try a sample",
		processing: "Processing",
		extract: "Reading audio",
		transcribe: "Transcribing speech",
		translate: "Translating captions",
		ready: "Ready",
		cancel: "Cancel",
		generate: "Generate captions",
		generating: "Generating…",
		newVideo: "New video",
		exportVideo: "Download video",
		exportSrt: "SRT",
		srtHelp: "Subtitle file for VLC, phones, or computers. Video and text stay separate.",
		exportVtt: "VTT",
		exporting: "Exporting…",
		converting: "Encoding MP4…",
		exportError: "Could not build the video. Try again, or download the SRT.",
		format: "Format",
		savedMp4: "MP4 video downloaded",
		savedWebm: "WebM video downloaded",
		savedWebmFallback: "Could not make MP4. You got WebM — open it in VLC.",
		install: "Install app",
		installTitle: "Use it as an app, not an installer",
		installBlurb: "FreeSubtiless lives in the browser. Download video gives you the captioned clip, not an .exe or .apk. To keep it on your phone or computer, install it here: you get an icon and it opens like any app.",
		installIos: "On iPhone: tap Share, then Add to Home Screen.",
		installDesktop: "On Chrome or Edge on a computer: Install, or the ⊕ icon by the address bar.",
		installDone: "Already installed on this device.",
		style: "Style",
		texts: "Lines",
		type: "Type",
		color: "Color",
		shadow: "Shadow",
		box: "Box",
		position: "Position",
		presets: "Presets",
		font: "Font",
		size: "Size",
		weight: "Weight",
		tracking: "Tracking",
		leading: "Leading",
		uppercase: "Uppercase",
		fill: "Fill",
		outline: "Outline",
		outlineW: "Weight",
		blur: "Blur",
		offsetX: "Offset X",
		offsetY: "Offset Y",
		opacity: "Opacity",
		enabled: "Enable",
		padding: "Padding",
		radius: "Radius",
		align: "Align",
		maxWidth: "Max width",
		yOffset: "Height",
		top: "Top",
		center: "Center",
		bottom: "Bottom",
		left: "Left",
		right: "Right",
		addCue: "Add line",
		emptyCues: "No captions yet. Generate from audio or write a line.",
		noSpeech: "No speech was found. You can type the lines yourself.",
		aiOff: "Automatic transcription is unavailable. You can caption by hand.",
		done: "Captions ready",
		translatedFrom: "Translated from {from} to {to}.",
		translateFail: "The audio was transcribed, but translation failed. Tap Generate again.",
		share: "Share",
		detected: "Audio detected",
		errorGeneric: "Could not process the video.",
		errorAudio: "Could not read the audio. Try an MP4 or WebM file.",
		errorTooLong: "The video is longer than 12 minutes.",
		savedVideo: "Video downloaded",
		savedSrt: "SRT file downloaded",
		savedVtt: "VTT file downloaded",
		play: "Play",
		pause: "Pause",
		original: "Original",
		restore: "Use original",
		uiEs: "ES",
		uiEn: "EN",
		footer: "We transcribe what was said, uncut. The picture stays in your browser."
	}
};
var DEMO_CUES = {
	es: [
		{
			start: .4,
			end: 3.3,
			text: "La luz se queda en los cristales."
		},
		{
			start: 3.6,
			end: 6.7,
			text: "El campo pasa, y no vuelve."
		},
		{
			start: 7,
			end: 9.8,
			text: "Seguimos. Como si el día no se acabara."
		}
	],
	en: [
		{
			start: .4,
			end: 3.3,
			text: "Light stays on the glass."
		},
		{
			start: 3.6,
			end: 6.7,
			text: "The fields go by, and don't come back."
		},
		{
			start: 7,
			end: 9.8,
			text: "We keep going. As if the day would never end."
		}
	]
};
function InstallApp({ locale, compact }) {
	const t = copy[locale];
	const [promptEvent, setPromptEvent] = (0, import_react.useState)(null);
	const [installed, setInstalled] = (0, import_react.useState)(false);
	const [ios, setIos] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const standalone = window.matchMedia("(display-mode: standalone)").matches || "standalone" in navigator && Boolean(navigator.standalone);
		setInstalled(standalone);
		setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
		if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => void 0);
		const onPrompt = (e) => {
			e.preventDefault();
			setPromptEvent(e);
		};
		const onInstalled = () => {
			setInstalled(true);
			setPromptEvent(null);
		};
		window.addEventListener("beforeinstallprompt", onPrompt);
		window.addEventListener("appinstalled", onInstalled);
		return () => {
			window.removeEventListener("beforeinstallprompt", onPrompt);
			window.removeEventListener("appinstalled", onInstalled);
		};
	}, []);
	const install = async () => {
		if (!promptEvent) return;
		await promptEvent.prompt();
		if ((await promptEvent.userChoice).outcome === "accepted") setInstalled(true);
		setPromptEvent(null);
	};
	if (compact) {
		if (installed || !promptEvent && !ios) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "ghost",
			onClick: () => promptEvent ? void install() : void 0,
			title: t.install,
			"aria-label": t.install,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorDown, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden sm:inline",
				children: t.install
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-foreground",
				children: t.installTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
				children: t.installBlurb
			}),
			installed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-foreground",
				children: t.installDone
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [promptEvent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => void install(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorDown, { className: "size-4" }), t.install]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed text-muted-foreground",
					children: ios ? t.installIos : t.installDesktop
				})]
			})
		]
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-xs font-medium tracking-wide text-muted-foreground", className),
		...props
	});
}
function Select({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$1, { ...props });
}
function SelectValue({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue$1, { ...props });
}
function SelectTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
		className: cn("flex h-11 w-full items-center justify-between gap-2 rounded-md bg-input px-3 text-sm text-foreground shadow-[var(--shadow-border)] outline-none transition-[box-shadow] focus-visible:ring-2 focus-visible:ring-ring/60 disabled:opacity-50 data-[placeholder]:text-muted-foreground", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-muted-foreground" })
		})]
	});
}
function SelectContent({ className, children, position = "popper", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
		position,
		className: cn("relative z-50 max-h-72 min-w-[8rem] overflow-hidden rounded-lg bg-card text-card-foreground shadow-[var(--shadow-elevated)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: "p-1",
			children
		})
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
		className: cn("relative flex w-full cursor-pointer items-center rounded-md py-2 pr-8 pl-2 text-sm outline-none select-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, {
			className: "absolute right-2 inline-flex",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
		})]
	});
}
function LanguagePair({ locale, source, target, onSource, onTarget, compact }) {
	const t = copy[locale];
	const name = (code, list) => {
		const item = list.find((l) => l.code === code);
		if (!item) return code;
		return locale === "en" ? item.nameEn : item.name;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: compact ? "flex min-w-0 items-end gap-2" : "grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 space-y-1.5",
				children: [!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "source-lang",
					children: t.source
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: source,
					onValueChange: onSource,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						id: "source-lang",
						className: compact ? "h-10" : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { children: name(source, SOURCE_LANGUAGES) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SOURCE_LANGUAGES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: l.code,
						children: locale === "en" ? l.nameEn : l.name
					}, l.code)) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "mb-3 hidden size-4 text-muted-foreground sm:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 space-y-1.5",
				children: [
					!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "target-lang",
						children: t.target
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: target,
						onValueChange: onTarget,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "target-lang",
							className: compact ? "h-10" : void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { children: name(target, TARGET_LANGUAGES) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: TARGET_LANGUAGES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: l.code,
							children: locale === "en" ? l.nameEn : l.name
						}, l.code)) })]
					}),
					!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-snug text-muted-foreground",
						children: t.targetHint
					})
				]
			})
		]
	});
}
function loadLocale() {
	if (typeof window === "undefined") return "es";
	const saved = window.localStorage.getItem("linea-locale");
	if (saved === "en" || saved === "es") return saved;
	return "es";
}
var useStudio = create((set, get) => ({
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
		} catch {}
		set({ locale });
	},
	setLangs: (sourceLang, targetLang) => set({
		sourceLang,
		targetLang
	}),
	setAiAvailable: (aiAvailable) => set({ aiAvailable }),
	setExportFormat: (exportFormat) => set({ exportFormat }),
	setTime: (currentTime, duration) => set(duration !== void 0 ? {
		currentTime,
		duration
	} : { currentTime }),
	selectCue: (selectedCueId) => set({ selectedCueId }),
	updateStyle: (partial) => set({ style: {
		...get().style,
		...partial
	} }),
	applyPreset: (id) => {
		const preset = STYLE_PRESETS.find((p) => p.id === id);
		if (!preset) return;
		set({ style: {
			...DEFAULT_STYLE,
			...preset.style
		} });
	},
	updateCue: (id, patch) => set({ cues: get().cues.map((c) => c.id === id ? {
		...c,
		...patch
	} : c) }),
	addCue: () => {
		const { cues, duration, currentTime } = get();
		const start = currentTime || (cues.at(-1)?.end ?? 0) + .15;
		const end = Math.min(duration || start + 2.2, start + 2.2);
		const id = `c${Date.now()}`;
		const cue = {
			id,
			start,
			end: Math.max(end, start + .8),
			text: ""
		};
		set({
			cues: [...cues, cue].sort((a, b) => a.start - b.start),
			selectedCueId: id
		});
	},
	removeCue: (id) => set({ cues: get().cues.filter((c) => c.id !== id) }),
	loadVideo: ({ url, name, file, demo, locale }) => {
		const prev = get().videoUrl;
		if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
		const cues = demo ? DEMO_CUES[locale].map((c, i) => ({
			id: `d${i + 1}`,
			start: c.start,
			end: c.end,
			text: c.text
		})) : [];
		set({
			videoUrl: url,
			videoName: name,
			file,
			isDemo: Boolean(demo),
			cues,
			status: demo ? "ready" : "idle",
			step: null,
			progress: 0,
			detectedLang: demo ? locale === "en" ? "en" : "es" : null,
			selectedCueId: cues[0]?.id ?? null,
			currentTime: 0
		});
	},
	setProcess: (status, step = null, progress = 0) => set({
		status,
		step,
		progress
	}),
	setCues: (cues, detected) => set({
		cues,
		detectedLang: detected ?? get().detectedLang,
		selectedCueId: cues[0]?.id ?? null,
		status: "ready",
		step: null,
		progress: 1
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
			duration: 0
		});
	}
}));
function initLocale() {
	useStudio.getState().setLocale(loadLocale());
}
var ACCEPT = "video/mp4,video/webm,video/quicktime,video/x-matroska,.mp4,.webm,.mov,.mkv";
function Landing({ locale, onFile, onDemo }) {
	const t = copy[locale];
	const sourceLang = useStudio((s) => s.sourceLang);
	const targetLang = useStudio((s) => s.targetLang);
	const setLangs = useStudio((s) => s.setLangs);
	const inputRef = (0, import_react.useRef)(null);
	const [over, setOver] = (0, import_react.useState)(false);
	const sample = (0, import_react.useMemo)(() => DEMO_CUES[locale][0]?.text ?? "", [locale]);
	const take = (file) => {
		if (file && file.type.startsWith("video")) onFile(file);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "film-grain mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 py-6 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleToggle, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl leading-tight tracking-[-0.03em] text-foreground sm:text-5xl",
							children: t.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-base leading-relaxed text-muted-foreground",
							children: t.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePair, {
								locale,
								source: sourceLang,
								target: targetLang,
								onSource: (v) => setLangs(v, targetLang),
								onTarget: (v) => setLangs(sourceLang, v)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							onDragOver: (e) => {
								e.preventDefault();
								setOver(true);
							},
							onDragLeave: () => setOver(false),
							onDrop: (e) => {
								e.preventDefault();
								setOver(false);
								take(e.dataTransfer.files[0]);
							},
							className: `mt-6 flex w-full cursor-pointer rounded-2xl bg-card p-5 text-left shadow-[var(--shadow-border)] transition-[box-shadow] ${over ? "shadow-[var(--shadow-elevated)]" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputRef,
								type: "file",
								accept: ACCEPT,
								className: "sr-only",
								tabIndex: -1,
								"aria-hidden": "true",
								suppressHydrationWarning: true,
								onChange: (e) => take(e.target.files?.[0])
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex size-12 items-center justify-center rounded-lg bg-secondary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: t.dropTitle
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: t.dropHint
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground",
										children: t.browse
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onDemo,
							className: "mt-4 inline-flex h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "size-4" }), t.demo]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-video overflow-hidden rounded-2xl bg-black shadow-[var(--shadow-elevated)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							src: "/demo.mp4",
							className: "h-full w-full object-cover",
							autoPlay: true,
							muted: true,
							loop: true,
							playsInline: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptionLayer, {
							text: sample,
							style: DEFAULT_STYLE,
							lang: locale === "en" ? "en" : "es"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallApp, { locale }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pb-4 pt-6 text-xs leading-relaxed text-muted-foreground",
				children: t.footer
			})
		]
	});
}
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-8 items-center justify-center rounded-md bg-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-1.5 w-4 rounded-full bg-primary-foreground" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-lg tracking-tight sm:text-xl",
			children: "FreeSubtiless"
		})]
	});
}
function LocaleToggle() {
	const locale = useStudio((s) => s.locale);
	const setLocale = useStudio((s) => s.setLocale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex rounded-md bg-secondary p-0.5 shadow-[var(--shadow-border)]",
		children: ["es", "en"].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setLocale(l),
			className: `h-8 min-w-10 rounded px-2 text-xs font-medium ${locale === l ? "bg-card text-foreground" : "text-muted-foreground"}`,
			children: l.toUpperCase()
		}, l))
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-input px-3 text-sm text-foreground shadow-[var(--shadow-border)] outline-none transition-[box-shadow] placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/60 disabled:opacity-50", className),
		...props
	});
}
function ScrollArea({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root$1, {
		className: cn("relative overflow-hidden", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
			orientation: "vertical",
			className: "flex touch-none select-none p-0.5 transition-colors w-2.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
		})]
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-20 w-full rounded-md bg-input px-3 py-2 text-sm text-foreground shadow-[var(--shadow-border)] outline-none transition-[box-shadow] placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/60 disabled:opacity-50", className),
		...props
	});
}
function CueEditor({ locale, onSeek }) {
	const t = copy[locale];
	const cues = useStudio((s) => s.cues);
	const selected = useStudio((s) => s.selectedCueId);
	const selectCue = useStudio((s) => s.selectCue);
	const updateCue = useStudio((s) => s.updateCue);
	const addCue = useStudio((s) => s.addCue);
	const removeCue = useStudio((s) => s.removeCue);
	const currentTime = useStudio((s) => s.currentTime);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
				children: t.texts
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: addCue,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), t.addCue]
			})]
		}), cues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-4 pb-4 text-sm text-muted-foreground",
			children: t.emptyCues
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "min-h-0 flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2 px-3 pb-6",
				children: cues.map((cue) => {
					const active = currentTime >= cue.start && currentTime < cue.end;
					const open = selected === cue.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("rounded-lg bg-secondary p-2 shadow-[var(--shadow-border)]", (active || open) && "ring-1 ring-primary/40"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center gap-2 px-1 py-1 text-left",
							onClick: () => {
								selectCue(cue.id);
								onSeek(cue.start);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[11px] tabular-nums text-muted-foreground",
								children: [
									formatTimecode(cue.start),
									"–",
									formatTimecode(cue.end)
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate text-sm",
								children: cue.text || "…"
							})]
						}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										step: "0.1",
										min: 0,
										value: cue.start.toFixed(1),
										onChange: (e) => updateCue(cue.id, { start: Number(e.target.value) }),
										"aria-label": "start"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										step: "0.1",
										min: 0,
										value: cue.end.toFixed(1),
										onChange: (e) => updateCue(cue.id, { end: Number(e.target.value) }),
										"aria-label": "end"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: cue.text,
									onChange: (e) => updateCue(cue.id, { text: e.target.value })
								}),
								cue.original && cue.original !== cue.text && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											t.original,
											": ",
											cue.original
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => updateCue(cue.id, { text: cue.original }),
										children: t.restore
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									className: "text-destructive",
									onClick: () => removeCue(cue.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								})
							]
						})]
					}, cue.id);
				})
			})
		})]
	});
}
function Progress({ className, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$2, {
		className: cn("relative h-1 w-full overflow-hidden rounded-full bg-accent", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			className: "h-full w-full bg-primary transition-transform duration-300 ease-out",
			style: { transform: `translateX(-${100 - (value ?? 0)}%)` }
		})
	});
}
function ProcessOverlay({ locale, onCancel }) {
	const t = copy[locale];
	const step = useStudio((s) => s.step);
	const progress = useStudio((s) => s.progress);
	const steps = [
		"extract",
		"transcribe",
		"translate"
	];
	const labels = {
		extract: t.extract,
		transcribe: t.transcribe,
		translate: t.translate
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-center justify-center bg-background/80 p-6 backdrop-blur-[2px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-2xl bg-card p-6 shadow-[var(--shadow-elevated)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl text-foreground",
					children: t.processing
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 space-y-3",
					children: steps.map((s) => {
						const active = step === s;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: active || s === "extract" && (step === "transcribe" || step === "translate") || s === "transcribe" && step === "translate" ? "text-sm text-foreground" : "text-sm text-muted-foreground",
								children: labels[s]
							}), active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs tabular-nums text-muted-foreground",
								children: [Math.round(progress * 100), "%"]
							})]
						}, s);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					className: "mt-5",
					value: Math.round(progress * 100)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "mt-4 w-full",
					onClick: onCancel,
					children: t.cancel
				})
			]
		})
	});
}
function Slider({ className, ...props }) {
	const value = props.value ?? props.defaultValue ?? [0];
	const count = Array.isArray(value) ? value.length : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1 w-full grow overflow-hidden rounded-full bg-accent",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
		}), Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full bg-primary shadow-sm outline-none ring-ring/50 transition-[box-shadow] focus-visible:ring-2" }, i))]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-10 shrink-0 items-center rounded-full bg-accent shadow-[var(--shadow-border)] transition-colors data-[state=checked]:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-foreground transition-transform data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-primary-foreground" })
	});
}
function StylePanel({ locale }) {
	const t = copy[locale];
	const style = useStudio((s) => s.style);
	const update = useStudio((s) => s.updateStyle);
	const applyPreset = useStudio((s) => s.applyPreset);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6 p-4 pb-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
						children: t.presets
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5",
						children: STYLE_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => applyPreset(p.id),
							className: "h-8 rounded-md bg-secondary px-2.5 text-xs text-secondary-foreground shadow-[var(--shadow-border)] hover:bg-accent",
							children: locale === "en" ? p.nameEn : p.name
						}, p.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
							children: t.type
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t.font,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: style.fontId,
								onValueChange: (fontId) => update({ fontId }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CAPTION_FONTS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: f.id,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { fontFamily: f.stack },
										children: f.label
									})
								}, f.id)) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.size,
							value: style.fontSize,
							min: 3,
							max: 10,
							step: .1,
							display: style.fontSize.toFixed(1),
							onChange: (fontSize) => update({ fontSize })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.weight,
							value: style.fontWeight,
							min: 400,
							max: 700,
							step: 100,
							display: String(style.fontWeight),
							onChange: (fontWeight) => update({ fontWeight })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.tracking,
							value: style.letterSpacing,
							min: -.04,
							max: .18,
							step: .01,
							display: style.letterSpacing.toFixed(2),
							onChange: (letterSpacing) => update({ letterSpacing })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.leading,
							value: style.lineHeight,
							min: 1,
							max: 1.8,
							step: .05,
							display: style.lineHeight.toFixed(2),
							onChange: (lineHeight) => update({ lineHeight })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: t.uppercase,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: style.uppercase,
								onCheckedChange: (uppercase) => update({ uppercase })
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
							children: t.color
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: t.fill,
							value: style.color,
							onChange: (color) => update({ color })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: t.outline,
							value: style.outlineColor,
							onChange: (outlineColor) => update({ outlineColor })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.outlineW,
							value: style.outlineWidth,
							min: 0,
							max: 6,
							step: .1,
							display: style.outlineWidth.toFixed(1),
							onChange: (outlineWidth) => update({ outlineWidth })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
							children: t.shadow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: t.shadow,
							value: style.shadowColor,
							onChange: (shadowColor) => update({ shadowColor })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.blur,
							value: style.shadowBlur,
							min: 0,
							max: 24,
							step: 1,
							display: String(style.shadowBlur),
							onChange: (shadowBlur) => update({ shadowBlur })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.offsetX,
							value: style.shadowOffsetX,
							min: -12,
							max: 12,
							step: 1,
							display: String(style.shadowOffsetX),
							onChange: (shadowOffsetX) => update({ shadowOffsetX })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.offsetY,
							value: style.shadowOffsetY,
							min: -12,
							max: 12,
							step: 1,
							display: String(style.shadowOffsetY),
							onChange: (shadowOffsetY) => update({ shadowOffsetY })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.opacity,
							value: style.shadowOpacity,
							min: 0,
							max: 1,
							step: .05,
							display: style.shadowOpacity.toFixed(2),
							onChange: (shadowOpacity) => update({ shadowOpacity })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
							children: t.box
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: t.enabled,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: style.boxEnabled,
								onCheckedChange: (boxEnabled) => update({ boxEnabled })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							label: t.fill,
							value: style.boxColor,
							onChange: (boxColor) => update({ boxColor })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.opacity,
							value: style.boxOpacity,
							min: 0,
							max: 1,
							step: .05,
							display: style.boxOpacity.toFixed(2),
							onChange: (boxOpacity) => update({ boxOpacity })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.padding,
							value: style.boxPaddingX,
							min: 4,
							max: 28,
							step: 1,
							display: String(style.boxPaddingX),
							onChange: (v) => update({
								boxPaddingX: v,
								boxPaddingY: Math.round(v * .6)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.radius,
							value: style.boxRadius,
							min: 0,
							max: 20,
							step: 1,
							display: String(style.boxRadius),
							onChange: (boxRadius) => update({ boxRadius })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
							children: t.position
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-1.5",
							children: [
								"top",
								"center",
								"bottom"
							].map((pos) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => update({ position: pos }),
								className: cn("h-9 rounded-md text-xs shadow-[var(--shadow-border)]", style.position === pos ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"),
								children: pos === "top" ? t.top : pos === "center" ? t.center : t.bottom
							}, pos))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1.5",
							children: [
								"left",
								"center",
								"right"
							].map((align) => {
								const Icon = align === "left" ? AlignLeft : align === "right" ? AlignRight : AlignCenter;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => update({ align }),
									"aria-label": align,
									className: cn("flex h-11 flex-1 items-center justify-center rounded-md shadow-[var(--shadow-border)]", style.align === align ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
								}, align);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.yOffset,
							value: style.yOffset,
							min: -18,
							max: 18,
							step: 1,
							display: `${style.yOffset}`,
							onChange: (yOffset) => update({ yOffset })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: t.maxWidth,
							value: style.maxWidth,
							min: 50,
							max: 94,
							step: 1,
							display: `${style.maxWidth}%`,
							onChange: (maxWidth) => update({ maxWidth })
						})
					]
				})
			]
		})
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function Row({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-11 items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function SliderField({ label, value, min, max, step, display, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs tabular-nums text-muted-foreground",
				children: display
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
			min,
			max,
			step,
			value: [value],
			onValueChange: (v) => onChange(v[0] ?? value)
		})]
	});
}
function ColorField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-11 items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-muted-foreground",
				children: value
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "color",
				value,
				onChange: (e) => onChange(e.target.value),
				className: "size-8 overflow-hidden rounded-md shadow-[var(--shadow-border)]",
				"aria-label": label
			})]
		})]
	});
}
function Tabs({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		className: cn("flex flex-col", className),
		...props
	});
}
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-11 items-center gap-1 rounded-lg bg-secondary p-1", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex h-9 flex-1 items-center justify-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors data-[state=active]:bg-card data-[state=active]:text-foreground", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("outline-none", className),
		...props
	});
}
function VideoStage({ locale, videoRef }) {
	const t = copy[locale];
	const videoUrl = useStudio((s) => s.videoUrl);
	const cues = useStudio((s) => s.cues);
	const style = useStudio((s) => s.style);
	const targetLang = useStudio((s) => s.targetLang);
	const currentTime = useStudio((s) => s.currentTime);
	const duration = useStudio((s) => s.duration);
	const setTime = useStudio((s) => s.setTime);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const stageRef = (0, import_react.useRef)(null);
	const overlayRef = (0, import_react.useRef)(null);
	const cue = activeCueAt(cues, currentTime);
	(0, import_react.useEffect)(() => {
		const el = videoRef.current;
		if (!el) return;
		const onTime = () => setTime(el.currentTime, el.duration || 0);
		const onPlay = () => setPlaying(true);
		const onPause = () => setPlaying(false);
		el.addEventListener("timeupdate", onTime);
		el.addEventListener("loadedmetadata", onTime);
		el.addEventListener("play", onPlay);
		el.addEventListener("pause", onPause);
		el.addEventListener("ended", onPause);
		return () => {
			el.removeEventListener("timeupdate", onTime);
			el.removeEventListener("loadedmetadata", onTime);
			el.removeEventListener("play", onPlay);
			el.removeEventListener("pause", onPause);
			el.removeEventListener("ended", onPause);
		};
	}, [
		setTime,
		videoRef,
		videoUrl
	]);
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		const stage = stageRef.current;
		const overlay = overlayRef.current;
		if (!video || !stage || !overlay) return;
		const sync = () => {
			const vr = video.getBoundingClientRect();
			const sr = stage.getBoundingClientRect();
			overlay.style.width = `${vr.width}px`;
			overlay.style.height = `${vr.height}px`;
			overlay.style.left = `${vr.left - sr.left}px`;
			overlay.style.top = `${vr.top - sr.top}px`;
		};
		sync();
		video.addEventListener("loadedmetadata", sync);
		const ro = new ResizeObserver(sync);
		ro.observe(video);
		ro.observe(stage);
		return () => {
			ro.disconnect();
			video.removeEventListener("loadedmetadata", sync);
		};
	}, [videoRef, videoUrl]);
	const toggle = () => {
		const el = videoRef.current;
		if (!el) return;
		if (el.paused) el.play();
		else el.pause();
	};
	const seek = (tsec) => {
		const el = videoRef.current;
		if (!el) return;
		el.currentTime = tsec;
		setTime(tsec, el.duration || duration);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: stageRef,
			className: "relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-xl bg-black shadow-[var(--shadow-elevated)]",
			children: videoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src: videoUrl,
				className: "max-h-full max-w-full object-contain",
				playsInline: true,
				onClick: toggle
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: overlayRef,
				className: "pointer-events-none absolute overflow-hidden",
				children: cue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptionLayer, {
					text: cue.text,
					style,
					lang: targetLang
				}) : null
			})] }) : null
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 px-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					variant: "secondary",
					className: "size-11 shrink-0",
					onClick: toggle,
					"aria-label": playing ? t.pause : t.play,
					children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5 size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 0,
					max: Math.max(duration, .1),
					step: .05,
					value: [currentTime],
					onValueChange: (v) => seek(v[0] ?? 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "w-24 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground",
					children: [
						formatTimecode(currentTime),
						" / ",
						formatTimecode(duration)
					]
				})
			]
		})]
	});
}
function captionBoxY(style, height, blockHeight) {
	const margin = height * .08;
	const offset = style.yOffset / 100 * height;
	if (style.position === "top") return margin + offset;
	if (style.position === "center") return height / 2 - blockHeight / 2 + offset;
	return height - margin - blockHeight + offset;
}
function drawCaption(ctx, text, style, width, height, lang = "es") {
	const lines = wrapCaption(text, style.uppercase ? 34 : 42);
	if (!lines.length) return;
	const display = style.uppercase ? lines.map((l) => l.toUpperCase()) : lines;
	const fontPx = Math.max(12, style.fontSize / 100 * height);
	const font = `${style.fontWeight} ${fontPx}px ${fontStack(style.fontId)}`;
	ctx.font = font;
	ctx.textBaseline = "top";
	ctx.textAlign = "left";
	ctx.direction = isRtl(lang) ? "rtl" : "ltr";
	const gap = fontPx * (style.lineHeight - 1);
	display.map(() => fontPx);
	const textWidths = display.map((line) => ctx.measureText(line).width);
	const contentW = Math.max(...textWidths, 0);
	const contentH = display.length * fontPx + Math.max(0, display.length - 1) * gap;
	const maxW = style.maxWidth / 100 * width;
	const padX = style.boxEnabled ? style.boxPaddingX * (height / 720) : 0;
	const padY = style.boxEnabled ? style.boxPaddingY * (height / 720) : 0;
	const boxW = Math.min(maxW, contentW + padX * 2);
	const boxH = contentH + padY * 2;
	let boxX;
	if (style.align === "left") boxX = width * .08;
	else if (style.align === "right") boxX = width - width * .08 - boxW;
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
	const shadowA = Math.round(style.shadowOpacity * 255).toString(16).padStart(2, "0");
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
function roundRect(ctx, x, y, w, h, r) {
	const radius = Math.max(0, Math.min(r, w / 2, h / 2));
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.arcTo(x + w, y, x + w, y + h, radius);
	ctx.arcTo(x + w, y + h, x, y + h, radius);
	ctx.arcTo(x, y + h, x, y, radius);
	ctx.arcTo(x, y, x + w, y, radius);
	ctx.closePath();
}
function hexToRgba(hex, alpha) {
	const h = hex.replace("#", "");
	const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
	const n = Number.parseInt(full.slice(0, 6), 16);
	return `rgba(${n >> 16 & 255}, ${n >> 8 & 255}, ${n & 255}, ${alpha})`;
}
function pickMime(hasAudio, preferred) {
	const webm = hasAudio ? [
		{
			mime: "video/webm;codecs=vp9,opus",
			ext: "webm"
		},
		{
			mime: "video/webm;codecs=vp8,opus",
			ext: "webm"
		},
		{
			mime: "video/webm",
			ext: "webm"
		}
	] : [
		{
			mime: "video/webm;codecs=vp9",
			ext: "webm"
		},
		{
			mime: "video/webm;codecs=vp8",
			ext: "webm"
		},
		{
			mime: "video/webm",
			ext: "webm"
		}
	];
	const mp4 = hasAudio ? [{
		mime: "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
		ext: "mp4"
	}, {
		mime: "video/mp4",
		ext: "mp4"
	}] : [{
		mime: "video/mp4;codecs=avc1.42E01E",
		ext: "mp4"
	}, {
		mime: "video/mp4",
		ext: "mp4"
	}];
	const types = preferred === "webm" ? [...webm, ...mp4] : [...webm, ...mp4];
	for (const t of types) if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t.mime)) return t;
	return {
		mime: "video/webm",
		ext: "webm"
	};
}
function audioTracksFrom(video) {
	const el = video;
	try {
		return ((el.captureStream?.() ?? el.mozCaptureStream?.())?.getAudioTracks() ?? []).map((t) => t.clone());
	} catch {
		return [];
	}
}
async function exportCaptionedVideo(opts) {
	const { video, cues, style, lang, onProgress, signal } = opts;
	const wanted = opts.format ?? "mp4";
	if (typeof MediaRecorder === "undefined") throw new Error("NO_RECORDER");
	await ensureCaptionFont(style.fontId, style.fontWeight);
	const w = video.videoWidth || 1280;
	const h = video.videoHeight || 720;
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("No canvas");
	const startAt = video.currentTime;
	const wasMuted = video.muted;
	const wasPaused = video.paused;
	video.pause();
	await seekTo(video, 0);
	ctx.drawImage(video, 0, 0, w, h);
	const cue0 = activeCueAt(cues, 0);
	if (cue0) drawCaption(ctx, cue0.text, style, w, h, lang);
	const canvasStream = canvas.captureStream(0);
	const mixed = new MediaStream();
	for (const t of canvasStream.getVideoTracks()) mixed.addTrack(t);
	const frameTrack = canvasStream.getVideoTracks()[0];
	const clonedAudio = audioTracksFrom(video);
	for (const t of clonedAudio) mixed.addTrack(t);
	const { mime, ext } = pickMime(clonedAudio.length > 0, wanted);
	const recorder = makeRecorder(mixed, mime);
	const chunks = [];
	recorder.ondataavailable = (e) => {
		if (e.data.size > 0) chunks.push(e.data);
	};
	if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
	try {
		recorder.start(200);
	} catch {
		throw new Error("RECORD_FAIL");
	}
	try {
		video.muted = false;
		await playForExport(video);
	} catch {
		video.muted = true;
		await playForExport(video);
	}
	await recordUntilEnd(video, ctx, cues, style, lang, w, h, frameTrack, (p) => onProgress?.(wanted === "mp4" ? p * .7 : p), signal);
	video.pause();
	let blob = await stopRecorder(recorder, chunks, mime);
	if (!blob.size) throw new Error("RECORD_EMPTY");
	for (const t of clonedAudio) t.stop();
	for (const t of canvasStream.getTracks()) t.stop();
	video.muted = wasMuted;
	await seekTo(video, startAt).catch(() => {
		video.currentTime = startAt;
	});
	if (!wasPaused) try {
		await video.play();
	} catch {}
	let outExt = /mp4|m4v|quicktime/i.test(blob.type) || ext === "mp4" ? "mp4" : "webm";
	if (wanted === "mp4" && outExt !== "mp4") try {
		const { webmToMp4 } = await import("./to-mp4-B9TRauI3.mjs");
		blob = await webmToMp4(blob, (p) => onProgress?.(.7 + p * .3));
		outExt = "mp4";
	} catch {
		outExt = "webm";
	}
	onProgress?.(1);
	return {
		blob,
		ext: outExt
	};
}
function makeRecorder(stream, mime) {
	try {
		return new MediaRecorder(stream, {
			mimeType: mime,
			videoBitsPerSecond: 3e6
		});
	} catch {
		try {
			return new MediaRecorder(stream, { mimeType: mime });
		} catch {
			return new MediaRecorder(stream);
		}
	}
}
function stopRecorder(recorder, chunks, mime) {
	const type = recorder.mimeType || mime;
	return new Promise((resolve, reject) => {
		const finish = () => resolve(new Blob(chunks, { type }));
		if (recorder.state === "inactive") {
			finish();
			return;
		}
		const timer = window.setTimeout(finish, 2500);
		recorder.onerror = () => {
			window.clearTimeout(timer);
			reject(/* @__PURE__ */ new Error("RECORD_FAIL"));
		};
		recorder.onstop = () => {
			window.clearTimeout(timer);
			finish();
		};
		try {
			recorder.stop();
		} catch {
			window.clearTimeout(timer);
			finish();
		}
	});
}
function recordUntilEnd(video, ctx, cues, style, lang, w, h, frameTrack, onProgress, signal) {
	return new Promise((resolve, reject) => {
		const duration = Math.max(.2, Number.isFinite(video.duration) ? video.duration : .2);
		const hard = window.setTimeout(done, Math.min(duration * 1e3 + 8e3, 78e4));
		let lastTime = video.currentTime;
		let stall = 0;
		const paint = () => {
			ctx.drawImage(video, 0, 0, w, h);
			const cue = activeCueAt(cues, video.currentTime);
			if (cue) drawCaption(ctx, cue.text, style, w, h, lang);
			frameTrack.requestFrame?.();
			onProgress?.(Math.min(1, video.currentTime / duration));
		};
		const tick = window.setInterval(() => {
			if (signal?.aborted) {
				onAbort();
				return;
			}
			const t = video.currentTime;
			paint();
			if (video.ended || t >= duration - .05) {
				done();
				return;
			}
			if (Math.abs(t - lastTime) < .01) {
				stall += 33;
				if (stall > 2e3) {
					if (t >= duration - .25) {
						done();
						return;
					}
					if (video.paused) video.play().catch(() => void 0);
					stall = 0;
				}
			} else {
				stall = 0;
				lastTime = t;
			}
		}, 33);
		const onAbort = () => {
			cleanup();
			reject(new DOMException("Aborted", "AbortError"));
		};
		signal?.addEventListener("abort", onAbort, { once: true });
		video.addEventListener("ended", done, { once: true });
		function cleanup() {
			window.clearTimeout(hard);
			window.clearInterval(tick);
			video.removeEventListener("ended", done);
			signal?.removeEventListener("abort", onAbort);
		}
		function done() {
			cleanup();
			paint();
			onProgress?.(1);
			resolve();
		}
	});
}
async function playForExport(video) {
	const p = video.play();
	if (p) await p;
}
function seekTo(video, time) {
	return new Promise((resolve) => {
		const target = Math.max(0, time);
		const close = () => Math.abs(video.currentTime - target) < .12 && video.readyState >= 2 && !video.seeking;
		if (close() && !video.ended) {
			resolve();
			return;
		}
		const finish = () => {
			window.clearTimeout(timer);
			video.removeEventListener("seeked", finish);
			resolve();
		};
		const timer = window.setTimeout(finish, 1200);
		video.addEventListener("seeked", finish, { once: true });
		try {
			video.currentTime = target;
		} catch {
			finish();
		}
	});
}
var TARGET_RATE = 16e3;
var OVERLAP_SECONDS = .35;
function encodeWavPcm16(samples, sampleRate) {
	const numChannels = 1;
	const bitsPerSample = 16;
	const blockAlign = 2;
	const byteRate = sampleRate * blockAlign;
	const dataSize = samples.length * 2;
	const buffer = new ArrayBuffer(44 + dataSize);
	const view = new DataView(buffer);
	writeAscii(view, 0, "RIFF");
	view.setUint32(4, 36 + dataSize, true);
	writeAscii(view, 8, "WAVE");
	writeAscii(view, 12, "fmt ");
	view.setUint32(16, 16, true);
	view.setUint16(20, 1, true);
	view.setUint16(22, numChannels, true);
	view.setUint32(24, sampleRate, true);
	view.setUint32(28, byteRate, true);
	view.setUint16(32, blockAlign, true);
	view.setUint16(34, bitsPerSample, true);
	writeAscii(view, 36, "data");
	view.setUint32(40, dataSize, true);
	let offset = 44;
	for (let i = 0; i < samples.length; i++, offset += 2) {
		const s = Math.max(-1, Math.min(1, samples[i] ?? 0));
		view.setInt16(offset, s < 0 ? s * 32768 : s * 32767, true);
	}
	return new Blob([buffer], { type: "audio/wav" });
}
function writeAscii(view, offset, text) {
	for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
}
async function extractMono16k(file, signal) {
	if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
	const ctx = new AudioContext();
	try {
		const buf = await file.arrayBuffer();
		if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
		const audio = await ctx.decodeAudioData(buf);
		const duration = audio.duration;
		if (duration > 720) throw new Error("TOO_LONG");
		return {
			samples: await resampleMono(audio, TARGET_RATE),
			duration
		};
	} finally {
		ctx.close();
	}
}
async function resampleMono(audio, rate) {
	const length = Math.max(1, Math.ceil(audio.duration * rate));
	const offline = new OfflineAudioContext(1, length, rate);
	const mixed = offline.createBuffer(1, audio.length, audio.sampleRate);
	const out = mixed.getChannelData(0);
	const channels = audio.numberOfChannels;
	for (let i = 0; i < audio.length; i++) {
		let sum = 0;
		for (let c = 0; c < channels; c++) sum += audio.getChannelData(c)[i] ?? 0;
		out[i] = sum / channels;
	}
	const src = offline.createBufferSource();
	src.buffer = mixed;
	src.connect(offline.destination);
	src.start(0);
	return (await offline.startRendering()).getChannelData(0);
}
function splitWavChunks(samples) {
	const chunkSamples = Math.floor(45 * TARGET_RATE);
	const overlap = Math.floor(OVERLAP_SECONDS * TARGET_RATE);
	const chunks = [];
	let start = 0;
	let index = 0;
	while (start < samples.length) {
		const end = Math.min(samples.length, start + chunkSamples);
		const slice = samples.subarray(start, end);
		chunks.push({
			blob: encodeWavPcm16(slice, TARGET_RATE),
			offset: start / TARGET_RATE,
			index,
			total: 0
		});
		index += 1;
		if (end >= samples.length) break;
		start = end - overlap;
	}
	return chunks.map((c) => ({
		...c,
		total: chunks.length
	}));
}
async function processVideoFile(opts) {
	const { file, sourceLang, targetLang, onProgress, signal } = opts;
	onProgress?.({
		step: "extract",
		progress: .15
	});
	const { samples, duration } = await extractMono16k(file, signal);
	onProgress?.({
		step: "extract",
		progress: 1
	});
	const chunks = splitWavChunks(samples);
	onProgress?.({
		step: "transcribe",
		progress: 0
	});
	const words = [];
	const leftover = [];
	let detected = normalizeLang(sourceLang === "auto" ? "und" : sourceLang);
	const langParam = sttLanguageParam(sourceLang);
	for (const chunk of chunks) {
		if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
		const data = await transcribeChunk(chunk, langParam, signal);
		const heard = normalizeLang(data.language ?? "");
		if (heard !== "und" && heard !== "auto") detected = heard;
		const offset = chunk.offset;
		const parsed = readWords(data.words, offset, chunk.index > 0);
		words.push(...parsed);
		if (typeof data.text === "string" && data.text.trim()) leftover.push({
			text: data.text.trim(),
			offset,
			duration: data.duration ?? CHUNK_DURATION_FALLBACK
		});
		onProgress?.({
			step: "transcribe",
			progress: (chunk.index + 1) / Math.max(1, chunk.total),
			detail: data.language
		});
	}
	if (!detected || detected === "auto") detected = "und";
	let cues = wordsToCues(words);
	if (cues.length === 0) cues = cuesFromPlain(leftover);
	const target = normalizeLang(targetLang);
	const explicitSame = sourceLang !== "auto" && sameLanguage(sourceLang, target);
	const shouldTranslate = cues.length > 0 && target !== "auto" && target !== "und" && !explicitSame;
	let translated = false;
	let translateError;
	if (shouldTranslate) {
		onProgress?.({
			step: "translate",
			progress: .15
		});
		const res = await translateCues({ data: {
			cues: cues.map((c) => ({
				id: c.id,
				text: c.text
			})),
			sourceLang: detected === "und" ? sourceLang === "auto" ? "und" : sourceLang : detected,
			targetLang: target
		} });
		if (res.ok) {
			const byId = new Map(res.cues.map((c) => [c.id, c.text]));
			cues = cues.map((c) => ({
				...c,
				original: c.text,
				text: byId.get(c.id)?.trim() || c.text
			}));
			translated = true;
		} else translateError = res.error;
		onProgress?.({
			step: "translate",
			progress: 1
		});
	}
	return {
		cues,
		detectedLang: detected,
		duration,
		translated,
		translateError
	};
}
var CHUNK_DURATION_FALLBACK = 45;
function readWords(raw, offset, skipOverlap) {
	if (!raw?.length) return [];
	const out = [];
	for (const w of raw) {
		const text = String(w.text ?? w.word ?? "").trim();
		if (!text) continue;
		const start = Number(w.start ?? w.start_time ?? 0) + offset;
		const end = Number(w.end ?? w.end_time ?? start) + offset;
		if (skipOverlap && start < offset + .18) continue;
		out.push({
			text,
			start,
			end: Math.max(end, start + .05)
		});
	}
	return out;
}
function cuesFromPlain(chunks) {
	const cues = [];
	let n = 0;
	for (const chunk of chunks) {
		const parts = chunk.text.split(/(?<=[.!?…])\s+/).map((s) => s.trim()).filter(Boolean);
		const total = parts.reduce((sum, p) => sum + p.length, 0) || 1;
		let t = chunk.offset;
		for (const part of parts) {
			const dur = Math.max(1.2, part.length / total * Math.max(chunk.duration, 1.2));
			n += 1;
			cues.push({
				id: `c${n}`,
				start: t,
				end: t + dur,
				text: part
			});
			t += dur;
		}
	}
	return cues;
}
async function transcribeChunk(chunk, language, signal) {
	const form = new FormData();
	if (language) {
		form.append("language", language);
		form.append("format", "true");
	}
	form.append("offset", String(chunk.offset));
	form.append("file", chunk.blob, `chunk-${chunk.index}.wav`);
	const res = await fetch("/api/transcribe", {
		method: "POST",
		body: form,
		signal
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.error || `STT_${res.status}`);
	return data;
}
function Studio() {
	const locale = useStudio((s) => s.locale);
	const t = copy[locale];
	const videoRef = (0, import_react.useRef)(null);
	const abortRef = (0, import_react.useRef)(null);
	const autoRef = (0, import_react.useRef)(false);
	const [exporting, setExporting] = (0, import_react.useState)(false);
	const [exportProgress, setExportProgress] = (0, import_react.useState)(0);
	const exportAbortRef = (0, import_react.useRef)(null);
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
	const seek = (time) => {
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
		setProcess("processing", "extract", .05);
		try {
			const result = await processVideoFile({
				file,
				sourceLang,
				targetLang,
				signal: ac.signal,
				onProgress: (p) => setProcess("processing", p.step, p.progress)
			});
			setCues(result.cues, result.detectedLang);
			if (result.cues.length === 0) toast.message(t.noSpeech);
			else if (result.translateError) toast.error(t.translateFail);
			else if (result.translated) toast.success(t.translatedFrom.replace("{from}", languageLabel(result.detectedLang, locale)).replace("{to}", languageLabel(targetLang, locale)));
			else toast.success(t.done);
		} catch (err) {
			if (err.name === "AbortError") {
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
	(0, import_react.useEffect)(() => {
		if (autoRef.current) return;
		if (!file || isDemo) return;
		autoRef.current = true;
		runProcess();
	}, [file, isDemo]);
	const onCancel = () => {
		abortRef.current?.abort();
		setProcess("idle");
	};
	const baseName = videoName.replace(/\.[^.]+$/, "") || "freesubtiless";
	const save = async (blob, filename, okMsg) => {
		const result = await shareOrDownload(blob, filename);
		if (result === "shared") toast.success(t.share);
		else if (result === "downloaded") toast.success(okMsg);
	};
	const exportSrt = () => {
		const body = `\uFEFF${toSrt(cues)}`;
		save(new Blob([body], { type: "application/x-subrip;charset=utf-8" }), `${baseName}.srt`, t.savedSrt);
	};
	const exportVtt = () => {
		save(new Blob([toVtt(cues)], { type: "text/vtt;charset=utf-8" }), `${baseName}.vtt`, t.savedVtt);
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
				onProgress: setExportProgress
			});
			downloadBlob(blob, `${baseName}-subtitulos.${ext}`);
			if (exportFormat === "mp4" && ext !== "mp4") toast.message(t.savedWebmFallback);
			else if (ext === "mp4") toast.success(t.savedMp4);
			else toast.success(t.savedWebm);
		} catch (err) {
			if (err.name === "AbortError") return;
			toast.error(t.exportError);
		} finally {
			setExporting(false);
			setExportProgress(0);
		}
	};
	const exportLabel = exporting ? exportFormat === "mp4" && exportProgress >= .7 ? t.converting : `${t.exporting.replace("…", "")} ${Math.round(exportProgress * 100)}%` : t.exportVideo;
	const langs = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePair, {
		compact: true,
		locale,
		source: sourceLang,
		target: targetLang,
		onSource: (v) => setLangs(v, targetLang),
		onTarget: (v) => setLangs(sourceLang, v)
	});
	const fromLabel = languageLabel(detectedLang || sourceLang, locale);
	const toLabel = languageLabel(targetLang, locale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-dvh flex-col overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 items-center gap-3 border-b border-border px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto hidden min-w-0 max-w-lg flex-1 lg:block",
						children: langs
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => void runProcess(),
								disabled: status === "processing" || isDemo || !file,
								children: [status === "processing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: t.generate
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: exportSrt,
								disabled: cues.length === 0,
								title: t.srtHelp,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captions, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: t.exportSrt
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: exportVtt,
								disabled: cues.length === 0,
								className: "hidden sm:inline-flex",
								children: t.exportVtt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => void onExportVideo(),
								disabled: exporting,
								children: [exporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: exportLabel
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: reset,
								"aria-label": t.newVideo,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-3.5 sm:hidden" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: t.newVideo
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallApp, {
								locale,
								compact: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleToggle, {})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border px-3 py-2 lg:hidden",
				children: langs
			}),
			cues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 border-b border-border px-4 py-2 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						fromLabel,
						" → ",
						toLabel
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-md bg-secondary p-0.5",
						children: ["mp4", "webm"].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: exporting,
							onClick: () => setExportFormat(f),
							className: `h-8 min-w-12 rounded px-2 text-xs font-medium ${exportFormat === f ? "bg-card text-foreground" : "text-muted-foreground"}`,
							children: f.toUpperCase()
						}, f))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						className: "h-8",
						onClick: exportSrt,
						title: t.srtHelp,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-3.5" }), t.exportSrt]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						className: "h-8",
						onClick: () => void onExportVideo(),
						disabled: exporting,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), exportLabel]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden min-h-0 flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_340px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-col gap-3 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoStage, {
						locale,
						videoRef
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-52 shrink-0 overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CueEditor, {
							locale,
							onSeek: seek
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "min-h-0 border-l border-border bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StylePanel, { locale })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-0 flex-1 flex-col p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoStage, {
						locale,
						videoRef
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "style",
					className: "shrink-0 border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "mx-3 mt-3 w-auto self-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "style",
								children: t.style
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "texts",
								children: t.texts
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "style",
							className: "h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StylePanel, { locale })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "texts",
							className: "h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CueEditor, {
								locale,
								onSeek: seek
							})
						})
					]
				})]
			}),
			status === "processing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessOverlay, {
				locale,
				onCancel
			})
		]
	});
}
function Home() {
	const ai = Route$1.useLoaderData();
	const locale = useStudio((s) => s.locale);
	const videoUrl = useStudio((s) => s.videoUrl);
	const loadVideo = useStudio((s) => s.loadVideo);
	const setAiAvailable = useStudio((s) => s.setAiAvailable);
	(0, import_react.useEffect)(() => {
		initLocale();
	}, []);
	(0, import_react.useEffect)(() => {
		setAiAvailable(ai.available);
	}, [ai.available, setAiAvailable]);
	const onFile = (file) => {
		const url = URL.createObjectURL(file);
		loadVideo({
			url,
			name: file.name,
			file,
			locale
		});
	};
	const onDemo = () => {
		loadVideo({
			url: "/demo.mp4",
			name: "freesubtiless-demo.mp4",
			file: null,
			demo: true,
			locale
		});
	};
	if (!videoUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landing, {
		locale,
		onFile,
		onDemo
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, {});
}
//#endregion
export { Home as component };
