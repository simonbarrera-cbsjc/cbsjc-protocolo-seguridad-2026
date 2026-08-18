"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, ShieldCheck, Award, ArrowRight, RotateCcw } from "lucide-react";
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
    explanation: "NO HACER. El celular no debe usarse de forma que comprometa la vigilancia activa sobre los estudiantes."
  },
  {
    id: 2,
    statement: "Realizar conteo de estudiantes al salir del salón, al llegar al destino y al finalizar la actividad.",
    isCorrectBehavior: true,
    numeral: "Idea Fuerza 2 & Num. 41",
    explanation: "SÍ HACER. La rutina de conteo continuo en tres tiempos garantiza saber la ubicación exacta del grupo siempre."
  },
  {
    id: 3,
    statement: "Dejar al grupo solo 3 minutos mientras bajo rápidamente a secretaría a recoger una guía.",
    isCorrectBehavior: false,
    numeral: "Numeral 56",
    explanation: "NO HACER. Queda terminantemente prohibido abandonar el grupo sin solicitar y recibir relevo formal autorizado."
  },
  {
    id: 4,
    statement: "Mantener supervisión activa del grupo en SEED BLOOM aunque el instructor dirija la monta.",
    isCorrectBehavior: true,
    numeral: "Idea Fuerza 3 & Num. 47",
    explanation: "SÍ HACER. La presencia de un instructor técnico externo no releva al docente institucional de su deber de custodia."
  },
  {
    id: 5,
    statement: "Acordar de palabra con un colega que me cubra la zona de patio sin avisar a Coordinación.",
    isCorrectBehavior: false,
    numeral: "Numeral 49 & 56",
    explanation: "NO HACER. Los acuerdos informales rompen la trazabilidad de custodia y configuran culpa atribuible al docente asignado."
  },
  {
    id: 6,
    statement: "Cronometrar y verificar el retorno oportuno de un estudiante con permiso de baño.",
    isCorrectBehavior: true,
    numeral: "Numeral 42 & 56",
    explanation: "SÍ HACER. Permite detectar ausencias prolongadas (más de 10 min) y activar la verificación de inmediato."
  },
  {
    id: 7,
    statement: "Autorizar por WhatsApp que una tía recoja a un alumno si la mamá me lo pide amablemente.",
    isCorrectBehavior: false,
    numeral: "Idea Fuerza 5 & Num. 11.1",
    explanation: "NO HACER. Las autorizaciones operan exclusivamente por Pickup SJ Campestre. WhatsApp carece de validez jurídica."
  },
  {
    id: 8,
    statement: "Reportar a Coordinación una caída o raspadura leve el mismo día, aunque el alumno diga que está bien.",
    isCorrectBehavior: true,
    numeral: "Idea Fuerza 4 & Num. 36",
    explanation: "SÍ HACER. El reporte formal inmediato de toda novedad con los 6 datos mínimos es obligatorio para respaldo y trazabilidad."
  }
];

export default function JuegoDeberDiligencia({ onComplete }: { onComplete: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const currentQuestion = CONDUCTAS[currentIdx];
  const isCorrect = selectedChoice === currentQuestion.isCorrectBehavior;

  const handleChoice = (chosenAsProper: boolean) => {
    setSelectedChoice(chosenAsProper);
    setIsAnswered(true);

    if (chosenAsProper === currentQuestion.isCorrectBehavior) {
      setScore(s => s + 1);
    } else {
      setAttempts(a => a + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedChoice(null);

    if (currentIdx < CONDUCTAS.length - 1) {
      setCurrentIdx(c => c + 1);
    } else {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onComplete();
    }
  };

  const handleRetry = () => {
    setIsAnswered(false);
    setSelectedChoice(null);
  };

  return (
    <div className="space-y-6">
      {/* Gaming Arcade Screen Header (100% Light Theme) */}
      <div className="relative overflow-hidden rounded-[24px] border border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 p-5 shadow-xs text-text-dark">
        <div className="relative flex flex-col sm:flex-row gap-5 items-center">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs">
              <ShieldCheck className="w-10 h-10 text-accent" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-accent font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider text-white shadow-xs">
              NUM. 56
            </div>
          </div>
          <div className="text-center sm:text-left space-y-1.5">
            <span className="inline-block text-[10px] font-black tracking-widest text-primary uppercase bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
              Minijuego Pedagógico · Módulo 1
            </span>
            <h3 className="text-lg font-black uppercase tracking-tight text-primary">
              Simulador del Deber de Diligencia
            </h3>
            <p className="text-xs text-text-muted leading-relaxed max-w-xl font-medium">
              Clasifica cada situación de la jornada escolar como <strong>SÍ HACER</strong> (conducta diligente) o <strong>NO HACER</strong> (omisión riesgosa) conforme al Numeral 56.
            </p>
          </div>
        </div>
      </div>

      {/* Game Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs font-bold text-primary shadow-xs">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="uppercase tracking-wider">Fase: Clasificación de Conductas</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-primary/5 px-3 py-1 rounded-lg">CONDUCTA: {currentIdx + 1} / {CONDUCTAS.length}</span>
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
        {CONDUCTAS.map((_, qIdx) => (
          <div
            key={qIdx}
            className={`h-2 rounded-full transition-all ${
              qIdx === currentIdx 
                ? "w-12 bg-accent" 
                : qIdx < currentIdx 
                  ? "w-6 bg-primary" 
                  : "w-6 bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Card Content (Light Theme) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs min-h-[160px] flex flex-col justify-center text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-accent" />
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[10px] font-mono font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
            {currentQuestion.numeral}
          </span>
        </div>
        <p className="text-sm font-bold text-slate-800 leading-relaxed sm:text-base px-2">
          &ldquo;{currentQuestion.statement}&rdquo;
        </p>
      </div>

      {/* Option Buttons */}
      {!isAnswered ? (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleChoice(true)}
            className="rounded-xl border-2 border-emerald-600 bg-white py-4 text-xs sm:text-sm font-black text-emerald-700 shadow-sm transition-all hover:bg-emerald-600 hover:text-white hover:scale-[1.01] active:scale-[0.98] cursor-pointer tracking-wider"
          >
            ✓ SÍ HACER
          </button>
          <button
            onClick={() => handleChoice(false)}
            className="rounded-xl border-2 border-rose-600 bg-white py-4 text-xs sm:text-sm font-black text-rose-700 shadow-sm transition-all hover:bg-rose-600 hover:text-white hover:scale-[1.01] active:scale-[0.98] cursor-pointer tracking-wider"
          >
            ✕ NO HACER
          </button>
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
                {isCorrect ? "¡Decisión Correcta!" : "Atención con el Protocolo Institucional:"}
              </h4>
              <p className="text-xs leading-relaxed font-semibold">{currentQuestion.explanation}</p>
            </div>
          </div>

          <div className="flex justify-end">
            {isCorrect ? (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto rounded-xl bg-primary px-8 py-4 font-black text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl active:scale-[0.98] cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span>{currentIdx < CONDUCTAS.length - 1 ? "Siguiente Conducta" : "Finalizar Reto"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="w-full sm:w-auto rounded-xl bg-accent px-8 py-4 font-black text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark hover:shadow-xl active:scale-[0.98] cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Conducta</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
