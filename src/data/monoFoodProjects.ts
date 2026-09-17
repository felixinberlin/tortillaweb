export interface MonoFoodProject {
  id: string;
  name: string;
  dish: { es: string; en: string; de: string };
  originLocation: string;
  format: 'digital_knowledge_graph' | 'physical_museum' | 'regulatory_guild' | 'pop_archive' | 'heritage_championship';
  formatLabel: { es: string; en: string; de: string };
  status: 'active' | 'pop_up' | 'defunct';
  statusLabel: { es: string; en: string; de: string };
  foundedYear: string;
  authorityScore: number; // 0 - 100
  metrics: {
    scientificRigor: number; // 0 - 100
    digitalEngineering: number; // 0 - 100
    archivalFactChecking: number; // 0 - 100
    kitschLevel: number; // 0 - 100 (100 = plastic sausages, 0 = pure craft)
    survivabilityIndex: number; // 0 - 100
  };
  keyStrengths: { es: string[]; en: string[]; de: string[] };
  keyWeaknesses: { es: string[]; en: string[]; de: string[] };
  spicyVerdict: { es: string; en: string; de: string };
  whatWeLearned: { es: string; en: string; de: string };
  keyQuote: { es: string; en: string; de: string };
  officialUrl?: string;
}

export interface DeadlySin {
  number: number;
  title: { es: string; en: string; de: string };
  crime: { es: string; en: string; de: string };
  spicyRoast: { es: string; en: string; de: string };
  ourCountermeasure: { es: string; en: string; de: string };
}

export interface MarketingPillar {
  id: string;
  title: { es: string; en: string; de: string };
  subtitle: { es: string; en: string; de: string };
  description: { es: string; en: string; de: string };
  actionLabel: { es: string; en: string; de: string };
  href: string;
}

