import type {
  ColorConfig,
  SectionId,
  VitrineContent,
  VitrineTheme,
} from "./schema";

// ============================================================
// Initials / Colors
// ============================================================

export function computeInitials(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0)
    .slice(0, 2);
  if (words.length === 0) return "M";
  return words.map((w) => w[0]?.toUpperCase() ?? "").join("");
}

export const PRESET_COLORS: { name: string; value: string }[] = [
  { name: "Indigo", value: "#4F46E5" },
  { name: "Violet", value: "#7C3AED" },
  { name: "Rose", value: "#DB2777" },
  { name: "Rouge", value: "#DC2626" },
  { name: "Orange", value: "#EA580C" },
  { name: "Ambre", value: "#D97706" },
  { name: "Émeraude", value: "#059669" },
  { name: "Sarcelle", value: "#0D9488" },
  { name: "Bleu", value: "#2563EB" },
  { name: "Ardoise", value: "#475569" },
];

export function isValidHexColor(value: string): boolean {
  return /^#([0-9A-F]{3}){1,2}$/i.test(value.trim());
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  if (!isValidHexColor(hex)) return null;
  let h = hex.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r, g, b };
}

/** Convert a ColorConfig to a CSS value usable in `background` or `color`. */
export function resolveColor(c: ColorConfig, forText = false): string {
  const hasOpacity =
    c.useOpacity &&
    typeof c.opacity === "number" &&
    c.opacity >= 0 &&
    c.opacity <= 100;

  const fromCss = hasOpacity ? hexWithOpacity(c.base, c.opacity!) : c.base;

  if (!forText && c.useGradient && c.gradientTo) {
    const toCss = hasOpacity
      ? hexWithOpacity(c.gradientTo, c.opacity!)
      : c.gradientTo;
    return `linear-gradient(135deg, ${fromCss}, ${toCss})`;
  }

  return fromCss;
}

function hexWithOpacity(hex: string, opacity: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity / 100})`;
}

// ============================================================
// Section metadata
// ============================================================

export const SECTION_META: Record<
  SectionId,
  { label: string; navLabel: string | null; description: string }
> = {
  features: {
    label: "Services / Features",
    navLabel: "Services",
    description: "Les services ou features que tu proposes.",
  },
  about: {
    label: "À propos",
    navLabel: "À propos",
    description: "L'histoire et les chiffres clés.",
  },
  process: {
    label: "Notre processus",
    navLabel: "Process",
    description: "Les étapes de ta méthode.",
  },
  testimonials: {
    label: "Témoignages",
    navLabel: "Témoignages",
    description: "Les retours de tes clients.",
  },
  faq: {
    label: "FAQ",
    navLabel: "FAQ",
    description: "Questions/réponses pour rassurer.",
  },
  cta: {
    label: "Bannière CTA finale",
    navLabel: null, // banner, not a destination
    description: "Bloc de conversion avant le contact.",
  },
  contact: {
    label: "Contact",
    navLabel: "Contact",
    description: "Infos + formulaire optionnel.",
  },
};

export const DEFAULT_SECTION_ORDER: SectionId[] = [
  "features",
  "about",
  "process",
  "testimonials",
  "faq",
  "cta",
  "contact",
];

// ============================================================
// Default theme
// ============================================================

export const DEFAULT_THEME: VitrineTheme = {
  background: { base: "#FFFFFF" },
  container: { base: "#FAFAFA" },
  cta: { base: "#4F46E5" },
  secondary: { base: "#18181B" },
  textPrimary: { base: "#18181B" },
  textMuted: { base: "#52525B" },
};

// ============================================================
// Normalize content (merge old/partial content with defaults)
// ============================================================

export function normalizeContent(
  raw: unknown,
  fallback: VitrineContent,
): VitrineContent {
  const v = (raw ?? {}) as Partial<VitrineContent>;

  const theme: VitrineTheme = {
    background: v.theme?.background ?? fallback.theme.background,
    container: v.theme?.container ?? fallback.theme.container,
    cta: v.theme?.cta ?? fallback.theme.cta,
    secondary: v.theme?.secondary ?? fallback.theme.secondary,
    textPrimary: v.theme?.textPrimary ?? fallback.theme.textPrimary,
    textMuted: v.theme?.textMuted ?? fallback.theme.textMuted,
  };

  const sectionOrder =
    v.sectionOrder && Array.isArray(v.sectionOrder) && v.sectionOrder.length > 0
      ? (v.sectionOrder.filter((id) =>
          DEFAULT_SECTION_ORDER.includes(id as SectionId),
        ) as SectionId[])
      : fallback.sectionOrder;

  return {
    schemaVersion: 2,
    theme,
    brand: { ...fallback.brand, ...(v.brand ?? {}) },
    sectionOrder,
    nav: { ...fallback.nav, ...(v.nav ?? {}) },
    hero: { ...fallback.hero, ...(v.hero ?? {}) },
    features: { ...fallback.features, ...(v.features ?? {}) },
    about: { ...fallback.about, ...(v.about ?? {}) },
    process: { ...fallback.process, ...(v.process ?? {}) },
    testimonials: { ...fallback.testimonials, ...(v.testimonials ?? {}) },
    faq: { ...fallback.faq, ...(v.faq ?? {}) },
    cta: { ...fallback.cta, ...(v.cta ?? {}) },
    contact: { ...fallback.contact, ...(v.contact ?? {}) },
    footer: { ...fallback.footer, ...(v.footer ?? {}) },
  };
}
