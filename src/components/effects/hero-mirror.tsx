import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "@/hooks/use-lang";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const CYCLE_MS = 6200;

type Mirror = {
  sector: { es: string; en: string };
  question: { es: string; en: string };
  prefill: { es: string; en: string };
};

const MIRRORS: Mirror[] = [
  {
    sector: { es: "Despacho · Extranjería", en: "Law firm · Immigration" },
    question: {
      es: "¿Tu despacho se ahoga en Excel y plazos a mano?",
      en: "Is your firm drowning in spreadsheets and manual deadlines?",
    },
    prefill: {
      es: "Llevo un despacho y los plazos los gestionamos a mano con Excel y emails. Me gustaría ver cómo se podría automatizar.",
      en: "I run a law firm and we track deadlines by hand with spreadsheets and emails. I'd like to see how this could be automated.",
    },
  },
  {
    sector: { es: "Clínica · Operativa", en: "Clinic · Operations" },
    question: {
      es: "¿Tu clínica pierde huecos por una agenda en papel?",
      en: "Is your clinic losing slots to a paper agenda?",
    },
    prefill: {
      es: "Tenemos una clínica con agenda en papel y perdemos huecos por dobles reservas. Me gustaría ver cómo automatizar la gestión.",
      en: "We run a clinic on a paper agenda and lose slots to double bookings. I'd like to see how to automate this.",
    },
  },
  {
    sector: { es: "Web · Captación", en: "Web · Lead-gen" },
    question: {
      es: "¿Tu landing no convierte porque nadie sabe quién entra?",
      en: "Is your landing not converting because nobody knows who visits?",
    },
    prefill: {
      es: "Tenemos una web que no convierte y no medimos quién entra. Necesito una landing pensada para captar clientes reales.",
      en: "Our site doesn't convert and we don't track who visits. I need a landing built to capture real clients.",
    },
  },
  {
    sector: { es: "Tu negocio · Hoy", en: "Your business · Today" },
    question: {
      es: "¿Cada semana pierdes horas que ya no recuperas?",
      en: "Are you losing hours every week you'll never get back?",
    },
    prefill: {
      es: "Tengo procesos repetitivos que cada semana me quitan horas. Quiero saber qué se puede automatizar y en cuánto tiempo.",
      en: "I have repetitive processes eating hours every week. I want to know what can be automated and how fast.",
    },
  },
];

export function HeroMirror() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setIdx((v) => (v + 1) % MIRRORS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  const m = MIRRORS[idx];

  function answerYes() {
    const detail = { text: m.prefill[lang] };
    window.dispatchEvent(new CustomEvent("prefill-contact", { detail }));
    const target = document.getElementById("contact");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <aside
      aria-label={lang === "es" ? "Pregunta espejo" : "Mirror question"}
      className="absolute right-[3vw] top-1/2 z-[3] hidden w-[clamp(360px,30vw,440px)] -translate-y-1/2 select-none lg:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative isolate flex flex-col border border-ink/15 bg-paper/90 backdrop-blur-sm shadow-[0_30px_70px_-32px_rgba(20,20,20,0.4)]">
        <CornerTicks />
        <Masthead lang={lang} />
        <Portrait />
        <SectorBadge sector={m.sector[lang]} idx={idx} total={MIRRORS.length} reduce={reduce} k={m.question.es} />
        <Question text={m.question[lang]} k={m.question.es} reduce={reduce} />
        <CTAButton onClick={answerYes} lang={lang} />
        <Progress idx={idx} total={MIRRORS.length} paused={paused} reduce={reduce} />
      </div>
    </aside>
  );
}

function CornerTicks() {
  return (
    <>
      <span aria-hidden className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l border-t border-rust" />
      <span aria-hidden className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r border-t border-rust" />
      <span aria-hidden className="pointer-events-none absolute -left-px -bottom-px h-3 w-3 border-l border-b border-rust" />
      <span aria-hidden className="pointer-events-none absolute -right-px -bottom-px h-3 w-3 border-r border-b border-rust" />
    </>
  );
}

