"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, BookOpen, ChevronLeft, ChevronRight, CheckCircle2, RotateCw, Lightbulb, Shield, ShieldCheck } from "lucide-react";

interface GlosarioItem {
  id: string;
  term: string;
  badge: string;
  frontQuestion: string;
  backDefinition: string;
  practicalTip: string;
  numeral: string;
}

const GLOSARIO_ITEMS: GlosarioItem[] = [
  {
    id: "g1",
    term: "SEED BLOOM & Picadero Ecuestre",
    badge: "Actividades de Campo",
    numeral: "Num. 46, 47 & 48",
    frontQuestion: "¿Qué es el programa SEED BLOOM y cuál es el rol del docente en el picadero?",
    backDefinition: "SEED BLOOM es el programa formativo de bienestar socioemocional y equitación del colegio. Aunque las clases ecuestres son dirigidas por instructores técnicos, el docente titular institucional mantiene la supervisión y custodia física en todo momento. El uso de casco y EPP es obligatorio.",
    practicalTip: "Nunca dejes al grupo solo con el instructor externo. Tu deber de cuidado permanece activo durante toda la sesión."
  },
  {
    id: "g2",
    term: "Deber de Diligencia Docente",
    badge: "Marco Operativo",
    numeral: "Numeral 56",
    frontQuestion: "¿Qué implica jurídicamente el deber de diligencia y qué está expresamente prohibido?",
    backDefinition: "Es el estándar institucional de vigilancia y custodia activa. Exige atención permanente y control visual del grupo. Prohíbe de forma terminante usar el celular comprometiendo la supervisión y abandonar el grupo sin haber recibido relevo formal.",
    practicalTip: "Atender llamadas personales o realizar tareas administrativas no exime la responsabilidad de custodia sobre los estudiantes."
  },
  {
    id: "g3",
    term: "Pickup SJ Campestre",
    badge: "Salidas y Transporte",
    numeral: "Num. 11.1, 26, 27 & 28",
    frontQuestion: "¿Qué es la app Pickup SJ y por qué está prohibido autorizar por WhatsApp?",
    backDefinition: "Pickup SJ Campestre es la plataforma digital oficial y única autorizada para validar y registrar la recogida vehicular y peatonal de estudiantes. Cualquier mensaje de WhatsApp, llamada personal o nota informal carece de validez jurídica.",
    practicalTip: "Si un acudiente no aparece en el sistema Pickup SJ, retén al estudiante y activa de inmediato la contingencia con Coordinación."
  },
  {
    id: "g4",
    term: "Responsabilidad Funcional",
    badge: "Principio Rector",
    numeral: "Idea Fuerza 1 & Num. 5.3",
    frontQuestion: "¿Qué significa que la custodia sobre los estudiantes sea de carácter funcional?",
    backDefinition: "Significa que la obligación de protección y vigilancia nace en el instante exacto en que se asume o asigna una actividad con estudiantes, sin importar el cargo, área académica o nivel jerárquico del colaborador.",
    practicalTip: "Si tienes estudiantes a cargo en un aula, laboratorio, patio o buseta, respondes directamente por su integridad física y bienestar."
  },
  {
    id: "g5",
    term: "Conteo Continuo (3 Tiempos)",
    badge: "Rutina Preventiva",
    numeral: "Idea Fuerza 2 & Num. 41",
    frontQuestion: "¿Cuáles son los 3 momentos obligatorios de verificación y conteo de estudiantes?",
    backDefinition: "La rutina institucional exige: 1. Conteo al salir del aula de origen; 2. Conteo al llegar al destino (cancha, laboratorio, huerta); 3. Conteo al finalizar y retornar al aula.",
    practicalTip: "Si al contar notas que falta un estudiante, no te desplaces: reporta de inmediato a Coordinación y activa búsqueda preventiva."
  },
  {
    id: "g6",
    term: "22 Zonas de Acompañamiento",
    badge: "Descansos Escolares",
    numeral: "Numeral 49",
    frontQuestion: "¿Cómo opera la custodia en patios y cuáles son las 7 reglas innegociables de zona?",
    backDefinition: "El campus está dividido en 22 zonas perimetrales cubiertas por 26 docentes bajo una matriz rotativa de 13 semanas. Reglas clave: puntualidad estricta, recorrido perimetral activo, control de baños y puntos ciegos, y no retirarse sin relevo formal.",
    practicalTip: "En zonas de criterio reforzado (gradas, piscina, baños y canchas de fútbol), la vigilancia visual debe ser continua."
  },
  {
    id: "g7",
    term: "Código de Carnés de Visitantes",
    badge: "Portería y Acceso",
    numeral: "Numeral 50",
    frontQuestion: "¿Qué restricciones tiene cada color de carné (Rojo, Azul, Verde, Negro)?",
    backDefinition: "• ROJO: Proveedores (solo almacén/compras, jamás pasillos de estudiantes).\n• AZUL: Familias en admisiones (siempre con acompañamiento institucional).\n• VERDE: Eventos (restringido a zonas autorizadas).\n• NEGRO: Citaciones (con cita previa y escolta a coordinación).",
    practicalTip: "Si ves a un visitante con carné ROJO o sin carné caminando solo por pasillos o cerca a baños, abórdalo de inmediato y repórtalo a portería."
  },
  {
    id: "g8",
    term: "Uso Exclusivo de Baños",
    badge: "Protección a Menores",
    numeral: "Numeral 45",
    frontQuestion: "¿Quiénes pueden utilizar los baños de los estudiantes en el colegio?",
    backDefinition: "Los baños de estudiantes son de uso EXCLUSIVO de los niños, niñas y adolescentes matriculados. Queda terminantemente prohibido el ingreso de padres, proveedores, contratistas, conductores o docentes a estos sanitarios.",
    practicalTip: "Adultos y visitantes disponen de baños exclusivos para el personal y visitas en el área administrativa."
  },
  {
    id: "g9",
    term: "Cadena de Comunicación Formal",
    badge: "Trazabilidad Institucional",
    numeral: "Numeral 22",
    frontQuestion: "¿Cuál es el orden jerárquico estricto para reportar cualquier anomalía o novedad?",
    backDefinition: "La secuencia obligatoria es: Docente Titular ➔ Coordinación Académica/Convivencia ➔ Rectoría ➔ Familias / Padres de Familia ➔ Autoridades Externas (Policía de Infancia, ICBF, ARL).",
    practicalTip: "Ningún docente o colaborador debe contactar directamente a externos o emitir comunicados públicos sin autorización previa de Rectoría."
  },
  {
    id: "g10",
    term: "Los 6 Datos del Reporte Formal",
    badge: "Registro de Novedad",
    numeral: "Numeral 36",
    frontQuestion: "¿Qué información mínima debe contener todo reporte de novedad el mismo día?",
    backDefinition: "1. Fecha y hora exacta; 2. Lugar o zona del evento; 3. Nombres completos de estudiantes involucrados; 4. Relato objetivo de los hechos; 5. Medidas preventivas inmediatas adoptadas; 6. Nombre y firma del docente reportante.",
    practicalTip: "El reporte tardío o no radicado el mismo día constituye por sí mismo un incumplimiento grave del deber de diligencia."
  }
];

