import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Onion SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "caramelized" / "default": Jammy, deep amber-mahogany slow-cooked onion ribbons with glossy sugar syrup glisten and roasted edges.
 * - "whole": Spanish golden onion bulb with silky papery tunic, vertical skin striations, fibrous root beard, and copper shine.
 * - "pochada": Translucent sweet simmered onion strips in extra virgin olive oil.
 */
export function renderOnionInnerSvg(props: IngredientSvgProps = {}): string {
  const { state = "caramelized", id = "onion_svg" } = props;

  if (state === "whole") {
    return `
      <defs>
        ${getSharedDefs(id)}
        <radialGradient id="${id}_onionTunic" cx="36%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="30%" stopColor="#FB923C" />
          <stop offset="65%" stopColor="#C2410C" />
          <stop offset="90%" stopColor="#7C2D12" />
          <stop offset="100%" stopColor="#431407" />
        </radialGradient>
      </defs>
      <g filter="url(#${id}_deepShadow)">
        <!-- Natural Onion Contour with Pointed Neck and Rounded Base -->
        <path d="M 50 14 C 47 18 20 32 20 62 C 20 80 34 88 50 88 C 66 88 80 80 80 62 C 80 32 53 18 50 14 Z" fill="url(#${id}_onionTunic)" />
        
        <!-- Papery Neck Tip -->
        <path d="M 47 14 L 50 8 L 53 14 Z" fill="#7C2D12" />
        <path d="M 49 14 L 51 9 L 52 14" stroke="#431407" stroke-width="0.8" />

        <!-- Vertical Silk Striations (Fibers of the tunic) -->
        <path d="M 50 14 C 36 28 32 50 32 78" stroke="#9A3412" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.6" />
        <path d="M 50 14 C 42 30 42 56 44 86" stroke="#9A3412" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.6" />
        <path d="M 50 14 C 58 30 58 56 56 86" stroke="#9A3412" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.6" />
        <path d="M 50 14 C 64 28 68 50 68 78" stroke="#9A3412" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.6" />

        <!-- Silky Specular Highlight on Shoulder -->
        <path d="M 36 34 C 44 26 56 26 62 34 C 54 30 44 30 36 34 Z" fill="#FFFFFF" opacity="0.6" filter="url(#${id}_glossHighlight)" />
        <ellipse cx="40" cy="38" rx="4" ry="7" fill="#FFFFFF" opacity="0.4" transform="rotate(-15 40 38)" />

        <!-- Root Tuft (Beard) at Bottom -->
        <path d="M 46 88 Q 44 94 42 96 M 48 88 Q 48 95 49 97 M 52 88 Q 54 94 57 95 M 50 88 L 50 96" stroke="#D7CCC8" stroke-width="1" stroke-linecap="round" fill="none" />
      </g>
    `;
  }

  // DEFAULT: Caramelized Onion Jam Ribbons (#8D6E63 + Molasses Umber + Glistening Sheen)
  return `
    <defs>
      ${getSharedDefs(id)}
      
      <linearGradient id="${id}_caramelMain" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D97706" />
        <stop offset="35%" stopColor="#8D6E63" />
        <stop offset="75%" stopColor="#5D4037" />
        <stop offset="100%" stopColor="#3E2723" />
      </linearGradient>

      <linearGradient id="${id}_caramelGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>

    <g filter="url(#${id}_dropShadow)">
      <!-- 1. Background Jammy Syrup Base -->
      <path d="M 22 55 C 18 42 35 30 58 32 C 82 34 86 52 80 68 C 74 84 45 86 28 80 C 18 76 24 64 22 55 Z" fill="#4E342E" opacity="0.85" />
      
      <!-- 2. Primary Caramelized Ribbon Ribbon Loop 1 -->
      <path d="M 20 62 C 28 40 52 38 78 45 C 84 46 86 54 78 58 C 56 65 35 62 20 62 Z" 
            fill="url(#${id}_caramelMain)" 
            stroke="#3E2723" 
            stroke-width="1" />

      <!-- 3. Intertwined Ribbon 2 -->
      <path d="M 28 42 C 45 32 68 35 82 52 C 75 62 58 55 42 58 C 30 60 26 50 28 42 Z" 
            fill="url(#${id}_caramelMain)" 
            stroke="#271505" 
            stroke-width="1" />

      <!-- 4. Glistening Golden-Sugar Edges (Slow reduction Maillard reaction) -->
      <path d="M 26 50 C 44 40 64 42 78 50" stroke="url(#${id}_caramelGold)" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <path d="M 32 60 C 48 54 62 56 74 62" stroke="#FBBF24" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.9" />
      <path d="M 38 72 C 50 66 65 68 76 74" stroke="#D97706" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8" />

      <!-- 5. Glossy Viscous Syrupy Specular Reflections -->
      <path d="M 36 44 C 48 38 60 40 68 46" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.75" filter="url(#${id}_glossHighlight)" />
      <ellipse cx="44" cy="42" rx="4" ry="1.5" fill="#FFFFFF" opacity="0.85" transform="rotate(-10 44 42)" />
      <ellipse cx="62" cy="50" rx="3.5" ry="1.5" fill="#FFFFFF" opacity="0.8" transform="rotate(15 62 50)" />
      
      <!-- Olive Oil Droplet Fusion -->
      <circle cx="28" cy="68" r="2" fill="#EAB308" opacity="0.9" />
      <circle cx="74" cy="44" r="1.8" fill="#EAB308" opacity="0.9" />
    </g>
  `;
}

export function renderOnionSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Cebolla Caramelizada",
  } = props;
  const inner = renderOnionInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const OnionSvgModule: IngredientSvgModule = {
  id: "onion",
  name: "Cebolla",
  nameEn: "Onion",
  nameDe: "Zwiebel",
  defaultState: "caramelized",
  availableStates: ["caramelized", "whole", "pochada"],
  renderInnerSvg: renderOnionInnerSvg,
  renderSvgString: renderOnionSvgString,
};
