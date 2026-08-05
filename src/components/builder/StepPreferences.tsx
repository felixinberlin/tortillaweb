import React from "react";
import { Sparkles, Flame, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TextureStyle, PotatoTechnique } from "@/domain/builder/types";

interface StepPreferencesProps {
  lang: string;
  texture: TextureStyle;
  setTexture: (val: TextureStyle) => void;
  potatoTechnique: PotatoTechnique;
  setPotatoTechnique: (val: PotatoTechnique) => void;
}

export const StepPreferences: React.FC<StepPreferencesProps> = ({
  lang,
  texture,
  setTexture,
  potatoTechnique,
  setPotatoTechnique,
}) => {
  const isEs = lang.startsWith("es");
  const isDe = lang.startsWith("de");

  const textures: { id: TextureStyle; icon: string; name: string; desc: string }[] = [
    {
      id: "betanzos",
      icon: "💧",
      name: isEs ? "Muy Jugosa (Betanzos)" : isDe ? "Sehr Saftig (Betanzos)" : "Very Juicy (Betanzos)",
      desc: isEs
        ? "Centro derretido y fluido, huevo líquido dorado"
        : isDe
        ? "Flüssige Mitte, Eigelb fließend"
        : "Melty, golden-runny center",
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
    },
  ];

  const techniques: { id: PotatoTechnique; icon: string; name: string; desc: string }[] = [
    {
      id: "pochada",
      icon: "🥔",
      name: isEs ? "Pochada Tradicional" : isDe ? "Traditionell Gedünstet" : "Traditional Poached",
      desc: isEs
        ? "Confitado lento en aceite tibio hasta deshacerse"
        : isDe
        ? "Langsam in lauwarmem Olivenöl confiert"
        : "Slow confit in warm olive oil until tender",
    },
    {
      id: "crujiente",
      icon: "🔥",
      name: isEs ? "Bordes Crujientes" : isDe ? "Knusprige Ränder" : "Crispy Edges",
      desc: isEs
        ? "Dorado exterior a fuego vivo para contraste crujiente"
        : isDe
        ? "Außen knusprig durch hohe Hitze"
        : "Golden-browned on high heat for texture contrast",
    },
    {
      id: "hybrid",
      icon: "⚡",
      name: isEs ? "Técnica Híbrida" : isDe ? "Hybrid-Methode" : "Hybrid Method",
      desc: isEs
        ? "Pochado inicial lento + golpe final de fuego alto"
        : isDe
        ? "Zuerst langsame Confitierung, dann scharfes Anbraten"
        : "Initial slow poach finished with high-heat sear",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Texture Selection Card */}
      <Card className="border-2 border-amber-900/10 shadow-sm bg-stone-50/80 rounded-2xl overflow-hidden">
        <CardHeader className="bg-amber-500/10 pb-4 border-b border-amber-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-stone-900">
                  {isEs ? "✨ Punto de Cuajado (Textura)" : isDe ? "✨ Konsistenz & Garstufe" : "✨ Doneness & Texture"}
                </CardTitle>
                <CardDescription className="text-stone-600 text-sm">
                  {isEs
                    ? "¿Cómo prefieres el centro de tu tortilla?"
                    : isDe
                    ? "Wie bevorzugen Sie das Innere Ihrer Tortilla?"
                    : "How do you prefer the center of your tortilla?"}
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-amber-100 text-amber-950 border-amber-300 font-bold capitalize">
              {texture}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {textures.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTexture(item.id)}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  texture === item.id
                    ? "border-amber-600 bg-amber-100/90 shadow-sm text-stone-900"
                    : "border-stone-200 bg-white hover:bg-stone-100/70 text-stone-700"
                }`}
              >
                {texture === item.id && (
                  <div className="absolute top-2.5 right-2.5 bg-amber-600 text-white rounded-full p-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-extrabold text-base mb-1">{item.name}</div>
                <div className="text-xs text-stone-600 leading-relaxed">{item.desc}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Potato Technique Card */}
      <Card className="border-2 border-amber-900/10 shadow-sm bg-stone-50/80 rounded-2xl overflow-hidden">
        <CardHeader className="bg-amber-500/10 pb-4 border-b border-amber-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-700 text-white shadow-xs">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-stone-900">
                  {isEs ? "🥔 Técnica de la Patata" : isDe ? "🥔 Kartoffeltechnik" : "🥔 Potato Cooking Technique"}
                </CardTitle>
                <CardDescription className="text-stone-600 text-sm">
                  {isEs
                    ? "El método de cocción define la interacción con el huevo"
                    : isDe
                    ? "Die Kochmethode bestimmt das Mundgefühl"
                    : "Cooking method defines mouthfeel and egg absorption"}
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-amber-100 text-amber-950 border-amber-300 font-bold capitalize">
              {potatoTechnique}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {techniques.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPotatoTechnique(item.id)}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  potatoTechnique === item.id
                    ? "border-amber-600 bg-amber-100/90 shadow-sm text-stone-900"
                    : "border-stone-200 bg-white hover:bg-stone-100/70 text-stone-700"
                }`}
              >
                {potatoTechnique === item.id && (
                  <div className="absolute top-2.5 right-2.5 bg-amber-600 text-white rounded-full p-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-extrabold text-base mb-1">{item.name}</div>
                <div className="text-xs text-stone-600 leading-relaxed">{item.desc}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
