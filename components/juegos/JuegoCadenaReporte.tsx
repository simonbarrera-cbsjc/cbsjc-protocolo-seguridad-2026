"use client";

import { useState } from "react";
import { Award, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight, ShieldAlert, Video } from "lucide-react";
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
        explanation: "Incorrecto. Se violan las instancias institucionales y la confidencialidad."
      },
      {
        text: "Reportar de inmediato a Coordinación (y esta a Rectoría / Directivo competente) para activación de medidas.",
        isCorrect: true,
        explanation: "¡Correcto! El Numeral 22 fija el flujo estricto: Docente ➔ Coordinación ➔ Rectoría ➔ Instancias externas."
      },
      {
        text: "Esperar a la reunión de fin de año para comentarlo.",
        isCorrect: false,
        explanation: "Incorrecto. Los riesgos ambientales o estructurales son de reporte urgente e inmediato."
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
        explanation: "Incorrecto. El reporte formal requiere registro escrito detallado y radicación el mismo día."
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
        explanation: "Incorrecto. La omisión de reporte constituye en sí misma un incumplimiento grave del deber de diligencia."
      },
      {
        text: "Apertura de proceso disciplinario laboral conforme al RIT con respeto al debido proceso, proporcionalidad y medidas formativas/sancionatorias.",
        isCorrect: true,
        explanation: "¡Correcto! El Numeral 39 prevé llamados de atención y medidas disciplinarias bajo el Reglamento Interno de Trabajo."
      },
      {
        text: "Pagar una multa en efectivo al rector del colegio.",
        isCorrect: false,
        explanation: "Incorrecto. Se aplica el régimen laboral legal colombiano y el debido proceso institucional."
      }
    ]
  }
];

export default function JuegoCadenaReporte({ onComplete }: { onComplete: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const currentTest = CADENA_PRUEBAS[currentIdx];
  const isCorrect = selectedOption !== null && currentTest.options[selectedOption].isCorrect;

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    setIsAnswered(true);

    if (currentTest.options[index].isCorrect) {
      setScore(s => s + 1);
    } else {
      setAttempts(a => a + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedOption(null);

    if (currentIdx < CADENA_PRUEBAS.length - 1) {
      setCurrentIdx(c => c + 1);
    } else {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
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
      <div className="relative overflow-hidden rounded-[24px] border border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 p-5 shadow-xs text-text-dark">
        <div className="relative flex flex-col sm:flex-row gap-5 items-center">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs">
              <Award className="w-10 h-10 text-accent" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider text-white shadow-xs">
              NUM. 22 & 36
            </div>
          </div>
          <div className="text-center sm:text-left space-y-1.5">
            <span className="inline-block text-[10px] font-black tracking-widest text-primary uppercase bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
              Minijuego Pedagógico · Módulo 6
            </span>
            <h3 className="text-lg font-black uppercase tracking-tight text-primary">
              Secuenciador de Cadena y Trazabilidad
            </h3>
            <p className="text-xs text-text-muted leading-relaxed max-w-xl font-medium">
              Escalamiento jerárquico formal, registro de los 6 datos clave del reporte y garantías disciplinarias del RIT.
            </p>
          </div>
        </div>
      </div>

      {/* Game Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs font-bold text-primary shadow-xs">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="uppercase tracking-wider">Fase: Validación de Cadena Institucional</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-primary/5 px-3 py-1 rounded-lg">PREGUNTA: {currentIdx + 1} / {CADENA_PRUEBAS.length}</span>
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
        {CADENA_PRUEBAS.map((_, qIdx) => (
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

      {/* Situation Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-2 text-left relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-accent" />
        <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 inline-block">
          {currentTest.category}
        </span>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          {currentTest.scenario}
        </p>
        <p className="text-sm font-bold text-slate-800 leading-relaxed sm:text-base pt-1">
          {currentTest.question}
        </p>
      </div>

      {/* Option Buttons */}
      {!isAnswered ? (
        <div className="space-y-3">
          {currentTest.options.map((opt, idx) => (
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
                {isCorrect ? "¡Escalamiento y Criterio Conforme!" : "Procedimiento No Conforme:"}
              </h4>
              <p className="text-xs leading-relaxed font-semibold">
                {currentTest.options[selectedOption!].explanation}
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            {isCorrect ? (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto rounded-xl bg-primary px-8 py-4 font-black text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl active:scale-[0.98] cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span>{currentIdx < CADENA_PRUEBAS.length - 1 ? "Siguiente Pregunta" : "Finalizar y Acreditar Módulo"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="w-full sm:w-auto rounded-xl bg-accent px-8 py-4 font-black text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark hover:shadow-xl active:scale-[0.98] cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Pregunta</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
