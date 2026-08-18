"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Zap, Star, Shield, Users, Footprints, Compass, MapPin, KeyRound } from "lucide-react";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

export default function Home() {
  const router = useRouter();
  const [workerName, setWorkerName] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [workerEmail, setWorkerEmail] = useState("");
  const [workerRole, setWorkerRole] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("cbsjc_security_worker_name") || localStorage.getItem("rit_worker_name");
    const storedId = localStorage.getItem("cbsjc_security_worker_id") || localStorage.getItem("rit_worker_id");
    const storedEmail = localStorage.getItem("cbsjc_security_worker_email") || localStorage.getItem("rit_worker_email");
    const storedRole = localStorage.getItem("cbsjc_security_worker_role") || localStorage.getItem("rit_worker_role");

    if (storedName && storedId && storedEmail && storedRole) {
      setWorkerName(storedName);
      setWorkerId(storedId);
      setWorkerEmail(storedEmail);
      setWorkerRole(storedRole);
      setIsRegistered(true);
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerName.trim() || !workerId.trim() || !workerEmail.trim() || !workerRole) return;

    localStorage.setItem("cbsjc_security_worker_name", workerName.trim());
    localStorage.setItem("cbsjc_security_worker_id", workerId.trim());
    localStorage.setItem("cbsjc_security_worker_email", workerEmail.trim());
    localStorage.setItem("cbsjc_security_worker_role", workerRole);

    if (!localStorage.getItem("cbsjc_security_progress")) {
      const initialProgress = { "1": false, "2": false, "3": false, "4": false, "5": false, "6": false };
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
    localStorage.removeItem("rit_worker_name");
    localStorage.removeItem("rit_worker_id");
    localStorage.removeItem("rit_worker_email");
    localStorage.removeItem("rit_worker_role");
    localStorage.removeItem("rit_progress");
    setWorkerName("");
    setWorkerId("");
    setWorkerEmail("");
    setWorkerRole("");
    setIsRegistered(false);
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-bg-soft via-white to-bg-soft relative overflow-hidden">
      
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-primary/5 blur-[120px] -z-10" />
      <div className="absolute top-[30%] right-[-10%] w-[40%] h-[50%] rounded-full bg-accent/5 blur-[100px] -z-10" />

      {/* Hero Section */}
      <section className="relative grid-bg border-b border-slate-100 py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            
            <div className="flex flex-col space-y-6 lg:col-span-7">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-[10px] sm:text-xs font-black text-primary uppercase tracking-widest shadow-xs">
                <Star className="h-4 w-4 fill-accent text-accent animate-pulse" />
                <span>Guía Docente SJB-RGD003 · Versión 2</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-[58px] leading-[1.1] lg:leading-[1.12]">
                Protocolos Institucionales de{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Seguridad y Custodia 2026
                </span>
              </h1>

              <p className="text-sm text-text-muted sm:text-base md:text-lg max-w-xl leading-relaxed">
                Plataforma interactiva para la socialización y acreditación del personal docente y directivo de CBSJC. Domina las <strong>5 Ideas Fuerza</strong>, el <strong>Deber de Diligencia (Num. 56)</strong>, la cobertura de las <strong>22 Zonas de Patio</strong>, <strong>SEED BLOOM</strong>, el código de <strong>Carnés</strong> y el despacho por <strong>Pickup SJ Campestre</strong>.
              </p>

              <div className="grid grid-cols-3 gap-4 border-t border-slate-150 pt-6 text-[10px] text-text-dark font-black sm:text-xs uppercase tracking-wider">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span>5 Ideas Fuerza</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Award className="h-4 w-4" />
                  </div>
                  <span>6 Minijuegos</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Zap className="h-4 w-4" />
                  </div>
                  <span>Acta PDF</span>
                </div>
              </div>
            </div>

            {/* 3D Security Shield Container */}
            <div className="relative lg:col-span-5 h-[380px] sm:h-[440px] lg:h-[480px] w-full flex items-center justify-center">
              <div className="absolute w-[85%] h-[85%] rounded-full bg-radial from-accent/15 via-primary/10 to-transparent blur-2xl -z-10" />
              
              <div className="relative h-full w-full rounded-[32px] bg-white/[0.04] border border-slate-200/60 overflow-hidden shadow-[0_20px_50px_rgba(11,25,83,0.12)] backdrop-blur-xs flex items-center justify-center">
                <div className="absolute top-4 left-4 z-10 rounded-full bg-slate-900/90 border border-slate-700 px-3 py-1 text-[9px] font-black text-amber-300 uppercase tracking-widest shadow-md flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-amber-400" />
                  <span>Escudo de Seguridad 3D</span>
                </div>
                <Hero3D />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5 Core Ideas Banner */}
      <section className="py-12 bg-slate-900 text-white border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-accent-light">
              Fundamentos de Custodia Escolar
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Las 5 Ideas Fuerza del Protocolo 2026
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-black flex items-center justify-center mb-2">1</span>
                <h4 className="text-xs font-bold text-slate-100 uppercase">Responsabilidad Funcional</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  La custodia del docente no es opcional ni delegable informalmente.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/40 text-xs font-black flex items-center justify-center mb-2">2</span>
                <h4 className="text-xs font-bold text-slate-100 uppercase">Conteo Continuo</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Contar al salir del salón, al llegar al destino y al finalizar la actividad.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-black flex items-center justify-center mb-2">3</span>
                <h4 className="text-xs font-bold text-slate-100 uppercase">Supervisión Activa</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  La presencia de instructores externos no releva al docente titular de vigilar.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black flex items-center justify-center mb-2">4</span>
                <h4 className="text-xs font-bold text-slate-100 uppercase">Reporte Inmediato</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Toda novedad, golpe o anomalía debe reportarse el mismo día sin excepción.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/40 text-xs font-black flex items-center justify-center mb-2">5</span>
                <h4 className="text-xs font-bold text-slate-100 uppercase">Canal Exclusivo Pickup</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Autorizaciones solo por Pickup SJ Campestre. WhatsApp carece de validez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-16 sm:py-24 bg-white/50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[32px] border border-slate-200 bg-white p-8 sm:p-12 shadow-[0_25px_60px_rgba(11,25,83,0.08)]"
          >
            {isRegistered ? (
              <div className="text-center space-y-7 py-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 shadow-inner">
                  <ShieldCheck className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-primary uppercase tracking-tight">¡Bienvenido(a) Docente!</h2>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Registro activo para <span className="font-bold text-text-dark">{workerName}</span> ({workerRole}).
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-4 sm:flex-row pt-2">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl active:scale-[0.98] cursor-pointer"
                  >
                    <span>Ingresar a la Plataforma</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleResetAndGo}
                    className="rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-text-muted hover:bg-bg-soft hover:text-text-dark transition-all cursor-pointer"
                  >
                    Cambiar Docente
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-black text-primary uppercase tracking-tight">Registro Institucional</h2>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    Ingrese sus datos para acreditar su socialización en los Protocolos de Seguridad SJB-RGD003 Versión 2.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 pl-1">
                      Nombre Completo del Docente / Colaborador
                    </label>
                    <input
                      type="text"
                      required
                      value={workerName}
                      onChange={(e) => setWorkerName(e.target.value)}
                      placeholder="Ej: Lic. Carlos Andrés Mora"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-text-dark placeholder-slate-400 transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 pl-1">
                      Cédula de Ciudadanía
                    </label>
                    <input
                      type="text"
                      required
                      value={workerId}
                      onChange={(e) => setWorkerId(e.target.value)}
                      placeholder="Ej: 1.115.XXX.XXX"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-text-dark placeholder-slate-400 transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 pl-1">
                      Correo Institucional
                    </label>
                    <input
                      type="email"
                      required
                      value={workerEmail}
                      onChange={(e) => setWorkerEmail(e.target.value)}
                      placeholder="Ej: docente@sanjosebilingue.edu.co"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-text-dark placeholder-slate-400 transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 pl-1">
                      Cargo / Nivel de Desempeño
                    </label>
                    <select
                      required
                      value={workerRole}
                      onChange={(e) => setWorkerRole(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-text-dark transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 cursor-pointer"
                    >
                      <option value="">Seleccione su rol institucional...</option>
                      <option value="Docente Preescolar">Docente Preescolar (Protección Reforzada)</option>
                      <option value="Docente Primaria Inicial">Docente Primaria Inicial (1.° a 3.°)</option>
                      <option value="Docente Primaria Superior / Secundaria">Docente Primaria Superior / Secundaria</option>
                      <option value="Docente Media Vocacional">Docente Media Vocacional (10.° y 11.°)</option>
                      <option value="Docente Educación Física / Deportes">Docente Educación Física / Deportes</option>
                      <option value="Docente SEED BLOOM / Artes">Docente / Instructor SEED BLOOM / Artes</option>
                      <option value="Directivo Docente / Coordinación">Directivo Docente / Coordinación</option>
                      <option value="Personal Administrativo / Portería">Personal Administrativo / Portería</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-4 font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-sm sm:text-base uppercase tracking-wider"
                >
                  <ShieldCheck className="h-5 w-5" />
                  <span>Iniciar Socialización de Protocolos</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            )}

          </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-xs text-text-muted border-t border-slate-100 bg-bg-soft/50">
        <div className="flex justify-center gap-2 mb-2">
          <Image src="/logo-cbsjc.png" alt="Logo" width={24} height={24} />
          <span className="font-black text-primary uppercase tracking-wider">CBSJC S.A.S. — Colegio Bilingüe San José Campestre</span>
        </div>
        <p className="mt-1">Protocolos Institucionales de Seguridad 2026 · SJB-RGD003 Versión 2</p>
        <p className="mt-0.5 text-[10px]">Palmira, Valle del Cauca, Colombia.</p>
      </footer>
    </div>
  );
}
