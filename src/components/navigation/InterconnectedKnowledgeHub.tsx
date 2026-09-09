import React from "react";
import "@/i18n/config";
import { 
  Sparkles, 
  FlaskConical, 
  Scale, 
  Users, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight,
  Compass,
  BookOpen,
  Utensils
} from "lucide-react";
import { resolveNavigationTarget, type SupportedLocale } from "@/lib/routes";

interface InterconnectedKnowledgeHubProps {
  lang?: string;
  currentPath?: string;
}

export default function InterconnectedKnowledgeHub({ lang = "es", currentPath = "" }: InterconnectedKnowledgeHubProps) {
  function getLocalizedHref(path: string) {
    return resolveNavigationTarget({ to: path }, (lang as SupportedLocale) || 'es');
  }

  const hubNodes = [
    {
      id: "builder",
      path: "/builder",
      title: lang === "es" ? "Constructor de Tortilla" : lang === "de" ? "Tortilla-Baukasten" : "Omelette Builder",
      badge: lang === "es" ? "Herramienta Interactiva" : lang === "de" ? "Interaktives Tool" : "Interactive Tool",
      description: lang === "es" ? "Calculadora de ratios exactos, gramos de patata y huevos por persona." : lang === "de" ? "Exakte Mengenkalkulation pro Person für Eier, Kartoffeln und Pfanne." : "Exact ratio calculator for eggs, potato grams, and pan size per guest.",
      icon: Sparkles,
      color: "border-[#FFB800] bg-[#FFB800]/10 text-[#8D6E63] dark:text-[#FFB800]",
    },
    {
      id: "worldstate",
      path: "/laboratorio/worldstate",
      title: lang === "es" ? "Simulador WorldState" : lang === "de" ? "Weltzustand-Simulator" : "WorldState Simulator",
      badge: lang === "es" ? "Consola & Estado" : lang === "de" ? "Konsole & Zustand" : "State & Console",
      description: lang === "es" ? "Monitoreo en tiempo real, baile de la tortilla, volteos y estatus." : lang === "de" ? "Echtzeit-Überwachung, Tortilla-Tanz, Pfannenwenden und Terminal." : "Real-time state engine, tortilla dance, pan flips, and CLI terminal.",
      icon: FlaskConical,
      color: "border-[#00A3FF] bg-[#00A3FF]/10 text-[#00A3FF]",
    },
    {
      id: "comparator",
      path: "/laboratorio/comparador",
      title: lang === "es" ? "Comparador de Estilos" : lang === "de" ? "Stil-Vergleich" : "Style Comparator",
      badge: lang === "es" ? "Matriz Técnica" : lang === "de" ? "Technisches Raster" : "Technical Matrix",
      description: lang === "es" ? "Cara a cara entre Betanzos, Clásica, Vasca y Vanguardia." : lang === "de" ? "Vergleich zwischen Betanzos, Klassisch, Baskisch und Avantgarde." : "Side-by-side analysis of Betanzos, Classic, Basque, and Modernist styles.",
      icon: Scale,
      color: "border-[#8D6E63] bg-[#8D6E63]/10 text-[#8D6E63] dark:text-[#F5E6BE]",
    },
    {
      id: "factions",
      path: "/factions",
      title: lang === "es" ? "Facciones & Debates" : lang === "de" ? "Fraktionen & Debatten" : "Factions & Sociology",
      badge: lang === "es" ? "Debate Cultural" : lang === "de" ? "Kulturdebatte" : "Cultural Debate",
      description: lang === "es" ? "Concebollistas vs Puristas. Descubre tu bando u ortodoxia." : lang === "de" ? "Zwiebel-Liebhaber vs Puristen. Finde deine kulinarische Fraktion." : "Pro-Onion vs Purists vs Betanceiros. Find your culinary faction.",
      icon: Users,
      color: "border-[#FF8A00] bg-[#FF8A00]/10 text-[#FF8A00]",
    },
    {
      id: "trivia",
      path: "/trivia",
      title: lang === "es" ? "Desafío Trivia (200+)" : lang === "de" ? "Tortilla-Quiz (200+)" : "Trivia Challenge (200+)",
      badge: lang === "es" ? "Juego de Preguntas" : lang === "de" ? "Fragespiel" : "Interactive Quiz",
      description: lang === "es" ? "200+ preguntas con veracidad comprobada sobre historia y física." : lang === "de" ? "Über 200 geprüfte Fragen zur Geschichte, Chemie und Physik der Tortilla." : "200+ fact-verified questions covering history, science, and pop culture.",
      icon: HelpCircle,
      color: "border-[#2E7D32] bg-[#2E7D32]/10 text-[#2E7D32] dark:text-[#81C784]",
    },
    {
      id: "science",
      path: "/science",
      title: lang === "es" ? "Ciencia & Pasteurización" : lang === "de" ? "Wissenschaft & Hygiene" : "Culinary Safety Science",
      badge: lang === "es" ? "Seguridad Térmica" : lang === "de" ? "Thermosicherheit" : "Thermal Safety",
      description: lang === "es" ? "Reglas térmicas bactericidas y prevención de Salmonella." : lang === "de" ? "Thermische Sicherheitsstandards und Vermeidung von Salmonellen." : "Bactericidal core thermal rules and Salmonella prevention science.",
      icon: ShieldCheck,
      color: "border-[#D32F2F] bg-[#D32F2F]/10 text-[#D32F2F] dark:text-[#FF8A80]",
    },
    {
      id: "guides",
      path: "/guias",
      title: lang === "es" ? "Guías & Masterclasses" : lang === "de" ? "Meisterklassen & Guides" : "Guides & Masterclasses",
      badge: lang === "es" ? "Artículos Tutoriales" : lang === "de" ? "Tutorial-Artikel" : "Tutorial Deep Dives",
      description: lang === "es" ? "9 guías técnicas sobre física del volteo, almidón, Betanzos, posguerra, confitado y debates." : lang === "de" ? "9 Meisterklassen zu Physik des Wendens, Stärkechemie, Betanzos, Nachkriegszeit und Confit." : "9 technical deep-dives on flip physics, potato starch, Betanzos fluid dynamics, post-war history, and confit.",
      icon: BookOpen,
      color: "border-[#8D6E63] bg-[#8D6E63]/10 text-[#8D6E63] dark:text-[#FFB800]",
    },
    {
      id: "escandallo",
      path: "/escandallo",
      title: lang === "es" ? "Calculadora de Escandallo" : lang === "de" ? "HORECA Kalkulator" : "HORECA Cost Calculator",
      badge: lang === "es" ? "Herramienta Profesional" : lang === "de" ? "Profis & Gastronomie" : "Professional Tool",
      description: lang === "es" ? "Cálculo de coste de ración, mermas de patata, AOVE y margen de explotación." : lang === "de" ? "Portionskosten, Garverluste, Ölverbrauch und Gastronomie-Margen kalkulieren." : "Portion costing, potato peeling loss, olive oil absorption, and bar margin analytics.",
      icon: Scale,
      color: "border-[#00A3FF] bg-[#00A3FF]/10 text-[#0077B6] dark:text-[#00A3FF]",
    },
    {
      id: "utensilios",
      path: "/utensilios",
      title: lang === "es" ? "Utensilios & Menaje" : lang === "de" ? "Küchen-Utensilien" : "Kitchen Tools & Gear",
      badge: lang === "es" ? "Física & Menaje" : lang === "de" ? "Physik & Werkzeuge" : "Physics & Gear",
      description: lang === "es" ? "Sartenes dobles, vuelvetortillas, peladores y mandolinas analizados sin patrocinio." : lang === "de" ? "Wende-Doppelpfannen, Wendeteller, Sparschäler und Mandolinen unabhängig analysiert." : "Double-hinged pans, ceramic turners, peelers, and mandolines tested with independent physics.",
      icon: Utensils,
      color: "border-[#FFB800] bg-[#FFB800]/10 text-[#8D6E63] dark:text-[#FFB800]",
    },
    {
      id: "humor",
      path: "/humor",
      title: lang === "es" ? "Humor & Oráculo" : lang === "de" ? "Humor & Orakel" : "Humor & Oracle",
      badge: lang === "es" ? "Cultura Castiza" : lang === "de" ? "Bar-Kultur" : "Tavern Culture",
      description: lang === "es" ? "Generador de excusas para vuelcos fallidos y test detector de sacrilegios." : lang === "de" ? "Ausreden-Generator für Pfannen-Missgeschicke und Ketzerei-Detektor." : "Excuse generator for ruined pan flips and sacrilege detector quiz.",
      icon: Sparkles,
      color: "border-[#FFB800] bg-[#FFB800]/10 text-[#FFB800]",
    },
  ];

  return (
    <section className="bg-[#FAF6EE] dark:bg-[#1A1715] border-t border-[#E8E2D5] dark:border-[#3D352E] py-12 md:py-16 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header (Oma Safe Large Typography) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-[#E8E2D5] dark:border-[#3D352E]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold mb-2">
              <Compass className="w-4 h-4 text-[#FFB800]" />
              <span>
                {lang === "es" ? "Red Interconectada de Conocimiento" : lang === "de" ? "Vernetztes Wissensnetzwerk" : "Interconnected Knowledge Network"}
              </span>
            </div>
            <h2 className="font-serif-heading font-extrabold text-2xl sm:text-3xl text-foreground dark:text-[#F5E6BE]">
              {lang === "es" ? "Explora Todo el Universo de la Tortilla" : lang === "de" ? "Erkunde das gesamte Tortilla-Universum" : "Explore the Whole Tortilla Universe"}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            {lang === "es" 
              ? "Cada sección está conectada. Navega directamente entre el laboratorio, el constructor, la ciencia y las encuestas."
              : lang === "de"
              ? "Jeder Bereich ist vernetzt. Navigiere direkt zwischen Labor, Baukasten, Wissenschaft und Umfragen."
              : "Every section is connected. Jump directly between laboratory tools, builder, science, and surveys."}
          </p>
        </div>

        {/* Oma Safe High-Contrast Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {hubNodes.map((node) => {
            const Icon = node.icon;
            const href = getLocalizedHref(node.path);
            const isCurrent = currentPath === href || (node.path !== "/" && currentPath.includes(node.path));

            return (
              <a
                key={node.id}
                href={href}
                className={`group card-notebook p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? "bg-[#FFB800]/15 dark:bg-[#3D332A] border-[#FFB800] ring-2 ring-[#FFB800]/40"
                    : "bg-white dark:bg-[#262220] border-[#E8E2D5] dark:border-[#3D352E] hover:border-[#8D6E63] dark:hover:border-[#FFB800]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl border ${node.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#FAF6EE] dark:bg-[#1C1917] border border-[#E8E2D5] dark:border-[#3D352E] text-foreground/80 dark:text-[#F5E6BE]">
                      {node.badge}
                    </span>
                  </div>

                  <h3 className="font-serif-heading font-bold text-base sm:text-lg text-foreground dark:text-[#F5E6BE] group-hover:text-[#8D6E63] dark:group-hover:text-[#FFB800] transition-colors mb-1.5 flex items-center gap-1.5">
                    <span>{node.title}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-foreground/75 dark:text-[#F5E6BE]/75 leading-relaxed mb-4">
                    {node.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E2D5]/60 dark:border-[#3D352E]/60 flex items-center justify-between text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] group-hover:translate-x-1 transition-transform">
                  <span>{lang === "es" ? "Acceder a esta sección" : lang === "de" ? "Bereich öffnen" : "Open section"}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
