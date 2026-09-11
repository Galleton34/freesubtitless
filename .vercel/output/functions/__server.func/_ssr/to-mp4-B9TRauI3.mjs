import { t as FFmpeg } from "../_libs/ffmpeg__ffmpeg.mjs";
import { n as toBlobURL, t as fetchFile } from "../_libs/ffmpeg__util.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/to-mp4-B9TRauI3.js
var ffmpeg = null;
var loadPromise = null;
async function getFfmpeg() {
	if (ffmpeg?.loaded) return ffmpeg;
	if (loadPromise) return loadPromise;
	loadPromise = (async () => {
		const instance = new FFmpeg();
		const base = `${window.location.origin}/ffmpeg`;
		await instance.load({
			coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
			wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm")
		});
		ffmpeg = instance;
		return instance;
	})();
	try {
		return await loadPromise;
	} catch (err) {
		loadPromise = null;
		throw err;
	}
}
function resetFfmpeg() {
	ffmpeg = null;
	loadPromise = null;
}
async function runExec(ff, args, ms) {
	let timedOut = false;
	const timer = window.setTimeout(() => {
		timedOut = true;
		resetFfmpeg();
	}, ms);
	try {
		return await ff.exec(args, ms);
	} finally {
		window.clearTimeout(timer);
		if (timedOut) throw new Error("MP4_TIMEOUT");
	}
}
async function webmToMp4(input, onProgress) {
	const ff = await getFfmpeg();
	onProgress?.(.08);
	const inName = /mp4|m4v/i.test(input.type) ? "in.mp4" : "in.webm";
	await ff.writeFile(inName, await fetchFile(input));
	const onProg = ({ progress }) => {
		onProgress?.(Math.min(.95, Math.max(.08, progress)));
	};
	ff.on("progress", onProg);
	const video = [
		"-fflags",
		"+genpts",
		"-i",
		inName,
		"-vf",
		"fps=30",
		"-c:v",
		"libx264",
		"-preset",
		"ultrafast",
		"-pix_fmt",
		"yuv420p",
		"-movflags",
		"+faststart"
	];
	try {
		let code = await runExec(ff, [
			...video,
			"-c:a",
			"aac",
			"-ac",
			"2",
			"out.mp4"
		], 45e3);
		if (code !== 0) code = await runExec(ff, [
			...video,
			"-an",
			"out.mp4"
		], 45e3);
		if (code !== 0) throw new Error("MP4_CONVERT");
		const data = await ff.readFile("out.mp4");
		const bytes = data instanceof Uint8Array ? new Uint8Array(data) : /* @__PURE__ */ new Uint8Array();
		if (!bytes.byteLength) throw new Error("MP4_EMPTY");
		onProgress?.(1);
		return new Blob([bytes], { type: "video/mp4" });
	} finally {
		ff.off("progress", onProg);
		await ff.deleteFile(inName).catch(() => void 0);
		await ff.deleteFile("out.mp4").catch(() => void 0);
	}
}
//#endregion
export { webmToMp4 };
