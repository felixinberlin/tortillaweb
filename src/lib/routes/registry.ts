import type { RouteId, RouteDefinition } from './types';

export const ROUTES: Record<RouteId, RouteDefinition> = {
  home: {
    id: 'home',
    slug: { es: '', en: '', de: '' },
    label: { es: 'Inicio', en: 'Home', de: 'Startseite' },
  },
  recipes: {
    id: 'recipes',
    slug: { es: 'recipes', en: 'recipes', de: 'recipes' },
    label: { es: 'Recetas', en: 'Recipes', de: 'Rezepte' },
    canonicalType: 'recipe',
  },
  factions: {
    id: 'factions',
    slug: { es: 'facciones', en: 'factions', de: 'faktionen' },
    label: { es: 'Facciones', en: 'Factions', de: 'Fraktionen' },
    canonicalType: 'faction',
  },
  ingredients: {
    id: 'ingredients',
    slug: { es: 'ingredientes', en: 'ingredients', de: 'zutaten' },
    label: { es: 'Ingredientes', en: 'Ingredients', de: 'Zutaten' },
    canonicalType: 'ingredient',
  },
  techniques: {
    id: 'techniques',
    slug: { es: 'tecnicas', en: 'techniques', de: 'techniken' },
    label: { es: 'Técnicas', en: 'Techniques', de: 'Techniken' },
    canonicalType: 'technique',
  },
  science: {
    id: 'science',
    slug: { es: 'science', en: 'science', de: 'science' },
    label: { es: 'Ciencia & Seguridad', en: 'Science & Safety', de: 'Wissenschaft & Sicherheit' },
  },
  history: {
    id: 'history',
    slug: { es: 'history', en: 'history', de: 'history' },
    label: { es: 'Historia', en: 'History', de: 'Geschichte' },
  },
  personas: {
    id: 'personas',
    slug: { es: 'personas', en: 'people', de: 'personen' },
    label: { es: 'Personajes', en: 'People & Chefs', de: 'Persönlichkeiten' },
    canonicalType: 'person',
  },
  regiones: {
    id: 'regiones',
    slug: { es: 'regiones', en: 'regions', de: 'regionen' },
    label: { es: 'Regiones', en: 'Regions', de: 'Regionen' },
    canonicalType: 'region',
  },
  records: {
    id: 'records',
    slug: { es: 'records', en: 'records', de: 'records' },
    label: { es: 'Récords', en: 'Records', de: 'Rekorde' },
  },
  estilos: {
    id: 'estilos',
    slug: { es: 'estilos', en: 'styles', de: 'stile' },
    label: { es: 'Estilos Culinarios', en: 'Culinary Styles', de: 'Kulinarische Stile' },
    canonicalType: 'style',
  },
  enciclopedia: {
    id: 'enciclopedia',
    slug: { es: 'enciclopedia', en: 'enciclopedia', de: 'enciclopedia' },
    label: { es: 'Enciclopedia', en: 'Encyclopedia', de: 'Enzyklopädie' },
  },
  laboratorio: {
    id: 'laboratorio',
    slug: { es: 'laboratorio', en: 'laboratorio', de: 'laboratorio' },
    label: { es: 'Laboratorio', en: 'Laboratory', de: 'Labor' },
  },
  comparador: {
    id: 'comparador',
    slug: { es: 'comparador', en: 'comparador', de: 'comparador' },
    label: { es: 'Comparador Nutricional', en: 'Recipe Comparator', de: 'Rezept-Vergleicher' },
  },
  builder: {
    id: 'builder',
    slug: { es: 'builder', en: 'builder', de: 'builder' },
    label: { es: 'Creador DNA', en: 'Recipe Builder', de: 'Rezept-Rechner' },
  },
  contact: {
    id: 'contact',
    slug: { es: 'contacto', en: 'contact', de: 'kontakt' },
    label: { es: 'Contacto', en: 'Contact', de: 'Kontakt' },
  },
  about: {
    id: 'about',
    slug: { es: 'about', en: 'about', de: 'about' },
    label: { es: 'Sobre el Proyecto', en: 'About', de: 'Über uns' },
  },
  encuestas: {
    id: 'encuestas',
    slug: { es: 'encuestas', en: 'encuestas', de: 'encuestas' },
    label: { es: 'Encuestas', en: 'Community Polls', de: 'Umfragen' },
  },
  tests: {
    id: 'tests',
    slug: { es: 'tests', en: 'tests', de: 'tests' },
    label: { es: 'Test de Lealtad', en: 'Loyalty Quiz', de: 'Fraktionstest' },
  },
};
