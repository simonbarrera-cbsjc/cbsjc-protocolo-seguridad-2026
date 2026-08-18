"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, KeyRound } from "lucide-react";

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
    name: "CARNÉ NEGRO",
    badgeColor: "bg-slate-800",
    borderColor: "border-slate-300",
    textColor: "text-slate-800",
    bgLight: "bg-slate-50",
    targetAudience: "Citaciones formales de padres, directivas y psicología.",
    authorizedZones: ["Oficina de Coordinación", "Rectoría", "Salas de reuniones docentes", "Recepción"],
    restrictedZones: ["Patio durante el recreo", "Salones sin cita previa", "Pesebreras y huerta"],
    rules: [
      "Ingreso únicamente con citación confirmada en portería.",
      "Deben anunciarse y esperar en recepción al docente o directivo correspondiente."
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
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header (Light Theme) */}
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest text-accent uppercase">
                  Numerales 7.1, 17 y 50 · Protocolo SJB-RGD003
                </span>
                <h3 className="text-base sm:text-lg font-black text-primary uppercase">
                  Código de Color de Carnés y Control de Terceros
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Warning Box (Light Theme) */}
          <div className="px-6 py-3.5 bg-rose-50 border-b border-rose-200 flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
            <p className="text-xs text-rose-900 leading-relaxed font-semibold">
              <strong>Regla Institucional de Oro (Numeral 45):</strong> Ningún visitante, proveedor o acudiente (sin importar el color de su carné) tiene autorización para usar los baños de estudiantes.
            </p>
          </div>

          {/* Cards Grid (Light Theme) */}
          <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 bg-white custom-scrollbar">
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
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Todo personal sin carné visible debe ser guiado de inmediato a portería.</span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl transition-all cursor-pointer shadow-xs uppercase tracking-wider text-[11px]"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
