export type TextureStyle = "betanzos" | "jugosa" | "cuajada" | "runny" | "creamy" | "firm";
export type PotatoTechnique = "pochada" | "crujiente" | "hybrid" | "traditional" | "crispy";
export type OilCookingStyle = "minimal" | "traditional" | "generous";
export type EggSize = "small" | "medium" | "large" | "xl";

export interface TortillaIngredientInput {
  entityId: string;
  quantity: number;
  unit: string;
  size?: EggSize;
  cookingStyle?: OilCookingStyle;
}

export interface TortillaIngredientModifier {
  ingredientId: string;
  category: "vegetables" | "meat" | "dairy" | "other";
  name: { es: string; en: string; de: string };
  icon: string; // Lucide icon identifier
  defaultUnit: string;
  defaultQuantity: number;
  stepIncrement: number;
  minQuantity: number;
  maxQuantity: number;
  taxonomySlug?: { es: string; en: string; de: string };
  effect: {
    moisture: number; // -2 to +3
    fat: number;      // -1 to +3
    sweetness: number;// 0 to +3
    salt: number;     // 0 to +3
  };
  cookingAdvice: {
    es: string;
    en: string;
    de: string;
  };
}

export interface CalculatedProfile {
  potatoEggRatio: number;      // grams per egg
  oilEggRatio: number;         // ml absorbed per egg
  moistureLevel: "Low" | "Balanced" | "High" | "Very High";
  fatLevel: "Light" | "Moderate" | "Rich";
  sweetnessLevel: "Low" | "Medium" | "High";
  saltLevel: "Subtle" | "Balanced" | "Savory";
  estimatedServings: number;
  recommendedPanSizeCm: number;
  estimatedFryingOilMl: number;
  estimatedAbsorbedOilMl: number;
  potatoUnits: number;         // 1 unit = 100g
  ratioCategory: {
    es: string;
    en: string;
    de: string;
  };
  textureNote: {
    es: string;
    en: string;
    de: string;
  };
  flavorNotes: {
    es: string[];
    en: string[];
    de: string[];
  };
  structureNote: {
    es: string;
    en: string;
    de: string;
  };
  cookingAdvice: {
    es: string[];
    en: string[];
    de: string[];
  };
}

export interface TortillaConfiguration {
  ingredients: TortillaIngredientInput[];
  preferences: {
    texture?: TextureStyle;
    potatoTechnique?: PotatoTechnique;
  };
  calculatedProfile: CalculatedProfile;
}
