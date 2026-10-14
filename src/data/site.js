// ============================================================
//  DATOS DEL ESTUDIO
//  TODO: reemplazar teléfono, WhatsApp, correo y dirección
//  por los datos reales antes de difundir la web.
// ============================================================
export const SITE = {
  name: 'Juipa & Asociados',
  tagline: 'Abogados y Consultores',
  city: 'Lima, Perú',
  phoneDisplay: '+51 987 654 321',
  phoneHref: '+51987654321',
  whatsapp: '51987654321', // sin "+" ni espacios
  email: 'contacto@juipaabogados.pe',
  address: 'Lima, Perú · atención presencial previa cita',
  hours: 'Lunes a viernes, 9:00 a 18:00',
};

export const waLink = (message) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

// ============================================================
//  ÁREAS DE PRÁCTICA (solo las que el estudio ofrece)
// ============================================================
export const PRACTICE_AREAS = [
  {
    id: 'penal',
    title: 'Derecho Penal y Procesal Penal',
    summary:
      'Defensa desde la primera citación policial o fiscal hasta la sentencia y sus recursos.',
    items: [
      'Asistencia en detenciones y casos de flagrancia',
      'Defensa en investigación preliminar y preparatoria',
      'Audiencias de prisión preventiva y comparecencia',
      'Juicio oral ante juzgados unipersonales y colegiados',
      'Apelación de sentencias y recurso de casación',
      'Patrocinio de víctimas y constitución en actor civil',
    ],
    forWhom: 'Personas investigadas, procesadas o agraviadas por un delito, y sus familiares.',
    whatsapp: 'Hola, quisiera consultar sobre un caso penal.',
  },
  {
    id: 'policial',
    title: 'Derecho Policial',
    summary:
      'Asesoría y defensa de efectivos de la Policía Nacional, en actividad o en retiro.',
    items: [
      'Procedimientos disciplinarios bajo la Ley N.° 30714',
      'Descargos ante Inspectoría y órganos de investigación',
      'Recursos ante el Tribunal de Disciplina Policial',
      'Defensa en el Fuero Militar Policial',
      'Impugnación de pases a la situación de retiro',
      'Reincorporación, ascensos y derechos de carrera',
    ],
    forWhom: 'Suboficiales y oficiales PNP con un procedimiento abierto o un derecho vulnerado.',
    whatsapp: 'Hola, soy efectivo PNP y quisiera consultar sobre un procedimiento.',
  },
  {
    id: 'constitucional',
    title: 'Derecho Constitucional',
    summary:
      'Procesos para proteger la libertad y los derechos fundamentales frente a actos arbitrarios.',
    items: [
      'Hábeas corpus contra detenciones arbitrarias',
      'Amparo contra actos de autoridades o resoluciones',
      'Hábeas data y acceso a información personal',
      'Medidas cautelares en procesos constitucionales',
      'Recurso de agravio ante el Tribunal Constitucional',
    ],
    forWhom: 'Personas cuya libertad, trabajo o debido proceso se ha visto afectado.',
    whatsapp: 'Hola, quisiera consultar sobre un hábeas corpus o amparo.',
  },
  {
    id: 'sancionador',
    title: 'Derecho Sancionador y Disciplinario',
    summary:
      'Defensa en procedimientos administrativos que pueden terminar en suspensión, multa o destitución.',
    items: [
      'Procedimiento Administrativo Disciplinario (Ley SERVIR)',
      'Descargos ante secretarías técnicas y comisiones',
      'Apelación ante el Tribunal del Servicio Civil',
      'Procedimientos sancionadores de entidades públicas',
      'Proceso contencioso-administrativo contra la sanción',
    ],
    forWhom: 'Servidores y funcionarios públicos, docentes y ciudadanos sancionados por el Estado.',
    whatsapp: 'Hola, quisiera consultar sobre un procedimiento disciplinario.',
  },
  {
    id: 'civil',
    title: 'Derecho Civil y Procesal Civil',
    summary:
      'Conflictos sobre propiedad, herencias, contratos y deudas entre particulares.',
    items: [
      'Desalojo por falta de pago, vencimiento u ocupación precaria',
      'Prescripción adquisitiva y saneamiento de inmuebles',
      'Sucesión intestada, testamentos y división de herencia',
      'Resolución de contratos y obligación de dar suma de dinero',
      'Indemnización por daños y perjuicios',
      'Rectificación de partidas',
    ],
    forWhom: 'Propietarios, herederos, inquilinos y personas con un contrato incumplido.',
    whatsapp: 'Hola, quisiera consultar sobre un caso civil.',
  },
  {
    id: 'laboral',
    title: 'Derecho Laboral',
    summary:
      'Defensa del trabajador frente al despido, el impago y el maltrato en el empleo.',
    items: [
      'Despido arbitrario, nulo, incausado o fraudulento',
      'Reposición o indemnización según corresponda',
      'Cobro de CTS, gratificaciones, vacaciones y horas extra',
      'Desnaturalización de contratos y locación de servicios',
      'Régimen privado (D. Leg. 728) y CAS (D. Leg. 1057)',
      'Actos de hostilidad y hostigamiento laboral',
    ],
    forWhom: 'Trabajadores del sector privado y público que han sido despedidos o no reciben lo que les corresponde.',
    whatsapp: 'Hola, quisiera consultar sobre un tema laboral.',
  },
  {
    id: 'litigacion',
    title: 'Litigación Oral',
    summary:
      'Preparación y conducción de audiencias: donde un caso bien estudiado se gana o se pierde.',
    items: [
      'Construcción de la teoría del caso',
      'Alegatos de apertura y de clausura',
      'Examen y contraexamen de testigos y peritos',
      'Objeciones y manejo de la prueba en audiencia',
      'Preparación del cliente para declarar',
    ],
    forWhom: 'Personas con una audiencia próxima, o abogados que buscan apoyo para el juicio.',
    whatsapp: 'Hola, tengo una audiencia próxima y quisiera asesoría.',
  },
];

