/**
 * Shared Entity Validation & Route Assertion Helper
 * Validates content entity existence and sets HTTP 404 status on invalid requests.
 */

export interface AstroContextOrResponse {
  response?: { status: number };
  status?: number;
}

/**
 * Validates whether at least one valid (non-null, non-undefined) content entity exists.
 */
export function validateEntityExists(...entities: unknown[]): boolean {
  return entities.some((entity) => entity !== null && entity !== undefined);
}

/**
 * Asserts entity existence for an Astro dynamic route.
 * Sets HTTP status 404 on Astro.response if no valid entity exists.
 * Returns true if valid, false if invalid.
 */
export function assertEntityExists(
  astroContextOrResponse: AstroContextOrResponse | any,
  ...entities: unknown[]
): boolean {
  const isValid = validateEntityExists(...entities);
  if (!isValid && astroContextOrResponse) {
    if (astroContextOrResponse.response && typeof astroContextOrResponse.response.status === 'number') {
      astroContextOrResponse.response.status = 404;
    } else if (typeof astroContextOrResponse.status === 'number') {
      astroContextOrResponse.status = 404;
    }
  }
  return isValid;
}
