import type { TortillaConfiguration } from "./types";
import type { RawRecipeInput, LocalizedString } from "@/domain/comparator/types";
import { serializeConfigurationToUrl } from "./configCalculator";
import { exportRecipeToPdf } from "@/lib/pdf/recipePdfGenerator";
import { SAFETY_CANON, getSafetySummaryNotice } from "@/lib/safetyCanon";

/**
 * Converts a calculated TortillaConfiguration into a RawRecipeInput for the comparator.
 */
export function buildCustomRecipeFromConfig(
  config: TortillaConfiguration,
  lang: string = "es",
  customId: string = "custom-user-recipe",
  customName?: string
): RawRecipeInput {
  const eggIng = config.ingredients.find((i) => i.entityId === "egg");
  const potatoIng = config.ingredients.find((i) => i.entityId === "potato");
  const onionIng = config.ingredients.find((i) => i.entityId === "onion");

  const totalEggs = eggIng ? eggIng.quantity : 6;
  const totalPotatoes = potatoIng ? potatoIng.quantity : 600;
  const totalOnion = onionIng ? onionIng.quantity : 0;
  const totalOil = config.calculatedProfile.estimatedAbsorbedOilMl || 60;

  const defaultTitleText = customName || (customId === "custom-user-recipe-b" ? (lang === "es" ? "Segunda Tortilla Creada" : lang === "de" ? "Zweite Erstellte Tortilla" : "Second Custom Tortilla") : (lang === "es" ? "Mi Tortilla Creada" : lang === "de" ? "Meine Erstellte Tortilla" : "My Custom Tortilla"));

  const title: LocalizedString = {
    es: `${defaultTitleText} (${config.calculatedProfile.potatoEggRatio}g/h • ${totalEggs} huevos)`,
    en: `${defaultTitleText} (${config.calculatedProfile.potatoEggRatio}g/egg • ${totalEggs} eggs)`,
    de: `${defaultTitleText} (${config.calculatedProfile.potatoEggRatio}g/Ei • ${totalEggs} Eier)`,
  };

  const rawIngredients: RawRecipeInput["ingredients"] = [
    {
      id: "egg",
      ingredientId: "egg",
      name: { es: "Huevos", en: "Eggs", de: "Eier" },
      amount: totalEggs,
      unit: "unit",
    },
    {
      id: "potato",
      ingredientId: "potato",
      name: { es: "Patatas", en: "Potatoes", de: "Kartoffeln" },
      amount: totalPotatoes,
      unit: "g",
    },
    {
      id: "oil",
      ingredientId: "oil",
      name: { es: "Aceite de Oliva", en: "Olive Oil", de: "Olivenöl" },
      amount: totalOil,
      unit: "ml",
    },
  ];

  if (totalOnion > 0) {
    rawIngredients.push({
      id: "onion",
      ingredientId: "onion",
      name: { es: "Cebolla", en: "Onion", de: "Zwiebel" },
      amount: totalOnion,
      unit: "g",
    });
  }

  // Include remaining extras
  for (const ing of config.ingredients) {
    if (["egg", "potato", "onion", "oil", "salt"].includes(ing.entityId)) continue;
    rawIngredients.push({
      id: ing.entityId,
      ingredientId: ing.entityId,
      name: ing.entityId,
      amount: ing.quantity,
      unit: ing.unit || "g",
    });
  }

  return {
    id: customId,
    recipeId: customId,
    title,
    name: title,
    recipeName: title,
    slug: customId,
    ingredients: rawIngredients,
    eggCount: totalEggs,
    isCustomDna: true,
  };
}

/**
 * Builds the deep link to the Comparator with custom DNA parameters.
 */
export function getComparatorUrlForConfig(
  config: TortillaConfiguration,
  lang: string = "es",
  compareWithId: string = "clasica"
): string {
  const eggIng = config.ingredients.find((i) => i.entityId === "egg");
  const potatoIng = config.ingredients.find((i) => i.entityId === "potato");

  const options = {
    eggs: eggIng?.quantity || 6,
    eggSize: eggIng?.size || "large",
    potatoesGrams: potatoIng?.quantity || 600,
    oilStyle: config.preferences.potatoTechnique === "crujiente" ? "generous" as const : "traditional" as const,
    texture: config.preferences.texture,
    potatoTechnique: config.preferences.potatoTechnique,
    potatoVariety: config.preferences.potatoVariety,
    potatoCut: config.preferences.potatoCut,
    fryingTempProfile: config.preferences.fryingTempProfile,
    extras: config.ingredients
      .filter((i) => !["egg", "potato", "oil", "salt"].includes(i.entityId) && i.quantity > 0)
      .map((i) => ({ id: i.entityId, quantity: i.quantity })),
  };

  const queryString = serializeConfigurationToUrl(options);
  return `/${lang}/comparador?recipeA=custom-user-recipe&recipeB=${encodeURIComponent(compareWithId)}&${queryString}`;
}

