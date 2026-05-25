import { useEffect, useRef, useState } from "react";

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function scrambled(text: string) {
  return text
    .split("")
    .map((c) => (c === " " ? " " : POOL[Math.floor(Math.random() * POOL.length)]))
    .join("");
}

interface Props {
  text: string;
  duration?: number;
  delay?: number;
  trigger?: unknown;
  disabled?: boolean;
}

export function ScrambleText({
  text,
  duration = 0.8,
  delay = 0,
  trigger,
  disabled = false,
}: Props) {
  const [display, setDisplay] = useState(disabled ? text : scrambled(text));
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (disabled) {
      setDisplay(text);
      return;
    }
    const total = 22;
    let frame = 0;
    const intervalMs = (duration * 1000) / total;

    const timeout = window.setTimeout(() => {
      ref.current = window.setInterval(() => {
        const prog = frame / total;
        const revealed = Math.floor(prog * text.length);
        setDisplay(
          text
            .split("")
            .map((c, i) => {
              if (c === " ") return " ";
              return i < revealed ? c : POOL[Math.floor(Math.random() * POOL.length)];
            })
            .join(""),
        );
        frame += 1;
        if (frame > total && ref.current) {
          setDisplay(text);
          window.clearInterval(ref.current);
          ref.current = null;
        }
      }, intervalMs);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeout);
      if (ref.current) window.clearInterval(ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, disabled, trigger]);

  return <>{display}</>;
}
