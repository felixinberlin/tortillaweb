import type {
  RawRecipeInput,
  RawIngredientInput,
  RecipeDNA,
  AmountPerEgg,
  LocalizedString,
} from "./types";
import { convertToStandardUnit } from "../comparator/units";
import { classifyRecipe } from "./classifyRecipe";

function getIngredientId(ing: RawIngredientInput): string {
  const id = (ing.ingredientId || ing.id || "").toLowerCase().trim();
  if (id) return id;

  const rawName = typeof ing.name === "object" ? ing.name?.es || ing.name?.en || "" : ing.name || "";
  const lowerName = rawName.toLowerCase();

  if (lowerName.includes("patata") || lowerName.includes("potato") || lowerName.includes("kartoffel")) {
    return "potato";
  }
  if (lowerName.includes("huevo") || lowerName.includes("egg") || lowerName.includes("ei")) {
    return "egg";
  }
  if (lowerName.includes("aceite") || lowerName.includes("oil") || lowerName.includes("öl")) {
    return "oil";
  }
  if (lowerName.includes("sal") || lowerName.includes("salt") || lowerName.includes("salz")) {
    return "salt";
  }
  if (lowerName.includes("cebolla") || lowerName.includes("onion") || lowerName.includes("zwiebel")) {
    return "onion";
  }
  if (lowerName.includes("pimiento") || lowerName.includes("pepper") || lowerName.includes("paprika")) {
    return "peppers";
  }
  if (lowerName.includes("pimienta") || lowerName.includes("black pepper") || lowerName.includes("pfeffer")) {
    return "blackPepper";
  }

  return id || "unknown";
}

function getIngredientName(ing: RawIngredientInput): string {
  if (typeof ing.name === "object" && ing.name !== null) {
    return ing.name.es || ing.name.en || ing.name.de || "Ingrediente";
  }
  return ing.name || "Ingrediente";
}

function getRecipeName(recipe: RawRecipeInput): string {
  const nameCandidate = recipe.recipeName || recipe.title || recipe.name || recipe.slug;
  if (typeof nameCandidate === "object" && nameCandidate !== null) {
    return nameCandidate.es || nameCandidate.en || nameCandidate.de || "Receta";
  }
  return nameCandidate || "Receta";
}

export function normalizeRecipe(recipe: RawRecipeInput): RecipeDNA {
  const ingredients: RawIngredientInput[] = recipe.ingredients || [];
  const recipeId = recipe.recipeId || recipe.id || "recipe-unknown";
  const recipeName = getRecipeName(recipe);
  const localizedName = typeof recipe.title === "object" ? (recipe.title as LocalizedString) : undefined;
  const source = recipe.source;

  // 1. Determine total egg count
  const eggIng = ingredients.find((ing) => getIngredientId(ing) === "egg");
  let eggCount = 1;

  if (eggIng) {
    const amount = eggIng.quantity ?? eggIng.amount ?? 1;
    const std = convertToStandardUnit(amount, eggIng.unit || "unit", "egg");
    eggCount = std.quantity > 0 ? std.quantity : 1;
  }

  // 2. Normalize every ingredient ratio per 1 egg
  const ratios: Record<string, AmountPerEgg> = {};

  for (const ing of ingredients) {
    const ingId = getIngredientId(ing);
    const ingName = getIngredientName(ing);
    let rawAmount = ing.quantity ?? ing.amount ?? 0;

    // Use absorbed oil when available for accurate comparison
    if (ingId === "oil") {
      if (recipe.oilUsage?.estimatedAbsorbedAmount !== undefined) {
        rawAmount = recipe.oilUsage.estimatedAbsorbedAmount;
      } else if (ing.estimatedAbsorbedAmount !== undefined) {
        rawAmount = ing.estimatedAbsorbedAmount;
      } else if (ing.absorbedAmount !== undefined) {
        rawAmount = ing.absorbedAmount;
      }
    }

    const rawUnit = ing.unit || "g";

    const std = convertToStandardUnit(rawAmount, rawUnit, ingId);
    const quantityPerEgg = Number((std.quantity / eggCount).toFixed(2));

    ratios[ingId] = {
      ingredientId: ingId,
      name: ingName,
      quantity: quantityPerEgg,
      totalQuantity: std.quantity,
      unit: std.unit,
    };
  }

  // Ensure default presence of core ingredients in ratios object even if 0
  const coreIds = ["potato", "egg", "oil", "salt", "onion"];
  for (const coreId of coreIds) {
    if (!ratios[coreId]) {
      let defaultName = coreId;
      let defaultUnit = coreId === "oil" ? "ml" : coreId === "egg" ? "unit" : "g";
      if (coreId === "potato") defaultName = "Patata";
      if (coreId === "egg") defaultName = "Huevo";
      if (coreId === "oil") defaultName = "Aceite de Oliva";
      if (coreId === "salt") defaultName = "Sal";
      if (coreId === "onion") defaultName = "Cebolla";

      ratios[coreId] = {
        ingredientId: coreId,
        name: defaultName,
        quantity: coreId === "egg" ? 1 : 0,
        totalQuantity: coreId === "egg" ? eggCount : 0,
        unit: defaultUnit,
      };
    }
  }

  // 3. Classify tortilla profile based on normalized ratios
  const classification = classifyRecipe(ratios);

  return {
    recipeId,
    recipeName,
    localizedName,
    eggCount,
    source,
    ratios,
    classification,
  };
}
