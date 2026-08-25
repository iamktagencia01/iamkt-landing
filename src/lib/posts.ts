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
  image: string;
  imageAlt: string;
  date: string;
  category: string;
  readTime: string;
  published: boolean;
  faq: { q: string; a: string }[];
  content: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "que-es-un-agente-de-ia",
    title: "¿Qué es un agente de IA y cómo puede trabajar en tu empresa?",
    description:
      "Un agente de IA es un trabajador virtual que planifica, decide y ejecuta tareas de forma autónoma. Te explicamos qué es, qué hace en la práctica, qué necesitas para implementarlo y cuánto cuesta.",
    image: "/blog-images/agente-ia.png",
    imageAlt: "Centro de operaciones con inteligencia artificial conectado a CRM, agenda y analítica",
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
        t: "p",
        x: "Si aún no tienes claro qué procesos conviene automatizar primero, nuestra guía de [automatización para PyMEs](/blog/automatizacion-para-pymes-7-procesos) te muestra siete candidatas concretas con criterios para elegir la primera.",
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
        t: "p",
        x: "Para comparar con el resto de servicios digitales del mercado, revisa nuestra guía de [precios de marketing digital en Colombia](/blog/cuanto-cuesta-marketing-digital-colombia).",
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
    faq: [
      {
        q: "¿Qué es un agente de IA?",
        a: "Es un programa que usa inteligencia artificial para realizar tareas de forma autónoma: planifica, decide y ejecuta dentro de reglas definidas, sin que una persona supervise cada paso. Funciona como un trabajador virtual disponible 24/7.",
      },
      {
        q: "¿Cuál es la diferencia entre un chatbot y un agente de IA?",
        a: "El chatbot reacciona con respuestas predefinidas y se detiene cuando la conversación sale del guion. El agente recibe un objetivo, usa herramientas como el CRM, WhatsApp o la base de datos, y escala a un humano cuando corresponde.",
      },
      {
        q: "¿Qué tareas puede hacer un agente de IA en una PyME?",
        a: "Atender WhatsApp y calificar clientes, dar seguimiento a cotizaciones y facturas pendientes, generar reportes de ventas e inventario, gestionar agenda y recordatorios, y mantener el CRM actualizado con datos limpios.",
      },
      {
        q: "¿Cuánto cuesta implementar un agente de IA en Colombia?",
        a: "Entre $500.000 y $1.500.000 COP para un agente simple, de $1.500.000 a $4.000.000 para uno intermedio con integración a CRM, y desde $4.000.000 para soluciones avanzadas a la medida con varias herramientas y procesos complejos.",
      },
    ],
  },
  {
    slug: "automatizacion-para-pymes-7-procesos",
    title: "Automatización para PyMEs: 7 procesos que puedes automatizar sin contratar más personal",
    description:
      "La automatización no es solo para grandes empresas. Estos 7 procesos pueden automatizarse en cualquier PyME con herramientas accesibles y presupuesto ajustado.",
    image: "/blog-images/automatizacion.png",
    imageAlt: "Flujo visual de automatización que convierte tareas repetitivas en resultados medibles",
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
        t: "p",
        x: "Cuando el asistente no solo clasifica, sino que ejecuta tareas con tus sistemas, ya estás hablando de un [agente de IA](/blog/que-es-un-agente-de-ia).",
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
          "[WhatsApp Business](/blog/whatsapp-business-embudo-conversacional) o un canal de mensajería para atención y seguimiento.",
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
        x: "En IAmkt ayudamos a identificar qué procesos tienen mayor retorno, conectamos las herramientas existentes y dejamos reglas que el equipo pueda entender y supervisar. En la página de [casos de éxito](/casos-de-exito) puedes ver dos implementaciones reales con ahorros estimados en horas y dinero. El diagnóstico inicial es gratuito y sirve para priorizar una primera automatización con sentido para tu empresa.",
      },
    ],
    faq: [
      {
        q: "¿Qué es la automatización para PyMEs?",
        a: "Es diseñar sistemas que ejecutan tareas repetitivas con reglas claras, liberando tiempo del equipo para vender, atender y tomar decisiones. No reemplaza personas: elimina el trabajo mecánico.",
      },
      {
        q: "¿Qué procesos conviene automatizar primero?",
        a: "Los que combinan alta frecuencia, reglas estables y un costo visible cuando fallan. Una tarea diaria que consume cinco minutos representa más de 30 horas al mes y es mucho mejor candidata que una tarea ocasional.",
      },
      {
        q: "¿Qué herramientas se necesitan para empezar?",
        a: "WhatsApp Business o un canal de mensajería, un CRM para centralizar clientes, una base de datos como Google Sheets o Excel, conectores y APIs para unir sistemas, y un asistente de IA cuando hay que interpretar lenguaje o clasificar casos.",
      },
      {
        q: "¿La automatización reemplaza empleados?",
        a: "No. Quita tareas repetitivas para que las personas se concentren en lo que de verdad mueve el negocio: vender, atender y decidir. El objetivo es productividad, no reducción de plantilla.",
      },
    ],
  },
  {
    slug: "whatsapp-business-embudo-conversacional",
    title: "WhatsApp Business: cómo crear un embudo conversacional que venda mientras duermes",
    description:
      "Tus clientes ya están en WhatsApp. Aprende a convertir ese canal en una máquina de ventas con un embudo conversacional bien diseñado.",
    image: "/blog-images/whatsapp.png",
    imageAlt: "Smartphone conectado a un flujo de conversaciones y oportunidades comerciales",
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
        t: "p",
        x: "Guardar esas respuestas en el CRM sin que el asesor repita preguntas es exactamente lo que hace un [agente de IA](/blog/que-es-un-agente-de-ia) por tu equipo.",
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
        x: "En IAmkt diseñamos embudos conversacionales para WhatsApp conectados con los procesos y herramientas reales de cada empresa. Un caso real es Dasagro 360, que centralizó en un CRM los pedidos que llegaban por WhatsApp, con facturación e inventario integrados; el detalle está en nuestros [casos de éxito](/casos-de-exito). El primer paso es mapear las preguntas frecuentes, los momentos de intervención humana y el resultado que quieres medir.",
      },
    ],
    faq: [
      {
        q: "¿Qué es un embudo conversacional en WhatsApp?",
        a: "Es un sistema que acompaña a la persona desde su primera pregunta hasta la compra o el agendamiento, con respuestas útiles y reglas claras, y que escala el caso a un asesor cuando hace falta.",
      },
      {
        q: "¿Es lo mismo enviar mensajes masivos?",
        a: "No. El embudo responde según la intención de cada persona, guarda el contexto en el CRM y respeta los permisos. El mensaje masivo ignora la conversación y daña la confianza del cliente.",
      },
      {
        q: "¿Qué métricas indican que el embudo funciona?",
        a: "El tiempo de primera respuesta, la cantidad de leads calificados, las conversaciones que llegan a cotización, la conversión a venta y el tiempo que dedica un asesor por caso.",
      },
      {
        q: "¿Cuándo debe intervenir una persona?",
        a: "En reclamos, negociación, datos sensibles o excepciones a las reglas. El sistema debe ofrecer siempre una salida clara hacia un humano, nunca encerrar al cliente en un menú.",
      },
    ],
  },
  {
    slug: "cuanto-cuesta-marketing-digital-colombia",
    title: "¿Cuánto cuesta el marketing digital en Colombia? Guía de precios 2026",
    description:
      "Rangos reales de precios por servicio de marketing digital en Colombia: community management, pauta, SEO, desarrollo y automatización. Qué incluye cada uno y cómo evitar sobrepagar.",
    image: "/blog-images/marketing-digital.png",
    imageAlt: "Estrategia de marketing digital representada como un recorrido de audiencia a crecimiento medible",
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
      {
        t: "p",
        x: "Un [agente de IA](/blog/que-es-un-agente-de-ia) bien configurado puede absorber varios de esos procesos y reportar resultados sin intervención diaria, lo que cambia la ecuación de costo a largo plazo.",
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
    faq: [
      {
        q: "¿Cuánto cuesta el community management en Colombia?",
        a: "Entre $800.000 y $2.500.000 COP al mes, según la cantidad de piezas, canales, frecuencia y nivel de atención. El precio sube cuando se incluyen videos, fotografía o una estrategia enfocada en generar leads.",
      },
      {
        q: "¿Cuánto cuesta una página web en Colombia?",
        a: "Entre $2.000.000 y $10.000.000 COP según el alcance: una landing enfocada cuesta menos que un sitio corporativo completo con integraciones, panel administrativo, analítica y SEO técnico.",
      },
      {
        q: "¿Cuánto invertir en pauta digital?",
        a: "La inversión en medios es aparte de los honorarios de gestión. Desde $500.000 COP al mes puede validarse una oferta local, pero el monto correcto depende del ticket, el margen y el costo aceptable por cliente.",
      },
      {
        q: "¿Qué debe incluir una buena propuesta de marketing digital?",
        a: "Objetivo de negocio y métrica principal, alcance exacto, responsabilidades de ambas partes, presupuesto de medios separado de honorarios, y una forma de reporte con frecuencia de revisión y condiciones claras.",
      },
    ],
  },
  {
    slug: "ia-en-el-agro-colombiano",
    title: "IA en el agro colombiano: automatización y agricultura de precisión para pequeños y medianos productores",
    description:
      "El campo colombiano está listo para la tecnología. Casos concretos de IA aplicada al agro: riego, monitoreo de cultivos, trazabilidad y ventas digitales con retorno real.",
    image: "/blog-images/ia-agro.png",
    imageAlt: "Productor consultando datos de agricultura de precisión en un cultivo colombiano",
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
      {
        t: "p",
        x: "Un [embudo conversacional en WhatsApp](/blog/whatsapp-business-embudo-conversacional) permite organizar esa venta directa con catálogo, cotización y seguimiento sin depender de un asesor disponible todo el día.",
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
        x: "En IAmkt ayudamos a convertir necesidades agrícolas en sistemas simples de registro, análisis y automatización. Un ejemplo real es Dasagro 360, un CRM para una distribuidora de insumos con 5 almacenes que ordenó pedidos, facturación e inventario, con ahorros estimados que puedes ver en nuestros [casos de éxito](/casos-de-exito). El punto de partida es un diagnóstico del proceso, los datos disponibles y la decisión que debe mejorar; después se diseña un piloto que el equipo pueda usar en la operación diaria.",
      },
    ],
    faq: [
      {
        q: "¿Cómo se usa la IA en el agro colombiano?",
        a: "Para mejorar decisiones concretas: riego y fertilización más precisos, alertas tempranas en cultivos, trazabilidad y control de costos, y pronóstico de demanda con ventas digitales.",
      },
      {
        q: "¿Qué datos se necesitan para empezar?",
        a: "Producción (lote, variedad, fechas y cantidades), clima y suelo, labores e insumos con sus costos, y ventas. Un registro consistente en una hoja de cálculo vale más que muchos sensores cuyos datos nadie revisa.",
      },
      {
        q: "¿La IA reemplaza al agrónomo?",
        a: "No. La IA alerta y organiza la información; el diagnóstico agronómico y la decisión de tratamiento siguen siendo responsabilidad de personal competente.",
      },
      {
        q: "¿Por dónde empezar con IA en una finca?",
        a: "Elegir un problema medible, organizar tres a seis meses de datos disponibles, probar una solución en un lote o canal comercial, comparar contra una línea base y escalar solo cuando el retorno sea visible.",
      },
    ],
  },
  {
    slug: "atencion-al-cliente-con-ia-colombia",
    title: "Atención al cliente con IA en Colombia: cómo atender 24/7 y reducir costos sin perder calidad",
    description:
      "Guía para implementar atención al cliente con IA en Colombia: qué resuelve, cuánto cuesta, cómo empezar por WhatsApp y qué errores evitar. Con rangos de precio y pasos prácticos.",
    image: "/blog-images/atencion-cliente.png",
    imageAlt: "Centro de atención al cliente con IA disponible 24/7 conectado a chat, métricas y equipos",
    date: "2026-08-24",
    category: "Atención al Cliente",
    readTime: "7 min",
    published: true,
    content: [
      {
        t: "p",
        x: "La atención al cliente con IA consiste en sistemas que responden, clasifican y resuelven consultas frecuentes de forma inmediata, con reglas claras y escalamiento a una persona cuando hace falta. No se trata de reemplazar a los asesores: se trata de que la empresa responda rápido siempre, incluso fuera de horario, y de que el equipo humano atienda solo los casos que realmente lo requieren.",
      },
      {
        t: "quote",
        x: "El cliente no pide hablar con una máquina: pide que le respondan rápido, bien y cuando lo necesita.",
      },
      { t: "h2", x: "¿Qué es la atención al cliente con IA y qué resuelve?" },
      {
        t: "p",
        x: "En la práctica es un asistente que entiende la consulta, consulta información real de tu negocio y responde con la mejor opción disponible: un horario, un precio, un estado de pedido o una cita. Resuelve las preguntas repetitivas que hoy consumen la jornada del equipo y deja documentado cada caso para que nadie pierda el contexto.",
      },
      { t: "h2", x: "Qué puede hacer hoy un sistema de atención con IA" },
      {
        t: "ul",
        x: [
          "Responder al instante las preguntas frecuentes: horarios, precios, disponibilidad, requisitos y ubicación.",
          "Clasificar la conversación y entregar el caso a la persona o área correcta con todo el contexto.",
          "Agendar citas, confirmar reservas y enviar recordatorios automáticos.",
          "Dar seguimiento a pedidos, cotizaciones y facturas sin que el cliente tenga que repetir su historia.",
          "Escalar a un humano en el momento exacto: reclamos, negociación, casos sensibles o excepciones.",
          "Dejar un resumen de cada interacción para que el equipo sepa qué pasó y qué sigue.",
        ],
      },
      {
        t: "p",
        x: "Cuando el asistente además ejecuta acciones sobre tus sistemas, como actualizar el CRM o enviar una cotización, ya estás hablando de un [agente de IA](/blog/que-es-un-agente-de-ia).",
      },
      { t: "h2", x: "Beneficios medibles para una empresa colombiana" },
      {
        t: "p",
        x: "La atención con IA se justifica cuando cambia indicadores concretos. Estos son los que más se mueven en una implementación típica:",
      },
      {
        t: "table",
        head: ["Indicador", "Sin IA", "Con IA"],
        rows: [
          ["Tiempo de primera respuesta", "Minutos u horas según horario", "Segundos, las 24 horas"],
          ["Cobertura horaria", "Solo jornada laboral", "24/7 sin costos de turnos extra"],
          ["Costo por conversación simple", "Horas de un asesor", "Fracción de una hora de asesor"],
          ["Consistencia de la respuesta", "Depende de la persona y el día", "Misma información y tono siempre"],
          ["Carga del equipo humano", "Repetir lo mismo cada semana", "Solo casos complejos y de alto valor"],
        ],
      },
      { t: "h2", x: "Por qué WhatsApp es el punto de partida en Colombia" },
      {
        t: "p",
        x: "WhatsApp es la aplicación de mensajería más usada por los colombianos, y la mayoría de las empresas ya recibe pedidos, preguntas y reclamos por ahí. En lugar de sumar otro canal, la IA se instala donde el cliente ya está: responde en el mismo chat, con el mismo número, y pasa la conversación a un asesor sin cambiar de aplicación.",
      },
      {
        t: "p",
        x: "Para que el canal no sea solo respuestas sueltas, conviene estructurarlo como un [embudo conversacional en WhatsApp](/blog/whatsapp-business-embudo-conversacional), donde cada conversación tiene un siguiente paso claro hasta la venta o la cita.",
      },
      { t: "h2", x: "Cómo implementarlo en 5 pasos" },
      {
        t: "ol",
        x: [
          "Mapea las preguntas y los flujos reales: qué preguntan, quién responde hoy y qué información necesitan para resolver.",
          "Define reglas de escalamiento: qué casos pasan a un humano, con qué urgencia y a qué persona o área.",
          "Conecta el canal con tus sistemas: WhatsApp, agenda, catálogo, CRM o base de datos para responder con datos reales.",
          "Prueba con supervisión: las primeras semanas el equipo revisa respuestas, corrige reglas y afina el tono.",
          "Mide y ajusta: tiempo de respuesta, casos resueltos sin intervención, satisfacción y carga del equipo.",
        ],
      },
      {
        t: "p",
        x: "El paso 1 y el paso 4 son los que definen el éxito: esta guía de [automatización para PyMEs](/blog/automatizacion-para-pymes-7-procesos) explica cómo elegir el proceso correcto y cómo validar un piloto sin riesgo.",
      },
      { t: "h2", x: "¿Cuánto cuesta la atención al cliente con IA en Colombia?" },
      {
        t: "p",
        x: "Los rangos orientativos para 2026 dependen de la complejidad. La inversión inicial cubre el diseño del flujo y la configuración; lo mensual cubre el proveedor de IA, mensajes y mantenimiento según el volumen.",
      },
      {
        t: "table",
        head: ["Modalidad", "Implementación (COP)", "Operación mensual (COP)", "Ideal para"],
        rows: [
          ["Bot de preguntas frecuentes", "$800.000 – $2.000.000", "$200.000 – $500.000", "Horarios, información y respuestas básicas"],
          ["Atención conectada a WhatsApp y CRM", "$2.000.000 – $5.000.000", "$500.000 – $1.500.000", "Negocios con volumen y seguimiento comercial"],
          ["Agente avanzado multicanal", "Desde $5.000.000", "$1.500.000 en adelante", "Operaciones con varios procesos y canales"],
        ],
      },
      {
        t: "p",
        x: "Para dimensionar el presupuesto completo de tu presencia digital, incluyendo web, pauta y contenido, puedes comparar con nuestra guía de [precios de marketing digital en Colombia](/blog/cuanto-cuesta-marketing-digital-colombia).",
      },
      { t: "h2", x: "Errores que arruinan la experiencia" },
      {
        t: "ol",
        x: [
          "No ofrecer salida a un humano: el cliente termina atrapado en el menú y abandona frustrado.",
          "Responder con textos genéricos que no reconocen lo que la persona preguntó.",
          "Prometer precios, inventario o tiempos sin consultar una fuente actualizada.",
          "Ignorar permisos y solicitudes de no recibir más mensajes.",
          "Medir solo mensajes enviados en lugar de casos resueltos, satisfacción y tiempo de atención.",
        ],
      },
      { t: "h2", x: "¿Cuándo conviene un humano y cuándo una máquina?" },
      {
        t: "table",
        head: ["Situación", "Quién responde mejor"],
        rows: [
          ["Pregunta frecuente con respuesta definida", "IA, al instante"],
          ["Seguimiento de pedido o cotización", "IA con acceso a datos reales"],
          ["Agendamiento y recordatorios", "IA conectada a la agenda"],
          ["Reclamo, negociación o caso delicado", "Humano, con el contexto del chat"],
          ["Cliente VIP o decisión de alto valor", "Humano, priorizado por la IA"],
        ],
      },
      {
        t: "p",
        x: "La regla simple: la máquina responde lo que ya tiene respuesta, y el humano recibe los casos donde la conversación vale más que la velocidad.",
      },
      {
        t: "p",
        x: "En IAmkt implementamos atención al cliente con IA conectada a WhatsApp, agenda y CRM, con reglas de escalamiento claras y acompañamiento en las primeras semanas. Los resultados que se pueden esperar están ilustrados en nuestros [casos de éxito](/casos-de-exito), con estimaciones de ahorro en horas y dinero para restaurantes y agroinsumos. El diagnóstico inicial es gratuito: mapeamos tus preguntas frecuentes, tus momentos de intervención humana y el indicador que quieres mejorar.",
      },
    ],
    faq: [
      {
        q: "¿Qué es la atención al cliente con IA?",
        a: "Es un sistema que responde, clasifica y resuelve consultas frecuentes de forma inmediata con reglas claras, consulta información real del negocio y escala a un humano cuando el caso lo requiere.",
      },
      {
        q: "¿La atención con IA reemplaza a los asesores humanos?",
        a: "No. Absorbe las preguntas repetitivas para que el equipo atienda los casos complejos y de alto valor con todo el contexto. El objetivo es velocidad 24/7 sin perder calidad en la relación con el cliente.",
      },
      {
        q: "¿Cuánto cuesta implementar atención al cliente con IA en Colombia?",
        a: "Entre $800.000 y $2.000.000 COP para un bot de preguntas frecuentes, de $2.000.000 a $5.000.000 conectado a WhatsApp y CRM, y desde $5.000.000 para un agente avanzado multicanal. La operación mensual depende del proveedor de IA y el volumen.",
      },
      {
        q: "¿Qué métricas indican que la atención con IA funciona?",
        a: "Tiempo de primera respuesta, porcentaje de casos resueltos sin intervención humana, satisfacción del cliente, conversaciones escaladas correctamente y carga real del equipo de atención.",
      },
    ],
  },
  {
    slug: "seo-geo-aeo-posicionamiento-2026",
    title: "SEO, GEO y AEO: cómo posicionar tu empresa en Google, ChatGPT y redes sociales en 2026",
    description:
      "El posicionamiento ya no es solo Google: SEO, GEO y AEO, más las redes sociales. Guía práctica 2026 para que tu empresa aparezca en buscadores, en las respuestas de la IA y en redes con reconocimiento real.",
    image: "/blog-images/posicionamiento-2026.png",
    imageAlt: "Estrategia de posicionamiento que conecta búsqueda en Google, respuestas de IA y redes sociales",
    date: "2026-08-24",
    category: "Posicionamiento",
    readTime: "8 min",
    published: true,
    content: [
      {
        t: "p",
        x: "Posicionar una empresa en 2026 ya no significa solo aparecer en Google. Hoy hay tres frentes que trabajan juntos: el SEO clásico para buscadores, el GEO para aparecer en las respuestas de la inteligencia artificial, el AEO para ser la respuesta citada, y las redes sociales como fuente de reconocimiento y confianza. Esta guía explica cada uno y cómo aplicarlos a una empresa en Colombia.",
      },
      {
        t: "quote",
        x: "Ya no basta con aparecer en Google: tu empresa también tiene que aparecer en las respuestas de la IA y en las redes donde tu cliente te busca.",
      },
      { t: "h2", x: "Los tres frentes del posicionamiento en 2026" },
      {
        t: "table",
        head: ["Frente", "Qué es", "Dónde aparece tu empresa", "Ejemplo"],
        rows: [
          ["SEO", "Optimización para buscadores clásicos", "Resultados de enlaces en Google y Bing", "\"agencia de marketing en Bogotá\""],
          ["GEO", "Optimización para motores de respuesta generados por IA", "Respuestas de ChatGPT, Gemini, Perplexity y el modo IA de Google", "Que ChatGPT recomiende tu empresa"],
          ["AEO", "Estructura para que la IA te cite como la respuesta", "Respuestas de IA con tu sitio como fuente", "Que tu página responda la pregunta exacta"],
        ],
      },
      { t: "h2", x: "SEO: la base que sigue funcionando" },
      {
        t: "p",
        x: "El SEO no murió: cambió. Sigue siendo el punto de partida porque la mayoría del tráfico web aún viene de búsquedas clásicas, y porque los propios motores de IA se alimentan de páginas bien indexadas. La base es la misma de siempre: sitio rápido y seguro (HTTPS), sitemap, indexación, contenido útil y enlaces internos claros. Si tu empresa no aparece en Google, difícilmente aparecerá en las respuestas de la IA.",
      },
      { t: "h2", x: "GEO: aparecer en las respuestas de la IA" },
      {
        t: "p",
        x: "Cada vez más personas le preguntan directamente a ChatGPT, Gemini o Perplexity antes de abrir Google. Estos asistentes construyen sus respuestas citando fuentes, y citan a quienes escriben de forma clara, directa y bien estructurada. El GEO (Generative Engine Optimization) es exactamente eso: preparar tu contenido para que la IA lo entienda, lo use y te mencione.",
      },
      {
        t: "ul",
        x: [
          "Responder preguntas reales con definiciones directas y párrafos auto-contenidos.",
          "Usar preguntas y respuestas (FAQ) con el lenguaje exacto del cliente.",
          "Estructurar datos con schema: organización, servicios, preguntas frecuentes.",
          "Publicar contenido con cifras y datos verificables que la IA pueda citar.",
          "Mantener información consistente sobre qué haces, para quién y en qué zona.",
        ],
      },
      {
        t: "p",
        x: "La IA ya recomienda negocios como un asesor de confianza, igual que un [agente de IA](/blog/que-es-un-agente-de-ia) atiende a tus clientes por ti: si no entiende tu página, no te va a recomendar.",
      },
      { t: "h2", x: "AEO: ser la respuesta, no un enlace más" },
      {
        t: "p",
        x: "El AEO (Answer Engine Optimization) es la capa técnica del GEO: estructurar la página para que, cuando la IA busque una respuesta, encuentre la tuya como la más clara. Son prácticas concretas y medibles, no magia.",
      },
      {
        t: "ul",
        x: [
          "Un archivo llms.txt en tu sitio: un resumen legible por máquinas con quién eres y qué ofreces.",
          "Schema de preguntas frecuentes (FAQPage) y de servicios en cada página relevante.",
          "Títulos que repitan la pregunta exacta del cliente, no frases creativas vacías.",
          "Enlaces internos entre artículos para que la IA recorra tu contenido con contexto.",
          "Una respuesta directa en los primeros párrafos, antes de la explicación larga.",
        ],
      },
      {
        t: "p",
        x: "Una empresa que además atiende con IA, como explicamos en nuestra guía de [atención al cliente con IA en Colombia](/blog/atencion-al-cliente-con-ia-colombia), cierra el círculo: la IA te encuentra, te recomienda y te atiende.",
      },
      { t: "h2", x: "Por qué las redes sociales importan para posicionar" },
      {
        t: "p",
        x: "Las redes no son solo un canal de venta: son una señal de reconocimiento y confianza que alimenta los tres frentes anteriores. Cuando tu marca aparece en Instagram, Facebook o LinkedIn con un perfil completo y consistente, pasa algo importante: la gente te busca por nombre, lo que refuerza tu autoridad frente a Google y frente a la IA, que también rastrea redes y menciones.",
      },
      {
        t: "ul",
        x: [
          "Reconocimiento: una marca que se ve activa genera más búsquedas de nombre y más clics.",
          "Confianza: perfiles completos con contacto, horarios y reseñas mejoran la percepción.",
          "Consistencia: el mismo nombre, logo, contacto y enlaces en todos los perfiles fortalecen la identidad digital.",
          "Contenido distribuido: cada publicación es una entrada más que la IA y Google pueden rastrear.",
          "Prueba social: interacciones y seguidores reales respaldan la promesa de tu sitio web.",
        ],
      },
      {
        t: "p",
        x: "Para una empresa colombiana, empezar por Instagram y Facebook con información alineada a la web, más un perfil de Google Business bien completo, es la combinación de reconocimiento local más efectiva.",
      },
      { t: "h2", x: "Plan práctico para posicionar tu empresa en 2026" },
      {
        t: "ol",
        x: [
          "Asegura la base técnica: web rápida, HTTPS, sitemap, robots.txt e indexación en Google (SEO).",
          "Publica contenido que responda las preguntas reales de tus clientes, con FAQ y datos concretos (GEO).",
          "Estructura tu sitio para máquinas: schema de servicios y FAQ, llms.txt y enlaces internos (AEO).",
          "Activa tus redes con perfil completo y consistente, y publica con regularidad (reconocimiento).",
          "Mide con datos: Search Console para búsquedas, y pregúntale a ChatGPT, Gemini y Perplexity si te recomiendan (GEO).",
        ],
      },
      { t: "h2", x: "Errores que frenan el posicionamiento" },
      {
        t: "ol",
        x: [
          "Creer que el SEO murió y abandonar la base técnica.",
          "Enfocarse solo en palabras clave sin responder las preguntas del cliente.",
          "Ignorar las redes porque \"no venden directo\": pierdes reconocimiento y confianza.",
          "No estructurar datos: sin schema, la IA tiene que adivinar qué hace tu empresa.",
          "Medir solo clics: el tráfico de la IA genera pocos clics, pero mucha recomendación.",
        ],
      },
      {
        t: "p",
        x: "En IAmkt aplicamos los tres frentes a nuestra propia presencia y a la de nuestros clientes: base SEO, contenido y estructura para la IA, y acompañamiento para construir reconocimiento en redes. El diagnóstico inicial es gratuito y sirve para saber por dónde empezar según tu tipo de negocio y tu mercado.",
      },
    ],
    faq: [
      {
        q: "¿Qué diferencia hay entre SEO, GEO y AEO?",
        a: "El SEO optimiza para buscadores clásicos como Google, el GEO optimiza para que la IA te recomiende en sus respuestas (ChatGPT, Gemini, Perplexity), y el AEO estructura tu sitio para que la IA te cite como la respuesta directa.",
      },
      {
        q: "¿El SEO sigue funcionando en 2026?",
        a: "Sí. Sigue siendo la base del tráfico web y los motores de IA se alimentan de páginas bien indexadas. Lo que cambió es que ya no es el único frente: hay que sumar GEO, AEO y presencia en redes.",
      },
      {
        q: "¿Cómo sé si la IA me recomienda?",
        a: "Haz la prueba directa: pregúntale a ChatGPT, Gemini y Perplexity algo como \"mejor agencia de marketing en Bogotá\" o la consulta típica de tu cliente, y revisa si tu empresa aparece y si te citan.",
      },
      {
        q: "¿Las redes sociales ayudan al posicionamiento?",
        a: "Sí, de forma indirecta pero importante: generan búsquedas de marca, señales de confianza y contenido adicional que Google y la IA pueden rastrear. Perfiles completos y consistentes refuerzan el reconocimiento.",
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
