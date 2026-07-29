## 2024-07-29 - Accessible Interactive Options
**Learning:** Implementing custom toggle buttons instead of native radio inputs requires manual ARIA state management (`aria-pressed`) and explicit focus styles for keyboard users, a pattern observed across multiple pages like the Builder, Personas, and History filters.
**Action:** Add `aria-pressed` tied to the selected state and `focus-visible` utility classes to all interactive, non-standard toggle buttons to ensure parity with native controls.
