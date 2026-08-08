import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  ShieldCheck,
  BookOpen,
  Flame,
  Heart,
  Search,
  Filter,
  ThumbsUp,
  Share2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Vote,
  Send,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown
} from 'lucide-react';

export interface TriviaFact {
  id: string;
  status: 'proved' | 'unproved';
  category: 'history' | 'records' | 'science' | 'pop-culture' | 'regions' | 'factions' | string;
  icon?: string;
  date?: string;
  title: { es: string; en: string; de: string };
  fact: { es: string; en: string; de: string };
  explanation: { es: string; en: string; de: string };
  source?: string;
  evidence?: string;
  relatedLink?: {
    href: string;
    label: { es: string; en: string; de: string };
  };
}

interface TriviaGalleryProps {
  facts: TriviaFact[];
  currentLang: 'es' | 'en' | 'de';
}

export default function TriviaGallery({ facts, currentLang }: TriviaGalleryProps) {
  const galleryTopRef = useRef<HTMLDivElement>(null);

  // Filters State
  const [statusFilter, setStatusFilter] = useState<'all' | 'proved' | 'unproved'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'title' | 'proved-first' | 'likes'>('default');

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);

  // Expanded Cards & Likes State
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  // Form States
  const [factionVote, setFactionVote] = useState<'concebollistas' | 'sincebollistas'>('concebollistas');
  const [doneness, setDoneness] = useState<string>('creamy');
  const [voteSubmitted, setVoteSubmitted] = useState<boolean>(false);

  const [submissionTitle, setSubmissionTitle] = useState<string>('');
  const [submissionCategory, setSubmissionCategory] = useState<string>('history');
  const [submissionDesc, setSubmissionDesc] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, selectedCategory, searchQuery, sortBy, pageSize]);

  const t = {
    all: currentLang === 'en' ? 'All Facts' : currentLang === 'de' ? 'Alle Fakten' : 'Todas las Curiosidades',
    proved: currentLang === 'en' ? 'Proved / Verified' : currentLang === 'de' ? 'Bewiesen' : 'Probados / Verificados',
    unproved: currentLang === 'en' ? 'Unproved / Myths' : currentLang === 'de' ? 'Mitos & Unbewiesen' : 'No Probados / Mitos',
    searchPlaceholder: currentLang === 'en' ? 'Search 200 trivia facts (e.g. Mortadelo, Vitoria, 1817, Betanzos, 70°C)...' : currentLang === 'de' ? 'Suche 200 Fakten (z.B. Mortadelo, Vitoria, 1817, Betanzos, 70°C)...' : 'Buscar en los 200 datos (ej. Mortadelo, Vitoria, 1817, Betanzos, 70°C)...',
    verifiedLabel: currentLang === 'en' ? 'VERIFIED FACT' : currentLang === 'de' ? 'BEWIESENE TATSACHE' : 'HECHO PROBADO',
    unverifiedLabel: currentLang === 'en' ? 'MYTH / UNPROVED' : currentLang === 'de' ? 'UNBEWIESEN / MYTHOS' : 'MITO / NO PROBADO',
    sourceLabel: currentLang === 'en' ? 'Source' : currentLang === 'de' ? 'Quelle' : 'Fuente',
    evidenceLabel: currentLang === 'en' ? 'Evidence & Verdict' : currentLang === 'de' ? 'Beweis & Urteil' : 'Evidencia & Veredicto',
    showAnalysis: currentLang === 'en' ? 'Read Analysis & Verdict' : currentLang === 'de' ? 'Analyse & Urteil lesen' : 'Leer Análisis & Veredicto',
    hideAnalysis: currentLang === 'en' ? 'Hide Analysis' : currentLang === 'de' ? 'Analyse ausblenden' : 'Ocultar Análisis',
    didYouKnow: currentLang === 'en' ? 'Did you know this?' : currentLang === 'de' ? 'Wusstest du das?' : '¿Conocías este dato?',
    copied: currentLang === 'en' ? 'Copied to clipboard!' : currentLang === 'de' ? 'In Zwischenablage kopiert!' : '¡Copiado al portapapeles!',
    showingResults: currentLang === 'en' ? 'Showing' : currentLang === 'de' ? 'Zeige' : 'Mostrando',
    of: currentLang === 'en' ? 'of' : currentLang === 'de' ? 'von' : 'de',
    factsLabel: currentLang === 'en' ? 'facts' : currentLang === 'de' ? 'Fakten' : 'datos',
    perPage: currentLang === 'en' ? 'per page' : currentLang === 'de' ? 'pro Seite' : 'por página',
    sortByLabel: currentLang === 'en' ? 'Sort by:' : currentLang === 'de' ? 'Sortieren:' : 'Ordenar por:',
    resetFilters: currentLang === 'en' ? 'Reset all filters' : currentLang === 'de' ? 'Alle Filter zurücksetzen' : 'Restablecer filtros',
    sortOptions: {
      default: currentLang === 'en' ? 'Default Order (#1 - #200)' : currentLang === 'de' ? 'Standardreihenfolge (#1 - #200)' : 'Orden Predeterminado (#1 - #200)',
      title: currentLang === 'en' ? 'Title (A - Z)' : currentLang === 'de' ? 'Titel (A - Z)' : 'Título (A - Z)',
      'proved-first': currentLang === 'en' ? 'Proved First' : currentLang === 'de' ? 'Zuerst Bewiesene' : 'Probados Primero',
      likes: currentLang === 'en' ? 'Most Liked' : currentLang === 'de' ? 'Beliebteste' : 'Más Valorados',
    },
    categories: {
      all: currentLang === 'en' ? 'All Categories' : currentLang === 'de' ? 'Alle Kategorien' : 'Todas las Categorías',
      science: currentLang === 'en' ? 'Science & Safety' : currentLang === 'de' ? 'Wissenschaft & Sicherheit' : 'Ciencia & Seguridad',
      history: currentLang === 'en' ? 'History & Origins' : currentLang === 'de' ? 'Geschichte & Ursprung' : 'Historia & Orígenes',
      'pop-culture': currentLang === 'en' ? 'Comics & Pop Culture' : currentLang === 'de' ? 'Comics & Pop-Kultur' : 'Cómics & Cultura Pop',
      records: currentLang === 'en' ? 'Records & Feats' : currentLang === 'de' ? 'Rekorde & Leistung' : 'Récords & Hazañas',
      factions: currentLang === 'en' ? 'Factions & Debates' : currentLang === 'de' ? 'Fraktionen & Debatten' : 'Facciones & Debates',
      regions: currentLang === 'en' ? 'Regional Tradition' : currentLang === 'de' ? 'Regionale Tradition' : 'Tradición Regional',
    }
  };

  const toggleLike = (id: string) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const toggleExpand = (id: string) => {
    setExpandedCardId(prev => (prev === id ? null : id));
  };

  const handleShare = async (factTitle: string) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${factTitle} - tortilladepatatas.org`);
        alert(t.copied);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleFactionVoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVoteSubmitted(true);
    setTimeout(() => setVoteSubmitted(false), 5000);
  };

  const handleContributionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionTitle || !submissionDesc) return;
    setSubmitSuccess(true);
    setSubmissionTitle('');
    setSubmissionDesc('');
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: facts.length };
    facts.forEach(f => {
      counts[f.category] = (counts[f.category] || 0) + 1;
    });
    return counts;
  }, [facts]);

  // Filtered & Sorted Facts
  const filteredFacts = useMemo(() => {
    let result = facts.filter(item => {
      // Filter by Proved/Unproved Status
      if (statusFilter === 'proved' && item.status !== 'proved') return false;
      if (statusFilter === 'unproved' && item.status !== 'unproved') return false;

      // Filter by Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Filter by Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const titleText = (item.title[currentLang] || item.title.es || '').toLowerCase();
        const factText = (item.fact[currentLang] || item.fact.es || '').toLowerCase();
        const explanationText = (item.explanation[currentLang] || item.explanation.es || '').toLowerCase();
        const sourceText = (item.source || '').toLowerCase();
        const evidenceText = (item.evidence || '').toLowerCase();
        const idText = (item.id || '').toLowerCase();
        
        return (
          titleText.includes(q) ||
          factText.includes(q) ||
          explanationText.includes(q) ||
          sourceText.includes(q) ||
          evidenceText.includes(q) ||
          idText.includes(q)
        );
      }

      return true;
    });

    // Sorting
    if (sortBy === 'title') {
      result = [...result].sort((a, b) => {
        const titleA = (a.title[currentLang] || a.title.es).toLowerCase();
        const titleB = (b.title[currentLang] || b.title.es).toLowerCase();
        return titleA.localeCompare(titleB);
      });
    } else if (sortBy === 'proved-first') {
      result = [...result].sort((a, b) => {
        if (a.status === 'proved' && b.status !== 'proved') return -1;
        if (a.status !== 'proved' && b.status === 'proved') return 1;
        return 0;
      });
    } else if (sortBy === 'likes') {
      result = [...result].sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0));
    }

    return result;
  }, [facts, statusFilter, selectedCategory, searchQuery, sortBy, likes, currentLang]);

  // Pagination Math
  const totalPages = Math.max(1, Math.ceil(filteredFacts.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedFacts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return filteredFacts.slice(startIndex, startIndex + pageSize);
  }, [filteredFacts, safeCurrentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    const targetPage = Math.max(1, Math.min(newPage, totalPages));
    setCurrentPage(targetPage);
    if (galleryTopRef.current) {
      galleryTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'records': return Trophy;
      case 'science': return ShieldCheck;
      case 'history': return BookOpen;
      case 'regions': return Flame;
      case 'factions': return Heart;
      case 'pop-culture': return HelpCircle;
      default: return Sparkles;
    }
  };

  const getLocalizedPath = (path: string) => {
    if (path.startsWith(`/${currentLang}`)) return path;
    return `/${currentLang}${path.startsWith('/') ? path : '/' + path}`;
  };

  const resetAllFilters = () => {
    setStatusFilter('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('default');
    setCurrentPage(1);
  };

  const hasActiveFilters = statusFilter !== 'all' || selectedCategory !== 'all' || searchQuery.trim() !== '' || sortBy !== 'default';

  return (
    <div ref={galleryTopRef} className="space-y-8 w-full max-w-6xl mx-auto scroll-mt-6">
      {/* FILTER CONTROLS & SEARCH BAR */}
      <div className="card-notebook p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D5] space-y-5 shadow-xs">
        
        {/* Search Bar with Clear Button */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-[#8D6E63] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-white border border-[#E8E2D5] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all shadow-2xs placeholder:text-muted-foreground/70"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-stone-100 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Verification Status Tabs & Sort Option */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          {/* Status Filter Buttons */}
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8D6E63] uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? 'Verification Status' : currentLang === 'de' ? 'Verifizierungsstatus' : 'Estado de Verificación'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all min-h-[42px] cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-[#8D6E63] text-white shadow-xs'
                    : 'bg-white text-foreground/80 hover:bg-[#FAF6EE] border border-[#E8E2D5]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#FFB800]" />
                <span>{t.all} ({facts.length})</span>
              </button>

              <button
                onClick={() => setStatusFilter('proved')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all min-h-[42px] cursor-pointer ${
                  statusFilter === 'proved'
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'bg-white text-[#2E7D32] hover:bg-emerald-50 border border-emerald-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.proved} ({facts.filter(f => f.status === 'proved').length})</span>
              </button>

              <button
                onClick={() => setStatusFilter('unproved')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all min-h-[42px] cursor-pointer ${
                  statusFilter === 'unproved'
                    ? 'bg-[#D32F2F] text-white shadow-xs'
                    : 'bg-white text-[#D32F2F] hover:bg-red-50 border border-red-200'
                }`}
              >
                <XCircle className="w-4 h-4" />
                <span>{t.unproved} ({facts.filter(f => f.status === 'unproved').length})</span>
              </button>
            </div>
          </div>

          {/* Sort Selector */}
          <div className="space-y-2 w-full md:w-56 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#8D6E63] uppercase tracking-wider">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{t.sortByLabel}</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2.5 rounded-xl bg-white border border-[#E8E2D5] text-xs font-bold text-foreground focus:ring-2 focus:ring-[#FFB800] min-h-[42px]"
            >
              <option value="default">{t.sortOptions.default}</option>
              <option value="title">{t.sortOptions.title}</option>
              <option value="proved-first">{t.sortOptions['proved-first']}</option>
              <option value="likes">{t.sortOptions.likes}</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider">
            {currentLang === 'en' ? 'Thematic Module' : currentLang === 'de' ? 'Themenbereich' : 'Módulo Temático'}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {Object.entries(t.categories).map(([catKey, catLabel]) => {
              const active = selectedCategory === catKey;
              const count = categoryCounts[catKey] || 0;
              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#FFB800] text-amber-950 shadow-2xs font-extrabold'
                      : 'bg-[#FAF6EE] text-foreground/70 hover:text-foreground border border-[#E8E2D5]'
                  }`}
                >
                  <span>{catLabel}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${active ? 'bg-amber-950/20 text-amber-950' : 'bg-stone-200/80 text-stone-700'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Bar & Reset */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E8E2D5] text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#8D6E63]">Active Filters:</span>
              {searchQuery && (
                <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold flex items-center gap-1">
                  "{searchQuery}"
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="px-2.5 py-1 rounded-lg bg-stone-200 text-stone-900 font-bold flex items-center gap-1">
                  {t.categories[selectedCategory as keyof typeof t.categories] || selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold flex items-center gap-1">
                  {statusFilter === 'proved' ? t.proved : t.unproved}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setStatusFilter('all')} />
                </span>
              )}
            </div>

            <button
              onClick={resetAllFilters}
              className="text-xs font-extrabold text-[#D32F2F] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t.resetFilters}</span>
            </button>
          </div>
        )}
      </div>

      {/* RESULTS COUNT & PAGINATION BAR HEADER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1 py-1">
        <div className="text-xs font-extrabold text-[#8D6E63] uppercase tracking-wider">
          {t.showingResults}{' '}
          <span className="text-[#292521] font-black">
            {filteredFacts.length === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1} - {Math.min(safeCurrentPage * pageSize, filteredFacts.length)}
          </span>{' '}
          {t.of} <span className="text-[#292521] font-black">{filteredFacts.length}</span> {t.factsLabel}
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center gap-2 text-xs font-bold text-foreground/80">
          <span>{currentLang === 'en' ? 'Show:' : currentLang === 'de' ? 'Anzeigen:' : 'Mostrar:'}</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="p-1.5 rounded-lg bg-white border border-[#E8E2D5] font-bold text-xs focus:ring-1 focus:ring-[#FFB800]"
          >
            <option value={12}>12 {t.perPage}</option>
            <option value={24}>24 {t.perPage}</option>
            <option value={48}>48 {t.perPage}</option>
            <option value={100}>100 {t.perPage}</option>
          </select>
        </div>
      </div>

      {/* TRIVIA CARDS GRID */}
      {filteredFacts.length === 0 ? (
        <div className="card-notebook p-12 text-center rounded-2xl bg-[#FFFDF9] border border-[#E8E2D5] space-y-4">
          <HelpCircle className="w-12 h-12 text-amber-600/50 mx-auto" />
          <h3 className="text-xl font-serif font-bold text-[#292521]">
            {currentLang === 'en' ? 'No trivia matches found' : currentLang === 'de' ? 'Keine Trivia gefunden' : 'No se encontraron curiosidades'}
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            {currentLang === 'en'
              ? 'Try clearing your search terms or selecting a different category filter.'
              : currentLang === 'de'
              ? 'Versuche andere Suchbegriffe oder wähle eine andere Kategorie.'
              : 'Prueba cambiando los términos de búsqueda o selecciona otra categoría.'}
          </p>
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 rounded-xl bg-[#FFB800] text-amber-950 text-xs font-extrabold hover:bg-amber-400 transition-colors shadow-2xs cursor-pointer"
          >
            {t.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedFacts.map((item) => {
            const isProved = item.status === 'proved';
            const IconComponent = getCategoryIcon(item.category);
            const isExpanded = expandedCardId === item.id;
            const titleText = item.title[currentLang] || item.title.es;
            const factText = item.fact[currentLang] || item.fact.es;
            const explanationText = item.explanation[currentLang] || item.explanation.es;

            return (
              <article
                key={item.id}
                className={`card-notebook p-6 rounded-2xl bg-[#FCF9F2] border transition-all flex flex-col justify-between space-y-4 shadow-xs relative overflow-hidden ${
                  isProved
                    ? 'border-emerald-300 hover:border-emerald-500'
                    : 'border-red-300 hover:border-red-500'
                }`}
              >
                {/* Top Status Bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    {/* Status Badge: Proved vs Unproved */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-2xs ${
                        isProved
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-[#D32F2F] text-white'
                      }`}
                    >
                      {isProved ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      <span>{isProved ? t.verifiedLabel : t.unverifiedLabel}</span>
                    </span>

                    {/* Category Icon */}
                    <div className="p-1.5 rounded-lg bg-[#F5E6BE] text-[#8D6E63]" title={item.category}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif-heading font-extrabold text-[#292521] leading-snug">
                    {titleText}
                  </h3>

                  {/* Fact Description */}
                  <p className="text-sm text-foreground/85 leading-relaxed font-sans">
                    {factText}
                  </p>

                  {/* Source Metadata */}
                  {item.source && (
                    <div className="text-[11px] font-bold text-[#8D6E63] flex items-center gap-1.5 pt-1">
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.sourceLabel}: {item.source}</span>
                    </div>
                  )}

                  {/* Date if applicable */}
                  {item.date && (
                    <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{currentLang === 'en' ? 'Published' : currentLang === 'de' ? 'Veröffentlicht' : 'Publicado'}: {item.date}</span>
                    </div>
                  )}
                </div>

                {/* Expandable Analysis Drawer */}
                <div className="pt-3 border-t border-[#E8E2D5] space-y-3">
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full py-2 px-3 rounded-xl bg-white border border-[#E8E2D5] text-xs font-bold text-[#8D6E63] hover:text-foreground hover:bg-[#FAF6EE] transition-all flex items-center justify-between cursor-pointer min-h-[40px]"
                  >
                    <span>{isExpanded ? t.hideAnalysis : t.showAnalysis}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#8D6E63]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8D6E63]" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className={`p-4 rounded-xl space-y-2.5 text-xs font-sans leading-relaxed border animate-fadeIn ${
                      isProved
                        ? 'bg-emerald-50/90 text-emerald-950 border-emerald-200'
                        : 'bg-red-50/90 text-red-950 border-red-200'
                    }`}>
                      <div className="font-extrabold flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                        {isProved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> : <XCircle className="w-3.5 h-3.5 text-red-700" />}
                        <span>{t.evidenceLabel}</span>
                      </div>
                      <p>{explanationText}</p>
                      {item.evidence && (
                        <div className="text-[11px] font-bold opacity-90 pt-1 border-t border-black/10">
                          📌 {item.evidence}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Connected Internal Link */}
                  {item.relatedLink && (
                    <a
                      href={getLocalizedPath(item.relatedLink.href)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8D6E63] hover:text-amber-900 transition-colors pt-1"
                    >
                      <span>{item.relatedLink.label[currentLang] || item.relatedLink.label.es}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {/* Interactive Action Bar: Like & Share */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E8E2D5] text-foreground/80 hover:text-amber-900 hover:border-amber-400 transition-all cursor-pointer min-h-[36px]"
                      title={t.didYouKnow}
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span className="font-bold">{likes[item.id] || 0}</span>
                    </button>

                    <button
                      onClick={() => handleShare(titleText)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-h-[36px]"
                      title="Compartir"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* PAGINATION CONTROLS BOTTOM BAR */}
      {totalPages > 1 && (
        <div className="card-notebook p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-xs font-extrabold text-[#8D6E63]">
            {currentLang === 'en' ? 'Page' : currentLang === 'de' ? 'Seite' : 'Página'}{' '}
            <span className="text-[#292521]">{safeCurrentPage}</span> {t.of}{' '}
            <span className="text-[#292521]">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* First Page */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={safeCurrentPage === 1}
              className="p-2 rounded-xl border border-[#E8E2D5] bg-white text-foreground/80 hover:bg-[#FAF6EE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="First Page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Prev Page */}
            <button
              onClick={() => handlePageChange(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 1}
              className="p-2 rounded-xl border border-[#E8E2D5] bg-white text-foreground/80 hover:bg-[#FAF6EE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - safeCurrentPage) <= 2)
                .map((p, idx, array) => {
                  const prevPageNum = array[idx - 1];
                  const showEllipsis = prevPageNum && p - prevPageNum > 1;

                  return (
                    <React.Fragment key={p}>
                      {showEllipsis && <span className="px-1 text-xs text-muted-foreground">...</span>}
                      <button
                        onClick={() => handlePageChange(p)}
                        className={`w-9 h-9 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          safeCurrentPage === p
                            ? 'bg-[#FFB800] text-amber-950 shadow-2xs scale-105'
                            : 'bg-white text-foreground/80 hover:bg-[#FAF6EE] border border-[#E8E2D5]'
                        }`}
                      >
                        {p}
                      </button>
                    </React.Fragment>
                  );
                })}
            </div>

            {/* Next Page */}
            <button
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              disabled={safeCurrentPage === totalPages}
              className="p-2 rounded-xl border border-[#E8E2D5] bg-white text-foreground/80 hover:bg-[#FAF6EE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Last Page */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={safeCurrentPage === totalPages}
              className="p-2 rounded-xl border border-[#E8E2D5] bg-white text-foreground/80 hover:bg-[#FAF6EE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Last Page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* INTERACTIVE FORMS SECTION */}
      <div className="pt-8 border-t border-[#E8E2D5] space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-serif-heading font-extrabold text-[#292521]">
            {currentLang === 'en' ? 'Interactive Exploration & Community Tools' : currentLang === 'de' ? 'Interaktive Erkundung & Werkzeuge' : 'Exploración Interactiva & Herramientas'}
          </h2>
          <p className="text-sm text-foreground/80 max-w-xl mx-auto">
            {currentLang === 'en' ? 'Participate in national debate polls, search recipe taxonomies, and submit new verified historical documents.' : currentLang === 'de' ? 'Nimm an Umfragen teil, durchsuche Taxonomien und reiche verifizierte Quellen ein.' : 'Participa en las encuestas nacionales, explora por taxonomías y envía nuevos documentos históricos auditados.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form 2: Official Faction Vote */}
          <div className="card-notebook p-6 rounded-2xl bg-[#FEF8EC] border border-[#F3D9B1] space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900 uppercase tracking-wider">
              <Vote className="w-4 h-4 text-[#FFB800]" />
              <span>{currentLang === 'en' ? 'The Great National Debate' : currentLang === 'de' ? 'Die Große Nationale Debatte' : 'El Gran Debate Nacional'}</span>
            </div>
            <h3 className="text-lg font-serif-heading font-bold text-[#78350F]">
              🧅 {currentLang === 'en' ? 'Declare Your Allegiance: Onion vs No Onion' : currentLang === 'de' ? 'Erkläre deine Treue: Zwiebel vs Ohne Zwiebel' : 'Declara tu Lealtad: Con Cebolla vs Sin Cebolla'}
            </h3>
            
            {voteSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{currentLang === 'en' ? 'Vote registered! CIS Community stats updated.' : currentLang === 'de' ? 'Stimme registriert! Statistik aktualisiert.' : '¡Voto registrado! Estadísticas del barómetro actualizadas.'}</span>
              </div>
            ) : (
              <form onSubmit={handleFactionVoteSubmit} className="space-y-3 text-xs font-sans">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-[#92400E]">
                    <input
                      type="radio"
                      name="faction"
                      value="concebollistas"
                      checked={factionVote === 'concebollistas'}
                      onChange={() => setFactionVote('concebollistas')}
                      className="accent-[#FFB800]"
                    />
                    <span>Concebollista — Pro-onion (70.4% CIS)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-[#78350F]">
                    <input
                      type="radio"
                      name="faction"
                      value="sincebollistas"
                      checked={factionVote === 'sincebollistas'}
                      onChange={() => setFactionVote('sincebollistas')}
                      className="accent-[#FFB800]"
                    />
                    <span>Sincebollista — Purist, potato & egg focus</span>
                  </label>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-foreground/90">
                    {currentLang === 'en' ? 'Preferred Doneness Level:' : currentLang === 'de' ? 'Bevorzugter Gargrad:' : 'Punto de Cocción Preferido:'}
                  </label>
                  <select
                    value={doneness}
                    onChange={(e) => setDoneness(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E8E2D5] font-sans text-xs focus:ring-2 focus:ring-[#FFB800]"
                  >
                    <option value="runny">Poco hecha / Runny (Betanzos style)</option>
                    <option value="creamy">Jugosa / Creamy (Classic center)</option>
                    <option value="firm">Cuajada / Fully set (Traditional picnic style)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#B45309] text-white font-bold hover:bg-[#92400E] transition-all cursor-pointer min-h-[40px]"
                >
                  {currentLang === 'en' ? 'Cast Your Vote' : currentLang === 'de' ? 'Stimme abgeben' : 'Emitir Voto'}
                </button>
              </form>
            )}
          </div>

          {/* Form 4: Submit New Verified Trivia */}
          <div className="card-notebook p-6 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#334155] uppercase tracking-wider">
              <Send className="w-4 h-4 text-[#475569]" />
              <span>{currentLang === 'en' ? 'Peer Review Submission' : currentLang === 'de' ? 'Einreichung zur Prüfung' : 'Contribución Auditada'}</span>
            </div>
            <h3 className="text-lg font-serif-heading font-bold text-[#1E293B]">
              📥 {currentLang === 'en' ? 'Submit Historical Source or Trivia' : currentLang === 'de' ? 'Historische Quelle einreichen' : 'Aportar Fuente Histórica o Curiosidad'}
            </h3>

            {submitSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{currentLang === 'en' ? 'Trivia submitted for peer review!' : currentLang === 'de' ? 'Eingereicht zur wissenschaftlichen Prüfung!' : '¡Aportación enviada para revisión científica!'}</span>
              </div>
            ) : (
              <form onSubmit={handleContributionSubmit} className="space-y-3 text-xs font-sans">
                <input
                  type="text"
                  value={submissionTitle}
                  onChange={(e) => setSubmissionTitle(e.target.value)}
                  placeholder={currentLang === 'en' ? 'Trivia Title (e.g., Document in Peru 1537)' : currentLang === 'de' ? 'Titel (z.B. Dokument in Peru 1537)' : 'Título (ej. Documento en Perú 1537)'}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#CBD5E1] text-xs focus:ring-2 focus:ring-[#FFB800]"
                  required
                />
                <select
                  value={submissionCategory}
                  onChange={(e) => setSubmissionCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#CBD5E1] text-xs focus:ring-2 focus:ring-[#FFB800]"
                >
                  <option value="history">I. Archival Discoveries & History</option>
                  <option value="science">II. Culinary Chemistry & Physics</option>
                  <option value="factions">III. Cultural Wars & Regional Styles</option>
                  <option value="pop_culture">IV. Space, Cinema & Modern Legends</option>
                </select>
                <textarea
                  value={submissionDesc}
                  onChange={(e) => setSubmissionDesc(e.target.value)}
                  rows={2}
                  placeholder={currentLang === 'en' ? 'Factual details, document year, and source citation...' : currentLang === 'de' ? 'Details, Dokumentenjahr und Quellennachweis...' : 'Detalles del hecho, año de documento y cita de fuente...'}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#CBD5E1] text-xs focus:ring-2 focus:ring-[#FFB800]"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#475569] text-white font-bold hover:bg-[#334155] transition-all cursor-pointer min-h-[40px]"
                >
                  {currentLang === 'en' ? 'Submit for Peer Review' : currentLang === 'de' ? 'Einreichen' : 'Enviar a Revisión'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
