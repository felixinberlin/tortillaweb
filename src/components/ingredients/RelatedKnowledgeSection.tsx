import React from 'react';
import LocalizedLink from '@/components/navigation/LocalizedLink';
import { Sparkles, CookingPot, Flame, Utensils, BookOpen, ChevronRight, Award } from 'lucide-react';

export interface RelatedKnowledgeItem {
  id: string;
  type: 'ingredient' | 'technique' | 'recipe' | 'history' | 'culture' | 'region' | string;
  title: string;
  description?: string;
  url: string;
  image?: string;
  badge?: string;
  relationship?: string;
}

export interface RelatedKnowledgeSectionProps {
  lang?: 'es' | 'en' | 'de' | string;
  title?: string;
  subtitle?: string;
  items: RelatedKnowledgeItem[];
}

const BADGE_CONFIG: Record<string, { label: Record<string, string>; color: string; icon: React.FC<{ className?: string }> }> = {
  ingredient: {
    label: { es: 'Ingrediente', en: 'Ingredient', de: 'Zutat' },
    color: 'bg-[#FFB800] text-[#292521]',
    icon: CookingPot,
  },
  technique: {
    label: { es: 'Técnica Culinaria', en: 'Cooking Technique', de: 'Kochtechnik' },
    color: 'bg-[#667A3D] text-white',
    icon: Flame,
  },
  recipe: {
    label: { es: 'Receta Canónica', en: 'Canonical Recipe', de: 'Kanonisches Rezept' },
    color: 'bg-[#B65D3A] text-white',
    icon: Utensils,
  },
  history: {
    label: { es: 'Historia & Cultura', en: 'History & Culture', de: 'Geschichte & Kultur' },
    color: 'bg-[#8D6E63] text-white',
    icon: BookOpen,
  },
  culture: {
    label: { es: 'Cultura & Tradición', en: 'Culture & Tradition', de: 'Kultur & Tradition' },
    color: 'bg-[#8D6E63] text-white',
    icon: BookOpen,
  },
  region: {
    label: { es: 'Región & DOP', en: 'Region & PDO', de: 'Region & PDO' },
    color: 'bg-[#D89B32] text-white',
    icon: Award,
  },
};

export default function RelatedKnowledgeSection({
  lang = 'es',
  title,
  subtitle,
  items = [],
}: RelatedKnowledgeSectionProps) {
  const currentLang = (lang === 'es' || lang === 'en' || lang === 'de') ? lang : 'es';

  const defaultTitle = {
    es: 'Conocimiento Vinculado',
    en: 'Related Tortilla Knowledge',
    de: 'Verwandtes Tortilla-Wissen',
  }[currentLang];

  const defaultSubtitle = {
    es: 'Conexiones semánticas entre ingredientes, técnicas, recetas e historia de la tortilla española',
    en: 'Semantic connections across ingredients, techniques, recipes, and history of the Spanish omelette',
    de: 'Semantische Verbindungen zwischen Zutaten, Techniken, Rezepten und Geschichte der spanischen Tortilla',
  }[currentLang];

  const sectionTitle = title || defaultTitle;
  const sectionSubtitle = subtitle || defaultSubtitle;

  if (!items || items.length === 0) return null;

  return (
    <section className="space-y-6 pt-6 border-t border-[#E8DFD1]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8DFD1] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#8D6E63] mb-1">
            <Sparkles className="w-4 h-4 text-[#FFB800]" />
            <span>Graph Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#292521]">
            {sectionTitle}
          </h2>
          <p className="text-sm text-[#8D6E63] font-sans mt-1">
            {sectionSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, idx) => {
          const badgeMeta = BADGE_CONFIG[item.type] || BADGE_CONFIG.ingredient;
          const BadgeIcon = badgeMeta.icon;
          const badgeLabel = item.badge || badgeMeta.label[currentLang] || badgeMeta.label.es;

          return (
            <div
              key={`${item.id}-${idx}`}
              className="group bg-[#FFF7EA] hover:bg-white rounded-2xl border border-[#E8DFD1] hover:border-[#D89B32] p-5 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-sans font-extrabold uppercase tracking-wide ${badgeMeta.color}`}>
                    <BadgeIcon className="w-3 h-3" />
                    <span>{badgeLabel}</span>
                  </span>
                  {item.relationship && (
                    <span className="text-[10px] font-mono text-[#8D6E63] uppercase tracking-wider bg-[#E8DFD1]/50 px-2 py-0.5 rounded">
                      {item.relationship}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-serif font-bold text-[#292521] group-hover:text-[#D89B32] transition-colors leading-snug">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-xs text-[#292521]/80 font-sans leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-2 border-t border-[#E8DFD1]/60">
                <LocalizedLink
                  to={item.url}
                  className="inline-flex items-center justify-between w-full text-xs font-bold text-[#8D6E63] group-hover:text-[#D89B32] transition-colors font-sans"
                >
                  <span>
                    {currentLang === 'es' ? 'Explorar' : currentLang === 'de' ? 'Entdecken' : 'Explore'}
                  </span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </LocalizedLink>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
