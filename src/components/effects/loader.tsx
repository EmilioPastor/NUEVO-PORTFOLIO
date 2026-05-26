import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useT, useLang } from "@/hooks/use-lang";
import { META } from "@/data/copy";

const NARRATIVE = {
  es: [
    "preparando el lienzo",
    "trazando la rejilla",
    "colocando los bloques",
    "escribiendo el copy",
    "listo",
  ],
  en: [
    "preparing the canvas",
    "drawing the grid",
    "placing the blocks",
    "writing the copy",
    "ready",
  ],
} as const;

const TOTAL_MS = 1900;

export function Loader({ onDone }: { onDone: () => void }) {
  const t = useT();
  const { lang } = useLang();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"running" | "fading" | "gone">("running");
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctl = animate(0, 1, {
      duration: TOTAL_MS / 1000,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setProgress(v),
      onComplete: () => {
        setProgress(1);
        setTimeout(() => {
          setPhase("fading");
          const o = overlayRef.current;
          if (!o) {
            onDone();
            setPhase("gone");
            return;
          }
          animate(o, { opacity: [1, 0] }, { duration: 0.55, ease: [0.16, 1, 0.3, 1] }).then(() => {
            onDone();
            setPhase("gone");
          });
        }, 220);
      },
    });
    return () => ctl.stop();
  }, [onDone]);

  if (phase === "gone") return null;

  const phrases = NARRATIVE[lang];
  const phraseIndex = Math.min(
    phrases.length - 1,
    Math.floor(progress * phrases.length),
  );
  const phrase = phrases[phraseIndex];

  // 4 "blocks" appearing in sequence based on progress
  const blocks = [
    { top: 12, left: 12, w: 38, h: 16, threshold: 0.18 },
    { top: 12, left: 52, w: 36, h: 32, threshold: 0.34 },
    { top: 30, left: 12, w: 38, h: 28, threshold: 0.5 },
    { top: 60, left: 12, w: 76, h: 18, threshold: 0.7 },
    { top: 80, left: 12, w: 50, h: 8, threshold: 0.86 },
  ];

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-live="polite"
      aria-label={t(META.loading)}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink"
    >
      <div className="relative" style={{ width: "min(440px, 86vw)" }}>
        <div className="flex items-baseline justify-between font-mono text-[0.55rem] uppercase tracking-[0.22em] text-paper/35 num-tabular">
          <span>EP · estudio</span>
          <span>{String(Math.floor(progress * 100)).padStart(3, "0")}</span>
        </div>

        <div className="relative mt-5 aspect-[5/3] w-full overflow-hidden bg-paper/[0.04]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(245,243,238,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,243,238,0.06) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              opacity: Math.min(1, progress * 3),
              transition: "opacity 0.2s",
            }}
          />

          {blocks.map((b, i) => {
            const visible = progress >= b.threshold;
            const localT = Math.min(
              1,
              Math.max(0, (progress - b.threshold) / 0.1),
            );
            return (
              <div
                key={i}
                aria-hidden
                className="absolute border border-paper/30 bg-paper/[0.06]"
                style={{
                  top: `${b.top}%`,
                  left: `${b.left}%`,
                  width: `${b.w}%`,
                  height: `${b.h}%`,
                  opacity: visible ? 0.4 + localT * 0.55 : 0,
                  transform: visible
                    ? "translateY(0)"
                    : "translateY(4px)",
                  transition: "opacity 0.35s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1)",
                  borderColor:
                    i === 1
                      ? "rgba(212,70,15,0.6)"
                      : "rgba(245,243,238,0.25)",
                }}
              />
            );
          })}

          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[2px] bg-rust"
            style={{
              transform: `translateX(${progress * 100}%)`,
              transition: "transform 0.1s linear",
            }}
          />
        </div>

        <p
          aria-hidden
          className="mt-7 min-h-[1.6em] font-serif italic leading-snug text-paper"
          style={{ fontSize: "clamp(1.2rem, 2.6vw, 1.7rem)", letterSpacing: "-0.012em" }}
        >
          {phrase}
          <span
            aria-hidden
            className="ml-1 inline-block h-[0.7em] w-[2px] -mb-[0.05em] animate-blink bg-rust align-middle"
          />
        </p>

        <div className="mt-8 flex items-baseline justify-between font-mono text-[0.5rem] uppercase tracking-[0.22em] text-paper/25 num-tabular">
          <span>córdoba · estudio</span>
          <span>2026</span>
        </div>
      </div>
    </div>
  );
}
