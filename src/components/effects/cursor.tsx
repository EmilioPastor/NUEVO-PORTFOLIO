import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Cursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mx = -200;
    let my = -200;
    let ringX = -200;
    let ringY = -200;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      label.style.transform = `translate(${mx + 18}px, ${my}px) translate(0, -50%)`;
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const link = t.closest?.("[data-cursor-label]");
      if (link) {
        label.textContent = link.getAttribute("data-cursor-label") ?? "";
        label.style.opacity = "1";
      }
      if (t.closest?.("a, button, label")) {
        dot.style.scale = "2.8";
        dot.style.background = "#D4460F";
        ring.style.opacity = "0";
      }
    };
    const onOut = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const r = e.relatedTarget as HTMLElement | null;
      const link = t.closest?.("a, button, label") as HTMLElement | null;
      if (link && (!r || !link.contains(r))) {
        dot.style.scale = "1";
        dot.style.background = "#D4460F";
        ring.style.opacity = "1";
      }
      const labelEl = t.closest?.("[data-cursor-label]") as HTMLElement | null;
      if (labelEl && (!r || !labelEl.contains(r))) {
        label.style.opacity = "0";
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver as EventListener);
    document.addEventListener("pointerout", onOut as EventListener);

    const loop = () => {
      ringX += (mx - ringX) * 0.2;
      ringY += (my - ringY) * 0.2;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver as EventListener);
      document.removeEventListener("pointerout", onOut as EventListener);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-2 w-2 rounded-full bg-rust transition-[scale] duration-300 will-change-transform"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-8 w-8 rounded-full border border-ink/20 transition-opacity duration-200 will-change-transform"
      />
      <div
        ref={labelRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] whitespace-nowrap border border-line bg-paper px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.15em] text-ink opacity-0 transition-opacity duration-200"
      />
    </>
  );
}
