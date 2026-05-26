import { motion } from "motion/react";
import { SectionHead } from "@/components/section-head";
import { META_SITE } from "@/data/copy";
import { useT } from "@/hooks/use-lang";

export function Meta() {
  const t = useT();
  const stats = [META_SITE.hours, META_SITE.commits, META_SITE.bundle, META_SITE.lighthouse];

  return (
    <section
      id="meta"
      aria-label="Esta web"
      className="border-t border-line bg-paper px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          label={t(META_SITE.meta.eyebrow)}
          title={t(META_SITE.meta.title)}
          count={t({ es: "07 datos", en: "07 facts" })}
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div>
            <motion.p
              initial={{ y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[52ch] font-serif text-[1.15rem] italic leading-[1.55] text-ink/85"
            >
              {t(META_SITE.meta.intro)}
            </motion.p>

            <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-2 bg-paper p-6"
                >
                  <span
                    className="font-serif italic leading-none text-ink num-tabular"
                    style={{ fontSize: "clamp(2rem, 3.2vw, 2.7rem)", letterSpacing: "-0.025em" }}
                  >
                    {s.value}
                  </span>
                  <span className="flex items-start gap-2 font-mono text-[0.55rem] uppercase leading-[1.55] tracking-[0.18em] text-muted/75">
                    <span aria-hidden className="mt-[0.5em] block h-px w-3 bg-ink/35" />
                    {t(s.label)}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 border-t border-line pt-5"
            >
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-rust">
                stack
              </span>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5" role="list">
                {t(META_SITE.stack).map((s, i, arr) => (
                  <li
                    key={s}
                    className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/85"
                  >
                    {i > 0 && <span aria-hidden className="block h-px w-3 bg-ink/15" />}
                    <span>{s}</span>
                    {i === arr.length - 1 && (
                      <span aria-hidden className="ml-1 block h-1 w-1 rounded-full bg-rust" />
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="flex flex-col">
            <motion.div
              initial={{ y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 flex items-baseline justify-between border-b border-line pb-3"
            >
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-rust">
                decisiones
              </span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted/60 num-tabular">
                0{META_SITE.decisions.length}
              </span>
            </motion.div>

            <dl className="flex flex-col">
              {META_SITE.decisions.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-[120px_1fr] gap-4 border-b border-ink/[0.08] py-4 last:border-b-0"
                >
                  <dt className="pt-[3px] font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/75">
                    {t(d.label)}
                  </dt>
                  <dd className="text-[0.92rem] leading-[1.6] text-ink/85">
                    {t(d.body)}
                  </dd>
                </motion.div>
              ))}
            </dl>

            <motion.p
              initial={{ y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted/80"
            >
              <span aria-hidden className="block h-1 w-1 rounded-full bg-rust animate-blink" />
              {t(META_SITE.meta.repo)}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
