import React, { useState, useMemo } from "react";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Printer,
  ShieldCheck,
  Scale,
  Sparkles,
  Users,
  Clock,
  Egg,
  Flame,
  FileText,
  Percent,
  Coins,
  Store,
  ChefHat,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProCostCalculatorProps {
  lang?: string;
}

export const ProCostCalculator: React.FC<ProCostCalculatorProps> = ({ lang = "es" }) => {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  // Currency selection
  const [currency, setCurrency] = useState<"EUR" | "USD" | "GBP">("EUR");
  const currencySymbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : "£";

  // Batch Configuration
  const [tortillasPerBatch, setTortillasPerBatch] = useState<number>(1);
  const [pinchosPerTortilla, setPinchosPerTortilla] = useState<number>(8);
  const [eggsPerTortilla, setEggsPerTortilla] = useState<number>(8);
  const [potatoesGramsPerTortilla, setPotatoesGramsPerTortilla] = useState<number>(800);
  const [onionGramsPerTortilla, setOnionGramsPerTortilla] = useState<number>(200);
  const [oilMlPerTortilla, setOilMlPerTortilla] = useState<number>(80);

  // Ingredient Wholesale Costs
  const [eggCostPerDozen, setEggCostPerDozen] = useState<number>(2.40); // 0.20€ / egg
  const [potatoCostPerKg, setPotatoCostPerKg] = useState<number>(1.20); // 1.20€ / kg
  const [onionCostPerKg, setOnionCostPerKg] = useState<number>(1.10);  // 1.10€ / kg
  const [oilCostPerLiter, setOilCostPerLiter] = useState<number>(6.50); // 6.50€ / L (AOVE)
  const [extrasCostPerTortilla, setExtrasCostPerTortilla] = useState<number>(0.30); // Salt, parchment, seasonings

  // Operational & Labor Overheads
  const [energyCostPerTortilla, setEnergyCostPerTortilla] = useState<number>(0.35); // Gas / Induction per cook
  const [prepTimeMinutes, setPrepTimeMinutes] = useState<number>(20);
  const [hourlyWage, setHourlyWage] = useState<number>(14.0);

  // Commercial Sale & Margin
  const [salePricePerPincho, setSalePricePerPincho] = useState<number>(3.80);
  const [dailyTortillasSold, setDailyTortillasSold] = useState<number>(6);
  const [operatingDaysPerMonth, setOperatingDaysPerMonth] = useState<number>(26);

  // Mathematical Calculations
  const costBreakdown = useMemo(() => {
    // Single Tortilla Raw Costs
    const eggCost = (eggsPerTortilla / 12) * eggCostPerDozen;
    const potatoCost = (potatoesGramsPerTortilla / 1000) * potatoCostPerKg;
    const onionCost = (onionGramsPerTortilla / 1000) * onionCostPerKg;
    const oilCost = (oilMlPerTortilla / 1000) * oilCostPerLiter;
    const foodCostPerTortilla = eggCost + potatoCost + onionCost + oilCost + extrasCostPerTortilla;

    // Labor Cost
    const laborCostPerTortilla = (prepTimeMinutes / 60) * hourlyWage;

    // Full Direct Cost
    const totalUnitCostPerTortilla = foodCostPerTortilla + energyCostPerTortilla + laborCostPerTortilla;

    // Pincho / Portion Metrics
    const foodCostPerPincho = foodCostPerTortilla / pinchosPerTortilla;
    const totalCostPerPincho = totalUnitCostPerTortilla / pinchosPerTortilla;

    // Revenue and Margins
    const totalRevenuePerTortilla = salePricePerPincho * pinchosPerTortilla;
    const grossProfitPerTortilla = totalRevenuePerTortilla - foodCostPerTortilla;
    const netProfitPerTortilla = totalRevenuePerTortilla - totalUnitCostPerTortilla;

    // Food Cost % (Target is typically 20-28% in healthy hospitality)
    const foodCostPercentage = totalRevenuePerTortilla > 0
      ? (foodCostPerTortilla / totalRevenuePerTortilla) * 100
      : 0;

    const grossMarginPercentage = 100 - foodCostPercentage;

    // Volume Forecasting
    const totalPinchosDaily = dailyTortillasSold * pinchosPerTortilla;
    const dailyGrossRevenue = dailyTortillasSold * totalRevenuePerTortilla;
    const dailyGrossProfit = dailyTortillasSold * grossProfitPerTortilla;
    const monthlyGrossRevenue = dailyGrossRevenue * operatingDaysPerMonth;
    const monthlyGrossProfit = dailyGrossProfit * operatingDaysPerMonth;
    const monthlyFoodCost = (dailyTortillasSold * foodCostPerTortilla) * operatingDaysPerMonth;

    return {
      eggCost,
      potatoCost,
      onionCost,
      oilCost,
      foodCostPerTortilla,
      laborCostPerTortilla,
      totalUnitCostPerTortilla,
      foodCostPerPincho,
      totalCostPerPincho,
      totalRevenuePerTortilla,
      grossProfitPerTortilla,
      netProfitPerTortilla,
      foodCostPercentage,
      grossMarginPercentage,
      totalPinchosDaily,
      dailyGrossRevenue,
      dailyGrossProfit,
      monthlyGrossRevenue,
      monthlyGrossProfit,
      monthlyFoodCost,
    };
  }, [
    eggsPerTortilla,
    potatoesGramsPerTortilla,
    onionGramsPerTortilla,
    oilMlPerTortilla,
    eggCostPerDozen,
    potatoCostPerKg,
    onionCostPerKg,
    oilCostPerLiter,
    extrasCostPerTortilla,
    energyCostPerTortilla,
    prepTimeMinutes,
    hourlyWage,
    pinchosPerTortilla,
    salePricePerPincho,
    dailyTortillasSold,
    operatingDaysPerMonth,
  ]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="card-notebook p-6 md:p-8 bg-card border border-border rounded-3xl shadow-sm text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/15 dark:bg-[#FFB800]/25 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold border border-[#FFB800]/30 shadow-2xs">
              <Store className="w-3.5 h-3.5" />
              <span>{isEs ? "Módulo Profesional HORECA & Hostelería" : isDe ? "Gastronomie & Kostenrechner" : "Professional Hospitality & Yield Costing"}</span>
            </div>
            <h1 className="font-serif-heading text-2xl md:text-4xl font-extrabold text-foreground tracking-tight">
              {isEs
                ? "Calculadora de Escandallos, Costes & Rentabilidad"
                : isDe
                ? "Deckungsbeitrags- & Portionsrechner"
                : "Tortilla Recipe Costing & Margin Calculator"}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl">
              {isEs
                ? "Herramienta técnica para bares, restaurantes y obradores. Calcula el coste real de materia prima (Food Cost %), punto de equilibrio, margen bruto por pincho y genera fichas técnicas listas para imprimir."
                : isDe
                ? "Kalkulieren Sie Wareneinsatz (Food Cost), Deckungsbeitrag pro Portion und monatliche Erträge für Bar und Restaurant."
                : "Determine exact food cost percentage, portion yield, labor allocation, and monthly profit margins for your culinary business."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 shrink-0">
            {/* Currency switcher */}
            <div className="inline-flex items-center bg-accent border border-border rounded-xl p-1">
              {(["EUR", "USD", "GBP"] as const).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    currency === curr
                      ? "bg-[#8D6E63] text-white dark:bg-[#FFB800] dark:text-[#1C1917] shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {curr === "EUR" ? "€ EUR" : curr === "USD" ? "$ USD" : "£ GBP"}
                </button>
              ))}
            </div>

            <Button
              onClick={handlePrint}
              variant="outline"
              className="border-border bg-card hover:bg-secondary text-foreground text-xs font-bold gap-2 cursor-pointer shadow-2xs"
            >
              <Printer className="w-4 h-4 text-[#FFB800]" />
              <span>{isEs ? "Imprimir Ficha Técnica" : isDe ? "Drucken" : "Print Spec Sheet"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Highlight Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cost per pincho */}
        <div className="card-notebook p-5 bg-card border border-border rounded-2xl shadow-xs space-y-1">
          <span className="text-3xs font-extrabold uppercase tracking-wider text-muted-foreground block">
            {isEs ? "Coste Materia Prima / Pincho" : "Food Cost / Portion"}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-foreground">
              {costBreakdown.foodCostPerPincho.toFixed(2)}{currencySymbol}
            </span>
            <span className="text-xs text-muted-foreground">/ tapa</span>
          </div>
          <span className="text-3xs text-muted-foreground block">
            {isEs ? `Total por tortilla: ${costBreakdown.foodCostPerTortilla.toFixed(2)}${currencySymbol}` : `Tortilla total: ${costBreakdown.foodCostPerTortilla.toFixed(2)}${currencySymbol}`}
          </span>
        </div>

        {/* Gross Margin % */}
        <div className="card-notebook p-5 bg-card border border-border rounded-2xl shadow-xs space-y-1">
          <span className="text-3xs font-extrabold uppercase tracking-wider text-muted-foreground block">
            {isEs ? "Margen Bruto (Gross Margin)" : "Gross Profit Margin"}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl sm:text-3xl font-black ${
              costBreakdown.grossMarginPercentage >= 70
                ? "text-[#2E7D32] dark:text-[#81C784]"
                : costBreakdown.grossMarginPercentage >= 60
                ? "text-[#FF8A00]"
                : "text-[#B00020]"
            }`}>
              {costBreakdown.grossMarginPercentage.toFixed(1)}%
            </span>
            <span className="text-xs text-muted-foreground font-bold">
              ({costBreakdown.foodCostPercentage.toFixed(1)}% FC)
            </span>
          </div>
          <span className="text-3xs text-muted-foreground block">
            {costBreakdown.grossMarginPercentage >= 70
              ? isEs ? "✨ Margen excelente en hostelería" : "✨ High profitability"
              : isEs ? "⚠️ Revisar precio o gramajes" : "⚠️ Consider optimizing"}
          </span>
        </div>

        {/* Profit per pincho */}
        <div className="card-notebook p-5 bg-card border border-border rounded-2xl shadow-xs space-y-1">
          <span className="text-3xs font-extrabold uppercase tracking-wider text-muted-foreground block">
            {isEs ? "Beneficio Bruto / Pincho" : "Gross Profit / Pincho"}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-[#8D6E63] dark:text-[#FFB800]">
              {(salePricePerPincho - costBreakdown.foodCostPerPincho).toFixed(2)}{currencySymbol}
            </span>
            <span className="text-xs text-muted-foreground">/ venta</span>
          </div>
          <span className="text-3xs text-muted-foreground block">
            {isEs ? `PVP: ${salePricePerPincho.toFixed(2)}${currencySymbol} | ${pinchosPerTortilla} raciones` : `Price: ${salePricePerPincho.toFixed(2)}${currencySymbol}`}
          </span>
        </div>

        {/* Monthly Gross Profit */}
        <div className="card-notebook p-5 bg-card border border-border rounded-2xl shadow-xs space-y-1">
          <span className="text-3xs font-extrabold uppercase tracking-wider text-muted-foreground block">
            {isEs ? "Margen Bruto Mensual Estimado" : "Est. Monthly Gross Profit"}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-foreground">
              {costBreakdown.monthlyGrossProfit.toLocaleString("es-ES", { maximumFractionDigits: 0 })}{currencySymbol}
            </span>
            <span className="text-xs text-muted-foreground">/ mes</span>
          </div>
          <span className="text-3xs text-muted-foreground block">
            {isEs ? `${dailyTortillasSold} tortillas/día · ${costBreakdown.totalPinchosDaily} pinchos/día` : `${dailyTortillasSold} units/day`}
          </span>
        </div>
      </div>

      {/* Main Interactive Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Recipe Specs & Yield */}
        <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Scale className="w-5 h-5 text-[#FFB800]" />
            <h3 className="font-serif-heading text-lg font-bold text-foreground">
              {isEs ? "1. Gramajes & Raciones" : "1. Batch Specs & Yield"}
            </h3>
          </div>

          {/* Pinchos per Tortilla */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-foreground">
              <span>{isEs ? "Raciones / Pinchos por Tortilla:" : "Portions per Tortilla:"}</span>
              <span className="text-[#8D6E63] dark:text-[#FFB800]">{pinchosPerTortilla} pinchos</span>
            </div>
            <input
              type="range"
              min="4"
              max="16"
              step="1"
              value={pinchosPerTortilla}
              onChange={(e) => setPinchosPerTortilla(Number(e.target.value))}
              className="w-full accent-[#FFB800] cursor-pointer"
            />
            <div className="flex justify-between text-3xs text-muted-foreground">
              <span>4 (Cuartos)</span>
              <span>8 (Estándar Bar)</span>
              <span>12-16 (Catering)</span>
            </div>
          </div>

          {/* Eggs per Tortilla */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-foreground">
              <span>{isEs ? "Huevos por Tortilla:" : "Eggs per Tortilla:"}</span>
              <span className="text-[#8D6E63] dark:text-[#FFB800]">{eggsPerTortilla} huevos</span>
            </div>
            <input
              type="range"
              min="4"
              max="18"
              step="1"
              value={eggsPerTortilla}
              onChange={(e) => setEggsPerTortilla(Number(e.target.value))}
              className="w-full accent-[#FFB800] cursor-pointer"
            />
          </div>

          {/* Potatoes grams */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-foreground">
              <span>{isEs ? "Patatas en Crudo:" : "Raw Potatoes:"}</span>
              <span className="text-[#8D6E63] dark:text-[#FFB800]">{potatoesGramsPerTortilla} g</span>
            </div>
            <input
              type="range"
              min="400"
              max="1600"
              step="50"
              value={potatoesGramsPerTortilla}
              onChange={(e) => setPotatoesGramsPerTortilla(Number(e.target.value))}
              className="w-full accent-[#FFB800] cursor-pointer"
            />
          </div>

          {/* Onion grams */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-foreground">
              <span>{isEs ? "Cebolla (opcional):" : "Onions:"}</span>
              <span className="text-[#8D6E63] dark:text-[#FFB800]">{onionGramsPerTortilla} g</span>
            </div>
            <input
              type="range"
              min="0"
              max="600"
              step="25"
              value={onionGramsPerTortilla}
              onChange={(e) => setOnionGramsPerTortilla(Number(e.target.value))}
              className="w-full accent-[#FFB800] cursor-pointer"
            />
          </div>

          {/* Oil absorbed */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-foreground">
              <span>{isEs ? "Aceite Absorbido / Pérdida:" : "Oil Absorbed / Used:"}</span>
              <span className="text-[#8D6E63] dark:text-[#FFB800]">{oilMlPerTortilla} ml</span>
            </div>
            <input
              type="range"
              min="30"
              max="200"
              step="10"
              value={oilMlPerTortilla}
              onChange={(e) => setOilMlPerTortilla(Number(e.target.value))}
              className="w-full accent-[#FFB800] cursor-pointer"
            />
          </div>
        </div>

        {/* Column 2: Ingredient Purchase Costs */}
        <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <DollarSign className="w-5 h-5 text-[#FFB800]" />
            <h3 className="font-serif-heading text-lg font-bold text-foreground">
              {isEs ? "2. Precios de Proveedor" : "2. Wholesale Ingredient Costs"}
            </h3>
          </div>

          {/* Egg carton cost */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">
              {isEs ? "Docena de Huevos (€ / docena):" : "Eggs Price (€ / dozen):"}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.10"
                min="0.5"
                max="10"
                value={eggCostPerDozen}
                onChange={(e) => setEggCostPerDozen(Number(e.target.value))}
                className="w-full p-2 rounded-xl bg-accent border border-border text-foreground font-bold text-sm focus:ring-2 focus:ring-[#FFB800]"
              />
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                ({(eggCostPerDozen / 12).toFixed(2)}{currencySymbol}/ud)
              </span>
            </div>
          </div>

          {/* Potato kg cost */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">
              {isEs ? "Patatas (€ / kg):" : "Potatoes (€ / kg):"}
            </label>
            <input
              type="number"
              step="0.05"
              min="0.3"
              max="5"
              value={potatoCostPerKg}
              onChange={(e) => setPotatoCostPerKg(Number(e.target.value))}
              className="w-full p-2 rounded-xl bg-accent border border-border text-foreground font-bold text-sm focus:ring-2 focus:ring-[#FFB800]"
            />
          </div>

          {/* Oil L cost */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">
              {isEs ? "Aceite de Oliva / Girasol (€ / L):" : "Oil Price (€ / Liter):"}
            </label>
            <input
              type="number"
              step="0.20"
              min="1.0"
              max="20"
              value={oilCostPerLiter}
              onChange={(e) => setOilCostPerLiter(Number(e.target.value))}
              className="w-full p-2 rounded-xl bg-accent border border-border text-foreground font-bold text-sm focus:ring-2 focus:ring-[#FFB800]"
            />
          </div>

          {/* Energy and extras */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="text-3xs font-bold text-muted-foreground uppercase block">
                {isEs ? "Energía / Gas (€)" : "Energy / Gas (€)"}
              </label>
              <input
                type="number"
                step="0.05"
                value={energyCostPerTortilla}
                onChange={(e) => setEnergyCostPerTortilla(Number(e.target.value))}
                className="w-full p-1.5 rounded-lg bg-accent border border-border text-foreground font-bold text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-3xs font-bold text-muted-foreground uppercase block">
                {isEs ? "Sal & Especias (€)" : "Salt & Extras (€)"}
              </label>
              <input
                type="number"
                step="0.05"
                value={extrasCostPerTortilla}
                onChange={(e) => setExtrasCostPerTortilla(Number(e.target.value))}
                className="w-full p-1.5 rounded-lg bg-accent border border-border text-foreground font-bold text-xs"
              />
            </div>
          </div>
        </div>

        {/* Column 3: Commercial Selling Price & Volume */}
        <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <TrendingUp className="w-5 h-5 text-[#FFB800]" />
            <h3 className="font-serif-heading text-lg font-bold text-foreground">
              {isEs ? "3. Precio Venta & Volumen" : "3. Pricing & Sales Volume"}
            </h3>
          </div>

          {/* Sale Price per Pincho */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">
              {isEs ? "PVP de Venta por Pincho / Tapa:" : "Sale Price per Portion / Pincho:"}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.10"
                min="1.0"
                max="20"
                value={salePricePerPincho}
                onChange={(e) => setSalePricePerPincho(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-accent border-2 border-[#FFB800]/60 text-foreground font-black text-base focus:ring-2 focus:ring-[#FFB800]"
              />
              <span className="text-sm font-black text-foreground">{currencySymbol}</span>
            </div>
          </div>

          {/* Daily Tortillas Sold */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-foreground">
              <span>{isEs ? "Tortillas Vendidas / Día:" : "Tortillas Sold / Day:"}</span>
              <span className="text-[#8D6E63] dark:text-[#FFB800]">{dailyTortillasSold} unidades ({dailyTortillasSold * pinchosPerTortilla} pinchos)</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={dailyTortillasSold}
              onChange={(e) => setDailyTortillasSold(Number(e.target.value))}
              className="w-full accent-[#FFB800] cursor-pointer"
            />
          </div>

          {/* Operating Days */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-foreground">
              <span>{isEs ? "Días Abiertos al Mes:" : "Operating Days / Month:"}</span>
              <span className="text-[#8D6E63] dark:text-[#FFB800]">{operatingDaysPerMonth} días</span>
            </div>
            <input
              type="range"
              min="15"
              max="31"
              step="1"
              value={operatingDaysPerMonth}
              onChange={(e) => setOperatingDaysPerMonth(Number(e.target.value))}
              className="w-full accent-[#FFB800] cursor-pointer"
            />
          </div>

          {/* Quick Pricing Margin Recommendations */}
          <div className="p-3.5 rounded-xl bg-accent border border-border space-y-2 text-xs">
            <span className="text-3xs font-extrabold uppercase tracking-wider text-muted-foreground block">
              💡 {isEs ? "Precios Sugeridos por Margen Objetivo:" : "Suggested Prices by Target Margin:"}
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <button
                type="button"
                onClick={() => setSalePricePerPincho(Number(((costBreakdown.foodCostPerPincho / 0.30)).toFixed(2)))}
                className="p-1.5 rounded-lg bg-card border border-border hover:bg-secondary cursor-pointer"
              >
                <span className="text-3xs text-muted-foreground block">70% Margen</span>
                <span className="font-bold text-foreground">
                  {((costBreakdown.foodCostPerPincho / 0.30)).toFixed(2)}{currencySymbol}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setSalePricePerPincho(Number(((costBreakdown.foodCostPerPincho / 0.25)).toFixed(2)))}
                className="p-1.5 rounded-lg bg-[#FFB800]/20 border border-[#FFB800]/40 text-foreground cursor-pointer"
              >
                <span className="text-3xs text-[#8D6E63] dark:text-[#FFB800] font-bold block">75% (Óptimo)</span>
                <span className="font-black text-foreground">
                  {((costBreakdown.foodCostPerPincho / 0.25)).toFixed(2)}{currencySymbol}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setSalePricePerPincho(Number(((costBreakdown.foodCostPerPincho / 0.20)).toFixed(2)))}
                className="p-1.5 rounded-lg bg-card border border-border hover:bg-secondary cursor-pointer"
              >
                <span className="text-3xs text-muted-foreground block">80% Margen</span>
                <span className="font-bold text-foreground">
                  {((costBreakdown.foodCostPerPincho / 0.20)).toFixed(2)}{currencySymbol}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Escandallo Cost Breakdown Table */}
      <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FFB800]" />
            <h3 className="font-serif-heading text-lg font-bold text-foreground">
              {isEs ? "Escandallo Técnico Detallado (Cost Breakdown Sheet)" : "Technical Cost Sheet"}
            </h3>
          </div>
          <span className="text-xs text-muted-foreground font-bold">
            {isEs ? "Base: 1 Tortilla Entera" : "Base: 1 Whole Tortilla"}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-xs text-left">
            <thead className="bg-secondary/70 text-foreground uppercase text-3xs font-extrabold">
              <tr>
                <th className="p-3">{isEs ? "Concepto / Ingrediente" : "Ingredient / Item"}</th>
                <th className="p-3 text-center">{isEs ? "Cantidad" : "Quantity"}</th>
                <th className="p-3 text-center">{isEs ? "Precio Unitario" : "Unit Price"}</th>
                <th className="p-3 text-right">{isEs ? "Coste Total" : "Total Cost"}</th>
                <th className="p-3 text-right">{isEs ? "% del Coste" : "% Share"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              <tr>
                <td className="p-3 font-bold text-foreground flex items-center gap-2">
                  <Egg className="w-4 h-4 text-[#FFB800]" />
                  <span>{isEs ? "Huevos frescos" : "Fresh Eggs"}</span>
                </td>
                <td className="p-3 text-center">{eggsPerTortilla} uds</td>
                <td className="p-3 text-center text-muted-foreground">{(eggCostPerDozen / 12).toFixed(3)}{currencySymbol}/ud</td>
                <td className="p-3 text-right font-bold text-foreground">{costBreakdown.eggCost.toFixed(2)}{currencySymbol}</td>
                <td className="p-3 text-right text-muted-foreground">
                  {((costBreakdown.eggCost / costBreakdown.foodCostPerTortilla) * 100).toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-foreground flex items-center gap-2">
                  <span>🥔</span>
                  <span>{isEs ? "Patatas (Monomando / Agria)" : "Potatoes"}</span>
                </td>
                <td className="p-3 text-center">{potatoesGramsPerTortilla} g</td>
                <td className="p-3 text-center text-muted-foreground">{potatoCostPerKg.toFixed(2)}{currencySymbol}/kg</td>
                <td className="p-3 text-right font-bold text-foreground">{costBreakdown.potatoCost.toFixed(2)}{currencySymbol}</td>
                <td className="p-3 text-right text-muted-foreground">
                  {((costBreakdown.potatoCost / costBreakdown.foodCostPerTortilla) * 100).toFixed(1)}%
                </td>
              </tr>
              {onionGramsPerTortilla > 0 && (
                <tr>
                  <td className="p-3 font-bold text-foreground flex items-center gap-2">
                    <span>🧅</span>
                    <span>{isEs ? "Cebolla dulce" : "Onion"}</span>
                  </td>
                  <td className="p-3 text-center">{onionGramsPerTortilla} g</td>
                  <td className="p-3 text-center text-muted-foreground">{onionCostPerKg.toFixed(2)}{currencySymbol}/kg</td>
                  <td className="p-3 text-right font-bold text-foreground">{costBreakdown.onionCost.toFixed(2)}{currencySymbol}</td>
                  <td className="p-3 text-right text-muted-foreground">
                    {((costBreakdown.onionCost / costBreakdown.foodCostPerTortilla) * 100).toFixed(1)}%
                  </td>
                </tr>
              )}
              <tr>
                <td className="p-3 font-bold text-foreground flex items-center gap-2">
                  <span>🫒</span>
                  <span>{isEs ? "Aceite de Oliva (absorbido)" : "Olive Oil (absorbed)"}</span>
                </td>
                <td className="p-3 text-center">{oilMlPerTortilla} ml</td>
                <td className="p-3 text-center text-muted-foreground">{oilCostPerLiter.toFixed(2)}{currencySymbol}/L</td>
                <td className="p-3 text-right font-bold text-foreground">{costBreakdown.oilCost.toFixed(2)}{currencySymbol}</td>
                <td className="p-3 text-right text-muted-foreground">
                  {((costBreakdown.oilCost / costBreakdown.foodCostPerTortilla) * 100).toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-foreground flex items-center gap-2">
                  <span>🧂</span>
                  <span>{isEs ? "Sal marina y consumibles" : "Salt & Consumables"}</span>
                </td>
                <td className="p-3 text-center">1 batch</td>
                <td className="p-3 text-center text-muted-foreground">{extrasCostPerTortilla.toFixed(2)}{currencySymbol}</td>
                <td className="p-3 text-right font-bold text-foreground">{extrasCostPerTortilla.toFixed(2)}{currencySymbol}</td>
                <td className="p-3 text-right text-muted-foreground">
                  {((extrasCostPerTortilla / costBreakdown.foodCostPerTortilla) * 100).toFixed(1)}%
                </td>
              </tr>
              <tr className="bg-secondary/40 font-black">
                <td className="p-3 text-foreground">{isEs ? "TOTAL FOOD COST (Materia Prima):" : "TOTAL FOOD COST:"}</td>
                <td className="p-3 text-center">1 tortilla</td>
                <td className="p-3 text-center">-</td>
                <td className="p-3 text-right text-[#8D6E63] dark:text-[#FFB800] text-sm">
                  {costBreakdown.foodCostPerTortilla.toFixed(2)}{currencySymbol}
                </td>
                <td className="p-3 text-right text-foreground">100.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety & Kitchen Tech Sheet Box (Print-Ready) */}
      <div className="card-notebook p-6 bg-card border-2 border-border rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />
          <h4 className="font-serif-heading text-lg font-bold text-foreground">
            {isEs ? "Estándares Sanitarios APPCC para Hostelería (Real Decreto 1021/2022)" : "HACCP Food Safety Protocols"}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-accent border border-border">
            <span className="font-bold text-[#2E7D32] dark:text-[#81C784] block mb-1">
              🛡️ {isEs ? "Tratamiento Térmico Oro" : "Gold Pasteurization"}
            </span>
            <p className="text-muted-foreground">
              {isEs ? (
                <>Alcanzar en el centro térmico <strong>70°C durante 2 minutos</strong> o <strong>63°C durante 20 segundos</strong>.</>
              ) : (
                <>Center core temperature at <strong>70°C for 2 minutes</strong> or <strong>63°C for 20 seconds</strong>.</>
              )}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-accent border border-border">
            <span className="font-bold text-[#FF8A00] block mb-1">
              ⏱️ {isEs ? "Exposición a Temperatura Ambiente" : "Ambient Serving Limit"}
            </span>
            <p className="text-muted-foreground">
              {isEs ? (
                <>Si se elabora poco cuajada (jugosa), el tiempo máximo de exposición en barra es de <strong>4 horas</strong>.</>
              ) : (
                <>Runny tortillas must never exceed <strong>4 hours</strong> at ambient bar temperature.</>
              )}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-accent border border-border">
            <span className="font-bold text-[#8D6E63] dark:text-[#FFB800] block mb-1">
              🧊 {isEs ? "Conservación en Vitrina" : "Refrigerated Storage"}
            </span>
            <p className="text-muted-foreground">
              {isEs ? (
                <>Mantener en vitrina refrigerada a temperatura inferior a <strong>8°C</strong> si no se consume de inmediato.</>
              ) : (
                <>Keep refrigerated under <strong>8°C</strong> in display counter.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
