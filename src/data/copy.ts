export type Lang = "es" | "en";

export const NAV_ITEMS = [
  { id: "services", es: "Servicios", en: "Services" },
  { id: "casos", es: "Casos", en: "Cases" },
  { id: "about", es: "Sobre mí", en: "About" },
  { id: "stack", es: "Stack", en: "Stack" },
] as const;

export const HERO = {
  available: { es: "Aceptando nuevos proyectos", en: "Accepting new projects" },
  badge: { es: "Construido con IA", en: "Built with AI" },
  loc: { es: "Córdoba · España · Remoto", en: "Córdoba · Spain · Remote" },
  role: {
    es: "Desarrollador freelance · Construyo con IA",
    en: "Freelance developer · Building with AI",
  },
  desc: {
    es: "Construyo webs y software a medida con IA. Del problema a producto funcionando, en menos tiempo que un desarrollo tradicional.",
    en: "I build custom websites and software with AI. From the problem to a working product, in less time than traditional development.",
  },
  cta1: { es: "Diagnóstico gratis", en: "Free diagnosis" },
  cta2: { es: "Ver casos", en: "See cases" },
  cta3: { es: "Descargar CV", en: "Download CV" },
  pills: [
    { es: "Webs a medida", en: "Custom websites" },
    { es: "Software a medida", en: "Custom software" },
    { es: "Automatización", en: "Automation" },
    { es: "Landings de captación", en: "Lead-gen landings" },
    { es: "Integraciones IA", en: "AI integrations" },
  ],
};

export const MARQUEE_ROW_1: Array<{ text: { es: string; en: string }; hi?: boolean }> = [
  { text: { es: "Webs a medida", en: "Custom websites" } },
  { text: { es: "Software a medida", en: "Custom software" }, hi: true },
  { text: { es: "Automatización de procesos", en: "Process automation" } },
  { text: { es: "Landings de captación", en: "Lead-gen landings" } },
  { text: { es: "Integraciones con IA", en: "AI integrations" }, hi: true },
  { text: { es: "ERPs y paneles internos", en: "ERPs and internal dashboards" } },
  { text: { es: "Herramientas internas", en: "Internal tooling" } },
  { text: { es: "Aplicaciones de gestión", en: "Management apps" }, hi: true },
  { text: { es: "Despachos profesionales", en: "Professional firms" } },
  { text: { es: "Clínicas", en: "Clinics" } },
  { text: { es: "Startups", en: "Startups" }, hi: true },
  { text: { es: "Del problema al producto", en: "From problem to product" } },
];

export const MARQUEE_ROW_2: Array<{ text: { es: string; en: string }; hi?: boolean }> = [
  { text: { es: "Aceptando nuevos proyectos", en: "Accepting new projects" } },
  { text: { es: "Construido con IA", en: "Built with AI" }, hi: true },
  { text: { es: "Córdoba · Andalucía", en: "Córdoba · Andalusia" } },
  { text: { es: "Toda España · Remoto", en: "All of Spain · Remote" } },
  { text: { es: "Diagnóstico gratuito", en: "Free diagnosis" }, hi: true },
  { text: { es: "Entrega rápida", en: "Fast delivery" } },
  { text: { es: "Trato directo", en: "Direct work" } },
  { text: { es: "Sin intermediarios", en: "No middlemen" }, hi: true },
  { text: { es: "Trabajo end-to-end", en: "End-to-end" } },
  { text: { es: "Formación industrial", en: "Industrial background" } },
];

export const STATS = [
  {
    value: 3,
    suffix: "+",
    label: { es: "años desarrollando software", en: "years building software" },
  },
  {
    value: 10,
    suffix: "+",
    label: { es: "proyectos entregados", en: "projects delivered" },
  },
  {
    value: 5,
    suffix: "+",
    label: { es: "soluciones con IA", en: "AI-powered solutions" },
  },
  {
    value: 3,
    suffix: "",
    label: { es: "sectores principales", en: "core sectors" },
  },
];

