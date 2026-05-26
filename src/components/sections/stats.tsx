import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import { STATS } from "@/data/copy";
import { useT } from "@/hooks/use-lang";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(value);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const ran = useRef(false);

  useEffect(() => {
    if (!inView || ran.current) return;
    ran.current = true;
    setN(0);
    const ctl = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setN(value),
    });
    return () => ctl.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="inline-block num-tabular">
      {n}
      {suffix && (
        <span className="align-super text-[0.5em] ml-0.5 text-rust/80">
          {suffix}
        </span>
      )}
    </span>
  );
}

export function Stats() {
  const t = useT();
  return (
    <section aria-label="Métricas" className="relative border-y border-line bg-paperOff">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 px-6 md:grid-cols-4 md:px-12">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col items-start gap-4 py-12 pl-6 pr-6 md:pl-8"
          >
            <span
              aria-hidden
              className="absolute left-0 top-7 block h-3 w-px bg-rust/70"
            />
            <span
              aria-hidden
              className="absolute right-0 top-0 hidden h-full w-px bg-line md:block last:hidden"
            />
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/70 num-tabular">
              0{i + 1} / 0{STATS.length}
            </span>

            <div
              className="font-serif italic leading-none text-ink"
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 4.4rem)",
                letterSpacing: "-0.032em",
              }}
            >
              <Counter value={s.value} suffix={s.suffix} />
            </div>

            <div className="flex items-start gap-2.5">
              <span aria-hidden className="mt-[0.7em] block h-px w-3 bg-ink/35" />
              <p className="max-w-[18ch] font-mono text-[0.62rem] uppercase leading-[1.55] tracking-[0.16em] text-muted/85">
                {t(s.label)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
