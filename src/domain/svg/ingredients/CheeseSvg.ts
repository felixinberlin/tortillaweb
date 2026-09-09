import type { IngredientSvgProps, IngredientSvgModule } from "./types";
import { wrapSvg, getSharedDefs } from "./BaseIngredientSvg";

/**
 * Cheese SVG Vector Module (Photorealistic Skeuomorphic)
 * States:
 * - "wedge" / "default": Aged Manchego cheese wedge with dark herringbone woven esparto rind, ivory paste with fermentation eyes, and butter perspiration.
 * - "melted": Gooey, stretchy molten golden cheese puddle with toasted gratiné spots.
 */
export function renderCheeseInnerSvg(props: IngredientSvgProps = {}): string {
  const { state = "wedge", id = "cheese_svg" } = props;

  if (state === "melted") {
    return `
      <defs>
        ${getSharedDefs(id)}
        <radialGradient id="${id}_meltedCurd" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="40%" stopColor="#FEF08A" />
          <stop offset="80%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>
      <g filter="url(#${id}_dropShadow)">
        <!-- Molten Stretchy Cheese River -->
        <path d="M 18 64 C 14 45 32 35 55 34 C 76 34 86 48 84 66 C 82 82 58 86 35 84 C 18 82 22 72 18 64 Z" fill="url(#${id}_meltedCurd)" />
        <ellipse cx="44" cy="48" rx="8" ry="4" fill="#92400E" opacity="0.65" transform="rotate(-15 44 48)" />
        <ellipse cx="64" cy="56" rx="6" ry="3.5" fill="#78350F" opacity="0.6" transform="rotate(20 64 56)" />
        <ellipse cx="50" cy="42" rx="6" ry="2" fill="#FFFFFF" opacity="0.8" />
      </g>
    `;
  }

  // DEFAULT: Aged Manchego Cheese Wedge (DOP Manchego)
  return `
    <defs>
      ${getSharedDefs(id)}
      
      <!-- Ivory-Yellow Aged Cheese Paste Face -->
      <linearGradient id="${id}_pasteFace" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="40%" stopColor="#FEF3C7" />
        <stop offset="80%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>

      <!-- Top Paste Surface -->
      <linearGradient id="${id}_pasteTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>

      <!-- Dark Herringbone Esparto Grass Rind -->
      <linearGradient id="${id}_espartoRind" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#78350F" />
        <stop offset="50%" stopColor="#451A03" />
        <stop offset="100%" stopColor="#1C0A00" />
      </linearGradient>

      <radialGradient id="${id}_eye" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#D97706" />
        <stop offset="70%" stopColor="#B45309" />
        <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0" />
      </radialGradient>
    </defs>

    <g filter="url(#${id}_dropShadow)">
      <!-- 1. Dark Esparto Rind on Outer Curve -->
      <path d="M 68 28 C 76 34 84 48 84 64 L 74 82 C 74 68 66 56 60 48 Z" fill="url(#${id}_espartoRind)" stroke="#1C0A00" stroke-width="1.2" />
      <!-- Herringbone Zig-zag imprint on rind -->
      <path d="M 68 32 L 72 35 L 68 38 L 72 41 L 68 44 L 72 47 L 68 50 L 72 53" stroke="#92400E" stroke-width="1" fill="none" />

      <!-- 2. Main Cut Face (Cross-Section) -->
      <polygon points="20,68 60,48 74,82 20,86" fill="url(#${id}_pasteFace)" stroke="#D97706" stroke-width="1.2" />

      <!-- 3. Top Triangular Face -->
      <polygon points="20,68 60,48 68,28 20,68" fill="url(#${id}_pasteTop)" stroke="#CA8A04" stroke-width="1.2" />

      <!-- 4. Tiny Natural Fermentation Eyes (Eyes / Ojos del queso) -->
      <ellipse cx="38" cy="72" rx="3.5" ry="2.2" fill="url(#${id}_eye)" transform="rotate(-10 38 72)" />
      <ellipse cx="54" cy="65" rx="3" ry="1.8" fill="url(#${id}_eye)" transform="rotate(15 54 65)" />
      <ellipse cx="46" cy="80" rx="2.5" ry="1.5" fill="url(#${id}_eye)" />
      <ellipse cx="30" cy="78" rx="2" ry="1.2" fill="url(#${id}_eye)" />

      <!-- 5. Butterfat Perspiration Droplets (Oleic sweat of aged cheese) -->
      <circle cx="34" cy="70" r="1" fill="#FFFFFF" opacity="0.9" />
      <circle cx="48" cy="62" r="1.1" fill="#FFFFFF" opacity="0.85" />
      <circle cx="62" cy="75" r="0.9" fill="#FFFFFF" opacity="0.9" />

      <!-- Specular Line on Top Ridge -->
      <path d="M 22 68 L 58 48" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.75" />
    </g>
  `;
}

export function renderCheeseSvgString(props: IngredientSvgProps = {}): string {
  const {
    width = 100,
    height = 100,
    className = "",
    theme = "transparent",
    ariaLabel = "Queso Manchego",
  } = props;
  const inner = renderCheeseInnerSvg(props);
  return wrapSvg(inner, width, height, "0 0 100 100", ariaLabel, className, theme);
}

export const CheeseSvgModule: IngredientSvgModule = {
  id: "cheese",
  name: "Queso",
  nameEn: "Cheese",
  nameDe: "Käse",
  defaultState: "wedge",
  availableStates: ["wedge", "melted"],
  renderInnerSvg: renderCheeseInnerSvg,
  renderSvgString: renderCheeseSvgString,
};
