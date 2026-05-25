import { motion } from "motion/react";
import { SectionHead } from "@/components/section-head";
import { CASES } from "@/data/copy";
import { useT } from "@/hooks/use-lang";

export function Cases() {
  const t = useT();
  return (
    <section
      id="casos"
      aria-label="Casos"
      className="border-t border-line bg-paper px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          label={t({ es: "Casos", en: "Cases" })}
          title={t({ es: "Proyectos destacados", en: "Featured projects" })}
          count={t({ es: "02 casos", en: "02 cases" })}
        />
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          {CASES.map((c, i) => (
            <motion.article
              key={c.n}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col gap-6 bg-paper p-8 transition-colors hover:bg-paperOff md:p-10"
            >
              <header className="flex items-start justify-between gap-4">
                <span className="font-mono text-[0.65rem] tracking-[0.1em] text-muted/80">
                  {c.n}
                </span>
                <span className="border border-line px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted">
                  {t(c.sector)}
                </span>
              </header>
              <div className="relative aspect-[16/10] overflow-hidden border border-line bg-paperDeep">
                <img
                  src={c.image}
                  alt={t(c.title)}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="500"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="font-serif text-2xl italic leading-tight tracking-tightish text-ink">
                {t(c.title)}
              </h3>
              <dl className="flex flex-col gap-3 text-[0.92rem] leading-[1.7] text-muted">
                <div>
                  <dt className="mb-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink">
                    {t({ es: "Problema", en: "Problem" })}
                  </dt>
                  <dd>{t(c.problem)}</dd>
                </div>
                <div>
                  <dt className="mb-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-rust">
                    {t({ es: "Resultado", en: "Result" })}
                  </dt>
                  <dd>{t(c.result)}</dd>
                </div>
              </dl>
              <ul className="flex flex-wrap gap-1.5" role="list">
                {t(c.tags).map((tag, j) => (
                  <li
                    key={j}
                    className="border border-line px-2 py-0.5 font-mono text-[0.62rem] tracking-[0.06em] text-muted transition-colors group-hover:border-ink/30 group-hover:text-ink"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