export default function GlosarioRecorridoModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewed, setReviewed] = useState<Record<number, boolean>>({});

  if (!isOpen) return null;

  const currentItem = GLOSARIO_ITEMS[currentIdx];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setReviewed(prev => ({ ...prev, [currentIdx]: true }));
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIdx < GLOSARIO_ITEMS.length - 1) {
      setCurrentIdx(c => c + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIdx > 0) {
      setCurrentIdx(c => c - 1);
    }
  };

  const totalReviewed = Object.keys(reviewed).length;
  const progressPercent = Math.round((totalReviewed / GLOSARIO_ITEMS.length) * 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-2xl bg-white rounded-[28px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest text-accent uppercase">
                  Inducción Previa al Roadmap
                </span>
                <h3 className="text-sm sm:text-base font-black text-primary uppercase">
                  Glosario & Conceptos Clave de Seguridad
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="px-6 pt-4 pb-2 bg-white">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-text-muted mb-1.5">
              <span>Concepto {currentIdx + 1} de {GLOSARIO_ITEMS.length}</span>
              <span className="text-accent font-bold">Repasados: {totalReviewed}/{GLOSARIO_ITEMS.length} ({progressPercent}%)</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / GLOSARIO_ITEMS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Flashcard Body */}
          <div className="p-6 flex-1 overflow-y-auto flex flex-col justify-center items-center">
            
            <div 
              onClick={handleFlip}
              className="w-full max-w-lg min-h-[300px] cursor-pointer perspective-1000 select-none"
            >
              <div className={`relative w-full h-full min-h-[300px] preserve-3d transition-transform duration-500 rounded-[24px] border ${
                isFlipped 
                  ? "rotate-y-180 bg-blue-50/70 border-primary/30 shadow-md" 
                  : "bg-slate-50/80 hover:bg-white border-slate-200 hover:border-accent hover:shadow-md shadow-xs"
              } p-6 sm:p-8 flex flex-col justify-between`}>
                
                {/* Front */}
                <div className="absolute inset-0 backface-hidden p-6 sm:p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                      {currentItem.badge}
                    </span>
                    <span className="text-[10px] font-bold text-text-muted">
                      {currentItem.numeral}
                    </span>
                  </div>

                  <div className="space-y-3 text-center my-auto py-4">
                    <h4 className="text-base sm:text-lg font-black text-primary uppercase leading-snug">
                      {currentItem.term}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-text-dark leading-relaxed">
                      {currentItem.frontQuestion}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-black text-accent uppercase tracking-widest animate-pulse pt-2">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Toca para ver la definición institucional</span>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 p-6 sm:p-8 flex flex-col justify-between bg-white rounded-[24px] overflow-y-auto custom-scrollbar">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                      {currentItem.term}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">
                      {currentItem.numeral}
                    </span>
                  </div>

                  <div className="my-auto py-2 space-y-3 text-left">
                    <p className="text-xs sm:text-sm leading-relaxed text-text-dark font-medium whitespace-pre-line">
                      {currentItem.backDefinition}
                    </p>
                    
                    <div className="rounded-xl bg-amber-50 border border-amber-200/70 p-3 text-[11px] font-semibold text-amber-900 flex gap-2 items-start">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Pauta Operativa:</strong> {currentItem.practicalTip}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold text-text-muted pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Concepto repasado
                    </span>
                    <span className="text-slate-400">Clic para voltear</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Footer Controls */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-primary bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <div className="flex items-center gap-1.5">
              {GLOSARIO_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentIdx(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIdx 
                      ? "w-6 bg-accent" 
                      : reviewed[i] 
                        ? "bg-emerald-500" 
                        : "bg-slate-300"
                  }`}
                  title={`Concepto ${i + 1}`}
                />
              ))}
            </div>

            {currentIdx < GLOSARIO_ITEMS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-light transition-all cursor-pointer shadow-xs"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex items-center gap-1 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all cursor-pointer shadow-xs uppercase tracking-wider"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>¡Listo, a los Módulos!</span>
              </button>
            )}
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
