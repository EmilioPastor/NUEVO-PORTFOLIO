import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/hooks/use-lang";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { HERO_CASES, type HeroCase } from "@/data/hero-cases";

const CYCLE_MS = 8200;
const ISSUE_DATE = "26 · 05 · 26";

const HUES: Record<HeroCase["hue"], { bg: string; ink: string; accent: string; soft: string }> = {
  rust: {
    bg: "#F5F0E6",
    ink: "#1A1A1A",
    accent: "#D4460F",
    soft: "rgba(212,70,15,0.10)",
  },
  moss: {
    bg: "#EDEDE3",
    ink: "#161A14",
    accent: "#1A6B3C",
    soft: "rgba(26,107,60,0.10)",
  },
  amber: {
    bg: "#F2EAD6",
    ink: "#221C12",
    accent: "#B5731B",
    soft: "rgba(181,115,27,0.12)",
  },
  ink: {
    bg: "#161614",
    ink: "#F2EFE6",
    accent: "#D4460F",
    soft: "rgba(212,70,15,0.18)",
  },
};

export function HeroIssue() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setIdx((v) => (v + 1) % HERO_CASES.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const c = HERO_CASES[idx];
  const total = HERO_CASES.length;
  const palette = HUES[c.hue];
  const inkOnDark = c.hue === "ink";

  return (
    <aside
      aria-label={lang === "es" ? "Portada de caso" : "Case cover"}
      className="pointer-events-auto absolute right-[3vw] top-1/2 z-[3] hidden w-[clamp(360px,30vw,460px)] -translate-y-1/2 select-none lg:block"
      onMouseEnter={() => {
        pausedRef.current = true;
        setPaused(true);
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
        setPaused(false);
      }}
      onClick={() => setIdx((v) => (v + 1) % total)}
    >
      <div className="relative" style={{ aspectRatio: "3 / 3.4" }}>
        <ShadowStack hue={c.hue} />
        <AnimatePresence mode="wait">
          <motion.article
            key={c.id + lang}
            initial={reduce ? false : { rotateY: -22, opacity: 0, x: 30 }}
            animate={{ rotateY: 0, opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { rotateY: 18, opacity: 0, x: -24 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 origin-left overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              backgroundColor: palette.bg,
              color: palette.ink,
              boxShadow:
                "0 30px 80px -28px rgba(20,20,20,0.45), 0 1px 0 rgba(255,255,255,0.4) inset",
            }}
          >
            <PaperTexture />
            <DeckLines color={palette.ink} />
            <Masthead
              idx={idx}
              total={total}
              palette={palette}
              inkOnDark={inkOnDark}
              lang={lang}
            />
            <HeadlineBlock
              headline={c.headline[lang]}
              kicker={c.kicker[lang]}
              sector={c.sector[lang]}
              palette={palette}
              inkOnDark={inkOnDark}
              reduce={reduce}
              k={c.id + lang}
            />
            <PullQuote
              text={c.pull[lang]}
              palette={palette}
              inkOnDark={inkOnDark}
            />
            <Stamp
              label={c.stamp[lang]}
              palette={palette}
              reduce={reduce}
              k={c.id + lang}
            />
            <SpecsStrip
              c={c}
              lang={lang}
              palette={palette}
              inkOnDark={inkOnDark}
            />
            <Footer
              idx={idx}
              total={total}
              palette={palette}
              inkOnDark={inkOnDark}
              lang={lang}
            />
            <CornerFold palette={palette} />
          </motion.article>
        </AnimatePresence>
        <ProgressBar
          idx={idx}
          total={total}
          paused={paused}
          reduce={reduce}
        />
        <IssueNav
          idx={idx}
          total={total}
          onPick={(n) => setIdx(n)}
          palette={palette}
        />
      </div>
    </aside>
  );
}

function ShadowStack({ hue }: { hue: HeroCase["hue"] }) {
  // Stacked subtle "back issues" peeking behind current cover.
  const tint = HUES[hue].ink;
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 translate-x-[10px] translate-y-[10px] rotate-[1.5deg] opacity-50"
        style={{
          background: "rgba(0,0,0,0.05)",
          boxShadow: `inset 0 0 0 1px ${tint}11`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 translate-x-[5px] translate-y-[5px] rotate-[0.7deg]"
        style={{
          background: "rgba(0,0,0,0.04)",
          boxShadow: `inset 0 0 0 1px ${tint}1a`,
        }}
      />
    </>
  );
}

function PaperTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.22]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundSize: "210px",
      }}
    />
  );
}

