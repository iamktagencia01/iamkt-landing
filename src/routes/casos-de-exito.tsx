import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Clock,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";

export const Route = createFileRoute("/casos-de-exito")({
  head: () => ({
    meta: [
      { title: "Casos de Éxito — IAmkt" },
      {
        name: "description",
        content:
          "Casos reales de IAmkt: sistema de pedidos para restaurantes y CRM para agroinsumos. Flujo de trabajo, automatización, seguridad y estimaciones de ahorro en horas y dinero.",
      },
      { property: "og:title", content: "Casos de Éxito — IAmkt" },
      { property: "og:url", content: "https://iamkt.co/casos-de-exito" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://iamkt.co/casos-de-exito" }],
  }),
  component: CasosPage,
});

const DISCLAIMER =
  "Las cifras de ahorro son estimaciones de implementación basadas en promedios del sector para empresas de tamaño similar. Pueden fluctuar según el volumen, la operación y el contexto de cada negocio.";

function VideoCard({
  src,
  poster,
  title,
  caption,
}: {
  src: string;
  poster: string;
  title: string;
  caption: string;
}) {
  return (
    <figure className="mx-auto w-full max-w-[280px]">
      <video
        controls
        preload="metadata"
        poster={poster}
        playsInline
        className="aspect-[9/16] w-full rounded-2xl border border-border/60 bg-black object-cover shadow-lg"
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>
      <figcaption className="mt-3 text-center text-sm font-semibold text-foreground">
        {title}
        <span className="mt-1 block text-xs font-normal text-muted-foreground">{caption}</span>
      </figcaption>
    </figure>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-foreground/90">
      {children}
    </span>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
      <div className="text-accent">{icon}</div>
      <div className="mt-2 text-xl font-extrabold text-foreground md:text-2xl">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-foreground md:text-2xl">{children}</h2>
  );
}

function CasosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header ctaHref="/?diagnostico=1" />

      <main className="mx-auto max-w-5xl px-4 py-14 md:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">
          Casos de éxito
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/85">
          Dos implementaciones reales de IAmkt: un sistema de pedidos y gestión para un
          restaurante, y un CRM completo para una distribuidora de insumos agropecuarios con
          5 almacenes. Así se ve la tecnología aplicada a la operación del día a día.
        </p>

        <div className="mt-4 rounded-xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-700 dark:text-amber-300">
          <strong>Transparencia:</strong> {DISCLAIMER}
        </div>

        {/* ═══════════ CASO 1: MONARCA ═══════════ */}
        <section className="mt-14">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/monarcagastrobar_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Monarca Gastro Bar"
                title="Instagram de Monarca Gastro Bar"
                className="flex h-16 w-28 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-[#F8EBCB] p-2 shadow-sm transition-opacity hover:opacity-80"
              >
                <img
                  src="/casos/monarca-logo.png"
                  alt="Monarca Gastro Bar"
                  className="max-h-12 w-auto object-contain"
                />
              </a>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-accent">
                  Caso 1 · Restaurante
                </p>
                <SectionTitle>Monarca Gastro Bar — menú QR y gestión completa</SectionTitle>
              </div>
            </div>
            <Chip>
              <BadgeCheck className="h-3.5 w-3.5" /> Implementado y aprobado por el cliente
            </Chip>
          </div>

          <div className="mt-6 grid gap-8 md:grid-cols-[280px_1fr]">
            <VideoCard
              src="/videos/monarca-restaurante.mp4"
              poster="/videos/monarca-poster.jpg"
              title="¿Tu restaurante sigue en papel?"
              caption="Explicación rápida de la solución (25 seg)"
            />

            <div className="space-y-6">
              <div>
                <SectionTitle>El problema inicial</SectionTitle>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  Comandas en papel, meseros haciendo viajes extra a cocina para confirmar
                  disponibilidad, cuadres de caja manuales al cierre, reportes del gerente
                  armados a mano y un menú del día difícil de comunicar al cliente. Cada
                  error de anotación se traducía en reprocesos y platos devueltos.
                </p>
              </div>

              <div>
                <SectionTitle>La solución implementada</SectionTitle>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  El cliente escanea el QR de la mesa y ve la carta digital con fotos y el
                  menú del día, que cambia a diario desde el panel del administrador. El
                  pedido llega directo a la pantalla de cocina (KDS) con temporizadores, el
                  mesero recibe alertas sonoras cuando hay un pedido nuevo o un plato listo,
                  cobra con efectivo o tarjeta, y el gerente consulta reportes automáticos de
                  ventas por producto, categoría, mesero y método de pago, con exportación a
                  Excel.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  <strong>Antes:</strong> comandas en papel, viajes del mesero a cocina,
                  cuadres manuales de caja y reportes armados a mano. <strong>Ahora:</strong>{" "}
                  cero papel en el ciclo pedido → cocina → cobro → reporte.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-red-400/30 bg-red-400/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-red-400">Antes</p>
                  <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-foreground/80">
                    <li>• Comanda a mano: 8-12 min por mesa</li>
                    <li>• 5-8% de pedidos con errores</li>
                    <li>• Cuadre de caja manual al cierre</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Después</p>
                  <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-foreground/80">
                    <li>• Pedido digital: 2-4 min a cocina</li>
                    <li>• Errores por debajo del 1%</li>
                    <li>• Caja y reportes automáticos</li>
                  </ul>
                </div>
              </div>

              <div>
                <SectionTitle>Automatización, seguridad y tecnología</SectionTitle>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip>
                    <Workflow className="h-3.5 w-3.5" /> Flujo pedido → cocina → cobro → reportes
                  </Chip>
                  <Chip>
                    <Sparkles className="h-3.5 w-3.5" /> Menú del día en tiempo real (SSE)
                  </Chip>
                  <Chip>
                    <Clock className="h-3.5 w-3.5" /> Alertas sonoras al mesero y timers de cocina
                  </Chip>
                  <Chip>
                    <ShieldCheck className="h-3.5 w-3.5" /> JWT con expiración, contraseñas con scrypt, PIN para meseros
                  </Chip>
                  <Chip>
                    <ShieldCheck className="h-3.5 w-3.5" /> Rate limiting y roles separados (admin/gerente/mesero/cocina)
                  </Chip>
                  <Chip>
                    <BadgeCheck className="h-3.5 w-3.5" /> PWA instalable + API multi-tenant
                  </Chip>
                </div>
              </div>

              <div>
                <SectionTitle>Tiempo de implementación</SectionTitle>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  ~3 semanas por fases (jul-ago 2026): carta QR, app de mesero y cocina,
                  panel admin con caja y arqueo, módulo gerente con reportes, y seguridad.
                </p>
              </div>

              <div>
                <SectionTitle>Ahorro estimado de implementación</SectionTitle>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <StatCard
                    icon={<Clock className="h-5 w-5" />}
                    value="150–175 h/mes"
                    label="Horas de operación ahorradas (toma de pedidos, viajes a cocina, cuadres y reportes)"
                  />
                  <StatCard
                    icon={<TrendingUp className="h-5 w-5" />}
                    value="$2.5–6M COP/mes"
                    label="Entre mano de obra evitada, errores de comanda reducidos y ventas adicionales potenciales"
                  />
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/85">
                  <li>
                    • <strong>Mano de obra:</strong> ~150-175 horas mensuales liberadas, entre
                    $1.8M y $2.1M COP/mes según costos del sector.
                  </li>
                  <li>
                    • <strong>Errores de comanda:</strong> de 5-8% de pedidos con fallas a
                    menos del 1%, evitando reprocesos por $0.8-1.5M COP/mes.
                  </li>
                  <li>
                    • <strong>Ticket medio:</strong> la carta digital con fotos y el menú del
                    día tienen potencial de aumentar el ticket medio entre 5% y 10%. Es un
                    beneficio potencial que puede mejorar con la implementación a largo plazo,
                    no una cifra garantizada.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ CASO 2: DASAGRO ═══════════ */}
        <section className="mt-16">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <a
                href="https://www.dasagrobiotecnologias.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sitio web de DasAgro Biotecnologías"
                title="Sitio web de DasAgro Biotecnologías"
                className="flex h-16 w-28 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-white p-2 shadow-sm transition-opacity hover:opacity-80"
              >
                <img
                  src="/casos/dasagro-logo.png"
                  alt="DasAgro Biotecnologías"
                  className="max-h-12 w-auto object-contain"
                />
              </a>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-accent">
                  Caso 2 · Agroinsumos
                </p>
                <SectionTitle>Dasagro 360 — CRM para 5 almacenes</SectionTitle>
              </div>
            </div>
            <Chip>
              <BadgeCheck className="h-3.5 w-3.5" /> Implementado con 5 almacenes y roles por perfil
            </Chip>
          </div>

          <div className="mt-6 grid gap-8 md:grid-cols-[280px_1fr]">
            <VideoCard
              src="/videos/dasagro-ventas.mp4"
              poster="/videos/dasagro-poster.jpg"
              title="¿Sigues anotando pedidos en papel?"
              caption="Explicación rápida de la solución (34 seg)"
            />

            <div className="space-y-6">
              <div>
                <SectionTitle>El problema inicial</SectionTitle>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  Pedidos que llegaban por WhatsApp y se transcribían a mano, precios buscados
                  en listas físicas, cada uno de los 5 almacenes manejando su propia
                  información, seguimiento de entregas y pagos sin trazabilidad, y un gerente
                  sin visión consolidada de la operación.
                </p>
              </div>

              <div>
                <SectionTitle>La solución implementada</SectionTitle>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  El asesor abre el cliente en segundos (miles de clientes centralizados),
                  arma la orden con precios automáticos por presentación y descuentos, y la
                  orden fluye por un timeline de 7 estados: solicitud → factura proforma →
                  remisión → guía de envío → seguimiento → entrega o devolución. Al crear la
                  guía, el inventario se descuenta solo; las devoluciones generan notas
                  crédito automáticas; y el sistema alerta cuando un seguimiento vence, para
                  que ningún cliente quede sin atención.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  <strong>Antes:</strong> pedidos por WhatsApp transcritos a mano, precios
                  buscados en listas, cada almacén con su propia información y el gerente sin
                  visión consolidada. <strong>Ahora:</strong> la operación entera queda
                  ordenada, trazable y visible en un solo lugar.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-red-400/30 bg-red-400/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-red-400">Antes</p>
                  <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-foreground/80">
                    <li>• 20-35 min por orden a mano</li>
                    <li>• Precios buscados en listas físicas</li>
                    <li>• Seguimiento sin trazabilidad</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Después</p>
                  <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-foreground/80">
                    <li>• Orden en 6-10 min con precios automáticos</li>
                    <li>• Timeline de 7 estados trazable</li>
                    <li>• Inventario y facturación automáticos</li>
                  </ul>
                </div>
              </div>

              <div>
                <SectionTitle>Automatización, seguridad y tecnología</SectionTitle>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip>
                    <Workflow className="h-3.5 w-3.5" /> Orden → factura → inventario → nota crédito → contabilidad
                  </Chip>
                  <Chip>
                    <Sparkles className="h-3.5 w-3.5" /> Descuento de inventario automático al despachar
                  </Chip>
                  <Chip>
                    <Clock className="h-3.5 w-3.5" /> Alertas de seguimientos vencidos + timeline de 7 estados
                  </Chip>
                  <Chip>
                    <ShieldCheck className="h-3.5 w-3.5" /> 68 políticas de seguridad por rol (RLS)
                  </Chip>
                  <Chip>
                    <ShieldCheck className="h-3.5 w-3.5" /> Precios editables solo por gerente + backup diario
                  </Chip>
                  <Chip>
                    <BadgeCheck className="h-3.5 w-3.5" /> React + Supabase (PostgreSQL + Auth)
                  </Chip>
                </div>
              </div>

              <div>
                <SectionTitle>Tiempo de implementación</SectionTitle>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  ~1 semana para las 5 fases (jul 2026): base de datos con roles, órdenes y
                  cualificación, facturación y logística, seguimiento de venta, dashboards y
                  refuerzos posteriores.
                </p>
              </div>

              <div>
                <SectionTitle>Ahorro estimado de implementación</SectionTitle>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <StatCard
                    icon={<Clock className="h-5 w-5" />}
                    value="250–275 h/mes"
                    label="Horas ahorradas en procesar órdenes, seguimiento y reportes (con ~880 órdenes/mes)"
                  />
                  <StatCard
                    icon={<TrendingUp className="h-5 w-5" />}
                    value="$3.5–6M COP/mes"
                    label="Entre mano de obra evitada y errores de facturación/despacho reducidos"
                  />
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/85">
                  <li>
                    • <strong>Mano de obra:</strong> ~15 minutos ahorrados por orden × ~880
                    órdenes al mes, entre $2.5M y $2.8M COP/mes según costos del sector.
                  </li>
                  <li>
                    • <strong>Errores:</strong> precios mal, producto o almacén equivocado, de
                    3-5% de las órdenes a menos del 1%, evitando devoluciones, logística y
                    reclamos por $1-3M COP/mes.
                  </li>
                  <li>
                    • <strong>Atención al cliente:</strong> respuesta de horas a minutos,
                    ningún pedido se pierde en WhatsApp y todo queda trazable en el timeline.
                  </li>
                  <li>
                    • <strong>Organización empresarial:</strong> el gerente ve ventas por
                    almacén, por mes y por estado; contabilidad con ventas netas reales
                    (facturas − notas crédito) y cartera con menos mora gracias a las alertas.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ COMPARATIVA ═══════════ */}
        <section className="mt-16">
          <SectionTitle>Resumen comparativo</SectionTitle>

          {/* Versión móvil: tarjetas apiladas */}
          <div className="mt-4 space-y-3 md:hidden">
            <div className="rounded-xl border border-border/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-accent">Monarca · Restaurante</p>
              <dl className="mt-2 space-y-2 text-sm">
                <div><dt className="font-semibold text-foreground">Solución</dt><dd className="text-foreground/85">Menú QR + Restaurant Pro (PWA, cocina KDS, gerente)</dd></div>
                <div><dt className="font-semibold text-foreground">Ahorro en horas</dt><dd className="text-foreground/85">150–175 h/mes</dd></div>
                <div><dt className="font-semibold text-foreground">Ahorro estimado</dt><dd className="text-foreground/85">$2.5–6M COP/mes</dd></div>
                <div><dt className="font-semibold text-foreground">Beneficio clave</dt><dd className="text-foreground/85">Cero comandas en papel, caja y reportes automáticos</dd></div>
              </dl>
            </div>
            <div className="rounded-xl border border-border/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-accent">Dasagro · Agroinsumos</p>
              <dl className="mt-2 space-y-2 text-sm">
                <div><dt className="font-semibold text-foreground">Solución</dt><dd className="text-foreground/85">Dasagro 360 — CRM a medida (orden, factura, inventario, contabilidad)</dd></div>
                <div><dt className="font-semibold text-foreground">Ahorro en horas</dt><dd className="text-foreground/85">250–275 h/mes</dd></div>
                <div><dt className="font-semibold text-foreground">Ahorro estimado</dt><dd className="text-foreground/85">$3.5–6M COP/mes</dd></div>
                <div><dt className="font-semibold text-foreground">Beneficio clave</dt><dd className="text-foreground/85">Atención en minutos, cero pedidos perdidos, cartera controlada</dd></div>
              </dl>
            </div>
          </div>

          {/* Versión desktop: tabla */}
          <div className="mt-4 hidden overflow-x-auto rounded-xl border border-border/60 md:block">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Métrica</th>
                  <th className="px-4 py-3 font-semibold">Monarca (restaurante)</th>
                  <th className="px-4 py-3 font-semibold">Dasagro (agroinsumos)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-foreground/85">
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">Solución</td>
                  <td className="px-4 py-3">Menú QR + Restaurant Pro (PWA, cocina KDS, gerente)</td>
                  <td className="px-4 py-3">Dasagro 360 — CRM a medida (orden, factura, inventario, contabilidad)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">Ahorro en horas</td>
                  <td className="px-4 py-3">150–175 h/mes</td>
                  <td className="px-4 py-3">250–275 h/mes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">Ahorro estimado</td>
                  <td className="px-4 py-3">$2.5–6M COP/mes</td>
                  <td className="px-4 py-3">$3.5–6M COP/mes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">Beneficio clave</td>
                  <td className="px-4 py-3">Cero comandas en papel, caja y reportes automáticos</td>
                  <td className="px-4 py-3">Atención en minutos, cero pedidos perdidos, cartera controlada</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{DISCLAIMER}</p>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section className="mt-16 rounded-2xl border border-border/60 bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight">
            ¿Tu negocio podría ahorrar así?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-foreground/85">
            Cada implementación es a la medida. Cuéntanos cómo opera tu empresa y te decimos
            qué se puede automatizar, cuánto puede tomar y qué ahorro estimado puede generar.
          </p>
          <Link
            to="/"
            search={{ diagnostico: 1 }}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Diagnóstico gratuito <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>

      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground md:flex-row md:px-8">
          <span>© {new Date().getFullYear()} IAmkt — Ingeniería, IA y Marketing Digital</span>
          <div className="flex gap-6">
            <Link to="/casos-de-exito" className="transition-colors hover:text-accent">
              Casos de éxito
            </Link>
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
