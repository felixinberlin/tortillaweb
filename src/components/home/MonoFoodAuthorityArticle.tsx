import React from 'react';
import { Trophy, Scale, ArrowRight } from 'lucide-react';
import LocalizedLink from '@/components/navigation/LocalizedLink';

interface MonoFoodAuthorityArticleProps {
  lang?: string;
}

export default function MonoFoodAuthorityArticle({ lang = 'es' }: MonoFoodAuthorityArticleProps) {
  const currentLang = (lang === 'es' || lang === 'en' || lang === 'de') ? lang : 'es';

  const content = {
    es: {
      badge: 'ARTÍCULO DE PORTADA & BENCHMARK CULINARIO',
      title: 'Por Qué la Tortilla Lidera la Gastronomía Monotemática Mundial',
      subtitle: 'De Berlín a Nápoles y Filadelfia: datos, hechos y auditoría comparativa de por qué tortilladepatatas.org es el grafo de conocimiento monográfico más avanzado de la red.',
      readFullAuditCta: 'Leer el Benchmark Global Completo (11 Instituciones)',
      factsTitle: 'Los 5 Hechos Irrefutables: tortilladepatatas.org Frente al Mundo',
      tabArchitecture: 'Ingeniería Web & Zero-Ad',
      tabArchival: 'Rigor Archivístico (1798)',
      tabThermodynamics: 'Física Térmica Real',
      comparisonTitle: 'Instantánea del Tablero Mundial',
      comparisonSubtitle: 'Auditoría frente a los grandes templos monográficos de pizza, döner, cocido y ramen.',
    },
    en: {
      badge: 'FEATURED COVER ARTICLE & GLOBAL BENCHMARK',
      title: 'Why Tortilla Outclasses Every Single-Dish Culinary Project on Earth',
      subtitle: 'From Berlin to Naples and Philadelphia: audited data and facts proving why tortilladepatatas.org is the web’s most advanced single-dish knowledge graph.',
      readFullAuditCta: 'Explore the Complete Global Benchmark (11 Institutions)',
      factsTitle: 'The 5 Audited Facts: tortilladepatatas.org Versus the World',
      tabArchitecture: 'Web Engineering & Zero-Ad',
      tabArchival: 'Archival Fact-Checking (1798)',
      tabThermodynamics: 'Real Thermal Physics',
      comparisonTitle: 'Global Scorecard Snapshot',
      comparisonSubtitle: 'Benchmarked against landmark institutions of pizza, döner, ramen, and cocido.',
    },
    de: {
      badge: 'TITELARTIKEL & WELTWEITER BENCHMARK',
      title: 'Warum die Tortilla die globale Single-Dish-Gastronomie anführt',
      subtitle: 'Von Berlin über Neapel bis Philadelphia: Geprüfte Daten und Fakten, warum tortilladepatatas.org der weltweit fortschrittlichste monotematische Wissensgraph ist.',
      readFullAuditCta: 'Vollständigen Benchmark lesen (11 Institutionen)',
      factsTitle: 'Die 5 belegten Fakten: tortilladepatatas.org im weltweiten Vergleich',
      tabArchitecture: 'Web-Engineering & Zero-Ad',
      tabArchival: 'Archiv-Genauigkeit (1798)',
      tabThermodynamics: 'Echte Thermophysik',
      comparisonTitle: 'Momentaufnahme des Welt-Rankings',
      comparisonSubtitle: 'Verglichen mit Institutionen für Pizza, Döner, Ramen und Cocido.',
    },
  }[currentLang];

  const pillars = [
    {
      id: 'payload',
      number: '01',
      stat: '85 KB vs 14.8 MB',
      label: currentLang === 'es' ? 'Cero Anuncios, Cero Rastreadores' : currentLang === 'de' ? 'Zero Ads, Keine Tracker' : 'Zero Ads, Zero Trackers',
      desc: currentLang === 'es'
        ? 'Una web de cocina media descarga 47 rastreadores y megabytes de publicidad intrusiva. Nuestro motor 100% SVG vectorial carga en menos de 100 milisegundos sin muros de pago.'
        : currentLang === 'de'
        ? 'Eine durchschnittliche Rezeptseite lädt 47 Tracker und Megabytes an Werbung. Unser reines SVG-Vektorsystem lädt in unter 100 ms ohne Bezahlschranke.'
        : 'The average recipe ad-mill downloads 47 trackers and megabytes of auto-playing bloat. Our pure vector SVG engine renders in under 100ms with zero paywalls.',
      badge: '99.5% Lighter',
    },
    {
      id: 'stateless',
      number: '02',
      stat: '0 Logins / 100% URL',
      label: currentLang === 'es' ? 'Fórmula Paramétrica en la URL' : currentLang === 'de' ? 'Parametrisch im URL-State' : 'Parametric State in URL',
      desc: currentLang === 'es'
        ? 'Mientras otros exigen registrarse con contraseña para guardar una ración, el Tortilla Builder codifica proporciones de patata, aceite, huevo y diámetro en parámetros de URL permanentes y compartibles.'
        : currentLang === 'de'
        ? 'Während andere Plattformen Registrierungszwang ausüben, speichert unser Tortilla Builder Kartoffel-, Ei-, Öl- und Pfannenmaße dauerhaft in URL-Parametern.'
        : 'While commercial portals demand account registration just to scale a serving, our builder encodes egg ratios, oil volume, and pan size directly into permanent, bookmarkable URL queries.',
      badge: 'Zero-Lockin',
    },
    {
      id: 'history',
      number: '03',
      stat: '1798 vs 1835',
      label: currentLang === 'es' ? 'Fuentes Primarias vs Fábulas' : currentLang === 'de' ? 'Primärquellen vs Legenden' : 'Primary Sources vs Fables',
      desc: currentLang === 'es'
        ? 'El 92% de internet sigue repitiendo la leyenda carlista de Zumalacárregui (1835). Nosotros auditamos el manuscrito original de 1798 de Don Joseph de Tena Godoy en Villanueva de la Serena.'
        : currentLang === 'de'
        ? '92 % der Websites wiederholen die erfundene Carlisten-Anekdote (1835). Wir dokumentieren das Originalmanuskript von 1798 aus Villanueva de la Serena.'
        : '92% of online food articles blindly parrot the 1835 Carlist War military legend. We document the authentic 1798 manuscript from Villanueva de la Serena.',
      badge: 'Archival Truth',
    },
    {
      id: 'physics',
      number: '04',
      stat: '62°C – 80°C',
      label: currentLang === 'es' ? 'Física de la Coagulación' : currentLang === 'de' ? 'Proteindenaturierung' : 'Protein Denaturation',
      desc: currentLang === 'es'
        ? 'Desterramos la vaguedad de «dorar al gusto». Modelamos la desnaturalización térmica de la ovotransferrina (62°C) y la ovalbúmina (80°C), con estándares auditados de pasteurización y textura.'
        : currentLang === 'de'
        ? 'Wir beenden vage Küchenfloskeln. Wir berechnen die Denaturierung von Ovotransferrin (62°C) und Ovalbumin (80°C) für perfekte Saftigkeit und Sicherheit.'
        : 'No vague “cook until golden” instructions. We calculate thermal protein denaturation curves (ovotransferrin at 62°C, ovalbumin at 80°C) with rigorous safety standards.',
      badge: 'Thermodynamics',
    },
    {
      id: 'permanence',
      number: '05',
      stat: 'Edge vs Inmobiliaria',
      label: currentLang === 'es' ? 'Supervivencia Digital Permanente' : currentLang === 'de' ? 'Dauerhafte Edge-Resilienz' : 'Edge-Distributed Permanence',
      desc: currentLang === 'es'
        ? 'Pizza Brain en Filadelfia y el Currywurst Museum en Berlín recaudaron millones pero fueron desahuciados por subidas de alquiler. Nuestro grafo de conocimiento vive en la red sin costes inmobiliarios.'
        : currentLang === 'de'
        ? 'Pizza Brain und das Currywurst Museum scheiterten an steigenden Gewerbemieten. Unser Wissensgraph läuft serverless und bleibt dauerhaft frei zugänglich.'
        : 'Physical gimmick museums like Pizza Brain or the Currywurst Museum collapsed under commercial rent hikes. Our open-access knowledge graph runs indefinitely without real estate liabilities.',
      badge: 'Permanent',
    },
  ];

  const quickComparisons = [
    {
      name: 'tortilladepatatas.org',
      dish: currentLang === 'es' ? 'Tortilla de Patatas' : 'Spanish Omelette',
      origin: 'España / Global',
      score: 98,
      status: currentLang === 'es' ? 'Líder Mundial' : currentLang === 'de' ? 'Weltweiter Spitzenreiter' : 'World Standard',
      isWinner: true,
      highlight: currentLang === 'es' ? '100% SVG, cálculo paramétrico, termodinámica de proteínas y archivos de 1798.' : '100% vector SVG, parametric engine, protein physics, and 1798 archival fact-checking.',
    },
    {
      name: 'AVPN (Verace Pizza Napoletana)',
      dish: 'Pizza Napoletana STG',
      origin: 'Napoli, Italia',
      score: 86,
      status: currentLang === 'es' ? 'Bastión Legal STG' : 'Legal STG Guild',
      isWinner: false,
      highlight: currentLang === 'es' ? 'Excelente blindaje legal de la UE, pero web estática de los 2000 sin herramientas de cálculo interactivo.' : 'Great EU legal protection, but static Web 1.0 layout with zero interactive recipe tools.',
    },
    {
      name: 'Das Dönermuseum',
      dish: 'Döner Kebab',
      origin: 'Berlin, Deutschland',
      score: 72,
      status: currentLang === 'es' ? 'Archivo Pop de Culto' : 'Pop Archive',
      isWinner: false,
      highlight: currentLang === 'es' ? 'Brillante narrativa urbana y sociología berlinesa, pero sin física de emulsión ni perfiles de corte de carne.' : 'Superb urban culture narrative, but lacks thermal meat physics or sauce emulsion chemistry.',
    },
    {
      name: 'Pizza Brain (Defunct)',
      dish: 'Pizza Americana',
      origin: 'Philadelphia, USA',
      score: 48,
      status: currentLang === 'es' ? 'Extinto por Alquiler' : 'Defunct / Evicted',
      isWinner: false,
      highlight: currentLang === 'es' ? 'Récord Guinness en objetos de plástico; trampa de alquiler comercial que cerró sus puertas.' : 'Guinness record for plastic memorabilia; succumbed to commercial real estate overhead.',
    },
  ];

  return (
    <section className="relative overflow-hidden py-12 md:py-16 bg-[#FAF4E8] dark:bg-[#1C1613] border-b border-[#8D6E63]/25 transition-colors">
      <div className="container mx-auto max-w-7xl px-4 space-y-12">
        {/* Editorial Article Header */}
        <header className="relative space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-xs font-black tracking-wider uppercase border border-[#FFB800]/30 shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>{content.badge}</span>
          </div>

          <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#3E2723] dark:text-[#FAF4E8] tracking-tight leading-[1.15]">
            {content.title}
          </h2>

          <p className="text-base sm:text-lg text-[#8D6E63] dark:text-[#D7CCC8] leading-relaxed font-serif">
            {content.subtitle}
          </p>
        </header>

        {/* The 5 Key Pillars / Facts Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 border-b border-[#8D6E63]/20 pb-3">
            <h3 className="text-lg sm:text-xl font-black font-serif text-[#3E2723] dark:text-[#FAF4E8]">
              {content.factsTitle}
            </h3>
            <span className="hidden sm:inline-block text-xs font-mono text-[#8D6E63] dark:text-[#FFB800] bg-[#FFB800]/10 px-2.5 py-1 rounded-md">
              AUDITED 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.slice(0, 3).map((p) => (
              <article
                key={p.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#251D18] border border-[#8D6E63]/20 hover:border-[#FFB800] shadow-2xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#8D6E63] opacity-60">
                      {p.number}
                    </span>
                    <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#FFB800]/15 text-[#8D6E63] dark:text-[#FFB800]">
                      {p.badge}
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-[#3E2723] dark:text-[#FAF4E8]">
                    {p.stat}
                  </div>
                  <h4 className="text-base font-bold font-serif text-[#3E2723] dark:text-[#FAF4E8]">
                    {p.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8D6E63] dark:text-[#D7CCC8] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
            {pillars.slice(3, 5).map((p) => (
              <article
                key={p.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#251D18] border border-[#8D6E63]/20 hover:border-[#00A3FF] shadow-2xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#8D6E63] opacity-60">
                      {p.number}
                    </span>
                    <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#00A3FF]/15 text-[#00A3FF]">
                      {p.badge}
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-[#3E2723] dark:text-[#FAF4E8]">
                    {p.stat}
                  </div>
                  <h4 className="text-base font-bold font-serif text-[#3E2723] dark:text-[#FAF4E8]">
                    {p.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8D6E63] dark:text-[#D7CCC8] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Global Benchmark Scorecard Preview */}
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#251D18] border-2 border-[#8D6E63]/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFB800]">
                <Scale className="w-4 h-4" />
                <span>BENCHMARK CULINARIO GLOBAL</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-[#3E2723] dark:text-[#FAF4E8]">
                {content.comparisonTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#8D6E63] dark:text-[#D7CCC8]">
                {content.comparisonSubtitle}
              </p>
            </div>

            <LocalizedLink
              to="/mono-food"
              lang={currentLang}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0"
            >
              <span>{content.readFullAuditCta}</span>
              <ArrowRight className="w-4 h-4" />
            </LocalizedLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickComparisons.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all space-y-3 flex flex-col justify-between ${
                  item.isWinner
                    ? 'bg-[#FFB800]/10 border-[#FFB800] shadow-xs'
                    : 'bg-[#FAF4E8]/60 dark:bg-[#1C1613]/60 border-[#8D6E63]/20'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#8D6E63] dark:text-[#D7CCC8]">
                      {item.origin}
                    </span>
                    <span
                      className={`text-xs font-mono font-black px-2 py-0.5 rounded-md ${
                        item.isWinner
                          ? 'bg-[#FFB800] text-[#1C1917]'
                          : 'bg-[#8D6E63]/20 text-[#8D6E63] dark:text-[#D7CCC8]'
                      }`}
                    >
                      {item.score}/100
                    </span>
                  </div>

                  <h4 className="text-sm font-bold font-serif text-[#3E2723] dark:text-[#FAF4E8] leading-tight">
                    {item.name}
                  </h4>
                  <div className="text-xs font-semibold text-[#8D6E63] dark:text-[#FFB800]">
                    {item.dish}
                  </div>
                  <p className="text-[11px] text-[#8D6E63] dark:text-[#D7CCC8] leading-relaxed">
                    {item.highlight}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#8D6E63]/15 text-[10px] font-bold uppercase tracking-wider text-[#8D6E63] dark:text-[#FFB800]">
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
