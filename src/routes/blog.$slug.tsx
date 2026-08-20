import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { TechBackground } from "@/components/TechBackground";
import { getPostBySlug, type Block } from "@/lib/posts";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const post = loaderData;
    const url = `https://iamkt.co/blog/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} — Blog IAmkt` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: "es",
            author: {
              "@type": "Person",
              name: "IAmkt — Ing. Marlio Dario Damian Torres",
              url: "https://iamkt.co/",
            },
            publisher: {
              "@type": "Organization",
              name: "IAmkt",
              url: "https://iamkt.co/",
            },
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  component: PostView,
});

function renderBlock(block: Block, key: number) {
  switch (block.t) {
    case "p":
      return (
        <p key={key} className="text-base leading-relaxed text-foreground/85 md:text-lg">
          {block.x}
        </p>
      );
    case "h2":
      return (
        <h2
          key={key}
          className="mt-12 mb-4 border-b border-border/40 pb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
        >
          {block.x}
        </h2>
      );
    case "h3":
      return (
        <h3 key={key} className="mt-8 mb-3 text-xl font-bold text-foreground">
          {block.x}
        </h3>
      );
    case "ul":
      return (
        <ul key={key} className="mt-4 space-y-2.5 pl-1">
          {block.x.map((li, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-foreground/85">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{li}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={key} className="mt-4 space-y-3 pl-1">
          {block.x.map((li, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-foreground/85">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                {i + 1}
              </span>
              <span>{li}</span>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={key}
          className="mt-8 border-l-4 border-accent bg-accent/5 p-5 text-lg font-medium italic leading-relaxed text-foreground/90"
        >
          {block.x}
        </blockquote>
      );
    case "table":
      return (
        <div key={key} className="mt-6 overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-accent/10">
                {block.head.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-bold text-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border/30 last:border-0">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-4 py-3 align-top text-foreground/85 ${ci === 0 ? "font-semibold text-foreground" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

const WHATSAPP_URL = `https://wa.me/573228570784?text=${encodeURIComponent(
  "Hola IAmkt, leí el artículo del blog y quiero mi diagnóstico gratuito.",
)}`;

function PostView() {
  const post = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header ctaHref="/?diagnostico=1" />

      {/* Hero del artículo */}
      <section className="relative overflow-hidden text-white" style={{ backgroundColor: "oklch(0.13 0.06 265)" }}>
        <TechBackground />
        <div className="relative mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al blog
          </Link>
          <p className="mt-6 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-200">
            {post.category}
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {new Date(post.date + "T00:00:00").toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime} de lectura
            </span>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <article className="mx-auto max-w-3xl px-4 py-12 md:px-8">
        <div className="space-y-5">{post.content.map((block, i) => renderBlock(block, i))}</div>

        {/* CTA final */}
        <div
          className="mt-14 rounded-2xl p-8 text-center text-white md:p-10"
          style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
        >
          <h2 className="text-2xl font-bold md:text-3xl">¿Quieres implementar esto en tu empresa?</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/70">
            En IAmkt convertimos estas guías en soluciones reales. El diagnóstico inicial
            es gratuito y sin compromiso.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/?diagnostico=1"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/30 transition-all hover:-translate-y-0.5"
            >
              Diagnóstico Gratuito <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-accent/50"
            >
              <MessageCircle className="h-4 w-4" /> Escríbenos por WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:underline">
            <ArrowLeft className="h-4 w-4" /> Ver más artículos
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground md:flex-row md:px-8">
          <span>© {new Date().getFullYear()} IAmkt — Ingeniería, IA y Marketing Digital</span>
          <div className="flex gap-6">
            <a href="mailto:contacto@iamkt.co" className="transition-colors hover:text-accent">
              contacto@iamkt.co
            </a>
            <Link to="/" className="transition-colors hover:text-accent">
              Inicio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