export const MONO_FOOD_PROJECTS: MonoFoodProject[] = [
  {
    id: 'tortilladepatatas-org',
    name: 'tortilladepatatas.org',
    dish: {
      es: 'Tortilla de Patatas (Tortilla Española)',
      en: 'Spanish Potato Omelette (Tortilla de Patatas)',
      de: 'Spanische Kartoffel-Tortilla (Tortilla de Patatas)',
    },
    originLocation: 'Madrid / Santander / Betanzos (Spain)',
    format: 'digital_knowledge_graph',
    formatLabel: {
      es: 'Grafo de Conocimiento & Museo Digital Vivo',
      en: 'Living Digital Knowledge Graph & Scientific Open Archive',
      de: 'Lebendiger digitaler Wissensgraph & wissenschaftliches Open-Archive',
    },
    status: 'active',
    statusLabel: { es: '100% Operativo (Acceso Abierto)', en: '100% Operational (Open Access)', de: '100% Betriebsbereit (Open Access)' },
    foundedYear: '2024',
    authorityScore: 98,
    metrics: {
      scientificRigor: 99,
      digitalEngineering: 98,
      archivalFactChecking: 97,
      kitschLevel: 2,
      survivabilityIndex: 99,
    },
    keyStrengths: {
      es: [
        'Taxonomía relacional profunda de 3 niveles (Pilares → Temas → Fichas)',
        'Física térmica y seguridad bactericida estricta: 70°C por 2 minutos, 63°C por 20 segundos y 4 horas',
        'Motor de cálculo paramétrico con estado URL (cero cuentas ni muros de pago)',
        'Generación procedural de vectores SVG puros (cero fotografías pesadas)',
        'Segregación rigurosa de hecho histórico (1798 Villanueva de la Serena) frente a mitos',
      ],
      en: [
        'Deep 3-tier relational taxonomy (Pillars → Topics → Deep Entity Nodes)',
        'Strict thermal physics & bactericidal safety canon: 70°C for 2 min, 63°C for 20s, and 4 hours',
        'Parametric recipe DNA builder with zero-login URL-encoded state',
        'Procedural pure SVG vector generation (zero heavy raster photos or cookie walls)',
        'Rigorous segregation of archival fact (1798 Villanueva) from military mythology',
      ],
      de: [
        'Tiefgreifende 3-stufige relationale Taxonomie (Säulen → Themen → Entitätsknoten)',
        'Strikter thermodynamischer & bakterizider Sicherheitskanon: 70°C für 2 Min, 63°C für 20 Sek, 4 Std',
        'Parametrischer Rezept-Rechner mit URL-codiertem Zustand ohne Login',
        'Prozedurale reine SVG-Vektorgenerierung ohne schwere Rasterbilder',
        'Strenge Trennung von Archivfakten (1798 Villanueva de la Serena) und Legenden',
      ],
    },
    keyWeaknesses: {
      es: [
        'Cero venta de peluches con forma de patata sonriente para turistas',
        'Niega sistemáticamente complacer a los que quieren una tortilla seca de camping sin advertencia térmica',
      ],
      en: [
        'Zero smiling plush potato toys available in the gift shop',
        'Refuses to validate dry picnic hockey pucks without clear thermal safety warnings',
      ],
      de: [
        'Kein Verkauf von lächelnden Plüsch-Kartoffeln für Touristen',
        'Weigert sich, trockene Picknick-Tortillas ohne mikrobiologische Warnhinweise schönzureden',
      ],
    },
    spicyVerdict: {
      es: 'La enciclopedia que el plato nacional merecía hace 100 años. Se niega a meter historias de infancia sobre la lluvia en Galicia antes de darte el peso exacto de la patata. Precisión militar, termodinámica de la ovotransferrina y respeto absoluto al usuario.',
      en: 'The encyclopedia Spain’s national dish deserved a century ago. Zero life stories about rainy vacations before giving you potato weights. Pure thermal physics, ovotransferrin coagulation science, and uncompromising craftsmanship.',
      de: 'Die Enzyklopädie, die Spaniens Nationalgericht seit 100 Jahren verdient hat. Keine 3.000 Wörter Kindheitserinnerungen vor der Mengenangabe. Reine Physik, Ovotransferrin-Stockung und kompromisslose Web-Architektur.',
    },
    whatWeLearned: {
      es: 'Que la devoción por un plato no se demuestra con una tienda de souvenirs ni con un local con alquiler desorbitado en Malasaña: se demuestra con datos abiertos, cálculo exacto y respeto histórico.',
      en: 'Devotion to a cultural food is not proven with novelty mugs or gentrified rent: it is proven with open data, mathematical modeling, and archival integrity.',
      de: 'Wahre kulinarische Hingabe beweist sich weder im Souvenirshop noch in überteuerten Hipster-Mieten: Sie beweist sich in offenen Daten, exakter Mathematik und historischer Wahrheit.',
    },
    keyQuote: {
      es: '«La tortilla perfecta no es una opinión estética; es una curva de coagulación térmica de 63°C a 70°C gobernada por el almidón y el aceite de oliva virgen extra.»',
      en: '“The perfect tortilla is not an aesthetic opinion; it is a thermal coagulation curve between 63°C and 70°C governed by starch and extra virgin olive oil.”',
      de: '„Die perfekte Tortilla ist keine Geschmacksmeinung; sie ist eine thermische Stockungskurve zwischen 63°C und 70°C unter Kontrolle von Stärke und Olivenöl.“',
    },
    officialUrl: 'https://tortilladepatatas.org',
  },
  {
    id: 'avpn-disciplinare',
    name: 'Associazione Verace Pizza Napoletana (AVPN)',
    dish: {
      es: 'Pizza Napolitana STG',
      en: 'True Neapolitan Pizza STG',
      de: 'Echte Neapolitanische Pizza STG',
    },
    originLocation: 'Naples, Italy',
    format: 'regulatory_guild',
    formatLabel: {
      es: 'Fortaleza Regulatoria & Pliego Técnico STG',
      en: 'Regulatory Guild & Legal STG Specification',
      de: 'Regulatorische Gilde & STG-Spezifikation',
    },
    status: 'active',
    statusLabel: { es: 'Gremio Activo (Patrimonio UNESCO)', en: 'Active Guild (UNESCO Heritage)', de: 'Aktive Gilde (UNESCO-Erbe)' },
    foundedYear: '1984',
    authorityScore: 88,
    metrics: {
      scientificRigor: 91,
      digitalEngineering: 42,
      archivalFactChecking: 94,
      kitschLevel: 15,
      survivabilityIndex: 96,
    },
    keyStrengths: {
      es: [
        'Pliego técnico legendario de 14 páginas: horneado a 430°C–480°C durante 60–90 segundos',
        'Control estricto de hidratación de masa entre 55,5% y 62,5%',
        'Inscripción de los Pizzaiuoli en la lista de Patrimonio Cultural Inmaterial de la UNESCO (2017)',
      ],
      en: [
        'Legendary 14-page technical specification: baked at 430°C–480°C for 60–90 seconds',
        'Strict dough hydration tolerance bracketed between 55.5% and 62.5%',
        'UNESCO Intangible Cultural Heritage inscription for the Neapolitan Pizzaiuolo (2017)',
      ],
      de: [
        'Legendäre 14-seitige Spezifikation: Backen bei 430°C–480°C für 60–90 Sekunden',
        'Strikter Hydratationsbereich des Teigs zwischen 55,5% und 62,5%',
        'UNESCO-Weltkulturerbe-Anerkennung der neapolitanischen Pizzaiuoli (2017)',
      ],
    },
    keyWeaknesses: {
      es: [
        'Experiencia web arcaica: PDFs escaneados y formularios de certificación burocráticos de los 90',
        'Exige pagar miles de euros para que un inspector viaje a tu local y certifique tu horno de leña',
      ],
      en: [
        'Archaic web architecture: clunky PDFs and bureaucratic certification forms from the 1990s',
        'Demands thousands of euros to fly an inspector to your pizzeria to touch your domed oven',
      ],
      de: [
        'Veralteter Webauftritt: sperrige PDFs und bürokratische Formulare aus den 1990er-Jahren',
        'Verlangt tausende Euro für Inspektorenflüge zur Vor-Ort-Begutachtung des Holzofens',
      ],
    },
    spicyVerdict: {
      es: 'El Vaticano de la masa fermentada. Su rigor técnico es admirable y su pliego STG es pura poesía legal, pero navegar su sitio web te produce la misma sensación que renovar el pasaporte en una embajada italiana en 1998.',
      en: 'The Vatican of fermented dough. Their legal specification is magnificent poetry, but navigating their website feels like applying for a construction permit in 1998.',
      de: 'Der Vatikan des fermentierten Teigs. Ihre technische Spezifikation ist beeindruckend, doch ihre Website fühlt sich an wie ein Bauantrag im Jahr 1998.',
    },
    whatWeLearned: {
      es: 'La codificación legal protege la identidad del plato frente a sucedáneos industriales, pero la burocracia cerrada aleja a las nuevas generaciones.',
      en: 'Legal codification protects food identity against industrial counterfeit, but clunky bureaucracy alienates modern cooks.',
      de: 'Juristische Spezifikationen schützen vor industrieller Verwässerung, aber starre Bürokratie schreckt jüngere Generationen ab.',
    },
    keyQuote: {
      es: '«La vera pizza napoletana no es un invento de marketing: es un disco elástico horneado en 90 segundos con cornicione de 2 cm.»',
      en: '“True Neapolitan pizza is not marketing: it is an elastic disc baked in 90 seconds with a 2cm raised cornicione.”',
      de: '„Die echte neapolitanische Pizza ist kein Marketing: Sie ist ein elastischer Fladen, der in 90 Sekunden mit 2 cm Rand gebacken wird.“',
    },
    officialUrl: 'https://www.pizzanapoletana.org',
  },
  {
    id: 'das-doenermuseum',
    name: 'Das Dönermuseum (Dönerkind)',
    dish: {
      es: 'Döner Kebab (Berlín / Germano-Turco)',
      en: 'Döner Kebab (Berlin German-Turkish Style)',
      de: 'Döner Kebab (Berliner deutsch-türkischer Stil)',
    },
    originLocation: 'Berlin, Germany',
    format: 'physical_museum',
    formatLabel: {
      es: 'Archivo Sociológico Pop-Up & Fundación',
      en: 'Sociological Pop-Up Archive & Civic Foundation',
      de: 'Soziologisches Pop-Up-Archiv & Initiative',
    },
    status: 'pop_up',
    statusLabel: { es: 'Exposiciones Pop-Up & Campaña Activa', en: 'Pop-Up Exhibits & Campaigning', de: 'Pop-Up-Ausstellungen & Kampagne' },
    foundedYear: '2020',
    authorityScore: 78,
    metrics: {
      scientificRigor: 64,
      digitalEngineering: 68,
      archivalFactChecking: 86,
      kitschLevel: 32,
      survivabilityIndex: 72,
    },
    keyStrengths: {
      es: [
        'Análisis sociológico impecable de la generación Gastarbeiter (Tratado de contratación de 1961)',
        'Debate documentado sobre los orígenes: Kadir Nurman (1972) vs. Mahmut Aygün (1971) vs. Nevzat Salim (1969)',
        'Campaña cultural con eco político nacional (Dönerpreisbremse en el Bundestag)',
      ],
      en: [
        'Superb sociological documentation of the Gastarbeiter generation under the 1961 treaty',
        'Documented debate on inventors: Kadir Nurman (1972) vs. Mahmut Aygün (1971) vs. Nevzat Salim (1969)',
        'Cultural advocacy with Bundestag political resonance (the Dönerpreisbremse inflation debate)',
      ],
      de: [
        'Hervorragende soziologische Aufarbeitung der Gastarbeiter-Generation nach dem Anwerbeabkommen 1961',
        'Dokumentierter Erfinder-Diskurs: Kadir Nurman (1972) vs. Mahmut Aygün (1971) vs. Nevzat Salim (1969)',
        'Hohe politische Resonanz in der Inflationsdebatte (Dönerpreisbremse im Bundestag)',
      ],
    },
    keyWeaknesses: {
      es: [
        'Aún sin sede física permanente tras años de recaudación',
        'Presencia web centrada en venta de calcetines y pósteres más que en simulación culinaria o recetas de adobo',
      ],
      en: [
        'Still lacking a permanent physical brick-and-mortar venue after years of crowdfunding',
        'Web presence leans heavily on merchandise (socks, totes) rather than interactive meat-layer simulation',
      ],
      de: [
        'Nach wie vor kein dauerhafter physischer Standort nach Jahren des Crowdfundings',
        'Online-Fokus stark auf Merchandising (Socken, Poster) statt interaktiver Fleischschicht-Simulation',
      ],
    },
    spicyVerdict: {
      es: 'Una radiografía fascinante de la identidad berlinesa y la inmigración laboral. Nos encanta su espíritu callejero, pero mientras ellos discuten con el parlamento si el kebab debe costar 5€, nosotros calculamos microgramos de almidón y cinéticas térmicas de la patata.',
      en: 'A fascinating sociological portrait of modern Berlin. We love their grassroots hustle, but while they lobby parliament for a €5 price cap, we calculate starch gelatinization and Salmonella deactivation kinetics.',
      de: 'Ein faszinierendes Porträt Berliner Stadtkultur. Wir lieben den Spirit, doch während sie im Bundestag um die 5-Euro-Dönerpreisbremse debattieren, berechnen wir Stärkeverkleisterung und Salmonelleninaktivierung.',
    },
    whatWeLearned: {
      es: 'Un plato callejero refleja las batallas sociales de su época; sin embargo, depender de campañas de crowdfunding para financiar ladrillos físicos es una trampa de liquidez.',
      en: 'Street food mirrors socio-political migrations; however, relying on physical brick crowdfunding is a chronic liquidity trap.',
      de: 'Streetfood spiegelt gesellschaftliche Migration wider; doch das Hoffen auf physisches Museum-Crowdfunding ist finanziell riskant.',
    },
    keyQuote: {
      es: '«El Döner no es solo carne girando en un asador vertical: es el contrato social del Berlín reunificado dentro de un pan plano.»',
      en: '“The Döner is not merely meat on a vertical spit: it is the social contract of reunited Berlin inside a flatbread.”',
      de: '„Der Döner ist nicht nur Fleisch am Spieß: Er ist der Gesellschaftsvertrag des wiedervereinigten Berlin im Fladenbrot.“',
    },
    officialUrl: 'https://doenerkind.de',
  },
  {
    id: 'shin-yokohama-raumen-museum',
    name: 'Shin-Yokohama Raumen Museum',
    dish: {
      es: 'Ramen Regional Japonés (Tonkotsu, Miso, Shoyu, Shio)',
      en: 'Regional Japanese Ramen (Tonkotsu, Miso, Shoyu, Shio)',
      de: 'Regionale japanische Ramen (Tonkotsu, Miso, Shoyu, Shio)',
    },
    originLocation: 'Yokohama, Japan',
    format: 'physical_museum',
    formatLabel: {
      es: 'Parque Temático & Museo Inmersivo Escala 1:1',
      en: '1:1 Scale Immersive Thematic Culinary Museum',
      de: 'Immersives 1:1 Themenmuseum & Schlemmerdorf',
    },
    status: 'active',
    statusLabel: { es: 'Abierto al Público (Desde 1994)', en: 'Open to Public (Since 1994)', de: 'Geöffnet (Seit 1994)' },
    foundedYear: '1994',
    authorityScore: 86,
    metrics: {
      scientificRigor: 82,
      digitalEngineering: 52,
      archivalFactChecking: 95,
      kitschLevel: 28,
      survivabilityIndex: 94,
    },
    keyStrengths: {
      es: [
        'Recreación atmosférica asombrosa del Tokio crepuscular de 1958 (año del ramen instantáneo de Momofuku Ando)',
        'Rotación estricta de maestros de caldos regionales (desde Hokkaido hasta Kyushu)',
        'Investigación profunda del kansui (agua alcalina) y la elasticidad del fideo',
      ],
      en: [
        'Stunning 1:1 atmospheric replica of twilight Tokyo in 1958 (the year Momofuku Ando invented instant noodles)',
        'Strict rotating curatorship of regional broth masters (from Hokkaido Miso to Kyushu Tonkotsu)',
        'Deep historical research on kansui alkaline water and noodle tensile elasticity',
      ],
      de: [
        'Spektakuläre 1:1 Kulisse des abendlichen Tokio von 1958 (Erfindungsjahr der Instant-Nudel durch Momofuku Ando)',
        'Strenge Kuration regionaler Brühenmeister (von Hokkaido bis Kyushu)',
        'Fundierte Dokumentation über Kansui (Alkalisches Wasser) und Nudelelastizität',
      ],
    },
    keyWeaknesses: {
      es: [
        'Presencia web reducida a un portal turístico para comprar entradas y ver horarios',
        'Experiencia 100% dependiente de visitar físicamente Yokohama y hacer cola durante 45 minutos',
      ],
      en: [
        'Web presence strictly limited to a tourist ticketing portal and floor plan directory',
        'Completely dependent on flying to Yokohama and standing in a 45-minute basement queue',
      ],
      de: [
        'Webauftritt im Wesentlichen auf Ticketverkauf und Öffnungszeiten beschränkt',
        'Vollständig abhängig vom Flug nach Yokohama und 45 Minuten Schlange stehen im Keller',
      ],
    },
    spicyVerdict: {
      es: 'El mejor parque temático gastronómico del planeta. Bajar a su sótano es viajar en el tiempo con olor a caldo de cerdo hirviendo. Pero en internet son un folleto con fotos. El fideo tiene museo físico; la tortilla española tiene un cerebro digital.',
      en: 'The finest food theme park on earth. Walking into its twilight basement smells like pork broth paradise. But online they are just a ticketing brochure. Ramen has a physical shrine; tortilla has a digital brain.',
      de: 'Der wohl beste Food-Themenpark der Welt. Doch im Netz ist es nur ein Ticketflyer. Ramen hat einen physischen Tempel; die spanische Tortilla hat ein globales digitales Gehirn.',
    },
    whatWeLearned: {
      es: 'La nostalgia bien ejecutada emociona a millones de visitantes, pero un museo físico sin plataforma interactiva global no puede enseñar a cocinar al resto del mundo.',
      en: 'Executed nostalgia touches millions, but a physical venue without an interactive web engine cannot educate the wider world.',
      de: 'Perfekt inszenierte Nostalgie begeistert Millionen, doch ohne interaktive Online-Werkzeuge erreicht sie die Küchen der Welt nicht.',
    },
    keyQuote: {
      es: '«En 1958 una ciudad hambrienta encontró consuelo en un cuenco humeante de trigo, agua alcalina y caldo fermentado.»',
      en: '“In 1958, a rebuilding nation found solace in a steaming bowl of wheat, alkaline water, and fermented broth.”',
      de: '„1958 fand eine hungernde Nation Trost in einer dampfenden Schale aus Weizen, alkalischem Wasser und Brühe.“',
    },
    officialUrl: 'https://www.raumen.co.jp',
  },
  {
    id: 'casa-do-patron-cocido',
    name: 'Museo Etnográfico Casa do Patrón & Club del Cocido',
    dish: {
      es: 'Cocido Gallego & Cocido Madrileño (Los Tres Vuelcos)',
      en: 'Galician & Madrilenian Cocido (The Three Turns)',
      de: 'Galicischer & Madrider Cocido (Die drei Gänge / Tres Vuelcos)',
    },
    originLocation: 'Codeseda (Lalín, Galicia) & Madrid, Spain',
    format: 'physical_museum',
    formatLabel: {
      es: 'Ecomuseo Etnográfico & Cofradía de Cata Ciega',
      en: 'Ethnographic Ecomuseum & 30-Year Blind-Tasting Guild',
      de: 'Ethnographisches Ekomuseum & Blindverkostungs-Gilde',
    },
    status: 'active',
    statusLabel: { es: 'Activo & Cofradía Operativa', en: 'Active & Scoring Monthly', de: 'Aktiv & Monatliche Treffen' },
    foundedYear: '1991',
    authorityScore: 83,
    metrics: {
      scientificRigor: 80,
      digitalEngineering: 38,
      archivalFactChecking: 96,
      kitschLevel: 8,
      survivabilityIndex: 91,
    },
    keyStrengths: {
      es: [
        'Colección etnográfica de 4.500 piezas en Lalín: lareiras de granito y calderos de hierro de matanza',
        'Rigor de cata del Club de Amigos del Cocido (Madrid): 30 años de actas puntuando de 0 a 10 garbanzo, sopa y carnes',
        'Respeto canónico al ritual de los Tres Vuelcos heredado de la adafina sefardí',
      ],
      en: [
        '4,500-piece ethnographic collection in Lalín featuring ancestral granite hearths and salting cauldrons',
        'Club de Amigos del Cocido (Madrid): 30 years of blind 0–10 scorecards assessing chickpeas, broth, and viands',
        'Canonical ritual of the Three Turns (Tres Vuelcos) tracing back to Sephardic Jewish Adafina',
      ],
      de: [
        'Ethnographische Sammlung von 4.500 Exponaten in Lalín: Granitkamine und historische Kessel',
        'Club de Amigos del Cocido (Madrid): 30 Jahre Blindverkostungsbögen (0-10 Punkte) für Kichererbsen und Brühe',
        'Kanonischer Ablauf der drei Gänge (Tres Vuelcos), zurückgehend auf die sephardische Adafina',
      ],
    },
    keyWeaknesses: {
      es: [
        'Actas de puntuación en carpetas de papel y blocs de notas manuscritos sin volcar a base de datos pública',
        'Sitio web institucional anticuado con fotos estáticas de banquetes',
      ],
      en: [
        'Three decades of meticulous tasting notes locked in physical folders and paper ledger spreadsheets',
        'Outdated institutional web portal with static banquet photos and no public query interface',
      ],
      de: [
        'Drei Jahrzehnte detaillierte Verkostungsnotizen schlummern in Aktenordnern statt in einer offenen Datenbank',
        'Veralteter Webauftritt mit statischen Bankettfotos ohne moderne Suchmaske',
      ],
    },
    spicyVerdict: {
      es: 'La aristocracia del garbanzo y el cerdo curado. Su disciplina de cata ciega supera a la de los sumilleres de Burdeos. Si volcaran sus 30 años de notas a una base de datos abierta como la nuestra, los restaurantes mediocres de Madrid quebrarían en 48 horas.',
      en: 'The aristocracy of chickpeas and cured pork. Their blind-tasting discipline rivals Bordeaux sommeliers. If they exported their 30 years of scores to an open API like ours, half of Madrid’s tourist-trap taverns would close overnight.',
      de: 'Die Aristokratie der Kichererbse. Ihre Blindverkostungen schlagen viele Weinjurys. Würden sie ihre 30 Jahre Notizen in eine offene API wie unsere überführen, müssten Dutzende Touristenfallen in Madrid sofort schließen.',
    },
    whatWeLearned: {
      es: 'Que las cofradías gastronómicas atesoran un conocimiento empírico colosal, pero sin ingeniería de software moderna ese saber permanece invisible para el planeta.',
      en: 'Traditional culinary guilds possess priceless empirical truth, but without modern software engineering that wisdom stays trapped in dining rooms.',
      de: 'Traditionelle Gilden besitzen kolossales Wissen, doch ohne moderne Software bleibt dieses Wissen für die Welt unsichtbar.',
    },
    keyQuote: {
      es: '«El caldo debe tener densidad de colágeno sin grasa flotante, y el garbanzo deshacerse en el paladar sin perder el pellejo.»',
      en: '“The broth must hold collagen density without grease pools, and the chickpea must yield on the palate without shedding its skin.”',
      de: '„Die Brühe braucht Kollagendichte ohne Fettfilm, und die Kichererbse muss auf der Zunge schmelzen, ohne die Haut zu verlieren.“',
    },
    officialUrl: 'https://casadopatron.com',
  },
  {
    id: 'cencalli-fundacion-tortilla',
    name: 'Cencalli & Fundación Tortilla de Maíz Mexicana',
    dish: {
      es: 'Tortilla de Maíz Nixtamalizado (Mesoamérica)',
      en: 'Nixtamalized Maize Flatbread (Mexican Corn Tortilla)',
      de: 'Nixtamalisiertes Maisfladenbrot (Mexikanische Maistortilla)',
    },
    originLocation: 'Mexico City (Chapultepec / Xalapa), Mexico',
    format: 'physical_museum',
    formatLabel: {
      es: 'Casa del Maíz y la Cultura Alimentaria & Fundación Científica',
      en: 'House of Maize Heritage & Scientific Agronomy Foundation',
      de: 'Zentrum für Maiskultur & wissenschaftliche Stiftung',
    },
    status: 'active',
    statusLabel: { es: 'Abierto en Chapultepec & Activo', en: 'Active in Chapultepec & Fieldwork', de: 'Aktiv im Chapultepec-Park & Forschung' },
    foundedYear: '2021',
    authorityScore: 90,
    metrics: {
      scientificRigor: 94,
      digitalEngineering: 70,
      archivalFactChecking: 98,
      kitschLevel: 5,
      survivabilityIndex: 93,
    },
    keyStrengths: {
      es: [
        'Defensa heroica de las 64 razas de maíz nativo frente al monopolio del maíz transgénico e industrial',
        'Explicación científica impecable de la nixtamalización: liberación de niacina (vitamina B3) y absorción de calcio',
        'Sede monumental en el Molino del Rey (Bosque de Chapultepec, CDMX)',
      ],
      en: [
        'Heroic defense of Mexico’s 64 heirloom native maize landraces against industrial monoculture',
        'Impeccable agronomic and biochemical explanation of nixtamalization (calcium bioavailability & niacin release)',
        'Monumental physical presence at the historic Molino del Rey in Chapultepec Park, Mexico City',
      ],
      de: [
        'Heroischer Einsatz für 64 einheimische Maissorten gegen industrielle Einheitsmehle',
        'Biochemisch fundierte Vermittlung der Nixtamalisation (Freisetzung von Niacin und bioverfügbarem Calcium)',
        'Monumentaler Standort im historischen Molino del Rey im Chapultepec-Park (CDMX)',
      ],
    },
    keyWeaknesses: {
      es: [
        'Confusión semántica global inevitable: el 80% de los anglosajones confunden la tortilla de patatas con su tortilla de maíz',
        'Plataformas digitales fragmentadas entre portales gubernamentales y cuentas de redes sociales',
      ],
      en: [
        'Endless linguistic confusion: 80% of English speakers confuse Spanish potato omelettes with Mexican corn flatbreads',
        'Digital presence fragmented across state ministry portals and social media campaigns',
      ],
      de: [
        'Ständige Begriffsverwirrung: Viele Nicht-Spanier verwechseln die spanische Kartoffel-Tortilla mit dem mexikanischen Maisfladen',
        'Digitale Präsenz verteilt auf Ministeriumsseiten und Social-Media-Kanäle',
      ],
    },
    spicyVerdict: {
      es: 'Un monumento colosal a la biodiversidad del planeta. Su trabajo sobre la nixtamalización es oro puro. Nuestro único ruego a la diplomacia internacional: por favor, explicadles a los turistas de California que nosotros no freímos huevos dentro de un taco.',
      en: 'A colossal monument to global biodiversity. Their biochemical research on nixtamal is gold. Our only plea to international diplomats: please explain to California tourists that we don’t fry eggs inside a taco.',
      de: 'Ein kolossales Denkmal für Agrobiodiversität. Ihre biochemische Nixtamalisations-Forschung ist Gold wert. Unsere einzige Bitte: Klärt Reisende bitte auf, dass wir keine Eier in Tacos braten.',
    },
    whatWeLearned: {
      es: 'Que un ingrediente ancestral sostiene civilizaciones enteras; la claridad taxonómica en los nombres salva a los proyectos del caos terminológico en Google.',
      en: 'An ancestral crop sustains entire civilizations; strict taxonomic nomenclature prevents global search engine chaos.',
      de: 'Ein Urkorn trägt ganze Kulturen; exakte Taxonomie schützt vor chaotischen Verwechslungen in weltweiten Suchmaschinen.',
    },
    keyQuote: {
      es: '«Sin maíz no hay país: la nixtamalización convirtió el grano silvestre en el milagro biológico que alimentó a Mesoamérica.»',
      en: '“Without maize there is no country: nixtamalization transformed wild grain into the biochemical miracle of Mesoamerica.”',
      de: '„Ohne Mais kein Land: Erst die Nixtamalisation machte das Wildgras zum biochemischen Wunder Mesoamerikas.“',
    },
    officialUrl: 'https://fundaciontortilla.org',
  },
  {
    id: 'frietmuseum-bruges',
    name: 'Frietmuseum (Bruges)',
    dish: {
      es: 'Patatas Fritas Belgas (Frites con Doble Fritura en Grasa de Buey)',
      en: 'Belgian Fries (Frites with Double Beef-Tallow Frying)',
      de: 'Belgische Pommes Frites (Doppelt frittiert in Rindertalg)',
    },
    originLocation: 'Bruges, Belgium',
    format: 'physical_museum',
    formatLabel: {
      es: 'Museo Físico en Edificio Histórico (Saaihalle)',
      en: 'Physical Museum in 14th-Century Gothic Hall',
      de: 'Physisches Museum in der gotischen Saaihalle',
    },
    status: 'active',
    statusLabel: { es: 'Abierto al Público', en: 'Open to Public', de: 'Geöffnet' },
    foundedYear: '2008',
    authorityScore: 71,
    metrics: {
      scientificRigor: 68,
      digitalEngineering: 45,
      archivalFactChecking: 82,
      kitschLevel: 55,
      survivabilityIndex: 88,
    },
    keyStrengths: {
      es: [
        'Ubicado en la Saaihalle del siglo XIV, uno de los edificios comerciales más antiguos de Brujas',
        'Exposición didáctica del viaje de la patata desde el lago Titicaca andino hasta Flandes',
        'Enfoque en la fritura tradicional belga en dos tiempos con grasa de buey (ossewit)',
      ],
      en: [
        'Housed in the 14th-century Saaihalle, among Bruges’ oldest surviving commercial guildhalls',
        'Educational path of the potato from Lake Titicaca in the Andes to Flemish frietkoten',
        'Focus on authentic two-stage Belgian frying in pure beef tallow (ossewit)',
      ],
      de: [
        'Untergebracht in der Saaihalle aus dem 14. Jahrhundert, einem der ältesten Gebäude von Brügge',
        'Pädagogischer Pfad der Kartoffel vom Titicacasee in den Anden bis nach Flandern',
        'Fokus auf authentisches zweistufiges Frittieren in reinem Rindertalg (Ossewit)',
      ],
    },
    keyWeaknesses: {
      es: [
        'Cae en el kitsch de cartón piedra: figuras gigantes de patatas fritas de plástico y fotos de recuerdo para turistas',
        'Sitio web estático sin simulador de temperatura de aceite ni cálculo de humedad de tubérculo',
      ],
      en: [
        'Heavy reliance on theme-park fiberglass props: giant plastic fries and tourist photo cutouts',
        'Static website lacking oil temperature curves or starch-to-moisture ratios',
      ],
      de: [
        'Hoher Kitschfaktor: riesige Plastik-Pommes und bunte Fotowände für Touristen',
        'Veraltete Website ohne Öltemperatur-Rechner oder Stärke-Feuchtigkeits-Simulation',
      ],
    },
    spicyVerdict: {
      es: 'Un paseo simpático si estás de crucero en Brujas y quieres refugiarte de la lluvia comiendo patatas con mayonesa. Pero a nivel de ingeniería web es un folleto escolar de los 2000 forrado en plástico.',
      en: 'A charming stop when dodging rain in Bruges with a cone of fries and samurai sauce. But in terms of web engineering, it’s a laminated primary school brochure from 2004.',
      de: 'Ein netter Regenzuflug in Brügge mit einer Tüte Pommes und Mayonnaise. Web-technisch aber eher ein laminiertes Schulheft aus dem Jahr 2004.',
    },
    whatWeLearned: {
      es: 'Las patatas fritas y la tortilla comparten el mismo tubérculo y la misma obsesión por la temperatura del aceite, pero la ciencia rigurosa no necesita monigotes de plástico para convencer.',
      en: 'Belgian fries and Spanish tortilla share the same tuber and oil physics, but real culinary science doesn’t need plastic mascots to command respect.',
      de: 'Pommes und Tortilla teilen dieselbe Knolle und dieselbe Ölphysik, aber seriöse Küchenwissenschaft braucht keine Plastikmaskottchen.',
    },
    keyQuote: {
      es: '«La primera fritura a 150°C cuece el interior; el reposo estabiliza el vapor; la segunda a 180°C sella la corteza crujiente.»',
      en: '“The first fry at 150°C cooks the interior; the rest stabilizes moisture; the second fry at 180°C creates the glass crust.”',
      de: '„Das erste Frittieren bei 150°C gart das Innere; die Ruhephase stabilisiert den Dampf; das zweite bei 180°C zaubert die Kruste.“',
    },
    officialUrl: 'https://frietmuseum.be',
  },
  {
    id: 'pizza-brain-philadelphia',
    name: 'Pizza Brain (Philadelphia)',
    dish: {
      es: 'Pizza Slice Americana & Cultura Pop',
      en: 'American Pizza Culture & Memorabilia',
      de: 'Amerikanische Pizza-Kultur & Pop-Memorabilia',
    },
    originLocation: 'Philadelphia (Fishtown), USA',
    format: 'pop_archive',
    formatLabel: {
      es: 'Pizzería & Museo de Memorabilia Guinness (Extinto)',
      en: 'Pizzeria & Guinness World Record Archive (Defunct)',
      de: 'Pizzeria & Guinness-Weltrekord-Archiv (Aufgelöst)',
    },
    status: 'defunct',
    statusLabel: { es: 'Cerrado en 2024 (Récord Guinness 2011–2024)', en: 'Closed in 2024 (Guinness Record 2011–2024)', de: 'Geschlossen 2024 (Guinness-Rekord 2011–2024)' },
    foundedYear: '2012',
    authorityScore: 62,
    metrics: {
      scientificRigor: 35,
      digitalEngineering: 50,
      archivalFactChecking: 75,
      kitschLevel: 88,
      survivabilityIndex: 10,
    },
    keyStrengths: {
      es: [
        'Certificado por Guinness en 2011 con la mayor colección mundial de memorabilia sobre pizza (561+ objetos verificados)',
        'Juguetes vintage de las Tortugas Ninja, cómics, pósteres de películas y cortadores de pizza psicodélicos',
        'Punto de encuentro icónico de la escena indie y skater en Fishtown durante 12 años',
      ],
      en: [
        'Guinness World Record certified in 2011 for the largest pizza memorabilia archive (561+ artifacts)',
        'Vintage Teenage Mutant Ninja Turtles toys, movie posters, arcade machines, and oddball pizza slicers',
        'Beloved indie cultural and community anchor in Fishtown, Philadelphia for over 12 years',
      ],
      de: [
        '2011 als weltgrößte Pizza-Sammlung im Guinness-Buch zertifiziert (über 561 verifizierte Artefakte)',
        'Vintage Teenage Mutant Ninja Turtles Spielzeug, Kinoplakate, Comics und kuriose Pizzaroller',
        '12 Jahre lang beliebter Treffpunkt der alternativen Szene im Stadtteil Fishtown',
      ],
    },
    keyWeaknesses: {
      es: [
        'Cero ciencia sobre fermentación en frío, conductividad térmica de acero ni química de mozzarella',
        'Clausura definitiva en 2024 por presión de costes inmobiliarios y falta de solvencia digital',
      ],
      en: [
        'Zero science regarding cold fermentation, baking steel thermal conductivity, or lactococcus curd chemistry',
        'Permanently shut down in 2024 due to escalating commercial lease costs and reliance on foot traffic',
      ],
      de: [
        'Keinerlei wissenschaftliche Tiefe zu Kaltfermentation, Backstahl oder Enzymaktivität',
        '2024 endgültig geschlossen wegen explodierender Gewerbemieten und fehlender digitaler Skalierung',
      ],
    },
    spicyVerdict: {
      es: 'La advertencia definitiva para los museos gastronómicos físicos. Podrás tener todos los muñecos de Donatello comiendo pizza del planeta, pero cuando el casero te sube el alquiler en un barrio de moda, tu museo desaparece. Una web bien construida jamás paga desahucio.',
      en: 'The cautionary tale for physical food museums. You can own every vintage Ninja Turtle plastic toy in existence, but when your commercial lease triples in a hipster neighborhood, your museum dies. A pure digital knowledge graph never gets evicted.',
      de: 'Die ultimative Warnung für physische Food-Museen. Man kann jede Ninja-Turtle-Figur der Welt besitzen, doch wenn der Vermieter die Miete verdreifacht, stirbt das Museum. Ein digitaler Wissensgraph wird niemals delogiert.',
    },
    whatWeLearned: {
      es: 'Que la nostalgia pop es divertida durante 15 minutos, pero solo el código abierto, la ciencia real y la permanencia digital sobreviven a las crisis económicas.',
      en: 'Pop nostalgia is fun for 15 minutes, but only open code, real science, and digital permanence outlast economic cycles.',
      de: 'Pop-Nostalgie unterhält für 15 Minuten, doch nur offener Code, echte Wissenschaft und digitale Unabhängigkeit überdauern Krisen.',
    },
    keyQuote: {
      es: '«Amamos tanto la pizza que llenamos las paredes de muñecos de plástico, hasta que el alquiler nos devoró.»',
      en: '“We loved pizza so deeply we covered our walls in toys, until commercial rent ate us alive.”',
      de: '„Wir liebten Pizza so sehr, dass wir die Wände mit Spielzeug füllten, bis uns die Miete auffraß.“',
    },
    officialUrl: 'https://pizzabrain.org',
  },
  {
    id: 'deutsches-currywurst-museum',
    name: 'Deutsches Currywurst Museum (Berlin)',
    dish: {
      es: 'Currywurst Berlinesa (Salsa Chillup & Salchicha al Vapor)',
      en: 'Berlin Currywurst (Chillup Sauce & Steamed Pork Sausage)',
      de: 'Berliner Currywurst (Chillup-Sauce & gebrühte Wurst)',
    },
    originLocation: 'Berlin (Mitte), Germany',
    format: 'physical_museum',
    formatLabel: {
      es: 'Museo Comercial Pop Interactivo (Extinto)',
      en: 'Commercial Pop-Interactive Museum (Defunct)',
      de: 'Kommerzielles Pop-Museum (Dauerhaft geschlossen)',
    },
    status: 'defunct',
    statusLabel: { es: 'Cerrado en 2018 (Operó 2009–2018)', en: 'Closed in 2018 (Operated 2009–2018)', de: 'Geschlossen 2018 (2009–2018)' },
    foundedYear: '2009',
    authorityScore: 55,
    metrics: {
      scientificRigor: 40,
      digitalEngineering: 35,
      archivalFactChecking: 70,
      kitschLevel: 92,
      survivabilityIndex: 0,
    },
    keyStrengths: {
      es: [
        'Registro detallado de la patente de Herta Heuwer (4 de septiembre de 1949 en Charlottenburg, salsa Chillup)',
        'Estaciones aromáticas interactivas para oler curry, comino y pimentón',
        'El icónico «Wurstsofa» (sofá gigante en forma de salchicha con chorros de kétchup de tela)',
      ],
      en: [
        'Detailed documentation of Herta Heuwer’s 1949 patent in Charlottenburg for Chillup sauce',
        'Interactive spice sniffing stations for curry powder, cumin, paprika, and cloves',
        'The infamous “Wurstsofa” (giant curved sausage sofa with plush fabric ketchup squirts)',
      ],
      de: [
        'Detaillierte Dokumentation des Patents von Herta Heuwer (4. September 1949, Charlottenburg, Chillup-Sauce)',
        'Interaktive Riechstationen für Curry, Kreuzkümmel und Gewürze',
        'Das berüchtigte Wurstsofa (überdimensionales Schaumstoff-Sofa mit Plüsch-Ketchup)',
      ],
    },
    keyWeaknesses: {
      es: [
        'Costaba 11€ la entrada por oler tres frascos y sentarse en un sofá de gomaespuma',
        'Cero desarrollo técnico sobre emulsión cárnica o cinéticas de curado',
        'Cerró sus puertas para siempre en diciembre de 2018 al agotarse el turismo de masas',
      ],
      en: [
        'Charged €11 entrance just to sniff three plastic jars and sit on synthetic foam',
        'Zero culinary physics regarding meat emulsion stability or Maillard browning kinetics',
        'Permanently shut down in December 2018 when tourist novelty wore off',
      ],
      de: [
        'Verlangte 11 Euro Eintritt, um an Gewürzdosen zu schnuppern und auf Schaumstoff zu sitzen',
        'Keinerlei lebensmittelchemische Vertiefung zu Fleischemulsion oder Brühprozessen',
        'Im Dezember 2018 für immer geschlossen, als der Touristenhype abflachte',
      ],
    },
    spicyVerdict: {
      es: 'El cenit y la caída de la trampa turística alimentaria. Cobrar una fortuna por sacarse una foto en un sofá con kétchup de peluche no es cultura gastronómica: es una atracción de feria con fecha de caducidad.',
      en: 'The rise and fall of the novelty food trap. Charging €11 for a selfie on a faux-ketchup foam couch is not culinary culture; it’s a carnival ride with an expiration date.',
      de: 'Aufstieg und Fall der Food-Touristenfalle. 11 Euro für ein Selfie auf einem Plüsch-Ketchup-Sofa ist keine Esskultur, sondern ein Jahrmarktstand mit Verfallsdatum.',
    },
    whatWeLearned: {
      es: 'Que si tu proyecto culinario se reduce a fotos para Instagram y merchandising de gomaespuma, el día que suba el alquiler nadie vendrá a rescatarte.',
      en: 'If your culinary project is reduced to Instagram photo ops and foam gimmicks, no one will mourn when the lease expires.',
      de: 'Wenn ein Food-Projekt nur aus Instagram-Kulissen und Schaumstoff-Gags besteht, rettet es niemand vor der Schließung.',
    },
    keyQuote: {
      es: '«Una salchicha troceada con kétchup y polvo de curry puede cambiar la historia de Berlín, pero no justifica 11€ por entrar a una habitación.»',
      en: '“A chopped sausage with ketchup and curry powder can define Berlin, but it doesn’t justify €11 to enter a rented room.”',
      de: '„Eine Currywurst kann Berliner Geschichte schreiben, rechtfertigt aber keine 11 Euro Eintritt in einen Mietraum.“',
    },
  },
  {
    id: 'national-mustard-museum',
    name: 'National Mustard Museum (Wisconsin)',
    dish: {
      es: 'Mostaza en Todas sus Variedades (Dijon, Antigua, Grano)',
      en: 'Prepared Mustard & Condiment Heritage',
      de: 'Senf-Kultur & Würzpasten-Geschichte',
    },
    originLocation: 'Middleton (Wisconsin), USA',
    format: 'physical_museum',
    formatLabel: {
      es: 'Colección Monográfica de Tarros & Tienda de Especialidad',
      en: 'Monographic Jar Archive & Specialty Curator',
      de: 'Monographische Senftopf-Sammlung & Fachgeschäft',
    },
    status: 'active',
    statusLabel: { es: 'Abierto al Público (Desde 1986)', en: 'Open to Public (Since 1986)', de: 'Geöffnet (Seit 1986)' },
    foundedYear: '1986',
    authorityScore: 74,
    metrics: {
      scientificRigor: 60,
      digitalEngineering: 48,
      archivalFactChecking: 85,
      kitschLevel: 45,
      survivabilityIndex: 82,
    },
    keyStrengths: {
      es: [
        'Más de 6.000 tarros de mostaza procedentes de más de 70 países recopilados por Barry Levenson',
        'Explicación botánica de las semillas de Brassica (negra, marrón y blanca) y la activación de la mirosinasa',
        'Concurso anual Worldwide Mustard Competition que evalúa catas a ciegas',
      ],
      en: [
        'Over 6,000 jars of prepared mustards from 70+ nations curated by Barry Levenson',
        'Botanical breakdown of Brassica seeds (black, brown, white) and myrosinase enzyme chemistry',
        'Hosts the annual Worldwide Mustard Competition with blind professional jury tastings',
      ],
      de: [
        'Über 6.000 Senfgläser aus mehr als 70 Ländern, zusammengetragen von Barry Levenson',
        'Botanische Erklärung der Brassica-Saaten und der enzymatischen Myrosinase-Aktivierung',
        'Ausrichter der jährlichen Worldwide Mustard Competition mit professionellen Blindverkostungen',
      ],
    },
    keyWeaknesses: {
      es: [
        'Funciona en gran medida como una tienda de regalos financiada con la venta de tarros gourmet',
        'Su catálogo digital no es consultable como API ni ofrece herramientas de cálculo de acidez',
      ],
      en: [
        'Essentially operates as an eccentric retail gift store supported by specialty condiment sales',
        'Digital archive lacks API query endpoints or dynamic acid-to-seed ratio calculators',
      ],
      de: [
        'Fungiert im Kern als origineller Delikatessenladen mit angeschlossenem Gläsermuseum',
        'Keine moderne API-Schnittstelle oder interaktive Säure-Rezeptur-Berechnung',
      ],
    },
    spicyVerdict: {
      es: 'Una genialidad de la excentricidad del Medio Oeste estadounidense. Respetamos a cualquiera que gaste 40 años de su vida reuniendo 6.000 botes de mostaza. Pero su web sigue vendiendo frascos por catálogo en lugar de digitalizar la enzimología culinaria.',
      en: 'A delightfully eccentric slice of Midwestern Americana. We respect anyone who spends 40 years gathering 6,000 jars of mustard. But their website is an e-commerce storefront, not an interactive enzyme laboratory.',
      de: 'Eine herrlich exzentrische Perle aus dem Mittleren Westen der USA. 6.000 Senfgläser in 40 Jahren verdienen Respekt. Doch online ist es primär ein Webshop statt eines interaktiven Enzym-Labors.',
    },
    whatWeLearned: {
      es: 'Que los condimentos monográficos generan tribus de seguidores leales, pero los archivos físicos de frascos cerrados envejecen si no se liberan sus datos al mundo.',
      en: 'Monographic condiments cultivate fierce loyalty, but closed jars on shelves grow stale without open data.',
      de: 'Mono-Würzmittel schaffen treue Fangemeinden, doch geschlossene Gläser im Regal verstauben ohne offene Daten.',
    },
    keyQuote: {
      es: '«La mostaza no es solo para el perrito caliente: es el choque químico entre la sinigrina y la mirosinasa el que despierta la nariz.»',
      en: '“Mustard is not just for hot dogs: it is the biochemical burst between sinigrin and myrosinase that clears your sinuses.”',
      de: '„Senf ist nicht nur für die Wurst: Es ist der biochemische Stoß zwischen Sinigrin und Myrosinase, der die Nase befreit.“',
    },
    officialUrl: 'https://mustardmuseum.com',
  },
  {
    id: 'golden-spurtle-porridge',
    name: 'The Golden Spurtle (World Porridge Championship)',
    dish: {
      es: 'Gachas de Avena Escocesas (Tradicional Oats, Water, Salt)',
      en: 'Traditional Scottish Porridge (Oatmeal, Water, Salt)',
      de: 'Traditioneller schottischer Porridge (Hafer, Wasser, Salz)',
    },
    originLocation: 'Carrbridge (Highlands), Scotland',
    format: 'heritage_championship',
    formatLabel: {
      es: 'Campeonato Mundial de Patrimonio & Liga de la Cuchara de Madera',
      en: 'World Heritage League & Wood Spurtle Championship',
      de: 'Weltmeisterschaft & Liga des hölzernen Spurtle-Rührers',
    },
    status: 'active',
    statusLabel: { es: 'Campeonato Anual Activo (Desde 1994)', en: 'Active Annual Championship (Since 1994)', de: 'Aktiver jährlicher Wettbewerb (Seit 1994)' },
    foundedYear: '1994',
    authorityScore: 73,
    metrics: {
      scientificRigor: 65,
      digitalEngineering: 30,
      archivalFactChecking: 90,
      kitschLevel: 20,
      survivabilityIndex: 90,
    },
    keyStrengths: {
      es: [
        'Regla canónica innegociable: solo tres ingredientes (harina de avena gruesa escocesa, agua y sal)',
        'Obligación de remover exclusivamente con el spurtle (palo tradicional de madera escocés)',
        'Comunidad global leal de chefs de Japón, Suecia, EE.UU. y el Reino Unido compitiendo por la espátula de plata',
      ],
      en: [
        'Non-negotiable purist canon: exactly three ingredients permitted (coarse pinhead oatmeal, water, and salt)',
        'Mandatory stirring with the ancestral wooden spurtle rod to prevent starch clumping',
        'Fierce global loyalty uniting competitors from Japan, Scandinavia, the US, and Scotland',
      ],
      de: [
        'Kompromisslose Puristen-Regel: exakt drei Zutaten (schottischer Hafer, Wasser und Salz)',
        'Pflicht zum Umrühren mit dem traditionellen hölzernen Spurtle-Stab gegen Verklumpen',
        'Treu ergebene weltweite Fangemeinde von Schottland über Skandinavien bis Japan',
      ],
    },
    keyWeaknesses: {
      es: [
        'Presencia web testimonial: apenas un blog de WordPress con anuncios locales de gaitas y resultados en texto plano',
        'Cero investigación digital sobre almidón beta-glucano ni índices de viscosidad en tiempo real',
      ],
      en: [
        'Minimalist WordPress blog with pipe-band announcements and PDF competition entry forms',
        'Zero digital tooling exploring oat beta-glucan solubility or thermodynamic simmering graphs',
      ],
      de: [
        'Minimalistischer Blog mit Dudelsack-Terminen und PDF-Anmeldeformularen',
        'Keine digitalen Werkzeuge zu Beta-Glucan-Viskosität oder Siedekurven',
      ],
    },
    spicyVerdict: {
      es: 'Pureza británica en estado puro. Solo tres ingredientes removidos con un palo de madera en un pueblo de las Highlands. Si le añades azúcar o canela te expulsan del certamen. Nos encanta su tozudez, pero su web parece hecha por un gaitero en 2003.',
      en: 'British culinary purism at its zenith. Three ingredients stirred with a stick in a Highland village. Add a grain of sugar and you are disqualified. We revere their stubbornness, but their website looks like it was uploaded over dial-up in 2003.',
      de: 'Schottischer Purismus in Reinkultur. Drei Zutaten, gerührt mit einem Holzstab in den Highlands. Wer Zucker zugibt, fliegt raus. Wir lieben diesen Starrsinn, doch die Website wirkt wie 2003 mit Modem hochgeladen.',
    },
    whatWeLearned: {
      es: 'Que los platos más humildes y austeros despiertan las lealtades más feroces; la simplicidad de ingredientes exige la máxima maestría térmica.',
      en: 'The most humble, austere dishes cultivate the most fierce loyalty; minimal ingredients demand maximum thermal mastery.',
      de: 'Die bescheidensten Gerichte wecken die leidenschaftlichste Treue; minimale Zutaten verlangen maximale thermische Beherrschung.',
    },
    keyQuote: {
      es: '«Si necesitas más de sal, agua y avena para hacer gachas, es que no entiendes lo que el fuego hace con el grano.»',
      en: '“If you need more than salt, water, and oats to make porridge, you do not understand what fire does to grain.”',
      de: '„Wer mehr als Salz, Wasser und Hafer braucht, versteht nicht, was Feuer mit Getreide anstellt.“',
    },
    officialUrl: 'https://goldenspurtle.com',
  },
];

