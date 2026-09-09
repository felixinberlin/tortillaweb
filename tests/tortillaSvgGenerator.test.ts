import { describe, it, expect } from "vitest";
import {
  generateTortillaSvg,
  builderConfigToSvgOptions,
  recipeToSvgOptions,
} from "../src/domain/svg/tortillaSvgGenerator";
import type { TortillaSvgOptions } from "../src/domain/svg/types";
import { createTortillaConfiguration } from "../src/domain/builder/configCalculator";
import type { RawRecipeInput } from "../src/lib/translator/types";

describe("Tortilla SVG Generator & Animation Engine", () => {
  it("should generate valid XML/SVG markup with proper namespace and dimensions", () => {
    const svg = generateTortillaSvg({
      title: "Tortilla de Betanzos",
      eggCount: 6,
      potatoWeightG: 500,
      doneness: "betanzos",
      animated: false,
    });

    expect(svg).toContain("<svg");
    expect(svg).toContain("xmlns=\"http://www.w3.org/2000/svg\"");
    expect(svg).toContain("viewBox=\"0 0 600 400\"");
    expect(svg).toContain("</svg>");
    expect(svg).toContain("Tortilla de Betanzos");
  });

  it("should include animation keyframes and classes when animated is enabled", () => {
    const animatedSvg = generateTortillaSvg({
      animated: true,
      animatedFlip: false,
    });

    expect(animatedSvg).toContain("<style>");
    expect(animatedSvg).toContain("steamFloat1");
    expect(animatedSvg).toContain("yolkBreathe");
    expect(animatedSvg).toContain("prefers-reduced-motion");
  });

  it("should include pan flip keyframe animation when animatedFlip is enabled", () => {
    const flipSvg = generateTortillaSvg({
      animated: true,
      animatedFlip: true,
    });

    expect(flipSvg).toContain("panFlipKeyframe");
    expect(flipSvg).toContain("flipContainer");
  });

  it("should omit animation style block when animated and animatedFlip are false", () => {
    const staticSvg = generateTortillaSvg({
      animated: false,
      animatedFlip: false,
    });

    expect(staticSvg).not.toContain("@keyframes");
    expect(staticSvg).not.toContain("panFlipKeyframe");
  });

  it("should render across different presentation views", () => {
    const views: TortillaSvgOptions["presentation"][] = [
      "skillet_top",
      "sliced_pincho",
      "duo_pan_slice",
    ];

    for (const presentation of views) {
      const svg = generateTortillaSvg({
        presentation,
        title: `Vista ${presentation}`,
        animated: false,
      });

      expect(svg).toBeDefined();
      expect(svg).toContain("</svg>");
    }
  });

  it("should render across all culinary doneness levels with specific color palettes", () => {
    const donenessLevels: TortillaSvgOptions["doneness"][] = [
      "betanzos",
      "liquida",
      "melosa",
      "jugosa",
      "cuajada",
      "bocadillo",
    ];

    for (const doneness of donenessLevels) {
      const svg = generateTortillaSvg({
        doneness,
        animated: false,
      });

      expect(svg).toContain("</svg>");
      expect(svg.length).toBeGreaterThan(1000);
    }
  });

  it("should render different potato cuts (panadera, dados, paja)", () => {
    const cuts: TortillaSvgOptions["potatoCut"][] = ["panadera", "dados", "paja"];

    for (const potatoCut of cuts) {
      const svg = generateTortillaSvg({
        potatoCut,
        presentation: "skillet_top",
      });

      expect(svg).toContain(`_${potatoCut}`);
    }
  });

  it("should handle onion configurations (none, pochada, caramelized)", () => {
    const withoutOnion = generateTortillaSvg({ onion: false });
    const withPochada = generateTortillaSvg({
      onion: { present: true, style: "pochada", quantityG: 120 },
    });
    const withCaramelized = generateTortillaSvg({
      onion: { present: true, style: "caramelized", quantityG: 150 },
    });

    expect(withoutOnion).toContain("</svg>");
    expect(withPochada).toContain("</svg>");
    expect(withCaramelized).toContain("</svg>");
  });

  it("should support localized badge and label texts (es, en, de)", () => {
    const esSvg = generateTortillaSvg({ lang: "es", showBadge: true });
    const enSvg = generateTortillaSvg({ lang: "en", showBadge: true });
    const deSvg = generateTortillaSvg({ lang: "de", showBadge: true });

    expect(esSvg).toMatch(/huevos/i);
    expect(enSvg).toMatch(/eggs/i);
    expect(deSvg).toMatch(/eier/i);
  });

  it("builderConfigToSvgOptions should convert builder configuration into SVG options", () => {
    const config = createTortillaConfiguration({
      eggs: 8,
      potatoesGrams: 800,
      texture: "melosa",
      potatoCut: "dados",
      extras: [{ id: "onion", quantity: 150 }],
    });

    const svgOptions = builderConfigToSvgOptions(config, { animated: true });
    expect(svgOptions.eggCount).toBe(8);
    expect(svgOptions.potatoWeightG).toBe(800);
    expect(svgOptions.potatoCut).toBe("dados");
    expect(svgOptions.doneness).toBe("melosa");
    expect(svgOptions.onion).toBe(true);
    expect(svgOptions.animated).toBe(true);

    const svg = generateTortillaSvg(svgOptions);
    expect(svg).toContain("</svg>");
  });

  it("recipeToSvgOptions should parse RawRecipeInput and map to valid SVG options", () => {
    const rawRecipe: RawRecipeInput = {
      name: "Tortilla Clásica de Santander",
      description: "Receta típica del norte con patata pochada.",
      ingredients: ["5 huevos", "600g patatas", "1 cebolla", "Aceite de oliva virgen extra"],
      instructions: ["Pochar patatas y cebolla", "Cuajar a fuego medio"],
    };

    const svgOptions = recipeToSvgOptions(rawRecipe);
    expect(svgOptions.title).toBe("Tortilla Clásica de Santander");
    expect(svgOptions.eggCount).toBe(5);
    expect(svgOptions.onion).toBe(true);

    const svg = generateTortillaSvg(svgOptions);
    expect(svg).toContain("</svg>");
  });
});
