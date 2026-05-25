import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/data/copy";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const Ctx = createContext<LangCtx | null>(null);

const STORAGE_KEY = "ep-lang";

function readStored(): Lang {
  if (typeof window === "undefined") return "es";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "en" ? "en" : "es";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStored);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage may be blocked; ignore
    }
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((l) => (l === "es" ? "en" : "es"));

  return <Ctx.Provider value={{ lang, setLang, toggle }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang fuera de LangProvider");
  return ctx;
}

export function useT() {
  const { lang } = useLang();
  return function translate<V>(o: { es: V; en: V }): V {
    return o[lang];
  };
}
