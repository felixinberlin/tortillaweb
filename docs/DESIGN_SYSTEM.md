# Design System Guidelines: tortilladepatatas.org (The Recipe Notebook)

Source: [Google Doc](https://docs.google.com/document/d/1X-GEDt4_7o-mPwLejDBgc2q2ARxF4OIMsyE6bHYKaQA/edit?usp=sharing)

## 1. Brand Concept & Visual Narrative
The visual identity for `tortilladepatatas.org` is built on a **"Skeuomorphic-Modernist"** fusion. We are creating a digital evolution of the traditional kitchen diary—a space where tactile heritage meets high-performance engineering. Our goal is to satisfy the user's "Visual Choice" for sensory food experiences while providing high-speed information retrieval and the clinical precision required for food safety. This dual approach establishes the **E-E-A-T** (Experience, Expertise, Authoritativeness, and Trustworthiness) necessary to lead the gastronomic digital space.

> *From the Lead Designer’s Notebook:*
> "The Spanish tortilla is a masterpiece of duality: the rustic warmth of the potato and the delicate, scientific volatility of the egg. Our design must reflect this. We use a tactile 'Notebook' aesthetic to ground the user in tradition, yet we employ modernist speed and SEO clarity to ensure safety data—like the **70°C** threshold—is never more than a glance away. We are not just sharing recipes; we are archiving a culture with the precision of a laboratory and the heart of a grandmother’s kitchen. This is where first impressions of beauty meet the bactericidal necessity of truth."

---

## 2. The Primary Brand Palette: "The Star Ingredients"
The core palette is derived from the molecular and microbiological components of the tortilla de patata, emphasizing the critical nature of its raw materials.

| Color Name | Hex Code | Source Origin |
| --- | --- | --- |
| **Runny Yolk Gold** | `#FFB800` | Inspired by "poco cuajada" (under-set) yolk. Critical safety zone (pH 3.8 – 4.5, $a_w > 0.99$). |
| **Frit Potato Cream** | `#F5E6BE` | Represents the mass of the "patata frita" ($a_w$ 0.94 - 0.98), providing structural backdrop. |
| **Caramelized Onion Umber** | `#8D6E63` | Derived from traditional onion component & "bien cuajada" exterior crust (Maillard reaction). |

---

## 3. The Burner Animation Palette: "Heat & Cooking Levels"
Used for dynamic UI elements, this palette visualizes thermal processing required for pathogen inactivation:

1. **Pilot Light Blue** (`#00A3FF`): Represents ambient temperature and the "Danger Zone" where bacteria proliferate.
2. **Safety Threshold Orange** (`#FF8A00`): Associated with medium-doneness threshold (**63°C for 20 seconds**).
3. **Bactericidal Crimson** (`#D32F2F`): Critical safety zone (**70°C for 2 minutes**), ensuring a $\ge 5 \text{ log reduction}$ of *S. Enteritidis*.

---

## 4. Semantic UI Colors: "Safety & Risk Status"
* **High Risk (Danger):** `#B00020`
  * *Usage:* Apply to "Undercooked" scenarios or storage at ambient temperatures exceeding **4 hours**. (Note: 45% of outbreaks occur in homes and 44% in restaurants).
* **Warning (Caution):** `#FFC107`
  * *Usage:* Used for "Medium Done" or "Jugosa" tortillas (**63°C for 20 seconds** / "consumo inmediato").
* **Success (Safe):** `#2E7D32`
  * *Usage:* Apply to scenarios reaching **70°C for 2 minutes** or confirmed refrigeration below **8°C**.

---

## 5. Typography Combinations: "Print & Script"
* **Headings (Classical Serif):** Mimics traditional Spanish restaurant menus and heritage cookbooks (e.g. Playfair Display / Merriweather).
* **Body Text (Modern Sans-Serif):** Optimized for high-speed information retrieval with short phrases and paragraphs.
* **Accents (Elegant Script):** Simulates handwritten annotations in a "traditional kitchen diary" for "Chef's Tips".

---

## 6. Material Style: "Paper & Texture"
1. **Background Texture:** Subtle "Parchment" or "Graph Paper" overlay providing a tactile, notebook feel.
2. **Edge Treatment:** "Rounded notebook corners" or "subtle torn edges" to mimic a physical artifact.
3. **Shadowing:** Material Design depth simulating "stacked parchment" Z-axis elevation.

---

## 7. Imagery & Media Guidelines
* **High Definition Only:** Blurry or low-resolution images prohibited.
* **Natural Lighting:** Showcase aesthetic of local ingredients.
* **Visual Texture Consistency:** Photos must clearly differentiate between "poco cuajada" and "bien cuajada" textures.

---

## 8. SEO-Driven Navigation & Structure
* **Tier 1 Strategic Keywords:** Menú Semanal (Hacer), Comida Saludable (Saber).
* **Tier 2 Specific Intent:** Cerca de Mí (Hacer), Recetas Tradicionales (Hacer), Seguridad Alimentaria (Saber).

---

## 9. Component Spacing & Safety Rules
* **Horizontal Rules (`---`):** Separate culinary narrative from technical safety specifications.
* **Critical Data Bolding:** Always bold: **70°C**, **63°C**, **2 minutes**, **20 seconds**, and **4 hours**.
* **Cooking Standard:** Always listed as **70°C for 2 minutes**.
