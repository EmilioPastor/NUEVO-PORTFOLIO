import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { SectionHead } from "@/components/section-head";
import { CASES } from "@/data/copy";
import { useT } from "@/hooks/use-lang";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Cases() {
  const reduced = useReducedMotion();
  if (reduced) return <CasesFallback />;
  return <CasesPinned />;
}

function CasesPinned() {
  const t = useT();
  const total = String(CASES.length).padStart(2, "0");
  return (
    <section
      id="casos"
      aria-label="Casos"
      className="border-t border-line bg-paper"
    >
      <div className="mx-auto max-w-[1200px] px-6 pt-16 md:px-12 md:pt-24">
        <SectionHead
          label={t({ es: "Casos", en: "Cases" })}
          title={t({ es: "Proyectos destacados", en: "Featured projects" })}
          count={t({ es: `${total} casos`, en: `${total} cases` })}
        />
      </div>
      <PinnedRail />
    </section>
  );
}

function PinnedRail() {
  const t = useT();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  const totalCards = CASES.length;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(totalCards - 1) * (100 / totalCards)}%`]);
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={targetRef}
      style={{ height: `${totalCards * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-6 border-y border-line bg-paper px-6 py-4 md:px-12">
          <ActiveCounter progress={scrollYProgress} total={totalCards} />
          <div className="relative h-px flex-1 max-w-[480px] bg-ink/12">
            <motion.span
              aria-hidden
              className="absolute inset-y-0 left-0 bg-rust"
              style={{ width: progressW }}
            />
          </div>
          <span className="hidden font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/65 md:inline">
            {t({ es: "scroll para avanzar", en: "scroll to advance" })}
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <motion.div
            style={{ x, width: `${totalCards * 100}%` }}
            className="flex h-full"
          >
            {CASES.map((c, i) => (
              <CasePanel key={c.n} c={c} i={i} total={totalCards} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ActiveCounter({ progress, total }: { progress: MotionValue<number>; total: number }) {
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    setIdx(Math.min(total - 1, Math.max(0, Math.round(v * (total - 1)))));
  });
  return (
    <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-rust num-tabular">
      caso · {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </span>
  );
}

function CasePanel({ c, i, total }: { c: (typeof CASES)[number]; i: number; total: number }) {
  const t = useT();
  return (
    <article
      aria-label={t(c.title)}
      className="relative flex h-full flex-col justify-center px-6 md:px-16"
      style={{ flex: `0 0 ${100 / total}%`, width: `${100 / total}%` }}
    >
      <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 text-muted">
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-rust">
              caso · {c.n}
            </span>
            <span aria-hidden className="block h-px w-8 bg-ink/15" />
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted/70">
              {t(c.sector)}
            </span>
          </div>

          <h3
            className="mt-5 font-serif italic leading-[1.0] tracking-[-0.022em] text-ink"
            style={{ fontSize: "clamp(2.6rem, 4.6vw, 4.4rem)" }}
          >
            {c.mark}
          </h3>

          <p
            className="mt-3 font-serif italic leading-[1.15] text-ink/65"
            style={{ fontSize: "clamp(1rem, 1.3vw, 1.25rem)" }}
          >
            {t(c.title)}
          </p>

          <div className="mt-8 flex flex-col gap-6 border-t border-line pt-6">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2.5">
                <span aria-hidden className="block h-px w-5 bg-ink/25" />
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/65">
                  {t({ es: "Problema", en: "Problem" })}
                </span>
              </span>
              <p className="font-serif text-[0.98rem] italic leading-[1.55] text-ink/65">
                {t(c.problem)}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2.5">
                <span aria-hidden className="block h-px w-5 bg-rust" />
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-rust">
                  {t({ es: "Solución", en: "Outcome" })}
                </span>
              </span>
              <p className="text-[0.98rem] leading-[1.6] text-ink">
                {t(c.result)}
              </p>
            </div>

            <ul className="flex flex-wrap gap-1.5" role="list">
              {t(c.tags).map((tg) => (
                <li
                  key={tg}
                  className="border border-ink/15 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted"
                >
                  {tg}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-[460px]">
            <Corner pos="tl" />
            <Corner pos="tr" />
            <Corner pos="bl" />
            <Corner pos="br" />
            <div className="relative aspect-[4/5] overflow-hidden bg-paperOff/85 shadow-[0_30px_70px_-35px_rgba(17,17,17,0.22)]">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(17,17,17,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.04) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="flex items-baseline justify-between font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/55">
                  <span>obra · {c.n}</span>
                  <span>{t({ es: "estudio · EP", en: "studio · EP" })}</span>
                </div>

                <div className="text-center">
                  <span
                    className="block font-serif italic leading-none text-ink/90"
                    style={{ fontSize: "clamp(4rem, 7vw, 6.5rem)", letterSpacing: "-0.04em" }}
                  >
                    {c.n}
                  </span>
                  <span
                    className="mt-4 block font-serif italic leading-tight text-ink"
                    style={{ fontSize: "clamp(1.4rem, 1.8vw, 1.8rem)" }}
                  >
                    {c.mark}
                  </span>
                  <span className="mt-2 block font-mono text-[0.55rem] uppercase tracking-[0.22em] text-rust">
                    {t(c.sector).split("·")[0]?.trim()}
                  </span>
                </div>

                <div className="flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/55">
                  <span>caso de estudio</span>
                  <span>
                    {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 border-l border-t",
    tr: "right-0 top-0 translate-x-1/2 -translate-y-1/2 border-r border-t",
    bl: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2 border-l border-b",
    br: "right-0 bottom-0 translate-x-1/2 translate-y-1/2 border-r border-b",
  } as const;
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-10 h-3 w-3 border-rust/70 ${map[pos]}`}
    />
  );
}

function CasesFallback() {
  const t = useT();
  const total = String(CASES.length).padStart(2, "0");
  return (
    <section
      id="casos"
      aria-label="Casos"
      className="border-t border-line bg-paper px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          label={t({ es: "Casos", en: "Cases" })}
          title={t({ es: "Proyectos destacados", en: "Featured projects" })}
          count={t({ es: `${total} casos`, en: `${total} cases` })}
        />
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          {CASES.map((c) => (
            <article key={c.n} className="flex flex-col gap-4 bg-paper p-8">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-rust">caso · {c.n}</span>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted/70">{t(c.sector)}</span>
              </div>
              <h3 className="font-serif text-2xl italic leading-tight text-ink">{t(c.title)}</h3>
              <p className="font-serif italic text-ink/65">{t(c.problem)}</p>
              <p className="text-ink">{t(c.result)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
