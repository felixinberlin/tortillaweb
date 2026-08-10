import React, { useState } from 'react';

export interface IngredientSummary {
  id?: string;
  ingredientId?: string;
  name?: string | { es?: string; en?: string; de?: string };
}

export interface RecipeImageProps {
  src?: string;
  title: string;
  ingredients?: (string | IngredientSummary)[];
  taxonomyIds?: string[];
  className?: string;
  alt?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
}

/**
 * Normalizes ingredient key strings from various data forms
 */
function extractIngredientKeys(
  ingredients?: (string | IngredientSummary)[],
  taxonomyIds?: string[]
): string[] {
  const set = new Set<string>();

  if (ingredients) {
    for (const item of ingredients) {
      if (typeof item === 'string') {
        set.add(item.toLowerCase());
      } else if (item && typeof item === 'object') {
        if (item.ingredientId) set.add(item.ingredientId.toLowerCase());
        if (item.id) set.add(item.id.toLowerCase());
      }
    }
  }

  if (taxonomyIds) {
    for (const tax of taxonomyIds) {
      if (tax.startsWith('ingredient:')) {
        set.add(tax.replace('ingredient:', '').toLowerCase());
      }
    }
  }

  return Array.from(set);
}

/**
 * Checks if a static image path is known to be missing in the build
 */
function isKnownMissingPath(src?: string): boolean {
  if (!src) return true;
  // Non-existent static paths defined in recipe JSONs
  if (src.startsWith('/images/recipes/')) return true;
  return false;
}

/**
 * SVG Ingredient Composite Graphic Component
 * Generates an artistic vector skillet composition using SVG ingredient assets
 */
