import React, { useState, useMemo } from 'react';
import { 
  Play, 
  Clock, 
  Flame, 
  Users, 
  History, 
  FlaskConical, 
  Sparkles, 
  Search, 
  X, 
  Film, 
  ChefHat, 
  ExternalLink
} from 'lucide-react';

export interface VideoItem {
  id: string;
  title: {
    es: string;
    en: string;
    de: string;
  };
  description: {
    es: string;
    en: string;
    de: string;
  };
  videoId?: string;
  thumbnailUrl?: string;
  duration?: number; // duration in seconds
  lang?: 'es' | 'en' | 'de';
  category: 'technique' | 'interview' | 'history' | 'science';
  relatedRecipeIds?: string[];
  publishedAt?: string | Date;
}

interface VideoGridProps {
  videos: VideoItem[];
  lang?: 'es' | 'en' | 'de';
}

export default function VideoGrid({ videos = [], lang = 'es' }: VideoGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);

  // Format seconds to mm:ss or hh:mm:ss
  const formatDuration = (seconds?: number): string => {
    if (!seconds || seconds <= 0) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    if (mins >= 60) {
      const hrs = Math.floor(mins / 60);
      const remMins = mins % 60;
      return `${hrs}:${pad(remMins)}:${pad(secs)} min`;
    }
    return `${mins}:${pad(secs)} min`;
  };

  const getCategoryConfig = (cat: string) => {
    switch (cat) {
      case 'technique':
        return {
          label: {
            es: 'Técnica',
            en: 'Technique',
            de: 'Technik',
          }[lang],
          badgeColor: 'bg-[#FFB800]/20 text-[#8D6E63] border-[#FFB800]/40 dark:bg-[#FFB800]/20 dark:text-[#FFB800]',
          icon: Flame,
        };
      case 'interview':
        return {
          label: {
            es: 'Entrevista',
            en: 'Interview',
            de: 'Interview',
          }[lang],
          badgeColor: 'bg-[#8D6E63]/15 text-[#6D4C41] border-[#8D6E63]/30 dark:bg-[#8D6E63]/30 dark:text-[#F5E6BE]',
          icon: Users,
        };
      case 'history':
        return {
          label: {
            es: 'Historia',
            en: 'History',
            de: 'Geschichte',
          }[lang],
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200',
          icon: History,
        };
      case 'science':
        return {
          label: {
            es: 'Ciencia',
            en: 'Science',
            de: 'Wissenschaft',
          }[lang],
          badgeColor: 'bg-[#2E7D32]/15 text-[#2E7D32] border-[#2E7D32]/30 dark:bg-[#2E7D32]/30 dark:text-[#81C784]',
          icon: FlaskConical,
        };
      default:
        return {
          label: cat,
          badgeColor: 'bg-muted text-foreground border-border',
          icon: Film,
        };
    }
  };

  const categories = [
    { id: 'all', label: { es: 'Todos los vídeos', en: 'All Videos', de: 'Alle Videos' }[lang] },
    { id: 'technique', label: { es: 'Técnicas', en: 'Techniques', de: 'Techniken' }[lang], icon: Flame },
    { id: 'interview', label: { es: 'Entrevistas', en: 'Interviews', de: 'Interviews' }[lang], icon: Users },
    { id: 'history', label: { es: 'Historia', en: 'History', de: 'Geschichte' }[lang], icon: History },
    { id: 'science', label: { es: 'Ciencia', en: 'Science', de: 'Wissenschaft' }[lang], icon: FlaskConical },
  ];

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      const title = video.title[lang] || video.title.es || '';
      const desc = video.description[lang] || video.description.es || '';
      const matchesSearch =
        !searchQuery.trim() ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [videos, selectedCategory, searchQuery, lang]);

  const labels = {
    es: {
      searchPlaceholder: 'Buscar por técnica, chef o palabra clave...',
      watchVideo: 'Ver vídeo',
      comingSoon: 'Próximamente',
      inProduction: 'En producción 4K',
      productionNotice: 'Masterclass en rodaje',
      productionDetails: 'Este contenido audiovisual está siendo producido en alta resolución junto a maestros tortilleros de referencia.',
      relatedRecipes: 'Recetas vinculadas:',
      noResults: 'No se encontraron vídeos que coincidan con la búsqueda.',
      resetFilters: 'Restablecer filtros',
      close: 'Cerrar ventana',
      duration: 'Duración',
      category: 'Categoría',
      notifyMe: 'Notificarme del estreno',
      channelBadge: 'Producción Audiovisual Oficial',
    },
    en: {
      searchPlaceholder: 'Search by technique, chef or keyword...',
      watchVideo: 'Watch Video',
      comingSoon: 'Coming Soon',
      inProduction: 'In 4K Production',
      productionNotice: 'Masterclass in filming',
      productionDetails: 'This audiovisual piece is currently in 4K production featuring master Spanish tortilla chefs and researchers.',
      relatedRecipes: 'Linked recipes:',
      noResults: 'No videos match your search criteria.',
      resetFilters: 'Reset filters',
      close: 'Close window',
      duration: 'Duration',
      category: 'Category',
      notifyMe: 'Notify me when ready',
      channelBadge: 'Official Video Library',
    },
    de: {
      searchPlaceholder: 'Nach Technik, Koch oder Stichwort suchen...',
      watchVideo: 'Video ansehen',
      comingSoon: 'Demnächst',
      inProduction: 'In 4K Produktion',
      productionNotice: 'Meisterklasse in Produktion',
      productionDetails: 'Dieses Video wird derzeit in hochauflösendem 4K mit Spitzenköchen und Gastronomieforschern produziert.',
      relatedRecipes: 'Verwandte Rezepte:',
      noResults: 'Keine Videos gefunden, die den Kriterien entsprechen.',
      resetFilters: 'Filter zurücksetzen',
      close: 'Fenster schließen',
      duration: 'Dauer',
      category: 'Kategorie',
      notifyMe: 'Bei Veröffentlichung benachrichtigen',
      channelBadge: 'Offizielle Videoproduktion',
    },
  }[lang];

  return (
    <div className="space-y-8">
      {/* Control Bar: Categories Filter & Search Box */}
      <div className="bg-[#FAF6EE] dark:bg-[#262220] p-4 sm:p-5 rounded-2xl border border-[#E8E2D5] dark:border-[#3D352E] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              const Icon = cat.icon;
              const count = cat.id === 'all' 
                ? videos.length 
                : videos.filter((v) => v.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border ${
                    active
                      ? 'bg-[#8D6E63] text-white border-[#8D6E63] shadow-2xs'
                      : 'bg-white dark:bg-[#1C1917] text-foreground/80 dark:text-[#F5E6BE]/80 border-[#E8E2D5] dark:border-[#3D352E] hover:bg-[#F5E6BE]/60 dark:hover:bg-[#3D332A]'
                  }`}
                  aria-pressed={active}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#FFB800]' : 'opacity-70'}`} />}
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-white/20 text-white' : 'bg-amber-100 dark:bg-[#3D332A] text-[#8D6E63] dark:text-[#FFB800]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 bg-white dark:bg-[#1C1917] text-foreground dark:text-[#F5E6BE] text-xs sm:text-sm rounded-xl border border-[#E8E2D5] dark:border-[#3D352E] focus:outline-none focus:ring-2 focus:ring-[#FFB800]/60 placeholder:text-muted-foreground/70"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Video Gallery Grid */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-16 px-4 card-notebook bg-[#FCF9F2] dark:bg-[#1C1917] border border-[#E8E2D5] dark:border-[#3D352E] rounded-2xl shadow-sm space-y-3">
          <Film className="w-10 h-10 text-muted-foreground mx-auto opacity-50" />
          <h3 className="font-serif-heading font-bold text-lg text-foreground dark:text-[#F5E6BE]">
            {labels.noResults}
          </h3>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#8D6E63] text-white text-xs font-bold rounded-xl hover:bg-[#6D4C41] transition-colors cursor-pointer shadow-2xs"
          >
            {labels.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video) => {
            const catConfig = getCategoryConfig(video.category);
            const CatIcon = catConfig.icon;
            const title = video.title[lang] || video.title.es;
            const desc = video.description[lang] || video.description.es;
            const durationLabel = formatDuration(video.duration);
            const hasVideoId = Boolean(video.videoId && video.videoId.trim() !== '');

            return (
              <article
                key={video.id}
                className="card-notebook bg-[#FCF9F2] dark:bg-[#201C19] border border-[#E8E2D5] dark:border-[#3D352E] rounded-2xl overflow-hidden shadow-stacked-parchment hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Video Thumbnail with Badges & Play Icon Overlay */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#2D2724]">
                    {video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#8D6E63] to-[#4A3B32] flex items-center justify-center">
                        <Film className="w-12 h-12 text-[#F5E6BE]/40" />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Category Tag (Top-Left) */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-2xs ${catConfig.badgeColor}`}>
                        <CatIcon className="w-3 h-3" />
                        <span>{catConfig.label}</span>
                      </span>
                    </div>

                    {/* Duration Badge (Bottom-Right) */}
                    {durationLabel && (
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white backdrop-blur-xs px-2 py-0.5 rounded-md text-[11px] font-mono font-bold flex items-center gap-1 border border-white/10 shadow-2xs">
                        <Clock className="w-3 h-3 text-[#FFB800]" />
                        <span>{durationLabel}</span>
                      </div>
                    )}

                    {/* Play / Coming Soon Icon Button */}
                    <button
                      onClick={() => setActiveModalVideo(video)}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer group/btn"
                      aria-label={hasVideoId ? labels.watchVideo : labels.comingSoon}
                    >
                      <div className={`p-3.5 rounded-full transition-transform duration-300 shadow-xl flex items-center justify-center ${
                        hasVideoId 
                          ? 'bg-[#FFB800] text-[#1C1917] group-hover/btn:scale-115' 
                          : 'bg-black/60 text-[#FFB800] border border-[#FFB800]/40 backdrop-blur-sm group-hover/btn:scale-110'
                      }`}>
                        {hasVideoId ? (
                          <Play className="w-6 h-6 fill-current translate-x-0.5" />
                        ) : (
                          <Sparkles className="w-5 h-5" />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="font-serif-heading font-bold text-lg sm:text-xl text-foreground dark:text-[#F5E6BE] leading-snug group-hover:text-amber-600 dark:group-hover:text-[#FFB800] transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {desc}
                    </p>

                    {/* Related Recipes Tags */}
                    {video.relatedRecipeIds && video.relatedRecipeIds.length > 0 && (
                      <div className="pt-2 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                          <ChefHat className="w-3 h-3 text-[#FFB800]" />
                          {labels.relatedRecipes}
                        </span>
                        {video.relatedRecipeIds.map((rId) => (
                          <a
                            key={rId}
                            href={`/${lang}/recipes/${rId}`}
                            className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#F5E6BE]/60 dark:bg-[#3D332A] text-[#8D6E63] dark:text-[#F5E6BE] hover:bg-[#FFB800] hover:text-white transition-colors"
                          >
                            #{rId}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 sm:p-6 pt-0 border-t border-[#E8E2D5]/50 dark:border-[#3D352E]/50 mt-2">
                  <button
                    onClick={() => setActiveModalVideo(video)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs ${
                      hasVideoId
                        ? 'bg-[#8D6E63] text-white hover:bg-[#6D4C41]'
                        : 'bg-[#FAF6EE] dark:bg-[#2B2521] text-[#8D6E63] dark:text-[#FFB800] border border-amber-300/60 dark:border-[#FFB800]/30 hover:bg-[#F5E6BE] dark:hover:bg-[#3D332A]'
                    }`}
                  >
                    {hasVideoId ? (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>{labels.watchVideo}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                        <span>{labels.comingSoon} ({labels.inProduction})</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Interactive Video Detail & Production Preview Modal */}
      {activeModalVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="card-notebook bg-[#FCF9F2] dark:bg-[#1C1917] border-2 border-[#FFB800] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalVideo(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/10 dark:bg-white/10 text-foreground hover:bg-amber-200 dark:hover:bg-[#3D332A] transition-colors cursor-pointer"
              aria-label={labels.close}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player or In-Production Feature Showcase */}
            {activeModalVideo.videoId ? (
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-black/20">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeModalVideo.videoId}?autoplay=1`}
                  title={activeModalVideo.title[lang] || activeModalVideo.title.es}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-inner border border-[#E8E2D5] dark:border-[#3D352E]">
                {activeModalVideo.thumbnailUrl && (
                  <img
                    src={activeModalVideo.thumbnailUrl}
                    alt=""
                    className="w-full h-full object-cover filter blur-[2px] brightness-50"
                  />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                  <div className="p-3 rounded-2xl bg-[#FFB800] text-[#1C1917] shadow-lg">
                    <Film className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FFB800] bg-black/60 px-3 py-1 rounded-full border border-[#FFB800]/40">
                    {labels.productionNotice}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-serif-heading font-extrabold max-w-lg leading-tight">
                    {activeModalVideo.title[lang] || activeModalVideo.title.es}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-200 max-w-md">
                    {labels.productionDetails}
                  </p>
                </div>
              </div>
            )}

            {/* Modal Metadata & Description */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E2D5] dark:border-[#3D352E] pb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getCategoryConfig(activeModalVideo.category).badgeColor}`}>
                  {getCategoryConfig(activeModalVideo.category).label}
                </span>
                {activeModalVideo.duration && (
                  <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#FFB800]" />
                    {labels.duration}: {formatDuration(activeModalVideo.duration)}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-serif-heading font-bold text-foreground dark:text-[#F5E6BE]">
                  {activeModalVideo.title[lang] || activeModalVideo.title.es}
                </h3>
                <p className="text-sm text-foreground/90 dark:text-[#F5E6BE]/90 leading-relaxed">
                  {activeModalVideo.description[lang] || activeModalVideo.description.es}
                </p>
              </div>

              {/* Related Recipes Section in Modal */}
              {activeModalVideo.relatedRecipeIds && activeModalVideo.relatedRecipeIds.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[#FAF6EE] dark:bg-[#25201D] border border-[#E8E2D5] dark:border-[#3D352E] space-y-2">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <ChefHat className="w-4 h-4 text-[#FFB800]" />
                    {labels.relatedRecipes}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeModalVideo.relatedRecipeIds.map((rId) => (
                      <a
                        key={rId}
                        href={`/${lang}/recipes/${rId}`}
                        className="text-xs font-bold px-3 py-1 rounded-lg bg-[#8D6E63] text-white hover:bg-[#6D4C41] transition-colors inline-flex items-center gap-1 shadow-2xs"
                      >
                        <span>Receta {rId}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModalVideo(null)}
                className="px-5 py-2 rounded-xl bg-[#8D6E63] text-white text-xs font-bold hover:bg-[#6D4C41] transition-colors cursor-pointer shadow-2xs"
              >
                {labels.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
