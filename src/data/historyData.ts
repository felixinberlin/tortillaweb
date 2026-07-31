export interface TimelineEvent {
  year: string;
  title: string;
  location?: string;
  description: string;
  badge?: string;
  tagType?: 'origin' | 'war' | 'survival' | 'modern' | 'safety';
}

export interface HistoryChapter {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  content: string[];
  bulletPoints?: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  callout?: {
    type: 'note' | 'safety' | 'quote';
    text: string;
  };
}

export interface HistoryPageContent {
  badge: string;
  title: string;
  subtitle: string;
  chefNote: string;
  timelineTitle: string;
  timelineSubtitle: string;
  timelineEvents: TimelineEvent[];
  chaptersTitle: string;
  chaptersSubtitle: string;
  chapters: HistoryChapter[];
}

export const historyData: Record<string, HistoryPageContent> = {
  es: {
    badge: "Crónica Histórica & Cronología Gastronómica",
    title: "La Tortilla de Patatas: Crónica del Ingenio y la Identidad",
    subtitle: "Investigación histórica integral: desde los orígenes del Siglo de las Luces y la cocina de subsistencia hasta los retos de la seguridad alimentaria y la era digital.",
    chefNote: "La historia de la tortilla es la crónica del ingenio popular español. Desde 'estirar' huevos con patatas en 1817 hasta usar corteza de naranja en la posguerra, este plato personifica la supervivencia. Para disfrutarlo con total seguridad, la pasteurización exige alcanzar **70°C durante 2 minutos** o **63°C durante 20 segundos**, evitando mantener la tortilla más de **4 horas** a temperatura ambiente.",
    timelineTitle: "Línea del Tiempo & Hitos Históricos",
    timelineSubtitle: "Los momentos clave que transformaron un plato de supervivencia en el icono de España.",
    timelineEvents: [
      {
        year: "1767 - 1772",
        title: "Primeras Menciones Ilustradas",
        location: "España",
        description: "Joseph Valcárcel (1767) y Roig (1772) registran las primigenias menciones que vinculan la patata americana con preparaciones de huevo batido en la cocina popular.",
        badge: "Siglo de las Luces",
        tagType: "origin"
      },
      {
        year: "1798",
        title: "Origen Geográfico Documentado",
        location: "Villanueva de la Serena (Badajoz)",
        description: "Documentos de Extremadura detallan cómo el ingenio local creó la fórmula de patata y huevo como respuesta nutritiva a la escasez agrícola.",
        badge: "Hito Fundacional",
        tagType: "origin"
      },
      {
        year: "1810 - 1812",
        title: "El Sitio de Cádiz y la 'Tortilla Francesa'",
        location: "Cádiz",
        description: "Durante el bloqueo napoleónico, la falta de patatas obligó a cocinar el huevo solo. Con humor gaditano, la bautizaron 'tortilla francesa' para diferenciarla de la 'española'.",
        badge: "Conflicto & Lenguaje",
        tagType: "war"
      },
      {
        year: "1817",
        title: "El Memorial de Navarra",
        location: "Navarra",
        description: "Documento oficial presentado a las Cortes que describe cómo los campesinos 'estiraban' los escasos huevos mezclándolos con patatas para alimentar a familias numerosas.",
        badge: "Respuesta a la Penuria",
        tagType: "survival"
      },
      {
        year: "1835",
        title: "Leyenda del General Zumalacárregui",
        location: "Guerras Carlistas",
        description: "La tradición narra que una campesina anónima improvisó el plato para el general Carlista para nutrir a sus tropas de forma rápida, económica y calórica.",
        badge: "Mito Gastronómico",
        tagType: "war"
      },
      {
        year: "1940s",
        title: "La Tortilla de Naranja de la Posguerra",
        location: "España de la Subsistencia",
        description: "En tiempos de racionamiento extremo, la parte blanca de la corteza de naranja (albedo) macerada sustituía a la patata, y harina con agua al huevo.",
        badge: "Ingenio Extremo",
        tagType: "survival"
      },
      {
        year: "1991 - 2025",
        title: "Alertas Sanitarias y Control Epidemiológico",
        location: "Valencia, Madrid, Galia",
        description: "Brotes históricos como Casa Dani (2023) y Trasan Fest (2025) impulsan protocolos de seguridad alimentaria: **70°C durante 2 minutos** y ovoproductos.",
        badge: "Seguridad Alimentaria",
        tagType: "safety"
      },
      {
        year: "2024 - 2025+",
        title: "Revolución Digital y Versiones Veganas",
        location: "España Digital",
        description: "El delivery alcanza 8.000M€. Surgen versiones veganas con harina de garbanzo y almidón de tapioca para alérgicos e intolerantes.",
        badge: "Era Contemporánea",
        tagType: "modern"
      }
    ],
    chaptersTitle: "Investigación Histórica y Cronológica Completa",
    chaptersSubtitle: "Un análisis detallado estructurado en 8 capítulos de investigación.",
    chapters: [
      {
        id: "intro",
        number: "01",
        title: "Introducción: El Icono de la Gastronomía Popular",
        content: [
          "La tortilla de patatas no es simplemente un plato en el recetario español; es un pilar de identidad, un fenómeno social y el máximo exponente del ingenio ante la escasez. Su importancia trasciende el ámbito doméstico para erigirse como un motor fundamental del sector de la restauración profesional en España.",
          "Desde las barras más humildes hasta las propuestas de alta cocina, este plato personifica la capacidad de síntesis cultural de la península. La presente crónica se propone como una investigación histórica y técnica rigurosa que reconcilia los hallazgos documentales del Siglo de las Luces con los desafíos de la seguridad alimentaria y la revolución digital contemporánea."
        ],
        bulletPoints: [
          "Alto valor identitario: Máximo referente de la gastronomía española.",
          "Amplia aceptación popular: Presente en todos los estratos socioeconómicos.",
          "Versatilidad y resiliencia: Adaptación desde el formato casero hasta la quinta gama industrial.",
          "Conexión emocional: Asociada a la memoria colectiva y la cocina de confort."
        ]
      },
      {
        id: "siglo-18",
        number: "02",
        title: "Los Primeros Rastros: El Siglo XVIII y las Luces",
        content: [
          "La historiografía gastronómica ha evolucionado significativamente, desplazando las teorías que situaban el origen de la tortilla de patatas a mediados del siglo XIX. La evidencia documental nos obliga a retroceder al Siglo de las Luces, donde la patata comenzó a integrarse en la dieta popular no solo por su valor nutritivo, sino como una respuesta ilustrada al hambre.",
          "En 1767, Joseph Valcárcel registra las menciones primigenias que vinculan la patata americana con preparaciones de huevo batido. En 1772, las referencias de Roig confirman la consolidación de esta unión de ingredientes. Finalmente, en 1798 en Villanueva de la Serena (Badajoz), los registros extremeños detallan cómo el ingenio local dio con la fórmula exacta de huevo y patata que hoy es patrimonio nacional."
        ]
      },
      {
        id: "siglo-19",
        number: "03",
        title: "Consolidación y Guerras: El Siglo XIX",
        content: [
          "El siglo XIX fue el escenario donde la tortilla de patatas se forjó bajo el fuego de la necesidad y el conflicto bélico.",
          "El Memorial de Navarra (1817) es un documento esencial para comprender la vertiente social del plato. Describe la penuria de los campesinos navarros y cómo la tortilla permitía 'estirar' el escaso número de huevos mediante la abundancia de la patata, multiplicando las raciones para familias extensas.",
          "Por su parte, la leyenda del General Zumalacárregui durante las Guerras Carlistas narra que una campesina anónima creó el plato para el militar con lo poco que tenía en su despensa, popularizando la receta entre sus tropas por su densidad nutricional y bajo coste."
        ]
      },
      {
        id: "cadiz",
        number: "04",
        title: "El Curioso Caso de la 'Tortilla Francesa' y el Sitio de Cádiz",
        content: [
          "La terminología gastronómica española guarda una ironía histórica nacida del Asedio de Cádiz (1810-1812). Durante el bloqueo napoleónico, el desabastecimiento de alimentos en la ciudad gaditana fue extremo.",
          "La falta total de patatas impidió la elaboración de la tortilla habitual, obligando a los gaditanos a cocinar el huevo solo. Con un humor resiliente, bautizaron a esta versión despojada como 'tortilla francesa', diferenciándola de la 'española' que recuperaría su tubérculo una vez levantado el cerco militar."
        ]
      },
      {
        id: "subsistencia",
        number: "05",
        title: "La Tortilla de Supervivencia y el Ingenio Vegetal",
        content: [
          "La posguerra española marcó el cenit de la cocina de subsistencia. En tiempos de racionamiento severo, surgió la 'tortilla de patatas sin patatas ni huevo'. Para simular la textura del tubérculo, se utilizaba la parte blanca de la corteza de naranja macerada (albedo), mientras que el huevo se sustituía por una mezcla de harina y agua.",
          "Este espíritu de adaptación ha evolucionado hoy hacia el veganismo y las alternativas hipoalergénicas. El uso de la harina de garbanzo y el almidón de tapioca representa el nuevo ingenio popular, ofreciendo soluciones para alérgicos al huevo y celíacos sin perder la jugosidad tradicional."
        ]
      },
      {
        id: "seguridad",
        number: "06",
        title: "El Desafío Contemporáneo: Seguridad Alimentaria y Brotes",
        content: [
          "Hoy, la tortilla de patatas habita una dualidad entre el placer del 'poco cuajado' (preferido por el 53.9% de los españoles según datos del CIS) y la vigilancia epidemiológica de Salmonella Enteritidis.",
          "Para garantizar la inocuidad bactericida, las recomendaciones de salud pública exigen que el centro térmico alcance **70°C durante 2 minutos** (para una reducción $\\ge 5 \\text{ log}$) o **63°C durante 20 segundos**. Asimismo, no debe mantenerse la preparación a temperatura ambiente por más de **4 horas**."
        ],
        tableData: {
          headers: ["Año", "Ubicación / Evento", "Contexto e Impacto", "Agente Principal"],
          rows: [
            ["1991", "Valencia", "Brote histórico en hostelería con desenlace fatal", "S. Enteritidis"],
            ["2021", "Soria", "Afección grave en grupos vulnerables (UCI pediátrica)", "Salmonella spp."],
            ["2023", "Casa Dani (Madrid)", "Brote masivo con 101 afectados y 13 hospitalizaciones", "S. Enteritidis"],
            ["2024", "Barcelona", "Incidente en restaurante con ~30 personas afectadas", "Salmonella spp."],
            ["2025", "Trasan Fest (Galicia)", "Incidente crítico con >150 afectados y 41 hospitalizados", "S. Enteritidis"]
          ]
        },
        callout: {
          type: "safety",
          text: "Estándar Inocuo: Todo huevo fresco no pasteurizado que no alcance **70°C durante 2 minutos** o **63°C durante 20 segundos** entra en riesgo microbiológico si se mantiene entre 7°C y 48°C por más de **4 horas**."
        }
      },
      {
        id: "digital",
        number: "07",
        title: "Análisis Epidemiológico y Riesgo Térmico",
        content: [
          "La persistencia de Salmonella no solo depende del huevo, sino de la higiene de superficies y la formación de biofilms en tablas y utensilios (resistiendo hasta 7 días en biofilms de acero inoxidable).",
          "El huevo posee un pH casi neutro y una alta actividad de agua ($a_w > 0.94$), convirtiéndose en un caldo de cultivo ideal a temperaturas estivales (>35°C)."
        ],
        bulletPoints: [
          "Uso de ovoproductos pasteurizados: Obligatorio en restauración profesional para tortillas jugosas.",
          "Refrigeración estricta (<8°C): Requerida si no se consume de forma inmediata.",
          "Límite de exposición ambiental: Jamás superar las **4 hours** de reposo en barra o mesa."
        ]
      },
      {
        id: "conclusion",
        number: "08",
        title: "Conclusión: El Triunfo del Ingenio Popular",
        content: [
          "La historia de la tortilla de patatas es la crónica de un éxito adaptativo sin precedentes. Ha sabido transformarse de una receta de extrema necesidad en el siglo XIX a un producto que domina el mercado digital de 8.000 millones de euros en la actualidad.",
          "Desde la audacia de utilizar cortezas de naranja en la posguerra hasta la sofisticación técnica de las versiones veganas contemporáneas, la tortilla demuestra que el ingenio popular es inagotable. Este plato sigue siendo el símbolo más democrático, delicioso y resiliente de la cultura gastronómica."
        ],
        callout: {
          type: "quote",
          text: "La tortilla de patatas no pertenece a un rey ni a un gran chef; es la victoria colectiva del pueblo español frente al hambre y el tiempo."
        }
      }
    ]
  },
  en: {
    badge: "Historical Chronicle & Gastronomic Timeline",
    title: "Chronicle of the Spanish Potato Omelette",
    subtitle: "A comprehensive investigation: from Enlightenment origins and survival cuisine to modern food safety protocols and the 21st-century digital era.",
    chefNote: "The history of the tortilla is a testament to popular Spanish resourcefulness. From expanding egg volumes with potatoes in 1817 to using orange peel during post-war scarcity, it embodies survival. For maximum food safety, pasteurization standards mandate reaching **70°C for 2 minutes** or **63°C for 20 seconds**, and never leaving room temperature preparations for over **4 hours**.",
    timelineTitle: "Timeline & Historical Milestones",
    timelineSubtitle: "The key moments that shaped a survival recipe into Spain's national icon.",
    timelineEvents: [
      {
        year: "1767 - 1772",
        title: "First Enlightenment Citations",
        location: "Spain",
        description: "Joseph Valcárcel (1767) and Roig (1772) record the earliest documentary references linking potatoes with beaten egg preparations.",
        badge: "Enlightenment Era",
        tagType: "origin"
      },
      {
        year: "1798",
        title: "Documented Birthplace",
        location: "Villanueva de la Serena (Badajoz)",
        description: "Extremaduran historical archives detail how local ingenuity created the potato and egg formula as a nutritious answer to agricultural scarcity.",
        badge: "Foundational Milestone",
        tagType: "origin"
      },
      {
        year: "1810 - 1812",
        title: "Siege of Cádiz & 'French Omelette'",
        location: "Cádiz",
        description: "During the Napoleonic blockade, potato depletion forced citizens to cook plain egg omelettes, ironically naming them 'French omelettes'.",
        badge: "Conflict & Nomenclature",
        tagType: "war"
      },
      {
        year: "1817",
        title: "Navarra Memorial",
        location: "Navarra",
        description: "Official submission to the Cortes advocating potato omelettes to stretch scarce eggs and feed impoverished rural families.",
        badge: "Survival Solution",
        tagType: "survival"
      },
      {
        year: "1835",
        title: "General Zumalacárregui Legend",
        location: "Carlist Wars",
        description: "Tradition holds that an anonymous farmwoman created the dish for Carlist troops to provide a dense, affordable military ration.",
        badge: "Gastronomic Legend",
        tagType: "war"
      },
      {
        year: "1940s",
        title: "Post-War Orange Peel Omelette",
        location: "Post-War Spain",
        description: "In times of severe rationing, soaked orange peel albedo replaced potatoes, and flour water replaced eggs.",
        badge: "Peak Ingenuity",
        tagType: "survival"
      },
      {
        year: "1991 - 2025",
        title: "Public Health Outbreaks & Pasteurization",
        location: "Spain",
        description: "Outbreaks such as Casa Dani (2023) and Trasan Fest (2025) drive safety regulations: **70°C for 2 minutes** and liquid egg products.",
        badge: "Food Safety",
        tagType: "safety"
      },
      {
        year: "2024 - 2025+",
        title: "Digital Delivery & Vegan Innovations",
        location: "Contemporary Spain",
        description: "Online food delivery reaches €8 billion. Chickpea flour and tapioca starch enable egg-free, allergen-safe tortillas.",
        badge: "Digital Era",
        tagType: "modern"
      }
    ],
    chaptersTitle: "Full Historical & Chronological Investigation",
    chaptersSubtitle: "A detailed 8-chapter research breakdown.",
    chapters: [
      {
        id: "intro",
        number: "01",
        title: "Introduction: The Icon of Spanish Gastronomic Identity",
        content: [
          "The Spanish potato omelette (tortilla de patatas) is not merely a food product; it represents a fundamental pillar of culinary identity and social cohesion. Its presence is omnipresent, from humble neighborhood bars to haute-cuisine showcases.",
          "This chronicle presents a rigorous historical and technical investigation, reconciling 18th-century Enlightenment records with 21st-century food safety guidelines and digital convenience trends."
        ],
        bulletPoints: [
          "High Identity Value: Perceived as the ultimate reference point of Spanish cuisine.",
          "Broad Popular Acceptance: Enjoyed across all socio-economic groups.",
          "Versatility & Resilience: Adapted from rustic homes to industrial food solutions.",
          "Emotional Connection: Deeply rooted in collective cultural memory."
        ]
      },
      {
        id: "siglo-18",
        number: "02",
        title: "The 18th Century: Earliest Documentary Evidence",
        content: [
          "Gastronomic historiography has debunked 19th-century origin myths. Documentary evidence points back to the Enlightenment, where potatoes were integrated into popular diets to fight hunger.",
          "In 1767, Joseph Valcárcel recorded initial mentions of potato and beaten egg mixtures. By 1798 in Villanueva de la Serena (Extremadura), official archives confirmed the precise recipe used today."
        ]
      },
      {
        id: "siglo-19",
        number: "03",
        title: "The 19th Century: War, Hunger, and Military Rations",
        content: [
          "The 19th century forged the tortilla under war and famine.",
          "The 1817 Navarra Memorial highlighted its power to 'stretch' scarce eggs with potatoes, feeding entire families during severe economic distress.",
          "The Carlist War legend of General Zumalacárregui reinforced its status as an efficient military logistics ration."
        ]
      },
      {
        id: "cadiz",
        number: "04",
        title: "The Siege of Cádiz and the 'French Omelette'",
        content: [
          "During the Napoleonic blockade of Cádiz (1810-1812), severe potato shortages forced citizens to cook egg-only omelettes.",
          "Resilient local humor led them to name this plain version the 'French omelette' (tortilla francesa) to distinguish it from the potato-rich 'Spanish' original."
        ]
      },
      {
        id: "subsistencia",
        number: "05",
        title: "The Omelette of Necessity: Post-War Adaptations",
        content: [
          "During post-Civil War rationing, Spaniards invented the 'potato-less, egg-less omelette', using soaked orange peel albedo for potato texture and flour-water mixture for egg binder.",
          "Today, this spirit inspires vegan variations using chickpea flour and tapioca starch for allergen-safe, plant-based tortillas."
        ]
      },
      {
        id: "seguridad",
        number: "06",
        title: "Contemporary Food Safety & Salmonella Risk",
        content: [
          "While 53.9% of Spaniards prefer a runny ('poco cuajada') core, undercooked eggs pose a risk of Salmonella Enteritidis.",
          "Bactericidal pasteurization standards require reaching **70°C for 2 minutes** or **63°C for 20 seconds**, and limiting ambient exposure to under **4 hours**."
        ],
        tableData: {
          headers: ["Year", "Location / Incident", "Context & Impact", "Primary Pathogen"],
          rows: [
            ["1991", "Valencia", "Historic catering outbreak with fatal cases", "S. Enteritidis"],
            ["2021", "Soria", "Severe pediatric ICU admissions", "Salmonella spp."],
            ["2023", "Casa Dani (Madrid)", "Major outbreak with 101 cases & 13 hospitalizations", "S. Enteritidis"],
            ["2024", "Barcelona", "Restaurant outbreak affecting ~30 patrons", "Salmonella spp."],
            ["2025", "Trasan Fest (Galicia)", "Critical incident with >150 cases & 41 hospitalizations", "S. Enteritidis"]
          ]
        },
        callout: {
          type: "safety",
          text: "Critical Rule: Unpasteurized egg preparations that fail to reach **70°C for 2 minutes** or **63°C for 20 seconds** must not exceed **4 hours** in the danger zone (7°C-48°C)."
        }
      },
      {
        id: "digital",
        number: "07",
        title: "Risk Analysis & Modern Commercial Trends",
        content: [
          "Biofilm formation allows Salmonella to survive on stainless steel for 7 days. High water activity and ambient temperatures (>35°C) catalyze rapid bacterial growth.",
          "In response, professional kitchens mandate pasteurized liquid eggs, strict refrigeration under 8°C, and digital quality monitoring."
        ]
      },
      {
        id: "conclusion",
        number: "08",
        title: "Conclusion: The Triumph of Popular Ingenuity",
        content: [
          "From an 18th-century Extremaduran survival dish to an €8 billion digital delivery powerhouse, the tortilla de patatas remains a resilient, democratic symbol of Spanish culture.",
          "Whether ordered via QR code or flipped in a home kitchen, it stands as an enduring legacy of human resourcefulness."
        ],
        callout: {
          type: "quote",
          text: "The potato omelette belongs neither to kings nor elite chefs; it is the collective triumph of the Spanish people over hunger and time."
        }
      }
    ]
  },
  de: {
    badge: "Historische Chronik & Gastronomische Zeitleiste",
    title: "Die Geschichte der Tortilla de Patatas",
    subtitle: "Umfassende historische Untersuchung: Von den Aufklärungs-Wurzeln im 18. Jahrhundert über Überlebensrezepte bis zur modernen Lebensmittelsicherheit.",
    chefNote: "Die Geschichte der Tortilla ist ein Denkmal des spanischen Volksgeistes. Vom Gestrecken spärlicher Eier mit Kartoffeln 1817 bis zur Verwendung von Orangenschalen in der Nachkriegszeit verkörpert sie Überlebenswillen. Für absolute Sicherheit verlangt die Pasteurisierung **70°C für 2 Minuten** oder **63°C für 20 Sekunden** sowie maximal **4 Stunden** Stehzeit bei Raumtemperatur.",
    timelineTitle: "Zeitleiste & Historische Meilensteine",
    timelineSubtitle: "Schlüsselmomente der Transformation vom Notgericht zum Nationalsymbol.",
    timelineEvents: [
      {
        year: "1767 - 1772",
        title: "Erste Dokumentierte Erwähnungen",
        location: "Spanien",
        description: "Joseph Valcárcel (1767) und Roig (1772) hielten die ersten schriftlichen Nachweise über Kartoffeln mit verquirlten Eiern fest.",
        badge: "Zeitalter der Aufklärung",
        tagType: "origin"
      },
      {
        year: "1798",
        title: "Dokumentierte Geburtsstätte",
        location: "Villanueva de la Serena (Extremadura)",
        description: "Archive aus Extremadura belegen die genaue Kombination aus Kartoffel und Ei als nährstoffreiche Antwort auf Hungersnöte.",
        badge: "Gründungs-Meilenstein",
        tagType: "origin"
      },
      {
        year: "1810 - 1812",
        title: "Belagerung von Cádiz & 'Tortilla Francesa'",
        location: "Cádiz",
        description: "Mangel an Kartoffeln zwang die Bürger zum Omelett rein aus Eiern – spöttisch 'französisches Omelett' genannt.",
        badge: "Konflikt & Name",
        tagType: "war"
      },
      {
        year: "1817",
        title: "Das Navarra-Denkmal",
        location: "Navarra",
        description: "Offizielles Dokument an die Cortes über die Streckung weniger Eier mit reichlich Kartoffeln für arme Landfamilien.",
        badge: "Überlebensmittel",
        tagType: "survival"
      },
      {
        year: "1835",
        title: "Legende von General Zumalacárregui",
        location: "Karlistenkriege",
        description: "Eine Bäuerin soll das nahrhafte, günstige Gericht improvisiert haben, um Karlistentruppen schnell zu verpflegen.",
        badge: "Mythen & Legenden",
        tagType: "war"
      },
      {
        year: "1940er",
        title: "Die Orangenschalen-Not-Tortilla",
        location: "Nachkriegsspanien",
        description: "In Zeiten extremer Not ersetzte eingeweichte Orangenschale (Albedo) die Kartoffel und Mehl-Wasser das Ei.",
        badge: "Höchster Einfallsreichtum",
        tagType: "survival"
      },
      {
        year: "1991 - 2025",
        title: "Ausbrüche & Inaktivierungs-Standards",
        location: "Spanien",
        description: "Ausbrüche wie Casa Dani (2023) und Trasan Fest (2025) erfordern strenge Regeln: **70°C für 2 Minuten** und Flüssigei.",
        badge: "Lebensmittelsicherheit",
        tagType: "safety"
      },
      {
        year: "2024 - 2025+",
        title: "Digitales Delivery & Vegane Alternativen",
        location: "Modernes Spanien",
        description: "Online-Delivery erreicht 8 Mrd. Euro. Kichererbsenmehl und Tapiokastärke ermöglichen allergiefreie, vegane Tortillas.",
        badge: "Digitales Zeitalter",
        tagType: "modern"
      }
    ],
    chaptersTitle: "Vollständige Historische Untersuchung",
    chaptersSubtitle: "Detaillierte Analyse in 8 Kapiteln.",
    chapters: [
      {
        id: "intro",
        number: "01",
        title: "Einleitung: Ein kulturelles und gastronomisches Wahrzeichen",
        content: [
          "Die Tortilla de Patatas ist weit mehr als ein bloßes Rezept; sie ist ein identitätsstiftendes Artefakt der spanischen Kulturwissenschaft. Ihre Bedeutung gründet sich auf einer beispiellosen sozioökonomischen Resilienz.",
          "Diese wissenschaftliche Chronik verbindet historische Dokumente des 18. Jahrhunderts mit modernen Sicherheitsstandards und dem digitalen Wandel."
        ],
        bulletPoints: [
          "Hoher Identitätswert: Das ultimative Symbol der spanischen Gastronomie.",
          "Breite Akzeptanz: Beliebt in allen Gesellschaftsschichten.",
          "Anpassungsfähigkeit: Vom Bauernhaus bis zur industriellen Fertiggericht-Küche.",
          "Emotionale Bindung: Tief verankert im kollektiven Gedächtnis."
        ]
      },
      {
        id: "siglo-18",
        number: "02",
        title: "Die Wurzeln im 18. Jahrhundert",
        content: [
          "Frühe Schriften von Valcárcel (1767) und Roig (1772) belegen die Nutzung der Kartoffel mit verquirlten Eiern.",
          "Das Dokument aus Villanueva de la Serena (1798) markiert den exakten historischen Ursprung des Gerichts."
        ]
      },
      {
        id: "siglo-19",
        number: "03",
        title: "Das 19. Jahrhundert: Kriege, Hunger und Soldatenrationen",
        content: [
          "Das Navarra-Denkmal von 1817 zeigte, wie Kartoffeln die Eier streckten, um armen Bauernfamilien das Überleben zu sichern.",
          "Die Legende um General Zumalacárregui etablierte die Tortilla als effiziente Militärverpflegung."
        ]
      },
      {
        id: "cadiz",
        number: "04",
        title: "Die 'Tortilla Francesa' und die Belagerung von Cádiz",
        content: [
          "Der akute Kartoffelmangel während der napoleonischen Belagerung (1810-1812) zwang die Bürger zur reinen Ei-Version.",
          "Mit humorvoller Abgrenzung nannten sie diese 'französisches Omelett'."
        ]
      },
      {
        id: "subsistencia",
        number: "05",
        title: "Die Not-Tortilla der Nachkriegszeit",
        content: [
          "In den harten 1940er Jahren nutzten die Menschen gewässerte Orangenschalen (Albedo) statt Kartoffeln und Mehlwasser statt Eiern.",
          "Heute inspirieren diese Not-Anpassungen vegane Varianten aus Kichererbsenmehl und Tapiokastärke."
        ]
      },
      {
        id: "seguridad",
        number: "06",
        title: "Moderne Herausforderungen: Tradition vs. Lebensmittelsicherheit",
        content: [
          "Obwohl 53,9% flüssige Kern-Tortillas bevorzugen, birgt rohes Ei das Risiko von Salmonella Enteritidis.",
          "Sicherheitsstandards verlangen **70°C für 2 Minuten** oder **63°C für 20 Sekunden** sowie maximal **4 Stunden** bei Raumtemperatur."
        ],
        tableData: {
          headers: ["Jahr", "Ort / Ereignis", "Kontext & Auswirkung", "Erreger"],
          rows: [
            ["1991", "Valencia", "Historischer Ausbruch im Gastgewerbe", "S. Enteritidis"],
            ["2021", "Soria", "Schwere Fälle in der Pädiatrie", "Salmonella spp."],
            ["2023", "Casa Dani (Madrid)", "Großausbruch mit 101 Betroffenen & 13 Hospitalisierungen", "S. Enteritidis"],
            ["2024", "Barcelona", "Restaurantausbruch mit ~30 Betroffenen", "Salmonella spp."],
            ["2025", "Trasan Fest (Galicien)", "Großausbruch mit >150 Betroffenen & 41 Hospitalisierungen", "S. Enteritidis"]
          ]
        },
        callout: {
          type: "safety",
          text: "Goldstandard: Nicht pasteurisierte Zubereitungen, die **70°C für 2 Minuten** nicht erreichen, dürfen nie länger als **4 Stunden** ungekühlt stehen."
        }
      },
      {
        id: "digital",
        number: "07",
        title: "Risikoanalyse & Mikrobiologie",
        content: [
          "Salmonellen überleben in Biofilmen auf Edelstahl bis zu 7 Tage. Hohe Wasseraktivität begünstigt schnelles Wachstum bei Sommertemperaturen (>35°C)."
        ]
      },
      {
        id: "conclusion",
        number: "08",
        title: "Fazit: Der Triumph des Volksgeistes",
        content: [
          "Von der Not-Speise im Extremadura des 18. Jahrhunderts zum 8-Milliarden-Euro-Online-Markt bleibt die Tortilla das demokratischste Symbol der spanischen Esskultur.",
          "Sie erinnert daran, dass Kultur dort entsteht, wo Tradition und Überlebenswille aufeinandertreffen."
        ],
        callout: {
          type: "quote",
          text: "Die Kartoffeltortilla gehört weder einem König noch einem Meisterkoch; sie ist der kollektive Sieg des spanischen Volkes über den Hunger und die Zeit."
        }
      }
    ]
  }
};
