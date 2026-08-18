"use client";

import { useState } from "react";
import { Compass, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight, ShieldAlert } from "lucide-react";
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
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const currentChallenge = DESAFIOS[currentIdx];
  const isCorrect = selectedOption === currentChallenge.correctIndex;

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentChallenge.correctIndex) {
      setScore(s => s + 1);
    } else {
      setAttempts(a => a + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedOption(null);

    if (currentIdx < DESAFIOS.length - 1) {
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
      <div className="relative overflow-hidden rounded-[24px] border border-amber-200 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 p-5 shadow-xs text-text-dark">
        <div className="relative flex flex-col sm:flex-row gap-5 items-center">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shadow-xs">
              <Compass className="w-10 h-10" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-600 font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider text-white shadow-xs">
              NUM. 46-48
            </div>
          </div>
          <div className="text-center sm:text-left space-y-1.5">
            <span className="inline-block text-[10px] font-black tracking-widest text-amber-800 uppercase bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              Minijuego Pedagógico · Módulo 3
            </span>
            <h3 className="text-lg font-black uppercase tracking-tight text-primary">
              Inspector SEED BLOOM y Huerta
            </h3>
            <p className="text-xs text-text-muted leading-relaxed max-w-xl font-medium">
              Control de riesgos en picadero ecuestre, uso estricto de EPP y bioseguridad en espacios abiertos.
            </p>
          </div>
        </div>
      </div>

      {/* Game Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs font-bold text-primary shadow-xs">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-600 animate-pulse" />
          <span className="uppercase tracking-wider">Fase: Supervisión de Espacios Especializados</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-primary/5 px-3 py-1 rounded-lg">DESAFÍO: {currentIdx + 1} / {DESAFIOS.length}</span>
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
        {DESAFIOS.map((_, qIdx) => (
          <div
            key={qIdx}
            className={`h-2 rounded-full transition-all ${
              qIdx === currentIdx 
                ? "w-12 bg-accent" 
                : qIdx < currentIdx 
                  ? "w-6 bg-amber-600" 
                  : "w-6 bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Situation Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-2 text-left relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-primary" />
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            {currentChallenge.environment}
          </span>
          <span className="text-[10px] text-rose-600 flex items-center gap-1 font-bold">
            <ShieldAlert className="w-3.5 h-3.5" /> Riesgo de Campo
          </span>
        </div>
        <p className="text-sm font-bold text-slate-800 leading-relaxed sm:text-base">
          {currentChallenge.scenario}
        </p>
        <p className="text-xs text-slate-500 italic pt-1 border-t border-slate-100 font-medium">
          <strong>Peligro identificado:</strong> {currentChallenge.riskItem}
        </p>
      </div>

      {/* Option Buttons */}
      {!isAnswered ? (
        <div className="space-y-3">
          {currentChallenge.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className="w-full p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-500 hover:bg-amber-50/20 transition-all text-left text-xs sm:text-sm font-bold text-slate-800 flex items-start gap-3.5 shadow-xs cursor-pointer active:scale-[0.99]"
            >
              <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="flex-1 leading-relaxed">{opt}</span>
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
                {isCorrect ? "¡Protocolo Aplicado Correctamente!" : "Respuesta Incorrecta:"}
              </h4>
              <p className="text-xs leading-relaxed font-semibold">
                {currentChallenge.correctAction}
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            {isCorrect ? (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto rounded-xl bg-primary px-8 py-4 font-black text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl active:scale-[0.98] cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span>{currentIdx < DESAFIOS.length - 1 ? "Siguiente Desafío" : "Finalizar Reto"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="w-full sm:w-auto rounded-xl bg-accent px-8 py-4 font-black text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark hover:shadow-xl active:scale-[0.98] cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Desafío</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
