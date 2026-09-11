import { Landing } from "@/components/landing";
import { Studio } from "@/components/studio";
import { getAiStatus } from "@/lib/ai";
import { initLocale, useStudio } from "@/lib/studio-store";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  loader: () => getAiStatus(),
  component: Home,
});

function Home() {
  const ai = Route.useLoaderData();
  const locale = useStudio((s) => s.locale);
  const videoUrl = useStudio((s) => s.videoUrl);
  const loadVideo = useStudio((s) => s.loadVideo);
  const setAiAvailable = useStudio((s) => s.setAiAvailable);

  useEffect(() => {
    initLocale();
  }, []);

  useEffect(() => {
    setAiAvailable(ai.available);
  }, [ai.available, setAiAvailable]);

  const onFile = (file: File) => {
    const url = URL.createObjectURL(file);
    loadVideo({ url, name: file.name, file, locale });
  };

  const onDemo = () => {
    loadVideo({
      url: "/demo.mp4",
      name: "freesubtiless-demo.mp4",
      file: null,
      demo: true,
      locale,
    });
  };

  if (!videoUrl) {
    return <Landing locale={locale} onFile={onFile} onDemo={onDemo} />;
  }
  return <Studio />;
}
