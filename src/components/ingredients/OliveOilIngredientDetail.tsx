import React from 'react';
import { getTranslations } from '@/lib/i18n';
import LocalizedLink from '@/components/navigation/LocalizedLink';
import RelatedKnowledgeSection, { type RelatedKnowledgeItem } from '@/components/ingredients/RelatedKnowledgeSection';
import { Thermometer, Droplet, Flame, RefreshCw, Clock } from 'lucide-react';

export interface OliveOilIngredientDetailProps {
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

export default function OliveOilIngredientDetail({
  lang = 'es',
  relatedRecipes = [],
  relatedKnowledge = [],
}: OliveOilIngredientDetailProps) {
  const currentLang = (lang === 'es' || lang === 'en' || lang === 'de') ? lang : 'es';
  const t = getTranslations(currentLang);

  const homeText = t('oilDetail.breadcrumbs.home', 'Inicio');
  const ingredientsText = t('oilDetail.breadcrumbs.ingredients', 'Ingredientes');
  const oilText = t('oilDetail.breadcrumbs.oil', 'Aceite de Oliva');

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
          <span className="font-bold text-[#292521]">{oilText}</span>
        </nav>

        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8DFD1] shadow-sm bg-[#FFF7EA]">
          <div className="relative h-32 sm:h-64 md:h-80 lg:h-[320px] max-h-[35vh] w-full overflow-hidden bg-[#F5E6BE]">
            <img
              src="/images/ingredients/olive_oil_editorial_card.jpg"
              alt={t('oilDetail.heroTitle', 'Aceite de Oliva (Olea europaea)')}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB800] text-[#292521] text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  <span>{t('oilDetail.categoryBadge', '🫒 Medio Térmico y Eje Emulsionante')}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-white drop-shadow-md tracking-tight leading-none">
                  {t('oilDetail.heroTitle', 'Aceite de Oliva (Olea europaea)')}
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
                  <span>{t('oilDetail.quickStats.confitTempLabel', 'Temperatura Confitado')}</span>
                </div>
                <span className="font-extrabold text-[#292521] mt-1 text-sm sm:text-base">
                  {t('oilDetail.quickStats.confitTempValue', '110 °C – 130 °C')}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <Droplet className="w-3.5 h-3.5 text-[#667A3D]" />
                  <span>{t('oilDetail.quickStats.acidLabel', 'Ácido Oleico (AOVE)')}</span>
                </div>
                <span className="font-extrabold text-[#292521] mt-1 text-sm sm:text-base">
                  {t('oilDetail.quickStats.acidValue', '70% – 80%')}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-[#B65D3A]" />
                  <span>{t('oilDetail.quickStats.emulsionLabel', 'Eje Emulsionante')}</span>
                </div>
                <span className="font-extrabold text-[#292521] mt-1 text-sm sm:text-base">
                  {t('oilDetail.quickStats.emulsionValue', 'Lecitina + Almidón + Grasa')}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8DFD1] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[#8D6E63] text-[11px] font-sans font-bold uppercase tracking-wider">
                  <RefreshCw className="w-3.5 h-3.5 text-[#00A3FF]" />
                  <span>{t('oilDetail.quickStats.reuseLabel', 'Ciclos de Reutilización')}</span>
                </div>
                <span className="font-extrabold text-[#292521] mt-1 text-sm sm:text-base">
                  {t('oilDetail.quickStats.reuseValue', '3 a 4 veces (filtrado)')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. VARIETIES & CULTIVARS SECTION */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DFD1] pb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292521]">
            {t('oilDetail.varieties.title', 'Variedades de Aceituna y Perfil Aromático')}
          </h2>
          <p className="text-sm text-[#8D6E63] font-sans mt-1">
            {t('oilDetail.varieties.subtitle', 'Principales varietales de olivar español recomendados para el confitado de la patata')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-[#292521]">
                  {t('oilDetail.varieties.picual.name', 'Picual')}
                </h3>
                <span className="bg-[#667A3D] text-white px-3 py-1 rounded-full text-xs font-bold font-sans">
                  {t('oilDetail.varieties.picual.badge', 'Máxima Estabilidad')}
                </span>
              </div>
              <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
                {t('oilDetail.varieties.picual.desc', 'Tomate, hoja verde y suave picante. Riquísimo en polifenoles; ideal para confitados largos y gran estabilidad térmica.')}
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-[#292521]">
                  {t('oilDetail.varieties.arbequina.name', 'Arbequina')}
                </h3>
                <span className="bg-[#D89B32] text-white px-3 py-1 rounded-full text-xs font-bold font-sans">
                  {t('oilDetail.varieties.arbequina.badge', 'Dulce y Delicado')}
                </span>
              </div>
              <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
                {t('oilDetail.varieties.arbequina.desc', 'Manzana, plátano verde y gran suavidad. Excelente para tortillas delicadas donde se busca potenciar el sabor del huevo.')}
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-[#292521]">
                  {t('oilDetail.varieties.hojiblanca.name', 'Hojiblanca')}
                </h3>
                <span className="bg-[#B65D3A] text-white px-3 py-1 rounded-full text-xs font-bold font-sans">
                  {t('oilDetail.varieties.hojiblanca.badge', 'Gran Versatilidad')}
                </span>
              </div>
              <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
                {t('oilDetail.varieties.hojiblanca.desc', 'Almendra y fruta equilibrada con ligero picante. La opción todoterreno idónea para tortillas con cebolla.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNIQUES & SCIENCE SECTION */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DFD1] pb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292521]">
            {t('oilDetail.techniques.title', 'Ciencia del Confitado y la Emulsión')}
          </h2>
          <p className="text-sm text-[#8D6E63] font-sans mt-1">
            {t('oilDetail.techniques.subtitle', 'Factores fisicoquímicos fundamentales para lograr un interior meloso sin freír')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFF7EA] border border-[#E8DFD1] rounded-2xl p-6 space-y-2">
            <h3 className="text-lg font-serif font-bold text-[#292521]">
              {t('oilDetail.techniques.confit.title', 'El Confitado Lento (110–130 °C)')}
            </h3>
            <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
              {t('oilDetail.techniques.confit.desc', 'Permite la gelatinización progresiva del almidón de la patata sin dorar en exceso ni formar costras crujientes.')}
            </p>
          </div>

          <div className="bg-[#FFF7EA] border border-[#E8DFD1] rounded-2xl p-6 space-y-2">
            <h3 className="text-lg font-serif font-bold text-[#292521]">
              {t('oilDetail.techniques.emulsion.title', 'La Emulsión Caliente')}
            </h3>
            <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
              {t('oilDetail.techniques.emulsion.desc', 'Al mezclar la patata tibia con el huevo, la lecitina de la yema y el aceite libre forman una crema homogénea e inigualable.')}
            </p>
          </div>

          <div className="bg-[#FFF7EA] border border-[#E8DFD1] rounded-2xl p-6 space-y-2">
            <h3 className="text-lg font-serif font-bold text-[#292521]">
              {t('oilDetail.techniques.draining.title', 'Escurrido y Reposo')}
            </h3>
            <p className="text-sm text-[#292521]/80 font-sans leading-relaxed">
              {t('oilDetail.techniques.draining.desc', 'Escurrir el exceso de aceite libre antes del batido garantiza que la ligazón proteica no se corte ni quede grasienta.')}
            </p>
          </div>
        </div>
      </section>

      {/* 4. LINKED RECIPES WITH OIL INTENSITY OR ALTERNATIVE FAT USAGE */}
      <section className="space-y-6 pt-4">
        <div className="border-b border-[#E8DFD1] pb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#292521]">
            {currentLang === 'es'
              ? 'Recetas con Uso Intensivo o Alternativo de Aceite'
              : currentLang === 'de'
              ? 'Rezepte mit Intensivem Öleinsatz oder Fettalternativen'
              : 'Oil-Intensive & Alternative Fat Recipes'}
          </h2>
          <p className="text-sm text-[#8D6E63] font-sans mt-1">
            {currentLang === 'es'
              ? 'El Aceite de Oliva Virgen Extra es el medio térmico de confitado por excelencia. Seleccionamos recetas con inmersión en AOVE o control especial de materia grasa.'
              : currentLang === 'de'
              ? 'Natives Olivenöl Extra ist das perfekte Medium zum Confitieren. Wir wählen Rezepte mit tiefem Ölgaren oder speziellem Fettmanagement aus.'
              : 'Extra Virgin Olive Oil is the premier confiting medium. We highlight recipes with deep oil immersion or specialized fat management.'}
          </p>
        </div>

        {(() => {
          // Filter to recipes with high oil quantity or special fat management
          const oilRecipes = relatedRecipes.filter(
            (r) => r.id === 'clasica' || r.id === 'betanzos' || r.id === 'vegana'
          );
          const recipesToDisplay = oilRecipes.length > 0 ? oilRecipes : relatedRecipes;

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipesToDisplay.map((r) => {
                const recipeTitle = r.title[currentLang] || r.title.es || r.id;
                const recipeDesc = r.description[currentLang] || r.description.es || '';
                const recipeSlug = r.slug[currentLang] || r.slug.es || r.id;

                const badgeLabel =
                  r.id === 'clasica'
                    ? currentLang === 'es'
                      ? 'Confitado Lento en Abundante AOVE'
                      : currentLang === 'de'
                      ? 'Langsames Confitieren in Olivenöl'
                      : 'Deep Slow Confit in EVOO'
                    : r.id === 'betanzos'
                    ? currentLang === 'es'
                      ? 'Confitado Vivo de Alta Temperatura'
                      : currentLang === 'de'
                      ? 'Hohe Confit-Temperatur'
                      : 'High-Heat Oil Confit'
                    : currentLang === 'es'
                    ? 'Fritura Separada y Control de Grasa'
                    : currentLang === 'de'
                    ? 'Getrenntes Anbraten & Fettkontrolle'
                    : 'Separated Frying & Fat Control';

                return (
                  <article
                    key={r.id}
                    className="bg-white rounded-2xl border border-[#E8DFD1] overflow-hidden hover:border-[#D89B32] transition-all duration-200 flex flex-col justify-between shadow-xs group"
                  >
                    <div>
                      <div className="h-28 sm:h-44 md:h-48 w-full overflow-hidden bg-[#F5E6BE] relative border-b border-[#E8DFD1]">
                        <img
                          src={r.image || '/images/clasica.jpg'}
                          alt={recipeTitle}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#8D6E63] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full font-sans uppercase tracking-wider shadow-2xs">
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
                        {t('oilDetail.recipes.viewRecipe', 'Ver Receta')}
                      </LocalizedLink>
                    </div>
                  </article>
                );
              })}
            </div>
          );
        })()}
      </section>

      {/* TECHNIQUES MANUAL QUICK LINK */}
      <div className="bg-[#FFF7EA] border border-[#E8DFD1] rounded-2xl p-6 sm:p-8 space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-[#FFB800] text-[#292521] text-xs font-bold rounded-full uppercase tracking-wider font-sans">
            {currentLang === 'es' ? 'Confitado y Temperatura' : currentLang === 'de' ? 'Confitieren & Temperatur' : 'Confit & Temperature'}
          </span>
          <h3 className="text-xl font-serif font-bold text-[#292521]">
            {currentLang === 'es'
              ? 'Confitado a Fuego Lento vs Fritura Vivo a 180°C'
              : currentLang === 'de'
              ? 'Sanftgaren vs Frittieren bei 180°C'
              : 'Slow Confit Poaching vs High-Heat Frying'}
          </h3>
          <p className="text-sm text-[#8D6E63] font-sans leading-relaxed">
            {currentLang === 'es'
              ? 'Consulta el Manual de Técnicas para comprender la física del calor en aceite virgen extra y la diferencia entre la corteza de Betanzos y el pochado mantecoso.'
              : currentLang === 'de'
              ? 'Konsultieren Sie das Technik-Handbuch zur Wärmefrequenz in Olivenöl.'
              : 'Consult the Techniques Manual to understand heat transfer in extra virgin olive oil and the science of Betanzos vs. Classic poaching.'}
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

      {/* RELATED KNOWLEDGE BASE GRAPH SECTION */}
      <RelatedKnowledgeSection lang={currentLang} items={relatedKnowledge} />
    </article>
  );
}
