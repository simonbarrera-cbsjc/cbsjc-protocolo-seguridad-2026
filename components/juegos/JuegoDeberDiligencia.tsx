"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ShieldCheck, RefreshCw, Trophy, AlertTriangle, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface Question {
  id: number;
  statement: string;
  isCorrectBehavior: boolean; // true = SÍ HACER, false = NO HACER
  numeral: string;
  explanation: string;
}

const CONDUCTAS: Question[] = [
  {
    id: 1,
    statement: "Atender una llamada telefónica urgente mientras superviso a mi grupo en el patio.",
    isCorrectBehavior: false,
    numeral: "Numeral 56",
    explanation: "NO HACER. El celular no debe usarse de forma que comprometa la vigilancia activa."
  },
  {
    id: 2,
    statement: "Realizar conteo de estudiantes al salir del salón, al llegar al destino y al finalizar la actividad.",
    isCorrectBehavior: true,
    numeral: "Idea Fuerza 2 & Num. 41",
    explanation: "SÍ HACER. La rutina de conteo permanente garantiza saber la ubicación del grupo siempre."
  },
  {
    id: 3,
    statement: "Dejar al grupo solo 3 minutos mientras bajo rápidamente a secretaría a recoger una guía.",
    isCorrectBehavior: false,
    numeral: "Numeral 56",
    explanation: "NO HACER. Prohibido abandonar el grupo sin solicitar y recibir relevo formal autorizado."
  },
  {
    id: 4,
    statement: "Mantener supervisión activa del grupo en SEED BLOOM aunque el instructor dirija la monta.",
    isCorrectBehavior: true,
    numeral: "Idea Fuerza 3 & Num. 47",
    explanation: "SÍ HACER. La presencia de un instructor externo no releva al docente de su responsabilidad funcional."
  },
  {
    id: 5,
    statement: "Acordar de palabra con un colega que me cubra la zona de patio sin avisar a Coordinación.",
    isCorrectBehavior: false,
    numeral: "Numeral 49 & 56",
    explanation: "NO HACER. Los acuerdos informales rompen la trazabilidad del esquema de custodia institucional."
  },
  {
    id: 6,
    statement: "Cronometrar y verificar el retorno oportuno de un estudiante con permiso de baño.",
    isCorrectBehavior: true,
    numeral: "Numeral 42 & 56",
    explanation: "SÍ HACER. Permite detectar ausencias prolongadas y activar el reporte inmediatamente."
  },
  {
    id: 7,
    statement: "Autorizar por WhatsApp que una tía recoja a un alumno si la mamá me lo pide amablemente.",
    isCorrectBehavior: false,
    numeral: "Idea Fuerza 5 & Num. 11.1",
    explanation: "NO HACER. Las autorizaciones van 100% por Pickup SJ Campestre. WhatsApp carece de validez."
  },
  {
    id: 8,
    statement: "Reportar a Coordinación una caída o raspadura leve el mismo día, aunque el alumno diga que está bien.",
    isCorrectBehavior: true,
    numeral: "Idea Fuerza 4 & Num. 36",
    explanation: "SÍ HACER. El reporte inmediato de toda novedad es obligatorio para respaldo y trazabilidad."
  }
];

export default function JuegoDeberDiligencia({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLastAnswerCorrect, setIsLastAnswerCorrect] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const currentQuestion = CONDUCTAS[currentIndex];

  const handleChoice = (chosenAsProper: boolean) => {
    if (showFeedback) return;

    const correct = chosenAsProper === currentQuestion.isCorrectBehavior;
    setIsLastAnswerCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = useCallback(() => {
    setShowFeedback(false);
    if (currentIndex + 1 < CONDUCTAS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      if (score + (isLastAnswerCorrect ? 1 : 0) >= 6) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        if (!hasCompleted) {
          setHasCompleted(true);
          onComplete();
        }
      }
    }
  }, [currentIndex, isLastAnswerCorrect, score, hasCompleted, onComplete]);

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowFeedback(false);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Simulador del Deber de Diligencia</h3>
            <p className="text-xs text-slate-400">Clasifica cada conducta según el Numeral 56</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold px-3 py-1 bg-blue-950/60 border border-blue-800 text-blue-300 rounded-full">
            {currentIndex + 1} de {CONDUCTAS.length}
          </span>
        </div>
      </div>

      {!isFinished ? (
        <div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / CONDUCTAS.length) * 100}%` }}
            />
          </div>

          {/* Conduct Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-slate-950/70 border border-slate-800 rounded-xl p-6 mb-6 text-center min-h-[160px] flex flex-col justify-center items-center"
          >
            <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/50 px-2.5 py-0.5 rounded mb-3 border border-indigo-800/60">
              {currentQuestion.numeral}
            </span>
            <p className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed max-w-xl">
              &quot;{currentQuestion.statement}&quot;
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleChoice(true)}
              disabled={showFeedback}
              className={`py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all border ${
                showFeedback
                  ? currentQuestion.isCorrectBehavior
                    ? "bg-emerald-600/30 border-emerald-500 text-emerald-300"
                    : "opacity-40 border-slate-800 bg-slate-900 text-slate-500"
                  : "bg-emerald-950/40 hover:bg-emerald-900/60 border-emerald-700/60 text-emerald-300 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>SÍ HACER</span>
            </button>

            <button
              onClick={() => handleChoice(false)}
              disabled={showFeedback}
              className={`py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all border ${
                showFeedback
                  ? !currentQuestion.isCorrectBehavior
                    ? "bg-red-600/30 border-red-500 text-red-300"
                    : "opacity-40 border-slate-800 bg-slate-900 text-slate-500"
                  : "bg-red-950/40 hover:bg-red-900/60 border-red-700/60 text-red-300 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              <XCircle className="w-5 h-5 text-red-400" />
              <span>NO HACER</span>
            </button>
          </div>

          {/* Feedback Section */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`mt-6 p-4 rounded-xl border flex flex-col gap-3 ${
                  isLastAnswerCorrect
                    ? "bg-emerald-950/40 border-emerald-700/50 text-emerald-200"
                    : "bg-red-950/40 border-red-700/50 text-red-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isLastAnswerCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                  <span className="font-bold text-sm">
                    {isLastAnswerCorrect ? "¡Decisión Correcta!" : "Atención con el Protocolo:"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
                <button
                  onClick={handleNext}
                  className="self-end mt-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/40 mx-auto flex items-center justify-center text-indigo-400 mb-4">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-white mb-2">
            {score >= 6 ? "¡Excelente Dominio de Diligencia!" : "Se requiere Repaso Normativo"}
          </h4>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
            Obtuviste <strong className="text-white">{score} de {CONDUCTAS.length}</strong> respuestas correctas.
            {score >= 6
              ? " Has demostrado criterio alineado con el estándar de diligencia docente exigible."
              : " Revisa los numerales 1, 2 y 56 para afianzar las conductas institucionales."}
          </p>

          <div className="flex justify-center gap-4">
            {score < 6 ? (
              <button
                onClick={restartGame}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reintentar Simulador
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/60 border border-emerald-600/50 rounded-xl text-emerald-300 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Minijuego Superado con Éxito
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
