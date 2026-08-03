/**
 * Route Assertion & Validation Helper
 * Ensures dynamic entity routes validate entity existence and set HTTP 404 status on invalid requests.
 */

export interface EntityRouteValidation {
  isValid: boolean;
}

/**
 * Asserts that at least one valid content entity exists for the current route.
 * Returns true if valid, or false if invalid.
 */
export function validateRouteEntities(...entities: unknown[]): boolean {
  return entities.some((entity) => entity !== null && entity !== undefined);
}

/**
 * Helper to validate entities and automatically configure Astro response status to 404 if invalid.
 */
export function assertRouteEntities(astroResponse: { status: number }, ...entities: unknown[]): boolean {
  const isValid = validateRouteEntities(...entities);
  if (!isValid) {
    astroResponse.status = 404;
  }
  return isValid;
}
