"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, CheckCircle2, AlertTriangle, RefreshCw, Trophy, ArrowRight, ShieldAlert } from "lucide-react";
import confetti from "canvas-confetti";

interface Challenge {
  id: number;
  environment: "SEED BLOOM (Picadero)" | "Huerta y Granjita" | "Laboratorio / Artística";
  scenario: string;
  riskItem: string;
  correctAction: string;
  options: string[];
  correctIndex: number;
}

const DESAFIOS: Challenge[] = [
  {
    id: 1,
    environment: "SEED BLOOM (Picadero)",
    scenario: "Un alumno de 4.° grado intenta ingresar sin autorización a la zona de pesebreras para alimentar a un caballo que está descansando.",
    riskItem: "Acceso no autorizado a área restringida con riesgo de mordedura o patada.",
    correctAction: "Detener inmediatamente al estudiante, recordarle que las pesebreras son zonas restringidas y mantener al grupo en el perímetro autorizado por el instructor.",
    options: [
      "Dejarlo pasar si lleva una zanahoria limpia.",
      "Detener inmediatamente al estudiante, recordarle que las pesebreras son zonas restringidas y mantener al grupo en el perímetro autorizado.",
      "Pedirle al instructor de equitación que lo grabe para las redes sociales."
    ],
    correctIndex: 1
  },
  {
    id: 2,
    environment: "SEED BLOOM (Picadero)",
    scenario: "Un estudiante dice que le incomoda el casco reglamentario de equitación y se lo quita justo antes de subir al caballo.",
    riskItem: "Incumplimiento de EPP en actividad de riesgo de caída.",
    correctAction: "Impedir la monta hasta que el casco esté colocado y ajustado correctamente; el uso de EPP es obligatorio e innegociable.",
    options: [
      "Impedir la monta hasta que el casco esté colocado y ajustado correctamente (EPP obligatorio).",
      "Permitirle montar sólo si el caballo va despacio.",
      "Prestarle una gorra de tela en reemplazo del casco."
    ],
    correctIndex: 0
  },
  {
    id: 3,
    environment: "Huerta y Granjita",
    scenario: "Al finalizar la siembra de plántulas, los estudiantes quieren salir corriendo directamente al comedor sin pasar por los lavamanos.",
    riskItem: "Contaminación biológica por residuos de tierra, abono o bacterias.",
    correctAction: "Guiar a todo el grupo a la estación de lavado de manos con agua y jabón antes de retirarse del área.",
    options: [
      "Dejarlos ir al comedor porque tienen hambre.",
      "Guiar a todo el grupo a la estación de lavado obligatorio de manos con agua y jabón.",
      "Limpiarse las manos en el pantalón escolar."
    ],
    correctIndex: 1
  },
  {
    id: 4,
    environment: "Huerta y Granjita",
    scenario: "Un niño observa unas bayas de colores en un arbusto desconocido de la huerta y se dispone a meterlas a la boca.",
    riskItem: "Riesgo de intoxicación por ingesta de frutos o plantas no autorizadas.",
    correctAction: "Intervenir al instante, retirar el fruto de su alcance, explicar la norma de no ingerir especies no autorizadas y reportar si hubo ingesta.",
    options: [
      "Esperar a ver si le sabe dulce para identificar la planta.",
      "Intervenir al instante, evitar la ingesta, reiterar la prohibición y registrar la novedad.",
      "Tomarle una foto para buscar la especie en Google."
    ],
    correctIndex: 1
  }
];

export default function JuegoSeedBloomHuerta({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const currentChallenge = DESAFIOS[currentIndex];

  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    if (index === currentChallenge.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    if (currentIndex + 1 < DESAFIOS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      if (score + (selectedOption === currentChallenge.correctIndex ? 1 : 0) >= 3) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        if (!hasCompleted) {
          setHasCompleted(true);
          onComplete();
        }
      }
    }
  }, [currentIndex, selectedOption, currentChallenge, score, hasCompleted, onComplete]);

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
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Inspector SEED BLOOM y Huerta</h3>
            <p className="text-xs text-slate-400">Control de riesgos en picadero ecuestre y zonas abiertas</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-amber-950/60 border border-amber-800 text-amber-300 rounded-full">
          Reto {currentIndex + 1} de {DESAFIOS.length}
        </span>
      </div>

      {!isFinished ? (
        <div>
          {/* Environment and Risk Header */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mb-5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/50">
                {currentChallenge.environment}
              </span>
              <span className="text-xs text-rose-400 flex items-center gap-1 font-semibold">
                <ShieldAlert className="w-3.5 h-3.5" />
                Riesgo Crítico
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              {currentChallenge.scenario}
            </p>
            <p className="text-xs text-slate-400 italic">
              <strong>Peligro identificado:</strong> {currentChallenge.riskItem}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentChallenge.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentChallenge.correctIndex;
              let btnStyle = "bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300";

              if (selectedOption !== null) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium";
                } else if (isSelected && !isCorrect) {
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
                    {idx + 1}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
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
                  selectedOption === currentChallenge.correctIndex
                    ? "bg-emerald-950/30 border-emerald-700/50 text-emerald-200"
                    : "bg-red-950/30 border-red-700/50 text-red-200"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold">
                  {selectedOption === currentChallenge.correctIndex ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                  <span>
                    {selectedOption === currentChallenge.correctIndex
                      ? "¡Protocolo Aplicado Correctamente!"
                      : "Respuesta Incorrecta:"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentChallenge.correctAction}
                </p>
                <button
                  onClick={handleNext}
                  className="self-end mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg"
                >
                  <span>Siguiente Desafío</span>
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
            {score >= 3 ? "¡Inspector de Campo Acreditado!" : "Refuerza Normas de Campo"}
          </h4>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
            Lograste <strong className="text-white">{score} de {DESAFIOS.length}</strong> intervenciones preventivas correctas.
            {score >= 3
              ? " Tienes pleno conocimiento del programa SEED BLOOM y bioseguridad en la huerta."
              : " Revisa los numerales 47 y 48 sobre EPP ecuestre y manejo de animales."}
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
                Módulo 3 Completado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
