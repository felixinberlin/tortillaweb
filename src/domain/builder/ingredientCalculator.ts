export interface RecipeCalculationOptions {
  diners: number;
  hasOnion: boolean;
  doneness: "betanzos" | "jugosa" | "cuajada";
  potatoCut?: "pochada" | "crujiente";
}

export interface RecipeCalculationResult {
  eggCount: number;
  potatoGrams: number;
  onionGrams: number;
  oilUsed: number;     // Total cooking oil for poaching/frying (e.g., 480 ml)
  oilAbsorbed: number; // Estimated oil retained in tortilla (e.g., 120 ml)
  oilMl: number;       // Alias for backward compatibility
  saltGrams: number;
  panSizeCm: number;
  estimatedHeat: string;
}

export function calculateIngredients(options: RecipeCalculationOptions): RecipeCalculationResult {
  const diners = Math.max(1, Math.round(options.diners));
  const eggCount = Math.max(2, Math.round(diners * 1.5));
  const potatoGrams = diners * 150;
  const onionGrams = options.hasOnion ? Math.round(diners * 45) : 0;
  const oilUsed = Math.round(potatoGrams * 0.8);
  const oilAbsorbed = Math.round(eggCount * 20);
  const saltGrams = Math.max(1, Math.round(eggCount * 0.8));
  const panSizeCm = diners <= 2 ? 20 : diners <= 5 ? 24 : 28;

  let estimatedHeat = "Medio-Alto 1.5 min/lado";
  if (options.doneness === "betanzos") {
    estimatedHeat = "Fuerte 30 seg/lado";
  } else if (options.doneness === "cuajada") {
    estimatedHeat = "Medio-Bajo 3 min/lado";
  }

  return {
    eggCount,
    potatoGrams,
    onionGrams,
    oilUsed,
    oilAbsorbed,
    oilMl: oilUsed,
    saltGrams,
    panSizeCm,
    estimatedHeat,
  };
}
