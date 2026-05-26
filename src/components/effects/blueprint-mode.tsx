import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function BlueprintMode() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const isTyping = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el.isContentEditable
      );
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "b" && e.key !== "B") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping(e.target)) return;
      e.preventDefault();
      setOn((v) => !v);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.blueprint = on ? "true" : "";
  }, [on]);

  return (
    <AnimatePresence>
      {on && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none fixed bottom-5 right-5 z-[9995] hidden border border-rust/40 bg-paperOff/95 px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-rust shadow-[0_18px_40px_-22px_rgba(17,17,17,0.3)] backdrop-blur-[3px] md:block"
        >
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="block h-1 w-1 rounded-full bg-rust animate-blink" />
            modo blueprint · pulsa B para salir
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
