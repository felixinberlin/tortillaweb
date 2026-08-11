import React from 'react';
import LocalizedLink from '@/components/navigation/LocalizedLink';
import RelatedKnowledgeSection, { type RelatedKnowledgeItem } from '@/components/ingredients/RelatedKnowledgeSection';
import { Sparkles, Flame, Droplet, ShieldAlert, Clock, Utensils, Award } from 'lucide-react';

import RecipeImage, { type IngredientSummary } from '@/components/recipes/RecipeImage';

export interface GarlicIngredientDetailProps {
  lang?: 'es' | 'en' | 'de' | string;
  relatedRecipes?: Array<{
    id: string;
    title: Record<string, string>;
    description: Record<string, string>;
    slug: Record<string, string>;
    image?: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    ingredients?: (string | IngredientSummary)[];
    taxonomyIds?: string[];
  }>;
  relatedKnowledge?: RelatedKnowledgeItem[];
}

export default function GarlicIngredientDetail({
  lang = 'es',
  relatedRecipes = [],
  relatedKnowledge = [],
}: GarlicIngredientDetailProps) {
  const currentLang = (lang === 'es' || lang === 'en' || lang === 'de') ? lang : 'es';

  const homeText = currentLang === 'es' ? 'Inicio' : currentLang === 'de' ? 'Startseite' : 'Home';
  const ingredientsText = currentLang === 'es' ? 'Ingredientes' : currentLang === 'de' ? 'Zutaten' : 'Ingredients';
  const garlicText = currentLang === 'es' ? 'Ajo (Allium sativum)' : currentLang === 'de' ? 'Knoblauch (Allium sativum)' : 'Garlic (Allium sativum)';

  return (
    <article className="max-w-5xl mx-auto space-y-12 py-6 px-4 sm:px-6">
      {/* 1. BREADCRUMBS & HERO CARD */}
      <header className="space-y-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8D6E63] font-sans font-medium">
          <LocalizedLink to={`/${currentLang}`} className="hover:underline">
            {homeText}
          </LocalizedLink>
          <span>/</span>
          <LocalizedLink to={`/${currentLang}/ingredientes`} className="hover:underline">
            {ingredientsText}
          </LocalizedLink>
          <span>/</span>
          <span className="font-bold text-[#292521]">{garlicText}</span>
        </nav>

        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8DFD1] shadow-sm bg-[#FFF7EA]">
          <div className="relative h-44 sm:h-64 md:h-80 lg:h-[320px] max-h-[40vh] w-full overflow-hidden bg-[#8D6E63]/20">
            <img
              src="/images/ingredients/garlic.jpg"
              alt={garlicText}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback image if local path is missing
                e.currentTarget.src = "/images/recipes/clasica.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB800] text-[#292521] text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#292521]" />
                  <span>
                    {currentLang === 'es' ? '🧄 Aromatización Aromática & Matriz Umami' : currentLang === 'de' ? '🧄 Aromatisierung & Umami-Kultur' : '🧄 Aromatic Infusion & Umami Matrix'}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-white drop-shadow-md tracking-tight leading-none">
                  {currentLang === 'es' ? 'El Ajo en la Tortilla: Perfume vs. Sustancia' : currentLang === 'de' ? 'Knoblauch in der Tortilla: Aroma vs. Substanz' : 'Garlic in the Tortilla: Infusion vs. Substance'}
                </h1>
              </div>
            </div>
          </div>

          {/* Quick Technical Stats */}
          <div className="bg-[#FFF7EA] border-t border-[#E8DFD1] p-4 sm:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs sm:text-sm text-[#292521]">
              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-[#D89B32]" />
                  <span>{currentLang === 'es' ? 'Temp. Infusión' : currentLang === 'de' ? 'Infusionstemp.' : 'Infusion Temp'}</span>
                </div>
                <span className="font-extrabold text-[#292521] mt-1 text-sm sm:text-base">120°C – 130°C</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <Droplet className="w-3.5 h-3.5 text-[#00A3FF]" />
                  <span>{currentLang === 'es' ? 'Solubilidad Alicina' : currentLang === 'de' ? 'Löslichkeit Allicin' : 'Allicin Solubilization'}</span>
                </div>
                <span className="font-extrabold text-[#292521] mt-1 text-sm sm:text-base">Lipofílica (Aceite)</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <Utensils className="w-3.5 h-3.5 text-[#8D6E63]" />
                  <span>{currentLang === 'es' ? 'Facción Culinary' : currentLang === 'de' ? 'Kulinarische Fraktion' : 'Culinary Faction'}</span>
                </div>
                <span className="font-extrabold text-[#8D6E63] dark:text-[#FFB800] mt-1 text-sm sm:text-base">Ajistas vs Puristas</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#D32F2F]" />
                  <span>{currentLang === 'es' ? 'Pasteurización' : currentLang === 'de' ? 'Pasteurisierung' : 'Pasteurization'}</span>
                </div>
                <span className="font-extrabold text-[#D32F2F] mt-1 text-sm sm:text-base">
                  <strong>{currentLang === 'es' ? 'Núcleo Seguro' : currentLang === 'de' ? 'Sicherer Kern' : 'Safe Core'}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. THE DUAL CULINARY SCHOOLS (ANSWERING USER'S EXACT QUESTION) */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DFD1] pb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#8D6E63] text-xs font-bold mb-2">
            <Award className="w-4 h-4 text-[#FFB800]" />
            <span>
              {currentLang === 'es' ? 'El Gran Dilema TÉCNICO del Ajo' : currentLang === 'de' ? 'Das große technische Knoblauch-Dilemma' : 'The Great Technical Garlic Dilemma'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292521]">
            {currentLang === 'es'
              ? '¿Infusión Sutil del Aceite o Integración en la Mezcla de Huevo?'
              : currentLang === 'de'
              ? 'Subtile Öl-Aromatisierung oder Direkte Einbindung in die Eimasse?'
              : 'Subtle Oil Infusion vs Direct Integration in the Egg Mix?'}
          </h2>
          <p className="text-sm text-[#8D6E63] font-sans mt-1">
            {currentLang === 'es'
              ? 'Análisis profundo de quién utiliza el ajo solo como perfume aromático y quién lo incorpora en la masa final.'
              : currentLang === 'de'
              ? 'Tiefe Analyse: Wer nutzt Knoblauch nur als Aromageber und wer lässt ihn direkt in der Masse?'
              : 'In-depth breakdown of who uses garlic strictly for oil perfuming versus direct inclusion.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* METHOD 1: OIL INFUSION */}
          <div className="bg-white border-2 border-[#FFB800] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#FFB800] text-[#1C1917] text-[11px] font-extrabold px-3 py-1 rounded-bl-xl font-mono uppercase">
              Escuela 1: Aromatizante
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#FFB800]/20 text-[#8D6E63]">
                  <Droplet className="w-6 h-6 text-[#FFB800]" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#292521]">
                    {currentLang === 'es' ? 'La Infusión del Aceite (Diente Golpeado)' : currentLang === 'de' ? 'Die Öl-Infusion (Angedrückte Zehe)' : 'Oil Infusion (Crushed Clove)'}
                  </h3>
                  <span className="text-xs font-bold text-[#8D6E63]">
                    {currentLang === 'es' ? 'Perfume de fondo sin textura residual' : currentLang === 'de' ? 'Subtiles Hintergrundaroma ohne Stücke' : 'Background perfume without residual pieces'}
                  </span>
                </div>
              </div>

              <div className="text-sm text-[#292521]/90 font-sans leading-relaxed space-y-2">
                <p>
                  <strong>¿Quién lo usa?</strong> Las tabernas tradicionales de Madrid, los puristas moderados y mesones que buscan un fondo aromático sin alterar el color ni la fluidez de la yema.
                </p>
                <p>
                  <strong>Cómo funciona la técnica:</strong> Se toma un diente de ajo de Las Pedroñeras (con o sin piel), se le da un leve golpe para fisurar las células y liberar alicina. Se añade al aceite de oliva virgen extra frío que se va calentando. Cuando se dora levemente (120-130°C), <strong>se retira y se desecha</strong> antes de echar las patatas.
                </p>
                <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#E8DFD1] text-xs text-[#8D6E63] font-mono">
                  ✨ <strong>Resultado:</strong> El aceite absorbe los aceites esenciales liposolubles. La patata se confita en aceite aromatizado, dejando la tortilla 100% limpia sin tropiezos.
                </div>
              </div>
            </div>
          </div>

          {/* METHOD 2: DIRECT MIX IN EGG & POTATO */}
          <div className="bg-white border-2 border-[#8D6E63] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#8D6E63] text-white text-[11px] font-extrabold px-3 py-1 rounded-bl-xl font-mono uppercase">
              Escuela 2: Mezcla Directa
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#8D6E63]/20 text-[#8D6E63]">
                  <Utensils className="w-6 h-6 text-[#8D6E63]" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#292521]">
                    {currentLang === 'es' ? 'Incorporación a la Mezcla (Ajo Picado / Ajetes)' : currentLang === 'de' ? 'Direkte Mischung (Gehackter Knoblauch / Ajetes)' : 'Direct Mix (Minced Garlic / Green Garlic)'}
                  </h3>
                  <span className="text-xs font-bold text-[#8D6E63]">
                    {currentLang === 'es' ? 'Potencia umami y tropiezo aromático' : currentLang === 'de' ? 'Kräftiges Umami und bissfestes Aroma' : 'Robust umami bite & texture'}
                  </span>
                </div>
              </div>

              <div className="text-sm text-[#292521]/90 font-sans leading-relaxed space-y-2">
                <p>
                  <strong>¿Quién lo usa?</strong> La Escuela Ajista, recetas de montaña (Tortilla de Setas y Ajetes, Tortilla Paisana, versiones del Norte con Pimientos).
                </p>
                <p>
                  <strong>Cómo funciona la técnica:</strong> El ajo picado finamente (o los ajetes tiernos laminados) se rehogan junto a las patatas o cebolla. Al terminar la cocción, <strong>permanecen dentro</strong> y se vierten calientes en el baño de huevos batidos.
                </p>
                <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#E8DFD1] text-xs text-[#8D6E63] font-mono">
                  🔥 <strong>Resultado:</strong> Cada bocado ofrece ligeros tropiezos que liberan notas picantes dulce-sulfuradas al morder, intensificando la complejidad organoléptica de la patata.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SAFETY & THERMAL CONTROL CALLOUT */}
      <aside className="border-l-4 border-[#D32F2F] bg-[#D32F2F]/10 rounded-r-2xl p-6 sm:p-8 space-y-3 border-y border-r border-[#E8DFD1]">
        <div className="flex items-center gap-2 text-[#D32F2F] font-serif font-bold text-lg sm:text-xl">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{currentLang === 'es' ? '🛡️ Seguridad Térmica e Higiene Culinaria' : currentLang === 'de' ? '🛡️ Thermische Sicherheit & Lebensmittelecht' : '🛡️ Thermal Safety & Hygienic Standards'}</span>
        </div>
        <p className="text-sm sm:text-base text-[#292521] leading-relaxed font-sans">
          Independientemente de la técnica de ajo aplicada, si la tortilla es jugosa o cremosa, la pasteurización bactericida del huevo exige alcanzar <strong>70°C for 2 minutes</strong> (o pasteurización de huevo fresco a <strong>63°C for 20 seconds</strong>). La mezcla no debe permanecer más de <strong>4 hours</strong> a temperatura ambiente.
        </p>
      </aside>

      {/* 3.5 INTERCONNECTED CULINARY ECOSYSTEM LINKS */}
      <section className="bg-[#FAF6EE] rounded-3xl border-2 border-[#FFB800] p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-4 flex-wrap gap-2">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8D6E63] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#FFB800]" />
              {currentLang === 'es' ? 'Ecosistema Culinario Interconectado' : currentLang === 'de' ? 'Vernetztes Kulinarisches Ökosystem' : 'Interconnected Culinary Ecosystem'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292521] mt-1">
              {currentLang === 'es' ? 'Conexiones Directas con el Universo de la Tortilla' : currentLang === 'de' ? 'Direkte Verbindungen im Tortilla-Universum' : 'Direct Links Across the Tortilla Universe'}
            </h2>
          </div>
          <LocalizedLink
            to={`/${currentLang}/builder`}
            className="px-4 py-2 rounded-xl bg-[#FFB800] text-[#1C1917] font-bold text-xs hover:bg-[#E0A200] transition-colors shadow-2xs"
          >
            {currentLang === 'es' ? '🛠️ Abrir Constructor' : currentLang === 'de' ? '🛠️ Baukasten öffnen' : '🛠️ Open Builder'}
          </LocalizedLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <LocalizedLink
            to={`/${currentLang}/ingredientes/potato`}
            className="p-4 rounded-2xl bg-white border border-[#E8DFD1] hover:border-[#FFB800] transition-all group shadow-2xs hover:scale-102 flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl mb-2 block">🥔</span>
              <h3 className="font-serif font-bold text-sm text-[#292521] group-hover:text-[#8D6E63]">
                {currentLang === 'es' ? 'La Patata (Monalisa/Kennebec)' : currentLang === 'de' ? 'Die Kartoffel' : 'The Potato'}
              </h3>
              <p className="text-xs text-[#8D6E63] mt-1">
                {currentLang === 'es' ? 'Gelatinización de almidón a 68°C.' : currentLang === 'de' ? 'Stärkegelatinierung bei 68°C.' : 'Starch gelatinization at 68°C.'}
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#FFB800] mt-3 block group-hover:underline">
              {currentLang === 'es' ? 'Ver Ficha →' : 'View Detail →'}
            </span>
          </LocalizedLink>

          <LocalizedLink
            to={`/${currentLang}/ingredientes/egg`}
            className="p-4 rounded-2xl bg-white border border-[#E8DFD1] hover:border-[#FFB800] transition-all group shadow-2xs hover:scale-102 flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl mb-2 block">🥚</span>
              <h3 className="font-serif font-bold text-sm text-[#292521] group-hover:text-[#8D6E63]">
                {currentLang === 'es' ? 'El Huevo (Camas de Coagulación)' : currentLang === 'de' ? 'Das Ei (Gerinnung)' : 'The Egg (Coagulation)'}
              </h3>
              <p className="text-xs text-[#8D6E63] mt-1">
                {currentLang === 'es' ? 'Desnaturalización proteica a 65°C.' : currentLang === 'de' ? 'Proteindenaturierung bei 65°C.' : 'Protein denaturation at 65°C.'}
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#FFB800] mt-3 block group-hover:underline">
              {currentLang === 'es' ? 'Ver Ficha →' : 'View Detail →'}
            </span>
          </LocalizedLink>

          <LocalizedLink
            to={`/${currentLang}/ingredientes/olive-oil`}
            className="p-4 rounded-2xl bg-white border border-[#E8DFD1] hover:border-[#FFB800] transition-all group shadow-2xs hover:scale-102 flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl mb-2 block">🫒</span>
              <h3 className="font-serif font-bold text-sm text-[#292521] group-hover:text-[#8D6E63]">
                {currentLang === 'es' ? 'AOVE Picual / Arbequina' : currentLang === 'de' ? 'Natives Olivenöl Extra' : 'Extra Virgin Olive Oil'}
              </h3>
              <p className="text-xs text-[#8D6E63] mt-1">
                {currentLang === 'es' ? 'Matriz lipídica e infusión a 80°C.' : currentLang === 'de' ? 'Lipidmatrix & Infusion bei 80°C.' : 'Lipid matrix & 80°C infusion.'}
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#FFB800] mt-3 block group-hover:underline">
              {currentLang === 'es' ? 'Ver Ficha →' : 'View Detail →'}
            </span>
          </LocalizedLink>

          <LocalizedLink
            to={`/${currentLang}/facciones`}
            className="p-4 rounded-2xl bg-white border border-[#E8DFD1] hover:border-[#FFB800] transition-all group shadow-2xs hover:scale-102 flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl mb-2 block">⚔️</span>
              <h3 className="font-serif font-bold text-sm text-[#292521] group-hover:text-[#8D6E63]">
                {currentLang === 'es' ? 'Facciones & Debates' : currentLang === 'de' ? 'Fraktionen & Debatten' : 'Factions & Debates'}
              </h3>
              <p className="text-xs text-[#8D6E63] mt-1">
                {currentLang === 'es' ? 'Ajo purista, cebolla o sólo patata.' : currentLang === 'de' ? 'Knoblauch, Zwiebel oder nur Kartoffel.' : 'Garlic purists, onion, or potato only.'}
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#FFB800] mt-3 block group-hover:underline">
              {currentLang === 'es' ? 'Explorar Facciones →' : 'Explore Factions →'}
            </span>
          </LocalizedLink>
        </div>
      </section>

      {/* 4. LINKED RECIPES WITH GARLIC ROLES */}
      <section className="space-y-6 pt-4">
        <div className="border-b border-[#E8DFD1] pb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292521]">
            {currentLang === 'es' ? 'Recetas Emblemáticas con Ajo' : currentLang === 'de' ? 'Emblematische Rezepte mit Knoblauch' : 'Emblematic Recipes Featuring Garlic'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedRecipes.map((r) => {
            const recipeTitle = r.title[currentLang] || r.title.es || r.id;
            const recipeDesc = r.description[currentLang] || r.description.es || '';
            const recipeSlug = r.slug[currentLang] || r.slug.es || r.id;

            return (
              <article
                key={r.id}
                className="bg-white rounded-2xl border border-[#E8DFD1] overflow-hidden hover:border-[#FFB800] transition-all duration-200 flex flex-col justify-between shadow-xs group"
              >
                <div>
                  <div className="h-28 sm:h-44 md:h-48 w-full overflow-hidden bg-[#F5E6BE] relative border-b border-[#E8DFD1]">
                    <RecipeImage
                      src={r.image}
                      title={recipeTitle}
                      ingredients={r.ingredients}
                      taxonomyIds={r.taxonomyIds}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-30 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 text-white text-xs font-bold px-2.5 py-0.5 rounded-full font-sans">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{(r.prepTimeMinutes || 15) + (r.cookTimeMinutes || 20)} min</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-xl font-serif font-bold text-[#292521] group-hover:text-[#8D6E63] dark:group-hover:text-[#FFB800] transition-colors">
                      {recipeTitle}
                    </h3>
                    <p className="text-xs text-[#8D6E63] font-sans line-clamp-2 leading-relaxed">
                      {recipeDesc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <LocalizedLink
                    to={`/${currentLang}/recipes/${recipeSlug}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-[#F5E6BE] text-[#8D6E63] font-bold text-xs border border-amber-300 hover:bg-[#FFB800] hover:text-[#1C1917] transition-colors font-sans"
                  >
                    {currentLang === 'es' ? 'Ver Receta' : currentLang === 'de' ? 'Rezept ansehen' : 'View Recipe'}
                  </LocalizedLink>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* RELATED KNOWLEDGE SECTION */}
      <RelatedKnowledgeSection lang={currentLang} items={relatedKnowledge} />
    </article>
  );
}