function DeckLines({ color }: { color: string }) {
  // Faint horizontal rules every ~28px — editorial grid.
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, ${color} 0 1px, transparent 1px 28px)`,
      }}
    />
  );
}

function Masthead({
  idx,
  total,
  palette,
  inkOnDark,
  lang,
}: {
  idx: number;
  total: number;
  palette: { ink: string; accent: string };
  inkOnDark: boolean;
  lang: "es" | "en";
}) {
  return (
    <header
      className="flex items-center justify-between gap-3 px-5 pb-2 pt-4 font-mono text-[0.55rem] uppercase tracking-[0.22em]"
      style={{ color: inkOnDark ? "#F2EFE6BF" : palette.ink + "BF" }}
    >
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="block h-2 w-2 rotate-45"
          style={{ background: palette.accent }}
        />
        <span style={{ color: palette.accent }}>emilio</span>
        <span className="opacity-50">·</span>
        <span>{lang === "es" ? "estudio" : "studio"}</span>
      </span>
      <span className="tabular-nums" style={{ color: inkOnDark ? "#F2EFE6A0" : palette.ink + "A0" }}>
        {lang === "es" ? "núm." : "no."} {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <span className="tabular-nums" style={{ color: inkOnDark ? "#F2EFE6A0" : palette.ink + "A0" }}>
        {ISSUE_DATE}
      </span>
    </header>
  );
}

function HeadlineBlock({
  headline,
  kicker,
  sector,
  palette,
  inkOnDark,
  reduce,
  k,
}: {
  headline: string;
  kicker: string;
  sector: string;
  palette: { ink: string; accent: string };
  inkOnDark: boolean;
  reduce: boolean;
  k: string;
}) {
  // Split headline into words; reveal in rolling line groups.
  return (
    <div className="px-5 pt-3">
      <div
        className="mb-3 font-mono text-[0.55rem] uppercase tracking-[0.2em]"
        style={{ color: inkOnDark ? "#F2EFE6A0" : palette.ink + "A0" }}
      >
        — {sector}
      </div>
      <motion.h2
        key={k + "-h"}
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif italic"
        style={{
          color: palette.ink,
          fontSize: "clamp(1.6rem, 2.6vw, 2.05rem)",
          lineHeight: 1.02,
          letterSpacing: "-0.025em",
        }}
      >
        {headline}
      </motion.h2>
      <motion.div
        key={k + "-kick"}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 flex items-start gap-2 font-mono text-[0.62rem] leading-[1.55] tracking-[0.04em]"
        style={{ color: inkOnDark ? "#F2EFE6CC" : palette.ink + "B0" }}
      >
        <span aria-hidden style={{ color: palette.accent }}>
          §
        </span>
        <span className="lowercase">{kicker}</span>
      </motion.div>
    </div>
  );
}

function PullQuote({
  text,
  palette,
  inkOnDark,
}: {
  text: string;
  palette: { accent: string; ink: string };
  inkOnDark: boolean;
}) {
  return (
    <div
      className="mx-5 mt-5 border-l-2 pl-3 font-serif text-[0.78rem] leading-[1.45]"
      style={{
        borderColor: palette.accent,
        color: inkOnDark ? "#F2EFE6E0" : palette.ink + "DD",
        fontStyle: "italic",
      }}
    >
      {text}
    </div>
  );
}

function Stamp({
  label,
  palette,
  reduce,
  k,
}: {
  label: string;
  palette: { accent: string };
  reduce: boolean;
  k: string;
}) {
  return (
    <motion.div
      key={k + "-stamp"}
      initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -28 }}
      animate={{ opacity: 0.92, scale: 1, rotate: -14 }}
      transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
      className="absolute right-4 top-16 flex h-[78px] w-[78px] origin-center flex-col items-center justify-center rounded-full border-2 text-center font-mono text-[0.45rem] uppercase tracking-[0.16em]"
      style={{
        borderColor: palette.accent,
        color: palette.accent,
      }}
    >
      <span className="block w-[60px] leading-[1.18]">verificado</span>
      <span className="my-0.5 block h-px w-6" style={{ background: palette.accent }} />
      <span className="block w-[60px] leading-[1.18]">{label}</span>
    </motion.div>
  );
}

function SpecsStrip({
  c,
  lang,
  palette,
  inkOnDark,
}: {
  c: HeroCase;
  lang: "es" | "en";
  palette: { ink: string; accent: string };
  inkOnDark: boolean;
}) {
  const tradi = c.tradi[lang];
  const mine = c.mine[lang];
  const muted = inkOnDark ? "#F2EFE680" : palette.ink + "85";
  const ink = inkOnDark ? "#F2EFE6" : palette.ink;
  return (
    <div
      className="absolute inset-x-5 bottom-[88px] grid grid-cols-[1fr_auto_1fr] items-end gap-4 border-t pt-3"
      style={{ borderColor: inkOnDark ? "#F2EFE620" : palette.ink + "1A" }}
    >
      <div>
        <div
          className="mb-1 font-mono text-[0.5rem] uppercase tracking-[0.2em]"
          style={{ color: muted }}
        >
          {lang === "es" ? "tradicional" : "traditional"}
        </div>
        <div
          className="font-serif italic leading-none tabular-nums"
          style={{ color: muted, fontSize: "1.25rem" }}
        >
          {tradi.weeks}
        </div>
        <div
          className="mt-2 h-px w-full"
          style={{ background: inkOnDark ? "#F2EFE61F" : palette.ink + "18" }}
        />
      </div>

      <div
        className="flex h-12 items-center justify-center font-serif italic"
        style={{ color: palette.accent, fontSize: "1.5rem", lineHeight: 1 }}
      >
        →
      </div>

      <div className="text-right">
        <div
          className="mb-1 font-mono text-[0.5rem] uppercase tracking-[0.2em]"
          style={{ color: palette.accent }}
        >
          {lang === "es" ? "con ia · emilio" : "with ai · emilio"}
        </div>
        <div
          className="font-serif italic leading-none tabular-nums"
          style={{ color: ink, fontSize: "1.6rem" }}
        >
          {mine.weeks}
        </div>
        <div className="mt-2 flex items-center justify-end gap-2">
          <span
            className="font-mono text-[0.5rem] tracking-[0.14em] tabular-nums"
            style={{ color: palette.accent }}
          >
            {mine.delta}
          </span>
          <span
            className="block h-px w-12"
            style={{ background: palette.accent }}
          />
        </div>
      </div>
    </div>
  );
}

function Footer({
  idx,
  total,
  palette,
  inkOnDark,
  lang,
}: {
  idx: number;
  total: number;
  palette: { accent: string; ink: string };
  inkOnDark: boolean;
  lang: "es" | "en";
}) {
  return (
    <footer
      className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t px-5 py-2.5 font-mono text-[0.5rem] uppercase tracking-[0.2em]"
      style={{
        borderColor: inkOnDark ? "#F2EFE626" : palette.ink + "26",
        color: inkOnDark ? "#F2EFE6B0" : palette.ink + "A0",
      }}
    >
      <span>portfolio · emilio pastor</span>
      <span className="flex items-center gap-1.5">
        <span style={{ color: palette.accent }}>córdoba</span>
        <span className="opacity-50">·</span>
        <span className="tabular-nums">
          pág. {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </span>
      <span>{lang === "es" ? "ed. español" : "english ed."}</span>
    </footer>
  );
}

function CornerFold({ palette }: { palette: { accent: string } }) {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-3 w-3"
        style={{ borderTop: `1px solid ${palette.accent}`, borderLeft: `1px solid ${palette.accent}` }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-3 w-3"
        style={{ borderBottom: `1px solid ${palette.accent}`, borderRight: `1px solid ${palette.accent}` }}
      />
    </>
  );
}

function ProgressBar({
  idx,
  total,
  paused,
  reduce,
}: {
  idx: number;
  total: number;
  paused: boolean;
  reduce: boolean;
}) {
  return (
    <div className="absolute -top-3 left-0 right-0 grid grid-cols-4 gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const active = i === idx;
        return (
          <div key={i} className="relative h-[2px] overflow-hidden bg-ink/12">
            <motion.div
              key={`${idx}-${i}-${paused ? "p" : "r"}`}
              initial={{ width: i < idx ? "100%" : "0%" }}
              animate={{
                width: active ? (paused ? undefined : "100%") : i < idx ? "100%" : "0%",
              }}
              transition={{
                duration: active && !paused && !reduce ? CYCLE_MS / 1000 : 0.3,
                ease: "linear",
              }}
              className="absolute inset-y-0 left-0 bg-rust"
            />
          </div>
        );
      })}
    </div>
  );
}

function IssueNav({
  idx,
  total,
  onPick,
  palette,
}: {
  idx: number;
  total: number;
  onPick: (i: number) => void;
  palette: { accent: string };
}) {
  return (
    <div className="absolute -bottom-9 left-0 right-0 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted/75">
      <span>← portadas</span>
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Issue ${i + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              onPick(i);
            }}
            className="flex h-3 w-3 items-center justify-center"
          >
            <span
              className="block h-1.5 w-1.5"
              style={{
                background: i === idx ? palette.accent : "transparent",
                border: `1px solid ${palette.accent}80`,
              }}
            />
          </button>
        ))}
      </div>
      <span>clic / pasa el ratón</span>
    </div>
  );
}
