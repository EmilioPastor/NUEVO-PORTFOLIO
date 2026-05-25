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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-14 flex flex-wrap items-end justify-between gap-6 border-b pb-5 ${
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
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "105%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className={`font-serif italic leading-[1.1] tracking-tightish ${
              dark ? "text-paper" : "text-ink"
            }`}
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            {title}
          </motion.h2>
        </div>
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
