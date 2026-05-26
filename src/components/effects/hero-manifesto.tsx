import { motion, useReducedMotion } from "motion/react";
import { useLang } from "@/hooks/use-lang";

type Line = { text: string; tone?: "muted" | "accent"; weight?: "light" | "normal" };

const LINES: Record<"es" | "en", Line[]> = {
  es: [
    { text: "ahora,", tone: "muted", weight: "light" },
    { text: "construyo" },
    { text: "software" },
    { text: "a medida", tone: "accent" },
    { text: "con IA." },
  ],
  en: [
    { text: "right now,", tone: "muted", weight: "light" },
    { text: "I build" },
    { text: "software" },
    { text: "tailored", tone: "accent" },
    { text: "with AI." },
  ],
};

const SUB: Record<"es" | "en", string[]> = {
  es: [
    "del problema al producto",
    "en días, no en semanas",
  ],
  en: [
    "from problem to product",
    "in days, not weeks",
  ],
};

export function HeroManifesto() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const lines = LINES[lang];
  const sub = SUB[lang];

  return (
    <aside
      aria-label={lang === "es" ? "Manifiesto" : "Manifesto"}
      className="pointer-events-none absolute right-6 top-1/2 z-[3] hidden w-[clamp(340px,32vw,460px)] -translate-y-1/2 select-none text-right md:px-2 lg:block"
    >
      <h2
        className="font-serif italic leading-[0.92] tracking-ultra text-ink"
        style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.6rem)", letterSpacing: "-0.035em" }}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              initial={reduce ? false : { y: "115%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.45 + i * 0.09,
              }}
              className={
                "inline-block will-change-transform " +
                (line.tone === "muted"
                  ? "text-ink/40"
                  : line.tone === "accent"
                  ? "text-rust"
                  : "text-ink") +
                (line.weight === "light" ? " font-light" : "")
              }
            >
              {line.text}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="ml-auto mt-7 max-w-[280px] border-t border-line pt-4"
      >
        <p className="font-mono text-[0.66rem] uppercase leading-[1.7] tracking-[0.16em] text-muted">
          {sub.map((s, i) => (
            <span key={i} className="block">
              {s}
            </span>
          ))}
        </p>
        <p className="mt-3 flex items-center justify-end gap-2 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/60">
          <span aria-hidden className="block h-px w-6 bg-line" />
          <span>córdoba · 2026</span>
        </p>
      </motion.div>
    </aside>
  );
}
