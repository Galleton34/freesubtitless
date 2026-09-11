import { Button } from "@/components/ui/button";
import { copy, type Locale } from "@/lib/copy";
import { MonitorDown } from "lucide-react";
import { useEffect, useState } from "react";

type PromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallApp({ locale, compact }: { locale: Locale; compact?: boolean }) {
  const t = copy[locale];
  const [promptEvent, setPromptEvent] = useState<PromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator && Boolean((navigator as { standalone?: boolean }).standalone));
    setInstalled(standalone);
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));

    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as PromptEvent);
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
    const choice = await promptEvent.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    setPromptEvent(null);
  };

  if (compact) {
    if (installed || (!promptEvent && !ios)) return null;
    return (
      <Button
        size="sm"
        variant="ghost"
        onClick={() => (promptEvent ? void install() : undefined)}
        title={t.install}
        aria-label={t.install}
      >
        <MonitorDown className="size-3.5" />
        <span className="hidden sm:inline">{t.install}</span>
      </Button>
    );
  }

  return (
    <div className="mt-8 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
      <p className="text-sm font-medium text-foreground">{t.installTitle}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.installBlurb}</p>
      {installed ? (
        <p className="mt-3 text-sm text-foreground">{t.installDone}</p>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {promptEvent ? (
            <Button onClick={() => void install()}>
              <MonitorDown className="size-4" />
              {t.install}
            </Button>
          ) : null}
          <p className="text-xs leading-relaxed text-muted-foreground">
            {ios ? t.installIos : t.installDesktop}
          </p>
        </div>
      )}
    </div>
  );
}
