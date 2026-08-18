"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw, HelpCircle, ShieldCheck } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FAQ_SUGGESTIONS = [
  "¿Se puede autorizar una entrega por chat de WhatsApp?",
  "¿Cuáles son las 7 reglas en zonas de acompañamiento?",
  "¿Quién es responsable durante las clases de SEED BLOOM?",
  "¿Qué hago si un alumno tarda más de 10 min en el baño?",
  "¿Qué áreas autorizan los carnés ROJO, AZUL y VERDE?"
];

function getLocalSecurityAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("whatsapp") || q.includes("chat") || q.includes("mensaje") || q.includes("llamada")) {
    return "🚫 **Autorizaciones y WhatsApp (Numeral 11.1 y 12):**\n\n- **WhatsApp NO es válido:** Queda absolutamente prohibido autorizar salidas o cambios de entrega mediante mensajes de texto, WhatsApp o llamadas personales al docente.\n- **Único canal oficial:** El aplicativo **Pickup SJ Campestre**.\n- **Contingencia:** Si el sistema falla o el acudiente no tiene acceso, debe canalizarse formalmente en portería con Coordinación y validación documental.";
  }

  if (q.includes("zona") || q.includes("descanso") || q.includes("recreo") || q.includes("patio") || q.includes("relevo") || q.includes("22")) {
    return "📍 **Custodia en Zonas de Acompañamiento (Numeral 49):**\n\n- **22 zonas perimetrales** cubiertas por 26 docentes en rotación de 13 semanas.\n- **7 Reglas No Negociables:** Llegada puntual al inicio exacto; permanencia activa de pie sin celular; cero abandono sin relevo formal; control visual sin ángulos muertos; intervención inmediata; no concentrarse con otros docentes; reporte de novedades el mismo día.\n- **Zonas de Criterio Reforzado:** Baños (1, 3, 25), Cancha Preescolar (10), Puntos Ciegos (20, 21, 22, 24) y Coliseo/Graderías (7, 8, 9, 18, 19, 27).";
  }

  if (q.includes("seed") || q.includes("bloom") || q.includes("equitación") || q.includes("caballo") || q.includes("huerta") || q.includes("granjita") || q.includes("externo") || q.includes("instructor")) {
    return "🐎 **Actividades Fuera del Aula y SEED BLOOM (Numeral 46, 47 y 48):**\n\n- **Supervisión activa no delegable (Idea Fuerza 3):** La presencia de un instructor externo jamás exime ni releva al docente titular de su responsabilidad de custodia visual y conteo.\n- **SEED BLOOM:** Uso obligatorio e innegociable de casco/EPP; prohibido entrar a pesebreras sin autorización; reporte formal de toda caída o temor.\n- **Huerta y Granjita:** Conteo de herramientas al entrar y salir; lavado obligatorio de manos con agua y jabón; prohibido ingerir plantas o frutos no autorizados.";
  }

  if (q.includes("baño") || q.includes("bano") || q.includes("sanitario") || q.includes("tiempo") || q.includes("10") || q.includes("15") || q.includes("demora")) {
    return "🚻 **Permisos de Baño y Desplazamientos (Numeral 41-45):**\n\n- **Preescolar (44.1):** Acompañamiento directo con control hasta la puerta, cuidando la intimidad sin encerrarse en cubículos.\n- **Primaria/Secundaria:** 1 estudiante a la vez con cronometraje del tiempo razonable.\n- **Demora excesiva (>10-15 min):** Verificación física inmediata y reporte a Coordinación.\n- **Exclusividad (Num. 45):** Los baños de estudiantes son de uso EXCLUSIVO de menores; ningún adulto externo (proveedor, transportador o visitante) puede ingresar a ellos.";
  }

  if (q.includes("carné") || q.includes("carne") || q.includes("color") || q.includes("rojo") || q.includes("azul") || q.includes("verde") || q.includes("negro") || q.includes("visitante") || q.includes("proveedor")) {
    return "🏷️ **Código de Carnés Institucionales (Numeral 7.1, 17 y 50):**\n\n- 🔴 **ROJO (Proveedores):** Solo recibo, almacén y compras. Prohibido transitar por pasillos escolares o preescolar.\n- 🔵 **AZUL (Admisiones):** Recepción y recorridos guiados por personal institucional.\n- 🟢 **VERDE (Eventos):** Acceso delimitado al área de la actividad (Coliseo/Canchas).\n- ⚫ **NEGRO (Citaciones):** Oficinas de Coordinación, Rectoría y salas de reuniones docentes con cita previa.";
  }

  if (q.includes("reporte") || q.includes("cadena") || q.includes("novedad") || q.includes("accidente") || q.includes("cámara") || q.includes("camara") || q.includes("rit") || q.includes("proceso")) {
    return "⚖️ **Cadena de Comunicación y Reportes (Numeral 22, 36, 39 y 53):**\n\n- **Cadena de mando (Num. 22):** Docente ➔ Coordinación ➔ Rectoría ➔ Padres de Familia ➔ Autoridades Externas.\n- **Contenido del reporte (Num. 36):** Fecha/hora, lugar, involucrados, descripción de hechos, medidas adoptadas y firma de quien reporta.\n- **Cámaras (Num. 53):** Apoyo técnico cuya revisión es potestad de Rectoría; jamás reemplazan la supervisión física activa del docente.\n- **Régimen laboral (Num. 39):** El incumplimiento del deber de diligencia acarrea medidas formativas o disciplinarias según el RIT.";
  }

  return "Los **Protocolos Institucionales de Seguridad CBSJC (SJB-RGD003 Versión 2)** regulan las 5 Ideas Fuerza, Deber de Diligencia (Num. 56), Desplazamientos y Baños (Num. 41-45), SEED BLOOM y Huerta (Num. 46-48), 22 Zonas de Acompañamiento (Num. 49), Carnés y Pickup SJ (Num. 11.1, 50) y la Cadena de Reporte (Num. 22). ¿Sobre qué punto deseas consultar?";
}

