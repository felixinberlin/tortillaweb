/**
 * Faction Cookie & Persistence Manager
 * Manages storing and retrieving user faction allegiance via browser cookies and localStorage.
 */

import { FACTIONS_CANON } from './factionsCanon';

export const FACTION_COOKIE_NAME = 'tortilla_faction';
export const LEGACY_FACTION_COOKIE_NAME = 'faction';
export const FACTION_STORAGE_KEY = 'tortilla_faction_vote';

export const FACTION_IDS = [
  'concebollistas',
  'puristas',
  'pimientistas',
  'ajistas',
  'con-cosas',
] as const;

export type FactionId = typeof FACTION_IDS[number] | string;

export interface FactionInfo {
  id: string;
  name: {
    es: string;
    en: string;
    de: string;
  };
  dogma: {
    es: string;
    en: string;
    de: string;
  };
}

export const FACTION_DATA: Record<string, FactionInfo> = FACTIONS_CANON;

/**
 * Sets the faction cookie and synchronizes with localStorage.
 * Dispatches a custom window event so all UI components update in real-time.
 */
export function setFactionCookie(factionId: string): void {
  if (typeof document === 'undefined') return;

  const sanitizedId = String(factionId).trim().toLowerCase();
  const maxAge = 365 * 24 * 60 * 60; // 1 year in seconds

  // 1. Primary cookie
  document.cookie = `${FACTION_COOKIE_NAME}=${encodeURIComponent(sanitizedId)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  // 2. Compatibility alias cookie
  document.cookie = `${LEGACY_FACTION_COOKIE_NAME}=${encodeURIComponent(sanitizedId)}; path=/; max-age=${maxAge}; SameSite=Lax`;

  // 3. LocalStorage persistence for client-side resilience
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(FACTION_STORAGE_KEY, sanitizedId);
      localStorage.setItem('tortilla_faction', sanitizedId);
    } catch {
      // Ignore localStorage errors (e.g. private mode)
    }
  }

  // 4. Dispatch event for reactive UI synchronization across components
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(
        new CustomEvent('tortilla-faction-changed', {
          detail: { factionId: sanitizedId },
        })
      );
    } catch {
      // Ignore event dispatch errors
    }
  }
}

/**
 * Reads the user's chosen faction from cookie or localStorage fallback.
 */
export function getFactionCookie(): string | null {
  if (typeof document === 'undefined') return null;

  // 1. Check cookies first
  const cookieMatches = document.cookie.match(
    new RegExp(`(?:^|;\\s*)(?:${FACTION_COOKIE_NAME}|${LEGACY_FACTION_COOKIE_NAME})=([^;]+)`)
  );

  if (cookieMatches && cookieMatches[1]) {
    try {
      return decodeURIComponent(cookieMatches[1].trim());
    } catch {
      return cookieMatches[1].trim();
    }
  }

  // 2. Fallback to localStorage
  if (typeof localStorage !== 'undefined') {
    try {
      const stored =
        localStorage.getItem(FACTION_STORAGE_KEY) ||
        localStorage.getItem('tortilla_faction');
      if (stored) return stored.trim();
    } catch {
      // Ignore
    }
  }

  return null;
}

/**
 * Deletes the faction cookie and clears localStorage.
 */
export function clearFactionCookie(): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${FACTION_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  document.cookie = `${LEGACY_FACTION_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.removeItem(FACTION_STORAGE_KEY);
      localStorage.removeItem('tortilla_faction');
    } catch {
      // Ignore
    }
  }

  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(
        new CustomEvent('tortilla-faction-changed', {
          detail: { factionId: null },
        })
      );
    } catch {
      // Ignore
    }
  }
}
