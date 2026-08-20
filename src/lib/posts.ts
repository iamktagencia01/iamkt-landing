// Contenido del blog de IAmkt — estructura de bloques para renderizar artículos
// Criterio GEO: párrafos auto-contenidos, definiciones directas, listas y tablas citables.

export type Block =
  | { t: "p"; x: string }
  | { t: "h2"; x: string }
  | { t: "h3"; x: string }
  | { t: "ul"; x: string[] }
  | { t: "ol"; x: string[] }
  | { t: "quote"; x: string }
  | { t: "table"; head: string[]; rows: string[][] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  published: boolean;
  content: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "que-es-un-agente-de-ia",
    title: "¿Qué es un agente de IA y cómo puede trabajar en tu empresa?",
    description:
      "Un agente de IA es un trabajador virtual que planifica, decide y ejecuta tareas de forma autónoma. Te explicamos qué es, qué hace en la práctica, qué necesitas para implementarlo y cuánto cuesta.",
    date: "2026-08-20",
    category: "IA Aplicada",
    readTime: "6 min",
    published: true,
    content: [
      {
        t: "p",
        x: "Un agente de IA es un programa que usa inteligencia artificial para realizar tareas de forma autónoma, con un objetivo claro y sin que una persona tenga que supervisar cada paso. A diferencia de una herramienta tradicional, que espera órdenes, un agente planifica, decide y ejecuta dentro de reglas definidas. Para una empresa, funciona como un trabajador virtual disponible las 24 horas, los 7 días de la semana.",
      },
      {
        t: "h2",
        x: "Chatbot vs agente: la diferencia clave",
      },
      {
        t: "p",
        x: "La confusión más común es llamar agente a cualquier chatbot. La diferencia es estructural: el chatbot reacciona, el agente resuelve. Un chatbot responde a preguntas predefinidas y se detiene cuando el cliente se sale del guion. Un agente recibe un objetivo (por ejemplo, calificar un lead), decide qué pasos seguir, usa las herramientas disponibles (base de datos, WhatsApp, correo, CRM) y sabe cuándo escalar el caso a una persona.",
      },
      {
        t: "table",
        head: ["Característica", "Chatbot", "Agente de IA"],
        rows: [
          ["Comportamiento", "Reactivo: responde lo que le programaron", "Proactivo: planifica y ejecuta para lograr un objetivo"],
          ["Herramientas", "Solo conversación", "Se conecta a tu base de datos, correo, CRM y APIs"],
          ["Toma de decisiones", "Ninguna", "Evalúa opciones y decide dentro de reglas"],
          ["Escalamiento a humano", "No", "Sí: sabe cuándo pasar el caso"],
          ["Mejora continua", "Manual", "Se ajusta con la supervisión inicial"],
        ],
      },
      {
        t: "h2",
        x: "5 tareas reales que un agente de IA puede hacer hoy en tu empresa",
      },
      {
        t: "p",
        x: "No hace falta fantasear con robots: los agentes de IA ya trabajan en tareas concretas y medibles. Estos son cinco ejemplos que cualquier PyME puede implementar en semanas, no en meses.",
      },
      {
        t: "ol",
        x: [
          "Atender WhatsApp y calificar clientes: responde al instante, responde preguntas frecuentes, agenda citas y pasa a un humano solo cuando el cliente está listo para comprar.",
          "Dar seguimiento a cotizaciones y facturas pendientes: recuerda a cada cliente su cotización vencida, pide confirmación de pago y actualiza el estado en tu sistema.",
          "Generar reportes de ventas, inventario y comportamiento: consulta tus datos, los resume y te entrega el informe listo para decidir, todos los días a la misma hora.",
          "Gestionar agenda y recordatorios: coordina reuniones, confirma citas y avisa a tu equipo de los compromisos del día sin depender de un asistente humano.",
          "Alimentar tu CRM con datos limpios: registra cada interacción, clasifica el cliente por etapa y actualiza la información sin errores de digitación.",
        ],
      },
      {
        t: "h2",
        x: "¿Qué necesita tu empresa para implementar un agente de IA?",
      },
      {
        t: "p",
        x: "La tecnología es la parte fácil. Lo que realmente determina el éxito es el proceso que hay detrás. Antes de contratar un agente, verifica que tienes estas cuatro cosas:",
      },
      {
        t: "ul",
        x: [
          "Un proceso claro y definido. El agente automatiza lo que tú ya entiendes. Si el proceso es un caos, la automatización solo producirá caos más rápido.",
          "Acceso a los datos y herramientas. El agente necesita conectarse a tu base de datos, WhatsApp, correo o CRM. Cuanto más limpia esté la información, mejor trabajará.",
          "Reglas de escalamiento. Define exactamente cuándo el agente pasa el caso a un humano: montos altos, quejas, clientes VIP, o cualquier situación que tú decidas.",
          "Supervisión inicial. Un agente se entrena con tu negocio: las primeras semanas se revisa, se corrigen decisiones y se afinan las reglas. Después opera solo, con auditoría periódica.",
        ],
      },
      {
        t: "h2",
        x: "¿Cuánto cuesta un agente de IA en Colombia?",
      },
      {
        t: "p",
        x: "Los precios varían según el alcance, pero estos rangos dan una referencia real del mercado colombiano. Incluyen implementación y configuración; la operación mensual depende del proveedor de IA y del volumen de uso.",
      },
      {
        t: "table",
        head: ["Tipo de agente", "Implementación (COP)", "Ejemplo de uso"],
        rows: [
          ["Simple", "$500.000 – $1.500.000", "Atención de WhatsApp, agenda y respuestas frecuentes"],
          ["Intermedio", "$1.500.000 – $4.000.000", "Integración con CRM, seguimiento de cotizaciones y reportes"],
          ["Avanzado", "$4.000.000 en adelante", "IA a la medida con varias herramientas y procesos complejos"],
        ],
      },
      {
        t: "p",
        x: "La inversión se recupera rápido: un agente que atiende 200 conversaciones al mes reemplaza horas de un empleado dedicado a esa tarea y nunca deja de responder, ni en fines de semana ni en temporada alta.",
      },
      {
        t: "h2",
        x: "Por dónde empezar en 3 pasos",
      },
      {
        t: "ol",
        x: [
          "Identifica una tarea repetitiva que te robe horas cada semana. Esa será tu candidata número uno: cuanto más repetitiva, más retorno.",
          "Define el objetivo y las reglas por escrito. Qué debe lograr el agente, qué información maneja y en qué casos interviene un humano.",
          "Haz una prueba piloto con una sola tarea. Mide antes y después: tiempo ahorrado, respuestas atendidas, ventas recuperadas. Con resultados, escala al siguiente proceso.",
        ],
      },
      {
        t: "quote",
        x: "Un agente de IA bien implementado no reemplaza a tu equipo: le quita el trabajo repetitivo para que se dedique a lo que de verdad mueve la empresa.",
      },
      {
        t: "p",
        x: "En IAmkt diseñamos e implementamos agentes de IA a la medida de cada negocio, desde la identificación del proceso hasta la puesta en marcha y el acompañamiento continuo. Si quieres saber qué tarea de tu empresa es la mejor candidata para empezar, el diagnóstico inicial es gratuito y sin compromiso.",
      },
    ],
  },
  {
    slug: "automatizacion-para-pymes-7-procesos",
    title: "Automatización para PyMEs: 7 procesos que puedes automatizar sin contratar más personal",
    description:
      "La automatización no es solo para grandes empresas. Estos 7 procesos pueden automatizarse en cualquier PyME con herramientas accesibles y presupuesto ajustado.",
    date: "2026-08-27",
    category: "Automatización",
    readTime: "5 min",
    published: false,
    content: [],
  },
  {
    slug: "whatsapp-business-embudo-conversacional",
    title: "WhatsApp Business: cómo crear un embudo conversacional que venda mientras duermes",
    description:
      "Tus clientes ya están en WhatsApp. Aprende a convertir ese canal en una máquina de ventas con un embudo conversacional bien diseñado.",
    date: "2026-09-03",
    category: "WhatsApp Business",
    readTime: "5 min",
    published: false,
    content: [],
  },
  {
    slug: "cuanto-cuesta-marketing-digital-colombia",
    title: "¿Cuánto cuesta el marketing digital en Colombia? Guía de precios 2026",
    description:
      "Rangos reales de precios por servicio de marketing digital en Colombia: community management, pauta, SEO, desarrollo y automatización. Qué incluye cada uno y cómo evitar sobrepagar.",
    date: "2026-09-10",
    category: "Marketing Digital",
    readTime: "7 min",
    published: false,
    content: [],
  },
  {
    slug: "ia-en-el-agro-colombiano",
    title: "IA en el agro colombiano: automatización y agricultura de precisión para pequeños y medianos productores",
    description:
      "El campo colombiano está listo para la tecnología. Casos concretos de IA aplicada al agro: riego, monitoreo de cultivos, trazabilidad y ventas digitales con retorno real.",
    date: "2026-09-17",
    category: "IA + Agro",
    readTime: "6 min",
    published: false,
    content: [],
  },
];

export function getPublishedPosts(): Post[] {
  return POSTS.filter((p) => p.published).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
