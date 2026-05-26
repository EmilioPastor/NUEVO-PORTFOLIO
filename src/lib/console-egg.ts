const ASCII = `
  ███████ ██████
  ██      ██   ██
  █████   ██████
  ██      ██
  ███████ ██

  Emilio Pastor Zurita — estudio
  Webs y software a medida con IA · Córdoba
`;

export function printConsoleEgg() {
  if (typeof window === "undefined") return;
  if ((window as { __epEgg?: boolean }).__epEgg) return;
  (window as { __epEgg?: boolean }).__epEgg = true;

  const titleStyle =
    "color:#D4460F;font-family:'Instrument Serif',serif;font-style:italic;font-size:28px;line-height:1;";
  const asciiStyle =
    "color:#111;background:#F5F3EE;font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px;line-height:1.4;padding:8px 12px;";
  const bodyStyle =
    "color:#111;font-family:ui-sans-serif,system-ui,sans-serif;font-size:13px;line-height:1.55;";
  const muted =
    "color:#888880;font-family:ui-monospace,SFMono-Regular,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;";
  const link =
    "color:#D4460F;font-family:ui-sans-serif,system-ui,sans-serif;font-size:13px;text-decoration:underline;";

  console.log("%cHola, dev.", titleStyle);
  console.log("%c" + ASCII, asciiStyle);
  console.log(
    "%cSi has llegado a la consola, lees código. Construyo cosas serias con clientes serios y a veces necesito manos como las tuyas.\n%cTengo proyectos interesantes — algunos con IA real, otros con SQL real, todos con plazos reales.",
    bodyStyle,
    bodyStyle,
  );
  console.log(
    "%c→ %cemiliopastorzurita906@gmail.com",
    bodyStyle,
    link,
  );
  console.log("%cstack visible · src/data/copy.ts · STACK", muted);
  console.log(
    "%ccaveman tip: si entiendes el código, sabrás si encajas. Y si no, también.",
    muted,
  );
}
