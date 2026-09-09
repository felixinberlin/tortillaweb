import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Egg SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "raw" / "cracked" / "default": High-dome golden-orange yolk with 3D spherical depth, studio softbox reflections, chalaza cord, and layered translucent albumen with refractive rim.
 * - "whole" / "shell": Farm-fresh egg with authentic ovoid geometry, fine calcium mineral freckles, directional key light, and warm subsurface bounce.
 * - "coagulated" / "curd": Soft, custardy, golden egg folds at 70°C, delicate glossy ripples, and gentle toasted crests.
 */
export function renderEggInnerSvg(props: IngredientSvgProps = {}): string {
  const { state = "raw", id = "egg_svg" } = props;

  if (state === "whole" || state === "shell") {
    return `
      <defs>
        ${getSharedDefs(id)}
        <radialGradient id="${id}_shellBase" cx="36%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#FFF4EA" />
          <stop offset="25%" stopColor="#F5DCB7" />
          <stop offset="60%" stopColor="#D99B65" />
          <stop offset="88%" stopColor="#9C5A2B" />
          <stop offset="100%" stopColor="#5E2C0C" />
        </radialGradient>
        
        <radialGradient id="${id}_shellBounceLight" cx="65%" cy="85%" r="45%">
          <stop offset="0%" stopColor="#FCE7D0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#9C5A2B" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="${id}_specular" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      <g filter="url(#${id}_deepShadow)">
        <!-- Natural Asymmetric Egg Geometry (Pointed crown, bulbous base) -->
        <path d="M 50 12 C 34 12 21 38 21 61 C 21 78 34 90 50 90 C 66 90 79 78 79 61 C 79 38 66 12 50 12 Z" fill="url(#${id}_shellBase)" />
        
        <!-- Ambient Warm Bounce Light on Bottom Right -->
        <path d="M 50 12 C 34 12 21 38 21 61 C 21 78 34 90 50 90 C 66 90 79 78 79 61 C 79 38 66 12 50 12 Z" fill="url(#${id}_shellBounceLight)" />
        
        <!-- Natural Calcium Freckles & Pores -->
        <circle cx="43" cy="45" r="0.8" fill="#6B3512" opacity="0.65" />
        <circle cx="56" cy="52" r="1.1" fill="#54280B" opacity="0.6" />
        <circle cx="37" cy="62" r="0.9" fill="#6B3512" opacity="0.55" />
        <circle cx="48" cy="71" r="1.2" fill="#54280B" opacity="0.6" />
        <circle cx="62" cy="68" r="0.7" fill="#6B3512" opacity="0.5" />
        <circle cx="32" cy="48" r="0.6" fill="#783D15" opacity="0.5" />
        <circle cx="54" cy="36" r="0.7" fill="#783D15" opacity="0.55" />
        <circle cx="46" cy="27" r="0.5" fill="#8F4819" opacity="0.45" />

        <!-- Soft Studio Softbox Specular Highlight Curve -->
        <path d="M 40 22 C 45 20 48 24 45 32 C 42 40 37 42 36 34 C 35 28 37 23 40 22 Z" fill="url(#${id}_specular)" filter="url(#${id}_glossHighlight)" />
        <!-- Pinpoint Sparkle -->
        <ellipse cx="42" cy="26" rx="2.5" ry="4.5" fill="#FFFFFF" opacity="0.9" transform="rotate(-25 42 26)" />
      </g>
    `;
  }

  if (state === "coagulated" || state === "curd") {
    return `
      <defs>
        ${getSharedDefs(id)}
        <radialGradient id="${id}_curdCream" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFDE7" />
          <stop offset="35%" stopColor="#FEF08A" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
        
        <linearGradient id="${id}_curdToasted" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>
      
      <g filter="url(#${id}_dropShadow)">
        <!-- Layered Soft Scrambled / Tortilla Egg Fold at 70°C -->
        <!-- Bottom Fold -->
        <path d="M 18 68 C 15 50 30 35 55 35 C 78 35 88 52 84 72 C 80 88 50 88 32 86 C 18 84 19 75 18 68 Z" fill="#D97706" />
        
        <!-- Main Creamy Fold Body -->
        <path d="M 22 62 C 20 45 36 32 60 33 C 82 34 85 55 80 70 C 74 84 46 84 30 80 C 20 77 23 68 22 62 Z" fill="url(#${id}_curdCream)" />

        <!-- Silky Overlapping Creases -->
        <path d="M 26 56 C 42 42 62 45 74 54 C 70 65 52 68 38 66 Z" fill="#FEF08A" opacity="0.9" />
        <path d="M 32 68 C 45 58 65 60 76 68 C 65 78 45 78 32 68 Z" fill="#FBBF24" />
        
        <!-- Toasted Golden Brown Crust Accents (Maillard) -->
        <path d="M 72 42 C 78 48 76 58 72 62" stroke="url(#${id}_curdToasted)" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M 28 66 C 36 72 44 72 50 70" stroke="#92400E" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.75" />

        <!-- Glistening Olive Oil Sheen -->
        <ellipse cx="48" cy="46" rx="9" ry="3.5" fill="#FFFFFF" opacity="0.75" transform="rotate(-10 48 46)" />
        <ellipse cx="64" cy="56" rx="5" ry="2" fill="#FFFFFF" opacity="0.6" transform="rotate(15 64 56)" />
        
        <!-- Sea Salt Crystal Flake -->
        <polygon points="42,43 45,40 48,43 45,46" fill="#FFFFFF" opacity="0.95" />
        <polygon points="56,58 58,56 60,58 58,60" fill="#FFFFFF" opacity="0.9" />
      </g>
    `;
  }

  // DEFAULT: High-Dome Raw Cracked Egg (Studio Culinary Lighting)
  return `
    <defs>
      ${getSharedDefs(id)}
      
      <!-- Outer Watery Albumen Ring -->
      <radialGradient id="${id}_albumenOuter" cx="48%" cy="45%" r="52%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
        <stop offset="70%" stopColor="#FEF3C7" stopOpacity="0.25" />
        <stop offset="92%" stopColor="#FDE68A" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
      </radialGradient>

      <!-- Inner Thick Gel Albumen Ring -->
      <radialGradient id="${id}_albumenThick" cx="46%" cy="44%" r="48%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
        <stop offset="60%" stopColor="#FFFBEB" stopOpacity="0.55" />
        <stop offset="90%" stopColor="#FEF08A" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#D97706" stopOpacity="0.3" />
      </radialGradient>

      <!-- High-Dome 3D Yolk Sphere with Subsurface Orange Scattering -->
      <radialGradient id="${id}_yolk3d" cx="36%" cy="32%" r="68%">
        <stop offset="0%" stopColor="#FFFDE7" />
        <stop offset="18%" stopColor="#FFC800" />
        <stop offset="55%" stopColor="#FF9500" />
        <stop offset="85%" stopColor="#E65100" />
        <stop offset="100%" stopColor="#9A2C00" />
      </radialGradient>

      <!-- Yolk Contact Ambient Occlusion Shadow -->
      <radialGradient id="${id}_yolkContact" cx="50%" cy="50%" r="50%">
        <stop offset="60%" stopColor="#7C2D12" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#7C2D12" stopOpacity="0" />
      </radialGradient>
    </defs>

    <g filter="url(#${id}_softShadow)">
      <!-- 1. Outer Fluid Albumen (Thin Ring) -->
      <path d="M 18 52 C 14 36 28 18 54 18 C 76 18 88 32 86 54 C 84 74 68 86 48 86 C 26 86 16 70 18 52 Z" fill="url(#${id}_albumenOuter)" />
      
      <!-- Outer Refraction Edge Catching Light -->
      <path d="M 28 26 C 45 19 68 19 80 32 C 86 45 84 65 76 76" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.65" />

      <!-- 2. Inner Thick Albumen Dome -->
      <path d="M 26 50 C 24 38 34 26 52 26 C 70 26 78 36 76 52 C 74 68 62 76 48 76 C 32 76 25 64 26 50 Z" fill="url(#${id}_albumenThick)" />
      <path d="M 32 34 C 44 28 62 29 70 38" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.75" />

      <!-- 3. Chalaza Twisted Protein Cord -->
      <path d="M 22 46 C 26 49 28 44 33 48 C 36 50 38 47 42 49" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.85" filter="url(#${id}_glossHighlight)" />
      <path d="M 62 55 C 66 58 68 53 74 57" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" fill="none" opacity="0.8" filter="url(#${id}_glossHighlight)" />

      <!-- 4. Yolk Contact Shadow -->
      <ellipse cx="51" cy="53" rx="21" ry="19" fill="url(#${id}_yolkContact)" />

      <!-- 5. 3D Golden-Orange High-Dome Yolk -->
      <ellipse cx="50" cy="49" rx="20" ry="19" fill="url(#${id}_yolk3d)" />

      <!-- 6. Secondary Ambient Rim Reflection -->
      <path d="M 36 58 C 42 66 58 66 66 58" stroke="#FFD54F" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.75" />

      <!-- 7. Primary Softbox Specular Highlight -->
      <path d="M 40 38 C 45 35 48 37 47 43 C 46 47 42 48 39 45 C 37 42 38 39 40 38 Z" fill="#FFFFFF" opacity="0.9" filter="url(#${id}_glossHighlight)" />
      <ellipse cx="42" cy="40" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.98" />

      <!-- 8. Secondary Tiny Specular Glint -->
      <circle cx="56" cy="53" r="1.8" fill="#FFFFFF" opacity="0.7" />
      <circle cx="38" cy="52" r="1" fill="#FFFFFF" opacity="0.5" />
    </g>
  `;
}

export function renderEggSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Huevo de Campo",
  } = props;
  const inner = renderEggInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const EggSvgModule: IngredientSvgModule = {
  id: "egg",
  name: "Huevo",
  nameEn: "Egg",
  nameDe: "Ei",
  defaultState: "raw",
  availableStates: ["raw", "whole", "coagulated"],
  renderInnerSvg: renderEggInnerSvg,
  renderSvgString: renderEggSvgString,
};
