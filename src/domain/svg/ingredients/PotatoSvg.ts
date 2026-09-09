import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Potato SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "panadera" / "slice" / "default": Translucent confit potato disk with blistered golden-brown caramelized edges, fried starch texture, and glistening olive oil coat.
 * - "whole": Monalisa/Agria whole potato tuber with organic shape, natural eyes/indents, earthy skin tone, and realistic drop shadow.
 * - "dados" / "cubes": Golden fried potato cube with crisp Maillard corners and fluffy tender core.
 * - "chascada": Hand-cracked rustic potato chunk with rough fractured edges and released starch.
 * - "paja": Fine golden crispy straw potato nest.
 */
export function renderPotatoInnerSvg(props: IngredientSvgProps = {}): string {
  const { state = "panadera", id = "potato_svg" } = props;

  if (state === "whole") {
    return `
      <defs>
        ${getSharedDefs(id)}
        <radialGradient id="${id}_potatoSkin" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF3D6" />
          <stop offset="25%" stopColor="#F5DCB0" />
          <stop offset="65%" stopColor="#C99859" />
          <stop offset="90%" stopColor="#8C5C28" />
          <stop offset="100%" stopColor="#57330D" />
        </radialGradient>
        
        <radialGradient id="${id}_potatoEye" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#4A2A0C" />
          <stop offset="70%" stopColor="#8C5C28" />
          <stop offset="100%" stopColor="#C99859" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      <g filter="url(#${id}_deepShadow)">
        <!-- Natural Organic Asymmetric Tuber Contour (Monalisa / Agria) -->
        <path d="M 22 55 C 16 38 28 22 52 20 C 72 18 86 30 84 52 C 82 72 74 84 50 86 C 30 88 18 72 22 55 Z" fill="url(#${id}_potatoSkin)" />
        
        <!-- Natural Eyes / Dimples -->
        <!-- Eye 1 -->
        <ellipse cx="38" cy="40" rx="3.5" ry="2" fill="url(#${id}_potatoEye)" transform="rotate(-15 38 40)" />
        <path d="M 35 41 Q 38 39 41 41" stroke="#3D2005" stroke-width="0.8" fill="none" stroke-linecap="round" />
        
        <!-- Eye 2 -->
        <ellipse cx="64" cy="46" rx="4" ry="2.2" fill="url(#${id}_potatoEye)" transform="rotate(20 64 46)" />
        <path d="M 61 47 Q 64 45 67 47" stroke="#3D2005" stroke-width="0.8" fill="none" stroke-linecap="round" />
        
        <!-- Eye 3 -->
        <ellipse cx="46" cy="66" rx="3" ry="1.8" fill="url(#${id}_potatoEye)" transform="rotate(5 46 66)" />
        <path d="M 44 67 Q 46 65 48 67" stroke="#3D2005" stroke-width="0.8" fill="none" stroke-linecap="round" />

        <!-- Earth / Soil Specks -->
        <circle cx="30" cy="52" r="0.7" fill="#3D2005" opacity="0.6" />
        <circle cx="70" cy="62" r="0.9" fill="#3D2005" opacity="0.5" />
        <circle cx="58" cy="32" r="0.6" fill="#3D2005" opacity="0.5" />
        <circle cx="26" cy="38" r="0.5" fill="#3D2005" opacity="0.5" />

        <!-- Diffuse Highlight on Upper Brow -->
        <path d="M 38 28 C 50 24 64 26 72 34 C 64 30 48 30 38 36 Z" fill="#FFFFFF" opacity="0.45" filter="url(#${id}_glossHighlight)" />
      </g>
    `;
  }

  if (state === "dados" || state === "cubes") {
    return `
      <defs>
        ${getSharedDefs(id)}
        <linearGradient id="${id}_cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="60%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#EAB308" />
        </linearGradient>
        <linearGradient id="${id}_cubeLeft" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        <linearGradient id="${id}_cubeRight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#854D0E" />
        </linearGradient>
      </defs>
      <g filter="url(#${id}_dropShadow)">
        <!-- 3D Fried Potato Cube Isometric -->
        <!-- Right Face -->
        <polygon points="52,48 80,36 80,68 52,82" fill="url(#${id}_cubeRight)" stroke="#78350F" stroke-width="1.2" />
        <!-- Left Face -->
        <polygon points="22,36 52,48 52,82 22,68" fill="url(#${id}_cubeLeft)" stroke="#78350F" stroke-width="1.2" />
        <!-- Top Face -->
        <polygon points="52,18 80,36 52,48 22,36" fill="url(#${id}_cubeTop)" stroke="#B45309" stroke-width="1.2" />

        <!-- Fried Blister Markings -->
        <ellipse cx="48" cy="34" rx="6" ry="3" fill="#B45309" opacity="0.6" transform="rotate(-15 48 34)" />
        <ellipse cx="64" cy="54" rx="4" ry="7" fill="#78350F" opacity="0.5" />
        
        <!-- Salt crystal on top vertex -->
        <polygon points="52,18 55,16 57,19 54,21" fill="#FFFFFF" opacity="0.95" />
      </g>
    `;
  }

  // DEFAULT: Panadera Confit Slice (Translucent Tender Center + Crisp Caramelized Rim)
  return `
    <defs>
      ${getSharedDefs(id)}
      
      <!-- Confit Potato Flesh: Translucent Golden Cream Core with Starch Gradient -->
      <radialGradient id="${id}_flesh" cx="42%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="35%" stopColor="#FEF08A" />
        <stop offset="70%" stopColor="#FACC15" />
        <stop offset="90%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#CA8A04" />
      </radialGradient>

      <!-- Fried Blister Edge Gradient (Maillard) -->
      <linearGradient id="${id}_crispEdge" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B45309" />
        <stop offset="50%" stopColor="#78350F" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>

      <radialGradient id="${id}_blister" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#D97706" />
        <stop offset="80%" stopColor="#78350F" />
        <stop offset="100%" stopColor="#451A03" />
      </radialGradient>
    </defs>

    <g filter="url(#${id}_dropShadow)">
      <!-- 1. Potato Slice Outer Disk (Natural Hand-Sliced Wavy Edge) -->
      <path d="M 18 50 C 16 32 30 18 50 16 C 72 14 86 28 85 48 C 84 70 70 86 48 85 C 28 84 19 68 18 50 Z" 
            fill="url(#${id}_flesh)" 
            stroke="url(#${id}_crispEdge)" 
            stroke-width="2.5" />

      <!-- 2. Crispy Caramelized Toast Blisters on Edges (Fritura / Confit) -->
      <!-- Blister Top-Right -->
      <path d="M 62 18 C 74 20 84 28 85 40 C 78 35 70 26 62 18 Z" fill="url(#${id}_blister)" opacity="0.85" />
      
      <!-- Blister Bottom-Left -->
      <path d="M 20 58 C 18 70 28 82 40 85 C 32 78 24 68 20 58 Z" fill="url(#${id}_blister)" opacity="0.85" />
      
      <!-- Surface Toast Spots -->
      <ellipse cx="36" cy="38" rx="6" ry="3.5" fill="#B45309" opacity="0.65" transform="rotate(-20 36 38)" />
      <ellipse cx="62" cy="60" rx="8" ry="4" fill="#92400E" opacity="0.6" transform="rotate(30 62 60)" />
      <ellipse cx="46" cy="65" rx="5" ry="2.5" fill="#B45309" opacity="0.5" transform="rotate(-10 46 65)" />

      <!-- 3. Starch Fiber Striations -->
      <path d="M 32 46 C 45 42 60 48 70 44" stroke="#FDE047" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.8" />
      <path d="M 36 55 C 48 52 58 58 66 54" stroke="#FDE047" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.75" />

      <!-- 4. Glistening Extra Virgin Olive Oil Coat Sheen -->
      <path d="M 32 28 C 42 22 58 24 68 32 C 58 28 44 28 32 34 Z" fill="#FFFFFF" opacity="0.75" filter="url(#${id}_glossHighlight)" />
      <ellipse cx="36" cy="30" rx="3.5" ry="1.8" fill="#FFFFFF" opacity="0.9" />
      <circle cx="68" cy="46" r="1.5" fill="#FFFFFF" opacity="0.8" />
      <circle cx="50" cy="50" r="1.2" fill="#FFFFFF" opacity="0.7" />

      <!-- 5. Flakes of Pyramidal Sea Salt -->
      <polygon points="46,38 49,35 52,38 49,41" fill="#FFFFFF" opacity="0.95" />
      <polygon points="56,48 58,46 60,48 58,50" fill="#FFFFFF" opacity="0.9" />
    </g>
  `;
}

export function renderPotatoSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Patata Monalisa",
  } = props;
  const inner = renderPotatoInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const PotatoSvgModule: IngredientSvgModule = {
  id: "potato",
  name: "Patata",
  nameEn: "Potato",
  nameDe: "Kartoffel",
  defaultState: "panadera",
  availableStates: ["panadera", "whole", "dados", "chascada"],
  renderInnerSvg: renderPotatoInnerSvg,
  renderSvgString: renderPotatoSvgString,
};
