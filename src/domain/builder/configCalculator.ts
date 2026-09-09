import type {
  TortillaConfiguration,
  TortillaIngredientInput,
  TextureStyle,
  PotatoTechnique,
  OilCookingStyle,
  EggSize,
  CalculatedProfile,
  PotatoVariety,
  PotatoCutStyle,
  FryingTemperatureProfile,
} from "./types";
import { getIngredientModifier } from "./ingredientRegistry";

export interface CreateConfigOptions {
  eggs?: number;
  eggSize?: EggSize;
  potatoesGrams?: number;
  oilStyle?: OilCookingStyle;
  extras?: { id: string; quantity: number }[];
  texture?: TextureStyle;
  potatoTechnique?: PotatoTechnique;
  potatoVariety?: PotatoVariety;
  potatoCut?: PotatoCutStyle;
  fryingTempProfile?: FryingTemperatureProfile;
}

export function createTortillaConfiguration(options: CreateConfigOptions): TortillaConfiguration {
  const eggCount = Math.max(2, Math.round(options.eggs ?? 6));
  const eggSize = options.eggSize ?? "large";
  const potatoGrams = Math.max(100, Math.round(options.potatoesGrams ?? 600));
  const oilStyle = options.oilStyle ?? "traditional";
  const texture = options.texture ?? "jugosa";
  const potatoTechnique = options.potatoTechnique ?? "pochada";
  const potatoVariety: PotatoVariety = options.potatoVariety ?? "monalisa";
  const potatoCut: PotatoCutStyle = options.potatoCut ?? (potatoTechnique === "crujiente" ? "ultrafina" : "panadera");

  // Derive frying temp profile if not specified
  let fryingTempProfile: FryingTemperatureProfile = options.fryingTempProfile ?? "confit_soft";
  if (!options.fryingTempProfile) {
    if (potatoTechnique === "crujiente") fryingTempProfile = "crispy_high";
    else if (potatoTechnique === "hybrid") fryingTempProfile = "double_stage";
    else fryingTempProfile = "confit_soft";
  }

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

  // --- Potato Cultivar, Cut & Frying Physics Calculation ---
  let timeMin = 18;
  let timeMax = 22;
  let tempMin = 110;
  let tempMax = 130;

  // Temperature ranges
  if (fryingTempProfile === "confit_soft") {
    tempMin = 110;
    tempMax = 130;
  } else if (fryingTempProfile === "traditional_medium") {
    tempMin = 145;
    tempMax = 160;
  } else if (fryingTempProfile === "crispy_high") {
    tempMin = 175;
    tempMax = 185;
  } else if (fryingTempProfile === "double_stage") {
    tempMin = 120;
    tempMax = 180;
  }

  // Base time by cut & temp
  if (potatoCut === "ultrafina") {
    if (fryingTempProfile === "crispy_high" || fryingTempProfile === "traditional_medium") {
      timeMin = 8;
      timeMax = 12;
    } else {
      timeMin = 10;
      timeMax = 14;
    }
  } else if (potatoCut === "panadera") {
    if (fryingTempProfile === "crispy_high") {
      timeMin = 12;
      timeMax = 15;
    } else if (fryingTempProfile === "traditional_medium") {
      timeMin = 15;
      timeMax = 18;
    } else if (fryingTempProfile === "double_stage") {
      timeMin = 15;
      timeMax = 18;
    } else {
      timeMin = 18;
      timeMax = 22;
    }
  } else if (potatoCut === "chascada") {
    if (fryingTempProfile === "crispy_high") {
      timeMin = 14;
      timeMax = 18;
    } else if (fryingTempProfile === "confit_soft") {
      timeMin = 20;
      timeMax = 25;
    } else {
      timeMin = 17;
      timeMax = 22;
    }
  } else if (potatoCut === "dados") {
    if (fryingTempProfile === "crispy_high") {
      timeMin = 11;
      timeMax = 14;
    } else if (fryingTempProfile === "confit_soft") {
      timeMin = 16;
      timeMax = 20;
    } else {
      timeMin = 13;
      timeMax = 17;
    }
  }

  // Variety adjustment
  if (potatoVariety === "agria") {
    // Higher dry matter cooks slightly faster and resists fat
    timeMin = Math.max(7, timeMin - 1);
    timeMax = Math.max(9, timeMax - 1);
  } else if (potatoVariety === "red_pontiac") {
    // Higher moisture
    timeMin += 1;
    timeMax += 2;
  }

  const recommendedFryingTempC = {
    degreesMin: tempMin,
    degreesMax: tempMax,
    formatted: {
      es: fryingTempProfile === "double_stage"
        ? "120 °C (Pochado) + 180 °C (Golpe final 2 min)"
        : `${tempMin} °C – ${tempMax} °C (${fryingTempProfile === "confit_soft" ? "Pochado suave" : fryingTempProfile === "traditional_medium" ? "Fritura media" : "Fuego vivo"})`,
      en: fryingTempProfile === "double_stage"
        ? "120 °C (Poach) + 180 °C (2 min sear)"
        : `${tempMin} °C – ${tempMax} °C (${fryingTempProfile === "confit_soft" ? "Gentle confit" : fryingTempProfile === "traditional_medium" ? "Medium fry" : "High heat"})`,
      de: fryingTempProfile === "double_stage"
        ? "120 °C (Dünsten) + 180 °C (2 Min Kruste)"
        : `${tempMin} °C – ${tempMax} °C`,
    },
  };

  const estimatedPotatoCookingTimeMin = {
    min: timeMin,
    max: timeMax,
    formatted: {
      es: `${timeMin} – ${timeMax} minutos`,
      en: `${timeMin} – ${timeMax} minutes`,
      de: `${timeMin} – ${timeMax} Minuten`,
    },
  };

  // Starch behavior note
  let starchBehaviorNote = {
    es: "Almidón equilibrado con corte panadera: cocción uniforme y textura sedosa que amalgama el huevo.",
    en: "Balanced starch with panadera slices: uniform cooking and silky texture binding the egg.",
    de: "Ausgewogene Stärke mit Panadera-Schnitt: gleichmäßiges Garen und seidige Bindung mit dem Ei.",
  };

  if (potatoCut === "chascada") {
    starchBehaviorNote = {
      es: "Corte chascado: fractura celular que libera amilopectina para espesar y crear una emulsión densa con el huevo.",
      en: "Chascado cut: cellular fracture releasing amylopectin to thicken and emulsify with egg.",
      de: "Chascado-Bruch: Zellwände brechen auf und setzen Stärke frei für eine dichte Ei-Emulsion.",
    };
  } else if (potatoCut === "ultrafina") {
    starchBehaviorNote = {
      es: "Láminas ultrafinas (1-2 mm): gelatinización rápida del almidón con bordes dorados (estilo Betanzos).",
      en: "Ultrafine slices (1-2 mm): rapid starch gelatinization with crispy golden edges (Betanzos style).",
      de: "Hauchdünne Scheiben: schnelle Stärkegelierung mit knusprigen Rändern (Betanzos-Stil).",
    };
  } else if (potatoCut === "dados") {
    starchBehaviorNote = {
      es: "Corte en dados (1 cm): retiene almidón en el núcleo ofreciendo mordida estructurada sin empastar.",
      en: "Diced cut (1 cm): retains core starch for a structured bite without heaviness.",
      de: "Gewürfelt (1 cm): bewahrt die Kernstärke für spürbaren Biss.",
    };
  }

  // Potato texture impact
  let potatoTextureImpact = {
    es: "Patata Monalisa tierna y confitada que se funde en boca con el huevo.",
    en: "Tender confit Monalisa potato melting in mouth with seasoned egg.",
    de: "Zarte, confierte Monalisa-Kartoffel, die cremig im Mund schmilzt.",
  };

  if (potatoVariety === "kennebec") {
    potatoTextureImpact = {
      es: "Patata Kennebec de bajo contenido acuoso: bordes crocantes con centro mantecoso ideal para tortillas fluidas.",
      en: "Low-water Kennebec potato: crisp edges with buttery interior, ideal for runny omelettes.",
      de: "Kennebec-Kartoffel mit geringem Wassergehalt: knusprige Ränder und zarter Kern.",
    };
  } else if (potatoVariety === "agria") {
    potatoTextureImpact = {
      es: "Patata Agria con alta materia seca: mínima absorción grasa y corteza dorada crujiente con interior blando.",
      en: "Agria potato with high dry matter: minimal oil absorption and crisp crust with soft core.",
      de: "Agria-Kartoffel mit hohem Trockenmasse-Anteil: minimale Ölaufnahme und knusprige Kruste.",
    };
  } else if (potatoVariety === "red_pontiac") {
    potatoTextureImpact = {
      es: "Patata Red Pontiac suave y húmeda: máxima jugosidad y textura blanda fundente.",
      en: "Red Pontiac potato: tender, moisture-rich and juicy melt-in-the-mouth texture.",
      de: "Red Pontiac-Kartoffel: besonders zart, saftig und feucht.",
    };
  }

  // Flavor notes
  const flavorNotesEs: string[] = [`Sabor tradicional de huevo y patata ${potatoVariety}`];
  const flavorNotesEn: string[] = [`Classic egg and ${potatoVariety} potato savory notes`];
  const flavorNotesDe: string[] = [`Klassische Ei- und ${potatoVariety}-Kartoffel-Geschmacksnoten`];

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

  // Variety and cut labels for cooking steps
  const cutNameEs = potatoCut === "panadera" ? "en láminas panadera (3–5 mm)" : potatoCut === "chascada" ? "chascadas al corte (cascadas para liberar almidón)" : potatoCut === "ultrafina" ? "en láminas ultrafinas (1–2 mm)" : "en dados regulares (1 cm)";
  const cutNameEn = potatoCut === "panadera" ? "sliced panadera-style (3–5 mm)" : potatoCut === "chascada" ? "chascada-cut (cracked to release starch)" : potatoCut === "ultrafina" ? "ultrafine slices (1–2 mm)" : "diced (1 cm)";
  const cutNameDe = potatoCut === "panadera" ? "in Panadera-Scheiben (3–5 mm)" : potatoCut === "chascada" ? "gebrochen (Chascado-Technik)" : potatoCut === "ultrafina" ? "hauchdünn geschnitten (1–2 mm)" : "gewürfelt (1 cm)";

  // Dynamic cooking advice step-by-step
  const cookingAdviceEs: string[] = [
    `Corta los ${potatoGrams}g de patatas ${potatoVariety.toUpperCase()} ${cutNameEs}.`,
    `Cocina las patatas en ${estimatedFryingOilMl}ml de AOVE a ${recommendedFryingTempC.formatted.es} durante ${estimatedPotatoCookingTimeMin.formatted.es} hasta que estén tiernas y cocinadas al punto.`,
  ];
  const cookingAdviceEn: string[] = [
    `Cut the ${potatoGrams}g of ${potatoVariety.toUpperCase()} potatoes ${cutNameEn}.`,
    `Cook potatoes in ${estimatedFryingOilMl}ml EVOO at ${recommendedFryingTempC.formatted.en} for ${estimatedPotatoCookingTimeMin.formatted.en} until tender and cooked to perfection.`,
  ];
  const cookingAdviceDe: string[] = [
    `Die ${potatoGrams}g ${potatoVariety.toUpperCase()}-Kartoffeln ${cutNameDe} schneiden.`,
    `In ${estimatedFryingOilMl}ml Olivenöl bei ${recommendedFryingTempC.formatted.de} für ${estimatedPotatoCookingTimeMin.formatted.de} garen.`,
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
    `Casca los ${eggCount} huevos (tamaño ${eggSize.toUpperCase()}) en un bol grande sin batir en exceso. Junta las patatas calientes escurridas (60–70 °C) y deja reposar 3 a 5 minutos para que el almidón gelatinizado absorba el huevo y forme una emulsión sedosa.`,
    `Cuaja en una sartén antiadherente de ${recommendedPanSizeCm}cm a fuego ${texture === "betanzos" ? "fuerte (30 seg/lado)" : texture === "cuajada" ? "medio-bajo (3 min/lado)" : "medio-alto (1.5 min/lado)"} para lograr el punto ${texture}.`
  );
  cookingAdviceEn.push(
    `Crack the ${eggCount} eggs (size ${eggSize.toUpperCase()}) into a large bowl without overbeating. Mix in hot drained potatoes (60–70 °C) and let rest for 3 to 5 minutes so gelatinized starch forms a silky emulsion with the eggs.`,
    `Cook in a ${recommendedPanSizeCm}cm non-stick pan at ${texture === "betanzos" ? "high heat (30 sec/side)" : texture === "cuajada" ? "medium-low heat (3 min/side)" : "medium-high heat (1.5 min/side)"} to achieve ${texture} texture.`
  );
  cookingAdviceDe.push(
    `Die ${eggCount} Eier (Größe ${eggSize.toUpperCase()}) in eine Schüssel schlagen, nicht übermäßig verquirlen. Heiße Kartoffeln dazugeben und 3-5 Minuten ruhen lassen.`,
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
      potatoVariety,
      potatoCut,
      fryingTempProfile,
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
      potatoVariety,
      potatoCut,
      fryingTempProfile,
      estimatedPotatoCookingTimeMin,
      recommendedFryingTempC,
      starchBehaviorNote,
      potatoTextureImpact,
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
  if (options.potatoVariety) params.set("variety", options.potatoVariety);
  if (options.potatoCut) params.set("cut", options.potatoCut);
  if (options.fryingTempProfile) params.set("fryTemp", options.fryingTempProfile);

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

  const varietyParam = searchParams.get("variety");
  if (varietyParam && ["monalisa", "kennebec", "agria", "red_pontiac", "spunta"].includes(varietyParam)) {
    options.potatoVariety = varietyParam as PotatoVariety;
  }

  const cutParam = searchParams.get("cut");
  if (cutParam && ["panadera", "chascada", "ultrafina", "dados"].includes(cutParam)) {
    options.potatoCut = cutParam as PotatoCutStyle;
  }

  const fryTempParam = searchParams.get("fryTemp");
  if (fryTempParam && ["confit_soft", "traditional_medium", "crispy_high", "double_stage"].includes(fryTempParam)) {
    options.fryingTempProfile = fryTempParam as FryingTemperatureProfile;
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
