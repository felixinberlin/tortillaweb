## 2024-05-20 - Multi-lingual ARIA Labels in React
**Learning:** Hardcoded ARIA labels in components negatively impact screen reader users when an app supports internationalization, creating mismatched spoken languages for icon-only buttons.
**Action:** When adding ARIA labels to components within a localized app, ensure the label text dynamically changes based on the current locale state (e.g. using a `lang` prop or translation function) to ensure all users receive accessibility information in their correct language.
