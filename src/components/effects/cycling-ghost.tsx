import { useEffect, useState } from "react";
import { ScrambleText } from "@/components/effects/scramble";
import { useLang } from "@/hooks/use-lang";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const WORDS = {
  es: ["A medida", "Software", "Automatización", "Webs", "IA", "Landings", "ERPs"],
  en: ["Custom", "Software", "Automation", "Sites", "AI", "Landings", "ERPs"],
} as const;

const ROTATION_MS = 3200;

export function CyclingGhost() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const words = WORDS[lang];

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % words.length);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, [reduce, words.length]);

  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute right-[3vw] top-1/2 z-[1] hidden -translate-y-1/2 select-none whitespace-nowrap font-serif italic ghost-text md:block"
        style={{
          fontSize: "clamp(4rem, 9vw, 11rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        <ScrambleText
          text={words[i]}
          trigger={`${lang}-${i}`}
          duration={0.75}
          disabled={reduce}
        />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-[7.5rem] z-[2] hidden items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-rust/80 md:flex"
      >
        <span className="block h-1.5 w-1.5 rounded-full bg-rust animate-blink" />
        <span>{lang === "es" ? "construyendo ahora" : "building now"}</span>
        <span className="block h-px w-6 bg-rust/30" />
        <span className="font-serif italic normal-case tracking-normal text-rust">
          {String(i + 1).padStart(2, "0")}/{String(words.length).padStart(2, "0")}
        </span>
      </span>
    </>
  );
}
