## Palette's Journal

## 2025-02-27 - PollComponent Accessibility
**Learning:** Found interactive poll options disguised as `div`s with `onClick` handlers. While they function for mouse users, they break keyboard navigation and screen readers don't understand their state.
**Action:** Replaced `div` with native `<button>`, implemented semantic layout preservation (`w-full text-left`), and added `aria-pressed` for screen readers alongside keyboard focus states.

## 2025-02-27 - Bilingual ARIA Labels in Builder
**Learning:** Accessibility attributes in this app's bilingual architecture must mirror the content's translation strategy. Specifically, icon-only button `aria-label`s need dynamic strings (e.g., `isEs ? 'Cerrar' : 'Close'`) rather than hardcoded strings, to ensure screen readers speak the label in the correct localized context (Spanish/English).
**Action:** When adding ARIA labels to components that support translation, always check for existing locale hooks (like `isEs`) and apply ternary localization to the accessibility attributes.
