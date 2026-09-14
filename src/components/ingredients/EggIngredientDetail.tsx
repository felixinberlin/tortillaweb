import React from 'react';
import { getTranslations } from '@/lib/i18n';
import LocalizedLink from '@/components/navigation/LocalizedLink';
import RelatedKnowledgeSection, { type RelatedKnowledgeItem } from '@/components/ingredients/RelatedKnowledgeSection';
import { Thermometer, ShieldAlert, Droplet, Flame, Clock } from 'lucide-react';

import RecipeImage from '@/components/recipes/RecipeImage';

export interface EggIngredientDetailProps {
  lang?: 'es' | 'en' | 'de' | string;
  relatedRecipes?: Array<{
    id: string;
    title: Record<string, string>;
    description: Record<string, string>;
    slug: Record<string, string>;
    image?: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
  }>;
  relatedKnowledge?: RelatedKnowledgeItem[];
}

export default function EggIngredientDetail({
  lang = 'es',
  relatedRecipes = [],
  relatedKnowledge = [],
}: EggIngredientDetailProps) {
  const currentLang = (lang === 'es' || lang === 'en' || lang === 'de') ? lang : 'es';
  const t = getTranslations(currentLang);

  const homeText = t('eggDetail.breadcrumbs.home', 'Inicio');
  const ingredientsText = t('eggDetail.breadcrumbs.ingredients', 'Ingredientes');
  const eggText = t('eggDetail.breadcrumbs.egg', 'Huevo');

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
          <span className="font-bold text-[#292521]">{eggText}</span>
        </nav>

        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8DFD1] shadow-sm bg-[#FFF7EA]">
          <div className="relative h-32 sm:h-64 md:h-80 lg:h-[320px] max-h-[35vh] w-full overflow-hidden bg-[#F5E6BE]">
            <img
              src="/images/ingredients/egg_editorial_card.jpg"
              alt={t('eggDetail.heroTitle', 'El Huevo (Gallus gallus domesticus)')}
              width={1200}
              height={675}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB800] text-[#292521] text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  <span>{t('eggDetail.categoryBadge', '🥚 Matriz Proteica y Emulsionante')}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-white drop-shadow-md tracking-tight leading-none">
                  {t('eggDetail.heroTitle', 'El Huevo (Gallus gallus domesticus)')}
                </h1>
              </div>
            </div>
          </div>

          {/* Quick-Stats Technical Bar */}
          <div className="bg-[#FFF7EA] border-t border-[#E8DFD1] p-4 sm:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs sm:text-sm text-[#292521]">
              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <Thermometer className="w-3.5 h-3.5 text-[#D89B32]" />
                  <span>{t('eggDetail.quickStats.albumenCoagLabel', 'Coagulación Clara')}</span>
                </div>
                <span className="font-extrabold text-[#292521] mt-1 text-sm sm:text-base">
                  {t('eggDetail.quickStats.albumenCoagValue', '58 °C – 62 °C')}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-[#B65D3A]" />
                  <span>{t('eggDetail.quickStats.yolkCoagLabel', 'Coagulación Yema')}</span>
                </div>
                <span className="font-extrabold text-[#292521] mt-1 text-sm sm:text-base">
                  {t('eggDetail.quickStats.yolkCoagValue', '65 °C – 68 °C')}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <Droplet className="w-3.5 h-3.5 text-[#667A3D]" />
                  <span>{t('eggDetail.quickStats.emulsionLabel', 'Agente Emulsionante')}</span>
                </div>
                <span className="font-extrabold text-[#292521] mt-1 text-sm sm:text-base">
                  {t('eggDetail.quickStats.emulsionValue', 'Lecitina y Lipoproteínas')}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#D32F2F]" />
                  <span>{t('eggDetail.quickStats.safetyLabel', 'Umbral de Seguridad')}</span>
                </div>
                <span className="font-extrabold text-[#D32F2F] mt-1 text-sm sm:text-base">
                  {t('eggDetail.quickStats.safetyValue', currentLang === 'es' ? 'Tratamiento Seguro' : currentLang === 'de' ? 'Sicherheitsstandard' : 'Safe Pasteurization')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. RATIOS & SCHOOLS SECTION */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DFD1] pb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292521]">
            {t('eggDetail.ratios.title', 'Escuelas Gastronómicas y Proporciones')}
          </h2>
          <p className="text-sm text-[#8D6E63] font-sans mt-1">
            {t('eggDetail.ratios.subtitle', 'La relación huevo/patata según el estilo culinario y el nivel de jugosidad deseado')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-[#292521]">
                  {t('eggDetail.ratios.classic.name', 'Tortilla Clásica')}
                </h3>
                <span className="bg-[#D89B32] text-white px-3 py-1 rounded-full text-xs font-bold font-sans">
                  {t('eggDetail.ratios.classic.badge', 'Equilibrio')}
                </span>
              </div>
              <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
                {t('eggDetail.ratios.classic.desc', '1 huevo por cada 100 g de patata cruda. Estructura uniforme, jugosidad estable y corte perfecto.')}
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-[#292521]">
                  {t('eggDetail.ratios.betanzos.name', 'Estilo Betanzos')}
                </h3>
                <span className="bg-[#667A3D] text-white px-3 py-1 rounded-full text-xs font-bold font-sans">
                  {t('eggDetail.ratios.betanzos.badge', 'Predominio Yema')}
                </span>
              </div>
              <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
                {t('eggDetail.ratios.betanzos.desc', '12 huevos por 350 g de patata. Interior muy fluido con un culi de yema untuoso e intenso.')}
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-[#292521]">
                  {t('eggDetail.ratios.competition.name', 'Alta Competición')}
                </h3>
                <span className="bg-[#B65D3A] text-white px-3 py-1 rounded-full text-xs font-bold font-sans">
                  {t('eggDetail.ratios.competition.badge', 'Cremosidad Extrema')}
                </span>
              </div>
              <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
                {t('eggDetail.ratios.competition.desc', '12 huevos + yemas extra por 700 g de patata. Textura extremadamente cremosa con ligazones térmicas impecables.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNIQUES & PREPARATION SECTION */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DFD1] pb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292521]">
            {t('eggDetail.techniques.title', 'Técnica de Batido y Preparación')}
          </h2>
          <p className="text-sm text-[#8D6E63] font-sans mt-1">
            {t('eggDetail.techniques.subtitle', 'Factores mecánicos y térmicos que transforman la textura final')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFF7EA] border border-[#E8DFD1] rounded-2xl p-6 space-y-2">
            <h3 className="text-lg font-serif font-bold text-[#292521]">
              {t('eggDetail.techniques.beating.title', 'El Batido Suave (Sin Espuma)')}
            </h3>
            <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
              {t('eggDetail.techniques.beating.desc', 'Mezclar suavemente sin incorporar aire para evitar una textura esponjosa tipo soufflé o bizcocho.')}
            </p>
          </div>

          <div className="bg-[#FFF7EA] border border-[#E8DFD1] rounded-2xl p-6 space-y-2">
            <h3 className="text-lg font-serif font-bold text-[#292521]">
              {t('eggDetail.techniques.unbeaten.title', 'El Método Betanzos (Sin Batir)')}
            </h3>
            <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
              {t('eggDetail.techniques.unbeaten.desc', 'Cascar los huevos directamente sobre la patata caliente para iniciar la coagulación previa antes de la sartén.')}
            </p>
          </div>

          <div className="bg-[#FFF7EA] border border-[#E8DFD1] rounded-2xl p-6 space-y-2">
            <h3 className="text-lg font-serif font-bold text-[#292521]">
              {t('eggDetail.techniques.resting.title', 'La Regla del Reposo (3 a 5 min)')}
            </h3>
            <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
              {t('eggDetail.techniques.resting.desc', 'Reposar la mezcla patata-huevo a 60 °C – 70 °C para que el almidón absorba la yema y estabilice la emulsión.')}
            </p>
          </div>
        </div>
      </section>

      {/* 4. SAFETY & HYGIENE CALLOUT BOX */}
      <aside className="border-l-4 border-[#D32F2F] bg-[#D32F2F]/10 rounded-r-2xl p-6 sm:p-8 space-y-3 border-y border-r border-[#E8DFD1]">
        <div className="flex items-center gap-2 text-[#D32F2F] font-serif font-bold text-lg sm:text-xl">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{t('eggDetail.science.title', '🛡️ Seguridad Alimentaria y Control Térmico')}</span>
        </div>
        <p className="text-sm sm:text-base text-[#292521] leading-relaxed font-sans">
          Para tortillas poco cuajadas, el control térmico es esencial. Los estándares sanitarios fijan la reducción microbiológica segura de Salmonella en <strong>70°C for 2 minutes</strong> (o pasteurización equivalente a <strong>63°C for 20 seconds</strong>), con un límite máximo de <strong>4 hours</strong> de exposición a temperatura ambiente.
        </p>
      </aside>

      {/* 5. LINKED RECIPES WITH SINGULAR EGG RELATIONSHIPS */}
      <section className="space-y-6 pt-4">
        <div className="border-b border-[#E8DFD1] pb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292521]">
            {currentLang === 'es'
              ? 'Recetas con Relación Singular con el Huevo'
              : currentLang === 'de'
              ? 'Rezepte mit Besonderem Eierbezug'
              : 'Recipes with Singular Egg Relationships'}
          </h2>
          <p className="text-sm text-[#8D6E63] font-sans mt-1">
            {currentLang === 'es'
              ? 'Dado que el huevo forma la matriz de casi toda tortilla tradicional, destacamos únicamente variantes con un rol técnico único o alternativas sin huevo.'
              : currentLang === 'de'
              ? 'Da Eier in fast allen traditionellen Tortillas enthalten sind, heben wir hier nur Varianten mit besonderem technischen Einsatz oder eifreie Alternativen hervor.'
              : 'Since egg forms the matrix of almost all traditional tortillas, we highlight only variations with unique technical egg management or eggless alternatives.'}
          </p>
        </div>

        {(() => {
          // Filter to singular egg relationships: vegana (eggless), betanzos (extra yolks), clasica (canonical matrix)
          const eggRecipes = relatedRecipes.filter(
            (r) => r.id === 'vegana' || r.id === 'betanzos' || r.id === 'clasica'
          );
          const recipesToDisplay = eggRecipes.length > 0 ? eggRecipes : relatedRecipes;

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipesToDisplay.map((r) => {
                const recipeTitle = r.title[currentLang] || r.title.es || r.id;
                const recipeDesc = r.description[currentLang] || r.description.es || '';
                const recipeSlug = r.slug[currentLang] || r.slug.es || r.id;

                const badgeLabel =
                  r.id === 'vegana'
                    ? currentLang === 'es'
                      ? 'Variante Sin Huevo (Sustitución Proteica)'
                      : currentLang === 'de'
                      ? 'Eifreie Variante (Kichererbsenmehl)'
                      : 'Eggless Variant (Protein Substitute)'
                    : r.id === 'betanzos'
                    ? currentLang === 'es'
                      ? 'Matriz Rica en Yemas Fluidas'
                      : currentLang === 'de'
                      ? 'Hoher Eigelbanteil (Flüssig)'
                      : 'High Yolk Ratio (Runny)'
                    : currentLang === 'es'
                    ? 'Proporción Huevo-Patata Canónica'
                    : currentLang === 'de'
                    ? 'Kanonisches Ei-Kartoffel-Verhältnis'
                    : 'Canonical Egg-to-Potato Ratio';

                return (
                  <article
                    key={r.id}
                    className="bg-white rounded-2xl border border-[#E8DFD1] overflow-hidden hover:border-[#D89B32] transition-all duration-200 flex flex-col justify-between shadow-xs group"
                  >
                    <div>
                      <div className="h-28 sm:h-44 md:h-48 w-full overflow-hidden bg-[#F5E6BE] relative border-b border-[#E8DFD1]">
                        <RecipeImage
                          src={r.image}
                          recipeId={r.id}
                          title={recipeTitle}
                          ingredients={r.ingredients}
                          taxonomyIds={r.taxonomyIds}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-30 pointer-events-none" />
                        <div className="absolute top-3 left-3 bg-[#FFB800] text-[#292521] text-[11px] font-extrabold px-2.5 py-1 rounded-full font-sans uppercase tracking-wider shadow-2xs">
                          {badgeLabel}
                        </div>
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 text-white text-xs font-bold px-2.5 py-0.5 rounded-full font-sans">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{(r.prepTimeMinutes || 15) + (r.cookTimeMinutes || 20)} min</span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h3 className="text-xl font-serif font-bold text-[#292521] group-hover:text-[#D89B32] transition-colors">
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
                        className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-[#F5E6BE] text-[#8D6E63] font-bold text-xs border border-amber-300 hover:bg-[#D89B32] hover:text-white transition-colors font-sans"
                      >
                        {t('eggDetail.recipes.viewRecipe', 'Ver Receta')}
                      </LocalizedLink>
                    </div>
                  </article>
                );
              })}
            </div>
          );
        })()}
      </section>

      {/* INTERCONNECTED CULINARY ECOSYSTEM LINKS */}
      <section className="bg-[#FAF6EE] rounded-3xl border-2 border-[#FFB800] p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-4 flex-wrap gap-2">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8D6E63] flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-[#FFB800]" />
              {currentLang === 'es' ? 'Ecosistema Culinario Interconectado' : currentLang === 'de' ? 'Vernetztes Kulinarisches Ökosystem' : 'Interconnected Culinary Ecosystem'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292521] mt-1">
              {currentLang === 'es' ? 'Navegación Cruzada de la Tortilla de Patatas' : currentLang === 'de' ? 'Querverbindungen im Tortilla-Universum' : 'Cross-Links Across the Omelette Universe'}
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
                {currentLang === 'es' ? 'La Patata (Estructura)' : currentLang === 'de' ? 'Die Kartoffel' : 'The Potato'}
              </h3>
              <p className="text-xs text-[#8D6E63] mt-1">
                {currentLang === 'es' ? 'Variedades de pochado y almidón.' : currentLang === 'de' ? 'Kartoffelsorten & Stärke.' : 'Poaching varieties & starch.'}
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
                {currentLang === 'es' ? 'Aceite de Oliva Virgen Extra' : currentLang === 'de' ? 'Olivenöl Extra' : 'Extra Virgin Olive Oil'}
              </h3>
              <p className="text-xs text-[#8D6E63] mt-1">
                {currentLang === 'es' ? 'Transferencia de calor y perfumado.' : currentLang === 'de' ? 'Wärmeübertragung & Aroma.' : 'Heat transfer & fragrance.'}
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#FFB800] mt-3 block group-hover:underline">
              {currentLang === 'es' ? 'Ver Ficha →' : 'View Detail →'}
            </span>
          </LocalizedLink>

          <LocalizedLink
            to={`/${currentLang}/ingredientes/garlic`}
            className="p-4 rounded-2xl bg-white border border-[#E8DFD1] hover:border-[#FFB800] transition-all group shadow-2xs hover:scale-102 flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl mb-2 block">🧄</span>
              <h3 className="font-serif font-bold text-sm text-[#292521] group-hover:text-[#8D6E63]">
                {currentLang === 'es' ? 'Ajo Confitado & Infusión' : currentLang === 'de' ? 'Knoblauch-Aroma' : 'Confit Garlic & Infusion'}
              </h3>
              <p className="text-xs text-[#8D6E63] mt-1">
                {currentLang === 'es' ? 'Técnica de infusión a 80°C.' : currentLang === 'de' ? 'Infusionstechnik bei 80°C.' : '80°C oil infusion technique.'}
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
                {currentLang === 'es' ? 'Facciones & Votaciones' : currentLang === 'de' ? 'Fraktionen & Umfragen' : 'Factions & Voting'}
              </h3>
              <p className="text-xs text-[#8D6E63] mt-1">
                {currentLang === 'es' ? 'Debates sobre cuajado y cebolla.' : currentLang === 'de' ? 'Debatte über Gerinnungsgrad.' : 'Debates on doneness & onion.'}
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#FFB800] mt-3 block group-hover:underline">
              {currentLang === 'es' ? 'Explorar Facciones →' : 'Explore Factions →'}
            </span>
          </LocalizedLink>
        </div>
      </section>

      {/* TECHNIQUES MANUAL QUICK LINK */}
      <div className="bg-[#FFF7EA] border border-[#E8DFD1] rounded-2xl p-6 sm:p-8 space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-[#FFB800] text-[#292521] text-xs font-bold rounded-full uppercase tracking-wider font-sans">
            {currentLang === 'es' ? 'Técnicas de Cuajado' : currentLang === 'de' ? 'Gerinnungstechniken' : 'Coagulation Techniques'}
          </span>
          <h3 className="text-xl font-serif font-bold text-[#292521]">
            {currentLang === 'es'
              ? 'Domina la Coagulación y la Emulsión Proteica'
              : currentLang === 'de'
              ? 'Meistern Sie Gerinnung und Protein-Emulsion'
              : 'Master Coagulation and Protein Emulsion'}
          </h3>
          <p className="text-sm text-[#8D6E63] font-sans leading-relaxed">
            {currentLang === 'es'
              ? 'Descubre en el Manual de Técnicas la ciencia del reposo mágico, el efecto emulsificante de la lecitina y el control exacto de la albúmina.'
              : currentLang === 'de'
              ? 'Entdecken Sie im Technik-Handbuch die Physik des Ruhens, die Emulgierung durch Eigelb-Lecithin und die Temperaturkontrolle.'
              : 'Discover in the Techniques Manual the science of resting, yolk emulsification, and exact thermal coagulation control.'}
          </p>
        </div>

        <LocalizedLink
          to={`/${currentLang}/tecnicas`}
          className="shrink-0 px-6 py-3.5 rounded-xl bg-[#D89B32] text-white font-bold text-sm hover:bg-[#B65D3A] transition-colors shadow-sm font-sans flex items-center gap-2"
        >
          <span>
            {currentLang === 'es'
              ? 'Manual de Técnicas'
              : currentLang === 'de'
              ? 'Technik-Handbuch'
              : 'Techniques Manual'}
          </span>
          <span aria-hidden="true">→</span>
        </LocalizedLink>
      </div>

      {/* RELATED KNOWLEDGE SECTION */}
      <RelatedKnowledgeSection lang={currentLang} items={relatedKnowledge} />
    </article>
  );
}
