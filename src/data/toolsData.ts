export interface ToolCategory {
  id: string;
  title: { es: string; en: string; de: string };
  description: { es: string; en: string; de: string };
  icon: string;
}

export interface ToolItem {
  id: string;
  category: "pans" | "peelers" | "knives-mandolines" | "turning" | "safety-thermometers" | "accessories";
  name: { es: string; en: string; de: string };
  tagline: { es: string; en: string; de: string };
  scientificPrinciple: { es: string; en: string; de: string };
  pros: { es: string[]; en: string[]; de: string[] };
  cons: { es: string[]; en: string[]; de: string[] };
  verdict: { es: string; en: string; de: string };
  specs: {
    material: string;
    wasteRate?: string;
    heatRetention?: string;
    recommendedFor: string;
  };
  highlighted?: boolean;
}

export interface PeelerComparisonRow {
  tool: { es: string; en: string; de: string };
  wastePercentage: string;
  cutPrecision: string;
  speedRating: string;
  ergonomics: string;
  starchPreservation: { es: string; en: string; de: string };
  recommendation: { es: string; en: string; de: string };
}

export const PEELER_COMPARISON_DATA: PeelerComparisonRow[] = [
  {
    tool: {
      es: "Pelador en Y con Cuchilla Pivotante (Estilo Suizo)",
      en: "Swivel Y-Peeler (Swiss Style)",
      de: "Y-Sparschäler mit beweglicher Klinge (Schweizer Bauart)",
    },
    wastePercentage: "3.5% - 4.5%",
    cutPrecision: "0.7 - 0.9 mm (Micro-corte uniforme)",
    speedRating: "★★★★★ (Máxima velocidad)",
    ergonomics: "Excelente (Tracción con antebrazo, mínima fatiga de muñeca)",
    starchPreservation: {
      es: "Máxima: retiene la capa subepidérmica rica en potasio y almidón fino.",
      en: "Maximum: retains sub-epidermal layer rich in potassium and fine starch.",
      de: "Maximal: bewahrt die stärkereiche Schicht direkt unter der Schale.",
    },
    recommendation: {
      es: "La opción #1 indiscutible en hostelería y ciencia de cocina. Ideal para patata Monalisa y Kennebec.",
      en: "Undisputed #1 choice in culinary science and professional kitchens. Perfect for smooth & irregular tubers.",
      de: "Die unangefochtene Nr. 1 der Gastronomie für schnelles, sparsames Schälen.",
    },
  },
  {
    tool: {
      es: "Pelador Recto Longitudinal (Estilo Lancelot / Francés)",
      en: "Straight Longitudinal Peeler (Lancelot Style)",
      de: "Längsschäler / Gerader Sparschäler",
    },
    wastePercentage: "6.0% - 8.5%",
    cutPrecision: "1.0 - 1.4 mm",
    speedRating: "★★★☆☆ (Media)",
    ergonomics: "Media (Requiere movimiento de muñeca hacia el exterior o hacia el pulgar)",
    starchPreservation: {
      es: "Aceptable en tubérculos alargados; irregular en patatas esféricas u ovaladas.",
      en: "Acceptable for long potatoes; irregular on spherical or bumpy tubers.",
      de: "Akzeptabel bei länglichen Kartoffeln, ungleichmäßig bei runden Knollen.",
    },
    recommendation: {
      es: "Buena alternativa para quienes están habituados a pelar hacia afuera, pero genera mayor pérdida de pulpa.",
      en: "Good alternative if accustomed to pushing strokes, but creates higher pulp loss.",
      de: "Gute Wahl für Schub-Schäler, erfordert jedoch mehr Kraft bei großen Mengen.",
    },
  },
  {
    tool: {
      es: "Cuchillo Puntilla / Paring Knife Tradicional",
      en: "Traditional Paring Knife (Puntilla)",
      de: "Klassisches Schäl- / Spickmesser",
    },
    wastePercentage: "12.0% - 18.0%",
    cutPrecision: "2.0 - 3.5 mm (Altamente irregular)",
    speedRating: "★★☆☆☆ (Lenta)",
    ergonomics: "Baja (Tensión constante en articulación interfalángica y pulgar)",
    starchPreservation: {
      es: "Baja: secciona facetas poligonales llevándose hasta 1/6 de la patata útil.",
      en: "Low: cuts polygonal facets, stripping away up to 1/6 of valuable potato mass.",
      de: "Gering: schneidet dicke Ecken ab und verschwendet bis zu 15 % der Kartoffel.",
    },
    recommendation: {
      es: "Herramienta tradicional nostálgica pero termodinámica y económicamente ineficiente.",
      en: "Nostalgic tradition, but thermodynamically and economically inefficient.",
      de: "Traditionell, aber ineffizient und mit hohem Schnittverlust verbunden.",
    },
  },
  {
    tool: {
      es: "Pelador con Cuchilla Cerámica de Zirconio",
      en: "Zirconia Ceramic Blade Peeler",
      de: "Keramik-Sparschäler",
    },
    wastePercentage: "4.0% - 5.5%",
    cutPrecision: "0.8 - 1.0 mm",
    speedRating: "★★★★☆ (Alta)",
    ergonomics: "Buena (Muy ligero, filo químicamente inerte)",
    starchPreservation: {
      es: "Excelente: no transfiere iones metálicos ni acelera la oxidación enzimática.",
      en: "Excellent: transfers zero metallic ions and avoids enzymatic oxidation.",
      de: "Hervorragend: verhindert metallische Oxidation an der Schnittfläche.",
    },
    recommendation: {
      es: "Excelente precisión de corte, aunque la hoja es frágil ante golpes o caídas en fregaderos metálicos.",
      en: "Great precision and non-reactive, but blade is brittle if dropped on hard surfaces.",
      de: "Extrem scharf und oxidationsfrei, aber stoßempfindlich bei Stürzen.",
    },
  },
];

