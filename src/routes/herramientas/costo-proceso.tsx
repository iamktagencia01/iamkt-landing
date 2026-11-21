import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  MessageCircle,
  CheckCircle2,
  Clock,
  Users,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import {
  PROCESSES,
  ROLES,
  SECTORS,
  calculate,
  defaultProcesses,
  formatCOP,
  formatNumber,
  sectorPlan,
  type ProcessRow,
  type RoleKey,
  type Sector,
} from "@/lib/costo-proceso";

export const Route = createFileRoute("/herramientas/costo-proceso")({
  head: () => ({
    meta: [
      {
        title: "Calculadora de costos operativos — IAmkt",
      },
      {
        name: "description",
        content:
          "Calcula en 15 minutos cuánto te cuestan los procesos manuales de tu negocio y descarga un pre-diagnóstico en PDF con tu plan de automatización.",
      },
      { property: "og:title", content: "Calculadora de costos operativos — IAmkt" },
      {
        property: "og:description",
        content:
          "Descubre cuánto dinero y horas pierde tu empresa en tareas manuales. Pre-diagnóstico gratuito en PDF.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://iamkt.co/herramientas/costo-proceso" }],
  }),
  component: CalculadoraPage,
});

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-src="${src}"]`)) {
      resolve();
      return;
    }
    const el = document.createElement("script");
    el.src = src;
    el.async = true;
    el.dataset.src = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
    document.body.appendChild(el);
  });
}

const STEPS = ["Contexto", "Procesos", "Errores", "Resultado"];

function StepBar({ step }: { step: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                active
                  ? "border-accent bg-accent text-accent-foreground"
                  : done
                    ? "border-accent/40 bg-accent/15 text-accent"
                    : "border-border text-muted-foreground"
              }`}
            >
              {done ? "✓" : n}
            </span>
            <span className={active ? "text-foreground" : "text-muted-foreground"}>{label}</span>
            {n < STEPS.length && <span className="mx-1 text-border">—</span>}
          </li>
        );
      })}
    </ol>
  );
}

