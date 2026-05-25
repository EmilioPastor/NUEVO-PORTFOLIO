import { useEffect, useState } from "react";
import { LangProvider, useT } from "@/hooks/use-lang";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Loader } from "@/components/effects/loader";
import { Cursor } from "@/components/effects/cursor";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Cases } from "@/components/sections/cases";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Stack } from "@/components/sections/stack";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { META } from "@/data/copy";

function SkipLink() {
  const t = useT();
  return (
    <a href="#main" className="skip-link focus:outline-rust">
      {t(META.skip)}
    </a>
  );
}

function Shell() {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(reduce);

  useEffect(() => {
    if (reduce) setLoaded(true);
  }, [reduce]);

  return (
    <>
      <SkipLink />
      {!loaded && !reduce && <Loader onDone={() => setLoaded(true)} />}
      <div aria-hidden className="grain-overlay" />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <Stats />
        <Services />
        <Cases />
        <About />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export function App() {
  return (
    <LangProvider>
      <Shell />
    </LangProvider>
  );
}
