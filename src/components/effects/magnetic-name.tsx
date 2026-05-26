import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const RADIUS = 140;
const MAX_LIFT = 14;

type LetterProps = {
  char: string;
  parentRef: React.RefObject<HTMLElement | null>;
  reduce: boolean;
  index: number;
};

function MagneticLetter({ char, parentRef, reduce, index }: LetterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rot = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });
  const sr = useSpring(rot, { stiffness: 200, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const parent = parentRef.current;
    const el = ref.current;
    if (!parent || !el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > RADIUS) {
        x.set(0);
        y.set(0);
        rot.set(0);
        return;
      }
      const force = 1 - dist / RADIUS;
      const lift = -MAX_LIFT * force;
      const tilt = (dx / RADIUS) * force * 6;
      const drift = (dx / RADIUS) * force * 6;
      x.set(drift);
      y.set(lift);
      rot.set(tilt);
    };

    const onLeave = () => {
      x.set(0);
      y.set(0);
      rot.set(0);
    };

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, parentRef, x, y, rot]);

  if (char === " ") {
    return <span aria-hidden style={{ display: "inline-block", width: "0.32em" }} />;
  }

  return (
    <motion.span
      ref={ref}
      className="inline-block will-change-transform"
      style={reduce ? undefined : { x: sx, y: sy, rotate: sr }}
      initial={reduce ? false : { y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.0, delay: 0.15 + index * 0.022, ease: [0.16, 1, 0.3, 1] }}
    >
      {char}
    </motion.span>
  );
}

export function MagneticName({ lines }: { lines: string[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducePref = useReducedMotion();
  const reduce = reducePref ?? false;
  let globalIndex = 0;

  return (
    <div ref={containerRef} className="relative">
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden leading-[0.92]">
          {line.split("").map((ch, ci) => {
            const i = globalIndex++;
            return (
              <MagneticLetter
                key={`${li}-${ci}`}
                char={ch}
                parentRef={containerRef}
                reduce={reduce}
                index={i}
              />
            );
          })}
        </span>
      ))}
    </div>
  );
}
