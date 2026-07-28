import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Users, Sparkles, Filter, Award } from "lucide-react";
import { personasData } from "@/data/personasData";
import PersonCard from "@/components/personas/PersonCard";
import { Badge } from "@/components/ui/badge";

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold underline decoration-amber-500/50">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function Personas() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || "es").substring(0, 2);
  const data = personasData[currentLang] || personasData.es;

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const totalPersonas = data.categories.reduce((acc, cat) => acc + cat.personas.length, 0);

  const allLabel = currentLang === "en" 
    ? `All People (${totalPersonas})` 
    : currentLang === "de" 
    ? `Alle Personen (${totalPersonas})` 
    : `Todas las Personas (${totalPersonas})`;

  const filterLabel = currentLang === "en"
    ? "Filter by Specialty:"
    : currentLang === "de"
    ? "Nach Spezialgebiet filtern:"
    : "Filtrar por Especialidad:";

  const filteredCategories = selectedCategory === "all"
    ? data.categories
    : data.categories.filter(cat => cat.id === selectedCategory);

  return (
    <main className="container mx-auto px-4 py-10 md:py-16 max-w-6xl">
      {/* Header / Hero */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <Badge
          variant="secondary"
          className="mb-4 px-4 py-1.5 text-xs font-bold bg-amber-100/90 text-amber-900 border-amber-300 shadow-2xs inline-flex items-center gap-1.5"
        >
          <Users className="w-4 h-4 text-amber-700" />
          {data.badge}
        </Badge>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif-heading font-extrabold tracking-tight text-foreground mb-4 leading-tight">
          {data.title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {data.subtitle}
        </p>
      </div>

      {/* Chef Notebook Handwritten Annotation */}
      <div className="chef-note mb-12 shadow-stacked-parchment rounded-xl p-6 border-l-8 border-amber-500 bg-[#FFFDF7]">
        <div className="flex items-center gap-2 mb-2 text-amber-900 font-sans font-bold text-xs uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>{t("personasPage.notebookLabel", "Cuaderno de Laboratorio Gastronómico")}</span>
        </div>
        <p className="font-script text-lg sm:text-xl md:text-2xl text-amber-950 leading-relaxed">
          "{data.chefNote}"
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-border">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Filter className="w-4 h-4 text-amber-600" />
          <span>{filterLabel}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              selectedCategory === "all"
                ? "bg-[#8D6E63] text-white border-[#8D6E63] shadow-2xs"
                : "bg-background text-muted-foreground border-border hover:bg-muted"
            }`}
          >
            {allLabel}
          </button>
          {data.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#FFB800] text-amber-950 border-[#FFB800] shadow-2xs"
                  : "bg-background text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              {cat.title.split(". ")[1] || cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Category Blocks and Person Cards */}
      <div className="space-y-14">
        {filteredCategories.map((category) => (
          <section key={category.id} className="space-y-6">
            <div className="border-l-4 border-amber-500 pl-4 py-1">
              <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-foreground">
                {category.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.personas.map((persona) => (
                <PersonCard key={persona.id} persona={persona} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Summary Footer Box */}
      <section className="mt-16 bg-parchment p-8 rounded-2xl shadow-stacked-parchment text-center max-w-4xl mx-auto border border-amber-200/80">
        <div className="inline-flex p-3 rounded-full bg-amber-100 text-amber-800 mb-4 border border-amber-300">
          <Award className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-serif-heading font-bold text-foreground mb-2">
          {t("personasPage.summaryTitle", "Tradición, Ciencia e Innovación Unidas")}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
          {t("personasPage.summaryDesc", "Cada una de estas personas aporta un eslabón único al patrimonio de la tortilla de patatas. Explora nuestras secciones interactivas para poner en práctica sus hallazgos y recetas.")}
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/30">
            {renderFormattedText(t("personasPage.pasteurization", "Pasteurización: **70°C for 2 minutes**"))}
          </span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#FF8A00]/10 text-[#FF8A00] border border-[#FF8A00]/30">
            {renderFormattedText(t("personasPage.mediumThreshold", "Umbral Medio: **63°C for 20 seconds**"))}
          </span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#B00020]/10 text-[#B00020] border border-[#B00020]/30">
            {renderFormattedText(t("personasPage.ambientLimit", "Límite Ambiental: **4 hours**"))}
          </span>
        </div>
      </section>
    </main>
  );
}
