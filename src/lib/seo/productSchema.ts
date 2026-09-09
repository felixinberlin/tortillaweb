import { SITE_URL } from '../seo';
import type { EquipmentItem } from '@/data/equipmentData';

export interface ProductSchemaOptions {
  lang?: 'es' | 'en' | 'de';
  baseUrl?: string;
}

export function generateProductSchema(item: EquipmentItem, options: ProductSchemaOptions = {}) {
  const lang = options.lang || 'es';
  const baseUrl = options.baseUrl || SITE_URL;
  const langKey = (lang === 'es' || lang === 'en' || lang === 'de') ? lang : 'es';

  const name = item.name[langKey] || item.name.es;
  const description = item.description[langKey] || item.description.es;
  const imageUrl = item.image.startsWith('http') ? item.image : `${baseUrl}${item.image}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${baseUrl}/${lang}/tienda#${item.id}`,
    name,
    description,
    image: [imageUrl],
    brand: {
      '@type': 'Brand',
      name: item.brand,
    },
    category: item.category,
    offers: {
      '@type': 'Offer',
      price: item.priceValue.toFixed(2),
      priceCurrency: item.currency,
      availability: item.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: item.affiliateUrl.startsWith('#') ? `${baseUrl}/${lang}/tienda#${item.id}` : item.affiliateUrl,
      seller: {
        '@type': 'Organization',
        name: 'tortilladepatatas.org Marketplace',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: item.rating,
      reviewCount: item.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export function generateCourseSchema(options: {
  name: string;
  description: string;
  provider?: string;
  price?: number;
  currency?: string;
  url?: string;
  lang?: string;
}) {
  const baseUrl = SITE_URL;
  const lang = options.lang || 'es';
  const url = options.url || `${baseUrl}/${lang}/tienda#masterclass-ebook-definitive`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${url}#course`,
    name: options.name,
    description: options.description,
    provider: {
      '@type': 'Organization',
      name: options.provider || 'tortilladepatatas.org Academy',
      sameAs: baseUrl,
    },
    offers: {
      '@type': 'Offer',
      price: (options.price ?? 19.90).toFixed(2),
      priceCurrency: options.currency || 'EUR',
      category: 'Paid',
      availability: 'https://schema.org/InStock',
    },
    educationalCredentialAwarded: 'Certificado de Maestría en Tortilla de Patatas',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT4H',
    },
  };
}

export function generateOfferCatalogSchema(items: EquipmentItem[], lang: 'es' | 'en' | 'de' = 'es') {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: lang === 'es' ? 'Arsenal & Equipamiento del Tortillólogo' : lang === 'de' ? 'Ausrüstung & Meister-Küche' : 'Equipment & Chef Arsenal',
    itemListElement: items.map((item, index) => ({
      '@type': 'OfferCatalog',
      position: index + 1,
      name: item.name[lang] || item.name.es,
      itemOffered: generateProductSchema(item, { lang }),
    })),
  };
}
