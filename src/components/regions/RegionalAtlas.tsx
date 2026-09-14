import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Search,
  Sparkles,
  ShieldCheck,
  Flame,
  ArrowRight,
  Clock,
  Thermometer,
  BookOpen,
  Calendar,
  Utensils
} from 'lucide-react';

export interface RegionalAtlasProps {
  regions: any[];
  taxonomies: any[];
  recipes: any[];
  currentLang: 'es' | 'en' | 'de';
  safetyStandard?: {
    title?: Record<string, string>;
    description?: Record<string, string>;
  };
}

export const RegionalAtlas: React.FC<RegionalAtlasProps> = ({
  regions,
  taxonomies,
  recipes,
  currentLang,
  safetyStandard,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Category definitions with localized labels
  const categories = useMemo(() => [
    {
      id: 'all',
      label: {
        es: 'Todas las Regiones',
        en: 'All Regions',
        de: 'Alle Regionen',
      },
    },
    {
      id: 'north_runny',
      label: {
        es: 'Norte Líquido & Yema',
        en: 'Northern Runny Yolk',
        de: 'Nördlicher Flüssigkern',
      },
    },
    {
      id: 'central_confit',
      label: {
        es: 'Centro Confitado & Castizo',
        en: 'Central Confit & Castilian',
        de: 'Zentrales Sanftgaren & Kastilien',
      },
    },
    {
      id: 'south_islands',
      label: {
        es: 'Sur, Tabernas & Archipiélagos',
        en: 'South, Taverns & Islands',
        de: 'Süden, Tavernen & Inseln',
      },
    },
    {
      id: 'stuffed_garden',
      label: {
        es: 'Huerta, Rellenas & Ahumados',
        en: 'Garden, Stuffed & Smoky',
        de: 'Gemüsegarten, Gefüllt & Rauchig',
      },
    },
  ], []);

  // Map taxonomy data by ID for quick enrichment
  const taxonomyMap = useMemo(() => {
    const map = new Map<string, any>();
    for (const item of taxonomies) {
      map.set(item.id, item);
    }
    return map;
  }, [taxonomies]);

  // Map recipes to regions
  const recipesByRegion = useMemo(() => {
    const map = new Map<string, any[]>();
    for (const recipe of recipes) {
      const taxonomyIds: string[] = recipe.taxonomyIds || [];
      for (const tag of taxonomyIds) {
        if (tag.startsWith('region:')) {
          const regionId = tag.replace('region:', '');
          const existing = map.get(regionId) || [];
          existing.push(recipe);
          map.set(regionId, existing);
        }
      }
    }
    return map;
  }, [recipes]);

  // Filtered regions list
  const filteredRegions = useMemo(() => {
    return regions.filter((region) => {
      // Category filter
      if (activeCategory !== 'all' && region.styleCategory !== activeCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const name = (region.name?.[currentLang] || region.name?.es || '').toLowerCase();
        const desc = (region.description?.[currentLang] || region.description?.es || '').toLowerCase();
        const potato = (region.potatoVariety || '').toLowerCase();
        const badge = (region.badge?.[currentLang] || region.badge?.es || '').toLowerCase();
        const festivals = (region.festivals?.[currentLang] || region.festivals?.es || '').toLowerCase();

        return (
          name.includes(query) ||
          desc.includes(query) ||
          potato.includes(query) ||
          badge.includes(query) ||
          festivals.includes(query)
        );
      }

      return true;
    });
  }, [regions, activeCategory, searchQuery, currentLang]);

  // Helper for localized taxonomy route segment
  const regionRouteSegment = currentLang === 'es' ? 'regiones' : currentLang === 'de' ? 'regionen' : 'regions';

  const t = {
    searchPlaceholder: {
      es: 'Buscar por región, patata (Kennebec, Monalisa...), tradición o festival...',
      en: 'Search by region, potato (Kennebec, Monalisa...), tradition, or festival...',
      de: 'Nach Region, Kartoffel (Kennebec, Monalisa...), Tradition oder Fest suchen...',
    }[currentLang],
    filterLabel: {
      es: 'Filtrar por escuela culinaria:',
      en: 'Filter by culinary style:',
      de: 'Nach kulinarischem Stil filtern:',
    }[currentLang],
    viewMonograph: {
      es: 'Ver Monografía Territorial',
      en: 'View Regional Monograph',
      de: 'Regionale Monografie ansehen',
    }[currentLang],
    recipesLabel: {
      es: 'Recetas vinculadas a esta comarca:',
      en: 'Recipes linked to this region:',
      de: 'Verknüpfte Rezepte dieser Region:',
    }[currentLang],
    noResults: {
      es: 'No se encontraron regiones con esos criterios. Prueba con otro término de búsqueda.',
      en: 'No regions match your search criteria. Try a different term.',
      de: 'Keine Regionen entsprechen deinen Kriterien. Probiere einen anderen Suchbegriff.',
    }[currentLang],
    potatoLabel: {
      es: 'Variedad de patata',
      en: 'Potato variety',
      de: 'Kartoffelsorte',
    }[currentLang],
    onionLabel: {
      es: 'Dogma de la cebolla',
      en: 'Onion dogma',
      de: 'Zwiebel-Dogma',
    }[currentLang],
    cuajadoLabel: {
      es: 'Cuajado & Textura',
      en: 'Runniness & Texture',
      de: 'Bindung & Textur',
    }[currentLang],
    oilLabel: {
      es: 'Grasa tradicional',
      en: 'Traditional oil/fat',
      de: 'Traditionelles Öl/Fett',
    }[currentLang],
    festivalsLabel: {
      es: 'Fiesta & Tradición Popular',
      en: 'Festival & Popular Folklore',
      de: 'Fest & Volkstradition',
    }[currentLang],
    activeRegionsCount: {
      es: (count: number) => `Mostrando ${count} ${count === 1 ? 'identidad territorial' : 'identidades territoriales'}`,
      en: (count: number) => `Showing ${count} regional ${count === 1 ? 'identity' : 'identities'}`,
      de: (count: number) => `Zeige ${count} regionale ${count === 1 ? 'Identität' : 'Identitäten'}`,
    }[currentLang],
  };

  return (
    <div class="space-y-12">
      {/* SEARCH AND FILTERS */}
      <div class="card-notebook p-6 sm:p-8 space-y-6 shadow-sm border border-[#8D6E63]/20 bg-[#FBF9F5]/90 dark:bg-card">
        <div class="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div class="relative flex-1">
            <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all"
            />
          </div>
          <div class="text-xs text-muted-foreground font-mono self-center md:self-auto shrink-0">
            {t.activeRegionsCount(filteredRegions.length)}
          </div>
        </div>

        {/* CULINARY STYLE FILTER TABS */}
        <div class="space-y-2">
          <label class="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Sparkles class="w-3.5 h-3.5 text-[#FFB800]" />
            <span>{t.filterLabel}</span>
          </label>
          <div class="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  class={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#8D6E63] text-white shadow-xs'
                      : 'bg-[#F5E6BE]/60 dark:bg-muted text-foreground hover:bg-[#F5E6BE] border border-[#8D6E63]/15'
                  }`}
                >
                  {cat.label[currentLang] || cat.label.es}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* REGIONAL CARDS GRID */}
      {filteredRegions.length === 0 ? (
        <div class="card-notebook p-12 text-center space-y-4 max-w-md mx-auto">
          <MapPin class="w-10 h-10 text-muted-foreground mx-auto opacity-50" />
          <p class="text-sm text-muted-foreground leading-relaxed">
            {t.noResults}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            class="px-4 py-2 rounded-lg bg-[#FFB800] text-[#4A3B32] text-xs font-bold hover:bg-[#FFB800]/90 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRegions.map((region) => {
            const taxItem = taxonomyMap.get(region.id);
            const linkedRecipes = recipesByRegion.get(region.id) || [];
            const regionSlug = taxItem?.slug?.[currentLang] || taxItem?.slug?.es || region.slug || region.id;
            const regionUrl = `/${currentLang}/${regionRouteSegment}/${regionSlug}`;

            const regionTitle = region.name?.[currentLang] || region.name?.es || taxItem?.title?.[currentLang] || taxItem?.title?.es;
            const regionDesc = region.description?.[currentLang] || region.description?.es;
            const regionBadge = region.badge?.[currentLang] || region.badge?.es;
            const festivals = region.festivals?.[currentLang] || region.festivals?.es;
            const cuajadoText = region.cuajado?.[currentLang] || region.cuajado?.es;
            const onionText = region.onionPolicy?.[currentLang] || region.onionPolicy?.es;
            const oilText = region.oilType?.[currentLang] || region.oilType?.es;

            return (
              <article
                key={region.id}
                class="card-notebook flex flex-col justify-between p-6 sm:p-7 border border-[#8D6E63]/25 bg-card hover:border-[#FFB800] hover:shadow-md transition-all group"
              >
                <div class="space-y-4">
                  {/* CARD HEADER */}
                  <div class="flex items-start justify-between gap-3">
                    <div class="space-y-1">
                      <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5E6BE] dark:bg-muted text-[#8D6E63] dark:text-[#FFB800] text-[11px] font-bold border border-[#8D6E63]/20">
                        <MapPin class="w-3 h-3 text-[#FFB800]" />
                        <span>{regionBadge}</span>
                      </div>
                      <h2 class="text-xl sm:text-2xl font-serif-heading font-extrabold text-foreground group-hover:text-[#8D6E63] dark:group-hover:text-[#FFB800] transition-colors">
                        {regionTitle}
                      </h2>
                    </div>
                  </div>

                  {/* EDITORIAL DESCRIPTION */}
                  <p class="text-sm text-foreground/85 dark:text-muted-foreground leading-relaxed font-sans">
                    {regionDesc}
                  </p>

                  {/* QUICK CULINARY ATTRIBUTES TABLE */}
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
                    <div class="p-2.5 rounded-md bg-[#FBF9F5] dark:bg-muted/40 border border-border/60 space-y-0.5">
                      <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                        {t.potatoLabel}
                      </span>
                      <span class="font-medium text-foreground">
                        {region.potatoVariety}
                      </span>
                    </div>

                    <div class="p-2.5 rounded-md bg-[#FBF9F5] dark:bg-muted/40 border border-border/60 space-y-0.5">
                      <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                        {t.cuajadoLabel}
                      </span>
                      <span class="font-medium text-foreground">
                        {cuajadoText}
                      </span>
                    </div>

                    <div class="p-2.5 rounded-md bg-[#FBF9F5] dark:bg-muted/40 border border-border/60 space-y-0.5">
                      <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                        {t.onionLabel}
                      </span>
                      <span class="font-medium text-foreground">
                        {onionText}
                      </span>
                    </div>

                    <div class="p-2.5 rounded-md bg-[#FBF9F5] dark:bg-muted/40 border border-border/60 space-y-0.5">
                      <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                        {t.oilLabel}
                      </span>
                      <span class="font-medium text-foreground line-clamp-1" title={oilText}>
                        {oilText}
                      </span>
                    </div>
                  </div>

                  {/* FESTIVALS & TRADITION CALLOUT */}
                  {festivals && (
                    <div class="flex items-start gap-2.5 p-3 rounded-lg bg-[#FFB800]/10 dark:bg-[#FFB800]/15 border border-[#FFB800]/30 text-xs">
                      <Calendar class="w-4 h-4 text-[#8D6E63] dark:text-[#FFB800] shrink-0 mt-0.5" />
                      <div>
                        <span class="font-bold text-[#8D6E63] dark:text-[#FFB800] block text-[11px] uppercase tracking-wide">
                          {t.festivalsLabel}
                        </span>
                        <span class="text-foreground/90 font-medium">
                          {festivals}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* LINKED RECIPES CHIPS */}
                  {linkedRecipes.length > 0 && (
                    <div class="space-y-1.5 pt-1">
                      <span class="text-[11px] font-bold uppercase tracking-wide text-muted-foreground block">
                        {t.recipesLabel}
                      </span>
                      <div class="flex flex-wrap gap-1.5">
                        {linkedRecipes.map((rec) => {
                          const recSlug = rec.slug?.[currentLang] || rec.slug?.es || rec.id;
                          const recTitle = rec.title?.[currentLang] || rec.title?.es || rec.name;
                          return (
                            <a
                              key={rec.id}
                              href={`/${currentLang}/recetas/${recSlug}`}
                              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F5E6BE]/70 dark:bg-muted text-xs font-medium text-foreground hover:bg-[#FFB800] hover:text-[#4A3B32] transition-colors border border-border/50"
                            >
                              <Utensils class="w-3 h-3 text-[#8D6E63]" />
                              <span>{recTitle}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* BOTTOM ACTION BUTTON */}
                <div class="pt-5 mt-4 border-t border-border/60 flex items-center justify-between">
                  <span class="text-xs text-muted-foreground font-mono">
                    ID: region:{region.id}
                  </span>
                  <a
                    href={regionUrl}
                    class="inline-flex items-center gap-1.5 text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] hover:underline group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{t.viewMonograph}</span>
                    <ArrowRight class="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* MANDATORY FOOD SAFETY BANNER */}
      {safetyStandard && (
        <div class="card-notebook p-6 sm:p-8 bg-[#FBF9F5] dark:bg-card border-2 border-amber-300/80 rounded-xl space-y-3 shadow-xs">
          <div class="flex items-center gap-2 text-[#8D6E63] dark:text-[#FFB800]">
            <ShieldCheck class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 class="font-serif-heading font-extrabold text-base sm:text-lg text-foreground">
              {safetyStandard.title?.[currentLang] || safetyStandard.title?.es}
            </h3>
          </div>
          <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {currentLang === 'es' ? (
              <>
                Tanto en el norte líquido como en las tortillas más cuajadas de mesón, la seguridad higiénica exige alcanzar <strong>70°C</strong> durante <strong>2 minutos</strong> (o <strong>63°C</strong> durante <strong>20 segundos</strong>). Mantener expuesta a temperatura ambiente un máximo de <strong>4 horas</strong> o conservar bajo refrigeración a menos de <strong>8°C</strong>.
              </>
            ) : currentLang === 'de' ? (
              <>
                Von flüssigen nördlichen Varianten bis zu festen Tavernenstücken verlangt die Lebensmittelsicherheit <strong>70°C</strong> für <strong>2 Minuten</strong> (oder <strong>63°C</strong> für <strong>20 Sekunden</strong>). Maximale Thekenzeit bei Raumtemperatur <strong>4 Stunden</strong> oder Kühlung unter <strong>8°C</strong>.
              </>
            ) : (
              <>
                Across runny northern tortillas and dense tavern slices alike, hygiene standards require reaching <strong>70°C</strong> for <strong>2 minutes</strong> (or <strong>63°C</strong> for <strong>20 seconds</strong>). Limit ambient counter display to <strong>4 hours</strong> maximum or refrigerate below <strong>8°C</strong>.
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default RegionalAtlas;
