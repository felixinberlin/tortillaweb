/**
 * Route Assertion & Validation Helper
 * Ensures dynamic entity routes validate entity existence and set HTTP 404 status on invalid requests.
 */

import { validateEntityExists, assertEntityExists } from './assertEntity';

export { validateEntityExists, assertEntityExists };

export interface EntityRouteValidation {
  isValid: boolean;
}

export const validateRouteEntities = validateEntityExists;

/**
 * Helper to validate entities and automatically configure Astro response status to 404 if invalid.
 */
export function assertRouteEntities(astroResponse: { status: number } | any, ...entities: unknown[]): boolean {
  return assertEntityExists(astroResponse, ...entities);
}
