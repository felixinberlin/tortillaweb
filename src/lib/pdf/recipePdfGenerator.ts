import { jsPDF } from "jspdf";
import type { TortillaConfiguration } from "@/domain/builder/types";
import type { RawRecipeInput } from "@/lib/translator/types";
import { getIngredientModifier } from "@/domain/builder/ingredientRegistry";

export interface GeneratePdfOptions {
  config?: TortillaConfiguration;
  recipe?: RawRecipeInput;
  lang?: string;
  shareUrl?: string;
  filename?: string;
}

/**
 * Creates a jsPDF document instance with Kitchen-Notebook styling for a recipe.
 * Can be used in both browser and headless/test environments.
 */
export function createRecipePdfDocument(options: GeneratePdfOptions): { doc: jsPDF; filename: string } {
  const { config, recipe, lang = "es", shareUrl = "", filename } = options;

  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm

  let currentY = margin;

  // Helper to ensure page bounds
  const checkAddPage = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 18) {
      drawFooter();
      doc.addPage();
      currentY = margin + 8;
      drawRunningHeader();
    }
  };

  const drawRunningHeader = () => {
    doc.setFillColor(245, 230, 190); // #F5E6BE Frit Potato Cream
    doc.rect(margin, currentY - 6, contentWidth, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(141, 110, 99); // #8D6E63 Umber
    doc.text(
      "tortilladepatatas.org  |  FICHA TÉCNICA Y CUADERNO DE COCINA",
      margin + 2,
      currentY - 2.5
    );
    currentY += 4;
  };

  const drawFooter = () => {
    const footerY = pageHeight - 10;
    doc.setDrawColor(231, 229, 228);
    doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(141, 110, 99);
    const footerNote = isEs
      ? "Documento técnico culinario generado por tortilladepatatas.org — Estándar Sanitario 70°C por 2 minutos"
      : isDe
      ? "Kulinarisches Dokument generiert von tortilladepatatas.org — Sicherheitsstandard 70°C für 2 Minuten"
      : "Technical culinary document by tortilladepatatas.org — Food safety standard 70°C for 2 minutes";
    doc.text(footerNote, margin, footerY + 1);

    const pageNumText = `${doc.getNumberOfPages()}`;
    doc.text(pageNumText, pageWidth - margin - 5, footerY + 1);
  };

  // --- BRAND HEADER ---
  // Top warm accent band
  doc.setFillColor(255, 184, 0); // #FFB800 Runny Yolk Gold
  doc.rect(margin, currentY, contentWidth, 3, "F");
  currentY += 6;

  // Header Box
  doc.setFillColor(253, 251, 247); // Warm parchment off-white
  doc.setDrawColor(245, 230, 190);
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, "FD");

  // Logo Badge text
  doc.setFillColor(141, 110, 99); // Umber
  doc.roundedRect(margin + 4, currentY + 3.5, 48, 5, 1, 1, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text("TORTILLADEPATATAS.ORG", margin + 6, currentY + 7);

  // Subtitle / Date
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 113, 108);
  const now = new Date();
  const dateStr = now.toLocaleDateString(isEs ? "es-ES" : isDe ? "de-DE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(dateStr, pageWidth - margin - 35, currentY + 7);

  // Main Title
  let recipeTitle = isEs ? "Fórmula de Tortilla de Patatas" : isDe ? "Tortilla-Rezept" : "Spanish Omelette Recipe";
  let recipeSubtitle = "";

  if (config) {
    const eggs = config.ingredients.find((i) => i.entityId === "egg")?.quantity || 6;
    const potatoes = config.ingredients.find((i) => i.entityId === "potato")?.quantity || 600;
    const categoryName = config.calculatedProfile.ratioCategory[isEs ? "es" : isDe ? "de" : "en"];
    
    recipeTitle = isEs
      ? `Mi Tortilla de Patatas (${potatoes}g • ${eggs} Huevos)`
      : isDe
      ? `Mein Tortilla-Rezept (${potatoes}g • ${eggs} Eier)`
      : `My Custom Tortilla (${potatoes}g • ${eggs} Eggs)`;
      
    recipeSubtitle = `${isEs ? "Clasificación:" : isDe ? "Kategorie:" : "Category:"} ${categoryName}  |  Ratio: ${config.calculatedProfile.potatoEggRatio}g ${isEs ? "patata/huevo" : isDe ? "Kartoffel/Ei" : "potato/egg"}  |  Sartén: ${config.calculatedProfile.recommendedPanSizeCm} cm`;
  } else if (recipe) {
    recipeTitle = recipe.name || (isEs ? "Receta Clásica" : "Classic Recipe");
    recipeSubtitle = recipe.description || "";
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(28, 25, 23); // Almost black
  doc.text(doc.splitTextToSize(recipeTitle, contentWidth - 10)[0], margin + 4, currentY + 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(120, 113, 108);
  doc.text(doc.splitTextToSize(recipeSubtitle, contentWidth - 10)[0], margin + 4, currentY + 20);

  currentY += 27;

  // --- KEY METRICS TILES (4 tiles) ---
  const tileGap = 3;
  const tileWidth = (contentWidth - tileGap * 3) / 4;
  const tileHeight = 16;

  const getMetricData = () => {
    if (config) {
      return [
        {
          label: isEs ? "RATIO PATATA/HUEVO" : isDe ? "VERHÄLTNIS" : "POTATO/EGG RATIO",
          val: `${config.calculatedProfile.potatoEggRatio}g / huevo`,
          sub: config.calculatedProfile.ratioCategory[isEs ? "es" : isDe ? "de" : "en"],
        },
        {
          label: isEs ? "SARTÉN RECOMENDADA" : isDe ? "PFANNENGRÖSSE" : "RECOMMENDED PAN",
          val: `Ø ${config.calculatedProfile.recommendedPanSizeCm} cm`,
          sub: isEs ? "Grosor equilibrado" : isDe ? "Optimale Dicke" : "Optimal thickness",
        },
        {
          label: isEs ? "RACIONES" : isDe ? "PORTIONEN" : "SERVINGS",
          val: `${config.calculatedProfile.estimatedServings} ${isEs ? "comensales" : isDe ? "Portionen" : "servings"}`,
          sub: isEs ? "Porción estándar" : isDe ? "Standard" : "Standard",
        },
        {
          label: isEs ? "TEMPERATURA FRITURA" : isDe ? "BRAT-TEMPERATUR" : "FRYING TEMP",
          val: config.calculatedProfile.recommendedFryingTempC.formatted[isEs ? "es" : isDe ? "de" : "en"],
          sub: config.calculatedProfile.estimatedPotatoCookingTimeMin.formatted[isEs ? "es" : isDe ? "de" : "en"],
        },
      ];
    } else if (recipe) {
      return [
        {
          label: isEs ? "TIEMPO PREPARACIÓN" : isDe ? "VORBEREITUNG" : "PREP TIME",
          val: `${recipe.prepTimeMinutes || 15} min`,
          sub: isEs ? "Corte y preparación" : isDe ? "Schneiden" : "Cutting & prep",
        },
        {
          label: isEs ? "TIEMPO COCCIÓN" : isDe ? "KOCHZEIT" : "COOK TIME",
          val: `${recipe.cookTimeMinutes || 20} min`,
          sub: isEs ? "Confitado y cuajado" : isDe ? "Frittieren" : "Frying & set",
        },
        {
          label: isEs ? "RACIONES" : isDe ? "PORTIONEN" : "SERVINGS",
          val: `${recipe.yieldServings || 4} ${isEs ? "personas" : isDe ? "Portionen" : "servings"}`,
          sub: isEs ? "Raciones estimadas" : isDe ? "Standard" : "Yield",
        },
        {
          label: isEs ? "TIEMPO TOTAL" : isDe ? "GESAMTZEIT" : "TOTAL TIME",
          val: `${recipe.totalTimeMinutes || (recipe.prepTimeMinutes || 15) + (recipe.cookTimeMinutes || 20)} min`,
          sub: isEs ? "Fuego a mesa" : isDe ? "Bereit zum Servieren" : "Ready to serve",
        },
      ];
    }
    return [];
  };

  const metrics = getMetricData();
  metrics.forEach((m, idx) => {
    const tileX = margin + idx * (tileWidth + tileGap);
    doc.setFillColor(250, 248, 245);
    doc.setDrawColor(231, 229, 228);
    doc.roundedRect(tileX, currentY, tileWidth, tileHeight, 1.5, 1.5, "FD");

    // Top subtle bar
    doc.setFillColor(255, 184, 0); // Gold
    doc.rect(tileX + 1, currentY, tileWidth - 2, 0.8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.setTextColor(141, 110, 99);
    doc.text(m.label, tileX + 2.5, currentY + 4.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(28, 25, 23);
    doc.text(doc.splitTextToSize(m.val, tileWidth - 4)[0], tileX + 2.5, currentY + 9.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(120, 113, 108);
    doc.text(doc.splitTextToSize(m.sub, tileWidth - 4)[0], tileX + 2.5, currentY + 13.5);
  });

  currentY += tileHeight + 4;

  // --- MANDATORY THERMODYNAMIC & FOOD SAFETY CALLOUT BOX ---
  // Mandatory bolding: 70°C, 63°C, 2 minutes, 20 seconds, and 4 hours
  doc.setFillColor(240, 249, 244); // Soft safe green background
  doc.setDrawColor(46, 125, 50); // Safe Green #2E7D32
  doc.roundedRect(margin, currentY, contentWidth, 16, 1.5, 1.5, "FD");

  // Shield icon or badge indicator
  doc.setFillColor(46, 125, 50);
  doc.circle(margin + 6, currentY + 8, 3.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text("OK", margin + 4.2, currentY + 9.2);

  // Safety heading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(46, 125, 50);
  doc.text(
    isEs
      ? "ESTÁNDAR DE SEGURIDAD ALIMENTARIA & PASTEURIZACIÓN TÉRMICA:"
      : isDe
      ? "LEBENSMITTELSICHERHEITSSTANDARD & THERMISCHE PASTEURISIERUNG:"
      : "FOOD SAFETY STANDARD & THERMAL PASTEURIZATION:",
    margin + 12,
    currentY + 5.5
  );

  // Safety text with mandatory bold figures
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.2);
  doc.setTextColor(28, 25, 23);

  const safetyBody = isEs
    ? "• Estándar de oro sanitario: 70°C durante 2 minutos en el corazón para inocuidad total frente a Salmonella.\n• Alternativa térmica segura: 63°C durante 20 segundos. Límite ambiente: máximo 4 horas antes de refrigerar (<8°C)."
    : isDe
    ? "• Goldstandard: 70°C für 2 Minuten im Kern für absolute Salmonellenfreiheit.\n• Schnelle Alternative: 63°C für 20 Sekunden. Raumtemperaturgrenze: maximal 4 Stunden vor Kühlung (<8°C)."
    : "• Gold standard: 70°C for 2 minutes at core for total safety against Salmonella.\n• Rapid alternative: 63°C for 20 seconds. Ambient limit: maximum 4 hours before refrigeration (<8°C).";

  doc.text(safetyBody, margin + 12, currentY + 10);
  currentY += 19;

  // --- TWO COLUMN SECTION: INGREDIENTS (LEFT) & TECH SPECS (RIGHT) ---
  const colGap = 4;
  const colWidth = (contentWidth - colGap) / 2; // 89mm each
  const colStartY = currentY;

  // 1. INGREDIENTS LIST
  doc.setFillColor(141, 110, 99); // Umber
  doc.roundedRect(margin, currentY, colWidth, 6, 1, 1, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(
    isEs ? "INGREDIENTES & MEDIDAS" : isDe ? "ZUTATEN & MENGEN" : "INGREDIENTS & PROPORTIONS",
    margin + 3,
    currentY + 4.2
  );

  let ingY = currentY + 9;
  const ingredientsList: string[] = [];

  if (config) {
    for (const ing of config.ingredients) {
      let name = ing.entityId;
      if (ing.entityId === "egg") {
        name = isEs ? "Huevos frescos" : isDe ? "Frische Eier" : "Fresh eggs";
        if (ing.size) name += ` (Talla ${ing.size.toUpperCase()})`;
      } else if (ing.entityId === "potato") {
        name = isEs
          ? `Patatas (Var. ${config.preferences.potatoVariety?.toUpperCase() || "Monalisa"})`
          : isDe
          ? `Kartoffeln (${config.preferences.potatoVariety || "Monalisa"})`
          : `Potatoes (${config.preferences.potatoVariety || "Monalisa"})`;
      } else if (ing.entityId === "oil") {
        name = isEs ? "Aceite de oliva virgen extra (AOVE)" : isDe ? "Natives Olivenöl extra" : "Extra virgin olive oil";
      } else if (ing.entityId === "onion") {
        name = isEs ? "Cebolla (pochada lentamente)" : isDe ? "Zwiebel (sanft pochiert)" : "Onion (slow confit)";
      } else {
        const mod = getIngredientModifier(ing.entityId);
        if (mod) name = isEs ? mod.name.es : isDe ? mod.name.de : mod.name.en;
      }
      ingredientsList.push(`${ing.quantity}${ing.unit === "unit" ? "" : ing.unit} ${name}`);
    }

    if (!config.ingredients.some((i) => i.entityId === "salt")) {
      ingredientsList.push(isEs ? "4g Sal fina (al gusto)" : isDe ? "4g Feines Salz" : "4g Fine salt (to taste)");
    }
  } else if (recipe && recipe.ingredients) {
    ingredientsList.push(...recipe.ingredients);
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(40, 35, 30);

  ingredientsList.forEach((ing) => {
    // Check box outline
    doc.setDrawColor(180, 160, 140);
    doc.rect(margin + 2, ingY - 2.5, 2.8, 2.8);

    const split = doc.splitTextToSize(ing, colWidth - 8);
    doc.text(split, margin + 7, ingY);
    ingY += split.length * 3.8 + 1;
  });

  const ingHeight = ingY - colStartY;

  // 2. TECHNICAL SPECS (RIGHT COLUMN)
  doc.setFillColor(255, 184, 0); // Gold
  doc.roundedRect(margin + colWidth + colGap, colStartY, colWidth, 6, 1, 1, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(28, 25, 23);
  doc.text(
    isEs ? "PERFIL CULINARIO & FÍSICO" : isDe ? "KULINARISCHES PROFIL" : "CULINARY & PHYSICAL PROFILE",
    margin + colWidth + colGap + 3,
    colStartY + 4.2
  );

  let specY = colStartY + 9;
  const specItems: { label: string; desc: string }[] = [];

  if (config) {
    specItems.push(
      {
        label: isEs ? "Corte de Patata:" : isDe ? "Schnittart:" : "Potato Cut:",
        desc: `${config.preferences.potatoCut?.toUpperCase() || "PANADERA"} (grosor regular ~2-3mm)`,
      },
      {
        label: isEs ? "Técnica de Patata:" : isDe ? "Gar-Technik:" : "Technique:",
        desc: `${config.preferences.potatoTechnique?.toUpperCase() || "POCHADA"} (${config.calculatedProfile.recommendedFryingTempC.formatted[isEs ? "es" : "en"]})`,
      },
      {
        label: isEs ? "Aceite Absorbido:" : isDe ? "Ölaufnahme:" : "Oil Absorbed:",
        desc: `~${config.calculatedProfile.estimatedAbsorbedOilMl} ml en fritura (~${config.calculatedProfile.oilEggRatio} ml/huevo)`,
      },
      {
        label: isEs ? "Textura Buscada:" : isDe ? "Textur:" : "Texture Style:",
        desc: `${config.preferences.texture?.toUpperCase() || "JUGOSA"} — ${config.calculatedProfile.textureNote[isEs ? "es" : isDe ? "de" : "en"]}`,
      },
      {
        label: isEs ? "Comportamiento Almidón:" : isDe ? "Stärkeverhalten:" : "Starch Behavior:",
        desc: config.calculatedProfile.starchBehaviorNote[isEs ? "es" : isDe ? "de" : "en"],
      }
    );
  } else if (recipe) {
    specItems.push(
      {
        label: isEs ? "Autor / Publicación:" : isDe ? "Autor:" : "Author / Source:",
        desc: recipe.authorName || "tortilladepatatas.org",
      },
      {
        label: isEs ? "Categoría Gastronómica:" : isDe ? "Kategorie:" : "Cuisine:",
        desc: `${recipe.category || "Plato Principal"} • ${recipe.cuisine || "Española"}`,
      },
      {
        label: isEs ? "Seguridad Microbiológica:" : isDe ? "Mikrobiologische Sicherheit:" : "Microbial Safety:",
        desc: isEs
          ? "Pasteurización a 70°C por 2 minutos o 63°C por 20 segundos"
          : "Pasteurization at 70°C for 2 minutes or 63°C for 20 seconds",
      }
    );
  }

  specItems.forEach((item) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(141, 110, 99);
    doc.text(item.label, margin + colWidth + colGap + 2, specY);
    specY += 3.4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.2);
    doc.setTextColor(40, 35, 30);
    const split = doc.splitTextToSize(item.desc, colWidth - 5);
    doc.text(split, margin + colWidth + colGap + 2, specY);
    specY += split.length * 3.3 + 2;
  });

  const specHeight = specY - colStartY;
  currentY = colStartY + Math.max(ingHeight, specHeight) + 4;

  // --- STEP-BY-STEP COOKING INSTRUCTIONS ---
  checkAddPage(20);

  doc.setFillColor(141, 110, 99); // Umber
  doc.roundedRect(margin, currentY, contentWidth, 6, 1, 1, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(
    isEs
      ? "PASO A PASO: INSTRUCCIONES DE ELABORACIÓN"
      : isDe
      ? "SCHRITT-FÜR-SCHRITT ZUBEREITUNG"
      : "STEP-BY-STEP COOKING INSTRUCTIONS",
    margin + 3,
    currentY + 4.2
  );
  currentY += 9;

  const instructions: string[] = [];
  if (config) {
    instructions.push(...config.calculatedProfile.cookingAdvice[isEs ? "es" : isDe ? "de" : "en"]);
  } else if (recipe && recipe.instructions) {
    recipe.instructions.forEach((inst) => {
      if (typeof inst === "string") {
        instructions.push(inst);
      } else {
        instructions.push(`${inst.step ? `${inst.step}: ` : ""}${inst.text}`);
      }
    });
  }

  instructions.forEach((step, index) => {
    // Estimate text height
    const cleanStep = step.replace(/\*\*(.*?)\*\*/g, "$1");
    const splitLines = doc.splitTextToSize(cleanStep, contentWidth - 14);
    const stepHeight = splitLines.length * 4 + 3;

    checkAddPage(stepHeight + 2);

    // Step Number Badge
    doc.setFillColor(245, 230, 190); // Cream
    doc.setDrawColor(255, 184, 0); // Gold
    doc.circle(margin + 4, currentY + 2, 3.2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(141, 110, 99);
    doc.text(`${index + 1}`, margin + 2.8, currentY + 3.2);

    // Step text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(28, 25, 23);
    doc.text(splitLines, margin + 11, currentY + 2.5);

    currentY += stepHeight;
  });

  // --- PERMANENT LINK / DNA RECOVERY BOX ---
  if (shareUrl) {
    checkAddPage(14);
    doc.setFillColor(250, 248, 245);
    doc.setDrawColor(231, 229, 228);
    doc.roundedRect(margin, currentY, contentWidth, 10, 1, 1, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(141, 110, 99);
    doc.text(isEs ? "ENLACE PERMANENTE AL ADN:" : "PERMANENT DNA LINK:", margin + 3, currentY + 4);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.8);
    doc.setTextColor(0, 163, 255); // #00A3FF Pilot Light Blue
    const splitLink = doc.splitTextToSize(shareUrl, contentWidth - 6);
    doc.text(splitLink[0], margin + 3, currentY + 7.5);
    currentY += 13;
  }

  // Draw final page footer
  drawFooter();

  const defaultFilename = filename
    ? `${filename.replace(/\.pdf$/i, "")}.pdf`
    : config
    ? `tortilla-receta-${config.calculatedProfile.potatoEggRatio}g-patata.pdf`
    : "receta-tortilla-de-patatas.pdf";

  return { doc, filename: defaultFilename };
}

/**
 * Generates and triggers the download of a Kitchen-Notebook styled PDF recipe.
 * 100% client-side and offline capable (works even if user's connection drops).
 */
export async function exportRecipeToPdf(options: GeneratePdfOptions): Promise<{ doc: jsPDF; filename: string }> {
  const { doc, filename } = createRecipePdfDocument(options);
  try {
    if (typeof doc.save === "function") {
      doc.save(filename);
    }
  } catch {
    // Headless or Node environments without browser Blob/File APIs
  }
  return { doc, filename };
}
