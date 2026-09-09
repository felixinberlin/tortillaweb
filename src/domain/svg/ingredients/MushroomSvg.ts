import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Mushroom (Boletus edulis) SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "whole" / "default": Wild king bolete (Boletus edulis / Ceps) with velvety chestnut-brown domed cap, creamy pore layer, and stout bulbous stipe with white reticulation mesh.
 */
export function renderMushroomInnerSvg(props: IngredientSvgProps = {}): string {
  const { id = "mushrooms_svg" } = props;

  return `
    <defs>
      ${getSharedDefs(id)}
      
      <!-- Velvety Chestnut-Brown Boletus Cap Base -->
      <radialGradient id="${id}_boletusCap" cx="38%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#A16207" />
        <stop offset="35%" stopColor="#78350F" />
        <stop offset="75%" stopColor="#451A03" />
        <stop offset="100%" stopColor="#1C0A00" />
      </radialGradient>

      <!-- Creamy Spongy Pore Tube Layer (Hymenium) -->
      <linearGradient id="${id}_poreLayer" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FEF9C3" />
        <stop offset="60%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>

      <!-- Bulbous Clubbed Stipe (Stem) -->
      <radialGradient id="${id}_stipeStem" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="50%" stopColor="#FEF3C7" />
        <stop offset="85%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#78350F" />
      </radialGradient>
    </defs>

    <g filter="url(#${id}_dropShadow)">
      <!-- 1. Bulbous Thick Stipe (Stem) -->
      <path d="M 38 48 C 36 60 28 72 32 84 C 36 88 64 88 68 84 C 72 72 64 60 62 48 Z" 
            fill="url(#${id}_stipeStem)" 
            stroke="#78350F" 
            stroke-width="1.2" />

      <!-- Fine White Reticulation Mesh Network on Stem -->
      <path d="M 38 56 Q 50 54 62 56 M 36 66 Q 50 64 64 66 M 34 76 Q 50 74 66 76" stroke="#FFFFFF" stroke-width="0.8" opacity="0.65" fill="none" />
      <path d="M 44 50 Q 42 70 44 86 M 56 50 Q 58 70 56 86" stroke="#FFFFFF" stroke-width="0.8" opacity="0.65" fill="none" />

      <!-- 2. Spongy Creamy-Yellow Pore Underside Layer -->
      <ellipse cx="50" cy="50" rx="34" ry="10" fill="url(#${id}_poreLayer)" stroke="#CA8A04" stroke-width="1" />

      <!-- 3. Velvety Domed Chestnut Cap (Pileus) -->
      <path d="M 16 48 C 14 30 28 16 50 16 C 72 16 86 30 84 48 C 76 52 24 52 16 48 Z" 
            fill="url(#${id}_boletusCap)" 
            stroke="#1C0A00" 
            stroke-width="1.2" />

      <!-- 4. Soft Satin Highlight on Dome -->
      <path d="M 32 26 C 40 20 60 20 68 26 C 58 22 42 22 32 28 Z" fill="#FFFFFF" opacity="0.55" filter="url(#${id}_glossHighlight)" />
      <ellipse cx="40" cy="28" rx="4" ry="2.2" fill="#FFFFFF" opacity="0.7" transform="rotate(-15 40 28)" />

      <!-- 5. Earth Dust on Stem Base -->
      <ellipse cx="50" cy="85" rx="16" ry="3" fill="#451A03" opacity="0.65" />
    </g>
  `;
}

export function renderMushroomSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Boletus Edulis",
  } = props;
  const inner = renderMushroomInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const MushroomSvgModule: IngredientSvgModule = {
  id: "mushrooms",
  name: "Setas / Boletus",
  nameEn: "Wild Mushrooms",
  nameDe: "Waldpilze",
  defaultState: "whole",
  availableStates: ["whole", "sliced"],
  renderInnerSvg: renderMushroomInnerSvg,
  renderSvgString: renderMushroomSvgString,
};
