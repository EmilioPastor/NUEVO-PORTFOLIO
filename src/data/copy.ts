export type Lang = "es" | "en";

export const NAV_ITEMS = [
  { id: "services", es: "Servicios", en: "Services" },
  { id: "process", es: "Proceso", en: "Process" },
  { id: "casos", es: "Casos", en: "Cases" },
  { id: "about", es: "Sobre mí", en: "About" },
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
    es: "Construyo webs y software para negocios que están atascados con algo concreto. Sin agencias intermedias, sin meses de espera, sin presupuestos que se inflan a mitad.",
    en: "I build websites and software for businesses stuck on something specific. No middlemen, no waiting months, no budgets that balloon halfway through.",
  },
  cta1: { es: "Hablemos", en: "Let's talk" },
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
  { text: { es: "Trabajo end-to-end", en: "End-to-end" }, hi: true },
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

type Case = {
  n: string;
  mark: string;
  image?: string;
  sector: { es: string; en: string };
  title: { es: string; en: string };
  problem: { es: string; en: string };
  result: { es: string; en: string };
  tags: { es: string[]; en: string[] };
};

export const CASES: Case[] = [
  {
    n: "01",
    mark: "Migraria",
    image: "/assets/Migraria.png",
    sector: { es: "Despachos · Extranjería", en: "Law firm · Immigration" },
    title: {
      es: "ERP para despacho de extranjería",
      en: "ERP for immigration law firm",
    },
    problem: {
      es: "Cientos de expedientes repartidos entre carpetas y hojas. Plazos legales apuntados a mano. Cualquier despiste podía costar caro al despacho y a sus clientes.",
      en: "Hundreds of cases scattered across folders and sheets. Legal deadlines noted by hand. Any slip could cost the firm and its clients dearly.",
    },
    result: {
      es: "Aplicación a medida que mete todo en un sitio: casos, documentos, plazos. El equipo deja de buscar y empieza a trabajar sobre datos siempre al día.",
      en: "A custom app that puts everything in one place: cases, documents, deadlines. The team stops searching and starts working on data that's always current.",
    },
    tags: {
      es: ["Software a medida", "Gestión de casos", "Automatización"],
      en: ["Custom software", "Case management", "Automation"],
    },
  },
  {
    n: "02",
    mark: "Concesionario",
    image: "/assets/concesionario.png",
    sector: { es: "Automoción · Captación", en: "Automotive · Lead-gen" },
    title: {
      es: "Web de captación para concesionario",
      en: "Lead-gen website for a car dealership",
    },
    problem: {
      es: "Web vieja, sin teléfono visible, sin manera clara de pedir información. Los pocos leads que llegaban se perdían por el camino antes de hablar con un comercial.",
      en: "Outdated site, no visible phone, no easy way to ask for info. The few leads that came in fell through the cracks before reaching a salesperson.",
    },
    result: {
      es: "Web nueva con catálogo, fichas de cada vehículo y un formulario que sí convierte. Ahora cada visita interesada llega al equipo comercial con datos útiles.",
      en: "New site with a catalogue, vehicle pages and a form that actually converts. Every interested visit now reaches sales with useful info.",
    },
    tags: {
      es: ["Web a medida", "Captación de leads", "Catálogo dinámico"],
      en: ["Custom website", "Lead capture", "Dynamic catalogue"],
    },
  },
  {
    n: "03",
    mark: "AutoCaña",
    sector: { es: "Hostelería · Automatización", en: "Hospitality · Automation" },
    title: {
      es: "AutoCaña — automatización para bares",
      en: "AutoCaña — automation for bars",
    },
    problem: {
      es: "Pedidos, stock y cuadres de caja todo a mano. El equipo se dejaba media tarde en tareas que se podían hacer solas mientras el bar seguía lleno.",
      en: "Orders, stock and till closing all done by hand. The team lost half an afternoon on tasks that could run themselves while the bar stayed packed.",
    },
    result: {
      es: "Sistema propio que se encarga de lo aburrido. El equipo recupera tiempo para lo que importa de verdad: atender bien a la gente que está delante.",
      en: "A homegrown system that takes the boring stuff off the table. The team gets time back for what really matters: looking after the people in front of them.",
    },
    tags: {
      es: ["Software a medida", "Automatización", "Hostelería"],
      en: ["Custom software", "Automation", "Hospitality"],
    },
  },
  {
    n: "04",
    mark: "CASANA",
    sector: { es: "Servicios · Equipos", en: "Services · Teams" },
    title: {
      es: "CASANA — gestión de empleados y servicios",
      en: "CASANA — staff and service management",
    },
    problem: {
      es: "Cuadrante mensual hecho en papel, cambios de última hora por WhatsApp, líos sobre quién tenía que estar dónde. Mucho margen para que algo saliera mal.",
      en: "Monthly schedule done on paper, last-minute changes over WhatsApp, confusion over who was meant to be where. Plenty of room for things to go wrong.",
    },
    result: {
      es: "Plataforma a medida donde se ve todo en tiempo real: quién trabaja, qué servicio, cuándo. Cambios al instante, sin papeles ni mensajes cruzados.",
      en: "A custom platform where everything is visible in real time: who's working, which service, when. Changes happen instantly, no paper, no crossed messages.",
    },
    tags: {
      es: ["Plataforma a medida", "Gestión interna", "Operaciones"],
      en: ["Custom platform", "Internal management", "Operations"],
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
      es: "Si llevas tu negocio en Excel o en hojas sueltas, lo paso a una aplicación que tu equipo entiende y usa cada día. ERPs, paneles internos, herramientas de gestión hechas para tu forma de trabajar — no para encajar en un SaaS genérico.",
      en: "If you run your business on Excel or scattered sheets, I turn it into an application your team actually uses every day. ERPs, internal dashboards, management tools shaped to how you work — not how a generic SaaS thinks you should.",
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
      es: "Si copias y pegas lo mismo cada semana, son horas que estás tirando. Conecto tus herramientas, automatizo lo aburrido y te devuelvo el tiempo para lo que paga las facturas.",
      en: "If you're copy-pasting the same thing every week, those are hours you're throwing away. I wire your tools together, automate the boring stuff and hand back the time for what actually pays the bills.",
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
      es: "Webs con un solo objetivo: que la gente que entra te escriba. Ni catálogos bonitos sin contacto, ni plantillas calcadas a otras 20 webs del sector.",
      en: "Websites built around one job: people who land on them contact you. Not pretty catalogues with no clear next step, not the same template every other site in your sector is using.",
    },
    tags: {
      es: ["Webs a medida", "Landings", "Captación"],
      en: ["Custom sites", "Landings", "Conversion"],
    },
  },
];

