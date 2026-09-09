import React, { useMemo } from "react";
import {
  renderIngredientSvg,
  INGREDIENT_SVG_REGISTRY,
  type IngredientSvgProps,
} from "@/domain/svg/ingredients";

export interface IngredientSvgRendererProps extends IngredientSvgProps {
  ingredientId: string;
}

export default function IngredientSvgRenderer({
  ingredientId,
  state,
  width = "100%",
  height = "100%",
  className = "",
  theme = "transparent",
  ariaLabel,
  id,
}: IngredientSvgRendererProps) {
  const svgString = useMemo(() => {
    return renderIngredientSvg(ingredientId, {
      state,
      width,
      height,
      className,
      theme,
      ariaLabel,
      id,
      standalone: true,
    });
  }, [ingredientId, state, width, height, className, theme, ariaLabel, id]);

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: typeof width === "number" ? `${width}px` : width, height: typeof height === "number" ? `${height}px` : height }}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}

export { INGREDIENT_SVG_REGISTRY };
