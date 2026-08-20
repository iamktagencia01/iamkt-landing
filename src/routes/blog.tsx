import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout compartido de /blog — sin head propio para no contaminar
// las páginas hijas (índice y artículos) con metadatos duplicados.
export const Route = createFileRoute("/blog")({
  component: () => <Outlet />,
});
