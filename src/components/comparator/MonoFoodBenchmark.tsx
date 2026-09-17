import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Flame,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Building2,
  Skull
} from 'lucide-react';
import {
  MONO_FOOD_PROJECTS,
  SEVEN_DEADLY_SINS,
  MARKETING_PILLARS,
  type MonoFoodProject
} from '@/data/monoFoodProjects';

interface MonoFoodBenchmarkProps {
  lang?: 'es' | 'en' | 'de';
}

type SortField = 'authorityScore' | 'scientificRigor' | 'digitalEngineering' | 'survivabilityIndex' | 'kitschLevel';

export function MonoFoodBenchmark({ lang = 'es' }: MonoFoodBenchmarkProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('authorityScore');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [expandedId, setExpandedId] = useState<string>('tortilladepatatas-org');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const t = {
    searchPlaceholder:
      lang === 'es'
        ? 'Buscar por plato, museo, ciudad o institución...'
        : lang === 'de'
        ? 'Nach Gericht, Museum, Stadt oder Projekt suchen...'
        : 'Search by dish, museum, city, or institution...',
    filterAll: lang === 'es' ? 'Todos los Proyectos' : lang === 'de' ? 'Alle Projekte' : 'All Projects',
    filterDigital: lang === 'es' ? 'Grafos Digitales' : lang === 'de' ? 'Digitale Graphen' : 'Digital Graphs',
    filterMuseum: lang === 'es' ? 'Museos Físicos' : lang === 'de' ? 'Physische Museen' : 'Physical Museums',
    filterGuild: lang === 'es' ? 'Gremios & Ley' : lang === 'de' ? 'Gilden & Recht' : 'Guilds & Law',
    filterArchive: lang === 'es' ? 'Memorabilia Pop' : lang === 'de' ? 'Pop-Archive' : 'Pop Archives',
    sortBy: lang === 'es' ? 'Ordenar por:' : lang === 'de' ? 'Sortieren nach:' : 'Sort by:',
    score: lang === 'es' ? 'Puntuación Global' : lang === 'de' ? 'Gesamt-Score' : 'Authority Score',
    science: lang === 'es' ? 'Rigor Científico' : lang === 'de' ? 'Wiss. Exaktheit' : 'Scientific Rigor',
    digital: lang === 'es' ? 'Ingeniería Digital' : lang === 'de' ? 'Digitale Reife' : 'Digital Engineering',
    survival: lang === 'es' ? 'Supervivencia' : lang === 'de' ? 'Beständigkeit' : 'Survivability',
    kitsch: lang === 'es' ? 'Nivel Kitsch' : lang === 'de' ? 'Kitschfaktor' : 'Kitsch Level',
    spicyRoast: lang === 'es' ? 'Veredicto Ácido & Análisis' : lang === 'de' ? 'Scharfes Urteil & Analyse' : 'The Spicy Roast & Verdict',
    learned: lang === 'es' ? 'Qué Aprendimos de Ellos' : lang === 'de' ? 'Was wir daraus gelernt haben' : 'What We Learned From Them',
    strengths: lang === 'es' ? 'Puntos Fuertes' : lang === 'de' ? 'Stärken' : 'Key Strengths',
    flaws: lang === 'es' ? 'Fallas & Vulnerabilidades' : lang === 'de' ? 'Schwachstellen & Risiken' : 'Vulnerabilities',
    copyDossier: lang === 'es' ? 'Copiar Cita y Métricas' : lang === 'de' ? 'Zitat & Metriken kopieren' : 'Copy Quote & Metrics',
    copied: lang === 'es' ? '¡Copiado!' : lang === 'de' ? 'Kopiert!' : 'Copied!',
    statusLabel: lang === 'es' ? 'Estado' : lang === 'de' ? 'Status' : 'Status',
    founded: lang === 'es' ? 'Fundación' : lang === 'de' ? 'Gegründet' : 'Founded',
    location: lang === 'es' ? 'Origen' : lang === 'de' ? 'Standort' : 'Location',
    viewSite: lang === 'es' ? 'Sitio Oficial' : lang === 'de' ? 'Offizielle Website' : 'Official Website',
    benchmarkBadge: lang === 'es' ? 'REFERENCIA MUNDIAL' : lang === 'de' ? 'WELTWEITER BENCHMARK' : 'GLOBAL BENCHMARK',
    activeCount: lang === 'es' ? 'proyectos analizados' : lang === 'de' ? 'Projekte analysiert' : 'projects analyzed',
  };

  const filteredProjects = useMemo(() => {
    return MONO_FOOD_PROJECTS.filter((p) => {
      // Filter category
      if (activeFilter === 'digital' && p.format !== 'digital_knowledge_graph') return false;
      if (activeFilter === 'museum' && p.format !== 'physical_museum') return false;
      if (activeFilter === 'guild' && p.format !== 'regulatory_guild') return false;
      if (activeFilter === 'archive' && p.format !== 'pop_archive') return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const dishText = (p.dish[lang] || p.dish.es).toLowerCase();
      const nameText = p.name.toLowerCase();
      const locText = p.originLocation.toLowerCase();
      const verdict = (p.spicyVerdict[lang] || p.spicyVerdict.es).toLowerCase();
      return dishText.includes(q) || nameText.includes(q) || locText.includes(q) || verdict.includes(q);
    }).sort((a, b) => {
      let valA = a.authorityScore;
      let valB = b.authorityScore;

      if (sortField === 'scientificRigor') {
        valA = a.metrics.scientificRigor;
        valB = b.metrics.scientificRigor;
      } else if (sortField === 'digitalEngineering') {
        valA = a.metrics.digitalEngineering;
        valB = b.metrics.digitalEngineering;
      } else if (sortField === 'survivabilityIndex') {
        valA = a.metrics.survivabilityIndex;
        valB = b.metrics.survivabilityIndex;
      } else if (sortField === 'kitschLevel') {
        valA = a.metrics.kitschLevel;
        valB = b.metrics.kitschLevel;
      }

      if (sortField === 'kitschLevel') {
        // For kitsch, lowest is best unless user toggled ascending
        return sortAsc ? valA - valB : valB - valA;
      }

      return sortAsc ? valA - valB : valB - valA;
    });
  }, [activeFilter, searchQuery, sortField, sortAsc, lang]);

  const copyToClipboard = (project: MonoFoodProject) => {
    const text = `[Mono-Food Benchmark] ${project.name} (${project.dish[lang] || project.dish.es})
Score: ${project.authorityScore}/100 | Science: ${project.metrics.scientificRigor}/100 | Tech: ${project.metrics.digitalEngineering}/100
Verdict: "${project.spicyVerdict[lang] || project.spicyVerdict.es}"
Source: tortilladepatatas.org/mono-food`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(project.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  return (
    <div className="w-full space-y-10" id="mono-food-comparator">
      {/* Control Bar: Search & Filter Tabs */}
      <div className="bg-[#FAF4E8] dark:bg-[#1C1613] p-6 rounded-2xl border-2 border-[#8D6E63]/20 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D6E63]" />
            <input
              type="text"
              id="mono-food-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#251D18] border border-[#8D6E63]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB800] text-[#3E2723] dark:text-[#F5E6BE]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8D6E63] hover:text-[#3E2723] p-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#8D6E63] whitespace-nowrap">{t.sortBy}</span>
            <select
              id="mono-food-sort-select"
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="px-3 py-2 bg-white dark:bg-[#251D18] border border-[#8D6E63]/30 rounded-xl text-xs font-semibold text-[#3E2723] dark:text-[#F5E6BE] focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
            >
              <option value="authorityScore">{t.score}</option>
              <option value="scientificRigor">{t.science}</option>
              <option value="digitalEngineering">{t.digital}</option>
              <option value="survivabilityIndex">{t.survival}</option>
              <option value="kitschLevel">{t.kitsch}</option>
            </select>
            <button
              onClick={() => setSortAsc(!sortAsc)}
              id="mono-food-sort-direction-btn"
              className="px-2.5 py-2 bg-white dark:bg-[#251D18] border border-[#8D6E63]/30 rounded-xl text-xs font-bold text-[#8D6E63] hover:text-[#3E2723]"
              title={sortAsc ? 'Ascending' : 'Descending'}
              aria-label="Toggle sort order"
            >
              {sortAsc ? '▲' : '▼'}
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#8D6E63]/15">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'digital', label: t.filterDigital },
            { id: 'museum', label: t.filterMuseum },
            { id: 'guild', label: t.filterGuild },
            { id: 'archive', label: t.filterArchive },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`filter-pill-${tab.id}`}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === tab.id
                  ? 'bg-[#FFB800] text-[#3E2723] shadow-xs'
                  : 'bg-white dark:bg-[#251D18] text-[#8D6E63] border border-[#8D6E63]/25 hover:border-[#FFB800]'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <span className="ml-auto self-center text-xs font-medium text-[#8D6E63]">
            {filteredProjects.length} {t.activeCount}
          </span>
        </div>
      </div>

      {/* Grid of Mono-Food Institutions */}
      <div className="grid grid-cols-1 gap-6">
        {filteredProjects.map((project) => {
          const isExpanded = expandedId === project.id;
          const isWinner = project.id === 'tortilladepatatas-org';
          const dishName = project.dish[lang] || project.dish.es;
          const formatText = project.formatLabel[lang] || project.formatLabel.es;
          const statusText = project.statusLabel[lang] || project.statusLabel.es;
          const verdictText = project.spicyVerdict[lang] || project.spicyVerdict.es;
          const learnedText = project.whatWeLearned[lang] || project.whatWeLearned.es;
          const quoteText = project.keyQuote[lang] || project.keyQuote.es;
          const strengths = project.keyStrengths[lang] || project.keyStrengths.es;
          const flaws = project.keyWeaknesses[lang] || project.keyWeaknesses.es;

          return (
            <article
              key={project.id}
              id={`project-card-${project.id}`}
              className={`relative rounded-2xl transition-all duration-200 overflow-hidden ${
                isWinner
                  ? 'bg-[#FFFDF9] dark:bg-[#1E1714] border-3 border-[#FFB800] shadow-md ring-4 ring-[#FFB800]/15'
                  : project.status === 'defunct'
                  ? 'bg-[#F9F7F5] dark:bg-[#161210] border border-[#8D6E63]/25 opacity-95'
                  : 'bg-[#FAF4E8] dark:bg-[#1A1412] border border-[#8D6E63]/30 shadow-xs hover:border-[#FFB800]/60'
              }`}
            >
              {/* Top Banner for Winner */}
              {isWinner && (
                <div className="bg-[#FFB800] px-4 py-1.5 text-xs font-black tracking-wider text-[#3E2723] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" />
                    {t.benchmarkBadge}
                  </span>
                  <span className="text-[11px] font-bold">#1 DE 11 MONUMENTOS CULINARIOS</span>
                </div>
              )}

              {/* Card Header & Summary Bar */}
              <div className="p-5 md:p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl md:text-2xl font-black font-serif text-[#3E2723] dark:text-[#FAF4E8]">
                        {project.name}
                      </h3>
                      {project.status === 'defunct' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#B00020]/15 text-[#B00020] border border-[#B00020]/30">
                          <Skull className="w-3 h-3" />
                          {statusText}
                        </span>
                      )}
                      {project.status === 'active' && !isWinner && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#2E7D32]/15 text-[#2E7D32] border border-[#2E7D32]/30">
                          <CheckCircle2 className="w-3 h-3" />
                          {statusText}
                        </span>
                      )}
                      {project.status === 'pop_up' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#00A3FF]/15 text-[#00A3FF] border border-[#00A3FF]/30">
                          <Building2 className="w-3 h-3" />
                          {statusText}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-[#8D6E63] dark:text-[#D7CCC8]">
                      {dishName} • <span className="text-xs opacity-80">{project.originLocation}</span>
                    </p>
                    <span className="inline-block text-[11px] font-mono text-[#8D6E63] dark:text-[#F5E6BE] bg-[#8D6E63]/10 px-2 py-0.5 rounded-md">
                      {formatText} ({project.foundedYear})
                    </span>
                  </div>

                  {/* Score & Quick Metric Callout */}
                  <div className="flex items-center gap-4 self-start md:self-center">
                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-black font-mono text-[#3E2723] dark:text-[#FFB800]">
                        {project.authorityScore}
                        <span className="text-xs font-normal text-[#8D6E63]">/100</span>
                      </div>
                      <div className="text-[10px] uppercase tracking-wider font-bold text-[#8D6E63]">
                        {t.score}
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedId(isExpanded ? '' : project.id)}
                      id={`expand-btn-${project.id}`}
                      className="p-2 rounded-xl bg-white dark:bg-[#251D18] border border-[#8D6E63]/30 text-[#3E2723] dark:text-[#FAF4E8] hover:bg-[#FFB800]/20 transition-colors"
                      aria-label={isExpanded ? 'Collapse card' : 'Expand card'}
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Spicy Verdict Teaser */}
                <div className="p-3.5 bg-white/70 dark:bg-[#251D18]/70 rounded-xl border border-[#8D6E63]/15 text-sm text-[#3E2723] dark:text-[#F5E6BE] leading-relaxed">
                  <span className="font-bold text-[#8D6E63] dark:text-[#FFB800] mr-1.5">
                    {t.spicyRoast}:
                  </span>
                  {verdictText}
                </div>

                {/* Metrics Mini-Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                  <div className="p-2 bg-white/50 dark:bg-[#251D18]/50 rounded-lg border border-[#8D6E63]/10">
                    <span className="text-[10px] uppercase font-bold text-[#8D6E63] block">{t.science}</span>
                    <span className="font-mono font-bold text-sm text-[#3E2723] dark:text-[#F5E6BE]">
                      {project.metrics.scientificRigor}%
                    </span>
                  </div>
                  <div className="p-2 bg-white/50 dark:bg-[#251D18]/50 rounded-lg border border-[#8D6E63]/10">
                    <span className="text-[10px] uppercase font-bold text-[#8D6E63] block">{t.digital}</span>
                    <span className="font-mono font-bold text-sm text-[#3E2723] dark:text-[#F5E6BE]">
                      {project.metrics.digitalEngineering}%
                    </span>
                  </div>
                  <div className="p-2 bg-white/50 dark:bg-[#251D18]/50 rounded-lg border border-[#8D6E63]/10">
                    <span className="text-[10px] uppercase font-bold text-[#8D6E63] block">{t.kitsch}</span>
                    <span className="font-mono font-bold text-sm text-[#3E2723] dark:text-[#F5E6BE]">
                      {project.metrics.kitschLevel}%
                    </span>
                  </div>
                  <div className="p-2 bg-white/50 dark:bg-[#251D18]/50 rounded-lg border border-[#8D6E63]/10">
                    <span className="text-[10px] uppercase font-bold text-[#8D6E63] block">{t.survival}</span>
                    <span className="font-mono font-bold text-sm text-[#3E2723] dark:text-[#F5E6BE]">
                      {project.metrics.survivabilityIndex}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Technical Dossier */}
              {isExpanded && (
                <div className="px-5 pb-6 md:px-6 md:pb-6 pt-2 border-t border-[#8D6E63]/20 space-y-6 bg-[#FAF4E8]/50 dark:bg-[#1C1613]/80">
                  {/* Quote Banner */}
                  {quoteText && (
                    <blockquote className="p-4 rounded-xl bg-white dark:bg-[#251D18] border-l-4 border-[#FFB800] text-sm italic font-serif text-[#3E2723] dark:text-[#FAF4E8]">
                      {quoteText}
                    </blockquote>
                  )}

                  {/* Strengths vs Flaws Split */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="p-4 bg-white dark:bg-[#251D18] rounded-xl border border-[#8D6E63]/15 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#2E7D32] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        {t.strengths}
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#3E2723] dark:text-[#D7CCC8]">
                        {strengths.map((str, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-[#2E7D32] font-bold">✓</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Vulnerabilities / Flaws */}
                    <div className="p-4 bg-white dark:bg-[#251D18] rounded-xl border border-[#8D6E63]/15 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#B00020] flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" />
                        {t.flaws}
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#3E2723] dark:text-[#D7CCC8]">
                        {flaws.map((flaw, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-[#B00020] font-bold">✗</span>
                            <span>{flaw}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* What We Learned */}
                  <div className="p-4 bg-white dark:bg-[#251D18] rounded-xl border border-[#8D6E63]/20 space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00A3FF] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {t.learned}:
                    </span>
                    <p className="text-xs text-[#3E2723] dark:text-[#FAF4E8] leading-relaxed">
                      {learnedText}
                    </p>
                  </div>

                  {/* Footer Actions: Copy Dossier & External Link */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(project)}
                        id={`copy-dossier-btn-${project.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#251D18] border border-[#8D6E63]/30 rounded-lg text-xs font-bold text-[#8D6E63] hover:text-[#3E2723] dark:hover:text-white transition-colors"
                      >
                        {copiedId === project.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                            <span className="text-[#2E7D32]">{t.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{t.copyDossier}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {project.officialUrl && (
                      <a
                        href={project.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#00A3FF] hover:underline"
                      >
                        <span>{t.viewSite}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* The Seven Deadly Sins Section */}
      <section className="bg-[#FAF4E8] dark:bg-[#1C1613] p-6 md:p-8 rounded-2xl border-2 border-[#8D6E63]/20 space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#B00020]/15 text-[#B00020] text-xs font-bold">
            <Flame className="w-3.5 h-3.5" />
            <span>ANÁLISIS EDITORIAL SIN CENSURA</span>
          </div>
          <h3 className="text-2xl font-black font-serif text-[#3E2723] dark:text-[#FAF4E8]">
            {lang === 'es'
              ? 'Los 7 Pecados Capitales de las Webs y Museos de Comida'
              : lang === 'de'
              ? 'Die 7 Todsünden von Food-Websites & Museen'
              : 'The 7 Deadly Sins of Food Websites & Mono-Museums'}
          </h3>
          <p className="text-sm text-[#8D6E63] dark:text-[#D7CCC8]">
            {lang === 'es'
              ? 'Por qué el 90% de los sitios de recetas son un vertedero de anuncios y los museos físicos quiebran en 5 años.'
              : lang === 'de'
              ? 'Warum 90% aller Rezeptseiten Werbemüll sind und physische Food-Museen nach 5 Jahren schließen.'
              : 'Why 90% of recipe websites are toxic ad-farms and physical novelty museums shutter in 5 years.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SEVEN_DEADLY_SINS.map((sin) => {
            const title = sin.title[lang] || sin.title.es;
            const crime = sin.crime[lang] || sin.crime.es;
            const roast = sin.spicyRoast[lang] || sin.spicyRoast.es;
            const counter = sin.ourCountermeasure[lang] || sin.ourCountermeasure.es;

            return (
              <div
                key={sin.number}
                className="p-5 bg-white dark:bg-[#251D18] rounded-xl border border-[#8D6E63]/20 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#B00020] text-white text-xs font-black flex items-center justify-center font-mono">
                    {sin.number}
                  </span>
                  <h4 className="text-sm font-bold text-[#3E2723] dark:text-[#FAF4E8]">
                    {title}
                  </h4>
                </div>

                <div className="text-xs space-y-2 text-[#3E2723] dark:text-[#D7CCC8]">
                  <p>
                    <strong className="text-[#B00020]">El Delito:</strong> {crime}
                  </p>
                  <p className="italic text-[#8D6E63] dark:text-[#F5E6BE] bg-[#FAF4E8]/60 dark:bg-[#1A1412] p-2.5 rounded-lg border border-[#8D6E63]/10">
                    «{roast}»
                  </p>
                  <p className="text-[#2E7D32] dark:text-[#84CC16]">
                    <strong>Nuestro Antídoto:</strong> {counter}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Future Marketing & Strategic Pillars */}
      <section className="bg-gradient-to-br from-[#FAF4E8] to-[#F5E6BE]/40 dark:from-[#1C1613] dark:to-[#2A1F18] p-6 md:p-8 rounded-2xl border-2 border-[#FFB800]/40 space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold">
            <Trophy className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>ESTRATEGIA & FUTURO DEL GRAFO CULINARIO</span>
          </div>
          <h3 className="text-2xl font-black font-serif text-[#3E2723] dark:text-[#FAF4E8]">
            {lang === 'es'
              ? 'Por Qué el Futuro Pertenece a las Webs Monotemáticas Profundas'
              : lang === 'de'
              ? 'Warum die Zukunft tiefen Monokultur-Wissensgraphen gehört'
              : 'Why the Future Belongs to Deep Mono-Subject Knowledge Graphs'}
          </h3>
          <p className="text-sm text-[#8D6E63] dark:text-[#D7CCC8]">
            {lang === 'es'
              ? 'El modelo de AllRecipes y las granjas de contenido ha muerto. La IA y los motores de búsqueda premian la autoridad hipervertical.'
              : lang === 'de'
              ? 'Das Zeitalter generischer Rezept-Netzwerke ist vorbei. Suchmaschinen und LLMs belohnen hypervertikale Tiefe.'
              : 'The era of 40,000-recipe scraping portals is over. Search engines and AI models reward hyper-vertical subject authority.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MARKETING_PILLARS.map((pillar) => {
            const title = pillar.title[lang] || pillar.title.es;
            const subtitle = pillar.subtitle[lang] || pillar.subtitle.es;
            const desc = pillar.description[lang] || pillar.description.es;
            const action = pillar.actionLabel[lang] || pillar.actionLabel.es;

            return (
              <div
                key={pillar.id}
                className="p-5 bg-white dark:bg-[#251D18] rounded-xl border border-[#8D6E63]/20 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <h4 className="text-base font-black font-serif text-[#3E2723] dark:text-[#FFB800]">
                    {title}
                  </h4>
                  <p className="text-xs font-bold text-[#8D6E63]">
                    {subtitle}
                  </p>
                  <p className="text-xs text-[#3E2723] dark:text-[#D7CCC8] leading-relaxed">
                    {desc}
                  </p>
                </div>

                <a
                  href={`/${lang}${pillar.href}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FFB800] text-[#3E2723] text-xs font-black hover:bg-[#FFA000] transition-colors"
                >
                  <span>{action}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
export default MonoFoodBenchmark;
