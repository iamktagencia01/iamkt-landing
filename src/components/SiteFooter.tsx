import { Link } from "@tanstack/react-router";
import {
  MessageCircle,
  Phone,
  Mail,
  Facebook,
  Instagram,
  ExternalLink,
} from "lucide-react";
import logoUrl from "@/assets/logo.png";

const WHATSAPP_NUMBER = "573228570784";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola IAmkt, quiero cotizar un proyecto de automatización o software para mi empresa.",
)}`;

/**
 * Footer unificado para todas las rutas.
 * Un solo correo oficial (contacto@iamkt.co), enlaces al ecosistema y legales.
 */
export function SiteFooter() {
  return (
    <footer
      className="text-white"
      style={{ backgroundColor: "oklch(0.18 0.08 260)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        {/* Marca */}
        <div>
          <img
            src={logoUrl}
            alt="IAmkt"
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Ingeniería, IA y Marketing Digital para empresas que quieren crecer.
          </p>
          <p className="mt-2 max-w-xs text-xs text-white/50">
            Hecho en Colombia 🇨🇴 con ingeniería e inteligencia artificial.
          </p>
        </div>

        {/* Contacto */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Contacto directo
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            Cotizar por WhatsApp
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
        </div>

        {/* Ecosistema */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Ecosistema
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a
              href="https://comandatec.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white"
            >
              ComandaTec <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Link to="/casos-de-exito" className="text-white/80 hover:text-white">
              Casos de éxito
            </Link>
            <Link to="/blog" className="text-white/80 hover:text-white">
              Blog
            </Link>
            <Link to="/" className="text-white/80 hover:text-white">
              Inicio
            </Link>
          </div>
        </div>

        {/* Redes */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Síguenos
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a
              href="https://www.instagram.com/iamkt.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              <Instagram className="h-4 w-4" /> Instagram @iamkt.co
            </a>
            <a
              href="https://www.facebook.com/iamktco"
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
        </div>
      </div>

      {/* Barra legal */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/60 md:flex-row md:px-8">
          <span>
            © {new Date().getFullYear()} Agencia IAmkt — Ingeniería, IA y Marketing
            Digital. Todos los derechos reservados.
          </span>
          <div className="flex gap-5">
            <Link to="/privacidad" className="hover:text-white">
              Privacidad
            </Link>
            <Link to="/terminos" className="hover:text-white">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
