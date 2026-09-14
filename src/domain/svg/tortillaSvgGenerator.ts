import type {
  TortillaSvgOptions,
  DonenessLevel,
  PotatoCut,
  IngredientExtraId,
  OnionConfig,
  SvgPresentationView,
} from "./types";
import { getSvgStudioTranslations, type SvgStudioLang } from "./i18n";

/**
 * Escapes XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Normalizes onion configuration
 */
function normalizeOnion(onion?: OnionConfig | boolean): {
  hasOnion: boolean;
  style: "none" | "caramelized" | "pochada" | "crispy";
  quantityG: number;
} {
  if (typeof onion === "boolean") {
    return {
      hasOnion: onion,
      style: onion ? "caramelized" : "none",
      quantityG: onion ? 100 : 0,
    };
  }
  if (onion && typeof onion === "object") {
    return {
      hasOnion: Boolean(onion.present),
      style: onion.style || (onion.present ? "caramelized" : "none"),
      quantityG: onion.quantityG || (onion.present ? 100 : 0),
    };
  }
  return { hasOnion: false, style: "none", quantityG: 0 };
}

/**
 * Normalizes extras list into a fast Set with comprehensive synonym mapping
 */
function normalizeExtras(extras?: (IngredientExtraId | string)[]): Set<string> {
  const set = new Set<string>();
  if (!extras) return set;
  for (const item of extras) {
    if (typeof item === "string") {
      const raw = item.toLowerCase().trim();
      set.add(raw);
      // Map synonyms and variants
      if (raw.includes("chorizo")) set.add("chorizo");
      if (raw.includes("jamon") || raw.includes("ham") || raw.includes("iberico")) {
        set.add("jamon");
        set.add("ham");
      }
      if (raw.includes("truffle") || raw.includes("trufa")) {
        set.add("truffle");
        set.add("trufa");
      }
      if (raw.includes("pepper") || raw.includes("pimiento") || raw.includes("piquillo")) {
        set.add("peppers");
        set.add("pimientos");
        set.add("piquillo");
      }
      if (raw.includes("cheese") || raw.includes("queso")) {
        set.add("cheese");
        set.add("queso");
      }
      if (raw.includes("mushroom") || raw.includes("setas") || raw.includes("champinon")) {
        set.add("mushrooms");
        set.add("setas");
      }
      if (raw.includes("sobrasada")) set.add("sobrasada");
      if (raw.includes("atun") || raw.includes("tuna") || raw.includes("bonito")) set.add("atun");
      if (raw.includes("bacalao") || raw.includes("cod")) set.add("bacalao");
      if (raw.includes("garlic") || raw.includes("ajo") || raw.includes("ajetes")) set.add("garlic");
      if (raw.includes("miel") || raw.includes("honey")) set.add("miel");
      if (raw.includes("chickpea") || raw.includes("vegana") || raw.includes("garbanzo")) set.add("chickpea");
      if (raw.includes("chips")) set.add("chips");
    }
  }
  return set;
}

// ---------------------------------------------------------------------------
// DATA MAPS & LOOKUP TABLES
// ---------------------------------------------------------------------------

interface DonenessPalette {
  yolkGlowStart: string;
  yolkGlowMid: string;
  yolkGlowEnd: string;
  crustColor: string;
  shineOpacity: number;
  isRunny: boolean;
  isSuperRunny: boolean;
}

const DONENESS_PALETTES: Record<DonenessLevel, DonenessPalette> = {
  liquid: {
    yolkGlowStart: "#FFF9C4",
    yolkGlowMid: "#FFB800",
    yolkGlowEnd: "#EA580C",
    crustColor: "#CA8A04",
    shineOpacity: 0.95,
    isRunny: true,
    isSuperRunny: true,
  },
  runny: {
    yolkGlowStart: "#FFFBEB",
    yolkGlowMid: "#FFB300",
    yolkGlowEnd: "#F57C00",
    crustColor: "#D97706",
    shineOpacity: 0.9,
    isRunny: true,
    isSuperRunny: false,
  },
  melosa: {
    yolkGlowStart: "#FEF08A",
    yolkGlowMid: "#FACC15",
    yolkGlowEnd: "#D97706",
    crustColor: "#B45309",
    shineOpacity: 0.75,
    isRunny: false,
    isSuperRunny: false,
  },
  jugosa: {
    yolkGlowStart: "#FEF08A",
    yolkGlowMid: "#FACC15",
    yolkGlowEnd: "#D97706",
    crustColor: "#B45309",
    shineOpacity: 0.75,
    isRunny: false,
    isSuperRunny: false,
  },
  cuajada: {
    yolkGlowStart: "#FEF9C3",
    yolkGlowMid: "#EAB308",
    yolkGlowEnd: "#B45309",
    crustColor: "#92400E",
    shineOpacity: 0.5,
    isRunny: false,
    isSuperRunny: false,
  },
  firme: {
    yolkGlowStart: "#FDE047",
    yolkGlowMid: "#D97706",
    yolkGlowEnd: "#78350F",
    crustColor: "#78350F",
    shineOpacity: 0.35,
    isRunny: false,
    isSuperRunny: false,
  },
  bocadillo: {
    yolkGlowStart: "#FDE047",
    yolkGlowMid: "#D97706",
    yolkGlowEnd: "#78350F",
    crustColor: "#78350F",
    shineOpacity: 0.35,
    isRunny: false,
    isSuperRunny: false,
  },
};

const DEFAULT_DONENESS_PALETTE = DONENESS_PALETTES.melosa;

function getDonenessColors(doneness: DonenessLevel): DonenessPalette {
  return DONENESS_PALETTES[doneness] || DEFAULT_DONENESS_PALETTE;
}

interface RenderContext {
  title: string;
  subtitle?: string;
  eggCount: number;
  potatoWeightG: number;
  potatoCut: PotatoCut;
  potatoCooking: string;
  doneness: DonenessLevel;
  onionConfig: { hasOnion: boolean; style: string; quantityG: number };
  extras: Set<string>;
  ratioGPerEgg: number;
  donenessPalette: DonenessPalette;
  theme: string;
  showBadge: boolean;
  showSafetyBadge: boolean;
  showDnaMetrics: boolean;
  animated: boolean;
  animatedFlip: boolean;
  lang: SvgStudioLang;
  svgId: string;
}

// ---------------------------------------------------------------------------
// MASTER CSS ANIMATION STYLES (SMIL & Keyframe Engine)
// ---------------------------------------------------------------------------