function CalculadoraPage() {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [sector, setSector] = useState<Sector>("restaurante");
  const [employees, setEmployees] = useState(5);
  const [processes, setProcesses] = useState<ProcessRow[]>(() => defaultProcesses("restaurante"));
  const [errorsPerMonth, setErrorsPerMonth] = useState(0);
  const [costPerError, setCostPerError] = useState(30000);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setProcesses(defaultProcesses(sector));
  }, [sector]);

  const result = useMemo(
    () =>
      calculate({
        businessName,
        sector,
        employees,
        processes,
        errorsPerMonth,
        costPerError,
      }),
    [businessName, sector, employees, processes, errorsPerMonth, costPerError],
  );

  const updateProcess = (key: string, patch: Partial<ProcessRow>) => {
    setProcesses((prev) => prev.map((p) => (p.key === key ? { ...p, ...patch } : p)));
  };

  const whatsappText = encodeURIComponent(
    `Hola IAmkt, calculé con su herramienta ${formatCOP(result.totalMonthly)}/mes y ${formatNumber(
      result.hoursPerMonth,
    )} horas al mes en procesos manuales en mi negocio (${SECTORS[sector].label}). Quiero agendar el diagnóstico gratuito.`,
  );
  const whatsappUrl = `https://wa.me/573228570784?text=${whatsappText}`;

  const downloadPdf = async () => {
    setBusy(true);
    try {
      const [logoRes] = await Promise.all([
        fetch("/brand/iamkt-logo.png?v=2"),
        loadScript("/js/prediagnostico.js"),
      ]);
      const buildDiagnosticoPdf = (
        window as unknown as {
          IAmktPdf: {
            buildDiagnosticoPdf: (input: unknown, logo: Uint8Array) => Promise<Uint8Array>;
          };
        }
      ).IAmktPdf.buildDiagnosticoPdf;
      const logoBytes = new Uint8Array(await logoRes.arrayBuffer());
      const dateLabel = new Date().toLocaleDateString("es-CO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const bytes = await buildDiagnosticoPdf(
        {
          businessName,
          sectorLabel: SECTORS[sector].label,
          employees,
          dateLabel,
          result,
          plan: sectorPlan(sector),
          siteUrl: "https://iamkt.co",
          whatsappUrl: "https://wa.me/573228570784",
          email: "contacto@iamkt.co",
          instagramUrl: "https://www.instagram.com/iamkt.co",
          facebookUrl: "https://www.facebook.com/iamktco",
        },
        logoBytes,
      );
      const blob = new Blob([bytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const slug = (businessName || "negocio")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[^\w]+/g, "-")
        .replace(/^-|-$/g, "");
      a.href = url;
      a.download = `prediagnostico-iamkt-${slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header ctaHref="/?diagnostico=1" />

      {/* Hero */}
      <section className="relative overflow-hidden text-white" style={{ backgroundColor: "oklch(0.13 0.06 265)" }}>
        <div className="relative mx-auto max-w-4xl px-4 py-14 md:px-8 md:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
            Herramienta gratuita
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            ¿Cuánto te cuestan tus procesos manuales?
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/75">
            Responde tres pasos y obtén una cifra real con tus propios datos. Al final descargas
            un pre-diagnóstico en PDF con tu plan de automatización.
          </p>
          <p className="mt-3 text-sm text-white/50">
            Sin registro. No guardamos tus datos en el servidor.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-12 md:px-8">
        <StepBar step={step} />

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
          {/* ───────── Paso 1 ───────── */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">Cuéntanos de tu negocio</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Con esto precargamos valores típicos de tu sector. Puedes ajustarlos después.
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold">Tipo de negocio</label>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {(Object.keys(SECTORS) as Sector[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSector(key)}
                      className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        sector === key
                          ? "border-accent bg-accent/10 font-semibold text-foreground"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      {SECTORS[key].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold" htmlFor="employees">
                    Personas en el equipo
                  </label>
                  <input
                    id="employees"
                    type="number"
                    min={1}
                    max={500}
                    value={employees}
                    onChange={(e) => setEmployees(Math.max(1, Number(e.target.value) || 1))}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold" htmlFor="business">
                    Nombre del negocio <span className="font-normal text-muted-foreground">(opcional)</span>
                  </label>
                  <input
                    id="business"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Ej. Distribuidora El Progreso"
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/25"
                >
                  Continuar <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  Ver resultado ya
                </button>
              </div>
            </div>
          )}

          {/* ───────── Paso 2 ───────── */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">Procesos que se hacen a mano</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ajusta las horas por semana de cada proceso. Desmarca los que no apliquen.
                </p>
              </div>

              <div className="space-y-3">
                {processes.map((p) => (
                  <div
                    key={p.key}
                    className={`rounded-xl border p-4 transition-colors ${
                      p.enabled ? "border-accent/40 bg-accent/[0.04]" : "border-border"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <label className="flex flex-1 items-center gap-3 text-sm font-semibold">
                        <input
                          type="checkbox"
                          checked={p.enabled}
                          onChange={(e) => updateProcess(p.key, { enabled: e.target.checked })}
                          className="h-4 w-4 accent-[var(--accent)]"
                        />
                        {p.label}
                      </label>
                      {p.enabled && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            max={80}
                            value={p.hours}
                            onChange={(e) =>
                              updateProcess(p.key, { hours: Math.max(0, Number(e.target.value) || 0) })
                            }
                            className="w-20 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          />
                          <span className="text-xs text-muted-foreground">h/semana</span>
                          <select
                            value={p.role}
                            onChange={(e) => updateProcess(p.key, { role: e.target.value as RoleKey })}
                            className="rounded-lg border border-border bg-background px-2 py-2 text-xs"
                          >
                            {(Object.keys(ROLES) as RoleKey[]).map((r) => (
                              <option key={r} value={r}>
                                {ROLES[r].label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" /> Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/25"
                >
                  Continuar <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* ───────── Paso 3 ───────── */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">El costo de los errores</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Cada error manual se paga en reprocesos, descuentos o clientes que no vuelven.
                  Si no lo tienes claro, déjalo en cero.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold" htmlFor="errors">
                    Errores por mes
                  </label>
                  <input
                    id="errors"
                    type="number"
                    min={0}
                    value={errorsPerMonth}
                    onChange={(e) => setErrorsPerMonth(Math.max(0, Number(e.target.value) || 0))}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold" htmlFor="costError">
                    Costo aproximado de cada error (COP)
                  </label>
                  <input
                    id="costError"
                    type="number"
                    min={0}
                    step={1000}
                    value={costPerError}
                    onChange={(e) => setCostPerError(Math.max(0, Number(e.target.value) || 0))}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
                <p className="flex items-center gap-2 font-semibold text-foreground">
                  <AlertTriangle className="h-4 w-4 text-accent" /> Referencia rápida
                </p>
                <p className="mt-1 text-muted-foreground">
                  Un pedido mal tomado puede costar entre $20.000 y $60.000 en reposición, tiempo y
                  molestia del cliente. Ajusta según tu operación.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" /> Atrás
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/25"
                >
                  Ver mi resultado <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* ───────── Paso 4 ───────── */}
          {step === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold">Tu pre-diagnóstico</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Calculado con los datos que ingresaste. Es una estimación, no una cotización.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-[oklch(0.13_0.06_265)] p-4 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">Costo mensual</p>
                  <p className="mt-2 text-2xl font-extrabold">{formatCOP(result.totalMonthly)}</p>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Proyección anual</p>
                  <p className="mt-2 text-2xl font-extrabold">{formatCOP(result.totalAnnual)}</p>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Horas al mes</p>
                  <p className="mt-2 flex items-center gap-2 text-2xl font-extrabold">
                    <Clock className="h-5 w-5 text-accent" /> {formatNumber(result.hoursPerMonth)} h
                  </p>
                </div>
              </div>

              {result.rows.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-accent">Detalle por proceso</h3>
                  <div className="mt-3 overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3">Proceso</th>
                          <th className="px-4 py-3 text-right">Horas/sem</th>
                          <th className="px-4 py-3 text-right">Costo/mes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {result.rows.map((r) => (
                          <tr key={r.key}>
                            <td className="px-4 py-3">{r.label}</td>
                            <td className="px-4 py-3 text-right">{formatNumber(r.hours)}</td>
                            <td className="px-4 py-3 text-right font-semibold">{formatCOP(r.monthlyCost)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {result.topProcess && (
                <div className="rounded-xl border border-accent/40 bg-accent/[0.07] p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Dónde empezar</p>
                  <p className="mt-1 text-lg font-extrabold">
                    {result.topProcess.label} — {formatCOP(result.topProcess.monthlyCost)} al mes
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{result.maturityNote}</p>
                </div>
              )}

              <div className="rounded-xl border border-border bg-muted/20 p-5">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <Sparkles className="h-4 w-4 text-accent" /> Potencial estimado
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Automatizando los procesos con mayor costo, el tiempo liberado equivaldría a entre{" "}
                  <strong className="text-foreground">{formatCOP(result.savingsLow)}</strong> y{" "}
                  <strong className="text-foreground">{formatCOP(result.savingsHigh)}</strong> al mes.
                  Es un rango de referencia (60–80%), no una promesa.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={downloadPdf}
                  disabled={busy}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/25 disabled:opacity-60"
                >
                  <Download className="h-4 w-4" />
                  {busy ? "Generando PDF…" : "Descargar mi pre-diagnóstico"}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-bold transition-colors hover:border-accent hover:text-accent"
                >
                  <MessageCircle className="h-4 w-4" /> Agendar diagnóstico
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 border-t border-border pt-5 text-sm">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 font-semibold text-accent hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" /> Ajustar datos
                </button>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-4 w-4" /> {employees} persona(s) en el equipo
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent" /> Sin registro
                </span>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          ¿Prefieres leer la guía completa?{" "}
          <a
            href="/guias/costo-proceso-manual.pdf"
            download
            className="font-semibold text-accent underline underline-offset-4"
          >
            Descarga el PDF con la explicación y la plantilla
          </a>
          .
        </p>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Volver al{" "}
          <Link to="/blog" className="font-semibold text-accent hover:underline">
            blog
          </Link>{" "}
          o ver los{" "}
          <Link to="/casos-de-exito" className="font-semibold text-accent hover:underline">
            casos de éxito
          </Link>
          .
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
