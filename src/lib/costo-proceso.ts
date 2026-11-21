// Modelo de cálculo del pre-diagnóstico de costos.
// Todo se deriva de los datos que ingresa el visitante; no se usan promedios inventados.

export type Sector = "restaurante" | "distribuidora" | "comercio" | "servicios" | "otro";

export type RoleKey = "auxiliar" | "vendedor" | "administrador" | "gerente";

export type ProcessKey =
  | "pedidos"
  | "confirmacion"
  | "inventario"
  | "facturacion"
  | "reportes"
  | "consultas"
  | "agenda";

export const ROLES: Record<RoleKey, { label: string; salary: number }> = {
  auxiliar: { label: "Auxiliar / operativo", salary: 1300000 },
  vendedor: { label: "Vendedor / asesor", salary: 1600000 },
  administrador: { label: "Administrador / coordinador", salary: 2500000 },
  gerente: { label: "Gerente / dueño", salary: 4000000 },
};

export const SECTORS: Record<Sector, { label: string }> = {
  restaurante: { label: "Restaurante o gastronomía" },
  distribuidora: { label: "Distribuidora o agroinsumos" },
  comercio: { label: "Comercio o almacén" },
  servicios: { label: "Servicios profesionales" },
  otro: { label: "Otro tipo de negocio" },
};

export const PROCESSES: {
  key: ProcessKey;
  label: string;
  role: RoleKey;
  hint: string;
}[] = [
  { key: "pedidos", label: "Toma de pedidos", role: "auxiliar", hint: "WhatsApp, teléfono o mostrador" },
  { key: "confirmacion", label: "Confirmación y seguimiento", role: "auxiliar", hint: "Avisar, cobrar, recordar" },
  { key: "inventario", label: "Inventario y conteo", role: "auxiliar", hint: "Contar, cuadrar, reponer" },
  { key: "facturacion", label: "Facturación y cartera", role: "administrador", hint: "Facturar y cobrar" },
  { key: "reportes", label: "Reportes para decidir", role: "administrador", hint: "Armar cifras del mes" },
  { key: "consultas", label: "Responder consultas", role: "auxiliar", hint: "Las mismas preguntas de siempre" },
  { key: "agenda", label: "Agenda y reservas", role: "auxiliar", hint: "Citas, mesas, turnos" },
];

// Horas por semana típicas según el sector. El visitante las ajusta a su realidad.
const SECTOR_HOURS: Record<Sector, Record<ProcessKey, number>> = {
  restaurante: { pedidos: 10, confirmacion: 4, inventario: 5, facturacion: 2, reportes: 2, consultas: 6, agenda: 2 },
  distribuidora: { pedidos: 14, confirmacion: 6, inventario: 12, facturacion: 6, reportes: 4, consultas: 5, agenda: 0 },
  comercio: { pedidos: 8, confirmacion: 3, inventario: 6, facturacion: 3, reportes: 2, consultas: 5, agenda: 0 },
  servicios: { pedidos: 3, confirmacion: 5, inventario: 0, facturacion: 3, reportes: 2, consultas: 8, agenda: 6 },
  otro: { pedidos: 5, confirmacion: 3, inventario: 3, facturacion: 2, reportes: 2, consultas: 4, agenda: 2 },
};

export interface ProcessRow {
  key: ProcessKey;
  label: string;
  enabled: boolean;
  hours: number;
  role: RoleKey;
}

export interface CalcInput {
  businessName: string;
  sector: Sector;
  employees: number;
  processes: ProcessRow[];
  errorsPerMonth: number;
  costPerError: number;
}

export interface ProcessResultRow extends ProcessRow {
  hourCost: number;
  monthlyCost: number;
  annualCost: number;
}

export interface CalcResult {
  rows: ProcessResultRow[];
  hoursPerMonth: number;
  laborMonthly: number;
  errorMonthly: number;
  totalMonthly: number;
  totalAnnual: number;
  savingsLow: number;
  savingsHigh: number;
  topProcess: ProcessResultRow | null;
  maturity: "alto" | "medio" | "bajo";
  maturityLabel: string;
  maturityNote: string;
}

