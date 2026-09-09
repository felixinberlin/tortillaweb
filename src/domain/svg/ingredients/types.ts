export type IngredientVisualState =
  | "default"
  | "whole"
  | "cut"
  | "cooked"
  | "raw";

export interface IngredientSvgProps {
  /** Visual state / preparation stage */
  state?: string;
  /** Width in pixels or CSS units */
  width?: number | string;
  /** Height in pixels or CSS units */
  height?: number | string;
  /** Custom CSS class names */
  className?: string;
  /** Whether to render a self-contained <svg> wrapper (true) or just inner SVG fragments for composition (false) */
  standalone?: boolean;
  /** Theme: dark or parchment background */
  theme?: "dark" | "parchment" | "transparent";
  /** Optional custom ID to avoid ID collisions in SVG defs */
  id?: string;
  /** Accessible label */
  ariaLabel?: string;
}

export interface IngredientSvgModule {
  id: string;
  name: { es: string; en: string; de: string };
  availableStates: string[];
  renderSvgString: (props?: IngredientSvgProps) => string;
  renderInnerSvg: (props?: IngredientSvgProps) => string;
}
