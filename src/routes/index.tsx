import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
  Instagram,
  ArrowRight,
  CheckCircle2,
  Target,
  Rocket,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Mail,
  Send,
  ClipboardList,
  Sparkles,
  Menu,
  X,
  UtensilsCrossed,
  Sprout,
} from "lucide-react";
import logoUrl from "@/assets/logo.png";
import { TechBackground } from "@/components/TechBackground";
import DiagnosticWizard from "@/components/DiagnosticWizard";
import { Header } from "@/components/Header";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

const WHATSAPP_NUMBER = "573228570784";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola IAmkt, quiero agendar mi diagnóstico gratuito.",
)}`;

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
  {
    q: "¿Usan IA generativa en los proyectos o solo herramientas tradicionales?",
    a: "Ambas. La IA generativa es parte central de nuestro stack (agentes autónomos, automatización, análisis), pero la combinamos con herramientas tradicionales cuando son la opción más estable y rentable para el cliente. Priorizamos resultados, no tecnología por moda.",
  },
  {
    q: "¿Qué diferencia a IAmkt de una agencia de marketing tradicional?",
    a: "Somos arquitectos tecnológicos: combinamos ingeniería, inteligencia artificial y marketing digital. No solo creamos campañas, también construimos los sistemas, automatizaciones y agentes de IA que las sostienen. Es una agencia + un equipo de desarrollo en uno.",
  },
  {
    q: "¿Cuánto tarda una implementación de automatización?",
    a: "Las automatizaciones básicas pueden estar listas en 3-5 días. Las integraciones con CRM o sistemas existentes suelen tomar 1-3 semanas, y los desarrollos a medida tienen plazos que definimos juntos en la fase de diseño. Siempre empezamos con una prueba piloto para validar rápido.",
  },
  {
    q: "¿Trabajan con empresas fuera de Colombia?",
    a: "Sí. Atendemos clientes en varios países de Latinoamérica y Estados Unidos. El diagnóstico y la implementación se hacen 100% remotos, y las soluciones se adaptan al mercado y las regulaciones de cada país.",
  },
];

const GEO_SERVICES = [
  {
    name: "IA Aplicada y Agentes Autónomos",
    description: "Programación de agentes de IA autónomos como trabajadores virtuales para empresas: atención, análisis y tareas repetitivas sin supervisión constante.",
  },
  {
    name: "Optimización y Automatización de Procesos",
    description: "Flujos de trabajo, scripts e integración de APIs para reducir errores operativos y liberar horas de trabajo manual.",
  },
  {
    name: "Marketing Digital, Publicidad y Posicionamiento",
    description: "Sistemas de adquisición, estrategias de conversión, copywriting y campañas de ads segmentadas orientadas a resultados medibles.",
  },
  {
    name: "Desarrollo de Aplicaciones a la Medida",
    description: "Módulos de código y aplicaciones para optimizar la organización y productividad de cada empresa.",
  },
  {
    name: "WhatsApp Business y Automatización",
    description: "Webhooks, embudos de venta conversacionales e integración con CRMs para vender y atender desde WhatsApp.",
  },
];

const geoJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://iamkt.co/#org",
      name: "IAmkt",
      alternateName: "IAmkt — Arquitectos Tecnológicos",
      description:
        "Agencia de ingeniería aplicada, inteligencia artificial y marketing digital. Automatización, agentes de IA, desarrollo de software, WhatsApp Business y estrategias de crecimiento para empresas.",
      url: "https://iamkt.co/",
      sameAs: [
        "https://www.facebook.com/iamktco",
        "https://www.instagram.com/iamkt.co",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+57-322-857-0784",
        contactType: "sales",
        availableLanguage: ["es", "en"],
      },
      areaServed: { "@type": "Country", name: "Colombia" },
      knowsAbout: [
        "Inteligencia Artificial aplicada",
        "Agentes autónomos de IA",
        "Automatización de procesos",
        "Marketing digital",
        "Desarrollo de software a la medida",
        "WhatsApp Business",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://iamkt.co/#website",
      url: "https://iamkt.co/",
      name: "IAmkt",
      inLanguage: "es",
      publisher: { "@id": "https://iamkt.co/#org" },
    },
    {
      "@type": "WebPage",
      "@id": "https://iamkt.co/#webpage",
      url: "https://iamkt.co/",
      name: "IAmkt — Arquitectos Tecnológicos para Empresas que Quieren Crecer",
      description:
        "Agencia de ingeniería aplicada, inteligencia artificial y marketing digital. Automatización, agentes de IA, desarrollo de software y estrategias de crecimiento para empresas.",
      isPartOf: { "@id": "https://iamkt.co/#website" },
      about: { "@id": "https://iamkt.co/#org" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://iamkt.co/#faq",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    ...GEO_SERVICES.map((s) => ({
      "@type": "Service",
      name: s.name,
      description: s.description,
      provider: { "@id": "https://iamkt.co/#org" },
      areaServed: { "@type": "Country", name: "Colombia" },
    })),
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IAmkt Colombia — Arquitectos Tecnológicos para Empresas que Quieren Crecer" },
      {
        name: "description",
        content:
          "Agencia colombiana de ingeniería aplicada, inteligencia artificial y marketing digital. Automatización, agentes de IA, desarrollo de software y estrategias de crecimiento para empresas.",
      },
      { property: "og:title", content: "IAmkt Colombia — Ingeniería, IA y Marketing Digital" },
      {
        property: "og:description",
        content:
          "Transformamos negocios en Colombia combinando ingeniería, inteligencia artificial y marketing digital. Soluciones estratégicas con resultados medibles.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://iamkt.co/" },
    ],
    links: [{ rel: "canonical", href: "https://iamkt.co/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(geoJsonLd),
      },
    ],
  }),
  component: Landing,
});

/* ─── Shared Components ─── */

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

/* ─── Hero ─── */

function Hero({ onOpenWizard }: { onOpenWizard: () => void }) {
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
            Somos una empresa de <strong className="text-white">transformación digital en Colombia</strong>:
            usamos ingeniería, inteligencia artificial y automatización para resolver problemas
            comerciales y operativos. Diseñamos, implementamos y optimizamos sistemas para que tu
            empresa venda más, atienda mejor y opere con mayor eficiencia.
          </p>
          <p className="mt-4 text-center text-base font-semibold text-emerald-300">
            ⚡ Empieza hoy con un <span className="text-white">diagnóstico gratuito</span> — sin compromiso, sin costo.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenWizard}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-accent/50 md:text-lg"
            >
              <ClipboardList className="h-5 w-5" strokeWidth={2.2} />
              Diagnóstico Gratuito — Empieza Aquí
              <Sparkles className="h-4 w-4 text-accent-foreground/70 transition-transform group-hover:rotate-12" strokeWidth={1.8} />
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/30"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              O escribe por WhatsApp
            </a>
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
    body: "Todo nuestro ecosistema de ingeniería e inteligencia artificial tiene un único objetivo final: hacer crecer tu facturación. Diseñamos sistemas que convierten tu presencia digital en un canal estable de prospectos calificados, con procesos medibles y resultados verificables.",
  },
];

function Benefits({ onOpenWizard }: { onOpenWizard: () => void }) {
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

        {/* Metodología visual 01-04 */}
        <div className="mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Nuestro método
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, num, title, tagline }) => (
              <div
                key={title}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur-md transition-colors hover:border-accent/40"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-3xl font-extrabold text-white/10">{num}</span>
                </div>
                <p className="mt-3 text-sm font-bold text-white">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/65">{tagline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Perfil CEO + CTA */}
        <div className="mt-14 flex flex-col items-center gap-8">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
              Liderazgo
            </p>
            <p className="mt-2 text-lg font-bold text-white">
              Ing. Marlio Dario Damian Torres
            </p>
            <p className="text-sm text-white/70">
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
          <button
            onClick={onOpenWizard}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-accent/50"
          >
            <ClipboardList className="h-5 w-5" strokeWidth={2} />
            Diagnóstico Gratuito — Empieza Aquí
          </button>
        </div>

        {/* Tecnologías y sectores */}
        <div className="mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Tecnología y experiencia
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {TECHS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-8 text-center text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Sectores que atendemos
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {SECTORS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80"
              >
                {s}
              </span>
            ))}
          </div>
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
      "Empresas que están invirtiendo en publicidad sin ver resultados claros. Negocios que quieren pasar de 'estar en redes' a tener un canal de ventas organizado y medible.",
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

function Services({ onOpenWizard }: { onOpenWizard: () => void }) {
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
          <button
            onClick={onOpenWizard}
            className="group inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-accent/50"
          >
            <ClipboardList className="h-5 w-5" strokeWidth={2} />
            ¿Cuál necesitas? Diagnóstico Gratis aquí
          </button>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    icon: Search,
    num: "01",
    title: "Diagnóstico",
    tagline: "Encontramos dónde pierdes dinero, tiempo o clientes.",
    body: "Entendemos tu negocio, tus procesos y tus datos antes de proponer cualquier solución. No saltamos a implementar sin entender el problema real.",
  },
  {
    icon: Target,
    num: "02",
    title: "Diseño",
    tagline: "Diseñamos la solución tecnológica a tu medida.",
    body: "Construimos la arquitectura de la solución: definimos tecnología, alcance, tiempos y métricas de éxito. Todo queda documentado y validado contigo.",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Implementación",
    tagline: "Construimos e integramos las herramientas.",
    body: "Ejecutamos con metodología ágil. Entregas parciales, validación constante, sin sorpresas de última hora. Ves el avance en tiempo real.",
  },
  {
    icon: BarChart3,
    num: "04",
    title: "Optimización",
    tagline: "Medimos resultados y mejoramos continuamente.",
    body: "Medimos resultados, ajustamos, mejoramos. El proyecto no termina con la entrega: termina cuando los resultados están y se sostienen en el tiempo.",
  },
];

const TECHS = [
  "React + TypeScript",
  "Node.js",
  "Supabase / PostgreSQL",
  "APIs REST",
  "WhatsApp Business",
  "Agentes de IA (LLMs)",
  "Automatización de procesos",
  "Cloudflare",
  "PWA",
];

const SECTORS = [
  "Restaurantes y gastronomía",
  "Agroinsumos y agroindustria",
  "Comercio y distribución",
  "PyMEs de servicios",
];

/* ─── CASOS DE ÉXITO ─── */

const CASOS = [
  {
    icon: UtensilsCrossed,
    title: "Monarca Gastro Bar",
    sector: "Restaurante · Menú QR y gestión",
    body: "Pedidos directos del cliente a cocina, alertas al mesero, caja y reportes automáticos. Cero comandas en papel.",
    metric: "150–175 h/mes · $2.5–6M/mes",
  },
  {
    icon: Sprout,
    title: "Dasagro 360",
    sector: "Agroinsumos · CRM con 5 almacenes",
    body: "Pedidos por WhatsApp ordenados en un flujo de factura, inventario y contabilidad. Atención en minutos, cero pedidos perdidos.",
    metric: "250–275 h/mes · $3.5–6M/mes",
  },
];

function CasosExito() {
  return (
    <section
      id="casos"
      className="relative overflow-hidden py-20 text-white md:py-28"
      style={{ backgroundColor: "oklch(0.13 0.06 265)" }}
    >
      <TechBackground density={35} />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeader
          tag="Casos de éxito"
          title="Resultados que ya están en producción"
          subtitle="Dos implementaciones reales con estimaciones de ahorro basadas en promedios del sector."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {CASOS.map(({ icon: Icon, title, sector, body, metric }) => (
            <Link
              key={title}
              to="/casos-de-exito"
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-accent/50 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-accent/10 md:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="text-xs text-white/60">{sector}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{body}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-base font-extrabold text-accent">
                {metric}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/casos-de-exito"
            className="group inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-accent/50"
          >
            Ver casos de éxito completos <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */

function FAQ({ onOpenWizard }: { onOpenWizard: () => void }) {
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
        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-sm text-white/60">
            ¿Otra pregunta? Descubre exactamente qué necesita tu empresa
          </p>
          <button
            onClick={onOpenWizard}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-accent/50"
          >
            <ClipboardList className="h-4 w-4" strokeWidth={2} />
            Diagnóstico Gratuito — Empieza Aquí
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact / CTA Section ─── */

function ContactSection({ onOpenWizard }: { onOpenWizard: () => void }) {
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
          Completa nuestro diagnóstico gratuito y descubre cómo la IA y la ingeniería pueden
          aumentar tus ventas, reducir tiempos operativos y darte control sobre tu negocio.
        </p>
        <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <button
            onClick={onOpenWizard}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-accent/50 md:text-lg"
          >
            <ClipboardList className="h-5 w-5" strokeWidth={2.2} />
            Iniciar Diagnóstico Gratuito
          </button>
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
              href="https://www.facebook.com/iamktco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              <Facebook className="h-4 w-4" /> IAmkt Agencia
            </a>
            <a
              href="https://www.instagram.com/iamkt.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              <Instagram className="h-4 w-4" /> Instagram @iamkt.co
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
            <div className="mt-1 flex gap-4">
              <Link to="/casos-de-exito" className="transition-colors hover:text-white">
                Casos de éxito
              </Link>
              <Link to="/privacidad" className="transition-colors hover:text-white">
                Privacidad
              </Link>
              <Link to="/terminos" className="transition-colors hover:text-white">
                Términos
              </Link>
            </div>
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



/* ─── Landing (main) ─── */

function Landing() {
  const [wizardOpen, setWizardOpen] = useState(false);

  // Auto-open wizard when URL has ?diagnostico=1 (para Facebook CTA)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("diagnostico") === "1") {
      setWizardOpen(true);
      // Clean param from URL without reloading
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, "", cleanUrl);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenWizard={() => setWizardOpen(true)} />
      <main>
        <Hero onOpenWizard={() => setWizardOpen(true)} />
        <Benefits onOpenWizard={() => setWizardOpen(true)} />
        <Services onOpenWizard={() => setWizardOpen(true)} />
        <CasosExito />
        <FAQ onOpenWizard={() => setWizardOpen(true)} />
        <ContactSection onOpenWizard={() => setWizardOpen(true)} />
      </main>
      <Footer />
      <WhatsAppFloating />

      <DiagnosticWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />
    </div>
  );
}
