export * from "./types";
export * from "./BaseIngredientSvg";

// Dedicated Ingredient SVG Modules
export * from "./EggSvg";
export * from "./PotatoSvg";
export * from "./OnionSvg";
export * from "./OliveOilSvg";
export * from "./SaltSvg";
export * from "./ChorizoSvg";
export * from "./JamonIbericoSvg";
export * from "./TruffleSvg";
export * from "./PiquilloPepperSvg";
export * from "./CheeseSvg";
export * from "./MushroomSvg";
export * from "./GarlicSvg";
export * from "./SobrasadaSvg";
export * from "./ChickpeaSvg";

import type { IngredientSvgModule, IngredientSvgProps } from "./types";
import { EggSvgModule } from "./EggSvg";
import { PotatoSvgModule } from "./PotatoSvg";
import { OnionSvgModule } from "./OnionSvg";
import { OliveOilSvgModule } from "./OliveOilSvg";
import { SaltSvgModule } from "./SaltSvg";
import { ChorizoSvgModule } from "./ChorizoSvg";
import { JamonSvgModule } from "./JamonIbericoSvg";
import { TruffleSvgModule } from "./TruffleSvg";
import { PiquilloPepperSvgModule } from "./PiquilloPepperSvg";
import { CheeseSvgModule } from "./CheeseSvg";
import { MushroomSvgModule } from "./MushroomSvg";
import { GarlicSvgModule } from "./GarlicSvg";
import { SobrasadaSvgModule } from "./SobrasadaSvg";
import { ChickpeaSvgModule } from "./ChickpeaSvg";

/**
 * Universal Registry of all individual Ingredient SVG Modules
 */
export const INGREDIENT_SVG_REGISTRY: Record<string, IngredientSvgModule> = {
  egg: EggSvgModule,
  potato: PotatoSvgModule,
  onion: OnionSvgModule,
  olive_oil: OliveOilSvgModule,
  salt: SaltSvgModule,
  chorizo: ChorizoSvgModule,
  jamon: JamonSvgModule,
  truffle: TruffleSvgModule,
  peppers: PiquilloPepperSvgModule,
  cheese: CheeseSvgModule,
  mushrooms: MushroomSvgModule,
  garlic: GarlicSvgModule,
  sobrasada: SobrasadaSvgModule,
  chickpea: ChickpeaSvgModule,
};

/**
 * Universal dispatcher helper to render any ingredient SVG by ID and options
 */
export function renderIngredientSvg(
  ingredientId: string,
  props?: IngredientSvgProps
): string {
  const mod = INGREDIENT_SVG_REGISTRY[ingredientId.toLowerCase()];
  if (mod) {
    return mod.renderSvgString(props);
  }
  // Fallback default egg
  return renderEggSvgString(props);
}
