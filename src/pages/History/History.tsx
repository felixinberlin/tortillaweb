import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  Calendar,
  Sparkles,
  ShieldAlert,
  Award,
  ChevronRight,
  Info
} from "lucide-react";
import { historyData, TimelineEvent, HistoryChapter } from "@/data/historyData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-foreground underline decoration-amber-500/50 bg-amber-500/10 px-1 py-0.5 rounded">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function History() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || "es").substring(0, 2);
  const data = historyData[currentLang] || historyData.es;

  const [activeChapter, setActiveChapter] = useState<string>("all");

  const filteredChapters = activeChapter === "all"
    ? data.chapters
    : data.chapters.filter(c => c.id === activeChapter);

  return (
    <main className="container mx-auto px-4 py-10 md:py-16 max-w-6xl">
      {/* Page Header / Hero */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <Badge
          variant="secondary"
          className="mb-4 px-4 py-1.5 text-xs font-bold bg-amber-100/90 text-amber-900 border-amber-300 shadow-2xs inline-flex items-center gap-1.5"
        >
          <BookOpen className="w-4 h-4 text-amber-700" />
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
          <span>{t("historyPage.notebookLabel", "Cuaderno de Gastronomía & Historiografía")}</span>
        </div>
        <p className="font-script text-lg sm:text-xl md:text-2xl text-amber-950 leading-relaxed">
          "{renderFormattedText(data.chefNote)}"
        </p>
      </div>

      {/* Timeline Section */}
      <section className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>1767 &mdash; 2025+</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-foreground mb-2">
            {data.timelineTitle}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {data.timelineSubtitle}
          </p>
        </div>

        {/* Timeline Grid / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.timelineEvents.map((event: TimelineEvent, index: number) => {
            const getTagStyle = (tagType?: string) => {
              switch (tagType) {
                case 'origin': return 'bg-amber-100 text-amber-900 border-amber-300';
                case 'war': return 'bg-orange-100 text-orange-900 border-orange-300';
                case 'survival': return 'bg-yellow-100 text-yellow-900 border-yellow-300';
                case 'safety': return 'bg-red-100 text-red-900 border-red-300';
                case 'modern': return 'bg-blue-100 text-blue-900 border-blue-300';
                default: return 'bg-muted text-muted-foreground border-border';
              }
            };

            return (
              <div
                key={index}
                className="card-notebook p-5 flex flex-col justify-between hover:border-amber-400 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-[#8D6E63] text-white shadow-2xs">
                      {event.year}
                    </span>
                    {event.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTagStyle(event.tagType)}`}>
                        {event.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif-heading font-bold text-lg text-foreground mb-1">
                    {event.title}
                  </h3>
                  {event.location && (
                    <p className="text-xs font-semibold text-amber-700 mb-2.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
                      {event.location}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {renderFormattedText(event.description)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <hr className="my-12 border-border/80" />

      {/* Chapter Filter & Reading Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-foreground mb-1">
              {data.chaptersTitle}
            </h2>
            <p className="text-sm text-muted-foreground">
              {data.chaptersSubtitle}
            </p>
          </div>

          {/* Chapter Selector Dropdown / Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveChapter("all")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all whitespace-nowrap ${
                activeChapter === "all"
                  ? "bg-[#8D6E63] text-white border-[#8D6E63] shadow-2xs"
                  : "bg-background text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              Ver Todo (8 Capítulos)
            </button>
            {data.chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(ch.id)}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all whitespace-nowrap ${
                  activeChapter === ch.id
                    ? "bg-[#FFB800] text-amber-950 border-[#FFB800] shadow-2xs"
                    : "bg-background text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                Cap. {ch.number}
              </button>
            ))}
          </div>
        </div>

        {/* Render Chapters */}
        <div className="space-y-8">
          {filteredChapters.map((chapter: HistoryChapter) => (
            <Card key={chapter.id} className="card-notebook overflow-hidden border-border/90 shadow-2xs">
              <CardHeader className="bg-[#FAF6EE] border-b border-border/70 py-4 px-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#FFB800] text-amber-950 font-bold font-mono text-sm flex items-center justify-center shadow-2xs border border-amber-400">
                    {chapter.number}
                  </span>
                  <div>
                    <CardTitle className="text-xl sm:text-2xl font-serif-heading font-bold text-foreground">
                      {chapter.title}
                    </CardTitle>
                    {chapter.subtitle && (
                      <p className="text-xs text-muted-foreground mt-0.5">{chapter.subtitle}</p>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 space-y-4">
                {chapter.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                    {renderFormattedText(paragraph)}
                  </p>
                ))}

                {/* Bullet points if present */}
                {chapter.bulletPoints && chapter.bulletPoints.length > 0 && (
                  <ul className="my-4 space-y-2 bg-[#FDFBF7] p-4 rounded-xl border border-amber-200/80">
                    {chapter.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx} className="text-xs sm:text-sm text-foreground flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{renderFormattedText(bp)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Table Data if present */}
                {chapter.tableData && (
                  <div className="my-6 overflow-x-auto rounded-xl border border-border bg-background shadow-2xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-[#F5E6BE] text-amber-950 font-bold uppercase text-[11px] tracking-wider border-b border-amber-300">
                        <tr>
                          {chapter.tableData.headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-4 py-3">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {chapter.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-muted/50 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 py-3 font-medium text-foreground">
                                {renderFormattedText(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Special Callouts */}
                {chapter.callout && (
                  <div
                    className={`mt-4 p-4 rounded-xl border flex items-start gap-3 ${
                      chapter.callout.type === "safety"
                        ? "bg-red-50/90 border-red-200 text-red-950"
                        : "bg-amber-50/90 border-amber-200 text-amber-950"
                    }`}
                  >
                    {chapter.callout.type === "safety" ? (
                      <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                      {renderFormattedText(chapter.callout.text)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom Summary Banner */}
      <section className="bg-parchment p-8 rounded-2xl shadow-stacked-parchment text-center max-w-4xl mx-auto border border-amber-200/80">
        <div className="inline-flex p-3 rounded-full bg-amber-100 text-amber-800 mb-4 border border-amber-300">
          <Award className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-serif-heading font-bold text-foreground mb-2">
          {t("historyPage.summaryTitle", "El Legado de la Tortilla de Patatas")}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
          {t("historyPage.summaryDesc", "Un viaje gastronómico único que une la historia viva de España con el rigor de la ciencia culinaria. Para más detalles sobre bacteriología y seguridad alimentaria, visita nuestra sección de Ciencia.")}
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