export const CASES = [
  {
    n: "01",
    image: "/assets/Migraria.jpg",
    sector: { es: "Despachos · Extranjería", en: "Law firm · Immigration" },
    title: {
      es: "ERP para despacho de extranjería",
      en: "ERP for immigration law firm",
    },
    problem: {
      es: "El despacho gestionaba cientos de expedientes y plazos legales a mano, con riesgo de perder fechas y horas tiradas en seguimiento manual.",
      en: "The firm was tracking hundreds of cases and legal deadlines by hand, risking missed dates and losing hours in manual follow-up.",
    },
    result: {
      es: "Aplicación a medida que centraliza casos, documentación y plazos. El equipo dedica menos tiempo a tareas repetitivas y trabaja sobre datos siempre actualizados.",
      en: "A custom application that centralises cases, documents and deadlines. The team spends less time on repetitive tasks and works on always-current data.",
    },
    tags: {
      es: ["Software a medida", "Gestión de casos", "Automatización"],
      en: ["Custom software", "Case management", "Automation"],
    },
  },
  {
    n: "02",
    image: "/assets/concesionario.jpg",
    sector: { es: "Automoción · Captación", en: "Automotive · Lead-gen" },
    title: {
      es: "Web de captación para concesionario",
      en: "Lead-gen website for a car dealership",
    },
    problem: {
      es: "Presencia online débil y leads que no llegaban a contactar con el equipo comercial.",
      en: "Weak online presence and leads that never reached the sales team.",
    },
    result: {
      es: "Web con catálogo dinámico, fichas de vehículo y formularios pensados para convertir. Más visitas terminan en contacto cualificado con el concesionario.",
      en: "A site with a dynamic catalogue, vehicle pages and forms built to convert. More visits become qualified contacts.",
    },
    tags: {
      es: ["Web a medida", "Captación de leads", "Catálogo dinámico"],
      en: ["Custom website", "Lead capture", "Dynamic catalogue"],
    },
  },
];

export const SERVICES = [
  {
    n: "01",
    title: {
      es: "Software y aplicaciones de gestión a medida",
      en: "Custom software and management apps",
    },
    desc: {
      es: "ERPs, paneles internos y herramientas de gestión hechos a medida para tu negocio. Si llevas el control en Excel u hojas sueltas, lo paso a una aplicación que trabaja por ti.",
      en: "ERPs, internal dashboards and management tools built around your business. If you run things on Excel or scattered sheets, I turn it into an application that works for you.",
    },
    tags: {
      es: ["ERPs", "Paneles internos", "Gestión"],
      en: ["ERPs", "Dashboards", "Operations"],
    },
  },
  {
    n: "02",
    title: {
      es: "Automatización de tareas y procesos repetitivos",
      en: "Automating repetitive tasks and processes",
    },
    desc: {
      es: "Si una tarea se repite cada semana, se puede automatizar. Conecto tus herramientas, recupero las horas que se van en copiar y pegar, y libero al equipo para lo que sí mueve el negocio.",
      en: "If a task repeats every week, it can be automated. I connect your tools, save the hours lost copy-pasting, and free your team for what actually moves the business.",
    },
    tags: {
      es: ["Automatización", "Integraciones", "IA"],
      en: ["Automation", "Integrations", "AI"],
    },
  },
  {
    n: "03",
    title: {
      es: "Webs y landings orientadas a captar clientes",
      en: "Websites and landing pages built to convert",
    },
    desc: {
      es: "Webs pensadas para un objetivo claro: que la gente que entra termine contactando contigo. Diseño, copy y desarrollo trabajando juntos para mover el negocio, no para decorar.",
      en: "Websites and landings built around one clear goal: people who land on them end up contacting you. Design, copy and code working together to move the business, not to decorate.",
    },
    tags: {
      es: ["Webs a medida", "Landings", "Captación"],
      en: ["Custom sites", "Landings", "Conversion"],
    },
  },
];

export const ABOUT_PARAS = [
  {
    es: "Soy desarrollador freelance con base en Córdoba. Construyo webs, landings y software a medida para despachos profesionales, clínicas, startups y negocios que necesitan resolver algo concreto.",
    en: "I'm a freelance developer based in Córdoba. I build custom websites, landings and software for professional firms, clinics, startups and businesses that need to solve something specific.",
  },
  {
    es: "Mi forma de trabajar se apoya en IA en todo el proceso, lo que me permite entregar antes y con menos fricción que un desarrollo tradicional. No es magia: es una manera de construir más enfocada en el problema del cliente que en el código.",
    en: "My approach leans on AI throughout the process, which lets me ship sooner and with less friction than traditional development. Not magic: a way of building that's more focused on the client's problem than on the code.",
  },
  {
    es: "Vengo del desarrollo de software industrial, con experiencia en sistemas MES/MOM en Indra. Ese mundo me enseñó algo simple: el software tiene que funcionar de verdad y resolver el problema que se le encarga, no solo parecer que lo hace.",
    en: "I come from industrial software development, with experience on MES/MOM systems at Indra. That world taught me something simple: software has to actually work and solve the problem it was hired for, not just look like it does.",
  },
  {
    es: "Si tienes un proceso que cada semana te roba horas o un negocio que necesita una web que de verdad capte clientes, hablamos. Te digo en 20 minutos qué se puede hacer y cómo.",
    en: "If a process is costing you hours every week, or your business needs a website that actually brings in clients, let's talk. I'll tell you in 20 minutes what can be done and how.",
  },
];

