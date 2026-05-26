import { motion } from "motion/react";
import { SectionHead } from "@/components/section-head";
import { ABOUT_PARAS, ABOUT_ASIDE } from "@/data/copy";
import { useT } from "@/hooks/use-lang";

export function About() {
  const t = useT();
  return (
    <section
      id="about"
      aria-label="Sobre mí"
      className="border-t border-line bg-paperOff px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          label={t({ es: "Perfil", en: "Profile" })}
          title={t({ es: "Sobre mí", en: "About" })}
        />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div>
            {ABOUT_PARAS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ y: 24 }}
                whileInView={{ opacity: 0.95, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={
                  i === 0
                    ? "drop-cap mb-5 text-[1.02rem] leading-[1.8] text-ink last:mb-0"
                    : "mb-5 text-[0.98rem] leading-[1.8] text-ink/85 last:mb-0"
                }
              >
                {t(p)}
              </motion.p>
            ))}
          </div>

          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <Corner pos="tl" />
              <Corner pos="tr" />
              <Corner pos="bl" />
              <Corner pos="br" />
              <div className="relative overflow-hidden bg-paperDeep">
                <img
                  src="/assets/emilio.jpg"
                  alt="Retrato de Emilio Pastor Zurita"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                  className="block w-full"
                  style={{
                    aspectRatio: "3/4",
                    objectFit: "cover",
                    objectPosition: "center top",
                    filter: "grayscale(20%)",
                  }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/65">
                <span>retrato · 2026</span>
                <span aria-hidden className="block h-px w-8 bg-line" />
                <span>córdoba · estudio</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-ink/15 pt-5"
            >
              <div className="mb-4 flex items-baseline justify-between">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-rust">
                  ficha técnica
                </span>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted/55 num-tabular">
                  0{ABOUT_ASIDE.length} datos
                </span>
              </div>

              <dl className="flex flex-col">
                {ABOUT_ASIDE.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-[90px_1fr] gap-4 border-b border-ink/[0.08] py-3 last:border-b-0"
                  >
                    <dt className="pt-[3px] font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/75">
                      {t(a.label)}
                    </dt>
                    <dd
                      className="text-[0.88rem] leading-[1.5] text-ink/85 [&_strong]:font-medium [&_strong]:text-ink"
                      dangerouslySetInnerHTML={{ __html: t(a.value) }}
                    />
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 border-l border-t",
    tr: "right-0 top-0 translate-x-1/2 -translate-y-1/2 border-r border-t",
    bl: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2 border-l border-b",
    br: "right-0 bottom-0 translate-x-1/2 translate-y-1/2 border-r border-b",
  } as const;
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-10 h-3 w-3 border-rust/70 ${map[pos]}`}
    />
  );
}
