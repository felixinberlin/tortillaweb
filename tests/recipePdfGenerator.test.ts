import { describe, it, expect, vi } from "vitest";
import { createRecipePdfDocument, exportRecipeToPdf } from "../src/lib/pdf/recipePdfGenerator";
import type { RawRecipeInput } from "../src/lib/translator/types";
import { createTortillaConfiguration } from "../src/domain/builder/configCalculator";
import { downloadDnaAsPdf } from "../src/domain/builder/dnaShareHelper";

describe("Recipe PDF Generator (Kitchen Notebook)", () => {
  const sampleConfig = createTortillaConfiguration({
    eggs: 6,
    potatoesGrams: 600,
    texture: "jugosa",
    potatoTechnique: "pochada",
    potatoVariety: "monalisa",
    extras: [{ id: "onion", quantity: 150 }],
  });

  const sampleRawRecipe: RawRecipeInput = {
    name: "Tortilla de Betanzos Tradicional",
    description: "La auténtica tortilla de Betanzos, melosa y con huevo líquido.",
    authorName: "Restaurante La Casilla",
    ingredients: [
      "6 huevos camperos",
      "500g patatas kennebec gallegas",
      "Aceite de oliva virgen extra",
      "Sal marina",
    ],
    instructions: [
      "Cortar las patatas en láminas muy finas e irregulares.",
      "Freír en abundante AOVE bien caliente hasta que queden doradas y crujientes por los bordes.",
      "Batir los huevos enérgicamente con una pizca de sal.",
      "Introducir las patatas recién sacadas del aceite caliente en el huevo batido y dejar reposar 1 minuto.",
      "Cuajar a fuego vivo en sartén bien caliente durante 30 segundos por cada lado.",
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    yieldServings: 4,
  };

  it("should generate a valid PDF document for custom TortillaConfiguration", () => {
    const { doc, filename } = createRecipePdfDocument({
      config: sampleConfig,
      lang: "es",
      shareUrl: "https://tortilladepatatas.org/es/builder?dna=test",
    });

    expect(doc).toBeDefined();
    expect(filename).toContain("tortilla-receta-");
    expect(filename).toContain(".pdf");
    expect(doc.getNumberOfPages()).toBeGreaterThanOrEqual(1);

    // Verify it produces valid PDF output stream
    const outputBuffer = doc.output("arraybuffer");
    expect(outputBuffer).toBeInstanceOf(ArrayBuffer);
    expect(outputBuffer.byteLength).toBeGreaterThan(1000);
  });

  it("should generate a valid PDF document for canonical RawRecipeInput", () => {
    const { doc, filename } = createRecipePdfDocument({
      recipe: sampleRawRecipe,
      lang: "es",
      filename: "betanzos-receta",
    });

    expect(doc).toBeDefined();
    expect(filename).toBe("betanzos-receta.pdf");
    expect(doc.getNumberOfPages()).toBeGreaterThanOrEqual(1);

    const outputBuffer = doc.output("arraybuffer");
    expect(outputBuffer.byteLength).toBeGreaterThan(1000);
  });

  it("should support multiple languages without error (es, en, de)", () => {
    const langs = ["es", "en", "de"];

    for (const lang of langs) {
      const result = createRecipePdfDocument({
        config: sampleConfig,
        lang,
      });

      expect(result.doc).toBeDefined();
      expect(result.doc.getNumberOfPages()).toBeGreaterThanOrEqual(1);
    }
  });

  it("should properly normalize custom filenames without duplicating extension", () => {
    const withExt = createRecipePdfDocument({
      recipe: sampleRawRecipe,
      filename: "mi-tortilla.pdf",
    });
    expect(withExt.filename).toBe("mi-tortilla.pdf");

    const withoutExt = createRecipePdfDocument({
      recipe: sampleRawRecipe,
      filename: "mi-tortilla",
    });
    expect(withoutExt.filename).toBe("mi-tortilla.pdf");
  });

  it("should handle long instructions by allocating multiple pages safely", () => {
    const longRecipe: RawRecipeInput = {
      name: "Tortilla de Alta Cocina con Pasos Detallados",
      description: "Receta con instrucciones paso a paso detalladas para comprobar paginación.",
      ingredients: ["6 huevos", "600g patatas", "Aceite"],
      instructions: Array.from({ length: 25 }, (_, i) => ({
        step: `Paso ${i + 1}`,
        text: `Instrucción detallada de cocina número ${i + 1} explicando con precisión la temperatura del aceite, la coagulación proteica del huevo a 70°C durante 2 minutos y la técnica de volteo con plato de loza humedecido.`,
      })),
    };

    const { doc } = createRecipePdfDocument({
      recipe: longRecipe,
      lang: "es",
    });

    expect(doc.getNumberOfPages()).toBeGreaterThan(1);
  });

  it("exportRecipeToPdf should produce document and expected filename", async () => {
    const result = await exportRecipeToPdf({
      config: sampleConfig,
      lang: "es",
    });

    expect(result.doc).toBeDefined();
    expect(result.filename).toMatch(/tortilla-receta-.*\.pdf$/);
    expect(result.doc.getNumberOfPages()).toBeGreaterThanOrEqual(1);
    expect(typeof result.doc.save).toBe("function");
  });

  it("downloadDnaAsPdf helper in builder should successfully trigger PDF export", async () => {
    const result = await downloadDnaAsPdf(sampleConfig, "es", "https://tortilladepatatas.org/es/builder");
    expect(result).toBeDefined();
    expect(result.filename).toBe("tortilla-receta-adn-100g.pdf");
    expect(result.doc).toBeDefined();
  });
});
