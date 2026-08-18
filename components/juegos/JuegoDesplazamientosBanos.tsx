"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footprints, CheckCircle2, AlertTriangle, RefreshCw, Trophy, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface Scenario {
  id: number;
  level: "Preescolar" | "Primaria Inicial" | "Secundaria/Media";
  situation: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const ESCENARIOS: Scenario[] = [
  {
    id: 1,
    level: "Preescolar",
    situation: "Un grupo de 15 niños de Kínder debe trasladarse del salón al patio de juegos.",
    options: [
      {
        text: "Enviar a los niños adelante corriendo mientras el docente termina de organizar el material.",
        isCorrect: false,
        explanation: "Incorrecto. Regla Dura: Ningún grupo se desplaza solo sin acompañamiento institucional."
      },
      {
        text: "Verificar asistencia, organizar el grupo en fila, acompañar durante todo el recorrido con control visual y recontar al llegar.",
        isCorrect: true,
        explanation: "¡Correcto! Cumple la rutina obligatoria de 6 pasos de desplazamiento (Numeral 41)."
      },
      {
        text: "Dejar que el monitor de 5 años guíe el grupo por los pasillos.",
        isCorrect: false,
        explanation: "Incorrecto. La custodia de menores no se delega en otros estudiantes."
      }
    ]
  },
  {
    id: 2,
    level: "Preescolar",
    situation: "Una niña de Transición pide ir al baño en medio de una actividad.",
    options: [
      {
        text: "Acompañarla con docente o auxiliar hasta la puerta del baño, esperar afuera en punto prudente y verificar retorno.",
        isCorrect: true,
        explanation: "¡Correcto! El Numeral 44.1 exige acompañamiento hasta la zona de baño respetando la intimidad del menor."
      },
      {
        text: "Entrar al cubículo cerrado con la niña y quedarse adentro mientras usa el sanitario.",
        isCorrect: false,
        explanation: "Incorrecto. Se debe evitar la permanencia innecesaria en espacios cerrados para proteger la privacidad."
      },
      {
        text: "Darle la llave y decirle que vaya sola porque el baño queda a la vuelta.",
        isCorrect: false,
        explanation: "Incorrecto. En preescolar jamás se permite el desplazamiento individual no supervisado."
      }
    ]
  },
  {
    id: 3,
    level: "Primaria Inicial",
    situation: "Un estudiante de 2.° de primaria lleva 12 minutos en el baño y no ha regresado.",
    options: [
      {
        text: "Asumir que se demoró lavándose las manos y esperar al final de la jornada.",
        isCorrect: false,
        explanation: "Incorrecto. El exceso del tiempo razonable exige activación inmediata de búsqueda."
      },
      {
        text: "Verificar de inmediato el baño o enviar apoyo docente e informar a Coordinación sin esperar a terminar la clase.",
        isCorrect: true,
        explanation: "¡Correcto! El Numeral 43 establece la verificación inmediata y reporte a Coordinación frente a demoras no justificadas."
      },
      {
        text: "Cerrar la puerta con llave para que aprenda a ser puntual.",
        isCorrect: false,
        explanation: "Incorrecto. Viola la seguridad y derechos de protección del menor."
      }
    ]
  },
  {
    id: 4,
    level: "Secundaria/Media",
    situation: "Un transportador escolar le pide permiso para entrar al baño de estudiantes del pasillo central.",
    options: [
      {
        text: "Permitirle el ingreso porque es un adulto conocido que trabaja en las rutas.",
        isCorrect: false,
        explanation: "Incorrecto. Prohibición estricta: ningún adulto externo puede ingresar a baños de estudiantes."
      },
      {
        text: "Indicarle que los baños de alumnos son exclusivos para ellos y orientarlo a los baños de la zona de oficinas.",
        isCorrect: true,
        explanation: "¡Correcto! El Numeral 45 consagra la exclusividad absoluta de los sanitarios estudiantiles."
      },
      {
        text: "Acompañarlo adentro para vigilarlo.",
        isCorrect: false,
        explanation: "Incorrecto. Debe ser dirigido a la batería sanitaria institucional de administración."
      }
    ]
  }
];

export default function JuegoDesplazamientosBanos({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const currentScenario = ESCENARIOS[currentIndex];

  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    if (currentScenario.options[index].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    if (currentIndex + 1 < ESCENARIOS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      if (score + (selectedOption !== null && currentScenario.options[selectedOption].isCorrect ? 1 : 0) >= 3) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        if (!hasCompleted) {
          setHasCompleted(true);
          onComplete();
        }
      }
    }
  }, [currentIndex, selectedOption, currentScenario, score, hasCompleted, onComplete]);

  const restartGame = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Rastreador de Tránsito y Baños</h3>
            <p className="text-xs text-slate-400">Decisiones de traslado y sanitarios por nivel escolar</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-teal-950/60 border border-teal-800 text-teal-300 rounded-full">
          Caso {currentIndex + 1} de {ESCENARIOS.length}
        </span>
      </div>

      {!isFinished ? (
        <div>
          {/* Situation Box */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-teal-950/80 text-teal-300 border border-teal-700/50">
                Nivel: {currentScenario.level}
              </span>
            </div>
            <p className="text-base text-slate-100 font-medium leading-relaxed">
              {currentScenario.situation}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentScenario.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = "bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300";

              if (selectedOption !== null) {
                if (opt.isCorrect) {
                  btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium";
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = "bg-red-950/40 border-red-500 text-red-200";
                } else {
                  btnStyle = "opacity-40 border-slate-800 text-slate-500";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          <AnimatePresence>
            {selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border flex flex-col gap-2 mb-4 ${
                  currentScenario.options[selectedOption].isCorrect
                    ? "bg-emerald-950/30 border-emerald-700/50 text-emerald-200"
                    : "bg-red-950/30 border-red-700/50 text-red-200"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold">
                  {currentScenario.options[selectedOption].isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                  <span>
                    {currentScenario.options[selectedOption].isCorrect
                      ? "¡Excelente Decisión!"
                      : "Procedimiento No Conforme:"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentScenario.options[selectedOption].explanation}
                </p>
                <button
                  onClick={handleNext}
                  className="self-end mt-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/40 mx-auto flex items-center justify-center text-teal-400 mb-4">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-white mb-2">
            {score >= 3 ? "¡Control de Rutas y Baños Certificado!" : "Refuerza los Numerales 41-45"}
          </h4>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
            Puntaje final: <strong className="text-white">{score} de {ESCENARIOS.length}</strong> aciertos.
            {score >= 3
              ? " Tienes total claridad sobre la exclusividad de baños y traslados por nivel."
              : " Repasa los protocolos de preescolar y reporte oportuno ante demoras en sanitarios."}
          </p>
          <div className="flex justify-center gap-4">
            {score < 3 ? (
              <button
                onClick={restartGame}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reintentar
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/60 border border-emerald-600/50 rounded-xl text-emerald-300 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Acreditación de Módulo Lista
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
