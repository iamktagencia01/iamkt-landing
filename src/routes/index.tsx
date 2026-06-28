import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendContactEmail } from "../lib/api/send-email.functions";
import {
  Search,
  Smartphone,
  Bot,
  Settings2,
  BrainCircuit,
  Megaphone,
  MessageCircle,
  TrendingUp,
  Cog,
  DollarSign,
  Phone,
  Facebook,
  ArrowRight,
  CheckCircle2,
  Target,
  Rocket,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Mail,
  Send,
} from "lucide-react";
import logoUrl from "@/assets/logo.png";
import { TechBackground } from "@/components/TechBackground";

const WHATSAPP_NUMBER = "573228570784";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola IAmkt, quiero agendar mi diagnóstico gratuito.",
)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IAmkt — Arquitectos Tecnológicos para Empresas que Quieren Crecer" },
      {
        name: "description",
        content:
          "Agencia de ingeniería aplicada, inteligencia artificial y marketing digital. Automatización, agentes de IA, desarrollo de software y estrategias de crecimiento para empresas.",
      },
      { property: "og:title", content: "IAmkt — Ingeniería, IA y Marketing Digital" },
      {
        property: "og:description",
        content:
          "Transformamos negocios combinando ingeniería, inteligencia artificial y marketing digital. Soluciones estratégicas con resultados medibles.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://iamkt.lovable.app" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

/* ─── Shared Components ─── */

function WhatsAppButton({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "md" | "lg";
}) {
  const sizeClass =
    size === "lg" ? "px-8 py-4 text-base md:text-lg" : "px-5 py-3 text-sm";
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-xl bg-accent font-semibold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:shadow-accent/50 hover:-translate-y-0.5 ${sizeClass}`}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function SectionHeader({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
        {tag}
      </p>
      <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-white/70">{subtitle}</p>
      )}
    </div>
  );
}

/* ─── Header ─── */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#inicio" className="flex items-center gap-2">
          <img
            src={logoUrl}
            alt="IAmkt — Agencia de Ingeniería, IA y Marketing Digital"
            className="h-10 w-auto"
          />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Inicio", "#inicio"],
            ["Beneficios", "#beneficios"],
            ["Servicios", "#servicios"],
            ["Metodología", "#metodologia"],
            ["Por qué IAmkt", "#diferenciacion"],
            ["Nosotros", "#nosotros"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/30 transition-all hover:-translate-y-0.5 md:inline-flex"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </header>
  );
}

/* ─── Hero ─── */

function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
    >
      <TechBackground />
      <div className="relative mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="font-display text-center text-5xl font-extrabold leading-none tracking-tight md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-cyan-200 via-sky-200 to-cyan-100 bg-clip-text text-transparent">
              Agencia{" "}
            </span>
            <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
              IAmkt
            </span>
          </h1>

          <p className="mb-4 mt-3 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-200">
            Arquitectos tecnológicos
          </p>
          
          <h2 className="mt-6 text-center text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Ingeniería aplicada + IA + Marketing Digital para{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-sky-200 bg-clip-text text-transparent">
              escalar tu negocio
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/80">
            Diseñamos, implementamos y optimizamos sistemas digitales para que
            tu empresa venda más, atienda mejor y opere con mayor eficiencia
            usando inteligencia artificial, automatización y marketing basado
            en datos.
          </p>
          <p className="mt-4 text-center text-base font-semibold text-emerald-300">
            ⚡ Empieza hoy con un <span className="text-white">diagnóstico gratuito</span> — sin compromiso, sin costo.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <WhatsAppButton size="lg">
              Diagnóstico Gratuito — Empieza Aquí
            </WhatsAppButton>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-white/70">
            <Phone className="h-4 w-4 text-cyan-300" />
            Contáctanos al{" "}
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="font-semibold text-white underline-offset-4 hover:underline"
            >
              322 857 0784
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Benefits ─── */

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Estrategia basada en datos",
    body: "Construimos cimientos sólidos para tu crecimiento analizando el comportamiento real de tu mercado. Cada decisión de marketing y ventas que tomamos está respaldada por información precisa para maximizar tu retorno de inversión.",
  },
  {
    icon: Cog,
    title: "Procesos más eficientes",
    body: "Eliminamos los cuellos de botella de tu operación automatizando tareas repetitivas y manuales. Tu equipo trabajará menos en la operatividad y más en lo que realmente importa: cerrar negocios.",
  },
  {
    icon: DollarSign,
    title: "Más clientes y ventas",
    body: "Todo nuestro ecosistema de ingeniería e inteligencia artificial tiene un único objetivo final: escalar tu facturación. Transformamos tu presencia digital en una máquina predecible de generación de prospectos calificados listos para comprar.",
  },
];

function Benefits() {
  return (
    <section
      id="beneficios"
      className="relative overflow-hidden py-20 text-white md:py-28"
      style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
    >
      <TechBackground density={40} />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeader
          tag="Por qué IAmkt"
          title="Tres pilares que escalan tu negocio"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-accent/50 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-center text-xl font-bold text-white">
                {title}
              </h3>
              <p className="mt-3 text-center text-sm leading-relaxed text-white/70">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services (with expandable detail) ─── */

interface ServiceDetail {
  problems: string[];
  forWhom: string;
  deliverables: string[];
}

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "Diagnóstico y Estrategia": {
    problems: [
      "No sabes por dónde empezar a mejorar tu negocio",
      "Tienes canales y procesos desconectados",
      "No existen indicadores claros de gestión",
      "Inviertes en tecnología o marketing sin estrategia",
    ],
    forWhom:
      "Empresas que sienten que algo no funciona pero no saben exactamente qué. Negocios que quieren crecer pero necesitan claridad antes de invertir. Sin costo, sin compromiso.",
    deliverables: [
      "Informe ejecutivo con hallazgos clave",
      "Mapa de cuellos de botella y oportunidades",
      "Plan de acción priorizado con KPIs",
      "Roadmap de implementación",
      "Proyección de retorno esperado",
    ],
  },
  "Desarrollo de Aplicaciones a la Medida": {
    problems: [
      "Procesos que dependen de Excel, WhatsApp o tareas manuales",
      "Falta de sistemas internos que se adapten a tu flujo",
      "Información dispersa entre herramientas",
      "Necesidad de dashboards, portales o herramientas propias",
    ],
    forWhom:
      "Empresas que han superado las herramientas genéricas y necesitan un sistema que se adapte a su flujo de trabajo, no al revés.",
    deliverables: [
      "Aplicación web funcional (responsive)",
      "Panel de control con métricas en tiempo real",
      "Integraciones con tus sistemas existentes",
      "Documentación técnica y manual de usuario",
      "Soporte y mantenimiento post-entrega",
    ],
  },
  "Implementación de Agentes de IA": {
    problems: [
      "Demoras en atención al cliente",
      "Alto volumen de preguntas repetitivas",
      "Falta de seguimiento comercial",
      "Equipos saturados que necesitan escalar sin contratar",
    ],
    forWhom:
      "Empresas con procesos repetitivos que consumen horas de talento humano. Negocios que quieren escalar sin multiplicar costos fijos.",
    deliverables: [
      "Agente de IA configurado y operativo 24/7",
      "Base de conocimiento del negocio",
      "Flujos conversacionales diseñados",
      "Integración con WhatsApp, web o CRM",
      "Panel de monitoreo de rendimiento",
    ],
  },
  "Optimización y Automatización de Procesos": {
    problems: [
      "Tareas manuales repetitivas que consumen tiempo",
      "Seguimiento comercial desordenado",
      "Falta de trazabilidad en procesos",
      "Información dispersa entre WhatsApp, Excel, correo y redes",
    ],
    forWhom:
      "Empresas donde los procesos manuales están frenando el crecimiento. Negocios que dependen de tareas repetitivas que consumen tiempo y recursos.",
    deliverables: [
      "Mapa de proceso actual vs. automatizado",
      "Flujo de trabajo inteligente implementado",
      "Integraciones entre herramientas",
      "Reducción de tiempo operativo (medible)",
      "Soporte continuo y optimización iterativa",
    ],
  },
  "Inteligencia Artificial Aplicada": {
    problems: [
      "Uso improvisado de IA sin resultados concretos",
      "Equipos que no saben aprovechar herramientas actuales",
      "Procesos de contenido, análisis o soporte lentos",
      "Falta de estandarización en tareas repetitivas",
    ],
    forWhom:
      "Empresas que quieren entender y aprovechar la IA sin perderse en el ruido tecnológico. Negocios que buscan ventajas competitivas reales.",
    deliverables: [
      "Solución de IA implementada y funcional",
      "Guía de uso y mejores prácticas",
      "Capacitación al equipo",
      "Documentación de casos de uso",
      "Roadmap de evolución tecnológica",
    ],
  },
  "Marketing Digital, Publicidad y Posicionamiento": {
    problems: [
      "Baja visibilidad digital",
      "Redes sociales sin estrategia",
      "Campañas publicitarias sin medición",
      "Pocos prospectos calificados",
      "Falta de embudo de ventas y seguimiento",
    ],
    forWhom:
      "Empresas que están invirtiendo en publicidad sin ver resultados claros. Negocios que quieren pasar de 'estar en redes' a tener un canal de ventas predecible.",
    deliverables: [
      "Estrategia de canales y segmentación",
      "Campañas configuradas y optimizadas",
      "Creatividades y copys profesionales",
      "Panel de rendimiento en tiempo real",
      "Reportes periódicos con recomendaciones",
    ],
  },
  "WhatsApp Business y Automatización": {
    problems: [
      "Mensajes sin responder o con demora",
      "Conversaciones desordenadas sin seguimiento",
      "Prospectos no cualificados que saturan al equipo",
      "Ventas perdidas por atención lenta",
    ],
    forWhom:
      "Negocios con alto volumen de consultas por WhatsApp. Empresas que quieren automatizar su atención sin perder la calidez humana.",
    deliverables: [
      "Perfil de WhatsApp Business optimizado",
      "Catálogo de productos o servicios",
      "Embudo conversacional configurado",
      "Automatización de respuestas y seguimientos",
      "Métricas de conversión y satisfacción",
    ],
  },
};

const SERVICES = [
  {
    icon: Search,
    title: "🔍 Diagnóstico y Estrategia",
    summary:
      "Análisis profundo basado en datos para identificar cuellos de botella, oportunidades de mejora y áreas de fuga en tu operación actual. 100% gratuito.",
  },
  {
    icon: Smartphone,
    title: "Desarrollo de Aplicaciones a la Medida",
    summary:
      "Software personalizado que se adapta al flujo real de tu negocio para optimizar organización, gestión y productividad de tu equipo.",
  },
  {
    icon: Bot,
    title: "Implementación de Agentes de IA",
    summary:
      "Trabajadores virtuales autónomos 24/7 que refuerzan procesos operativos y comerciales sin aumentar tu nómina.",
  },
  {
    icon: Settings2,
    title: "Optimización y Automatización de Procesos",
    summary:
      "Flujos de trabajo inteligentes que conectan tus herramientas, reducen errores humanos y hacen tu operación más rápida y rentable.",
  },
  {
    icon: BrainCircuit,
    title: "Inteligencia Artificial Aplicada",
    summary:
      "IA generativa, análisis predictivo y asistentes virtuales avanzados implementados para resolver problemas concretos de tu negocio.",
  },
  {
    icon: Megaphone,
    title: "Marketing Digital, Publicidad y Posicionamiento",
    summary:
      "Sistemas de adquisición, campañas altamente segmentadas y estrategias de conversión probadas respaldadas por datos.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Business y Automatización",
    summary:
      "Embudos de venta conversacionales que convierten WhatsApp en tu mejor canal de ventas, con automatización inteligente.",
  },
];

function ServiceCard({
  icon: Icon,
  title,
  summary,
}: {
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
  title: string;
  summary: string;
}) {
  const [open, setOpen] = useState(false);
  const detail = SERVICE_DETAILS[title];

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-accent/50 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-accent/10"
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300 transition-colors group-hover:border-accent/50 group-hover:text-accent">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <h3 className="mt-5 text-center text-lg font-bold text-white">
        {title}
      </h3>
      <p className="mt-2 text-center text-sm leading-relaxed text-white/70">
        {summary}
      </p>

      {detail && (
        <div className="mt-4">
          <button
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-center gap-1 text-xs font-semibold uppercase tracking-wider text-cyan-300 transition-colors hover:text-accent"
          >
            {open ? "Ver menos" : "Ver más detalles"}
            {open ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>
          {open && (
            <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Para quién es
                </p>
                <p className="text-xs leading-relaxed text-white/70">
                  {detail.forWhom}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Problemas que resuelve
                </p>
                <ul className="space-y-1">
                  {detail.problems.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-1.5 text-xs text-white/70"
                    >
                      <span className="mt-0.5 text-cyan-300">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Entregables
                </p>
                <ul className="space-y-1">
                  {detail.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-1.5 text-xs text-white/70"
                    >
                      <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-cyan-300" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function Services() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden py-20 text-white md:py-28"
      style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
    >
      <TechBackground density={45} />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeader
          tag="Servicios"
          title="Un ecosistema completo para escalar"
          subtitle="Combinamos ingeniería, IA y marketing digital en una sola maquinaria."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.title} {...svc} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <WhatsAppButton size="lg">
            ¿Cuál necesitas? Hablemos
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

/* ─── Methodology ─── */

const STEPS = [
  {
    icon: Search,
    title: "1. Diagnosticamos",
    body: "Entendemos tu negocio, tus procesos y tus datos antes de proponer cualquier solución. No saltamos a implementar sin entender el problema real.",
  },
  {
    icon: Target,
    title: "2. Diseñamos",
    body: "Construimos la arquitectura de la solución: definimos tecnología, alcance, tiempos y métricas de éxito. Todo queda documentado y validado contigo.",
  },
  {
    icon: Rocket,
    title: "3. Implementamos",
    body: "Ejecutamos con metodología ágil. Entregas parciales, validación constante, sin sorpresas de última hora. Ves el avance en tiempo real.",
  },
  {
    icon: BarChart3,
    title: "4. Optimizamos",
    body: "Medimos resultados, ajustamos, mejoramos. El proyecto no termina con la entrega: termina cuando los resultados están y se sostienen en el tiempo.",
  },
];

function Methodology() {
  return (
    <section
      id="metodologia"
      className="relative overflow-hidden py-20 text-white md:py-28"
      style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
    >
      <TechBackground density={35} />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeader
          tag="Cómo trabajamos"
          title="Método IAmkt"
          subtitle="Un proceso de 4 fases que garantiza resultados medibles."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why IAmkt (Differentiation) ─── */

const DIFFS = [
  {
    title: "Triple expertise",
    body: "Ingeniería aplicada, inteligencia artificial y marketing digital en una sola firma. No tienes que contratar tres proveedores para tener una solución completa.",
  },
  {
    title: "Diagnóstico antes de ejecutar",
    body: "No recomendamos herramientas, campañas o desarrollos sin entender primero el problema. Cada solución nace de un análisis real de tu negocio.",
  },
  {
    title: "Resultados medibles",
    body: "Cada solución tiene indicadores claros, retorno esperado y métricas de mejora. No trabajamos con corazonadas: trabajamos con datos.",
  },
  {
    title: "Acompañamiento continuo",
    body: "Operamos como socios tecnológicos, no como proveedores puntuales. Estamos en el día a día, no solo en la firma del contrato.",
  },
];

function WhyIAmkt() {
  return (
    <section
      id="diferenciacion"
      className="relative overflow-hidden py-20 text-white md:py-28"
      style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
    >
      <TechBackground density={30} />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeader
          tag="Diferenciación"
          title="¿Por qué IAmkt?"
          subtitle="Porque combinamos lo que otras agencias separan."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {DIFFS.map(({ title, body }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-accent/50"
            >
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */

function About() {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden py-20 text-white md:py-28"
      style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
    >
      <TechBackground density={35} />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-5 md:px-8">
        <div className="md:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
            Sobre nosotros
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold leading-tight text-white md:text-4xl">
            Arquitectos tecnológicos al servicio de tu negocio.
          </h2>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
              Liderazgo
            </p>
            <p className="mt-2 text-justify text-lg font-bold text-white">
              Ing. Marlio Dario Damian Torres
            </p>
            <p className="text-justify text-sm text-white/70">
              CEO — Arquitecto Tecnológico Principal
            </p>
            <a
              href="https://www.facebook.com/Ing.Marlio.CEO.IAmkt/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              <Facebook className="h-4 w-4" />
              Conecta en Facebook
            </a>
          </div>
        </div>
        <div className="space-y-5 text-justify text-base leading-relaxed text-white/80 md:col-span-3">
          <p>
            En <strong className="text-white">Agencia IAmkt</strong>, tenemos
            claro que la tecnología y la IA deben estar completamente al
            servicio de tu negocio. Liderados por nuestro CEO, el{" "}
            <strong className="text-white">Ing. Marlio</strong>, hemos dejado
            atrás el marketing tradicional para convertirnos en tus verdaderos{" "}
            <span className="text-accent font-semibold">
              "arquitectos" tecnológicos
            </span>
            .
          </p>
          <p>
            Entendemos que escalar una empresa requiere sistemas precisos y
            eficientes. Por eso, vamos mucho más allá de las herramientas
            convencionales: desarrollamos aplicaciones diseñadas a la medida
            para optimizar tu organización, gestión y productividad. Además,
            somos pioneros en la implementación de{" "}
            <span className="text-accent font-semibold">
              Agentes de Inteligencia Artificial
            </span>{" "}
            de vanguardia que actúan como un brazo operativo incansable.
          </p>
          <p>
            Nuestra filosofía se basa en resolver problemas complejos de forma
            sencilla. Decidimos combinar la ingeniería aplicada con
            Inteligencia Artificial y Marketing Digital para crear soluciones
            estratégicas para empresas que quieren crecer. Construimos la
            maquinaria perfecta —desde la automatización hasta la adquisición
            de clientes— para que tú te enfoques en dirigir y expandir tu
            negocio.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */

const FAQS = [
  {
    q: "¿Cuánto cuesta un diagnóstico?",
    a: "El diagnóstico inicial es gratuito. Incluye una revisión de tu situación actual, identificación de oportunidades y un plan de acción recomendado. Sin compromiso.",
  },
  {
    q: "¿En cuánto tiempo veo resultados?",
    a: "Depende del servicio. Las automatizaciones básicas pueden estar listas en 3-5 días. Una campaña de marketing optimizada empieza a mostrar resultados en las primeras 2 semanas. Los desarrollos a medida tienen plazos que definimos juntos en la fase de diseño.",
  },
  {
    q: "¿Trabajan con empresas pequeñas?",
    a: "Sí. De hecho, la mayoría de nuestros clientes son PyMEs y negocios locales que quieren dar el salto digital. Tenemos soluciones escalables para presupuestos ajustados y planes de crecimiento progresivo.",
  },
  {
    q: "¿Necesito tener presencia digital para empezar?",
    a: "No. Muchos clientes llegan sin sitio web, sin redes estructuradas o sin estrategia digital. Parte de nuestro trabajo es construir desde cero cuando hace falta.",
  },
  {
    q: "¿Ofrecen soporte después de la implementación?",
    a: "Sí. Todos nuestros servicios incluyen soporte post-entrega y opción de acompañamiento continuo (IAmkt Partner) para asegurar que las soluciones sigan funcionando y mejorando con el tiempo.",
  },
  {
    q: "¿Cómo empiezo?",
    a: "Escribenos al WhatsApp. Te hacemos unas preguntas rápidas para entender tu situación y coordinamos un diagnóstico gratuito. Sin formularios largos ni llamadas incómodas.",
  },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-20 text-white md:py-28"
      style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
    >
      <TechBackground density={30} />
      <div className="relative mx-auto max-w-3xl px-4 md:px-8">
        <SectionHeader
          tag="FAQ"
          title="Preguntas frecuentes"
          subtitle="Respuestas rápidas a lo que más nos preguntan."
        />
        <div className="mt-12 space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold text-white transition-colors hover:text-accent"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-accent transition-transform ${
                    openIdx === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIdx === i && (
                <div className="border-t border-white/10 px-6 py-4 text-sm leading-relaxed text-white/70">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm text-white/60">
            ¿Otra pregunta? Escríbenos directo al WhatsApp
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            <MessageCircle className="h-4 w-4" />
            Pregunta por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact / CTA Section ─── */

function ContactSection() {
  return (
    <section
      className="relative overflow-hidden py-20 text-white md:py-24"
      style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
    >
      <TechBackground density={35} />
      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          ¿Listo para construir tu maquinaria de crecimiento?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/80">
          Agenda tu diagnóstico gratuito y descubre exactamente cómo la IA y
          la ingeniería pueden multiplicar tus ventas.
        </p>
        <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <WhatsAppButton size="lg">
            Agenda tu Diagnóstico Gratuito
          </WhatsAppButton>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-accent"
          >
            <Phone className="h-4 w-4" />
            Llama al 322 857 0784
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */

function Footer() {
  return (
    <footer
      className="text-white"
      style={{ backgroundColor: "oklch(0.18 0.08 260)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
        <div>
          <img
            src={logoUrl}
            alt="IAmkt"
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-xs text-justify text-sm text-white/70">
            Ingeniería, IA y Marketing Digital para empresas que quieren crecer.
          </p>
          <p className="mt-2 max-w-xs text-justify text-xs text-white/50">
            Hecho en Colombia 🇨🇴 con ingeniería e inteligencia artificial.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Contacto directo
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-3 rounded-xl bg-accent px-5 py-3 font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp 322 857 0784
          </a>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="mt-3 flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <Phone className="h-4 w-4" /> +57 322 857 0784
          </a>
          <a
            href="mailto:contacto@iamkt.co"
            className="mt-2 flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <Mail className="h-4 w-4" /> contacto@iamkt.co
          </a>
          <a
            href="mailto:ceo.marliodt@iamkt.co"
            className="mt-2 flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <Mail className="h-4 w-4" /> ceo.marliodt@iamkt.co
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Síguenos
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a
              href="https://www.facebook.com/profile.php?id=1294484958"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              <Facebook className="h-4 w-4" /> IAmkt Agencia
            </a>
            <a
              href="https://www.facebook.com/Ing.Marlio.CEO.IAmkt/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              <Facebook className="h-4 w-4" /> Ing. Marlio — CEO
            </a>
          </div>
          <div className="mt-6 flex flex-col gap-2 text-xs text-white/60">
            <span>© {new Date().getFullYear()} Agencia IAmkt</span>
            <span>Todos los derechos reservados</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── WhatsApp Floating Button ─── */

function WhatsAppFloating() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl shadow-accent/40 transition-all hover:-translate-y-1 hover:shadow-accent/60 md:h-16 md:w-16"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2} />
    </a>
  );
}

/* ─── Contact Form ─── */

const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un correo válido"),
  telefono: z.string().min(7, "Ingresa un teléfono válido"),
  servicio: z.string().min(1, "Selecciona un servicio"),
  mensaje: z
    .string()
    .min(10, "Escribe al menos 10 caracteres")
    .max(500, "Máximo 500 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const SERVICIOS = [
  "Diagnóstico y Estrategia",
  "Desarrollo de Aplicaciones",
  "Agentes de IA",
  "Automatización de Procesos",
  "Marketing Digital",
  "WhatsApp Business",
  "No sé exactamente",
];

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Enviar correo vía SMTP Zoho
    const result = await sendContactEmail({ data });
    if (!result.success) {
      console.error("Error al enviar correo:", result.error);
    }

    // Abrir WhatsApp con los datos
    const msg = `Hola IAmkt, quiero información:%0A%0A*Nombre:* ${data.nombre}%0A*Email:* ${data.email}%0A*Teléfono:* ${data.telefono}%0A*Servicio:* ${data.servicio}%0A*Mensaje:* ${data.mensaje}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section
        id="contacto"
        className="relative overflow-hidden py-20 text-white md:py-28"
        style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
      >
        <div className="relative mx-auto max-w-2xl px-4 text-center md:px-8">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-10 backdrop-blur-md">
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400" strokeWidth={1.5} />
            <h3 className="mt-5 text-2xl font-bold text-white">¡Mensaje listo!</h3>
            <p className="mt-3 text-base text-white/70">
              Te redirigimos a WhatsApp con tus datos. Solo confirma y envía.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Ir a WhatsApp
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contacto"
      className="relative overflow-hidden py-20 text-white md:py-28"
      style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
    >
      <TechBackground density={45} />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeader
          tag="Contáctanos"
          title="Cuéntanos sobre tu proyecto"
          subtitle="Déjanos tus datos y te contactaremos en menos de 24 horas para agendar tu diagnóstico gratuito."
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-12 max-w-2xl space-y-5"
          noValidate
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Nombre completo
              </label>
              <input
                {...register("nombre")}
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              {errors.nombre && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.nombre.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Correo electrónico
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Teléfono
              </label>
              <input
                {...register("telefono")}
                placeholder="+57 300 123 4567"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              {errors.telefono && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.telefono.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Servicio de interés
              </label>
              <select
                {...register("servicio")}
                className="w-full rounded-xl border border-white/10 bg-[oklch(0.15_0.06_265)] px-4 py-3 text-white backdrop-blur-sm transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="" className="bg-[oklch(0.15_0.06_265)]">
                  Selecciona una opción
                </option>
                {SERVICIOS.map((s) => (
                  <option
                    key={s}
                    value={s}
                    className="bg-[oklch(0.15_0.06_265)]"
                  >
                    {s}
                  </option>
                ))}
              </select>
              {errors.servicio && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.servicio.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/80">
              Mensaje
            </label>
            <textarea
              {...register("mensaje")}
              rows={4}
              placeholder="Cuéntanos brevemente qué necesitas..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            {errors.mensaje && (
              <p className="mt-1 text-xs text-red-400">
                {errors.mensaje.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-accent px-6 py-3.5 font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-accent/50"
          >
            Enviar mensaje
            <ArrowRight className="ml-2 inline h-4 w-4" />
          </button>

          <p className="text-center text-xs text-white/50">
            Al enviar aceptas que te contactemos vía WhatsApp o correo
            electrónico. No hacemos spam. Tus datos están seguros.
          </p>
        </form>
      </div>
    </section>
  );
}

/* ─── Landing (main) ─── */

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Services />
        <Methodology />
        <WhyIAmkt />
        <About />
        <FAQ />
        <ContactForm />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
