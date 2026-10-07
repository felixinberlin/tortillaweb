import React, { useState, useMemo } from 'react';
import type { LocalizedBibliographyItem } from '@/lib/bibliography';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ExternalLink, 
  Copy, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  History, 
  Microscope, 
  Award, 
  Users, 
  Sprout, 
  FileText,
  ArrowRight
} from 'lucide-react';

interface Props {
  initialItems: LocalizedBibliographyItem[];
  lang: 'es' | 'en' | 'de';
}

const CATEGORY_NAMES = {
  all: { es: 'Todas las Fuentes', en: 'All Sources', de: 'Alle Quellen' },
  history: { es: 'Historia & Manuscritos', en: 'History & Manuscripts', de: 'Geschichte & Manuskripte' },
  science: { es: 'Física & Bioquímica', en: 'Physics & Biochemistry', de: 'Physik & Biochemie' },
  safety: { es: 'Legislación & Seguridad', en: 'Legislation & Safety', de: 'Gesetze & Hygiene' },
  gastronomy: { es: 'Canon Gastronómico', en: 'Gastronomic Canon', de: 'Kulinarischer Kanon' },
  sociology: { es: 'Sociología CIS', en: 'CIS Sociology', de: 'CIS-Soziologie' },
  agronomy: { es: 'Agronomía & Patatas', en: 'Agronomy & Potatoes', de: 'Agronomie & Sorten' },
};

const UI_TEXTS = {
  es: {
    searchPlaceholder: 'Buscar por autor, título, año o palabra clave (ej. Valcárcel, 1798, BOE, McGee)...',
    showing: 'Mostrando',
    of: 'de',
    sources: 'fuentes documentales',
    noResults: 'No se encontraron fuentes que coincidan con la búsqueda.',
    clearFilters: 'Restablecer filtros',
    copyCitation: 'Copiar cita',
    copied: '¡Cita copiada!',
    viewDocument: 'Consultar fuente original',
    historicalArchive: 'Documento en archivo histórico',
    citedIn: 'Citado en el proyecto:',
    keyTakeaway: 'Conclusión documental / Aporte clave:',
    quote: 'Fragmento textual:',
    officialRef: 'Ref. oficial:',
  },
  en: {
    searchPlaceholder: 'Search by author, title, year or keyword (e.g. Valcárcel, 1798, BOE, McGee)...',
    showing: 'Showing',
    of: 'of',
    sources: 'documentary sources',
    noResults: 'No documentary sources matched your search criteria.',
    clearFilters: 'Reset filters',
    copyCitation: 'Copy citation',
    copied: 'Citation copied!',
    viewDocument: 'View original source',
    historicalArchive: 'Archival record',
    citedIn: 'Cited across project:',
    keyTakeaway: 'Documentary finding / Core takeaway:',
    quote: 'Primary excerpt:',
    officialRef: 'Official Ref:',
  },
  de: {
    searchPlaceholder: 'Nach Autor, Titel, Jahr oder Begriff suchen (z.B. Valcárcel, 1798, BOE, McGee)...',
    showing: 'Zeige',
    of: 'von',
    sources: 'dokumentarischen Quellen',
    noResults: 'Keine Quellen entsprechen den Suchkriterien.',
    clearFilters: 'Filter zurücksetzen',
    copyCitation: 'Zitat kopieren',
    copied: 'Zitat kopiert!',
    viewDocument: 'Originalquelle öffnen',
    historicalArchive: 'Historischer Archivbestand',
    citedIn: 'Zitiert in Artikeln:',
    keyTakeaway: 'Wissenschaftlicher Kernbefund:',
    quote: 'Originalzitat:',
    officialRef: 'Offizielle Ref:',
  },
};

