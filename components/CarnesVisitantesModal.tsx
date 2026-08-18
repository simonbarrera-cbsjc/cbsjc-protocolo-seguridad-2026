"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert, CheckCircle2, XCircle, KeyRound, Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

interface BadgeType {
  name: string;
  badgeColor: string;
  borderColor: string;
  textColor: string;
  bgLight: string;
  targetAudience: string;
  authorizedZones: string[];
  restrictedZones: string[];
  rules: string[];
}

const BADGES: BadgeType[] = [
  {
    name: "CARNÉ ROJO",
    badgeColor: "bg-red-600",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    bgLight: "bg-red-50/50",
    targetAudience: "Proveedores, distribuidores y técnicos de mantenimiento externo.",
    authorizedZones: ["Área de recibo / Almacén", "Cafetería escolar (suministros)", "Oficina de Compras", "Portería"],
    restrictedZones: ["Pasillos de aulas y salones", "Pabellón de Preescolar", "Baños de estudiantes", "Zonas recreativas"],
    rules: [
      "No pueden ingresar a salones con estudiantes bajo ninguna circunstancia.",
      "Permanencia limitada estrictamente a la entrega de suministros.",
      "Deben devolverse a portería al finalizar la gestión."
    ]
  },
  {
    name: "CARNÉ AZUL INSTITUCIONAL",
    badgeColor: "bg-blue-600",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    bgLight: "bg-blue-50/50",
    targetAudience: "Familias aspirantes y procesos de Admisiones.",
    authorizedZones: ["Recepción general", "Oficina de Admisiones", "Recorridos institucionales guiados"],
    restrictedZones: ["Acceso libre a aulas en clase", "Baños de estudiantes", "Zonas ecuestres sin instructor"],
    rules: [
      "Siempre deben permanecer acompañados por un funcionario de Admisiones o Mercadeo.",
      "No interactuar a solas con estudiantes sin supervisión docente."
    ]
  },
  {
    name: "CARNÉ VERDE",
    badgeColor: "bg-emerald-600",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    bgLight: "bg-emerald-50/50",
    targetAudience: "Visitantes en eventos institucionales, ferias de la ciencia, festivales artísticos.",
    authorizedZones: ["Coliseo institucional", "Canchas deportivas autorizadas", "Teatro / Auditorio"],
    restrictedZones: ["Pabellón académico cerrado", "Laboratorios sin supervisión", "Baños estudiantiles"],
    rules: [
      "Circulación delimitada a las zonas del evento respectivo.",
      "Uso de baños exclusivos para adultos habilitados para el evento."
    ]
  },
  {
    name: "CARNÉ AMARILLO / NARANJA",
    badgeColor: "bg-amber-600",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    bgLight: "bg-amber-50/50",
    targetAudience: "Padres de familia en citaciones individuales y comités de convivencia.",
    authorizedZones: ["Sala de espera de Rectoría", "Oficinas de Coordinación", "Salas de reuniones docentes"],
    restrictedZones: ["Patio durante receso escolar sin citación", "Zonas de juego de preescolar", "Baños de niños"],
    rules: [
      "Atención con cita previa confirmada desde portería.",
      "Tránsito directo entre portería y la oficina citante."
    ]
  }
];

