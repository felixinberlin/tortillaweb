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
    expect(ABUELA_SYSTEM_PROMPT).toContain("PROHIBIDO hablar como una IA corporativa");
  });
});
