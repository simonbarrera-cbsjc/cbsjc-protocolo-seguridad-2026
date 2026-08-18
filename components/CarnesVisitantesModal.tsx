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
    borderColor: "border-red-500",
    textColor: "text-red-400",
    bgLight: "bg-red-950/30",
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
    borderColor: "border-blue-500",
    textColor: "text-blue-400",
    bgLight: "bg-blue-950/30",
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
    borderColor: "border-emerald-500",
    textColor: "text-emerald-400",
    bgLight: "bg-emerald-950/30",
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
    badgeColor: "bg-slate-700",
    borderColor: "border-slate-500",
    textColor: "text-slate-300",
    bgLight: "bg-slate-900/60",
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Código de Color de Carnés y Control de Terceros</h3>
                <p className="text-xs text-slate-400">Numerales 7.1, 17 y 50 · Protocolo SJB-RGD003</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Warning Box */}
          <div className="px-6 py-3.5 bg-rose-950/30 border-b border-rose-900/50 flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
            <p className="text-xs text-rose-200 leading-relaxed">
              <strong>Regla Institucional de Oro (Numeral 45):</strong> Ningún visitante, proveedor o acudiente (sin importar el color de su carné) tiene autorización para usar los baños de estudiantes.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 custom-scrollbar">
            {BADGES.map((b) => (
              <div
                key={b.name}
                className={`p-5 rounded-xl border ${b.borderColor} ${b.bgLight} flex flex-col justify-between space-y-4`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider text-white ${b.badgeColor} shadow-md`}>
                      {b.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium mb-3">
                    <strong>Población:</strong> {b.targetAudience}
                  </p>

                  {/* Zones */}
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Zonas Autorizadas:
                      </span>
                      <ul className="list-disc list-inside text-slate-300 space-y-0.5 pl-1">
                        {b.authorizedZones.map((z, idx) => (
                          <li key={idx}>{z}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-rose-400 font-bold flex items-center gap-1 mb-1">
                        <XCircle className="w-3.5 h-3.5" /> Áreas Prohibidas:
                      </span>
                      <ul className="list-disc list-inside text-slate-300 space-y-0.5 pl-1">
                        {b.restrictedZones.map((z, idx) => (
                          <li key={idx}>{z}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                  {b.rules.map((r, idx) => (
                    <p key={idx} className="leading-tight">• {r}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
            <span>Todo personal sin carné visible debe ser guiado de inmediato a portería.</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition-colors"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
