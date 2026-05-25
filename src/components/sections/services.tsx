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
      className="border-t border-line bg-paper px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          label={t({ es: "Servicios", en: "Services" })}
          title={t({ es: "En qué puedo ayudarte", en: "How I can help" })}
          count={t({ es: "03 servicios", en: "03 services" })}
        />
        <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative isolate flex flex-col gap-4 bg-paper p-8 transition-colors hover:bg-paperOff"
            >
              <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-rust transition-transform duration-500 group-hover:scale-x-100" />
              <span className="font-mono text-[0.62rem] tracking-[0.1em] text-muted/80">
                {s.n}
              </span>
              <h3 className="font-serif text-[1.4rem] italic leading-tight text-ink">
                {t(s.title)}
              </h3>
              <p className="text-[0.88rem] leading-[1.7] text-muted">
                {t(s.desc)}
              </p>
              <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                <ul className="flex flex-wrap gap-1.5" role="list">
                  {t(s.tags).map((tg, j) => (
                    <li
                      key={j}
                      className="border border-line px-1.5 py-0.5 font-mono text-[0.58rem] tracking-[0.06em] text-muted"
                    >
                      {tg}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  data-cursor-label="HABLAR"
                  className="inline-flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink"
                >
                  {t({ es: "Pedir presupuesto", en: "Request a quote" })}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
