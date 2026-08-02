import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localizedStringSchema = z.object({
  es: z.string(),
  en: z.string(),
  de: z.string(),
});

const recipeIngredientSchema = z.object({
  id: z.string(),
  ingredientId: z.string(),
  name: localizedStringSchema,
  amount: z.number(),
  unit: z.enum(['g', 'ml', 'unit']),
  notes: localizedStringSchema.optional(),
});

const recipeSourceSchema = z.object({
  type: z.enum(['chef', 'restaurant', 'book', 'website', 'traditional', 'community', 'user']),
  name: z.string(),
  author: z.string().optional(),
  url: z.string().optional(),
  description: localizedStringSchema.optional(),
});

const recipeAuthorSchema = z.object({
  type: z.enum(['platform', 'user']),
  userId: z.string().optional(),
  name: z.string(),
});

const recipeCollection = defineCollection({
  loader: glob({ 
    pattern: '**/*.json', 
    base: './src/content/recipes',
    generateId: ({ entry }) => entry.replace(/\.json$/, '').replace(/\//g, '-'),
  }),
  schema: z.object({
    id: z.string(),
    contentId: z.string().optional(),
    translationKey: z.string().optional(),
    slug: localizedStringSchema,
    title: localizedStringSchema,
    description: localizedStringSchema,
    taxonomyIds: z.array(z.string()),
    time: z.number(),
    image: z.string().optional(),
    prepTimeMinutes: z.number().optional(),
    cookTimeMinutes: z.number().optional(),
    yieldServings: z.number().optional(),
    ingredients: z.array(recipeIngredientSchema).optional(),
    instructions: z.array(z.object({
      step: localizedStringSchema,
      text: localizedStringSchema,
    })).optional(),
    sources: z.array(recipeSourceSchema).optional(),
    author: recipeAuthorSchema.optional(),
  }),
});

const taxonomyCollection = defineCollection({
  loader: glob({ 
    pattern: '**/*.json', 
    base: './src/content/taxonomies',
    generateId: ({ entry }) => entry.replace(/\.json$/, '').replace(/\//g, '-'),
  }),
  schema: z.object({
    id: z.string(),
    type: z.string(),
    contentId: z.string().optional(),
    translationKey: z.string().optional(),
    slug: localizedStringSchema,
    title: localizedStringSchema,
    description: localizedStringSchema,
    image: z.string().optional(),
    icon: z.string().optional(),
    theme: z.object({
      color: z.string().optional(),
    }).optional(),
    dogma: localizedStringSchema.optional(),
    badge: localizedStringSchema.optional(),
    keyIngredient: localizedStringSchema.optional(),
    prominentFigures: z.array(z.string()).optional(),
  }),
});

const pagesCollection = defineCollection({
  loader: glob({ 
    pattern: '**/*.json', 
    base: './src/content/pages',
    generateId: ({ entry }) => entry.replace(/\.json$/, '').replace(/\//g, '-'),
  }),
  schema: z.record(z.string(), z.any()),
});

const navigationCollection = defineCollection({
  loader: glob({ 
    pattern: '**/*.json', 
    base: './src/content/navigation',
    generateId: ({ entry }) => entry.replace(/\.json$/, '').replace(/\//g, '-'),
  }),
  schema: z.record(z.string(), z.any()),
});

const settingsCollection = defineCollection({
  loader: glob({ 
    pattern: '**/*.json', 
    base: './src/content/settings',
    generateId: ({ entry }) => entry.replace(/\.json$/, '').replace(/\//g, '-'),
  }),
  schema: z.record(z.string(), z.any()),
});

const historyCollection = defineCollection({
  loader: glob({ 
    pattern: '**/*.md', 
    base: './src/content/history',
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/\//g, '-'),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    contentId: z.string().optional(),
    lang: z.string().optional(),
    locale: z.enum(['es', 'en', 'de']).optional(),
    translationKey: z.string().optional(),
    slug: z.string().optional(),
  }),
});

const ingredientsCollection = defineCollection({
  loader: glob({ 
    pattern: '**/*.md', 
    base: './src/content/ingredients',
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/\//g, '-'),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    contentId: z.string().optional(),
    slug: z.string().optional(),
    translationKey: z.string().optional(),
    locale: z.enum(['es', 'en', 'de']).optional(),
    category: z.string().optional(),
    ingredient: z.string().optional(),
    scientificName: z.string().optional(),
    image: z.string().optional(),
    seo: z.object({
      canonical: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

export const collections = {
  recipes: recipeCollection,
  taxonomies: taxonomyCollection,
  pages: pagesCollection,
  navigation: navigationCollection,
  settings: settingsCollection,
  history: historyCollection,
  ingredients: ingredientsCollection,
};
