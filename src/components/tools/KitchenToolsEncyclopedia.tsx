import React, { useState } from "react";
import {
  Flame,
  ChefHat,
  ShieldCheck,
  Sparkles,
  Layers,
  CheckCircle2,
  XCircle,
  Gauge,
  Thermometer,
  RotateCw,
  Utensils,
  Sliders
} from "lucide-react";
import {
  PEELER_COMPARISON_DATA,
  SKILLET_MATERIAL_ANALYSIS,
  ESSENTIAL_TOOLS_LIST
} from "@/data/toolsData";
import { Badge } from "@/components/ui/badge";

interface KitchenToolsEncyclopediaProps {
  lang?: string;
}

export function KitchenToolsEncyclopedia({ lang = "es" }: KitchenToolsEncyclopediaProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";
  const [activeTab, setActiveTab] = useState<"peelers" | "double-pans" | "materials" | "diameter-calc" | "all-tools">("peelers");

  // Skillet scale calculator state
  const [eggCount, setEggCount] = useState<number>(6);

  // Calculate recommended proportions based on egg count
  const calculatedSpecs = {
    potatoesGrams: eggCount * 110,
    optimalPanDiameterCm: eggCount <= 3 ? 18 : eggCount <= 5 ? 20 : eggCount <= 8 ? 24 : eggCount <= 10 ? 26 : 28,
    targetHeightCm: eggCount <= 4 ? "3.0 - 3.5 cm" : eggCount <= 7 ? "3.8 - 4.2 cm" : "4.5 - 5.0 cm",
    flipDifficulty: eggCount <= 4 ? "Fácil (Plato estándar)" : eggCount <= 7 ? "Media (Plato vuelvetortillas)" : "Alta (Sartén doble recomendada o plato con pomo)",
    servings: eggCount <= 4 ? "2 personas (Ración estándar)" : eggCount <= 7 ? "3 - 4 personas" : "5 - 8 personas (Formato taberna)",
  };

  return (
    <section className="space-y-10">
      {/* Header & Scientific Value Proposition */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB800]/15 dark:bg-[#FFB800]/25 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold border border-[#FFB800]/30 shadow-xs">
          <ChefHat className="h-4 w-4 text-[#FFB800]" />
          <span>
            {currentLang === "es"
              ? "Guía Técnica & Física del Menaje Culinario"
              : currentLang === "de"
              ? "Technische Werkzeug- & Materialanalyse"
              : "Technical Guide & Culinary Physics of Tools"}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif-heading text-foreground tracking-tight">
          {currentLang === "es"
            ? "Utensilios, Sartenes & Física del Pelado"
            : currentLang === "de"
            ? "Küchenwerkzeuge, Pfannen & Schälphysik"
            : "Kitchen Utensils, Skillets & Peeling Physics"}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {currentLang === "es"
            ? "¿Cuál es la mejor herramienta para pelar patatas? ¿Merecen la pena las sartenes dobles volteadoras? Análisis independiente basado en termodinámica, ergonomía y rendimiento en cocina."
            : currentLang === "de"
            ? "Welches ist das beste Werkzeug zum Kartoffelschälen? Lohnen sich Doppel-Wendipfannen? Unabhängige Analyse basierend auf Physik, Ergonomie und Kochpraxis."
            : "What is the scientifically superior potato peeler? Are dual flip pans worth it? Independent analysis based on thermodynamics, ergonomics, and culinary performance."}
        </p>

        {/* Editorial Independence Notice */}
        <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border/80 text-xs text-muted-foreground shadow-2xs">
          <ShieldCheck className="h-4 w-4 text-[#2E7D32] shrink-0" />
          <span>
            {currentLang === "es"
              ? "Evaluación editorial 100% independiente sin patrocinio de marcas ni enlaces comerciales. Ciencia culinaria pura."
              : currentLang === "de"
              ? "100 % unabhängige Analyse ohne Marken-Sponsoring oder kommerzielle Bindung. Reine Küchenwissenschaft."
              : "100% independent editorial evaluation with zero brand sponsorships. Pure culinary physics."}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-b border-border pb-4">
        {[
          {
            id: "peelers",
            label: currentLang === "es" ? "🥔 ¿Cómo Pelar Patatas?" : currentLang === "de" ? "🥔 Kartoffelschäler-Test" : "🥔 Potato Peeler Science",
            icon: Utensils,
          },
          {
            id: "double-pans",
            label: currentLang === "es" ? "🍳 Sartenes Dobles: Análisis" : currentLang === "de" ? "🍳 Doppelpfannen-Analyse" : "🍳 Double Flip Skillets",
            icon: RotateCw,
          },
          {
            id: "materials",
            label: currentLang === "es" ? "🔥 Hierro vs Aluminio vs Inox" : currentLang === "de" ? "🔥 Eisen vs Aluminium vs Inox" : "🔥 Skillet Materials",
            icon: Flame,
          },
          {
            id: "diameter-calc",
            label: currentLang === "es" ? "📐 Calculador Diámetro & Huevos" : currentLang === "de" ? "📐 Pfannengrößen-Rechner" : "📐 Skillet Size Calculator",
            icon: Sliders,
          },
          {
            id: "all-tools",
            label: currentLang === "es" ? "🔪 Arsenal Completo" : currentLang === "de" ? "🔪 Gesamtes Menage-Arsenal" : "🔪 Full Essential Toolkit",
            icon: Layers,
          },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs ${
                isSelected
                  ? "bg-[#8D6E63] text-white dark:bg-[#FFB800] dark:text-[#1C1917] border border-[#8D6E63] dark:border-[#FFB800] shadow-sm scale-102"
                  : "bg-card text-foreground/80 hover:text-foreground border border-border hover:bg-accent"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: POTATO PEELER SCIENCE */}
      {activeTab === "peelers" && (
        <div className="space-y-8">
          {/* Key Takeaway Card */}
          <div className="card-notebook p-6 sm:p-8 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-2 border-[#FFB800]/40 rounded-3xl shadow-stacked-parchment space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#FFB800] text-[#1C1917] font-extrabold text-xs px-3 py-1">
                ⭐ {currentLang === "es" ? "Veredicto Científico" : currentLang === "de" ? "Wissenschaftliches Fazit" : "Scientific Verdict"}
              </Badge>
              <span className="text-xs font-mono font-bold text-muted-foreground">
                {currentLang === "es" ? "Test de Mermas & Retención de Almidón" : currentLang === "de" ? "Schwund- & Stärketest" : "Waste & Starch Retention Test"}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-foreground">
              {currentLang === "es"
                ? "El Pelador en 'Y' con Cuchilla Pivotante es la Herramienta Superior"
                : currentLang === "de"
                ? "Der Y-Sparschäler mit Pendelklinge ist das überlegene Werkzeug"
                : "The Swivel Y-Peeler is the Scientifically Superior Tool"}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {currentLang === "es"
                ? "Pelar patatas con cuchillo de puntilla provoca una merma del 12% al 18% del peso total del tubérculo, eliminando la valiosa corteza subepidérmica rica en sales minerales y almidón de calidad. El pelador en Y con hoja pivotante reduce la merma a menos del 4% gracias a un ángulo de ataque constante de 0.8 mm y permite pelar 1 kg de patatas en menos de 90 segundos con mínimo esfuerzo biomecánico."
                : currentLang === "de"
                ? "Das Schälen mit dem Küchenmesser führt zu 12 % bis 18 % Masseverlust und schneidet die stärkereiche Schicht direkt unter der Schale ab. Der Y-Schäler reduziert den Verlust auf unter 4 % bei gleichbleibender Schnittstärke von 0,8 mm und schont das Handgelenk."
                : "Peeling potatoes with a paring knife strips away 12% to 18% of total tuber weight and removes nutrient-dense sub-epidermal starch. The swivel Y-peeler limits waste to under 4% with a uniform 0.8 mm shave depth, processing 1 kg of potatoes in under 90 seconds."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-card border border-border space-y-1">
                <span className="text-xs font-bold text-[#2E7D32] flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  {currentLang === "es" ? "Merma Mínima (4%)" : "Minimal Waste (4%)"}
                </span>
                <p className="text-xs text-muted-foreground">
                  {currentLang === "es" ? "Ahorro de hasta 140 g de patata útil por cada kilogramo pelado." : "Saves up to 140g of potato flesh per kilo peeled."}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-card border border-border space-y-1">
                <span className="text-xs font-bold text-[#00A3FF] flex items-center gap-1">
                  <Gauge className="h-4 w-4" />
                  {currentLang === "es" ? "Biomecánica de Tracción" : "Pulling Biomechanics"}
                </span>
                <p className="text-xs text-muted-foreground">
                  {currentLang === "es" ? "La fuerza se ejerce con los flexores del brazo, no con la muñeca." : "Uses forearm pull stroke rather than tiring wrist pivots."}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-card border border-border space-y-1">
                <span className="text-xs font-bold text-[#FFB800] flex items-center gap-1">
                  <Sparkles className="h-4 w-4" />
                  {currentLang === "es" ? "Extractor de Ojos" : "Integrated Eye Remover"}
                </span>
                <p className="text-xs text-muted-foreground">
                  {currentLang === "es" ? "Punta lateral para eliminar yemas sin mutilar el cuerpo de la patata." : "Side loop clears blemishes without gouging potato meat."}
                </p>
              </div>
            </div>
          </div>

          {/* Comparative Matrix Table */}
          <div className="card-notebook p-6 bg-card border border-border rounded-3xl shadow-stacked-parchment space-y-4">
            <h3 className="text-xl font-bold font-serif-heading text-foreground">
              {currentLang === "es"
                ? "Matriz Comparativa: Herramientas de Pelado de Patata"
                : currentLang === "de"
                ? "Vergleichsmatrix: Schälwerkzeuge für Kartoffeln"
                : "Comparative Matrix: Potato Peeling Implements"}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="p-3 font-bold text-foreground">Herramienta</th>
                    <th className="p-3 font-bold text-foreground">Pérdida / Merma %</th>
                    <th className="p-3 font-bold text-foreground">Grosor de Corte</th>
                    <th className="p-3 font-bold text-foreground">Velocidad</th>
                    <th className="p-3 font-bold text-foreground">Retención de Almidón</th>
                    <th className="p-3 font-bold text-foreground">Recomendación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {PEELER_COMPARISON_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-accent/40 transition-colors">
                      <td className="p-3 font-bold text-foreground">
                        {row.tool[currentLang] || row.tool.es}
                      </td>
                      <td className="p-3 font-mono font-bold text-[#D32F2F]">
                        {row.wastePercentage}
                      </td>
                      <td className="p-3 font-mono text-muted-foreground">
                        {row.cutPrecision}
                      </td>
                      <td className="p-3 text-amber-500 font-semibold">
                        {row.speedRating}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.starchPreservation[currentLang] || row.starchPreservation.es}
                      </td>
                      <td className="p-3 text-foreground/90 font-medium">
                        {row.recommendation[currentLang] || row.recommendation.es}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Blade Metallurgy Insight: Carbon Steel vs Stainless vs Ceramic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-notebook p-5 bg-card border border-border rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#8D6E63] dark:text-[#FFB800]">
                Cuchilla de Acero al Carbono
              </span>
              <h4 className="text-base font-bold font-serif-heading text-foreground">
                El Filo Más Quirúrgico
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Toma el micro-filo más afilado y muerde la piel de patatas cerosas (Monalisa) al instante. Requiere secarse inmediatamente después de su uso para evitar pátina oscura de óxido.
              </p>
            </div>

            <div className="card-notebook p-5 bg-card border border-border rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#8D6E63] dark:text-[#FFB800]">
                Cuchilla de Acero Inoxidable Templado
              </span>
              <h4 className="text-base font-bold font-serif-heading text-foreground">
                El Estándar Profesional Duradero
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Excelente equilibrio entre retención de filo y resistencia absoluta a la corrosión y lavavajillas. La opción predilecta en cocinas profesionales con alto volumen.
              </p>
            </div>

            <div className="card-notebook p-5 bg-card border border-border rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#8D6E63] dark:text-[#FFB800]">
                Cuchilla de Cerámica de Zirconio
              </span>
              <h4 className="text-base font-bold font-serif-heading text-foreground">
                Inercia Química y Cero Oxidación
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Completamente inmune a los ácidos vegetales, no transfiere iones metálicos. Su única desventaja es la fragilidad mecánica ante caídas en superficies duras.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DOUBLE FLIP PANS ANALYSIS */}
      {activeTab === "double-pans" && (
        <div className="space-y-8">
          <div className="card-notebook p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-2 border-[#00A3FF]/40 rounded-3xl shadow-stacked-parchment space-y-5">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#00A3FF] text-white font-extrabold text-xs px-3 py-1">
                🔄 {currentLang === "es" ? "Ingeniería de Volteado" : currentLang === "de" ? "Wende-Ingenieurtechnik" : "Flip Engineering"}
              </Badge>
              <span className="text-xs font-mono font-bold text-muted-foreground">
                Sartenes Dobles Acoplables
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-foreground">
              {currentLang === "es"
                ? "Sartenes Dobles: ¿Solución Definitiva o Trampa de Vapor?"
                : currentLang === "de"
                ? "Doppel-Wendipfannen: Perfekte Lösung oder Dampffalle?"
                : "Double Flip Pans: Ultimate Solution or Steam Trap?"}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {currentLang === "es"
                ? "Las sartenes dobles resuelven el 100% del pánico al volteo y eliminan el peligro de quemaduras por aceite caliente. Sin embargo, encierran un riesgo físico que pocos recetarios advierten: la trampa de vapor."
                : currentLang === "de"
                ? "Doppelpfannen nehmen 100 % der Angst vor dem Wenden und verhindern Ölspritzer. Allerdings bergen sie ein physikalisches Risiko: den Dampfstau."
                : "Double flip pans eliminate 100% of the fear of turning and prevent hot oil burns. However, they carry a physical trade-off: the steam condensation trap."}
            </p>

            {/* Pros vs Cons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-card border border-emerald-500/30 space-y-3">
                <h3 className="text-base font-bold text-[#2E7D32] flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  {currentLang === "es" ? "Ventajas Insuperables" : "Unmatched Advantages"}
                </h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2E7D32] font-bold">✓</span>
                    <span><strong>Cero derrames:</strong> La junta estanca retiene el huevo líquido de tortillas estilo Betanzos durante la rotación rápida.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2E7D32] font-bold">✓</span>
                    <span><strong>Facilidad para tortillas gigantes:</strong> Girar una tortilla de 8 a 12 huevos (~1.5 kg) es físicamente trivial sin peligro de rotura.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2E7D32] font-bold">✓</span>
                    <span><strong>Versatilidad:</strong> Se desacoplan con un simple clic para funcionar como dos sartenes independientes de uso diario.</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-rose-500/30 space-y-3">
                <h3 className="text-base font-bold text-[#D32F2F] flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  {currentLang === "es" ? "El Peligro del Vapor & Errores Comunes" : "The Steam Pitfall & Common Mistakes"}
                </h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D32F2F] font-bold">✗</span>
                    <span><strong>Efecto 'Tortilla Cocida':</strong> Si se cocina con la sartén superior cerrada, la humedad del huevo se condensa en la tapa y gotea, 'cociendo' la tortilla al vapor en lugar de crear la reacción de Maillard dorada.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D32F2F] font-bold">✗</span>
                    <span><strong>Peso en mano:</strong> Al estar unidas, el peso total se duplica (~1.8 kg en vacío), requiriendo un agarre firme en el mango antes de rotar.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* The 3-Step Protocol on How to use a Double Pan */}
          <div className="card-notebook p-6 sm:p-8 bg-card border border-border rounded-3xl shadow-stacked-parchment space-y-6">
            <h3 className="text-xl font-bold font-serif-heading text-foreground">
              {currentLang === "es"
                ? "El Protocolo Maestro: Cómo Usar la Sartén Doble sin Arruinar la Textura"
                : currentLang === "de"
                ? "Das Meister-Protokoll: Richtiges Wenden mit der Doppelpfanne"
                : "Master Protocol: How to Cook with a Double Pan Correctly"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-secondary/50 border border-border space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#FFB800] text-[#1C1917] font-extrabold flex items-center justify-center text-sm">
                  1
                </div>
                <h4 className="text-sm font-bold text-foreground">Cocina 100% Abierta</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Vierte la mezcla en la sartén base caliente sin acoplar la segunda sartén. Deja que el vapor del huevo y la patata se evapore libremente para lograr un sellado dorado.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-secondary/50 border border-border space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#FFB800] text-[#1C1917] font-extrabold flex items-center justify-center text-sm">
                  2
                </div>
                <h4 className="text-sm font-bold text-foreground">Acopla y Voltea en 3 Segundos</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Cuando la base esté sellada, encaja la sartén superior, presiona firmemente los mangos y ejecuta un giro continuo y decidido de 180° sobre la llama.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-secondary/50 border border-border space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#FFB800] text-[#1C1917] font-extrabold flex items-center justify-center text-sm">
                  3
                </div>
                <h4 className="text-sm font-bold text-foreground">Desacopla Inmediatamente</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Nada más aterrizar sobre el fuego, retira la sartén superior para que la tortilla respire y termine de sellar la cara inferior durante 45-60 segundos.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SKILLET MATERIALS & THERMODYNAMICS */}
      {activeTab === "materials" && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold font-serif-heading text-foreground">
              {currentLang === "es"
                ? "Termodinámica de Materiales: ¿Hierro, Aluminio o Acero Inox?"
                : currentLang === "de"
                ? "Materialthermodynamik: Eisen, Aluminium oder Edelstahl?"
                : "Skillet Metallurgy & Thermodynamics"}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              La conductividad térmica y la inercia del metal dictan si la tortilla se dora con una costra dorada o se quema antes de que el núcleo alcance los **70°C**.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILLET_MATERIAL_ANALYSIS.map((mat, idx) => (
              <div
                key={idx}
                className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-stacked-parchment space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-[#FFB800]/10 text-[#8D6E63] dark:text-[#FFB800] border-[#FFB800]/30 font-bold text-xs">
                      {mat.recommendedDiameter}
                    </Badge>
                    <span className="text-xs font-mono font-bold text-muted-foreground">
                      Inercia: {mat.thermalInertia}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-serif-heading text-foreground">
                    {mat.material[currentLang] || mat.material.es}
                  </h3>

                  <p className="text-xs text-foreground/80 italic border-l-2 border-[#FFB800] pl-2.5">
                    {mat.reactivity}
                  </p>

                  <div className="space-y-2 pt-1 text-xs">
                    <div>
                      <span className="font-bold text-[#2E7D32]">Ventaja clave: </span>
                      <span className="text-muted-foreground">{mat.pros[currentLang] || mat.pros.es}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#D32F2F]">Consideración: </span>
                      <span className="text-muted-foreground">{mat.cons[currentLang] || mat.cons.es}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-secondary/50 border border-border text-xs space-y-1 mt-4">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#FFB800]" />
                    Veredicto Culinario:
                  </span>
                  <p className="text-muted-foreground">
                    {mat.chefVerdict[currentLang] || mat.chefVerdict.es}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SKILLET DIAMETER & PROPORTIONS CALCULATOR */}
      {activeTab === "diameter-calc" && (
        <div className="space-y-8">
          <div className="card-notebook p-6 sm:p-10 bg-card border-2 border-[#FFB800]/40 rounded-3xl shadow-stacked-parchment space-y-8 max-w-4xl mx-auto">
            <div className="space-y-2 text-center">
              <Badge className="bg-[#FFB800] text-[#1C1917] font-extrabold text-xs">
                📐 {currentLang === "es" ? "Calibrador Geométrico" : "Geometric Scale Calculator"}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-foreground">
                {currentLang === "es"
                  ? "Calculador de Diámetro de Sartén vs Número de Huevos"
                  : currentLang === "de"
                  ? "Berechnung: Pfannendurchmesser vs Eieranzahl"
                  : "Skillet Diameter vs Egg Count Calculator"}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                El grosor áureo de la tortilla española se sitúa entre **3.8 cm y 4.5 cm**. Usa este calibrador para saber qué sartén usar según tus huevos disponibles.
              </p>
            </div>

            {/* Slider Control */}
            <div className="space-y-4 p-6 rounded-2xl bg-secondary/40 border border-border">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span>Número de Huevos Seleccionados:</span>
                  <span className="text-2xl font-extrabold font-mono text-[#8D6E63] dark:text-[#FFB800]">
                    {eggCount} huevos (Clase L)
                  </span>
                </label>
                <span className="text-xs font-mono text-muted-foreground font-bold">
                  {calculatedSpecs.servings}
                </span>
              </div>

              <input
                type="range"
                min="2"
                max="14"
                step="1"
                value={eggCount}
                onChange={(e) => setEggCount(Number(e.target.value))}
                className="w-full h-3 bg-card rounded-lg appearance-none cursor-pointer accent-[#FFB800]"
              />

              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>2 huevos (Individual)</span>
                <span>6 huevos (Estándar Hogar)</span>
                <span>10 huevos (Familia)</span>
                <span>14 huevos (Taberna Pro)</span>
              </div>
            </div>

            {/* Dynamic Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-card border border-border space-y-1 shadow-2xs">
                <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold block">
                  Diámetro Óptimo
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#8D6E63] dark:text-[#FFB800]">
                  Ø {calculatedSpecs.optimalPanDiameterCm} cm
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  Medida de boca superior
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border space-y-1 shadow-2xs">
                <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold block">
                  Patatas Necesarias
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground">
                  {calculatedSpecs.potatoesGrams} g
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  Peso en crudo pelado
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border space-y-1 shadow-2xs">
                <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold block">
                  Altura Estimada
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#2E7D32]">
                  {calculatedSpecs.targetHeightCm}
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  Espesor central tras cuajar
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border space-y-1 shadow-2xs">
                <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold block">
                  Técnica de Giro
                </span>
                <span className="text-xs font-bold text-foreground leading-snug block pt-1">
                  {calculatedSpecs.flipDifficulty}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FULL ESSENTIAL TOOLKIT LIST */}
      {activeTab === "all-tools" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ESSENTIAL_TOOLS_LIST.map((item) => {
            const name = item.name[currentLang] || item.name.es;
            const tagline = item.tagline[currentLang] || item.tagline.es;
            const principle = item.scientificPrinciple[currentLang] || item.scientificPrinciple.es;
            const pros = item.pros[currentLang] || item.pros.es;
            const cons = item.cons[currentLang] || item.cons.es;
            const verdict = item.verdict[currentLang] || item.verdict.es;

            return (
              <div
                key={item.id}
                className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-stacked-parchment flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <Badge variant="outline" className="bg-[#FFB800]/10 text-[#8D6E63] dark:text-[#FFB800] border-[#FFB800]/30 font-bold text-[11px]">
                    {item.specs.material}
                  </Badge>

                  <h3 className="text-lg font-bold font-serif-heading text-foreground leading-snug">
                    {name}
                  </h3>

                  <p className="text-xs font-semibold text-foreground/80 italic border-l-2 border-[#FFB800] pl-2.5">
                    "{tagline}"
                  </p>

                  <div className="p-3 rounded-xl bg-secondary/50 border border-border/50 text-[11px] space-y-1">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-[#FFB800]" />
                      Principio Físico / Científico:
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      {principle}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-[#2E7D32] block">Puntos Fuertes:</span>
                    <ul className="space-y-1 text-[11px] text-muted-foreground">
                      {pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {cons.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-[#D32F2F] block">A Tener en Cuenta:</span>
                      <ul className="space-y-1 text-[11px] text-muted-foreground">
                        {cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <XCircle className="h-3.5 w-3.5 text-[#D32F2F] shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-border text-[11px]">
                  <span className="font-bold text-foreground block mb-0.5">Veredicto Editorial:</span>
                  <p className="text-muted-foreground leading-normal">{verdict}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Safety Standard Notice */}
      <div className="card-notebook p-6 bg-gradient-to-r from-amber-500/10 via-card to-emerald-500/10 border border-border rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-[#2E7D32]/20 text-[#2E7D32] shrink-0">
            <Thermometer className="h-6 w-6" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-foreground font-serif-heading">
              Seguridad Alimentaria: El Estándar Térmico Oro
            </h4>
            <p className="text-xs text-muted-foreground">
              Para garantizar la inocuidad total contra la Salmonella manteniendo el centro cremoso, el núcleo debe alcanzar **70°C** durante **2 minutos** (o **63°C** durante **20 segundos**). Nunca mantener tortillas a temperatura ambiente durante más de **4 horas**.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