export function hourCost(role: RoleKey): number {
  return (ROLES[role].salary * 1.5) / 192;
}

export function defaultProcesses(sector: Sector): ProcessRow[] {
  const hours = SECTOR_HOURS[sector];
  return PROCESSES.map((p) => ({
    key: p.key,
    label: p.label,
    enabled: hours[p.key] > 0,
    hours: hours[p.key],
    role: p.role,
  }));
}

export function formatCOP(value: number): string {
  return "$" + Math.round(value).toLocaleString("es-CO");
}

export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString("es-CO");
}

export function calculate(input: CalcInput): CalcResult {
  const rows: ProcessResultRow[] = input.processes
    .filter((p) => p.enabled && p.hours > 0)
    .map((p) => {
      const hc = hourCost(p.role);
      const monthlyCost = p.hours * 4.3 * hc;
      return { ...p, hourCost: hc, monthlyCost, annualCost: monthlyCost * 12 };
    })
    .sort((a, b) => b.monthlyCost - a.monthlyCost);

  const laborMonthly = rows.reduce((acc, r) => acc + r.monthlyCost, 0);
  const hoursPerMonth = rows.reduce((acc, r) => acc + r.hours * 4.3, 0);
  const errorMonthly = Math.max(0, input.errorsPerMonth) * Math.max(0, input.costPerError);
  const totalMonthly = laborMonthly + errorMonthly;

  // Rango de ahorro potencial: 60% a 80% del costo laboral. Es un supuesto explícito,
  // no una promesa. El costo de errores se reduce aparte.
  const savingsLow = laborMonthly * 0.6;
  const savingsHigh = laborMonthly * 0.8;

  const employees = Math.max(1, input.employees);
  const hoursPerEmployee = hoursPerMonth / employees;
  let maturity: CalcResult["maturity"] = "bajo";
  if (hoursPerEmployee >= 60) maturity = "alto";
  else if (hoursPerEmployee >= 30) maturity = "medio";

  const maturityLabel =
    maturity === "alto" ? "Alta oportunidad" : maturity === "medio" ? "Oportunidad media" : "Oportunidad moderada";

  const maturityNote =
    maturity === "alto"
      ? "Tu equipo dedica una parte muy alta del mes a tareas repetitivas. Hay margen claro para automatizar sin contratar."
      : maturity === "medio"
        ? "Hay un volumen relevante de trabajo repetitivo. Automatizar dos procesos puede liberar semanas de trabajo al año."
        : "El volumen repetitivo es moderado, pero conviene atacar el proceso con mayor costo antes de que crezca.";

  return {
    rows,
    hoursPerMonth,
    laborMonthly,
    errorMonthly,
    totalMonthly,
    totalAnnual: totalMonthly * 12,
    savingsLow,
    savingsHigh,
    topProcess: rows[0] ?? null,
    maturity,
    maturityLabel,
    maturityNote,
  };
}

export function sectorPlan(sector: Sector): string[] {
  switch (sector) {
    case "restaurante":
      return [
        "Carta QR por mesa con pedidos que llegan directo a cocina.",
        "Pantalla de cocina y alertas al mesero para no perder comandas.",
        "Caja, inventario con recetas y reportes del día automáticos.",
      ];
    case "distribuidora":
      return [
        "Pedidos de WhatsApp que entran ordenados a un CRM, sin transcribir.",
        "Inventario por almacén con descuento automático al despachar.",
        "Facturación y cartera conectadas al mismo flujo del pedido.",
      ];
    case "comercio":
      return [
        "Catálogo digital con pedidos directos a WhatsApp.",
        "Inventario y alertas de reposición por producto.",
        "Reporte diario de ventas sin armar Excel a mano.",
      ];
    case "servicios":
      return [
        "Agenda en línea con recordatorios automáticos.",
        "Seguimiento de clientes y propuestas sin perseguir a nadie.",
        "Reportes de ingresos y cobro en un solo panel.",
      ];
    default:
      return [
        "Centralizar los pedidos y consultas en un solo canal.",
        "Automatizar las tareas que se repiten todos los días.",
        "Medir el antes y el después para decidir el siguiente paso.",
      ];
  }
}
