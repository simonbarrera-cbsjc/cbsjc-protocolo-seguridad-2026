"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle2, AlertTriangle, RefreshCw, Trophy, ArrowRight, ShieldAlert, Video } from "lucide-react";
import confetti from "canvas-confetti";

interface ReportStepTest {
  id: number;
  category: "CADENA DE REPORTE" | "HECHOS OBLIGATORIOS" | "CÁMARAS & RIT";
  scenario: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const CADENA_PRUEBAS: ReportStepTest[] = [
  {
    id: 1,
    category: "CADENA DE REPORTE",
    scenario: "Un docente presencia una situación de riesgo de seguridad estructural en una pared del coliseo.",
    question: "¿Cuál es el primer escalón obligatorio de la cadena de mando institucional?",
    options: [
      {
        text: "Llamar a los bomberos y publicar una foto en redes sociales.",
        isCorrect: false,
        explanation: "Incorrecto. Se violan las instancias institucionales y confidencialidad."
      },
      {
        text: "Reportar de inmediato a Coordinación (y esta a Rectoría / Directivo competente) para activación de medidas.",
        isCorrect: true,
        explanation: "¡Correcto! El Numeral 22 fija el flujo estricto: Docente ➔ Coordinación ➔ Rectoría ➔ Instancias externas."
      },
      {
        text: "Esperar a la reunión de fin de año para comentarlo.",
        isCorrect: false,
        explanation: "Incorrecto. Los riesgos ambientales o estructurales son de reporte urgente inmediato."
      }
    ]
  },
  {
    id: 2,
    category: "HECHOS OBLIGATORIOS",
    scenario: "Un estudiante sufre un desmayo repentino durante la clase de educación física.",
    question: "¿Qué datos mínimos debe contener el reporte formal de seguridad según el numeral 36?",
    options: [
      {
        text: "Fecha y hora, lugar, personas involucradas, descripción objetiva, medidas adoptadas y responsable que reporta.",
        isCorrect: true,
        explanation: "¡Correcto! El Numeral 36 exige estos 6 componentes esenciales para la trazabilidad legal y médica."
      },
      {
        text: "Solo un emoji de alerta por mensaje de texto.",
        isCorrect: false,
        explanation: "Incorrecto. El reporte formal requiere registro escrito detallado."
      },
      {
        text: "La opinión personal del docente sobre por qué cree que el estudiante no desayunó.",
        isCorrect: false,
        explanation: "Incorrecto. La descripción debe ser estrictamente fáctica y objetiva."
      }
    ]
  },
  {
    id: 3,
    category: "CÁMARAS & RIT",
    scenario: "Ocurre un roce entre dos estudiantes en un ángulo con cámara de seguridad. El docente no estaba atento mirando su teléfono móvil.",
    question: "¿Qué aclaran los numerales 52 y 53 respecto al sistema de cámaras?",
    options: [
      {
        text: "La existencia de cámaras exime al docente de vigilar porque todo queda grabado automáticamente.",
        isCorrect: false,
        explanation: "Incorrecto. El Numeral 53 recalca que la existencia de cámaras NO sustituye la supervisión directa."
      },
      {
        text: "Las cámaras son un apoyo probatorio y técnico; jamás sustituyen el deber de supervisión física activa del docente.",
        isCorrect: true,
        explanation: "¡Correcto! Los videos respaldan la trazabilidad pero no reemplazan la diligencia humana ni el debido proceso."
      },
      {
        text: "Los videos de cámaras se entregan en una memoria USB a cualquier persona que los pida.",
        isCorrect: false,
        explanation: "Incorrecto. Las grabaciones son confidenciales y su revisión solo la autoriza Rectoría."
      }
    ]
  },
  {
    id: 4,
    category: "CÁMARAS & RIT",
    scenario: "Un docente omite deliberadamente reportar una agresión física entre estudiantes ocurrida bajo su custodia.",
    question: "¿Cuáles son las implicaciones según el numeral 39 y el RIT?",
    options: [
      {
        text: "Ninguna consecuencia si los estudiantes no le cuentan a sus papás.",
        isCorrect: false,
        explanation: "Incorrecto. La omisión de reporte constituye en sí misma un incumplimiento del deber de diligencia."
      },
      {
        text: "Apertura de proceso disciplinario laboral conforme al RIT con respeto al debido proceso, proporcionalidad y medidas formativas/sancionatorias.",
        isCorrect: true,
        explanation: "¡Correcto! El Numeral 39 prevé llamados de atención y medidas disciplinarias bajo el Reglamento Interno de Trabajo."
      },
      {
        text: "Pagar una multa en efectivo al rector del colegio.",
        isCorrect: false,
        explanation: "Incorrecto. Se aplica el régimen laboral legal colombiano y debido proceso institucional."
      }
    ]
  }
];

export default function JuegoCadenaReporte({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const currentTest = CADENA_PRUEBAS[currentIndex];

  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    if (currentTest.options[index].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    if (currentIndex + 1 < CADENA_PRUEBAS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      if (score + (selectedOption !== null && currentTest.options[selectedOption].isCorrect ? 1 : 0) >= 3) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        if (!hasCompleted) {
          setHasCompleted(true);
          onComplete();
        }
      }
    }
  }, [currentIndex, selectedOption, currentTest, score, hasCompleted, onComplete]);

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
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Secuenciador de Cadena y Trazabilidad</h3>
            <p className="text-xs text-slate-400">Escalamiento jerárquico, reportes y garantías RIT</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-amber-950/60 border border-amber-800 text-amber-300 rounded-full">
          Pregunta {currentIndex + 1} de {CADENA_PRUEBAS.length}
        </span>
      </div>

      {!isFinished ? (
        <div>
          {/* Situation Box */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mb-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/50">
                {currentTest.category}
              </span>
            </div>
            <p className="text-sm text-slate-300">{currentTest.scenario}</p>
            <p className="text-sm sm:text-base text-slate-100 font-bold pt-1">
              {currentTest.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentTest.options.map((opt, idx) => {
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

          {/* Feedback */}
          <AnimatePresence>
            {selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border flex flex-col gap-2 mb-4 ${
                  currentTest.options[selectedOption].isCorrect
                    ? "bg-emerald-950/30 border-emerald-700/50 text-emerald-200"
                    : "bg-red-950/30 border-red-700/50 text-red-200"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold">
                  {currentTest.options[selectedOption].isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                  <span>
                    {currentTest.options[selectedOption].isCorrect
                      ? "¡Escalamiento y Criterio Conforme!"
                      : "Procedimiento No Conforme:"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentTest.options[selectedOption].explanation}
                </p>
                <button
                  onClick={handleNext}
                  className="self-end mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg"
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
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 mb-4">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-white mb-2">
            {score >= 3 ? "¡Líder de Protocolos Acreditado!" : "Refuerza la Cadena de Reporte"}
          </h4>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
            Obtuviste <strong className="text-white">{score} de {CADENA_PRUEBAS.length}</strong> respuestas correctas.
            {score >= 3
              ? " Has completado la ruta completa de Protocolos de Seguridad CBSJC 2026."
              : " Revisa los numerales 22, 36 y 52 para afianzar el reporte de novedades."}
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
                Módulo 6 Completado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
