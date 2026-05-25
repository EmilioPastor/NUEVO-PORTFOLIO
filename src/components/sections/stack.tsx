import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SectionHead } from "@/components/section-head";
import { STACK } from "@/data/copy";
import { useT } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

function Bar({ pct, hot }: { pct: number; hot: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [w, setW] = useState(pct);

  useEffect(() => {
    if (!inView) return;
    setW(0);
    const id = window.requestAnimationFrame(() => setW(pct));
    return () => window.cancelAnimationFrame(id);
  }, [inView, pct]);

  return (
    <div ref={ref} className="h-[1.5px] w-full overflow-hidden rounded-sm bg-line">
      <div
        className={cn(
          "h-full rounded-sm transition-[width] [transition-duration:1200ms]",
          hot ? "bg-rust" : "bg-ink/80",
        )}
        style={{
          width: `${w}%`,
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
    </div>
  );
}

export function Stack() {
  const t = useT();
  return (
    <section
      id="stack"
      aria-label="Stack"
      className="border-t border-line bg-paperOff px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          label={t({ es: "Cómo construyo", en: "How I build" })}
          title={t({ es: "Stack y herramientas", en: "Stack and tools" })}
        />
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {STACK.map((col, i) => (
            <motion.div
              key={i}
              initial={{ y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-paperOff p-7"
            >
              <h3
                className={cn(
                  "mb-6 border-b border-line pb-3 font-mono text-[0.65rem] uppercase tracking-[0.14em]",
                  i === STACK.length - 1 ? "text-rust" : "text-muted",
                )}
              >
                {t(col.title)}
              </h3>
              <ul className="flex flex-col gap-3.5" role="list">
                {col.items.map((it, j) => (
                  <li key={j} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.88rem] font-medium text-ink">{it.name}</span>
                      <span
                        className={cn(
                          "font-mono text-[0.6rem] tracking-[0.05em]",
                          it.hot ? "text-rust" : "text-muted/80",
                        )}
                      >
                        {t(it.note)}
                      </span>
                    </div>
                    <Bar pct={it.level} hot={it.hot} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
