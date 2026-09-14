import React from "react";
import { Sparkles, Check, Thermometer, Clock, ShieldCheck } from "lucide-react";
import type {
  TextureStyle,
  PotatoTechnique,
  PotatoVariety,
  PotatoCutStyle,
  FryingTemperatureProfile,
  CalculatedProfile,
} from "@/domain/builder/types";

interface StepPreferencesProps {
  lang: string;
  texture: TextureStyle;
  setTexture: (val: TextureStyle) => void;
  potatoTechnique?: PotatoTechnique;
  setPotatoTechnique: (val: PotatoTechnique) => void;
  potatoVariety?: PotatoVariety;
  setPotatoVariety?: (val: PotatoVariety) => void;
  potatoCut?: PotatoCutStyle;
  setPotatoCut?: (val: PotatoCutStyle) => void;
  fryingTempProfile?: FryingTemperatureProfile;
  setFryingTempProfile?: (val: FryingTemperatureProfile) => void;
  calculatedProfile?: CalculatedProfile;
}

export const StepPreferences: React.FC<StepPreferencesProps> = ({
  lang,
  texture,
  setTexture,
  setPotatoTechnique,
  fryingTempProfile = "traditional_medium",
  setFryingTempProfile,
  calculatedProfile,
}) => {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const textures: { id: TextureStyle; icon: string; name: string; desc: string; safetyNote?: string }[] = [
    {
      id: "betanzos",
      icon: "💧",
      name: isEs ? "Muy Jugosa (Betanzos)" : isDe ? "Sehr Saftig (Betanzos)" : "Very Juicy (Betanzos)",
      desc: isEs
        ? "Centro derretido y fluido, huevo líquido dorado"
        : isDe
        ? "Flüssige Mitte, Eigelb fließend"
        : "Melty, golden-runny center",
      safetyNote: isEs ? "Consumir al momento (<4 horas) o huevo pasteurizado." : "Consume immediately (<4h) or pasteurized egg.",
    },
    {
      id: "jugosa",
      icon: "✨",
      name: isEs ? "Cremosa (En su punto)" : isDe ? "Cremig (Perfekt)" : "Creamy (Classic Medium)",
      desc: isEs
        ? "Corazón meloso sin chorrear, textura sedosa"
        : isDe
        ? "Cremiger Kern, perfekt gebunden"
        : "Luscious creamy center without spilling",
      safetyNote: isEs
        ? "Alcanza **63°C durante 20 segundos** para pasteurización térmica."
        : isDe
        ? "Erreicht **63°C für 20 Sekunden** zur thermischen Pasteurisierung."
        : "Reaches **63°C for 20 seconds** for thermal pasteurization.",
    },
    {
      id: "cuajada",
      icon: "🥪",
      name: isEs ? "Firme (Cuajada)" : isDe ? "Fest (Durchgegart)" : "Firm (Well Done)",
      desc: isEs
        ? "Estructura cuajada uniforme, ideal para pincho o bocadillo"
        : isDe
        ? "Gleichmäßig fest, perfekt für unterwegs"
        : "Uniformly set structure, ideal for sandwiches",
      safetyNote: isEs
        ? "Estándar de oro: **70°C durante 2 minutos** (100% segura)."
        : isDe
        ? "Goldstandard: **70°C für 2 Minuten** (100% sicher)."
        : "Gold standard: **70°C for 2 minutes** (100% safe).",
    },
  ];

  const fryingProfiles: {
    id: FryingTemperatureProfile;
    icon: string;
    name: string;
    tempRange: string;
    desc: string;
  }[] = [
    {
      id: "confit_low",
      icon: "🕯️",
      name: isEs ? "Confitado a Baja Temperatura" : "Low Confit",
      tempRange: "120–140 °C",
      desc: isEs
        ? "Fuego suave prolongado. La patata absorbe aceite lentamente quedando tierna sin tostar."
        : "Gentle slow simmer. Potato becomes meltingly tender without browning.",
    },
    {
      id: "traditional_medium",
      icon: "🔥",
      name: isEs ? "Pochado Clásico Medio" : "Classic Medium",
      tempRange: "140–160 °C",
      desc: isEs
        ? "La temperatura clásica española. Suave ebullición de aceite que carameliza la cebolla y dora sutilmente."
        : "Classic standard. Steady oil bubbling for balanced texture and subtle browning.",
    },
    {
      id: "crispy_high",
      icon: "⚡",
      name: isEs ? "Fritura Fuerte (Costra)" : "High Crisp",
      tempRange: "170–185 °C",
      desc: isEs
        ? "Fuego vivo rápido. Sella los bordes crujientes creando costra dorada (Reacción de Maillard)."
        : "Fast searing heat. Golden crisp Maillard crust with fluffy core.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Texture Preference Card */}
      <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] border border-[#FFB800]/30 shadow-2xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-foreground">
                {isEs ? "1. Punto de Cuajado & Textura" : isDe ? "1. Garstufe & Textur" : "1. Doneness & Texture"}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                {isEs
                  ? "Define el comportamiento del huevo y el tiempo de volteo en sartén"
                  : isDe
                  ? "Bestimmt die Flüssigkeit des Eis und die Wendezeit"
                  : "Defines egg fluidity and pan flipping time"}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-sm font-extrabold capitalize border border-[#FFB800]/40">
            {texture}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {textures.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTexture(item.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                texture === item.id
                  ? "border-[#FFB800] bg-[#FFB800]/15 dark:bg-[#FFB800]/25 text-foreground shadow-2xs"
                  : "border-border bg-card hover:bg-accent text-foreground/80"
              }`}
            >
              {texture === item.id && (
                <div className="absolute top-2.5 right-2.5 bg-[#FFB800] text-[#1C1917] rounded-full p-0.5">
                  <Check className="w-3.5 h-3.5 font-bold" />
                </div>
              )}
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-extrabold text-base mb-1 text-foreground">{item.name}</div>
              <div className="text-xs text-muted-foreground leading-relaxed mb-3">{item.desc}</div>
              {item.safetyNote && (
                <div className="pt-2 border-t border-border/60 text-[11px] font-semibold text-[#8D6E63] dark:text-[#FFB800]">
                  🛡️ {item.safetyNote}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Frying Temperature Profile */}
      {setFryingTempProfile && (
        <div className="card-notebook p-6 bg-card border border-border rounded-2xl shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/30 shadow-2xs">
                <Thermometer className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-heading text-xl font-bold text-foreground">
                  {isEs ? "2. Perfil Térmico de Fritura" : isDe ? "2. Temperaturprofil" : "2. Thermal Frying Profile"}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {isEs
                    ? "Controla la caramelización y textura de la patata y cebolla"
                    : isDe
                    ? "Steuert die Bräunung und Textur"
                    : "Controls caramelization and potato texture"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fryingProfiles.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setFryingTempProfile(p.id);
                  if (p.id === "confit_low") setPotatoTechnique("pochada");
                  else if (p.id === "crispy_high") setPotatoTechnique("crujiente");
                  else if (p.id === "traditional_medium") setPotatoTechnique("pochada");
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                  fryingTempProfile === p.id
                    ? "border-[#FFB800] bg-[#FFB800]/15 dark:bg-[#FFB800]/25 text-foreground shadow-2xs"
                    : "border-border bg-card hover:bg-accent text-foreground/80"
                }`}
              >
                {fryingTempProfile === p.id && (
                  <div className="absolute top-2.5 right-2.5 bg-[#FFB800] text-[#1C1917] rounded-full p-0.5">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-2xl">{p.icon}</span>
                  <span className="font-extrabold text-sm">{p.name}</span>
                </div>
                <div className="inline-block font-mono text-2xs font-bold text-foreground bg-secondary px-2 py-0.5 rounded-md mb-2">
                  {p.tempRange}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Physics & Thermal Safety Summary */}
      {calculatedProfile && (
        <div className="card-notebook p-6 bg-accent border border-border rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-[#2E7D32] dark:text-[#81C784]" />
            <h4 className="font-serif-heading font-bold text-foreground text-base">
              {isEs ? "Parámetros Térmicos & Seguridad Culinaria" : "Thermal Parameters & Food Safety"}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-card p-3.5 rounded-xl border border-border text-center">
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground font-bold mb-1">
                <Clock className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>{isEs ? "Cocción Patata Est." : "Est. Potato Cook Time"}</span>
              </div>
              <span className="text-2xl font-black text-foreground">
                {typeof calculatedProfile.estimatedPotatoCookingTimeMin === "object"
                  ? `${calculatedProfile.estimatedPotatoCookingTimeMin.min}–${calculatedProfile.estimatedPotatoCookingTimeMin.max} min`
                  : `${calculatedProfile.estimatedPotatoCookingTimeMin || 18} min`}
              </span>
            </div>

            <div className="bg-card p-3.5 rounded-xl border border-border text-center">
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground font-bold mb-1">
                <Thermometer className="w-3.5 h-3.5 text-[#FF8A00]" />
                <span>{isEs ? "Temperatura Aceite" : "Frying Temp"}</span>
              </div>
              <span className="text-2xl font-black text-foreground">
                {typeof calculatedProfile.recommendedFryingTempC === "object"
                  ? `${calculatedProfile.recommendedFryingTempC.degreesMin}–${calculatedProfile.recommendedFryingTempC.degreesMax} °C`
                  : `${calculatedProfile.recommendedFryingTempC || 150} °C`}
              </span>
            </div>

            <div className="bg-card p-3.5 rounded-xl border border-border text-center">
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>{isEs ? "Estándar Pasteurización" : "Food Safety"}</span>
              </div>
              <span className="text-sm font-black text-[#2E7D32] dark:text-[#81C784] block mt-1">
                <strong>70°C por 2 min</strong>
              </span>
              <span className="text-3xs text-muted-foreground block mt-0.5">
                o <strong>63°C por 20 seg</strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