const ARTICLE_LINK_MAP: Record<string, { label: { es: string; en: string; de: string }; path: string }> = {
  history: { label: { es: 'Historia de la Tortilla', en: 'History of Tortilla', de: 'Geschichte' }, path: '/history' },
  historia: { label: { es: 'Historia de la Tortilla', en: 'History of Tortilla', de: 'Geschichte' }, path: '/history' },
  science: { label: { es: 'Ciencia & Seguridad', en: 'Science & Safety', de: 'Wissenschaft' }, path: '/science' },
  ciencia: { label: { es: 'Ciencia & Seguridad', en: 'Science & Safety', de: 'Wissenschaft' }, path: '/science' },
  seguridad: { label: { es: 'Seguridad Alimentaria', en: 'Food Safety', de: 'Lebensmittelsicherheit' }, path: '/science' },
  recipes: { label: { es: 'Recetario Canónico', en: 'Canonical Recipes', de: 'Rezepte' }, path: '/recipes' },
  recetas: { label: { es: 'Recetario Canónico', en: 'Canonical Recipes', de: 'Rezepte' }, path: '/recipes' },
  facciones: { label: { es: 'Facciones Culinarias', en: 'Culinary Factions', de: 'Fraktionen' }, path: '/facciones' },
  encuestas: { label: { es: 'Debates & Encuestas', en: 'Debates & Polls', de: 'Umfragen' }, path: '/encuestas' },
  regiones: { label: { es: 'Mapa de Tradiciones', en: 'Regional Traditions', de: 'Regionen' }, path: '/regiones' },
  betanzos: { label: { es: 'Estilo Betanzos', en: 'Betanzos Style', de: 'Betanzos-Stil' }, path: '/recipes/betanzos' },
  mapapremios: { label: { es: 'Mapa de Premios', en: 'Award Winners Map', de: 'Meisterschaftskarte' }, path: '/mapapremios' },
  tecnicas: { label: { es: 'Técnicas de Volteado', en: 'Techniques & Pan Flip', de: 'Techniken' }, path: '/techniques' },
  ingredientes: { label: { es: 'Ingredientes Clave', en: 'Core Ingredients', de: 'Zutaten' }, path: '/ingredients' },
  laboratorio: { label: { es: 'Laboratorio Sensorial', en: 'Sensory Laboratory', de: 'Labor' }, path: '/laboratorio' },
};