export const AVAILABILITY = {
  status: { es: "Aceptando proyectos", en: "Accepting projects" },
  nextSlot: { es: "12 jun", en: "Jun 12" },
  reply: { es: "Respuesta en 24h", en: "Reply within 24h" },
  bookHref: "#contact",
  bookLabel: { es: "Hablemos", en: "Let's talk" },
  open: true,
};

export const PROCESS = [
  {
    n: "01",
    duration: { es: "20 minutos", en: "20 minutes" },
    title: { es: "Conocernos", en: "First call" },
    body: {
      es: "Te escucho 20 minutos. Si puedo ayudarte, te lo digo claro. Si no, también — y te paso un contacto que sí pueda.",
      en: "20 minutes on the phone. If I can help, I tell you straight. If I can't, I tell you too — and pass on a contact who can.",
    },
  },
  {
    n: "02",
    duration: { es: "3 días", en: "3 days" },
    title: { es: "Brief y propuesta", en: "Brief and proposal" },
    body: {
      es: "Te paso una propuesta con precio cerrado y plazo cerrado. Si el número no encaja, nos paramos aquí sin drama. Si encaja, empezamos.",
      en: "I send you a proposal with a fixed price and a fixed deadline. If the number doesn't work, we stop here, no drama. If it does, we start.",
    },
  },
  {
    n: "03",
    duration: { es: "7 — 10 días", en: "7 — 10 days" },
    title: { es: "Demo funcional", en: "Working demo" },
    body: {
      es: "A los 7-10 días te enseño una versión funcionando que puedes tocar tú y probar tu equipo. Lo que no cuadre se cambia antes de seguir.",
      en: "In 7-10 days I show you a working version you can poke at and your team can try. What doesn't click gets changed before moving on.",
    },
  },
  {
    n: "04",
    duration: { es: "Continuo", en: "Ongoing" },
    title: { es: "Producción y soporte", en: "Launch and support" },
    body: {
      es: "Lanzamos, formo a tu equipo y seguimos hablando. Aparezco cuando necesitas algo, no cuando me apetece a mí seis meses después.",
      en: "We launch, I train your team and we keep talking. I show up when you need something, not whenever I feel like it six months later.",
    },
  },
];

