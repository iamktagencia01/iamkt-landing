// Compila el generador de PDF a un bundle de navegador, fuera del grafo de SSR.
// Así el Worker de Cloudflare no carga pdf-lib y el PDF se genera solo en el cliente.

import { build } from "esbuild";

await build({
  entryPoints: ["src/lib/pdf-diagnostico.ts"],
  bundle: true,
  format: "iife",
  globalName: "IAmktPdf",
  platform: "browser",
  target: ["es2020"],
  outfile: "public/js/prediagnostico.js",
  minify: true,
  legalComments: "none",
});

console.log("PDF bundle listo: public/js/prediagnostico.js");
