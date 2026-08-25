import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos de Uso — IAmkt" },
      {
        name: "description",
        content:
          "Términos de uso del sitio web de IAmkt: condiciones de uso del contenido, el diagnóstico gratuito y la contratación de servicios.",
      },
      { property: "og:title", content: "Términos de Uso — IAmkt" },
      { property: "og:url", content: "https://iamkt.co/terminos" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://iamkt.co/terminos" }],
  }),
  component: TermsPage,
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

function TermsPage() {
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
          Términos de Uso
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Última actualización: 24 de agosto de 2026 · IAmkt · contacto@iamkt.co
        </p>

        <div className="mt-6 rounded-xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-700 dark:text-amber-300">
          <strong>Nota de actualización:</strong> estos términos se completarán con la razón
          social, NIT y domicilio oficial de la empresa una vez concluya su proceso de
          constitución legal (en curso).
        </div>

        <Section title="1. Aceptación de los términos">
          <p>
            Al acceder y usar el sitio web de IAmkt (iamkt.co, en adelante "el Sitio"),
            aceptas estos Términos de Uso. Si no estás de acuerdo con ellos, por favor no
            uses el Sitio. Nos reservamos el derecho de modificarlos en cualquier momento; la
            versión vigente se publicará en esta página.
          </p>
        </Section>

        <Section title="2. Sobre IAmkt">
          <p>
            IAmkt es una agencia de ingeniería aplicada, inteligencia artificial y marketing
            digital que ofrece, entre otros: desarrollo de aplicaciones a la medida,
            automatización de procesos, agentes de IA, marketing digital y publicidad, y
            soluciones de WhatsApp Business. La información del Sitio es de carácter general
            e informativo y no constituye una oferta comercial vinculante por sí sola.
          </p>
        </Section>

        <Section title="3. Diagnóstico gratuito">
          <p>
            El diagnóstico gratuito es un análisis inicial orientativo para identificar
            oportunidades de automatización y digitalización. No constituye una propuesta
            comercial, una cotización ni una garantía de resultados. El alcance, los
            entregables y los precios de cualquier servicio se definen por escrito en una
            propuesta formal.
          </p>
        </Section>

        <Section title="4. Uso del Sitio y del contenido">
          <p>
            El contenido del Sitio, incluidos los artículos del blog, es propiedad de IAmkt o
            de sus respectivos autores y está protegido por las normas de propiedad
            intelectual. Puedes compartirlo citando la fuente, pero no copiarlo,
            reproducirlo o explotarlo comercialmente sin autorización previa.
          </p>
        </Section>

        <Section title="5. Contratación de servicios">
          <p>
            La contratación de servicios se rige por la propuesta escrita firmada entre las
            partes, que prevalece sobre estos términos en lo que respecta al alcance,
            entregables, plazos, pagos y propiedad del código o materiales desarrollados. Los
            pagos se realizan a la cuenta empresarial indicada en la facturación oficial.
          </p>
        </Section>

        <Section title="6. Limitación de responsabilidad">
          <p>
            El Sitio y su contenido se proporcionan "tal cual". IAmkt no garantiza resultados
            específicos de negocio ni la disponibilidad ininterrumpida del Sitio. En ningún
            caso IAmkt será responsable por daños indirectos o pérdidas derivadas del uso del
            Sitio o de la confianza depositada en su contenido. Los resultados de los
            servicios dependen de factores propios de cada cliente y del mercado.
          </p>
        </Section>

        <Section title="7. Enlaces a terceros">
          <p>
            El Sitio puede contener enlaces a sitios externos (WhatsApp, redes sociales,
            herramientas). No controlamos ni respondemos por el contenido o las prácticas de
            privacidad de esos sitios.
          </p>
        </Section>

        <Section title="8. Legislación aplicable">
          <p>
            Estos términos se rigen por las leyes de la República de Colombia. Cualquier
            controversia se someterá a los jueces competentes de Colombia, previo intento de
            solución directa entre las partes.
          </p>
        </Section>

        <Section title="9. Contacto">
          <p>
            Para cualquier duda sobre estos términos, escríbenos a{" "}
            <a href="mailto:contacto@iamkt.co" className="font-semibold text-accent underline underline-offset-4">
              contacto@iamkt.co
            </a>{" "}
            o por WhatsApp al +57 322 857 0784.
          </p>
        </Section>
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
