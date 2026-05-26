import { motion } from "motion/react";
import { AVAILABILITY } from "@/data/copy";
import { useT } from "@/hooks/use-lang";

export function Availability() {
  const t = useT();
  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      aria-label={t(AVAILABILITY.status)}
      className="pointer-events-auto fixed bottom-5 left-5 z-[180] hidden flex-col gap-2 border border-ink/12 bg-paperOff/95 px-4 py-3 shadow-[0_18px_40px_-20px_rgba(17,17,17,0.25)] backdrop-blur-[3px] md:flex"
      style={{ width: "min(280px, 88vw)" }}
    >
      <header className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-moss">
          <span className="block h-1 w-1 rounded-full bg-moss animate-blink" />
          {AVAILABILITY.open ? t(AVAILABILITY.status) : t({ es: "Cerrado", en: "Closed" })}
        </span>
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-muted/55">
          estudio · EP
        </span>
      </header>
      <div className="flex items-baseline justify-between border-t border-ink/10 pt-2">
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted/65">
          próximo hueco
        </span>
        <span className="font-serif text-[1rem] italic leading-none text-ink num-tabular">
          {t(AVAILABILITY.nextSlot)}
        </span>
      </div>
      <a
        href={AVAILABILITY.bookHref}
        data-cursor-label="RESERVAR"
        className="group mt-1 inline-flex items-center justify-between gap-3 border-t border-ink/10 pt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink transition-colors hover:text-rust"
      >
        <span>{t(AVAILABILITY.bookLabel)}</span>
        <span
          aria-hidden
          className="text-[0.9rem] leading-none transition-transform duration-500 group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </motion.aside>
  );
}