export default function AsistenteChatSeguridad() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! Soy **SeguriBot CBSJC**, tu Asistente Oficial para los **Protocolos Institucionales de Seguridad (SJB-RGD003 V2)**. ¿En qué norma de custodia, patio, SEED BLOOM, baños o Pickup SJ te puedo orientar hoy?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage: Message = { role: "user", content: query.trim() };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      });

      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();

      if (data.content) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      } else {
        const fallback = getLocalSecurityAnswer(query);
        setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
      }
    } catch {
      const fallback = getLocalSecurityAnswer(query);
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_25px_rgba(11,25,83,0.4)] transition-all duration-300 hover:scale-105 hover:bg-primary-light active:scale-95 cursor-pointer border border-white/20"
          aria-label="Abrir asistente de IA de Seguridad"
        >
          <ShieldCheck className="h-7 w-7 transition-transform group-hover:scale-110 text-amber-400" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-accent border-2 border-white" />
          </span>
        </button>
      )}

      {isOpen && (
        <div className="flex h-[580px] w-[350px] sm:w-[420px] flex-col rounded-[28px] border border-slate-700/80 bg-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden animate-slide-up backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary p-4 text-white border-b border-primary-light/40">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-amber-400 border border-amber-400/30">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black uppercase tracking-wider">SeguriBot CBSJC</span>
                  <Sparkles className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                </div>
                <span className="text-[10px] text-slate-300 font-medium">Protocolos SJB-RGD003 V2 • IA</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              aria-label="Cerrar chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-950/60 custom-scrollbar">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 mt-1">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[84%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-white font-medium shadow-md rounded-br-xs border border-primary-light/40"
                      : "bg-slate-900 text-slate-200 border border-slate-800 shadow-md rounded-tl-xs whitespace-pre-line"
                  }`}
                >
                  {m.content}
                </div>

                {m.role === "user" && (
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent border border-accent/40 mt-1">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-md text-xs text-slate-400 flex items-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-400" />
                  <span>Consultando protocolos institucionales...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                <HelpCircle className="h-3 w-3 text-amber-400" />
                <span>Consultas Rápidas de Seguridad:</span>
              </div>
              <div className="flex flex-col gap-1">
                {FAQ_SUGGESTIONS.slice(0, 3).map((faq, fIdx) => (
                  <button
                    key={fIdx}
                    onClick={() => handleSendMessage(faq)}
                    className="text-left text-[11px] font-semibold text-blue-400 hover:text-amber-300 truncate py-0.5 px-1.5 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    • {faq}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregunta sobre deber de diligencia, zonas, baños..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-light disabled:opacity-40 disabled:hover:bg-primary transition-all cursor-pointer shrink-0 shadow-md border border-white/10"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
