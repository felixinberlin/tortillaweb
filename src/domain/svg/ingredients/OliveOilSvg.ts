import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Olive Oil (AOVE) SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "droplet" / "default": Viscous liquid-gold teardrop with caustic emerald-gold reflections, double specular highlights, and surface tension pool.
 * - "bottle" / "pour": Marquina glass aceitera with smooth stream of golden-green oil flowing in an arc.
 * - "pool": Glistening liquid gold puddle with surface tension rim and concentric oil ripples.
 */
export function renderOliveOilInnerSvg(props: IngredientSvgProps = {}): string {
  const { state = "droplet", id = "oil_svg" } = props;

  if (state === "bottle" || state === "pour") {
    return `
      <defs>
        ${getSharedDefs(id)}
        <linearGradient id="${id}_glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#047857" stopOpacity="0.75" />
          <stop offset="80%" stopColor="#064E3B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>
        <radialGradient id="${id}_oilLiquid" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#EAB308" />
          <stop offset="75%" stopColor="#65A30D" />
          <stop offset="100%" stopColor="#365314" />
        </radialGradient>
      </defs>
      <g filter="url(#${id}_dropShadow)">
        <!-- Traditional Spanish Glass Aceitera (Cruet) -->
        <!-- Glass Body Flask Cone -->
        <polygon points="35,38 65,38 82,78 18,78" fill="url(#${id}_glass)" stroke="#065F46" stroke-width="1.5" />
        
        <!-- Oil Reservoir Level Inside Flask -->
        <polygon points="26,52 74,52 80,76 20,76" fill="url(#${id}_oilLiquid)" />
        
        <!-- Glass Spout Neck -->
        <path d="M 50 38 L 50 20 C 50 16 62 14 68 12" stroke="#047857" stroke-width="4" stroke-linecap="round" fill="none" />
        <path d="M 50 38 L 50 20 C 50 16 62 14 68 12" stroke="#A7F3D0" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.8" />
        
        <!-- Stream Pouring from Spout -->
        <path d="M 68 12 C 78 14 84 32 84 55 C 84 75 78 86 78 90" stroke="url(#${id}_oilLiquid)" stroke-width="3" stroke-linecap="round" fill="none" />
        <circle cx="78" cy="92" r="2.5" fill="#FEF08A" filter="url(#${id}_glossHighlight)" />
        
        <!-- Specular Line on Glass -->
        <path d="M 28 44 L 22 74" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.65" />
      </g>
    `;
  }

  // DEFAULT: Liquid Gold Droplet (Extra Virgin Olive Oil / Picual-Arbequina blend)
  return `
    <defs>
      ${getSharedDefs(id)}
      
      <!-- Liquid Gold-Emerald Caustic Gradient -->
      <radialGradient id="${id}_oilDrop" cx="38%" cy="32%" r="68%">
        <stop offset="0%" stopColor="#FEF9C3" />
        <stop offset="25%" stopColor="#FACC15" />
        <stop offset="60%" stopColor="#84CC16" />
        <stop offset="85%" stopColor="#4D7C0F" />
        <stop offset="100%" stopColor="#1A2E05" />
      </radialGradient>

      <!-- Inner Glowing Caustic Ring -->
      <radialGradient id="${id}_caustic" cx="50%" cy="75%" r="45%">
        <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#A3E635" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#4D7C0F" stopOpacity="0" />
      </radialGradient>
      
      <!-- Surface Tension Ground Pool -->
      <radialGradient id="${id}_groundPool" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#EAB308" stopOpacity="0.6" />
        <stop offset="70%" stopColor="#65A30D" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#365314" stopOpacity="0" />
      </radialGradient>
    </defs>

    <g filter="url(#${id}_dropShadow)">
      <!-- 1. Glistening Base Oil Ripple Pool -->
      <ellipse cx="50" cy="80" rx="36" ry="10" fill="url(#${id}_groundPool)" />
      <ellipse cx="50" cy="80" rx="28" ry="6.5" fill="#EAB308" opacity="0.35" />

      <!-- 2. Viscous Teardrop Geometry (Tapered crown, weighted bulbous belly) -->
      <path d="M 50 14 C 50 14 26 50 26 65 C 26 79 37 88 50 88 C 63 88 74 79 74 65 C 74 50 50 14 50 14 Z" 
            fill="url(#${id}_oilDrop)" 
            stroke="#4D7C0F" 
            stroke-width="1" />

      <!-- 3. Internal Caustic Light Transmission on Bottom (Fresnel effect) -->
      <path d="M 32 66 C 32 78 40 85 50 85 C 60 85 68 78 68 66 C 68 74 60 80 50 80 C 40 80 32 74 32 66 Z" fill="url(#${id}_caustic)" />

      <!-- 4. Primary Specular Softbox Highlight (Liquid gloss curvature) -->
      <path d="M 46 25 C 41 35 34 50 34 62 C 34 68 37 72 38 68 C 39 60 45 44 48 30 C 49 26 48 24 46 25 Z" 
            fill="#FFFFFF" 
            opacity="0.88" 
            filter="url(#${id}_glossHighlight)" />
      
      <!-- 5. Secondary Pinpoint Glints -->
      <ellipse cx="40" cy="56" rx="3" ry="5.5" fill="#FFFFFF" opacity="0.95" transform="rotate(-15 40 56)" />
      <circle cx="62" cy="65" r="2.2" fill="#FFFFFF" opacity="0.75" />
      <circle cx="58" cy="74" r="1.4" fill="#FEF08A" opacity="0.8" />
    </g>
  `;
}

export function renderOliveOilSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Aceite de Oliva Virgen Extra",
  } = props;
  const inner = renderOliveOilInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const OliveOilSvgModule: IngredientSvgModule = {
  id: "olive_oil",
  name: "Aceite de Oliva",
  nameEn: "Olive Oil",
  nameDe: "Olivenöl",
  defaultState: "droplet",
  availableStates: ["droplet", "bottle", "pool"],
  renderInnerSvg: renderOliveOilInnerSvg,
  renderSvgString: renderOliveOilSvgString,
};
