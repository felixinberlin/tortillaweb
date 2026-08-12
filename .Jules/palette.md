## Palette's Journal

## 2025-02-27 - PollComponent Accessibility
**Learning:** Found interactive poll options disguised as `div`s with `onClick` handlers. While they function for mouse users, they break keyboard navigation and screen readers don't understand their state.
**Action:** Replaced `div` with native `<button>`, implemented semantic layout preservation (`w-full text-left`), and added `aria-pressed` for screen readers alongside keyboard focus states.
## 2025-02-18 - Semantic Icon Accessibility Learnings
**Learning:** Found several clickable elements in the application that were styled `<span>` tags acting as buttons using `onClick` events with an `X` icon inside. These lack keyboard navigation capability and screen reader context for accessibility. A common pattern on filter clear indicators.
**Action:** When finding raw click handlers on visual components, ensure they are translated to actual semantic `<button>` elements with `aria-label`s instead, to provide proper screen reader context and keyboard navigability without introducing any new visual footprint.
