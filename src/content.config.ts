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

const recipeCollection = defineCollection({
  loader: glob({ 
    pattern: '**/*.json', 
    base: './src/content/recipes',
    generateId: ({ entry }) => entry.replace(/\.json$/, '').replace(/\//g, '-'),
  }),
  schema: z.object({
    id: z.string(),
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
    slug: localizedStringSchema,
    title: localizedStringSchema,
    description: localizedStringSchema,
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
  schema: z.record(z.any()),
});

const navigationCollection = defineCollection({
  loader: glob({ 
    pattern: '**/*.json', 
    base: './src/content/navigation',
    generateId: ({ entry }) => entry.replace(/\.json$/, '').replace(/\//g, '-'),
  }),
  schema: z.record(z.any()),
});

const settingsCollection = defineCollection({
  loader: glob({ 
    pattern: '**/*.json', 
    base: './src/content/settings',
    generateId: ({ entry }) => entry.replace(/\.json$/, '').replace(/\//g, '-'),
  }),
  schema: z.record(z.any()),
});

export const collections = {
  recipes: recipeCollection,
  taxonomies: taxonomyCollection,
  pages: pagesCollection,
  navigation: navigationCollection,
  settings: settingsCollection,
};
