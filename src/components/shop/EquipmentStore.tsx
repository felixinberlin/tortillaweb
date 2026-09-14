import React, { useState, useMemo } from "react";
import {
  Flame,
  ChefHat,
  ShieldCheck,
  Star,
  ExternalLink,
  ShoppingBag,
  BookOpen,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Download,
  Info,
  Layers,
  ArrowRight,
  TrendingUp,
  Percent,
  FileSpreadsheet,
  Award,
  Zap,
  Tag
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EQUIPMENT_ITEMS, type EquipmentItem } from "@/data/equipmentData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { STORE_CANON, STORE_CATEGORIES_CANON, getStoreCategoryLabel } from "@/lib/storeCanon";

interface EquipmentStoreProps {
  lang?: string;
}

export function EquipmentStore({ lang = "es" }: EquipmentStoreProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalItem, setActiveModalItem] = useState<EquipmentItem | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);
  const [buyerEmail, setBuyerEmail] = useState<string>("");

  const categoryIcons: Record<string, React.ElementType> = {
    all: ShoppingBag,
    pans: Flame,
    skillets: Flame,
    thermometers: ShieldCheck,
    cutlery: Layers,
    pantry: Sparkles,
    books: BookOpen,
    merch: Award,
  };

  const categories = useMemo(() => {
    return STORE_CATEGORIES_CANON.map((cat) => ({
      id: cat.id === 'skillets' ? 'pans' : cat.id,
      label: getStoreCategoryLabel(cat.id, currentLang),
      icon: categoryIcons[cat.id] || ShoppingBag,
    }));
  }, [currentLang]);

  const filteredItems = useMemo(() => {
    return EQUIPMENT_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const name = item.name[currentLang] || item.name.es;
      const desc = item.description[currentLang] || item.description.es;
      const matchesSearch =
        searchQuery.trim() === "" ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, currentLang]);

  const handleActionClick = (item: EquipmentItem) => {
    if (item.affiliateUrl.startsWith("#")) {
      setActiveModalItem(item);
      setCheckoutSuccess(false);
    } else {
      window.open(item.affiliateUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleDigitalPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerEmail || !buyerEmail.includes("@")) return;
    setCheckoutSuccess(true);
  };

  return (
    <section className="space-y-10">
      {/* Header & Value Proposition */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB800]/15 dark:bg-[#FFB800]/25 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold border border-[#FFB800]/30 shadow-xs">
          <ChefHat className="h-4 w-4 text-[#FFB800]" />
          <span>{STORE_CANON.header.badge[currentLang] || STORE_CANON.header.badge.es}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif-heading text-foreground tracking-tight">
          {STORE_CANON.header.title[currentLang] || STORE_CANON.header.title.es}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {currentLang === "es"
            ? "Las herramientas exactas utilizadas por los campeones de España. Desde sartenes de hierro curado hasta mandolinas de precisión y el termómetro para garantizar los **70°C durante 2 minutos** de seguridad térmica bactericida."
            : currentLang === "de"
            ? "Die exakten Werkzeuge der spanischen Tortilla-Meister: Eisenpfannen, Präzisions-Mandolinen und Einstich-Thermometer für **70°C für 2 Minuten** Lebensmittelsicherheit."
            : "The exact tools used by Spanish national champions: seasoned mineral iron skillets, precision mandolines, and instant thermometers for guaranteed **70°C for 2 minutes** food safety."}
        </p>

        {/* Affiliate & Integrity Disclosure */}
        <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border/80 text-xs text-muted-foreground shadow-2xs">
          <Info className="h-4 w-4 text-[#FFB800] shrink-0" />
          <span>
            {currentLang === "es"
              ? "Evaluación independiente sin patrocinio pagado. Al comprar por nuestros enlaces apoyas el mantenimiento de la enciclopedia sin coste adicional."
              : currentLang === "de"
              ? "Unabhängige Prüfung ohne Sponsoring. Über Affiliate-Links unterstützen Sie unsere gemeinnützige Enzyklopädie."
              : "Independent testing without paid bias. Purchasing through our partner links supports our encyclopedia at zero extra cost."}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={STORE_CANON.header.searchPlaceholder[currentLang] || STORE_CANON.header.searchPlaceholder.es}
            className="w-full pl-10 pr-4 py-2.5 bg-card text-foreground border border-border rounded-xl text-sm font-medium shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs ${
                  isSelected
                    ? "bg-[#8D6E63] text-white dark:bg-[#FFB800] dark:text-[#1C1917] border border-[#8D6E63] dark:border-[#FFB800] shadow-sm"
                    : "bg-card text-foreground/80 hover:text-foreground border border-border hover:bg-accent"
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? "text-[#FFB800] dark:text-[#1C1917]" : "text-muted-foreground"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Digital Products Banner (E-Book & Pro HORECA) */}
      {selectedCategory === "all" && searchQuery === "" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          {/* Ebook & Masterclass Bundle Card */}
          <div className="card-notebook p-6 sm:p-8 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-2 border-[#FFB800]/40 rounded-3xl shadow-stacked-parchment relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-[#FFB800] text-[#1C1917] hover:bg-[#FFB800] font-extrabold border-none text-xs px-3 py-1">
                  ⭐ {currentLang === "es" ? "Publicación Oficial 2026" : currentLang === "de" ? "Offizielle Publikation" : "Official Publication"}
                </Badge>
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#8D6E63] dark:text-[#FFB800]">
                  19.90 €
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-serif-heading text-foreground">
                {currentLang === "es"
                  ? "El Gran Libro & Masterclass de la Tortilla de Patatas"
                  : currentLang === "de"
                  ? "Das Große Buch & Meisterklasse der Tortilla de Patatas"
                  : "The Definitive Spanish Omelette Guide & Masterclass"}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentLang === "es"
                  ? "180 páginas de ciencia culinaria, 25 recetas secretas de tabernas históricas de España, tablas de proporciones listas para imprimir y 12 lecciones en vídeo 4K."
                  : currentLang === "de"
                  ? "180 Seiten kulinarische Wissenschaft, 25 geheime Traditionsrezepte aus Spaniens besten Bars, druckbare Küchen-Tabellen und 12 Video-Lektionen in 4K."
                  : "180 pages of culinary physics, 25 secret Spanish tavern recipes, printable kitchen ratio cheat sheets, and 12 4K video masterclasses."}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-foreground/90 pt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
                  <span>PDF & ePub Instantáneo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
                  <span>12 Vídeos en 4K UHD</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
                  <span>Curvas de Cuajado <strong>70°C</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
                  <span>Garantía 30 Días</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => handleActionClick(EQUIPMENT_ITEMS.find((i) => i.id === "masterclass-ebook-definitive")!)}
                size="lg"
                className="w-full sm:w-auto flex-1 bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-sm shadow-md"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span>{currentLang === "es" ? "Comprar & Descargar Ahora (19.90€)" : currentLang === "de" ? "Jetzt Kaufen & Laden (19,90€)" : "Buy & Instant Download (19.90€)"}</span>
              </Button>
            </div>
          </div>

          {/* Pro HORECA Escandallo Pack Card */}
          <div className="card-notebook p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-2 border-[#00A3FF]/40 rounded-3xl shadow-stacked-parchment relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-[#00A3FF] text-white hover:bg-[#00A3FF] font-extrabold border-none text-xs px-3 py-1">
                  💼 {currentLang === "es" ? "Para Bares & Restaurantes" : currentLang === "de" ? "Für Gastronomie & Catering" : "For Bars & Hospitality"}
                </Badge>
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#00A3FF]">
                  49.00 €
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-serif-heading text-foreground">
                {currentLang === "es"
                  ? "Pack Profesional HORECA: Escandallos & Sello de Calidad"
                  : currentLang === "de"
                  ? "HORECA Gastro-Paket: Kostenrechner & Gütesiegel"
                  : "HORECA Pro Suite: Margin Optimization & Quality Seal"}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentLang === "es"
                  ? "Plantillas Excel automatizadas para fijar el PVP del pincho con 70% de margen bruto, manual higiénico-sanitario APPCC para inspecciones y distintivo acreditado."
                  : currentLang === "de"
                  ? "Automatisierte Excel-Kalkulation für 70 % Deckungsbeitrag pro Portion, HACCP-Hygienekonzept für Kontrollen und Gastronomie-Zertifikat."
                  : "Automated Excel templates to calculate exact cost per slice with 70% gross margin, HACCP health safety guide, and accredited window decal."}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-foreground/90 pt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00A3FF]" />
                  <span>Excel / Google Sheets</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00A3FF]" />
                  <span>Control de Mermas de Aceite</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00A3FF]" />
                  <span>Guía Sanitaria APPCC</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00A3FF]" />
                  <span>Sello Físico Acreditado</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => handleActionClick(EQUIPMENT_ITEMS.find((i) => i.id === "pro-horeca-escandallo-pack")!)}
                size="lg"
                className="w-full sm:w-auto flex-1 bg-[#00A3FF] hover:bg-[#008ECC] text-white font-bold text-sm shadow-md"
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                <span>{currentLang === "es" ? "Obtener Licencia HORECA (49.00€)" : currentLang === "de" ? "Gastro-Lizenz Holen (49,00€)" : "Get Hospitality Suite (49.00€)"}</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Equipment Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const name = item.name[currentLang] || item.name.es;
          const tagline = item.tagline[currentLang] || item.tagline.es;
          const description = item.description[currentLang] || item.description.es;
          const whyEssential = item.whyEssential[currentLang] || item.whyEssential.es;
          const badge = item.badge[currentLang] || item.badge.es;
          const specs = item.specs[currentLang] || item.specs.es;
          const isDigital = item.affiliateUrl.startsWith("#");

          return (
            <div
              key={item.id}
              className="card-notebook p-5 sm:p-6 bg-card border border-border rounded-2xl shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                {/* Header & Badges */}
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="outline" className="bg-[#FFB800]/10 text-[#8D6E63] dark:text-[#FFB800] border-[#FFB800]/30 font-bold text-[11px] px-2.5 py-0.5">
                    {badge}
                  </Badge>

                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                    <Star className="h-3 w-3 fill-amber-500" />
                    <span>{item.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground font-normal text-[10px]">({item.reviewCount})</span>
                  </div>
                </div>

                {/* Title & Brand */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    {item.brand}
                  </span>
                  <h3 className="text-lg font-bold font-serif-heading text-foreground group-hover:text-[#FFB800] transition-colors leading-snug">
                    {name}
                  </h3>
                </div>

                {/* Tagline */}
                <p className="text-xs font-semibold text-foreground/80 leading-relaxed italic border-l-2 border-[#FFB800] pl-2.5">
                  "{tagline}"
                </p>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {description}
                </p>

                {/* Why Essential */}
                <div className="p-2.5 rounded-xl bg-secondary/50 border border-border/50 text-[11px] space-y-1">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-[#FFB800]" />
                    {currentLang === "es" ? "¿Por qué es crucial?" : currentLang === "de" ? "Warum unverzichtbar?" : "Why it matters:"}
                  </span>
                  <p className="text-muted-foreground leading-normal">
                    {whyEssential}
                  </p>
                </div>

                {/* Specs List */}
                <ul className="space-y-1 text-[11px] text-muted-foreground pt-1">
                  {specs.slice(0, 3).map((spec, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-[#2E7D32] shrink-0" />
                      <span className="truncate">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Buy Action */}
              <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                    {currentLang === "es" ? "Precio Orientativo" : currentLang === "de" ? "Richtpreis" : "Price Range"}
                  </span>
                  <span className="text-base font-extrabold font-mono text-foreground">
                    {item.priceRange}
                  </span>
                </div>

                <Button
                  onClick={() => handleActionClick(item)}
                  size="sm"
                  className={`font-bold text-xs shadow-xs ${
                    isDigital
                      ? "bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917]"
                      : "bg-[#FFB800] hover:bg-[#E0A200] text-[#1C1917]"
                  }`}
                >
                  {isDigital ? (
                    <>
                      <Download className="mr-1.5 h-3.5 w-3.5" />
                      <span>{currentLang === "es" ? "Acceder" : currentLang === "de" ? "Laden" : "Get Access"}</span>
                    </>
                  ) : (
                    <>
                      <span>{currentLang === "es" ? "Ver Oferta" : currentLang === "de" ? "Angebot ansehen" : "Check Price"}</span>
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Digital Modal / Checkout Simulator */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card text-foreground border border-border rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6"
            >
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-sm p-2 rounded-full hover:bg-accent"
              >
                ✕
              </button>

              {!checkoutSuccess ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#FFB800] text-[#1C1917] font-bold">
                      {activeModalItem.badge[currentLang] || activeModalItem.badge.es}
                    </Badge>
                    <span className="text-lg font-mono font-bold text-[#8D6E63] dark:text-[#FFB800]">
                      {activeModalItem.priceRange}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif-heading text-foreground">
                    {activeModalItem.name[currentLang] || activeModalItem.name.es}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {activeModalItem.description[currentLang] || activeModalItem.description.es}
                  </p>

                  <form onSubmit={handleDigitalPurchase} className="space-y-3 pt-2">
                    <label className="block text-xs font-semibold text-foreground">
                      {currentLang === "es"
                        ? "Introduce tu email para recibir el enlace de descarga instantáneo y factura:"
                        : currentLang === "de"
                        ? "E-Mail-Adresse für sofortigen Download-Link und Rechnung:"
                        : "Enter your email for instant download link and invoice:"}
                    </label>

                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="cocinero@ejemplo.com"
                      className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#FFB800] focus:outline-hidden"
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#FFB800] hover:bg-[#E0A200] text-[#1C1917] font-bold text-sm shadow-md"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      <span>{currentLang === "es" ? "Completar & Descargar al Instante" : currentLang === "de" ? "Abschließen & Sofort Herunterladen" : "Complete & Instant Download"}</span>
                    </Button>

                    <p className="text-[11px] text-center text-muted-foreground">
                      🔒 {currentLang === "es" ? "Pago seguro encriptado SSL. Garantía de devolución de 30 días." : currentLang === "de" ? "Sichere SSL-Zahlung. 30 Tage Geld-zurück-Garantie." : "Secure SSL transaction. 30-day money-back guarantee."}
                    </p>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#2E7D32]/20 text-[#2E7D32] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>

                  <h4 className="text-lg font-bold font-serif-heading">
                    {currentLang === "es" ? "¡Descarga Lista & Enviada!" : currentLang === "de" ? "Download bereit & gesendet!" : "Download Ready & Sent!"}
                  </h4>

                  <p className="text-xs text-muted-foreground">
                    {currentLang === "es"
                      ? `Hemos enviado los archivos a ${buyerEmail}. También puedes descargarlos directamente a continuación:`
                      : currentLang === "de"
                      ? `Dateien wurden an ${buyerEmail} gesendet. Direkter Download unten:`
                      : `Files dispatched to ${buyerEmail}. You can also download them directly below:`}
                  </p>

                  <Button
                    onClick={() => {
                      setActiveModalItem(null);
                    }}
                    className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    <span>{currentLang === "es" ? "Descarga Iniciada — Cerrar" : currentLang === "de" ? "Download gestartet — Schließen" : "Download Started — Close"}</span>
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
