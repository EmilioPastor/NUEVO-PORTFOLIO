import type { Lang } from "@/data/copy";

export type FlowStep = {
  label: Record<Lang, string>;
  state: "manual" | "fragile" | "assisted" | "shipped";
};

export type HeroCase = {
  id: string;
  sector: Record<Lang, string>;
  reasoning: Record<Lang, string[]>;
  flow: FlowStep[];
  outcome: Record<Lang, string>;
  tradi: Record<Lang, { weeks: string; cost: string; ratio: number }>;
  mine: Record<Lang, { weeks: string; cost: string; ratio: number; delta: string }>;
  signal: { confidence: number; tokens: number; latencyMs: number; roi: number };
};

export const STATE_LABEL: Record<FlowStep["state"], Record<Lang, string>> = {
  manual: { es: "manual", en: "manual" },
  fragile: { es: "frágil", en: "fragile" },
  assisted: { es: "ia-asistido", en: "ai-assisted" },
  shipped: { es: "en producción", en: "shipped" },
};

export const HERO_CASES: HeroCase[] = [
  {
    id: "EP-001",
    sector: { es: "Despacho · Extranjería", en: "Law firm · Immigration" },
    reasoning: {
      es: [
        "señal: 12 tareas repetitivas por expediente",
        "vector: integración legal + plazos críticos",
        "ruta: ERP a medida + recordatorios IA",
      ],
      en: [
        "signal: 12 repeated tasks per case",
        "vector: legal integration + hard deadlines",
        "route: custom ERP + AI reminders",
      ],
    },
    flow: [
      { label: { es: "Excel infinito", en: "Endless Excel" }, state: "manual" },
      { label: { es: "Plazos a mano", en: "Manual deadlines" }, state: "fragile" },
      { label: { es: "IA + código a medida", en: "AI + custom code" }, state: "assisted" },
      { label: { es: "ERP en producción", en: "ERP in production" }, state: "shipped" },
    ],
    outcome: { es: "8h / semana recuperadas", en: "8h / week recovered" },
    tradi: {
      es: { weeks: "6 sem", cost: "100%", ratio: 1 },
      en: { weeks: "6 wk", cost: "100%", ratio: 1 },
    },
    mine: {
      es: { weeks: "10 días", cost: "≈ 32%", ratio: 0.32, delta: "Δ −83%" },
      en: { weeks: "10 days", cost: "≈ 32%", ratio: 0.32, delta: "Δ −83%" },
    },
    signal: { confidence: 0.94, tokens: 1284, latencyMs: 1.4, roi: 14 },
  },
  {
    id: "EP-002",
    sector: { es: "Clínica · Gestión interna", en: "Clinic · Operations" },
    reasoning: {
      es: [
        "señal: doble booking + huecos perdidos",
        "vector: agenda compartida en tiempo real",
        "ruta: panel a medida + sincronía",
      ],
      en: [
        "signal: double bookings + lost slots",
        "vector: realtime shared agenda",
        "route: custom panel + sync",
      ],
    },
    flow: [
      { label: { es: "Citas en papel", en: "Paper bookings" }, state: "manual" },
      { label: { es: "Doble agenda", en: "Double agenda" }, state: "fragile" },
      { label: { es: "Panel a medida", en: "Custom panel" }, state: "assisted" },
      { label: { es: "Equipo desbloqueado", en: "Team unblocked" }, state: "shipped" },
    ],
    outcome: { es: "0 huecos perdidos", en: "0 missed slots" },
    tradi: {
      es: { weeks: "8 sem", cost: "100%", ratio: 1 },
      en: { weeks: "8 wk", cost: "100%", ratio: 1 },
    },
    mine: {
      es: { weeks: "12 días", cost: "≈ 28%", ratio: 0.28, delta: "Δ −81%" },
      en: { weeks: "12 days", cost: "≈ 28%", ratio: 0.28, delta: "Δ −81%" },
    },
    signal: { confidence: 0.91, tokens: 1102, latencyMs: 1.2, roi: 11 },
  },
  {
    id: "EP-003",
    sector: { es: "Startup · Captación", en: "Startup · Lead-gen" },
    reasoning: {
      es: [
        "señal: web no convierte · 0 trackeo",
        "vector: copy + funnel + analítica IA",
        "ruta: landing a medida + analítica",
      ],
      en: [
        "signal: site doesn't convert · 0 tracking",
        "vector: copy + funnel + AI analytics",
        "route: custom landing + analytics",
      ],
    },
    flow: [
      { label: { es: "Idea en notas", en: "Notes-only idea" }, state: "manual" },
      { label: { es: "Web genérica", en: "Generic site" }, state: "fragile" },
      { label: { es: "Landing + IA", en: "Landing + AI" }, state: "assisted" },
      { label: { es: "Leads cualificados", en: "Qualified leads" }, state: "shipped" },
    ],
    outcome: { es: "3× contactos cualificados", en: "3× qualified leads" },
    tradi: {
      es: { weeks: "5 sem", cost: "100%", ratio: 1 },
      en: { weeks: "5 wk", cost: "100%", ratio: 1 },
    },
    mine: {
      es: { weeks: "7 días", cost: "≈ 25%", ratio: 0.25, delta: "Δ −80%" },
      en: { weeks: "7 days", cost: "≈ 25%", ratio: 0.25, delta: "Δ −80%" },
    },
    signal: { confidence: 0.96, tokens: 1421, latencyMs: 0.9, roi: 18 },
  },
  {
    id: "EP-004",
    sector: { es: "Hostelería · Operativa", en: "Hospitality · Ops" },
    reasoning: {
      es: [
        "señal: 9% comandas con error humano",
        "vector: digitalización en sala + cocina",
        "ruta: app pdv + automatización",
      ],
      en: [
        "signal: 9% orders with human error",
        "vector: floor + kitchen digitization",
        "route: POS app + automation",
      ],
    },
    flow: [
      { label: { es: "Comandas a voz", en: "Spoken orders" }, state: "manual" },
      { label: { es: "Errores cocina", en: "Kitchen errors" }, state: "fragile" },
      { label: { es: "App + automatización", en: "App + automation" }, state: "assisted" },
      { label: { es: "Servicio enfocado", en: "Focused service" }, state: "shipped" },
    ],
    outcome: { es: "errores de comanda −90%", en: "order errors −90%" },
    tradi: {
      es: { weeks: "4 sem", cost: "100%", ratio: 1 },
      en: { weeks: "4 wk", cost: "100%", ratio: 1 },
    },
    mine: {
      es: { weeks: "9 días", cost: "≈ 35%", ratio: 0.35, delta: "Δ −68%" },
      en: { weeks: "9 days", cost: "≈ 35%", ratio: 0.35, delta: "Δ −68%" },
    },
    signal: { confidence: 0.89, tokens: 974, latencyMs: 1.6, roi: 8 },
  },
];
