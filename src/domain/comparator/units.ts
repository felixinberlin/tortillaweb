export interface UnitConversionRule {
  standardUnit: string;
  toStandardMultiplier: (amount: number, ingredientId?: string) => number;
}

const DEFAULT_INGREDIENT_UNIT_WEIGHTS: Record<string, number> = {
  potato: 120, // 1 medium potato ~ 120g
  onion: 150,  // 1 medium onion ~ 150g
  egg: 1,      // 1 egg ~ 1 count
  salt: 5,     // 1 tsp salt ~ 5g
  oil: 15,     // 1 tbsp oil ~ 15ml
};

export function convertToStandardUnit(
  amount: number,
  unit: string = "g",
  ingredientId: string = ""
): { quantity: number; unit: string } {
  const cleanUnit = (unit || "").trim().toLowerCase();
  const ingId = (ingredientId || "").trim().toLowerCase();

  // Mass units
  if (cleanUnit === "g" || cleanUnit === "gram" || cleanUnit === "grams" || cleanUnit === "gramos") {
    return { quantity: amount, unit: "g" };
  }
  if (cleanUnit === "kg" || cleanUnit === "kilo" || cleanUnit === "kilogram") {
    return { quantity: amount * 1000, unit: "g" };
  }
  if (cleanUnit === "mg") {
    return { quantity: amount / 1000, unit: "g" };
  }

  // Volume units
  if (cleanUnit === "ml" || cleanUnit === "milliliter" || cleanUnit === "mililitros") {
    return { quantity: amount, unit: "ml" };
  }
  if (cleanUnit === "l" || cleanUnit === "liter" || cleanUnit === "litros") {
    return { quantity: amount * 1000, unit: "ml" };
  }
  if (cleanUnit === "cl") {
    return { quantity: amount * 10, unit: "ml" };
  }

  // Count / Units
  if (
    cleanUnit === "unit" ||
    cleanUnit === "unidades" ||
    cleanUnit === "unidad" ||
    cleanUnit === "pcs" ||
    cleanUnit === "stk" ||
    cleanUnit === "" ||
    cleanUnit === "huevo" ||
    cleanUnit === "huevos"
  ) {
    if (ingId === "egg" || ingId === "huevo") {
      return { quantity: amount, unit: "unit" };
    }
    const unitWeight = DEFAULT_INGREDIENT_UNIT_WEIGHTS[ingId] || 100;
    return { quantity: amount * unitWeight, unit: ingId === "oil" ? "ml" : "g" };
  }

  // Pinches & Spoons
  if (cleanUnit === "pizca" || cleanUnit === "pinch") {
    return { quantity: amount * 1, unit: "g" };
  }
  if (cleanUnit === "tsp" || cleanUnit === "cucharadita") {
    return { quantity: amount * 5, unit: ingId === "oil" ? "ml" : "g" };
  }
  if (cleanUnit === "tbsp" || cleanUnit === "cucharada") {
    return { quantity: amount * 15, unit: ingId === "oil" ? "ml" : "g" };
  }

  // Default fallback
  return { quantity: amount, unit: cleanUnit || "g" };
}