export const ABOUT_ASIDE = [
  {
    label: { es: "Rol", en: "Role" },
    value: {
      es: "<strong>Desarrollador freelance</strong><br/>Webs y software a medida con IA",
      en: "<strong>Freelance developer</strong><br/>Custom websites and software with AI",
    },
  },
  {
    label: { es: "Sectores", en: "Sectors" },
    value: {
      es: "Despachos profesionales · Clínicas · Startups y emprendedores",
      en: "Professional firms · Clinics · Startups and founders",
    },
  },
  {
    label: { es: "Zona", en: "Area" },
    value: {
      es: "Córdoba · Andalucía · Toda España<br/>Trabajo en remoto",
      en: "Córdoba · Andalusia · All of Spain<br/>Available remote",
    },
  },
  {
    label: { es: "Formación", en: "Education" },
    value: {
      es: "<strong>Desarrollo de Aplicaciones Web</strong><br/>DAW — Ciclo Formativo Superior",
      en: "<strong>Web Application Development</strong><br/>DAW — Higher Vocational Training",
    },
  },
  {
    label: { es: "Idiomas", en: "Languages" },
    value: {
      es: "Español (nativo) · Inglés (profesional)",
      en: "Spanish (native) · English (working level)",
    },
  },
];

export const EXPERIENCE = [
  {
    period: { es: "2025 — 2026", en: "2025 — 2026" },
    co: "Indra / Deuser",
    title: {
      es: "Desarrollador de software industrial (MES/MOM)",
      en: "Industrial software developer (MES/MOM)",
    },
    body: {
      es: "Desarrollo y despliegue de software de fabricación en planta para grandes industrias. Trabajo en proyectos donde el software no puede fallar: parada de línea, datos críticos, integraciones con maquinaria real. La mejor escuela posible para construir software serio.",
      en: "Developing and deploying manufacturing software on the factory floor for large industrial clients. Working on projects where software can't fail: line stops, critical data, integrations with real machinery. The best possible school for building serious software.",
    },
    tags: {
      es: ["Software industrial", "Sistemas MES/MOM", "Integraciones de datos", "Producción"],
      en: ["Industrial software", "MES/MOM systems", "Data integrations", "Production"],
    },
    accent: "rust" as const,
  },
  {
    period: { es: "Prácticas internacionales", en: "International internship" },
    co: "S.T.A.E — Reggio Emilia, Italia",
    title: { es: "Técnico IT", en: "IT Technician" },
    body: {
      es: "Estancia profesional en una empresa italiana del sector tecnológico. Soporte, mantenimiento y configuración de sistemas en un entorno laboral exigente y en otro idioma.",
      en: "Professional stay at an Italian tech company. Support, maintenance and systems configuration in a demanding work environment and a different language.",
    },
    tags: {
      es: ["Trabajo internacional", "Redes y sistemas", "Soporte técnico"],
      en: ["International work", "Networks & systems", "Tech support"],
    },
    accent: "neutral" as const,
  },
  {
    period: { es: "Inicios", en: "Early days" },
    co: "Negocio local — Córdoba",
    title: { es: "Marketing digital y web", en: "Digital marketing and web" },
    body: {
      es: "Primer contacto con la web orientada a negocio: contenidos, redes sociales y visibilidad online para un comercio local. Aprendí pronto que una web sin objetivo claro no sirve para nada.",
      en: "First exposure to business-oriented web work: content, social media and online visibility for a local business. I learned early that a website without a clear goal is useless.",
    },
    tags: {
      es: ["Contenido web", "Captación local", "Visibilidad online"],
      en: ["Web content", "Local lead-gen", "Online visibility"],
    },
    accent: "moss" as const,
  },
];

