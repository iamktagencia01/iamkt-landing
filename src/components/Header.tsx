import { Link } from "@tanstack/react-router";
import { ClipboardList, Menu } from "lucide-react";
import logoUrl from "@/assets/logo.png";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  ["Inicio", "#inicio"],
  ["Beneficios", "#beneficios"],
  ["Servicios", "#servicios"],
  ["FAQ", "#faq"],
] as const;

export function Header({
  onOpenWizard,
  ctaHref,
}: {
  onOpenWizard?: () => void;
  ctaHref?: string;
}) {
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

        {/* Menú escritorio */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
            >
              {label}
            </a>
          ))}
          <Link
            to="/blog"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
          >
            Blog
          </Link>
          <Link
            to="/casos-de-exito"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
          >
            Casos de éxito
          </Link>
        </nav>

        {/* CTA escritorio */}
        {ctaHref ? (
          <Link
            to={ctaHref}
            className="hidden items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/30 transition-all hover:-translate-y-0.5 md:inline-flex"
          >
            <ClipboardList className="h-4 w-4" strokeWidth={2} />
            Comienza Tu Diagnóstico Gratuito
          </Link>
        ) : (
          <button
            onClick={onOpenWizard}
            className="hidden items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/30 transition-all hover:-translate-y-0.5 md:inline-flex"
          >
            <ClipboardList className="h-4 w-4" strokeWidth={2} />
            Comienza Tu Diagnóstico Gratuito
          </button>
        )}

        {/* Menú móvil — hamburguesa + sheet */}
        <Sheet>
          <SheetTrigger className="inline-flex items-center justify-center rounded-md p-2 text-foreground/80 transition-colors hover:text-accent md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menú</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-background/95 backdrop-blur-xl">
            <div className="mt-10 flex flex-col gap-2">
              {NAV_ITEMS.map(([label, href]) => (
                <SheetClose asChild key={href}>
                  <a
                    href={href}
                    className="rounded-lg px-4 py-3 text-lg font-semibold text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent"
                  >
                    {label}
                  </a>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link
                  to="/blog"
                  className="rounded-lg px-4 py-3 text-lg font-semibold text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent"
                >
                  Blog
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/casos-de-exito"
                  className="rounded-lg px-4 py-3 text-lg font-semibold text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent"
                >
                  Casos de éxito
                </Link>
              </SheetClose>
            </div>
            <div className="mt-6 border-t border-border/40 px-4 pt-6">
              <SheetClose asChild>
                {ctaHref ? (
                  <Link
                    to={ctaHref}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/30 transition-all hover:-translate-y-0.5"
                  >
                    <ClipboardList className="h-4 w-4" strokeWidth={2} />
                    Diagnóstico Gratuito
                  </Link>
                ) : (
                  <button
                    onClick={onOpenWizard}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/30 transition-all hover:-translate-y-0.5"
                  >
                    <ClipboardList className="h-4 w-4" strokeWidth={2} />
                    Diagnóstico Gratuito
                  </button>
                )}
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