/**
 * Exports and downloads the Tortilla DNA as a JSON file.
 */
export function downloadDnaAsJson(config: TortillaConfiguration, lang: string = "es") {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const data = {
    app: "tortilladepatatas.org",
    version: "1.0",
    documentType: "Tortilla_DNA_Profile",
    timestamp: new Date().toISOString(),
    name: isEs ? "Mi ADN de Tortilla de Patatas" : isDe ? "Mein Tortilla-DNA-Profil" : "My Tortilla DNA Profile",
    ratios: {
      potatoPerEggGrams: config.calculatedProfile.potatoEggRatio,
      oilPerEggMl: config.calculatedProfile.oilEggRatio,
      ratioCategory: config.calculatedProfile.ratioCategory[isEs ? "es" : isDe ? "de" : "en"],
    },
    specifications: {
      panDiameterCm: config.calculatedProfile.recommendedPanSizeCm,
      servings: config.calculatedProfile.estimatedServings,
      potatoVariety: config.preferences.potatoVariety,
      potatoCut: config.preferences.potatoCut,
      texture: config.preferences.texture,
      potatoTechnique: config.preferences.potatoTechnique,
      fryingTempProfile: config.preferences.fryingTempProfile,
      recommendedFryingTempC: config.calculatedProfile.recommendedFryingTempC.formatted[isEs ? "es" : isDe ? "de" : "en"],
      estimatedCookingTime: config.calculatedProfile.estimatedPotatoCookingTimeMin.formatted[isEs ? "es" : isDe ? "de" : "en"],
    },
    ingredients: config.ingredients.map((ing) => ({
      entityId: ing.entityId,
      quantity: ing.quantity,
      unit: ing.unit,
      size: ing.size,
    })),
    thermodynamicSafety: {
      targetOptimal: "70°C for 2 minutes",
      targetFast: "63°C for 20 seconds",
      ambientLimitHours: 4,
      note: getSafetySummaryNotice(isEs ? "es" : isDe ? "de" : "en"),
    },
    stepByStepAdvice: config.calculatedProfile.cookingAdvice[isEs ? "es" : isDe ? "de" : "en"],
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `tortilla-adn-${config.calculatedProfile.potatoEggRatio}g.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Downloads a formatted printable kitchen markdown/text sheet.
 */
export function downloadDnaAsText(
  config: TortillaConfiguration,
  lang: string = "es",
  shareUrl: string = ""
) {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const adviceList = config.calculatedProfile.cookingAdvice[isEs ? "es" : isDe ? "de" : "en"];
  const ingsList = config.ingredients
    .map((i) => `- ${i.quantity}${i.unit} ${i.entityId} ${i.size ? `(${i.size})` : ""}`)
    .join("\n");

  const content = `=====================================================
🍳 FICHA TÉCNICA Y ADN TORTILLERO | tortilladepatatas.org
=====================================================
Fecha: ${new Date().toLocaleDateString()}
Ratio Fundamental: ${config.calculatedProfile.potatoEggRatio}g Patata / 1 Huevo
Clasificación: ${config.calculatedProfile.ratioCategory[isEs ? "es" : isDe ? "de" : "en"]}
Sartén Óptima: ${config.calculatedProfile.recommendedPanSizeCm} cm
Raciones: ${config.calculatedProfile.estimatedServings} personas

INGREDIENTES:
${ingsList}

PARÁMETROS FÍSICO-TÉRMICOS:
- Variedad de Patata: ${config.preferences.potatoVariety?.toUpperCase()}
- Tipo de Corte: ${config.preferences.potatoCut?.toUpperCase()}
- Perfil de Fritura: ${config.calculatedProfile.recommendedFryingTempC.formatted[isEs ? "es" : isDe ? "de" : "en"]}
- Tiempo de Confitado: ${config.calculatedProfile.estimatedPotatoCookingTimeMin.formatted[isEs ? "es" : isDe ? "de" : "en"]}
- Textura Buscada: ${config.preferences.texture?.toUpperCase()}

ESTÁNDAR DE SEGURIDAD ALIMENTARIA:
- Pasteurización Óptima: 70°C durante 2 minutos en el corazón de la tortilla
- Alternativa Rápida: 63°C durante 20 segundos
- Límite a temperatura ambiente: Máximo 4 horas

INSTRUCCIONES DE ELABORACIÓN:
${adviceList.map((step, idx) => `${idx + 1}. ${step}`).join("\n\n")}

ENLACE PERMANENTE AL ADN & COMPARADOR:
${shareUrl}
=====================================================`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ficha-adn-tortilla-${config.calculatedProfile.potatoEggRatio}g.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generates and downloads a complete Kitchen Notebook PDF specification of the Tortilla DNA.
 */
export async function downloadDnaAsPdf(
  config: TortillaConfiguration,
  lang: string = "es",
  shareUrl: string = ""
): Promise<void> {
  return exportRecipeToPdf({
    config,
    lang,
    shareUrl,
    filename: `tortilla-receta-adn-${config.calculatedProfile.potatoEggRatio}g.pdf`,
  });
}

/**
 * Renders and downloads a graphic PNG image card of the Tortilla DNA.
 */
export async function downloadDnaImage(
  config: TortillaConfiguration,
  lang: string = "es"
): Promise<void> {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const width = 1200;
  const height = 750;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background: Warm Parchment Texture
  ctx.fillStyle = "#FDFBF7";
  ctx.fillRect(0, 0, width, height);

  // Outer Border & Notebook Card Frame
  ctx.strokeStyle = "#E8E0D0";
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  ctx.strokeStyle = "#8D6E63";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(32, 32, width - 64, height - 64);

  // Header Banner
  ctx.fillStyle = "#FAF3E0";
  ctx.fillRect(36, 36, width - 72, 110);
  ctx.strokeStyle = "#E2D3B8";
  ctx.lineWidth = 1;
  ctx.strokeRect(36, 36, width - 72, 110);

  // Header Text
  ctx.fillStyle = "#8D6E63";
  ctx.font = "bold 16px sans-serif";
  ctx.fillText(
    isEs ? "REGISTRO CULINARIO OFICIAL • TORTILLADEPATATAS.ORG" : "OFFICIAL CULINARY REGISTER • TORTILLADEPATATAS.ORG",
    60,
    68
  );

  ctx.fillStyle = "#2D241E";
  ctx.font = "bold 34px serif";
  ctx.fillText(
    isEs ? "D.N.I. & FÓRMULA DE ADN TORTILLERO" : isDe ? "TORTILLA-DNA & REZEPT-PROFIL" : "TORTILLA DNA & CULINARY SPEC",
    60,
    115
  );

  // Golden DNA Badge on Top Right
  ctx.fillStyle = "#FFB800";
  ctx.beginPath();
  ctx.roundRect(width - 290, 56, 230, 68, 14);
  ctx.fill();

  ctx.fillStyle = "#1C1917";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText(isEs ? "RATIO FUNDAMENTAL" : "FUNDAMENTAL RATIO", width - 275, 82);
  ctx.font = "bold 26px sans-serif";
  ctx.fillText(`${config.calculatedProfile.potatoEggRatio}g / ${isEs ? "huevo" : "egg"}`, width - 275, 112);

  // 4 Metrics Panels
  const panels = [
    {
      title: isEs ? "SARTÉN RECOMENDADA" : "RECOMMENDED PAN",
      val: `${config.calculatedProfile.recommendedPanSizeCm} cm`,
      sub: `${config.calculatedProfile.estimatedServings} ${isEs ? "comensales" : "servings"}`,
      color: "#FAF6EE",
    },
    {
      title: isEs ? "PATATA & CORTE" : "POTATO & CUT",
      val: `${config.preferences.potatoVariety?.toUpperCase()}`,
      sub: `${config.preferences.potatoCut?.toUpperCase()}`,
      color: "#FAF6EE",
    },
    {
      title: isEs ? "OLEOSIDAD / HUEVO" : "OIL RATIO / EGG",
      val: `${config.calculatedProfile.oilEggRatio} ml`,
      sub: `${config.calculatedProfile.fatLevel} fat`,
      color: "#FAF6EE",
    },
    {
      title: isEs ? "TEXTURA & PUNTO" : "TEXTURE & CORE",
      val: `${config.preferences.texture?.toUpperCase()}`,
      sub: config.calculatedProfile.moistureLevel,
      color: "#FAF6EE",
    },
  ];

  panels.forEach((p, idx) => {
    const px = 60 + idx * 275;
    const py = 175;
    const pw = 255;
    const ph = 120;

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph, 12);
    ctx.fill();
    ctx.strokeStyle = "#E5DAC4";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#8D6E63";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText(p.title, px + 18, py + 32);

    ctx.fillStyle = "#1C1917";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText(p.val, px + 18, py + 70);

    ctx.fillStyle = "#78716C";
    ctx.font = "14px sans-serif";
    ctx.fillText(p.sub, px + 18, py + 98);
  });

  // Center Block: Ingredient Breakdown
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.roundRect(60, 320, 520, 260, 16);
  ctx.fill();
  ctx.strokeStyle = "#E8E2D5";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#2D241E";
  ctx.font = "bold 18px serif";
  ctx.fillText(isEs ? "Desglose de Ingredientes" : "Ingredient Breakdown", 85, 355);

  const eggIng = config.ingredients.find((i) => i.entityId === "egg");
  const potatoIng = config.ingredients.find((i) => i.entityId === "potato");
  const onionIng = config.ingredients.find((i) => i.entityId === "onion");

  const ingLines = [
    `🥚 ${eggIng?.quantity || 6} ${isEs ? "Huevos Camperos" : "Free-range eggs"} (${eggIng?.size || "L"})`,
    `🥔 ${potatoIng?.quantity || 600}g ${isEs ? "Patatas" : "Potatoes"} (${config.preferences.potatoVariety})`,
    `🫒 ${config.calculatedProfile.estimatedFryingOilMl}ml ${isEs ? "AOVE para fritura" : "EVOO for frying"}`,
    onionIng && onionIng.quantity > 0
      ? `🧅 ${onionIng.quantity}g ${isEs ? "Cebolla pochada" : "Poached onion"}`
      : `🚫 0g ${isEs ? "Cebolla (Estilo Concebollista: NO)" : "Onion (None)"}`,
  ];

  ctx.fillStyle = "#44403C";
  ctx.font = "16px sans-serif";
  ingLines.forEach((line, i) => {
    ctx.fillText(line, 85, 400 + i * 40);
  });

  // Right Block: Thermodynamics & Safety Standard
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.roundRect(610, 320, 530, 260, 16);
  ctx.fill();
  ctx.strokeStyle = "#E8E2D5";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#2D241E";
  ctx.font = "bold 18px serif";
  ctx.fillText(isEs ? "Termodinámica & Seguridad Sanitaria" : "Thermodynamics & Food Safety", 635, 355);

  ctx.fillStyle = "#2E7D32";
  ctx.font = "bold 16px sans-serif";
  ctx.fillText(isEs ? "🛡️ Estándar de Oro: 70°C durante 2 minutos" : "🛡️ Gold Safety Standard: 70°C for 2 minutes", 635, 395);

  ctx.fillStyle = "#57534E";
  ctx.font = "14px sans-serif";
  const safetyLines = [
    isEs ? "• Alternativa de pasteurización rápida: 63°C durante 20 segundos." : "• Rapid pasteurization threshold: 63°C for 20 seconds.",
    isEs ? "• Límite crítico ambiental: Máximo 4 horas a temperatura ambiente." : "• Critical ambient safety limit: Maximum 4 hours at room temp.",
    isEs ? `• Temperatura de sartén: ${config.calculatedProfile.recommendedFryingTempC.formatted.es}` : `• Pan temperature: ${config.calculatedProfile.recommendedFryingTempC.formatted.en}`,
    isEs ? `• Tiempo estimado de patatas: ${config.calculatedProfile.estimatedPotatoCookingTimeMin.formatted.es}` : `• Potato cook time: ${config.calculatedProfile.estimatedPotatoCookingTimeMin.formatted.en}`,
  ];

  safetyLines.forEach((s, idx) => {
    ctx.fillText(s, 635, 435 + idx * 30);
  });

  // Footer Watermark and QR/Comparison Note
  ctx.fillStyle = "#FAF6EE";
  ctx.fillRect(36, height - 120, width - 72, 84);
  ctx.strokeStyle = "#E2D3B8";
  ctx.lineWidth = 1;
  ctx.strokeRect(36, height - 120, width - 72, 84);

  ctx.fillStyle = "#8D6E63";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText(
    isEs ? "🔬 Creado y Certificado en tortilladepatatas.org/builder" : "🔬 Created and Certified at tortilladepatatas.org/builder",
    60,
    height - 75
  );

  ctx.fillStyle = "#78716C";
  ctx.font = "12px sans-serif";
  ctx.fillText(
    isEs
      ? "Compatible con el Comparador de ADN Culinario • Inocuidad, Ratios Normalizados por Huevo y Ciencia Gastronómica"
      : "Compatible with Culinary DNA Comparator • Food Safety, Normalized Per-Egg Ratios & Gastronomy Science",
    60,
    height - 52
  );

  // Trigger download of canvas image
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = `tortilla-adn-${config.calculatedProfile.potatoEggRatio}g.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
