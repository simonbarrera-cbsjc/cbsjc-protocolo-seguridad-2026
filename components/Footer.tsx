"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock, Users, AlertTriangle, FileCheck, PhoneCall, Shield, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 mt-auto">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0">
                <Image
                  src="/logo-cbsjc.png"
                  alt="Escudo Colegio Bilingüe San José Campestre"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#0B1953] uppercase tracking-tight leading-tight">
                  CBSJC S.A.S.
                </h3>
                <p className="text-xs text-[#D91A23] font-bold uppercase tracking-wider leading-tight">
                  Colegio Bilingüe San José Campestre
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  Palmira, Valle del Cauca, Colombia
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed text-justify">
              Plataforma institucional de inducción, entrenamiento táctico y acreditación en Protocolos de Seguridad y Custodia Escolar para docentes y colaboradores del CBSJC.
            </p>
          </div>

          {/* Column 2: Ejes de Seguridad */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#0B1953] uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-[#D91A23]" />
              <span>Módulos de Seguridad</span>
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link href="/dashboard" className="hover:text-[#0B1953] hover:underline flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                  <span>1. Deber de Diligencia (Num. 56)</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#0B1953] hover:underline flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-emerald-600" />
                  <span>2. Traslados y Rutina de Conteo</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#0B1953] hover:underline flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                  <span>3. 22 Zonas y Patios de Descanso</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#0B1953] hover:underline flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-rose-600" />
                  <span>4. Baños y Privacidad de Menores</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Marco Regulatorio */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#0B1953] uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <FileCheck className="h-4 w-4 text-blue-600" />
              <span>Marco Institucional</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>• Código: <strong>SJB-RGD003 V2</strong></li>
              <li>• Vigencia: Año Lectivo 2026 - 2027</li>
              <li>• Ley 1098/2006 (Infancia y Adolescencia)</li>
              <li>• Ley 1620/2013 de Convivencia Escolar</li>
              <li>• Salidas: 100% Pickup SJ (Sin WhatsApp)</li>
            </ul>
          </div>

          {/* Column 4: Cadena de Mando */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#0B1953] uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <PhoneCall className="h-4 w-4 text-emerald-600" />
              <span>Cadena de Mando (Num. 22)</span>
            </h4>
            <div className="space-y-1.5 text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <p className="font-bold text-[#0B1953]">1. Docente / Funcionario</p>
              <p className="flex items-center gap-1 text-slate-500 font-semibold"><ChevronRight className="h-3 w-3 text-slate-400" /> 2. Coordinación de Convivencia</p>
              <p className="flex items-center gap-1 text-slate-500 font-semibold"><ChevronRight className="h-3 w-3 text-slate-400" /> 3. Rectoría Institucional</p>
              <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-200">Reporte formal inmediato el mismo día.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-100 bg-slate-50/90 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
            <p>© 2026 Colegio Bilingüe San José Campestre — CBSJC S.A.S.</p>
            <span className="hidden sm:inline text-slate-300">•</span>
            <p className="text-slate-400">Palmira, Valle del Cauca, Colombia</p>
          </div>

          {/* Scibaru AI Signature Badge */}
          <div className="flex items-center gap-3 bg-[#030C26] text-white px-4 py-2 rounded-2xl border border-slate-800/80 shadow-md hover:border-[#A6174B]/60 transition-all group">
            <div className="relative w-7 h-7 shrink-0 flex items-center justify-center">
              <Image
                src="/logo-scibaru-transparent.png"
                alt="Logo Scibaru AI"
                width={28}
                height={28}
                className="object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-[10px] text-slate-400 font-medium">Desarrollado por</span>
                <span className="font-black text-xs tracking-wider text-white font-display">
                  SCIBARU <span className="text-[#A6174B]">AI</span>
                </span>
              </div>
              <span className="text-[8px] text-slate-400/90 tracking-wider mt-0.5">
                Descubre el arte de lo imposible
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
