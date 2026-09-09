import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Sobrasada de Mallorca SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "spread" / "default": Rich, coarse, paprika-orange artisanal Sobrasada de Mallorca paste smear with glistening oleic fat and pimentón flakes.
 * - "whole": String-bound traditional sobrasada in natural casing.
 */
export function renderSobrasadaInnerSvg(props: IngredientSvgProps = {}): string {
  const { id = "sobrasada_svg" } = props;

  return `
    <defs>
      ${getSharedDefs(id)}
      
      <!-- Paprika-Orange Pork Paste Gradient -->
      <radialGradient id="${id}_sobrasadaBase" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="35%" stopColor="#F97316" />
        <stop offset="70%" stopColor="#EA580C" />
        <stop offset="90%" stopColor="#C2410C" />
        <stop offset="100%" stopColor="#7C2D12" />
      </radialGradient>

      <!-- Glistening Oleic Fat Sheen -->
      <linearGradient id="${id}_fatGlisten" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
      </linearGradient>
    </defs>

    <g filter="url(#${id}_dropShadow)">
      <!-- 1. Artisanal Textured Smear of Sobrasada -->
      <path d="M 18 56 C 14 38 32 24 55 24 C 76 24 86 38 84 58 C 82 76 62 84 38 82 C 22 80 20 68 18 56 Z" 
            fill="url(#${id}_sobrasadaBase)" 
            stroke="#7C2D12" 
            stroke-width="1.5" />

      <!-- 2. Coarse Iberian Fat Specks Interspersed in Paste -->
      <ellipse cx="36" cy="42" rx="4" ry="2.5" fill="#FEF3C7" opacity="0.9" transform="rotate(-15 36 42)" />
      <ellipse cx="62" cy="46" rx="5" ry="3" fill="#FEF3C7" opacity="0.9" transform="rotate(20 62 46)" />
      <ellipse cx="48" cy="62" rx="4.5" ry="2.5" fill="#FEF3C7" opacity="0.85" transform="rotate(-5 48 62)" />
      <circle cx="28" cy="58" r="2" fill="#FEF3C7" opacity="0.9" />
      <circle cx="68" cy="64" r="2.2" fill="#FEF3C7" opacity="0.85" />

      <!-- 3. Pimentón de Tap de Cortí Crimson Specks -->
      <circle cx="44" cy="36" r="1.1" fill="#450A0A" />
      <circle cx="56" cy="38" r="1" fill="#450A0A" />
      <circle cx="38" cy="52" r="0.9" fill="#450A0A" />
      <circle cx="54" cy="54" r="1.2" fill="#450A0A" />

      <!-- 4. Glistening Oleic Honeyed Fat Droplets (Warm melting spread) -->
      <path d="M 32 32 C 45 26 62 28 72 36 C 60 32 44 32 32 38 Z" fill="url(#${id}_fatGlisten)" filter="url(#${id}_glossHighlight)" />
      <ellipse cx="42" cy="34" rx="3.5" ry="1.5" fill="#FFFFFF" opacity="0.8" />
      <circle cx="60" cy="52" r="1.8" fill="#FFFFFF" opacity="0.75" />
    </g>
  `;
}

export function renderSobrasadaSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Sobrasada de Mallorca",
  } = props;
  const inner = renderSobrasadaInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const SobrasadaSvgModule: IngredientSvgModule = {
  id: "sobrasada",
  name: "Sobrasada",
  nameEn: "Sobrasada",
  nameDe: "Sobrasada",
  defaultState: "spread",
  availableStates: ["spread", "whole"],
  renderInnerSvg: renderSobrasadaInnerSvg,
  renderSvgString: renderSobrasadaSvgString,
};
