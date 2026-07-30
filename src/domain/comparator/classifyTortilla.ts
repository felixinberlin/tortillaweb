import type { NormalizedIngredientRatio, TortillaClassification } from "./types";

export function classifyTortilla(
  ratios: Record<string, NormalizedIngredientRatio | undefined>
): TortillaClassification {
  const potatoRatio = ratios.potato?.quantity ?? 0;
  const oilRatio = ratios.oil?.quantity ?? 0;
  const onionRatio = ratios.onion?.quantity ?? 0;

  // Potato Intensity & Egg Dominance
  let potatoIntensity: TortillaClassification["potatoIntensity"] = "balanced";
  let potatoIntensityLabel = "Balanced";
  let eggDominance: TortillaClassification["eggDominance"] = "medium";
  let eggDominanceLabel = "Medium";

  if (potatoRatio < 100) {
    potatoIntensity = "eggDominant";
    potatoIntensityLabel = "Egg dominant";
    eggDominance = "high";
    eggDominanceLabel = "High";
  } else if (potatoRatio > 150) {
    potatoIntensity = "potatoHeavy";
    potatoIntensityLabel = "Potato heavy";
    eggDominance = "low";
    eggDominanceLabel = "Low";
  } else {
    potatoIntensity = "balanced";
    potatoIntensityLabel = "Balanced";
    eggDominance = "medium";
    eggDominanceLabel = "Medium";
  }

  // Oil Intensity
  let oilIntensity: TortillaClassification["oilIntensity"] = "medium";
  let oilIntensityLabel = "Medium";

  if (oilRatio < 20) {
    oilIntensity = "light";
    oilIntensityLabel = "Light";
  } else if (oilRatio > 35) {
    oilIntensity = "rich";
    oilIntensityLabel = "Rich";
  } else {
    oilIntensity = "medium";
    oilIntensityLabel = "Medium";
  }

  // Onion Presence
  let onionPresence: TortillaClassification["onionPresence"] = "none";
  let onionPresenceLabel = "None";

  if (onionRatio <= 0) {
    onionPresence = "none";
    onionPresenceLabel = "None";
  } else if (onionRatio <= 30) {
    onionPresence = "moderate";
    onionPresenceLabel = "Moderate";
  } else {
    onionPresence = "heavy";
    onionPresenceLabel = "Heavy";
  }

  return {
    potatoIntensity,
    potatoIntensityLabel,
    oilIntensity,
    oilIntensityLabel,
    onionPresence,
    onionPresenceLabel,
    eggDominance,
    eggDominanceLabel,
  };
}
