"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ChevronDown, CheckCircle2, Search, Filter } from "lucide-react";

interface CaseItem {
  id: number;
  title: string;
  category: "Desplazamientos" | "Zonas y Patios" | "Visitantes y Salidas" | "Urgencias y Salud" | "Preescolar";
  facts: string;
  protocolAnalysis: string;
  numeral: string;
}

const CASOS_ANEXO_B: CaseItem[] = [
  {
    id: 1,
    title: "Caso 1: El estudiante que se desvía al baño",
    category: "Desplazamientos",
    facts: "Un alumno de 4.° grado pide permiso de baño durante el cambio de clase y demora 18 minutos. Cuando el docente lo busca, lo encuentra conversando con estudiantes de otro grado en el corredor opuesto.",
    protocolAnalysis: "Aplicación del Numeral 42 y 43. El docente debe cronometrar el permiso de baño. Al superar el tiempo razonable (más de 10 min), debe activar verificación inmediata. Corresponde llamado de atención formativo y registro de novedad.",
    numeral: "Numerales 42, 43 y 56"
  },
  {
    id: 2,
    title: "Caso 2: Relevo informal en zona de acompañamiento",
    category: "Zonas y Patios",
    facts: "Un docente asignado a la Zona 7 (Coliseo/Graderías) acuerda con un compañero que lo cubra 15 minutos mientras atiende una llamada familiar urgente, sin notificar a Coordinación. Durante esos minutos, un estudiante cae de una gradería.",
    protocolAnalysis: "Violación de la Regla 2 del Numeral 49.2 y Numeral 56. Todo relevo debe ser gestionado y formalizado ante Coordinación. Los acuerdos informales rompen la trazabilidad de custodia y configuran culpa atribuible al docente asignado.",
    numeral: "Numerales 49.2, 56 y 39"
  },
  {
    id: 3,
    title: "Caso 3: Autorización por chat personal de WhatsApp",
    category: "Visitantes y Salidas",
    facts: "Una acudiente envía un mensaje de WhatsApp a las 2:50 p.m. a la directora de grupo pidiendo entregar al menor a un tío que nunca ha ido al colegio. El tío llega en moto a portería.",
    protocolAnalysis: "Aplicación estricta del Numeral 11.1 y 12. WhatsApp NO es canal oficial de autorización de salida. El menor no puede ser entregado hasta que el acudiente registre el cambio en Pickup SJ Campestre o se active el protocolo manual de contingencia en portería con Coordinación.",
    numeral: "Numerales 11.1, 12 y 14"
  },
  {
    id: 4,
    title: "Caso 4: Visitante con carné rojo en zona no autorizada",
    category: "Visitantes y Salidas",
    facts: "Un técnico de mantenimiento de impresoras con CARNÉ ROJO camina por el pabellón de salones de preescolar buscando a una docente para entregarle una factura.",
    protocolAnalysis: "Aplicación del Numeral 7.1, 17 y 50. El carné ROJO restringe al portador exclusivamente a zonas de abastecimiento/compras. El docente que lo observe debe interceptarlo amablemente, orientarlo a portería y reportar el tránsito indebido.",
    numeral: "Numerales 7.1, 17 y 50"
  },
  {
    id: 5,
    title: "Caso 5: Lesión durante el programa SEED BLOOM",
    category: "Desplazamientos",
    facts: "Durante la sesión de equitación, un estudiante de 3.° se asusta al montar y sufre un raspón leve en el brazo. El instructor de equitación lo cura en el sitio. El docente titular no estaba presente observando porque fue a la sala de profesores.",
    protocolAnalysis: "Violación de la Idea Fuerza 3 y Numeral 47. El docente titular mantiene la supervisión activa obligatoria y no puede delegar su presencia en el instructor externo. Toda lesión o susto requiere reporte formal inmediato (Num. 36).",
    numeral: "Idea Fuerza 3, Num. 47 y 36"
  },
  {
    id: 6,
    title: "Caso 6: Solicitud de baño por parte de un conductor de ruta",
    category: "Visitantes y Salidas",
    facts: "Un conductor de transporte escolar solicita entrar al baño de estudiantes ubicado en el bloque de primaria antes del despacho de la tarde.",
    protocolAnalysis: "Aplicación del Numeral 45. Los baños de estudiantes son de uso EXCLUSIVO de menores matriculados. El conductor debe ser remitido a la batería de baños de uso general o del personal administrativo.",
    numeral: "Numeral 45"
  },
  {
    id: 7,
    title: "Caso 7: Estudiante sin ubicar tras el cambio de clase",
    category: "Desplazamientos",
    facts: "Al sonar el timbre de cambio de hora, la docente cuenta su grupo en el salón y nota la falta de 1 estudiante de 6.°. Pasan 12 minutos de búsqueda individual sin éxito.",
    protocolAnalysis: "Aplicación del Numeral 43. Ante la no ubicación de un alumno por más de 10 minutos, debe notificarse formalmente a Coordinación para desplegar la búsqueda perimetral institucional.",
    numeral: "Numerales 43 y 22"
  },
  {
    id: 8,
    title: "Caso 8: Desplazamiento no reportado a la huerta escolar",
    category: "Desplazamientos",
    facts: "Un docente de ciencias decide llevar de forma espontánea a su grupo a la huerta sin avisar a Coordinación ni coordinar el uso de herramientas.",
    protocolAnalysis: "Violación del Numeral 46 y 48. Toda salida del aula a espacios abiertos exige coordinación previa, diligenciamiento de trazabilidad y conteo estricto antes, durante y después.",
    numeral: "Numerales 46, 48 y 41"
  },
  {
    id: 9,
    title: "Caso 9: Niño de preescolar sin recoger a las 3:45 p.m.",
    category: "Preescolar",
    facts: "Un alumno de Kínder queda rezagado en portería tras el fin de la jornada vehicular. La docente titular se retira a su casa dejando al niño solo con el vigilante.",
    protocolAnalysis: "Violación de la Protección Reforzada (Num. 57) y Numeral 13. El menor rezagado debe quedar bajo custodia del docente de guardia o Coordinación, registrando en acta el retraso y contactando a los acudientes según el protocolo de entregas tardías.",
    numeral: "Numerales 13 y 57"
  },
  {
    id: 10,
    title: "Caso 10: Caída en gradería y omisión de reporte",
    category: "Urgencias y Salud",
    facts: "Un estudiante se golpea la rodilla en el descanso. El docente de zona lo envía a lavarse la cara y el estudiante dice que 'ya no le duele'. Por la noche, el padre lleva al niño a urgencias por fractura y reclama al colegio.",
    protocolAnalysis: "Incumplimiento de la Idea Fuerza 4 y Numeral 36. Todo incidente con dolor, golpe o caída debe remitirse a enfermería y quedar consignado en el reporte de seguridad del día, sin importar la manifestación inicial del estudiante.",
    numeral: "Idea Fuerza 4, Num. 36 y 22"
  },
  {
    id: 11,
    title: "Caso 11: Solicitud de acudiente para revisar cámaras",
    category: "Urgencias y Salud",
    facts: "Un padre de familia exige a la directora de grupo que le muestre los videos del circuito cerrado de televisión del patio donde su hijo perdió una chaqueta.",
    protocolAnalysis: "Aplicación de los Numerales 52 y 53. El acceso y revisión de grabaciones es confidencial y de potestad exclusiva de Rectoría. La docente debe orientar al padre a radicar su solicitud ante la dirección institucional.",
    numeral: "Numerales 52 y 53"
  },
  {
    id: 12,
    title: "Caso 12: Intento de entrega en contingencia sin documento",
    category: "Visitantes y Salidas",
    facts: "Se cae el fluido eléctrico y falla el sistema Pickup SJ. Llega una vecina a recoger a dos estudiantes diciendo ser enviada por los padres, pero no porta cédula ni aparece registrada en la ficha física de emergencia.",
    protocolAnalysis: "Aplicación del Protocolo Manual de Contingencia (Num. 27 y 28). En caso de falla tecnológica, no se entrega a ningún menor sin cotejo contra la planilla física de autorizados y documento de identidad. Coordinación debe comunicarse telefónicamente con los padres para validar.",
    numeral: "Numerales 26, 27 y 28"
  }
];

