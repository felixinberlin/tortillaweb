import React, { useState } from 'react';
import { ChefHat, Check, Flame, Sparkles, Eye, EyeOff } from 'lucide-react';

export interface StepItem {
  step: string;
  text: string;
}

export interface RecipeStepsViewProps {
  instructions: StepItem[];
  lang: string;
  recipeTime?: number;
}

export const RecipeStepsView: React.FC<RecipeStepsViewProps> = ({
  instructions,
  lang,
  recipeTime: _recipeTime = 35,
}) => {
  const isEs = lang.startsWith('es');
  const isDe = lang.startsWith('de');

  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [cookMode, setCookMode] = useState(false);

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const totalCompleted = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = instructions.length > 0 ? Math.round((totalCompleted / instructions.length) * 100) : 0;

  // Format text to highlight critical temperatures and times
  const highlightKeyFigures = (text: string) => {
    const parts = text.split(/(70°C\s*por\s*2\s*minutos|70°C\s*for\s*2\s*minutes|70°C\s*für\s*2\s*Minuten|70°C|63°C\s*por\s*20\s*segundos|63°C\s*for\s*20\s*seconds|63°C|2\s*minutos|2\s*minutes|2\s*Minuten|20\s*segundos|20\s*seconds|4\s*horas|4\s*hours|4\s*Stunden)/gi);

    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (lower.includes('70°c') || lower.includes('63°c') || lower.includes('2 minutos') || lower.includes('2 minutes') || lower.includes('20 segundos') || lower.includes('4 horas') || lower.includes('4 hours')) {
        return (
          <strong key={i} className="font-extrabold text-[#8D6E63] dark:text-[#FFB800] bg-[#FFB800]/15 dark:bg-[#FFB800]/25 px-1 py-0.5 rounded border border-[#FFB800]/40">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <section id="recipe-instructions-section" className="space-y-6">
      {/* Section Header with Cooking Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFB800]/20 flex items-center justify-center border border-[#FFB800]/40">
            <Flame className="w-4 h-4 text-[#FF8A00]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif-heading font-extrabold text-foreground">
              {isEs ? 'Pasos de Elaboración' : isDe ? 'Zubereitungsschritte' : 'Preparation Steps'}
            </h2>
            <p className="text-2xs sm:text-xs text-muted-foreground font-sans">
              {isEs ? 'Sigue la técnica paso a paso para conseguir el punto perfecto' : isDe ? 'Folge der Schritt-für-Schritt-Anleitung für die perfekte Textur' : 'Follow the step-by-step technique for the perfect texture'}
            </p>
          </div>
        </div>

        {/* Cook Mode Button */}
        <button
          type="button"
          onClick={() => setCookMode(!cookMode)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-2xs cursor-pointer ${
            cookMode
              ? 'bg-[#FFB800] text-[#1C1917] border-amber-500 shadow-xs'
              : 'bg-card text-foreground border-border hover:bg-secondary'
          }`}
        >
          {cookMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>{isEs ? (cookMode ? 'Modo Cocina Activo' : 'Modo Cocina') : isDe ? (cookMode ? 'Kochmodus Aktiv' : 'Kochmodus') : (cookMode ? 'Cook Mode On' : 'Cook Mode')}</span>
        </button>
      </div>

      {/* Progress Bar when cooking */}
      {instructions.length > 0 && (
        <div className="bg-accent p-3 rounded-xl border border-border space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-foreground">
            <span className="flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-[#FFB800]" />
              <span>{isEs ? 'Progreso en cocina:' : isDe ? 'Kochfortschritt:' : 'Cooking progress:'}</span>
            </span>
            <span className="bg-secondary px-2 py-0.5 rounded-md border border-border text-[11px] text-foreground">
              {totalCompleted} / {instructions.length} {isEs ? 'pasos' : isDe ? 'Schritte' : 'steps'} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div
              className="bg-linear-to-r from-[#FFB800] to-[#FF8A00] h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Step List */}
      <div className="space-y-4">
        {instructions.map((inst, idx) => {
          const isDone = !!completedSteps[idx];
          return (
            <div
              key={idx}
              itemProp="recipeInstructions"
              itemScope
              itemType="https://schema.org/HowToStep"
              onClick={() => toggleStep(idx)}
              className={`card-notebook p-5 rounded-2xl border transition-all cursor-pointer select-none relative ${
                isDone
                  ? 'bg-secondary/40 border-border opacity-70'
                  : 'bg-card hover:bg-accent border-border hover:border-[#FFB800] shadow-xs'
              } ${cookMode ? 'text-base p-6' : ''}`}
            >
              <meta itemProp="position" content={`${idx + 1}`} />

              <div className="flex items-start gap-3.5">
                {/* Step Number & Checkbox Circle */}
                <button
                  type="button"
                  aria-label={`Mark step ${idx + 1} as ${isDone ? 'incomplete' : 'complete'}`}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 font-serif-heading font-extrabold text-sm transition-all border shadow-2xs ${
                    isDone
                      ? 'bg-[#2E7D32] border-[#1B5E20] text-white'
                      : 'bg-[#FFB800] border-amber-500 text-[#1C1917] hover:scale-105'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                </button>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      itemProp="name"
                      className={`font-serif-heading font-bold text-base sm:text-lg ${
                        isDone ? 'text-muted-foreground line-through' : 'text-foreground'
                      }`}
                    >
                      {inst.step}
                    </h3>
                    <span className="text-2xs text-muted-foreground font-sans font-semibold bg-secondary px-2 py-0.5 rounded-md">
                      {isDone ? (isEs ? 'Listo' : isDe ? 'Erledigt' : 'Done') : `${isEs ? 'Paso' : isDe ? 'Schritt' : 'Step'} ${idx + 1}`}
                    </span>
                  </div>

                  <p
                    itemProp="text"
                    className={`text-xs sm:text-sm leading-relaxed font-sans ${
                      isDone ? 'text-muted-foreground line-through' : 'text-foreground/90'
                    }`}
                  >
                    {highlightKeyFigures(inst.text)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Abuela's Kitchen Secret & Safety Callout Note */}
      <div className="chef-note space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FFB800]" />
          <h4 className="font-serif-heading font-extrabold text-sm sm:text-base text-foreground">
            {isEs ? 'El Toque de la Abuela & Seguridad Térmica' : isDe ? 'Omas Geheimtipp & Lebensmittelsicherheit' : "Grandma's Secret & Thermal Safety"}
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
          {isEs ? (
            <>
              Para garantizar la máxima seguridad alimentaria sin perder jugosidad, el estándar culinario recomienda alcanzar <strong>70°C durante 2 minutos</strong> en el corazón de la tortilla, o <strong>63°C durante 20 segundos</strong> si se consume de inmediato. Una vez cocinada, no la dejes más de <strong>4 horas</strong> a temperatura ambiente.
            </>
          ) : isDe ? (
            <>
              Für optimale Lebensmittelsicherheit bei maximaler Saftigkeit empfiehlt der Standard im Kern <strong>70°C für 2 Minuten</strong> oder <strong>63°C für 20 Sekunden</strong> bei sofortigem Verzehr. Nach dem Kochen maximal <strong>4 Stunden</strong> bei Raumtemperatur lagern.
            </>
          ) : (
            <>
              To guarantee maximum food safety while preserving signature juiciness, the culinary standard recommends reaching <strong>70°C for 2 minutes</strong> at the center, or <strong>63°C for 20 seconds</strong> for immediate serving. Once cooked, do not leave at room temperature for more than <strong>4 hours</strong>.
            </>
          )}
        </p>
      </div>
    </section>
  );
};

export default RecipeStepsView;
