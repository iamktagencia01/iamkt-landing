import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { TechBackground } from "@/components/TechBackground";
import { getPostBySlug, type Block } from "@/lib/posts";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  Database,
  MessageCircle,
  Sparkles,
  Workflow,
} from "lucide-react";

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

function AgentHeroVisual() {
  return (
    <div className="relative mt-10 overflow-hidden rounded-3xl border border-cyan-200/15 bg-slate-950/60 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur md:p-6">
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute -bottom-24 left-12 h-48 w-48 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="relative grid gap-4 md:grid-cols-[1fr_1.2fr_1fr] md:items-center">
        <div className="space-y-3">
          {[
            [MessageCircle, "WhatsApp", "Conversaciones"],
            [Database, "CRM", "Datos limpios"],
          ].map(([Icon, title, detail]) => (
            <div
              key={title as string}
              className="rounded-2xl border border-white/10 bg-white/[0.07] p-3"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-cyan-300/15 p-2 text-cyan-200">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">{title as string}</p>
                  <p className="text-[11px] text-white/50">{detail as string}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative flex min-h-44 flex-col items-center justify-center rounded-3xl border border-cyan-200/25 bg-gradient-to-b from-cyan-300/15 to-blue-500/10 p-5 text-center shadow-[0_0_45px_rgba(34,211,238,0.12)]">
          <div className="absolute inset-x-5 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-100/50 bg-cyan-200/15 shadow-[0_0_35px_rgba(103,232,249,0.3)]">
            <Sparkles className="h-9 w-9 text-cyan-100" />
          </div>
          <p className="relative z-10 mt-3 text-sm font-bold text-white">Agente de IA</p>
          <p className="relative z-10 mt-1 text-[11px] text-cyan-100/70">
            Planifica · decide · ejecuta
          </p>
        </div>
        <div className="space-y-3">
          {[
            [BarChart3, "Reportes", "Decisiones"],
            [Workflow, "Automatización", "Acciones"],
          ].map(([Icon, title, detail]) => (
            <div
              key={title as string}
              className="rounded-2xl border border-white/10 bg-white/[0.07] p-3"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-blue-300/15 p-2 text-blue-200">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">{title as string}</p>
                  <p className="text-[11px] text-white/50">{detail as string}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="relative mt-5 text-center text-xs text-white/45">
        Un objetivo en el centro. Varias herramientas conectadas. Una acción medible.
      </p>
    </div>
  );
}

function AutomationHeroVisual() {
  const steps = ["Cliente escribe", "Sistema clasifica", "Equipo actúa", "Resultado medible"];
  return (
    <div className="relative mt-10 overflow-hidden rounded-3xl border border-cyan-200/15 bg-slate-950/60 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur md:p-7">
      <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-cyan-400/15 blur-3xl" />
      <p className="relative text-center text-xs font-bold uppercase tracking-[0.25em] text-cyan-200/80">De tarea repetitiva a flujo automático</p>
      <div className="relative mt-6 grid gap-2 md:grid-cols-4 md:items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-2 md:block md:text-center">
            <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/25 bg-cyan-300/10 text-lg font-extrabold text-cyan-100">{index + 1}</div>
            <p className="text-sm font-semibold text-white md:mt-3">{step}</p>
            {index < steps.length - 1 && <ArrowDown className="ml-auto h-4 w-4 text-cyan-300/60 md:mx-auto md:mt-3 md:rotate-[-90deg]" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ImpactStrip() {
  return (
    <div className="my-10 grid gap-3 sm:grid-cols-3">
      {[
        ["24/7", "Disponibilidad", "Sin horarios ni pausas"],
        ["3 pasos", "Para empezar", "Detectar, definir, probar"],
        ["1 objetivo", "Por piloto", "Medir antes de escalar"],
      ].map(([value, label, detail]) => (
        <div
          key={label}
          className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/5 p-4"
        >
          <p className="text-2xl font-extrabold tracking-tight text-cyan-500">{value}</p>
          <p className="mt-1 text-sm font-bold text-foreground">{label}</p>
          <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
        </div>
      ))}
    </div>
  );
}

function ComparisonCards() {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-border/60 bg-muted/30 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Responde
        </p>
        <h3 className="mt-2 text-xl font-bold">Chatbot</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Sigue un guion y se detiene cuando la conversación sale de las opciones previstas.
        </p>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p>• Reacciona a una pregunta</p>
          <p>• Trabaja con respuestas fijas</p>
          <p>• No ejecuta acciones</p>
        </div>
      </div>
      <div className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 p-5 shadow-lg shadow-cyan-500/5">
        <p className="text-xs font-bold uppercase tracking-widest text-cyan-600">Resuelve</p>
        <h3 className="mt-2 text-xl font-bold">Agente de IA</h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/75">
          Recibe un objetivo, consulta herramientas, decide el siguiente paso y escala cuando
          corresponde.
        </p>
        <div className="mt-4 space-y-2 text-sm text-foreground/75">
          <p>• Planifica una respuesta</p>
          <p>• Usa tus datos y sistemas</p>
          <p>• Ejecuta y mide acciones</p>
        </div>
      </div>
    </div>
  );
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
      <section
        className="relative overflow-hidden text-white"
        style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
      >
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
          {post.slug === "que-es-un-agente-de-ia" ? <AgentHeroVisual /> : <AutomationHeroVisual />}
        </div>
      </section>

      {/* Contenido */}
      <article className="mx-auto max-w-3xl px-4 py-12 md:px-8">
        <div className="space-y-5">
          {post.slug === "que-es-un-agente-de-ia" && <ImpactStrip />}
          {post.content.map((block, i) => {
            if (post.slug === "que-es-un-agente-de-ia" && block.t === "table" && i === 2) {
              return <ComparisonCards key={i} />;
            }
            return renderBlock(block, i);
          })}
        </div>

        {/* CTA final */}
        <div
          className="mt-14 rounded-2xl p-8 text-center text-white md:p-10"
          style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
        >
          <h2 className="text-2xl font-bold md:text-3xl">
            ¿Quieres implementar esto en tu empresa?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/70">
            En IAmkt convertimos estas guías en soluciones reales. El diagnóstico inicial es
            gratuito y sin compromiso.
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
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:underline"
          >
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
