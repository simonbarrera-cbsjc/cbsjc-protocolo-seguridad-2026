# Protocolos Institucionales de Seguridad CBSJC 2026 (SJB-RGD003 Versión 2)

Plataforma interactiva para la socialización, entrenamiento y acreditación oficial del personal docente, directivo y administrativo del **Colegio Bilingüe San José Campestre** (Palmira, Valle del Cauca, Colombia) en los **Protocolos Institucionales de Seguridad (SJB-RGD003 Versión 2)**.

---

## 🛡️ Características Principales

1. **Escudo 3D Interactivo en Three.js**:
   - Geometría heráldica institucional en 3D con doble bisel, emblema central de seguridad, anillos de protección orbitales y partículas dinámicas que responden al movimiento del cursor del ratón y al scroll.
2. **Las 5 Ideas Fuerza**:
   - Responsabilidad funcional del docente sobre sus estudiantes.
   - Conteo continuo de grupo en 3 momentos clave (salida, llegada y fin de actividad).
   - Supervisión activa obligatoria ante instructores externos (SEED BLOOM, artes, deportes).
   - Reporte inmediato y formal de toda novedad el mismo día (Num. 36).
   - Canal exclusivo de autorizaciones de salida por **Pickup SJ Campestre** (WhatsApp abolido).
3. **6 Módulos Temáticos de Aprendizaje**:
   - **Módulo 1:** Fundamentos, Ideas Fuerza y Rol Docente (Deber de Diligencia en 8 conductas Num. 56).
   - **Módulo 2:** Desplazamientos Grupales y Permisos de Baño (Rutina de 6 pasos Num. 41 y exclusividad de baños Num. 45).
   - **Módulo 3:** Actividades Fuera del Aula, SEED BLOOM y Huerta (Seguridad ecuestre, EPP y bioseguridad).
   - **Módulo 4:** Zonas de Acompañamiento en Descansos (22 zonas perimetrales, 26 docentes, rotación de 13 semanas y 7 reglas de zona).
   - **Módulo 5:** Control de Terceros, Carnés y Salidas Pickup SJ (Código de colores Rojo/Azul/Verde/Negro y 5 pasos de entrega).
   - **Módulo 6:** Cadena de Comunicación, Trazabilidad y Marco Legal (Num. 22, 36 y régimen disciplinario RIT).
4. **6 Minijuegos Tácticos de Simulación**:
   - `JuegoDeberDiligencia.tsx` (M1: Clasificador Sí/No contrarreloj de conductas del deber de diligencia).
   - `JuegoDesplazamientosBanos.tsx` (M2: Gestor de traslados y permisos de baño por nivel).
   - `JuegoSeedBloomHuerta.tsx` (M3: Inspector de riesgos en zona ecuestre SEED BLOOM y huerta).
   - `JuegoCustodiaZonas.tsx` (M4: Simulador táctico de cobertura de las 22 zonas de descanso y relevos).
   - `JuegoCarnesPickupSJ.tsx` (M5: Validador de carnés y despacho Pickup SJ vs canales informales).
   - `JuegoCadenaReporte.tsx` (M6: Secuenciador de la cadena de reporte y triage de novedades).
5. **Modales de Apoyo Rápido**:
   - **Checklist de Bolsillo (Anexo A):** Lista de verificación interactiva de 15 pautas operativas con guardado local de progreso.
   - **Banco de 12 Casos Prácticos (Anexo B):** Visor con buscador y filtro por categorías para debate y análisis institucional.
   - **Código de Carnés:** Guía visual de zonas autorizadas y prohibiciones para visitantes y contratistas.
6. **SeguriBot CBSJC (Asistente IA con Groq)**:
   - Chatbot inteligente alimentado por `llama-3.3-70b-versatile` con el contexto normativo integral de los 12 folios del documento SJB-RGD003 Versión 2.
7. **Acta de Acreditación con Firma Digital en PDF**:
   - Generación de certificado oficial de cumplimiento y socialización con descarga en formato PDF y opción de impresión directa.

---

## 🚀 Tecnologías Utilizadas

- **Framework:** Next.js 16 (App Router con Turbopack)
- **Lenguaje:** TypeScript 5
- **Estilos:** Tailwind CSS v4 & Vanilla CSS Tokens
- **Animaciones 3D:** Three.js & Framer Motion
- **Inteligencia Artificial:** Groq SDK (`llama-3.3-70b-versatile`)
- **Generación de PDF:** jsPDF & html-to-image
- **Efectos:** canvas-confetti & Lucide React Icons

---

## 💻 Ejecución en Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

---

## 🏢 Créditos Institucionales

**Colegio Bilingüe San José Campestre — CBSJC S.A.S.**  
*Palmira, Valle del Cauca, Colombia — 2026*  
Documento oficial: `SJB-RGD003 · Protocolos Institucionales de Seguridad (Versión 2)`
