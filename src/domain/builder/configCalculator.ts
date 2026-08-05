import type {
  TortillaConfiguration,
  TortillaIngredientInput,
  TextureStyle,
  PotatoTechnique,
  OilCookingStyle,
  EggSize,
  CalculatedProfile,
} from "./types";
import { OPTIONAL_INGREDIENTS, getIngredientModifier } from "./ingredientRegistry";

export interface CreateConfigOptions {
  eggs?: number;
  eggSize?: EggSize;
  potatoesGrams?: number;
  oilStyle?: OilCookingStyle;
  extras?: { id: string; quantity: number }[];
  texture?: TextureStyle;
  potatoTechnique?: PotatoTechnique;
}

export function createTortillaConfiguration(options: CreateConfigOptions): TortillaConfiguration {
  const eggCount = Math.max(2, Math.round(options.eggs ?? 6));
  const eggSize = options.eggSize ?? "large";
  const potatoGrams = Math.max(100, Math.round(options.potatoesGrams ?? 600));
  const oilStyle = options.oilStyle ?? "traditional";
  const texture = options.texture ?? "jugosa";
  const potatoTechnique = options.potatoTechnique ?? "pochada";
  const extras = options.extras ?? [];

  // Potato units normalization: 100g = 1 unit
  const potatoUnits = Math.round(potatoGrams / 100);

  // Oil calculations
  const oilMultiplierMap: Record<OilCookingStyle, { fry: number; absorb: number }> = {
    minimal: { fry: 0.4, absorb: 12 },
    traditional: { fry: 0.8, absorb: 20 },
    generous: { fry: 1.2, absorb: 28 },
  };

  const oilCalc = oilMultiplierMap[oilStyle];
  const estimatedFryingOilMl = Math.round(potatoGrams * oilCalc.fry);
  const estimatedAbsorbedOilMl = Math.round(eggCount * oilCalc.absorb);

  // Ratios
  const potatoEggRatio = Math.round(potatoGrams / eggCount);
  const oilEggRatio = Math.round(estimatedAbsorbedOilMl / eggCount);

  // Servings & Pan size
  const estimatedServings = Math.max(1, Math.round(potatoGrams / 150));
  let recommendedPanSizeCm = 24;
  if (estimatedServings <= 2 || eggCount <= 3) {
    recommendedPanSizeCm = 20;
  } else if (estimatedServings >= 6 || eggCount >= 9) {
    recommendedPanSizeCm = 28;
  }

  // Calculate effects from extra ingredients
  let moistureScore = 0;
  let fatScore = oilStyle === "minimal" ? 0 : oilStyle === "traditional" ? 1 : 2;
  let sweetnessScore = 0;
  let saltScore = 1;

  // Has onion check
  const hasOnionExtra = extras.find((e) => e.id === "onion" && e.quantity > 0);

  extras.forEach((ex) => {
    const mod = getIngredientModifier(ex.id);
    if (mod && ex.quantity > 0) {
      moistureScore += mod.effect.moisture;
      fatScore += mod.effect.fat;
      sweetnessScore += mod.effect.sweetness;
      saltScore += mod.effect.salt;
    }
  });

  // Texture effect on moisture
  if (texture === "betanzos" || texture === "runny") moistureScore += 2;
  else if (texture === "jugosa" || texture === "creamy") moistureScore += 1;

  // Moisture level text
  let moistureLevel: CalculatedProfile["moistureLevel"] = "Balanced";
  if (moistureScore >= 4) moistureLevel = "Very High";
  else if (moistureScore >= 2) moistureLevel = "High";
  else if (moistureScore <= 0) moistureLevel = "Low";

  // Fat level text
  let fatLevel: CalculatedProfile["fatLevel"] = "Moderate";
  if (fatScore >= 3) fatLevel = "Rich";
  else if (fatScore <= 0) fatLevel = "Light";

  // Sweetness level text
  let sweetnessLevel: CalculatedProfile["sweetnessLevel"] = "Low";
  if (sweetnessScore >= 3) sweetnessLevel = "High";
  else if (sweetnessScore >= 1) sweetnessLevel = "Medium";

  // Salt level text
  let saltLevel: CalculatedProfile["saltLevel"] = "Balanced";
  if (saltScore >= 3) saltLevel = "Savory";
  else if (saltScore <= 0) saltLevel = "Subtle";

  // Ratio classification strings
  let ratioCategory = {
    es: "Equilibrio Clásico (100g patata/huevo)",
    en: "Classic Balance (100g potato/egg)",
    de: "Klassisches Gleichgewicht (100g Kartoffel/Ei)",
  };
  if (potatoEggRatio < 80) {
    ratioCategory = {
      es: "Estilo Betanzos / Huevo Predominante (<80g patata/huevo)",
      en: "Betanzos Style / Egg Dominant (<80g potato/egg)",
      de: "Betanzos-Stil / Ei-Dominant (<80g Kartoffel/Ei)",
    };
  } else if (potatoEggRatio > 125) {
    ratioCategory = {
      es: "Sólida & Consistente (>125g patata/huevo)",
      en: "Dense & Substantial (>125g potato/egg)",
      de: "Kompakt & Gehaltvoll (>125g Kartoffel/Ei)",
    };
  }

  // Texture notes
  let textureNote = {
    es: "Centro cremoso e irresistible con buena jugosidad.",
    en: "Creamy, irresistible center with classic juiciness.",
    de: "Cremige, unwiderstehliche Mitte mit klassischer Saftigkeit.",
  };
  if (texture === "betanzos" || texture === "runny") {
    textureNote = {
      es: "Interior puramente fluido y amarillo huevo (Estilo Betanzos).",
      en: "Purely liquid, golden-runny interior (Betanzos style).",
      de: "Rein flüssiger, goldener Kern (Betanzos-Stil).",
    };
  } else if (texture === "cuajada" || texture === "firm") {
    textureNote = {
      es: "Cuajado uniforme, estructura firme ideal para bocadillo o pincho.",
      en: "Evenly set, firm structure ideal for tapas or sandwiches.",
      de: "Gleichmäßig gestockte, feste Struktur ideal für Tapas.",
    };
  }

  // Structure note
  let structureNote = {
    es: `Sartén de ${recommendedPanSizeCm}cm recomendada para ${estimatedServings} raciones con grosor equilibrado.`,
    en: `Recommended ${recommendedPanSizeCm}cm pan for ${estimatedServings} servings with optimal thickness.`,
    de: `Empfohlene ${recommendedPanSizeCm}cm Pfanne für ${estimatedServings} Portionen.`,
  };

  // Flavor notes
  const flavorNotesEs: string[] = ["Sabor tradicional de huevo y patata"];
  const flavorNotesEn: string[] = ["Classic egg and potato savory notes"];
  const flavorNotesDe: string[] = ["Klassische Ei- und Kartoffel-Geschmacksnoten"];

  if (hasOnionExtra) {
    flavorNotesEs.push("Dulzor suave de cebolla caramelizada");
    flavorNotesEn.push("Mild sweetness from poached onion");
    flavorNotesDe.push("Milde Süße von gedünsteten Zwiebeln");
  }
  if (oilStyle === "generous") {
    flavorNotesEs.push("Aroma profundo a Aceite de Oliva Virgen Extra");
    flavorNotesEn.push("Deep Extra Virgin Olive Oil aroma");
    flavorNotesDe.push("Intensives Olivenöl-Aroma");
  }

  extras.forEach((ex) => {
    if (ex.id !== "onion" && ex.quantity > 0) {
      const mod = getIngredientModifier(ex.id);
      if (mod) {
        flavorNotesEs.push(`Aporte característico de ${mod.name.es}`);
        flavorNotesEn.push(`Distinct flavor from ${mod.name.en}`);
        flavorNotesDe.push(`Charakteristische Note von ${mod.name.de}`);
      }
    }
  });

  // Dynamic cooking advice step-by-step
  const cookingAdviceEs: string[] = [
    `Pocha los ${potatoGrams}g de patatas (≈${potatoUnits} patatas medianas) en ${estimatedFryingOilMl}ml de AOVE usando técnica ${potatoTechnique === "crujiente" ? "de dorado crujiente" : "tradicional a fuego lento"}.`,
  ];
  const cookingAdviceEn: string[] = [
    `Poach the ${potatoGrams}g of potatoes (≈${potatoUnits} medium potatoes) in ${estimatedFryingOilMl}ml EVOO using ${potatoTechnique === "crujiente" ? "crispy high-heat" : "traditional slow"} technique.`,
  ];
  const cookingAdviceDe: string[] = [
    `Dünsten Sie die ${potatoGrams}g Kartoffeln (≈${potatoUnits} mittlere Kartoffeln) in ${estimatedFryingOilMl}ml Olivenöl.`,
  ];

  if (extras.length > 0) {
    extras.forEach((ex) => {
      const mod = getIngredientModifier(ex.id);
      if (mod && ex.quantity > 0) {
        cookingAdviceEs.push(mod.cookingAdvice.es);
        cookingAdviceEn.push(mod.cookingAdvice.en);
        cookingAdviceDe.push(mod.cookingAdvice.de);
      }
    });
  }

  cookingAdviceEs.push(
    `Casca los ${eggCount} huevos (tamaño ${eggSize.toUpperCase()}) en un bol grande sin batir en exceso. Junta las patatas calientes escurridas y deja reposar 5 minutos para que la patata absorba el huevo.`,
    `Cocina en una sartén antiadherente de ${recommendedPanSizeCm}cm a fuego ${texture === "betanzos" ? "fuerte (30 seg/lado)" : texture === "cuajada" ? "medio-bajo (3 min/lado)" : "medio-alto (1.5 min/lado)"} para lograr el punto ${texture}.`
  );
  cookingAdviceEn.push(
    `Crack the ${eggCount} eggs (size ${eggSize.toUpperCase()}) into a large bowl without overbeating. Mix in hot drained potatoes and let rest for 5 minutes so potatoes absorb the seasoned egg.`,
    `Cook in a ${recommendedPanSizeCm}cm non-stick pan at ${texture === "betanzos" ? "high heat (30 sec/side)" : texture === "cuajada" ? "medium-low heat (3 min/side)" : "medium-high heat (1.5 min/side)"} to achieve ${texture} texture.`
  );
  cookingAdviceDe.push(
    `Die ${eggCount} Eier (Größe ${eggSize.toUpperCase()}) in eine Schüssel schlagen, nicht übermäßig verquirlen. Heiße Kartoffeln dazugeben und 5 Minuten ruhen lassen.`,
    `In einer ${recommendedPanSizeCm}cm Pfanne garen, um die gewünschte Konsistenz zu erreichen.`
  );

  // Assemble inputs list
  const ingredients: TortillaIngredientInput[] = [
    { entityId: "egg", quantity: eggCount, unit: "unit", size: eggSize },
    { entityId: "potato", quantity: potatoGrams, unit: "g" },
    { entityId: "oil", quantity: estimatedAbsorbedOilMl, unit: "ml", cookingStyle: oilStyle },
    ...extras.map((ex) => ({
      entityId: ex.id,
      quantity: ex.quantity,
      unit: getIngredientModifier(ex.id)?.defaultUnit || "g",
    })),
  ];

  return {
    ingredients,
    preferences: {
      texture,
      potatoTechnique,
    },
    calculatedProfile: {
      potatoEggRatio,
      oilEggRatio,
      moistureLevel,
      fatLevel,
      sweetnessLevel,
      saltLevel,
      estimatedServings,
      recommendedPanSizeCm,
      estimatedFryingOilMl,
      estimatedAbsorbedOilMl,
      potatoUnits,
      ratioCategory,
      textureNote,
      flavorNotes: { es: flavorNotesEs, en: flavorNotesEn, de: flavorNotesDe },
      structureNote,
      cookingAdvice: { es: cookingAdviceEs, en: cookingAdviceEn, de: cookingAdviceDe },
    },
  };
}

