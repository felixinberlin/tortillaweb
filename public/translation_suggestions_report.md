# Translation Review Report

This report provides suggestions and corrections for the Spanish (`es.json`), English (`en.json`), and German (`de.json`) translation files for the Tortilla de Patatas website. The review takes into account a tone suitable for an "all ages" audience.

## General Observations
The tone across all languages is generally excellent, balancing educational content, culinary passion, and scientific rigor. However, there is a recurring issue in both the Spanish and German files where English time durations (e.g., "for 2 minutes", "for 20 seconds", "4 hours") have been left untranslated.

---

## 1. Spanish (`es.json`)

The Spanish translation is highly idiomatic and captures the culinary spirit of the dish perfectly. The main issue is the presence of untranslated English fragments.

### Corrections & Suggestions:

**Untranslated English Fragments (Action Required):**
Several strings in the `sciencePage`, `personasPage`, and `footer` sections contain English time durations that must be translated to Spanish.

*   **`sciencePage.chefNoteText`**:
    *   *Current*: "...exige siempre **70°C for 2 minutes** para lograr..."
    *   *Suggestion*: "...exige siempre **70°C durante 2 minutos** para lograr..."
*   **`sciencePage.card1.desc`**:
    *   *Current*: "...exige alcanzar **70°C for 2 minutes**..."
    *   *Suggestion*: "...exige alcanzar **70°C durante 2 minutos**..."
*   **`sciencePage.card3.desc`**:
    *   *Current*: "...alcanza los **63°C for 20 seconds**... alcanzando **70°C for 2 minutes**."
    *   *Suggestion*: "...alcanza los **63°C durante 20 segundos**... alcanzando **70°C durante 2 minutos**."
*   **`sciencePage.card4.desc`**:
    *   *Current*: "...más de **4 hours**."
    *   *Suggestion*: "...más de **4 horas**."
*   **`sciencePage.levelPilotDesc`**:
    *   *Current*: "...supera las **4 hours**."
    *   *Suggestion*: "...supera las **4 horas**."
*   **`sciencePage.levelMediumDesc`**:
    *   *Current*: "Procesamiento a **63°C for 20 seconds**."
    *   *Suggestion*: "Procesamiento a **63°C durante 20 segundos**."
*   **`sciencePage.levelSafeDesc`**:
    *   *Current*: "Procesamiento térmico de **70°C for 2 minutes**."
    *   *Suggestion*: "Procesamiento térmico de **70°C durante 2 minutos**."
*   **`personasPage.pasteurization`**:
    *   *Current*: "Pasteurización: **70°C for 2 minutes**"
    *   *Suggestion*: "Pasteurización: **70°C durante 2 minutos**"
*   **`personasPage.mediumThreshold`**:
    *   *Current*: "Umbral Medio: **63°C for 20 seconds**"
    *   *Suggestion*: "Umbral Medio: **63°C durante 20 segundos**"
*   **`personasPage.ambientLimit`**:
    *   *Current*: "Límite Ambiental: **4 hours**"
    *   *Suggestion*: "Límite Ambiental: **4 horas**"
*   **`footer.safeThreshold`**:
    *   *Current*: "Seguro: **70°C for 2 minutes**"
    *   *Suggestion*: "Seguro: **70°C durante 2 minutos**"
*   **`footer.cautionThreshold`**:
    *   *Current*: "Precaución: **63°C for 20 seconds**"
    *   *Suggestion*: "Precaución: **63°C durante 20 segundos**"
*   **`footer.riskThreshold`**:
    *   *Current*: "Riesgo: **4 hours** amb."
    *   *Suggestion*: "Riesgo: **4 horas** a temp. ambiente." (Expanding "amb." for clarity for all ages).
*   **`footer.safetyText`**:
    *   *Current*: "...exige alcanzar **70°C for 2 minutes** (o **63°C for 20 seconds** como umbral intermedio). Las tortillas poco cuajadas no deben permanecer más de **4 hours** a temperatura ambiente."
    *   *Suggestion*: "...exige alcanzar **70°C durante 2 minutos** (o **63°C durante 20 segundos** como umbral intermedio). Las tortillas poco cuajadas no deben permanecer más de **4 horas** a temperatura ambiente."

**Stylistic Suggestions (Optional for "All Ages" tone):**
*   **`sciencePage`**: The terminology (e.g., "reducción $\ge 5 \text{ log}$ de *S. Enteritidis*", "$a_w > 0.99$") is very technical. While fitting for a "Science" page, younger or non-technical readers might struggle. You could consider adding a simplified explanation (e.g., "reducción de bacterias en un 99.999%").

---

## 2. English (`en.json`)

The English translation is very strong and reads naturally. It properly uses cultural terms like "Concebollista" and explains them well. No major errors were found. 

### Corrections & Suggestions:

*   **`techniquesPage.step1.desc`**:
    *   *Current*: "Slice potatoes into thin, irregular bites ('chascar')."
    *   *Suggestion*: The Spanish word "chascar" means to crack or snap, so "irregular chunks" or "irregular pieces" might be slightly more accurate than "bites". However, "bites" still conveys the meaning well.
