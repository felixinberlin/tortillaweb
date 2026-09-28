import React, { useState, useMemo } from 'react';
import { Users, Minus, Plus, BookOpen, Check, RotateCcw, Scale, Utensils } from 'lucide-react';
import DownloadCooklangButton from './DownloadCooklangButton';
import type { RawRecipeInput } from '@/lib/translator/types';

export interface IngredientItem {
  id?: string;
  ingredientId?: string;
  name: { es: string; en: string; de: string } | string;
  amount: number;
  unit: string;
  notes?: { es: string; en: string; de: string };
}

export interface RecipeData {
  id: string;
  title: { es: string; en: string; de: string } | string;
  description?: { es: string; en: string; de: string } | string;
  yieldServings?: number;
  ingredients: (IngredientItem | string)[];
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  time?: number;
  author?: { name: string };
  instructions?: {
    step: { es: string; en: string; de: string } | string;
    text: { es: string; en: string; de: string } | string;
  }[];
}

export interface RecipeIngredientsViewProps {
  recipe: RecipeData;
  lang: string;
  initialServings?: number;
}

export const RecipeIngredientsView: React.FC<RecipeIngredientsViewProps> = ({
  recipe,
  lang,
  initialServings = 4,
}) => {
  const isEs = lang.startsWith('es');
  const isDe = lang.startsWith('de');

  // Default to 4 people as requested
  const [diners, setDiners] = useState<number>(initialServings);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Base servings from recipe (defaults to 4 if not specified)
  const baseServings = recipe.yieldServings || 4;
  const scaleRatio = diners / baseServings;

  const handleDecrement = () => {
    if (diners > 1) {
      setDiners((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    if (diners < 16) {
      setDiners((prev) => prev + 1);
    }
  };

  const handleSetDiners = (num: number) => {
    setDiners(Math.max(1, Math.min(16, num)));
  };

  const handleReset = () => {
    setDiners(4);
    setCheckedItems({});
  };

  const toggleCheck = (idKey: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idKey]: !prev[idKey],
    }));
  };

  // Recommended skillet / pan size based on scaled diners
  const panSizeRecommendation = useMemo(() => {
    if (diners <= 2) return { cm: '18 – 20 cm', note: isEs ? 'Sartén pequeña' : isDe ? 'Kleine Pfanne' : 'Small pan' };
    if (diners <= 4) return { cm: '22 – 24 cm', note: isEs ? 'Sartén estándar' : isDe ? 'Standard-Pfanne' : 'Standard pan' };
    if (diners <= 6) return { cm: '26 – 28 cm', note: isEs ? 'Sartén grande' : isDe ? 'Große Pfanne' : 'Large pan' };
    return { cm: '28 – 32 cm', note: isEs ? 'Sartén extra grande / profesional' : isDe ? 'Extra große Pfanne' : 'Extra large pan' };
  }, [diners, isEs, isDe]);

  // Scaled ingredients calculations
  const scaledIngredients = useMemo(() => {
    return recipe.ingredients.map((ing, index) => {
      if (typeof ing === 'string') {
        return {
          key: `str-${index}`,
          name: ing,
          amountDisplay: '',
          unitDisplay: '',
          noteDisplay: '',
          fullText: ing,
        };
      }

      const ingName = typeof ing.name === 'object'
        ? (ing.name[lang as keyof typeof ing.name] || ing.name.es)
        : ing.name;

      const rawScaled = ing.amount * scaleRatio;

      let formattedAmount = '';
      if (ing.unit === 'unit' || ing.unit === 'unidades' || ing.unit === 'Stk') {
        if (rawScaled % 1 === 0) {
          formattedAmount = `${rawScaled}`;
        } else if (Math.abs(rawScaled % 1 - 0.5) < 0.05) {
          formattedAmount = `${Math.floor(rawScaled)} ½`;
        } else {
          formattedAmount = `${Math.round(rawScaled * 10) / 10}`;
        }
      } else if (rawScaled < 10) {
        formattedAmount = rawScaled % 1 === 0 ? `${rawScaled}` : `${Math.round(rawScaled * 10) / 10}`;
      } else {
        formattedAmount = `${Math.round(rawScaled)}`;
      }

      let formattedUnit = ing.unit;
      if (ing.unit === 'unit' || ing.unit === 'unidades') {
        formattedUnit = isEs ? 'ud.' : isDe ? 'Stk.' : 'units';
      }

      const rawNote = ing.notes
        ? (typeof ing.notes === 'object' ? (ing.notes[lang as keyof typeof ing.notes] || ing.notes.es) : ing.notes)
        : undefined;

      const key = ing.id || ing.ingredientId || `ing-${index}`;

      return {
        key,
        name: ingName,
        amountDisplay: formattedAmount,
        unitDisplay: formattedUnit,
        noteDisplay: rawNote,
        fullText: `${formattedAmount}${formattedUnit === 'ud.' || formattedUnit === 'Stk.' || formattedUnit === 'units' ? ` ${formattedUnit}` : formattedUnit} ${ingName}`,
      };
    });
  }, [recipe.ingredients, scaleRatio, lang, isEs, isDe]);

  // Scaled raw recipe for Cooklang export
  const scaledRecipeForExport = useMemo<RawRecipeInput>(() => {
    const rTitle = typeof recipe.title === 'object'
      ? (recipe.title[lang as keyof typeof recipe.title] || recipe.title.es)
      : recipe.title;

    const rDesc = recipe.description
      ? (typeof recipe.description === 'object' ? (recipe.description[lang as keyof typeof recipe.description] || recipe.description.es) : recipe.description)
      : '';

    const instructionsList = recipe.instructions
      ? recipe.instructions.map((inst) => ({
          step: typeof inst.step === 'object' ? (inst.step[lang as keyof typeof inst.step] || inst.step.es) : inst.step,
          text: typeof inst.text === 'object' ? (inst.text[lang as keyof typeof inst.text] || inst.text.es) : inst.text,
        }))
      : [];

    return {
      name: `${rTitle} (${diners} ${isEs ? 'comensales' : isDe ? 'Personen' : 'servings'})`,
      description: rDesc,
      prepTimeMinutes: recipe.prepTimeMinutes || 15,
      cookTimeMinutes: recipe.cookTimeMinutes || 20,
      yieldServings: diners,
      category: 'Main Course',
      cuisine: 'Spanish',
      authorName: recipe.author?.name || 'tortilladepatatas.org',
      ingredients: scaledIngredients.map((i) => i.fullText),
      instructions: instructionsList,
    };
  }, [recipe, diners, scaledIngredients, lang, isEs, isDe]);

  const presets = [2, 4, 6, 8];

  return (
    <aside
      id="recipe-ingredients-sidebar"
      className="card-notebook p-5 sm:p-6 rounded-3xl bg-card border border-border space-y-5 h-fit shadow-xs transition-all relative overflow-hidden"
    >
      {/* Header with Title and Reset */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FFB800]/20 flex items-center justify-center border border-[#FFB800]/40">
            <BookOpen className="w-4 h-4 text-[#8D6E63] dark:text-[#FFB800]" />
          </div>
          <div>
            <h2 className="text-xl font-serif-heading font-extrabold text-foreground">
              {isEs ? 'Ingredientes' : isDe ? 'Zutaten' : 'Ingredients'}
            </h2>
            <span className="text-2xs text-muted-foreground font-sans font-medium">
              {isEs ? 'Cantidades ajustables' : isDe ? 'Anpassbare Mengen' : 'Scalable quantities'}
            </span>
          </div>
        </div>

        {diners !== 4 && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] hover:underline bg-secondary px-2.5 py-1 rounded-xl border border-border transition-colors cursor-pointer"
            title={isEs ? 'Restablecer a 4 comensales' : isDe ? 'Auf 4 Portionen zurücksetzen' : 'Reset to 4 servings'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isEs ? '4 porciones' : '4 default'}</span>
          </button>
        )}
      </div>

      {/* Interactive Diners / People Scaler Selector */}
      <div className="bg-accent p-4 sm:p-5 rounded-2xl border border-border space-y-3.5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground">
            <Users className="w-4 h-4 text-[#FFB800]" />
            <span>{isEs ? 'Comensales:' : isDe ? 'Personen:' : 'Diners:'}</span>
          </div>
          <span className="text-xs sm:text-sm font-extrabold text-[#1C1917] bg-[#FFB800] px-3 py-0.5 rounded-full border border-amber-500 shadow-2xs">
            {diners} {isEs ? (diners === 1 ? 'persona' : 'personas') : isDe ? (diners === 1 ? 'Person' : 'Personen') : (diners === 1 ? 'person' : 'people')}
          </span>
        </div>

        {/* Stepper Controls - 44px+ touch targets for mobile */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            id="decrease-diners-btn"
            onClick={handleDecrement}
            disabled={diners <= 1}
            aria-label={isEs ? 'Reducir raciones' : 'Decrease servings'}
            className="w-12 h-12 rounded-2xl bg-card border border-border text-foreground font-bold flex items-center justify-center hover:bg-secondary active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs text-lg cursor-pointer"
          >
            <Minus className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="flex-1 bg-card border border-border h-12 rounded-2xl flex flex-col items-center justify-center shadow-2xs">
            <span className="font-serif-heading font-extrabold text-xl text-foreground leading-none">{diners}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none mt-0.5">
              {isEs ? 'raciones' : isDe ? 'Portionen' : 'servings'}
            </span>
          </div>

          <button
            type="button"
            id="increase-diners-btn"
            onClick={handleIncrement}
            disabled={diners >= 16}
            aria-label={isEs ? 'Aumentar raciones' : 'Increase servings'}
            className="w-12 h-12 rounded-2xl bg-card border border-border text-foreground font-bold flex items-center justify-center hover:bg-secondary active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs text-lg cursor-pointer"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {presets.map((presetNum) => (
            <button
              key={presetNum}
              type="button"
              onClick={() => handleSetDiners(presetNum)}
              className={`py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                diners === presetNum
                  ? 'bg-[#8D6E63] text-white dark:bg-[#FFB800] dark:text-[#1C1917] border-transparent shadow-2xs font-extrabold'
                  : 'bg-card text-foreground border-border hover:bg-secondary'
              }`}
            >
              {presetNum} {isEs ? 'p.' : isDe ? 'P.' : 'p.'}
            </button>
          ))}
        </div>

        {/* Recommended Skillet Size Callout */}
        <div className="flex items-center justify-between text-2xs sm:text-xs text-foreground pt-2 border-t border-border">
          <div className="flex items-center gap-1.5 font-semibold">
            <Utensils className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>{isEs ? 'Sartén sugerida:' : isDe ? 'Empfohlene Pfanne:' : 'Suggested skillet:'}</span>
          </div>
          <span className="font-extrabold text-[#8D6E63] dark:text-[#FFB800] bg-secondary px-2 py-0.5 rounded-md border border-border">
            {panSizeRecommendation.cm}
          </span>
        </div>
      </div>

      {/* Scaled Ingredients Checklist */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-2xs text-muted-foreground px-1">
          <span className="italic font-serif-heading text-xs text-foreground/80">
            {isEs ? '✓ Toca para marcar lo que ya tienes listo:' : isDe ? '✓ Zum Abhaken antippen:' : '✓ Tap to check off ready ingredients:'}
          </span>
          <Scale className="w-3.5 h-3.5 text-[#FFB800]" />
        </div>

        <ul className="space-y-2.5 text-xs sm:text-sm font-sans" id="recipe-ingredients-list">
          {scaledIngredients.map((item) => {
            const isChecked = !!checkedItems[item.key];
            return (
              <li
                key={item.key}
                itemProp="recipeIngredient"
                onClick={() => toggleCheck(item.key)}
                className={`flex items-start gap-3 p-3 rounded-2xl transition-all cursor-pointer select-none border shadow-2xs ${
                  isChecked
                    ? 'bg-secondary/40 border-border text-muted-foreground line-through opacity-70'
                    : 'bg-card border-border hover:border-[#FFB800] hover:shadow-xs text-foreground'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                    isChecked
                      ? 'bg-[#FFB800] border-amber-600 text-[#1C1917]'
                      : 'bg-secondary border-border'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 leading-snug">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className={`font-semibold text-sm ${isChecked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {item.name}
                    </span>
                    {item.amountDisplay && (
                      <span className={`font-extrabold text-sm whitespace-nowrap text-right ${isChecked ? 'text-muted-foreground' : 'text-[#8D6E63] dark:text-[#FFB800]'}`}>
                        {item.amountDisplay}
                        <span className="text-2xs font-bold text-muted-foreground ml-1">{item.unitDisplay}</span>
                      </span>
                    )}
                  </div>
                  {item.noteDisplay && (
                    <p className={`text-2xs italic mt-0.5 font-sans ${isChecked ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                      {item.noteDisplay}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Export / Download Cooklang Button with dynamically scaled amounts */}
      <div className="pt-3 border-t border-border">
        <DownloadCooklangButton
          recipe={scaledRecipeForExport}
          lang={lang}
          variant="outline"
          className="w-full bg-accent hover:bg-secondary text-foreground border border-border font-bold text-xs sm:text-sm shadow-2xs py-2.5 rounded-xl transition-all"
          label={isEs ? `Descargar receta (${diners} comensales) .cook` : isDe ? `Rezept herunterladen (${diners} Pers.) .cook` : `Download recipe (${diners} people) .cook`}
        />
      </div>
    </aside>
  );
};

export default RecipeIngredientsView;
