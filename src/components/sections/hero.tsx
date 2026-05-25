import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO } from "@/data/copy";
import { useT } from "@/hooks/use-lang";
import { ScrambleText } from "@/components/effects/scramble";

const NAME_LINES = ["Emilio", "Pastor", "Zurita"];

export function Hero() {
  const t = useT();
  const reduce = useReducedMotion();

  const lineReveal = {
    hidden: { y: "110%" },
    show: (i: number) => ({
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.08 },
    }),
  };

  return (
    <section
      id="top"
      aria-label="Presentación"
      className="relative grid min-h-svh grid-rows-[1fr_auto] overflow-hidden px-6 md:px-12"
    >
      {/* orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] -top-[20%] z-0 h-[600px] w-[600px] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(212,70,15,0.08) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[6%] bottom-[-4%] z-0 h-[450px] w-[450px] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(26,107,60,0.07) 0%, transparent 70%)" }}
      />

      {/* ghost word */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[-2%] top-1/2 z-[1] hidden -translate-y-1/2 select-none font-serif italic ghost-text whitespace-nowrap md:block"
        style={{
          fontSize: "clamp(8rem, 18vw, 22rem)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        A medida
      </span>

      <div className="relative z-[2] flex flex-col justify-end pb-12 pt-[120px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.08em] text-moss">
            <span className="block h-1.5 w-1.5 rounded-full bg-moss animate-blink" />
            {t(HERO.available)}
          </span>
          <span className="block h-3 w-px bg-ink/15" />
          <span className="relative inline-flex items-center gap-1.5 border border-rust/30 bg-rust/[0.05] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-rust">
            <span className="block h-1 w-1 rounded-full bg-rust" />
            {t(HERO.badge)}
          </span>
          <span className="block h-3 w-px bg-ink/15" />
          <span className="font-mono text-[0.7rem] tracking-[0.08em] text-muted">
            {t(HERO.loc)}
          </span>
        </motion.div>

        <h1 className="font-serif italic leading-[0.92] tracking-ultra text-ink"
          style={{ fontSize: "clamp(4rem, 10vw, 9.5rem)" }}
        >
          {NAME_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="inline-block will-change-transform"
                variants={lineReveal}
                initial="hidden"
                animate="show"
                custom={i}
              >
                <ScrambleText text={line} duration={0.9} delay={0.25 + i * 0.12} disabled={reduce ?? false} />
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 flex flex-wrap items-baseline gap-5"
        >
          <span className="font-mono text-[0.85rem] uppercase tracking-[0.06em] text-muted">
            {t(HERO.role)}
          </span>
          <span className="hidden h-3.5 w-px bg-ink/15 md:block" />
          <p className="max-w-[480px] text-[0.95rem] leading-[1.7] text-muted">
            {t(HERO.desc)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <Button asChild size="lg">
            <a href="#contact" data-cursor-label="HABLAR">
              {t(HERO.cta1)}
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href="#casos">{t(HERO.cta2)}</a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href="/assets/CV.pdf" download data-cursor-label="PDF">
              <FileDown className="h-4 w-4" />
              {t(HERO.cta3)}
            </a>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85 }}
        className="relative z-[2] flex flex-wrap items-center justify-between gap-4 border-t border-line py-5"
      >
        <ul className="flex flex-wrap gap-2" role="list">
          {HERO.pills.map((p, i) => (
            <li
              key={i}
              className="border border-line px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.06em] text-muted transition-all hover:-translate-y-0.5 hover:border-ink hover:text-ink"
            >
              {t(p)}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted/80">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          Scroll
        </div>
      </motion.div>
    </section>
  );
}