/**
 * Serializes configuration options into URL search params string.
 */
export function serializeConfigurationToUrl(options: CreateConfigOptions): string {
  const params = new URLSearchParams();
  if (options.eggs) params.set("eggs", String(options.eggs));
  if (options.eggSize) params.set("eggSize", options.eggSize);
  if (options.potatoesGrams) params.set("potatoes", String(options.potatoesGrams));
  if (options.oilStyle) params.set("oil", options.oilStyle);
  if (options.texture) params.set("texture", options.texture);
  if (options.potatoTechnique) params.set("technique", options.potatoTechnique);

  if (options.extras && options.extras.length > 0) {
    const extrasStr = options.extras
      .filter((e) => e.quantity > 0)
      .map((e) => `${e.id}:${e.quantity}`)
      .join(",");
    if (extrasStr) params.set("extras", extrasStr);
  }

  return params.toString();
}

/**
 * Parses URL search params into configuration options.
 */
export function parseConfigurationFromUrl(searchParams: URLSearchParams): CreateConfigOptions {
  const options: CreateConfigOptions = {};

  const eggsParam = searchParams.get("eggs");
  if (eggsParam && !isNaN(Number(eggsParam))) options.eggs = Number(eggsParam);

  const eggSizeParam = searchParams.get("eggSize");
  if (eggSizeParam && ["small", "medium", "large", "xl"].includes(eggSizeParam)) {
    options.eggSize = eggSizeParam as EggSize;
  }

  const potatoesParam = searchParams.get("potatoes");
  if (potatoesParam && !isNaN(Number(potatoesParam))) options.potatoesGrams = Number(potatoesParam);

  const oilParam = searchParams.get("oil");
  if (oilParam && ["minimal", "traditional", "generous"].includes(oilParam)) {
    options.oilStyle = oilParam as OilCookingStyle;
  }

  const textureParam = searchParams.get("texture");
  if (textureParam && ["betanzos", "jugosa", "cuajada", "runny", "creamy", "firm"].includes(textureParam)) {
    options.texture = textureParam as TextureStyle;
  }

  const techParam = searchParams.get("technique");
  if (techParam && ["pochada", "crujiente", "hybrid", "traditional", "crispy"].includes(techParam)) {
    options.potatoTechnique = techParam as PotatoTechnique;
  }

  const extrasParam = searchParams.get("extras");
  if (extrasParam) {
    const extrasList: { id: string; quantity: number }[] = [];
    const pairs = extrasParam.split(",");
    pairs.forEach((pair) => {
      const [id, qty] = pair.split(":");
      if (id && !isNaN(Number(qty))) {
        extrasList.push({ id, quantity: Number(qty) });
      }
    });
    if (extrasList.length > 0) options.extras = extrasList;
  }

  return options;
}
