"use client";

import { useState } from "react";
import { KeyRound, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight, Smartphone, ShieldCheck } from "lucide-react";
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
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const currentTest = PRUEBAS_ACCESO[currentIdx];
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

    if (currentIdx < PRUEBAS_ACCESO.length - 1) {
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
      <div className="relative overflow-hidden rounded-[24px] border border-rose-200 bg-gradient-to-br from-rose-50/80 via-white to-red-50/50 p-5 shadow-xs text-text-dark">
        <div className="relative flex flex-col sm:flex-row gap-5 items-center">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-600 shadow-xs">
              <KeyRound className="w-10 h-10" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-rose-600 font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider text-white shadow-xs">
              NUM. 11 & 50
            </div>
          </div>
          <div className="text-center sm:text-left space-y-1.5">
            <span className="inline-block text-[10px] font-black tracking-widest text-rose-800 uppercase bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
              Minijuego Pedagógico · Módulo 5
            </span>
            <h3 className="text-lg font-black uppercase tracking-tight text-primary">
              Validador de Carnés y Pickup SJ
            </h3>
            <p className="text-xs text-text-muted leading-relaxed max-w-xl font-medium">
              Control estricto de accesos según el color del carné y validación exclusiva por la plataforma digital Pickup SJ.
            </p>
          </div>
        </div>
      </div>

      {/* Game Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs font-bold text-primary shadow-xs">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-600 animate-pulse" />
          <span className="uppercase tracking-wider">Fase: Control de Accesos y Entregas</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-primary/5 px-3 py-1 rounded-lg">PRUEBA: {currentIdx + 1} / {PRUEBAS_ACCESO.length}</span>
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
        {PRUEBAS_ACCESO.map((_, qIdx) => (
          <div
            key={qIdx}
            className={`h-2 rounded-full transition-all ${
              qIdx === currentIdx 
                ? "w-12 bg-accent" 
                : qIdx < currentIdx 
                  ? "w-6 bg-rose-600" 
                  : "w-6 bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Situation Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-2 text-left relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500 to-primary" />
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            {currentTest.type}
          </span>
          {currentTest.badgeColor && (
            <span
              className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                currentTest.badgeColor === "ROJO"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : currentTest.badgeColor === "AZUL"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : currentTest.badgeColor === "VERDE"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-slate-100 text-slate-800 border-slate-300"
              }`}
            >
              CARNÉ {currentTest.badgeColor}
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          {currentTest.situation}
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
              className="w-full p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-rose-500 hover:bg-rose-50/20 transition-all text-left text-xs sm:text-sm font-bold text-slate-800 flex items-start gap-3.5 shadow-xs cursor-pointer active:scale-[0.99]"
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
                {isCorrect ? "¡Autorización Validada con Éxito!" : "Vulnerabilidad de Seguridad Detectada:"}
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
                <span>{currentIdx < PRUEBAS_ACCESO.length - 1 ? "Siguiente Caso" : "Finalizar Reto"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="w-full sm:w-auto rounded-xl bg-accent px-8 py-4 font-black text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark hover:shadow-xl active:scale-[0.98] cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Caso</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
