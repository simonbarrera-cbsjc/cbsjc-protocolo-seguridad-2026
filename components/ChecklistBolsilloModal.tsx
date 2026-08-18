"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckSquare, Square, ClipboardCheck, RotateCcw, ShieldCheck } from "lucide-react";

interface ChecklistItem {
  id: string;
  category: "Antes de mover el grupo" | "En zona de acompañamiento" | "Durante cualquier actividad" | "En la salida" | "Al terminar";
  label: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: "c1", category: "Antes de mover el grupo", label: "Conté los estudiantes antes de salir del aula." },
  { id: "c2", category: "Antes de mover el grupo", label: "Sé con claridad a dónde vamos y por qué ruta nos desplazaremos." },
  { id: "c3", category: "Antes de mover el grupo", label: "Diligencié el formato de traslado institucional (si aplica)." },
  { id: "c4", category: "En zona de acompañamiento", label: "Consulté la matriz de rotación de la semana vigente esta mañana." },
  { id: "c5", category: "En zona de acompañamiento", label: "Estoy en el punto asignado desde el inicio exacto del descanso." },
  { id: "c6", category: "En zona de acompañamiento", label: "Si requiero ausentarme, dejé relevo confirmado previamente con Coordinación." },
  { id: "c7", category: "En zona de acompañamiento", label: "Verifiqué el retorno de todos los estudiantes al aula al terminar el timbre." },
  { id: "c8", category: "Durante cualquier actividad", label: "Mantengo control visual permanente de todo el grupo." },
  { id: "c9", category: "Durante cualquier actividad", label: "El uso del celular NO compromete mi vigilancia activa." },
  { id: "c10", category: "Durante cualquier actividad", label: "Nadie se adelantó, se retrasó ni se separó del colectivo." },
  { id: "c11", category: "En la salida", label: "Acompañé y supervisé al estudiante hasta el punto de entrega." },
  { id: "c12", category: "En la salida", label: "NO autoricé ninguna entrega por WhatsApp, llamada o canal personal." },
  { id: "c13", category: "En la salida", label: "Reporté a Coordinación cualquier inconsistencia en el llamado o demora." },
  { id: "c14", category: "Al terminar", label: "Volví a contar el grupo al ingresar al salón o finalizar la jornada." },
  { id: "c15", category: "Al terminar", label: "Reporté y registré formalmente las novedades ocurridas el mismo día." }
];

export default function ChecklistBolsilloModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cbsjc_security_checklist");
    if (saved) {
      try {
        setCheckedIds(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleItem = (id: string) => {
    const updated = checkedIds.includes(id)
      ? checkedIds.filter((item) => item !== id)
      : [...checkedIds, id];
    setCheckedIds(updated);
    localStorage.setItem("cbsjc_security_checklist", JSON.stringify(updated));
  };

  const resetAll = () => {
    setCheckedIds([]);
    localStorage.removeItem("cbsjc_security_checklist");
  };

  const categories = Array.from(new Set(CHECKLIST_ITEMS.map((item) => item.category)));
  const progress = Math.round((checkedIds.length / CHECKLIST_ITEMS.length) * 100);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Checklist de Bolsillo del Docente</h3>
                <p className="text-xs text-slate-400">Anexo A · Protocolos Institucionales de Seguridad SJB-RGD003</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Banner */}
          <div className="px-6 py-3 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-300">
                Cumplimiento Operativo: <strong className="text-emerald-400">{progress}%</strong> ({checkedIds.length}/{CHECKLIST_ITEMS.length})
              </span>
            </div>
            <button
              onClick={resetAll}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar todo</span>
            </button>
          </div>

          {/* Items by Category */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
            {categories.map((cat) => {
              const items = CHECKLIST_ITEMS.filter((item) => item.category === cat);
              return (
                <div key={cat} className="space-y-2.5">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-950/30 px-3 py-1 rounded-md border border-blue-900/40 inline-block">
                    {cat}
                  </h4>
                  <div className="space-y-2">
                    {items.map((item) => {
                      const isChecked = checkedIds.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`w-full p-3.5 rounded-xl border text-left text-sm flex items-start gap-3 transition-all ${
                            isChecked
                              ? "bg-emerald-950/30 border-emerald-600/50 text-emerald-200"
                              : "bg-slate-950/50 border-slate-800/80 hover:border-slate-700 text-slate-300"
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-500" />
                            )}
                          </div>
                          <span className={`flex-1 leading-relaxed ${isChecked ? "line-through text-slate-400" : ""}`}>
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
            <span>Guarda automáticamente tu avance en este dispositivo.</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
            >
              Listo
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
