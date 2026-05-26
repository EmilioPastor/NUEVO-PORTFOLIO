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
      className={`mb-12 flex flex-wrap items-end justify-between gap-6 border-b pb-6 ${
        dark ? "border-paper/10" : "border-line"
      }`}
    >
      <div className="flex flex-col">
        <div
          className={`mb-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] ${
            dark ? "text-paper/40" : "text-muted"
          }`}
        >
          {label}
        </div>
        <h2
          className={`font-serif italic leading-[1.05] tracking-tightish ${
            dark ? "text-paper" : "text-ink"
          }`}
          style={{ fontSize: "clamp(2.2rem, 4.2vw, 3.4rem)" }}
        >
          {title}
        </h2>
      </div>
      {count && (
        <div
          className={`num-tabular font-mono text-[0.68rem] uppercase tracking-[0.18em] ${
            dark ? "text-paper/30" : "text-muted/75"
          }`}
        >
          {count}
        </div>
      )}
    </motion.div>
  );
}