function Masthead({ lang }: { lang: "es" | "en" }) {
  return (
    <header className="flex items-center justify-between border-b border-ink/10 px-5 py-2.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/80">
      <span className="flex items-center gap-2">
        <span aria-hidden className="block h-2 w-2 rotate-45 bg-rust" />
        <span className="text-rust">emilio</span>
        <span className="opacity-50">·</span>
        <span>{lang === "es" ? "freelance" : "freelance"}</span>
      </span>
      <span className="text-muted/60">
        {lang === "es" ? "¿esto es para ti?" : "is this you?"}
      </span>
    </header>
  );
}

function Portrait() {
  return (
    <div className="relative overflow-hidden border-b border-ink/10">
      <div className="relative" style={{ aspectRatio: "4 / 3.3" }}>
        <img
          src="/assets/emilio.jpg"
          alt="Emilio Pastor"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: "center 22%",
            filter: "grayscale(0.7) sepia(0.15) contrast(1.05) brightness(0.97)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            background: "linear-gradient(180deg, rgba(212,70,15,0) 0%, rgba(212,70,15,0.18) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            backgroundSize: "180px",
          }}
        />
        <span
          aria-hidden
          className="absolute bottom-3 left-4 font-mono text-[0.5rem] uppercase tracking-[0.22em] text-paper/85"
        >
          córdoba · 2026
        </span>
        <span
          aria-hidden
          className="absolute bottom-3 right-4 font-serif italic text-paper/85"
          style={{ fontSize: "0.85rem" }}
        >
          emilio.
        </span>
      </div>
    </div>
  );
}

function SectorBadge({
  sector,
  idx,
  total,
  reduce,
  k,
}: {
  sector: string;
  idx: number;
  total: number;
  reduce: boolean;
  k: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 pt-4 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted/85">
      <AnimatePresence mode="wait">
        <motion.span
          key={k + "-s"}
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <span aria-hidden className="text-rust">→</span>
          {sector}
        </motion.span>
      </AnimatePresence>
      <span className="tabular-nums text-muted/55">
        {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

function Question({
  text,
  k,
  reduce,
}: {
  text: string;
  k: string;
  reduce: boolean;
}) {
  return (
    <div className="px-5 pb-5 pt-3" style={{ minHeight: "150px" }}>
      <AnimatePresence mode="wait">
        <motion.h2
          key={k}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-ink"
          style={{
            fontSize: "clamp(1.45rem, 2.1vw, 1.85rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.018em",
          }}
        >
          {text}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}

function CTAButton({ onClick, lang }: { onClick: () => void; lang: "es" | "en" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor-label={lang === "es" ? "RESPONDER" : "ANSWER"}
      className="group relative isolate flex items-center justify-between gap-3 border-t border-ink/15 bg-paper px-5 py-3.5 text-left font-mono text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-paper before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-ink before:transition-transform before:duration-500 hover:before:scale-x-100"
    >
      <span className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="block h-1.5 w-1.5 rounded-full bg-rust transition-colors group-hover:bg-paper"
        />
        <span>{lang === "es" ? "sí, ese soy yo" : "yes, that's me"}</span>
      </span>
      <span
        aria-hidden
        className="font-serif italic text-rust transition-transform duration-300 group-hover:translate-x-1 group-hover:text-paper"
        style={{ fontSize: "1.15rem", lineHeight: 1 }}
      >
        →
      </span>
    </button>
  );
}

function Progress({
  idx,
  total,
  paused,
  reduce,
}: {
  idx: number;
  total: number;
  paused: boolean;
  reduce: boolean;
}) {
  return (
    <div className="grid grid-cols-4 gap-1 border-t border-ink/10 px-5 py-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const active = i === idx;
        const past = i < idx;
        return (
          <div key={i} className="relative h-[2px] overflow-hidden bg-ink/12">
            <motion.div
              key={`${idx}-${i}-${paused ? "p" : "r"}`}
              initial={{ width: past ? "100%" : "0%" }}
              animate={{ width: active && !paused ? "100%" : past ? "100%" : "0%" }}
              transition={{
                duration: active && !paused && !reduce ? CYCLE_MS / 1000 : 0.3,
                ease: "linear",
              }}
              className="absolute inset-y-0 left-0 bg-rust"
            />
          </div>
        );
      })}
    </div>
  );
}
