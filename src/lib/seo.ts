import type { TortillaConfiguration } from '@/domain/builder/types';
import { getIngredientModifier } from '@/domain/builder/ingredientRegistry';
import {
  translateToRecipeSchema,
  type TranslatorConfig,
} from './translator';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const SITE_URL = 'https://tortilladepatatas.org';

const SITE_TRANSLATOR_CONFIG: TranslatorConfig = {
  baseUrl: SITE_URL,
  siteName: 'tortilladepatatas.org',
  defaultAuthorName: 'tortilladepatatas.org',
  defaultAuthorUrl: SITE_URL,
  defaultLanguage: 'es',
};

export function getCanonicalUrl(pathname: string): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${cleanPath}`;
}

export function getHreflangs(pathname: string) {
  // Normalize path by stripping current language prefix if present
  const parts = pathname.split('/').filter(Boolean);
  let pagePath = '';
  if (parts.length > 0 && ['es', 'en', 'de'].includes(parts[0])) {
    pagePath = '/' + parts.slice(1).join('/');
  } else {
    pagePath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  }

  if (pagePath === '/') {
    return [
      { lang: 'es', href: `${SITE_URL}/es` },
      { lang: 'en', href: `${SITE_URL}/en` },
      { lang: 'de', href: `${SITE_URL}/de` },
      { lang: 'x-default', href: `${SITE_URL}/es` },
    ];
  }

  return [
    { lang: 'es', href: `${SITE_URL}/es${pagePath}` },
    { lang: 'en', href: `${SITE_URL}/en${pagePath}` },
    { lang: 'de', href: `${SITE_URL}/de${pagePath}` },
    { lang: 'x-default', href: `${SITE_URL}/es${pagePath}` },
  ];
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'tortilladepatatas.org',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
    },
    description: 'Directorio autoritativo de ciencia culinaria, recetas e historia de la Tortilla de Patatas.',
    knowsAbout: [
      'Tortilla de Patatas',
      'Spanish Omelette',
      'Gastronomía Española',
      'Seguridad Alimentaria Culinaria',
      'Pasteurización y Seguridad del Huevo',
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'tortilladepatatas.org - Cuaderno & Ciencia Culinaria',
    description: 'Directorio internacional de referencia sobre la tortilla de patatas, proporciones científicas y seguridad bactericida.',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: ['es', 'en', 'de'],
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export {
  createRecipeSchema,
  formatIsoDuration,
  parseIsoDuration,
  validateRecipeSchema as validateRecipeSchemaStructure,
  type RecipeSchemaOptions,
  type RecipeJsonLd,
} from './seo/recipeSchema';

export {
  generateProductSchema,
  generateCourseSchema,
  generateOfferCatalogSchema,
  type ProductSchemaOptions,
} from './seo/productSchema';

export interface RecipeSchemaInput {
  name: string;
  description: string;
  image?: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  yieldServings: number;
  authorName?: string;
  ingredients: string[];
  instructions: { step: string; text: string }[];
  category?: string;
  cuisine?: string;
  url?: string;
}

export function generateRecipeSchema(data: RecipeSchemaInput) {
  return translateToRecipeSchema(
    {
      name: data.name,
      description: data.description,
      image: data.image ? data.image.replace(/\.jpg$/, '.svg') : '/images/recipes/clasica.svg',
      prepTimeMinutes: data.prepTimeMinutes,
      cookTimeMinutes: data.cookTimeMinutes,
      yieldServings: data.yieldServings,
      authorName: data.authorName || 'tortilladepatatas.org',
      ingredients: data.ingredients,
      instructions: data.instructions,
      category: data.category || 'Main Course',
      cuisine: data.cuisine || 'Spanish',
      keywords: ['tortilla de patatas', 'Spanish omelette', 'tortilla española', 'receta tradicional', 'cuajado perfecto'],
      url: data.url,
    },
    SITE_TRANSLATOR_CONFIG
  );
}

export function createUserRecipeSchema(config: TortillaConfiguration, lang: string = 'es', currentUrl?: string) {
  const isEs = lang.startsWith('es');
  const isDe = lang.startsWith('de');
  const langKey = isEs ? 'es' : isDe ? 'de' : 'en';

  const { calculatedProfile, ingredients, preferences } = config;

  const formattedIngredients: string[] = [];

  for (const ing of ingredients) {
    if (ing.entityId === 'egg') {
      const sizeLabel = ing.size ? ing.size.toUpperCase() : 'L';
      const label = isEs ? `Huevos (${sizeLabel})` : isDe ? `Eier (${sizeLabel})` : `Eggs (${sizeLabel})`;
      formattedIngredients.push(`${ing.quantity} ${label}`);
    } else if (ing.entityId === 'potato') {
      const label = isEs ? `Patatas (≈${calculatedProfile.potatoUnits} unidades)` : isDe ? `Kartoffeln (≈${calculatedProfile.potatoUnits} Stk)` : `Potatoes (≈${calculatedProfile.potatoUnits} units)`;
      formattedIngredients.push(`${ing.quantity}g ${label}`);
    } else if (ing.entityId === 'oil') {
      const label = isEs ? 'Aceite de Oliva Virgen Extra (absorbido)' : isDe ? 'Natives Olivenöl Extra (aufgenommen)' : 'Extra Virgin Olive Oil (absorbed)';
      formattedIngredients.push(`${calculatedProfile.estimatedAbsorbedOilMl}ml ${label}`);
    } else {
      const mod = getIngredientModifier(ing.entityId);
      const name = mod ? mod.name[langKey] : ing.entityId;
      formattedIngredients.push(`${ing.quantity}${ing.unit} ${name}`);
    }
  }

  if (!ingredients.some(i => i.entityId === 'salt')) {
    const eggCount = ingredients.find(i => i.entityId === 'egg')?.quantity || 6;
    const saltGrams = Math.max(1, Math.round(eggCount * 0.8));
    const saltName = isEs ? 'Sal' : isDe ? 'Salz' : 'Salt';
    formattedIngredients.push(`${saltGrams}g ${saltName}`);
  }

  const adviceList = calculatedProfile.cookingAdvice[langKey] || calculatedProfile.cookingAdvice.es || [];
  const instructions = adviceList.map((stepText, idx) => ({
    step: `${isEs ? 'Paso' : isDe ? 'Schritt' : 'Step'} ${idx + 1}`,
    text: stepText,
  }));

  const name = isEs
    ? `Tortilla Personalizada (${calculatedProfile.estimatedServings} raciones)`
    : isDe
    ? `Eigene Tortilla (${calculatedProfile.estimatedServings} Portionen)`
    : `Custom Spanish Omelette (${calculatedProfile.estimatedServings} servings)`;

  const ratioCat = calculatedProfile.ratioCategory[langKey] || calculatedProfile.ratioCategory.es || '';
  const description = isEs
    ? `Receta de tortilla de patatas personalizada creada con la calculadora de proporciones. ${ratioCat}. Sartén recomendada: ${calculatedProfile.recommendedPanSizeCm} cm. Textura: ${preferences.texture}, técnica: ${preferences.potatoTechnique}.`
    : isDe
    ? `Individuelles Spanisches Tortilla-Rezept. ${ratioCat}. Empfohlene Pfannengröße: ${calculatedProfile.recommendedPanSizeCm} cm. Textur: ${preferences.texture}, Technik: ${preferences.potatoTechnique}.`
    : `Custom Spanish omelette recipe generated with ratio calculator. ${ratioCat}. Recommended pan: ${calculatedProfile.recommendedPanSizeCm} cm. Texture: ${preferences.texture}, technique: ${preferences.potatoTechnique}.`;

  return generateRecipeSchema({
    name,
    description,
    image: '/images/recipes/clasica.svg',
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    yieldServings: calculatedProfile.estimatedServings || 4,
    authorName: 'tortilladepatatas.org - Tortilla Creator',
    ingredients: formattedIngredients,
    instructions,
    url: currentUrl,
  });
}

export function generateArticleSchema(data: {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  authorName?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url.startsWith('http') ? data.url : `${SITE_URL}${data.url}`,
    },
    headline: data.headline,
    description: data.description,
    image: data.image ? (data.image.startsWith('http') ? data.image : `${SITE_URL}${data.image}`) : `${SITE_URL}/favicon.svg`,
    author: {
      '@type': 'Organization',
      name: data.authorName || 'tortilladepatatas.org',
      url: SITE_URL,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    datePublished: data.datePublished || '2026-01-01',
    dateModified: '2026-07-29',
  };
}

export function generatePersonSchema(person: {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    image: person.image ? (person.image.startsWith('http') ? person.image : `${SITE_URL}${person.image}`) : undefined,
    sameAs: person.sameAs || [],
    knowsAbout: ['Tortilla de Patatas', 'Cocina Española', 'Gastronomía Tradicional'],
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateCollectionPageSchema(data: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${data.url}#collection`,
    url: data.url,
    name: data.name,
    description: data.description,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: data.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

export function generateHowToSchema(data: {
  name: string;
  description: string;
  image?: string;
  steps: { name: string; text: string; image?: string; url?: string }[];
  totalTimeMinutes?: number;
}) {
  const fullImage = data.image
    ? (data.image.startsWith('http') ? data.image : `${SITE_URL}${data.image.startsWith('/') ? data.image : `/${data.image}`}`)
    : `${SITE_URL}/images/recipes/clasica.svg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    image: fullImage,
    totalTime: data.totalTimeMinutes ? `PT${data.totalTimeMinutes}M` : undefined,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image ? (step.image.startsWith('http') ? step.image : `${SITE_URL}${step.image}`) : undefined,
      url: step.url ? (step.url.startsWith('http') ? step.url : `${SITE_URL}${step.url}`) : undefined,
    })),
  };
}


