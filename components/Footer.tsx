"use client";

import Image from "next/image";
import { FileCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 mt-auto">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-between">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-3 max-w-xl">
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
              Plataforma institucional de socialización, entrenamiento táctico y acreditación en Protocolos de Seguridad y Custodia Escolar para docentes, directivos y colaboradores del CBSJC.
            </p>
          </div>

          {/* Column 2: Marco Regulatorio */}
          <div className="space-y-2.5 md:text-right flex flex-col md:items-end">
            <h4 className="text-xs font-black text-[#0B1953] uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck className="h-4 w-4 text-blue-600" />
              <span>Marco Institucional y Regulatorio</span>
            </h4>
            <ul className="space-y-1 text-xs text-slate-500 font-medium">
              <li>Código Documental: <strong className="text-[#0B1953]">SJB-RGD003 V2</strong></li>
              <li>Vigencia: Año Lectivo 2026 - 2027</li>
              <li>Ley 1098 de 2006 (Código de Infancia y Adolescencia)</li>
              <li>Ley 1620 de 2013 de Convivencia Escolar y Deber de Diligencia</li>
              <li>Canal Exclusivo de Salidas: Pickup SJ Campestre</li>
            </ul>
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
