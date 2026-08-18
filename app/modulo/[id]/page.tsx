"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Lightbulb, BookOpen, AlertCircle, Award, Sparkles, CheckCircle2, RefreshCw, ShieldCheck } from "lucide-react";
import { PROTOCOL_MODULES, Card, CaseStudy, Option } from "@/lib/protocolData";
import AsistenteChatSeguridad from "@/components/AsistenteChatSeguridad";

import JuegoDeberDiligencia from "@/components/juegos/JuegoDeberDiligencia";
import JuegoDesplazamientosBanos from "@/components/juegos/JuegoDesplazamientosBanos";
import JuegoSeedBloomHuerta from "@/components/juegos/JuegoSeedBloomHuerta";
import JuegoCustodiaZonas from "@/components/juegos/JuegoCustodiaZonas";
import JuegoCarnesPickupSJ from "@/components/juegos/JuegoCarnesPickupSJ";
import JuegoCadenaReporte from "@/components/juegos/JuegoCadenaReporte";

export default function ModuloRunner() {
  const router = useRouter();
  const params = useParams();
  const modId = params.id as string;
  const modIdNum = parseInt(modId, 10);

  const [step, setStep] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [currentCaseIdx, setCurrentCaseIdx] = useState(0);
  const [caseAnswered, setCaseAnswered] = useState(false);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);

  const moduleInfo = PROTOCOL_MODULES.find((m) => m.id === modIdNum);
  const TOTAL_MODULES = 6;

  useEffect(() => {
    if (!moduleInfo) {
      router.push("/dashboard");
      return;
    }

    const progressStr = localStorage.getItem("cbsjc_security_progress") || localStorage.getItem("rit_progress");

    try {
      const progress = progressStr ? JSON.parse(progressStr) : {};

      if (modIdNum !== 1) {
        const prevId = (modIdNum - 1).toString();
        if (!progress[prevId]) {
          router.push("/dashboard");
          return;
        }
      }
    } catch {
      router.push("/dashboard");
    }
  }, [modIdNum, moduleInfo, router]);

  if (!moduleInfo) return null;

  const handleCardClick = (idx: number) => {
    setFlippedCards((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const allCardsReviewed = 
    Object.keys(flippedCards).length === moduleInfo.flashcards.length && 
    Object.values(flippedCards).every(Boolean);

  const currentCase = moduleInfo.cases[currentCaseIdx];

  const handleOptionSelect = (optIdx: number) => {
    setSelectedOptionIdx(optIdx);
    setCaseAnswered(true);
  };

  const handleNextCase = () => {
    setCaseAnswered(false);
    setSelectedOptionIdx(null);

    if (currentCaseIdx < moduleInfo.cases.length - 1) {
      setCurrentCaseIdx((c) => c + 1);
    } else {
      setStep(3); // Go to tactical minigame
    }
  };

  const handleGameComplete = () => {
    const progressStr = localStorage.getItem("cbsjc_security_progress") || localStorage.getItem("rit_progress");
    try {
      const progress = progressStr ? JSON.parse(progressStr) : {};
      progress[String(modIdNum)] = true;
      localStorage.setItem("cbsjc_security_progress", JSON.stringify(progress));
    } catch (e) {
      console.error(e);
    }
    setStep(4); // Go to badge celebration
  };

  const getBadgeGradient = (id: number) => {
    switch (id) {
      case 1: return "from-blue-600 to-indigo-600 shadow-blue-500/25";
      case 2: return "from-teal-500 to-emerald-600 shadow-teal-500/25";
      case 3: return "from-amber-500 to-orange-600 shadow-amber-500/25";
      case 4: return "from-purple-600 to-indigo-600 shadow-purple-500/25";
      case 5: return "from-rose-600 to-red-600 shadow-rose-500/25";
      case 6: return "from-emerald-600 to-teal-700 shadow-emerald-500/25";
      default: return "from-slate-300 to-slate-400";
    }
  };

  return (
    <div className="flex-1 bg-bg-soft/40 py-8 px-4 sm:px-6 lg:px-8 grid-bg min-h-screen relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[100px] -z-10" />

      <div className="mx-auto max-w-3xl space-y-6">
        
        {/* Navigation & Step counter */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-xs font-black text-primary hover:text-accent uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al Roadmap</span>
          </button>
          
          <div className="text-[10px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
            <span className="text-accent font-bold">Módulo {modId} de {TOTAL_MODULES}</span>
            <span>•</span>
            <span>Paso {step + 1} de 5</span>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-10 shadow-[0_25px_60px_rgba(11,25,83,0.06)]">
          
          {/* STEP 0: Introduction */}
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 text-center py-2"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-inner">
                <ShieldCheck className="h-8 w-8 text-accent" />
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                  {moduleInfo.numeralRange}
                </span>
                <h2 className="text-2xl font-black text-primary tracking-tight md:text-3xl uppercase pt-2">
                  {moduleInfo.title}
                </h2>
                <p className="text-sm text-text-muted max-w-xl mx-auto mt-2 leading-relaxed">
                  {moduleInfo.intro.description}
                </p>
              </div>

              <div className="rounded-[20px] bg-slate-50 border border-slate-200 p-6 text-left max-w-xl mx-auto shadow-xs">
                <div className="flex gap-2 items-center text-xs font-black text-primary uppercase tracking-wider mb-2">
                  <Lightbulb className="h-4 w-4 text-accent fill-accent/15" />
                  <span>Puntos Clave a Considerar:</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-text-dark leading-relaxed font-semibold list-disc list-inside">
                  {moduleInfo.intro.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
              >
                <span>Comenzar con las Flashcards 3D</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 1: Informative Flashcards 3D (100% Light Institutional Theme) */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">
                  Paso 1 · Socialización Dinámica
                </span>
                <h3 className="text-xl font-black text-primary mt-1 uppercase tracking-tight">
                  Flashcards 3D de Seguridad
                </h3>
                <p className="text-xs text-text-muted mt-1 max-w-md mx-auto">
                  Haz clic en cada tarjeta para girarla en 3D y descubrir la pauta reglamentaria. Revisa las {moduleInfo.flashcards.length} tarjetas para continuar.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
                {moduleInfo.flashcards.map((card: Card, idx: number) => {
                  const isFlipped = !!flippedCards[idx];
                  return (
                    <div 
                      key={card.id || idx}
                      onClick={() => handleCardClick(idx)}
                      className="h-56 w-full cursor-pointer perspective-1000 select-none"
                    >
                      <div className={`relative h-full w-full preserve-3d transition-transform duration-500 rounded-[22px] border ${
                        isFlipped 
                          ? "rotate-y-180 bg-blue-50/90 text-text-dark border-primary/30 shadow-md" 
                          : "bg-slate-50 hover:bg-white text-text-dark border-slate-200 hover:border-accent hover:shadow-md shadow-xs"
                      }`}>
                        
                        {/* Front of Card */}
                        <div className="absolute inset-0 backface-hidden p-6 flex flex-col items-center justify-center text-center space-y-3">
                          <span className="text-[9px] font-mono font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
                            {card.numeral || `Tarjeta ${idx + 1}`}
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold text-primary leading-snug">
                            {card.front}
                          </span>
                          <span className="text-[9px] text-text-muted font-black uppercase tracking-widest animate-pulse pt-1">
                            Clic para girar 🔄
                          </span>
                        </div>

                        {/* Back of Card (Rotated - 100% Light Theme) */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 p-5 flex flex-col justify-center text-center bg-white border border-primary/20 text-slate-800 rounded-[22px] overflow-y-auto custom-scrollbar shadow-inner">
                          <span className="text-[9px] text-primary font-black uppercase tracking-widest mb-1.5 bg-primary/5 py-1 px-2 rounded-lg border border-primary/10 inline-block mx-auto">
                            {card.category || "Pauta Institucional"}
                          </span>
                          <p className="text-[11px] sm:text-xs leading-relaxed text-slate-700 font-semibold mt-1">
                            {card.back}
                          </p>
                          <span className="text-[9px] text-emerald-600 font-bold mt-2">
                            ✓ Pauta consultada
                          </span>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center border-t border-slate-100 pt-5">
                <span className="text-[11px] font-bold text-text-muted">
                  Tarjetas consultadas: {Object.values(flippedCards).filter(Boolean).length} / {moduleInfo.flashcards.length}
                </span>
                <button
                  onClick={() => setStep(2)}
                  disabled={!allCardsReviewed}
                  className={`flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-white shadow-md transition-all uppercase text-xs tracking-wider cursor-pointer ${
                    allCardsReviewed 
                      ? "bg-accent hover:bg-accent-dark hover:shadow-lg active:scale-[0.98]" 
                      : "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300 shadow-none"
                  }`}
                >
                  <span>Siguiente: Casos Prácticos</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Case Studies */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">
                  Paso 2 · Casos Prácticos de Aplicación
                </span>
                <h3 className="text-xl font-black text-primary mt-1 uppercase tracking-tight">
                  ¿Cómo debes actuar como docente?
                </h3>
                <p className="text-xs text-text-muted mt-1 max-w-md mx-auto">
                  Analiza el escenario real de custodia y selecciona la decisión correcta conforme al protocolo.
                </p>
              </div>

              <div className="text-[10px] font-black text-text-muted text-right uppercase tracking-widest">
                Caso {currentCaseIdx + 1} de {moduleInfo.cases.length}
              </div>

              <div className="rounded-[20px] border border-primary/15 bg-primary/[0.03] p-5 sm:p-6 shadow-xs">
                <div className="flex gap-2 items-center text-xs font-black text-primary uppercase tracking-wider mb-2">
                  <AlertCircle className="h-4 w-4 text-accent animate-pulse" />
                  <span>{currentCase.title || "Situación en el Colegio"}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-text-dark leading-relaxed mb-3">
                  {currentCase.situation}
                </p>
                <p className="text-xs sm:text-sm font-bold text-primary leading-relaxed border-t border-slate-200/60 pt-2">
                  {currentCase.question}
                </p>
              </div>

              {!caseAnswered ? (
                <div className="flex flex-col gap-3">
                  {currentCase.options.map((opt: Option, oIdx: number) => (
                    <button
                      key={opt.id || oIdx}
                      onClick={() => handleOptionSelect(oIdx)}
                      className="w-full rounded-xl border border-slate-200 bg-white p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-text-dark hover:bg-primary/[0.03] hover:border-primary/50 hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-5">
                  {selectedOptionIdx !== null && (
                    <div className={`rounded-[20px] border p-5 flex gap-3 ${
                      currentCase.options[selectedOptionIdx].isCorrect 
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900" 
                        : "bg-rose-50 border-rose-300 text-rose-900"
                    }`}>
                      <div className="space-y-1.5">
                        <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-1.5">
                          {currentCase.options[selectedOptionIdx].isCorrect ? (
                            <>
                              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 fill-emerald-100" />
                              <span>¡Procedimiento Correcto!</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-4.5 w-4.5 text-rose-600" />
                              <span>Procedimiento No Conforme</span>
                            </>
                          )}
                        </h4>
                        <p className="text-xs leading-relaxed font-medium">
                          {currentCase.options[selectedOptionIdx].explanation}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    {currentCase.options[selectedOptionIdx!].isCorrect ? (
                      <button
                        onClick={handleNextCase}
                        className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] cursor-pointer text-xs uppercase tracking-wider"
                      >
                        <span>
                          {currentCaseIdx < moduleInfo.cases.length - 1 
                            ? "Siguiente Caso Práctico" 
                            : "Ir al Minijuego Táctico"
                          }
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setCaseAnswered(false);
                          setSelectedOptionIdx(null);
                        }}
                        className="flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark hover:shadow-xl active:scale-[0.98] cursor-pointer text-xs uppercase tracking-wider"
                      >
                        <span>Reintentar Escenario</span>
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 3: Tactical Minigame */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-2 space-y-4"
            >
              <div className="text-center mb-2">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">
                  Paso 3 · Minijuego de Simulación Táctica
                </span>
                <h3 className="text-xl font-black text-primary mt-1 uppercase tracking-tight">
                  Demuestra tu Criterio Operativo
                </h3>
              </div>

              {modIdNum === 1 && <JuegoDeberDiligencia onComplete={handleGameComplete} />}
              {modIdNum === 2 && <JuegoDesplazamientosBanos onComplete={handleGameComplete} />}
              {modIdNum === 3 && <JuegoSeedBloomHuerta onComplete={handleGameComplete} />}
              {modIdNum === 4 && <JuegoCustodiaZonas onComplete={handleGameComplete} />}
              {modIdNum === 5 && <JuegoCarnesPickupSJ onComplete={handleGameComplete} />}
              {modIdNum === 6 && <JuegoCadenaReporte onComplete={handleGameComplete} />}
            </motion.div>
          )}

          {/* STEP 4: Badge Celebration & Module Accreditation */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center py-2"
            >
              <div className="relative flex flex-col items-center">
                <div className="absolute w-44 h-44 rounded-full bg-radial from-amber-400/20 via-orange-400/5 to-transparent blur-xl -z-10 animate-pulse" />
                
                <div className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${getBadgeGradient(modIdNum)} text-white shadow-2xl animate-bounce border-2 border-white`}>
                  <Award className="h-12 w-12" />
                </div>
                
                <div className="flex items-center gap-1.5 justify-center mt-4">
                  <h3 className="text-xl font-black text-primary uppercase tracking-tight">
                    {moduleInfo.badgeName}
                  </h3>
                  <Sparkles className="h-5 w-5 text-amber-500 fill-amber-300" />
                </div>
                
                <p className="text-xs text-text-muted max-w-xs mt-1 font-medium">
                  {moduleInfo.summary}
                </p>
              </div>

              <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-6 sm:p-7 max-w-xl mx-auto text-left space-y-3 shadow-xs">
                <h4 className="text-xs font-black text-primary uppercase tracking-widest border-b border-slate-200 pb-2.5">
                  Resumen de Aprendizajes Clave
                </h4>
                <p className="text-xs sm:text-sm text-text-dark leading-relaxed font-semibold">
                  {moduleInfo.reading.summary}
                </p>
              </div>

              <button
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-700 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-xs uppercase tracking-wider"
              >
                <span>Guardar y Volver al Roadmap</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

        </div>

      </div>

      {/* Floating Chat Assistant (Only inside logged-in module/dashboard) */}
      <AsistenteChatSeguridad />
    </div>
  );
}
