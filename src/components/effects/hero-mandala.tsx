import { motion } from "motion/react";
import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SIZE = 200;
const CX = SIZE / 2;
const CY = SIZE / 2;

function polygonPoints(n: number, radius: number, rotationDeg = 0) {
  const offset = (rotationDeg * Math.PI) / 180 - Math.PI / 2;
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + offset;
    return [CX + radius * Math.cos(a), CY + radius * Math.sin(a)] as const;
  });
}

/** Star polygon {n/skip}: connect each vertex to vertex i+skip. */
function starPath(n: number, radius: number, skip: number, rotationDeg = 0) {
  const pts = polygonPoints(n, radius, rotationDeg);
  return pts
    .map((_, i) => {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[(i + skip) % n];
      return `M${x1.toFixed(2)},${y1.toFixed(2)} L${x2.toFixed(2)},${y2.toFixed(2)}`;
    })
    .join(" ");
}

function polygonPath(n: number, radius: number, rotationDeg = 0) {
  const pts = polygonPoints(n, radius, rotationDeg);
  return (
    pts
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
      .join(" ") + "Z"
  );
}

function spokesPath(n: number, rInner: number, rOuter: number, rotationDeg = 0) {
  const inner = polygonPoints(n, rInner, rotationDeg);
  const outer = polygonPoints(n, rOuter, rotationDeg);
  return inner
    .map(([x1, y1], i) => {
      const [x2, y2] = outer[i];
      return `M${x1.toFixed(2)},${y1.toFixed(2)} L${x2.toFixed(2)},${y2.toFixed(2)}`;
    })
    .join(" ");
}

export function HeroMandala() {
  const reduce = useReducedMotion();

  // Build geometry once. {8/3} is the classic Islamic octagram (used widely in
  // Mezquita-Catedral de Córdoba tilework and arch geometry).
  const layers = useMemo(() => {
    return {
      ringOuter: polygonPath(48, 95, 0),
      octagramA: starPath(8, 90, 3, 0),
      octagramB: starPath(8, 90, 3, 22.5),
      octagonOuter: polygonPath(8, 64, 22.5),
      spokes16: spokesPath(16, 40, 64, 0),
      dodecagram: starPath(12, 48, 5, 15),
      octagonInner: polygonPath(8, 28, 22.5),
      starInner: starPath(8, 26, 3, 0),
      coreOctagon: polygonPath(8, 11, 22.5),
      ticks: polygonPoints(48, 99, 0),
    };
  }, []);

  return (
    <aside
      aria-hidden
      className="pointer-events-none absolute right-[2vw] top-1/2 z-[3] hidden w-[clamp(360px,32vw,460px)] -translate-y-1/2 select-none lg:block"
    >
      <div className="relative aspect-square">
        {/* faint dotted outer ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full">
            <g>
              {layers.ticks.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i % 3 === 0 ? 0.7 : 0.35}
                  fill="rgba(17,17,17,0.45)"
                />
              ))}
            </g>
          </svg>
        </div>

        {/* primary octagram — slow CW */}
        <motion.svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 h-full w-full"
          initial={reduce ? false : { rotate: -8, opacity: 0 }}
          animate={{ rotate: reduce ? 0 : 360 - 8, opacity: 1 }}
          transition={{
            rotate: {
              duration: 240,
              repeat: reduce ? 0 : Infinity,
              ease: "linear",
            },
            opacity: { duration: 1.6, delay: 0.3 },
          }}
          style={{ transformOrigin: "50% 50%" }}
        >
          <motion.path
            d={layers.octagramA}
            fill="none"
            stroke="#111"
            strokeOpacity="0.65"
            strokeWidth="0.55"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <path
            d={layers.octagonOuter}
            fill="none"
            stroke="#111"
            strokeOpacity="0.22"
            strokeWidth="0.4"
          />
        </motion.svg>

        {/* secondary octagram rotated 22.5° — slow CCW */}
        <motion.svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 h-full w-full"
          initial={reduce ? false : { rotate: 8, opacity: 0 }}
          animate={{ rotate: reduce ? 0 : -(360 - 8), opacity: 1 }}
          transition={{
            rotate: {
              duration: 320,
              repeat: reduce ? 0 : Infinity,
              ease: "linear",
            },
            opacity: { duration: 1.6, delay: 0.55 },
          }}
          style={{ transformOrigin: "50% 50%" }}
        >
          <motion.path
            d={layers.octagramB}
            fill="none"
            stroke="#111"
            strokeOpacity="0.5"
            strokeWidth="0.45"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
          <path
            d={layers.spokes16}
            fill="none"
            stroke="#111"
            strokeOpacity="0.16"
            strokeWidth="0.32"
          />
        </motion.svg>

        {/* dodecagram inner — slow CW different speed */}
        <motion.svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 h-full w-full"
          initial={reduce ? false : { rotate: -12, opacity: 0 }}
          animate={{ rotate: reduce ? 0 : 360 - 12, opacity: 1 }}
          transition={{
            rotate: {
              duration: 180,
              repeat: reduce ? 0 : Infinity,
              ease: "linear",
            },
            opacity: { duration: 1.6, delay: 0.8 },
          }}
          style={{ transformOrigin: "50% 50%" }}
        >
          <motion.path
            d={layers.dodecagram}
            fill="none"
            stroke="#D4460F"
            strokeOpacity="0.42"
            strokeWidth="0.4"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          <path
            d={layers.octagonInner}
            fill="none"
            stroke="#111"
            strokeOpacity="0.32"
            strokeWidth="0.45"
          />
        </motion.svg>

        {/* core — static, breathing rust accent */}
        <motion.svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 h-full w-full"
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.g
            style={{ transformOrigin: "50% 50%" }}
            animate={
              reduce
                ? undefined
                : { scale: [1, 1.04, 1] }
            }
            transition={
              reduce
                ? undefined
                : { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <path d={layers.starInner} fill="none" stroke="#111" strokeOpacity="0.55" strokeWidth="0.45" />
            <path d={layers.coreOctagon} fill="#D4460F" />
            <circle cx={CX} cy={CY} r="3" fill="#F5F3EE" />
          </motion.g>
        </motion.svg>

        {/* corner marks */}
        <Corner pos="tl" />
        <Corner pos="tr" />
        <Corner pos="bl" />
        <Corner pos="br" />
      </div>

      {/* signature strip below the mandala */}
      <div className="mt-6 flex items-center justify-between border-t border-line pt-3 font-mono text-[0.52rem] uppercase tracking-[0.22em] text-muted/65">
        <span>geometría · 8 puntos</span>
        <span className="block h-px w-8 bg-line" />
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
