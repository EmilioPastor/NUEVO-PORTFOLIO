import { useEffect, useState } from "react";
import { useT } from "@/hooks/use-lang";

const ITEMS = [
  { id: "top", num: "00", label: { es: "Inicio", en: "Top" } },
  { id: "services", num: "01", label: { es: "Servicios", en: "Services" } },
  { id: "process", num: "02", label: { es: "Proceso", en: "Process" } },
  { id: "casos", num: "03", label: { es: "Casos", en: "Cases" } },
  { id: "about", num: "04", label: { es: "Sobre mí", en: "About" } },
  { id: "experience", num: "05", label: { es: "Trayectoria", en: "Background" } },
  { id: "meta", num: "06", label: { es: "Esta web", en: "This site" } },
  { id: "contact", num: "07", label: { es: "Contacto", en: "Contact" } },
];

export function TocRail() {
  const t = useT();
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const sections = ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!best || e.intersectionRatio > best.intersectionRatio) {
            best = e;
          }
        }
        if (best) {
          setActive((best.target as HTMLElement).id);
        }
      },
      { threshold: [0.2, 0.4, 0.6] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Índice del portfolio"
      className="pointer-events-auto fixed left-5 top-1/2 z-[150] hidden -translate-y-1/2 xl:block"
      data-print-hide
    >
      <ol role="list" className="flex flex-col gap-1">
        {ITEMS.map((it) => {
          const isActive = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`group flex items-center gap-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] transition-colors ${
                  isActive ? "text-ink" : "text-muted/45 hover:text-ink"
                }`}
              >
                <span
                  aria-hidden
                  className={`block h-px transition-all duration-500 ${
                    isActive ? "w-7 bg-rust" : "w-3 bg-ink/25 group-hover:w-5 group-hover:bg-ink"
                  }`}
                />
                <span className="num-tabular">{it.num}</span>
                <span
                  className={`transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {t(it.label)}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
