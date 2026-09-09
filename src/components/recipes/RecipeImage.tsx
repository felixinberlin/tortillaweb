import React, { useState } from 'react';
import { generateTortillaSvg, recipeToSvgOptions } from '@/domain/svg';

export interface IngredientSummary {
  id?: string;
  ingredientId?: string;
  name?: string | { es?: string; en?: string; de?: string };
}

export interface RecipeImageProps {
  src?: string;
  title: string;
  ingredients?: (string | IngredientSummary)[];
  taxonomyIds?: string[];
  className?: string;
  alt?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
  doneness?: any;
  potatoCut?: any;
}

/**
 * Normalizes ingredient key strings from various data forms
 */
function extractIngredientKeys(
  ingredients?: (string | IngredientSummary)[],
  taxonomyIds?: string[]
): string[] {
  const set = new Set<string>();

  if (ingredients) {
    for (const item of ingredients) {
      if (typeof item === 'string') {
        set.add(item.toLowerCase());
      } else if (item && typeof item === 'object') {
        if (item.ingredientId) set.add(item.ingredientId.toLowerCase());
        if (item.id) set.add(item.id.toLowerCase());
      }
    }
  }

  if (taxonomyIds) {
    for (const tax of taxonomyIds) {
      if (tax.startsWith('ingredient:')) {
        set.add(tax.replace('ingredient:', '').toLowerCase());
      }
    }
  }

  return Array.from(set);
}

/**
 * Checks if a static image path is known to be missing in the build
 */
function isKnownMissingPath(src?: string): boolean {
  if (!src) return true;
  return false;
}

/**
 * SVG Ingredient Composite Graphic Component powered by TortillaSvgGenerator
 */
export function IngredientSvgComposite({
  title,
  ingredientKeys,
  className = '',
  doneness,
  potatoCut,
}: {
  title: string;
  ingredientKeys: string[];
  className?: string;
  doneness?: any;
  potatoCut?: any;
}) {
  const options = recipeToSvgOptions(
    {
      title,
      ingredients: ingredientKeys.map((k) => ({ id: k })),
    },
    {
      title,
      doneness: doneness,
      potatoCut: potatoCut,
      theme: 'kitchen_dark',
      showBadge: true,
    }
  );

  const svgContent = generateTortillaSvg(options);

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-stone-900 flex items-center justify-center select-none ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

/**
 * Smart Recipe Image Component
 * Renders static image if available; falls back automatically to the dynamic Tortilla SVG engine
 */
export default function RecipeImage({
  src,
  title,
  ingredients,
  taxonomyIds,
  className = '',
  alt,
  doneness,
  potatoCut,
}: RecipeImageProps) {
  const [hasError, setHasError] = useState(false);
  const ingredientKeys = extractIngredientKeys(ingredients, taxonomyIds);
  const isMissing = isKnownMissingPath(src);

  // If known missing or image load failed, render SVG composite artwork
  if (isMissing || hasError) {
    return (
      <IngredientSvgComposite
        title={title}
        ingredientKeys={ingredientKeys}
        className={className}
        doneness={doneness}
        potatoCut={potatoCut}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt || title}
      width={800}
      height={600}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
      decoding="async"
    />
  );
}

