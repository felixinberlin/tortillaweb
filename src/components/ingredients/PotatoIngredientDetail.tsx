import React from 'react';
import { getTranslations } from '@/lib/i18n';
import LocalizedLink from '@/components/navigation/LocalizedLink';
import RelatedKnowledgeSection, { type RelatedKnowledgeItem } from '@/components/ingredients/RelatedKnowledgeSection';
import { Sparkles, Thermometer, Layers, Droplet, Flame } from 'lucide-react';

export interface PotatoIngredientDetailProps {
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

export default function PotatoIngredientDetail({
  lang = 'es',
  relatedRecipes: _relatedRecipes = [],
  relatedKnowledge = [],
}: PotatoIngredientDetailProps) {
  const currentLang = (lang === 'es' || lang === 'en' || lang === 'de') ? lang : 'es';
  const t = getTranslations(currentLang);

  const homeText = t('potatoDetail.breadcrumbs.home', 'Inicio');
  const ingredientsText = t('potatoDetail.breadcrumbs.ingredients', 'Ingredientes');
  const potatoText = t('potatoDetail.breadcrumbs.potato', 'Patata');

  return (
    <article className="max-w-5xl mx-auto space-y-12 py-6 px-4 sm:px-6">
      {/* 1. BREADCRUMBS & HEADER HERO */}
      <header className="space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8D6E63] font-sans font-medium">
          <LocalizedLink to={`/${currentLang}`} className="hover:underline">
            {homeText}
          </LocalizedLink>
          <span>/</span>
          <LocalizedLink to={`/${currentLang}/ingredientes`} className="hover:underline">
            {ingredientsText}
          </LocalizedLink>
          <span>/</span>
          <span className="font-bold text-[#292521]">{potatoText}</span>
        </nav>

        {/* Hero Card */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8DFD1] shadow-sm bg-[#FFF7EA]">
          <div className="relative h-64 sm:h-80 md:h-[360px] w-full overflow-hidden bg-[#F5E6BE]">
            <img
              src="/images/ingredients/potato_editorial_card.jpg"
              alt={t('potatoDetail.heroTitle', 'La Patata (Solanum tuberosum)')}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white space-y-3 max-w-3xl">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#667A3D] text-white text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  <span>{t('potatoDetail.categoryBadge', '🥔 Ingrediente Estructural Base')}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-white drop-shadow-md tracking-tight leading-none">
                  {t('potatoDetail.heroTitle', 'La Patata (Solanum tuberosum)')}
                </h1>
              </div>
            </div>
          </div>

          {/* Quick-Stats Technical Bar (Grid font-mono) */}
          <div className="bg-[#FFF7EA] border-t border-[#E8DFD1] p-4 sm:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs sm:text-sm text-[#292521]">
              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-[#D89B32]" />
                  <span>{t('potatoDetail.quickStats.idealStarchLabel', 'Almidón Ideal')}</span>
                </div>
                <span className="font-extrabold text-[#292521] mt-1 text-sm sm:text-base">
                  {t('potatoDetail.quickStats.idealStarchValue', '15% – 18% (Semifirme)')}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-[#B65D3A]" />
                  <span>{t('potatoDetail.quickStats.confitTempLabel', 'Temp. Confitado')}</span>
                </div>
                <span className="font-extrabold text-[#292521] mt-1 text-sm sm:text-base">
                  {t('potatoDetail.quickStats.confitTempValue', '110 °C – 130 °C')}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <Droplet className="w-3.5 h-3.5 text-[#667A3D]" />
                  <span>{t('potatoDetail.quickStats.oilAbsorptionLabel', 'Absorción de Aceite')}</span>
                </div>
                <span className="font-extrabold text-[#292521] mt-1 text-sm sm:text-base">
                  {t('potatoDetail.quickStats.oilAbsorptionValue', 'Baja-Moderada')}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <Thermometer className="w-3.5 h-3.5 text-[#D89B32]" />
                  <span>{t('potatoDetail.quickStats.gelatinizationLabel', 'Punto Gelatinización')}</span>
                </div>
                <span className="font-extrabold text-[#292521] mt-1 text-sm sm:text-base">
                  {t('potatoDetail.quickStats.gelatinizationValue', '60 °C – 70 °C')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CULTIVAR COMPARISON SECTION */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DFD1] pb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292521]">
            {t('potatoDetail.cultivars.title', 'Comparativa de Cultivares de Patata')}
          </h2>
          <p className="text-sm text-[#8D6E63] font-sans mt-1">
            {t('potatoDetail.cultivars.subtitle', 'Análisis de materia seca, humedad y aptitud culinaria por variedad agrícola')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monalisa */}
          <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-[#292521]">
                  {t('potatoDetail.cultivars.monalisa.name', 'Monalisa')}
                </h3>
                <span className="bg-[#D89B32] text-white px-3 py-1 rounded-full text-xs font-bold font-sans">
                  {t('potatoDetail.cultivars.monalisa.badge', 'Cremosidad')}
                </span>
              </div>
              <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
                {t('potatoDetail.cultivars.monalisa.desc', 'Equilibrio idóneo entre almidón y agua. Ofrece una textura suave, cremosa e integrada tras un pochado lento a temperatura moderada.')}
              </p>
            </div>
          </div>

          {/* Kennebec */}
          <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-[#292521]">
                  {t('potatoDetail.cultivars.kennebec.name', 'Kennebec')}
                </h3>
                <span className="bg-[#667A3D] text-white px-3 py-1 rounded-full text-xs font-bold font-sans">
                  {t('potatoDetail.cultivars.kennebec.badge', 'Estilo Betanzos')}
                </span>
              </div>
              <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
                {t('potatoDetail.cultivars.kennebec.desc', 'Bajo contenido en agua y almidón medio. Proporciona bordes crujientes exteriores conservando un interior fundente para tortillas de alto cuajado fluido.')}
              </p>
            </div>
          </div>

          {/* Agria */}
          <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-[#292521]">
                  {t('potatoDetail.cultivars.agria.name', 'Agria')}
                </h3>
                <span className="bg-[#B65D3A] text-white px-3 py-1 rounded-full text-xs font-bold font-sans">
                  {t('potatoDetail.cultivars.agria.badge', 'Baja Absorción')}
                </span>
              </div>
              <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
                {t('potatoDetail.cultivars.agria.desc', 'Elevada materia seca. Minimiza la absorción grasa durante el sofrito o la fritura intensa, garantizando una corteza dorada y crujiente.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CUTTING TECHNIQUES SECTION */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DFD1] pb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292521]">
            {t('potatoDetail.cuts.title', 'Geometría y Técnicas de Corte')}
          </h2>
          <p className="text-sm text-[#8D6E63] font-sans mt-1">
            {t('potatoDetail.cuts.subtitle', 'Impacto de la forma de corte en la superficie de contacto y la liberación de almidón')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFF7EA] border border-[#E8DFD1] rounded-2xl p-6 space-y-2">
            <h3 className="text-lg font-serif font-bold text-[#292521]">
              {t('potatoDetail.cuts.panadera.title', 'Corte Panadera (3–5 mm)')}
            </h3>
            <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
              {t('potatoDetail.cuts.panadera.desc', 'Láminas uniformes que garantizan una transmisión térmica homogénea. Ideales para pochado suave sin desintegración estructural.')}
            </p>
          </div>

          <div className="bg-[#FFF7EA] border border-[#E8DFD1] rounded-2xl p-6 space-y-2">
            <h3 className="text-lg font-serif font-bold text-[#292521]">
              {t('potatoDetail.cuts.chascado.title', 'Corte Chascado (Cascar)')}
            </h3>
            <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
              {t('potatoDetail.cuts.chascado.desc', 'Fracturar la patata al final del corte rompe las paredes celulares irregularmente, liberando almidón amilopectina para espesar el huevo.')}
            </p>
          </div>

          <div className="bg-[#FFF7EA] border border-[#E8DFD1] rounded-2xl p-6 space-y-2">
            <h3 className="text-lg font-serif font-bold text-[#292521]">
              {t('potatoDetail.cuts.ultrafinas.title', 'Láminas Ultrafinas')}
            </h3>
            <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
              {t('potatoDetail.cuts.ultrafinas.desc', 'Corte traslúcido para dorados relámpago a alta temperatura. Técnica clásica para tortillas de estilo Betanzos.')}
            </p>
          </div>
        </div>
      </section>

      {/* 4. SCIENTIFIC CALLOUT BOX */}
      <aside className="border-l-4 border-[#B65D3A] bg-[#B65D3A]/10 rounded-r-2xl p-6 sm:p-8 space-y-3 border-y border-r border-[#E8DFD1]">
        <div className="flex items-center gap-2 text-[#B65D3A] font-serif font-bold text-lg sm:text-xl">
          <Sparkles className="w-5 h-5 shrink-0" />
          <span>{t('potatoDetail.science.title', '🔬 La Regla del Reposo (3 a 5 minutos)')}</span>
        </div>
        <p className="text-sm sm:text-base text-[#292521] leading-relaxed font-sans">
          {t('potatoDetail.science.body', 'Al mezclar la patata recién escurrita a 60 °C – 70 °C con el huevo batido, el calor residual desnaturaliza suavemente la ovalbúmina mientras los gránulos de almidón absorben la lecitina y yema, formando una emulsión uniforme y cremosa antes de la sartén.')}
        </p>
      </aside>

      {/* 5. LINKED RECIPES HUBS & EXPLANATION */}
      <section className="space-y-6 pt-4">
        <div className="border-b border-[#E8DFD1] pb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292521]">
            {currentLang === 'es'
              ? 'La Patata en el Recetario Canónico'
              : currentLang === 'de'
              ? 'Die Kartoffel in den Kanonischen Rezepten'
              : 'Potato in Canonical Recipes'}
          </h2>
          <p className="text-sm text-[#8D6E63] font-sans mt-1">
            {currentLang === 'es'
              ? 'Todas las recetas tradicionales utilizan la patata como pilar estructural indispensable.'
              : currentLang === 'de'
              ? 'Alle traditionellen Rezepte verwenden Kartoffeln als unverzichtbare strukturelle Basis.'
              : 'All traditional recipes rely on potato as an indispensable structural pillar.'}
          </p>
        </div>

        <div className="bg-[#FFF7EA] border border-[#E8DFD1] rounded-2xl p-6 sm:p-8 space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-[#FFB800] text-[#292521] text-xs font-bold rounded-full uppercase tracking-wider font-sans">
              {currentLang === 'es' ? 'Pilar Fundamental' : currentLang === 'de' ? 'Fundament' : 'Core Pillar'}
            </span>
            <h3 className="text-xl font-serif font-bold text-[#292521]">
              {currentLang === 'es'
                ? 'El 100% de las recetas de tortilla canónica utilizan patata'
                : currentLang === 'de'
                ? '100% der kanonischen Tortilla-Rezepte enthalten Kartoffeln'
                : '100% of canonical omelette recipes use potato'}
            </h3>
            <p className="text-sm text-[#8D6E63] font-sans leading-relaxed">
              {currentLang === 'es'
                ? 'A diferencia de ingredientes secundarios u opcionales, la patata define la identidad de la tortilla española. Explora el catálogo completo para descubrir las técnicas de confitado, corte y proporción.'
                : currentLang === 'de'
                ? 'Im Gegensatz zu optionalen Zutaten bestimmt die Kartoffel die Identität der spanischen Tortilla. Entdecken Sie alle Rezepte, um Schnitt- und Confit-Techniken zu vergleichen.'
                : 'Unlike optional ingredients, potato defines the structural identity of the Spanish omelette. Explore the full catalog to discover different confit, cutting, and ratio techniques.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <LocalizedLink
              to={`/${currentLang}/tecnicas`}
              className="px-5 py-3.5 rounded-xl bg-[#F5E6BE] text-[#8D6E63] font-bold text-sm hover:bg-[#FFB800] hover:text-[#292521] transition-colors shadow-2xs font-sans flex items-center gap-2 border border-amber-300"
            >
              <span>
                {currentLang === 'es'
                  ? 'Manual de Técnicas'
                  : currentLang === 'de'
                  ? 'Technik-Handbuch'
                  : 'Techniques Manual'}
              </span>
            </LocalizedLink>

            <LocalizedLink
              to={`/${currentLang}/recipes`}
              className="px-6 py-3.5 rounded-xl bg-[#D89B32] text-white font-bold text-sm hover:bg-[#B65D3A] transition-colors shadow-sm font-sans flex items-center gap-2"
            >
              <span>
                {currentLang === 'es'
                  ? 'Explorar Todas las Recetas'
                  : currentLang === 'de'
                  ? 'Alle Rezepte entdecken'
                  : 'Explore All Recipes'}
              </span>
              <span aria-hidden="true">→</span>
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* 6. RELATED KNOWLEDGE BASE GRAPH SECTION */}
      <RelatedKnowledgeSection lang={currentLang} items={relatedKnowledge} />
    </article>
  );
}
