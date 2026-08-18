"use client";

import { useState } from "react";
import { Footprints, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight } from "lucide-react";
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
        explanation: "Incorrecto. La custodia de menores no se delega en otros estudiantes bajo ninguna circunstancia."
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
        explanation: "Incorrecto. El exceso del tiempo razonable exige activación inmediata de verificación."
      },
      {
        text: "Verificar de inmediato el baño o enviar apoyo docente e informar a Coordinación sin esperar a terminar la clase.",
        isCorrect: true,
        explanation: "¡Correcto! El Numeral 43 establece la verificación inmediata y reporte a Coordinación frente a demoras no justificadas (+10 min)."
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
        text: "Indicarle que los baños de alumnos son exclusivos para ellos y orientarlo a los baños de la zona de administración.",
        isCorrect: true,
        explanation: "¡Correcto! El Numeral 45 consagra la exclusividad absoluta de los sanitarios estudiantiles."
      },
      {
        text: "Acompañarlo adentro para vigilarlo.",
        isCorrect: false,
        explanation: "Incorrecto. Debe ser dirigido a la batería sanitaria institucional de oficinas."
      }
    ]
  }
];

export default function JuegoDesplazamientosBanos({ onComplete }: { onComplete: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const currentScenario = ESCENARIOS[currentIdx];
  const isCorrect = selectedOption !== null && currentScenario.options[selectedOption].isCorrect;

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    setIsAnswered(true);

    if (currentScenario.options[index].isCorrect) {
      setScore(s => s + 1);
    } else {
      setAttempts(a => a + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedOption(null);

    if (currentIdx < ESCENARIOS.length - 1) {
      setCurrentIdx(c => c + 1);
    } else {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onComplete();
    }
  };

  const handleRetry = () => {
    setIsAnswered(false);
    setSelectedOption(null);
  };

  return (
    <div className="space-y-6">
      {/* Gaming Header (Light Theme) */}
      <div className="relative overflow-hidden rounded-[24px] border border-teal-200 bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/50 p-5 shadow-xs text-text-dark">
        <div className="relative flex flex-col sm:flex-row gap-5 items-center">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 shadow-xs">
              <Footprints className="w-10 h-10" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-teal-600 font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider text-white shadow-xs">
              NUM. 41-45
            </div>
          </div>
          <div className="text-center sm:text-left space-y-1.5">
            <span className="inline-block text-[10px] font-black tracking-widest text-teal-700 uppercase bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
              Minijuego Pedagógico · Módulo 2
            </span>
            <h3 className="text-lg font-black uppercase tracking-tight text-primary">
              Rastreador de Tránsito y Baños
            </h3>
            <p className="text-xs text-text-muted leading-relaxed max-w-xl font-medium">
              Aplica los protocolos de desplazamientos, acompañamiento diferenciado y exclusividad de baños por nivel escolar.
            </p>
          </div>
        </div>
      </div>

      {/* Game Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs font-bold text-primary shadow-xs">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-teal-600 animate-pulse" />
          <span className="uppercase tracking-wider">Fase: Toma de Decisiones en Tránsito</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-primary/5 px-3 py-1 rounded-lg">ESCENARIO: {currentIdx + 1} / {ESCENARIOS.length}</span>
          <span className="text-slate-300">|</span>
          <span className="bg-emerald-50 px-3 py-1 rounded-lg text-emerald-700">ACIERTOS: {score}</span>
          {attempts > 0 && (
            <>
              <span className="text-slate-300">|</span>
              <span className="bg-rose-50 px-3 py-1 rounded-lg text-rose-700">REINTENTOS: {attempts}</span>
            </>
          )}
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-2">
        {ESCENARIOS.map((_, qIdx) => (
          <div
            key={qIdx}
            className={`h-2 rounded-full transition-all ${
              qIdx === currentIdx 
                ? "w-12 bg-accent" 
                : qIdx < currentIdx 
                  ? "w-6 bg-teal-600" 
                  : "w-6 bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Situation Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-2 text-left relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 to-primary" />
        <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 inline-block">
          Nivel: {currentScenario.level}
        </span>
        <p className="text-sm font-bold text-slate-800 leading-relaxed sm:text-base">
          {currentScenario.situation}
        </p>
      </div>

      {/* Option Buttons */}
      {!isAnswered ? (
        <div className="space-y-3">
          {currentScenario.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className="w-full p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-primary hover:bg-slate-50 transition-all text-left text-xs sm:text-sm font-bold text-slate-800 flex items-start gap-3.5 shadow-xs cursor-pointer active:scale-[0.99]"
            >
              <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 leading-relaxed">{opt.text}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {/* Answer Feedback Alert */}
          <div className={`rounded-2xl border p-5 flex gap-4 ${
            isCorrect 
              ? "bg-emerald-50 border-emerald-300 text-emerald-900" 
              : "bg-rose-50 border-rose-300 text-rose-900"
          }`}>
            <div className="flex-shrink-0">
              {isCorrect ? (
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                  <AlertTriangle className="h-6 w-6 stroke-[2.5]" />
                </div>
              )}
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black uppercase tracking-wider">
                {isCorrect ? "¡Excelente Procedimiento!" : "Procedimiento No Conforme:"}
              </h4>
              <p className="text-xs leading-relaxed font-semibold">
                {currentScenario.options[selectedOption!].explanation}
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            {isCorrect ? (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto rounded-xl bg-primary px-8 py-4 font-black text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl active:scale-[0.98] cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span>{currentIdx < ESCENARIOS.length - 1 ? "Siguiente Escenario" : "Finalizar Reto"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="w-full sm:w-auto rounded-xl bg-accent px-8 py-4 font-black text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark hover:shadow-xl active:scale-[0.98] cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Escenario</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
