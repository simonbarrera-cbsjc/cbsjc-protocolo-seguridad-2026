"use client";

import { useState } from "react";
import { MapPin, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight } from "lucide-react";
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
        explanation: "¡Correcto! En espacios cerrados o con divisiones, el protocolo exige patrullaje dinámico y recorrido perimetral."
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
        explanation: "¡Correcto! La regla 2 del numeral 49.2 prohíbe abandonar la zona sin relevo previo oficial tramitado ante Coordinación."
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
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const currentMission = MISIONES_ZONA[currentIdx];
  const isCorrect = selectedOption !== null && currentMission.options[selectedOption].isCorrect;

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    setIsAnswered(true);

    if (currentMission.options[index].isCorrect) {
      setScore(s => s + 1);
    } else {
      setAttempts(a => a + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedOption(null);

    if (currentIdx < MISIONES_ZONA.length - 1) {
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
      <div className="relative overflow-hidden rounded-[24px] border border-purple-200 bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/50 p-5 shadow-xs text-text-dark">
        <div className="relative flex flex-col sm:flex-row gap-5 items-center">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 shadow-xs">
              <MapPin className="w-10 h-10" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-purple-600 font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider text-white shadow-xs">
              NUM. 49
            </div>
          </div>
          <div className="text-center sm:text-left space-y-1.5">
            <span className="inline-block text-[10px] font-black tracking-widest text-purple-800 uppercase bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
              Minijuego Pedagógico · Módulo 4
            </span>
            <h3 className="text-lg font-black uppercase tracking-tight text-primary">
              Mapa Táctico de Custodia en Descansos
            </h3>
            <p className="text-xs text-text-muted leading-relaxed max-w-xl font-medium">
              Control perimetral en las 22 zonas de patio, atención a puntos ciegos y protocolo formal de relevo.
            </p>
          </div>
        </div>
      </div>

      {/* Game Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs font-bold text-primary shadow-xs">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-purple-600 animate-pulse" />
          <span className="uppercase tracking-wider">Fase: Asignación Perimetral de Patio</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-primary/5 px-3 py-1 rounded-lg">MISIÓN: {currentIdx + 1} / {MISIONES_ZONA.length}</span>
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
        {MISIONES_ZONA.map((_, qIdx) => (
          <div
            key={qIdx}
            className={`h-2 rounded-full transition-all ${
              qIdx === currentIdx 
                ? "w-12 bg-accent" 
                : qIdx < currentIdx 
                  ? "w-6 bg-purple-600" 
                  : "w-6 bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Situation Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-2 text-left relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-primary" />
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            {currentMission.zoneTitle}
          </span>
          <span className="text-[10px] text-primary font-mono font-bold">
            {currentMission.zoneType}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          {currentMission.description}
        </p>
        <p className="text-sm font-bold text-slate-800 leading-relaxed sm:text-base pt-1">
          {currentMission.question}
        </p>
      </div>

      {/* Option Buttons */}
      {!isAnswered ? (
        <div className="space-y-3">
          {currentMission.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className="w-full p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-purple-500 hover:bg-purple-50/20 transition-all text-left text-xs sm:text-sm font-bold text-slate-800 flex items-start gap-3.5 shadow-xs cursor-pointer active:scale-[0.99]"
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
                {isCorrect ? "¡Estrategia de Custodia Correcta!" : "Falla en Protocolo de Zona:"}
              </h4>
              <p className="text-xs leading-relaxed font-semibold">
                {currentMission.options[selectedOption!].explanation}
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            {isCorrect ? (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto rounded-xl bg-primary px-8 py-4 font-black text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl active:scale-[0.98] cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span>{currentIdx < MISIONES_ZONA.length - 1 ? "Siguiente Zona" : "Finalizar Reto"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="w-full sm:w-auto rounded-xl bg-accent px-8 py-4 font-black text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark hover:shadow-xl active:scale-[0.98] cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Misión</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
