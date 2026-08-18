"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle2, AlertTriangle, RefreshCw, Trophy, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface ZoneMission {
  id: number;
  zoneTitle: string;
  zoneType: string;
  description: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const MISIONES_ZONA: ZoneMission[] = [
  {
    id: 1,
    zoneTitle: "Zona 10: Cancha Preschool",
    zoneType: "Preescolar (Protección Reforzada)",
    description: "Estás asignado a la cancha de Preescolar durante el descanso. Un grupo de niños pequeños corre hacia el área verde no delimitada.",
    question: "¿Cuál es tu estándar de custodia según el numeral 49.3 y 57?",
    options: [
      {
        text: "Permanecer sentado en una banca de la cancha porque los niños de preescolar juegan solos.",
        isCorrect: false,
        explanation: "Incorrecto. En preescolar rige la protección reforzada: supervisión directa y cercana permanente."
      },
      {
        text: "Mantener supervisión directa permanente a corta distancia, evitando que ningún grupo quede solo en zona abierta y conteniendo la salida del perímetro.",
        isCorrect: true,
        explanation: "¡Correcto! En la Zona 10 (Cancha Preschool) el Numeral 57 exige custodia directa continua sin puntos ciegos."
      },
      {
        text: "Pedirle a un estudiante de bachillerato que pase por ahí que los cuide.",
        isCorrect: false,
        explanation: "Incorrecto. La custodia asignada jamás se transfiere a alumnos."
      }
    ]
  },
  {
    id: 2,
    zoneTitle: "Zonas 1, 3 y 25: Baños y Escaleras",
    zoneType: "Criterio Reforzado",
    description: "Varios estudiantes de secundaria se agrupan en el descanso dentro del pasillo de acceso a baños y comienzan a empujarse en las gradas.",
    question: "¿Qué acción prioritaria debes ejecutar?",
    options: [
      {
        text: "Intervenir de inmediato, disolver el juego brusco en escaleras y evitar la permanencia prolongada u ocultamiento en zonas de baño.",
        isCorrect: true,
        explanation: "¡Correcto! Las zonas de baños y escaleras exigen vigilancia reforzada contra juegos peligrosos en desniveles y permanencias injustificadas."
      },
      {
        text: "Esperar a que alguien se resbale para llamar a enfermería.",
        isCorrect: false,
        explanation: "Incorrecto. La labor docente es preventiva, no reactiva."
      },
      {
        text: "Encerrarlos en el salón de clases.",
        isCorrect: false,
        explanation: "Incorrecto. Se deben aplicar las pautas formativas de intervención sin encierros."
      }
    ]
  },
  {
    id: 3,
    zoneTitle: "Zonas 20, 21, 22 y 24: Espacios Cerrados",
    zoneType: "Ángulos Muertos / Baja Visibilidad",
    description: "Te encuentras en la zona 'Emotional Room' / salones de talleres y la disposición de muebles genera un rincón oculto.",
    question: "¿Cómo garantizas la cobertura de la zona asignada?",
    options: [
      {
        text: "Quedarte quieto en la puerta principal mirando tu celular.",
        isCorrect: false,
        explanation: "Incorrecto. El uso de celular y la pasividad están prohibidos en turnos de patio."
      },
      {
        text: "Rotar activamente la posición física dentro de la zona para eliminar ángulos muertos y cubrir todo el campo visual.",
        isCorrect: true,
        explanation: "¡Correcto! En espacios cerrados o con divisiones, el protocolo exige patrullaje dinámico."
      },
      {
        text: "Apagar las luces del salón para que nadie entre.",
        isCorrect: false,
        explanation: "Incorrecto. Se debe mantener el espacio accesible y debidamente vigilado."
      }
    ]
  },
  {
    id: 4,
    zoneTitle: "Urgencia en Zona de Acompañamiento",
    zoneType: "Regla de Relevo No Negociable",
    description: "Faltan 10 minutos para terminar el descanso y recibes una llamada personal urgente.",
    question: "¿Cuál es el protocolo estricto para ausentarse de tu punto asignado?",
    options: [
      {
        text: "Irte sin avisar porque faltan pocos minutos para el timbre.",
        isCorrect: false,
        explanation: "Incorrecto. Prohibido abandonar el punto sin relevo previo."
      },
      {
        text: "Gestionar el relevo con Coordinación ANTES de retirarte; si no hay relevo confirmado, permanecer en el punto.",
        isCorrect: true,
        explanation: "¡Correcto! La regla 2 del numeral 49.2 prohíbe abandonar la zona sin relevo previo oficial."
      },
      {
        text: "Dejar a un compañero de la zona vecina a cargo de dos zonas al mismo tiempo sin notificar.",
        isCorrect: false,
        explanation: "Incorrecto. Todo relevo debe pasar por Coordinación para mantener trazabilidad."
      }
    ]
  }
];

export default function JuegoCustodiaZonas({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const currentMission = MISIONES_ZONA[currentIndex];

  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    if (currentMission.options[index].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    if (currentIndex + 1 < MISIONES_ZONA.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      if (score + (selectedOption !== null && currentMission.options[selectedOption].isCorrect ? 1 : 0) >= 3) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        if (!hasCompleted) {
          setHasCompleted(true);
          onComplete();
        }
      }
    }
  }, [currentIndex, selectedOption, currentMission, score, hasCompleted, onComplete]);

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
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Mapa Táctico de Custodia en Descansos</h3>
            <p className="text-xs text-slate-400">Control perimetral de las 22 zonas y relevos oficiales</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-purple-950/60 border border-purple-800 text-purple-300 rounded-full">
          Misión {currentIndex + 1} de {MISIONES_ZONA.length}
        </span>
      </div>

      {!isFinished ? (
        <div>
          {/* Mission Details */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mb-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-700/50">
                {currentMission.zoneTitle}
              </span>
              <span className="text-xs text-indigo-400 font-mono">
                {currentMission.zoneType}
              </span>
            </div>
            <p className="text-sm text-slate-300">
              {currentMission.description}
            </p>
            <p className="text-sm sm:text-base text-slate-100 font-bold pt-1">
              {currentMission.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentMission.options.map((opt, idx) => {
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
                  currentMission.options[selectedOption].isCorrect
                    ? "bg-emerald-950/30 border-emerald-700/50 text-emerald-200"
                    : "bg-red-950/30 border-red-700/50 text-red-200"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold">
                  {currentMission.options[selectedOption].isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                  <span>
                    {currentMission.options[selectedOption].isCorrect
                      ? "¡Estrategia de Custodia Correcta!"
                      : "Falla en Protocolo de Zona:"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentMission.options[selectedOption].explanation}
                </p>
                <button
                  onClick={handleNext}
                  className="self-end mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg"
                >
                  <span>Siguiente Zona</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 mx-auto flex items-center justify-center text-purple-400 mb-4">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-white mb-2">
            {score >= 3 ? "¡Comandante de Zona Acreditado!" : "Refuerza el Numeral 49"}
          </h4>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
            Obtuviste <strong className="text-white">{score} de {MISIONES_ZONA.length}</strong> aciertos en custodia perimetral.
            {score >= 3
              ? " Tienes dominio total de las 7 reglas no negociables y zonas de riesgo reforzado."
              : " Recuerda que la zona es custodia asignada y los relevos siempre son formales."}
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
                Módulo 4 Completado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