export const BibliographyDirectory: React.FC<Props> = ({ initialItems, lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const t = UI_TEXTS[lang] || UI_TEXTS.es;

  const categories = [
    'all',
    'history',
    'science',
    'safety',
    'gastronomy',
    'sociology',
    'agronomy'
  ];

  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = item.title.toLowerCase().includes(q);
      const authorsMatch = item.authors.some((a) => a.toLowerCase().includes(q));
      const yearMatch = String(item.year).toLowerCase().includes(q);
      const summaryMatch = item.summary.toLowerCase().includes(q);
      const citationMatch = item.citationText.toLowerCase().includes(q);
      const tagMatch = item.tags?.some((t) => t.toLowerCase().includes(q));
      const publisherMatch = item.publisher?.toLowerCase().includes(q);

      return (
        titleMatch ||
        authorsMatch ||
        yearMatch ||
        summaryMatch ||
        citationMatch ||
        Boolean(tagMatch) ||
        Boolean(publisherMatch)
      );
    });
  }, [initialItems, selectedCategory, searchQuery]);

  const handleCopyCitation = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Toolbar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-card border border-border shadow-stacked-parchment space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-foreground p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          {categories.map((cat) => {
            const label = CATEGORY_NAMES[cat as keyof typeof CATEGORY_NAMES]?.[lang] || cat;
            const count = cat === 'all' 
              ? initialItems.length 
              : initialItems.filter((i) => i.category === cat).length;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#FFB800] text-[#1C1917] font-bold shadow-xs'
                    : 'bg-accent/80 hover:bg-accent text-muted-foreground hover:text-foreground border border-border/60'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-[#1C1917]/20 text-[#1C1917]' : 'bg-background/80 text-muted-foreground'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Result Counter */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/50">
          <span>
            {t.showing} <strong className="text-foreground">{filteredItems.length}</strong> {t.of}{' '}
            <strong className="text-foreground">{initialItems.length}</strong> {t.sources}
          </span>
          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-[#8D6E63] dark:text-[#FFB800] hover:underline font-medium"
            >
              {t.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Zero State */}
      {filteredItems.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-card border border-border space-y-3">
          <BookOpen className="w-10 h-10 text-muted-foreground mx-auto stroke-1" />
          <h3 className="text-base font-serif-heading font-bold text-foreground">
            {t.noResults}
          </h3>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-[#FFB800] text-[#1C1917] font-bold text-xs hover:bg-[#FFB800]/90 transition-colors"
          >
            {t.clearFilters}
          </button>
        </div>
      )}

      {/* Grid of Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-stacked-parchment hover:border-[#FFB800]/60 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-accent text-foreground border border-border">
                  {item.typeLabel}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#FFB800]/15 text-[#8D6E63] dark:text-[#FFB800] border border-[#FFB800]/30">
                    {item.year}
                  </span>
                  {item.verified && (
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"
                      title="Fuente primaria contrastada con documentación física u oficial"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verificado</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Authors */}
              <div>
                <h3 className="text-base sm:text-lg font-serif-heading font-bold text-foreground leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-muted-foreground mt-1">
                  {item.authors.join(', ')}
                  {item.publication ? ` · ${item.publication}` : ''}
                  {item.publisher ? ` · ${item.publisher}` : ''}
                  {item.location ? ` (${item.location})` : ''}
                </p>
              </div>

              {/* Formatted Citation Box */}
              <div className="p-3 rounded-xl bg-accent/80 border border-border text-xs font-mono text-muted-foreground space-y-2">
                <div className="leading-relaxed break-words text-[11px]">
                  {item.citationText}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-border/60">
                  <span className="text-[10px] text-muted-foreground/80">
                    {item.officialCode ? `${t.officialRef} ${item.officialCode}` : item.categoryLabel}
                  </span>
                  <button
                    onClick={() => handleCopyCitation(item.id, item.citationText)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-background hover:bg-card border border-border text-[10px] font-sans font-bold text-foreground transition-colors cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{t.copyCitation}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                {item.summary}
              </p>

              {/* Core Takeaway Box */}
              {item.keyTakeaway && (
                <div className="text-xs bg-[#FFB800]/10 border-l-3 border-[#FFB800] p-3 rounded-r-xl text-foreground/90 space-y-1 leading-relaxed">
                  <span className="font-bold text-[#8D6E63] dark:text-[#FFB800] block text-[11px]">
                    {t.keyTakeaway}
                  </span>
                  <div dangerouslySetInnerHTML={{ __html: item.keyTakeaway }} />
                </div>
              )}

              {/* Primary Source Quote */}
              {item.quote && (
                <blockquote className="italic text-xs text-muted-foreground border-l-2 border-[#8D6E63]/30 pl-3 py-1 my-2 bg-accent/40 rounded-r">
                  "{item.quote}"
                </blockquote>
              )}

              {/* Connected Articles in Project */}
              {item.relatedArticleSlugs && item.relatedArticleSlugs.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-muted-foreground block mb-1.5">
                    {t.citedIn}
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.relatedArticleSlugs.map((slug) => {
                      const articleInfo = ARTICLE_LINK_MAP[slug];
                      const label = articleInfo ? articleInfo.label[lang] || slug : slug;
                      const path = articleInfo ? `/${lang}${articleInfo.path}` : `/${lang}/${slug}`;

                      return (
                        <a
                          key={slug}
                          href={path}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent hover:bg-[#FFB800]/20 border border-border text-[11px] font-medium text-foreground hover:text-[#8D6E63] dark:hover:text-[#FFB800] transition-colors"
                        >
                          <span>{label}</span>
                          <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer with External Link */}
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-[10px] font-mono text-muted-foreground">
                ID: {item.id}
              </span>

              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-xs text-[#8D6E63] dark:text-[#FFB800] hover:underline"
                >
                  <span>{t.viewDocument}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-[11px] text-muted-foreground italic font-sans">
                  {t.historicalArchive}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
export default BibliographyDirectory;
