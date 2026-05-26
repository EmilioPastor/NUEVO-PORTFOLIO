import { motion } from "motion/react";
import { SectionHead } from "@/components/section-head";
import { PROCESS } from "@/data/copy";
import { useT } from "@/hooks/use-lang";

export function Process() {
  const t = useT();
  return (
    <section
      id="process"
      aria-label="Proceso"
      className="border-t border-line bg-paperOff px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          label={t({ es: "Proceso", en: "Process" })}
          title={t({ es: "Cómo trabajamos juntos", en: "How we work together" })}
          count={t({ es: "04 pasos", en: "04 steps" })}
        />

        <div className="relative grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col gap-5 bg-paperOff p-8 transition-colors hover:bg-paper"
            >
              <header className="flex items-baseline justify-between border-b border-line pb-4">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-rust num-tabular">
                  paso · {p.n}
                </span>
                {i < PROCESS.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden text-rust/40 transition-transform duration-500 group-hover:translate-x-1 lg:inline"
                  >
                    →
                  </span>
                )}
              </header>

              <span
                aria-hidden
                className="font-serif italic leading-none text-ink/12 transition-colors duration-500 group-hover:text-ink/30 num-tabular"
                style={{ fontSize: "clamp(2.8rem, 4vw, 3.8rem)" }}
              >
                {p.n}
              </span>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/75">
                  {t(p.duration)}
                </span>
                <h3
                  className="font-serif italic leading-[1.05] tracking-[-0.012em] text-ink"
                  style={{ fontSize: "clamp(1.4rem, 1.7vw, 1.75rem)" }}
                >
                  {t(p.title)}
                </h3>
              </div>

              <p className="mt-auto text-[0.88rem] leading-[1.65] text-ink/70">
                {t(p.body)}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6"
        >
          <p className="max-w-[60ch] font-serif text-[1rem] italic leading-[1.55] text-ink/70">
            {t({
              es: "Del primer mensaje a una demo funcionando: dos semanas. Sin agencias por medio, sin contratos eternos, sin desaparecer cuando entrego.",
              en: "From first message to a working demo: two weeks. No agency in the middle, no never-ending contracts, no disappearing once I've shipped.",
            })}
          </p>
          <a
            href="#contact"
            data-cursor-label="EMPEZAR"
            className="group inline-flex items-center gap-3 border-b border-ink/30 pb-2 pl-0 pr-1 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink transition-colors hover:border-rust hover:text-rust"
          >
            <span>{t({ es: "Empezar conversación", en: "Start a conversation" })}</span>
            <span
              aria-hidden
              className="text-[1.05rem] leading-none transition-transform duration-500 group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
