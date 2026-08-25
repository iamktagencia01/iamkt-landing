import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad — IAmkt" },
      {
        name: "description",
        content:
          "Política de privacidad de IAmkt: qué datos recopilamos, para qué los usamos, tus derechos y cómo contactarnos.",
      },
      { property: "og:title", content: "Política de Privacidad — IAmkt" },
      { property: "og:url", content: "https://iamkt.co/privacidad" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://iamkt.co/privacidad" }],
  }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-foreground/85">
        {children}
      </div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header ctaHref="/?diagnostico=1" />

      <main className="mx-auto max-w-3xl px-4 py-14 md:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">
          Política de Privacidad
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Última actualización: 24 de agosto de 2026 · IAmkt · contacto@iamkt.co · WhatsApp
          +57 322 857 0784
        </p>

        <div className="mt-6 rounded-xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-700 dark:text-amber-300">
          <strong>Nota de actualización:</strong> esta política se completará con la razón
          social, NIT y domicilio oficial de la empresa una vez concluya su proceso de
          constitución legal (en curso). La protección de tus datos aplica desde ya.
        </div>

        <Section title="1. Responsable del tratamiento">
          <p>
            IAmkt (en adelante, "IAmkt", "nosotros") es una agencia de ingeniería aplicada,
            inteligencia artificial y marketing digital con operación en Colombia. El
            responsable del tratamiento de los datos personales es IAmkt. Datos de contacto
            para cualquier solicitud sobre privacidad:{" "}
            <a href="mailto:contacto@iamkt.co" className="font-semibold text-accent underline underline-offset-4">
              contacto@iamkt.co
            </a>{" "}
            o WhatsApp +57 322 857 0784.
          </p>
        </Section>

        <Section title="2. Datos que recopilamos">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Datos del formulario de diagnóstico gratuito:</strong> nombre, empresa,
              correo electrónico, número de WhatsApp y la información del negocio que
              voluntariamente compartas (procesos, herramientas, objetivos).
            </li>
            <li>
              <strong>Datos de contacto:</strong> cuando nos escribes por WhatsApp, correo o
              redes sociales.
            </li>
            <li>
              <strong>Datos de navegación:</strong> información agregada y anónima sobre el
              uso del sitio (páginas visitadas, dispositivo, origen), recopilada con
              herramientas de analítica para mejorar la experiencia.
            </li>
          </ul>
        </Section>

        <Section title="3. Finalidad del tratamiento">
          <ul className="list-disc space-y-2 pl-5">
            <li>Responder tus consultas y preparar propuestas o diagnósticos.</li>
            <li>Contactarte con información comercial relacionada con tus intereses, siempre con tu consentimiento.</li>
            <li>Mejorar el sitio web, el blog y nuestros servicios.</li>
            <li>Cumplir obligaciones legales y proteger nuestros derechos.</li>
          </ul>
        </Section>

        <Section title="4. Base legal">
          <p>
            Tratamos tus datos con fundamento en tu consentimiento (artículo 9 de la Ley
            1581 de 2012 de Colombia y normas concordantes sobre habeas data) y en la
            ejecución de relaciones precontractuales o contractuales contigo.
          </p>
        </Section>

        <Section title="5. Almacenamiento y seguridad">
          <p>
            Tus datos se almacenan en servicios con cifrado en tránsito y en reposo, y el
            acceso está restringido a personal autorizado. Adoptamos medidas razonables de
            seguridad, sin que ningún sistema sea 100% infalible. No vendemos ni alquilamos
            tus datos personales a terceros.
          </p>
        </Section>

        <Section title="6. Compartir datos con terceros">
          <p>
            Solo compartimos datos con proveedores de infraestructura y herramientas que
            usamos para operar (por ejemplo, hosting, correo y analítica), bajo acuerdos que
            limitan su uso. No transferimos datos a terceros para fines de mercadeo ajeno.
          </p>
        </Section>

        <Section title="7. WhatsApp y mensajería">
          <p>
            Las conversaciones por WhatsApp se manejan conforme a esta política y a los
            términos de la propia plataforma. Puedes solicitar en cualquier momento que
            eliminemos el historial de una conversación.
          </p>
        </Section>

        <Section title="8. Tus derechos">
          <p>
            De acuerdo con la Ley 1581 de 2012, tienes derecho a conocer, actualizar,
            rectificar y solicitar la supresión de tus datos personales, así como a revocar
            tu consentimiento. Puedes ejercer estos derechos escribiendo a{" "}
            <a href="mailto:contacto@iamkt.co" className="font-semibold text-accent underline underline-offset-4">
              contacto@iamkt.co
            </a>{" "}
            indicando tu solicitud. Responderemos en los términos legales aplicables.
          </p>
        </Section>

        <Section title="9. Menores de edad">
          <p>
            Nuestros servicios no están dirigidos a menores de 14 años. Si tienes menos de
            esa edad, no nos compartas datos personales.
          </p>
        </Section>

        <Section title="10. Cambios a esta política">
          <p>
            Podemos actualizar esta política cuando cambien nuestros servicios o la ley. La
            versión vigente se publicará siempre en esta página con su fecha de
            actualización.
          </p>
        </Section>

        <div className="mt-12 rounded-2xl border border-border/60 bg-muted/30 p-6 text-sm text-muted-foreground">
          ¿Tienes preguntas sobre tus datos? Escríbenos a{" "}
          <a href="mailto:contacto@iamkt.co" className="font-semibold text-accent underline underline-offset-4">
            contacto@iamkt.co
          </a>{" "}
          o por WhatsApp al +57 322 857 0784.
        </div>
      </main>

      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground md:flex-row md:px-8">
          <span>© {new Date().getFullYear()} IAmkt — Ingeniería, IA y Marketing Digital</span>
          <div className="flex gap-6">
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
