import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Chickpea (Garbanzo de Fuentesaúco) SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "whole" / "pile" / "default": Fuentesaúco chickpea celebrating the 1798 historical origin, with signature pronounced curved beak (pico), rugose matte skin, and warm buttery-sand gradient.
 */
export function renderChickpeaInnerSvg(props: IngredientSvgProps = {}): string {
  const { id = "chickpea_svg" } = props;

  return `
    <defs>
      ${getSharedDefs(id)}
      
      <!-- Buttery-Sand Chickpea Skin Gradient -->
      <radialGradient id="${id}_chickpeaBase" cx="36%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="30%" stopColor="#FEF3C7" />
        <stop offset="65%" stopColor="#FDE68A" />
        <stop offset="90%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#92400E" />
      </radialGradient>

      <!-- Rugose Skin Crease Tone -->
      <linearGradient id="${id}_creaseTone" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#B45309" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
    </defs>

    <g filter="url(#${id}_dropShadow)">
      <!-- 1. Main Botanical Chickpea Shape with Signature Curved Beak (Pico de Garbanzo) -->
      <path d="M 46 16 C 42 16 38 20 40 26 C 24 32 20 52 22 68 C 24 82 38 88 54 88 C 72 88 82 76 82 58 C 82 40 72 26 56 22 C 54 18 50 16 46 16 Z" 
            fill="url(#${id}_chickpeaBase)" 
            stroke="#92400E" 
            stroke-width="1.2" />

      <!-- 2. Characteristic Median Groove (Surco del Garbanzo) -->
      <path d="M 42 26 C 44 38 46 56 46 86" stroke="url(#${id}_creaseTone)" stroke-width="1.6" stroke-linecap="round" fill="none" opacity="0.75" />
      <path d="M 44 40 C 34 50 32 64 34 78" stroke="#D97706" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.6" />

      <!-- 3. Soft Matte Diffuse Highlight on Cheek -->
      <path d="M 52 32 C 62 30 72 36 72 48 C 66 42 58 40 52 38 Z" fill="#FFFFFF" opacity="0.65" filter="url(#${id}_glossHighlight)" />
      <ellipse cx="58" cy="40" rx="3" ry="5" fill="#FFFFFF" opacity="0.5" transform="rotate(15 58 40)" />

      <!-- 4. Subtle Earth Starch Pores -->
      <circle cx="34" cy="54" r="0.7" fill="#78350F" opacity="0.5" />
      <circle cx="68" cy="62" r="0.8" fill="#78350F" opacity="0.45" />
      <circle cx="56" cy="74" r="0.6" fill="#78350F" opacity="0.5" />
    </g>
  `;
}

export function renderChickpeaSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Garbanzo de Fuentesaúco (1798)",
  } = props;
  const inner = renderChickpeaInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const ChickpeaSvgModule: IngredientSvgModule = {
  id: "chickpea",
  name: "Garbanzo",
  nameEn: "Chickpea",
  nameDe: "Kichererbse",
  defaultState: "whole",
  availableStates: ["whole", "pile"],
  renderInnerSvg: renderChickpeaInnerSvg,
  renderSvgString: renderChickpeaSvgString,
};