export default function CarnesVisitantesModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    const node = document.getElementById("carnes-print-area");
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

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pageHeight = pdf.internal.pageSize.getHeight();

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 2) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("CBSJC-Codigo-Carnes-Porteria-Seguridad.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-4xl bg-white rounded-[28px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header (Light Theme) */}
          <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest text-accent uppercase">
                  Control de Accesos y Portería · Numeral 7
                </span>
                <h3 className="text-sm sm:text-base md:text-lg font-black text-primary uppercase">
                  Código y Régimen de Carnés de Visitantes
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white hover:bg-primary-light text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                title="Descargar Código de Carnés en PDF"
              >
                {isGeneratingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">Descargar PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Core Warning Box (Light Theme) */}
          <div className="px-5 sm:px-6 py-3.5 bg-rose-50 border-b border-rose-200 flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
            <p className="text-xs text-rose-900 leading-relaxed font-semibold">
              <strong>Regla Institucional de Oro (Numeral 45):</strong> Ningún visitante, proveedor o acudiente (sin importar el color de su carné) tiene autorización para usar los baños de estudiantes.
            </p>
          </div>

          {/* Cards Grid (Light Theme) */}
          <div className="p-5 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 bg-white custom-scrollbar">
            {BADGES.map((b) => (
              <div
                key={b.name}
                className={`p-5 rounded-2xl border ${b.borderColor} ${b.bgLight} flex flex-col justify-between space-y-4 shadow-xs`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider text-white ${b.badgeColor} shadow-xs`}>
                      {b.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium mb-3">
                    <strong className="text-slate-900">Población:</strong> {b.targetAudience}
                  </p>

                  {/* Zones */}
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="text-emerald-700 font-black flex items-center gap-1 mb-1 uppercase text-[11px] tracking-wide">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zonas Autorizadas:
                      </span>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5 pl-1 font-medium">
                        {b.authorizedZones.map((z, idx) => (
                          <li key={idx}>{z}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-rose-700 font-black flex items-center gap-1 mb-1 uppercase text-[11px] tracking-wide">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" /> Áreas Prohibidas:
                      </span>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5 pl-1 font-medium">
                        {b.restrictedZones.map((z, idx) => (
                          <li key={idx}>{z}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1 font-medium">
                  {b.rules.map((r, idx) => (
                    <p key={idx} className="leading-tight">• {r}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer (Light Theme) */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span className="font-medium text-center sm:text-left">
              Todo personal sin carné visible debe ser guiado de inmediato a portería.
            </span>
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
              >
                {isGeneratingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                <span>Descargar PDF</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-all cursor-pointer shadow-xs uppercase tracking-wider text-xs"
              >
                Entendido
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hidden Printable Container for High-Res PDF */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none">
        <div
          id="carnes-print-area"
          className="w-[794px] bg-white p-10 text-slate-900 font-sans space-y-6"
        >
          {/* Official Header */}
          <div className="flex items-center justify-between border-b-2 border-[#0B1953] pb-4">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16">
                <Image
                  src="/logo-cbsjc.png"
                  alt="Escudo CBSJC"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-base font-black text-[#0B1953] uppercase tracking-tight">
                  COLEGIO BILINGÜE SAN JOSÉ CAMPESTRE
                </h1>
                <p className="text-xs font-bold text-[#D91A23] uppercase">
                  CBSJC S.A.S. · Protocolos Institucionales de Seguridad
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  Palmira, Valle del Cauca · Vigencia 2026 - 2027
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block bg-[#0B1953]/10 text-[#0B1953] font-mono font-bold text-[11px] px-3 py-1 rounded-md border border-[#0B1953]/20">
                SJB-RGD003 V2
              </span>
              <p className="text-[10px] font-bold text-slate-600 mt-1 uppercase">
                RÉGIMEN DE CARNÉS Y VISITANTES
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-sm font-black text-[#0B1953] uppercase">
              Control de Accesos, Zonas Autorizadas y Restricciones de Circulación (Numeral 7)
            </h2>
            <p className="text-[11px] text-slate-600 leading-relaxed text-justify">
              Matriz de identificación obligatoria para todo personal externo, proveedores, contratistas, acudientes y visitantes en el campus campestre del CBSJC.
            </p>
          </div>

          {/* Rule Box */}
          <div className="p-3 bg-red-50 border-l-4 border-red-600 rounded text-[11px] text-red-950 font-semibold">
            PROHIBICIÓN ESTRICTA (NUMERAL 45): Ningún adulto externo o visitante tiene autorización para ingresar o usar los baños de estudiantes bajo ninguna circunstancia.
          </div>

          {/* Badges Matrix */}
          <div className="grid grid-cols-2 gap-4">
            {BADGES.map((b) => (
              <div key={b.name} className="border border-slate-300 rounded-xl p-4 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <span className="font-black text-xs text-[#0B1953] uppercase tracking-wider">{b.name}</span>
                </div>

                <div className="text-[11px] text-slate-700">
                  <strong className="text-slate-900">Destinado a: </strong>{b.targetAudience}
                </div>

                <div className="space-y-1 text-[10px]">
                  <p className="text-emerald-800 font-bold uppercase">✓ Zonas Autorizadas:</p>
                  <ul className="list-disc list-inside text-slate-600 pl-1">
                    {b.authorizedZones.map((z, i) => (
                      <li key={i}>{z}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1 text-[10px]">
                  <p className="text-red-800 font-bold uppercase">✗ Áreas Prohibidas:</p>
                  <ul className="list-disc list-inside text-slate-600 pl-1">
                    {b.restrictedZones.map((z, i) => (
                      <li key={i}>{z}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 italic">
                  {b.rules.map((r, i) => (
                    <p key={i}>• {r}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-slate-200 text-center text-[10px] text-slate-400">
            Colegio Bilingüe San José Campestre — Protocolos de Seguridad SJB-RGD003 V2 • Desarrollado por Scibaru AI
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
