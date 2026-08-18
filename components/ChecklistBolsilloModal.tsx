"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckSquare, Square, ClipboardCheck, RotateCcw, Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

interface ChecklistItem {
  id: string;
  category: string;
  moment: "Antes de Mover el Grupo" | "En Zona de Acompañamiento" | "Durante la Sesión / Aula" | "Al Finalizar la Jornada";
  task: string;
  numeralRef: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: "c1", category: "Traslados", moment: "Antes de Mover el Grupo", task: "Conté los estudiantes antes de salir del aula de origen.", numeralRef: "Idea Fuerza 2 & Num. 41" },
  { id: "c2", category: "Traslados", moment: "Antes de Mover el Grupo", task: "Verifiqué que el desplazamiento se realice por la ruta segura y autorizada.", numeralRef: "Num. 41" },
  { id: "c3", category: "Traslados", moment: "Antes de Mover el Grupo", task: "Confirmé autorización previa si se trata de un desplazamiento no habitual.", numeralRef: "Num. 56" },
  
  { id: "c4", category: "Patios", moment: "En Zona de Acompañamiento", task: "Consulté la matriz de rotación de la semana vigente para mi punto asignado.", numeralRef: "Num. 49" },
  { id: "c5", category: "Patios", moment: "En Zona de Acompañamiento", task: "Llegué a mi zona asignada desde el inicio exacto del descanso escolar.", numeralRef: "Num. 49.3" },
  { id: "c6", category: "Patios", moment: "En Zona de Acompañamiento", task: "Mantengo recorrido perimetral activo sin uso distractivo de celular.", numeralRef: "Num. 49.3 & 56" },
  { id: "c7", category: "Patios", moment: "En Zona de Acompañamiento", task: "Vigilo accesos a baños y puntos ciegos de mi sector.", numeralRef: "Num. 49.4" },
  { id: "c8", category: "Patios", moment: "En Zona de Acompañamiento", task: "Si requiero ausentarme, solicito y recibo relevo formal autorizado.", numeralRef: "Num. 49.3 & 56" },
  
  { id: "c9", category: "Aula/Campo", moment: "Durante la Sesión / Aula", task: "En SEED BLOOM, huerta o deportes, mantengo supervisión física constante.", numeralRef: "Idea Fuerza 3 & Num. 46" },
  { id: "c10", category: "Aula/Campo", moment: "Durante la Sesión / Aula", task: "En picadero ecuestre, verifiqué el uso obligatorio de casco y EPP.", numeralRef: "Num. 47" },
  { id: "c11", category: "Baños", moment: "Durante la Sesión / Aula", task: "En preescolar, acompaño hasta la puerta del baño; en primaria cronometro retorno.", numeralRef: "Num. 42 & 43" },
  { id: "c12", category: "Baños", moment: "Durante la Sesión / Aula", task: "Verifico que ningún adulto externo ingrese a baños de estudiantes.", numeralRef: "Num. 45" },
  
  { id: "c13", category: "Salidas", moment: "Al Finalizar la Jornada", task: "Valido la entrega de estudiantes exclusivamente por el sistema Pickup SJ.", numeralRef: "Num. 26 & 27" },
  { id: "c14", category: "Salidas", moment: "Al Finalizar la Jornada", task: "Rechacé solicitudes de entrega por WhatsApp o llamadas no validadas.", numeralRef: "Idea Fuerza 5 & Num. 28" },
  { id: "c15", category: "Novedades", moment: "Al Finalizar la Jornada", task: "Radiqué formalmente toda novedad o reporte el mismo día con los 6 datos clave.", numeralRef: "Idea Fuerza 4 & Num. 36" }
];

