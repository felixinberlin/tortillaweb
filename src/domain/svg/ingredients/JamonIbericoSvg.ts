import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Jamón Ibérico SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "slice" / "default": Paper-thin translucent slice of 100% Jamón Ibérico de Bellota with deep ruby-garnet meat grain, melting oleic fat striations, and white tyrosine crystallization micro-dots.
 * - "taquitos": Hand-cut glistening cured cubes with fat cap.
 */
export function renderJamonInnerSvg(props: IngredientSvgProps = {}): string {
  const { id = "jamon_svg" } = props;

  return `
    <defs>
      ${getSharedDefs(id)}
      
      <!-- Cured Ruby-Garnet Meat Fiber Gradient -->
      <linearGradient id="${id}_curedMeat" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BE123C" />
        <stop offset="35%" stopColor="#9F1239" />
        <stop offset="70%" stopColor="#881337" />
        <stop offset="100%" stopColor="#4C0519" />
      </linearGradient>

      <!-- Translucent Oleic Infiltrated Fat (Melting at room temp) -->
      <linearGradient id="${id}_oleicFat" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.7" />
      </linearGradient>
    </defs>

    <g filter="url(#${id}_dropShadow)">
      <!-- 1. Cured Ham Cut Geometry (Organic Translucent Ribbon) -->
      <path d="M 16 48 C 14 36 28 22 55 20 C 78 18 86 34 84 54 C 82 72 68 84 42 82 C 22 80 18 64 16 48 Z" 
            fill="url(#${id}_curedMeat)" 
            stroke="#4C0519" 
            stroke-width="1.2" />

      <!-- 2. Melting Intramuscular Fat Streaks (Veteado de Bellota) -->
      <!-- Fat Streak 1 -->
      <path d="M 22 38 C 36 32 54 36 78 30 C 65 36 45 38 22 44 Z" fill="url(#${id}_oleicFat)" />
      
      <!-- Fat Streak 2 -->
      <path d="M 18 52 C 34 46 58 50 82 46 C 70 54 48 56 18 60 Z" fill="url(#${id}_oleicFat)" />
      
      <!-- Fat Streak 3 -->
      <path d="M 24 68 C 42 62 60 66 76 60 C 62 70 42 72 24 74 Z" fill="url(#${id}_oleicFat)" />

      <!-- 3. White Tyrosine Micro-Crystals (Aged Cure Marker) -->
      <circle cx="34" cy="46" r="0.8" fill="#FFFFFF" />
      <circle cx="52" cy="42" r="0.9" fill="#FFFFFF" />
      <circle cx="68" cy="40" r="0.7" fill="#FFFFFF" />
      <circle cx="44" cy="62" r="0.8" fill="#FFFFFF" />
      <circle cx="60" cy="58" r="0.7" fill="#FFFFFF" />

      <!-- 4. Glistening Oleic Acid Luster (Natural room temperature sweat) -->
      <path d="M 28 28 C 42 22 62 24 72 32 C 60 28 42 28 28 34 Z" fill="#FFFFFF" opacity="0.6" filter="url(#${id}_glossHighlight)" />
      <ellipse cx="36" cy="30" rx="3.5" ry="1.5" fill="#FFFFFF" opacity="0.8" />
      <ellipse cx="64" cy="42" rx="4" ry="1.5" fill="#FFFFFF" opacity="0.7" transform="rotate(10 64 42)" />
    </g>
  `;
}

export function renderJamonSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Jamón Ibérico de Bellota",
  } = props;
  const inner = renderJamonInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const JamonSvgModule: IngredientSvgModule = {
  id: "jamon",
  name: "Jamón Ibérico",
  nameEn: "Iberian Ham",
  nameDe: "Ibérico-Schinken",
  defaultState: "slice",
  availableStates: ["slice", "taquitos"],
  renderInnerSvg: renderJamonInnerSvg,
  renderSvgString: renderJamonSvgString,
};
