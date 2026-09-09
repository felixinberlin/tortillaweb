# 🧬 Tortilla DNA vs. Batch Recipe Architecture & Comparative Protocol

## 1. Executive Summary & Conceptual Division

A central tenet of the `tortilladepatatas.org` culinary engine is the strict mathematical and practical separation between two representations of a tortilla:

1. **Tortilla DNA (ADN Tortillero) — Normalized Base: 1 Egg**
   - **Scale-Invariant Ratio**: All parameters (potatoes in grams, onions in grams, absorbed olive oil in milliliters, salt in grams) are normalized per **1 egg** (e.g. $100\text{g}$ potato / 1 egg, $20\text{g}$ onion / 1 egg).
   - **Stylistic Genetic Fingerprint**: Allows immediate, objective comparison across disparate scale preparations (a 2-egg personal pincho vs. a 12-egg family feast).
   - **Phenotypic Classification**: Automatically derives stylistic traits such as *Egg Dominance*, *Potato Density*, *Moisture Level*, and *Confit Richness*.

2. **Created Tortilla (Tortilla Creada) — Concrete Kitchen Batch**
   - **Scale-Specific Preparation**: The absolute quantities needed at the stove (e.g., $6\text{ eggs}$, $600\text{g}$ Monalisa potatoes, $120\text{g}$ sweet onion, frying oil volume).
   - **Physical Execution**: Dictates pan diameter ($18\text{cm}$ to $32\text{cm}$), total thermal mass, frying duration, and estimated servings.
   - **Thermal Safety Invariant**: Strictly mandates the microbiological gold standards (**70°C for 2 minutes** or **63°C for 20 seconds** for safe Salmonella neutralization, with ambient consumption limits of **4 hours**).

---

## 2. URL Protocol & Serialization Logic

The URL protocol enables deep linking, instant dual-recipe sharing, and cross-generation recipe face-offs (e.g. *"My Modern Confit Tortilla vs. Oma's Traditional Recipe"*).

### 2.1 Single Custom Recipe URL (Builder $\rightarrow$ Comparator)
When exporting a custom recipe from `/builder` to `/comparador`, query parameters define the batch inputs:
```text
https://tortilladepatatas.org/es/comparador?
  recipeA=custom-user-recipe
  &recipeB=betanzos
  &eggs=6
  &potatoes=600
  &eggSize=large
  &texture=jugosa
  &technique=pochada
  &variety=monalisa
  &cut=panadera
  &fryTemp=confit_soft
  &extras=onion:120
```

### 2.2 Dual Custom Recipes Face-Off URL (The "Oma Duel")
When comparing two distinct custom recipes (e.g., User Recipe vs. Oma's Recipe), parameters use prefixed namespaces (`a_*` and `b_*`):
```text
https://tortilladepatatas.org/es/comparador?
  recipeA=custom-user-recipe-a
  &recipeB=custom-user-recipe-b
  &a_name=Mi+Tortilla+Melosa
  &a_eggs=4
  &a_potatoes=480
  &a_texture=jugosa
  &a_variety=monalisa
  &a_extras=onion:80
  &b_name=Tortilla+Tradicional+Oma
  &b_eggs=8
  &b_potatoes=640
  &b_texture=cuajada
  &b_variety=agria
  &b_extras=onion:0
```

---

## 3. Mathematical Normalization Engine

Let:
- $E$ be the total egg count ($E \ge 1$).
- $P$ be total raw potato mass ($\text{g}$).
- $O$ be total raw onion mass ($\text{g}$).
- $L$ be total absorbed olive oil ($\text{ml}$).

The **DNA Ratios** per single egg are computed as:
$$\text{Ratio}_{\text{potato}} = \frac{P}{E} \quad (\text{g/egg})$$
$$\text{Ratio}_{\text{onion}} = \frac{O}{E} \quad (\text{g/egg})$$
$$\text{Ratio}_{\text{oil}} = \frac{L}{E} \quad (\text{ml/egg})$$

### Archetype Genetic Reference Benchmarks (per 1 egg):
| Style / Entity | Potato / Egg | Onion / Egg | Absorbed Oil / Egg | Pan Sizing Factor |
| :--- | :--- | :--- | :--- | :--- |
| **Betanzos Canon** | $40 - 60\text{g}$ | $0\text{g}$ (Concebollista ban) | $6 - 9\text{ml}$ | High egg volume / rapid seal |
| **Clásica de Bar (Madrid)** | $100 - 125\text{g}$ | $15 - 25\text{g}$ | $10 - 14\text{ml}$ | Balanced structural ratio |
| **Vasbo-Navarra Confit** | $110 - 140\text{g}$ | $20 - 35\text{g}$ (caramelized) | $12 - 16\text{ml}$ | Slow poach, high creaminess |
| **Bocadillo Compacta** | $140 - 180\text{g}$ | $0 - 20\text{g}$ | $10 - 13\text{ml}$ | High starch density |

---

## 4. UI/UX Dual Tab Presentation

The `/comparador` interface renders two synchronized perspectives:

1. **Tab 1: 🧬 ADN Normalizado (1 Huevo)**:
   - Comparative table measuring differential percentages per egg.
   - Normalized progress gauges for **Egg Dominance** ($\%$), **Potato Load** ($\text{g/egg}$), and **Confit Richness** ($\text{ml/egg}$).
   - Independent of serving sizes; reveals pure culinary technique.

2. **Tab 2: 🍳 Cantidades Totales de Cocina**:
   - Total shopping & prep list for both cooks ($4\text{ eggs}$ vs. $8\text{ eggs}$, $480\text{g}$ vs. $640\text{g}$ potato).
   - Skillet diameter recommendations based on total batch volume ($18-20\text{cm}$, $22-24\text{cm}$, $26-28\text{cm}$, $30-32\text{cm}$).
   - Direct link back to the Builder to iterate either Recipe A or Recipe B independently.
