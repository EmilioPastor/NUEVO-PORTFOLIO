import { motion } from "motion/react";
import { ArrowDown, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO } from "@/data/copy";
import { useT } from "@/hooks/use-lang";
import { MagneticName } from "@/components/effects/magnetic-name";

const NAME_LINES = ["Emilio", "Pastor", "Zurita"];

export function Hero() {
  const t = useT();

  return (
    <section
      id="top"
      aria-label="Presentación"
      className="relative grid min-h-svh grid-rows-[1fr_auto] overflow-hidden px-6 md:px-12"
    >
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
          <span className="font-mono text-[0.7rem] tracking-[0.08em] text-muted">
            {t(HERO.loc)}
          </span>
        </motion.div>

        <h1
          className="font-serif italic tracking-ultra text-ink"
          style={{ fontSize: "clamp(4rem, 10vw, 9.5rem)" }}
        >
          <MagneticName lines={NAME_LINES} />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5"
        >
          <span className="font-mono text-[0.85rem] uppercase tracking-[0.06em] text-muted">
            {t(HERO.role)}
          </span>
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
        className="relative z-[2] flex flex-wrap items-center justify-between gap-6 border-t border-line py-5"
      >
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-muted/65 num-tabular">
          presentación · 00 / 07
        </span>

        <ul className="hidden flex-wrap items-center gap-x-3 gap-y-1 md:flex" role="list">
          {HERO.pills.map((p, i) => (
            <li
              key={i}
              className="group flex items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted/75 transition-colors hover:text-ink"
            >
              {i > 0 && (
                <span aria-hidden className="block h-px w-3 bg-ink/15" />
              )}
              <span>{t(p)}</span>
            </li>
          ))}
        </ul>

        <a
          href="#stats"
          className="group flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted/75 transition-colors hover:text-ink"
        >
          {t({ es: "Continúa", en: "Continue" })}
          <ArrowDown className="h-3 w-3 transition-transform duration-500 group-hover:translate-y-1" />
        </a>
      </motion.div>
    </section>
  );
}
