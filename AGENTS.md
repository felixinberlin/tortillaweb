# Project Guidelines & Design System

All agentic contributions to `tortilladepatatas.org` must strictly adhere to the project design system guidelines saved in `docs/DESIGN_SYSTEM.md` (originating from Google Doc `https://docs.google.com/document/d/1X-GEDt4_7o-mPwLejDBgc2q2ARxF4OIMsyE6bHYKaQA/edit?usp=sharing`).

## Key Requirements:
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

## Asset & Image Management:
- **Local Asset Location**: All local images are served directly from `/public/images/personas/` and `/public/images/ingredients/`.
- **Google Drive Import Note**: Direct Google Drive links or auto-imports can produce corrupted/truncated files. Always verify file sizes or use uploaded ZIP archives unpacked directly into `public/images/`.
