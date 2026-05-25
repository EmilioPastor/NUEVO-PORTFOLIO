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
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <div>
            {ABOUT_PARAS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ y: 24 }}
                whileInView={{ opacity: 0.85, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4 text-base leading-[1.8] text-ink last:mb-0"
              >
                {t(p)}
              </motion.p>
            ))}
          </div>
          <div>
            <motion.div
              initial={{ x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="border-y border-line py-7"
            >
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
                  filter: "grayscale(15%)",
                }}
              />
            </motion.div>
            {ABOUT_ASIDE.map((a, i) => (
              <motion.div
                key={i}
                initial={{ x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-line py-7"
              >
                <div className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                  {t(a.label)}
                </div>
                <div
                  className="text-[0.9rem] leading-[1.6] text-ink"
                  dangerouslySetInnerHTML={{ __html: t(a.value) }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
