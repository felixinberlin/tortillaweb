## Palette's Journal

## 2025-02-27 - PollComponent Accessibility
**Learning:** Found interactive poll options disguised as `div`s with `onClick` handlers. While they function for mouse users, they break keyboard navigation and screen readers don't understand their state.
**Action:** Replaced `div` with native `<button>`, implemented semantic layout preservation (`w-full text-left`), and added `aria-pressed` for screen readers alongside keyboard focus states.

## 2026-08-14 - Missing aria-labels on clear search buttons
**Learning:** Discovered that 'clear search' icon-only buttons (`X` icons) inside the builder's search inputs lacked `aria-label`s. Since these are completely visual (just an X icon inside the input field), screen readers and keyboard users need explicit text to understand their function.
**Action:** Added `aria-label="Clear search"` (and `cursor-pointer` for visual feedback) to all clear input buttons across the builder components to improve accessibility and micro-UX.