export const SKILLET_MATERIAL_ANALYSIS = [
  {
    material: { es: "Hierro Mineral / Acero al Carbono", en: "Mineral / Carbon Steel", de: "Mineralischer Kohlenstoffstahl" },
    thermalInertia: "Alta (9/10)",
    reactivity: "Requiere curado con aceite vegetal polimerizado; antiadherencia natural.",
    pros: {
      es: "Sellado Maillard dorado perfecto, resistencia de por vida, respuesta rápida a cambios de llama.",
      en: "Exceptional golden Maillard crust, lasts a lifetime, responds well to flame modulation.",
      de: "Perfekte goldene Kruste, unverwüstlich, entwickelt natürliche Antihaft-Patina.",
    },
    cons: {
      es: "Requiere secado inmediato tras lavar y engrase ligero; peso considerable.",
      en: "Requires immediate drying and light oil coating to prevent rust; relatively heavy.",
      de: "Muss nach dem Spülen sofort geölt werden; spürbares Eigengewicht.",
    },
    recommendedDiameter: "22 - 24 cm (tortillas de 5 a 7 huevos)",
    chefVerdict: {
      es: "El material de referencia de los grandes maestros de la tortilla en el norte de España.",
      en: "The reference material favored by master tavern chefs across Northern Spain.",
      de: "Die Königsklasse der spanischen Tortilla-Meister für unübertroffene Röstaromen.",
    },
  },
  {
    material: { es: "Sartén Doble / Volteadora Acoplable", en: "Double Interlocking Flip Pan", de: "Doppel-Wendipfanne" },
    thermalInertia: "Media-Baja (6/10)",
    reactivity: "Aluminio fundido con recubrimiento antiadherente libre de PFOA y junta estanca.",
    pros: {
      es: "Riesgo cero de derrames al voltear; elimina el pánico en tortillas de 8+ huevos o muy líquidas.",
      en: "Zero liquid spill risk during flip; eliminates flip anxiety for large or very runny omelettes.",
      de: "Absolut auslaufsicher beim Wenden; perfekt für Anfänger und schwere 8-Eier-Tortillas.",
    },
    cons: {
      es: "Si se cocina cerrada, retiene vapor y cuece en vez de dorar; requiere destapar para evaporar.",
      en: "If kept closed, traps steam causing a rubbery boiled texture; must be opened to brown.",
      de: "Dampfstau bei geschlossenem Deckel; muss offen gegart und nur zum Wenden gekoppelt werden.",
    },
    recommendedDiameter: "24 - 26 cm (tortillas familiares de 6 a 10 huevos)",
    chefVerdict: {
      es: "Excelente para principiantes o tortillas gigantes, siempre que se use abierta durante la cocción.",
      en: "Outstanding safety tool for beginners, provided it is cooked open and only joined to flip.",
      de: "Geniales Sicherheitswerkzeug, sofern man offen brät und nur für den Wendemoment schließt.",
    },
  },
  {
    material: { es: "Aluminio Fundido Antiadherente Grueso (5-6mm)", en: "Heavy Cast Aluminum Non-Stick", de: "Schwerer Aluminium-Guss (Antihaft)" },
    thermalInertia: "Media-Alta (7.5/10)",
    reactivity: "Superficie inerte con multicapa de titanio/cerámica de alta resistencia.",
    pros: {
      es: "Distribución de calor perfectamente homogénea, deslizamiento suave para 'redondear la falda'.",
      en: "Even heat diffusion across the base, effortless sliding for shaping the tortilla rim.",
      de: "Gleichmäßige Hitzeverteilung, müheloses Gleiten zum Formen des Randes.",
    },
    cons: {
      es: "La capa antiadherente se degrada tras 3-5 años de uso intensivo o sobrecalentamiento.",
      en: "Non-stick coating wears out after 3-5 years of high heat or metal utensil contact.",
      de: "Antihaftbeschichtung nutzt sich bei sehr hoher Hitze nach einigen Jahren ab.",
    },
    recommendedDiameter: "20 - 24 cm (el estándar versátil de hogar)",
    chefVerdict: {
      es: "La opción más práctica y equilibrada para el día a día sin complicaciones de mantenimiento.",
      en: "The most practical, forgiving everyday option for home cooks.",
      de: "Die unkomplizierteste und alltagstauglichste Pfanne für den Hausgebrauch.",
    },
  },
  {
    material: { es: "Acero Inoxidable Tri-Ply (Sandwich Inox-Aluminio-Inox)", en: "Tri-Ply Stainless Steel", de: "3-Schicht-Edelstahl" },
    thermalInertia: "Alta (8/10)",
    reactivity: "Completamente inerte, sin recubrimientos químicos, indestructible.",
    pros: {
      es: "Durabilidad infinita, apto para lavavajillas, inocuidad alimentaria absoluta.",
      en: "Indestructible lifespan, dishwasher safe, 100% chemically non-reactive.",
      de: "Ewig haltbar, spülmaschinengeeignet, keine chemischen Beschichtungen.",
    },
    cons: {
      es: "Exige dominar el efecto Leidenfrost y la temperatura de precalentado para evitar que el huevo se pegue.",
      en: "Requires strict temperature mastery (Leidenfrost effect) to prevent egg sticking.",
      de: "Erfordert präzise Temperaturkontrolle (Leidenfrost-Effekt), damit das Ei nicht anhaftet.",
    },
    recommendedDiameter: "20 - 24 cm",
    chefVerdict: {
      es: "Para cocineros técnicos experimentados que buscan evitar antiadherentes sintéticos.",
      en: "For experienced culinary technicians who prioritize lifetime non-synthetic materials.",
      de: "Für erfahrene Köche, die dauerhaft ohne synthetische Beschichtungen arbeiten wollen.",
    },
  },
];

