import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from "@/data/copy";
import { useT } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

function Row({
  items,
  reverse,
}: {
  items: typeof MARQUEE_ROW_1;
  reverse?: boolean;
}) {
  const t = useT();
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden border-b border-paper/[0.04] py-3.5 last:border-0">
      <div
        className={cn(
          "inline-flex shrink-0 whitespace-nowrap",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {doubled.map((it, i) => (
          <span
            key={i}
            className={cn(
              "inline-flex shrink-0 items-center gap-7 px-7 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors hover:text-paper/80",
              it.hi ? "text-rust/70" : "text-paper/30",
            )}
          >
            {t(it.text)}
            <span aria-hidden className="block h-1 w-1 shrink-0 rounded-full bg-rust" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section
      aria-hidden
      className="overflow-hidden border-t border-paper/[0.06] bg-ink"
    >
      <Row items={MARQUEE_ROW_1} />
      <Row items={MARQUEE_ROW_2} reverse />
    </section>
  );
}
