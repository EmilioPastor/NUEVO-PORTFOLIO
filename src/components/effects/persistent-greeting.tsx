import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLang } from "@/hooks/use-lang";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const KEY = "ep-visits";

const MESSAGES = {
  es: [
    null,
    "anda, otra vez por aquí",
    "tercera visita. algo te llama, ¿no?",
    "vale, esto ya empieza a ser cariño",
    "venga, escríbeme y dejamos el cortejo",
    "tú sabrás lo que haces. yo aquí sigo",
  ],
  en: [
    null,
    "back already?",
    "third time. something pulling you in?",
    "ok, this is starting to feel like courtship",
    "go on, drop me a line and let's stop circling",
    "your call. i'll be here",
  ],
} as const;

export function PersistentGreeting() {
  const { lang } = useLang();
  const reduced = useReducedMotion();
  const [msg, setMsg] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const prev = parseInt(localStorage.getItem(KEY) || "0", 10);
      const next = Math.min(prev + 1, MESSAGES[lang].length - 1);
      localStorage.setItem(KEY, String(next));
      const text = MESSAGES[lang][next];
      if (!text) return;
      setMsg(text);
      const showAt = setTimeout(() => setOpen(true), 2200);
      const hideAt = setTimeout(() => setOpen(false), 9200);
      return () => {
        clearTimeout(showAt);
        clearTimeout(hideAt);
      };
    } catch {
      return;
    }
  }, [lang]);

  if (!msg) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto fixed right-5 top-20 z-[170] hidden max-w-[280px] border border-ink/12 bg-paperOff/95 px-4 py-3 shadow-[0_18px_40px_-22px_rgba(17,17,17,0.25)] backdrop-blur-[3px] md:block"
        >
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.22em] text-rust">
              EP · dice
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted/70 transition-colors hover:text-ink"
            >
              cerrar
            </button>
          </div>
          <p className="mt-1.5 font-serif text-[1rem] italic leading-[1.35] text-ink">
            {msg}
          </p>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