export const STACK = [
  {
    title: { es: "Frontend", en: "Frontend" },
    items: [
      { name: "TypeScript", level: 88, note: { es: "Diario", en: "Daily" }, hot: false },
      { name: "React", level: 86, note: { es: "Diario", en: "Daily" }, hot: false },
      { name: "Tailwind CSS", level: 90, note: { es: "Diario", en: "Daily" }, hot: false },
      { name: "Motion / GSAP", level: 78, note: { es: "En uso", en: "Working" }, hot: false },
      { name: "Next.js", level: 75, note: { es: "En uso", en: "Working" }, hot: false },
    ],
  },
  {
    title: { es: "Backend & datos", en: "Backend & data" },
    items: [
      { name: "Node.js", level: 78, note: { es: "En uso", en: "Working" }, hot: false },
      { name: "PostgreSQL / MySQL", level: 72, note: { es: "En uso", en: "Working" }, hot: false },
      { name: "REST APIs", level: 82, note: { es: "Diario", en: "Daily" }, hot: false },
      { name: "Prisma", level: 65, note: { es: "Conocido", en: "Familiar" }, hot: false },
    ],
  },
  {
    title: { es: "Herramientas", en: "Tools" },
    items: [
      { name: "Git / GitHub", level: 92, note: { es: "Diario", en: "Daily" }, hot: false },
      { name: "VS Code", level: 95, note: { es: "Diario", en: "Daily" }, hot: false },
      { name: "Figma", level: 70, note: { es: "Conocido", en: "Familiar" }, hot: false },
      { name: "Vercel / Cloudflare", level: 80, note: { es: "Diario", en: "Daily" }, hot: false },
    ],
  },
  {
    title: { es: "IA y automatización", en: "AI & automation" },
    items: [
      { name: "Claude API", level: 88, note: { es: "Diario", en: "Daily" }, hot: true },
      { name: "Prompt engineering", level: 90, note: { es: "Diario", en: "Daily" }, hot: true },
      { name: "Integraciones LLM", level: 84, note: { es: "Diario", en: "Daily" }, hot: true },
      { name: "n8n / workflows", level: 72, note: { es: "En uso", en: "Working" }, hot: true },
      { name: "MES / MOM (Mendix)", level: 70, note: { es: "Background", en: "Background" }, hot: false },
    ],
  },
];

export const CONTACT = {
  big: { es: "Diagnóstico gratis.", en: "Free diagnosis." },
  desc: {
    es: "¿Una tarea que cada semana te roba horas? Cuéntamela y te digo en 20 minutos cómo automatizarla. Gratis y sin compromiso. También hago radiografías de web en vídeo si lo que te preocupa es tu presencia online.",
    en: "A task that's costing you hours every week? Tell me about it and in 20 minutes I'll show you how it could be automated. Free, no strings. I also do video website teardowns if your online presence is the issue.",
  },
  form: {
    name: { es: "Nombre", en: "Name" },
    namePh: { es: "Tu nombre o empresa", en: "Your name or company" },
    email: { es: "Email", en: "Email" },
    emailPh: { es: "tu@email.com", en: "you@email.com" },
    msg: { es: "Cuéntame tu caso", en: "Tell me about your case" },
    msgPh: {
      es: "¿Qué tarea te roba horas? ¿Qué web o software necesitas?",
      en: "Which task is costing you hours? What website or software do you need?",
    },
    send: { es: "Pedir diagnóstico gratis", en: "Request free diagnosis" },
    sending: { es: "Enviando...", en: "Sending..." },
    sent: { es: "Mensaje enviado", en: "Message sent" },
    success: {
      es: "Gracias. Te respondo en menos de 24h.",
      en: "Thanks. I reply within 24h.",
    },
    invalid: {
      es: "Revisa los campos antes de enviar.",
      en: "Check the fields before sending.",
    },
  },
};

export const META = {
  available: { es: "Disponible", en: "Available" },
  scroll: { es: "Scroll", en: "Scroll" },
  hire: { es: "Diagnóstico gratis", en: "Free diagnosis" },
  skip: { es: "Saltar al contenido", en: "Skip to content" },
  loading: { es: "Cargando", en: "Loading" },
  footer: {
    es: "Desarrollador freelance · Webs y software a medida con IA",
    en: "Freelance developer · Custom websites and software with AI",
  },
};
