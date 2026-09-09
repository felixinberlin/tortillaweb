import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Piquillo Pepper SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "whole" / "roasted" / "default": Wood-fire roasted Piquillo de Lodosa pod with blistered blackened fire-roasted spots, triangular beak curve, and sweet glossy sheen.
 */
export function renderPiquilloPepperInnerSvg(props: IngredientSvgProps = {}): string {
  const { id = "peppers_svg" } = props;

  return `
    <defs>
      ${getSharedDefs(id)}
      
      <!-- Fire-Roasted Sweet Crimson Pepper Base -->
      <radialGradient id="${id}_pepperBase" cx="38%" cy="32%" r="68%">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="25%" stopColor="#EF4444" />
        <stop offset="65%" stopColor="#B91C1C" />
        <stop offset="90%" stopColor="#7F1D1D" />
        <stop offset="100%" stopColor="#450A0A" />
      </radialGradient>

      <!-- Wood-Fire Blackened Char Spot Gradient -->
      <radialGradient id="${id}_fireChar" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#1C1917" />
        <stop offset="70%" stopColor="#292524" />
        <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
      </radialGradient>
    </defs>

    <g filter="url(#${id}_dropShadow)">
      <!-- 1. Roasted Piquillo Pod Contour (Triangular beak curve) -->
      <path d="M 38 18 C 52 16 68 20 70 34 C 72 52 64 74 48 88 C 44 92 40 88 40 82 C 38 68 26 50 26 36 C 26 22 30 18 38 18 Z" 
            fill="url(#${id}_pepperBase)" 
            stroke="#450A0A" 
            stroke-width="1.2" />

      <!-- 2. Wood-Fire Roasted Black Char Blisters (Asado a la leña) -->
      <ellipse cx="44" cy="38" rx="8" ry="4.5" fill="url(#${id}_fireChar)" transform="rotate(-15 44 38)" />
      <ellipse cx="56" cy="54" rx="7" ry="4" fill="url(#${id}_fireChar)" transform="rotate(20 56 54)" />
      <ellipse cx="42" cy="68" rx="5" ry="3" fill="url(#${id}_fireChar)" transform="rotate(-10 42 68)" />
      <ellipse cx="50" cy="28" rx="4" ry="2" fill="url(#${id}_fireChar)" />

      <!-- 3. Roasted Juice Glisten Sheen (Natural sweet caramelized skin) -->
      <path d="M 34 26 C 42 20 54 22 60 28 C 52 24 40 24 34 30 Z" fill="#FFFFFF" opacity="0.8" filter="url(#${id}_glossHighlight)" />
      <ellipse cx="38" cy="28" rx="3.5" ry="1.5" fill="#FFFFFF" opacity="0.95" />
      <ellipse cx="60" cy="42" rx="3" ry="6" fill="#FFFFFF" opacity="0.6" transform="rotate(15 60 42)" />
      
      <!-- Stem Tip -->
      <path d="M 46 18 Q 48 10 52 8" stroke="#15803D" stroke-width="2.5" stroke-linecap="round" fill="none" />
    </g>
  `;
}

export function renderPiquilloPepperSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Pimiento del Piquillo",
  } = props;
  const inner = renderPiquilloPepperInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const PiquilloPepperSvgModule: IngredientSvgModule = {
  id: "peppers",
  name: "Pimientos",
  nameEn: "Piquillo Peppers",
  nameDe: "Piquillo-Paprika",
  defaultState: "whole",
  availableStates: ["whole", "roasted"],
  renderInnerSvg: renderPiquilloPepperInnerSvg,
  renderSvgString: renderPiquilloPepperSvgString,
};
