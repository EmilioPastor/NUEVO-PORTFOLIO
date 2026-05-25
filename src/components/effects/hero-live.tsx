import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/hooks/use-lang";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { HERO_CASES, STATE_LABEL, type FlowStep } from "@/data/hero-cases";

const CYCLE_MS = 9400;
const COORDS = "37.88° N · 4.78° W";

const SNIPPETS = [
  `const cases = await db.expedientes.all();
ai.deadlines(cases).notify(legal);
return erp.ship();   // ✓ shipped`,
  `const slots = agenda.live();
panel.merge(slots).onConflict(retry);
return team.unblock();  // ✓ shipped`,
  `const intent = visitor.signal();
landing.optimize(intent) → funnel++;
return crm.qualify(); // ✓ shipped`,
  `const orders = pos.stream();
orders.validate(menu).route(kitchen);
return service.focus(); // ✓ shipped`,
];

export function HeroLive() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const [caseIdx, setCaseIdx] = useState(0);
  const time = useMadridClock();
  const tiltRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setCaseIdx((v) => (v + 1) % HERO_CASES.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const el = tiltRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const cx = e.clientX - r.left - r.width / 2;
        const cy = e.clientY - r.top - r.height / 2;
        const dist = Math.hypot(cx, cy);
        if (dist > Math.max(r.width, r.height)) {
          el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)";
          return;
        }
        const rx = (-cy / r.height) * 7;
        const ry = (cx / r.width) * 9;
        el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)";
      });
    };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  const c = HERO_CASES[caseIdx];
  const snippet = SNIPPETS[caseIdx];

  return (
    <aside
      aria-label={lang === "es" ? "Diagnóstico IA en vivo" : "Live AI diagnosis"}
      className="pointer-events-none absolute right-3 top-1/2 z-[3] hidden w-[clamp(360px,30vw,460px)] -translate-y-1/2 lg:block"
      style={{ perspective: 1100 }}
    >
      <div
        ref={tiltRef}
        className="relative isolate transition-transform duration-300 [transform-style:preserve-3d] will-change-transform"
        style={{ transform: "perspective(1100px) rotateX(0deg) rotateY(0deg)" }}
      >
        <div className="relative isolate border border-ink/15 bg-paper/85 shadow-[0_30px_60px_-30px_rgba(17,17,17,0.25)] backdrop-blur-sm">
          <Scanlines />
          <Sheen />
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />

          <Header
            caseId={c.id}
            idx={caseIdx}
            total={HERO_CASES.length}
            latency={c.signal.latencyMs}
            lang={lang}
          />

          <div className="px-5 pb-4 pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${lang}-${caseIdx}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <SectorLine sector={c.sector[lang]} roi={c.signal.roi} />
                <Reasoning lines={c.reasoning[lang]} reduce={reduce} />
                <Flow steps={c.flow} lang={lang} reduce={reduce} />
                <Comparator
                  tradi={c.tradi[lang]}
                  mine={c.mine[lang]}
                  lang={lang}
                />
                <Outcome text={c.outcome[lang]} reduce={reduce} idx={caseIdx} />
              </motion.div>
            </AnimatePresence>
          </div>

          <ConsoleStream caseId={c.id} reduce={reduce} idx={caseIdx} />

          <Telemetry
            confidence={c.signal.confidence}
            tokens={c.signal.tokens}
          />
          <Signature time={time} lang={lang} />
        </div>

        <SnippetCard code={snippet} caseId={c.id} reduce={reduce} idx={caseIdx} />
      </div>
    </aside>
  );
}

