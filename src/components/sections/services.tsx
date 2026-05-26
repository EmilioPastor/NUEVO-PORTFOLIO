import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "@/components/section-head";
import { SERVICES } from "@/data/copy";
import { useT } from "@/hooks/use-lang";

export function Services() {
  const t = useT();
  return (
    <section
      id="services"
      aria-label="Servicios"
      className="border-t border-line bg-paper px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          label={t({ es: "Servicios", en: "Services" })}
          title={t({ es: "En qué puedo ayudarte", en: "How I can help" })}
          count={t({ es: "03 servicios", en: "03 services" })}
        />
        <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative isolate flex flex-col gap-6 bg-paper p-9 transition-colors hover:bg-paperOff"
            >
              <header className="flex items-baseline justify-between border-b border-line pb-4">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-rust/85 num-tabular">
                  servicio · {s.n}
                </span>
                <span
                  aria-hidden
                  className="font-serif italic leading-none text-ink/15 group-hover:text-ink/25 transition-colors"
                  style={{ fontSize: "2.2rem" }}
                >
                  {s.n}
                </span>
              </header>

              <h3
                className="font-serif italic leading-[1.12] tracking-[-0.012em] text-ink"
                style={{ fontSize: "clamp(1.25rem, 1.5vw, 1.6rem)" }}
              >
                {t(s.title)}
              </h3>

              <p className="text-[0.92rem] leading-[1.75] text-ink/70">
                {t(s.desc)}
              </p>

              <div className="mt-auto flex flex-col gap-5 pt-4">
                <ul className="flex flex-wrap gap-1.5" role="list">
                  {t(s.tags).map((tg, j) => (
                    <li
                      key={j}
                      className="border border-ink/15 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted"
                    >
                      {tg}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  data-cursor-label="HABLAR"
                  className="group/cta relative inline-flex items-center justify-between gap-3 border-t border-ink/10 pt-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
                >
                  <span>
                    {t({ es: "Pedir presupuesto", en: "Request a quote" })}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-rust transition-transform duration-500 group-hover/cta:scale-x-100"
                  />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
