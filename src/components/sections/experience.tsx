import { motion } from "motion/react";
import { SectionHead } from "@/components/section-head";
import { EXPERIENCE } from "@/data/copy";
import { useT } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

export function Experience() {
  const t = useT();
  return (
    <section
      id="experience"
      aria-label="Trayectoria"
      className="border-t border-line bg-paper px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          label={t({ es: "Trayectoria", en: "Background" })}
          title={t({ es: "Antes del freelance", en: "Before freelance" })}
          count={t({ es: "03 etapas", en: "03 stages" })}
        />
        <ol className="flex flex-col" role="list">
          {EXPERIENCE.map((e, i) => {
            const period = t(e.period);
            return (
              <motion.li
                key={i}
                initial={{ y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid grid-cols-1 gap-4 border-b border-line py-10 first:border-t md:grid-cols-[220px_1fr] md:gap-14"
              >
                <span
                  aria-hidden
                  className="absolute -left-2 top-9 hidden md:block"
                >
                  <span className="block h-1.5 w-1.5 rounded-full bg-rust opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>

                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/60 num-tabular">
                    etapa · 0{i + 1}
                  </span>
                  <span
                    className="font-serif italic leading-[1.0] tracking-tight text-ink num-tabular"
                    style={{ fontSize: "clamp(1.6rem, 2vw, 2rem)" }}
                  >
                    {period}
                  </span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-rust">
                    {e.co}
                  </span>
                </div>

                <div>
                  <h3
                    className="mb-4 font-serif italic leading-[1.15] tracking-[-0.01em] text-ink"
                    style={{ fontSize: "clamp(1.35rem, 1.65vw, 1.7rem)" }}
                  >
                    {t(e.title)}
                  </h3>
                  <p className="mb-6 max-w-[60ch] text-[0.92rem] leading-[1.75] text-ink/75">
                    {t(e.body)}
                  </p>
                  <ul className="flex flex-wrap gap-1.5" role="list">
                    {t(e.tags).map((tg, j) => (
                      <li
                        key={j}
                        className={cn(
                          "border px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.08em]",
                          e.accent === "rust" && "border-rust/30 text-rust",
                          e.accent === "moss" && "border-moss/30 text-moss",
                          e.accent === "neutral" && "border-ink/15 text-muted",
                        )}
                      >
                        {tg}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