export default function CasosPracticosModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const categories = ["Todos", "Desplazamientos", "Zonas y Patios", "Visitantes y Salidas", "Urgencias y Salud", "Preescolar"];

  const filteredCases = CASOS_ANEXO_B.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.facts.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.protocolAnalysis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.numeral.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "Todos" || c.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Banco de 12 Casos Prácticos Institucionales</h3>
                <p className="text-xs text-slate-400">Anexo B · Casos para discusión y fundamentación normativa</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por palabra clave, numeral o hecho..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                    selectedCategory === cat
                      ? "bg-amber-500/20 border-amber-500/60 text-amber-300"
                      : "bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cases List */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
            {filteredCases.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No se encontraron casos que coincidan con la búsqueda.
              </div>
            ) : (
              filteredCases.map((c) => {
                const isExpanded = expandedId === c.id;
                return (
                  <div
                    key={c.id}
                    className="border border-slate-800 rounded-xl bg-slate-950/50 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : c.id)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-800/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">
                          {c.id}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-white">{c.title}</h4>
                          <span className="text-xs text-amber-400/90 font-mono">{c.numeral}</span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-amber-400" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-4 pt-2 border-t border-slate-800/60 space-y-3 text-xs sm:text-sm"
                        >
                          <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                            <span className="font-bold text-slate-300 block mb-1 text-xs uppercase tracking-wide">
                              Situación Fáctica:
                            </span>
                            <p className="text-slate-300 leading-relaxed">{c.facts}</p>
                          </div>

                          <div className="bg-emerald-950/20 p-3.5 rounded-lg border border-emerald-800/40">
                            <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-xs uppercase tracking-wide mb-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Resolución y Estándar Institucional:</span>
                            </div>
                            <p className="text-emerald-200 leading-relaxed">{c.protocolAnalysis}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
            <span>Se recomienda socializar estos 12 casos en las jornadas pedagógicas docentes.</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
