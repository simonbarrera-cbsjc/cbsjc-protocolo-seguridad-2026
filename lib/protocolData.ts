export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  situation: string;
  question: string;
  numeralRef: string;
  options: Option[];
}

export interface Card {
  id: string;
  front: string;
  back: string;
  numeral: string;
  category: string;
}

export interface ReadingSection {
  title: string;
  content: string;
  highlight?: string;
}

export interface ModuleData {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  numeralRange: string;
  summary: string;
  badgeName: string;
  badgeIcon: string;
  estimatedTime: string;
  colorTheme: string;
  intro: {
    title: string;
    description: string;
    keyPoints: string[];
  };
  flashcards: Card[];
  reading: {
    summary: string;
    sections: ReadingSection[];
  };
  cases: CaseStudy[];
  gameType: "deber-diligencia" | "desplazamientos-banos" | "seed-bloom-huerta" | "custodia-zonas" | "carnes-pickupsj" | "cadena-reporte";
}

export const PROTOCOL_MODULES: ModuleData[] = [
  {
    id: 1,
    slug: "fundamentos-rol-docente",
    title: "Fundamentos, Ideas Fuerza y Rol Docente",
    shortTitle: "Fundamentos y Rol",
    numeralRange: "Num. 1, 2, 5.3, 5.4, 56",
    summary: "Apropiación de las 5 ideas fuerza institucionales y las 8 conductas exigibles del deber de diligencia docente.",
    badgeName: "Guardián de Diligencia",
    badgeIcon: "ShieldCheck",
    estimatedTime: "15 min",
    colorTheme: "from-blue-600 to-indigo-700",
    intro: {
      title: "La Responsabilidad Funcional y el Deber de Cuidado",
      description: "En el Colegio Bilingüe San José Campestre, la seguridad es un principio operativo innegociable. La responsabilidad sobre los estudiantes es funcional: nace de la asignación o de asumir la actividad, no de la denominación del cargo.",
      keyPoints: [
        "Si tengo estudiantes a cargo, respondo por ellos: atender llamadas o diligencias no exime la vigilancia.",
        "Conteo permanente de estudiantes: al salir, al llegar y al terminar cada sesión.",
        "La presencia de instructores externos (SEED BLOOM, artes, deportes) no releva al docente de su supervisión.",
        "El deber de diligencia se expresa en 8 conductas explícitas de 'Sí Hacer' frente a 'No Hacer'."
      ]
    },
    flashcards: [
      {
        id: "m1-c1",
        category: "Responsabilidad",
        numeral: "Idea Fuerza 1 & Num. 5.3",
        front: "¿Qué significa que la responsabilidad sobre los estudiantes sea funcional?",
        back: "Nace en el instante en que se asigna o asume una actividad con estudiantes. No depende del cargo ni se suspende por atender llamadas, correos o tareas administrativas."
      },
      {
        id: "m1-c2",
        category: "Instructores Externos",
        numeral: "Idea Fuerza 3 & Num. 5.4",
        front: "¿La presencia de un instructor técnico en SEED BLOOM o deportes releva al docente?",
        back: "NO. Aunque el instructor dirija la parte técnica o deportiva, el docente institucional sigue siendo legal y funcionalmente responsable de la supervisión y custodia del grupo."
      },
      {
        id: "m1-c3",
        category: "Deber de Diligencia",
        numeral: "Numeral 56",
        front: "¿Cuáles son las conductas de 'No Hacer' respecto al celular y relevos?",
        back: "Está terminantemente prohibido usar el celular comprometiendo la atención activa y abandonar el grupo sin haber solicitado y recibido relevo formal autorizado."
      },
      {
        id: "m1-c4",
        category: "Reporte Oportuno",
        numeral: "Idea Fuerza 4 & Num. 56",
        front: "¿Por qué el reporte tardío u omitido se considera una falta por sí mismo?",
        back: "Porque la omisión o retraso de información impide la activación oportuna de protocolos de protección institucional, independientemente de la gravedad final del hecho."
      }
    ],
    reading: {
      summary: "Compendio de las 5 ideas fuerza y el estándar de conducta exigible en el Colegio Bilingüe San José Campestre.",
      sections: [
        {
          title: "1. Las Cinco Ideas Fuerza del Protocolo SJB-RGD003",
          content: `Los principios rectores que todo docente debe interiorizar:\n\n1. **Si tengo estudiantes a cargo, respondo por ellos:** La responsabilidad funcional exige presencia y vigilancia continua.\n2. **Sé dónde está mi grupo, siempre:** Rutina de conteo al salir del aula, conteo al llegar al destino y conteo al finalizar la actividad.\n3. **La presencia de un instructor externo NO me releva:** En SEED BLOOM, huerta, laboratorios o talleres artísticos, el docente mantiene el deber de supervisión.\n4. **Reportar de inmediato es obligatorio:** El silencio, la omisión o el reporte extemporáneo constituyen faltas graves.\n5. **Las autorizaciones van por canal oficial:** Queda abolido el uso de WhatsApp o mensajes personales para autorizar recogidas o salidas.`,
          highlight: "La seguridad es un hábito institucional fundamentado en la prevención y la trazabilidad."
        },
        {
          title: "2. Las Ocho Conductas del Deber de Diligencia (Num. 56)",
          content: `El protocolo formaliza ocho contrastes de actuación profesional:\n\n- **No hacer:** Dejar estudiantes sin supervisión en espacios no autorizados. ➔ **Sí hacer:** Verificar la ubicación del grupo permanentemente.\n- **No hacer:** Abandonar el grupo sin relevo ni autorización. ➔ **Sí hacer:** Solicitar relevo formal antes de retirarse.\n- **No hacer:** Delegar custodia en personas no autorizadas. ➔ **Sí hacer:** Confirmar autorización antes de ceder el grupo.\n- **No hacer:** Permitir desplazamientos sin control. ➔ **Sí hacer:** Autorizar, cronometrar y verificar retorno.\n- **No hacer:** Ignorar reportes de estudiantes. ➔ **Sí hacer:** Escuchar con atención y escalar.\n- **No hacer:** Omitir novedades de seguridad. ➔ **Sí hacer:** Reportar de inmediato.\n- **No hacer:** Permitir interacción no autorizada con terceros. ➔ **Sí hacer:** Intervenir y reportar.\n- **No hacer:** Usar el celular comprometiendo la vigilancia. ➔ **Sí hacer:** Mantener atención activa.`
        }
      ]
    },
    cases: [
      {
        id: "m1-case1",
        title: "Caso 1: Tareas de planeación durante actividad externa",
        situation: "Durante la sesión de SEED BLOOM en el picadero ecuestre, el instructor técnico toma el mando y le sugiere al docente que aproveche los 40 minutos para sentarse en las gradas a calificar evaluaciones en su computador.",
        question: "¿Cuál es la actuación correcta del docente según los numerales 46, 47 y 56?",
        numeralRef: "Numerales 46, 47 y 56",
        options: [
          {
            id: "opt1",
            text: "Aceptar la sugerencia y calificar, pues el instructor es experto en el manejo de caballos y dirige la clase.",
            isCorrect: false,
            explanation: "Incorrecto. La presencia de un instructor externo no releva al docente institucional de su responsabilidad de custodia y supervisión activa."
          },
          {
            id: "opt2",
            text: "Rechazar la distracción, mantener supervisión activa de pie en el perímetro asignado y controlar visualmente las conductas de los estudiantes.",
            isCorrect: true,
            explanation: "¡Correcto! El numeral 47 establece que el docente mantiene la supervisión del grupo aunque el instructor dirija la técnica, evitando cualquier actividad que comprometa la vigilancia."
          },
          {
            id: "opt3",
            text: "Pedirle a un estudiante monitor que vigile mientras el docente califica en las gradas.",
            isCorrect: false,
            explanation: "Incorrecto. La custodia no se puede delegar en estudiantes ni en personas no autorizadas."
          }
        ]
      },
      {
        id: "m1-case2",
        title: "Caso 2: Solicitud informal de relevo entre compañeros",
        situation: "El docente asignado a la zona de acompañamiento 'Callejón' es abordado por un colega que le dice: 'Préstame 5 minutos en tu zona mientras bajo a secretaría a recoger unas fotocopias, que no me demoro nada'.",
        question: "¿Cómo debe proceder según el numeral 49 y 56?",
        numeralRef: "Numerales 23, 49 y 56",
        options: [
          {
            id: "opt1",
            text: "Cubrirle el favor de buena fe, ya que son sólo 5 minutos dentro del mismo patio.",
            isCorrect: false,
            explanation: "Incorrecto. Los acuerdos informales rompen la trazabilidad del esquema institucional de 22 zonas y dejan una zona desprotegida o con sobrecarga."
          },
          {
            id: "opt2",
            text: "Recordarle al colega que todo relevo debe gestionarse a través de Coordinación antes de retirarse, permaneciendo cada docente en su punto asignado.",
            isCorrect: true,
            explanation: "¡Correcto! La regla 3 de zonas de acompañamiento prohíbe el cambio informal entre colegas para mantener la trazabilidad de la custodia asignada."
          },
          {
            id: "opt3",
            text: "Permitir que se retire si deja a un estudiante vigilando el área.",
            isCorrect: false,
            explanation: "Incorrecto. La custodia docente no se transfiere de forma improvisada ni a estudiantes."
          }
        ]
      }
    ],
    gameType: "deber-diligencia"
  },
  {
    id: 2,
    slug: "desplazamientos-protocolo-banos",
    title: "Supervisión, Desplazamientos y Protocolo de Baños",
    shortTitle: "Desplazamientos y Baños",
    numeralRange: "Num. 41, 42, 43, 44, 45",
    summary: "Rutina de 6 pasos de traslados grupales, manejo de permisos individuales y regla de exclusividad de baños para estudiantes.",
    badgeName: "Experto en Tránsito Seguro",
    badgeIcon: "Footprints",
    estimatedTime: "20 min",
    colorTheme: "from-emerald-600 to-teal-700",
    intro: {
      title: "Control de Movilidad y Espacios Sanitarios",
      description: "El desplazamiento de estudiantes por el campus campestre requiere una disciplina rigurosa de conteo y acompañamiento según el nivel escolar, junto con la estricta protección de la privacidad en los servicios sanitarios.",
      keyPoints: [
        "Rutina obligatoria de 6 pasos para el traslado grupal: conteo al salir, acompañamiento continuo y reconteo al llegar.",
        "Preescolar nunca se desplaza solo: siempre requiere acompañamiento de adulto institucional.",
        "Los baños de estudiantes son de uso EXCLUSIVO de ellos; adultos y visitantes usan baños de oficinas.",
        "Si un estudiante no aparece en un lapso razonable (<15 min), se activa de inmediato el protocolo del Numeral 43."
      ]
    },
    flashcards: [
      {
        id: "m2-c1",
        category: "Desplazamiento Grupal",
        numeral: "Numeral 41",
        front: "¿Cuál es la 'Regla Dura' en traslados grupales en preescolar y básica primaria?",
        back: "Ningún grupo de estudiantes puede ser enviado solo de un espacio a otro sin acompañamiento institucional permanente durante todo el recorrido."
      },
      {
        id: "m2-c2",
        category: "Permisos de Baño",
        numeral: "Numeral 44.1",
        front: "¿Cómo debe realizarse el acompañamiento al baño en Preescolar?",
        back: "El adulto institucional acompaña hasta la zona de baño, espera afuera en un punto que permita supervisión prudente sin vulnerar la intimidad ni permanecer innecesariamente adentro."
      },
      {
        id: "m2-c3",
        category: "Restricción de Baños",
        numeral: "Numeral 45",
        front: "¿Pueden los visitantes, transportadores o proveedores usar los baños de estudiantes?",
        back: "TOTALMENTE PROHIBIDO. Los baños escolares son de uso exclusivo de los estudiantes. Los adultos externos únicamente pueden utilizar las baterías sanitarias de oficinas."
      },
      {
        id: "m2-c4",
        category: "Estudiante No Ubicado",
        numeral: "Numeral 43",
        front: "¿Qué 4 pasos inmediatos deben ejecutarse si un estudiante no aparece en el aula o destino?",
        back: "1. Verificar aula y baños cercanos.\n2. Informar a Coordinación sin esperar a terminar la clase.\n3. Activar apoyo de portería y docentes cercanos.\n4. Registrar la novedad."
      }
    ],
    reading: {
      summary: "Directrices obligatorias de supervisión de trayectos y uso de servicios higiénicos.",
      sections: [
        {
          title: "1. Rutina de 6 Pasos para el Desplazamiento Grupal (Num. 41)",
          content: `1. **Verificación inicial:** Conteo del grupo antes de salir del aula de origen.\n2. **Organización:** Ubicar a los alumnos en fila u orden según edad y terreno.\n3. **Acompañamiento integral:** Desplazamiento conjunto manteniendo control visual permanente.\n4. **Control de ritmo:** Evitar que estudiantes se adelanten, se dispersen o se queden rezagados.\n5. **Verificación en destino:** Segundo conteo al ingresar al nuevo espacio (canchas, laboratorios, biblioteca).\n6. **Reporte:** Notificación inmediata ante cualquier ausencia advertida.`
        },
        {
          title: "2. Protocolo de Baños por Niveles Educativos (Num. 44 y 45)",
          content: `Diferenciación por madurez y autonomía:\n\n- **Preescolar (44.1):** Acompañamiento obligatorio por docente o auxiliar. Espera en el umbral externo respetando la intimidad. En caso de accidentes de esfínteres, intervención respetuosa con mínima exposición, aviso al acudiente y registro en bitácora.\n- **Básica Primaria Inicial (44.2):** El docente autoriza permisos individuales, evalúa si amerita supervisión visual según la distancia y cronometra el retorno razonable.\n- **Primaria Superior, Secundaria y Media (44.3):** Permiso individual, no colectivo. Reportar a Coordinación las salidas recurrentes o prolongadas (>15 minutos).\n\n**Regla Nueva Institucional:** Prohibición absoluta de ingreso de personal externo, contratistas, transportadores o acudientes a baños de estudiantes.`
        }
      ]
    },
    cases: [
      {
        id: "m2-case1",
        title: "Caso 1: Demora prolongada en permiso de baño en 3.° de Primaria",
        situation: "Un estudiante de 3.° de primaria solicita permiso para ir al baño a las 9:10 a.m. Siendo las 9:25 a.m. (15 minutos después), el docente se encuentra explicando un tema y nota que no ha retornado.",
        question: "¿Cuál es la acción obligatoria según los numerales 42 y 43?",
        numeralRef: "Numerales 42 y 43",
        options: [
          {
            id: "opt1",
            text: "Esperar a que termine el bloque de clase a las 9:45 a.m. para buscarlo y no interrumpir la explicación.",
            isCorrect: false,
            explanation: "Incorrecto. Esperar al final de la clase constituye omisión del deber de supervisión frente a un estudiante no ubicado."
          },
          {
            id: "opt2",
            text: "Verificar de inmediato el baño o enviar apoyo de un docente cercano / auxiliar e informar a Coordinación sin dilación.",
            isCorrect: true,
            explanation: "¡Correcto! El numeral 43 estipula verificar el espacio más cercano e informar a Coordinación de inmediato sin esperar la terminación de la clase."
          },
          {
            id: "opt3",
            text: "Asumir que se quedó jugando en el patio y ponerle una falta en el observador.",
            isCorrect: false,
            explanation: "Incorrecto. Antes de cualquier medida pedagógica, prima la verificación física de su integridad y ubicación."
          }
        ]
      },
      {
        id: "m2-case2",
        title: "Caso 2: Proveedor ingresando a batería sanitaria de estudiantes",
        situation: "Mientras transita por el pasillo del bloque de salones, una docente observa que un contratista de mantenimiento con overol se dispone a ingresar al baño de niños de primaria.",
        question: "¿Cómo debe intervenir según el numeral 45 y 50?",
        numeralRef: "Numerales 45 y 50",
        options: [
          {
            id: "opt1",
            text: "No decir nada porque el señor está realizando trabajos en la institución.",
            isCorrect: false,
            explanation: "Incorrecto. Ningún adulto externo puede ingresar a baños de estudiantes bajo ninguna circunstancia."
          },
          {
            id: "opt2",
            text: "Intervenir inmediatamente, indicarle que los baños escolares son exclusivos para estudiantes, orientarlo al baño de oficinas y reportar la novedad a portería/coordinación.",
            isCorrect: true,
            explanation: "¡Correcto! La regla del Numeral 45 prohíbe el uso de baños escolares por adultos ajenos y exige intervención y reporte inmediato."
          },
          {
            id: "opt3",
            text: "Esperar a que salga del baño para preguntarle por qué entró allí.",
            isCorrect: false,
            explanation: "Incorrecto. Se debe intervenir oportunamente para salvaguardar el espacio exclusivo de los menores."
          }
        ]
      }
    ],
    gameType: "desplazamientos-banos"
  },
  {
    id: 3,
    slug: "espacios-especiales-seed-bloom",
    title: "Actividades Fuera del Aula, SEED BLOOM y Huerta",
    shortTitle: "SEED BLOOM y Huerta",
    numeralRange: "Num. 46, 47, 48",
    summary: "Medidas de seguridad en picadero, programa ecuestre SEED BLOOM, granjita, huerta escolar y laboratorios.",
    badgeName: "Técnico en Seguridad de Campo",
    badgeIcon: "Compass",
    estimatedTime: "20 min",
    colorTheme: "from-amber-600 to-orange-700",
    intro: {
      title: "Seguridad en Espacios Abiertos y Contacto con Animales",
      description: "El aprendizaje vivencial en el CBSJC involucra entornos campestres, picadero ecuestre y huerta. Estas experiencias demandan protocolos específicos para prevenir accidentes y gestionar reacciones emocionales.",
      keyPoints: [
        "El programa SEED BLOOM reemplaza el término 'equitación' pero conserva todas las normas de seguridad técnica y monta.",
        "Uso estricto de Elementos de Protección Personal (EPP) y prohibición de ingreso individual a pesebreras o corrales.",
        "En huerta y granja: herramientas bajo control docente exclusivo, no ingerir tierra ni plantas, y lavado obligatorio de manos.",
        "Manejo comprensivo y sin presión indebida si un estudiante manifiesta fobia o llanto frente a un animal."
      ]
    },
    flashcards: [
      {
        id: "m3-c1",
        category: "SEED BLOOM",
        numeral: "Numeral 47",
        front: "¿Qué cambio representa el programa SEED BLOOM en relación con la equitación?",
        back: "Reemplaza el nombre y amplía el enfoque pedagógico, pero mantiene intactas y plenamente vigentes todas las medidas de seguridad, EPP y custodia técnica."
      },
      {
        id: "m3-c2",
        category: "Áreas Restringidas",
        numeral: "Numeral 47",
        front: "¿Qué zonas ecuestres tienen prohibición estricta de ingreso no acompañado?",
        back: "Pesebreras, corrales, pistas de monta, bodegas de insumos y zonas de acopio de alimento para caballos."
      },
      {
        id: "m3-c3",
        category: "Huerta y Granja",
        numeral: "Numeral 48",
        front: "¿Cuáles son las 3 reglas doradas de bioseguridad en la huerta escolar?",
        back: "1. No manipular herramientas sin supervisión directa.\n2. No llevarse a la boca semillas, plantas o tierra.\n3. Lavado minucioso de manos al terminar la actividad."
      },
      {
        id: "m3-c4",
        category: "Gestión Emocional",
        numeral: "Numeral 47 y 48",
        front: "¿Cómo actuar ante un estudiante que experimenta pánico o llanto ante un animal?",
        back: "Manejo empático y respetuoso, sin forzar ni ridiculizar al alumno, retirándolo a una distancia segura y reportando la novedad a Coordinación."
      }
    ],
    reading: {
      summary: "Normativa de seguridad aplicada a clases al aire libre, picadero y entornos biológicos.",
      sections: [
        {
          title: "1. Programa SEED BLOOM y Zonas Ecuestres (Num. 47)",
          content: `El programa SEED BLOOM integra el desarrollo socioemocional y la interacción ecuestre.\n\n- **Equipamiento:** Todo estudiante que monte debe portar casco reglamentario ajustado y calzado cerrado apropiado.\n- **Límites de acceso:** Ningún estudiante puede entrar solo a pesebreras o pasturas.\n- **Presencia conjunta:** El instructor dirige la técnica equina y el docente acompaña la disciplina y conducta del grupo.\n- **Reporte obligatorio:** Cualquier raspadura, golpe, tirón, caída o crisis de llanto debe asentarse en el formato de novedades.`
        },
        {
          title: "2. Huerta, Granjita y Recorridos Biológicos (Num. 48)",
          content: `Directrices de cuidado ambiental y prevención:\n\n- Herramientas de jardinería (palas, rastrillos) deben ser acordes a la edad y custodiadas por el docente.\n- Monitoreo activo para evitar la ingesta accidental de hojas, abono o agua no tratada.\n- Mantener a los estudiantes lejos de zanjas, desniveles o mallas perimetrales.\n- Desinfección y lavado de manos como cierre indispensable de la jornada al aire libre.`
        }
      ]
    },
    cases: [
      {
        id: "m3-case1",
        title: "Caso 1: Resistencia y llanto en la sesión de SEED BLOOM",
        situation: "En una sesión de SEED BLOOM con grado 2.°, un estudiante comienza a llorar desconsoladamente, se paraliza y rehúsa ponerse el casco o acercarse al caballo.",
        question: "¿Cómo debe responder el docente según el numeral 47?",
        numeralRef: "Numeral 47",
        options: [
          {
            id: "opt1",
            text: "Insistirle enérgicamente para que supere el miedo y obligarlo a montar para no retrasar a los compañeros.",
            isCorrect: false,
            explanation: "Incorrecto. El protocolo prohíbe la presión indebida o coacción ante el miedo del menor."
          },
          {
            id: "opt2",
            text: "Manejo respetuoso sin presión, ubicarlo en una zona de observación segura junto al docente y registrar la novedad para seguimiento con psicología/coordinación.",
            isCorrect: true,
            explanation: "¡Correcto! El numeral 47 exige manejo respetuoso del temor o rechazo, contención afectiva y reporte de la novedad."
          },
          {
            id: "opt3",
            text: "Dejar al estudiante solo en las gradas mientras el docente se va con el resto del grupo al picadero.",
            isCorrect: false,
            explanation: "Incorrecto. El docente jamás debe dejar a un estudiante sin supervisión en áreas abiertas."
          }
        ]
      },
      {
        id: "m3-case2",
        title: "Caso 2: Rasguño superficial durante labores en la huerta",
        situation: "Mientras cosechan hortalizas en la huerta, un estudiante sufre un rasguño superficial con una rama espinosa. El estudiante dice que no le duele y pide seguir jugando.",
        question: "¿Qué estipulan los numerales 36 y 48?",
        numeralRef: "Numerales 36 y 48",
        options: [
          {
            id: "opt1",
            text: "Ignorarlo ya que no es una herida profunda y el estudiante no está llorando.",
            isCorrect: false,
            explanation: "Incorrecto. Las novedades físicas y rasguños en exteriores deben atenderse y reportarse obligatoriamente."
          },
          {
            id: "opt2",
            text: "Limpiar y desinfectar la herida con enfermería, lavar manos del grupo y registrar el reporte el mismo día.",
            isCorrect: true,
            explanation: "¡Correcto! Toda lesión, por menor que parezca, exige desinfección preventiva, lavado de manos y registro formal de novedades."
          },
          {
            id: "opt3",
            text: "Suspender de por vida la huerta para todo el salón.",
            isCorrect: false,
            explanation: "Incorrecto. La respuesta debe ser preventiva y proporcional, manteniendo las medidas de bioseguridad."
          }
        ]
      }
    ],
    gameType: "seed-bloom-huerta"
  },
  {
    id: 4,
    slug: "zonas-acompanamiento-descansos",
    title: "Custodia en Zonas de Acompañamiento en Descansos",
    shortTitle: "Zonas de Descanso",
    numeralRange: "Numeral 49",
    summary: "Esquema operativo de 22 zonas, 26 docentes, rotación de 13 semanas y 7 reglas de custodia no negociables.",
    badgeName: "Comandante de Zona",
    badgeIcon: "MapPin",
    estimatedTime: "25 min",
    colorTheme: "from-purple-600 to-violet-800",
    intro: {
      title: "El Sistema de Acompañamiento en Descansos",
      description: "El acompañamiento durante los recesos no es una presencia pasiva ni un momento de ocio docente: es custodia activa asignada para prevenir accidentes, bullying y situaciones de riesgo.",
      keyPoints: [
        "22 zonas de acompañamiento rotativas y 26 docentes programados a lo largo de 13 semanas.",
        "Se debe verificar la asignación diaria cada mañana en la matriz oficial de rotación.",
        "Prohibido abandonar la zona sin relevo previo gestionado formalmente con Coordinación.",
        "Cero celular injustificado y cero tertulias prolongadas entre docentes durante el turno de patio."
      ]
    },
    flashcards: [
      {
        id: "m4-c1",
        category: "Rotación Diaria",
        numeral: "Numeral 49.1",
        front: "¿Por qué no es suficiente con saberse una sola zona de memoria?",
        back: "Porque la asignación cambia diariamente según la matriz de 13 semanas. Cada mañana el docente debe consultar la hoja vigente de la semana."
      },
      {
        id: "m4-c2",
        category: "Relevo Obligatorio",
        numeral: "Numeral 49.2",
        front: "¿Qué debe hacer un docente si tiene una urgencia física durante su turno de zona?",
        back: "Gestionar el relevo con Coordinación ANTES de retirarse. Jamás debe abandonar la zona dejando el perímetro sin cobertura."
      },
      {
        id: "m4-c3",
        category: "Atención Activa",
        numeral: "Numeral 49.2",
        front: "¿Cuáles son los 2 hallazgos más frecuentes observados en auditorías de descansos?",
        back: "1. El uso del teléfono celular para fines personales.\n2. Conversaciones prolongadas entre docentes agrupados, descuidando el campo visual de los estudiantes."
      },
      {
        id: "m4-c4",
        category: "Zonas de Riesgo",
        numeral: "Numeral 49.3",
        front: "¿Cuáles son las zonas que exigen 'Criterio Reforzado' en el campus?",
        back: "Baños y escaleras (Zonas 1, 3, 25), Cancha Preescolar (Zona 10), Puntos ciegos (20, 21, 22, 24), Zonas deportivas y graderías (7, 8, 9, 18, 19, 27) y Comedor (5, 6, 16, 17, 26)."
      }
    ],
    reading: {
      summary: "Estructura del esquema de custodia perimetral y pautas de intervención docente.",
      sections: [
        {
          title: "1. Las Siete Reglas No Negociables en Zona (Num. 49.2)",
          content: `1. **Puntualidad y permanencia:** Llegar antes del timbre e instalarse en el punto exacto asignado.\n2. **Cero abandono sin relevo:** Ante cualquier eventualidad, coordinar el reemplazo previo.\n3. **Cero acuerdos informales:** No cambiar turnos 'de palabra' con compañeros sin registrar en Coordinación.\n4. **Atención 100% activa:** Prohibido el uso de pantallas o reuniones sociales de docentes en patio.\n5. **Intervención inmediata:** Detener empujones, juegos de manos, aislamiento social, llanto o ingreso de terceros.\n6. **Barrido de retorno:** Asegurar que todos los estudiantes desalojen la zona y regresen a clases.\n7. **Trazabilidad diaria:** Reportar incidentes a Coordinación el mismo día.`
        },
        {
          title: "2. Mapa de Criterio Reforzado y Prevención de Puntos Ciegos",
          content: `Puntos neurálgicos de vigilancia:\n\n- **Escaleras y Baños (1, 3, 25):** Evitar aglomeraciones, ocultamiento o juegos de persecución en desniveles.\n- **Cancha Preschool (10):** Protección reforzada; supervisión visual a un metro de los infantes.\n- **Zonas 20, 21, 22 y 24:** Espacios de visibilidad reducida; el docente debe rotar dinámicamente su posición para eliminar ángulos ciegos.\n- **Graderías (18, 19, 27):** Prohibido el trepado o saltos acrobáticos desde las alturas.`
        }
      ]
    },
    cases: [
      {
        id: "m4-case1",
        title: "Caso 1: Caída de un estudiante que se levanta rápidamente",
        situation: "En el área deportiva (Zona 8), un docente observa que un estudiante tropieza fuertemente, llora por unos segundos, se pone de pie y continúa jugando con sus amigos diciendo que 'no fue nada'.",
        question: "¿Qué ordena el numeral 36 y 49?",
        numeralRef: "Numerales 36 y 49",
        options: [
          {
            id: "opt1",
            text: "No intervenir ni reportar, dado que el estudiante continuó jugando sin pedir ayuda.",
            isCorrect: false,
            explanation: "Incorrecto. Los traumas por caídas pueden presentar síntomas posteriores; siempre se debe examinar y reportar."
          },
          {
            id: "opt2",
            text: "Acercarse, verificar que no tenga inflamación, raspadura o conmoción, enviarlo a enfermería si amerita y registrar la novedad el mismo día.",
            isCorrect: true,
            explanation: "¡Correcto! Toda caída y manifestación de dolor o llanto debe ser verificada e informada para proteger al estudiante y respaldar al docente."
          },
          {
            id: "opt3",
            text: "Castigar a los compañeros de juego suspendiéndoles el descanso.",
            isCorrect: false,
            explanation: "Incorrecto. La prioridad es la valoración médica y el registro objetivo del suceso."
          }
        ]
      },
      {
        id: "m4-case2",
        title: "Caso 2: Punto ciego en zona 'Emotional Room' / Pasillo posterior",
        situation: "El docente asignado a la zona 21 (espacio cerrado) nota que desde su posición estática en la entrada no visualiza el rincón posterior detrás de las divisiones.",
        question: "¿Cómo debe proceder según el numeral 49.3?",
        numeralRef: "Numeral 49.3",
        options: [
          {
            id: "opt1",
            text: "Permanecer sentado en la puerta porque allí tiene mejor sombra.",
            isCorrect: false,
            explanation: "Incorrecto. La vigilancia exige eliminación proactiva de puntos ciegos."
          },
          {
            id: "opt2",
            text: "Efectuar patrullaje y rondas dinámicas dentro del perímetro para asegurar control visual de todos los ángulos.",
            isCorrect: true,
            explanation: "¡Correcto! En espacios de baja visibilidad (zonas 20 a 24), el protocolo exige rotar de posición periódicamente."
          },
          {
            id: "opt3",
            text: "Cerrar con llave la puerta para que ningún alumno pueda entrar.",
            isCorrect: false,
            explanation: "Incorrecto. No se pueden bloquear vías de acceso sin autorización institucional."
          }
        ]
      }
    ],
    gameType: "custodia-zonas"
  },
  {
    id: 5,
    slug: "control-acceso-carnes-pickupsj",
    title: "Terceros, Código de Carnés y Pickup SJ Campestre",
    shortTitle: "Visitantes y Pickup SJ",
    numeralRange: "Num. 11.1, 12, 17, 50",
    summary: "Control perimetral de visitantes mediante código de 4 colores y despacho oficial de alumnos por Pickup SJ Campestre.",
    badgeName: "Oficial de Acceso Seguro",
    badgeIcon: "KeyRound",
    estimatedTime: "25 min",
    colorTheme: "from-rose-600 to-red-800",
    intro: {
      title: "Control de Puertas, Visitantes y Entrega de Estudiantes",
      description: "La seguridad escolar depende de saber quién entra a la institución y cómo se entregan los estudiantes. WhatsApp ya no es un canal válido: el despacho se rige 100% por la plataforma Pickup SJ Campestre.",
      keyPoints: [
        "Carnés por color: ROJO (Proveedores), AZUL (Admisiones), VERDE (Eventos) y NEGRO (Citaciones).",
        "Terceros tienen prohibido ingresar a aulas, baños de estudiantes o permanecer a solas con menores.",
        "Pickup SJ Campestre es el único canal oficial para entrega vehicular o peatonal de estudiantes.",
        "La tecnología respalda la entrega, pero no sustituye la verificación visual humana del receptor."
      ]
    },
    flashcards: [
      {
        id: "m5-c1",
        category: "Carné Rojo",
        numeral: "Numeral 7.1",
        front: "¿A qué áreas tiene permitido dirigirse un visitante con CARNÉ ROJO?",
        back: "Proveedores: Únicamente a Recibo de mercancía, almacén general, cafetería y áreas administrativas de suministro."
      },
      {
        id: "m5-c2",
        category: "Carné Azul / Verde / Negro",
        numeral: "Numeral 7.1",
        front: "¿Qué significan los carnés AZUL, VERDE y NEGRO?",
        back: "- AZUL: Admisiones (Recepción y recorridos acompañados).\n- VERDE: Eventos (Zonas públicas del evento).\n- NEGRO: Citaciones (Sala de espera y oficina citante)."
      },
      {
        id: "m5-c3",
        category: "Pickup SJ Campestre",
        numeral: "Numeral 11.1",
        front: "¿Qué debe hacer un docente si un padre le escribe por WhatsApp para autorizar la recogida con un tercero?",
        back: "No validar la autorización. Debe remitir al padre a la app Pickup SJ Campestre o a Coordinación. Un chat personal carece de validez legal institucional."
      },
      {
        id: "m5-c4",
        category: "Rol del Docente en Salida",
        numeral: "Numeral 11.1 & 12",
        front: "¿Cuál es el rol docente durante la hora de salida con la app?",
        back: "La app gestiona el llamado en pantalla, pero el docente debe custodiar al estudiante hasta el punto físico de entrega y verificar visualmente a quien lo recibe."
      }
    ],
    reading: {
      summary: "Manual de control de ingresos externos y operación del sistema digital de despacho de alumnos.",
      sections: [
        {
          title: "1. Código de Color de Carnés Institucionales (Num. 7.1 y 50)",
          content: `Todo visitante debe portar de forma visible su credencial de color:\n\n- **ROJO (Proveedores):** Áreas de descargue, cocina y oficinas de compras. Jamás pasillos pedagógicos.\n- **AZUL (Admisiones):** Recorridos guiados por personal de mercadeo/admisiones.\n- **VERDE (Eventos):** Áreas delimitadas para asambleas o actos culturales.\n- **NEGRO (Citaciones):** Atención en secretaría o coordinaciones.\n\n*Regla de Intervención:* Si un docente divisa un carné fuera de su zona autorizada (ej. carné rojo en preescolar), debe orientarlo de inmediato a portería o reportar a Coordinación.`
        },
        {
          title: "2. Circuito Operativo del Aplicativo Pickup SJ Campestre (Num. 11.1)",
          content: `Pasos del flujo de entrega segura:\n\n1. **Arribo:** El acudiente marca 'Llegué' desde su app móvil.\n2. **Llamado:** El operador institucional proyecta el turno en pantalla y vocea al estudiante.\n3. **Traslado:** El estudiante camina supervisado hacia la bahía de entrega.\n4. **Despacho:** El personal de puerta valida coincidencia de placas, vehículo y documento del autorizado.\n5. **Confirmación:** El sistema cierra la entrega y notifica al acudiente en tiempo real.\n\n**Plan de Contingencia (Caída de red):** Se suspende el despacho automático y se activa validación manual con documento de identidad y libro de firmas en portería.`
        }
      ]
    },
    cases: [
      {
        id: "m5-case1",
        title: "Caso 1: Mensaje de WhatsApp autorizando salida con una tía",
        situation: "A las 2:45 p.m., una madre de familia le envía un mensaje urgente por WhatsApp a la directora de grupo: 'Profe, hoy no alcanzo a llegar, recoge a mi hija mi hermana Claudia en un carro gris, por favor déjela salir'. En la app Pickup no aparece ningún cambio.",
        question: "¿Qué debe hacer la docente según los numerales 11.1 y 12?",
        numeralRef: "Numerales 11.1 y 12",
        options: [
          {
            id: "opt1",
            text: "Entregar a la niña si la señora se presenta en el salón y muestra su cédula física.",
            isCorrect: false,
            explanation: "Incorrecto. Los docentes de aula no pueden autorizar ni entregar alumnos directamente por canales informales."
          },
          {
            id: "opt2",
            text: "Responder respetuosamente que por protocolo debe registrar el cambio en la app Pickup SJ o comunicarse con Coordinación / Portería para validación oficial.",
            isCorrect: true,
            explanation: "¡Correcto! Las autorizaciones por WhatsApp no son válidas. Toda entrega no habitual se tramita por la app o portería."
          },
          {
            id: "opt3",
            text: "Dejar que la niña se vaya sola caminando a su casa.",
            isCorrect: false,
            explanation: "Incorrecto. Se violaría la custodia y el protocolo de entrega institucional."
          }
        ]
      },
      {
        id: "m5-case2",
        title: "Caso 2: Caída de la plataforma Pickup con fila de vehículos",
        situation: "A la hora pico de salida de primaria, se presenta una falla general de conectividad y la aplicación Pickup deja de cargar las solicitudes de los padres.",
        question: "¿Cómo se debe proceder de acuerdo con el numeral 11.1?",
        numeralRef: "Numeral 11.1",
        options: [
          {
            id: "opt1",
            text: "Abrir las puertas y permitir que todos los padres entren a los salones a buscar a sus hijos.",
            isCorrect: false,
            explanation: "Incorrecto. El caos vehicular y el ingreso descontrolado vulneran completamente la seguridad de los menores."
          },
          {
            id: "opt2",
            text: "Activar el protocolo de contingencia manual: verificación de documento en portería, diligenciamiento de planilla física y llamada organizada de estudiantes.",
            isCorrect: true,
            explanation: "¡Correcto! Si la tecnología falla, se activa el procedimiento de verificación física y libro de firmas. Nadie sale sin control."
          },
          {
            id: "opt3",
            text: "Retener a todos los estudiantes en el colegio hasta el día siguiente.",
            isCorrect: false,
            explanation: "Incorrecto. El plan de contingencia física está diseñado exactamente para resolver estas eventualidades."
          }
        ]
      }
    ],
    gameType: "carnes-pickupsj"
  },
  {
    id: 6,
    slug: "cadena-comunicacion-preescolar-camaras",
    title: "Cadena de Comunicación, Preescolar y Cámaras",
    shortTitle: "Cadena y Normativa",
    numeralRange: "Num. 22, 23, 36, 39, 52, 53, 57",
    summary: "Secuencia jerárquica de reporte de novedades, protección reforzada de preescolar y alcance legal de cámaras de seguridad.",
    badgeName: "Líder de Protocolos y Trazabilidad",
    badgeIcon: "Award",
    estimatedTime: "20 min",
    colorTheme: "from-amber-600 to-yellow-600",
    intro: {
      title: "Rutas de Notificación y Garantías Institucionales",
      description: "El cierre del ciclo de seguridad requiere dominar la cadena de mando de emergencias, brindar cuidado superlativo a la primera infancia y entender que las cámaras apoyan pero no reemplazan la mirada docente.",
      keyPoints: [
        "Cadena estricta: Docente ➔ Coordinación ➔ Rectoría ➔ Acudientes ➔ Autoridades externas.",
        "Preescolar goza de 'Protección Reforzada': acompañamiento visual a menos de 2 metros en zonas abiertas.",
        "El circuito cerrado de TV (cámaras) apoya investigaciones pero no exime el deber de vigilancia directa.",
        "El incumplimiento de protocolos acarrea consecuencias formativas y disciplinarias según el RIT."
      ]
    },
    flashcards: [
      {
        id: "m6-c1",
        category: "Cadena de Mando",
        numeral: "Numeral 22",
        front: "¿Cuál es el orden jerárquico inalterable de la cadena de reporte?",
        back: "Docente que identifica la novedad ➔ Coordinación ➔ Rectoría / Directivo ➔ Acudientes (cuando aplique) ➔ Autoridad Externa."
      },
      {
        id: "m6-c2",
        category: "Protección Preescolar",
        numeral: "Numeral 57",
        front: "¿Qué exigencias tiene el estándar de 'Protección Reforzada' en Preescolar?",
        back: "Acompañamiento permanente y cercano, supervisión en baños, control estricto de accesos de terceros y verificación constante de asistencia."
      },
      {
        id: "m6-c3",
        category: "Cámaras de Seguridad",
        numeral: "Numeral 52 y 53",
        front: "¿La existencia de cámaras exime al docente de su vigilancia directa?",
        back: "NO. Las cámaras son un respaldo técnico para auditorías, no un sustituto de la presencia física. Además, la revisión de videos solo es autorizada por Rectoría."
      },
      {
        id: "m6-c4",
        category: "Contenido del Reporte",
        numeral: "Numeral 36",
        front: "¿Cuáles son los 6 datos mínimos que debe contener un reporte de seguridad?",
        back: "1. Fecha y hora.\n2. Lugar exacto.\n3. Personas involucradas.\n4. Descripción objetiva de hechos.\n5. Medidas tomadas.\n6. Nombre y firma del docente que reporta."
      }
    ],
    reading: {
      summary: "Protocolo de gestión de incidentes, protección de infantes y régimen disciplinario institucional.",
      sections: [
        {
          title: "1. Cadena de Comunicación y Alerta Activa (Num. 22 y 23)",
          content: `Ruta de escalamiento:\n\n1. **Detección:** El colaborador interviene con prudencia y contiene la situación.\n2. **Coordinación:** Se notifica al coordinador de nivel o de convivencia.\n3. **Rectoría:** Dirección institucional asume la comunicación oficial.\n4. **Familia:** Se contacta a los padres bajo la orientación de Rectoría.\n5. **Autoridades:** Activación de ICBF, Policía de Infancia o servicios médicos según el caso.\n\n*Hechos de reporte obligatorio:* No ubicación de alumnos, accidentes físicos, emergencias médicas, intrusión de terceros no autorizados o daños estructurales.`
        },
        {
          title: "2. Régimen de Cámaras y Consecuencias Disciplinarias (Num. 39, 52 y 53)",
          content: `Aspectos jurídicos y formativos:\n\n- **Confidencialidad de grabaciones:** Los videos no se divulgan ni entregan a particulares sin orden judicial o autorización de Rectoría.\n- **Debido Proceso:** Las grabaciones no sustituyen la escucha de las partes ni el derecho a la defensa.\n- **Sanciones:** Las omisiones en el deber de supervisión darán lugar a las medidas contempladas en el Reglamento Interno de Trabajo (RIT) con enfoque preventivo y correctivo.`
        }
      ]
    },
    cases: [
      {
        id: "m6-case1",
        title: "Caso 1: Conflicto entre estudiantes con golpe en recreo",
        situation: "Durante el recreo, dos estudiantes de secundaria tienen un altercado físico con un golpe leve. El docente en zona interviene, los separa y calma la situación.",
        question: "¿Cuál es el siguiente paso correcto según el numeral 22 y 36?",
        numeralRef: "Numerales 22 y 36",
        options: [
          {
            id: "opt1",
            text: "Decirles que se den la mano, no reportar nada a nadie y no hacer registro para evitar problemas.",
            isCorrect: false,
            explanation: "Incorrecto. Omitir el reporte constituye una falta al protocolo y deja sin registro la agresión."
          },
          {
            id: "opt2",
            text: "Remitir a enfermería si hubo golpe, notificar a Coordinación de inmediato y radicar el formato de reporte con fecha, hora, nombres y descripción objetiva.",
            isCorrect: true,
            explanation: "¡Correcto! El numeral 22 y 36 exigen la activación de Coordinación y la redacción del reporte formal el mismo día."
          },
          {
            id: "opt3",
            text: "Llamar directamente desde su celular personal a los padres de ambos estudiantes para que vengan a pelear.",
            isCorrect: false,
            explanation: "Incorrecto. La comunicación con acudientes la centraliza Coordinación/Rectoría."
          }
        ]
      },
      {
        id: "m6-case2",
        title: "Caso 2: Solicitud de acudiente para ver grabaciones de cámaras",
        situation: "Un padre de familia se acerca al docente muy alterado exigiendo ver las cámaras de seguridad del pasillo porque a su hijo se le perdió una cartuchera.",
        question: "¿Qué debe responder el docente según el numeral 52 y 53?",
        numeralRef: "Numerales 52 y 53",
        options: [
          {
            id: "opt1",
            text: "Llevar al padre al cuarto de monitoreo y mostrarle las cámaras en vivo.",
            isCorrect: false,
            explanation: "Incorrecto. Los docentes no tienen acceso no autorizado ni pueden mostrar grabaciones a terceros."
          },
          {
            id: "opt2",
            text: "Explicar amablemente que el acceso a cámaras es confidencial y solo lo autoriza Rectoría previa solicitud formal, canalizando el caso a través de Coordinación.",
            isCorrect: true,
            explanation: "¡Correcto! El numeral 52 establece que la revisión de video es de carácter reservado y compete exclusivamente a Rectoría con motivo fundado."
          },
          {
            id: "opt3",
            text: "Grabar la pantalla del computador con su teléfono móvil y enviársela por WhatsApp.",
            isCorrect: false,
            explanation: "Incorrecto. Está estrictamente prohibido difundir grabaciones de menores por canales personales."
          }
        ]
      }
    ],
    gameType: "cadena-reporte"
  }
];

export const TOTAL_MODULES = PROTOCOL_MODULES.length;