export const SEVEN_DEADLY_SINS: DeadlySin[] = [
  {
    number: 1,
    title: {
      es: 'El Monólogo de Infancia de 3.000 Palabras',
      en: 'The 3,000-Word Childhood Memoir',
      de: 'Die 3.000-Wörter-Kindheitserzählung',
    },
    crime: {
      es: 'Obligar al usuario a leer los recuerdos del verano lluvioso de 2004 en casa de la abuela antes de revelar cuántos gramos de patata se necesitan.',
      en: 'Forcing the cook to scroll past memories of a rainy summer in 2004 at grandma’s cabin before revealing how many grams of potatoes to peel.',
      de: 'Die Nutzer zwingen, Kindheitserinnerungen an den verregneten Sommer 2004 bei der Großmutter zu lesen, bevor verraten wird, wie viel Gramm Kartoffeln man braucht.',
    },
    spicyRoast: {
      es: 'No nos importa tu terapia familiar. Tenemos la sartén al fuego y el aceite echando humo. Danos el ratio de huevo y cállate.',
      en: 'We don’t care about your family therapy. The skillet is on the stove and the olive oil is shimmering. Give us the egg-to-tuber ratio and step aside.',
      de: 'Niemand braucht Familientherapie am Herd. Das Öl in der Pfanne raucht bereits. Gib uns das Verhältnis von Ei zu Kartoffel und fertig.',
    },
    ourCountermeasure: {
      es: 'En tortilladepatatas.org, la receta interactiva y los gramos calculados están en el primer pliegue de la pantalla con cero historias de relleno.',
      en: 'On tortilladepatatas.org, interactive parametric ratios are displayed instantly above the fold with zero filler paragraphs.',
      de: 'Auf tortilladepatatas.org stehen die exakten Mengenangaben sofort sichtbar ganz oben – ohne Fülltexte.',
    },
  },
  {
    number: 2,
    title: {
      es: 'El Apocalipsis de Banners y Vídeos Autoejecutables',
      en: 'The Auto-Playing Ad Banner Apocalypse',
      de: 'Die Auto-Play-Werbe-Hölle',
    },
    crime: {
      es: 'Cargar 14 scripts de publicidad, un vídeo flotante que te sigue la pantalla y 3 popups de newsletter que hacen despegar los ventiladores del portátil.',
      en: 'Injecting 14 ad-tracking scripts, a sticky picture-in-picture video that blocks mobile buttons, and 3 newsletter popups.',
      de: '14 Werbetracker laden, ein schwebendes Werbevideo einblenden und 3 Newsletter-Popups über die Zutatenliste legen.',
    },
    spicyRoast: {
      es: 'Si tu página necesita 8 megabytes de anuncios de seguros de coche para decirme cómo batir 6 huevos, tu modelo de negocio es un basurero.',
      en: 'If your web page requires 8 megabytes of car insurance banners to explain how to beat 6 eggs, your business model is a landfill.',
      de: 'Wenn eine Seite 8 Megabyte Autoversicherungs-Banner braucht, um das Schlagen von 6 Eiern zu erklären, ist das Geschäftsmodell kaputt.',
    },
    ourCountermeasure: {
      es: 'Cero publicidad, cero banners invasivos, cero muros de cookies. Rendimiento puro y carga instantánea.',
      en: 'Zero ads, zero intrusive popups, zero cookie walls. Clean performance and near-instant cold loads.',
      de: 'Null Werbung, keine störenden Popups, keine Cookie-Wände. Reine Ladeleistung und Respekt vor der Privatsphäre.',
    },
  },
  {
    number: 3,
    title: {
      es: 'La Trampa del Kitsch de Cartón Piedra',
      en: 'The Theme-Park Fiberglass Kitsch Trap',
      de: 'Die Plastik- & Kitschfalle',
    },
    crime: {
      es: 'Creer que un museo gastronómico consiste en figuras gigantes de plástico, llaveros de gomaespuma y un sofá con forma de salchicha.',
      en: 'Believing that a culinary museum is defined by giant fiberglass mascots, foam plush toys, and hot-dog couches.',
      de: 'Glauben, ein Food-Museum bestehe aus riesigen Glasfaser-Figuren, Plüsch-Schlüsselanhängern und Würstchen-Sofas.',
    },
    spicyRoast: {
      es: 'El Currywurst Museum cobraba 11€ por sentarse en un sofá de kétchup de tela. Quebró. El conocimiento real no se disfraza de parque infantil.',
      en: 'The Currywurst Museum charged €11 to sit on a plush ketchup sofa. It went bankrupt. Real culinary science doesn’t dress up as a toddler playpen.',
      de: 'Das Currywurst Museum verlangte 11 Euro für ein Foto auf dem Ketchup-Sofa und ging pleite. Echte Kulinarik braucht kein Bällebad.',
    },
    ourCountermeasure: {
      es: 'Estética de Cuaderno de Cocina moderna: texturas de pergamino, vectoriales puros, tipografía editorial y diagramas térmicos precisos.',
      en: 'Skeuomorphic Modernist Kitchen Notebook aesthetic: parchment cards, pure procedural vectors, and rigorous thermal charts.',
      de: 'Moderne Küchennotizbuch-Ästhetik: Pergament-Optik, reine Vektoren, anspruchsvolle Typografie und exakte Diagramme.',
    },
  },
  {
    number: 4,
    title: {
      es: 'La Muerte por Alquiler Inmobiliario',
      en: 'Extinction by Commercial Rent Spike',
      de: 'Der Tod durch Gewerbemieten',
    },
    crime: {
      es: 'Gastar todo el presupuesto en un local físico en un barrio gentrificado y cerrar para siempre en 5 años (caso Pizza Brain en 2024).',
      en: 'Blowing the entire capital budget on a hip leasehold in a gentrified neighborhood, only to shutter when the landlord triples the rent.',
      de: 'Das gesamte Kapital in teure Hipster-Mietverträge stecken und nach Mieterhöhungen für immer dichtmachen müssen.',
    },
    spicyRoast: {
      es: 'Los ladrillos se derrumban y los caseros no tienen piedad gastronómica. Un sitio web de código abierto vive para siempre en el borde de la red.',
      en: 'Brick-and-mortar leases expire and landlords don’t care about your culinary passion. An open-web knowledge graph lives forever on the edge.',
      de: 'Mietverträge enden und Vermieter kennen keine kulinarische Gnade. Ein Open-Web-Wissensgraph lebt für immer auf dem Edge-Netzwerk.',
    },
    ourCountermeasure: {
      es: 'Arquitectura serverless estática y edge-first distribuida. Cero alquileres abusivos, máxima resiliencia durante las próximas décadas.',
      en: 'Distributed edge-first static architecture. Zero real-estate overheads, permanent multi-decade resilience.',
      de: 'Verteilte Edge-First-Architektur. Keine Mietkosten, maximale Beständigkeit über Jahrzehnte hinweg.',
    },
  },
  {
    number: 5,
    title: {
      es: 'La Vaguedad Térmica Criminal («Sal al Gusto»)',
      en: 'The Vague Thermal Crime (“Salt to Taste”)',
      de: 'Das Verbrechen der vagen Temperaturangaben',
    },
    crime: {
      es: 'Decir «cocina a fuego medio hasta que esté hecha» o «echa sal a ojo», provocando tortillas crudas infectadas o secas como corcho.',
      en: 'Instructing users to “cook over medium heat until done” or “add salt to taste”, causing either liquid Salmonella sludge or dry cardboard.',
      de: 'Anweisungen wie „bei mittlerer Hitze garen, bis es fertig ist“, die entweder rohe Salmonellenbrühe oder trockene Pappe erzeugen.',
    },
    spicyRoast: {
      es: '¿Qué es fuego medio? ¿El de tu vitrocerámica de inducción barata o el del quemador industrial de gas? La cocina es termodinámica, no astrología.',
      en: 'What is “medium heat”? A cheap portable induction cooktop or a 15kW restaurant burner? Cooking is thermodynamics, not horoscope reading.',
      de: 'Was heißt „mittlere Hitze“? Ein schwaches Camping-Induktionsfeld oder ein 15-kW-Gasbrenner? Kochen ist Thermodynamik, kein Horoskop.',
    },
    ourCountermeasure: {
      es: 'Protocolo bactericida auditable: 70°C por 2 minutos para esterilización total, 63°C por 20 segundos para coagulación melosa y 4 horas de límite ambiental.',
      en: 'Auditable safety canon: 70°C for 2 min (sterilization), 63°C for 20s (creamy custard), and strict 4-hour ambient shelf-life limit.',
      de: 'Eindeutiger mikrobiologischer Kanon: 70°C für 2 Min (Sterilisation), 63°C für 20 Sek (Cremigkeit) und 4 Std Maximalzeit bei Raumtemperatur.',
    },
  },
  {
    number: 6,
    title: {
      es: 'La Falsificación de Leyendas como Hecho Histórico',
      en: 'Parroting Military Myths as Archival Fact',
      de: 'Kriegsmythen als historische Fakten verkaufen',
    },
    crime: {
      es: 'Repetir la fábula del general carlista Zumalacárregui o la granjera navarra de 1835 como si fuera el origen real documentado.',
      en: 'Regurgitating the 1835 legend of Carlist General Zumalacárregui and the anonymous Navarrese farmwife as verified history.',
      de: 'Die Anekdote von General Zumalacárregui und der namenlosen Bäuerin von 1835 als belegte Entstehungsgeschichte nacherzählen.',
    },
    spicyRoast: {
      es: 'En 2008 el CSIC demostró que el documento más antiguo es de 1798 en Villanueva de la Serena. Seguir contando la fábula carlista es pereza intelectual.',
      en: 'In 2008, CSIC scientists unearthed the 1798 manuscript in Villanueva de la Serena. Continuing to quote the 1835 general is intellectual laziness.',
      de: '2008 fand der CSIC die Urkunde von 1798 in Villanueva de la Serena. Die Legende von 1835 weiterzuerzählen ist schlichte Faulheit.',
    },
    ourCountermeasure: {
      es: 'Distinción explícita en cada ficha: HECHO HISTÓRICO contrastado frente a LEYENDA y OPINIÓN CULINARIA.',
      en: 'Rigorous labeling on every entity: DOCUMENTED FACT vs FOLKLORIC LEGEND vs CULINARY OPINION.',
      de: 'Glasklare Kennzeichnung jeder Information: DOKUMENTIERTER FAKT vs VOLKSLÜGE vs PERSÖNLICHE MEINUNG.',
    },
  },
  {
    number: 7,
    title: {
      es: 'El Jardín Vallado y la Mutilación de Datos',
      en: 'The Walled Garden & Data Hoarding',
      de: 'Der eingezäunte Garten & Daten-Monopol',
    },
    crime: {
      es: 'Cobrar suscripciones de 60€/año para leer una receta básica o guardar 30 años de catas en libretas de papel sin publicarlas jamás en la web.',
      en: 'Charging €60/year paywalls for elementary recipes or hoarding decades of tasting scores in locked paper notebooks.',
      de: '60 Euro Jahresgebühr für Grundrezepte verlangen oder jahrzehntelange Verkostungsnotizen in privaten Notizbüchern verstauben lassen.',
    },
    spicyRoast: {
      es: 'La gastronomía popular pertenece al dominio público. Secuestrar proporciones culinarias detrás de muros de pago es una afrenta cultural.',
      en: 'Cultural food heritage belongs to humanity. Locking potato and egg ratios behind a credit-card paywall is an insult to our shared culture.',
      de: 'Kulturgut gehört der Allgemeinheit. Rezepte für Kartoffeln und Eier hinter Bezahlschranken zu sperren, ist lächerlich.',
    },
    ourCountermeasure: {
      es: 'Acceso 100% libre, código auditable, estado URL compartible y datos abiertos para investigadores culinarios de todo el mundo.',
      en: '100% open access, auditable code, shareable URL state, and open data for culinary researchers worldwide.',
      de: '100% freier Zugang, prüfbarer Code, teilbare URL-Zustände und offene Daten für die weltweite Forschung.',
    },
  },
];

