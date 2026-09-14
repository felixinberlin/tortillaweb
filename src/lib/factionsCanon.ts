/**
 * Factions Canon (Source of Truth)
 * Centralized doctrines, tenets, and faction naming.
 * Backed by canonical XLIFF definitions in /src/i18n/xlf/factions_canon.{en,de}.xlf
 */

export interface FactionCanonEntry {
  id: string;
  name: { es: string; en: string; de: string };
  badge: { es: string; en: string; de: string };
  dogma: { es: string; en: string; de: string };
  description: { es: string; en: string; de: string };
}

export const FACTIONS_CANON: Record<string, FactionCanonEntry> = {
  puristas: {
    id: 'puristas',
    name: {
      es: 'Los Puristas (Sin Cebolla / Betanzos)',
      en: 'The Purists (No Onion / Betanzos)',
      de: 'Die Puristen (Ohne Zwiebel / Betanzos)',
    },
    badge: {
      es: 'Ortodoxos (Betanzos)',
      en: 'Orthodox (Betanzos)',
      de: 'Orthodox (Betanzos)',
    },
    dogma: {
      es: 'Patata, huevo fresco, aceite de oliva virgen extra y sal. Nada más.',
      en: 'Potato, fresh pasture-raised egg, extra virgin olive oil, and salt. Nothing else.',
      de: 'Kartoffel, frisches Freilandei, natives Olivenöl extra und Salz. Nichts weiter.',
    },
    description: {
      es: 'Defienden que cualquier hortaliza dulce enmascara el sabor limpio del huevo y la patata. Rinden culto al cuajado líquido y dorado de Betanzos.',
      en: 'They maintain that any sweet vegetable masks the clean purity of egg and potato. Devoted to the molten golden flow of Betanzos.',
      de: 'Sie argumentieren, dass jedes süßliche Gemüse den reinen Geschmack von Ei und Kartoffel verfälscht. Verehrung des flüssig-goldenen Kerns von Betanzos.',
    },
  },
  concebollistas: {
    id: 'concebollistas',
    name: {
      es: 'Los Concebollistas (Con Cebolla)',
      en: 'Onion Lovers (Concebollistas)',
      de: 'Die Zwiebel-Liebhaber (Concebollistas)',
    },
    badge: {
      es: 'Tradicionalistas Populares',
      en: 'Popular Traditionalists',
      de: 'Volkstraditionalisten',
    },
    dogma: {
      es: 'La cebolla pochada a fuego lento aporta jugosidad, melosidad y azúcares naturales.',
      en: 'Slow-poached onions yield unctuous juiciness and natural sweetness.',
      de: 'Langsam geschmorte Zwiebeln verleihen Saftigkeit, Schmelz und natürliche Süße.',
    },
    description: {
      es: 'Aporta dulzor, jugosidad y un toque caramelizado irresistible que cohesiona la textura.',
      en: 'Imparts sweetness, juiciness, and an irresistible caramelized note that unites the texture.',
      de: 'Schenkt Süße, Saftigkeit und eine unwiderstehlich karamellisierte Note, die die Textur verbindet.',
    },
  },
  pimientistas: {
    id: 'pimientistas',
    name: {
      es: 'Pimientistas (Con Pimiento)',
      en: 'Pepper Enthusiasts (Pimientistas)',
      de: 'Paprika-Liebhaber (Pimientistas)',
    },
    badge: {
      es: 'Carácter Mediterráneo',
      en: 'Mediterranean Character',
      de: 'Mediterraner Charakter',
    },
    dogma: {
      es: 'El pimiento verde o rojo confitado realza el carácter mediterráneo y ahumado.',
      en: 'Confit green or red peppers elevate Mediterranean warmth and depth.',
      de: 'Geschmorte grüne oder rote Paprika unterstreicht den mediterranen, rauchigen Charakter.',
    },
    description: {
      es: 'El pimiento verde o rojo caramelizado junto a la patata añade matices terrosos y un aroma vegetal inconfundible.',
      en: 'Caramelized green or red peppers alongside potatoes bring earthy nuance and vegetal warmth.',
      de: 'Karamellisierte Paprika bringt erdige Nuancen und ein unverkennbares Aroma.',
    },
  },
  ajistas: {
    id: 'ajistas',
    name: {
      es: 'Ajistas (Con Ajo)',
      en: 'Garlic Devotees (Ajistas)',
      de: 'Knoblauch-Anhänger (Ajistas)',
    },
    badge: {
      es: 'Solera Castellana',
      en: 'Castilian Rustic Heritage',
      de: 'Kastilische Tradition',
    },
    dogma: {
      es: 'Un diente de ajo aromatizando el aceite confiere personalidad y solera tradicional.',
      en: 'A clove of garlic infusing the olive oil imparts authentic rustic depth.',
      de: 'Eine Knoblauchzehe im Olivenöl verleiht unverwechselbare, traditionelle Tiefe.',
    },
    description: {
      es: 'El suave aroma de ajo dorado en el AOVE aporta un fondo reconfortante de mesón tradicional.',
      en: 'Gently golden garlic perfuming the EVOO delivers an authentic tavern aroma.',
      de: 'Sanft gebräunter Knoblauch im Olivenöl schenkt das typische Aroma traditioneller Gasthäuser.',
    },
  },
  'con-cosas': {
    id: 'con-cosas',
    name: {
      es: 'Con Cosas (Innovadores)',
      en: 'Experimentalists (Con Cosas)',
      de: 'Kreative & Avantgarde (Con Cosas)',
    },
    badge: {
      es: 'Vanguardia Libre',
      en: 'Freeform Avant-Garde',
      de: 'Freie Avantgarde',
    },
    dogma: {
      es: 'Chorizo, queso trufado, setas o espinacas: la tortilla es un lienzo para la vanguardia.',
      en: 'Chorizo, truffle cheese, mushrooms, or spinach: the omelette is an evolving canvas.',
      de: 'Chorizo, Trüffelkäse, Pilze oder Spinat: Die Tortilla ist eine lebendige Leinwand für Kreativität.',
    },
    description: {
      es: 'Ruptura respetuosa de la tradición: ingredientes de temporada que expanden las fronteras del sabor.',
      en: 'Respectful evolution of tradition: seasonal ingredients expanding gastronomic frontiers.',
      de: 'Respektvolle Weiterentwicklung der Tradition: saisonale Zutaten erweitern den Horizont.',
    },
  },
};

export const FACTION_UI_CANON = {
  bannerTitle: {
    es: 'Afinidad Tortillera',
    en: 'Tortilla Allegiance',
    de: 'Tortilla-Gesinnung',
  },
  bannerDesc: {
    es: 'Selecciona tu facción para adaptar recetas y proporciones a tu doctrina favorita.',
    en: 'Select your faction to personalize recipes and ratios to your preferred doctrine.',
    de: 'Wähle deine Fraktion, um Rezepte und Proportionen deiner Lieblingsdoktrin anzupassen.',
  },
  pledgeBtn: {
    es: 'Jurar Fidelidad',
    en: 'Pledge Allegiance',
    de: 'Gefolgschaft schwören',
  },
  changeBtn: {
    es: 'Cambiar de Facción',
    en: 'Change Faction',
    de: 'Fraktion wechseln',
  },
};
