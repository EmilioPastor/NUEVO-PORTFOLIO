import { useEffect } from "react";

const MOODS: Record<string, { tint: string; accent: string }> = {
  top:        { tint: "transparent",       accent: "rgba(212,70,15,0.0)" },
  services:   { tint: "rgba(17,17,17,0.018)",   accent: "rgba(212,70,15,0.02)" },
  process:    { tint: "rgba(26,107,60,0.025)",  accent: "rgba(26,107,60,0.03)" },
  casos:      { tint: "rgba(17,17,17,0.04)",    accent: "rgba(212,70,15,0.035)" },
  about:      { tint: "rgba(199,165,110,0.04)", accent: "rgba(199,165,110,0.03)" },
  experience: { tint: "rgba(17,17,17,0.03)",    accent: "rgba(17,17,17,0.04)" },
  stack:      { tint: "rgba(17,17,17,0.02)",    accent: "rgba(212,70,15,0.025)" },
  contact:    { tint: "transparent",            accent: "transparent" },
};

export function SectionMood() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]"),
    );
    if (!sections.length) return;

    let current = "";

    const apply = (id: string) => {
      if (id === current) return;
      current = id;
      const m = MOODS[id] || MOODS.top;
      const root = document.documentElement;
      root.style.setProperty("--section-tint", m.tint);
      root.style.setProperty("--section-accent", m.accent);
      root.dataset.section = id;
    };

    const io = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!best || e.intersectionRatio > best.intersectionRatio) {
            best = e;
          }
        }
        if (best) {
          const id = (best.target as HTMLElement).id;
          if (id) apply(id);
        }
      },
      { threshold: [0.25, 0.5, 0.75] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return null;
}
