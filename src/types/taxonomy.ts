export type LocalizedString = {
  es: string;
  en: string;
  de: string;
};

export interface RecipeIngredient {
  id: string;
  ingredientId: string;
  name: LocalizedString;

  amount: number;
  unit: "g" | "ml" | "unit";

  notes?: LocalizedString;
}

export interface RecipeSource {
  type:
    | "chef"
    | "restaurant"
    | "book"
    | "website"
    | "traditional"
    | "community"
    | "user";
  name: string;
  author?: string;
  url?: string;
  description?: LocalizedString;
}

export interface RecipeAuthor {
  type: "platform" | "user";
  userId?: string;
  name: string;
}

export interface Recipe {
  id: string;
  slug: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  taxonomyIds: string[];
  image?: string;

  time: number;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  yieldServings?: number;

  ingredients?: RecipeIngredient[];

  instructions?: {
    step: LocalizedString;
    text: LocalizedString;
  }[];

  sources?: RecipeSource[];
  author?: RecipeAuthor;
}

export interface Taxonomy {
  id: string;
  type: string; // e.g. 'faction', 'ingredient', 'technique', 'style', 'region', 'person', 'restaurant', 'utensil', 'cooking-method', 'texture', 'event', 'glossary', 'difficulty'
  slug: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  icon?: string;
  theme?: {
    color?: string;
  };
  dogma?: LocalizedString;
  badge?: LocalizedString;
  keyIngredient?: LocalizedString;
  prominentFigures?: string[];
}

export interface ResolvedTaxonomyBadge {
  id: string;
  type: string;
  title: string;
  icon?: string;
  url: string;
}
