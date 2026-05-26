import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, META } from "@/data/copy";
import { useLang, useT } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

export function Nav() {
  const t = useT();
  const { lang, setLang } = useLang();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav
        aria-label="Navegación principal"
        className={cn(
          "fixed inset-x-0 top-0 z-[200] flex items-center justify-between px-6 py-5 transition-all duration-300 md:px-12",
          solid
            ? "border-b border-line bg-paper/90 py-3.5 backdrop-blur-md"
            : "mix-blend-multiply",
        )}
      >
        <a
          href="#top"
          className="group inline-flex items-baseline gap-2 font-serif text-lg italic tracking-tightish text-ink no-underline"
          aria-label="Emilio Pastor — Inicio"
        >
          <span
            aria-hidden
            className="block h-1.5 w-1.5 rounded-full bg-rust transition-transform duration-500 group-hover:scale-150"
          />
          Emilio Pastor
        </a>

        <div className="flex items-center gap-6 md:gap-8">
          <ul className="hidden gap-7 md:flex" role="list">
            {NAV_ITEMS.map((it) => (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  className="group relative inline-block text-[0.78rem] font-medium uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink"
                >
                  <span className="relative">
                    {lang === "es" ? it.es : it.en}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-1/2 right-1/2 h-px bg-ink transition-[left,right] duration-300 group-hover:left-0 group-hover:right-0"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div
            role="group"
            aria-label="Cambiar idioma"
            className="flex items-baseline gap-1 font-mono text-[0.62rem] uppercase tracking-[0.12em]"
          >
            {(["en", "es"] as const).map((l, i) => (
              <span key={l} className="flex items-baseline">
                {i > 0 && <span aria-hidden className="mr-1 text-muted/30">/</span>}
                <button
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={cn(
                    "transition-colors",
                    lang === l ? "text-ink" : "text-muted/55 hover:text-ink",
                  )}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>

          <a
            href="#contact"
            data-cursor-label="HABLAR"
            className="group hidden items-center gap-2 border-b border-ink/30 pb-1 pl-0 pr-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink transition-colors hover:border-rust hover:text-rust md:inline-flex"
          >
            <span>{t(META.hire)}</span>
            <span
              aria-hidden
              className="text-[0.95rem] leading-none transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </a>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mob-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mob-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-[199] flex flex-col items-start justify-end gap-3 bg-paper p-12 md:hidden"
        >
          {NAV_ITEMS.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              onClick={() => setOpen(false)}
              className="font-serif text-5xl italic leading-tight text-ink no-underline"
            >
              {lang === "es" ? it.es : it.en}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 font-serif text-5xl italic leading-tight text-rust no-underline"
          >
            {t(META.hire)} →
          </a>
        </div>
      )}
    </>
  );
}
