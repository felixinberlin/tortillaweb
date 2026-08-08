import React, { useState } from 'react';
import LocalizedLink from '@/components/navigation/LocalizedLink';
import { getTaxonomyUrl } from '@/lib/taxonomy';
import { 
  Sparkles, 
  Flame, 
  Droplet, 
  Thermometer, 
  ChevronRight, 
  Utensils, 
  Scissors, 
  Zap, 
  FlaskConical, 
  Clock, 
  Sprout, 
  BookOpen
} from 'lucide-react';

export interface TechniquesPageProps {
  lang?: string;
  pageData?: any;
}

interface TechniqueData {
  id: string;
  number: number;
  icon: any;
  title: { es: string; en: string; de: string };
  badge: { es: string; en: string; de: string };
  taxonomySlug: { es: string; en: string; de: string };
  method: { es: string; en: string; de: string };
  science: { es: string; en: string; de: string };
  keyTemp?: string;
  relatedIngredient: {
    id: string;
    name: { es: string; en: string; de: string };
    slug: { es: string; en: string; de: string };
  };
  relatedRecipe?: {
    id: string;
    name: { es: string; en: string; de: string };
    slug: { es: string; en: string; de: string };
  };
}

const TECHNIQUES: TechniqueData[] = [
  {
    id: 'cutting',
    number: 1,
    icon: Scissors,
    title: {
      es: 'Corte y Chascado de la Patata (Cascar la patata)',
      en: 'Potato Cutting and Chiseling (Cascar la patata)',
      de: 'Kartoffelschneiden und Aufbrechen (Cascar la patata)',
    },
    badge: {
      es: 'Extracción de Almidón',
      en: 'Starch Extraction',
      de: 'Stärkefreisetzung',
    },
    taxonomySlug: {
      es: 'corte-chascado',
      en: 'potato-cutting',
      de: 'kartoffel-schneiden',
    },
    method: {
      es: 'La gran clave técnica reside en no realizar un corte limpio hasta el final. Se introduce la hoja del cuchillo en el cuerpo de la patata y, antes de separar el pedazo por completo, se realiza una palanca o giro seco hacia afuera para cascar o desgarrar el almidón con un chasquido audible.',
      en: 'The knife blade is inserted into the potato body and, before completing the cut, outward pressure is applied to break off the piece with a dry, audible cracking motion.',
      de: 'Die Messerklinge wird in die Kartoffel eingeführt und der Schnitt wird nicht vollständig ausgeführt. Stattdessen wird das Messer leicht als Hebel benutzt, sodass das Stück mit einem kleinen, trockenen Knackgeräusch abbricht.',
    },
    science: {
      es: 'Al chascar la patata en lugar de cortarla con filo liso, se fracturan irregularmente las paredes celulares de los tubérculos. Esto expone los gránulos de amilopectina (almidón) directamente al aceite caliente durante la fritura/confitado y, posteriormente, a la albúmina del huevo. Durante la cocción, el almidón liberado actúa como espesante natural y ligante biológico, uniendo la patata con el huevo para lograr una textura cremosa e integrada sin soltar agua.',
      en: 'Breaking the potato irregularly fractures its cell walls and exposes its amylopectin granules (starch) directly to the oil and egg. During cooking, this released starch acts as a natural thickener or "glue" that binds the mixture together, creating a denser, creamier texture.',
      de: 'Durch das unregelmäßige Brechen der Kartoffel werden ihre Zellwände aufgerissen und die Amylopektin-Granulate (Stärke) direkt dem Öl und dem Ei ausgesetzt. Während des Garvorgangs wirkt diese freigesetzte Stärke als natürliches Verdickungs- und Bindemittel. Sie verbindet Kartoffel und Ei miteinander und sorgt für eine dichtere, cremigere Textur.',
    },
    keyTemp: 'Gelatinización amilopectina',
    relatedIngredient: {
      id: 'potato',
      name: { es: 'Patata Monalisa / Kennebec', en: 'Monalisa / Kennebec Potato', de: 'Monalisa / Kennebec Kartoffel' },
      slug: { es: 'patata', en: 'potato', de: 'kartoffel' },
    },
    relatedRecipe: {
      id: 'clasica',
      name: { es: 'Tortilla Clásica Tradicional', en: 'Classic Traditional Omelette', de: 'Klassische Traditionelle Tortilla' },
      slug: { es: 'tortilla-clasica', en: 'classic-spanish-omelette', de: 'klassische-spanische-tortilla' },
    },
  },
  {
    id: 'slow-cooking',
    number: 2,
    icon: Flame,
    title: {
      es: 'Sanftes Confit-Garen (Pochado en Aceite)',
      en: 'Slow Confit Cooking (Poaching in Oil)',
      de: 'Sanftes Confit-Garen (Pochieren in Öl)',
    },
    badge: {
      es: 'Control Térmico (110°C - 130°C)',
      en: 'Thermal Control (110°C - 130°C)',
      de: 'Temperaturkontrolle (110°C - 130°C)',
    },
    taxonomySlug: {
      es: 'confitado',
      en: 'slow-poaching',
      de: 'langsam-pochieren',
    },
    method: {
      es: 'Los trozos de patata chasqueada se sumergen completamente en abundante Aceite de Oliva Virgen Extra (AOVE) calentado a temperatura baja-media. La temperatura debe mantenerse rigurosamente entre 110 °C y 130 °C durante unos 15 a 20 minutos hasta que la patata ceda sin resistencia al tacto.',
      en: 'The potato pieces are immersed in extra virgin olive oil over medium-low heat, maintaining a strictly controlled temperature between 110 °C and 130 °C.',
      de: 'Die Kartoffelstücke werden in nativem Olivenöl extra bei mittlerer bis niedriger Temperatur gegart. Die Temperatur wird kontrolliert zwischen 110 °C und 130 °C gehalten.',
    },
    science: {
      es: 'A diferencia de una fritura fuerte a 180 °C que dora y endurece la corteza exterior por Reacción de Maillard, el confitado suave disuelve gradualmente las pectinas hidrosolubles de las paredes celulares de la patata sin caramelizar sus azúcares reductores. El almidón de la patata se gelatiniza internamente entre los 60 °C y los 70 °C, transformando la estructura celular en una masa mantecosa, extremadamente tierna y suave que absorberá la matriz del huevo batido.',
      en: 'Unlike high-temperature frying, slow confit cooking gently breaks down the pectin in the potato cell walls without excessively browning or caramelizing its sugars. The starch gelatinizes internally (between 60 °C and 70 °C), leaving the potato buttery, tender, and soft throughout.',
      de: 'Im Gegensatz zu einer kräftigen Frittierung löst das langsame Confit-Garen das Pektin in den Zellwänden der Kartoffel sanft auf, ohne die Zucker der Kartoffel übermäßig zu bräunen oder zu karamellisieren. Die Stärke gelatinisiert im Inneren der Kartoffel (zwischen 60 °C und 70 °C), wodurch sie eine buttrige, zarte und fast schmelzende Konsistenz erhält.',
    },
    keyTemp: '110°C - 130°C (Aceite) / 60°C - 70°C (Interior)',
    relatedIngredient: {
      id: 'oil',
      name: { es: 'Aceite de Oliva Virgen Extra', en: 'Extra Virgin Olive Oil', de: 'Natives Olivenöl Extra' },
      slug: { es: 'aceite-de-oliva', en: 'olive-oil', de: 'olivenoel' },
    },
    relatedRecipe: {
      id: 'clasica',
      name: { es: 'Tortilla de Patatas Clásica', en: 'Classic Spanish Omelette', de: 'Klassische Spanische Tortilla' },
      slug: { es: 'tortilla-clasica', en: 'classic-spanish-omelette', de: 'klassische-spanische-tortilla' },
    },
  },
  {
    id: 'frying',
    number: 3,
    icon: Zap,
    title: {
      es: 'Fritura Rápida de Láminas Finas (El Secreto de Betanzos)',
      en: 'Rapid Thin-Slice Frying (The Betanzos Secret)',
      de: 'Schnelles Frittieren dünner Kartoffelscheiben (Betanzos-Geheimnis)',
    },
    badge: {
      es: 'Fritura Viva (180°C)',
      en: 'High-Heat Frying (180°C)',
      de: 'Heißes Frittieren (180°C)',
    },
    taxonomySlug: {
      es: 'fritura-crujiente',
      en: 'crispy-frying',
      de: 'knusprig-frittieren',
    },
    method: {
      es: 'La patata (idealmente variedad gallega Kennebec) se corta en láminas u hojuelas ultra finas de 1 a 2 mm de grosor. Se fríen en aceite virgen extra sumamente caliente a unos 180 °C durante un breve periodo hasta dorar ligeramente sus bordes.',
      en: 'The potato, ideally a variety such as Kennebec, is cut into ultra-thin slices or flakes (1–2 mm) and fried until lightly golden in very hot oil at around 180 °C.',
      de: 'Die Kartoffel – idealerweise eine Sorte wie Kennebec – wird in hauchdünne Scheiben oder Blättchen (1–2 mm) geschnitten und in sehr heißem Öl bei etwa 180 °C goldbraun frittiert.',
    },
    science: {
      es: 'Típica de los grandes templos gallego-betanceiros como Mesón O\'Pote, esta técnica deshidrata de inmediato la superficie exterior creando láminas crujientes y doradas con interior tierno. Cuando las patatas recién fritas y calientes se vierten directamente sobre los huevos (los cuales se cascan enteros sin batir vigorosamente), el contraste térmico y mecánico produce la inconfundible tortilla con láminas crujientes envueltas en un centro puramente fluido y amarillo huevo.',
      en: 'Typical of schools such as Mesón O\'Pote, this technique creates golden, crispy edges while maintaining a soft interior. When the freshly fried potatoes are added directly to the eggs, the result is the iconic contrast between crisp potato texture and the flowing center.',
      de: 'Diese Technik ist typisch für Schulen wie das Mesón O\'Pote. Die Kartoffel entwickelt goldbraune, knusprige Ränder, bleibt im Inneren jedoch weich. Werden die frisch frittierten Kartoffeln direkt mit den Eiern vermischt, entsteht der famosa Kontrast zwischen der knusprigen Kartoffel und dem fließenden Kern.',
    },
    keyTemp: '180°C (Fritura alta)',
    relatedIngredient: {
      id: 'potato',
      name: { es: 'Patata Kennebec Galega', en: 'Galician Kennebec Potato', de: 'Galicische Kennebec Kartoffel' },
      slug: { es: 'patata', en: 'potato', de: 'kartoffel' },
    },
    relatedRecipe: {
      id: 'betanzos',
      name: { es: 'Tortilla Estilo Betanzos', en: 'Betanzos Style Omelette', de: 'Tortilla nach Betanzos-Art' },
      slug: { es: 'tortilla-betanzos', en: 'betanzos-style-spanish-omelette', de: 'betanzos-tortilla' },
    },
  },
  {
    id: 'emulsion',
    number: 4,
    icon: Droplet,
    title: {
      es: 'Emulsión Caliente Durante el Reposo Mágico (3–5 Minutos)',
      en: 'Hot Emulsion During the Magical Rest (3–5 Minutes)',
      de: 'Heiße Emulsion während der magischen Ruhephase (3–5 Minuten)',
    },
    badge: {
      es: 'Reposo Emulsionante',
      en: 'Emulsifying Rest',
      de: 'Emulgierende Ruhephase',
    },
    taxonomySlug: {
      es: 'emulsion-caliente',
      en: 'warm-emulsion',
      de: 'warme-emulsion',
    },
    method: {
      es: 'Inmediatamente tras escurrir las patatas confitadas en caliente (entre 60 °C y 70 °C), se vierten sobre el bol con huevo batido a temperatura ambiente. La mezcla se remueve suavemente y se deja reposar de 3 a 5 minutos completos antes de verter en la sartén.',
      en: 'The freshly drained hot potatoes (around 60–70 °C) are added to room-temperature beaten eggs and the mixture is left to rest for 3–5 minutes before cooking.',
      de: 'Die frisch abgetropften heißen Kartoffeln (etwa 60–70 °C) werden mit den auf Raumtemperatur temperierten, geschlagenen Eiern vermischt. Anschließend ruht die Mischung 3–5 Minuten, bevor sie gebraten wird.',
    },
    science: {
      es: 'Este reposo es el secreto absoluto para evitar que la tortilla derrame agua o suero en el plato. La lecitina presente de forma natural en la yema del huevo actúa como un potente agente tensioactivo o emulsionante, enlazando químicamente las micro-gotas de aceite retenidas en la patata con la fase acuosa de la clara. Además, el calor residual de 60 °C precuaja las proteínas solubles y permite que el almidón de la patata espese la mezcla antes de tocar el fuego.',
      en: 'This is a key step in preventing the tortilla from releasing excess liquid when sliced. The lecithin in the egg yolk acts as a natural emulsifier, binding the retained oil from the potatoes with the water contained in the egg white. At the same time, the gentle heat allows the potato starch to slightly thicken the egg mixture before it reaches the pan.',
      de: 'Dieser Schritt ist entscheidend, damit die Tortilla beim Anschneiden kein überschüssiges Wasser verliert. Das Lecithin im Eigelb wirkt als natürlicher Emulgator und verbindet das in den Kartoffeln verbliebene Öl mit dem Wasseranteil des Eiweißes. Gleichzeitig sorgt die sanfte Wärme dafür, dass die Kartoffelstärke das Ei leicht eindickt.',
    },
    keyTemp: '60°C - 70°C (Mezclado inicial)',
    relatedIngredient: {
      id: 'egg',
      name: { es: 'Huevo Fresco de Granja (Cat. 0/1)', en: 'Fresh Farm Egg (Cat. 0/1)', de: 'Frische Eier (Kat. 0/1)' },
      slug: { es: 'huevo', en: 'egg', de: 'ei' },
    },
    relatedRecipe: {
      id: 'clasica',
      name: { es: 'Tortilla Clásica Jugosa', en: 'Juicy Classic Omelette', de: 'Saftige Klassische Tortilla' },
      slug: { es: 'tortilla-clasica', en: 'classic-spanish-omelette', de: 'klassische-spanische-tortilla' },
    },
  },
  {
    id: 'coagulation',
    number: 5,
    icon: Thermometer,
    title: {
      es: 'Coagulación Proteica Controlada (El Golpe de Sartén)',
      en: 'Controlled Protein Coagulation (The Pan Searing Step)',
      de: 'Kontrollierte Proteingerinnung (Der kurze Pfannenschlag)',
    },
    badge: {
      es: 'Seguridad Microbiológica & Cuajado',
      en: 'Microbiological Safety & Setting',
      de: 'Mikrobiologische Sicherheit & Stocken',
    },
    taxonomySlug: {
      es: 'coagulacion-proteica',
      en: 'protein-coagulation',
      de: 'protein-gerinnung',
    },
    method: {
      es: 'Se calienta una sartén antiadherente con unas gotas de aceite a fuego vivo. Se vierte la mezcla emulsada y se mueve en círculos rápidos durante unos segundos. Se da la vuelta con vueltaplatos con decisión y se sella la otra cara apenas unos segundos más para crear la fina cubierta o «camisita».',
      en: 'The tortilla is sealed over high heat for only a few seconds on each side, creating a thin outer layer (the "shirt" or camisita) while carefully controlling the internal temperature.',
      de: 'Die Tortilla wird bei hoher Hitze nur wenige Sekunden pro Seite angebraten. Dadurch entsteht eine dünne äußere Schicht (die sogenannte „Hemdchen“-Schicht), während die Temperatur im Inneren kontrolliert bleibt.',
    },
    science: {
      es: 'La clara de huevo (albúmina) coagula entre los 58 °C y los 62 °C creando la lámina exterior sólida. La yema de huevo coagula entre los 65 °C y los 68 °C; por debajo de 65 °C se mantiene deliciosamente untuosa y fluida. Según la normativa sanitaria española (RD 1021/2022), para garantizar la inactivación total de Salmonella sin perder la jugosidad, la mezcla debe alcanzar la pauta de pasteurización segura de **70°C for 2 minutes** o **63°C for 20 seconds** en el núcleo. El tiempo máximo a temperatura ambiente es de **4 hours**, o conservarse refrigerada a menos de **8°C**.',
      en: 'Egg white coagulates between 58 °C and 62 °C, creating the solid outer shell. Egg yolk coagulates between 65 °C and 68 °C (remaining fluid below 65 °C). Food safety regulations (RD 1021/2022) dictate reaching **70°C for 2 minutes** or **63°C for 20 seconds** to eliminate Salmonella risk. Never exceed **4 hours** at room temperature or store above **8°C**.',
      de: 'Eiweiß gerinnt zwischen 58 °C und 62 °C für die feste äußere Hülle. Eigelb gerinnt zwischen 65 °C und 68 °C (unter 65 °C bleibt es cremig). Zur Salmonellensicherheit schreiben Vorschriften (RD 1021/2022) vor, **70°C for 2 minutes** oder **63°C for 20 seconds** zu erreichen. Nicht länger als **4 hours** bei Raumtemperatur lagern oder unter **8°C** kühlen.',
    },
    keyTemp: '58°C-62°C (Clara) / 65°C-68°C (Yema) / 70°C for 2 minutes',
    relatedIngredient: {
      id: 'egg',
      name: { es: 'Huevo y Matriz Proteica', en: 'Egg Protein Matrix', de: 'Ei & Proteinmatrix' },
      slug: { es: 'huevo', en: 'egg', de: 'ei' },
    },
    relatedRecipe: {
      id: 'betanzos',
      name: { es: 'Tortilla Betanzos (Yema Fluida)', en: 'Betanzos (Runny Yolk)', de: 'Betanzos (Flüssiges Eigelb)' },
      slug: { es: 'tortilla-betanzos', en: 'betanzos-style-spanish-omelette', de: 'betanzos-tortilla' },
    },
  },
  {
    id: 'deconstruction',
    number: 6,
    icon: FlaskConical,
    title: {
      es: 'Deconstrucción y Vanguardia Culinaria',
      en: 'Deconstruction and Culinary Avant-Garde',
      de: 'Dekonstruktion und kulinarische Avantgarde',
    },
    badge: {
      es: 'Alta Cocina & Reconstrucción',
      en: 'Haute Cuisine & Reinterpretation',
      de: 'Haute Cuisine & Reinterpretation',
    },
    taxonomySlug: {
      es: 'deconstruccion',
      en: 'deconstruction',
      de: 'dekonstruktion',
    },
    method: {
      es: 'Aplicación de técnicas de la alta cocina moderna (sifón de espumas, baño María de precisión a baja temperatura, emulgente en copa) para servir los elementos de la tortilla española en texturas y temperaturas independientes pero armónicas.',
      en: 'Application of modern culinary techniques to reinvent textures, separate components, or simplify preparation times using siphons, precise water baths, or rapid rehydration.',
      de: 'Anwendung moderner Küchentechniken, um Texturen neu zu interpretieren, einzelne Bestandteile hervorzuheben oder Zubereitungszeiten zu verkürzen.',
    },
    science: {
      es: 'Inaugurada a finales de los años 90 en El Bulli por Ferran Adrià, la famosa Tortilla Deconstruida presenta los tres elementos tradicionales en copa de martini: puré/espuma ligera de patata elaborada con sifón y grasa de confitado en la parte superior, un sabayón cremoso de yemas al baño María a menos de 60 °C en el medio, y cebolla confitada al fondo. Asimismo, la variante exprés con patatas fritas de bolsa demuestra cómo el almidón frito rehidrata el huevo al instante.',
      en: 'Pioneered at El Bulli during the late 1990s, Ferran Adrià\'s deconstruction approach presented the tortilla through separated layers: slow-cooked onion, a yolk sabayon set using a bain-marie below 60 °C, and a light potato foam created with a siphon. Similarly, the instant tortilla with chips leverages rapid starch rehydration.',
      de: 'Die Ende der 1990er Jahre im El Bulli entwickelte Dekonstruktionsküche von Ferran Adrià präsentierte die Tortilla in getrennten Schichten: geschmorte Zwiebeln als Basis, ein Eigelb-Sabayon unter 60 °C und ein Kartoffelschaum aus dem Sahnesiphon. Die schnelle Chips-Tortilla nutzt die schnelle Rehydrierung frittierter Stärke.',
    },
    keyTemp: '< 60°C (Sabayón en baño María)',
    relatedIngredient: {
      id: 'potato',
      name: { es: 'Patata & Espuma de Sifón', en: 'Potato & Siphon Foam', de: 'Kartoffel & Siphonschaum' },
      slug: { es: 'patata', en: 'potato', de: 'kartoffel' },
    },
    relatedRecipe: {
      id: 'express',
      name: { es: 'Tortilla Exprés (Patatas de Bolsa)', en: 'Express Chip Omelette', de: 'Express-Tortilla mit Chips' },
      slug: { es: 'tortilla-express-patatas-chips', en: 'express-potato-chip-omelette', de: 'express-kartoffelchips-tortilla' },
    },
  },
];

