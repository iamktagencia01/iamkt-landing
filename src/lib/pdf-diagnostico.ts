// Generador del PDF de pre-diagnóstico con identidad de marca de IAmkt.
// Funciona igual en el navegador que en Node, para poder probarlo sin abrir el sitio.
//
// Estructura: página 1 = diagnóstico (cifras, detalle, prioridad).
//             página 2 = plan de acción, potencial, qué incluye el diagnóstico y contacto.

import {
  PDFDocument,
  StandardFonts,
  rgb,
  PDFName,
  type PDFPage,
  type PDFFont,
} from "pdf-lib";
import { formatCOP, formatNumber, type CalcResult } from "./costo-proceso";

const NAVY = rgb(0.071, 0.137, 0.239);
const AMBER = rgb(0.851, 0.545, 0.122);
const GREY = rgb(0.42, 0.47, 0.53);
const SOFT = rgb(0.96, 0.97, 0.98);
const LINE = rgb(0.81, 0.84, 0.87);
const WHITE = rgb(1, 1, 1);
const INK = rgb(0.11, 0.14, 0.19);

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const M = 44;
const CONTENT_W = PAGE_W - M * 2;
const FOOTER_H = 86;

export interface PdfInput {
  businessName: string;
  sectorLabel: string;
  employees: number;
  dateLabel: string;
  result: CalcResult;
  plan: string[];
  siteUrl: string;
  whatsappUrl: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
}

interface Ctx {
  doc: PDFDocument;
  page: PDFPage;
  y: number;
  bold: PDFFont;
  regular: PDFFont;
  links: Map<PDFPage, Record<string, unknown>[]>;
}

function addLink(ctx: Ctx, x: number, y: number, w: number, h: number, url: string) {
  const list = ctx.links.get(ctx.page) ?? [];
  list.push({
    Type: "Annot",
    Subtype: "Link",
    Rect: [x, y, x + w, y + h],
    Border: [0, 0, 0],
    A: { Type: "Action", S: "URI", URI: url },
  });
  ctx.links.set(ctx.page, list);
}