export const ABOUT_PARAS = [
  {
    es: "Soy desarrollador freelance en Córdoba. Hago webs y software a medida para despachos, clínicas, startups y negocios que están atascados con algo y necesitan a alguien que entre, lo resuelva y no se inflen los plazos por el camino.",
    en: "I'm a freelance developer in Córdoba. I build custom websites and software for law firms, clinics, startups and businesses that are stuck on something and need someone to sort it out without dragging it on forever.",
  },
  {
    es: "Trabajo con herramientas modernas que me dejan ir más rápido sin sacrificar control. Eso significa que el tiempo que ahorro en lo mecánico lo dedico a lo que de verdad importa: entender tu negocio antes de tocar una línea de código.",
    en: "I work with modern tooling that lets me move faster without losing control. The time I save on the mechanical stuff goes into what really matters: understanding your business before writing a single line of code.",
  },
  {
    es: "Vengo del software industrial. En Indra trabajo con sistemas MES/MOM donde un fallo significa una planta parada. De ahí me quedé con una idea fija: lo que entrego tiene que aguantar el lunes a las 8, no parecer que aguanta.",
    en: "I come from industrial software. At Indra I work on MES/MOM systems where a single fault means a stopped plant. I came away with one fixed idea: what I deliver has to hold up on Monday at 8 a.m., not just look like it does.",
  },
  {
    es: "Si hay algo en tu negocio que te roba horas cada semana, o tu web no te trae clientes, escríbeme. Hablamos 20 minutos y te digo si te puedo ayudar.",
    en: "If something in your business is costing you hours every week, or your site isn't bringing in clients, drop me a line. 20 minutes on the phone and I'll tell you if I can help.",
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
      es: "Software de fabricación en planta para industrias grandes. Si algo falla se para una línea, así que aprendes rápido a no entregar nada que no esté probado tres veces. La mejor escuela para construir software que no se rompe el lunes.",
      en: "Manufacturing software on the factory floor for large industrial clients. If something fails a line stops, so you learn fast not to ship anything that hasn't been tested three times over. Best school there is for building software that doesn't break on Monday.",
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
      es: "Tres meses trabajando en una empresa tecnológica italiana. Soporte, sistemas, configuración — y aprender a defenderme en un equipo en otro idioma cuando no entendía la mitad de las reuniones.",
      en: "Three months working at an Italian tech company. Support, systems, configuration — and learning to hold my own in a team in another language when I didn't catch half of what was said in meetings.",
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
      es: "Mi primer trabajo con web de verdad — contenidos, redes y visibilidad para un comercio del barrio. Ahí aprendí algo que me sigue valiendo hoy: una web bonita sin un objetivo claro no sirve para nada.",
      en: "My first real web job — content, social and visibility for a neighbourhood business. That's where I learned something that still holds up today: a pretty site with no clear goal is useless.",
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

export const META_SITE = {
  hours: { value: "~140", label: { es: "horas invertidas", en: "hours invested" } },
  commits: { value: "210+", label: { es: "commits hasta hoy", en: "commits to date" } },
  bundle: { value: "125kb", label: { es: "bundle inicial gzip", en: "initial gzip bundle" } },
  lighthouse: { value: "99", label: { es: "lighthouse · performance", en: "lighthouse · performance" } },
  stack: {
    es: ["Vite", "React 18", "TypeScript", "Tailwind", "Motion", "Three / R3F (lazy)"],
    en: ["Vite", "React 18", "TypeScript", "Tailwind", "Motion", "Three / R3F (lazy)"],
  },
  decisions: [
    {
      label: { es: "Diseño", en: "Design" },
      body: {
        es: "Sistema editorial propio. Serif italic + mono. Acento rust contenido — aparece solo donde algo importa.",
        en: "Custom editorial system. Serif italic + mono. Rust accent kept tight — only where something matters.",
      },
    },
    {
      label: { es: "Performance", en: "Performance" },
      body: {
        es: "Cero frameworks pesados. Animaciones con motion, WebGL solo cuando aporta. Lazy en todo lo gordo.",
        en: "No heavy frameworks. Animations via motion, WebGL only when it adds. Lazy on anything heavy.",
      },
    },
    {
      label: { es: "Privacidad", en: "Privacy" },
      body: {
        es: "Sin cookies de tracking, sin analytics invasivo, sin fingerprint. CSP estricta y headers cerrados.",
        en: "No tracking cookies, no invasive analytics, no fingerprinting. Strict CSP, locked-down headers.",
      },
    },
  ],
  meta: {
    title: { es: "Esta web", en: "This site" },
    eyebrow: { es: "Meta", en: "Meta" },
    intro: {
      es: "El portfolio entero es también un caso de estudio. Estos son los números reales y las decisiones que tomé.",
      en: "The whole portfolio is itself a case study. These are the real numbers and the decisions I made.",
    },
    repo: { es: "Construido en abierto", en: "Built in the open" },
  },
};

export const CONTACT = {
  big: { es: "Hablemos.", en: "Let's talk." },
  desc: {
    es: "Cuéntame qué pasa: una tarea que te come horas, una web que no funciona, una idea que no sabes por dónde empezar. Hablamos 20 minutos y te digo claro si puedo ayudarte o no.",
    en: "Tell me what's going on: a task eating your hours, a site that's not working, an idea you don't know where to start with. 20 minutes on the phone and I tell you straight whether I can help or not.",
  },
  form: {
    name: { es: "Nombre", en: "Name" },
    namePh: { es: "Tu nombre o empresa", en: "Your name or company" },
    email: { es: "Email", en: "Email" },
    emailPh: { es: "tu@email.com", en: "you@email.com" },
    msg: { es: "Cuéntame tu caso", en: "Tell me about your case" },
    msgPh: {
      es: "¿Qué te trae por aquí? Cuanto más concreto, mejor.",
      en: "What brings you here? The more specific, the better.",
    },
    send: { es: "Enviar mensaje", en: "Send message" },
    sending: { es: "Enviando...", en: "Sending..." },
    sent: { es: "Mensaje enviado", en: "Message sent" },
    success: {
      es: "Gracias, te respondo en menos de 24h.",
      en: "Thanks, I'll get back to you within 24h.",
    },
    invalid: {
      es: "Falta algo o hay un campo mal. Échale un ojo.",
      en: "Something's missing or off. Take another look.",
    },
    error: {
      es: "No se pudo enviar el mensaje.",
      en: "Could not send the message.",
    },
  },
};

export const META = {
  available: { es: "Disponible", en: "Available" },
  scroll: { es: "Scroll", en: "Scroll" },
  hire: { es: "Hablemos", en: "Let's talk" },
  skip: { es: "Saltar al contenido", en: "Skip to content" },
  loading: { es: "Cargando", en: "Loading" },
  footer: {
    es: "Desarrollador freelance · Webs y software a medida con IA",
    en: "Freelance developer · Custom websites and software with AI",
  },
};
