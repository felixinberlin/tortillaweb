export type DonenessLevel =
  | "liquid"      // Betanzos style (super runny yolk lava)
  | "runny"       // Very juicy, runny core
  | "melosa"      // Creamy custardy yolk, glistening
  | "jugosa"      // Juicy, soft center
  | "cuajada"     // Traditional set, golden crust
  | "firme"       // Firm, solid slice
  | "bocadillo";   // Compact, well-done for sandwiches

export type PotatoCut =
  | "panadera"    // Round sliced disks
  | "dados"       // Diced golden cubes
  | "chascada"    // Irregular cracked rustic chunks
  | "paja"        // Straw / shoestring crispy potatoes
  | "chips";      // Ridged crisp potato chips

export type PotatoCooking =
  | "pochada"     // Slow poached in oil, soft and translucent
  | "dorada"      // Golden fried with crispy edges
  | "crujiente"   // Extra crispy
  | "confit";     // Low-temp olive oil confited

export type IngredientExtraId =
  | "onion"
  | "garlic"
  | "ajetes"
  | "chorizo"
  | "jamon"
  | "tuna"
  | "atun"
  | "cod"
  | "bacalao"
  | "mushrooms"
  | "setas"
  | "truffle"
  | "cheese"
  | "quesoazul"
  | "sobrasada"
  | "peppers"
  | "pimenton"
  | "honey"
  | "miel"
  | "padron"
  | "spinach"
  | "morcilla"
  | "chips"
  | "peas"
  | "guisantes"
  | "parsley"
  | "perejil"
  | "chickpea";   // Vegan egg substitute

export type SvgPresentationView =
  | "skillet_top"       // Top-down rustic skillet view
  | "sliced_pincho"     // Sliced triangular wedge showing interior cross-section & lava yolk flow
  | "duo_pan_slice"     // Complete pan with adjacent sliced pincho
  | "skillet_isometric"; // Angled skillet

export type SvgTheme =
  | "kitchen_dark"    // Cast iron skillet on dark walnut cutting board
  | "warm_parchment"  // Warm editorial parchment background
  | "clean_minimal";  // Transparent / clean vector

export interface OnionConfig {
  present: boolean;
  style?: "none" | "caramelized" | "pochada" | "crispy";
  quantityG?: number;
  ratioPerEgg?: number;
}

export interface TortillaSvgOptions {
  title?: string;
  subtitle?: string;
  eggCount?: number;
  potatoWeightG?: number;
  potatoVariety?: string;
  potatoCut?: PotatoCut;
  potatoCooking?: PotatoCooking;
  doneness?: DonenessLevel;
  onion?: OnionConfig | boolean;
  extras?: (IngredientExtraId | string)[];
  presentation?: SvgPresentationView;
  theme?: SvgTheme;
  showBadge?: boolean;
  showSafetyBadge?: boolean; // Displays standard: 70°C 2 min / 63°C 20s
  showDnaMetrics?: boolean;  // Displays g/egg ratio
  animated?: boolean;        // Enables subtle, appetizing SVG animations (steam, yolk shimmer, oil glisten)
  animatedFlip?: boolean;    // Enables 3D pan flip rotation effect
  lang?: "es" | "en" | "de";
  width?: number;
  height?: number;
  className?: string;
  id?: string;
  omitXmlDeclaration?: boolean;
}