// ============================================================
//  CÓMO TRABAJAMOS
// ============================================================
export const STEPS = [
  {
    title: 'Escuchamos',
    text: 'En la primera reunión revisamos notificaciones, documentos y plazos. Usted nos cuenta los hechos con calma.',
  },
  {
    title: 'Evaluamos',
    text: 'Le explicamos con franqueza qué opciones tiene, qué riesgos existen y cuánto puede durar el proceso.',
  },
  {
    title: 'Acordamos',
    text: 'Fijamos los honorarios por escrito y por etapas antes de iniciar cualquier trámite. Sin cobros sorpresa.',
  },
  {
    title: 'Defendemos',
    text: 'El mismo abogado lleva su caso de principio a fin y le informa de cada actuación importante.',
  },
];

// ============================================================
//  PREGUNTAS FRECUENTES
// ============================================================
export const FAQS = [
  {
    q: '¿Atienden a empresas?',
    a: 'No desde este estudio. Juipa & Asociados atiende únicamente a personas naturales. Si su consulta es de una empresa o persona jurídica, la derivamos a la firma con la que trabajamos para la defensa corporativa.',
  },
  {
    q: 'Me llegó una citación de la policía o de la fiscalía. ¿Qué hago?',
    a: 'No acuda a declarar solo. Comuníquese con nosotros antes de la fecha indicada: revisaremos la citación, los hechos que se le atribuyen y prepararemos su declaración. Lo que diga en esa primera diligencia puede pesar en todo el proceso.',
  },
  {
    q: 'Soy efectivo PNP y me abrieron un procedimiento disciplinario.',
    a: 'Los plazos para presentar descargos son cortos. Tráiganos la notificación lo antes posible. Revisamos si se respetó el debido procedimiento, preparamos los descargos y, si corresponde, llevamos el caso al Tribunal de Disciplina Policial o a la vía judicial.',
  },
  {
    q: '¿Cómo se fijan los honorarios?',
    a: 'Después de revisar su caso le entregamos una propuesta por escrito, dividida por etapas del proceso. Usted sabe desde el inicio cuánto pagará y por qué.',
  },
  {
    q: '¿Qué debo llevar a la primera reunión?',
    a: 'Su DNI y todo documento relacionado: notificaciones, resoluciones, contratos, boletas, partidas registrales o correos. Si no tiene todo, no se preocupe; le indicaremos qué falta.',
  },
  {
    q: '¿Atienden casos fuera de Lima?',
    a: 'Sí, cuando el caso lo permite. Muchas diligencias y audiencias hoy se realizan de forma virtual. Lo coordinamos con usted en la primera consulta.',
  },
];