export default function TechniquesPage({ lang = 'es' }: TechniquesPageProps) {
  const currentLang = (lang === 'es' || lang === 'en' || lang === 'de') ? lang : 'es';
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredTechniques = activeTab === 'all' 
    ? TECHNIQUES 
    : TECHNIQUES.filter(t => t.id === activeTab);

  return (
    <div className="container mx-auto px-4 py-8 md:py-14 max-w-5xl space-y-12 font-sans">
      {/* 1. HERO HEADER */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5E6BE] text-[#8D6E63] border border-amber-300 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
          <span>
            {currentLang === 'es' ? 'Manual Técnico de Ejecución' : currentLang === 'de' ? 'Ausführungshandbuch & Methoden' : 'Execution Manual & Methods'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#292521] tracking-tight">
          {currentLang === 'es'
            ? '🍳 Maestría en la Cocina: Técnicas Críticas y Pasos Decisivos'
            : currentLang === 'de'
            ? '🍳 Meisterschaft in der Küche: Kritische Techniken & Schritte'
            : '🍳 Culinary Mastery: Critical Techniques & Key Steps'}
        </h1>

        <p className="text-base sm:text-lg text-[#8D6E63] leading-relaxed">
          {currentLang === 'es'
            ? 'Desde el primer chasquido al cortar la patata hasta el movimiento decidido del volteo en la sartén, cada gesto técnico influye en la textura final, el cuajado y el carácter de la auténtica tortilla española.'
            : currentLang === 'de'
            ? 'Vom ersten Knacken beim Schneiden der Kartoffel bis zur entschlossenen Bewegung beim Wenden in der Pfanne – jeder Handgriff beeinflusst Textur und Charakter.'
            : 'From the first crack when cutting the potato to the decisive flip in the pan, every technique shapes the final texture, setting, and character of the authentic Spanish omelette.'}
        </p>
      </header>

      {/* 3. QUICK NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8DFD1]">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'all'
              ? 'bg-[#8D6E63] text-white shadow-xs'
              : 'bg-[#F5E6BE] text-[#8D6E63] hover:bg-amber-200'
          }`}
        >
          {currentLang === 'es' ? 'Las 6 Técnicas' : currentLang === 'de' ? 'Alle 6 Techniken' : 'All 6 Techniques'}
        </button>

        {TECHNIQUES.map((t) => {
          const IconComp = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-[#8D6E63] text-white shadow-xs'
                  : 'bg-white text-[#8D6E63] border border-[#E8DFD1] hover:bg-[#F5E6BE]'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{t.number}. {t.badge[currentLang as keyof typeof t.badge]}</span>
            </button>
          );
        })}
      </div>

      {/* 4. THE 6 DETAILED TECHNIQUE SECTIONS */}
      <div className="space-y-10">
        {filteredTechniques.map((item) => {
          const IconComponent = item.icon;
          const titleText = item.title[currentLang as keyof typeof item.title] || item.title.es;
          const badgeText = item.badge[currentLang as keyof typeof item.badge] || item.badge.es;
          const methodText = item.method[currentLang as keyof typeof item.method] || item.method.es;
          const scienceText = item.science[currentLang as keyof typeof item.science] || item.science.es;
          const slugText = item.taxonomySlug[currentLang as keyof typeof item.taxonomySlug] || item.taxonomySlug.es;

          const ingredientName = item.relatedIngredient.name[currentLang as keyof typeof item.relatedIngredient.name];
          const ingredientSlug = item.relatedIngredient.slug[currentLang as keyof typeof item.relatedIngredient.slug];

          const recipeName = item.relatedRecipe?.name[currentLang as keyof typeof item.relatedRecipe.name];
          const recipeSlug = item.relatedRecipe?.slug[currentLang as keyof typeof item.relatedRecipe.slug];

          return (
            <section
              key={item.id}
              id={item.id}
              className="bg-white rounded-3xl border border-[#E8DFD1] p-6 sm:p-8 md:p-10 shadow-sm space-y-6 transition-all hover:border-[#D89B32]"
            >
              {/* SECTION HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFD1] pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#F5E6BE] text-[#8D6E63] border border-amber-300 shadow-2xs">
                    <IconComponent className="w-6 h-6 text-[#8D6E63]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FFB800] bg-[#292521] px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {badgeText}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#292521]">
                      {titleText}
                    </h2>
                  </div>
                </div>

                <LocalizedLink
                  to={`/${currentLang}/tecnicas/${slugText}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F5E6BE] text-[#8D6E63] font-bold text-xs hover:bg-[#D89B32] hover:text-white transition-colors shrink-0"
                >
                  <span>{currentLang === 'es' ? 'Ver Monografía Ficha' : currentLang === 'de' ? 'Foliant ansehen' : 'View Detail Sheet'}</span>
                  <ChevronRight className="w-4 h-4" />
                </LocalizedLink>
              </div>

              {/* METHOD & SCIENCE DUAL CARDS */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* METHOD CARD */}
                <div className="bg-[#FCF9F2] rounded-2xl p-5 border border-[#E8DFD1] space-y-3">
                  <div className="flex items-center gap-2 text-[#8D6E63] font-serif font-bold text-base">
                    <Utensils className="w-4 h-4 text-[#D89B32]" />
                    <span>{currentLang === 'es' ? 'Así se realiza (Paso a Paso)' : currentLang === 'de' ? 'So wird es gemacht' : 'How it is done'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#292521] leading-relaxed font-sans">
                    {methodText}
                  </p>
                </div>

                {/* SCIENCE CARD */}
                <div className="bg-[#FFF7EA] rounded-2xl p-5 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2 text-[#8D6E63] font-serif font-bold text-base">
                    <FlaskConical className="w-4 h-4 text-[#2E7D32]" />
                    <span>{currentLang === 'es' ? 'La Ciencia Gastronómica' : currentLang === 'de' ? 'Die Küchenwissenschaft dahinter' : 'The Science Behind It'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#292521] leading-relaxed font-sans">
                    {scienceText}
                  </p>
                </div>
              </div>

              {/* KEY TEMPERATURE & BACKLINKS BAR */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#E8DFD1]/60 text-xs font-sans">
                {item.keyTemp && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5E6BE]/60 text-[#8D6E63] rounded-lg font-bold border border-amber-200">
                    <Clock className="w-3.5 h-3.5 text-[#D89B32]" />
                    <span>{currentLang === 'es' ? 'Parámetro Térmico:' : currentLang === 'de' ? 'Thermischer Parameter:' : 'Thermal Parameter:'} <strong>{item.keyTemp}</strong></span>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[#8D6E63] font-medium">{currentLang === 'es' ? 'Entidades vinculadas:' : currentLang === 'de' ? 'Verknüpfte Entitäten:' : 'Linked Entities:'}</span>
                  
                  {/* LINK TO INGREDIENT MONOGRAPH */}
                  <LocalizedLink
                    to={getTaxonomyUrl('ingredient', ingredientSlug, currentLang)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5E6BE] text-[#8D6E63] hover:bg-[#D89B32] hover:text-white transition-colors font-bold"
                  >
                    <Sprout className="w-3 h-3" />
                    <span>{ingredientName}</span>
                  </LocalizedLink>

                  {/* LINK TO RECIPE IF PRESENT */}
                  {recipeName && recipeSlug && (
                    <LocalizedLink
                      to={`/${currentLang}/recipes/${recipeSlug}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 hover:bg-[#D89B32] hover:text-white transition-colors font-bold border border-amber-300"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>{recipeName}</span>
                    </LocalizedLink>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 5. BACKLINKS FOOTER BANNER */}
      <footer className="bg-[#292521] text-white rounded-3xl p-8 space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-[#FFB800] text-[#292521] text-xs font-extrabold rounded-full uppercase tracking-wider">
            {currentLang === 'es' ? 'Ecosistema de Conocimiento' : currentLang === 'de' ? 'Wissensnetzwerk' : 'Knowledge Graph'}
          </span>
          <h3 className="text-xl font-serif font-bold text-white">
            {currentLang === 'es'
              ? 'Conecta la Técnica con los Ingredientes Sagrados'
              : currentLang === 'de'
              ? 'Verbinden Sie Technik mit den Heiligen Zutaten'
              : 'Connect Technique with Sacred Ingredients'}
          </h3>
          <p className="text-xs sm:text-sm text-[#F5E6BE] leading-relaxed font-sans">
            {currentLang === 'es'
              ? 'Explora las monografías detalladas de la Patata, el Huevo y el Aceite de Oliva para descubrir cómo interaccionan las variedades, el punto de coagulación y las D.O. de España.'
              : currentLang === 'de'
              ? 'Entdecken Sie die detaillierten Monographien von Kartoffel, Ei und Olivenöl.'
              : 'Explore the detailed monographs of Potato, Egg, and Extra Virgin Olive Oil to master culinary physics.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <LocalizedLink
            to={`/${currentLang}/ingredientes/patata`}
            className="px-4 py-2.5 rounded-xl bg-[#F5E6BE] text-[#8D6E63] font-bold text-xs hover:bg-[#FFB800] hover:text-[#292521] transition-colors"
          >
            {currentLang === 'es' ? 'Monografía Patata' : currentLang === 'de' ? 'Kartoffel' : 'Potato Monograph'}
          </LocalizedLink>
          <LocalizedLink
            to={`/${currentLang}/ingredientes/huevo`}
            className="px-4 py-2.5 rounded-xl bg-[#F5E6BE] text-[#8D6E63] font-bold text-xs hover:bg-[#FFB800] hover:text-[#292521] transition-colors"
          >
            {currentLang === 'es' ? 'Monografía Huevo' : currentLang === 'de' ? 'Ei' : 'Egg Monograph'}
          </LocalizedLink>
          <LocalizedLink
            to={`/${currentLang}/ingredientes/aceite-de-oliva`}
            className="px-4 py-2.5 rounded-xl bg-[#F5E6BE] text-[#8D6E63] font-bold text-xs hover:bg-[#FFB800] hover:text-[#292521] transition-colors"
          >
            {currentLang === 'es' ? 'Monografía Aceite' : currentLang === 'de' ? 'Olivenöl' : 'Olive Oil Monograph'}
          </LocalizedLink>
        </div>
      </footer>
    </div>
  );
}
