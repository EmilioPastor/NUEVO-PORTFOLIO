import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TRAIL = 6;

export function Cursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = -200,
      my = -200;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    const trail = trailRefs.current.map((el) => ({ el, x: -200, y: -200 }));
    let ringX = -200,
      ringY = -200;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      label.style.transform = `translate(${mx + 18}px, ${my}px) translate(0, -50%)`;
    };

    const onOverInteractive = (e: Event) => {
      const t = e.target as HTMLElement;
      const link = t.closest?.("[data-cursor-label]");
      if (link) {
        const txt = link.getAttribute("data-cursor-label") ?? "";
        label.textContent = txt;
        label.style.opacity = "1";
      }
      if (t.closest?.("a, button, label")) {
        dot.style.scale = "2.6";
        ring.style.scale = "1.7";
        ring.style.borderColor = "var(--accent-color, #D4460F)";
      }
    };
    const onOutInteractive = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest?.("a, button, label")) {
        dot.style.scale = "1";
        ring.style.scale = "1";
        ring.style.borderColor = "rgba(17,17,17,0.25)";
      }
      if (t.closest?.("[data-cursor-label]")) {
        label.style.opacity = "0";
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOverInteractive);
    document.addEventListener("pointerout", onOutInteractive);

    let raf = 0;
    const loop = () => {
      ringX += (mx - ringX) * 0.18;
      ringY += (my - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      let prevX = mx,
        prevY = my;
      for (const t of trail) {
        t.x += (prevX - t.x) * 0.32;
        t.y += (prevY - t.y) * 0.32;
        t.el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`;
        prevX = t.x;
        prevY = t.y;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOverInteractive);
      document.removeEventListener("pointerout", onOutInteractive);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-2 w-2 rounded-full bg-rust transition-[scale] duration-300 will-change-transform"
        style={{ scale: 1 }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-8 w-8 rounded-full border border-ink/25 transition-[scale,border-color] duration-300 will-change-transform"
        style={{ scale: 1 }}
      />
      <div
        ref={labelRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] whitespace-nowrap border border-line bg-paper px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.15em] text-ink opacity-0 transition-opacity duration-200"
      />
      {Array.from({ length: TRAIL }).map((_, i) => {
        const size = Math.max(2, 6 - i * 0.7);
        return (
          <div
            key={i}
            aria-hidden
            ref={(el) => {
              if (el) trailRefs.current[i] = el;
            }}
            className="pointer-events-none fixed left-0 top-0 z-[9996] rounded-full bg-rust mix-blend-multiply will-change-transform"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: (1 - i / TRAIL) * 0.55,
            }}
          />
        );
      })}
    </>
  );
}