function wrap(value: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = value.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function text(
  ctx: Ctx,
  value: string,
  x: number,
  y: number,
  opts: { size?: number; bold?: boolean; color?: ReturnType<typeof rgb> } = {},
) {
  ctx.page.drawText(value, {
    x,
    y,
    size: opts.size ?? 9.5,
    font: opts.bold ? ctx.bold : ctx.regular,
    color: opts.color ?? INK,
  });
}

function textRight(
  ctx: Ctx,
  value: string,
  rightEdge: number,
  y: number,
  opts: { size?: number; bold?: boolean; color?: ReturnType<typeof rgb> } = {},
) {
  const font = opts.bold ? ctx.bold : ctx.regular;
  const size = opts.size ?? 9.5;
  const w = font.widthOfTextAtSize(value, size);
  text(ctx, value, rightEdge - w, y, { ...opts, size });
}

function paragraph(
  ctx: Ctx,
  value: string,
  options: { size?: number; color?: ReturnType<typeof rgb>; width?: number; leading?: number } = {},
) {
  const size = options.size ?? 9.5;
  const leading = options.leading ?? size * 1.45;
  const width = options.width ?? CONTENT_W;
  wrap(value, ctx.regular, size, width).forEach((line) => {
    text(ctx, line, M, ctx.y, { size, color: options.color });
    ctx.y -= leading;
  });
}

function sectionTitle(ctx: Ctx, value: string) {
  ctx.y -= 16;
  text(ctx, value.toUpperCase(), M, ctx.y, { size: 8, bold: true, color: AMBER });
  ctx.y -= 15;
}

function slimBar(ctx: Ctx) {
  ctx.page.drawRectangle({ x: 0, y: PAGE_H - 22, width: PAGE_W, height: 22, color: NAVY });
  text(ctx, "IAmkt · Pre-diagnóstico de costos operativos", M, PAGE_H - 15, {
    size: 7.5,
    bold: true,
    color: WHITE,
  });
}

function newPage(ctx: Ctx) {
  ctx.page = ctx.doc.addPage([PAGE_W, PAGE_H]);
  ctx.y = PAGE_H - M - 26;
  slimBar(ctx);
}

export async function buildDiagnosticoPdf(
  input: PdfInput,
  logoBytes: Uint8Array,
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([PAGE_W, PAGE_H]);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const regular = await doc.embedFont(StandardFonts.Helvetica);

  const ctx: Ctx = { doc, page, y: PAGE_H - M - 8, bold, regular, links: new Map() };

  doc.setTitle("Pre-diagnóstico de costos operativos — IAmkt");
  doc.setAuthor("IAmkt");
  doc.setSubject("Pre-diagnóstico de costos de procesos manuales");
  doc.setCreator("iamkt.co");

  // ────────── PÁGINA 1 ──────────
  const logoH = 44;
  try {
    const logo = await doc.embedPng(logoBytes);
    const logoW = (logo.width / logo.height) * logoH;
    ctx.page.drawImage(logo, { x: M, y: ctx.y - logoH, width: logoW, height: logoH });
  } catch {
    text(ctx, "IAmkt", M, ctx.y - 30, { size: 20, bold: true, color: NAVY });
  }

  const rightX = PAGE_W - M;
  textRight(ctx, input.dateLabel, rightX, ctx.y - 16, { size: 8.5, color: GREY });
  textRight(ctx, "PRE-DIAGNÓSTICO", rightX, ctx.y - 32, { size: 8, bold: true, color: AMBER });

  ctx.y -= 58;
  ctx.page.drawLine({ start: { x: M, y: ctx.y }, end: { x: PAGE_W - M, y: ctx.y }, thickness: 1, color: LINE });
  ctx.y -= 26;

  const title = input.businessName.trim()
    ? `Pre-diagnóstico de costos · ${input.businessName.trim()}`
    : "Pre-diagnóstico de costos operativos";
  wrap(title, bold, 18, CONTENT_W).forEach((line) => {
    text(ctx, line, M, ctx.y, { size: 18, bold: true, color: NAVY });
    ctx.y -= 22;
  });
  ctx.y -= 3;
  text(
    ctx,
    `${input.sectorLabel}  ·  ${input.employees} persona(s) en el equipo  ·  ${input.dateLabel}`,
    M,
    ctx.y,
    { size: 9, color: GREY },
  );
  ctx.y -= 24;

  const bandH = 76;
  ctx.page.drawRectangle({ x: M, y: ctx.y - bandH, width: CONTENT_W, height: bandH, color: NAVY });

  const cols = [
    { label: "COSTO MENSUAL", value: formatCOP(input.result.totalMonthly) },
    { label: "PROYECCIÓN ANUAL", value: formatCOP(input.result.totalAnnual) },
    { label: "HORAS AL MES", value: `${formatNumber(input.result.hoursPerMonth)} h` },
  ];
  const colW = CONTENT_W / 3;
  cols.forEach((c, i) => {
    const x = M + colW * i + 16;
    text(ctx, c.label, x, ctx.y - 22, { size: 8, bold: true, color: rgb(0.68, 0.78, 0.88) });
    text(ctx, c.value, x, ctx.y - 48, { size: 15.5, bold: true, color: WHITE });
  });

  ctx.y -= bandH + 12;
  text(
    ctx,
    "Cifras calculadas con los datos que ingresaste. Son estimaciones, no una factura ni una garantía de ahorro.",
    M,
    ctx.y,
    { size: 7.8, color: GREY },
  );
  ctx.y -= 18;

  sectionTitle(ctx, "Detalle por proceso");

  const colProceso = M + 6;
  const rightHoras = M + 300;
  const rightCostoHora = M + 392;
  const rightCostoMes = PAGE_W - M - 6;

  ctx.page.drawRectangle({ x: M, y: ctx.y - 5, width: CONTENT_W, height: 18, color: SOFT });
  text(ctx, "Proceso", colProceso, ctx.y, { size: 7.5, bold: true, color: GREY });
  textRight(ctx, "Horas/sem", rightHoras, ctx.y, { size: 7.5, bold: true, color: GREY });
  textRight(ctx, "Costo/hora", rightCostoHora, ctx.y, { size: 7.5, bold: true, color: GREY });
  textRight(ctx, "Costo/mes", rightCostoMes, ctx.y, { size: 7.5, bold: true, color: GREY });
  ctx.y -= 22;

  if (input.result.rows.length === 0) {
    paragraph(ctx, "No seleccionaste procesos con horas. Vuelve a la calculadora y ajusta los datos.", {
      color: GREY,
    });
  }

  input.result.rows.forEach((row, index) => {
    if (index % 2 === 1) {
      ctx.page.drawRectangle({ x: M, y: ctx.y - 6, width: CONTENT_W, height: 18, color: rgb(0.98, 0.98, 0.99) });
    }
    const label = row.label.length > 34 ? row.label.slice(0, 33) + "…" : row.label;
    text(ctx, label, colProceso, ctx.y, { size: 9 });
    textRight(ctx, `${formatNumber(row.hours)} h`, rightHoras, ctx.y, { size: 9 });
    textRight(ctx, formatCOP(row.hourCost), rightCostoHora, ctx.y, { size: 9 });
    textRight(ctx, formatCOP(row.monthlyCost), rightCostoMes, ctx.y, { size: 9, bold: true });
    ctx.y -= 18;
  });

  if (input.result.errorMonthly > 0) {
    sectionTitle(ctx, "Costo de los errores");
    paragraph(
      ctx,
      `Además del tiempo, los errores manuales suman ${formatCOP(input.result.errorMonthly)} al mes. Ese costo suele pasar desapercibido porque se paga en reprocesos, descuentos y clientes que no vuelven.`,
    );
  }

  if (input.result.topProcess) {
    sectionTitle(ctx, "Dónde empezar");
    const top = input.result.topProcess;
    ctx.page.drawRectangle({ x: M, y: ctx.y - 36, width: CONTENT_W, height: 36, color: rgb(0.996, 0.953, 0.89) });
    text(ctx, "PRIORIDAD 1", M + 12, ctx.y - 14, { size: 7.5, bold: true, color: rgb(0.54, 0.35, 0.06) });
    text(ctx, `${top.label} — ${formatCOP(top.monthlyCost)} al mes`, M + 12, ctx.y - 28, {
      size: 11.5,
      bold: true,
      color: NAVY,
    });
    ctx.y -= 48;
    paragraph(ctx, input.result.maturityNote);
  }

  // ────────── PÁGINA 2 ──────────
  newPage(ctx);

  sectionTitle(ctx, "Tu plan de 3 pasos");
  text(ctx, input.result.maturityLabel, M, ctx.y, { size: 9, bold: true, color: AMBER });
  ctx.y -= 20;

  input.plan.forEach((step, i) => {
    text(ctx, `${i + 1}.`, M + 2, ctx.y, { size: 10, bold: true, color: AMBER });
    wrap(step, ctx.regular, 9.8, CONTENT_W - 24).forEach((line) => {
      text(ctx, line, M + 22, ctx.y, { size: 9.8 });
      ctx.y -= 15;
    });
    ctx.y -= 6;
  });

  sectionTitle(ctx, "Potencial estimado");
  paragraph(
    ctx,
    `Si automatizas los procesos con mayor costo, el tiempo liberado equivaldría a entre ${formatCOP(input.result.savingsLow)} y ${formatCOP(input.result.savingsHigh)} al mes. Es un rango de referencia (60–80% del tiempo actual), no una promesa: el resultado real depende de tu operación.`,
  );

  sectionTitle(ctx, "Qué incluye el diagnóstico gratuito");
  const includes = [
    "Revisión de tu operación y de los procesos que más horas consumen.",
    "Identificación de dónde se pierden pedidos, clientes o dinero.",
    "Plan priorizado con alcance y retorno esperado.",
    "Propuesta clara, sin compromiso y sin discurso de ventas.",
  ];
  includes.forEach((item) => {
    text(ctx, "•", M + 2, ctx.y, { size: 9.8, color: AMBER });
    wrap(item, ctx.regular, 9.5, CONTENT_W - 20).forEach((line) => {
      text(ctx, line, M + 16, ctx.y, { size: 9.5 });
      ctx.y -= 14;
    });
    ctx.y -= 3;
  });

  sectionTitle(ctx, "Preguntas que suelen aparecer");
  const faq = [
    {
      q: "¿Esto es una cotización?",
      a: "No. Es un pre-diagnóstico calculado con tus propios datos. La propuesta se arma después de revisar tu operación contigo.",
    },
    {
      q: "¿Tengo que contratar algo?",
      a: "No. El diagnóstico es gratuito y sin compromiso. Si no hay encaje, te lo decimos con claridad.",
    },
    {
      q: "¿Cuánto tarda el proceso?",
      a: "El diagnóstico se agenda en la misma semana. La propuesta llega pocos días después, con alcance y tiempos definidos.",
    },
  ];
  faq.forEach((item) => {
    text(ctx, item.q, M, ctx.y, { size: 9.6, bold: true, color: NAVY });
    ctx.y -= 14;
    wrap(item.a, ctx.regular, 9.3, CONTENT_W).forEach((line) => {
      text(ctx, line, M, ctx.y, { size: 9.3, color: rgb(0.28, 0.33, 0.4) });
      ctx.y -= 13;
    });
    ctx.y -= 7;
  });

  // Bloque de cierre
  const ctaH = 62;
  ctx.y -= 8;
  ctx.page.drawRectangle({ x: M, y: ctx.y - ctaH, width: CONTENT_W, height: ctaH, color: rgb(0.945, 0.965, 0.99) });
  text(ctx, "SIGUIENTE PASO", M + 14, ctx.y - 18, { size: 7.5, bold: true, color: AMBER });
  text(ctx, "Agenda tu diagnóstico gratuito y lo revisamos contigo", M + 14, ctx.y - 34, {
    size: 11,
    bold: true,
    color: NAVY,
  });
  text(ctx, "Sin costo y sin compromiso. Respondemos el mismo día.", M + 14, ctx.y - 50, {
    size: 8.5,
    color: GREY,
  });

  // ── Pie con marca y enlaces ──
  const fy = 46;
  ctx.page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: FOOTER_H, color: NAVY });

  const c1 = M;
  const c2 = M + 196;
  const c3 = M + 382;

  const footLink = (label: string, url: string, x: number, y: number, color = WHITE, size = 9) => {
    text(ctx, label, x, y, { size, bold: true, color });
    const w = bold.widthOfTextAtSize(label, size);
    addLink(ctx, x - 2, y - 3, w + 4, 14, url);
  };

  footLink("iamkt.co", input.siteUrl, c1, fy + 24);
  footLink(input.email, `mailto:${input.email}`, c1, fy + 10, rgb(0.8, 0.86, 0.93), 8.2);

  footLink("WhatsApp +57 322 857 0784", input.whatsappUrl, c2, fy + 24, WHITE, 8.2);
  footLink("Instagram @iamkt.co", input.instagramUrl, c2, fy + 10, rgb(0.8, 0.86, 0.93), 8.2);

  footLink("facebook.com/iamktco", input.facebookUrl, c3, fy + 24, WHITE, 8.2);
  text(ctx, "Neiva, Huila · Colombia", c3, fy + 10, { size: 8.2, color: rgb(0.8, 0.86, 0.93) });

  text(ctx, "Ingeniería, IA y Marketing Digital", c1, fy - 6, { size: 7.2, color: rgb(0.62, 0.72, 0.84) });

  ctx.links.forEach((list, p) => {
    p.node.set(PDFName.of("Annots"), doc.context.obj(list));
  });

  return await doc.save();
}
