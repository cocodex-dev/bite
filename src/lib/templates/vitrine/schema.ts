// Schema for a Vitrine template site content (v2).
// Stored as JSONB in sites.content.

export type Link = { label: string; href: string };

export type ColorConfig = {
  base: string; // "#RRGGBB"
  useGradient?: boolean;
  gradientTo?: string; // second hex when useGradient
  useOpacity?: boolean;
  opacity?: number; // 0-100
};

export type VitrineTheme = {
  background: ColorConfig;
  container: ColorConfig;
  cta: ColorConfig;
  secondary: ColorConfig;
  textPrimary: ColorConfig;
  textMuted: ColorConfig;
};

export type SectionId =
  | "features"
  | "about"
  | "process"
  | "testimonials"
  | "faq"
  | "cta"
  | "contact";

export type VitrineContent = {
  schemaVersion: 2;
  theme: VitrineTheme;
  brand: {
    name: string;
    tagline?: string;
    initials?: string;
    logoUrl?: string;
  };
  sectionOrder: SectionId[];
  nav: {
    cta?: Link;
  };
  hero: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    primaryCta?: Link;
    secondaryCta?: Link;
  };
  features: {
    enabled: boolean;
    eyebrow?: string;
    title: string;
    subtitle?: string;
    items: { icon?: string; title: string; description: string }[];
  };
  about: {
    enabled: boolean;
    eyebrow?: string;
    title: string;
    body: string;
    stats?: { label: string; value: string }[];
  };
  process: {
    enabled: boolean;
    eyebrow?: string;
    title: string;
    subtitle?: string;
    steps: { title: string; description: string }[];
  };
  testimonials: {
    enabled: boolean;
    eyebrow?: string;
    title: string;
    items: { quote: string; author: string; role?: string }[];
  };
  faq: {
    enabled: boolean;
    eyebrow?: string;
    title: string;
    subtitle?: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    enabled: boolean;
    title: string;
    subtitle?: string;
    primaryCta?: Link;
    secondaryCta?: Link;
  };
  contact: {
    enabled: boolean;
    showForm: boolean;
    eyebrow?: string;
    title: string;
    subtitle?: string;
    email?: string;
    phone?: string;
    address?: string;
    hours?: string;
  };
  footer: {
    tagline?: string;
    links?: Link[];
    copyright?: string;
  };
};
