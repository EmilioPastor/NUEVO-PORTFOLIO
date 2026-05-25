import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        paper: "#F5F3EE",
        paperOff: "#EDEAE3",
        paperDeep: "#E8E4DA",
        ink: "#111111",
        inkSoft: "#1C1C1C",
        muted: {
          DEFAULT: "#888880",
          soft: "#AAAA9F",
        },
        rust: "#D4460F",
        moss: "#1A6B3C",
        line: "rgba(17,17,17,0.12)",
        lineSoft: "rgba(17,17,17,0.06)",
        // shadcn vars
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        serif: ["Instrument Serif", "Georgia", "serif"],
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightish: "-0.02em",
        ultra: "-0.04em",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        grain: {
          "0%,100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(2%,1%)" },
          "40%": { transform: "translate(2%,-1%)" },
          "60%": { transform: "translate(1%,-2%)" },
          "80%": { transform: "translate(2%,2%)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        bounceArrow: {
          "0%,100%": { transform: "rotate(45deg) translateY(0)" },
          "50%": { transform: "rotate(45deg) translateY(4px)" },
        },
        "hl-sheen": {
          "0%": { transform: "translateX(-30%)" },
          "60%, 100%": { transform: "translateX(360%)" },
        },
      },
      animation: {
        blink: "blink 2.5s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marqueeReverse 52s linear infinite",
        bounceArrow: "bounceArrow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
