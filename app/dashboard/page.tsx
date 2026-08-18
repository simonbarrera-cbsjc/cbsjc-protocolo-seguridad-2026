"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Play, CheckCircle, Award, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, ClipboardCheck, BookOpen, KeyRound, Shield } from "lucide-react";
import { PROTOCOL_MODULES } from "@/lib/protocolData";
import confetti from "canvas-confetti";
import ActaConstanciaModal from "@/components/ActaConstanciaModal";
import ChecklistBolsilloModal from "@/components/ChecklistBolsilloModal";
import CasosPracticosModal from "@/components/CasosPracticosModal";
import CarnesVisitantesModal from "@/components/CarnesVisitantesModal";
import AsistenteChatSeguridad from "@/components/AsistenteChatSeguridad";

export default function Dashboard() {
  const router = useRouter();
  const [workerName, setWorkerName] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [workerEmail, setWorkerEmail] = useState("");
  const [workerRole, setWorkerRole] = useState("");

  // Modals state
  const [isActaOpen, setIsActaOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isCasosOpen, setIsCasosOpen] = useState(false);
  const [isCarnesOpen, setIsCarnesOpen] = useState(false);

  const [progress, setProgress] = useState<Record<string, boolean>>({
    "1": false, "2": false, "3": false, "4": false, "5": false, "6": false
  });
  const [completedCount, setCompletedCount] = useState(0);
  const [allCompleted, setAllCompleted] = useState(false);

  const TOTAL_MODULES = 6;

  useEffect(() => {
    const storedName = localStorage.getItem("cbsjc_security_worker_name") || localStorage.getItem("rit_worker_name");
    const storedId = localStorage.getItem("cbsjc_security_worker_id") || localStorage.getItem("rit_worker_id") || "1.115.XXX.XXX";
    const storedEmail = localStorage.getItem("cbsjc_security_worker_email") || localStorage.getItem("rit_worker_email") || "docente@sanjosebilingue.edu.co";
    const storedRole = localStorage.getItem("cbsjc_security_worker_role") || localStorage.getItem("rit_worker_role");

    if (!storedName || !storedRole) {
      router.push("/");
      return;
    }

    setWorkerName(storedName);
    setWorkerId(storedId);
    setWorkerEmail(storedEmail);
    setWorkerRole(storedRole);

    const storedProgress = localStorage.getItem("cbsjc_security_progress") || localStorage.getItem("rit_progress");
    if (storedProgress) {
      try {
        const parsed = JSON.parse(storedProgress);
        for (let i = 1; i <= TOTAL_MODULES; i++) {
          if (parsed[String(i)] === undefined) parsed[String(i)] = false;
        }
        setProgress(parsed);
        const completed = Object.keys(parsed).filter(id => {
          const n = parseInt(id);
          return n >= 1 && n <= TOTAL_MODULES && parsed[id];
        }).length;
        setCompletedCount(completed);
        
        if (completed === TOTAL_MODULES) {
          setAllCompleted(true);
          const confettiShown = sessionStorage.getItem("cbsjc_security_confetti");
          if (!confettiShown) {
            confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
            sessionStorage.setItem("cbsjc_security_confetti", "true");
          }
        }
      } catch {
        const initial: Record<string, boolean> = {};
        for (let i = 1; i <= TOTAL_MODULES; i++) initial[String(i)] = false;
        setProgress(initial);
        localStorage.setItem("cbsjc_security_progress", JSON.stringify(initial));
      }
    }
  }, [router]);

  const isModuleUnlocked = (id: number): boolean => {
    if (id === 1) return true;
    const prevId = (id - 1).toString();
    return progress[prevId] === true;
  };

  const percent = Math.round((completedCount / TOTAL_MODULES) * 100);

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
    <div className="flex-1 bg-bg-soft/40 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden grid-bg min-h-screen">
      
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[100px] -z-10" />

      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* User Card & Progress Header */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(11,25,83,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[9px] font-black text-primary uppercase tracking-widest border border-primary/20">
              <Shield className="w-3 h-3 text-accent" />
              <span>SJB-RGD003 · Versión 2</span>
            </div>
            <h1 className="text-2xl font-black text-primary tracking-tight md:text-3xl uppercase">
              Protocolos Institucionales de Seguridad
            </h1>
            <p className="text-xs sm:text-sm text-text-muted">
              Docente / Funcionario: <span className="font-extrabold text-text-dark">{workerName}</span> • Rol: <span className="font-extrabold text-accent">{workerRole}</span>
            </p>
          </div>

          <div className="w-full md:w-80 space-y-3">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-black text-primary uppercase tracking-widest">
                <span>Avance de Acreditación</span>
                <span className="text-accent font-extrabold">{percent}% ({completedCount}/6)</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out" 
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Modals Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <button
            onClick={() => setIsChecklistOpen(true)}
            className="p-4 rounded-2xl bg-white border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all text-left flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">Anexo A</span>
              <h4 className="text-xs font-black text-slate-800">Checklist de Bolsillo</h4>
            </div>
          </button>

          <button
            onClick={() => setIsCasosOpen(true)}
            className="p-4 rounded-2xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all text-left flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">Anexo B</span>
              <h4 className="text-xs font-black text-slate-800">12 Casos Prácticos</h4>
            </div>
          </button>

          <button
            onClick={() => setIsCarnesOpen(true)}
            className="p-4 rounded-2xl bg-white border border-rose-200 hover:border-rose-400 hover:shadow-md transition-all text-left flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">Seguridad Portería</span>
              <h4 className="text-xs font-black text-slate-800">Código de Carnés</h4>
            </div>
          </button>
        </div>

        {/* 6 Modules Grid & Insignias */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="h-6 w-1 rounded-full bg-accent" />
            <h2 className="text-xl font-black text-primary uppercase tracking-tight">
              Ruta Formativa y Minijuegos Tácticos
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Modules Roadmap */}
            <div className="lg:col-span-2 rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(11,25,83,0.05)] flex flex-col items-center justify-center min-h-[580px]">
              <h3 className="text-xs font-black text-primary mb-6 self-start border-b border-slate-100 pb-3 w-full uppercase tracking-widest flex items-center justify-between">
                <span>Ruta Secuencial de Acreditación</span>
                <span className="text-[10px] text-text-muted">6 Módulos Obligatorios</span>
              </h3>
              
              <div className="relative w-full max-w-xl flex flex-col items-center py-2 space-y-6">
                <div className="absolute top-10 bottom-10 left-1/2 w-0.5 -translate-x-1/2 border-l-2 border-dashed border-slate-200 z-0" />
                
                {PROTOCOL_MODULES.map((mod, index) => {
                  const unlocked = isModuleUnlocked(mod.id);
                  const completed = progress[String(mod.id)] === true;

                  return (
                    <motion.div
                      key={mod.id}
                      className="relative w-full flex items-center justify-center gap-4 z-10"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07, duration: 0.4 }}
                    >
                      <div className={`flex w-full max-w-sm sm:max-w-md items-center justify-between rounded-[22px] border p-4 shadow-xs transition-all duration-300 hover:scale-[1.02] ${
                        completed ? "border-primary/20 bg-primary/[0.02]" :
                        unlocked ? "border-accent/30 bg-white hover:shadow-md cursor-pointer hover:border-accent" :
                        "border-slate-100 bg-slate-50/50"
                      }`}>
                        <div className="flex items-center gap-3.5 flex-1 min-w-0">
                          <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-black text-xs border-2 ${
                            completed ? "bg-emerald-600 border-emerald-600 text-white" :
                            unlocked ? "bg-accent border-accent text-white" :
                            "bg-slate-200 border-slate-300 text-slate-400"
                          }`}>
                            {completed ? (
                              <CheckCircle className="h-4.5 w-4.5 fill-white text-emerald-600" />
                            ) : (
                              <span>{mod.id}</span>
                            )}
                          </div>
                          
                          <div className="flex flex-col min-w-0">
                            <span className="text-[9px] text-text-muted font-black uppercase tracking-widest">
                              Módulo {mod.id} • {mod.numeralRange}
                            </span>
                            <span className={`text-xs sm:text-sm font-extrabold leading-tight ${
                              completed ? "text-primary font-bold" :
                              unlocked ? "text-text-dark" :
                              "text-slate-400"
                            }`}>
                              {mod.title}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-center pl-2">
                          {completed ? (
                            <Link 
                              href={`/modulo/${mod.id}`}
                              className="rounded-full bg-emerald-100 p-2 text-emerald-700 hover:bg-emerald-200 transition-colors"
                              title="Repasar módulo"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Link>
                          ) : unlocked ? (
                            <Link 
                              href={`/modulo/${mod.id}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white shadow-md transition-all hover:scale-105 hover:bg-accent-dark"
                              title="Iniciar módulo"
                            >
                              <Play className="h-3 w-3 fill-white text-accent pl-0.5" />
                            </Link>
                          ) : (
                            <div className="rounded-full bg-slate-100 p-2 text-slate-400">
                              <Lock className="h-4.5 w-4.5" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Badges / Sellos */}
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(11,25,83,0.05)] flex flex-col">
              <h3 className="text-xs font-black text-primary mb-2 border-b border-slate-100 pb-3 uppercase tracking-widest">
                Insignias de Custodia Acreditada
              </h3>
              <p className="text-[11px] text-text-muted mb-5 leading-relaxed">
                Supera el caso de estudio y el minijuego de cada módulo para desbloquear tus insignias institucionales.
              </p>

              <div className="flex-1 grid grid-cols-2 gap-3">
                {PROTOCOL_MODULES.map((mod) => {
                  const completed = progress[String(mod.id)] === true;
                  return (
                    <div 
                      key={mod.id}
                      className={`flex flex-col items-center justify-center rounded-xl p-3.5 border text-center transition-all ${
                        completed 
                          ? "border-accent/30 bg-gradient-to-b from-white to-accent/[0.03] shadow-xs" 
                          : "border-slate-100 bg-slate-50/50 opacity-40 scale-95"
                      }`}
                    >
                      <div className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${
                        completed ? getBadgeGradient(mod.id) : "from-slate-200 to-slate-350"
                      } text-white shadow-md mb-2 border-2 border-white`}>
                        <Award className="h-6 w-6" />
                        {completed && (
                          <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white border border-white">
                            <CheckCircle className="h-2.5 w-2.5 fill-white text-emerald-500" />
                          </div>
                        )}
                      </div>
                      <span className={`text-[9px] font-extrabold leading-tight ${completed ? "text-primary" : "text-text-muted"}`}>
                        {mod.badgeName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Certificate Section */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(11,25,83,0.03)]">
          {allCompleted ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-emerald-500/[0.05] border border-emerald-300 p-6 sm:p-8 rounded-[22px]">
              <div className="flex items-center gap-4 text-left">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-emerald-900 uppercase tracking-tight">
                      ¡Socialización y Acreditación de Seguridad Completada!
                    </h3>
                    <Sparkles className="h-4 w-4 text-amber-500 fill-amber-400" />
                  </div>
                  <p className="text-xs text-emerald-700 leading-relaxed font-semibold">
                    Has completado los 6 módulos y minijuegos del Protocolo SJB-RGD003 V2. Tu Acta de Constancia con firma digital está lista para descarga.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsActaOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-700 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] w-full md:w-auto justify-center cursor-pointer uppercase text-xs tracking-wider"
              >
                <span>Firmar y Descargar Acta PDF</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-[22px]">
              <div className="flex items-center gap-4 text-left">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-400">
                  <Lock className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-text-dark uppercase tracking-tight">
                    Acta de Constancia de Seguridad Bloqueada
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-medium">
                    Completa los {TOTAL_MODULES} módulos interactivos y sus respectivos minijuegos para habilitar el Acta de Constancia y firma electrónica institucional.
                  </p>
                </div>
              </div>
              <button
                disabled
                className="rounded-xl bg-slate-200 px-8 py-4 font-bold text-slate-400 cursor-not-allowed w-full md:w-auto text-center text-xs uppercase tracking-wider border border-slate-300"
              >
                {completedCount} de {TOTAL_MODULES} Completados
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-2">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-xs font-black text-primary hover:text-accent uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al Inicio</span>
          </button>
        </div>

      </div>

      {/* Modales de Soporte y Certificado */}
      <ActaConstanciaModal
        isOpen={isActaOpen}
        onClose={() => setIsActaOpen(false)}
        workerName={workerName}
        workerId={workerId}
        workerEmail={workerEmail}
        workerRole={workerRole}
      />

      <ChecklistBolsilloModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />

      <CasosPracticosModal
        isOpen={isCasosOpen}
        onClose={() => setIsCasosOpen(false)}
      />

      <CarnesVisitantesModal
        isOpen={isCarnesOpen}
        onClose={() => setIsCarnesOpen(false)}
      />

      {/* Floating Groq Assistant */}
      <AsistenteChatSeguridad />
    </div>
  );
}
