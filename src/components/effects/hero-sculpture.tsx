import { lazy, Suspense } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SculptureInner = lazy(() => import("./hero-sculpture-inner"));

export function HeroSculpture() {
  const reduce = useReducedMotion();

  return (
    <aside
      aria-hidden
      className="pointer-events-none absolute right-[1vw] top-1/2 z-[3] hidden w-[clamp(380px,34vw,520px)] -translate-y-1/2 select-none lg:block"
    >
      <div className="relative aspect-square">
        {/* corner ticks */}
        <Corner pos="tl" />
        <Corner pos="tr" />
        <Corner pos="bl" />
        <Corner pos="br" />

        {reduce ? (
          <StaticFallback />
        ) : (
          <Suspense fallback={<StaticFallback />}>
            <SculptureInner />
          </Suspense>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-3 font-mono text-[0.52rem] uppercase tracking-[0.22em] text-muted/65">
        <span>obra · 20 caras</span>
        <span aria-hidden className="block h-px w-8 bg-line" />
        <span>córdoba · estudio</span>
      </div>
    </aside>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "left-0 top-0 border-l border-t",
    tr: "right-0 top-0 border-r border-t",
    bl: "left-0 bottom-0 border-l border-b",
    br: "right-0 bottom-0 border-r border-b",
  } as const;
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-3 w-3 border-rust/70 ${map[pos]}`}
    />
  );
}

function StaticFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
    >
      <svg viewBox="0 0 100 100" className="h-2/3 w-2/3">
        <polygon
          points="50,8 88,32 88,68 50,92 12,68 12,32"
          fill="#D4460F"
          fillOpacity="0.85"
          stroke="#111"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  );
}