export const ESSENTIAL_TOOLS_LIST: ToolItem[] = [
  {
    id: "tool-y-peeler",
    category: "peelers",
    name: {
      es: "Pelador en Y de Cuchilla Pivotante",
      en: "Swivel Y-Peeler",
      de: "Y-Sparschäler mit Pendelklinge",
    },
    tagline: {
      es: "La herramienta que ahorra hasta un 10% de patata útil",
      en: "The tool that saves up to 10% of usable potato mass",
      de: "Spart bis zu 10 % wertvolle Kartoffelmasse gegenüber Messern",
    },
    scientificPrinciple: {
      es: "El ángulo fijo de la cuchilla pivotante limita la profundidad del corte a menos de 1 mm, retirando únicamente la cutícula externa e impidiendo la eliminación de la capa rica en almidón subepidérmico.",
      en: "The pivoting blade angle constrains cut depth to sub-millimeter thickness, removing only outer skin while preserving starch-dense sub-epidermal flesh.",
      de: "Der geführte Schnittwinkel begrenzt die Schälstärke auf unter 1 mm und schützt wertvolle Nährstoffe.",
    },
    pros: {
      es: [
        "Mínima merma de pulpa (menos del 4% en peso)",
        "Movimiento ergonómico de tracción con antebrazo",
        "Punta extractora lateral para ojos y nudos de la patata",
      ],
      en: [
        "Minimal pulp loss (<4% of total potato weight)",
        "Ergonomic pulling stroke reducing wrist fatigue",
        "Integrated side eye-remover for blemishes",
      ],
      de: [
        "Minimaler Gewichtsverlust (<4 %)",
        "Handgelenkschonende Zugbewegung",
        "Seitlicher Dorn zum Entfernen von Kartoffelaugen",
      ],
    },
    cons: {
      es: ["Las hojas de acero carbono requieren secarse tras lavar para evitar oxidación."],
      en: ["Carbon steel blades must be dried promptly to avoid surface oxidation."],
      de: ["Klingen aus Kohlenstoffstahl müssen nach dem Spülen abgetrocknet werden."],
    },
    verdict: {
      es: "Imprescindible en cualquier cocina seria. Reemplaza al cuchillo tradicional con una ganancia masiva de tiempo y producto.",
      en: "Indispensable in any kitchen. Outperforms paring knives in both speed and product preservation.",
      de: "Absolutes Pflichtwerkzeug für jede Küche.",
    },
    specs: {
      material: "Acero templado inoxidable / Acero carbono",
      wasteRate: "3.5% - 4.5%",
      recommendedFor: "Patatas Monalisa, Kennebec, Agria y Spunta",
    },
    highlighted: true,
  },
  {
    id: "tool-double-flip-pan",
    category: "pans",
    name: {
      es: "Sartén Doble Volteadora Acoplable",
      en: "Dual Interlocking Flip Skillet",
      de: "Doppel-Wendipfanne mit Verschluss",
    },
    tagline: {
      es: "El seguro de vida para voltear tortillas líquidas y pesadas",
      en: "The fail-safe system for turning heavy or runny tortillas",
      de: "Die auslaufsichere Wendelösung für cremige und große Tortillas",
    },
    scientificPrinciple: {
      es: "Dos cuerpos de sartén idénticos encajan mediante una pestaña de bisagra y una junta perimetral estanca. Al rotar 180°, el centro de gravedad permanece confinado dentro de la cavidad hermética, evitando la fuga centrífuga del huevo líquido.",
      en: "Two matching skillets interlock via a hinge lip and silicone gasket. During 180° rotation, gravity keeps the liquid core safely sealed inside.",
      de: "Zwei Pfannenhälften greifen über eine Scharnierkante ineinander und verhindern das Auslaufen von flüssigem Ei beim Drehen.",
    },
    pros: {
      es: [
        "Cero riesgo de quemaduras por aceite caliente al dar la vuelta",
        "Permite cuajar tortillas estilo Betanzos (muy líquidas) con total tranquilidad",
        "Se pueden separar para usarse como dos sartenes independientes",
      ],
      en: [
        "Zero risk of hot oil splatters or egg spills during flip",
        "Enables effortless handling of ultra-runny (Betanzos style) tortillas",
        "Detachable to serve as two standalone frying pans",
      ],
      de: [
        "Kein Verbrennungsrisiko durch heraustretendes heißes Öl",
        "Sicheres Gelingen bei sehr flüssigem Schmelzkern",
        "Teilbar in zwei separate Standardpfannen",
      ],
    },
    cons: {
      es: [
        "Si se deja cerrada durante la cocción, el vapor condensado 'cuece' la tortilla y arruina la costra dorada exterior.",
        "Mayor peso total en mano al ejecutar el giro.",
      ],
      en: [
        "Traps steam if cooked fully closed, creating a boiled rather than caramelized exterior.",
        "Heavier combined weight when performing the 180° flip.",
      ],
      de: [
        "Kondensierender Dampf verhindert bei geschlossenem Deckel eine knusprige Kruste.",
        "Höheres Gesamtgewicht beim Wendevorgang.",
      ],
    },
    verdict: {
      es: "La mejor aliada para quienes tienen miedo al giro o preparan tortillas de más de 8 huevos. La regla de oro: cocinar abierta y acoplar solo 5 segundos antes de voltear.",
      en: "A fantastic confidence-builder for large or runny omelettes. Golden rule: cook with lid open, couple only right before the flip.",
      de: "Perfekt gegen Wende-Angst. Wichtig: Immer offen anbraten und nur zum Wenden schließen.",
    },
    specs: {
      material: "Aluminio fundido con recubrimiento antiadherente tricapa",
      heatRetention: "Media",
      recommendedFor: "Principiantes, familias y tortillas de 6 a 12 huevos",
    },
    highlighted: true,
  },
  {
    id: "tool-vuelvetortillas-plate",
    category: "turning",
    name: {
      es: "Plato Vuelvetortillas con Pomo Central",
      en: "Tortilla Turning Lid with Central Knob",
      de: "Wendeteller / Deckel mit Mittelknauf",
    },
    tagline: {
      es: "El método artesanal que no aplasta la falda de la tortilla",
      en: "The traditional flat plate that protects the delicate tortilla rim",
      de: "Der traditionelle flache Wendeteller mit ergonomischem Holzknauf",
    },
    scientificPrinciple: {
      es: "A diferencia de un plato llano de vajilla (que tiene concavidad y reborde pronunciado que aplasta el perímetro exterior), el plato vuelvetortillas es 100% plano o ligeramente convexo, permitiendo un deslizamiento tangencial suave de vuelta a la sartén.",
      en: "Unlike concave dinner plates with steep edges that crush the tortilla skirt, a dedicated turning plate is flat, enabling a smooth tangential slide back into the pan.",
      de: "Völlig flache Scheibe, die im Gegensatz zu tiefen Esstellern den empfindlichen Tortillarand beim Gleiten nicht beschädigt.",
    },
    pros: {
      es: [
        "Pomo central aislante de calor para un agarre palmar seguro con una sola mano",
        "Superficie plana que mantiene la geometría redondeada perfecta",
        "Fabricado en madera de haya o cerámica esmaltada tradicional",
      ],
      en: [
        "Thermal insulated central knob for secure single-hand grip",
        "Flat plane preserves the rounded disc geometry",
        "Available in untreated beechwood or glazed earthenware",
      ],
      de: [
        "Hitzeisolierter Mittelknauf für sicheren Griff",
        "Erhält die perfekte runde Form der Tortilla",
        "Klassisch aus Buchenholz oder glasierter Keramik",
      ],
    },
    cons: {
      es: ["Requiere práctica en la coordinación muñeca-sartén para no derramar líquido."],
      en: ["Requires manual dexterity and coordination between pan and plate."],
      de: ["Erfordert etwas Übung bei sehr flüssigem Eikern."],
    },
    verdict: {
      es: "El accesorio tradicional por excelencia. Superior a cualquier plato de vajilla doméstica para el volteado clásico.",
      en: "The quintessential traditional tool. Vastly superior to regular dinner plates.",
      de: "Der bewährte Klassiker der spanischen Küche.",
    },
    specs: {
      material: "Madera de haya tratada / Cerámica esmaltada / Acero inox",
      recommendedFor: "Volteado tradicional en sartenes de 20 a 28 cm",
    },
    highlighted: true,
  },
  {
    id: "tool-digital-probe-thermometer",
    category: "safety-thermometers",
    name: {
      es: "Termómetro Digital de Sonda Ultrarrápida",
      en: "Instant-Read Digital Probe Thermometer",
      de: "Digitales Einstich-Thermometer mit Schnellsonde",
    },
    tagline: {
      es: "El árbitro científico entre la jugosidad y la seguridad bactericida",
      en: "The scientific arbiter between creaminess and pasteurization",
      de: "Präzisions-Messung für die 70°C Lebensmittelsicherheit",
    },
    scientificPrinciple: {
      es: "Termopar de micro-sensor que registra la temperatura central en menos de 2 segundos. Permite verificar los 70°C durante 2 minutos o 63°C durante 20 segundos sin necesidad de romper o abrir la tortilla.",
      en: "Micro-sensor thermocouple reading core temperature in under 2 seconds. Verifies the 70°C for 2 minutes or 63°C for 20 seconds safety thresholds without cutting open the tortilla.",
      de: "Misst die Kerntemperatur in unter 2 Sekunden für den Nachweis der thermischen Keimabtötung (70°C für 2 Minuten).",
    },
    pros: {
      es: [
        "Garantiza la eliminación bacteriana sin sobrecuajar la yema",
        "Medición de temperatura del aceite de pochado (óptimo: 130°C - 140°C)",
        "Aguja ultrafina de 1.5 mm que no deja marca visible en la costra",
      ],
      en: [
        "Ensures pathogen safety while preserving runny yolk texture",
        "Monitors potato poaching oil temperature (optimal: 130°C - 140°C)",
        "Ultra-fine 1.5 mm needle leaves no visible scar on the omelette",
      ],
      de: [
        "Sichere Salmonellen-Prävention bei flüssigem Kern",
        "Kontrolle der optimalen Öltemperatur beim Vorgaren (130°C - 140°C)",
        "Feine Sonde hinterlässt keine Einstichspuren",
      ],
    },
    cons: {
      es: ["Requiere pilas de botón y calibración anual con agua con hielo (0°C)."],
      en: ["Requires battery maintenance and occasional zero-point calibration."],
      de: ["Batteriebetrieben."],
    },
    verdict: {
      es: "La herramienta obligatoria según la ciencia culinaria moderna para servir tortillas jugosas con 100% de tranquilidad sanitaria.",
      en: "Mandatory equipment in modern culinary science to serve juicy tortillas with zero safety gamble.",
      de: "Unverzichtbar für Gastronomie und anspruchsvolle Hobbyköche.",
    },
    specs: {
      material: "Sonda acero quirúrgico 304, cuerpo IP67 resistente al agua",
      recommendedFor: "Monitoreo del cuajado y temperatura de fritura",
    },
    highlighted: true,
  },
  {
    id: "tool-wire-skimmer",
    category: "accessories",
    name: {
      es: "Araña / Espumadera de Malla Metálica",
      en: "Wire Mesh Spider Skimmer",
      de: "Draht-Schaumlöffel (Spider-Sieb)",
    },
    tagline: {
      es: "Drenaje instantáneo sin romper las láminas de patata pochada",
      en: "Instant oil drainage without breaking delicate poached potato slices",
      de: "Schonendes Heben der Kartoffelscheiben ohne Fettstau",
    },
    scientificPrinciple: {
      es: "A diferencia de las espumaderas con agujeros de chapa (que retienen charcos de aceite por tensión superficial), la malla de alambre entrecruzado tiene un 85% de área abierta, evacuando el aceite caliente en menos de 1 segundo.",
      en: "Unlike punched-hole metal spoons that trap oil via surface tension, open-wire mesh has an 85% void ratio, draining excess oil in under a second.",
      de: "Großmaschiges Drahtnetz lässt heißes Öl sofort ablaufen, ohne dass die weichen Kartoffeln zerdrückt werden.",
    },
    pros: {
      es: [
        "Reduce el exceso calórico y la pesadez en la tortilla final",
        "Trata con extrema delicadeza la patata confitada tierna",
        "Mango largo para evitar salpicaduras de aceite a 140°C",
      ],
      en: [
        "Eliminates excess grease and heavy mouthfeel",
        "Extremely gentle on tender poached potato slices",
        "Long handle keeps hands safe from 140°C oil",
      ],
      de: [
        "Verhindert fettige Tortillas durch maximale Abtropfleistung",
        "Sehr schonend zu den weich gegarten Kartoffellamellen",
        "Langer Griff für sicheren Abstand zum heißen Öl",
      ],
    },
    cons: {
      es: ["Requiere cepillado al lavar para que no queden restos de cebolla entre los alambres."],
      en: ["Requires a quick brush wash to clear trapped onion bits from wire junctions."],
      de: ["Sollte mit einer Bürste gereinigt werden."],
    },
    verdict: {
      es: "Muy superior a la espumadera tradicional para lograr una tortilla jugosa pero nunca aceitosa.",
      en: "Vastly superior to traditional solid skimmers for a clean, non-greasy texture.",
      de: "Standard-Schaumlöffeln in jeder Hinsicht überlegen.",
    },
    specs: {
      material: "Acero inoxidable 18/10",
      recommendedFor: "Extracción y escurrido de patatas y cebolla pochadas",
    },
  },
  {
    id: "tool-mandoline-japanese",
    category: "knives-mandolines",
    name: {
      es: "Mandolina Japonesa de Cuchilla Diagonal",
      en: "Japanese Diagonal Slicer Mandoline",
      de: "Japanische Gemüsemandoline",
    },
    tagline: {
      es: "Calibración milimétrica para un pochado térmicamente sincrónico",
      en: "Sub-millimeter calibration for uniform thermal poaching",
      de: "Präzisions-Schnitt für gleichzeitigen Gargarpunkt aller Scheiben",
    },
    scientificPrinciple: {
      es: "Si las patatas tienen grosores dispares (de 1 mm a 5 mm), las finas se sobrecocinan y las gruesas quedan duras. Una mandolina garantiza una desviación estándar de grosor inferior a 0.2 mm.",
      en: "Varied thickness leads to uneven cooking where thin slices turn to mush while thick slices stay raw. A mandoline keeps thickness standard deviation below 0.2 mm.",
      de: "Sorgt für exakt identische Scheibendicke (2,5 - 3,5 mm), sodass alle Kartoffeln exakt zur gleichen Minute gar sind.",
    },
    pros: {
      es: [
        "Ajuste micrométrico continuo de 0.5 a 5.0 mm",
        "Cuchilla en ángulo de 45° que reduce la fuerza de corte y no machaca la fibra",
        "Reduce el tiempo de preparación de 15 minutos a menos de 3 minutos",
      ],
      en: [
        "Continuous micrometer thickness dial from 0.5 to 5.0 mm",
        "45° angled blade reduces shearing force, keeping potato cellular structure intact",
        "Cuts prep time from 15 minutes to under 3 minutes",
      ],
      de: [
        "Stufenlose Schnittstärken-Einstellung von 0,5 bis 5 mm",
        "Schräggestellte Klinge schneidet sauber ohne Quetschen",
        "Enorme Zeitersparnis bei großen Mengen",
      ],
    },
    cons: {
      es: [
        "Riesgo de corte en dedos: uso OBLIGATORIO del salvamanos o guante de malla de kevlar.",
        "Genera rodajas perfectas; si se busca el corte tradicional 'chascado' con rotura irregular de almidón, es preferible el cuchillo.",
      ],
      en: [
        "Laceration risk: MUST be used with hand guard or cut-resistant safety glove.",
        "Produces flat discs; if seeking rough cracked cuts ('chascado'), hand knife is preferred.",
      ],
      de: [
        "Verletzungsgefahr: Restehalter oder schnittfester Handschuh zwingend erforderlich.",
        "Erzeugt glatte Scheiben statt traditionell gebrochener Kanten.",
      ],
    },
    verdict: {
      es: "La mejor aliada para quienes buscan regularidad matemática y rapidez en cocinas de alto volumen.",
      en: "The best tool for culinary precision and speed in high-volume settings.",
      de: "Unschlagbar für Präzision und Schnelligkeit.",
    },
    specs: {
      material: "Cuerpo ABS / Acero Inox, cuchilla de acero alto carbono",
      recommendedFor: "Corte uniforme de patatas a 3.0 mm y cebolla en juliana fina",
    },
  },
];
