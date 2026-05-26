import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { CASES } from "@/data/copy";
import { useT } from "@/hooks/use-lang";

const HOLD_MS = 7000;

const PULLS = [
  {
    problem: {
      es: "Cientos de expedientes y plazos legales gestionados a mano.",
      en: "Hundreds of cases and legal deadlines tracked by hand.",
    },
    result: {
      es: "Centraliza casos, documentos y vencimientos en un único panel.",
      en: "Centralises cases, documents and deadlines into a single panel.",
    },
  },
  {
    problem: {
      es: "Presencia online débil y leads sin destino.",
      en: "Weak online presence and leads going nowhere.",
    },
    result: {
      es: "Catálogo dinámico y formularios pensados para convertir.",
      en: "Dynamic catalogue and forms built to convert.",
    },
  },
  {
    problem: {
      es: "Tareas repetitivas que devoran horas del equipo cada día.",
      en: "Repetitive tasks eating up the team's hours every day.",
    },
    result: {
      es: "Automatización a medida que libera tiempo del personal.",
      en: "Custom automation that frees up the team's time.",
    },
  },
  {
    problem: {
      es: "Coordinar personal y servicios a mano genera errores y fricción.",
      en: "Coordinating staff and services by hand causes errors and friction.",
    },
    result: {
      es: "Plataforma propia que asigna servicios y mantiene visible el flujo.",
      en: "Bespoke platform that assigns services and keeps the flow visible.",
    },
  },
] as const;

export function HeroDeliverable() {
  const reduce = useReducedMotion();
  const t = useT();
  const [index, setIndex] = useState(0);
  const total = CASES.length;

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), HOLD_MS);
    return () => clearInterval(id);
  }, [reduce, total]);

  const c = CASES[index];
  const pull = PULLS[index];

  return (
    <aside
      aria-hidden
      className="pointer-events-none absolute right-[1.5vw] top-1/2 z-[3] hidden w-[clamp(380px,30vw,440px)] -translate-y-1/2 select-none lg:block"
    >
      <Frame>
        <Inner
          reduce={!!reduce}
          index={index}
          total={total}
          n={c.n}
          sector={t(c.sector)}
          title={t(c.title)}
          problem={t(pull.problem)}
          result={t(pull.result)}
        />
      </Frame>
      <Caption />
    </aside>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[4/5] overflow-hidden bg-paperOff/90"
        style={{ boxShadow: "0 30px 70px -40px rgba(17,17,17,0.22)" }}
      >
        <Grain />
        {children}
      </motion.div>
    </div>
  );
}

function Inner({
  reduce,
  index,
  total,
  n,
  sector,
  title,
  problem,
  result,
}: {
  reduce: boolean;
  index: number;
  total: number;
  n: string;
  sector: string;
  title: string;
  problem: string;
  result: string;
}) {
  return (
    <div className="relative flex h-full flex-col px-8 pt-7 pb-6 text-ink">
      <Head index={index} total={total} reduce={reduce} />

      <div className="mt-7 flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={`label-${index}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1.5"
          >
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-rust">
              estudio · {n}
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted/80">
              {sector}
            </span>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.h3
            key={`title-${index}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-serif italic text-ink"
            style={{
              fontSize: "clamp(1.55rem, 1.85vw, 1.95rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.018em",
            }}
          >
            {title}
          </motion.h3>
        </AnimatePresence>

        <div className="mt-7 flex flex-1 flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`body-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              <Block label="Problema" tone="muted" text={problem} />
              <Block label="Solución" tone="rust" text={result} highlight />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Foot />
    </div>
  );
}

function Block({
  label,
  tone,
  text,
  highlight,
}: {
  label: string;
  tone: "muted" | "rust";
  text: string;
  highlight?: boolean;
}) {
  const toneClass = tone === "rust" ? "text-rust" : "text-muted/65";
  const ruleClass = tone === "rust" ? "bg-rust" : "bg-ink/25";
  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-2.5">
        <span aria-hidden className={`block h-px w-5 ${ruleClass}`} />
        <span className={`font-mono text-[0.52rem] uppercase tracking-[0.24em] ${toneClass}`}>
          {label}
        </span>
      </span>
      <p
        className={
          highlight
            ? "font-serif text-[0.95rem] leading-[1.5] text-ink"
            : "font-serif text-[0.9rem] italic leading-[1.55] text-ink/60"
        }
      >
        {text}
      </p>
    </div>
  );
}

function Head({
  index,
  total,
  reduce,
}: {
  index: number;
  total: number;
  reduce: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className="relative h-[1px] flex-1 bg-ink/15">
            {i < index && <span className="absolute inset-0 bg-ink/70" />}
            {i === index && (
              <motion.span
                key={`${index}-fill`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reduce ? 0 : HOLD_MS / 1000,
                  ease: "linear",
                }}
                className="absolute inset-0 origin-left bg-ink/70"
              />
            )}
          </span>
        ))}
      </div>
      <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/65">
        / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

function Foot() {
  return (
    <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-3 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted/65">
      <span>caso de estudio</span>
      <span>EP · 2024 →</span>
    </div>
  );
}

function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
      style={{
        backgroundImage:
          "radial-gradient(rgba(17,17,17,0.85) 0.55px, transparent 0.55px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
}

function Caption() {
  return (
    <div className="mt-6 flex items-center justify-between border-t border-line pt-3 font-mono text-[0.52rem] uppercase tracking-[0.22em] text-muted/65">
      <span>obra · 2024 → 2026</span>
      <span aria-hidden className="block h-px w-8 bg-line" />
      <span>córdoba · estudio</span>
    </div>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 border-l border-t",
    tr: "right-0 top-0 translate-x-1/2 -translate-y-1/2 border-r border-t",
    bl: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2 border-l border-b",
    br: "right-0 bottom-0 translate-x-1/2 translate-y-1/2 border-r border-b",
  } as const;
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-30 h-3 w-3 border-rust/70 ${map[pos]}`}
    />
  );
}
