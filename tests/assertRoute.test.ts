import { describe, it, expect } from 'vitest';
import { validateRouteEntities, assertRouteEntities } from '../src/lib/routing/assertRoute';

describe('Entity Route Validation & 404 Assertion Helper', () => {
  it('should return true when at least one entity exists', () => {
    const mockTaxonomy = { id: 'potato', type: 'ingredient' };
    expect(validateRouteEntities(mockTaxonomy, undefined)).toBe(true);
    expect(validateRouteEntities(null, { id: 'potato-article' })).toBe(true);
    expect(validateRouteEntities(mockTaxonomy, { id: 'potato-article' })).toBe(true);
  });

  it('should return false when no entities exist (null & undefined)', () => {
    expect(validateRouteEntities(null, undefined)).toBe(false);
    expect(validateRouteEntities(undefined, undefined)).toBe(false);
    expect(validateRouteEntities(null, null)).toBe(false);
  });

  it('should set Astro.response.status = 404 when invalid entity state is provided', () => {
    const mockResponse = { status: 200 };
    const isValid = assertRouteEntities(mockResponse, null, undefined);

    expect(isValid).toBe(false);
    expect(mockResponse.status).toBe(404);
  });

  it('should maintain status 200 when a valid entity is provided', () => {
    const mockResponse = { status: 200 };
    const mockTaxonomy = { id: 'con-cebolla', type: 'faction' };
    const isValid = assertRouteEntities(mockResponse, mockTaxonomy, undefined);

    expect(isValid).toBe(true);
    expect(mockResponse.status).toBe(200);
  });
});