function useMadridClock() {
  const [time, setTime] = useState(() => formatMadrid(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setTime(formatMadrid(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function formatMadrid(d: Date) {
  try {
    return new Intl.DateTimeFormat("es-ES", {
      timeZone: "Europe/Madrid",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(d);
  } catch {
    return d.toTimeString().slice(0, 8);
  }
}

function Scanlines() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 opacity-[0.05]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent 0 3px, rgba(17,17,17,0.4) 3px 4px)",
      }}
    />
  );
}

function Sheen() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden"
    >
      <div
        className="absolute -inset-y-10 -left-1/2 w-[60%] opacity-30 mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.85) 50%, transparent 70%)",
          animation: "hl-sheen 5.5s linear infinite",
        }}
      />
    </div>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "-left-px -top-px border-l border-t",
    tr: "-right-px -top-px border-r border-t",
    bl: "-left-px -bottom-px border-l border-b",
    br: "-right-px -bottom-px border-r border-b",
  } as const;
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-3 w-3 border-rust ${map[pos]}`}
    />
  );
}

function Header({
  caseId,
  idx,
  total,
  latency,
  lang,
}: {
  caseId: string;
  idx: number;
  total: number;
  latency: number;
  lang: "es" | "en";
}) {
  return (
    <header className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-ink/12 px-5 py-2.5">
      <span className="flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-rust">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-rust/70" />
          <span className="relative h-full w-full rounded-full bg-rust" />
        </span>
        {lang === "es" ? "diagnóstico ia" : "ai diagnosis"}
      </span>
      <span className="text-center font-mono text-[0.52rem] tracking-[0.16em] text-muted/60 tabular-nums">
        {caseId}
      </span>
      <span className="flex items-center gap-2 font-mono text-[0.55rem] tracking-[0.14em] text-muted/90 tabular-nums">
        <span className="text-ink/80">
          {String(idx + 1).padStart(2, "0")}
          <span className="text-muted/40"> / </span>
          {String(total).padStart(2, "0")}
        </span>
        <span className="block h-2 w-px bg-line" />
        <span className="text-ink/65">⌁ {latency.toFixed(1)}s</span>
      </span>
    </header>
  );
}

function SectorLine({ sector, roi }: { sector: string; roi: number }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-2 border-b border-ink/8 pb-2">
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink/80">
        {sector}
      </span>
      <span className="font-mono text-[0.5rem] tracking-[0.14em] text-muted/70 tabular-nums">
        roi · {roi}×
      </span>
    </div>
  );
}

function Reasoning({ lines, reduce }: { lines: string[]; reduce: boolean }) {
  return (
    <ul className="my-2 flex flex-col gap-0.5" role="list">
      {lines.map((line, i) => (
        <motion.li
          key={`${i}-${line}`}
          initial={reduce ? false : { opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.35,
            delay: reduce ? 0 : 0.08 + i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex items-baseline gap-2 font-mono text-[0.58rem] leading-[1.5] tracking-[0.04em] text-muted/85"
        >
          <span className="text-rust">▸</span>
          <span className="lowercase">{line}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function Flow({
  steps,
  lang,
  reduce,
}: {
  steps: FlowStep[];
  lang: "es" | "en";
  reduce: boolean;
}) {
  return (
    <ol className="mt-3 flex flex-col gap-0.5" role="list">
      {steps.map((step, i) => {
        const isLast = step.state === "shipped";
        const isAssisted = step.state === "assisted";
        return (
          <motion.li
            key={i}
            initial={reduce ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: reduce ? 0 : 0.55 + i * 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative grid grid-cols-[18px_1fr_auto] items-center gap-2.5 py-0.5"
          >
            <span className="relative inline-flex items-center justify-center">
              <span
                className={
                  isLast
                    ? "h-[10px] w-[10px] bg-rust"
                    : isAssisted
                    ? "h-[10px] w-[10px] border border-ink bg-paper"
                    : "h-[10px] w-[10px] border border-ink/40 bg-paper"
                }
              />
              {isLast && (
                <svg
                  aria-hidden
                  viewBox="0 0 12 12"
                  className="absolute h-2.5 w-2.5 text-paper"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 6l2.5 2.5L10 3" strokeLinecap="square" />
                </svg>
              )}
            </span>
            <span
              className={`font-mono text-[0.66rem] uppercase tracking-[0.08em] ${
                isLast ? "text-ink" : "text-muted"
              }`}
            >
              {step.label[lang]}
            </span>
            <span
              className={`font-mono text-[0.5rem] tracking-[0.18em] ${
                isLast
                  ? "text-rust"
                  : isAssisted
                  ? "text-ink/70"
                  : "text-muted/55"
              }`}
            >
              {STATE_LABEL[step.state][lang]}
            </span>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[8px] top-[14px] h-[10px] w-px bg-ink/15"
              />
            )}
          </motion.li>
        );
      })}
    </ol>
  );
}

function Comparator({
  tradi,
  mine,
  lang,
}: {
  tradi: { weeks: string; cost: string; ratio: number };
  mine: { weeks: string; cost: string; ratio: number; delta: string };
  lang: "es" | "en";
}) {
  return (
    <div className="mt-5 border-t border-ink/12 pt-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-muted/70">
          {lang === "es" ? "comparador" : "comparator"}
        </span>
        <Sparkline tradi={tradi.ratio} mine={mine.ratio} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Col
          label={lang === "es" ? "tradicional" : "traditional"}
          sub="baseline"
          weeks={tradi.weeks}
          ratio={tradi.ratio}
          suffix={tradi.cost}
          tone="muted"
        />
        <Col
          label={lang === "es" ? "conmigo + ia" : "with me + ai"}
          sub={mine.delta}
          weeks={mine.weeks}
          ratio={mine.ratio}
          suffix={mine.cost}
          tone="rust"
        />
      </div>
    </div>
  );
}

function Sparkline({ tradi, mine }: { tradi: number; mine: number }) {
  return (
    <motion.svg
      key={`${tradi}-${mine}`}
      viewBox="0 0 100 12"
      className="h-3 w-[110px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <line x1="0" y1="4" x2={String(tradi * 96)} y2="4" stroke="rgba(17,17,17,0.35)" strokeWidth="1.5" />
      <circle cx={String(tradi * 96)} cy="4" r="2" fill="rgba(17,17,17,0.6)" />
      <line x1="0" y1="8.5" x2={String(mine * 96)} y2="8.5" stroke="#D4460F" strokeWidth="1.5" />
      <circle cx={String(mine * 96)} cy="8.5" r="2" fill="#D4460F" />
    </motion.svg>
  );
}

function Col({
  label,
  sub,
  weeks,
  ratio,
  suffix,
  tone,
}: {
  label: string;
  sub: string;
  weeks: string;
  ratio: number;
  suffix: string;
  tone: "muted" | "rust";
}) {
  const isRust = tone === "rust";
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-muted">
          {label}
        </span>
        <span
          className={`font-mono text-[0.5rem] tracking-[0.14em] tabular-nums ${
            isRust ? "text-rust" : "text-muted/55"
          }`}
        >
          {sub}
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <span
          className={`font-serif italic leading-none tabular-nums ${
            isRust ? "text-rust" : "text-ink/70"
          }`}
          style={{ fontSize: "1.35rem" }}
        >
          {weeks}
        </span>
        <span
          className={`font-mono text-[0.6rem] tracking-[0.04em] tabular-nums ${
            isRust ? "text-rust" : "text-muted"
          }`}
        >
          {suffix}
        </span>
      </div>
      <div className="h-[2px] w-full overflow-hidden bg-ink/10">
        <motion.div
          key={`${tone}-${weeks}`}
          initial={{ width: "0%" }}
          animate={{ width: `${Math.max(7, ratio * 100)}%` }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={isRust ? "h-full bg-rust" : "h-full bg-ink/40"}
        />
      </div>
    </div>
  );
}

function Outcome({
  text,
  reduce,
  idx,
}: {
  text: string;
  reduce: boolean;
  idx: number;
}) {
  const [shown, setShown] = useState(reduce ? text : "");
  useEffect(() => {
    if (reduce) {
      setShown(text);
      return;
    }
    setShown("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [text, reduce, idx]);

  return (
    <div className="mt-4 flex items-center gap-2 border-t border-ink/12 pt-3">
      <span className="font-mono text-[0.52rem] uppercase tracking-[0.18em] text-muted/70">
        →
      </span>
      <span className="font-serif text-[1rem] italic leading-tight text-ink">
        {shown}
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-rust"
          style={{ animation: reduce ? "none" : "blink 1s steps(2) infinite" }}
        />
      </span>
    </div>
  );
}

const LOG_OPS = [
  "signal.received",
  "vector.embed",
  "context.merge",
  "tools.dispatch",
  "step.assisted",
  "test.green",
  "commit.push",
  "deploy.preview",
  "step.shipped",
];

function ConsoleStream({
  caseId,
  reduce,
  idx,
}: {
  caseId: string;
  reduce: boolean;
  idx: number;
}) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (reduce) return;
    setLines(seedLines(caseId));
    const id = window.setInterval(() => {
      setLines((prev) => {
        const next = [...prev.slice(1), nextLine(caseId)];
        return next;
      });
    }, 1400);
    return () => window.clearInterval(id);
  }, [caseId, reduce, idx]);

  return (
    <div className="border-t border-ink/12 bg-ink/[0.03] px-5 py-2 font-mono text-[0.5rem] tracking-[0.04em] text-muted/90">
      <div className="flex items-center gap-2 pb-1 text-muted/55">
        <span className="block h-1 w-1 rounded-full bg-rust" />
        <span className="uppercase tracking-[0.18em]">runtime</span>
      </div>
      <div className="flex flex-col">
        {lines.map((l, i) => (
          <span
            key={`${l}-${i}`}
            className="block truncate tabular-nums"
            style={{
              opacity: 0.35 + (i / Math.max(lines.length - 1, 1)) * 0.65,
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function seedLines(caseId: string) {
  return Array.from({ length: 4 }).map(() => buildLine(caseId));
}

function nextLine(caseId: string) {
  return buildLine(caseId);
}

function buildLine(caseId: string) {
  const ts = nowMadrid();
  const op = LOG_OPS[Math.floor(Math.random() * LOG_OPS.length)];
  const ms = (300 + Math.random() * 1700).toFixed(0).padStart(4, " ");
  return `${ts}  ${caseId}  ${op.padEnd(16, " ")} · ${ms}ms`;
}

function nowMadrid() {
  try {
    return new Intl.DateTimeFormat("es-ES", {
      timeZone: "Europe/Madrid",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return new Date().toTimeString().slice(0, 8);
  }
}

function Telemetry({
  confidence,
  tokens,
}: {
  confidence: number;
  tokens: number;
}) {
  const pct = Math.round(confidence * 100);
  return (
    <div className="grid grid-cols-3 items-center gap-1 border-t border-ink/12 bg-ink/[0.02] px-5 py-2 font-mono text-[0.52rem] uppercase tracking-[0.16em] text-muted">
      <span className="flex items-center gap-1.5">
        <span className="text-muted/60">conf</span>
        <span className="text-ink tabular-nums">{pct}%</span>
      </span>
      <span className="flex items-center justify-center gap-1.5">
        <span className="text-muted/60">tok</span>
        <span className="text-ink tabular-nums">
          {tokens.toLocaleString("es-ES")}
        </span>
      </span>
      <span className="flex items-center justify-end gap-1.5">
        <span className="text-muted/60">engine</span>
        <span className="font-serif italic normal-case tracking-normal text-ink">
          ep.eng
        </span>
      </span>
    </div>
  );
}

function Signature({ time, lang }: { time: string; lang: "es" | "en" }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-dashed border-ink/15 px-5 py-2 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-muted/75">
      <span className="flex items-center gap-1.5">
        <span className="text-rust">◇</span>
        <span>
          {lang === "es" ? "compilado por" : "compiled by"}{" "}
          <span className="text-ink">emilio.pastor</span>
        </span>
      </span>
      <span className="flex items-center gap-2 tabular-nums">
        <span className="text-muted/60">córdoba</span>
        <span className="text-ink/70">{COORDS}</span>
        <span className="block h-2 w-px bg-line" />
        <span className="text-ink tabular-nums">{time}</span>
      </span>
    </div>
  );
}

function SnippetCard({
  code,
  caseId,
  reduce,
  idx,
}: {
  code: string;
  caseId: string;
  reduce: boolean;
  idx: number;
}) {
  const [shown, setShown] = useState(reduce ? code : "");
  useEffect(() => {
    if (reduce) {
      setShown(code);
      return;
    }
    setShown("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setShown(code.slice(0, i));
      if (i >= code.length) {
        setShown(code);
        window.clearInterval(id);
      }
    }, 22);
    return () => window.clearInterval(id);
  }, [code, reduce, idx]);

  return (
    <motion.div
      key={caseId}
      initial={reduce ? false : { opacity: 0, x: -16, y: 12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute -bottom-12 -left-16 z-[-1] hidden w-[280px] -rotate-[3deg] border border-ink/15 bg-ink text-paper shadow-[0_24px_50px_-22px_rgba(17,17,17,0.55)] xl:block"
      style={{ transform: "translateZ(40px) rotate(-3deg)" }}
    >
      <div className="flex items-center justify-between gap-2 border-b border-paper/10 px-3 py-1.5 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-paper/45">
        <span className="flex items-center gap-1.5">
          <span className="block h-1.5 w-1.5 rounded-full bg-rust" />
          <span>{caseId}.ts</span>
        </span>
        <span className="text-paper/30">readonly · live</span>
      </div>
      <pre className="m-0 whitespace-pre-wrap break-words px-3 py-2 font-mono text-[0.6rem] leading-[1.55] text-paper/85">
        {colorize(shown)}
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-rust"
          style={{ animation: reduce ? "none" : "blink 1s steps(2) infinite" }}
        />
      </pre>
    </motion.div>
  );
}

const KEYWORDS = ["const", "await", "return", "if", "else", "new"];
const FNS = ["all", "deadlines", "notify", "ship", "live", "merge", "onConflict", "unblock", "signal", "optimize", "qualify", "stream", "validate", "route", "focus"];

function colorize(s: string) {
  const parts: Array<{ text: string; cls: string }> = [];
  const tokens = s.split(/(\s+|[(){};,.→/=]|".*?"|'.*?'|\/\/.*$)/g).filter(Boolean);
  for (const tok of tokens) {
    let cls = "text-paper/80";
    if (KEYWORDS.includes(tok)) cls = "text-rust";
    else if (FNS.includes(tok)) cls = "text-[#9bc9b2]";
    else if (/^["'`].*["'`]$/.test(tok)) cls = "text-[#d8a872]";
    else if (/^\/\//.test(tok)) cls = "text-paper/40 italic";
    else if (/^[(){};,.→/=]$/.test(tok)) cls = "text-paper/50";
    parts.push({ text: tok, cls });
  }
  return parts.map((p, i) => (
    <span key={i} className={p.cls}>
      {p.text}
    </span>
  ));
}
