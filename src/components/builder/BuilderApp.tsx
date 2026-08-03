import { useState, useMemo } from "react";
import "@/i18n/config";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { 
  Users, 
  Flame, 
  Sparkles, 
  ChefHat, 
  Copy, 
  Check, 
  Timer, 
  Scale, 
  Info,
  CircleDot,
  Globe,
  ExternalLink,
  ArrowRight,
  GitCompare
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateRecipe } from "@/domain/builder/generateRecipe";
import { normalizeRecipe } from "@/domain/tortilla-dna/normalizeRecipe";
import { compareRecipes } from "@/domain/tortilla-dna/compareRecipes";
import { getReferenceRecipes } from "@/domain/recipes/referenceRecipes";
import type { LocalizedString } from "@/domain/tortilla-dna/types";

interface BuilderAppProps {
  lang?: string;
}

export default function BuilderApp({ lang = "es" }: BuilderAppProps) {
  const { t } = useTranslation(undefined, { lng: lang });

  // State options
  const [diners, setDiners] = useState<number>(4);
  const [hasOnion, setHasOnion] = useState<boolean>(true);
  const [doneness, setDoneness] = useState<"betanzos" | "jugosa" | "cuajada">("jugosa");
  const [potatoCut, setPotatoCut] = useState<"pochada" | "crujiente">("pochada");
  const [copied, setCopied] = useState<boolean>(false);
  
  // Reference recipe for comparator
  const referenceRecipes = useMemo(() => getReferenceRecipes(), []);
  const [selectedRefId, setSelectedRefId] = useState<string>("betanzos");

  // 1. Generate full domain Recipe object from builder choices
  const userRecipe = useMemo(() => {
    return generateRecipe({
      diners,
      hasOnion,
      doneness,
      potatoCut,
    });
  }, [diners, hasOnion, doneness, potatoCut]);

  // 2. Normalize generated recipe into Tortilla DNA profile
  const userDna = useMemo(() => {
    return normalizeRecipe(userRecipe);
  }, [userRecipe]);

  // 3. Find selected reference recipe
  const selectedRefRecipe = useMemo(() => {
    return referenceRecipes.find((r) => r.id === selectedRefId) || referenceRecipes[0];
  }, [referenceRecipes, selectedRefId]);

  // 4. Compare user custom recipe against reference recipe
  const comparison = useMemo(() => {
    if (!userRecipe || !selectedRefRecipe) return null;
    return compareRecipes(userRecipe, selectedRefRecipe);
  }, [userRecipe, selectedRefRecipe]);

  const { eggCount, panSizeCm } = userRecipe;
  const potatoGrams = userRecipe.ingredients.find((i) => i.ingredientId === "potato")?.amount || 0;
  const onionGrams = userRecipe.ingredients.find((i) => i.ingredientId === "onion")?.amount || 0;
  const saltGrams = userRecipe.ingredients.find((i) => i.ingredientId === "salt")?.amount || 0;
  const oilUsed = userRecipe.oilUsage?.cookingAmount || 0;
  const oilAbsorbed = userRecipe.oilUsage?.estimatedAbsorbedAmount || 0;

  function getLocalizedText(str: string | LocalizedString | undefined): string {
    if (!str) return "";
    if (typeof str === "object") {
      return str[lang as "es" | "en" | "de"] || str.es || str.en || "";
    }
    return str;
  }

  const handleCopyRecipe = () => {
    const text = lang.startsWith("de") ?
      `🍳 Meine Tortilla (${diners} Personen)
- ${eggCount} große Eier
- ${potatoGrams}g Kartoffeln
${hasOnion ? `- ${onionGrams}g süße Zwiebeln` : "- Ohne Zwiebeln"}
- ${oilUsed}ml Olivenöl zum Frittieren (${oilAbsorbed}ml aufgenommen)
- ${saltGrams}g Salz
- Empfohlene Pfannengröße: ${panSizeCm}cm
- Garstufe: ${doneness === "betanzos" ? "Betanzos-Stil" : doneness === "jugosa" ? "Cremige Mitte" : "Fest durchgegart"}`
      : lang.startsWith("es") ?
      `🍳 Mi Receta de Tortilla de Patatas (${diners} personas)
- ${eggCount} huevos grandes
- ${potatoGrams}g de patatas Monalisa
${hasOnion ? `- ${onionGrams}g de cebolla dulce` : "- Sin cebolla"}
- ${oilUsed}ml de AOVE para pochar (${oilAbsorbed}ml absorbidos)
- ${saltGrams}g de sal
- Sartén recomendada: ${panSizeCm}cm
- Punto: ${doneness === "betanzos" ? "Estilo Betanzos" : doneness === "jugosa" ? "Cremosa / En su punto" : "Cuajada firme"}`
      : `🍳 My Spanish Tortilla Recipe (${diners} servings)
- ${eggCount} large eggs
- ${potatoGrams}g Monalisa potatoes
${hasOnion ? `- ${onionGrams}g sweet onion` : "- No onion"}
- ${oilUsed}ml EVOO for frying (${oilAbsorbed}ml absorbed)
- ${saltGrams}g salt
- Recommended pan size: ${panSizeCm}cm
- Doneness: ${doneness === "betanzos" ? "Betanzos style" : doneness === "jugosa" ? "Medium creamy center" : "Well done / Firm"}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8 max-w-3xl mx-auto">
        <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium bg-amber-100 text-amber-900 border-amber-200">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
          {t("builder.badge", "Constructor Interactivo & Tortilla DNA")}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          {t("builder.title", "Crea tu propia tortilla")}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t("builder.subtitle", "Ajusta comensales, elige tu técnica favorita y obtén las proporciones exactas para una tortilla perfecta.")}
        </p>
      </div>

      {/* External Creator Link Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/15 border-2 border-amber-500/40 rounded-2xl p-5 mb-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-amber-500 text-white font-bold shrink-0 shadow-2xs">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-foreground flex items-center gap-2 flex-wrap">
              <span>{t("builder.creatorAppLabel", "Tortilla Creator Web App")}</span>
              <Badge variant="outline" className="text-xs bg-amber-100 text-amber-900 border-amber-300">
                tortilladepatatas.de
              </Badge>
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {t("builder.appDesc", "Accede a la aplicación interactiva Tortilla Creator en https://tortilladepatatas.de/ para personalizar y calcular tu receta.")}
            </p>
          </div>
        </div>
        <a
          href="https://tortilladepatatas.de/"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-full sm:w-auto"
        >
          <Button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xs gap-2">
            <span>{t("builder.openApp", "Abrir Tortilla Creator")}</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </a>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Diners selector */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600" />
                {t("builder.dinersQuestion", "¿Para cuántas personas?")}
              </CardTitle>
              <CardDescription>
                {t("builder.dinersDesc", "Calcularemos la sartén y las cantidades según el número de comensales.")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                {[2, 4, 6, 8].map((num) => (
                  <Button
                    key={num}
                    variant={diners === num ? "default" : "outline"}
                    className={`flex-1 h-12 text-base font-semibold transition-all ${
                      diners === num ? "bg-amber-600 hover:bg-amber-700 text-white shadow" : ""
                    }`}
                    onClick={() => setDiners(num)}
                  >
                    {num} {t("builder.servings", "pers.")}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Onion Debate */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-amber-600" />
                  {t("builder.onionDebate", "El debate del siglo: ¿Con o sin cebolla?")}
                </span>
                <Badge variant={hasOnion ? "default" : "secondary"} className={hasOnion ? "bg-amber-600" : ""}>
                  {hasOnion ? t("builder.withOnion", "Con cebolla") : t("builder.noOnion", "Sin cebolla")}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setHasOnion(true)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    hasOnion
                      ? "border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 ring-2 ring-amber-600/30"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className="font-semibold text-foreground text-base mb-1">
                    🧅 {t("builder.concebollista", "Con Cebolla (Concebollista)")}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("builder.concebollistaDesc", "Aporta dulzor, jugosidad y un toque caramelizado irresistible.")}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setHasOnion(false)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    !hasOnion
                      ? "border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 ring-2 ring-amber-600/30"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className="font-semibold text-foreground text-base mb-1">
                    🥔 {t("builder.sincebollista", "Sin Cebolla (Sincebollista)")}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("builder.sincebollistaDesc", "Sabor puro a huevo fresco y patata dorada en aceite de oliva.")}
                  </p>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Doneness level */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-600" />
                {t("builder.donenessTitle", "Punto de cuajado")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  {
                    id: "betanzos",
                    title: t("builder.betanzosTitle", "Estilo Betanzos"),
                    desc: t("builder.betanzosDesc", "Muy jugosa, el huevo corre al cortar."),
                    icon: "💧"
                  },
                  {
                    id: "jugosa",
                    title: t("builder.jugosaTitle", "En su punto"),
                    desc: t("builder.jugosaDesc", "Interior cremoso y bordes sellados."),
                    icon: "✨"
                  },
                  {
                    id: "cuajada",
                    title: t("builder.cuajadaTitle", "Cuajada firme"),
                    desc: t("builder.cuajadaDesc", "Ideal para llevar a excursiones o bocadillos."),
                    icon: "🥪"
                  }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDoneness(item.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      doneness === item.id
                        ? "border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 ring-2 ring-amber-600/30"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className="font-semibold text-foreground text-sm flex items-center gap-1.5 mb-1">
                      <span>{item.icon}</span> {item.title}
                    </div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Potato technique */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-600" />
                {t("builder.potatoCutTitle", "Corte de la patata")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPotatoCut("pochada")}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    potatoCut === "pochada"
                      ? "border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 ring-2 ring-amber-600/30"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">
                    🍳 {t("builder.pochadaTitle", "Pochada tradicional")}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("builder.pochadaDesc", "Fuego lento a 140°C para que quede blanda y melosa.")}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPotatoCut("crujiente")}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    potatoCut === "crujiente"
                      ? "border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 ring-2 ring-amber-600/30"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">
                    🔥 {t("builder.crujienteTitle", "Toque crujiente")}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("builder.crujienteDesc", "Un toque final de fuego fuerte para dorar las esquinas.")}
                  </p>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results & Interactive Recipe Card Column */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
          <motion.div
            key={`${diners}-${hasOnion}-${doneness}-${potatoCut}`}
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-amber-50/40 via-background to-background dark:from-amber-950/20 shadow-xl overflow-hidden">
              <CardHeader className="bg-amber-500/10 border-b border-amber-500/20 pb-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-amber-600 hover:bg-amber-700 text-white font-medium">
                    {diners} {t("builder.dinersTag", "Comensales")} • {panSizeCm} cm
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyRecipe}
                    className="h-8 gap-1.5 text-xs bg-background/80 hover:bg-background"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? t("builder.copied", "¡Copiada!") : t("builder.copyRecipe", "Copiar receta")}
                  </Button>
                </div>
                <CardTitle className="text-2xl pt-2 text-foreground font-extrabold">
                  {t("builder.recipeCardTitle", "Tu Ficha de Ingredientes")}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                {/* Ingredients Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-card border border-border shadow-2xs">
                    <span className="text-2xl font-bold text-amber-600 block">{eggCount}</span>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      🥚 {t("builder.eggsLabel", "Huevos L / XL")}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-card border border-border shadow-2xs">
                    <span className="text-2xl font-bold text-amber-600 block">{potatoGrams} g</span>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      🥔 {t("builder.potatoesLabel", "Patatas Monalisa")}
                    </span>
                  </div>

                  {hasOnion && (
                    <div className="p-3 rounded-lg bg-card border border-border shadow-2xs">
                      <span className="text-2xl font-bold text-amber-600 block">{onionGrams} g</span>
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        🧅 {t("builder.onionLabel", "Cebolla dulce")}
                      </span>
                    </div>
                  )}

                  {/* Oil usage display with separated cooking oil vs absorbed oil */}
                  <div className="p-3 rounded-lg bg-card border border-border shadow-2xs col-span-2 sm:col-span-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-amber-600 block">{oilAbsorbed} ml</span>
                      <span className="text-[11px] text-muted-foreground font-semibold">({oilUsed} ml {t("builder.inPan", "en sartén")})</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block mt-1">
                      🫒 {t("builder.oilLabel", "AOVE (Absorbido)")}
                    </span>
                  </div>
                </div>

                {/* Tortilla DNA Profile Summary */}
                <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Perfil ADN de tu receta
                    </span>
                    <Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-900 border-amber-300">
                      Normalizado / 1 huevo
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="bg-white/80 dark:bg-background/80 p-2 rounded-md border border-amber-200/40">
                      <span className="text-muted-foreground text-[10px] block">{t("builder.potatoPerEgg", "Patata por huevo")}</span>
                      <span className="font-bold text-foreground">{userDna.ratios.potato?.quantity}g / {t("comparator.eggSingle", "huevo")}</span>
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 block font-medium">
                        ({userDna.classification.potatoIntensityLabel})
                      </span>
                    </div>

                    <div className="bg-white/80 dark:bg-background/80 p-2 rounded-md border border-amber-200/40">
                      <span className="text-muted-foreground text-[10px] block">{t("builder.oilAbsorbed", "Aceite absorbido")}</span>
                      <span className="font-bold text-foreground">{userDna.ratios.oil?.quantity}ml / {t("comparator.eggSingle", "huevo")}</span>
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 block font-medium">
                        ({userDna.classification.oilIntensityLabel})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pro Tips & Times */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-200 text-xs font-medium">
                    <Timer className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>
                      {t("builder.estimatedTime", "Tiempo estimado: ~25-30 min")} | {t("builder.heatPerSide", "Fuego en sartén:")}{" "}
                      {doneness === "betanzos"
                        ? t("builder.heatBetanzos", "Fuerte 30 seg/lado")
                        : doneness === "jugosa"
                        ? t("builder.heatJugosa", "Medio-Alto 1.5 min/lado")
                        : t("builder.heatCuajada", "Medio-Bajo 3 min/lado")}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 text-xs font-medium">
                    <Info className="w-4 h-4 shrink-0 text-blue-600" />
                    <span>
                      {t("builder.proTip", "Truco Pro: Tras freír la patata, mézclala caliente con el huevo batido y déjala reposar 5 minutos antes de cuajar.")}
                    </span>
                  </div>
                </div>

                {/* Step List */}
                <div className="space-y-2 border-t border-border pt-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <CircleDot className="w-4 h-4 text-amber-600" />
                    {t("builder.keyStepsTitle", "Pasos clave de elaboración")}
                  </h4>
                  <ol className="text-xs text-muted-foreground space-y-2 pl-4 list-decimal">
                    <li>
                      {t("builder.step1", "Pela y corta las patatas en láminas finas e desiguales (chascar).")}
                    </li>
                    {hasOnion && (
                      <li>
                        {t("builder.step2Onion", "Pica la cebolla y póchala junto a la patata en abundante aceite de oliva virgen extra.")}
                      </li>
                    )}
                    <li>
                      {t("builder.step3", "Bate los huevos sin espumar demasiado y añade una pizca generosa de sal.")}
                    </li>
                    <li>
                      {t("builder.step4", `Cuaja en sartén de ${panSizeCm}cm antiadherente bien caliente con unas gotas de aceite.`)}
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Interactive DNA Comparator Section */}
      <div className="mt-16 pt-10 border-t border-border space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-amber-600" />
              <h2 className="text-2xl font-extrabold text-foreground">
                {t("builder.compareTitle", "Compara tu tortilla personalizada con referencias icónicas")}
              </h2>
              {/* i18n verified */}
            </div>
            <p className="text-sm text-muted-foreground">{t("builder.compareSubtitle", "Compara matemáticamente las proporciones normalizadas por huevo de tu receta contra tortillas famosas.")}</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider shrink-0">{t("builder.compareWith", "Comparar con:")}</label>
            <select
              value={selectedRefId}
              onChange={(e) => setSelectedRefId(e.target.value)}
              className="px-3 py-2 rounded-xl bg-background border border-border text-sm font-bold text-foreground focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              {referenceRecipes.map((r) => (
                <option key={r.id} value={r.id}>
                  {getLocalizedText(r.title || r.recipeName || r.name)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Result Table */}
        {comparison && (
          <div className="grid md:grid-cols-12 gap-6 items-start">
            {/* Comparison Details */}
            <div className="md:col-span-8 bg-card rounded-2xl border border-border overflow-hidden shadow-xs">
              <div className="p-4 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <span>{t("builder.yourRecipe", "Tu Receta")} ({userRecipe.servings} {t("builder.pers", "pers.")})</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="text-amber-700 dark:text-amber-400">
                    {getLocalizedText(selectedRefRecipe.title || selectedRefRecipe.recipeName)}
                  </span>
                </h3>
                <Badge variant="outline" className="text-xs bg-amber-100 text-amber-900 border-amber-300 font-bold">{t("builder.proportionPerEgg", "Proporción por 1 Huevo")}</Badge>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-muted-foreground">
                      <th className="p-3 font-bold uppercase text-[11px]">{t("builder.tableIngredient", "Ingrediente")}</th>
                      <th className="p-3 font-bold uppercase text-[11px]">{t("builder.tableYourRecipe", "Tu receta (/huevo)")}</th>
                      <th className="p-3 font-bold uppercase text-[11px]">{t("builder.tableRefRecipe", "Referencia (/huevo)")}</th>
                      <th className="p-3 font-bold uppercase text-[11px]">{t("builder.tableDifference", "Diferencia")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {comparison.ingredients.map((item) => {
                      const isDiffPositive = item.difference > 0;
                      return (
                        <tr key={item.ingredientId} className="hover:bg-muted/20 transition-colors">
                          <td className="p-3 font-semibold text-foreground capitalize">
                            {getLocalizedText(item.name)}
                          </td>
                          <td className="p-3 font-mono font-bold text-foreground">
                            {item.recipeAValue} {item.unit}
                          </td>
                          <td className="p-3 font-mono font-bold text-foreground">
                            {item.recipeBValue} {item.unit}
                          </td>
                          <td className="p-3 font-mono">
                            {item.difference === 0 ? (
                              <span className="text-muted-foreground text-xs font-normal">{t("builder.tableEqual", "Igual (0%)")}</span>
                            ) : (
                              <span
                                className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-xs ${
                                  isDiffPositive
                                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                                    : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                }`}
                              >
                                {isDiffPositive ? `+${item.difference}` : item.difference} {item.unit}{" "}
                                ({isDiffPositive ? `+${item.percentageDifference}%` : `${item.percentageDifference}%`})
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side-by-side DNA Profile Tags */}
            <div className="md:col-span-4 bg-amber-50/50 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-200/60 space-y-4">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-2 border-b border-amber-200/60 pb-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                {t("builder.classificationComparison", "Comparativa de Clasificación")}
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-muted-foreground font-medium block">{t("builder.potatoIntensity", "Intensidad de Patata:")}</span>
                  <div className="flex items-center gap-2 mt-0.5 font-bold">
                    <span className="text-amber-800 dark:text-amber-300">{comparison.profile.potatoIntensity.a}</span>
                    <span className="text-muted-foreground">vs</span>
                    <span className="text-foreground">{comparison.profile.potatoIntensity.b}</span>
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground font-medium block">{t("builder.oilIntensity", "Aporte de Aceite:")}</span>
                  <div className="flex items-center gap-2 mt-0.5 font-bold">
                    <span className="text-amber-800 dark:text-amber-300">{comparison.profile.oilIntensity.a}</span>
                    <span className="text-muted-foreground">vs</span>
                    <span className="text-foreground">{comparison.profile.oilIntensity.b}</span>
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground font-medium block">{t("builder.onionPresence", "Presencia de Cebolla:")}</span>
                  <div className="flex items-center gap-2 mt-0.5 font-bold">
                    <span className="text-amber-800 dark:text-amber-300">{comparison.profile.onionPresence.a}</span>
                    <span className="text-muted-foreground">vs</span>
                    <span className="text-foreground">{comparison.profile.onionPresence.b}</span>
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground font-medium block">{t("builder.eggDominance", "Dominancia del Huevo:")}</span>
                  <div className="flex items-center gap-2 mt-0.5 font-bold">
                    <span className="text-amber-800 dark:text-amber-300">{comparison.profile.eggDominance.a}</span>
                    <span className="text-muted-foreground">vs</span>
                    <span className="text-foreground">{comparison.profile.eggDominance.b}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
