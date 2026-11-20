import { SiteFooter } from "@/components/SiteFooter";
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
    name: "Automatización Comercial y WhatsApp con IA",
    description: "Agentes de IA 24/7 y embudos conversacionales que atienden clientes, cotizan y toman pedidos por WhatsApp, sin perder conversaciones ni aumentar la nómina.",
  },
  {
    name: "Software y Sistemas Operativos a la Medida",
    description: "Aplicaciones web, cartas digitales y CRMs diseñados para el flujo real de la operación: pedidos, inventarios, caja, facturación y reportes en tiempo real.",
  },
  {
    name: "Sistemas de Adquisición y Pauta Digital",
    description: "Campañas segmentadas y posicionamiento digital conectados al WhatsApp o CRM del negocio para medir prospectos calificados y retorno real de inversión.",
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
      name: "IAmkt Colombia | Automatización de WhatsApp, Agentes de IA y Software a la Medida",
      description:
        "Arquitectos tecnológicos en Colombia. Creadores de ComandaTec. Automatizamos WhatsApp con agentes de IA y desarrollamos software a la medida para distribuidoras, restaurantes y PyMEs.",
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
      { title: "IAmkt Colombia | Automatización de WhatsApp, Agentes de IA y Software a la Medida" },
      {
        name: "description",
        content:
          "Arquitectos tecnológicos en Colombia. Creadores de ComandaTec. Automatizamos WhatsApp con agentes de IA y desarrollamos software a la medida para distribuidoras, restaurantes y PyMEs.",
      },
      { property: "og:title", content: "IAmkt Colombia | Automatización de WhatsApp, Agentes de IA y Software a la Medida" },
      {
        property: "og:description",
        content:
          "Arquitectos tecnológicos en Colombia. Creadores de ComandaTec. Automatizamos WhatsApp con agentes de IA y desarrollamos software a la medida para distribuidoras, restaurantes y PyMEs.",
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
          <p className="mt-4 max-w-2xl text-center text-base leading-relaxed text-cyan-100/90">
            Ayudamos a comercios, almacenes, restaurantes, tiendas, distribuidores, agroempresas y
            PyMEs que reciben pedidos por WhatsApp y aún operan en manual.
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
              Agendar Diagnóstico Gratuito
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
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Sistemas en producción: ComandaTec (SaaS para restaurantes), Dasagro 360
              (CRM con 5 almacenes) y agentes de IA para atención y ventas.
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
            Agendar Diagnóstico Gratuito
          </button>
        </div>

        {/* Tecnologías y sectores */}
        <div className="mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Tecnología y experiencia
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/65">
            Infraestructura empresarial rápida, segura en la nube y accesible desde
            cualquier celular, sin instalaciones complejas.
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
  "Automatización Comercial y WhatsApp con IA": {
    problems: [
      "Pedidos y consultas que se pierden fuera de horario",
      "El equipo responde lo mismo cien veces al día",
      "Cotizaciones que tardan horas o días",
      "Todo depende de una persona para atender WhatsApp",
    ],
    forWhom:
      "Comercios, restaurantes y distribuidores que reciben pedidos por WhatsApp y todavía atienden de forma manual.",
    deliverables: [
      "Agente de IA entrenado con tu catálogo y precios",
      "Flujo de pedidos y cotizaciones por WhatsApp",
      "Integración con tu CRM o sistema de pedidos",
      "Panel de conversaciones y métricas",
      "Traspaso a persona cuando haga falta",
    ],
  },
  "Software y Sistemas Operativos a la Medida": {
    problems: [
      "Excel y WhatsApp funcionando como sistema de gestión",
      "Inventarios y caja que no cuadran",
      "Software genérico que no se adapta a tu operación",
      "Sin reportes en tiempo real para decidir",
    ],
    forWhom:
      "Empresas que ya superaron las herramientas genéricas y necesitan un sistema propio que siga su flujo real de trabajo.",
    deliverables: [
      "Aplicación web o PWA a la medida",
      "Módulos de pedidos, inventario, caja o facturación",
      "Panel administrativo con reportes en tiempo real",
      "Control de roles y permisos",
      "Despliegue en la nube y capacitación del equipo",
    ],
  },
  "Sistemas de Adquisición y Pauta Digital": {
    problems: [
      "Inviertes en pauta sin saber qué retorna",
      "Llegan prospectos y nadie los atiende a tiempo",
      "La marca es invisible frente a la competencia",
      "No hay medición de leads calificados",
    ],
    forWhom:
      "Negocios que quieren captar demanda de forma medible y conectarla directamente con su canal de venta.",
    deliverables: [
      "Estrategia y segmentación de campañas",
      "Landing y creatividades orientadas a conversión",
      "Conexión de la pauta a WhatsApp o CRM",
      "Medición de prospectos calificados y costo por lead",
      "Reporte de retorno y optimización continua",
    ],
  },
};

const SERVICES = [
  {
    icon: Search,
    title: "Diagnóstico y Estrategia",
    summary:
      "Análisis profundo basado en datos para identificar cuellos de botella, oportunidades de mejora y áreas de fuga en tu operación actual. 100% gratuito.",
  },
  {
    icon: Bot,
    title: "Automatización Comercial y WhatsApp con IA",
    summary:
      "Agentes de IA 24/7 y embudos conversacionales que atienden clientes, cotizan y toman pedidos por WhatsApp en segundos, sin perder conversaciones ni aumentar tu nómina.",
  },
  {
    icon: Smartphone,
    title: "Software y Sistemas Operativos a la Medida",
    summary:
      "Aplicaciones web, cartas digitales y CRMs diseñados para el flujo real de tu operación: pedidos, inventarios, caja, facturación y reportes en tiempo real.",
  },
  {
    icon: Megaphone,
    title: "Sistemas de Adquisición y Pauta Digital",
    summary:
      "Campañas segmentadas y posicionamiento digital conectados a tu WhatsApp o CRM para medir prospectos calificados y retorno real de inversión.",
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
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
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
    title: "Monarca Gastro Bar",
    sector: "Restaurante · Menú QR y gestión",
    body: "Pedidos directos del cliente a cocina, alertas al mesero, caja y reportes automáticos. Cero comandas en papel.",
    metric: "150–175 h/mes · $2.5–6M/mes",
    logo: "/casos/monarca-logo.png",
    logoBg: "#F8EBCB",
    hash: "monarca",
    urlLabel: "Ver el caso de Monarca Gastro Bar",
  },
  {
    title: "Dasagro 360",
    sector: "Agroinsumos · CRM con 5 almacenes",
    body: "Pedidos por WhatsApp ordenados en un flujo de factura, inventario y contabilidad. Atención en minutos, cero pedidos perdidos.",
    metric: "250–275 h/mes · $3.5–6M/mes",
    logo: "/casos/dasagro-logo.png",
    logoBg: "#ffffff",
    hash: "dasagro",
    urlLabel: "Ver el caso de Dasagro 360",
  },
  {
    title: "Royal Bite",
    sector: "Comidas rápidas · Carta digital y domicilios",
    body: "Carta digital interactiva con pedidos directos a WhatsApp, reservas y pagos digitales. Pensada para vender sin intermediarios.",
    metric: "",
    soon: true,
    logo: "/casos/royal-bite-logo.png",
    logoBg: "#ffffff",
    hash: "royal-bite",
    urlLabel: "Ver el caso de Royal Bite",
  },
];

/* ─── Producto propio: ComandaTec ─── */

function ProductoSaaS() {
  const bullets = [
    "Carta QR por mesa y pedidos directos a cocina",
    "Pantalla de cocina (KDS) y control de meseros",
    "Caja, inventario con recetas y domicilios",
  ];
  return (
    <section id="comandatec" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/[0.07] via-transparent to-transparent p-8 md:p-12">
          <a
            href="https://comandatec.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ComandaTec — sitio oficial"
            title="ComandaTec — sitio oficial"
            className="mb-5 inline-block transition-opacity hover:opacity-80"
          >
            <img
              src="/brand/comandatec-logo.svg"
              alt="ComandaTec"
              className="h-12 w-auto md:h-14"
            />
          </a>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Producto propio · En producción
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold text-foreground md:text-4xl">
            ComandaTec — Sistema de gestión en tiempo real para restaurantes y gastrobares
          </h2>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">
            Nuestra plataforma SaaS para digitalizar el servicio completo: carta QR por
            mesa, pantalla de cocina (KDS), control de meseros, caja, inventario con
            recetas y domicilios. Sin instalaciones y con 10 días de prueba gratis.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://comandatec.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-accent/50"
            >
              Conocer ComandaTec
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://demo.comandatec.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Ver demo en vivo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

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
          subtitle="Dos implementaciones en producción y un lanzamiento en camino. Estimaciones basadas en promedios del sector."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CASOS.map(({ title, sector, body, metric, soon, logo, logoBg, hash, urlLabel }) => (
            <div
              key={title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-accent/50 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-accent/10 md:p-8"
            >
              <div className="flex items-center gap-3">
                <Link
                  to="/casos-de-exito"
                  hash={hash}
                  aria-label={urlLabel}
                  title={urlLabel}
                  className="flex h-14 w-24 shrink-0 items-center justify-center rounded-xl border border-white/10 p-2 transition-opacity hover:opacity-80"
                  style={{ backgroundColor: logoBg }}
                >
                  <img
                    src={logo}
                    alt={title}
                    className="max-h-9 w-auto object-contain"
                  />
                </Link>
                <div>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="text-xs text-white/60">{sector}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{body}</p>
              {soon ? (
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  En despliegue · Próximamente
                </span>
              ) : (
                <p className="mt-4 inline-flex items-center gap-2 text-base font-extrabold text-accent">
                  {metric}
                </p>
              )}
              <Link
                to="/casos-de-exito"
                hash={hash}
                className="mt-3 flex w-fit items-center gap-1.5 text-sm font-semibold text-cyan-300 transition-colors hover:text-accent"
              >
                Ver caso completo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
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
            Agendar Diagnóstico Gratuito
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
            Agendar Diagnóstico Gratuito
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
        <ProductoSaaS />
        <CasosExito />
        <FAQ onOpenWizard={() => setWizardOpen(true)} />
        <ContactSection onOpenWizard={() => setWizardOpen(true)} />
      </main>
      <SiteFooter />
      <WhatsAppFloating />

      <DiagnosticWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />
    </div>
  );
}
