import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { animate } from "motion/react";
import { STATS } from "@/data/copy";
import { useT } from "@/hooks/use-lang";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (!inView) return;
    const ctl = animate(0, value, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => ctl.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="inline-block">
      {n}
      {suffix && (
        <span className="align-super text-[0.6em] ml-px">{suffix}</span>
      )}
    </span>
  );
}

export function Stats() {
  const t = useT();
  return (
    <section
      aria-label="Métricas"
      className="border-y border-line bg-paperOff"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 px-6 md:grid-cols-4 md:px-12">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="border-r border-line py-10 text-center last:border-r-0 max-md:[&:nth-child(2)]:border-r-0 max-md:[&:nth-child(3)]:border-t max-md:[&:nth-child(4)]:border-t"
          >
            <div
              className="mb-1.5 font-serif italic leading-none text-ink"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">
              {t(s.label)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
