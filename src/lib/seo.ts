export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const SITE_URL = 'https://tortilladepatatas.org';

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
      'Salmonella Inactivation 70°C for 2 minutes',
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

export function generateRecipeSchema(data: {
  name: string;
  description: string;
  image?: string;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  yieldServings?: number;
  authorName?: string;
  ingredients: string[];
  instructions: { step: string; text: string }[];
  category?: string;
  cuisine?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: data.name,
    description: data.description,
    image: data.image ? [data.image.startsWith('http') ? data.image : `${SITE_URL}${data.image}`] : [`${SITE_URL}/images/clasica.jpg`],
    author: {
      '@type': 'Organization',
      name: data.authorName || 'tortilladepatatas.org',
      url: SITE_URL,
    },
    datePublished: '2026-01-01',
    prepTime: `PT${data.prepTimeMinutes || 20}M`,
    cookTime: `PT${data.cookTimeMinutes || 25}M`,
    totalTime: `PT${(data.prepTimeMinutes || 20) + (data.cookTimeMinutes || 25)}M`,
    recipeYield: `${data.yieldServings || 4} raciones`,
    recipeCategory: data.category || 'Main Course',
    recipeCuisine: data.cuisine || 'Spanish',
    keywords: 'tortilla de patatas, Spanish omelette, tortilla española, receta tradicional, 70°C for 2 minutes',
    recipeIngredient: data.ingredients,
    recipeInstructions: data.instructions.map((inst, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: inst.step,
      text: inst.text,
    })),
  };
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

