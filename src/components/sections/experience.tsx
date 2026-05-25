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
      className="border-t border-line bg-paper px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          label={t({ es: "Trayectoria", en: "Background" })}
          title={t({ es: "Antes del freelance", en: "Before freelance" })}
          count={t({ es: "03 etapas", en: "03 stages" })}
        />
        <ol className="flex flex-col" role="list">
          {EXPERIENCE.map((e, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative grid grid-cols-1 gap-3 border-b border-line py-9 transition-colors first:border-t hover:bg-paperOff md:grid-cols-[180px_1fr] md:gap-12"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-rust transition-transform duration-500 group-hover:scale-y-100"
              />
              <div>
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted">
                  {t(e.period)}
                </div>
                <div className="mt-1 font-mono text-[0.72rem] font-medium tracking-[0.04em] text-rust">
                  {e.co}
                </div>
              </div>
              <div>
                <h3 className="mb-3 font-serif text-2xl italic leading-tight tracking-tightish text-ink">
                  {t(e.title)}
                </h3>
                <p className="mb-5 max-w-[560px] text-[0.88rem] leading-[1.75] text-muted">
                  {t(e.body)}
                </p>
                <ul className="flex flex-wrap gap-1.5" role="list">
                  {t(e.tags).map((tg, j) => (
                    <li
                      key={j}
                      className={cn(
                        "border px-2 py-0.5 font-mono text-[0.62rem] tracking-[0.06em]",
                        e.accent === "rust" && "border-rust/25 text-rust",
                        e.accent === "moss" && "border-moss/25 text-moss",
                        e.accent === "neutral" && "border-line text-muted",
                      )}
                    >
                      {tg}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
