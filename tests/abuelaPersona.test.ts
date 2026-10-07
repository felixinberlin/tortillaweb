import { describe, it, expect } from "vitest";
import { ABUELA_KNOWLEDGE_SUMMARY, ABUELA_SYSTEM_PROMPT } from "../src/lib/ai/abuelaPersona";

describe("Abuela María AI Persona & Knowledge Base Tests", () => {
  it("should contain mandatory food safety standards in knowledge summary", () => {
    expect(ABUELA_KNOWLEDGE_SUMMARY).toContain("70°C durante 2 minutos");
    expect(ABUELA_KNOWLEDGE_SUMMARY).toContain("63°C durante 20 segundos");
    expect(ABUELA_KNOWLEDGE_SUMMARY).toContain("4 horas");
  });

  it("should contain historical fact vs legend distinction", () => {
    expect(ABUELA_KNOWLEDGE_SUMMARY).toContain("1798 en Villanueva de la Serena");
    expect(ABUELA_KNOWLEDGE_SUMMARY).toContain("Zumalacárregui");
    expect(ABUELA_KNOWLEDGE_SUMMARY).toContain("HECHO HISTÓRICO");
    expect(ABUELA_KNOWLEDGE_SUMMARY).toContain("LEYENDA");
  });

  it("should contain authentic potato varieties and confit technique", () => {
    expect(ABUELA_KNOWLEDGE_SUMMARY).toContain("Kennebec");
    expect(ABUELA_KNOWLEDGE_SUMMARY).toContain("Monalisa");
    expect(ABUELA_KNOWLEDGE_SUMMARY).toContain("Agria");
    expect(ABUELA_KNOWLEDGE_SUMMARY).toContain("130°C–140°C");
    expect(ABUELA_KNOWLEDGE_SUMMARY).toContain("Thermal Bonding");
  });

  it("should reflect Abuela María warmth, humor, and helpfulness directives in system prompt", () => {
    expect(ABUELA_SYSTEM_PROMPT).toContain("Navarra");
    expect(ABUELA_SYSTEM_PROMPT).toContain("1942");
    expect(ABUELA_SYSTEM_PROMPT).toContain("cielico");
    expect(ABUELA_SYSTEM_PROMPT).toContain("cariño");
    expect(ABUELA_SYSTEM_PROMPT).toContain("DIVERTIDA (FUNNY & WITTY)");
    expect(ABUELA_SYSTEM_PROMPT).toContain("MUY CÁLIDA Y MATERNAL (WARM & AFFECTIONATE)");
    expect(ABUELA_SYSTEM_PROMPT).toContain("EXTREMADAMENTE ÚTIL Y SABIA (VERY HELPFUL & PRACTICAL)");
    expect(ABUELA_SYSTEM_PROMPT).toContain("BREVEDAD OBLIGATORIA (CONCISE & PUNCHY");
    expect(ABUELA_SYSTEM_PROMPT).toContain("ENLACES INTERNOS OBLIGATORIOS A PÁGINAS REALES");
    expect(ABUELA_SYSTEM_PROMPT).toContain("PROHIBIDO hablar como una IA corporativa");
  });

  it("should verify animated Abuela SVG asset exists and contains eye and mouth animations", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const svgPath = path.resolve(__dirname, "../public/images/personas/abuela-maria-animated.svg");
    expect(fs.existsSync(svgPath)).toBe(true);
    const svgContent = fs.readFileSync(svgPath, "utf-8");
    expect(svgContent).toContain("@keyframes blink");
    expect(svgContent).toContain("@keyframes talk");
    expect(svgContent).toContain("eye-left");
    expect(svgContent).toContain("mouth");
  });

  it("should provide autonomous responses with zero external Vertex AI credits needed", async () => {
    const { askAbuelaMaria, generateAbuelaVoice } = await import("../src/lib/ai/abuelaPersona");

    // Test onion question in Spanish
    const onionReplyEs = await askAbuelaMaria([{ role: "user", text: "¿La tortilla lleva cebolla?" }], "es");
    expect(onionReplyEs).toContain("cielico");
    expect(onionReplyEs).toContain("/es/recipes/concebolla");

    // Test flip emergency in English
    const flipReplyEn = await askAbuelaMaria([{ role: "user", text: "My tortilla broke during the flip!" }], "en");
    expect(flipReplyEn).toContain("sweetheart");
    expect(flipReplyEn).toContain("/en/emergency");

    // Test safety in German
    const safetyReplyDe = await askAbuelaMaria([{ role: "user", text: "Ist flüssiges Ei sicher vor Salmonellen?" }], "de");
    expect(safetyReplyDe).toContain("63°C für 20 Sekunden");
    expect(safetyReplyDe).toContain("70°C für 2 Minuten");
    expect(safetyReplyDe).toContain("4 Stunden");

    // Test voice fallback to browser synthesis without cloud costs
    const voiceResult = await generateAbuelaVoice("¡Hola mi cielico!", "es");
    expect(voiceResult.fallbackToBrowserVoice).toBe(true);
    expect(voiceResult.success).toBe(false);
  });
});