export const MARKETING_PILLARS: MarketingPillar[] = [
  {
    id: 'open-tortilla-protocol',
    title: {
      es: 'El Protocolo Abierto de la Tortilla (Open Tortilla Standard)',
      en: 'The Open Tortilla Protocol (Standardized Recipe DNA)',
      de: 'Das Offene Tortilla-Protokoll (Standardisierte Rezept-DNA)',
    },
    subtitle: {
      es: 'Especificación JSON-LD y codificación URL para cartas digitales y restaurantes',
      en: 'JSON-LD specification and URL state parameters for digital menus & hospitality',
      de: 'JSON-LD Spezifikation und URL-Parameter für digitale Speisekarten',
    },
    description: {
      es: 'Cualquier bar, restaurante o crítico gastronómico del mundo puede enlazar directamente al cálculo de su tortilla, generar insignias SVG vectoriales y certificar la temperatura de su cuajado.',
      en: 'Any bar, restaurant, or food journalist worldwide can link directly to their parametric recipe configuration, generate procedural SVG badges, and verify thermal coagulation.',
      de: 'Jede Bar, jedes Restaurant und jeder Food-Journalist kann direkt auf die Rezeptur verlinken, SVG-Badges einbetten und die Garstufe belegen.',
    },
    actionLabel: { es: 'Explorar Creador DNA', en: 'Explore DNA Builder', de: 'DNA-Rechner öffnen' },
    href: '/builder',
  },
  {
    id: 'unesco-cultural-heritage-dossier',
    title: {
      es: 'Candidatura UNESCO: Patrimonio Cultural Inmaterial',
      en: 'UNESCO Intangible Cultural Heritage Dossier',
      de: 'UNESCO-Kulturerbe-Dossier für die Tortilla Española',
    },
    subtitle: {
      es: 'La base documental y científica que faltaba para la protección internacional',
      en: 'The scientific and historical documentation required for global cultural recognition',
      de: 'Die wissenschaftliche und historische Grundlage für internationale Anerkennung',
    },
    description: {
      es: 'Así como Nápoles codificó la pizza con la AVPN en 2017, España necesita presentar un expediente riguroso, no un puñado de eslóganes turísticos. tortilladepatatas.org proporciona el grafo de conocimiento definitivo.',
      en: 'Just as Naples codified pizza with the AVPN for UNESCO in 2017, Spain needs an unassailable scientific and historical dossier, not tourism slogans. tortilladepatatas.org provides that knowledge graph.',
      de: 'So wie Neapel 2017 die Pizza als UNESCO-Kulturerbe etablierte, braucht Spanien ein unangreifbares Dossier statt simpler Werbeslogans. tortilladepatatas.org liefert diesen Wissensgraphen.',
    },
    actionLabel: { es: 'Ver Verificador Histórico', en: 'View Historical Verifier', de: 'Quellenprüfung ansehen' },
    href: '/autenticidad',
  },
  {
    id: 'anti-slop-manifesto',
    title: {
      es: 'El Fin de las Granjas de Contenido SEO Basura',
      en: 'The Death of Generic Recipe Ad-Farms',
      de: 'Das Ende generischer Rezept-Werbefarmen',
    },
    subtitle: {
      es: 'Por qué los motores de búsqueda y la IA recompensan la autoridad monográfica profunda',
      en: 'Why search engines and next-generation AI reward hyper-vertical domain depth',
      de: 'Warum Suchmaschinen und KI tiefes monotematisches Fachwissen belohnen',
    },
    description: {
      es: 'Los sitios web que intentan abarcar 40.000 recetas copiadas con textos de relleno están siendo penalizados. El futuro de internet pertenece a las plataformas monográficas ultra-especializadas que resuelven una obsesión humana con perfección matemática.',
      en: 'Websites attempting to host 40,000 scraped recipes with keyword stuffing are dying. The future of the culinary web belongs to ultra-specialized monographic authorities that solve a human obsession with mathematical perfection.',
      de: 'Seiten mit 40.000 generischen Rezepten und Keyword-Spam verlieren an Bedeutung. Die Zukunft gehört hochspezialisierten Monokulturen, die eine Leidenschaft mit mathematischer Präzision lösen.',
    },
    actionLabel: { es: 'Leer la Ciencia Culinaria', en: 'Read Culinary Science', de: 'Zur Wissenschaft' },
    href: '/science',
  },
];
