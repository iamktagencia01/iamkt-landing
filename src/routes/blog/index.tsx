import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { TechBackground } from "@/components/TechBackground";
import { getPublishedPosts } from "@/lib/posts";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      {
        title: "Blog IAmkt — IA, Automatización y Marketing Digital para Empresas",
      },
      {
        name: "description",
        content:
          "Guías prácticas de IAmkt sobre inteligencia artificial aplicada, automatización de procesos, WhatsApp Business, marketing digital e IA en el agro colombiano.",
      },
      { property: "og:title", content: "Blog IAmkt — IA, Automatización y Marketing Digital" },
      {
        property: "og:description",
        content:
          "Guías prácticas para empresas: agentes de IA, automatización, WhatsApp Business, marketing digital e IA en el agro.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://iamkt.co/blog" },
    ],
    links: [{ rel: "canonical", href: "https://iamkt.co/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog IAmkt",
          url: "https://iamkt.co/blog",
          description:
            "Guías prácticas de IAmkt sobre inteligencia artificial aplicada, automatización de procesos, WhatsApp Business, marketing digital e IA en el agro colombiano.",
          publisher: { "@type": "Organization", name: "IAmkt", url: "https://iamkt.co/" },
          inLanguage: "es",
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = getPublishedPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header ctaHref="/?diagnostico=1" />

      {/* Hero */}
      <section className="relative overflow-hidden text-white" style={{ backgroundColor: "oklch(0.13 0.06 265)" }}>
        <TechBackground />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center md:px-8 md:py-24">
          <p className="mb-4 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-200">
            Blog / Recursos
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Guías prácticas para{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-sky-200 bg-clip-text text-transparent">
              hacer crecer tu empresa
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            IA aplicada, automatización, WhatsApp Business y marketing digital.
            Contenido claro, directo y listo para aplicar.
          </p>
        </div>
      </section>

      {/* Casos de éxito destacados */}
      <section className="mx-auto max-w-6xl px-4 pt-16 md:px-8">
        <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 md:p-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-accent">
                Prueba social
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight">Casos de éxito reales</h2>
              <p className="mt-2 max-w-xl text-sm text-foreground/85">
                Dos implementaciones a la medida con estimaciones de ahorro en horas y dinero,
                basadas en promedios del sector.
              </p>
            </div>
            <Link
              to="/casos-de-exito"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/30 transition-all hover:-translate-y-0.5"
            >
              Ver casos de éxito <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link
              to="/casos-de-exito"
              className="group rounded-xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
            >
              <h3 className="font-bold text-foreground transition-colors group-hover:text-accent">
                Monarca Gastro Bar
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Menú QR + gestión de restaurante: pedidos directos a cocina, caja y reportes
                automáticos. Cero comandas en papel.
              </p>
              <p className="mt-3 text-lg font-extrabold text-accent">150–175 h/mes · $2.5–6M/mes</p>
            </Link>
            <Link
              to="/casos-de-exito"
              className="group rounded-xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
            >
              <h3 className="font-bold text-foreground transition-colors group-hover:text-accent">
                Dasagro 360
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                CRM para agroinsumos con 5 almacenes: orden, factura, inventario y contabilidad
                en un solo flujo. Atención en minutos.
              </p>
              <p className="mt-3 text-lg font-extrabold text-accent">250–275 h/mes · $3.5–6M/mes</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Lista de artículos */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        {posts.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              Estamos preparando los primeros artículos. Vuelve pronto. 🚀
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:-translate-y-0.5"
            >
              Volver al inicio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
              >
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  loading="lazy"
                  className="-mx-6 -mt-6 mb-6 aspect-[3/2] w-[calc(100%+3rem)] rounded-t-xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent">
                    {post.category}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(post.date + "T00:00:00").toLocaleDateString("es-CO", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div
          className="mt-16 rounded-2xl p-8 text-center text-white md:p-12"
          style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
        >
          <h2 className="text-2xl font-bold md:text-3xl">
            ¿Listo para aplicar esto en tu empresa?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Descubre exactamente qué necesita tu negocio con un diagnóstico gratuito.
            Sin compromiso.
          </p>
          <Link
            to="/?diagnostico=1"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/30 transition-all hover:-translate-y-0.5"
          >
            Comienza Tu Diagnóstico Gratuito <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground md:flex-row md:px-8">
          <span>© {new Date().getFullYear()} IAmkt — Ingeniería, IA y Marketing Digital</span>
          <div className="flex gap-6">
            <a href="mailto:contacto@iamkt.co" className="transition-colors hover:text-accent">
              contacto@iamkt.co
            </a>
            <Link to="/privacidad" className="transition-colors hover:text-accent">
              Privacidad
            </Link>
            <Link to="/terminos" className="transition-colors hover:text-accent">
              Términos
            </Link>
            <Link to="/" className="transition-colors hover:text-accent">
              Inicio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
