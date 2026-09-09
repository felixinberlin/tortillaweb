import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Salt SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "crystals" / "default": Prismatic pyramidal crystals of Flor de Sal catching diamond light facets and ambient shadows.
 * - "cellar": Traditional ceramic salt cellar with coarse salt grains.
 */
export function renderSaltInnerSvg(props: IngredientSvgProps = {}): string {
  const { id = "salt_svg" } = props;

  return `
    <defs>
      ${getSharedDefs(id)}
      
      <!-- Translucent Prismatic Sea Salt Gradient -->
      <linearGradient id="${id}_facetTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>

      <linearGradient id="${id}_facetLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#CBD5E1" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>

      <linearGradient id="${id}_facetRight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="100%" stopColor="#CBD5E1" />
      </linearGradient>
    </defs>

    <g filter="url(#${id}_dropShadow)">
      <!-- Master 3D Pyramidal Crystal of Flor de Sal (Añana / Es Trenc) -->
      <!-- Center Pyramid -->
      <g transform="translate(4, 2)">
        <polygon points="46,18 72,42 46,58 20,42" fill="url(#${id}_facetTop)" stroke="#FFFFFF" stroke-width="0.8" />
        <polygon points="20,42 46,58 46,84 20,68" fill="url(#${id}_facetLeft)" stroke="#94A3B8" stroke-width="0.8" />
        <polygon points="46,58 72,42 72,68 46,84" fill="url(#${id}_facetRight)" stroke="#CBD5E1" stroke-width="0.8" />
        
        <!-- Diamond Specular Light Glint on Peak -->
        <circle cx="46" cy="18" r="3" fill="#FFFFFF" filter="url(#${id}_glossHighlight)" />
        <polygon points="46,13 47.5,18 52,18 48,20 50,24 46,21 42,24 44,20 40,18 44.5,18" fill="#FFFFFF" />
      </g>

      <!-- Smaller Secondary Flake 1 (Left) -->
      <g transform="translate(-16, 20) scale(0.6)">
        <polygon points="46,22 68,42 46,58 24,42" fill="url(#${id}_facetTop)" />
        <polygon points="24,42 46,58 46,78 24,62" fill="url(#${id}_facetLeft)" />
        <polygon points="46,58 68,42 68,62 46,78" fill="url(#${id}_facetRight)" />
        <circle cx="46" cy="22" r="2" fill="#FFFFFF" />
      </g>

      <!-- Smaller Secondary Flake 2 (Right) -->
      <g transform="translate(38, 26) scale(0.55)">
        <polygon points="46,22 68,42 46,58 24,42" fill="url(#${id}_facetTop)" />
        <polygon points="24,42 46,58 46,78 24,62" fill="url(#${id}_facetLeft)" />
        <polygon points="46,58 68,42 68,62 46,78" fill="url(#${id}_facetRight)" />
      </g>

      <!-- Scattered Micro Sea Salt Grains -->
      <polygon points="26,76 28,74 30,76 28,78" fill="#FFFFFF" />
      <polygon points="70,78 72,76 74,78 72,80" fill="#FFFFFF" />
      <polygon points="56,86 58,84 60,86 58,88" fill="#FFFFFF" />
      <polygon points="38,24 39,23 40,24 39,25" fill="#FFFFFF" />
    </g>
  `;
}

export function renderSaltSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Flor de Sal Marina",
  } = props;
  const inner = renderSaltInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const SaltSvgModule: IngredientSvgModule = {
  id: "salt",
  name: "Sal Marina",
  nameEn: "Sea Salt",
  nameDe: "Meersalz",
  defaultState: "crystals",
  availableStates: ["crystals", "cellar"],
  renderInnerSvg: renderSaltInnerSvg,
  renderSvgString: renderSaltSvgString,
};
