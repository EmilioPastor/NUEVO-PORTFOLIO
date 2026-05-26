import { useMemo } from "react";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getVisitSeed(): number {
  if (typeof window === "undefined") return 7;
  try {
    const k = "ep-seed";
    const v = sessionStorage.getItem(k);
    if (v) return parseInt(v, 10);
    const fresh = Math.floor(Math.random() * 0xffffff);
    sessionStorage.setItem(k, String(fresh));
    return fresh;
  } catch {
    return Math.floor(Math.random() * 0xffffff);
  }
}

type Variant = "wave" | "ticks" | "scatter" | "rule";

export function SeedDivider({ offset = 0 }: { offset?: number }) {
  const { d, ticks, dots, variant, w } = useMemo(() => {
    const seed = getVisitSeed() + offset * 37;
    const rng = mulberry32(seed);
    const width = 1200;
    const height = 44;
    const variants: Variant[] = ["wave", "ticks", "scatter", "rule"];
    const variant = variants[Math.floor(rng() * variants.length)];

    let d = "";
    if (variant === "wave") {
      const points = 6 + Math.floor(rng() * 4);
      const seg = width / points;
      const yMid = height / 2;
      d = `M 0 ${yMid}`;
      for (let i = 1; i <= points; i++) {
        const cx1 = (i - 1) * seg + seg * 0.5;
        const cy1 = yMid + (rng() - 0.5) * height * 0.7;
        const x = i * seg;
        const y = yMid + (rng() - 0.5) * height * 0.4;
        d += ` Q ${cx1.toFixed(1)} ${cy1.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
    } else if (variant === "rule") {
      d = `M 0 ${height / 2} L ${width} ${height / 2}`;
    }

    const ticks =
      variant === "ticks"
        ? Array.from({ length: 28 + Math.floor(rng() * 14) }, () => ({
            x: rng() * width,
            h: 4 + rng() * (height * 0.6),
          }))
        : [];

    const dots =
      variant === "scatter"
        ? Array.from({ length: 70 + Math.floor(rng() * 60) }, () => ({
            x: rng() * width,
            y: rng() * height,
            r: rng() < 0.85 ? 0.5 : 1.1,
          }))
        : [];

    return { d, ticks, dots, variant, w: width };
  }, [offset]);

  return (
    <div
      aria-hidden
      className="pointer-events-none relative -my-1 mx-auto h-[44px] w-full max-w-[1200px] overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${w} 44`}
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {variant === "wave" && (
          <path
            d={d}
            fill="none"
            stroke="rgba(17,17,17,0.25)"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
        )}
        {variant === "rule" && (
          <path
            d={d}
            fill="none"
            stroke="rgba(17,17,17,0.18)"
            strokeWidth="0.5"
          />
        )}
        {variant === "ticks" &&
          ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x}
              x2={t.x}
              y1={22 - t.h / 2}
              y2={22 + t.h / 2}
              stroke="rgba(17,17,17,0.22)"
              strokeWidth={i % 7 === 0 ? "0.8" : "0.45"}
            />
          ))}
        {variant === "scatter" &&
          dots.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill={i % 9 === 0 ? "rgba(212,70,15,0.55)" : "rgba(17,17,17,0.28)"}
            />
          ))}
      </svg>
    </div>
  );
}
