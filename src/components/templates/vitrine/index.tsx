import type { CSSProperties, ComponentType } from "react";
import type {
  VitrineContent,
  SectionId,
  Link as NavLink,
} from "@/lib/templates/vitrine/schema";
import {
  computeInitials,
  resolveColor,
  SECTION_META,
  normalizeContent,
} from "@/lib/templates/vitrine/utils";
import { vitrineDefault } from "@/lib/templates/vitrine/default";
import { ArrowRight, Mail, Phone, MapPin, Clock, Check } from "lucide-react";
import { SmoothScroll } from "./smooth-scroll";

type TemplateStyle = CSSProperties &
  Record<
    | "--bg"
    | "--container"
    | "--cta"
    | "--secondary"
    | "--text"
    | "--text-muted",
    string
  >;

export function VitrineTemplate({ content: raw }: { content: unknown }) {
  const content = normalizeContent(raw, vitrineDefault);
  const { theme } = content;

  const rootStyle: TemplateStyle = {
    "--bg": resolveColor(theme.background),
    "--container": resolveColor(theme.container),
    "--cta": resolveColor(theme.cta),
    "--secondary": resolveColor(theme.secondary),
    "--text": resolveColor(theme.textPrimary, true),
    "--text-muted": resolveColor(theme.textMuted, true),
  };

  return (
    <div
      className="antialiased min-h-screen"
      style={{
        ...rootStyle,
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <SmoothScroll />
      <Nav content={content} />
      <Hero content={content} />
      {content.sectionOrder.map((id) => {
        const section = content[id];
        if (!section || !section.enabled) return null;
        const Component = SECTION_COMPONENTS[id];
        return <Component key={id} content={content} />;
      })}
      <Footer content={content} />
    </div>
  );
}

// ============================================================
// Logo (monogram or uploaded image)
// ============================================================
function BrandLogo({
  name,
  initials,
  logoUrl,
  size = "md",
}: {
  name: string;
  initials?: string;
  logoUrl?: string;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "h-7 w-7 text-xs" : "h-8 w-8 text-sm";
  if (logoUrl) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={logoUrl}
        alt={name}
        className={`${sizeClass} rounded-lg object-cover flex-shrink-0`}
      />
    );
  }
  const letters = initials ?? computeInitials(name);
  return (
    <span
      className={`inline-flex items-center justify-center ${sizeClass} rounded-lg text-white font-bold flex-shrink-0`}
      style={{ background: "var(--cta)" }}
      aria-hidden
    >
      {letters}
    </span>
  );
}

// ============================================================
// Nav (derived from sectionOrder + enabled)
// ============================================================
function Nav({ content }: { content: VitrineContent }) {
  const { brand, nav } = content;
  const navLinks = content.sectionOrder
    .filter((id) => content[id]?.enabled && SECTION_META[id].navLabel)
    .map((id) => ({
      id,
      label: SECTION_META[id].navLabel!,
    }));

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl border-b"
      style={{
        background: "color-mix(in oklab, var(--bg) 80%, transparent)",
        borderColor: "color-mix(in oklab, var(--text) 10%, transparent)",
      }}
    >
      <div className="mx-auto max-w-6xl h-16 px-6 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2.5"
          style={{ color: "var(--text)" }}
        >
          <BrandLogo
            name={brand.name}
            initials={brand.initials}
            logoUrl={brand.logoUrl}
          />
          <span className="flex flex-col leading-none">
            <span className="font-bold tracking-tight text-lg">
              {brand.name}
            </span>
            {brand.tagline && (
              <span
                className="mt-1 hidden sm:block text-[11px] font-normal truncate max-w-[220px]"
                style={{ color: "var(--text-muted)" }}
              >
                {brand.tagline}
              </span>
            )}
          </span>
        </a>
        {navLinks.length > 0 && (
          <nav
            className="hidden md:flex items-center gap-8 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {navLinks.map((link, i) => (
              <a
                key={`nav-${i}`}
                href={`#${link.id}`}
                className="hover:opacity-80 transition-opacity"
                style={{ color: "inherit" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
        {nav.cta && (
          <a
            href={nav.cta.href}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--cta)" }}
          >
            {nav.cta.label}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </header>
  );
}

// ============================================================
// Section : Hero
// ============================================================
function Hero({ content }: { content: VitrineContent }) {
  const { hero } = content;
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full blur-[120px] opacity-15"
          style={{ background: "var(--cta)" }}
        />
      </div>
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-24 sm:pt-32 sm:pb-32">
        <div className="max-w-3xl">
          {hero.eyebrow && (
            <div
              className="inline-flex items-center rounded-full border backdrop-blur px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
              style={{
                borderColor: "color-mix(in oklab, var(--text) 15%, transparent)",
                background:
                  "color-mix(in oklab, var(--container) 70%, transparent)",
                color: "var(--text-muted)",
              }}
            >
              {hero.eyebrow}
            </div>
          )}
          <h1
            className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[1.05]"
            style={{ color: "var(--text)" }}
          >
            {hero.title}
          </h1>
          {hero.subtitle && (
            <p
              className="mt-6 text-lg sm:text-xl max-w-2xl leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {hero.subtitle}
            </p>
          )}
          {(hero.primaryCta || hero.secondaryCta) && (
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {hero.primaryCta && (
                <CTA link={hero.primaryCta} variant="primary" />
              )}
              {hero.secondaryCta && (
                <CTA link={hero.secondaryCta} variant="ghost" />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section : Features
// ============================================================
function Features({ content }: { content: VitrineContent }) {
  const { features } = content;
  return (
    <section
      id="features"
      className="py-20 sm:py-28 border-t"
      style={{
        background: "var(--container)",
        borderColor: "color-mix(in oklab, var(--text) 10%, transparent)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow={features.eyebrow}
          title={features.title}
          subtitle={features.subtitle}
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.items.map((item, i) => (
            <div
              key={`feature-${i}`}
              className="rounded-2xl border p-8 transition-all hover:shadow-sm"
              style={{
                background: "var(--bg)",
                borderColor: "color-mix(in oklab, var(--text) 10%, transparent)",
              }}
            >
              {item.icon && <div className="text-3xl mb-4">{item.icon}</div>}
              <h3
                className="font-semibold text-lg"
                style={{ color: "var(--text)" }}
              >
                {item.title}
              </h3>
              <p
                className="mt-2 leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section : About
// ============================================================
function About({ content }: { content: VitrineContent }) {
  const { about } = content;
  const paragraphs = about.body.split("\n\n").filter(Boolean);
  return (
    <section
      id="about"
      className="py-20 sm:py-28 border-t"
      style={{
        borderColor: "color-mix(in oklab, var(--text) 10%, transparent)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <SectionHeader
              eyebrow={about.eyebrow}
              title={about.title}
              align="left"
            />
          </div>
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <p
                key={`about-p-${i}`}
                className="text-lg leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
        {about.stats && about.stats.length > 0 && (
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {about.stats.map((stat, i) => (
              <div
                key={`stat-${i}`}
                className="rounded-2xl border p-6"
                style={{
                  background: "var(--container)",
                  borderColor:
                    "color-mix(in oklab, var(--text) 10%, transparent)",
                }}
              >
                <div
                  className="text-4xl font-bold tracking-tight tabular-nums"
                  style={{ color: "var(--text)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-1 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// Section : Process
// ============================================================
function Process({ content }: { content: VitrineContent }) {
  const { process } = content;
  return (
    <section
      id="process"
      className="py-20 sm:py-28 border-t text-white"
      style={{
        background: "var(--secondary)",
        borderColor: "color-mix(in oklab, var(--text) 10%, transparent)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow={process.eyebrow}
          title={process.title}
          subtitle={process.subtitle}
          dark
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.steps.map((step, i) => (
            <div key={`step-${i}`} className="relative">
              <div className="text-5xl font-bold text-white/20 font-mono">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 font-semibold text-xl text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section : Testimonials
// ============================================================
function Testimonials({ content }: { content: VitrineContent }) {
  const { testimonials } = content;
  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 border-t"
      style={{
        borderColor: "color-mix(in oklab, var(--text) 10%, transparent)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.items.map((t, i) => (
            <figure
              key={`testi-${i}`}
              className="rounded-2xl border p-8 flex flex-col"
              style={{
                background: "var(--container)",
                borderColor:
                  "color-mix(in oklab, var(--text) 10%, transparent)",
              }}
            >
              <svg
                className="h-6 w-6"
                style={{ color: "var(--cta)" }}
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote
                className="mt-4 text-lg leading-relaxed flex-1"
                style={{ color: "var(--text)" }}
              >
                {t.quote}
              </blockquote>
              <figcaption
                className="mt-6 pt-6 border-t"
                style={{
                  borderColor:
                    "color-mix(in oklab, var(--text) 10%, transparent)",
                }}
              >
                <div className="font-semibold" style={{ color: "var(--text)" }}>
                  {t.author}
                </div>
                {t.role && (
                  <div
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.role}
                  </div>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section : FAQ
// ============================================================
function FAQ({ content }: { content: VitrineContent }) {
  const { faq } = content;
  return (
    <section
      id="faq"
      className="py-20 sm:py-28 border-t"
      style={{
        background: "var(--container)",
        borderColor: "color-mix(in oklab, var(--text) 10%, transparent)",
      }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          eyebrow={faq.eyebrow}
          title={faq.title}
          subtitle={faq.subtitle}
        />
        <div className="mt-12 space-y-3">
          {faq.items.map((item, i) => (
            <details
              key={`faq-${i}`}
              className="group rounded-2xl border px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
              style={{
                background: "var(--bg)",
                borderColor:
                  "color-mix(in oklab, var(--text) 10%, transparent)",
              }}
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3
                  className="font-semibold pr-4"
                  style={{ color: "var(--text)" }}
                >
                  {item.question}
                </h3>
                <span
                  className="group-open:rotate-45 transition-transform flex-shrink-0 text-xl leading-none"
                  style={{ color: "var(--text-muted)" }}
                >
                  +
                </span>
              </summary>
              <p
                className="mt-4 leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section : Final CTA banner
// ============================================================
function FinalCTA({ content }: { content: VitrineContent }) {
  const { cta } = content;
  return (
    <section
      id="cta"
      className="py-20 sm:py-28 border-t"
      style={{
        borderColor: "color-mix(in oklab, var(--text) 10%, transparent)",
      }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div
          className="rounded-3xl text-white p-10 sm:p-16 text-center relative overflow-hidden"
          style={{ background: "var(--cta)" }}
        >
          <div
            aria-hidden
            className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              {cta.title}
            </h2>
            {cta.subtitle && (
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
                {cta.subtitle}
              </p>
            )}
            {(cta.primaryCta || cta.secondaryCta) && (
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                {cta.primaryCta && (
                  <a
                    href={cta.primaryCta.href}
                    className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white font-medium transition-opacity hover:opacity-90"
                    style={{ color: "var(--cta)" }}
                  >
                    {cta.primaryCta.label}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}
                {cta.secondaryCta && (
                  <a
                    href={cta.secondaryCta.href}
                    className="inline-flex items-center h-12 px-6 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
                  >
                    {cta.secondaryCta.label}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section : Contact
// ============================================================
function Contact({ content }: { content: VitrineContent }) {
  const { contact } = content;
  const hasInfo =
    contact.email || contact.phone || contact.address || contact.hours;
  return (
    <section
      id="contact"
      className="py-20 sm:py-28 border-t"
      style={{
        background: "var(--container)",
        borderColor: "color-mix(in oklab, var(--text) 10%, transparent)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`grid grid-cols-1 ${
            contact.showForm ? "lg:grid-cols-2 gap-12 lg:gap-20" : ""
          }`}
        >
          <div>
            <SectionHeader
              eyebrow={contact.eyebrow}
              title={contact.title}
              subtitle={contact.subtitle}
              align={contact.showForm ? "left" : "center"}
            />
            {hasInfo && (
              <div className="mt-10 space-y-5 max-w-md">
                {contact.email && (
                  <ContactRow
                    icon={Mail}
                    label="Email"
                    value={contact.email}
                    href={`mailto:${contact.email}`}
                  />
                )}
                {contact.phone && (
                  <ContactRow
                    icon={Phone}
                    label="Téléphone"
                    value={contact.phone}
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  />
                )}
                {contact.address && (
                  <ContactRow
                    icon={MapPin}
                    label="Adresse"
                    value={contact.address}
                  />
                )}
                {contact.hours && (
                  <ContactRow
                    icon={Clock}
                    label="Horaires"
                    value={contact.hours}
                  />
                )}
              </div>
            )}
          </div>
          {contact.showForm && (
            <div>
              <form
                className="rounded-2xl border p-8 space-y-4 shadow-sm"
                style={{
                  background: "var(--bg)",
                  borderColor:
                    "color-mix(in oklab, var(--text) 10%, transparent)",
                }}
              >
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--text)" }}
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full h-11 px-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                    style={{
                      borderColor:
                        "color-mix(in oklab, var(--text) 20%, transparent)",
                      background: "var(--bg)",
                      color: "var(--text)",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--text)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full h-11 px-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                    style={{
                      borderColor:
                        "color-mix(in oklab, var(--text) 20%, transparent)",
                      background: "var(--bg)",
                      color: "var(--text)",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--text)" }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors resize-none"
                    style={{
                      borderColor:
                        "color-mix(in oklab, var(--text) 20%, transparent)",
                      background: "var(--bg)",
                      color: "var(--text)",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full h-11 rounded-lg text-white font-medium transition-opacity hover:opacity-90 inline-flex items-center justify-center gap-2"
                  style={{ background: "var(--cta)" }}
                >
                  Envoyer le message
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <p
                  className="text-xs text-center flex items-center justify-center gap-1.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  Réponse garantie sous 24h
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div
        className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
        style={{ background: "var(--cta)" }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </div>
        <div
          className="mt-0.5 font-medium break-words"
          style={{ color: "var(--text)" }}
        >
          {value}
        </div>
      </div>
    </div>
  );
  if (href)
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </a>
    );
  return content;
}

// ============================================================
// Section : Footer
// ============================================================
function Footer({ content }: { content: VitrineContent }) {
  const { brand, footer } = content;
  const year = new Date().getFullYear();
  const tagline = brand.tagline ?? footer.tagline;
  return (
    <footer
      className="py-12 border-t"
      style={{
        background: "var(--bg)",
        borderColor: "color-mix(in oklab, var(--text) 10%, transparent)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BrandLogo
              name={brand.name}
              initials={brand.initials}
              logoUrl={brand.logoUrl}
              size="sm"
            />
            <div>
              <div
                className="font-bold tracking-tight"
                style={{ color: "var(--text)" }}
              >
                {brand.name}
              </div>
              {tagline && (
                <div
                  className="mt-0.5 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {tagline}
                </div>
              )}
            </div>
          </div>
          {footer.links && footer.links.length > 0 && (
            <div
              className="flex flex-wrap items-center gap-6 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {footer.links.map((link, i) => (
                <a
                  key={`footer-${i}`}
                  href={link.href}
                  className="hover:opacity-80 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <div
          className="mt-8 pt-8 border-t text-xs"
          style={{
            borderColor: "color-mix(in oklab, var(--text) 10%, transparent)",
            color: "var(--text-muted)",
          }}
        >
          © {year} {footer.copyright ?? `${brand.name}. Tous droits réservés.`}
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// Shared helpers
// ============================================================
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <div
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: dark ? "rgba(255,255,255,0.7)" : "var(--cta)" }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-tight"
        style={{ color: dark ? "#fff" : "var(--text)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-lg leading-relaxed"
          style={{ color: dark ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function CTA({
  link,
  variant,
}: {
  link: NavLink;
  variant: "primary" | "ghost";
}) {
  if (variant === "primary") {
    return (
      <a
        href={link.href}
        className="group inline-flex items-center gap-2 h-12 px-6 rounded-full text-white font-medium transition-opacity hover:opacity-90 shadow-lg"
        style={{ background: "var(--cta)" }}
      >
        {link.label}
        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </a>
    );
  }
  return (
    <a
      href={link.href}
      className="inline-flex items-center h-12 px-6 rounded-full border transition-all hover:opacity-80"
      style={{
        borderColor: "color-mix(in oklab, var(--text) 20%, transparent)",
        color: "var(--text)",
      }}
    >
      {link.label}
    </a>
  );
}

// ============================================================
// Dispatch : render sections by id
// ============================================================
const SECTION_COMPONENTS: Record<
  SectionId,
  ComponentType<{ content: VitrineContent }>
> = {
  features: Features,
  about: About,
  process: Process,
  testimonials: Testimonials,
  faq: FAQ,
  cta: FinalCTA,
  contact: Contact,
};
