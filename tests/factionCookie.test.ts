import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import {
  setFactionCookie,
  getFactionCookie,
  clearFactionCookie,
  FACTION_COOKIE_NAME,
  LEGACY_FACTION_COOKIE_NAME,
  FACTION_STORAGE_KEY,
} from '../src/lib/factionCookie';

describe('Faction Cookie & Persistence Unit Tests', () => {
  // Mock document and localStorage in node environment
  let mockCookies = '';
  const mockStorage: Record<string, string> = {};

  const originalDocument = globalThis.document;
  const originalLocalStorage = globalThis.localStorage;

  beforeEach(() => {
    mockCookies = '';
    for (const k in mockStorage) delete mockStorage[k];

    // Mock document.cookie
    globalThis.document = {
      get cookie() {
        return mockCookies;
      },
      set cookie(val: string) {
        const parts = val.split(';');
        const [cookiePair] = parts;
        const [k, v] = cookiePair.split('=');
        if (val.includes('max-age=0')) {
          // Remove cookie
          mockCookies = mockCookies
            .split('; ')
            .filter((c) => c && !c.startsWith(`${k}=`))
            .join('; ');
        } else {
          // Replace or add cookie
          const filtered = mockCookies
            .split('; ')
            .filter((c) => c && !c.startsWith(`${k}=`));
          filtered.push(`${k}=${v}`);
          mockCookies = filtered.join('; ');
        }
      },
    } as any;

    // Mock localStorage
    globalThis.localStorage = {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, val: string) => {
        mockStorage[key] = val;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        for (const k in mockStorage) delete mockStorage[k];
      },
    } as any;
  });

  afterAll(() => {
    globalThis.document = originalDocument;
    globalThis.localStorage = originalLocalStorage;
  });

  it('should set and get the chosen faction cookie correctly', () => {
    setFactionCookie('concebollistas');

    expect(document.cookie).toContain(`${FACTION_COOKIE_NAME}=concebollistas`);
    expect(localStorage.getItem(FACTION_STORAGE_KEY)).toBe('concebollistas');
    expect(getFactionCookie()).toBe('concebollistas');
  });

  it('should update the cookie when a different faction is chosen', () => {
    setFactionCookie('puristas');
    expect(getFactionCookie()).toBe('puristas');

    setFactionCookie('pimientistas');
    expect(getFactionCookie()).toBe('pimientistas');
    expect(localStorage.getItem(FACTION_STORAGE_KEY)).toBe('pimientistas');
  });

  it('should fall back to localStorage if cookie is cleared', () => {
    localStorage.setItem(FACTION_STORAGE_KEY, 'ajistas');
    document.cookie = `${FACTION_COOKIE_NAME}=; max-age=0`;
    document.cookie = `${LEGACY_FACTION_COOKIE_NAME}=; max-age=0`;

    expect(getFactionCookie()).toBe('ajistas');
  });

  it('should clear faction cookie and localStorage on clearFactionCookie', () => {
    setFactionCookie('con-cosas');
    expect(getFactionCookie()).toBe('con-cosas');

    clearFactionCookie();
    expect(getFactionCookie()).toBeNull();
  });
});
