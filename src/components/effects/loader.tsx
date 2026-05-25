import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/hooks/use-lang";
import { META } from "@/data/copy";

export function Loader({ onDone }: { onDone: () => void }) {
  const t = useT();
  const [n, setN] = useState(0);
  const [phase, setPhase] = useState<"counting" | "wiping" | "gone">("counting");
  const curtainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctl = animate(0, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(Math.floor(v)),
      onComplete: () => {
        setN(100);
        setTimeout(() => {
          setPhase("wiping");
          const c = curtainRef.current;
          if (!c) return;
          animate(
            c,
            { scaleY: [0, 1] },
            { duration: 0.55, ease: [0.83, 0, 0.17, 1] },
          ).then(() => {
            onDone();
            c.style.transformOrigin = "top";
            animate(
              c,
              { scaleY: [1, 0] },
              { duration: 0.55, ease: [0.83, 0, 0.17, 1] },
            ).then(() => setPhase("gone"));
          });
        }, 180);
      },
    });
    return () => ctl.stop();
  }, [onDone]);

  if (phase === "gone") return null;

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        aria-label={t(META.loading)}
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink"
        style={{ display: phase === "counting" ? "flex" : "none" }}
      >
        <div className="relative text-center">
          <span
            aria-hidden
            className="block font-serif italic leading-none text-paper"
            style={{ fontSize: "clamp(6rem, 16vw, 12rem)", letterSpacing: "-0.04em" }}
          >
            {n}
          </span>
          <div className="mx-auto mt-4 h-px w-[180px] overflow-hidden bg-paper/[0.08]">
            <div
              className="h-full origin-left bg-rust"
              style={{ width: `${n}%` }}
            />
          </div>
          <div className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.3em] text-paper/20">
            {t(META.loading)}
          </div>
        </div>
      </div>
      <div
        ref={curtainRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9999] origin-bottom bg-paper"
        style={{ transform: "scaleY(0)" }}
      />
    </>
  );
}
