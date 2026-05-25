import { motion } from "motion/react";
import type { ReactNode } from "react";

interface Props {
  label: ReactNode;
  title: ReactNode;
  count?: ReactNode;
  dark?: boolean;
}

export function SectionHead({ label, title, count, dark }: Props) {
  return (
    <motion.div
      initial={{ y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-10 flex flex-wrap items-end justify-between gap-6 border-b pb-5 ${
        dark ? "border-paper/10" : "border-line"
      }`}
    >
      <div>
        <div
          className={`mb-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${
            dark ? "text-paper/40" : "text-muted"
          }`}
        >
          {label}
        </div>
        <h2
          className={`font-serif italic leading-[1.1] tracking-tightish ${
            dark ? "text-paper" : "text-ink"
          }`}
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
        >
          {title}
        </h2>
      </div>
      {count && (
        <div
          className={`font-mono text-[0.7rem] tracking-[0.08em] ${
            dark ? "text-paper/30" : "text-muted/80"
          }`}
        >
          {count}
        </div>
      )}
    </motion.div>
  );
}
