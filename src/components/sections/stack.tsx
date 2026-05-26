import { motion } from "motion/react";
import { SectionHead } from "@/components/section-head";
import { STACK } from "@/data/copy";
import { useT } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

function levelToDots(level: number) {
  return Math.max(1, Math.min(5, Math.round(level / 20)));
}

function Dots({ level, hot }: { level: number; hot: boolean }) {
  const filled = levelToDots(level);
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "block h-1 w-1 rounded-full transition-colors",
            i < filled
              ? hot
                ? "bg-rust"
                : "bg-ink"
              : "bg-ink/15",
          )}
        />
      ))}
    </span>
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
          count={t({ es: `0${STACK.length} áreas`, en: `0${STACK.length} areas` })}
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
              <header className="mb-5 flex items-baseline justify-between border-b border-line pb-3">
                <h3
                  className={cn(
                    "font-mono text-[0.6rem] uppercase tracking-[0.22em]",
                    i === STACK.length - 1 ? "text-rust" : "text-ink",
                  )}
                >
                  {t(col.title)}
                </h3>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted/60 num-tabular">
                  0{col.items.length}
                </span>
              </header>
              <ul className="flex flex-col" role="list">
                {col.items.map((it, j) => (
                  <li
                    key={j}
                    className="group flex items-center justify-between gap-3 border-b border-ink/[0.06] py-2.5 last:border-b-0"
                  >
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[0.85rem] font-medium text-ink transition-colors">
                        {it.name}
                      </span>
                      <span
                        className={cn(
                          "font-mono text-[0.55rem] uppercase tracking-[0.16em]",
                          it.hot ? "text-rust" : "text-muted/70",
                        )}
                      >
                        {t(it.note)}
                      </span>
                    </span>
                    <Dots level={it.level} hot={it.hot} />
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
