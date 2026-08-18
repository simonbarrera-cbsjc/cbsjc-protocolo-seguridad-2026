"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, UserCheck, ArrowRight, Shield, Award, Users, BookCheck, Lock, BellRing, RotateCcw } from "lucide-react";
import Hero3D from "@/components/Hero3D";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Docente Preescolar");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const storedName =
        localStorage.getItem("cbsjc_security_worker_name") ||
        localStorage.getItem("rit_worker_name") ||
        localStorage.getItem("cbsjc_parent_name") ||
        localStorage.getItem("cbsjc_worker_name") ||
        localStorage.getItem("worker_name");

      const storedId =
        localStorage.getItem("cbsjc_security_worker_id") ||
        localStorage.getItem("rit_worker_id") ||
        "1.115.XXX.XXX";

      const storedEmail =
        localStorage.getItem("cbsjc_security_worker_email") ||
        localStorage.getItem("rit_worker_email") ||
        "docente@sanjosebilingue.edu.co";

      const storedRole =
        localStorage.getItem("cbsjc_security_worker_role") ||
        localStorage.getItem("rit_worker_role") ||
        "Docente Preescolar";

      if (storedName && storedName.trim().length > 0) {
        setName(storedName.trim());
        setIdNumber(storedId);
        setEmail(storedEmail);
        setRole(storedRole);
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    };

    checkSession();
    window.addEventListener("storage", checkSession);
    window.addEventListener("focus", checkSession);
    return () => {
      window.removeEventListener("storage", checkSession);
      window.removeEventListener("focus", checkSession);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    localStorage.setItem("cbsjc_security_worker_name", name.trim());
    localStorage.setItem("cbsjc_security_worker_id", idNumber.trim() || "1.115.XXX.XXX");
    localStorage.setItem("cbsjc_security_worker_email", email.trim() || "docente@sanjosebilingue.edu.co");
    localStorage.setItem("cbsjc_security_worker_role", role);

    const initialProgress = {
      "1": false, "2": false, "3": false, "4": false, "5": false, "6": false
    };

    if (!localStorage.getItem("cbsjc_security_progress")) {
      localStorage.setItem("cbsjc_security_progress", JSON.stringify(initialProgress));
    }

    router.push("/dashboard");
  };

  const handleResetAndGo = () => {
    localStorage.removeItem("cbsjc_security_worker_name");
    localStorage.removeItem("cbsjc_security_worker_id");
    localStorage.removeItem("cbsjc_security_worker_email");
    localStorage.removeItem("cbsjc_security_worker_role");
    localStorage.removeItem("cbsjc_security_progress");
    localStorage.removeItem("cbsjc_security_pocket_checklist");
    localStorage.removeItem("cbsjc_security_confetti");
    localStorage.removeItem("rit_worker_name");
    localStorage.removeItem("rit_worker_id");
    localStorage.removeItem("rit_worker_email");
    localStorage.removeItem("rit_worker_role");
    localStorage.removeItem("rit_progress");
    localStorage.removeItem("cbsjc_parent_name");
    localStorage.removeItem("cbsjc_worker_name");
    localStorage.removeItem("worker_name");

    setName("");
    setIdNumber("");
    setEmail("");
    setRole("Docente Preescolar");
    setIsRegistered(false);
  };

  const IDEAS_FUERZA = [
    {
      num: 1,
      title: "Responsabilidad Funcional",
      desc: "La custodia del docente no es opcional ni delegable informalmente.",
      icon: ShieldCheck,
      color: "border-blue-200 bg-blue-50/50 text-blue-900"
    },
    {
      num: 2,
      title: "Conteo Continuo",
      desc: "Contar al salir del salón, al llegar al destino y al finalizar la actividad.",
      icon: Users,
      color: "border-emerald-200 bg-emerald-50/50 text-emerald-900"
    },
    {
      num: 3,
      title: "Supervisión Activa",
      desc: "La presencia de instructores externos no releva al docente titular de vigilar.",
      icon: BookCheck,
      color: "border-amber-200 bg-amber-50/50 text-amber-900"
    },
    {
      num: 4,
      title: "Reporte Inmediato",
      desc: "Toda novedad, golpe o anomalía debe reportarse el mismo día sin excepción.",
      icon: BellRing,
      color: "border-purple-200 bg-purple-50/50 text-purple-900"
    },
    {
      num: 5,
      title: "Canal Exclusivo Pickup",
      desc: "Autorizaciones solo por Pickup SJ Campestre. WhatsApp carece de validez.",
      icon: Lock,
      color: "border-rose-200 bg-rose-50/50 text-rose-900"
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-8 px-4 sm:px-6 lg:px-8 grid-bg relative overflow-hidden bg-bg-soft">
      
      {/* Background soft ambient lights */}
      <div className="absolute top-[-5%] left-[5%] w-[45%] h-[45%] rounded-full bg-primary/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[-5%] right-[5%] w-[45%] h-[45%] rounded-full bg-accent/5 blur-[120px] -z-10" />

      <div className="w-full max-w-5xl space-y-12 my-auto">
        
        {/* Hero Section with 3D Shield */}
        <section className="flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-black text-primary uppercase tracking-widest border border-primary/20 shadow-xs">
            <Shield className="h-3.5 w-3.5 text-accent" />
            <span>SJB-RGD003 · Versión 2 · Vigencia 2026</span>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl font-black text-primary tracking-tight sm:text-5xl uppercase">
              Protocolos Institucionales de Seguridad
            </h1>
            <p className="text-sm sm:text-base text-text-muted font-medium max-w-2xl mx-auto leading-relaxed">
              Guía oficial de socialización, entrenamiento táctico y acreditación en custodia, traslados, descansos y gestión de riesgos para docentes y directivos del <span className="font-bold text-text-dark">Colegio Bilingüe San José Campestre</span>.
            </p>
          </div>

          {/* 3D Shield Interactive Canvas */}
          <div className="w-full flex justify-center py-2">
            <Hero3D />
          </div>
        </section>

        {/* 5 Ideas Fuerza (100% Light Theme) */}
        <section className="w-full space-y-4">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-black text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
              Fundamentos de Custodia Escolar
            </span>
            <h2 className="text-xl font-black text-primary uppercase tracking-tight pt-1">
              Las 5 Ideas Fuerza del Protocolo 2026
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-2">
            {IDEAS_FUERZA.map((idea) => {
              const IconComp = idea.icon;
              return (
                <div
                  key={idea.num}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md hover:border-primary/30 transition-all flex flex-col justify-between space-y-2.5 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-black text-xs">
                      {idea.num}
                    </span>
                    <IconComp className="h-4 w-4 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-black text-primary uppercase leading-tight">
                      {idea.title}
                    </h3>
                    <p className="text-[11px] text-text-muted font-medium leading-snug">
                      {idea.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Form Registration / Welcome Back Card (100% Light Theme) */}
        <section className="w-full max-w-xl mx-auto">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-10 shadow-[0_20px_50px_rgba(11,25,83,0.06)] relative overflow-hidden">
            
            {isRegistered ? (
              <div className="text-center space-y-6 py-2">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-inner">
                  <ShieldCheck className="h-10 w-10" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Sesión Guardada en este Dispositivo
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-primary uppercase tracking-tight pt-1">
                    ¡Bienvenido de nuevo!
                  </h2>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
                    Tiene un registro activo para el docente/funcionario <strong className="text-primary">{name}</strong> (C.C. {idNumber} • <span className="text-accent font-bold">{role}</span>).
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl active:scale-[0.98] cursor-pointer text-xs uppercase tracking-wider"
                  >
                    <span>Reanudar Socialización</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handleResetAndGo}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-xs font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-all cursor-pointer uppercase tracking-wider"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Nuevo Registro</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center space-y-2 mb-8">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-1">
                    <UserCheck className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-primary uppercase tracking-tight">
                    Registro Institucional
                  </h2>
                  <p className="text-xs text-text-muted">
                    Ingresa tus datos oficiales para iniciar la ruta de acreditación y habilitar la firma digital del Acta.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-primary uppercase tracking-wider block">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Lic. Carlos Andrés Mora"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-xs sm:text-sm font-semibold text-text-dark focus:border-accent focus:bg-white focus:outline-none transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-primary uppercase tracking-wider block">
                      Cédula de Ciudadanía / Documento
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. 1.115.890.123"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-xs sm:text-sm font-semibold text-text-dark focus:border-accent focus:bg-white focus:outline-none transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-primary uppercase tracking-wider block">
                      Correo Electrónico Institucional
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="docente@sanjosebilingue.edu.co"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-xs sm:text-sm font-semibold text-text-dark focus:border-accent focus:bg-white focus:outline-none transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-primary uppercase tracking-wider block">
                      Cargo / Nivel de Desempeño
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-xs sm:text-sm font-semibold text-text-dark focus:border-accent focus:bg-white focus:outline-none transition-all shadow-inner cursor-pointer"
                    >
                      <option value="Docente Preescolar">Docente Preescolar (Infants a Transition)</option>
                      <option value="Docente Primaria Inicial">Docente Primaria Inicial (1° a 3°)</option>
                      <option value="Docente Primaria Superior / Secundaria">Docente Primaria Superior / Secundaria (4° a 8°)</option>
                      <option value="Docente Media">Docente Media (9° a 11°)</option>
                      <option value="Docente Área Especializada (Artes / Deportes / SEED BLOOM)">Docente Área Especializada (Artes / Deportes / SEED BLOOM)</option>
                      <option value="Coordinación Académica / Convivencia">Coordinación Académica / Convivencia</option>
                      <option value="Personal Administrativo y de Apoyo">Personal Administrativo y de Apoyo</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-xs uppercase tracking-wider"
                  >
                    <span>Iniciar Socialización de Protocolos</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            )}

          </div>
        </section>

      </div>
    </div>
  );
}
