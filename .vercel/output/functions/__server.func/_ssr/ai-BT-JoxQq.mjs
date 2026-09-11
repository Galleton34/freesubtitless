import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as normalizeLang, i as languageLabel, o as sameLanguage } from "./languages-C-qhbtQW.mjs";
import { a as string, i as object, t as array } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-BT-JoxQq.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var CueIn = object({
	id: string().max(24),
	text: string().max(400)
});
var getAiStatus_createServerFn_handler = createServerRpc({
	id: "f55d85520203b0ca68806b32dd775d224e89e7dbf6a1371fbfe6857a9f8e3df4",
	name: "getAiStatus",
	filename: "src/lib/ai.ts"
}, (opts) => getAiStatus.__executeServer(opts));
var getAiStatus = createServerFn({ method: "GET" }).handler(getAiStatus_createServerFn_handler, async () => {
	return { available: Boolean(process.env.XAI_API_KEY) };
});
var translateCues_createServerFn_handler = createServerRpc({
	id: "9a572a1ab9749581d2d450bd09d960022c9164d569fac15f148dfd71665f5a93",
	name: "translateCues",
	filename: "src/lib/ai.ts"
}, (opts) => translateCues.__executeServer(opts));
var translateCues = createServerFn({ method: "POST" }).validator(object({
	cues: array(CueIn).max(200),
	sourceLang: string().max(16),
	targetLang: string().max(16)
})).handler(translateCues_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI_OFF"
	};
	if (data.cues.length === 0) return {
		ok: true,
		cues: data.cues
	};
	const target = normalizeLang(data.targetLang);
	const source = normalizeLang(data.sourceLang);
	if (sameLanguage(source, target)) return {
		ok: true,
		cues: data.cues
	};
	const batches = [];
	for (let i = 0; i < data.cues.length; i += 40) batches.push(data.cues.slice(i, i + 40));
	const out = [];
	for (const batch of batches) {
		const result = await translateBatch(apiKey, batch, source, target, false);
		if (!result.ok) return result;
		let mapped = applyIds(batch, result.cues);
		if (mostlyUnchanged(batch, mapped) || hasRedaction(mapped, batch)) {
			const retry = await translateBatch(apiKey, batch, source, target, true);
			if (retry.ok) mapped = applyIds(batch, retry.cues);
		}
		out.push(...mapped.map((c, i) => {
			const original = batch[i];
			if (isRedacted(c.text) && !isRedacted(original.text)) return {
				id: c.id,
				text: original.text
			};
			return c;
		}));
	}
	return {
		ok: true,
		cues: out
	};
});
function applyIds(original, translated) {
	const byId = new Map(translated.map((c) => [c.id, c.text]));
	return original.map((c) => ({
		id: c.id,
		text: (byId.get(c.id) ?? "").trim() || c.text
	}));
}
function mostlyUnchanged(original, translated) {
	if (!original.length) return false;
	let same = 0;
	for (let i = 0; i < original.length; i++) {
		const a = fold(original[i]?.text ?? "");
		const b = fold(translated[i]?.text ?? "");
		if (a && a === b) same += 1;
	}
	return same / original.length >= .7;
}
function hasRedaction(translated, original) {
	return translated.some((c, i) => isRedacted(c.text) && !isRedacted(original[i]?.text ?? ""));
}
function isRedacted(s) {
	return /[*]{2,}|#{3,}|\[\s*(?:expletive|censored|censor(?:ed)?|beep|explicit|redacted|nsfw|bleep)\s*\]|\b[a-záéíóúüñ]\*+[a-záéíóúüñ*]+\b/i.test(s);
}
function fold(s) {
	return s.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
function promptFor(sourceName, targetName, targetLang, strict) {
	const core = `You are a professional subtitle translator working on existing recorded dialogue (films, interviews, songs, streams). Translate from ${sourceName} into ${targetName}.

Rules:
- Every output "text" MUST be in ${targetName} (${targetLang}).
- Translate what was SAID, not a cleaned version. Keep swearing, insults, sexual language, slurs, slang, dialect, filler, and intensity. Match the register (street stays street; formal stays formal).
- Never sanitize, never moralize, never replace words with asterisks, symbols, or tags like [expletive]/[censored]/[bleep].
- Do not add quotes, numbers, commentary, or content warnings.
- Preserve proper names. Keep the same ids and cue count.
- Spoken captions: aim for ~42 characters per line, up to 2–3 lines if needed. Do not drop words to make it shorter.
- JSON only: {"cues":[{"id":"c1","text":"..."}]}`;
	return strict ? `${core}\nThis is a retry: the previous pass left source language or redacted words. Output full uncensored ${targetName}.` : core;
}
async function translateBatch(apiKey, cues, sourceLang, targetLang, strict) {
	const targetName = languageLabel(targetLang, "en");
	const sourceName = languageLabel(sourceLang, "en");
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: strict ? 0 : .15,
			max_tokens: 8e3,
			response_format: { type: "json_object" },
			messages: [{
				role: "system",
				content: promptFor(sourceName, targetName, targetLang, strict)
			}, {
				role: "user",
				content: JSON.stringify({
					instruction: `Translate these existing subtitle cues into ${targetName}. Do not censor.`,
					source_language: sourceName,
					target_language: targetName,
					cues
				})
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `xAI API error ${res.status}`
	};
	const message = (await res.json()).choices?.[0]?.message;
	if (message?.refusal) return {
		ok: false,
		error: "TRANSLATE_REFUSED"
	};
	const parsed = parseCuesJson(message?.content ?? "");
	if (!parsed) return {
		ok: false,
		error: "TRANSLATE_PARSE"
	};
	return {
		ok: true,
		cues: parsed
	};
}
function parseCuesJson(raw) {
	const trimmed = raw.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
	try {
		const data = JSON.parse(trimmed);
		const list = Array.isArray(data) ? data : data && typeof data === "object" ? data.cues ?? data.translations : null;
		if (!Array.isArray(list)) return null;
		const cues = [];
		for (const item of list) {
			if (!item || typeof item !== "object") continue;
			const rec = item;
			const text = typeof rec.text === "string" ? rec.text : typeof rec.translation === "string" ? rec.translation : null;
			if (typeof rec.id === "string" && text) cues.push({
				id: rec.id,
				text
			});
		}
		return cues.length ? cues : null;
	} catch {
		return null;
	}
}
//#endregion
export { getAiStatus_createServerFn_handler, translateCues_createServerFn_handler };
