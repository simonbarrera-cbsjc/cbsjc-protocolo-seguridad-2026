"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, CheckCircle2, AlertTriangle, RefreshCw, Trophy, ArrowRight, Smartphone, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

interface AccessTest {
  id: number;
  type: "CARNÉ" | "PICKUP SJ";
  badgeColor?: "ROJO" | "AZUL" | "VERDE" | "NEGRO";
  situation: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const PRUEBAS_ACCESO: AccessTest[] = [
  {
    id: 1,
    type: "CARNÉ",
    badgeColor: "ROJO",
    situation: "Ves a un señor con CARNÉ ROJO (Proveedor) deambulando por el pasillo de preescolar buscando a una profesora.",
    question: "¿Qué acción debes tomar según el numeral 7.1 y 50?",
    options: [
      {
        text: "Dejarlo pasar porque porta un carné oficial del colegio.",
        isCorrect: false,
        explanation: "Incorrecto. El carné rojo SOLO autoriza acceso a recibo, almacén, cafetería y compras."
      },
      {
        text: "Intervenir con amabilidad, indicarle que su carné solo autoriza áreas de suministro y orientarlo a portería / reportar la novedad.",
        isCorrect: true,
        explanation: "¡Correcto! El carné ROJO es exclusivo de proveedores y tiene prohibido transitar por pasillos pedagógicos o de preescolar."
      },
      {
        text: "Llevarlo al aula de preescolar para que hable con la docente.",
        isCorrect: false,
        explanation: "Incorrecto. Los externos no pueden ingresar a salones con menores sin autorización y acompañamiento institucional."
      }
    ]
  },
  {
    id: 2,
    type: "CARNÉ",
    badgeColor: "AZUL",
    situation: "Una familia interesada en matricular a su hijo porta CARNÉ AZUL (Admisiones).",
    question: "¿Por cuáles áreas tienen permitida su permanencia?",
    options: [
      {
        text: "Recepción, oficina de admisiones y recorridos institucionales siempre acompañados por personal de mercadeo/admisiones.",
        isCorrect: true,
        explanation: "¡Correcto! El carné AZUL INSTITUCIONAL es para admisiones con acompañamiento en sus recorridos."
      },
      {
        text: "Entrar libremente a cualquier salón de clases sin tocar la puerta.",
        isCorrect: false,
        explanation: "Incorrecto. Ningún visitante puede circular libremente por las aulas."
      },
      {
        text: "Hospedarse en las pesebreras de SEED BLOOM.",
        isCorrect: false,
        explanation: "Incorrecto. Zonas ecuestres son de acceso técnico restringido."
      }
    ]
  },
  {
    id: 3,
    type: "PICKUP SJ",
    situation: "Son las 3:10 p.m. Una madre escribe al chat personal de la docente: 'Profe, autorizo que el abuelo Don Jorge recoja a Mateo hoy, va en moto'.",
    question: "¿Cuál es la respuesta reglamentaria de la docente según el numeral 11.1?",
    options: [
      {
        text: "Dar salida a Mateo inmediatamente porque la mamá escribió desde su propio número de celular.",
        isCorrect: false,
        explanation: "Incorrecto. WhatsApp ya NO es canal válido bajo ninguna circunstancia."
      },
      {
        text: "No autorizar la salida por WhatsApp y remitir a la madre a registrar el cambio en la app Pickup SJ Campestre o llamar a Coordinación/Portería.",
        isCorrect: true,
        explanation: "¡Correcto! El Numeral 11.1 prohíbe autorizaciones por canales personales; la app Pickup SJ es el único canal oficial."
      },
      {
        text: "Pedirle al abuelo que espere afuera hasta que termine el año escolar.",
        isCorrect: false,
        explanation: "Incorrecto. Se debe canalizar formalmente por la plataforma oficial o contingencia en portería."
      }
    ]
  },
  {
    id: 4,
    type: "PICKUP SJ",
    situation: "El sistema Pickup SJ proyecta en pantalla la llamada de una alumna de primaria. La docente la acompaña al punto de entrega.",
    question: "¿Qué debe comprobarse antes de entregar a la estudiante?",
    options: [
      {
        text: "Mirar solo la pantalla del celular y asumir que quien esté en la fila es la persona correcta.",
        isCorrect: false,
        explanation: "Incorrecto. 'La app no reemplaza mirar a la persona': el riesgo es confiar en la pantalla sin cotejo visual."
      },
      {
        text: "El personal de despacho y docente verifican identidad, vehículo y autorización vigente en el sistema frente a la persona física que recibe.",
        isCorrect: true,
        explanation: "¡Correcto! La tecnología respalda la verificación, pero el personal valida visualmente la correspondencia física."
      },
      {
        text: "Dejar que la estudiante se suba a cualquier vehículo que esté pitando.",
        isCorrect: false,
        explanation: "Incorrecto. Violación grave de la seguridad de entrega."
      }
    ]
  }
];

export default function JuegoCarnesPickupSJ({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const currentTest = PRUEBAS_ACCESO[currentIndex];

  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    if (currentTest.options[index].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    if (currentIndex + 1 < PRUEBAS_ACCESO.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      if (score + (selectedOption !== null && currentTest.options[selectedOption].isCorrect ? 1 : 0) >= 3) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
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
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Validador de Carnés y Pickup SJ</h3>
            <p className="text-xs text-slate-400">Control de ingresos por color y despacho seguro</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-full">
          Prueba {currentIndex + 1} de {PRUEBAS_ACCESO.length}
        </span>
      </div>

      {!isFinished ? (
        <div>
          {/* Situation Box */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mb-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-700/50">
                {currentTest.type}
              </span>
              {currentTest.badgeColor && (
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded border ${
                    currentTest.badgeColor === "ROJO"
                      ? "bg-red-500/20 text-red-400 border-red-500/40"
                      : currentTest.badgeColor === "AZUL"
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                      : currentTest.badgeColor === "VERDE"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                      : "bg-slate-800 text-slate-300 border-slate-600"
                  }`}
                >
                  CARNÉ {currentTest.badgeColor}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-300">{currentTest.situation}</p>
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
                      ? "¡Autorización Validada con Éxito!"
                      : "Vulnerabilidad de Seguridad Detectada:"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentTest.options[selectedOption].explanation}
                </p>
                <button
                  onClick={handleNext}
                  className="self-end mt-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg"
                >
                  <span>Siguiente Caso</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 mx-auto flex items-center justify-center text-rose-400 mb-4">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-white mb-2">
            {score >= 3 ? "¡Control de Acceso y Pickup Dominado!" : "Refuerza Carnés y Pickup SJ"}
          </h4>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
            Puntaje: <strong className="text-white">{score} de {PRUEBAS_ACCESO.length}</strong> pruebas de acceso correctas.
            {score >= 3
              ? " Tienes claridad sobre el código de carnés y la prohibición total de canales informales de entrega."
              : " Recuerda que WhatsApp no es válido y los carnés rojos nunca ingresan a pasillos escolares."}
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
                Módulo 5 Completado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