function getSvgAnimationStyles(svgId: string, animated: boolean, animatedFlip: boolean): string {
  if (!animated && !animatedFlip) return "";

  return `
    <style>
      @media (prefers-reduced-motion: no-preference) {
        ${
          animated
            ? `
        /* Organic Steam Wafts */
        .${svgId}_steam1 {
          animation: ${svgId}_steamFloat1 4.2s ease-in-out infinite;
          transform-origin: 225px 110px;
        }
        .${svgId}_steam2 {
          animation: ${svgId}_steamFloat2 5.0s ease-in-out infinite 0.7s;
          transform-origin: 265px 105px;
        }
        .${svgId}_steam3 {
          animation: ${svgId}_steamFloat3 4.6s ease-in-out infinite 1.4s;
          transform-origin: 300px 115px;
        }
        @keyframes ${svgId}_steamFloat1 {
          0% { transform: translate(0, 0) scale(0.95); opacity: 0.1; }
          40% { transform: translate(-5px, -18px) scale(1.15); opacity: 0.45; }
          100% { transform: translate(4px, -36px) scale(1.35); opacity: 0; }
        }
        @keyframes ${svgId}_steamFloat2 {
          0% { transform: translate(0, 0) scale(0.9); opacity: 0.12; }
          45% { transform: translate(6px, -20px) scale(1.2); opacity: 0.55; }
          100% { transform: translate(-4px, -42px) scale(1.4); opacity: 0; }
        }
        @keyframes ${svgId}_steamFloat3 {
          0% { transform: translate(0, 0) scale(0.95); opacity: 0.1; }
          40% { transform: translate(-6px, -16px) scale(1.12); opacity: 0.4; }
          100% { transform: translate(5px, -35px) scale(1.3); opacity: 0; }
        }

        /* Molten Liquid Yolk Glow & Breathing */
        .${svgId}_yolkPulse {
          animation: ${svgId}_yolkBreathe 3.5s ease-in-out infinite alternate;
          transform-origin: 258px 196px;
        }
        @keyframes ${svgId}_yolkBreathe {
          0% { transform: scale(0.98); opacity: 0.92; filter: drop-shadow(0 0 4px #FFB800); }
          100% { transform: scale(1.03); opacity: 1; filter: drop-shadow(0 0 10px #FF8A00); }
        }

        /* Specular Light Highlights */
        .${svgId}_shimmer {
          animation: ${svgId}_shimmerEffect 3.8s ease-in-out infinite;
        }
        @keyframes ${svgId}_shimmerEffect {
          0%, 100% { opacity: 0.85; transform: translate(0, 0); }
          50% { opacity: 1; transform: translate(1px, -1px); }
        }

        /* EVOO Glistening Droplets */
        .${svgId}_oilGlisten1 {
          animation: ${svgId}_oilSparkle 2.6s ease-in-out infinite alternate;
        }
        .${svgId}_oilGlisten2 {
          animation: ${svgId}_oilSparkle 3.2s ease-in-out infinite alternate 0.9s;
        }
        @keyframes ${svgId}_oilSparkle {
          0% { opacity: 0.65; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1.18); }
        }

        /* Sliced Pincho Cascading Lava Flow */
        .${svgId}_lavaWaterfall {
          animation: ${svgId}_lavaDripFlow 3.6s ease-in-out infinite;
          transform-origin: 220px 250px;
        }
        @keyframes ${svgId}_lavaDripFlow {
          0%, 100% { transform: scaleY(0.98); opacity: 0.92; }
          50% { transform: scaleY(1.04); opacity: 1; filter: drop-shadow(0 2px 6px #FF8A00); }
        }
        `
            : ""
        }

        ${
          animatedFlip
            ? `
        /* 3D Skillet Volteo Flip */
        .${svgId}_flipContainer {
          animation: ${svgId}_panFlipKeyframe 1.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: 260px 200px;
        }
        @keyframes ${svgId}_panFlipKeyframe {
          0% { transform: translateY(0) scale(1) rotate(0deg); }
          35% { transform: translateY(-45px) scale(1.08) rotate(180deg); }
          75% { transform: translateY(6px) scale(0.98) rotate(360deg); }
          100% { transform: translateY(0) scale(1) rotate(360deg); }
        }
        `
            : ""
        }
      }
    </style>
  `;
}

// ---------------------------------------------------------------------------
// VIEW RENDERERS MAP (Strategy Pattern)
// ---------------------------------------------------------------------------

const VIEW_RENDERERS: Record<SvgPresentationView, (ctx: RenderContext) => string> = {
  skillet_top: renderSkilletTopView,
  sliced_pincho: renderSlicedPinchoView,
  duo_pan_slice: renderDuoPanSliceView,
  skillet_isometric: renderSkilletTopView,
};

// ---------------------------------------------------------------------------
// MAIN SVG GENERATION FUNCTION
// ---------------------------------------------------------------------------

export function generateTortillaSvg(options: TortillaSvgOptions = {}): string {
  const {
    title = "Tortilla Española",
    subtitle,
    eggCount = 6,
    potatoWeightG = 600,
    potatoCut = "panadera",
    potatoCooking = "pochada",
    doneness = "melosa",
    presentation = "skillet_top",
    theme = "kitchen_dark",
    showBadge = true,
    showSafetyBadge = false,
    showDnaMetrics = false,
    animated = true,
    animatedFlip = false,
    lang = "es",
    width = 600,
    height = 400,
  } = options;

  const onionConfig = normalizeOnion(options.onion);
  const extras = normalizeExtras(options.extras);
  const ratioGPerEgg = eggCount > 0 ? Math.round(potatoWeightG / eggCount) : 100;
  const donenessPalette = getDonenessColors(doneness);
  const svgId = options.id || `tortilla_svg_${Math.random().toString(36).substring(2, 9)}`;
  const safeLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";

  const renderView = VIEW_RENDERERS[presentation] || VIEW_RENDERERS.skillet_top;

  const content = renderView({
    title,
    subtitle,
    eggCount,
    potatoWeightG,
    potatoCut,
    potatoCooking,
    doneness,
    onionConfig,
    extras,
    ratioGPerEgg,
    donenessPalette,
    theme,
    showBadge,
    showSafetyBadge,
    showDnaMetrics,
    animated,
    animatedFlip,
    lang: safeLang,
    svgId,
  });

  const svgTag = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none" role="img" aria-label="${escapeXml(title)}">
${content}
</svg>`;

  if (options.omitXmlDeclaration) {
    return svgTag;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n${svgTag}`;
}

// ---------------------------------------------------------------------------
// 1. TOP-DOWN SKILLET VIEW (Photorealistic Skeuomorphic Cast Iron & Tortilla)
// ---------------------------------------------------------------------------

function renderSkilletTopView(ctx: RenderContext): string {
  const {
    title,
    potatoCut,
    doneness,
    onionConfig,
    extras,
    donenessPalette,
    theme,
    showBadge,
    showSafetyBadge,
    showDnaMetrics,
    ratioGPerEgg,
    eggCount,
    animated,
    animatedFlip,
    lang,
    svgId,
  } = ctx;

  const bgFill = theme === "warm_parchment" ? "#F5E6BE" : theme === "clean_minimal" ? "none" : "#1C1917";
  const boardFill = theme === "warm_parchment" ? "#EFE3C3" : "#2A1810";
  const boardBorder = theme === "warm_parchment" ? "#D8C7A0" : "#4A2818";
  const isVegan = extras.has("chickpea") || extras.has("vegana");

  const i18n = getSvgStudioTranslations(lang);
  const badgeLabels = i18n.svgBadgeLabels;

  return `
  <defs>
    ${getSvgAnimationStyles(svgId, animated, animatedFlip)}

    <!-- Multi-Layer Heavy Pan Drop Shadow with Ambient Occlusion -->
    <filter id="${svgId}_panShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#0A0500" floodOpacity="0.65" />
      <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.45" />
    </filter>

    <!-- Food Gloss Highlight -->
    <filter id="${svgId}_foodGloss" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <!-- Molten Core Liquid Glow -->
    <filter id="${svgId}_lavaGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Cast Iron Outer Flange & Rim Gradients -->
    <radialGradient id="${svgId}_ironFlange" cx="42%" cy="38%" r="62%">
      <stop offset="0%" stopColor="#44403C" />
      <stop offset="45%" stopColor="#292524" />
      <stop offset="85%" stopColor="#1C1917" />
      <stop offset="100%" stopColor="#0C0A09" />
    </radialGradient>

    <linearGradient id="${svgId}_ironRimBevel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#78716C" />
      <stop offset="25%" stopColor="#44403C" />
      <stop offset="70%" stopColor="#1C1917" />
      <stop offset="100%" stopColor="#292524" />
    </linearGradient>

    <!-- Beechwood Pan Handle with Brass & Rivets -->
    <linearGradient id="${svgId}_woodHandle" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#A16207" />
      <stop offset="35%" stopColor="#78350F" />
      <stop offset="70%" stopColor="#451A03" />
      <stop offset="100%" stopColor="#1C0A00" />
    </linearGradient>

    <!-- Master Golden Tortilla Custard Surface Base -->
    <radialGradient id="${svgId}_tortillaBase" cx="44%" cy="40%" r="60%">
      <stop offset="0%" stopColor="${donenessPalette.yolkGlowStart}" />
      <stop offset="45%" stopColor="${donenessPalette.yolkGlowMid}" />
      <stop offset="82%" stopColor="${donenessPalette.yolkGlowEnd}" />
      <stop offset="100%" stopColor="#92400E" />
    </radialGradient>

    <!-- Maillard Browning Spots -->
    <radialGradient id="${svgId}_toastedSpot" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#D97706" stopOpacity="0.85" />
      <stop offset="60%" stopColor="#92400E" stopOpacity="0.75" />
      <stop offset="100%" stopColor="#451A03" stopOpacity="0" />
    </radialGradient>

    <!-- Molten Runny Yolk Center Pool (Betanzos / Liquid) -->
    <radialGradient id="${svgId}_runnyPool" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stopColor="#FFFDE7" />
      <stop offset="20%" stopColor="#FFC800" />
      <stop offset="65%" stopColor="#FF8A00" />
      <stop offset="90%" stopColor="#E65100" />
      <stop offset="100%" stopColor="#B45309" />
    </radialGradient>
  </defs>

  <!-- Background Base -->
  ${theme !== "clean_minimal" ? `<rect width="600" height="400" fill="${bgFill}" />` : ""}

  <!-- Wooden Kitchen Prep Board -->
  ${
    theme !== "clean_minimal"
      ? `
  <g filter="url(#${svgId}_panShadow)">
    <rect x="20" y="20" width="560" height="360" rx="20" fill="${boardFill}" stroke="${boardBorder}" stroke-width="3" />
    <!-- End-Grain Wood Texture Lines -->
    <path d="M 60 20 L 60 380 M 140 20 L 140 380 M 220 20 L 220 380 M 300 20 L 300 380 M 380 20 L 380 380 M 460 20 L 460 380 M 540 20 L 540 380" stroke="${boardBorder}" stroke-width="1.5" opacity="0.35" />
  </g>
  `
      : ""
  }

  <!-- Outer Skillet Group (with 3D Flip animation support) -->
  <g class="${animatedFlip ? `${svgId}_flipContainer` : ""}">

  <!-- Skillet Handle (Heavy Forged Iron Shank + Turned Beechwood Grip) -->
  <g filter="url(#${svgId}_panShadow)">
    <!-- Forged Iron Shank Connector -->
    <path d="M 370 188 L 430 184 L 430 216 L 370 212 Z" fill="#1C1917" stroke="#44403C" stroke-width="1.5" />
    <circle cx="395" cy="194" r="3" fill="#57534E" />
    <circle cx="395" cy="206" r="3" fill="#57534E" />

    <!-- Turned Wooden Grip -->
    <path d="M 425 182 L 558 172 C 572 172 578 185 578 200 C 578 215 572 228 558 228 L 425 218 Z" fill="url(#${svgId}_woodHandle)" stroke="#1C0A00" stroke-width="1.5" />
    <!-- Woodgrain Luster Highlights -->
    <path d="M 435 186 C 475 180 525 180 555 184" stroke="#D97706" stroke-width="1.2" fill="none" opacity="0.75" />
    <!-- Hanging Ring Eyelet at Handle Tip -->
    <circle cx="550" cy="200" r="7.5" fill="#0C0A09" stroke="#78716C" stroke-width="1.5" />
    <circle cx="550" cy="200" r="4.5" fill="${boardFill}" />
  </g>

  <!-- Heavy Cast Iron Skillet Body -->
  <g filter="url(#${svgId}_panShadow)">
    <!-- Outer Iron Flange Rim -->
    <circle cx="260" cy="200" r="148" fill="url(#${svgId}_ironRimBevel)" stroke="#0C0A09" stroke-width="2" />
    <circle cx="260" cy="200" r="142" fill="url(#${svgId}_ironFlange)" />
    <!-- Deep Pan Inner Wall Shadow Ring -->
    <circle cx="260" cy="200" r="132" fill="#0C0A09" />
    <circle cx="260" cy="200" r="128" fill="#1C1917" stroke="#44403C" stroke-width="1" />
  </g>

  <!-- ==================== TORTILLA SURFACE ==================== -->
  <g>
    <!-- Organic Natural Swollen Edge Tucking into the Pan (Slightly irregular) -->
    <path d="M 260 74 C 330 73 386 130 386 200 C 386 270 330 326 260 326 C 190 326 134 270 134 200 C 134 130 190 75 260 74 Z" 
          fill="url(#${svgId}_tortillaBase)" />

    <!-- Cooked Egg Crust Maillard Browning Zones & Toasted Blisters -->
    <ellipse cx="225" cy="165" rx="55" ry="36" fill="url(#${svgId}_toastedSpot)" transform="rotate(-15 225 165)" />
    <ellipse cx="305" cy="235" rx="58" ry="38" fill="url(#${svgId}_toastedSpot)" transform="rotate(25 305 235)" />
    <ellipse cx="205" cy="245" rx="42" ry="26" fill="url(#${svgId}_toastedSpot)" transform="rotate(-30 205 245)" />
    <ellipse cx="310" cy="150" rx="38" ry="24" fill="url(#${svgId}_toastedSpot)" transform="rotate(10 310 150)" />

    <!-- Edge Caramelization Ring (Where egg touches sizzling cast iron) -->
    <path d="M 142 170 C 135 210 148 265 190 300 C 235 330 295 325 340 295 C 380 260 388 200 375 160" 
          stroke="#78350F" 
          stroke-width="5" 
          fill="none" 
          opacity="0.6" 
          stroke-linecap="round" />

    <!-- POTATO LAYER BASED ON CUT STYLE -->
    ${renderRealisticPotatoCut(potatoCut, 260, 200, svgId)}

    <!-- CARAMELIZED ONION STRANDS -->
    ${onionConfig.hasOnion ? renderRealisticOnion(onionConfig.style, 260, 200, svgId) : ""}

    <!-- EXTRA TOPPINGS (Chorizo, Jamón, Truffle, etc.) -->
    ${renderRealisticExtras(extras, 260, 200, svgId)}

    <!-- DONENESS CENTER DOME / RUNNY LAVA -->
    ${
      !isVegan && (donenessPalette.isRunny || donenessPalette.isSuperRunny)
        ? `
    <!-- High-Gloss Molten Runny Yolk Volcano Center -->
    <g class="${animated ? `${svgId}_yolkPulse` : ""}">
      <ellipse cx="258" cy="196" rx="48" ry="42" fill="url(#${svgId}_runnyPool)" filter="url(#${svgId}_lavaGlow)" stroke="#EA580C" stroke-width="1.5" />
      <ellipse cx="258" cy="196" rx="38" ry="32" fill="#FFB800" opacity="0.9" />

      <!-- Studio Softbox Specular Highlight Curve on Molten Yolk -->
      <path class="${animated ? `${svgId}_shimmer` : ""}" d="M 240 178 C 255 170 278 174 286 186 C 274 180 252 180 240 186 Z" fill="#FFFFFF" opacity="${donenessPalette.shineOpacity}" filter="url(#${svgId}_foodGloss)" />
      <ellipse class="${animated ? `${svgId}_shimmer` : ""}" cx="248" cy="182" rx="5" ry="2.5" fill="#FFFFFF" opacity="0.95" transform="rotate(-15 248 182)" />
      <circle cx="276" cy="198" r="2.5" fill="#FFFFFF" opacity="0.8" />
      <circle cx="260" cy="214" r="2" fill="#FFFFFF" opacity="0.75" />
    </g>
    `
        : `
    <!-- Creamy Custardy / Melosa Golden Center -->
    <g>
      <ellipse cx="252" cy="192" rx="34" ry="26" fill="#FACC15" opacity="0.9" />
      <ellipse cx="252" cy="192" rx="24" ry="18" fill="#FEF08A" opacity="0.8" />
      <path class="${animated ? `${svgId}_shimmer` : ""}" d="M 238 184 C 248 178 262 180 268 188" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.75" />
    </g>
    `
    }

    <!-- Sizzling Extra Virgin Olive Oil Glistening Droplets -->
    <g class="${animated ? `${svgId}_oilGlisten1` : ""}">
      <circle cx="180" cy="165" r="3.5" fill="#84CC16" opacity="0.9" />
      <circle cx="180" cy="165" r="1.5" fill="#FFFFFF" />
      <circle cx="330" cy="175" r="4" fill="#EAB308" opacity="0.9" />
      <circle cx="330" cy="175" r="1.5" fill="#FFFFFF" />
    </g>
    <g class="${animated ? `${svgId}_oilGlisten2` : ""}">
      <circle cx="265" cy="255" r="3" fill="#84CC16" opacity="0.9" />
      <circle cx="218" cy="130" r="3.5" fill="#EAB308" opacity="0.9" />
      <circle cx="312" cy="245" r="2.5" fill="#84CC16" opacity="0.9" />
    </g>

    <!-- Flakes of Pyramidal Flor de Sal Scattered on Top -->
    <polygon points="215,185 218,182 221,185 218,188" fill="#FFFFFF" opacity="0.95" />
    <polygon points="295,160 298,157 301,160 298,163" fill="#FFFFFF" opacity="0.95" />
    <polygon points="275,235 278,232 281,235 278,238" fill="#FFFFFF" opacity="0.9" />
    <polygon points="230,225 232,223 234,225 232,227" fill="#FFFFFF" opacity="0.9" />

    <!-- Sizzling Aromatic Steam Wafts -->
    <g>
      <path class="${animated ? `${svgId}_steam1` : ""}" d="M 225 110 Q 215 85 232 65" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.3" filter="url(#${svgId}_foodGloss)" />
      <path class="${animated ? `${svgId}_steam2` : ""}" d="M 265 105 Q 282 80 268 55" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.35" filter="url(#${svgId}_foodGloss)" />
      <path class="${animated ? `${svgId}_steam3` : ""}" d="M 300 115 Q 312 90 296 70" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.25" filter="url(#${svgId}_foodGloss)" />
    </g>
  </g>

  </g> <!-- End of Skillet Flip Group -->

  <!-- BADGE AND OVERLAY INFO -->
  ${
    showBadge
      ? `
  <g id="${svgId}_badge" filter="url(#${svgId}_panShadow)">
    <rect x="35" y="322" width="450" height="46" rx="12" fill="#F5E6BE" stroke="#8D6E63" stroke-width="2" />
    <rect x="39" y="326" width="442" height="38" rx="10" fill="#FAF4E8" stroke="#D7CCC8" stroke-width="1" />

    <text x="52" y="348" fill="#3E2723" font-size="14" font-weight="bold" font-family="Georgia, serif">
      ${escapeXml(title.length > 32 ? title.slice(0, 30) + "…" : title)}
    </text>

    <text x="52" y="360" fill="#8D6E63" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">
      ${doneness.toUpperCase()} • ${potatoCut.toUpperCase()} • ${eggCount} ${badgeLabels.eggsUnit} (${ratioGPerEgg}${badgeLabels.gPerEggUnit})
    </text>

    ${
      showSafetyBadge
        ? `
    <rect x="330" y="331" width="142" height="28" rx="6" fill="#2E7D32" />
    <text x="401" y="349" text-anchor="middle" fill="#FFFFFF" font-size="9" font-weight="bold" font-family="system-ui, sans-serif">
      ${escapeXml(i18n.safetyBadgeText)}
    </text>
    `
        : showDnaMetrics
        ? `
    <rect x="348" y="331" width="124" height="28" rx="6" fill="#FFB800" />
    <text x="410" y="349" text-anchor="middle" fill="#1C1917" font-size="10" font-weight="extrabold" font-family="system-ui, sans-serif">
      ${escapeXml(i18n.dnaBadgeText)} ${ratioGPerEgg}${badgeLabels.gPerEggUnit}
    </text>
    `
        : ""
    }
  </g>
  `
      : ""
  }
  `;
}

// ---------------------------------------------------------------------------
// 2. SLICED PINCHO (3D CROSS-SECTION WEDGE ON ARTISANAL BREAD & PARCHMENT)
// ---------------------------------------------------------------------------

function renderSlicedPinchoView(ctx: RenderContext): string {
  const {
    title,
    doneness,
    onionConfig,
    extras,
    donenessPalette,
    theme,
    showBadge,
    ratioGPerEgg,
    eggCount,
    animated,
    lang,
    svgId,
  } = ctx;

  const bgFill = theme === "warm_parchment" ? "#F5E6BE" : theme === "clean_minimal" ? "none" : "#1C1917";
  const i18n = getSvgStudioTranslations(lang);
  const badgeLabels = i18n.svgBadgeLabels;

  return `
  <defs>
    ${getSvgAnimationStyles(svgId, animated, false)}

    <!-- Master Drop Shadow with Warm Ambient Occlusion -->
    <filter id="${svgId}_pinchoShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1C0A00" floodOpacity="0.5" />
      <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.3" />
    </filter>

    <filter id="${svgId}_lavaGloss" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <!-- Top Caramelized Crust Gradient -->
    <linearGradient id="${svgId}_crustTop3D" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#F59E0B" />
      <stop offset="35%" stopColor="#D97706" />
      <stop offset="75%" stopColor="#B45309" />
      <stop offset="100%" stopColor="#78350F" />
    </linearGradient>

    <!-- Exposed Interior Custard Cross-Section -->
    <linearGradient id="${svgId}_custardCore" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="${donenessPalette.yolkGlowStart}" />
      <stop offset="40%" stopColor="${donenessPalette.yolkGlowMid}" />
      <stop offset="85%" stopColor="${donenessPalette.yolkGlowEnd}" />
      <stop offset="100%" stopColor="#B45309" />
    </linearGradient>

    <!-- Molten Yolk Liquid Flow Stream Gradient -->
    <linearGradient id="${svgId}_liquidYolkFlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FFF9C4" />
      <stop offset="30%" stopColor="#FFB800" />
      <stop offset="70%" stopColor="#FF8A00" />
      <stop offset="100%" stopColor="#EA580C" />
    </linearGradient>

    <!-- Crusty Bread Slice Gradient (Pan de Pueblo) -->
    <linearGradient id="${svgId}_breadCrust" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#D97706" />
      <stop offset="50%" stopColor="#92400E" />
      <stop offset="100%" stopColor="#451A03" />
    </linearGradient>

    <radialGradient id="${svgId}_breadCrumb" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#FFFBEB" />
      <stop offset="60%" stopColor="#FEF3C7" />
      <stop offset="100%" stopColor="#FDE68A" />
    </radialGradient>
  </defs>

  <!-- Background Base -->
  ${theme !== "clean_minimal" ? `<rect width="600" height="400" fill="${bgFill}" />` : ""}

  <!-- Artisanal Greaseproof Kitchen Parchment Paper Underneath -->
  <g filter="url(#${svgId}_pinchoShadow)">
    <polygon points="65,110 520,70 550,290 85,325" fill="#F5E6BE" stroke="#D8C7A0" stroke-width="2" />
    <polygon points="75,118 510,80 538,280 95,315" fill="#FFFDF8" stroke="#EFE3C3" stroke-width="1" opacity="0.9" />
    <!-- Faint Vintage Newsprint / Notebook Grid Lines on Paper -->
    <line x1="120" y1="120" x2="480" y2="85" stroke="#D8C7A0" stroke-width="1" stroke-dasharray="4 4" opacity="0.5" />
    <line x1="125" y1="150" x2="485" y2="115" stroke="#D8C7A0" stroke-width="1" stroke-dasharray="4 4" opacity="0.5" />
    <line x1="130" y1="180" x2="490" y2="145" stroke="#D8C7A0" stroke-width="1" stroke-dasharray="4 4" opacity="0.5" />
  </g>

  <!-- Artisanal Crusty Rustic Bread Slice (Pan de Pueblo) Supporting the Pincho -->
  <g filter="url(#${svgId}_pinchoShadow)">
    <!-- Bread Outer Crust Ring -->
    <ellipse cx="250" cy="275" rx="140" ry="42" fill="url(#${svgId}_breadCrust)" stroke="#451A03" stroke-width="2" transform="rotate(-8 250 275)" />
    <!-- Bread Open-Crumb Interior Base -->
    <ellipse cx="250" cy="272" rx="130" ry="35" fill="url(#${svgId}_breadCrumb)" stroke="#D97706" stroke-width="1" transform="rotate(-8 250 272)" />
    <!-- Alveoli (Air Pockets in Bread Crumb) -->
    <ellipse cx="180" cy="270" rx="8" ry="4" fill="#D97706" opacity="0.4" />
    <ellipse cx="220" cy="280" rx="12" ry="5" fill="#D97706" opacity="0.35" />
    <ellipse cx="320" cy="265" rx="10" ry="5" fill="#D97706" opacity="0.4" />
    <ellipse cx="360" cy="260" rx="7" ry="3.5" fill="#D97706" opacity="0.35" />
  </g>

  <!-- ==================== 3D PINCHO WEDGE ==================== -->
  <g id="${svgId}_pinchoWedge" filter="url(#${svgId}_pinchoShadow)">
    <!-- 1. Top Caramelized Crust (Curved Wedge Crown) -->
    <path d="M 160 145 C 240 120 340 100 400 95 C 430 140 450 175 460 205 C 380 230 280 250 220 260 Z" 
          fill="url(#${svgId}_crustTop3D)" 
          stroke="#78350F" 
          stroke-width="2" />

    <!-- Top Crust Blisters & Toasted Maillard Marks -->
    <ellipse cx="280" cy="160" rx="42" ry="18" fill="#78350F" opacity="0.45" transform="rotate(-15 280 160)" />
    <ellipse cx="355" cy="140" rx="34" ry="14" fill="#451A03" opacity="0.35" transform="rotate(10 355 140)" />
    <ellipse cx="210" cy="180" rx="26" ry="12" fill="#92400E" opacity="0.4" transform="rotate(-20 210 180)" />

    <!-- 2. Left Exposed Cut Face (Custard + Layered Sliced Potatoes) -->
    <path d="M 160 145 L 220 260 L 220 295 L 160 185 Z" 
          fill="url(#${svgId}_custardCore)" 
          stroke="#B45309" 
          stroke-width="1.5" />

    <!-- 3. Right Exposed Front Cut Face (Main Cross-Section) -->
    <path d="M 220 260 L 460 205 L 460 240 L 220 295 Z" 
          fill="url(#${svgId}_custardCore)" 
          stroke="#B45309" 
          stroke-width="1.5" />

    <!-- ================= LAYERED INGREDIENTS IN CROSS SECTION ================= -->
    <!-- Tender Confit Potato Slices Embedded in Cut Face -->
    <!-- Slice 1 (Top Left) -->
    <ellipse cx="190" cy="195" rx="22" ry="9" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.2" transform="rotate(25 190 195)" />
    <ellipse cx="190" cy="195" rx="16" ry="6" fill="#FFFBEB" opacity="0.75" transform="rotate(25 190 195)" />

    <!-- Slice 2 (Bottom Left) -->
    <ellipse cx="200" cy="240" rx="18" ry="8" fill="#FDE047" stroke="#CA8A04" stroke-width="1.2" transform="rotate(-15 200 240)" />

    <!-- Slice 3 (Center Front) -->
    <ellipse cx="270" cy="270" rx="28" ry="10" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.2" transform="rotate(-10 270 270)" />
    <ellipse cx="270" cy="270" rx="20" ry="7" fill="#FFFBEB" opacity="0.75" transform="rotate(-10 270 270)" />

    <!-- Slice 4 (Center Mid) -->
    <ellipse cx="350" cy="245" rx="30" ry="11" fill="#FDE047" stroke="#CA8A04" stroke-width="1.2" transform="rotate(12 350 245)" />

    <!-- Slice 5 (Right Edge) -->
    <ellipse cx="420" cy="225" rx="22" ry="9" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.2" transform="rotate(-18 420 225)" />

    <!-- ONION STRANDS IN CROSS-SECTION -->
    ${
      onionConfig.hasOnion
        ? `
    <path d="M 180 175 Q 200 200 215 185" stroke="#8D6E63" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M 240 270 Q 290 255 330 268" stroke="#8D6E63" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M 340 240 Q 380 230 420 240" stroke="#8D6E63" stroke-width="3.5" fill="none" stroke-linecap="round" />
    `
        : ""
    }

    <!-- EXTRAS EMBEDDED IN CROSS-SECTION -->
    ${
      extras.has("chorizo")
        ? `
    <circle cx="250" cy="255" r="13" fill="#DC2626" stroke="#7F1D1D" stroke-width="2" />
    <circle cx="248" cy="253" r="3" fill="#FEF2F2" />
    <circle cx="390" cy="230" r="12" fill="#B91C1C" stroke="#7F1D1D" stroke-width="2" />
    `
        : ""
    }
    ${
      extras.has("jamon") || extras.has("ham")
        ? `
    <path d="M 240 250 Q 275 242 300 260" stroke="#991B1B" stroke-width="5" fill="none" stroke-linecap="round" />
    <path d="M 330 235 Q 365 225 395 240" stroke="#991B1B" stroke-width="4.5" fill="none" stroke-linecap="round" />
    `
        : ""
    }
    ${
      extras.has("truffle") || extras.has("trufa")
        ? `
    <ellipse cx="295" cy="255" rx="9" ry="4.5" fill="#18181B" stroke="#FFB800" stroke-width="1" />
    <ellipse cx="365" cy="235" rx="8" ry="4" fill="#18181B" stroke="#FFB800" stroke-width="1" />
    `
        : ""
    }
    ${
      extras.has("cheese") || extras.has("queso")
        ? `
    <path d="M 270 258 Q 290 262 315 255 Q 300 270 280 265 Z" fill="#FEF08A" opacity="0.9" />
    <path d="M 360 238 Q 385 242 405 235" stroke="#FEF9C3" stroke-width="4" fill="none" stroke-linecap="round" />
    `
        : ""
    }
    ${
      extras.has("peppers") || extras.has("pimientos") || extras.has("piquillo")
        ? `
    <path d="M 230 262 Q 255 270 275 258" stroke="#EF4444" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M 350 248 Q 375 240 395 252" stroke="#22C55E" stroke-width="3.5" fill="none" stroke-linecap="round" />
    `
        : ""
    }
    ${
      extras.has("mushrooms") || extras.has("setas")
        ? `
    <ellipse cx="280" cy="245" rx="10" ry="5" fill="#573a2e" stroke="#3d281f" stroke-width="1.2" transform="rotate(-15 280 245)" />
    <ellipse cx="370" cy="245" rx="9" ry="4.5" fill="#573a2e" stroke="#3d281f" stroke-width="1.2" transform="rotate(20 370 245)" />
    `
        : ""
    }
    ${
      extras.has("sobrasada")
        ? `
    <circle cx="260" cy="265" r="8" fill="#EA580C" opacity="0.9" />
    <circle cx="345" cy="245" r="7" fill="#C2410C" opacity="0.9" />
    `
        : ""
    }

    <!-- ================= MOLTEN YOLK LAVA WATERFALL ================= -->
    ${
      donenessPalette.isRunny || donenessPalette.isSuperRunny
        ? `
    <g class="${animated ? `${svgId}_lavaWaterfall` : ""}">
      <!-- Cascading Liquid Yolk River Down the Front Tip Onto Bread -->
      <path d="M 215 250 C 215 270 205 295 218 310 C 235 320 260 315 255 295 C 252 278 238 265 225 250 Z" 
            fill="url(#${svgId}_liquidYolkFlow)" 
            stroke="#EA580C" 
            stroke-width="1.5" 
            filter="url(#${svgId}_lavaGloss)" />
      
      <!-- Yolk Puddle Spilling on Bread & Parchment -->
      <path d="M 200 305 Q 240 330 300 310 Q 330 318 310 298 Q 260 285 200 305 Z" fill="#FFB800" opacity="0.95" />
      
      <!-- Glossy Specular Highlights on Flowing Yolk Waterfall -->
      <path d="M 214 270 C 212 285 214 298 220 304" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.9" />
      <ellipse cx="245" cy="308" rx="16" ry="6" fill="#FFFBEB" opacity="0.75" />
      <circle cx="218" cy="282" r="2" fill="#FFFFFF" />
    </g>
    `
        : ""
    }

    <!-- Wooden Pincho Skewer / Toothpick Stuck in Center -->
    <path d="M 330 65 L 338 140" stroke="#D7CCC8" stroke-width="4" stroke-linecap="round" />
    <path d="M 330 65 L 332 140" stroke="#FFFFFF" stroke-width="1.5" opacity="0.75" />
  </g>

  <!-- Glistening Extra Virgin Olive Oil Drizzle & Flaky Salt on Wedge -->
  <g class="${animated ? `${svgId}_oilGlisten1` : ""}">
    <circle cx="310" cy="210" r="3.5" fill="#84CC16" opacity="0.9" />
    <circle cx="310" cy="210" r="1.5" fill="#FFFFFF" />
    <circle cx="215" cy="175" r="4" fill="#EAB308" opacity="0.9" />
  </g>
  <polygon points="345,150 348,147 351,150 348,153" fill="#FFFFFF" opacity="0.95" />
  <polygon points="265,175 268,172 271,175 268,178" fill="#FFFFFF" opacity="0.95" />

  <!-- BADGE AND OVERLAY INFO -->
  ${
    showBadge
      ? `
  <g id="${svgId}_badge" filter="url(#${svgId}_pinchoShadow)">
    <rect x="35" y="322" width="530" height="46" rx="12" fill="#F5E6BE" stroke="#8D6E63" stroke-width="2" />
    <rect x="39" y="326" width="522" height="38" rx="10" fill="#FAF4E8" stroke="#D7CCC8" stroke-width="1" />

    <text x="52" y="348" fill="#3E2723" font-size="14" font-weight="bold" font-family="Georgia, serif">
      ${escapeXml(title.length > 34 ? title.slice(0, 32) + "…" : title)}
    </text>

    <text x="52" y="360" fill="#8D6E63" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">
      ${badgeLabels.pinchoBadge} • ${doneness.toUpperCase()} • ${eggCount} ${badgeLabels.eggsUnit} (${ratioGPerEgg}${badgeLabels.gPerEggUnit})
    </text>
  </g>
  `
      : ""
  }
  `;
}

// ---------------------------------------------------------------------------
// 3. DUO PAN + SLICE COMBINED VIEW
// ---------------------------------------------------------------------------

function renderDuoPanSliceView(ctx: RenderContext): string {
  const {
    title,
    potatoCut,
    doneness,
    onionConfig,
    extras,
    donenessPalette,
    theme,
    showBadge,
    ratioGPerEgg,
    eggCount,
    animated,
    lang,
    svgId,
  } = ctx;

  const bgFill = theme === "warm_parchment" ? "#F5E6BE" : theme === "clean_minimal" ? "none" : "#1C1917";
  const i18n = getSvgStudioTranslations(lang);
  const badgeLabels = i18n.svgBadgeLabels;

  return `
  <defs>
    ${getSvgAnimationStyles(svgId, animated, false)}

    <radialGradient id="${svgId}_panGlowDuo" cx="44%" cy="40%" r="60%">
      <stop offset="0%" stopColor="${donenessPalette.yolkGlowStart}" />
      <stop offset="50%" stopColor="${donenessPalette.yolkGlowMid}" />
      <stop offset="85%" stopColor="${donenessPalette.yolkGlowEnd}" />
      <stop offset="100%" stopColor="#92400E" />
    </radialGradient>
    <filter id="${svgId}_duoShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.5" />
    </filter>
  </defs>

  <!-- Background Base -->
  ${theme !== "clean_minimal" ? `<rect width="600" height="400" fill="${bgFill}" />` : ""}

  <!-- Left: Sizzling Pan -->
  <g transform="translate(-60, -5)" filter="url(#${svgId}_duoShadow)">
    <circle cx="230" cy="190" r="128" fill="#1C1917" stroke="#44403C" stroke-width="4" />
    <circle cx="230" cy="190" r="115" fill="url(#${svgId}_panGlowDuo)" />
    ${renderRealisticPotatoCut(potatoCut, 230, 190, svgId)}
    ${onionConfig.hasOnion ? renderRealisticOnion(onionConfig.style, 230, 190, svgId) : ""}
    ${renderRealisticExtras(extras, 230, 190, svgId)}
    ${
      donenessPalette.isRunny
        ? `
    <g class="${animated ? `${svgId}_yolkPulse` : ""}">
      <circle cx="230" cy="190" r="32" fill="#FFB800" stroke="#FF8A00" stroke-width="1.5" />
      <ellipse cx="222" cy="182" rx="10" ry="5" fill="#FFFFFF" opacity="0.85" transform="rotate(-20 222 182)" />
    </g>
    `
        : ""
    }
  </g>

  <!-- Right: Sliced Pincho on Ceramic Plate -->
  <g transform="translate(135, 10)" filter="url(#${svgId}_duoShadow)">
    <ellipse cx="320" cy="200" rx="125" ry="85" fill="#FAF8F5" stroke="#E5E0D8" stroke-width="4" />
    <ellipse cx="320" cy="200" rx="108" ry="70" fill="#FFFFFF" stroke="#F0EBE1" stroke-width="2" />
    <!-- Pincho wedge -->
    <polygon points="260,165 370,135 405,195 295,225" fill="#F59E0B" stroke="#78350F" stroke-width="2" />
    <polygon points="260,165 295,225 295,250 260,190" fill="#FEF08A" stroke="#B45309" stroke-width="1.5" />
    <polygon points="295,225 405,195 405,220 295,250" fill="#FDE047" stroke="#B45309" stroke-width="1.5" />
    <!-- Potato in cross-section -->
    <ellipse cx="280" cy="215" rx="14" ry="6" fill="#FEF08A" stroke="#CA8A04" stroke-width="1" />
    <ellipse cx="350" cy="210" rx="16" ry="7" fill="#FEF08A" stroke="#CA8A04" stroke-width="1" />
    ${
      donenessPalette.isRunny
        ? `
    <!-- Runny lava stream -->
    <g class="${animated ? `${svgId}_lavaWaterfall` : ""}">
      <path d="M 290 225 C 290 245 282 265 295 272 C 308 275 315 260 305 245 Z" fill="#FFB800" stroke="#FF8A00" stroke-width="1.2" />
      <ellipse cx="298" cy="265" rx="12" ry="4" fill="#FFB800" opacity="0.9" />
      <ellipse cx="292" cy="245" rx="2" ry="6" fill="#FFFFFF" opacity="0.8" />
    </g>
    `
        : ""
    }
  </g>

  <!-- BADGE AND OVERLAY INFO -->
  ${
    showBadge
      ? `
  <g id="${svgId}_badge" filter="url(#${svgId}_duoShadow)">
    <rect x="35" y="322" width="530" height="46" rx="12" fill="#F5E6BE" stroke="#8D6E63" stroke-width="2" />
    <rect x="39" y="326" width="522" height="38" rx="10" fill="#FAF4E8" stroke="#D7CCC8" stroke-width="1" />

    <text x="52" y="348" fill="#3E2723" font-size="14" font-weight="bold" font-family="Georgia, serif">
      ${escapeXml(title)}
    </text>

    <text x="52" y="360" fill="#8D6E63" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">
      ${badgeLabels.duoBadge} • ${doneness.toUpperCase()} • ${eggCount} ${badgeLabels.eggsUnit} (${ratioGPerEgg}${badgeLabels.gPerEggUnit})
    </text>
  </g>
  `
      : ""
  }
  `;
}

// ---------------------------------------------------------------------------
// PHOTOREALISTIC POTATO CUT RENDERERS
// ---------------------------------------------------------------------------

function renderRealisticPotatoCut(cut: PotatoCut, cx: number, cy: number, svgId: string): string {
  if (cut === "dados") {
    return `
    <g id="${svgId}_dados">
      <!-- 3D Confit Potato Cubes with Fried Blisters -->
      <polygon points="${cx - 65},${cy - 45} ${cx - 45},${cy - 55} ${cx - 45},${cy - 30} ${cx - 65},${cy - 20}" fill="#EAB308" stroke="#78350F" stroke-width="1.2" />
      <polygon points="${cx - 45},${cy - 55} ${cx - 25},${cy - 45} ${cx - 25},${cy - 20} ${cx - 45},${cy - 30}" fill="#CA8A04" stroke="#78350F" stroke-width="1.2" />
      <polygon points="${cx - 65},${cy - 45} ${cx - 45},${cy - 55} ${cx - 25},${cy - 45} ${cx - 45},${cy - 35}" fill="#FEF08A" stroke="#B45309" stroke-width="1.2" />

      <polygon points="${cx + 25},${cy - 60} ${cx + 45},${cy - 70} ${cx + 45},${cy - 45} ${cx + 25},${cy - 35}" fill="#EAB308" stroke="#78350F" stroke-width="1.2" />
      <polygon points="${cx + 45},${cy - 70} ${cx + 65},${cy - 60} ${cx + 65},${cy - 35} ${cx + 45},${cy - 45}" fill="#CA8A04" stroke="#78350F" stroke-width="1.2" />
      <polygon points="${cx + 25},${cy - 60} ${cx + 45},${cy - 70} ${cx + 65},${cy - 60} ${cx + 45},${cy - 50}" fill="#FEF08A" stroke="#B45309" stroke-width="1.2" />

      <polygon points="${cx - 75},${cy + 15} ${cx - 55},${cy + 5} ${cx - 55},${cy + 30} ${cx - 75},${cy + 40}" fill="#EAB308" stroke="#78350F" stroke-width="1.2" />
      <polygon points="${cx + 35},${cy + 10} ${cx + 55},${cy} ${cx + 55},${cy + 25} ${cx + 35},${cy + 35}" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.2" />
      <polygon points="${cx - 15},${cy + 45} ${cx + 5},${cy + 35} ${cx + 5},${cy + 60} ${cx - 15},${cy + 70}" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.2" />
    </g>
    `;
  }

  if (cut === "paja") {
    return `
    <g id="${svgId}_paja" stroke="#FEF08A" stroke-width="3" stroke-linecap="round">
      <line x1="${cx - 70}" y1="${cy - 40}" x2="${cx - 20}" y2="${cy - 50}" stroke="#D97706" />
      <line x1="${cx - 50}" y1="${cy - 60}" x2="${cx - 30}" y2="${cy - 20}" stroke="#FEF08A" />
      <line x1="${cx + 10}" y1="${cy - 55}" x2="${cx + 60}" y2="${cy - 35}" stroke="#FDE047" />
      <line x1="${cx + 40}" y1="${cy - 65}" x2="${cx + 25}" y2="${cy - 15}" stroke="#CA8A04" />
      <line x1="${cx - 75}" y1="${cy + 20}" x2="${cx - 25}" y2="${cy + 35}" stroke="#FEF08A" />
      <line x1="${cx + 15}" y1="${cy + 15}" x2="${cx + 65}" y2="${cy + 30}" stroke="#D97706" />
      <line x1="${cx - 30}" y1="${cy + 50}" x2="${cx + 20}" y2="${cy + 55}" stroke="#FDE047" />
    </g>
    `;
  }

  // DEFAULT: Panadera Confit Slices (Wavy Translucent Disks with Caramelized Blister Edges)
  return `
  <g id="${svgId}_panadera">
    <!-- Slice 1 (Top Left) -->
    <ellipse cx="${cx - 50}" cy="${cy - 40}" rx="32" ry="20" fill="#FEF08A" stroke="#D97706" stroke-width="2" transform="rotate(-20 ${cx - 50} ${cy - 40})" />
    <ellipse cx="${cx - 50}" cy="${cy - 40}" rx="24" ry="14" fill="#FFFBEB" opacity="0.8" transform="rotate(-20 ${cx - 50} ${cy - 40})" />
    <ellipse cx="${cx - 62}" cy="${cy - 45}" rx="8" ry="4" fill="#B45309" opacity="0.6" />

    <!-- Slice 2 (Top Right) -->
    <ellipse cx="${cx + 35}" cy="${cy - 48}" rx="30" ry="18" fill="#FDE047" stroke="#D97706" stroke-width="2" transform="rotate(15 ${cx + 35} ${cy - 48})" />
    <ellipse cx="${cx + 35}" cy="${cy - 48}" rx="22" ry="12" fill="#FFFBEB" opacity="0.8" transform="rotate(15 ${cx + 35} ${cy - 48})" />
    <ellipse cx="${cx + 48}" cy="${cy - 52}" rx="7" ry="3.5" fill="#B45309" opacity="0.6" />

    <!-- Slice 3 (Left Mid) -->
    <ellipse cx="${cx - 68}" cy="${cy + 18}" rx="34" ry="21" fill="#FEF08A" stroke="#CA8A04" stroke-width="2" transform="rotate(35 ${cx - 68} ${cy + 18})" />
    <ellipse cx="${cx - 68}" cy="${cy + 18}" rx="26" ry="15" fill="#FFFBEB" opacity="0.8" transform="rotate(35 ${cx - 68} ${cy + 18})" />

    <!-- Slice 4 (Right Mid) -->
    <ellipse cx="${cx + 52}" cy="${cy + 12}" rx="30" ry="19" fill="#FEF08A" stroke="#D97706" stroke-width="2" transform="rotate(-10 ${cx + 52} ${cy + 12})" />
    <ellipse cx="${cx + 52}" cy="${cy + 12}" rx="22" ry="13" fill="#FFFBEB" opacity="0.8" transform="rotate(-10 ${cx + 52} ${cy + 12})" />

    <!-- Slice 5 (Bottom) -->
    <ellipse cx="${cx - 8}" cy="${cy + 52}" rx="32" ry="19" fill="#FDE047" stroke="#CA8A04" stroke-width="2" transform="rotate(5 ${cx - 8} ${cy + 52})" />
    <ellipse cx="${cx - 8}" cy="${cy + 52}" rx="24" ry="13" fill="#FFFBEB" opacity="0.8" transform="rotate(5 ${cx - 8} ${cy + 52})" />
  </g>
  `;
}

// ---------------------------------------------------------------------------
// PHOTOREALISTIC ONION RENDERER
// ---------------------------------------------------------------------------

function renderRealisticOnion(style: string, cx: number, cy: number, svgId: string): string {
  const strokeColor = style === "pochada" ? "#D97706" : "#8D6E63";
  return `
  <!-- Slow-Cooked Caramelized Onion Strands -->
  <g id="${svgId}_onion" stroke="${strokeColor}" stroke-width="4" fill="none" stroke-linecap="round">
    <path d="M ${cx - 65} ${cy - 20} Q ${cx - 45} ${cy - 40} ${cx - 25} ${cy - 15}" />
    <path d="M ${cx} ${cy - 55} Q ${cx + 25} ${cy - 65} ${cx + 45} ${cy - 45}" />
    <path d="M ${cx - 40} ${cy + 35} Q ${cx - 10} ${cy + 55} ${cx + 20} ${cy + 30}" />
    <path d="M ${cx + 25} ${cy} Q ${cx + 55} ${cy - 10} ${cx + 65} ${cy + 20}" />
  </g>
  <g stroke="#FEF08A" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.75">
    <path d="M ${cx - 62} ${cy - 22} Q ${cx - 45} ${cy - 38} ${cx - 28} ${cy - 17}" />
    <path d="M ${cx + 2} ${cy - 53} Q ${cx + 25} ${cy - 63} ${cx + 43} ${cy - 47}" />
  </g>
  `;
}

// ---------------------------------------------------------------------------
// PHOTOREALISTIC EXTRAS RENDERER
// ---------------------------------------------------------------------------

function renderRealisticExtras(extras: Set<string>, cx: number, cy: number, svgId: string): string {
  const rendered: string[] = [];

  if (extras.has("chorizo")) {
    rendered.push(`
      <g id="${svgId}_extra_chorizo">
        <circle cx="${cx - 55}" cy="${cy - 55}" r="16" fill="#DC2626" stroke="#7F1D1D" stroke-width="2.5" />
        <ellipse cx="${cx - 58}" cy="${cy - 58}" rx="4" ry="2.5" fill="#FEF2F2" />
        <circle cx="${cx + 45}" cy="${cy - 15}" r="17" fill="#B91C1C" stroke="#7F1D1D" stroke-width="2.5" />
        <ellipse cx="${cx + 42}" cy="${cy - 18}" rx="4" ry="3" fill="#FEF2F2" />
        <circle cx="${cx - 35}" cy="${cy + 40}" r="16" fill="#DC2626" stroke="#7F1D1D" stroke-width="2.5" />
        <ellipse cx="${cx - 38}" cy="${cy + 37}" rx="3.5" ry="2.5" fill="#FEF2F2" />
      </g>
    `);
  }

  if (extras.has("jamon") || extras.has("ham") || extras.has("iberico")) {
    rendered.push(`
      <g id="${svgId}_extra_jamon">
        <path d="M ${cx - 70} ${cy - 50} Q ${cx - 40} ${cy - 62} ${cx - 18} ${cy - 40} Q ${cx - 50} ${cy - 30} ${cx - 70} ${cy - 50} Z" fill="#991B1B" stroke="#4C0519" stroke-width="1.5" />
        <path d="M ${cx - 55} ${cy - 48} Q ${cx - 35} ${cy - 52} ${cx - 25} ${cy - 42}" stroke="#FEF3C7" stroke-width="1.8" fill="none" opacity="0.85" />
        <path d="M ${cx + 10} ${cy + 10} Q ${cx + 40} ${cy} ${cx + 62} ${cy + 22} Q ${cx + 30} ${cy + 30} ${cx + 10} ${cy + 10} Z" fill="#991B1B" stroke="#4C0519" stroke-width="1.5" />
        <path d="M ${cx + 25} ${cy + 12} Q ${cx + 45} ${cy + 8} ${cx + 55} ${cy + 18}" stroke="#FEF3C7" stroke-width="1.8" fill="none" opacity="0.85" />
      </g>
    `);
  }

  if (extras.has("truffle") || extras.has("trufa")) {
    rendered.push(`
      <g id="${svgId}_extra_truffle">
        <ellipse cx="${cx - 30}" cy="${cy - 25}" rx="10" ry="5.5" fill="#18181B" stroke="#09090B" stroke-width="1" transform="rotate(-25 ${cx - 30} ${cy - 25})" />
        <path d="M ${cx - 34} ${cy - 27} Q ${cx - 30} ${cy - 24} ${cx - 26} ${cy - 26}" stroke="#F5F5F4" stroke-width="0.8" fill="none" opacity="0.8" />
        <ellipse cx="${cx + 30}" cy="${cy + 15}" rx="11" ry="6.5" fill="#27272A" stroke="#09090B" stroke-width="1" transform="rotate(15 ${cx + 30} ${cy + 15})" />
        <path d="M ${cx + 26} ${cy + 13} Q ${cx + 30} ${cy + 16} ${cx + 34} ${cy + 14}" stroke="#F5F5F4" stroke-width="0.8" fill="none" opacity="0.8" />
        <ellipse cx="${cx}" cy="${cy - 50}" rx="9" ry="4.5" fill="#18181B" stroke="#09090B" stroke-width="1" transform="rotate(35 ${cx} ${cy - 50})" />
      </g>
    `);
  }

  if (extras.has("peppers") || extras.has("pimientos") || extras.has("piquillo")) {
    rendered.push(`
      <g id="${svgId}_extra_peppers" stroke-width="3.5" fill="none" stroke-linecap="round">
        <path d="M ${cx - 65} ${cy - 10} Q ${cx - 50} ${cy + 10} ${cx - 35} ${cy - 5}" stroke="#EF4444" />
        <ellipse cx="${cx - 50}" cy="${cy}" rx="3" ry="1.5" fill="#1C1917" />
        <path d="M ${cx + 25} ${cy - 35} Q ${cx + 40} ${cy - 15} ${cx + 55} ${cy - 30}" stroke="#22C55E" />
        <path d="M ${cx - 20} ${cy + 30} Q ${cx - 5} ${cy + 50} ${cx + 10} ${cy + 35}" stroke="#EF4444" />
      </g>
    `);
  }

  if (extras.has("cheese") || extras.has("queso")) {
    rendered.push(`
      <g id="${svgId}_extra_cheese">
        <ellipse cx="${cx - 35}" cy="${cy - 20}" rx="14" ry="7" fill="#FEF9C3" stroke="#FDE047" stroke-width="1.5" opacity="0.9" />
        <ellipse cx="${cx + 38}" cy="${cy + 25}" rx="16" ry="8" fill="#FEF08A" stroke="#CA8A04" stroke-width="1" opacity="0.92" />
        <path d="M ${cx + 25} ${cy + 28} Q ${cx + 42} ${cy + 35} ${cx + 55} ${cy + 25}" stroke="#B45309" stroke-width="1.2" fill="none" opacity="0.7" />
      </g>
    `);
  }

  if (extras.has("mushrooms") || extras.has("setas")) {
    rendered.push(`
      <g id="${svgId}_extra_mushrooms">
        <!-- Cremini mushroom cap -->
        <path d="M ${cx + 40} ${cy - 45} C ${cx + 25} ${cy - 60} ${cx + 60} ${cy - 65} ${cx + 65} ${cy - 45} Z" fill="#573a2e" stroke="#3d281f" stroke-width="1.2" />
        <rect x="${cx + 48}" y="${cy - 45}" width="8" height="7" rx="2" fill="#E7E5E4" opacity="0.85" />
        <!-- Wild mushroom slice -->
        <path d="M ${cx - 45} ${cy + 20} C ${cx - 60} ${cy + 5} ${cx - 30} ${cy} ${cx - 25} ${cy + 18} Z" fill="#443128" stroke="#2d1f18" stroke-width="1.2" />
      </g>
    `);
  }

  if (extras.has("sobrasada")) {
    rendered.push(`
      <g id="${svgId}_extra_sobrasada">
        <circle cx="${cx - 45}" cy="${cy - 35}" r="9" fill="#EA580C" stroke="#C2410C" stroke-width="1.5" />
        <circle cx="${cx + 35}" cy="${cy - 30}" r="8" fill="#F97316" opacity="0.95" />
        <circle cx="${cx}" cy="${cy + 45}" r="10" fill="#EA580C" stroke="#9A3412" stroke-width="1.5" />
        <ellipse cx="${cx - 43}" cy="${cy - 37}" rx="3" ry="2" fill="#FED7AA" opacity="0.8" />
      </g>
    `);
  }

  if (extras.has("atun") || extras.has("bacalao")) {
    rendered.push(`
      <g id="${svgId}_extra_fish">
        <path d="M ${cx - 40} ${cy - 30} Q ${cx - 20} ${cy - 38} ${cx - 10} ${cy - 25} Q ${cx - 25} ${cy - 20} ${cx - 40} ${cy - 30} Z" fill="#F5F5F4" stroke="#D6D3D1" stroke-width="1.2" />
        <path d="M ${cx + 20} ${cy + 25} Q ${cx + 40} ${cy + 18} ${cx + 50} ${cy + 30} Q ${cx + 35} ${cy + 36} ${cx + 20} ${cy + 25} Z" fill="#FAF9F6" stroke="#E7E5E4" stroke-width="1.2" />
      </g>
    `);
  }

  if (extras.has("garlic")) {
    rendered.push(`
      <g id="${svgId}_extra_garlic">
        <ellipse cx="${cx - 25}" cy="${cy + 35}" rx="7" ry="4" fill="#FEF9C3" stroke="#CA8A04" stroke-width="1" transform="rotate(-20 ${cx - 25} ${cy + 35})" />
        <ellipse cx="${cx + 48}" cy="${cy - 2}" rx="6" ry="3.5" fill="#FEF08A" stroke="#CA8A04" stroke-width="1" transform="rotate(25 ${cx + 48} ${cy - 2})" />
      </g>
    `);
  }

  if (extras.has("miel")) {
    rendered.push(`
      <g id="${svgId}_extra_miel">
        <path d="M ${cx - 50} ${cy - 40} Q ${cx} ${cy - 10} ${cx - 10} ${cy + 20} Q ${cx + 20} ${cy + 40} ${cx + 50} ${cy + 15}" stroke="#D97706" stroke-width="3" fill="none" opacity="0.85" stroke-linecap="round" />
        <path d="M ${cx - 48} ${cy - 39} Q ${cx} ${cy - 9} ${cx - 10} ${cy + 21}" stroke="#FEF08A" stroke-width="1.2" fill="none" opacity="0.9" />
      </g>
    `);
  }

  if (extras.has("chips")) {
    rendered.push(`
      <g id="${svgId}_extra_chips">
        <path d="M ${cx - 55} ${cy - 35} Q ${cx - 35} ${cy - 50} ${cx - 20} ${cy - 30} Q ${cx - 40} ${cy - 20} ${cx - 55} ${cy - 35} Z" fill="#FACC15" stroke="#CA8A04" stroke-width="1.5" opacity="0.9" />
        <path d="M ${cx + 25} ${cy + 15} Q ${cx + 45} ${cy} ${cx + 60} ${cy + 20} Q ${cx + 40} ${cy + 30} ${cx + 25} ${cy + 15} Z" fill="#FDE047" stroke="#B45309" stroke-width="1.5" opacity="0.9" />
      </g>
    `);
  }

  return rendered.join("\n");
}

// ---------------------------------------------------------------------------
// DATA URI & CONVERTER HELPERS
// ---------------------------------------------------------------------------

export function generateTortillaSvgDataUri(options: TortillaSvgOptions = {}): string {
  const svgString = generateTortillaSvg(options);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

// ---------------------------------------------------------------------------
// RECIPE & BUILDER MAPPINGS (Declarative Strategy)
// ---------------------------------------------------------------------------

const TEXTURE_DONENESS_MAP: Record<string, DonenessLevel> = {
  betanzos: "liquid",
  liquid: "liquid",
  liquida: "liquid",
  runny: "liquid",
  jugosa: "melosa",
  melosa: "melosa",
  creamy: "melosa",
  soft: "melosa",
  cuajada: "cuajada",
  firm: "cuajada",
  firme: "firme",
  bocadillo: "bocadillo",
};

const CUT_MAP: Record<string, PotatoCut> = {
  panadera: "panadera",
  dados: "dados",
  cubos: "dados",
  chascada: "chascada",
  chips: "chips",
  express: "chips",
  paja: "paja",
};

export function recipeToSvgOptions(
  recipe: any,
  overrides?: Partial<TortillaSvgOptions>
): TortillaSvgOptions {
  if (!recipe) {
    return { title: "Tortilla Española", ...overrides };
  }

  const title =
    typeof recipe.title === "string"
      ? recipe.title
      : typeof recipe.name === "string"
      ? recipe.name
      : recipe.title?.es || recipe.name?.es || recipe.recipeName?.es || recipe.id || "Tortilla Española";

  const rawTitleLower = title.toLowerCase();
  const recipeId = (recipe.id || recipe.slug?.es || "").toLowerCase();

  // Check if purist / without onion
  const hasPuristTaxonomy = Array.isArray(recipe.taxonomyIds) && (
    recipe.taxonomyIds.includes("faction:puristas") ||
    recipe.taxonomyIds.includes("faction:sincebollistas")
  );
  const isPurist =
    hasPuristTaxonomy ||
    rawTitleLower.includes("sin cebolla") ||
    rawTitleLower.includes("without onion") ||
    rawTitleLower.includes("ohne zwiebel");

  let hasOnion = !isPurist && (
    rawTitleLower.includes("con cebolla") ||
    rawTitleLower.includes("with onion") ||
    rawTitleLower.includes("mit zwiebel") ||
    rawTitleLower.includes("concebolla") ||
    recipeId.includes("concebolla") ||
    (Array.isArray(recipe.taxonomyIds) && (
      recipe.taxonomyIds.includes("ingredient:onion") ||
      recipe.taxonomyIds.includes("faction:concebollistas") ||
      recipe.taxonomyIds.includes("faction:cebollistas")
    ))
  );

  // Extract ingredients
  const extrasSet = new Set<string>();
  let eggCount = recipe.eggCount || 6;
  let potatoGrams = 600;

  const normalizeExtraKey = (key: string): string => {
    const k = key.toLowerCase().trim();
    if (k.includes("cherrypepper") || k.includes("piquillo") || k.includes("pimiento") || k === "peppers" || k === "pepper") return "peppers";
    if (k.includes("garlic") || k.includes("ajetes") || k === "ajo") return "garlic";
    if (k.includes("jamon") || k.includes("jamón")) return "jamon";
    if (k.includes("chorizo")) return "chorizo";
    if (k.includes("sobrasada")) return "sobrasada";
    if (k.includes("queso") || k.includes("cheese")) return "cheese";
    if (k.includes("mushroom") || k.includes("setas") || k.includes("champin") || k.includes("champiñ")) return "mushrooms";
    if (k.includes("trufa") || k.includes("truffle")) return "truffle";
    if (k.includes("chickpea") || k.includes("garbanzo")) return "chickpea";
    if (k.includes("atun") || k.includes("atún") || k.includes("tuna")) return "tuna";
    if (k.includes("bacalao") || k.includes("cod")) return "bacalao";
    return k;
  };

  if (Array.isArray(recipe.ingredients)) {
    for (const item of recipe.ingredients) {
      if (typeof item === "string") {
        const lower = item.toLowerCase();
        if (lower.includes("huevo") || lower.includes("egg") || lower.includes("eier")) {
          const match = item.match(/(\d+)/);
          if (match) eggCount = Number(match[1]);
        } else if (lower.includes("patata") || lower.includes("potato") || lower.includes("kartoffel")) {
          const match = item.match(/(\d+)/);
          if (match) potatoGrams = Number(match[1]);
        } else if (lower.includes("cebolla") || lower.includes("onion") || lower.includes("zwiebel")) {
          if (!isPurist) hasOnion = true;
        } else {
          extrasSet.add(normalizeExtraKey(item));
        }
        continue;
      }

      const id = (item.ingredientId || item.id || item.entityId || "").toLowerCase();
      const amountVal = item.amount !== undefined ? Number(item.amount) : item.quantity !== undefined ? Number(item.quantity) : undefined;

      if (id === "egg" || id === "huevo") {
        if (amountVal && !isNaN(amountVal)) eggCount = amountVal;
      } else if (id === "potato" || id === "patata") {
        if (amountVal && !isNaN(amountVal)) potatoGrams = amountVal;
      } else if (id === "onion" || id === "cebolla") {
        if (!isPurist) hasOnion = true;
      } else if (id) {
        if (id !== "oil" && id !== "salt" && id !== "water") {
          extrasSet.add(normalizeExtraKey(id));
        }
      }
    }
  }

  // Parse taxonomies if present
  if (Array.isArray(recipe.taxonomyIds)) {
    for (const tax of recipe.taxonomyIds) {
      if (typeof tax === "string") {
        const lowerTax = tax.toLowerCase();
        if (lowerTax.startsWith("ingredient:")) {
          const ingKey = lowerTax.replace("ingredient:", "");
          if (ingKey === "onion" || ingKey === "cebolla") {
            if (!isPurist) hasOnion = true;
          } else if (ingKey !== "potato" && ingKey !== "egg" && ingKey !== "patata" && ingKey !== "oil" && ingKey !== "salt") {
            extrasSet.add(normalizeExtraKey(ingKey));
          }
        }
      }
    }
  }

  // Derive doneness using declarative rules
  let doneness: DonenessLevel = "melosa";
  if (recipeId.includes("betanzos") || rawTitleLower.includes("betanzos") || (Array.isArray(recipe.taxonomyIds) && recipe.taxonomyIds.includes("region:betanzos"))) {
    doneness = "liquid";
    hasOnion = false;
  } else {
    for (const [key, val] of Object.entries(TEXTURE_DONENESS_MAP)) {
      if (rawTitleLower.includes(key)) {
        doneness = val;
        if (key === "betanzos" || key === "liquid") hasOnion = false;
        break;
      }
    }
  }

  // Derive potato cut using declarative rules
  let potatoCut: PotatoCut = "panadera";
  if (recipeId === "express" || rawTitleLower.includes("express") || rawTitleLower.includes("chips")) {
    potatoCut = "chips";
    extrasSet.add("chips");
  } else {
    for (const [key, val] of Object.entries(CUT_MAP)) {
      if (rawTitleLower.includes(key)) {
        potatoCut = val;
        if (key === "chips") extrasSet.add("chips");
        break;
      }
    }
  }

  const cleanExtras = Array.from(extrasSet);

  return {
    id: recipeId || (title || "tortilla").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    title,
    eggCount,
    potatoWeightG: potatoGrams,
    potatoCut,
    doneness,
    onion: hasOnion,
    extras: cleanExtras,
    presentation: "skillet_top",
    theme: "kitchen_dark",
    showBadge: true,
    ...overrides,
  };
}

export function builderConfigToSvgOptions(
  config: any,
  overrides?: Partial<TortillaSvgOptions>
): TortillaSvgOptions {
  if (!config) return { title: "Tortilla Creada", ...overrides };

  const eggIng = config.ingredients?.find((i: any) => i.entityId === "egg");
  const potatoIng = config.ingredients?.find((i: any) => i.entityId === "potato");
  const onionIng = config.ingredients?.find((i: any) => i.entityId === "onion");

  const eggCount = eggIng ? eggIng.quantity : 6;
  const potatoGrams = potatoIng ? potatoIng.quantity : 600;
  const hasOnion = Boolean(onionIng && onionIng.quantity > 0);

  const extrasList: string[] = [];
  if (config.modifiers) {
    for (const mod of config.modifiers) {
      if (mod.ingredientId) extrasList.push(mod.ingredientId);
    }
  }

  const textureKey = (
    config.textureStyle ||
    config.selectedTexture ||
    config.preferences?.texture ||
    "melosa"
  ).toLowerCase();
  const doneness: DonenessLevel = TEXTURE_DONENESS_MAP[textureKey] || "melosa";

  const cutKey = (
    config.potatoCut ||
    config.preferences?.potatoCut ||
    "panadera"
  ).toLowerCase();
  const potatoCut: PotatoCut = CUT_MAP[cutKey] || "panadera";

  const ratio = config.calculatedProfile?.potatoEggRatio || (eggCount > 0 ? Math.round(potatoGrams / eggCount) : 100);

  return {
    title: `Tortilla (${ratio}g/h)`,
    eggCount,
    potatoWeightG: potatoGrams,
    potatoCut,
    doneness,
    onion: hasOnion,
    extras: extrasList,
    presentation: "skillet_top",
    theme: "kitchen_dark",
    showBadge: true,
    showDnaMetrics: true,
    ...overrides,
  };
}
