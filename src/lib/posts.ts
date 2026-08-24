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
    date: "2026-08-23",
    category: "Automatización",
    readTime: "5 min",
    published: true,
    content: [
      {
        t: "p",
        x: "La automatización para PyMEs consiste en diseñar sistemas que ejecutan tareas repetitivas con reglas claras, sin depender de que una persona copie, pegue y revise cada paso. No significa llenar la empresa de robots ni reemplazar al equipo: significa liberar tiempo operativo para que las personas se concentren en vender, atender y tomar decisiones.",
      },
      {
        t: "quote",
        x: "La mejor primera automatización no es la más sofisticada: es la tarea repetitiva que ocurre todas las semanas y que ya sabes medir.",
      },
      {
        t: "h2",
        x: "7 procesos que una PyME puede automatizar",
      },
      {
        t: "h3",
        x: "1. Respuestas y clasificación de clientes",
      },
      {
        t: "p",
        x: "Un asistente puede responder preguntas frecuentes, identificar qué necesita cada persona y clasificar la conversación antes de entregarla a un vendedor. Así el equipo recibe oportunidades mejor organizadas y el cliente no queda esperando una respuesta básica.",
      },
      {
        t: "h3",
        x: "2. Cotizaciones y seguimiento comercial",
      },
      {
        t: "p",
        x: "Después de enviar una cotización, el sistema puede programar recordatorios, registrar la respuesta y avisar cuándo una oportunidad necesita intervención humana. El seguimiento deja de depender de la memoria del vendedor.",
      },
      {
        t: "h3",
        x: "3. Facturación y cobros pendientes",
      },
      {
        t: "p",
        x: "La automatización puede enviar avisos de vencimiento, confirmar pagos y actualizar el estado de cada factura. El mensaje debe ser oportuno y respetuoso, con reglas claras para no molestar a clientes que ya pagaron.",
      },
      {
        t: "h3",
        x: "4. Agenda, reservas y recordatorios",
      },
      {
        t: "p",
        x: "Una agenda conectada puede recibir solicitudes, verificar disponibilidad, confirmar la cita y enviar un recordatorio. Este proceso reduce cruces de horario y ausencias, especialmente en servicios profesionales, restaurantes y negocios de atención al público.",
      },
      {
        t: "h3",
        x: "5. Inventario y alertas de reposición",
      },
      {
        t: "p",
        x: "Cuando el inventario baja de un mínimo, el sistema puede generar una alerta, preparar una solicitud de compra y dejar registro del movimiento. La persona responsable conserva la decisión, pero deja de revisar manualmente cada producto.",
      },
      {
        t: "h3",
        x: "6. Reportes de ventas y operación",
      },
      {
        t: "p",
        x: "En lugar de consolidar hojas de cálculo al final del día, una automatización puede reunir las ventas, agruparlas por producto o canal y entregar un resumen con los indicadores que realmente necesita la gerencia.",
      },
      {
        t: "h3",
        x: "7. Registro y actualización del CRM",
      },
      {
        t: "p",
        x: "Cada contacto, llamada, cotización o cambio de etapa puede registrarse automáticamente en el CRM. Esto evita perder contexto y permite que cualquier persona autorizada entienda qué pasó con cada cliente.",
      },
      {
        t: "h2",
        x: "¿Qué proceso conviene automatizar primero?",
      },
      {
        t: "p",
        x: "Prioriza el proceso que combina alta frecuencia, reglas relativamente estables y un costo visible cuando falla. Una tarea que ocurre 20 veces al día y consume cinco minutos cada vez representa más de 30 horas al mes: es una candidata mucho mejor que una tarea ocasional y compleja.",
      },
      {
        t: "table",
        head: ["Criterio", "Buena señal", "Señal de alerta"],
        rows: [
          ["Frecuencia", "Ocurre a diario o semanalmente", "Ocurre solo unas pocas veces al año"],
          ["Reglas", "El equipo sigue pasos repetibles", "Cada caso requiere una decisión completamente distinta"],
          ["Datos", "La información está disponible y ordenada", "Hay datos dispersos o contradictorios"],
          ["Impacto", "Mide tiempo, errores, ventas o dinero", "No existe una forma clara de medir el resultado"],
        ],
      },
      {
        t: "h2",
        x: "Herramientas típicas para empezar",
      },
      {
        t: "ul",
        x: [
          "WhatsApp Business o un canal de mensajería para atención y seguimiento.",
          "Un CRM para centralizar clientes, oportunidades y tareas comerciales.",
          "Google Sheets, Excel o una base de datos para conservar información estructurada.",
          "Conectores y APIs para unir formularios, correo, agenda, pagos y reportes.",
          "Un asistente de IA cuando el proceso requiere interpretar lenguaje, clasificar casos o redactar respuestas.",
        ],
      },
      {
        t: "h2",
        x: "Errores que conviene evitar",
      },
      {
        t: "ol",
        x: [
          "Automatizar un proceso que todavía nadie entiende. Primero se documenta, luego se optimiza.",
          "Conectar herramientas sin definir permisos, responsables y reglas de escalamiento.",
          "Medir solo si el sistema funciona, pero no si mejoró el resultado del negocio.",
          "Intentar automatizar toda la operación de una vez. Un piloto pequeño permite corregir con bajo riesgo.",
        ],
      },
      {
        t: "h2",
        x: "Una ruta práctica de implementación",
      },
      {
        t: "ol",
        x: [
          "Mapea el proceso actual y calcula cuánto tiempo, dinero o errores representa al mes.",
          "Elige una sola tarea y define el resultado esperado con una métrica concreta.",
          "Construye un piloto con permisos limitados y una ruta clara para intervención humana.",
          "Revisa los resultados durante dos o cuatro semanas y decide si conviene escalar.",
        ],
      },
      {
        t: "p",
        x: "En IAmkt ayudamos a identificar qué procesos tienen mayor retorno, conectamos las herramientas existentes y dejamos reglas que el equipo pueda entender y supervisar. El diagnóstico inicial es gratuito y sirve para priorizar una primera automatización con sentido para tu empresa.",
      },
    ],
  },
  {
    slug: "whatsapp-business-embudo-conversacional",
    title: "WhatsApp Business: cómo crear un embudo conversacional que venda mientras duermes",
    description:
      "Tus clientes ya están en WhatsApp. Aprende a convertir ese canal en una máquina de ventas con un embudo conversacional bien diseñado.",
    date: "2026-08-23",
    category: "WhatsApp Business",
    readTime: "5 min",
    published: true,
    content: [
      {
        t: "p",
        x: "Un embudo conversacional en WhatsApp es un sistema que acompaña a una persona desde su primera pregunta hasta la compra o el agendamiento, usando conversaciones útiles y reglas claras. No consiste en enviar mensajes masivos: consiste en responder rápido, entender la intención del cliente y entregar el caso a un asesor cuando hace falta.",
      },
      {
        t: "quote",
        x: "WhatsApp no vende por sí solo. Vende cuando cada conversación tiene un siguiente paso claro.",
      },
      { t: "h2", x: "Las etapas de un embudo conversacional" },
      {
        t: "table",
        head: ["Etapa", "Qué debe hacer el sistema", "Indicador"],
        rows: [
          ["Entrada", "Recibir la consulta y saludar con contexto", "Tiempo de primera respuesta"],
          ["Calificación", "Identificar necesidad, presupuesto y urgencia", "Leads calificados"],
          ["Orientación", "Resolver dudas y recomendar la opción adecuada", "Conversaciones que avanzan"],
          ["Conversión", "Cotizar, cobrar o agendar con instrucciones claras", "Ventas o citas"],
          ["Seguimiento", "Recordar el siguiente paso sin perseguir al cliente", "Recuperación de oportunidades"],
        ],
      },
      { t: "h2", x: "1. Diseña la entrada: respuesta rápida y expectativa correcta" },
      {
        t: "p",
        x: "El primer mensaje debe confirmar que la consulta fue recibida y explicar qué puede resolver el canal. Una bienvenida breve con opciones concretas reduce la fricción: comprar, pedir una cotización, consultar disponibilidad o hablar con un asesor. Evita menús interminables; tres o cuatro caminos suelen ser suficientes.",
      },
      { t: "h2", x: "2. Califica sin convertir la conversación en un interrogatorio" },
      {
        t: "p",
        x: "La calificación debe recoger solo la información que cambia la decisión comercial. Según el negocio, puede incluir producto o servicio de interés, ciudad, cantidad, fecha deseada y rango de presupuesto. Haz una pregunta a la vez y permite que el cliente pida una persona en cualquier momento.",
      },
      {
        t: "ul",
        x: [
          "Usa lenguaje natural y respuestas cortas, no formularios disfrazados.",
          "Guarda las respuestas en el CRM para que el asesor no repita preguntas.",
          "Define una ruta de prioridad para clientes listos para comprar o con solicitudes urgentes.",
          "Escala a una persona cuando haya reclamos, negociación, datos sensibles o una excepción.",
        ],
      },
      { t: "h2", x: "3. Conecta catálogo, agenda y pagos" },
      {
        t: "p",
        x: "El embudo se vuelve útil cuando puede consultar información real. Conecta el catálogo o la base de servicios, verifica disponibilidad, propone horarios y entrega un enlace de pago confiable. Si el sistema no puede confirmar un dato, debe decirlo y derivar el caso, nunca inventar una respuesta.",
      },
      { t: "h2", x: "4. Automatiza el seguimiento con permiso" },
      {
        t: "p",
        x: "Una oportunidad no siempre se pierde por falta de interés: a veces el cliente necesita tiempo o se distrae. Programa uno o dos recordatorios relacionados con la conversación original, incluye una salida sencilla y detén los mensajes cuando la persona compre, responda que no está interesada o pida no recibir más comunicaciones.",
      },
      { t: "h2", x: "Errores que dañan la conversión" },
      {
        t: "ol",
        x: [
          "Responder con un texto genérico que no reconoce lo que el cliente preguntó.",
          "Ocultar la opción de hablar con una persona.",
          "Prometer precios, inventario o tiempos sin consultar una fuente actualizada.",
          "Enviar promociones sin consentimiento o sin respetar las solicitudes de salida.",
          "Medir mensajes enviados en lugar de conversaciones calificadas, ventas y tiempos de atención.",
        ],
      },
      { t: "h2", x: "Métricas mínimas para saber si funciona" },
      {
        t: "p",
        x: "Mide el tiempo de primera respuesta, la tasa de calificación, el porcentaje de conversaciones que llega a cotización, la conversión a venta y el tiempo que un asesor dedica a cada caso. También revisa conversaciones fallidas cada semana: allí aparecen las preguntas que faltan y las reglas que deben mejorar.",
      },
      {
        t: "p",
        x: "En IAmkt diseñamos embudos conversacionales para WhatsApp conectados con los procesos y herramientas reales de cada empresa. El primer paso es mapear las preguntas frecuentes, los momentos de intervención humana y el resultado que quieres medir.",
      },
    ],
  },
  {
    slug: "cuanto-cuesta-marketing-digital-colombia",
    title: "¿Cuánto cuesta el marketing digital en Colombia? Guía de precios 2026",
    description:
      "Rangos reales de precios por servicio de marketing digital en Colombia: community management, pauta, SEO, desarrollo y automatización. Qué incluye cada uno y cómo evitar sobrepagar.",
    date: "2026-08-23",
    category: "Marketing Digital",
    readTime: "7 min",
    published: true,
    content: [
      {
        t: "p",
        x: "El costo del marketing digital en Colombia depende del objetivo, el nivel de especialización y la inversión en medios. No es lo mismo publicar contenido para mantener presencia que construir un sistema de captación con pauta, SEO, automatización y medición. Esta guía presenta rangos orientativos para 2026 y explica qué revisar antes de comparar propuestas.",
      },
      {
        t: "quote",
        x: "Una propuesta barata puede ser costosa si no define qué resultado, entregables y mediciones incluye.",
      },
      { t: "h2", x: "Rangos de precios de marketing digital en Colombia" },
      {
        t: "table",
        head: ["Servicio", "Rango mensual orientativo", "Qué suele incluir"],
        rows: [
          ["Community management", "$800.000 – $2.500.000 COP", "Calendario, piezas, publicaciones y moderación básica"],
          ["Pauta digital", "$1.000.000 – $4.000.000 COP + inversión", "Configuración, campañas, optimización y reporte"],
          ["SEO", "$1.500.000 – $5.000.000 COP", "Auditoría, contenidos, optimización técnica y seguimiento"],
          ["Página web o landing", "$2.000.000 – $10.000.000 COP", "Diseño, desarrollo, analítica y puesta en producción"],
          ["Automatización e IA", "$2.000.000 – $12.000.000 COP", "Diagnóstico, integración, pruebas y capacitación"],
        ],
      },
      { t: "h2", x: "1. Community management: presencia y conversación" },
      {
        t: "p",
        x: "El servicio básico suele cubrir estrategia editorial, diseño de piezas, redacción, publicación y respuesta a comentarios. El precio sube cuando se necesitan videos frecuentes, sesiones de fotografía, atención extendida, varias redes o una estrategia enfocada en generar leads. Pregunta cuántas piezas, revisiones y canales están incluidos.",
      },
      { t: "h2", x: "2. Publicidad digital: el servicio no es el presupuesto" },
      {
        t: "p",
        x: "En pauta digital hay dos costos separados: los honorarios de gestión y el dinero que se paga a Meta, Google u otra plataforma. Una empresa puede invertir desde $500.000 COP al mes para validar una oferta local, pero el presupuesto correcto depende del ticket, el margen, la zona y el costo aceptable por cliente. Nunca confundas inversión publicitaria con la tarifa de operación.",
      },
      { t: "h2", x: "3. SEO: una inversión acumulativa" },
      {
        t: "p",
        x: "El SEO combina investigación de búsquedas, contenido útil, estructura técnica, enlaces internos y medición. Es normal que los resultados tarden más que una campaña de anuncios, pero los activos creados pueden seguir atrayendo visitas después de publicarse. Desconfía de quien prometa posiciones exactas o resultados garantizados en pocos días.",
      },
      { t: "h2", x: "4. Web, landing y conversión" },
      {
        t: "p",
        x: "Una landing enfocada en una campaña puede costar menos que un sitio corporativo completo. El presupuesto aumenta si incluye textos estratégicos, identidad visual, integraciones, panel administrativo, analítica, SEO técnico o funcionalidades a la medida. El entregable debe especificar dominio, hosting, mantenimiento, propiedad del código y soporte posterior.",
      },
      { t: "h2", x: "5. Automatización e inteligencia artificial" },
      {
        t: "p",
        x: "La automatización se cotiza mejor por proceso que por número de herramientas. Un flujo sencillo de formularios y correo puede ser económico; una solución conectada a WhatsApp, CRM, inventario y pagos exige más diseño, pruebas y controles. Además del desarrollo inicial, considera el costo mensual de APIs, mensajes, almacenamiento y modelos de IA.",
      },
      { t: "h2", x: "Qué debe incluir una buena propuesta" },
      {
        t: "ul",
        x: [
          "Objetivo de negocio y métrica principal, no solo una lista de publicaciones.",
          "Alcance exacto: canales, cantidad de piezas, campañas, reuniones y entregables.",
          "Responsabilidades del cliente y del proveedor, incluidos tiempos de aprobación.",
          "Presupuesto de medios separado de honorarios, impuestos y costos de terceros.",
          "Forma de reporte, frecuencia de revisión y condiciones para cancelar o escalar.",
        ],
      },
      { t: "h2", x: "Cómo elegir sin sobrepagar" },
      {
        t: "ol",
        x: [
          "Define qué quieres conseguir en los próximos 90 días: visibilidad, leads, ventas o eficiencia.",
          "Pide dos o tres propuestas con el mismo alcance para comparar de forma justa.",
          "Solicita ejemplos de trabajo y pregunta cómo medirán el resultado.",
          "Empieza con un alcance controlado y una revisión mensual basada en datos.",
        ],
      },
      {
        t: "p",
        x: "En IAmkt combinamos marketing, desarrollo y automatización para que la inversión digital se conecte con una meta medible. Podemos ayudarte a separar lo urgente de lo importante y a construir una primera fase acorde con el presupuesto y la capacidad operativa de tu empresa.",
      },
    ],
  },
  {
    slug: "ia-en-el-agro-colombiano",
    title: "IA en el agro colombiano: automatización y agricultura de precisión para pequeños y medianos productores",
    description:
      "El campo colombiano está listo para la tecnología. Casos concretos de IA aplicada al agro: riego, monitoreo de cultivos, trazabilidad y ventas digitales con retorno real.",
    date: "2026-08-23",
    category: "IA + Agro",
    readTime: "6 min",
    published: true,
    content: [
      {
        t: "p",
        x: "La inteligencia artificial en el agro colombiano no empieza necesariamente con drones o maquinaria autónoma. Empieza con mejores decisiones: saber cuándo regar, detectar cambios en un cultivo, ordenar los registros de campo y conectar la producción con compradores. Para pequeños y medianos productores, la tecnología debe resolver un problema concreto y pagar su costo con ahorro, productividad o mejores ventas.",
      },
      {
        t: "quote",
        x: "La mejor tecnología agrícola es la que el productor puede usar, entender y convertir en una decisión rentable.",
      },
      { t: "h2", x: "¿Qué significa usar IA en el agro?" },
      {
        t: "p",
        x: "La IA analiza datos para encontrar patrones, hacer predicciones o recomendar acciones. En una finca puede trabajar con registros de lluvia, temperatura, humedad del suelo, imágenes, costos, inventario y precios. No reemplaza el conocimiento del productor: lo organiza y lo complementa para reducir decisiones basadas únicamente en intuición.",
      },
      { t: "h2", x: "4 aplicaciones con retorno potencial" },
      { t: "h3", x: "1. Riego y fertilización más precisos" },
      {
        t: "p",
        x: "Con datos de clima, suelo y etapa del cultivo, un sistema puede recomendar cuándo revisar o ajustar el riego y detectar sectores que se comportan distinto. La recomendación debe validarse en campo, pero evita regar por rutina y ayuda a priorizar visitas donde hay señales de estrés.",
      },
      { t: "h3", x: "2. Monitoreo de cultivos e identificación temprana" },
      {
        t: "p",
        x: "Fotografías tomadas por el equipo, cámaras o imágenes satelitales pueden compararse para localizar cambios de color, vigor o cobertura. La IA sirve como sistema de alerta; el diagnóstico agronómico y la decisión de tratamiento siguen siendo responsabilidad de personal competente.",
      },
      { t: "h3", x: "3. Trazabilidad y control de costos" },
      {
        t: "p",
        x: "Registrar lote, labor, insumo, fecha, responsable y resultado permite conocer el costo real por unidad producida. Un asistente puede ordenar notas de voz o formularios, detectar registros incompletos y generar reportes para comparar campañas sin reconstruir la información desde cuadernos dispersos.",
      },
      { t: "h3", x: "4. Pronóstico de demanda y ventas digitales" },
      {
        t: "p",
        x: "Cuando se combinan históricos de venta, calendario, volumen disponible y conversaciones con compradores, es posible planear mejor cosecha, empaque y distribución. WhatsApp y un catálogo actualizado también ayudan a vender directamente y a reducir la dependencia de un solo intermediario.",
      },
      { t: "h2", x: "Datos mínimos para comenzar" },
      {
        t: "table",
        head: ["Dato", "Ejemplo", "Para qué sirve"],
        rows: [
          ["Producción", "Lote, variedad, fecha y cantidad", "Comparar rendimientos"],
          ["Clima y suelo", "Lluvia, temperatura y humedad", "Apoyar decisiones de manejo"],
          ["Labores e insumos", "Actividad, costo y responsable", "Calcular costos reales"],
          ["Ventas", "Cliente, precio, volumen y fecha", "Planear demanda y comercialización"],
        ],
      },
      {
        t: "p",
        x: "No es necesario tener todos los sensores desde el primer día. Un registro consistente en una hoja de cálculo o formulario puede ser más valioso que muchos dispositivos cuyos datos nadie revisa. La prioridad es definir qué decisión se quiere mejorar y qué información hace falta para tomarla.",
      },
      { t: "h2", x: "Ruta de implementación para una finca o empresa agropecuaria" },
      {
        t: "ol",
        x: [
          "Elige un problema medible: consumo de agua, pérdidas, costos, trazabilidad o ventas.",
          "Organiza tres a seis meses de datos disponibles y define quién los registrará.",
          "Prueba una solución en un lote, producto o canal comercial antes de escalar.",
          "Compara el resultado con una línea base y documenta qué decisiones cambió la herramienta.",
          "Escala solo cuando el equipo pueda operar el sistema y el retorno sea visible.",
        ],
      },
      { t: "h2", x: "Riesgos que deben controlarse" },
      {
        t: "ul",
        x: [
          "Datos incompletos o sesgados que producen recomendaciones poco confiables.",
          "Dependencia de una plataforma sin copias de seguridad ni posibilidad de exportar la información.",
          "Promesas de diagnóstico automático que ignoran la validación de un profesional del agro.",
          "Exposición de datos productivos, comerciales o personales sin permisos definidos.",
        ],
      },
      {
        t: "p",
        x: "En IAmkt ayudamos a convertir necesidades agrícolas en sistemas simples de registro, análisis y automatización. El punto de partida es un diagnóstico del proceso, los datos disponibles y la decisión que debe mejorar; después se diseña un piloto que el equipo pueda usar en la operación diaria.",
      },
    ],
  },
];

export function getPublishedPosts(): Post[] {
  return POSTS.filter((p) => p.published).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