export default function ChecklistBolsilloModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cbsjc_security_pocket_checklist");
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    const next = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(next);
    localStorage.setItem("cbsjc_security_pocket_checklist", JSON.stringify(next));
  };

  const handleReset = () => {
    setCheckedItems({});
    localStorage.removeItem("cbsjc_security_pocket_checklist");
  };

  const total = CHECKLIST_ITEMS.length;
  const completed = Object.values(checkedItems).filter(Boolean).length;
  const percent = Math.round((completed / total) * 100);

  const moments: ("Antes de Mover el Grupo" | "En Zona de Acompañamiento" | "Durante la Sesión / Aula" | "Al Finalizar la Jornada")[] = [
    "Antes de Mover el Grupo",
    "En Zona de Acompañamiento",
    "Durante la Sesión / Aula",
    "Al Finalizar la Jornada"
  ];

  const handleDownloadPDF = async () => {
    const node = document.getElementById("checklist-print-area");
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

      pdf.save("CBSJC-Anexo-A-Checklist-Bolsillo-Seguridad.pdf");
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
          className="w-full max-w-3xl bg-white rounded-[28px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header (Light Theme) */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase">
                  Anexo A · Herramienta Operativa
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase">
                  Checklist de Bolsillo del Docente
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white hover:bg-primary-light text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                title="Descargar Checklist en PDF"
              >
                {isGeneratingPdf ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">Descargar PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar (Light Theme) */}
          <div className="px-5 sm:px-6 py-3.5 bg-blue-50/50 border-b border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-blue-900">Cumplimiento Operativo:</span>
              <span className="text-xs font-extrabold text-blue-700 bg-white px-2.5 py-0.5 rounded-full border border-blue-200 shadow-xs">
                {percent}% ({completed}/{total})
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="h-2 w-36 bg-blue-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer uppercase tracking-wider"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>

          {/* Items List by Moments (100% Light Theme) */}
          <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-6 bg-white custom-scrollbar">
            {moments.map((moment) => {
              const items = CHECKLIST_ITEMS.filter((item) => item.moment === moment);
              return (
                <div key={moment} className="space-y-3">
                  <h4 className="text-xs font-black text-primary uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span>{moment}</span>
                  </h4>

                  <div className="grid grid-cols-1 gap-2.5">
                    {items.map((item) => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer select-none ${
                            isChecked
                              ? "bg-emerald-50/60 border-emerald-300 text-slate-800 shadow-xs"
                              : "bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-400" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={`text-xs sm:text-sm leading-snug font-semibold ${isChecked ? "line-through text-slate-400" : "text-slate-800"}`}>
                              {item.task}
                            </p>
                            <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                              Ref: {item.numeralRef}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer (Light Theme) */}
          <div className="px-5 sm:px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-slate-500 font-medium text-center sm:text-left">
              Guarda automáticamente tu avance en este dispositivo.
            </p>
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
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-xs font-bold text-white uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                Listo
              </button>
            </div>
          </div>

        </motion.div>

      </div>

      {/* Hidden Printable Container for High-Res PDF */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none">
        <div
          id="checklist-print-area"
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
                ANEXO A: CHECKLIST DE BOLSILLO
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-sm font-black text-[#0B1953] uppercase">
              Lista de Chequeo Operativa para el Docente en Custodia
            </h2>
            <p className="text-[11px] text-slate-600 leading-relaxed text-justify">
              Herramienta de verificación de cumplimiento de deberes de supervisión activa, traslados seguros, matriz de patios y entrega de estudiantes en el marco de la Ley 1098 de 2006 y el Código SJB-RGD003 V2.
            </p>
          </div>

          {/* Checklist Sections */}
          <div className="space-y-5">
            {moments.map((moment) => {
              const items = CHECKLIST_ITEMS.filter((item) => item.moment === moment);
              return (
                <div key={moment} className="space-y-2">
                  <div className="bg-slate-100 px-3 py-1.5 rounded-lg border-l-4 border-[#0B1953]">
                    <h3 className="text-xs font-black text-[#0B1953] uppercase tracking-wider">
                      {moment}
                    </h3>
                  </div>
                  <div className="space-y-1.5 pl-1">
                    {items.map((item, idx) => (
                      <div key={item.id} className="flex items-start gap-3 text-[11px] border-b border-slate-100 pb-1.5">
                        <div className="w-4 h-4 rounded border-2 border-slate-400 mt-0.5 shrink-0 flex items-center justify-center font-bold text-[9px] text-[#0B1953]">
                          {checkedItems[item.id] ? "✓" : ""}
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-slate-800">{item.task}</span>
                          <span className="text-[10px] font-mono text-slate-500 ml-2">({item.numeralRef})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Signatures & Footer */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-[11px]">
            <div className="border-t border-slate-400 pt-2 text-center">
              <p className="font-bold text-[#0B1953]">Firma del Docente / Funcionario</p>
              <p className="text-[10px] text-slate-500">C.C. ________________________</p>
            </div>
            <div className="border-t border-slate-400 pt-2 text-center">
              <p className="font-bold text-[#0B1953]">Coordinación de Convivencia CBSJC</p>
              <p className="text-[10px] text-slate-500">Verificación de Cumplimiento</p>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-slate-100 text-[10px] text-slate-400">
            Colegio Bilingüe San José Campestre — Protocolos de Seguridad SJB-RGD003 V2 • Desarrollado por Scibaru AI
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
