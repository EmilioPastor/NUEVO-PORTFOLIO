import { motion } from "motion/react";
import { useT } from "@/hooks/use-lang";

const YEAR = new Date().getFullYear();

export function Footer() {
  const t = useT();
  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden border-t border-paper/[0.08] bg-ink px-6 pt-16 pb-8 text-paper md:px-12"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-paper/[0.08] pb-10"
        >
          <h2
            className="font-serif italic leading-[0.95] tracking-[-0.02em] text-paper"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
          >
            Emilio Pastor Zurita.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-10 border-b border-paper/[0.08] py-10 md:grid-cols-4 md:gap-12">
          <Col
            label={t({ es: "Colofón", en: "Colophon" })}
            lines={[
              t({ es: "Estudio independiente", en: "Independent studio" }),
              t({ es: "Córdoba · España", en: "Córdoba · Spain" }),
              t({ es: "Construido en 2026", en: "Built in 2026" }),
            ]}
          />
          <Col
            label={t({ es: "Contacto", en: "Contact" })}
            links={[
              {
                label: t({ es: "Email", en: "Email" }),
                href: "mailto:emiliopastorzurita906@gmail.com",
                external: false,
              },
              {
                label: t({ es: "Hablemos", en: "Let's talk" }),
                href: "#contact",
                external: false,
              },
            ]}
          />
          <Col
            label={t({ es: "Enlaces", en: "Links" })}
            links={[
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/emilio-pastor-zurita/",
                external: true,
              },
            ]}
          />
          <Col
            label={t({ es: "Estado", en: "Status" })}
            lines={[
              t({ es: "Aceptando proyectos", en: "Accepting projects" }),
              t({ es: "Próximo hueco · junio", en: "Next slot · June" }),
              t({ es: "Respuesta · 24h", en: "Reply within · 24h" }),
            ]}
            dot
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-7 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-paper/35 num-tabular">
          <span>© {YEAR} · Emilio Pastor Zurita</span>
          <span>{t({ es: "Construido con IA", en: "Built with AI" })}</span>
          <span>EP · v1.0</span>
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 select-none font-serif italic leading-none text-paper/[0.03]"
        style={{ fontSize: "clamp(8rem, 18vw, 18rem)" }}
      >
        {YEAR}
      </span>
    </footer>
  );
}

type ColLink = { label: string; href: string; external: boolean; download?: boolean };

function Col({
  label,
  lines,
  links,
  dot,
}: {
  label: string;
  lines?: string[];
  links?: ColLink[];
  dot?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-paper/40">
        {dot && <span aria-hidden className="block h-1 w-1 rounded-full bg-moss animate-blink" />}
        {label}
      </span>
      {lines && (
        <ul className="flex flex-col gap-1.5 text-[0.82rem] leading-[1.55] text-paper/65" role="list">
          {lines.map((ln) => (
            <li key={ln}>{ln}</li>
          ))}
        </ul>
      )}
      {links && (
        <ul className="flex flex-col gap-1.5" role="list">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                download={l.download ? "" : undefined}
                className="group inline-flex items-center gap-2 text-[0.82rem] text-paper/80 transition-colors hover:text-paper"
              >
                <span aria-hidden className="block h-px w-3 origin-left scale-x-50 bg-paper/40 transition-transform duration-300 group-hover:scale-x-100 group-hover:bg-rust" />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
