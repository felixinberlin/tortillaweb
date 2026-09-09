import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Truffle SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "whole" / "default": Black winter truffle (Tuber melanosporum) with 3D faceted pyramidal peridium warts and earthy matte charcoal shading.
 * - "shavings": Translucent paper-thin carpaccio slice with intricate white-creamy gleba veins.
 */
export function renderTruffleInnerSvg(props: IngredientSvgProps = {}): string {
  const { state = "whole", id = "truffle_svg" } = props;

  if (state === "shavings" || state === "slice") {
    return `
      <defs>
        ${getSharedDefs(id)}
        <radialGradient id="${id}_gleba" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#27272A" />
          <stop offset="70%" stopColor="#18181B" />
          <stop offset="100%" stopColor="#09090B" />
        </radialGradient>
      </defs>
      <g filter="url(#${id}_dropShadow)">
        <!-- Carpaccio Truffle Shaving Disk -->
        <path d="M 22 52 C 18 36 32 20 54 18 C 76 16 86 32 84 54 C 82 74 68 84 46 84 C 26 84 24 68 22 52 Z" fill="url(#${id}_gleba)" stroke="#09090B" stroke-width="1.5" />
        <!-- Intricate White Gleba Vein Labyrinth -->
        <path d="M 32 30 Q 42 42 36 62 Q 45 52 56 68" stroke="#F5F5F4" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.85" />
        <path d="M 64 26 Q 52 38 68 50 Q 56 62 60 76" stroke="#F5F5F4" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.85" />
        <path d="M 44 22 Q 50 35 48 55 Q 38 48 26 50" stroke="#F5F5F4" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.8" />
      </g>
    `;
  }

  // DEFAULT: Whole Black Winter Truffle (Tuber melanosporum)
  return `
    <defs>
      ${getSharedDefs(id)}
      
      <!-- Charcoal-Sepia Truffle Base -->
      <radialGradient id="${id}_truffleBase" cx="38%" cy="30%" r="68%">
        <stop offset="0%" stopColor="#3F3F46" />
        <stop offset="35%" stopColor="#27272A" />
        <stop offset="70%" stopColor="#18181B" />
        <stop offset="100%" stopColor="#09090B" />
      </radialGradient>

      <!-- 3D Polygonal Pyramid Peridium Wart Shading -->
      <linearGradient id="${id}_wartTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#52525B" />
        <stop offset="100%" stopColor="#27272A" />
      </linearGradient>
    </defs>

    <g filter="url(#${id}_deepShadow)">
      <!-- 1. Organic Rounded Truffle Tuber Lump -->
      <path d="M 22 55 C 16 38 28 20 52 18 C 74 16 86 32 84 55 C 82 76 72 86 48 86 C 26 86 18 72 22 55 Z" 
            fill="url(#${id}_truffleBase)" 
            stroke="#09090B" 
            stroke-width="1.5" />

      <!-- 2. Faceted Polygonal Warts (Peridium) -->
      <!-- Center Cluster -->
      <polygon points="42,32 50,26 58,32 54,40 44,40" fill="url(#${id}_wartTop)" stroke="#09090B" stroke-width="0.8" />
      <polygon points="58,32 68,28 72,36 66,44 54,40" fill="#27272A" stroke="#09090B" stroke-width="0.8" />
      <polygon points="32,42 42,32 44,40 38,50 28,48" fill="#3F3F46" stroke="#09090B" stroke-width="0.8" />
      <polygon points="44,40 54,40 56,52 46,54 38,50" fill="url(#${id}_wartTop)" stroke="#09090B" stroke-width="0.8" />
      <polygon points="54,40 66,44 68,54 56,52" fill="#18181B" stroke="#09090B" stroke-width="0.8" />
      <polygon points="46,54 56,52 54,66 42,66 38,58" fill="#27272A" stroke="#09090B" stroke-width="0.8" />
      <polygon points="30,58 38,58 42,66 36,74 26,70" fill="#18181B" stroke="#09090B" stroke-width="0.8" />
      <polygon points="56,52 68,54 70,66 58,68 54,66" fill="#09090B" stroke="#18181B" stroke-width="0.8" />

      <!-- 3. Earth & Clay Soil Dust in Crevices -->
      <circle cx="43" cy="39" r="1.2" fill="#78350F" opacity="0.65" />
      <circle cx="55" cy="51" r="1.4" fill="#78350F" opacity="0.6" />
      <circle cx="37" cy="57" r="1" fill="#78350F" opacity="0.7" />
      <circle cx="67" cy="43" r="1.1" fill="#78350F" opacity="0.55" />

      <!-- 4. Subtle Diffuse Highlight on Upper Warts -->
      <polygon points="48,27 52,27 54,30 49,30" fill="#FFFFFF" opacity="0.4" />
      <polygon points="38,33 42,33 43,36 39,36" fill="#FFFFFF" opacity="0.35" />
    </g>
  `;
}

export function renderTruffleSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Trufa Negra",
  } = props;
  const inner = renderTruffleInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const TruffleSvgModule: IngredientSvgModule = {
  id: "truffle",
  name: "Trufa Negra",
  nameEn: "Black Truffle",
  nameDe: "Schwarzer Trüffel",
  defaultState: "whole",
  availableStates: ["whole", "shavings"],
  renderInnerSvg: renderTruffleInnerSvg,
  renderSvgString: renderTruffleSvgString,
};
