import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const COUNT = 70;
const REPEL_RADIUS = 130;

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  base: number;
};

export function Particles({ targetSelector = "#top" }: { targetSelector?: string }) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const target = document.querySelector(targetSelector) as HTMLElement | null;
    if (!target) return;

    const dots: Dot[] = [];
    let w = 0;
    let h = 0;
    let mx = -9999;
    let my = -9999;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!target || !canvas || !ctx) return;
      const rect = target.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    for (let i = 0; i < COUNT; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        base: Math.random() * 1.4 + 0.6,
      });
    }

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          d.x += (dx / dist) * force * 1.2;
          d.y += (dy / dist) * force * 1.2;
        }
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10;
        if (d.y > h + 10) d.y = -10;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.base, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(17,17,17,0.22)";
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    function onMove(e: PointerEvent) {
      if (!target) return;
      const rect = target.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    }
    function onLeave() {
      mx = -9999;
      my = -9999;
    }
    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [reduce, targetSelector]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1]"
    />
  );
}
