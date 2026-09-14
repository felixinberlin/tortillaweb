export type SvgStudioLang = "es" | "en" | "de";

export interface SvgStudioTranslations {
  badgeSubtitle: string;
  title: string;
  description: string;
  downloadSvg: string;
  copiedSvg: string;
  copySvg: string;
  copiedDataUri: string;
  copyDataUri: string;
  livePreview: string;
  viewSkillet: string;
  viewPincho: string;
  viewDuo: string;
  dnaMetric: string;
  ratioPerEgg: string;
  donenessMetric: string;
  potatoMetric: string;
  exportTitle: string;
  exportDesc: string;
  titleInputLabel: string;
  titleInputPlaceholder: string;
  donenessSectionTitle: string;
  potatoCutSectionTitle: string;
  eggsSliderLabel: string;
  potatoesSliderLabel: string;
  onionToggleLabel: string;
  onionStyleCaramelized: string;
  onionStylePochada: string;
  onionStyleCrispy: string;
  extrasSectionTitle: string;
  showBadgeToggle: string;
  showSafetyBadgeToggle: string;
  safetyBadgeText: string;
  dnaBadgeText: string;
  animatedToggle: string;
  flipTortillaBtn: string;
  flippingText: string;
  donenessOptions: Record<string, { label: string; desc: string }>;
  potatoCutOptions: Record<string, { label: string; desc: string }>;
  extraIngredients: Record<string, string>;
  ingredientGalleryTitle: string;
  ingredientGalleryDesc: string;
  ingredientVisualModules: string;
  svgBadgeLabels: {
    skilletBadge: string;
    pinchoBadge: string;
    duoBadge: string;
    eggsUnit: string;
    gPerEggUnit: string;
  };
}

