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
          className="font-serif text-lg italic tracking-tightish text-ink no-underline"
          aria-label="Emilio Pastor — Inicio"
        >
          Emilio Pastor
        </a>

        <div className="flex items-center gap-6 md:gap-8">
          <ul className="hidden gap-7 md:flex" role="list">
            {NAV_ITEMS.map((it) => (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  className="relative text-[0.78rem] font-medium uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink after:absolute after:-bottom-0.5 after:left-1/2 after:right-1/2 after:h-px after:bg-ink after:transition-[left,right] after:duration-200 hover:after:left-0 hover:after:right-0"
                >
                  {lang === "es" ? it.es : it.en}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center overflow-hidden border border-line">
            {(["en", "es"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  "px-3 py-1.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] transition-colors leading-none",
                  lang === l
                    ? "bg-ink text-paper"
                    : "text-muted hover:text-ink",
                )}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href="#contact"
            data-cursor-label="DIAGNÓSTICO"
            className="hidden border border-ink px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-paper md:inline-block"
          >
            {t(META.hire)}
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
            {t(META.hire)}
          </a>
        </div>
      )}
    </>
  );
}
