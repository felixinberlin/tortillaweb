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
  recipeId?: string;
  preferSvg?: boolean;
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
  // Strip XML declaration for valid HTML5 inline injection
  const cleanInlineSvg = svgContent.replace(/^<\?xml[^>]*\?>\s*/i, '');

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-stone-900 flex items-center justify-center select-none ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanInlineSvg }}
    />
  );
}

/**
 * Smart Recipe Image Component
 * 1. Checks if explicit preferSvg or SVG file is passed
 * 2. Renders static image if available
 * 3. Falls back to permanent static generated SVG (/images/recipes/generated/[id].svg)
 * 4. Falls back dynamically to real-time Tortilla SVG generator
 */
export default function RecipeImage({
  src,
  title,
  recipeId,
  preferSvg = false,
  ingredients,
  taxonomyIds,
  className = '',
  alt,
  doneness,
  potatoCut,
}: RecipeImageProps) {
  const [useStaticSvgFallback, setUseStaticSvgFallback] = useState(false);
  const [hasTotalError, setHasTotalError] = useState(false);

  const ingredientKeys = extractIngredientKeys(ingredients, taxonomyIds);
  const isMissing = isKnownMissingPath(src);

  // Determine static permanent SVG URL from explicit ID or image filename
  const derivedRecipeId = recipeId || (src ? src.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp|svg)$/i, '') : undefined);
  const staticSvgUrl = derivedRecipeId ? `/images/recipes/generated/${derivedRecipeId}.svg` : undefined;

  // 1. If preferSvg is explicitly requested, render static SVG directly
  if (preferSvg && staticSvgUrl && !hasTotalError) {
    return (
      <img
        src={staticSvgUrl}
        alt={alt || title}
        width={800}
        height={600}
        className={className}
        onError={() => setHasTotalError(true)}
        loading="lazy"
        decoding="async"
      />
    );
  }

  // 2. If primary image failed or was missing, attempt static permanent SVG first
  if ((isMissing || useStaticSvgFallback) && staticSvgUrl && !hasTotalError) {
    return (
      <img
        src={staticSvgUrl}
        alt={alt || title}
        width={800}
        height={600}
        className={className}
        onError={() => setHasTotalError(true)}
        loading="lazy"
        decoding="async"
      />
    );
  }

  // 3. If primary image is missing and no static SVG or static SVG also failed, render dynamic SVG composite
  if (isMissing || hasTotalError) {
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

  // 4. Primary Image with graceful degradation to static SVG
  return (
    <img
      src={src}
      alt={alt || title}
      width={800}
      height={600}
      className={className}
      onError={() => {
        if (staticSvgUrl) {
          setUseStaticSvgFallback(true);
        } else {
          setHasTotalError(true);
        }
      }}
      loading="lazy"
      decoding="async"
    />
  );
}

