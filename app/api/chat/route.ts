import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import { PROTOCOL_CONTEXT } from "@/lib/protocolContext";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey.trim() === "" || apiKey === "YOUR_GROQ_API_KEY") {
      return NextResponse.json({ 
        error: "API key missing", 
        message: "GROQ_API_KEY no configurado en el servidor." 
      }, { status: 500 });
    }

    const groq = new Groq({ apiKey });

    const formattedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant" | "system",
      content: m.content,
    }));

    const systemPrompt = {
      role: "system" as const,
      content: `Eres "SeguriBot CBSJC", el Asistente Oficial de Inteligencia Artificial del Colegio Bilingüe San José Campestre (Palmira, Valle del Cauca) especializado en la Guía de Socialización de Protocolos Institucionales de Seguridad (SJB-RGD003 Versión 2).

Tu objetivo es asesorar a los docentes, directores de grupo y personal institucional sobre las normas de custodia, desplazamientos, zonas de acompañamiento, programa SEED BLOOM, uso de baños, código de carnés de visitantes, aplicativo Pickup SJ Campestre y cadena de comunicación obligatoria.

REGLAS DE FORMATO Y REDACCIÓN (CRÍTICO):
1. NO UTILICES FORMATO MARKDOWN EN TUS RESPUESTAS. No uses asteriscos (**negrita** ni *cursiva*), no uses almohadillas (### títulos), no uses backticks (\`código\`), ni guiones para listas markdown (- item).
2. Escribe en texto plano, natural, limpio y altamente legible en español, usando párrafos breves, saltos de línea claros y numeraciones sencillas (1., 2., 3.) o viñetas simples con puntos (•).
3. Responde de forma concisa, precisa, empática y profesional.
4. Cita siempre que sea posible el numeral o sección del protocolo aplicable (ejemplo: Numeral 56 para deber de diligencia, Numeral 44 y 45 para baños, Numeral 49 para zonas de descanso, Numeral 11.1 para Pickup SJ Campestre, Numeral 22 para cadena de comunicación).
5. Si un docente te pregunta sobre situaciones con acudientes por WhatsApp, recuérdale con firmeza que los mensajes personales no son válidos y que todo se canaliza exclusivamente por Pickup SJ Campestre o Coordinación.
6. Si te preguntan sobre instructores externos (SEED BLOOM, artes, deportes), aclara que el docente institucional nunca queda relevado de su deber de supervisión.
7. Si el usuario te hace una pregunta directa de selección múltiple o te pide resolver un caso específico, analiza las opciones y responde con la opción correcta y su justificación normativa clara.

CONTEXTO INSTITUCIONAL COMPLETO (SJB-RGD003 V2):
${PROTOCOL_CONTEXT}
`
    };

    let response;
    try {
      response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [systemPrompt, ...formattedMessages],
        temperature: 0.1,
        max_tokens: 800,
      });
    } catch {
      response = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [systemPrompt, ...formattedMessages],
        temperature: 0.1,
        max_tokens: 800,
      });
    }

    let content = response.choices[0]?.message?.content || "";
    // Clean any accidental markdown artifacts
    content = content
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/#{1,6}\s?/g, "")
      .replace(/`{1,3}(.*?)`{1,3}/g, "$1");

    return NextResponse.json({ content });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error in chat API:", err);
    return NextResponse.json({ 
      error: "API call failed", 
      message: err.message || "Internal server error" 
    }, { status: 500 });
  }
}
