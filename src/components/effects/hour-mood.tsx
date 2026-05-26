import { useEffect } from "react";

type Mood = "dawn" | "morning" | "midday" | "afternoon" | "dusk" | "night";

function moodFor(h: number): Mood {
  if (h < 6) return "night";
  if (h < 9) return "dawn";
  if (h < 13) return "morning";
  if (h < 17) return "midday";
  if (h < 20) return "afternoon";
  if (h < 23) return "dusk";
  return "night";
}

const TINTS: Record<Mood, { paper: string; ink: string; rust: string }> = {
  dawn:      { paper: "#F7F2EA", ink: "#181410", rust: "#E25517" },
  morning:   { paper: "#F6F3EC", ink: "#141312", rust: "#D8480F" },
  midday:    { paper: "#F5F3EE", ink: "#111111", rust: "#D4460F" },
  afternoon: { paper: "#F4F1EA", ink: "#131211", rust: "#C73E0B" },
  dusk:      { paper: "#F1ECE2", ink: "#161311", rust: "#BE3608" },
  night:     { paper: "#EFEBE1", ink: "#191613", rust: "#A82E05" },
};

export function HourMood() {
  useEffect(() => {
    const apply = () => {
      const cordobaNow = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" }),
      );
      const m = moodFor(cordobaNow.getHours());
      const t = TINTS[m];
      const root = document.documentElement;
      root.style.setProperty("--mood-paper", t.paper);
      root.style.setProperty("--mood-ink", t.ink);
      root.style.setProperty("--mood-rust", t.rust);
      root.dataset.mood = m;
    };
    apply();
    const id = setInterval(apply, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return null;
}
