import { describe, it, expect } from 'vitest';
import awardData from '../src/data/awardWinners.json';
import { ROUTES } from '../src/lib/routes';

// Data rules for the award map (see AGENTS.md → "Award map data").
const awards = awardData.awards as Array<Record<string, unknown>>;

const REQUIRED: Record<string, string> = {
  id: 'string', venue: 'string', city: 'string', region: 'string',
  lat: 'number', lng: 'number', geo_precision: 'string', championship: 'string',
  scope: 'string', year: 'number', place: 'number', category: 'string',
  verified: 'boolean', sources: 'object',
};
const OPTIONAL = ['area', 'address', 'edition', 'style', 'chef', 'notes'];
const IMAGE_RE = /\.(jpe?g|png|gif|webp|avif)(\?|$)/i;

describe('Award winners map data', () => {
  it('has awards', () => {
    expect(awards.length).toBeGreaterThan(0);
  });

  it('uses unique slug ids', () => {
    const ids = awards.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/);
  });

  it.each(awards.map((a) => [a.id, a] as const))('%s follows the schema and data rules', (_id, a) => {
    for (const [key, type] of Object.entries(REQUIRED)) {
      expect(typeof a[key], key).toBe(type);
    }
    for (const key of Object.keys(a)) {
      expect([...Object.keys(REQUIRED), ...OPTIONAL], `unknown field ${key}`).toContain(key);
    }

    const sources = a.sources as string[];
    expect(Array.isArray(sources) && sources.length > 0, 'needs at least one source').toBe(true);
    for (const url of sources) expect(url).toMatch(/^https?:\/\//);

    for (const value of Object.values(a)) {
      if (typeof value === 'string') expect(value, 'no news photos').not.toMatch(IMAGE_RE);
    }

    expect(['municipio', 'barrio', 'geocoded']).toContain(a.geo_precision);
    expect(['national', 'regional', 'local']).toContain(a.scope);
    expect([null, 'con cebolla', 'sin cebolla']).toContain(a.style ?? null);

    // Spain, including the Canary Islands.
    const lat = a.lat as number;
    const lng = a.lng as number;
    expect(lat >= 27 && lat <= 44.5 && lng >= -18.5 && lng <= 4.5, 'coordinates inside Spain').toBe(true);

    expect(Number.isInteger(a.place) && (a.place as number) >= 1).toBe(true);
    expect(a.year as number).toBeGreaterThanOrEqual(1990);
  });

  it('registers the mapapremios route in every locale', () => {
    expect(ROUTES.mapaPremios.slug).toEqual({ es: 'mapapremios', en: 'mapapremios', de: 'mapapremios' });
  });
});
