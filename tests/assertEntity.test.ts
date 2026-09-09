import { describe, it, expect } from 'vitest';
import { validateEntityExists, assertEntityExists } from '../src/lib/routing/assertEntity';

describe('Shared Entity Validation Helper (assertEntity.ts)', () => {
  it('should return true when at least one entity is provided', () => {
    const taxonomy = { id: 'potato', type: 'ingredient' };
    expect(validateEntityExists(taxonomy, null)).toBe(true);
    expect(validateEntityExists(undefined, { title: 'Egg Article' })).toBe(true);
  });

  it('should return false when no valid entity exists', () => {
    expect(validateEntityExists(null, undefined)).toBe(false);
    expect(validateEntityExists(null, null)).toBe(false);
  });

  it('should update Astro context response status to 404 when entities are invalid', () => {
    const astroCtx = { response: { status: 200 } };
    const isValid = assertEntityExists(astroCtx, null, undefined);

    expect(isValid).toBe(false);
    expect(astroCtx.response.status).toBe(404);
  });

  it('should update direct status object to 404 when entities are invalid', () => {
    const responseObj = { status: 200 };
    const isValid = assertEntityExists(responseObj, null, null);

    expect(isValid).toBe(false);
    expect(responseObj.status).toBe(404);
  });

  it('should maintain status 200 when at least one valid entity is present', () => {
    const astroCtx = { response: { status: 200 } };
    const recipe = { id: 'clasica', title: 'Tortilla Clásica' };
    const isValid = assertEntityExists(astroCtx, recipe);

    expect(isValid).toBe(true);
    expect(astroCtx.response.status).toBe(200);
  });
});
