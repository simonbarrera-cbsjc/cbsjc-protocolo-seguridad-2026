"use client";

import { useState } from "react";
import { CheckCircle2, Download, Printer, X, ShieldCheck, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

interface ActaModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName: string;
  workerId: string;
  workerEmail: string;
  workerRole: string;
}

export default function ActaConstanciaModal({
  isOpen,
  onClose,
  workerName,
  workerId,
  workerEmail,
  workerRole
}: ActaModalProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const currentDate = new Date().toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const node = document.getElementById("acta-print-area");
    if (!node) return;

    try {
      setIsGeneratingPdf(true);

      const dataUrl = await toPng(node, {
        quality: 1,
        pixelRatio: 2.5,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 12;
      const printWidth = pdfWidth - margin * 2;
      
      const img = new window.Image();
      img.src = dataUrl;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const printHeight = (img.height * printWidth) / img.width;
      const yPos = printHeight < pdfHeight - margin * 2 ? (pdfHeight - printHeight) / 2 : margin;

      pdf.addImage(dataUrl, "PNG", margin, yPos, printWidth, printHeight);

      const sanitizedName = (workerName || "Docente").replace(/[^a-zA-Z0-9]/g, "_");
      pdf.save(`Acta_Acreditacion_Seguridad_2026_${sanitizedName}.pdf`);
    } catch (error) {
      console.error("Error generando PDF:", error);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl sm:max-w-2xl max-h-[96vh] flex flex-col rounded-[28px] border border-slate-200 bg-white p-4 sm:p-6 shadow-2xl animate-fade-in my-auto text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto pr-1 space-y-4 custom-scrollbar">
          
          {/* Certificate / Acta Layout (Target for PDF) */}
          <div 
            id="acta-print-area" 
            className="space-y-3.5 bg-white text-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs"
            style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
          >
            
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3 text-left">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-cbsjc.png"
                  alt="Logo CBSJC"
                  className="h-12 w-12 object-contain flex-shrink-0"
                  crossOrigin="anonymous"
                />
                <div>
                  <h3 className="text-sm sm:text-base font-black text-primary uppercase tracking-tight leading-tight">CBSJC S.A.S.</h3>
                  <p className="text-[11px] sm:text-xs text-accent font-bold uppercase tracking-wide leading-tight">Colegio Bilingüe San José Campestre</p>
                  <p className="text-[10px] text-slate-500 font-medium leading-tight">Palmira, Valle del Cauca, Colombia</p>
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 px-3 py-1.5 border border-slate-200 text-center flex-shrink-0">
                <span className="text-[8px] font-black text-primary uppercase tracking-widest block">Código Documental</span>
                <span className="text-xs font-black text-accent">SJB-RGD003 V2</span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-0.5 py-0.5">
              <h2 className="text-sm sm:text-base font-black text-primary uppercase tracking-tight leading-snug">
                Acta de Constancia de Socialización y Acreditación de Seguridad
              </h2>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Protocolos Institucionales de Seguridad 2026 • Versión 2
              </p>
            </div>

            {/* Body Statement */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 sm:p-4 text-[11px] sm:text-xs text-slate-800 leading-relaxed space-y-2 text-justify font-medium">
              <p>
                Por medio del presente documento digital, yo, <strong className="text-primary uppercase font-black">{workerName}</strong>, identificado(a) con Cédula de Ciudadanía No. <strong className="text-primary font-black">{workerId}</strong>, en mi calidad de <strong className="text-primary font-black uppercase">{workerRole}</strong> de <strong>CBSJC S.A.S.</strong>, certifico y hago constar que:
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-700">
                <li>He cursado, socializado y aprobado los <strong>6 módulos de entrenamiento interactivo</strong> del Protocolo Institucional de Seguridad SJB-RGD003 Versión 2.</li>
                <li>Conozco y asumo las 5 Ideas Fuerza y el <strong>Deber de Diligencia Docente (Numeral 56)</strong> como estándar de conducta y custodia de menores.</li>
                <li>Comprendo y aplicaré estrictamente las 7 reglas de las <strong>22 Zonas de Acompañamiento en Descansos</strong>, la rutina de conteo de 6 pasos y la exclusividad absoluta de los baños estudiantiles.</li>
                <li>Conozco la prohibición total de autorizaciones de salida por WhatsApp y la obligatoriedad de entrega exclusivamente por <strong>Pickup SJ Campestre</strong>.</li>
                <li>Me comprometo a seguir la <strong>Cadena de Comunicación Jerárquica (Numeral 22)</strong> y el reporte inmediato y formal de cualquier novedad el mismo día.</li>
              </ol>
              <p className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-200">
                Fecha de acreditación: {currentDate} — Palmira, Valle del Cauca, Colombia.
              </p>
            </div>

            {/* Digital Signature Panel */}
            <div className="rounded-xl border border-dashed border-emerald-400 bg-emerald-50/60 p-2.5 sm:p-3 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-emerald-900 text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Firma Electrónica y Certificación Digital</span>
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-0.5 py-0.5">
                <div className="font-serif italic text-base sm:text-lg text-primary font-bold tracking-wide">
                  {workerName}
                </div>
                <div className="h-0.5 w-48 bg-primary/30" />
                <p className="text-[9px] sm:text-[10px] text-slate-600 font-semibold uppercase tracking-widest pt-0.5">
                  C.C. {workerId} • {workerEmail}
                </p>
                <p className="text-[8px] sm:text-[9px] text-emerald-700 font-bold">
                  ✓ Autenticado mediante Plataforma de Seguridad CBSJC 2026
                </p>
              </div>
            </div>

            {/* Legal Footer Note */}
            <div className="text-center pt-1 border-t border-slate-150 space-y-0.5">
              <p className="text-[8px] text-slate-400 leading-tight">
                Documento electrónico vinculante de socialización conforme al régimen laboral colombiano y Manual de Convivencia CBSJC.
              </p>
              <p className="text-[8px] font-bold text-slate-500">
                Colegio Bilingüe San José Campestre — CBSJC S.A.S. © 2026
              </p>
              <p className="text-[8px] font-bold text-primary/70 uppercase tracking-widest pt-0.5">
                Desarrollado por Scibaru AI
              </p>
            </div>

          </div>

        </div>

        {/* Modal Actions (Light Theme) */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 border-t border-slate-100 pt-3.5 mt-3 flex-shrink-0 bg-white">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPdf}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-dark px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all cursor-pointer uppercase tracking-wider disabled:opacity-50"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Generando PDF...</span>
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5" />
                <span>Descargar Acta (PDF)</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Imprimir</span>
          </button>
          
          <button
            onClick={onClose}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-light px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all cursor-pointer uppercase tracking-wider"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Cerrar y Finalizar</span>
          </button>
        </div>

      </div>
    </div>
  );
}
