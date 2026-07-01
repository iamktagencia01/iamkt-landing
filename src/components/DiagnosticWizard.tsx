import { useState, useCallback, useEffect } from "react";
import { z } from "zod";
import {
  ArrowRight,
  ArrowLeft,
  X,
  MessageCircle,
  CheckCircle2,
  Loader2,
  Bot,
  TrendingUp,
  MessageSquare,
  Code2,
  User,
  Users,
  Building2,
  Clock,
  Zap,
  Calendar,
  Search,
  SendHorizonal,
  Compass,
  BrainCircuit,
} from "lucide-react";
import { sendDiagnosticEmail } from "../lib/api/diagnostic.functions";
import { cn } from "../lib/utils";

/* ─── Constants ─── */

const WHATSAPP_NUMBER = "573228570784";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "¡Hola IAmkt! Ya completé mi diagnóstico gratuito y quiero confirmar mi agenda para revisar los resultados.",
)}`;

const LABELS = {
  bottleneck: {
    manual_tasks: "Tareas manuales y desordenadas",
    stalled_sales: "Ventas estancadas / Poco crecimiento",
    whatsapp_collapsed: "WhatsApp colapsado / Atención lenta",
    lack_software: "Falta de software a la medida",
    lack_direction: "Falta de dirección estratégica",
    want_ai: "Quiero implementar IA pero no sé cómo",
  },
  teamSize: {
    independent: "Independiente",
    small: "2-5 personas",
    medium: "6-20 personas",
    large: "Más de 20 personas",
  },
  timeline: {
    asap: "Lo antes posible",
    soon: "En 1-3 meses",
    exploring: "Solo estoy explorando",
  },
};

/* ─── Types ─── */

type StepKey = "bottleneck" | "teamSize" | "timeline";

interface WizardAnswers {
  bottleneck: string[];
  teamSize: string | null;
  timeline: string | null;
}

interface WizardProps {
  open: boolean;
  onClose: () => void;
}

/* ─── Step configurations ─── */

interface StepConfig {
  step: number;
  key: StepKey;
  question: string;
  subtitle?: string;
  hint?: string;
  multiSelect?: boolean;
  options: {
    value: string;
    label: string;
    icon: React.FC<{ className?: string; strokeWidth?: number }>;
    description?: string;
  }[];
}

const STEPS: StepConfig[] = [
  {
    step: 1,
    key: "bottleneck",
    question: "¿Cuáles son los principales cuellos de botella en tu Empresa y/o Negocio actualmente?",
    subtitle: "Identifica tus mayores obstáculos para crecer",
    hint: "Puedes seleccionar una o varias opciones",
    multiSelect: true,
    options: [
      {
        value: "manual_tasks",
        label: "Tareas manuales y desordenadas",
        icon: Bot,
        description: "Procesos operativos que consumen tiempo y recursos sin estructura",
      },
      {
        value: "stalled_sales",
        label: "Ventas estancadas / Poco crecimiento",
        icon: TrendingUp,
        description: "Dificultad para atraer clientes nuevos y cerrar más ventas",
      },
      {
        value: "whatsapp_collapsed",
        label: "WhatsApp colapsado / Atención lenta",
        icon: MessageSquare,
        description: "Alto volumen de mensajes sin respuesta oportuna ni seguimiento",
      },
      {
        value: "lack_software",
        label: "Falta de software a la medida",
        icon: Code2,
        description: "Herramientas genéricas que no se adaptan a tu flujo de trabajo",
      },
      {
        value: "lack_direction",
        label: "Falta de dirección estratégica",
        icon: Compass,
        description: "No sé por dónde empezar ni qué mejorar primero para crecer",
      },
      {
        value: "want_ai",
        label: "Quiero implementar IA pero no sé cómo",
        icon: BrainCircuit,
        description: "Sé que la inteligencia artificial puede ayudar pero no tengo el plan",
      },
    ],
  },
  {
    step: 2,
    key: "teamSize",
    question: "¿De qué tamaño es tu equipo actual?",
    subtitle: "Para dimensionar la solución adecuada",
    multiSelect: false,
    options: [
      {
        value: "independent",
        label: "Independiente",
        icon: User,
        description: "Trabajas solo o como freelancer",
      },
      {
        value: "small",
        label: "2-5 personas",
        icon: Users,
        description: "Un equipo pequeño y compacto",
      },
      {
        value: "medium",
        label: "6-20 personas",
        icon: Building2,
        description: "Una empresa en crecimiento",
      },
      {
        value: "large",
        label: "Más de 20 personas",
        icon: Building2,
        description: "Una organización consolidada",
      },
    ],
  },
  {
    step: 3,
    key: "timeline",
    question: "¿Para cuándo necesitas implementar esta solución?",
    subtitle: "Para priorizar tu caso",
    multiSelect: false,
    options: [
      {
        value: "asap",
        label: "Lo antes posible",
        icon: Zap,
        description: "Urgencia inmediata, necesito resultados ya",
      },
      {
        value: "soon",
        label: "En 1-3 meses",
        icon: Calendar,
        description: "Tengo un plan a corto plazo",
      },
      {
        value: "exploring",
        label: "Solo estoy explorando",
        icon: Search,
        description: "Investigando opciones sin fecha definida",
      },
    ],
  },
];

/* ─── Step 4 schema ─── */

const contactSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo"),
  company: z.string().min(1, "Ingresa el nombre de tu empresa"),
  whatsapp: z.string().min(7, "Ingresa un número de WhatsApp válido"),
  email: z.string().email("Ingresa un correo electrónico válido"),
});

type ContactData = z.infer<typeof contactSchema>;

/* ─── Progress Bar ─── */

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-2">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
              step < currentStep &&
                "bg-accent text-accent-foreground shadow-sm shadow-accent/30",
              step === currentStep &&
                "border-2 border-accent bg-accent/10 text-accent shadow-sm shadow-accent/20",
              step > currentStep &&
                "border border-white/20 bg-white/5 text-white/40",
            )}
          >
            {step < currentStep ? (
              <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
            ) : (
              step
            )}
          </div>
          {step < 4 && (
            <div
              className={cn(
                "h-px w-6 transition-colors duration-300",
                step < currentStep ? "bg-accent/60" : "bg-white/10",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Option Card ─── */

function OptionCard({
  label,
  description,
  icon: Icon,
  selected,
  onClick,
}: {
  label: string;
  description?: string;
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full rounded-xl border p-4 text-left backdrop-blur-sm transition-all duration-200",
        "hover:-translate-y-0.5",
        selected
          ? "border-accent/70 bg-accent/10 shadow-md shadow-accent/10"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]",
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
            selected
              ? "bg-accent text-accent-foreground"
              : "bg-white/5 text-white/60 group-hover:text-white/80",
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-sm font-semibold transition-colors",
              selected ? "text-white" : "text-white/80",
            )}
          >
            {label}
          </p>
          {description && (
            <p className="mt-0.5 text-xs text-white/50">{description}</p>
          )}
        </div>
        <div
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
            selected
              ? "border-accent bg-accent"
              : "border-white/20 group-hover:border-white/40",
          )}
        >
          {selected && (
            <CheckCircle2 className="h-3 w-3 text-accent-foreground" strokeWidth={3} />
          )}
        </div>
      </div>
    </button>
  );
}

/* ─── Success Screen ─── */

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
        <CheckCircle2 className="h-8 w-8 text-emerald-400" strokeWidth={1.5} />
      </div>
      <h3 className="mt-5 text-xl font-bold text-white">
        ¡Diagnóstico enviado con éxito!
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
        Hemos recibido tus respuestas. En las próximas horas revisaremos tu caso y te
        contactaremos con un plan personalizado.
      </p>
      <div className="mt-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-2.5">
        <p className="text-xs text-amber-300/90">
          ⏳ Mientras tanto, puedes agendar tu cita directamente por WhatsApp
        </p>
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent px-6 py-3.5 font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-accent/50"
      >
        <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
        Hablar por WhatsApp para confirmar agenda
      </a>
      <p className="mt-3 text-xs text-white/40">
        Te atenderemos personalmente para coordinar los detalles
      </p>
    </div>
  );
}

/* ─── Main Wizard ─── */

export default function DiagnosticWizard({ open, onClose }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<WizardAnswers>({
    bottleneck: [],
    teamSize: null,
    timeline: null,
  });
  const [formData, setFormData] = useState<ContactData>({
    name: "",
    company: "",
    whatsapp: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [animDir, setAnimDir] = useState<"forward" | "backward">("forward");

  // Reset on open
  useEffect(() => {
    if (open) {
      setCurrentStep(1);
      setAnswers({ bottleneck: [], teamSize: null, timeline: null });
      setFormData({ name: "", company: "", whatsapp: "", email: "" });
      setFormErrors({});
      setSubmitting(false);
      setSubmitted(false);
      setSubmitError(null);
      setAnimDir("forward");
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSelect = useCallback(
    (key: StepKey, value: string, multiSelect?: boolean) => {
      setAnimDir("forward");

      if (multiSelect) {
        // Toggle: add or remove from array
        setAnswers((prev) => {
          const current = prev[key] as string[];
          const exists = current.includes(value);
          return {
            ...prev,
            [key]: exists
              ? current.filter((v) => v !== value)
              : [...current, value],
          };
        });
      } else {
        // Single select: set and auto-advance
        setAnswers((prev) => ({ ...prev, [key]: value }));
        setTimeout(() => {
          setCurrentStep((prev) => Math.min(prev + 1, 4));
        }, 200);
      }
    },
    [],
  );

  const goNext = useCallback(() => {
    setAnimDir("forward");
    if (currentStep < 3) {
      // Validate multi-select step has at least one selection
      if (currentStep === 1 && answers.bottleneck.length === 0) return;
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(4);
    }
  }, [currentStep, answers.bottleneck]);

  const goBack = useCallback(() => {
    if (currentStep > 1) {
      setAnimDir("backward");
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleFieldChange = useCallback(
    (field: keyof ContactData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
      setSubmitError(null);
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    // Validate step 4
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const errors: Partial<Record<keyof ContactData, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactData;
        if (!errors[field]) errors[field] = issue.message;
      }
      setFormErrors(errors);
      return;
    }

    if (answers.bottleneck.length === 0 || !answers.teamSize || !answers.timeline) {
      setSubmitError("Faltan respuestas de pasos anteriores. Por favor vuelve a empezar.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await sendDiagnosticEmail({
        data: {
          bottleneck: answers.bottleneck,
          teamSize: answers.teamSize,
          timeline: answers.timeline,
          name: formData.name,
          company: formData.company,
          whatsapp: formData.whatsapp,
          email: formData.email,
        },
      });

      if (response.success) {
        setSubmitted(true);
      } else {
        setSubmitError(
          "No pudimos enviar el diagnóstico. Puedes enviarlo manualmente por WhatsApp.",
        );
      }
    } catch {
      setSubmitError("Error de conexión. Intenta de nuevo o escríbenos por WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }, [answers, formData]);

  if (!open) return null;

  const currentStepConfig = STEPS[currentStep - 1] as StepConfig | undefined;
  const isLastStep = currentStep === 4;
  const isFirstStep = currentStep === 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl border border-white/10 shadow-2xl",
          "backdrop-blur-xl transition-all duration-200",
          "bg-[oklch(0.11_0.05_265)]", // Slightly darker than the page bg
        )}
        style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      >
        {/* Close button — fixed inside the modal header */}
        <button
          onClick={onClose}
          className="sticky top-0 z-10 ml-auto mr-4 mt-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>

        <div className="overflow-y-auto px-6 pb-6">
          {/* Progress bar */}
          {!submitted && <ProgressBar currentStep={currentStep} />}

          {/* Animated content */}
          <div className="relative min-h-[320px]">
            <div
              className={cn(
                "transition-all duration-300 ease-out",
                animDir === "forward"
                  ? "animate-in fade-in slide-in-from-right-4"
                  : "animate-in fade-in slide-in-from-left-4",
              )}
              key={`step-${currentStep}-${submitted ? "done" : "form"}`}
            >
              {submitted ? (
                <SuccessScreen />
              ) : currentStepConfig ? (
                <div>
                  {/* Question header */}
                  <div className="mb-1 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
                      Paso {currentStepConfig.step} de 4
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-white">
                      {currentStepConfig.question}
                    </h3>
                    {currentStepConfig.subtitle && (
                      <p className="mt-1 text-sm text-white/50">
                        {currentStepConfig.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Hint for multi-select */}
                  {currentStepConfig.hint && (
                    <p className="mt-3 text-center text-xs text-cyan-300/70">
                      {currentStepConfig.hint}
                    </p>
                  )}

                  {/* Options */}
                  <div className="mt-5 space-y-2.5">
                    {currentStepConfig.options.map((opt) => (
                      <OptionCard
                        key={opt.value}
                        label={opt.label}
                        description={opt.description}
                        icon={opt.icon}
                        selected={
                          currentStepConfig.multiSelect
                            ? (answers[currentStepConfig.key] as string[]).includes(opt.value)
                            : answers[currentStepConfig.key] === opt.value
                        }
                        onClick={() => handleSelect(currentStepConfig.key, opt.value, currentStepConfig.multiSelect)}
                      />
                    ))}
                  </div>

                  {/* Footer: Continue / Back */}
                  <div className="mt-4 flex items-center justify-between">
                    {!isFirstStep ? (
                      <button
                        type="button"
                        onClick={goBack}
                        className="flex items-center gap-1.5 text-xs font-medium text-white/50 transition-colors hover:text-white/80"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                        Paso anterior
                      </button>
                    ) : (
                      <div /> // spacer
                    )}

                    {currentStepConfig.multiSelect && (
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={answers.bottleneck.length === 0}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all",
                          answers.bottleneck.length > 0
                            ? "bg-accent text-accent-foreground hover:-translate-y-0.5"
                            : "bg-white/5 text-white/30 cursor-not-allowed",
                        )}
                      >
                        Siguiente
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Step 4: Contact form */
                <div>
                  <div className="mb-1 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
                      Paso 4 de 4
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-white">
                      Tus datos de contacto
                    </h3>
                    <p className="mt-1 text-sm text-white/50">
                      Déjanos tus datos y te enviaremos el diagnóstico completo
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    className="mt-5 space-y-3.5"
                    noValidate
                  >
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <Field
                        label="Nombre completo"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(v) => handleFieldChange("name", v)}
                        error={formErrors.name}
                      />
                      <Field
                        label="Empresa"
                        placeholder="Nombre de tu empresa"
                        value={formData.company}
                        onChange={(v) => handleFieldChange("company", v)}
                        error={formErrors.company}
                      />
                    </div>
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <Field
                        label="WhatsApp"
                        placeholder="+57 300 123 4567"
                        value={formData.whatsapp}
                        onChange={(v) => handleFieldChange("whatsapp", v)}
                        error={formErrors.whatsapp}
                      />
                      <Field
                        label="Correo electrónico"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(v) => handleFieldChange("email", v)}
                        error={formErrors.email}
                      />
                    </div>

                    {submitError && (
                      <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5">
                        <p className="text-xs text-red-300">{submitError}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={goBack}
                        className="flex items-center gap-1.5 text-xs font-medium text-white/50 transition-colors hover:text-white/80"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                        Atrás
                      </button>

                      <button
                        type="submit"
                        disabled={submitting}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-accent-foreground shadow-lg transition-all",
                          submitting
                            ? "bg-accent/60 cursor-not-allowed"
                            : "bg-accent shadow-accent/30 hover:-translate-y-0.5 hover:shadow-accent/50",
                        )}
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <SendHorizonal className="h-4 w-4" strokeWidth={2.2} />
                            Solicitar mi Diagnóstico Gratuito
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Form Field ─── */

function Field({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-white/70">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 backdrop-blur-sm transition-all",
          "focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
          error ? "border-red-400/50" : "border-white/10",
        )}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

/* ─── Tailwind animations (add to styles.css if needed) ─── */

// Needed: @keyframes for slide-in-from-right/slide-in-from-left
