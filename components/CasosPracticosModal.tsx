"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ChevronDown, CheckCircle2, Search, Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

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
    facts: "Un conductor de transporte escolar contratado ingresa al colegio a las 11:30 a.m. a usar el baño de estudiantes del edificio de primaria mientras los niños están en clase.",
    protocolAnalysis: "Violación del Numeral 45. Todo adulto externo debe usar exclusivamente los baños para adultos/visitantes ubicados en portería o área administrativa. Está terminantemente prohibido el ingreso de adultos a baterías sanitarias infantiles.",
    numeral: "Numerales 45 y 56"
  },
  {
    id: 7,
    title: "Caso 7: Extravío temporal durante traslado a cancha",
    category: "Desplazamientos",
    facts: "Un grupo de 1.° de primaria se desplaza del salón a la cancha de fútbol. Al llegar, el docente nota que faltan 2 estudiantes que se quedaron en la fuente de agua.",
    protocolAnalysis: "Falla en la rutina de conteo en 3 tiempos (Num. 41). El conteo debe realizarse inmediatamente al salir del aula y al ingresar a la zona de destino, caminando con el grupo ordenado y vigilando la retaguardia.",
    numeral: "Idea Fuerza 2 y Numeral 41"
  },
  {
    id: 8,
    title: "Caso 8: Reporte de novedad al día siguiente",
    category: "Urgencias y Salud",
    facts: "Un estudiante sufre un golpe en la cabeza jugando fútbol a las 10:15 a.m. La docente le pone hielo y el estudiante sigue jugando normal. La docente decide no pasar reporte escrito porque 'no fue nada grave' y planea contarlo al día siguiente en el comité.",
    protocolAnalysis: "Incumplimiento grave de la Idea Fuerza 4 y Numeral 36. Todo golpe en la cabeza o novedad debe reportarse formalmente el MISMO DÍA antes de finalizar la jornada, informando a Enfermería, Coordinación y Acudientes.",
    numeral: "Idea Fuerza 4, Numeral 36 y 37"
  },
  {
    id: 9,
    title: "Caso 9: Niño de Preescolar que sale del aula sin aviso",
    category: "Preescolar",
    facts: "En Kínder, mientras la docente reparte material en las mesas, un niño sale al corredor siguiendo una mariposa sin que nadie lo note durante 4 minutos.",
    protocolAnalysis: "Aplicación del Numeral 43 y 56. En Preescolar la ratio de supervisión y control de puertas debe ser continua. Las puertas deben permanecer bajo control visual y el conteo visual de cabezas debe ser constante.",
    numeral: "Numerales 43 y 56"
  },
  {
    id: 10,
    title: "Caso 10: Descanso en zona de baja visibilidad",
    category: "Zonas y Patios",
    facts: "Durante el recreo, tres estudiantes de bachillerato se reúnen detrás del coliseo en un punto ciego para manipular un encendedor. El docente de la zona 6 permaneció sentado en la banca central.",
    protocolAnalysis: "Violación del Numeral 49.3 y 49.4. El acompañamiento en patios exige 'recorrido perimetral activo' y vigilancia prioritaria de puntos ciegos, esquinas y accesos a baños.",
    numeral: "Numerales 49.3 y 49.4"
  },
  {
    id: 11,
    title: "Caso 11: Acudiente molesto que ingresa sin carné",
    category: "Visitantes y Salidas",
    facts: "Un padre de familia entra por la portería sin registrarse aprovechando que se abrió el portón vehicular y se dirige directamente al salón de su hijo a reclamarle a la docente por una nota.",
    protocolAnalysis: "Violación del Numeral 7, 8 y 16. Ningún visitante puede circular sin carné asignado ni cita previa. La docente debe mantener la calma, no permitir la interrupción de la clase y solicitar apoyo inmediato de Coordinación / Portería.",
    numeral: "Numerales 7, 8, 16 y 22"
  },
  {
    id: 12,
    title: "Caso 12: Pérdida de un carné de visitante",
    category: "Visitantes y Salidas",
    facts: "Un contratista sale del colegio y afirma haber extraviado el carné amarillo de mantenimiento que le fue entregado en la mañana.",
    protocolAnalysis: "Aplicación del Numeral 7.4. Portería debe registrar el incidente, retener la identificación del visitante hasta verificar con Coordinación y activar el reporte de reposición y anulación del número de carné.",
    numeral: "Numerales 7.4 y 36"
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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!isOpen) return null;

  const categories = ["Todos", "Desplazamientos", "Zonas y Patios", "Visitantes y Salidas", "Urgencias y Salud", "Preescolar"];

  const filteredCases = CASOS_ANEXO_B.filter((c) => {
    const matchesCat = selectedCategory === "Todos" || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.facts.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.protocolAnalysis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.numeral.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDownloadPDF = async () => {
    const node = document.getElementById("casos-print-area");
    if (!node) return;

    try {
      setIsGeneratingPdf(true);

      const dataUrl = await toPng(node, {
        quality: 1,
        pixelRatio: 2.5,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pageHeight = pdf.internal.pageSize.getHeight();

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 2) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("CBSJC-Anexo-B-12-Casos-Practicos-Seguridad.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-4xl bg-white rounded-[28px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header (Light Theme) */}
          <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest text-accent uppercase">
                  Anexo B · Casos Prácticos Institucionales
                </span>
                <h3 className="text-sm sm:text-base md:text-lg font-black text-primary uppercase">
                  Banco de 12 Casos de Custodia Escolar
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white hover:bg-primary-light text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                title="Descargar Casos en PDF"
              >
                {isGeneratingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">Descargar PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search & Filter Bar (Light Theme) */}
          <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por palabra clave, numeral o hecho..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent shadow-xs"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cases List (Light Theme) */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5 flex-1 bg-white custom-scrollbar">
            {filteredCases.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs font-semibold">
                No se encontraron casos que coincidan con la búsqueda.
              </div>
            ) : (
              filteredCases.map((c) => {
                const isExpanded = expandedId === c.id;
                return (
                  <div
                    key={c.id}
                    className="border border-slate-200 rounded-2xl bg-slate-50/60 overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : c.id)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-100/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-xs font-black shrink-0">
                          {c.id}
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-primary uppercase">{c.title}</h4>
                          <span className="text-[11px] text-accent font-bold font-mono">{c.numeral}</span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-accent" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-4 pt-2 border-t border-slate-100 space-y-3 text-xs sm:text-sm bg-white"
                        >
                          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                            <span className="font-black text-primary block mb-1 text-[11px] uppercase tracking-wide">
                              Situación Fáctica:
                            </span>
                            <p className="text-slate-700 leading-relaxed font-medium">{c.facts}</p>
                          </div>

                          <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200">
                            <div className="flex items-center gap-1.5 font-black text-emerald-800 text-[11px] uppercase tracking-wide mb-1">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Resolución y Estándar Institucional:</span>
                            </div>
                            <p className="text-emerald-900 leading-relaxed font-medium">{c.protocolAnalysis}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer (Light Theme) */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span className="font-medium text-center sm:text-left">
              Casos para discusión y fundamentación en jornadas pedagógicas y comités de seguridad.
            </span>
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
              >
                {isGeneratingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                <span>Descargar PDF</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-all cursor-pointer shadow-xs uppercase tracking-wider text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hidden Printable Container for High-Res Multi-page PDF */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none">
        <div
          id="casos-print-area"
          className="w-[794px] bg-white p-10 text-slate-900 font-sans space-y-6"
        >
          {/* Official Header */}
          <div className="flex items-center justify-between border-b-2 border-[#0B1953] pb-4">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16">
                <Image
                  src="/logo-cbsjc.png"
                  alt="Escudo CBSJC"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-base font-black text-[#0B1953] uppercase tracking-tight">
                  COLEGIO BILINGÜE SAN JOSÉ CAMPESTRE
                </h1>
                <p className="text-xs font-bold text-[#D91A23] uppercase">
                  CBSJC S.A.S. · Protocolos Institucionales de Seguridad
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  Palmira, Valle del Cauca · Vigencia 2026 - 2027
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block bg-[#0B1953]/10 text-[#0B1953] font-mono font-bold text-[11px] px-3 py-1 rounded-md border border-[#0B1953]/20">
                SJB-RGD003 V2
              </span>
              <p className="text-[10px] font-bold text-slate-600 mt-1 uppercase">
                ANEXO B: BANCO DE 12 CASOS PRÁCTICOS
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-sm font-black text-[#0B1953] uppercase">
              Situaciones Reales de Custodia y Resolución Técnico-Jurídica
            </h2>
            <p className="text-[11px] text-slate-600 leading-relaxed text-justify">
              Guía de análisis jurisprudencial e institucional para la resolución preventiva de incidentes en patios, traslados, salidas y emergencias escolares.
            </p>
          </div>

          {/* 12 Cases Grid */}
          <div className="space-y-4">
            {CASOS_ANEXO_B.map((c) => (
              <div key={c.id} className="border border-slate-300 rounded-xl p-3.5 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#0B1953] text-white text-[10px] font-black px-2 py-0.5 rounded">
                      CASO #{c.id}
                    </span>
                    <span className="font-bold text-xs text-[#0B1953] uppercase">{c.title}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#D91A23] font-mono">{c.numeral}</span>
                </div>

                <div className="text-[11px] text-slate-700 leading-snug">
                  <strong className="text-slate-900 uppercase text-[10px]">Hechos: </strong>
                  {c.facts}
                </div>

                <div className="text-[11px] text-emerald-950 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200 leading-snug">
                  <strong className="text-emerald-900 uppercase text-[10px] block mb-0.5">
                    Resolución y Estándar Institucional:
                  </strong>
                  {c.protocolAnalysis}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-slate-200 text-center text-[10px] text-slate-400">
            Colegio Bilingüe San José Campestre — Protocolos de Seguridad SJB-RGD003 V2 • Desarrollado por Scibaru AI
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