export const SVG_STUDIO_TRANSLATIONS: Record<SvgStudioLang, SvgStudioTranslations> = {
  es: {
    badgeSubtitle: "Motor SVG Vectorial Gastronómico",
    title: "Generador Paramétrico de Tortilla SVG",
    description:
      "Diseña y genera ilustraciones vectoriales SVG matemáticamente rigurosas basadas en la física del huevo, punto de cuajado, corte de patata, cebolla caramelizada y extras culinarios. Totalmente exportable en SVG y Data URI.",
    downloadSvg: "Descargar .SVG",
    copiedSvg: "SVG Copiado",
    copySvg: "Copiar Código SVG",
    copiedDataUri: "Data URI Copiado",
    copyDataUri: "Copiar Data URI",
    livePreview: "Vista Previa en Tiempo Real",
    viewSkillet: "🍳 Sartén",
    viewPincho: "📐 Corte Pincho",
    viewDuo: "✨ Dúo",
    dnaMetric: "ADN (Carga)",
    ratioPerEgg: "g / huevo",
    donenessMetric: "Cuajado",
    potatoMetric: "Patata",
    exportTitle: "Integración y Exportación",
    exportDesc:
      "Importa esta tortilla mediante import { generateTortillaSvg } from '@/domain/svg'; o utiliza el componente reactivo <TortillaSvgRenderer />.",
    titleInputLabel: "Título de la Tortilla",
    titleInputPlaceholder: "Nombre de la receta o variante...",
    donenessSectionTitle: "Punto de Cuajado (Textura del Huevo)",
    potatoCutSectionTitle: "Corte de la Patata",
    eggsSliderLabel: "Huevos",
    potatoesSliderLabel: "Patatas",
    onionToggleLabel: "🧅 Cebolla Pochada / Caramelizada",
    onionStyleCaramelized: "Caramelizada",
    onionStylePochada: "Pochada",
    onionStyleCrispy: "Crujiente",
    extrasSectionTitle: "Ingredientes Extra & Toppings",
    showBadgeToggle: "Cartela / Badge descriptivo",
    showSafetyBadgeToggle: "Badge Seguridad (**70°C durante 2 minutos**)",
    safetyBadgeText: "🛡️ **70°C durante 2 minutos** / **63°C durante 20 segundos**",
    dnaBadgeText: "🧬 ADN",
    animatedToggle: "💨 Animaciones Vivas (Vapor, Aceite, Yema)",
    flipTortillaBtn: "🔄 Dar la Vuelta a la Tortilla (Flip 3D)",
    flippingText: "¡Dando la vuelta...!",
    donenessOptions: {
      liquid: { label: "Líquida (Betanzos)", desc: "Núcleo de yema líquida volcánica dorada" },
      runny: { label: "Muy Poco Hecha", desc: "Fluidez cremosa con desgarro brillante" },
      melosa: { label: "Melosa / Jugosa", desc: "Textura cremosa y satinada con brillo de AOVE" },
      cuajada: { label: "Cuajada Clásica", desc: "Consistencia tradicional con costra dorada" },
      firme: { label: "Firme / Bocadillo", desc: "Compacta, tostado uniforme para viaje" },
    },
    potatoCutOptions: {
      panadera: { label: "Panadera", desc: "Rodajas finas tradicionales (3–5 mm)" },
      dados: { label: "Dados / Cubos", desc: "Trozos cúbicos dorados homogéneos" },
      chascada: { label: "Chascada Rústica", desc: "Rotura irregular que libera almidón" },
      paja: { label: "Paja / Straw", desc: "Tiras finas entrelazadas crujientes" },
      chips: { label: "Chips / Express", desc: "Wafers ondulados estilo vanguardia" },
    },
    extraIngredients: {
      chorizo: "Chorizo Riojano",
      jamon: "Jamón Ibérico",
      truffle: "Trufa Negra",
      sobrasada: "Sobrasada & Miel",
      cheese: "Queso Fundente",
      mushrooms: "Boletus / Setas",
      peppers: "Pimientos Piquillo",
      garlic: "Ajos / Ajetes",
      chickpea: "Vegana (Harina Garbanzo)",
    },
    ingredientGalleryTitle: "Micro-Ilustraciones Vectoriales de Ingredientes",
    ingredientGalleryDesc: "Módulos SVG independientes con 1 archivo por ingrediente, estados culinarios e integración directa.",
    ingredientVisualModules: "Ingredientes Vectoriales",
    svgBadgeLabels: {
      skilletBadge: "SARTÉN",
      pinchoBadge: "CORTE DE PINCHO",
      duoBadge: "SARTÉN & PINCHO",
      eggsUnit: "HUEVOS",
      gPerEggUnit: "g/h",
    },
  },
  en: {
    badgeSubtitle: "Gastronomic Vector SVG Engine",
    title: "Parametric Tortilla SVG Generator",
    description:
      "Design and generate mathematically rigorous vector SVG illustrations based on egg yolk fluid dynamics, coagulation levels, potato cuts, caramelized onions, and toppings. Fully exportable as SVG and Data URI.",
    downloadSvg: "Download .SVG",
    copiedSvg: "SVG Copied",
    copySvg: "Copy SVG Code",
    copiedDataUri: "Data URI Copied",
    copyDataUri: "Copy Data URI",
    livePreview: "Real-Time Vector Preview",
    viewSkillet: "🍳 Skillet",
    viewPincho: "📐 Pincho Wedge",
    viewDuo: "✨ Duo",
    dnaMetric: "DNA (Ratio)",
    ratioPerEgg: "g / egg",
    donenessMetric: "Doneness",
    potatoMetric: "Potato Cut",
    exportTitle: "Integration & Code Export",
    exportDesc:
      "Import this tortilla via import { generateTortillaSvg } from '@/domain/svg'; or render it dynamically with <TortillaSvgRenderer />.",
    titleInputLabel: "Tortilla Recipe Title",
    titleInputPlaceholder: "Recipe or custom variant name...",
    donenessSectionTitle: "Doneness & Coagulation Physics",
    potatoCutSectionTitle: "Potato Cut Geometry",
    eggsSliderLabel: "Eggs",
    potatoesSliderLabel: "Potatoes",
    onionToggleLabel: "🧅 Confit / Caramelized Onion",
    onionStyleCaramelized: "Caramelized",
    onionStylePochada: "Poached",
    onionStyleCrispy: "Crispy",
    extrasSectionTitle: "Extra Ingredients & Toppings",
    showBadgeToggle: "Descriptive Badge Label",
    showSafetyBadgeToggle: "Safety Standard Badge (**70°C for 2 minutes**)",
    safetyBadgeText: "🛡️ **70°C for 2 minutes** / **63°C for 20 seconds**",
    dnaBadgeText: "🧬 DNA",
    animatedToggle: "💨 Live Animations (Steam, Sizzle, Yolk Pulse)",
    flipTortillaBtn: "🔄 Flip Tortilla (3D Pan Flip)",
    flippingText: "Flipping pan...!",
    donenessOptions: {
      liquid: { label: "Liquid (Betanzos)", desc: "Molten golden lava core flowing freely" },
      runny: { label: "Runny / Soft", desc: "Glossy center with delicate egg flow" },
      melosa: { label: "Creamy / Melosa", desc: "Velvety custardy texture with olive oil sheen" },
      cuajada: { label: "Classic Set", desc: "Traditional firm consistency with golden crust" },
      firme: { label: "Firm / Sandwich", desc: "Solid, uniform toast for transport" },
    },
    potatoCutOptions: {
      panadera: { label: "Panadera (Round Slices)", desc: "Traditional 3–5 mm disks" },
      dados: { label: "Diced / Cubes", desc: "Evenly browned geometric cubes" },
      chascada: { label: "Rustic Cracked", desc: "Cracked chunks releasing starch" },
      paja: { label: "Shoestring (Paja)", desc: "Thin interwoven crispy strands" },
      chips: { label: "Potato Chips / Express", desc: "Wavy crisps avant-garde style" },
    },
    extraIngredients: {
      chorizo: "Riojan Chorizo",
      jamon: "Ibérico Cured Ham",
      truffle: "Black Truffle",
      sobrasada: "Sobrasada & Honey",
      cheese: "Melty Cheese",
      mushrooms: "Wild Mushrooms / Porcini",
      peppers: "Piquillo Peppers",
      garlic: "Garlic / Scallions",
      chickpea: "Vegan (Chickpea Flour)",
    },
    ingredientGalleryTitle: "Standalone Vector Ingredient Micro-Illustrations",
    ingredientGalleryDesc: "Independent SVG modules with 1 file per ingredient, culinary prep states, and direct UI component integration.",
    ingredientVisualModules: "Vector Ingredients",
    svgBadgeLabels: {
      skilletBadge: "SKILLET",
      pinchoBadge: "PINCHO WEDGE",
      duoBadge: "SKILLET & PINCHO",
      eggsUnit: "EGGS",
      gPerEggUnit: "g/egg",
    },
  },
  de: {
    badgeSubtitle: "Gastronomische SVG-Vektorengine",
    title: "Parametrischer Tortilla SVG-Generator",
    description:
      "Erstelle mathematisch präzise SVG-Vektorillustrationen basierend auf Ei-Gartemperaturen, Kartoffelschnitten, karamellisierten Zwiebeln und feinen Belägen. Vollständig exportierbar als SVG und Data URI.",
    downloadSvg: "SVG herunterladen",
    copiedSvg: "SVG kopiert",
    copySvg: "SVG-Code kopieren",
    copiedDataUri: "Data URI kopiert",
    copyDataUri: "Data URI kopieren",
    livePreview: "Echtzeit-Vorschau",
    viewSkillet: "🍳 Pfanne",
    viewPincho: "📐 Pincho-Schnitt",
    viewDuo: "✨ Duo-Ansicht",
    dnaMetric: "DNA (Mischung)",
    ratioPerEgg: "g / Ei",
    donenessMetric: "Garstufe",
    potatoMetric: "Kartoffelschnitt",
    exportTitle: "Integration & Code-Export",
    exportDesc:
      "Nutze diese Tortilla mit import { generateTortillaSvg } from '@/domain/svg'; oder binde sie direkt mit <TortillaSvgRenderer /> ein.",
    titleInputLabel: "Name der Tortilla",
    titleInputPlaceholder: "Rezepttitel oder Eigenkreation...",
    donenessSectionTitle: "Garstufe & Stockungspunkt",
    potatoCutSectionTitle: "Kartoffelschnitt-Geometrie",
    eggsSliderLabel: "Eier",
    potatoesSliderLabel: "Kartoffeln",
    onionToggleLabel: "🧅 Karamellisierte / Geschmorte Zwiebel",
    onionStyleCaramelized: "Karamellisiert",
    onionStylePochada: "Geschmort",
    onionStyleCrispy: "Knusprig",
    extrasSectionTitle: "Zusätzliche Zutaten & Toppings",
    showBadgeToggle: "Rezept-Plakette anzeigen",
    showSafetyBadgeToggle: "Sicherheitsstandard (**70°C für 2 Minuten**)",
    safetyBadgeText: "🛡️ **70°C für 2 Minuten** / **63°C für 20 Sekunden**",
    dnaBadgeText: "🧬 DNA",
    animatedToggle: "💨 Lebendige Animationen (Dampf, Öl-Glanz, Dotter)",
    flipTortillaBtn: "🔄 Tortilla wenden (3D Pfannen-Flip)",
    flippingText: "Wende die Pfanne...!",
    donenessOptions: {
      liquid: { label: "Flüssig (Betanzos)", desc: "Fließender Dotterkern mit glänzender Lava" },
      runny: { label: "Sehr saftig", desc: "Zarter, leicht flüssiger Kern" },
      melosa: { label: "Cremig / Melosa", desc: "Samtige Konsistenz mit feinstem Olivenölglanz" },
      cuajada: { label: "Klassisch gestockt", desc: "Traditionelle Festigkeit mit goldener Kruste" },
      firme: { label: "Fest / Sandwich", desc: "Kompakt und schnittfest für unterwegs" },
    },
    potatoCutOptions: {
      panadera: { label: "Panadera (Rundscheiben)", desc: "Klassische 3–5 mm Scheiben" },
      dados: { label: "Würfel", desc: "Gleichmäßige goldene Kartoffelwürfel" },
      chascada: { label: "Rustikal gebrochen", desc: "Unregelmäßig gekantet für Stärkeabgabe" },
      paja: { label: "Strohkartoffeln (Paja)", desc: "Feine, knusprig verflochtene Streifen" },
      chips: { label: "Kartoffelchips / Express", desc: "Gewellte Crisps nach Avantgarde-Art" },
    },
    extraIngredients: {
      chorizo: "Rioja-Chorizo",
      jamon: "Ibérico-Schinken",
      truffle: "Schwarzer Trüffel",
      sobrasada: "Sobrasada & Honig",
      cheese: "Schmelzkäse",
      mushrooms: "Steinpilze / Waldpilze",
      peppers: "Piquillo-Paprika",
      garlic: "Knoblauch / Frühlingszwiebeln",
      chickpea: "Vegan (Kichererbsenmehl)",
    },
    ingredientGalleryTitle: "Eigenständige Vektor-Zutatenillustrationen",
    ingredientGalleryDesc: "Unabhängige SVG-Module mit 1 Datei pro Zutat, kulinarischen Zubereitungszuständen und React-Integration.",
    ingredientVisualModules: "Vektor-Zutaten",
    svgBadgeLabels: {
      skilletBadge: "PFANNE",
      pinchoBadge: "PINCHO-SCHNITT",
      duoBadge: "PFANNE & PINCHO",
      eggsUnit: "EIER",
      gPerEggUnit: "g/Ei",
    },
  },
};

export function getSvgStudioTranslations(lang: string = "es"): SvgStudioTranslations {
  const safeLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";
  return SVG_STUDIO_TRANSLATIONS[safeLang];
}
