import React, { useState } from "react";
import { Mail, CheckCircle2, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsletterLeadMagnetProps {
  lang?: string;
}

export default function NewsletterLeadMagnet({ lang = "es" }: NewsletterLeadMagnetProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubmitted(true);
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-card to-background border-b border-border relative overflow-hidden">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="card-notebook p-6 sm:p-10 md:p-12 bg-card border-2 border-[#FFB800]/40 rounded-3xl shadow-stacked-parchment relative overflow-hidden">
          {/* Decorative Accent */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#FFB800]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/15 dark:bg-[#FFB800]/25 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold border border-[#FFB800]/30 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#FFB800]" />
                <span>
                  {currentLang === "es"
                    ? "Guía Gratuita en PDF (12 Páginas)"
                    : currentLang === "de"
                    ? "Kostenloser 12-Seiten PDF-Guide"
                    : "Free 12-Page PDF Master Guide"}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-heading text-foreground tracking-tight leading-tight">
                {currentLang === "es"
                  ? "Las 7 Reglas de Oro del Cuajado & Tabla de Ratios Plastificable"
                  : currentLang === "de"
                  ? "Die 7 Goldenen Regeln für perfekten Schmelzkern & Mengentabelle"
                  : "The 7 Golden Rules of the Runny Yolk & Kitchen Ratio Cheat Sheet"}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentLang === "es"
                  ? "Suscríbete al boletín del Club Oficial y recibe gratis la tabla de calibración de huevos, cálculo exacto de aceite absorbido y los umbrales de seguridad térmica bactericida."
                  : currentLang === "de"
                  ? "Erhalten Sie sofort unsere druckbare Verhältnis-Tabelle, genaue Ölaufnahme-Kalkulation und thermische Sicherheitsrichtlinien."
                  : "Join the official club newsletter and instantly receive the printable kitchen ratio chart, absorbed oil calculator, and thermal safety thresholds."}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-foreground/90 pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
                  <span>Gramajes exactos por persona</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
                  <span>Seguridad 70°C a 2 min</span>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-secondary/40 border border-border space-y-4">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="space-y-1.5">
                    <label htmlFor="lead-email" className="text-xs font-bold text-foreground">
                      {currentLang === "es" ? "¿Dónde te enviamos la guía?" : currentLang === "de" ? "Wohin dürfen wir den Guide senden?" : "Where should we send your guide?"}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="lead-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#FFB800] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-sm shadow-md"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    <span>{currentLang === "es" ? "Descargar Guía Gratuita" : currentLang === "de" ? "Kostenlos Herunterladen" : "Download Free Guide"}</span>
                  </Button>

                  <p className="text-[10px] text-center text-muted-foreground leading-tight">
                    🔒 {currentLang === "es" ? "Cero spam. Solo ciencia, recetas y secretos de taberna. Desuscríbete cuando quieras." : currentLang === "de" ? "Kein Spam. Jederzeit mit 1 Klick abmeldbar." : "Zero spam. Only culinary science & secrets. Unsubscribe anytime."}
                  </p>
                </form>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#2E7D32]/20 text-[#2E7D32] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-bold font-serif-heading">
                    {currentLang === "es" ? "¡Guía en Camino!" : currentLang === "de" ? "Guide unterwegs!" : "Guide Dispatched!"}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {currentLang === "es"
                      ? `Hemos enviado el PDF a ${email}. ¡Revisa tu bandeja de entrada!`
                      : currentLang === "de"
                      ? `PDF wurde an ${email} gesendet!`
                      : `We sent your PDF to ${email}!` }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
