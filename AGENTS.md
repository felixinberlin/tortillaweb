# Project Guidelines, Design System & Editorial Intelligence

All agentic contributions to `tortilladepatatas.org` must strictly adhere to:
1. The project design system guidelines in `docu/DESIGN_SYSTEM.md` (originating from Google Doc `https://docs.google.com/document/d/1X-GEDt4_7o-mPwLejDBgc2q2ARxF4OIMsyE6bHYKaQA/edit?usp=sharing`).
2. The Content Strategy & Editorial Intelligence principles in `docu/EDITORIAL_STRATEGY.md`.

## Key Design Requirements:
1. **Design Aesthetic**: Skeuomorphic-Modernist "Kitchen Notebook" fusion (Parchment textures, notebook card edges, stacked parchment shadows).
2. **Brand Colors**:
   - Runny Yolk Gold: `#FFB800`
   - Frit Potato Cream: `#F5E6BE`
   - Caramelized Onion Umber: `#8D6E63`
   - Pilot Light Blue: `#00A3FF`
   - Safety Threshold Orange: `#FF8A00`
   - Bactericidal Crimson: `#D32F2F`
3. **Safety Status Colors**:
   - Danger (High Risk / >4h ambient): `#B00020`
   - Warning (Caution / 63°C for 20s): `#FFC107`
   - Safe (Success / 70°C for 2 minutes / <8°C refrig): `#2E7D32`
4. **Mandatory Bolding**: Always bold critical safety figures: **70°C**, **63°C**, **2 minutes**, **20 seconds**, and **4 hours**. Ensure the gold cooking standard is listed as **70°C for 2 minutes**.

## Editorial Intelligence & Content Strategy Directives:
1. **Not Just Recipes**: A living encyclopedia, cultural map, and knowledge graph of Spanish tortilla.
2. **Voice**: Knowledgeable + curious + slightly irreverent + precise. Humor reinforces facts, never replaces them.
3. **Fact vs. Legend vs. Opinion**:
   - **FACT**: Backed by historical documentation (e.g. 1798 Villanueva de la Serena, 1817 Navarra Cortes document, CSIC studies).
   - **LEGEND**: Explicitly labeled (e.g. General Zumalacárregui, anonymous Navarrese farmwife).
   - **OPINION / TRADITION**: Onion debate, doneness preference, potato varieties.
4. **Zero AI Slop / SEO Sludge**: Ban repetitive 3-item lists, generic intros ("Spain is famous for..."), and artificial summaries. Every page must satisfy real curiosity or practical culinary technique.
5. **Knowledge Graph & Entity Linking**: Connect entities across the 3-level hierarchy (Pillar -> Topic -> Deep) with existing taxonomies (factions, ingredients, regions, techniques, people).
6. **Prioritization Framework**: Focus on P0 (core knowledge) and P1 (search/educational depth) before speculative P4 trivia.

## Asset & Image Management:
- **Local Asset Location**: All local images are served directly from `/public/images/personas/` and `/public/images/ingredients/`.
- **Google Drive Import Note**: Direct Google Drive links or auto-imports can produce corrupted/truncated files. Always verify file sizes or use uploaded ZIP archives unpacked directly into `public/images/`.

