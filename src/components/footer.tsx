import { useT } from "@/hooks/use-lang";
import { META } from "@/data/copy";

export function Footer() {
  const t = useT();
  return (
    <footer
      role="contentinfo"
      className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/[0.08] bg-ink px-6 py-6 md:px-12"
    >
      <div className="font-mono text-[0.65rem] tracking-[0.06em] text-paper/30">
        © {new Date().getFullYear()} Emilio Pastor Zurita · {t(META.footer)}
      </div>
      <div className="flex gap-6">
        <a
          href="https://www.linkedin.com/in/emilio-pastor-zurita/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-paper/40 transition-colors hover:text-paper"
        >
          LinkedIn
        </a>
        <a
          href="mailto:emiliopastorzurita906@gmail.com"
          className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-paper/40 transition-colors hover:text-paper"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
