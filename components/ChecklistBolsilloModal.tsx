"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckSquare, Square, ClipboardCheck, Sparkles, AlertCircle, RotateCcw } from "lucide-react";

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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-3xl bg-white rounded-[28px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header (Light Theme) */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center">
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

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar (Light Theme) */}
          <div className="px-6 py-3.5 bg-blue-50/50 border-b border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3">
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
          <div className="p-6 flex-1 overflow-y-auto space-y-6 bg-white custom-scrollbar">
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
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <p className="text-[11px] text-slate-500 font-medium">
              Guarda automáticamente tu avance en este dispositivo.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-xs font-bold text-white uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            >
              Listo
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
