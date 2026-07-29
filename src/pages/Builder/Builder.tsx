import { useState } from "react";
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
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Builder() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "es";

  // State options
  const [diners, setDiners] = useState<number>(4);
  const [hasOnion, setHasOnion] = useState<boolean>(true);
  const [doneness, setDoneness] = useState<"betanzos" | "jugosa" | "cuajada">("jugosa");
  const [potatoCut, setPotatoCut] = useState<"pochada" | "crujiente">("pochada");
  const [copied, setCopied] = useState<boolean>(false);

  // Math calculations based on traditional Spanish chef ratios
  // Standard ratio per diner: ~1.5 eggs, ~150g potatoes, ~40g onion
  const eggCount = Math.max(2, Math.round(diners * 1.5));
  const potatoGrams = diners * 150;
  const onionGrams = hasOnion ? Math.round(diners * 45) : 0;
  const oilMl = Math.round(potatoGrams * 0.8); // Enough to submerge
  const saltGrams = Math.round(eggCount * 0.8); // ~0.8g per egg
  const panSizeCm = diners <= 2 ? 20 : diners <= 5 ? 24 : 28;

  const handleCopyRecipe = () => {
    const text = lang.startsWith("de") ?
      `🍳 Tortilla-Rezept (${diners} Personen)
- ${eggCount} große Eier
- ${potatoGrams}g Kartoffeln (Monalisa oder Kennebec)
${hasOnion ? `- ${onionGrams}g süße Zwiebeln` : "- Ohne Zwiebeln"}
- ${oilMl}ml Olivenöl Nativ Extra
- ${saltGrams}g Salz
- Empfohlene Pfannengröße: ${panSizeCm}cm
- Garstufe: ${doneness === "betanzos" ? "Sehr saftig (Betanzos-Stil)" : doneness === "jugosa" ? "Cremige Mitte" : "Fest durchgegart"}`
      : lang.startsWith("es") ?
      `🍳 Receta Tortilla de Patatas (${diners} personas)
- ${eggCount} huevos grandes
- ${potatoGrams}g de patatas (variedad Monalisa o Kennebec)
${hasOnion ? `- ${onionGrams}g de cebolla dulce` : "- Sin cebolla"}
- ${oilMl}ml de Aceite de Oliva Virgen Extra (AOVE)
- ${saltGrams}g de sal
- Sartén recomendada: ${panSizeCm}cm
- Punto: ${doneness === "betanzos" ? "Muy jugosa (Estilo Betanzos)" : doneness === "jugosa" ? "En su punto / Cremosa" : "Cuajada firme"}`
      : `🍳 Spanish Tortilla Recipe (${diners} servings)
- ${eggCount} large eggs
- ${potatoGrams}g potatoes (Monalisa or Yukon Gold)
${hasOnion ? `- ${onionGrams}g sweet onion` : "- No onion"}
- ${oilMl}ml Extra Virgin Olive Oil
- ${saltGrams}g salt
- Recommended pan size: ${panSizeCm}cm
- Doneness: ${doneness === "betanzos" ? "Very runny (Betanzos style)" : doneness === "jugosa" ? "Medium / Creamy center" : "Well done / Firm"}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8 max-w-3xl mx-auto">
        <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium bg-amber-100 text-amber-900 border-amber-200">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
          {t("builder.badge", "Constructor Interactivo de Tortilla")}
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
              <span>Tortilla Creator Web App</span>
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

                  <div className="p-3 rounded-lg bg-card border border-border shadow-2xs">
                    <span className="text-2xl font-bold text-amber-600 block">{oilMl} ml</span>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      🫒 {t("builder.oilLabel", "AOVE (Aceite)")}
                    </span>
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
    </main>
  );
}