*   **`sciencePage.levelPilotDesc`**:
    *   *Current*: "...risk if standing time exceeds **4 hours**."
    *   *Suggestion*: This is correct and clear. No changes needed.
*   **Consistency**: The technical tone in the Science page is consistent with the Spanish version.

---

## 3. German (`de.json`)

The German translation is generally of high quality and captures the nuances of the Spanish original. However, like the Spanish version, it suffers from untranslated English time durations.

### Corrections & Suggestions:

**Untranslated English Fragments (Action Required):**
*   **`sciencePage.chefNoteText`**:
    *   *Current*: "...stets **70°C for 2 minutes** für eine..."
    *   *Suggestion*: "...stets **70°C für 2 Minuten** für eine..."
*   **`sciencePage.card1.desc`**:
    *   *Current*: "...fordert der Standard **70°C for 2 minutes**..."
    *   *Suggestion*: "...fordert der Standard **70°C für 2 Minuten**..."
*   **`sciencePage.card3.desc`**:
    *   *Current*: "...erreicht **63°C for 20 seconds**... Der bakterizide Goldstandard ist **70°C for 2 minutes**."
    *   *Suggestion*: "...erreicht **63°C für 20 Sekunden**... Der bakterizide Goldstandard ist **70°C für 2 Minuten**."
*   **`sciencePage.card4.desc`**:
    *   *Current*: "...länger als **4 hours** bei Raumtemperatur stehen."
    *   *Suggestion*: "...länger als **4 Stunden** bei Raumtemperatur stehen."
*   **`sciencePage.levelPilotDesc`**:
    *   *Current*: "...wenn die Stehzeit **4 hours** überschreitet."
    *   *Suggestion*: "...wenn die Stehzeit **4 Stunden** überschreitet."
*   **`sciencePage.levelMediumDesc`**:
    *   *Current*: "Thermische Behandlung bei **63°C for 20 seconds**."
    *   *Suggestion*: "Thermische Behandlung bei **63°C für 20 Sekunden**."
*   **`sciencePage.levelSafeDesc`**:
    *   *Current*: "Thermische Behandlung von **70°C for 2 minutes**."
    *   *Suggestion*: "Thermische Behandlung von **70°C für 2 Minuten**."
*   **`personasPage.pasteurization`**:
    *   *Current*: "Pasteurisierung: **70°C for 2 minutes**"
    *   *Suggestion*: "Pasteurisierung: **70°C für 2 Minuten**"
*   **`personasPage.mediumThreshold`**:
    *   *Current*: "Mittlere Stufe: **63°C for 20 seconds**"
    *   *Suggestion*: "Mittlere Stufe: **63°C für 20 Sekunden**"
*   **`personasPage.ambientLimit`**:
    *   *Current*: "Raumtemperatur-Limit: **4 hours**"
    *   *Suggestion*: "Raumtemperatur-Limit: **4 Stunden**"
*   **`footer.safeThreshold`**:
    *   *Current*: "Sicher: **70°C for 2 minutes**"
    *   *Suggestion*: "Sicher: **70°C für 2 Minuten**"
*   **`footer.cautionThreshold`**:
    *   *Current*: "Achtung: **63°C for 20 seconds**"
    *   *Suggestion*: "Achtung: **63°C für 20 Sekunden**"
*   **`footer.riskThreshold`**:
    *   *Current*: "Risiko: **4 hours** Raumtemp."
    *   *Suggestion*: "Risiko: **4 Stunden** bei Raumtemp."
*   **`footer.safetyText`**:
    *   *Current*: "...verlangt der Standard **70°C for 2 minutes** (oder **63°C for 20 seconds** als mittlere Stufe). Saftige Tortillas sollten nicht länger als **4 hours** bei Raumtemperatur stehen."
    *   *Suggestion*: "...verlangt der Standard **70°C für 2 Minuten** (oder **63°C für 20 Sekunden** als mittlere Stufe). Saftige Tortillas sollten nicht länger als **4 Stunden** bei Raumtemperatur stehen."

**Stylistic Suggestions:**
*   **`builder.appDesc`**:
    *   *Current*: "Rufen Sie die interaktive Tortilla Creator Anwendung unter... auf, um Ihr Rezept anzupassen."
    *   *Observation*: The formal "Sie" form is used here ("Rufen Sie"). For an "all ages" or friendly tone, it's often more appropriate in modern web contexts to use the informal "Du".
    *   *Suggestion*: "Rufe die interaktive Tortilla Creator Anwendung unter... auf, um dein Rezept anzupassen." (This matches the tone of "Erstelle deine Tortilla" used elsewhere in the file).
*   **`builder.dinersDesc`**:
    *   *Current*: "Wir berechnen Pfannengröße und Zutatenmengen entsprechend der Personenanzahl."
    *   *Observation*: Grammatically correct, but sounds a bit formal.
    *   *Suggestion*: "Wir berechnen die Pfannengröße und die Zutatenmengen je nach Anzahl der Personen."
