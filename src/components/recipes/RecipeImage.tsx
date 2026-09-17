import React, { useState } from 'react';
import { generateTortillaSvg, recipeToSvgOptions, type SvgPresentationView } from '@/domain/svg';

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
  showToggle?: boolean;
  ingredients?: (string | IngredientSummary)[];
  taxonomyIds?: string[];
  className?: string;
  alt?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
  doneness?: any;
  potatoCut?: any;
  interactive?: boolean;
  lang?: string;
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
 * SVG Ingredient Composite Graphic Component powered by TortillaSvgGenerator
 */
export function IngredientSvgComposite({
  title,
  ingredientKeys,
  className = '',
  doneness,
  potatoCut,
  presentation = 'skillet_top',
  animated = false,
  interactive = true,
  lang = 'es',
}: {
  title: string;
  ingredientKeys: string[];
  className?: string;
  doneness?: any;
  potatoCut?: any;
  presentation?: SvgPresentationView;
  animated?: boolean;
  interactive?: boolean;
  lang?: string;
}) {
  const safeLang = (lang === 'es' || lang === 'en' || lang === 'de') ? (lang as SvgStudioLang) : 'es';
  const options = recipeToSvgOptions(
    {
      title,
      ingredients: ingredientKeys.map((k) => ({ id: k })),
    },
    {
      id: `recipe_img_${title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`,
      title,
      doneness: doneness,
      potatoCut: potatoCut,
      theme: 'kitchen_dark',
      showBadge: false,
      presentation,
      animated,
      interactive,
      lang: safeLang,
      width: 600,
      height: 400,
    }
  );

  const svgContent = generateTortillaSvg(options);
  // Strip XML declaration for valid HTML5 inline injection
  const cleanInlineSvg = svgContent.replace(/^<\?xml[^>]*\?>\s*/i, '');

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-stone-950 flex items-center justify-center select-none ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanInlineSvg }}
    />
  );
}

/**
 * Pure Vector SVG Recipe Image Component
 * 1. 100% Vector SVG across all recipes
 * 2. Fully interactive ingredient exploration (potato, egg, oil, onion, skillet)
 * 3. Deterministic candidate resolution for pre-generated SVGs when static mode requested
 * 4. Pristine presentation with zero button clutter
 * 5. Instant graceful fallback to parametric SVG composite if static assets are unavailable
 */
export default function RecipeImage({
  src,
  title,
  recipeId,
  ingredients,
  taxonomyIds,
  className = '',
  alt,
  doneness,
  potatoCut,
  interactive = true,
  lang = 'es',
}: RecipeImageProps) {
  const [candidateIndex, setCandidateIndex] = useState<number>(0);

  const ingredientKeys = extractIngredientKeys(ingredients, taxonomyIds);

  // Collect candidate identifiers for SVG matching
  const candidateIds = Array.from(
    new Set(
      [
        recipeId,
        src ? src.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp|svg)$/i, '') : undefined,
      ].filter(Boolean) as string[]
    )
  );

  // Generate fallback sequence of SVG paths
  const svgCandidates: string[] = [];
  for (const cid of candidateIds) {
    svgCandidates.push(`/images/recipes/generated/${cid}.svg`);
    svgCandidates.push(`/images/recipes/${cid}.svg`);
  }

  const activeSvgUrl = svgCandidates[candidateIndex];
  const allSvgsFailed = svgCandidates.length === 0 || candidateIndex >= svgCandidates.length;

  const handleSvgError = () => {
    if (candidateIndex + 1 < svgCandidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setCandidateIndex(svgCandidates.length);
    }
  };

  const renderVisualContent = () => {
    // When interactive is requested (default for full recipe exploration), render the rich interactive vector composite
    if (interactive) {
      return (
        <IngredientSvgComposite
          title={title}
          ingredientKeys={ingredientKeys}
          className={className}
          doneness={doneness}
          potatoCut={potatoCut}
          presentation="skillet_top"
          animated={true}
          interactive={true}
          lang={lang}
        />
      );
    }

    // Default static pre-generated SVG (for non-interactive thumbnails)
    if (!allSvgsFailed && activeSvgUrl) {
      return (
        <img
          src={activeSvgUrl}
          alt={alt || title}
          width={600}
          height={400}
          className={`${className} group-hover:scale-102 transition-transform duration-500 ease-out`}
          onError={handleSvgError}
          loading="lazy"
          decoding="async"
        />
      );
    }

    // Dynamic parametric SVG composite fallback
    return (
      <IngredientSvgComposite
        title={title}
        ingredientKeys={ingredientKeys}
        className={className}
        doneness={doneness}
        potatoCut={potatoCut}
        presentation="skillet_top"
        animated={false}
        interactive={false}
        lang={lang}
      />
    );
  };

  const hintText = lang === 'en'
    ? '✨ Click ingredients to explore'
    : lang === 'de'
    ? '✨ Zutaten anklicken zum Entdecken'
    : '✨ Haz clic en los ingredientes para explorar';

  return (
    <div className="relative w-full h-full group/recipe-img overflow-hidden bg-stone-950 flex items-center justify-center">
      {renderVisualContent()}
      {interactive && (
        <div className="absolute bottom-2 right-2 bg-stone-900/80 backdrop-blur-xs border border-stone-700/60 text-stone-300 text-[11px] font-medium px-2.5 py-1 rounded-full pointer-events-none opacity-70 group-hover/recipe-img:opacity-100 transition-opacity flex items-center gap-1.5 shadow-sm">
          <span>{hintText}</span>
        </div>
      )}
    </div>
  );
}
