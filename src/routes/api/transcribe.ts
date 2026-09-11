import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/transcribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.XAI_API_KEY;
        if (!apiKey) {
          return Response.json({ error: "AI_OFF" }, { status: 503 });
        }

        const incoming = await request.formData();
        const file = incoming.get("file");
        if (file == null || typeof file === "string") {
          return Response.json({ error: "NO_FILE" }, { status: 400 });
        }
        if (file.size > 4_000_000) {
          return Response.json({ error: "TOO_LARGE" }, { status: 413 });
        }

        const form = new FormData();
        const language = incoming.get("language");
        const format = incoming.get("format");
        if (typeof language === "string" && language) {
          form.append("language", language);
        }
        if (format === "true" && typeof language === "string" && language) {
          form.append("format", "true");
        }
        form.append("filler_words", "true");
        const filename = "name" in file && typeof file.name === "string" ? file.name : "chunk.wav";
        form.append("file", file, filename);

        const res = await fetch("https://api.x.ai/v1/stt", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}` },
          body: form,
        });

        const text = await res.text();
        if (!res.ok) {
          return Response.json(
            { error: `STT_${res.status}`, detail: text.slice(0, 400) },
            { status: 502 },
          );
        }

        try {
          return Response.json(JSON.parse(text) as unknown);
        } catch {
          return Response.json({ error: "STT_PARSE" }, { status: 502 });
        }
      },
    },
  },
});
