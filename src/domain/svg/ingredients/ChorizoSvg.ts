import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Chorizo SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "slice" / "default": Rustic cut artisan chorizo slice with pimentón de la Vera paprika crimson hue, coarse meat grain, embedded white pork fat pearls, and glistening paprika oil sheen.
 * - "whole": Horseshoe string-bound chorizo link with cured rind bloom.
 */
export function renderChorizoInnerSvg(props: IngredientSvgProps = {}): string {
  const { state = "slice", id = "chorizo_svg" } = props;

  if (state === "whole") {
    return `
      <defs>
        ${getSharedDefs(id)}
        <radialGradient id="${id}_chorizoSkin" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="35%" stopColor="#DC2626" />
          <stop offset="70%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#450A0A" />
        </radialGradient>
      </defs>
      <g filter="url(#${id}_deepShadow)">
        <!-- Horseshoe Artisan Chorizo -->
        <path d="M 28 80 C 20 60 22 30 50 24 C 78 30 80 60 72 80 C 64 78 62 48 50 44 C 38 48 36 78 28 80 Z" fill="url(#${id}_chorizoSkin)" stroke="#450A0A" stroke-width="1.5" />
        <!-- White Mold / Bloom Powder -->
        <ellipse cx="50" cy="26" rx="8" ry="3" fill="#FFFFFF" opacity="0.3" />
        <ellipse cx="28" cy="52" rx="4" ry="7" fill="#FFFFFF" opacity="0.25" />
        <!-- Butcher Twine Tie -->
        <path d="M 28 80 Q 50 85 72 80" stroke="#FDE68A" stroke-width="2" fill="none" />
        <path d="M 50 85 L 50 94" stroke="#FDE68A" stroke-width="2" />
      </g>
    `;
  }

  // DEFAULT: Slice of Artisan Cured Riojan / Cantimpalos Chorizo
  return `
    <defs>
      ${getSharedDefs(id)}
      
      <!-- Cured Pork & Pimentón Paprika Crimson Base -->
      <radialGradient id="${id}_meatBase" cx="42%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="35%" stopColor="#DC2626" />
        <stop offset="75%" stopColor="#B91C1C" />
        <stop offset="92%" stopColor="#7F1D1D" />
        <stop offset="100%" stopColor="#450A0A" />
      </radialGradient>

      <!-- Natural Casing Collagen Rim -->
      <linearGradient id="${id}_casingRim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7F1D1D" />
        <stop offset="50%" stopColor="#450A0A" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>

      <!-- Pearlescent White Fat Ingot -->
      <radialGradient id="${id}_fatPearl" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="70%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FCD34D" />
      </radialGradient>
    </defs>

    <g filter="url(#${id}_dropShadow)">
      <!-- 1. Chorizo Slice Outer Oval Disk -->
      <path d="M 18 50 C 16 32 30 18 50 16 C 72 15 86 28 85 48 C 84 70 70 86 48 85 C 28 84 19 68 18 50 Z" 
            fill="url(#${id}_meatBase)" 
            stroke="url(#${id}_casingRim)" 
            stroke-width="2.5" />

      <!-- 2. Coarse Iberian Fat Pearls (White Marbling) -->
      <!-- Fat Pearl 1 -->
      <ellipse cx="36" cy="38" rx="6" ry="4.5" fill="url(#${id}_fatPearl)" stroke="#B91C1C" stroke-width="0.6" transform="rotate(-20 36 38)" />
      <!-- Fat Pearl 2 -->
      <ellipse cx="62" cy="40" rx="5" ry="4" fill="url(#${id}_fatPearl)" stroke="#B91C1C" stroke-width="0.6" transform="rotate(15 62 40)" />
      <!-- Fat Pearl 3 -->
      <ellipse cx="50" cy="58" rx="7" ry="5" fill="url(#${id}_fatPearl)" stroke="#B91C1C" stroke-width="0.6" transform="rotate(5 50 58)" />
      <!-- Fat Pearl 4 -->
      <ellipse cx="32" cy="62" rx="4.5" ry="3.5" fill="url(#${id}_fatPearl)" stroke="#B91C1C" stroke-width="0.6" transform="rotate(-35 32 62)" />
      <!-- Fat Pearl 5 -->
      <ellipse cx="68" cy="60" rx="5" ry="3.8" fill="url(#${id}_fatPearl)" stroke="#B91C1C" stroke-width="0.6" transform="rotate(25 68 60)" />
      <!-- Small bits -->
      <circle cx="48" cy="32" r="2.2" fill="url(#${id}_fatPearl)" />
      <circle cx="58" cy="72" r="2.5" fill="url(#${id}_fatPearl)" />
      <circle cx="26" cy="48" r="1.8" fill="url(#${id}_fatPearl)" />

      <!-- 3. Coarse Ground Spices & Pimentón Specks -->
      <circle cx="42" cy="48" r="1" fill="#450A0A" />
      <circle cx="55" cy="46" r="0.9" fill="#450A0A" />
      <circle cx="38" cy="54" r="0.8" fill="#450A0A" />
      <circle cx="62" cy="50" r="1.1" fill="#450A0A" />

      <!-- 4. Paprika Oil Glisten Sheen -->
      <path d="M 30 30 C 42 24 58 24 68 32 C 58 28 44 28 30 34 Z" fill="#FFFFFF" opacity="0.65" filter="url(#${id}_glossHighlight)" />
      <ellipse cx="38" cy="32" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.85" />
      
      <!-- Glistening Paprika Oil Droplet -->
      <circle cx="46" cy="42" r="1.5" fill="#F97316" opacity="0.95" />
      <circle cx="60" cy="64" r="1.8" fill="#F97316" opacity="0.95" />
    </g>
  `;
}

export function renderChorizoSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Chorizo Artesano",
  } = props;
  const inner = renderChorizoInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const ChorizoSvgModule: IngredientSvgModule = {
  id: "chorizo",
  name: "Chorizo",
  nameEn: "Chorizo",
  nameDe: "Chorizo",
  defaultState: "slice",
  availableStates: ["slice", "whole"],
  renderInnerSvg: renderChorizoInnerSvg,
  renderSvgString: renderChorizoSvgString,
};
