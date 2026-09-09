export interface EquipmentItem {
  id: string;
  category: 'pans' | 'cutlery' | 'thermometers' | 'pantry' | 'books' | 'merch';
  name: {
    es: string;
    en: string;
    de: string;
  };
  tagline: {
    es: string;
    en: string;
    de: string;
  };
  description: {
    es: string;
    en: string;
    de: string;
  };
  whyEssential: {
    es: string;
    en: string;
    de: string;
  };
  priceRange: string;
  priceValue: number;
  currency: string;
  badge: {
    es: string;
    en: string;
    de: string;
  };
  rating: number;
  reviewCount: number;
  inStock: boolean;
  affiliateUrl: string;
  brand: string;
  specs: {
    es: string[];
    en: string[];
    de: string[];
  };
  image: string;
  highlighted?: boolean;
}

export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    id: 'pan-debuyer-mineral-b',
    category: 'pans',
    name: {
      es: 'Sartén de Hierro Mineral B De Buyer (24cm / 26cm)',
      en: 'De Buyer Mineral B Iron Skillet (24cm / 26cm)',
      de: 'De Buyer Mineral B Eisenpfanne (24cm / 26cm)',
    },
    tagline: {
      es: 'La reina del dorado Maillard y antiadherencia natural para toda la vida',
      en: 'The queen of Maillard searing and natural lifetime seasoning',
      de: 'Die Königin der Maillard-Kruste und lebenslanger natürlicher Antihaftung',
    },
    description: {
      es: 'Forjada en hierro mineral 100% natural con cera de abeja orgánica. Distribuye el calor térmico sin puntos fríos, permitiendo un sellado ultrarrápido sin sobrecuajar el interior.',
      en: 'Forged in 100% natural mineral iron with organic beeswax finish. Uniform thermal distribution enables rapid exterior searing without overcooking the runny core.',
      de: 'Geschmiedet aus 100 % natürlichem Eisen mit Bienenwachs-Finish. Gleichmäßige Hitzeverteilung sorgt für perfekte Kruste bei flüssigem Kern.',
    },
    whyEssential: {
      es: 'El hierro alcanza la temperatura de sellado en segundos. Evita que la tortilla se pegue una vez curada y dura generaciones.',
      en: 'Iron reaches searing heat in seconds. Never sticks once seasoned and lasts for generations.',
      de: 'Eisen speichert Hitze optimal, brennt nach dem Einbrennen nie an und hält ein Leben lang.',
    },
    priceRange: '45€ - 58€',
    priceValue: 49.95,
    currency: 'EUR',
    badge: {
      es: 'Elección de Maestros',
      en: "Chefs' Top Choice",
      de: 'Meister-Empfehlung',
    },
    rating: 4.9,
    reviewCount: 3840,
    inStock: true,
    affiliateUrl: 'https://amazon.es/dp/B00462QP0W?tag=tortilladepatatas-21',
    brand: 'De Buyer',
    specs: {
      es: ['Hierro mineral 100% natural', 'Apta para inducción, gas y vitro', 'Grosor 2.5-3mm indeformable', 'Fabricada en Francia'],
      en: ['100% natural mineral iron', 'Induction, gas & ceramic compatible', '2.5-3mm heavy-duty gauge', 'Made in France'],
      de: ['100 % natürliches Mineraleisen', 'Für Induktion, Gas & Glaskeramik', '2,5-3 mm Materialstärke', 'Hergestellt in Frankreich'],
    },
    image: '/images/ingredients/aceite.svg',
    highlighted: true,
  },
  {
    id: 'pan-castey-duetto-double',
    category: 'pans',
    name: {
      es: 'Sartén Doble Volteadora Castey Duetto Induction (24cm)',
      en: 'Castey Duetto Induction Double Flip Pan (24cm)',
      de: 'Castey Duetto Induktion Doppel-Wendipfanne (24cm)',
    },
    tagline: {
      es: '0% derrames, 100% seguridad al dar la vuelta sin quemaduras ni platos',
      en: '0% spills, 100% fail-safe turning without slippery plates',
      de: '0 % Verschütten, 100 % Wendesicherheit ohne Teller-Unfälle',
    },
    description: {
      es: 'Sistema de doble sartén acoplable con cierre hermético y recubrimiento multicapa de titanio libre de PFOA. Ideal para tortillas grandes y personas que temen el momento del volteo.',
      en: 'Interlocking dual-skillet system with hermetic seal and PFOA-free titanium non-stick coating. Perfect for large omelettes and stress-free flipping.',
      de: 'Ineinandergreifendes Doppelpfannen-System mit Dichtrand und PFOA-freier Titanbeschichtung für unfallfreies Wenden.',
    },
    whyEssential: {
      es: 'Elimina por completo el riesgo de derramar huevo líquido hirviendo sobre los fogones o las manos.',
      en: 'Completely eliminates the danger of splashing hot liquid egg on stove surfaces or hands.',
      de: 'Verhindert zuverlässig das Auslaufen von heißem Ei auf Herd und Hände.',
    },
    priceRange: '64€ - 79€',
    priceValue: 69.90,
    currency: 'EUR',
    badge: {
      es: 'Anti-Accidentes 100%',
      en: 'Zero-Spill Guarantee',
      de: 'Anti-Unfall Garantie',
    },
    rating: 4.8,
    reviewCount: 1920,
    inStock: true,
    affiliateUrl: 'https://amazon.es/dp/B008K3Z6K2?tag=tortilladepatatas-21',
    brand: 'Castey',
    specs: {
      es: ['Aluminio fundido de gran espesor', 'Recubrimiento Titanio ecológico', 'Mango desmontable ergonómico', 'Apta para lavavajillas'],
      en: ['Heavy-gauge cast aluminum', 'Eco-friendly titanium coating', 'Ergonomic detachable handle', 'Dishwasher safe'],
      de: ['Hochwertiger Aluguss', 'Umweltfreundliche Titan-Versiegelung', 'Abnehmbarer ergonomischer Griff', 'Spülmaschinengeeignet'],
    },
    image: '/images/ingredients/patata.svg',
    highlighted: true,
  },
  {
    id: 'thermometer-thermopro-instant',
    category: 'thermometers',
    name: {
      es: 'Termómetro Digital Sonda Ultrarrápida ThermoPro TP-19H',
      en: 'ThermoPro TP-19H Ultra-Fast Digital Probe Thermometer',
      de: 'ThermoPro TP-19H Ultraschnelles Einstich-Thermometer',
    },
    tagline: {
      es: 'Lectura en 2 segundos para clavar los 63°C y 70°C de seguridad térmica',
      en: '2-second read to hit exact 63°C and 70°C thermal safety targets',
      de: 'Messung in 2 Sekunden für exakte 63°C und 70°C Sicherheitsstandards',
    },
    description: {
      es: 'Sonda plegable con sensor termopar de precisión ±0.5°C y pantalla retroiluminada giratoria. La única forma científica de garantizar la pasteurización a **70°C por 2 minutos** sin secar el huevo.',
      en: 'Foldable thermocouple probe with ±0.5°C accuracy and auto-rotating backlit display. The scientific tool to achieve **70°C for 2 minutes** pasteurization without curdling.',
      de: 'Präzisions-Einstichfühler mit ±0,5°C Genauigkeit. Gewährleistet Pasteurisation bei **70°C für 2 Minuten** mit perfektem Fließkern.',
    },
    whyEssential: {
      es: 'La diferencia entre una tortilla jugosa bacteriológicamente segura y un riesgo de Salmonella son 4 grados. La vista no mide grados; la sonda sí.',
      en: 'The gap between a safe juicy omelette and Salmonella risk is 4 degrees. Sight cannot measure degrees; this probe can.',
      de: 'Zwischen saftiger Sicherheit und Salmonellengefahr liegen nur 4 Grad. Ein Muss für verlässliche Küchenhygiene.',
    },
    priceRange: '19€ - 26€',
    priceValue: 22.99,
    currency: 'EUR',
    badge: {
      es: 'Seguridad Científica',
      en: 'Food Safety Gold Standard',
      de: 'Lebensmittelsicherheit',
    },
    rating: 4.9,
    reviewCount: 14500,
    inStock: true,
    affiliateUrl: 'https://amazon.es/dp/B07RA83321?tag=tortilladepatatas-21',
    brand: 'ThermoPro',
    specs: {
      es: ['Velocidad de respuesta 2-3 seg', 'Precisión ±0.5°C (-20°C a 250°C)', 'Impermeabilidad IP65', 'Imán trasero para nevera'],
      en: ['2-3s ultra-fast response', '±0.5°C accuracy', 'IP65 waterproof rating', 'Magnetic back for fridge mount'],
      de: ['2-3 Sek. Reaktionszeit', '±0,5°C Genauigkeit', 'IP65 wasserdicht', 'Integrierter Kühlschrankmagnet'],
    },
    image: '/images/ingredients/huevo.svg',
    highlighted: true,
  },
  {
    id: 'mandoline-benriner-japanese',
    category: 'cutlery',
    name: {
      es: 'Mandolina Profesional Japonesa Benriner BN-64 (Corte 2mm)',
      en: 'Benriner BN-64 Japanese Professional Mandoline (2mm cut)',
      de: 'Benriner BN-64 Japanische Profi-Mandoline (2mm Schnitt)',
    },
    tagline: {
      es: 'Espesor de patata micrométrico y uniforme para un confitado sin sorpresas',
      en: 'Micrometric, uniform potato slicing for foolproof slow confit',
      de: 'Mikrometergenaue Kartoffelscheiben für gleichmäßiges Confieren',
    },
    description: {
      es: 'Cuchilla de acero inoxidable de Sakai templada a mano con rueda de ajuste de grosor infinito (0.5mm a 5mm). Consigue discos de patata 100% homogéneos que se cocinan al unísono.',
      en: 'Handcrafted Sakai stainless steel blade with continuous micrometric thickness dial (0.5mm to 5mm). Guarantees identical potato disks that cook at the exact same pace.',
      de: 'Handgeschliffene Sakai-Edelstahlklinge mit stufenloser Radeinstellung (0,5mm bis 5mm). Garantiert perfekt gleichmäßig gegarte Kartoffeln.',
    },
    whyEssential: {
      es: 'Si las patatas tienen grosores distintos, unas quedan crudas y otras quemadas. La mandolina resuelve el 80% de los fallos de textura.',
      en: 'Uneven slices cause half the potatoes to stay raw while the rest burn. Slicing precision solves 80% of texture failures.',
      de: 'Ungleiche Dicke führt zu rohen und verbrannten Stücken. Perfekte Scheiben garantieren gleichmäßige Textur.',
    },
    priceRange: '48€ - 62€',
    priceValue: 54.00,
    currency: 'EUR',
    badge: {
      es: 'Precisión Quirúrgica',
      en: 'Precision Slicing',
      de: 'Präzisionsschnitt',
    },
    rating: 4.8,
    reviewCount: 5200,
    inStock: true,
    affiliateUrl: 'https://amazon.es/dp/B01D2C00HY?tag=tortilladepatatas-21',
    brand: 'Benriner',
    specs: {
      es: ['Acero inoxidable japonés templado', 'Ajuste continuo 0.5mm a 5.0mm', 'Protector de dedos ergonómico', 'Compacta y fácil de limpiar'],
      en: ['Japanese tempered stainless steel', 'Continuous 0.5mm to 5.0mm dial', 'Ergonomic safety hand guard', 'Compact & effortless cleaning'],
      de: ['Japanischer gehärteter Edelstahl', 'Stufenlos 0,5mm bis 5,0mm', 'Ergonomischer Fingerschutz', 'Kompakt & leicht zu reinigen'],
    },
    image: '/images/ingredients/sal.svg',
  },
  {
    id: 'spatula-lacor-inox-turner',
    category: 'cutlery',
    name: {
      es: 'Espátula Volteadora Redondeada Lacor Inox 28cm',
      en: 'Lacor 28cm Rounded Stainless Steel Omelette Turner',
      de: 'Lacor 28cm Abgerundeter Tortilla-Wender aus Edelstahl',
    },
    tagline: {
      es: 'El borde curvo flexible que redondea el ribete y sella los laterales',
      en: 'The flexible curved blade designed to tuck edges and shape the crust',
      de: 'Die flexible Kante für perfekte Rundung und sauberes Formen der Ränder',
    },
    description: {
      es: 'Diseñada específicamente para deslizarse por la pared cóncava de la sartén, metiendo los bordes hacia dentro para lograr la clásica forma redondeada de cojín sin romper la membrana.',
      en: 'Engineered specifically to glide along curved skillet walls, tucking the outer rim inward to form the iconic plump cushion shape without piercing the skin.',
      de: 'Speziell geformt, um an den gewölbten Pfannenwänden entlangzugleiten und die Ränder kissenförmig einzuschlagen.',
    },
    whyEssential: {
      es: 'Permite remeter los bordes con suavidad mientras la tortilla gira en el aire con el movimiento de muñeca.',
      en: 'Enables gentle edge-tucking while rotating the omelette during the wrist movement.',
      de: 'Ermöglicht sanftes Formen der Ränder während der Pfannen-Drehung.',
    },
    priceRange: '12€ - 16€',
    priceValue: 14.50,
    currency: 'EUR',
    badge: {
      es: 'Técnica de Ribete',
      en: 'Edge Shaping Tool',
      de: 'Rand-Formwerkzeug',
    },
    rating: 4.7,
    reviewCount: 1100,
    inStock: true,
    affiliateUrl: 'https://amazon.es/dp/B000T7P6W0?tag=tortilladepatatas-21',
    brand: 'Lacor',
    specs: {
      es: ['Acero inoxidable 18/10', 'Borde biselado flexible', 'Mango atérmico ergonómico', 'Longitud 28cm'],
      en: ['18/10 stainless steel', 'Flexible beveled blade', 'Heat-resistant grip', '28cm total length'],
      de: ['18/10 Edelstahl', 'Flexible angeschrägte Klinge', 'Hitzebeständiger Griff', '28cm Gesamtlänge'],
    },
    image: '/images/ingredients/trufa.svg',
  },
  {
    id: 'oil-aove-picual-reserva-cazorla',
    category: 'pantry',
    name: {
      es: 'AOVE Picual Cosecha Temprana D.O. Sierra de Cazorla (Lata 5L)',
      en: 'Early Harvest Picual EVOO D.O. Sierra de Cazorla (5L Tin)',
      de: 'Natives Olivenöl Extra Picual D.O. Sierra de Cazorla (5L Kanister)',
    },
    tagline: {
      es: 'Alto contenido en ácido oleico y polifenoles: máxima estabilidad a 180°C',
      en: 'High oleic acid & polyphenol concentration: highest stability at 180°C frying',
      de: 'Hoher Ölsäure- und Polyphenolgehalt: maximale Hitzestabilität bei 180°C',
    },
    description: {
      es: 'Aceite de oliva virgen extra de recolección en verde. Su altísimo punto de humo resiste múltiples frituras sin degradarse, impregnando a la patata aromas a hierba fresca y tomatera sin enmascarar el huevo.',
      en: 'Early green harvest extra virgin olive oil. Its high smoke point endures confiting and frying without thermal breakdown, transferring fresh grassy notes to the potato.',
      de: 'Früh geerntetes natives Olivenöl extra. Hoher Rauchpunkt sorgt für optimale Frittierbeständigkeit und aromatische Frische.',
    },
    whyEssential: {
      es: 'La patata absorbe entre un 8% y un 12% del aceite en cocción. Usar un aceite de baja calidad arruina el 100% del plato.',
      en: 'Potatoes absorb 8% to 12% of the oil during cooking. Poor oil ruins 100% of the flavor profile.',
      de: 'Kartoffeln nehmen 8-12 % des Öls auf. Hochwertiges Öl entscheidet über den gesamten Geschmack.',
    },
    priceRange: '48€ - 62€',
    priceValue: 52.00,
    currency: 'EUR',
    badge: {
      es: 'Oro Líquido D.O.',
      en: 'D.O. Liquid Gold',
      de: 'D.O. Flüssiges Gold',
    },
    rating: 4.9,
    reviewCount: 2300,
    inStock: true,
    affiliateUrl: 'https://amazon.es/dp/B08XYZ1234?tag=tortilladepatatas-21',
    brand: 'Aceites Sierra de Cazorla',
    specs: {
      es: ['100% Variedad Picual', 'Acidez < 0.2%', 'Extracción en frío < 21°C', 'Lata protectora contra rayos UV'],
      en: ['100% Picual variety', 'Acidity < 0.2%', 'Cold-extracted under 21°C', 'UV-blocking protective tin'],
      de: ['100 % Picual-Sorte', 'Säuregehalt < 0,2 %', 'Kaltpressung unter 21°C', 'Lichtgeschützter 5L-Kanister'],
    },
    image: '/images/ingredients/aceite.svg',
  },
  {
    id: 'masterclass-ebook-definitive',
    category: 'books',
    name: {
      es: 'El Gran Libro de la Tortilla de Patatas + Masterclass Digital (E-Book & Video Bundle)',
      en: 'The Definitive Spanish Omelette Guide + Digital Masterclass (E-Book & Video Bundle)',
      de: 'Das Große Spanische Tortilla-Buch + Digitale Meisterklasse (E-Book & Video-Paket)',
    },
    tagline: {
      es: '180 páginas de ciencia culinaria, 25 recetas secretas de tabernas históricas y acceso vitalicio',
      en: '180 pages of culinary physics, 25 secret tavern recipes & lifetime masterclass access',
      de: '180 Seiten kulinarische Wissenschaft, 25 geheime Traditionsrezepte & lebenslanger Zugriff',
    },
    description: {
      es: 'La biblia definitiva creada por gastrónomos, científicos del CSIC y cocineros con estrella. Incluye tablas de proporciones plastificables para cocina, curvas termodinámicas de cuajado, el algoritmo de la cebolla caramelizada y 12 vídeos paso a paso en 4K.',
      en: 'The definitive culinary bible crafted with food scientists and master chefs. Features printable kitchen ratio cheat sheets, thermodynamic coagulation curves, onion caramelization chemistry, and 12 step-by-step 4K video lessons.',
      de: 'Das definitive Standardwerk mit Lebensmittelwissenschaftlern und Spitzenköchen. Inklusive druckbarer Küchen-Tabellen, thermischer Gerinnungskurven und 12 Video-Lektionen in 4K.',
    },
    whyEssential: {
      es: 'Todo el conocimiento del portal sintetizado en una guía práctica sin conexión, con descargables listos para imprimir y colgar en tu cocina.',
      en: 'All encyclopedic knowledge condensed into an offline master toolkit with printable kitchen references.',
      de: 'Das gesamte enzyklopädische Wissen als praktischer Offline-Leitfaden mit Küchen-Tabellen.',
    },
    priceRange: '19.90€',
    priceValue: 19.90,
    currency: 'EUR',
    badge: {
      es: 'Best-Seller Digital',
      en: 'Bestseller Bundle',
      de: 'Bestseller-Paket',
    },
    rating: 5.0,
    reviewCount: 890,
    inStock: true,
    affiliateUrl: '#buy-masterclass-bundle',
    brand: 'tortilladepatatas.org Editorial',
    specs: {
      es: ['Descarga instantánea PDF / ePub', '12 Vídeos Masterclass en 4K', 'Póster de Ratios de Alta Resolución', 'Garantía de satisfacción de 30 días'],
      en: ['Instant PDF / ePub download', '12 4K Masterclass videos', 'High-res printable ratio poster', '30-day money-back guarantee'],
      de: ['Sofortiger PDF/ePub-Download', '12 4K Meisterklassen-Videos', 'Druckbares Verhältnis-Poster', '30 Tage Geld-zurück-Garantie'],
    },
    image: '/images/ingredients/pimiento.svg',
    highlighted: true,
  },
  {
    id: 'pro-horeca-escandallo-pack',
    category: 'books',
    name: {
      es: 'Kit Profesional HORECA: Excel de Escandallos, Costes & Certificación de Seguridad',
      en: 'HORECA Pro Suite: Recipe Costing Excel, Margin Optimization & Safety Audit Kit',
      de: 'HORECA Gastro-Paket: Deckungsbeitrag-Excel, Margen-Optimierung & Hygiene-Zertifikat',
    },
    tagline: {
      es: 'Herramientas financieras y operativas para bares, cafeterías y catering que quieren maximizar márgenes',
      en: 'Financial & operational spreadsheets for bars, cafes, and caterers seeking higher profit margins',
      de: 'Finanz- und Kalkulationstabellen für Gastronomiebetriebe zur Margen-Optimierung',
    },
    description: {
      es: 'Plantillas Excel/Google Sheets automatizadas para calcular el coste exacto por pincho según fluctuación del huevo y patata, punto de equilibrio por turno, manual de buenas prácticas sanitarias APPCC y sello adhesivo de calidad.',
      en: 'Automated Excel & Google Sheets templates to calculate exact cost per slice based on egg/potato market prices, break-even analysis per shift, HACCP hygiene guide, and physical window sticker.',
      de: 'Automatisierte Excel- und Google Sheets-Vorlagen für exakte Stückkostenkalkulation, HACCP-Hygienekonzept und Gastronomie-Qualitätssiegel.',
    },
    whyEssential: {
      es: 'Aumenta el margen bruto de tu barra entre un 15% y un 25% controlando mermas de aceite y calibrando el gramaje del pincho.',
      en: 'Boost bar gross margin by 15% to 25% through oil waste reduction and calibrated portion control.',
      de: 'Steigert den Deckungsbeitrag um 15-25 % durch präzise Portions- und Wareneinsatzkontrolle.',
    },
    priceRange: '49.00€',
    priceValue: 49.00,
    currency: 'EUR',
    badge: {
      es: 'Exclusivo Hostelería',
      en: 'Hospitality License',
      de: 'Gastronomie-Lizenz',
    },
    rating: 4.9,
    reviewCount: 340,
    inStock: true,
    affiliateUrl: '#buy-pro-pack',
    brand: 'tortilladepatatas.org B2B',
    specs: {
      es: ['Hojas Excel / Sheets dinámicas', 'Calculadora de Food Cost % y Mermas', 'Protocolo APPCC para Sanidad', 'Sello Oficial Acreditado para local'],
      en: ['Dynamic Excel / Sheets templates', 'Food Cost % & Waste Calculator', 'HACCP Health Compliance manual', 'Official window decal & certificate'],
      de: ['Dynamische Excel-Tabellen', 'Wareneinsatz- & Verlustrechner', 'HACCP-Leitfaden für Behörden', 'Offizielles Zertifikat für Gasträume'],
    },
    image: '/images/ingredients/cebolla.svg',
    highlighted: true,
  },
  {
    id: 'merch-apron-master-chef',
    category: 'merch',
    name: {
      es: 'Delantal Oficial de Tortillólogo Maestro (Algodón Orgánico 300g)',
      en: 'Official Master Tortillologist Apron (300g Organic Cotton)',
      de: 'Offizielle Meister-Tortillologe Schürze (300g Bio-Baumwolle)',
    },
    tagline: {
      es: 'Bordado exclusivo con la tabla de proporciones áureas y bolsillo para termómetro',
      en: 'Embroidered with golden ratio formula and dedicated probe thermometer slot',
      de: 'Bestickt mit der Goldenen Formel und speziellem Einstich-Thermometerfach',
    },
    description: {
      es: 'Confeccionado en sarga de algodón 100% orgánico ultra-resistente a salpicaduras de aceite caliente. Incluye bolsillo frontal reforzado con costura para termómetro y abrebotellas.',
      en: 'Crafted from heavy-duty 100% organic cotton twill resistant to hot oil spatters. Features reinforced front pockets with dedicated slots for probe thermometer and bottle opener.',
      de: 'Aus strapazierfähiger 100 % Bio-Baumwolle, öl- und hitzebeständig. Mit praktischen Fächern für Thermometer und Küchenhelfer.',
    },
    whyEssential: {
      es: 'El uniforme oficial del auténtico apasionado de la tortilla española.',
      en: 'The definitive uniform for true Spanish omelette enthusiasts.',
      de: 'Die authentische Schürze für passionierte Liebhaber der spanischen Küche.',
    },
    priceRange: '29.90€',
    priceValue: 29.90,
    currency: 'EUR',
    badge: {
      es: 'Edición Limitada',
      en: 'Limited Edition',
      de: 'Limitierte Edition',
    },
    rating: 4.9,
    reviewCount: 420,
    inStock: true,
    affiliateUrl: '#buy-merch-apron',
    brand: 'tortilladepatatas.org Official',
    specs: {
      es: ['Algodón orgánico 300g/m²', 'Correas ajustables de cuero vegano', 'Tratamiento hidrófugo y antimanchas', 'Bordado artesanal en hilo dorado'],
      en: ['300g/m² heavy organic cotton', 'Adjustable vegan leather straps', 'Water & oil repellent finish', 'Artisanal gold thread embroidery'],
      de: ['300g/m² schwere Bio-Baumwolle', 'Verstellbare Riemen aus veganem Leder', 'Öl- und wasserabweisend', 'Hochwertige goldene Stickerei'],
    },
    image: '/images/ingredients/chorizo.svg',
  },
];
