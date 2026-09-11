//#region node_modules/.nitro/vite/services/ssr/assets/languages-C-qhbtQW.js
/** Languages the speech-to-text model transcribes natively. */
var SOURCE_LANGUAGES = [
	{
		code: "auto",
		name: "Detectar idioma",
		nameEn: "Detect language"
	},
	{
		code: "es",
		name: "Español",
		nameEn: "Spanish"
	},
	{
		code: "en",
		name: "Inglés",
		nameEn: "English"
	},
	{
		code: "fr",
		name: "Francés",
		nameEn: "French"
	},
	{
		code: "de",
		name: "Alemán",
		nameEn: "German"
	},
	{
		code: "pt",
		name: "Portugués",
		nameEn: "Portuguese"
	},
	{
		code: "it",
		name: "Italiano",
		nameEn: "Italian"
	},
	{
		code: "ru",
		name: "Ruso",
		nameEn: "Russian"
	},
	{
		code: "ja",
		name: "Japonés",
		nameEn: "Japanese"
	},
	{
		code: "ko",
		name: "Coreano",
		nameEn: "Korean"
	},
	{
		code: "ar",
		name: "Árabe",
		nameEn: "Arabic",
		rtl: true
	},
	{
		code: "hi",
		name: "Hindi",
		nameEn: "Hindi"
	},
	{
		code: "zh",
		name: "Chino",
		nameEn: "Chinese"
	},
	{
		code: "nl",
		name: "Neerlandés",
		nameEn: "Dutch"
	},
	{
		code: "pl",
		name: "Polaco",
		nameEn: "Polish"
	},
	{
		code: "tr",
		name: "Turco",
		nameEn: "Turkish"
	},
	{
		code: "sv",
		name: "Sueco",
		nameEn: "Swedish"
	},
	{
		code: "uk",
		name: "Ucraniano",
		nameEn: "Ukrainian"
	},
	{
		code: "vi",
		name: "Vietnamita",
		nameEn: "Vietnamese"
	},
	{
		code: "id",
		name: "Indonesio",
		nameEn: "Indonesian"
	},
	{
		code: "th",
		name: "Tailandés",
		nameEn: "Thai"
	},
	{
		code: "el",
		name: "Griego",
		nameEn: "Greek"
	},
	{
		code: "cs",
		name: "Checo",
		nameEn: "Czech"
	},
	{
		code: "ro",
		name: "Rumano",
		nameEn: "Romanian"
	},
	{
		code: "hu",
		name: "Húngaro",
		nameEn: "Hungarian"
	},
	{
		code: "da",
		name: "Danés",
		nameEn: "Danish"
	},
	{
		code: "fi",
		name: "Finés",
		nameEn: "Finnish"
	},
	{
		code: "no",
		name: "Noruego",
		nameEn: "Norwegian"
	},
	{
		code: "he",
		name: "Hebreo",
		nameEn: "Hebrew",
		rtl: true
	},
	{
		code: "fa",
		name: "Persa",
		nameEn: "Persian",
		rtl: true
	},
	{
		code: "ms",
		name: "Malayo",
		nameEn: "Malay"
	},
	{
		code: "fil",
		name: "Filipino",
		nameEn: "Filipino"
	}
];
/** Subtitle target languages — translation covers more than STT. */
var TARGET_LANGUAGES = SOURCE_LANGUAGES.filter((l) => l.code !== "auto");
var STT_NATIVE = /* @__PURE__ */ new Set([
	"ar",
	"cs",
	"da",
	"nl",
	"en",
	"fil",
	"fr",
	"de",
	"hi",
	"id",
	"it",
	"ja",
	"ko",
	"ms",
	"fa",
	"pl",
	"pt",
	"ro",
	"ru",
	"es",
	"sv",
	"th",
	"tr",
	"vi"
]);
function isRtl(code) {
	const lang = TARGET_LANGUAGES.find((l) => l.code === normalizeLang(code));
	return Boolean(lang?.rtl);
}
function normalizeLang(code) {
	const lower = code.trim().toLowerCase();
	if (!lower || lower === "und" || lower === "unknown") return "und";
	if (lower === "auto") return "auto";
	const base = lower.split(/[-_]/)[0] ?? lower;
	if (base === "iw") return "he";
	if (base === "nb" || base === "nn") return "no";
	if (base === "cmn" || base === "zho") return "zh";
	if (base === "fil" || base === "tl") return "fil";
	if (base === "ger" || base === "deu") return "de";
	if (base === "eng") return "en";
	if (base === "spa" || base === "castilian") return "es";
	if (base === "fre" || base === "fra") return "fr";
	if (base === "rus") return "ru";
	return base;
}
function languageLabel(code, locale) {
	const n = normalizeLang(code);
	if (n === "und" || n === "auto") return locale === "en" ? "Unknown" : "Desconocido";
	const lang = SOURCE_LANGUAGES.find((l) => l.code === n) ?? TARGET_LANGUAGES.find((l) => l.code === n);
	if (!lang) return code;
	return locale === "en" ? lang.nameEn : lang.name;
}
function sttLanguageParam(code) {
	const n = normalizeLang(code);
	if (n === "auto" || n === "und") return void 0;
	if (STT_NATIVE.has(n)) return n;
}
function sameLanguage(a, b) {
	const na = normalizeLang(a);
	const nb = normalizeLang(b);
	if (na === "auto" || nb === "auto" || na === "und" || nb === "und") return false;
	return na === nb;
}
//#endregion
export { normalizeLang as a, languageLabel as i, TARGET_LANGUAGES as n, sameLanguage as o, isRtl as r, sttLanguageParam as s, SOURCE_LANGUAGES as t };
