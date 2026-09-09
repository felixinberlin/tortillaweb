import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Garlic (Ajo Morado) SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "bulb" / "default": Morado de Las Pedroñeras purple garlic bulb with papery tunic, violet-purple striations, and defined clove ridges.
 * - "clove": Confit peeled golden garlic clove glistening in olive oil.
 */
export function renderGarlicInnerSvg(props: IngredientSvgProps = {}): string {
  const { state = "bulb", id = "garlic_svg" } = props;

  if (state === "clove") {
    return `
      <defs>
        ${getSharedDefs(id)}
        <radialGradient id="${id}_cloveConfit" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="35%" stopColor="#FEF08A" />
          <stop offset="75%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>
      <g filter="url(#${id}_dropShadow)">
        <!-- Tender Confit Garlic Clove -->
        <path d="M 32 20 C 48 18 68 32 68 58 C 68 76 56 86 42 86 C 28 86 24 72 26 52 C 28 36 30 22 32 20 Z" fill="url(#${id}_cloveConfit)" stroke="#B45309" stroke-width="1.2" />
        <path d="M 38 28 C 48 24 58 32 58 48" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8" />
        <ellipse cx="44" cy="34" rx="3.5" ry="6" fill="#FFFFFF" opacity="0.9" transform="rotate(-15 44 34)" />
        <circle cx="52" cy="62" r="1.5" fill="#EAB308" />
      </g>
    `;
  }

  // DEFAULT: Whole Morado Garlic Bulb (Ajo Morado de Las Pedroñeras IGP)
  return `
    <defs>
      ${getSharedDefs(id)}
      
      <!-- Papery White-Cream Tunic Base -->
      <radialGradient id="${id}_bulbBase" cx="38%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="35%" stopColor="#FAF5FF" />
        <stop offset="70%" stopColor="#F3E8FF" />
        <stop offset="90%" stopColor="#E9D5FF" />
        <stop offset="100%" stopColor="#C084FC" />
      </radialGradient>

      <!-- Violet-Purple Striation Tone -->
      <linearGradient id="${id}_violetStreak" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="50%" stopColor="#7E22CE" />
        <stop offset="100%" stopColor="#581C87" />
      </linearGradient>
    </defs>

    <g filter="url(#${id}_deepShadow)">
      <!-- 1. Garlic Bulb Geometry with Clove Segments -->
      <!-- Center Main Segment -->
      <path d="M 50 14 C 46 22 22 36 22 62 C 22 80 34 88 50 88 C 66 88 78 80 78 62 C 78 36 54 22 50 14 Z" 
            fill="url(#${id}_bulbBase)" 
            stroke="#C084FC" 
            stroke-width="1.2" />

      <!-- Clove Segment Creases (Bulb Lobes) -->
      <path d="M 50 14 C 38 28 34 50 36 86" stroke="#9333EA" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.75" />
      <path d="M 50 14 C 62 28 66 50 64 86" stroke="#9333EA" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.75" />
      <path d="M 50 14 C 48 35 48 65 50 88" stroke="#A855F7" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.6" />

      <!-- 2. Characteristic Violet-Purple Striations (Ajo Morado) -->
      <path d="M 28 42 Q 26 58 30 72" stroke="url(#${id}_violetStreak)" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.75" />
      <path d="M 42 32 Q 40 55 42 78" stroke="url(#${id}_violetStreak)" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7" />
      <path d="M 58 32 Q 60 55 58 78" stroke="url(#${id}_violetStreak)" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7" />
      <path d="M 72 42 Q 74 58 70 72" stroke="url(#${id}_violetStreak)" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.75" />

      <!-- 3. Dry Papery Stem Neck at Top -->
      <path d="M 48 14 L 50 6 L 52 14 Z" fill="#D8B4FE" stroke="#7E22CE" stroke-width="0.8" />
      <path d="M 49 14 L 51 7 L 53 14" stroke="#581C87" stroke-width="0.6" />

      <!-- 4. Fibrous Root Basal Plate at Bottom -->
      <ellipse cx="50" cy="88" rx="8" ry="2.5" fill="#78350F" />
      <path d="M 46 89 Q 44 94 42 96 M 49 89 Q 49 95 48 97 M 52 89 Q 54 94 56 96" stroke="#D7CCC8" stroke-width="1" stroke-linecap="round" fill="none" />

      <!-- 5. Silky Specular Highlight on Bulb Lobes -->
      <path d="M 38 30 C 44 26 56 26 62 30" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.85" filter="url(#${id}_glossHighlight)" />
    </g>
  `;
}

export function renderGarlicSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Ajo Morado",
  } = props;
  const inner = renderGarlicInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const GarlicSvgModule: IngredientSvgModule = {
  id: "garlic",
  name: "Ajo",
  nameEn: "Garlic",
  nameDe: "Knoblauch",
  defaultState: "bulb",
  availableStates: ["bulb", "clove"],
  renderInnerSvg: renderGarlicInnerSvg,
  renderSvgString: renderGarlicSvgString,
};
