import { useEffect, useState } from "react";
import { LangProvider, useT } from "@/hooks/use-lang";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Loader } from "@/components/effects/loader";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { HourMood } from "@/components/effects/hour-mood";
import { SectionMood } from "@/components/effects/section-mood";
import { BlueprintMode } from "@/components/effects/blueprint-mode";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Cases } from "@/components/sections/cases";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Meta } from "@/components/sections/meta";
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
      <HourMood />
      <SectionMood />
      <BlueprintMode />
      <ScrollProgress />
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <Services />
        <Process />
        <Cases />
        <About />
        <Experience />
        <Meta />
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