export function IngredientSvgComposite({
  title,
  ingredientKeys,
  className = '',
}: {
  title: string;
  ingredientKeys: string[];
  className?: string;
}) {
  const keys = new Set(ingredientKeys);

  // Determine presence of key ingredient types
  const hasOnion = keys.has('onion') || keys.has('cebolla') || title.toLowerCase().includes('cebolla');
  const hasGarlic = keys.has('garlic') || keys.has('ajo') || title.toLowerCase().includes('ajo') || title.toLowerCase().includes('ajetes');
  const hasChorizo = keys.has('chorizo') || title.toLowerCase().includes('chorizo');
  const hasJamon = keys.has('jamon') || keys.has('ham') || title.toLowerCase().includes('jamón') || title.toLowerCase().includes('jamon');
  const hasTuna = keys.has('atun') || keys.has('tuna') || title.toLowerCase().includes('atún') || title.toLowerCase().includes('atun');
  const hasCod = keys.has('bacalao') || keys.has('cod') || title.toLowerCase().includes('bacalao');
  const hasMushrooms = keys.has('setas') || keys.has('mushrooms') || title.toLowerCase().includes('setas') || title.toLowerCase().includes('hongos');
  const hasTruffle = keys.has('trufa') || keys.has('truffle') || title.toLowerCase().includes('trufa');
  const hasCheese = keys.has('queso') || keys.has('cheese') || keys.has('quesoazul') || title.toLowerCase().includes('queso');
  const hasSobrasada = keys.has('sobrasada') || title.toLowerCase().includes('sobrasada');
  const hasPeppers = keys.has('peppers') || keys.has('pimientos') || title.toLowerCase().includes('paisana') || title.toLowerCase().includes('pimiento');
  const hasChips = keys.has('chips') || title.toLowerCase().includes('express') || title.toLowerCase().includes('patatas fritas');
  const isVegan = keys.has('vegana') || title.toLowerCase().includes('vegana');

  return (
    <div className={`relative w-full h-full overflow-hidden bg-stone-900 flex items-center justify-center select-none ${className}`}>
      {/* Background Subtle Paper/Wood Texture Pattern */}
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`Ilustración vectorial de ${title}`}
      >
        <defs>
          {/* Radial Gradient for Frying Pan Golden Glow */}
          <radialGradient id="panGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB800" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#D97706" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.8" />
          </radialGradient>

          {/* Cast Iron Pan Metallic Rim */}
          <linearGradient id="ironRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#44403C" />
            <stop offset="50%" stopColor="#1C1917" />
            <stop offset="100%" stopColor="#292524" />
          </linearGradient>

          {/* Handle Wood Gradient */}
          <linearGradient id="handleWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="50%" stopColor="#451A03" />
            <stop offset="100%" stopColor="#270F03" />
          </linearGradient>

          {/* Olive Oil Sheen */}
          <linearGradient id="oilGlint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#84CC16" stopOpacity="0.2" />
          </linearGradient>

          {/* Drop Shadow Filter */}
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer Parchment/Counter Background */}
        <rect width="600" height="400" fill="#292524" />

        {/* Wooden Cutting Board / Table Mat */}
        <rect x="20" y="20" width="560" height="360" rx="16" fill="#3D291A" stroke="#523621" strokeWidth="4" />
        <path d="M 40 20 L 40 380 M 120 20 L 120 380 M 200 20 L 200 380 M 280 20 L 280 380 M 360 20 L 360 380 M 440 20 L 440 380 M 520 20 L 520 380" stroke="#2C1D12" strokeWidth="1.5" opacity="0.4" />

        {/* Skillet Handle extending right */}
        <path d="M 380 185 L 560 175 C 570 175 575 185 575 200 C 575 215 570 225 560 225 L 380 215 Z" fill="url(#handleWood)" filter="url(#shadow)" />
        <circle cx="545" cy="200" r="6" fill="#1C1917" />

        {/* Outer Skillet Body */}
        <circle cx="260" cy="200" r="150" fill="url(#ironRim)" filter="url(#shadow)" />
        <circle cx="260" cy="200" r="138" fill="#1C1917" />
        <circle cx="260" cy="200" r="134" fill="#292524" />

        {/* Sizzling Golden Tortilla Base */}
        <circle cx="260" cy="200" r="128" fill="url(#panGlow)" />
        <circle cx="260" cy="200" r="128" fill="url(#oilGlint)" />

        {/* Tortilla Surface Golden Crisp Texture Marks */}
        <ellipse cx="230" cy="180" rx="40" ry="25" fill="#FDE047" opacity="0.25" transform="rotate(-15 230 180)" />
        <ellipse cx="290" cy="220" rx="45" ry="30" fill="#F5E6BE" opacity="0.3" transform="rotate(20 290 220)" />

        {/* --- INGREDIENT SVG LAYERINGS --- */}

        {/* 1. POTATOES / CHIPS BASE */}
        {!hasChips ? (
          <g id="potatoes">
            {/* Golden Potato Slices */}
            <ellipse cx="210" cy="160" rx="28" ry="18" fill="#F5E6BE" stroke="#D97706" strokeWidth="2" transform="rotate(-20 210 160)" />
            <ellipse cx="280" cy="150" rx="25" ry="16" fill="#FDE047" stroke="#D97706" strokeWidth="2" transform="rotate(15 280 150)" />
            <ellipse cx="190" cy="220" rx="30" ry="19" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" transform="rotate(35 190 220)" />
            <ellipse cx="310" cy="210" rx="26" ry="17" fill="#F5E6BE" stroke="#D97706" strokeWidth="2" transform="rotate(-10 310 210)" />
            <ellipse cx="250" cy="245" rx="27" ry="16" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" transform="rotate(5 250 245)" />
          </g>
        ) : (
          <g id="chips">
            {/* Ridged Potato Chips */}
            <circle cx="220" cy="170" r="22" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
            <path d="M 205 170 Q 220 165 235 170" stroke="#B45309" strokeWidth="2" fill="none" />
            <circle cx="290" cy="160" r="20" fill="#FDE047" stroke="#B45309" strokeWidth="2" />
            <circle cx="210" cy="230" r="24" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
            <circle cx="295" cy="225" r="21" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />
          </g>
        )}

        {/* 2. EGGS / YOLK (Or Vegan alternative) */}
        {!isVegan ? (
          <g id="eggs">
            {/* Creamy Yolk Domes */}
            <circle cx="240" cy="190" r="16" fill="#FFB800" stroke="#D97706" strokeWidth="2" filter="url(#shadow)" />
            <circle cx="235" cy="186" r="5" fill="#FFFBEB" opacity="0.8" />

            <circle cx="280" cy="180" r="14" fill="#FF8A00" stroke="#B45309" strokeWidth="2" filter="url(#shadow)" />
            <circle cx="276" cy="177" r="4" fill="#FFFBEB" opacity="0.8" />
          </g>
        ) : (
          <g id="vegan-chickpea">
            {/* Chickpea Flour Batter Highlights */}
            <circle cx="240" cy="190" r="18" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
            <text x="233" y="195" fontSize="12" fill="#854D0E" fontWeight="bold">🌱</text>
          </g>
        )}

        {/* 3. CARAMELIZED ONIONS */}
        {hasOnion && (
          <g id="onions" stroke="#8D6E63" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M 195 180 Q 215 160 235 185" />
            <path d="M 260 145 Q 285 135 305 155" />
            <path d="M 220 235 Q 250 255 280 230" />
            <path d="M 285 200 Q 315 190 325 220" />
          </g>
        )}

        {/* 4. GARLIC / AJETES */}
        {hasGarlic && (
          <g id="garlic">
            <path d="M 175 195 Q 185 185 195 195 C 190 205 180 205 175 195 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
            <path d="M 320 170 Q 330 160 340 170 C 335 180 325 180 320 170 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
          </g>
        )}

        {/* 5. CHORIZO */}
        {hasChorizo && (
          <g id="chorizo">
            <circle cx="205" cy="145" r="15" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
            <circle cx="202" cy="142" r="3" fill="#FEF2F2" />
            <circle cx="210" cy="148" r="2" fill="#FEF2F2" />

            <circle cx="305" cy="185" r="16" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="2.5" />
            <circle cx="301" cy="182" r="3" fill="#FEF2F2" />

            <circle cx="225" cy="240" r="15" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
          </g>
        )}

        {/* 6. JAMÓN */}
        {hasJamon && (
          <g id="jamon">
            <path d="M 190 150 Q 220 140 240 160 Q 210 170 190 150 Z" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1.5" />
            <path d="M 198 152 Q 220 146 232 158" stroke="#FEF2F2" strokeWidth="2" fill="none" />

            <path d="M 270 210 Q 300 200 320 220 Q 290 230 270 210 Z" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1.5" />
            <path d="M 278 212 Q 300 206 312 218" stroke="#FEF2F2" strokeWidth="2" fill="none" />
          </g>
        )}

        {/* 7. TUNA */}
        {hasTuna && (
          <g id="tuna">
            <path d="M 210 205 Q 225 195 240 205 Q 225 215 210 205 Z" fill="#FB7185" stroke="#BE123C" strokeWidth="1.5" />
            <path d="M 280 155 Q 295 145 310 155 Q 295 165 280 155 Z" fill="#E11D48" stroke="#9F1239" strokeWidth="1.5" />
          </g>
        )}

        {/* 8. COD / BACALAO */}
        {hasCod && (
          <g id="cod">
            <path d="M 200 170 Q 220 155 235 170 Q 215 185 200 170 Z" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="2" />
            <path d="M 275 220 Q 295 205 310 220 Q 290 235 275 220 Z" fill="#E5E7EB" stroke="#6B7280" strokeWidth="2" />
          </g>
        )}

        {/* 9. MUSHROOMS / SETAS */}
        {hasMushrooms && (
          <g id="mushrooms">
            <path d="M 220 140 A 14 14 0 0 1 248 140 Z" fill="#78350F" stroke="#451A03" strokeWidth="2" />
            <rect x="231" y="140" width="6" height="10" fill="#FEF3C7" />

            <path d="M 290 225 A 15 15 0 0 1 320 225 Z" fill="#A16207" stroke="#78350F" strokeWidth="2" />
            <rect x="302" y="225" width="6" height="10" fill="#FEF3C7" />
          </g>
        )}

        {/* 10. TRUFFLE */}
        {hasTruffle && (
          <g id="truffle">
            <ellipse cx="230" cy="175" rx="8" ry="5" fill="#18181B" stroke="#FFB800" strokeWidth="1" transform="rotate(-25 230 175)" />
            <ellipse cx="270" cy="205" rx="10" ry="6" fill="#27272A" stroke="#FFB800" strokeWidth="1" transform="rotate(15 270 205)" />
            <ellipse cx="250" cy="145" rx="7" ry="4" fill="#18181B" stroke="#FFB800" strokeWidth="1" transform="rotate(35 250 145)" />
          </g>
        )}

        {/* 11. SOBRASADA & HONEY */}
        {hasSobrasada && (
          <g id="sobrasada">
            <circle cx="215" cy="180" r="10" fill="#EA580C" stroke="#9A3412" strokeWidth="2" />
            <circle cx="295" cy="195" r="12" fill="#C2410C" stroke="#9A3412" strokeWidth="2" />
            {/* Honey Drizzle */}
            <path d="M 200 170 Q 230 185 260 175 Q 290 195 310 185" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* 12. CHEESE */}
        {hasCheese && (
          <g id="cheese">
            <polygon points="210,210 235,195 230,225" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
            <polygon points="280,140 305,125 300,155" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          </g>
        )}

        {/* 13. PEPPERS */}
        {hasPeppers && (
          <g id="peppers" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M 195 190 Q 210 210 225 195" stroke="#EF4444" />
            <path d="M 285 165 Q 300 185 315 170" stroke="#22C55E" />
            <path d="M 240 230 Q 255 250 270 235" stroke="#EF4444" />
          </g>
        )}

        {/* OLIVE OIL GLISTEN DROPS */}
        <circle cx="190" cy="175" r="3" fill="#84CC16" opacity="0.9" />
        <circle cx="315" cy="175" r="4" fill="#EAB308" opacity="0.9" />
        <circle cx="260" cy="245" r="3.5" fill="#84CC16" opacity="0.9" />
        <circle cx="245" cy="135" r="3" fill="#EAB308" opacity="0.9" />

        {/* Bottom Banner Badge */}
        <g id="banner" filter="url(#shadow)">
          <rect x="40" y="325" width="440" height="42" rx="8" fill="#F5E6BE" stroke="#8D6E63" strokeWidth="2" />
          <rect x="44" y="329" width="432" height="34" rx="6" fill="#FAF4E8" stroke="#D7CCC8" strokeWidth="1" />

          {/* Title Text */}
          <text
            x="260"
            y="351"
            textAnchor="middle"
            fill="#3E2723"
            fontSize="15"
            fontWeight="bold"
            fontFamily="Georgia, serif"
            letterSpacing="0.5"
          >
            {title.length > 38 ? title.slice(0, 36) + '…' : title}
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Smart Recipe Image Component
 * Renders static image if available; falls back automatically to SVG Ingredient Composite
 */
export default function RecipeImage({
  src,
  title,
  ingredients,
  taxonomyIds,
  className = '',
  alt,
}: RecipeImageProps) {
  const [hasError, setHasError] = useState(false);
  const ingredientKeys = extractIngredientKeys(ingredients, taxonomyIds);
  const isMissing = isKnownMissingPath(src);

  // If known missing or image load failed, render SVG composite artwork
  if (isMissing || hasError) {
    return (
      <IngredientSvgComposite
        title={title}
        ingredientKeys={ingredientKeys}
        className={className}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt || title}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
}
