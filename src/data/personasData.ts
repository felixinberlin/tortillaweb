export interface Persona {
  id: string;
  name: string;
  badge: 'Historia' | 'Tradición' | 'Innovación' | 'Ciencia' | 'Divulgación' | 'Cultura' | 'Cultura Pop' | string;
  era?: string;
  imageUrl?: string;
  contribution: string;
  relatedPage: {
    label: string;
    href: string;
  };
  category: 'pioneros' | 'maestros' | 'ciencia' | 'divulgacion' | 'empresa';
}

export interface PersonaCategoryBlock {
  id: 'pioneros' | 'maestros' | 'ciencia' | 'divulgacion' | 'empresa';
  title: string;
  description: string;
  personas: Persona[];
}

export interface PersonasPageContent {
  badge: string;
  title: string;
  subtitle: string;
  chefNote: string;
  categories: PersonaCategoryBlock[];
}

/**
 * Centralized Metadata Map for Persona Assets and Shared Hrefs
 * Cleanly separates media/route identifiers from translated text definitions.
 */
const PERSONA_META: Record<string, { imageUrl: string; category: Persona['category']; href: string }> = {
  'barat': {
    imageUrl: '/images/personas/barat.jpg',
    category: 'pioneros',
    href: '/science'
  },
  'cocineras-anonimas': {
    imageUrl: '/images/personas/cocineras.jpg',
    category: 'pioneros',
    href: '/history'
  },
  'pepa-miranda': {
    imageUrl: '/images/personas/pepa-miranda.jpg',
    category: 'maestros',
    href: '/recipes'
  },
  'cris-delantal': {
    imageUrl: '/images/personas/cris.jpg',
    category: 'maestros',
    href: '/builder'
  },
  'colectivo-excelencia': {
    imageUrl: '/images/personas/colectivo.jpg',
    category: 'maestros',
    href: '/techniques'
  },
  'alejandro-ortega': {
    imageUrl: '/images/personas/alejandro.jpg',
    category: 'ciencia',
    href: '/science'
  },
  'elena-sandri': {
    imageUrl: '/images/personas/elena.jpg',
    category: 'ciencia',
    href: '/history'
  },
  'natzir-turrado': {
    imageUrl: '/images/personas/natzir.jpg',
    category: 'ciencia',
    href: '/builder'
  },
  'bree-recker': {
    imageUrl: '/images/personas/bree-recker.jpg',
    category: 'divulgacion',
    href: '/ingredients'
  },
  'jose-luis-nueno': {
    imageUrl: '/images/personas/nueno.jpg',
    category: 'divulgacion',
    href: '/history'
  },
  'taz-skylar-inaki-godoy': {
    imageUrl: '/images/personas/taz.jpg',
    category: 'divulgacion',
    href: '/history'
  },
  'rosalia': {
    imageUrl: '/images/personas/rosalia.jpg',
    category: 'divulgacion',
    href: '/history'
  },
  'jose-andres': {
    imageUrl: '/images/personas/jose-andres.jpg',
    category: 'divulgacion',
    href: '/recipes'
  },
  'juan-roig': {
    imageUrl: '/images/personas/juan-roig.jpg',
    category: 'empresa',
    href: '/history'
  }
};

type RawPersona = Omit<Persona, 'imageUrl' | 'category' | 'relatedPage'> & {
  relatedLabel: string;
};

function createPersona(raw: RawPersona): Persona {
  const meta = PERSONA_META[raw.id];
  if (!meta) {
    throw new Error();
  }
  return {
    id: raw.id,
    name: raw.name,
    badge: raw.badge,
    era: raw.era,
    imageUrl: meta.imageUrl,
    contribution: raw.contribution,
    relatedPage: {
      label: raw.relatedLabel,
      href: meta.href
    },
    category: meta.category
  };
}

export const personasData: Record<string, PersonasPageContent> = {
  es: {
    badge: "Directorio Maestro & Figura Clave",
    title: "Personas: Mentes & Manos de la Tortilla",
    subtitle: "Compendio analítico de las figuras y mentes que, desde la investigación académica, la innovación culinaria, la tradición popular y la visión empresarial, definen el presente y futuro de la tortilla de patatas.",
    chefNote: "Este directorio rinde homenaje tanto a las pioneras anónimas como a los científicos y chefs de vanguardia. La tradición culinaria y la seguridad bactericida (**70°C for 2 minutes**) caminan de la mano en nuestro cuaderno de laboratorio.",
    categories: [
      {
        id: "pioneros",
        title: "1. Pioneros y Raíces de la Documentación",
        description: "Figuras fundamentales en la formalización académica e histórica del plato.",
        personas: [
          createPersona({
            id: "barat",
            name: "José Manuel Barat Baviera",
            badge: "Historia",
            era: "Contemporánea (Siglo XXI)",
            contribution: "Como tutor académico en la Universitat Politècnica de València, ha liderado la formalización científica del plato a través de la tutela de investigaciones críticas. Su labor es fundamental para elevar la tortilla de un saber empírico a un objeto de estudio técnico bajo estándares de ingeniería agronómica.",
            relatedLabel: "Ver Ciencia & Seguridad"
          }),
          createPersona({
            id: "cocineras-anonimas",
            name: "Cocineras de pueblo anónimas",
            badge: "Tradición",
            era: "Transversal (Siglos XVIII - XXI)",
            contribution: "Custodias del equilibrio alquímico entre el huevo y la patata. El contexto histórico y los estudios de hábitos culinarios reconocen en su figura la estandarización de la proporción áurea que define la identidad del plato, manteniendo viva la técnica doméstica frente a la industrialización.",
            relatedLabel: "Ver Historia & Cronología"
          })
        ]
      },
      {
        id: "maestros",
        title: "2. Maestros de la Restauración y el Sabor",
        description: "Iconos de la gastronomía tradicional y creadores de la reinterpretación inclusiva.",
        personas: [
          createPersona({
            id: "pepa-miranda",
            name: "Pepa Miranda (Casa Dani)",
            badge: "Tradición",
            era: "Contemporánea (Siglo XXI)",
            contribution: "Referente absoluto de la tortilla de estilo tradicional en Madrid. Su técnica busca el punto de jugosidad extrema, situando su establecimiento como el epicentro del debate entre el placer gastronómico y el rigor térmico necesario para la seguridad alimentaria.",
            relatedLabel: "Ver Recetas Tradicionales"
          }),
          createPersona({
            id: "cris-delantal",
            name: "Cris (Delantal de Alces)",
            badge: "Innovación",
            era: "Contemporánea (Siglo XXI)",
            contribution: "Pionera en la reinterpretación inclusiva de la tortilla. Ha perfeccionado una fórmula vegana y sin gluten utilizando harina de garbanzo y tapioca para emular la textura del huevo, permitiendo que personas con alergias o dietas éticas accedan a este baluarte culinario sin perder la esencia del sabor tradicional.",
            relatedLabel: "Ver Constructor de Recetas"
          }),
          createPersona({
            id: "colectivo-excelencia",
            name: "Colectivo de la Excelencia (Azurmendi, Mugaritz, Noor, Casa Marcial)",
            badge: "Innovación",
            era: "Contemporánea (Siglo XXI)",
            contribution: "Estos establecimientos representan el estándar de oro en la presentación y digitalización de la gastronomía española. Su apuesta por la calidad visual y la transparencia informativa en sus plataformas define cómo se percibe la tortilla y otros platos icónicos en el escenario de la alta cocina internacional.",
            relatedLabel: "Ver Técnicas Culinarias"
          })
        ]
      },
      {
        id: "ciencia",
        title: "3. Ciencia, Seguridad e Investigación",
        description: "Investigadores y consultores centrados en la microbiología y la seguridad alimentaria.",
        personas: [
          createPersona({
            id: "alejandro-ortega",
            name: "Alejandro José Ortega Vargas",
            badge: "Ciencia",
            era: "Contemporánea (Siglo XXI)",
            contribution: "Investigador especializado en el perfil de riesgo de Salmonella spp. en la tortilla poco cuajada. Mediante el uso de la herramienta Risk Ranger, ha documentado que el consumo tradicional (huevo líquido) es un escenario crítico de exposición. Su trabajo analiza brotes recientes de gran impacto, como el del Trasan Fest en Galicia (2025), donde la falta de tratamiento térmico adecuado resultó en más de 150 afectados, subrayando la urgencia de alcanzar los **70°C** en el centro del producto por **2 minutes**.",
            relatedLabel: "Ver Ciencia & Microbiología"
          }),
          createPersona({
            id: "elena-sandri",
            name: "Elena Sandri",
            badge: "Ciencia",
            era: "Contemporánea (Siglo XXI)",
            contribution: "Investigadora sociológica cuyo estudio en The International Journal of Gastronomy and Food Science revela la actual transformación del hogar español: mientras el 59,1% aún cocina a diario, un significativo 40,9% ha abandonado esta práctica, impulsando el auge de las tortillas preparadas y el sector de platos listos para el consumo.",
            relatedLabel: "Ver Historia & Hábitos"
          }),
          createPersona({
            id: "natzir-turrado",
            name: "Natzir Turrado",
            badge: "Innovación",
            era: "Contemporánea (Siglo XXI)",
            contribution: "Consultor experto en Foodtech y SEO internacional. Su análisis destaca que la supervivencia de los negocios de tortilla en la era digital depende de la integración del canal orgánico con la experiencia móvil. Subraya que en el sector de suscripciones de comida saludable, el éxito reside en capturar el tráfico informativo para derivarlo a aplicaciones propias que fidelicen al usuario fuera del vaivén de los algoritmos.",
            relatedLabel: "Ver Constructor & Personalización"
          })
        ]
      },
      {
        id: "divulgacion",
        title: "4. Divulgación y Cultura Digital",
        description: "Periodistas, creadores y analistas del ecosistema gastronómico contemporáneo.",
        personas: [
          createPersona({
            id: "bree-recker",
            name: "Bree Recker",
            badge: "Divulgación",
            era: "Contemporánea (Siglo XXI)",
            contribution: "Periodista gastronómica y creadora de contenidos ('brieelikethecheese'). Defiende que la 'elección de comida se guía por el sistema visual', por lo que la divulgación de la tortilla debe apoyarse en imágenes de alta fidelidad. Su labor educativa se centra en mejorar la presencia digital de los restaurantes para atraer a un comensal que, en el siglo XXI, 'come primero con los ojos'.",
            relatedLabel: "Ver Ingredientes & Texturas"
          }),
          createPersona({
            id: "jose-luis-nueno",
            name: "José Luis Nueno",
            badge: "Divulgación",
            era: "Contemporánea (Siglo XXI)",
            contribution: "Profesor, investigador y especialista en comportamiento del consumidor. Sus estudios sobre conveniencia, digitalización del retail y nuevos modelos de consumo ayudan a comprender cómo la tortilla de patatas se adapta al mercado contemporáneo: supermercados online, platos preparados, delivery y soluciones listas para consumir dentro de una industria guiada por la rapidez y comodidad.",
            relatedLabel: "Ver Historia & Tendencias"
          }),
          createPersona({
            id: "taz-skylar-inaki-godoy",
            name: "Taz Skylar (Sanji en One Piece) e Iñaki Godoy",
            badge: "Cultura Pop",
            era: "Contemporánea (Siglo XXI)",
            contribution: "Durante la promoción de la serie live-action de One Piece en Netflix, Taz Skylar (quien interpreta al chef de la tripulación, Sanji, y creció familiarizado con la gastronomía española) protagonizó un debate con su compañero Iñaki Godoy. Su intercambio humorístico cuestionando los ingredientes exactos de la tortilla demostró cómo la pasión, la simplicidad y la confusión que rodean a esta receta tradicional española logran captar la atención de estrellas globales y de las nuevas generaciones.",
            relatedLabel: "Ver Historia & Cultura"
          }),
          createPersona({
            id: "rosalia",
            name: "Rosalía",
            badge: "Cultura Pop",
            era: "Contemporánea (Siglo XXI)",
            contribution: "La artista internacional catalana demostró el inmenso poder social de este plato al revolucionar Twitter con una simple declaración. Al proclamar públicamente su amor por la tortilla de patatas 'con pan' y especificar rápidamente que la prefiere 'con cebollita', reabrió el eterno debate nacional, logrando miles de retuits y arrastrando a otras celebridades a posicionarse en el bando concebollista o sincebollista.",
            relatedLabel: "Ver El Eterno Debate"
          }),
          createPersona({
            id: "jose-andres",
            name: "José Andrés",
            badge: "Divulgación Internacional",
            era: "Contemporánea (Siglo XXI)",
            contribution: "Chef español reconocido mundialmente por su incansable labor de difusión de la gastronomía de nuestro país. A través de sus restaurantes (como Jaleo), libros y apariciones públicas, ha defendido este plato como una expresión cultural capaz de viajar más allá de sus fronteras, refiriéndose a la tortilla como 'el plato más importante de la cocina española'. Su visión representa la transición exacta de la tortilla desde la cocina familiar hacia un icono gastronómico internacional. Además de la receta tradicional, ha popularizado versiones de vanguardia, como la famosa 'tortilla exprés' con patatas chips de bolsa, y variantes de autor incorporando ingredientes como atún blanco, queso Idiazábal y pimientos del piquillo asados.",
            relatedLabel: "Ver Recetas & Cultura"
          })
        ]
      },
      {
        id: "empresa",
        title: "5. Visión Empresarial y Futuro Alimentario",
        description: "Líderes de la industria e impulsores de las nuevas dinámicas de consumo.",
        personas: [
          createPersona({
            id: "juan-roig",
            name: "Juan Roig (Mercadona)",
            badge: "Innovación",
            era: "Contemporánea (Siglo XXI)",
            contribution: "Líder empresarial con la visión disruptiva de que 'a mitad del siglo XXI no habrá cocinas en los hogares'. Bajo esta premisa, ha impulsado un crecimiento del 48% en el sector de platos listos para comer en solo dos años, posicionando la tortilla envasada como el pilar fundamental de una nueva economía de consumo donde la eficiencia y la inmediatez sustituyen a la preparación tradicional.",
            relatedLabel: "Ver Historia & Cronología"
          })
        ]
      }
    ]
  },
  en: {
    badge: "Master Directory & Key Personalities",
    title: "Personas: Minds & Hands of the Tortilla",
    subtitle: "An analytical directory of key figures shaping the past, present, and future of the Spanish potato omelette through academic research, culinary innovation, tradition, and business vision.",
    chefNote: "This directory honors both anonymous rural cooks and cutting-edge scientists and chefs. Culinary heritage and bactericidal safety (**70°C for 2 minutes**) go hand-in-hand in our laboratory notebook.",
    categories: [
      {
        id: "pioneros",
        title: "1. Pioneers & Historical Documentation",
        description: "Key figures in the academic and historical formalization of the dish.",
        personas: [
          createPersona({
            id: "barat",
            name: "José Manuel Barat Baviera",
            badge: "History",
            era: "Contemporary (21st Century)",
            contribution: "As an academic supervisor at Universitat Politècnica de València, he spearheaded the scientific formalization of the Spanish omelette through critical research. His work elevates the tortilla from empirical culinary practice to a technical study subject under agricultural engineering standards.",
            relatedLabel: "View Science & Safety"
          }),
          createPersona({
            id: "cocineras-anonimas",
            name: "Anonymous Village Cooks",
            badge: "Tradition",
            era: "Transversal (18th - 21st Century)",
            contribution: "Guardians of the alchemical balance between egg and potato. Historical studies recognize them for standardizing the golden ratio that defines the dish's identity, keeping domestic technique alive against industrialization.",
            relatedLabel: "View History & Timeline"
          })
        ]
      },
      {
        id: "maestros",
        title: "2. Master Culinary Craftsmen",
        description: "Icons of traditional gastronomy and pioneers of inclusive culinary reinterpretation.",
        personas: [
          createPersona({
            id: "pepa-miranda",
            name: "Pepa Miranda (Casa Dani)",
            badge: "Tradition",
            era: "Contemporary (21st Century)",
            contribution: "The ultimate benchmark for traditional-style Spanish omelette in Madrid (Casa Dani). Her technique pursues extreme juiciness, placing Casa Dani at the heart of the debate between culinary pleasure and the thermal rigor required for food safety.",
            relatedLabel: "View Traditional Recipes"
          }),
          createPersona({
            id: "cris-delantal",
            name: "Cris (Delantal de Alces)",
            badge: "Innovation",
            era: "Contemporary (21st Century)",
            contribution: "Pioneer in inclusive reinterpretation. She perfected an allergen-free, vegan formula using chickpea flour and tapioca starch to mimic egg texture without sacrificing traditional taste.",
            relatedLabel: "View Recipe Builder"
          }),
          createPersona({
            id: "colectivo-excelencia",
            name: "Excellence Collective (Azurmendi, Mugaritz, Noor, Casa Marcial)",
            badge: "Innovation",
            era: "Contemporary (21st Century)",
            contribution: "These establishments set the gold standard in digital presentation and transparency for Spanish gastronomy, elevating iconic dishes on the international fine-dining stage.",
            relatedLabel: "View Culinary Techniques"
          })
        ]
      },
      {
        id: "ciencia",
        title: "3. Science, Safety & Research",
        description: "Researchers and consultants focused on microbiology and food safety.",
        personas: [
          createPersona({
            id: "alejandro-ortega",
            name: "Alejandro José Ortega Vargas",
            badge: "Science",
            era: "Contemporary (21st Century)",
            contribution: "Researcher specializing in the risk profile of Salmonella spp. in runny Spanish omelette. Using the Risk Ranger tool, he documented that traditional runny-egg consumption presents a critical exposure scenario. His work analyzes major outbreaks like Trasan Fest in Galicia (2025), where over 150 people were affected due to insufficient heating, highlighting the imperative of reaching **70°C for 2 minutes** at the core.",
            relatedLabel: "View Science & Microbiology"
          }),
          createPersona({
            id: "elena-sandri",
            name: "Elena Sandri",
            badge: "Science",
            era: "Contemporary (21st Century)",
            contribution: "Sociological researcher whose study in The International Journal of Gastronomy and Food Science reveals how 40.9% of Spanish households no longer cook daily, driving the rise of pre-made ready-to-eat tortillas.",
            relatedLabel: "View History & Habits"
          }),
          createPersona({
            id: "natzir-turrado",
            name: "Natzir Turrado",
            badge: "Innovation",
            era: "Contemporary (21st Century)",
            contribution: "Foodtech and international SEO consultant. His insights demonstrate how digital channels and mobile apps sustain modern food businesses in healthy subscription markets.",
            relatedLabel: "View Recipe Builder"
          })
        ]
      },
      {
        id: "divulgacion",
        title: "4. Media & Digital Culture",
        description: "Journalists, creators, and analysts in the modern food ecosystem.",
        personas: [
          createPersona({
            id: "bree-recker",
            name: "Bree Recker",
            badge: "Outreach",
            era: "Contemporary (21st Century)",
            contribution: "Food journalist and content creator ('brieelikethecheese'). She advocates that 'food choice is guided by the visual system', requiring high-fidelity imagery in culinary outreach. Her work focuses on enhancing digital presence for restaurants engaging 21st-century diners.",
            relatedLabel: "View Ingredients & Textures"
          }),
          createPersona({
            id: "jose-luis-nueno",
            name: "José Luis Nueno",
            badge: "Outreach",
            era: "Contemporary (21st Century)",
            contribution: "Professor, researcher, and consumer behavior specialist. His studies on convenience, retail digitization, and new consumption models explain how traditional items like the Spanish tortilla adapt to contemporary markets: online supermarkets, ready-to-eat meals, and delivery services.",
            relatedLabel: "View History & Trends"
          }),
          createPersona({
            id: "taz-skylar-inaki-godoy",
            name: "Taz Skylar (Sanji in One Piece) & Iñaki Godoy",
            badge: "Pop Culture",
            era: "Contemporary (21st Century)",
            contribution: "During the promotional tour for Netflix's live-action One Piece series, Taz Skylar (who plays crew cook Sanji and grew up familiar with Spanish cuisine) sparked an animated debate with co-star Iñaki Godoy over traditional tortilla ingredients, capturing global media attention.",
            relatedLabel: "View History & Culture"
          }),
          createPersona({
            id: "rosalia",
            name: "Rosalía",
            badge: "Pop Culture",
            era: "Contemporary (21st Century)",
            contribution: "The international Spanish music star demonstrated the immense cultural power of this dish by setting social media ablaze. Publicly declaring her love for tortilla 'with bread' and clarifying she prefers it 'with onion', she reignited the eternal national debate on Spanish Twitter, drawing widespread global attention.",
            relatedLabel: "View Eternal Debate"
          }),
          createPersona({
            id: "jose-andres",
            name: "José Andrés",
            badge: "International Outreach",
            era: "Contemporary (21st Century)",
            contribution: "World-renowned Spanish chef celebrated for his global promotion of Spanish culinary heritage. Through his restaurants (such as Jaleo), books, and media appearances, he has championed the tortilla as 'the most important dish in Spanish cuisine'. Beyond classic recipes, he popularized innovative variations like the famous 'express potato chip tortilla' and gourmet versions featuring white tuna, Idiazábal cheese, and roasted piquillo peppers.",
            relatedLabel: "View Recipes & Culture"
          })
        ]
      },
      {
        id: "empresa",
        title: "5. Business Vision & Future Food",
        description: "Industry leaders reshaping modern food consumption.",
        personas: [
          createPersona({
            id: "juan-roig",
            name: "Juan Roig (Mercadona)",
            badge: "Innovation",
            era: "Contemporary (21st Century)",
            contribution: "Business leader with the disruptive vision that 'by the middle of the 21st century, home kitchens will no longer exist'. Under this premise, he drove 48% growth in the ready-to-eat meal sector in two years, positioning pre-packaged tortillas as a fundamental pillar of the modern convenience economy.",
            relatedLabel: "View History & Timeline"
          })
        ]
      }
    ]
  },
  de: {
    badge: "Meister-Verzeichnis & Schlüsselpersönlichkeiten",
    title: "Personas: Köpfe & Hände der Tortilla",
    subtitle: "Analytisches Verzeichnis der Personen, die durch akademische Forschung, kulinarische Innovation, Tradition und Wirtschaftsvision die Gegenwart und Zukunft der Kartoffeltortilla prägen.",
    chefNote: "Dieses Verzeichnis ehrt anonyme Landköchinnen ebenso wie Spitzenköche und Wissenschaftler. Tradition und mikrobiologische Sicherheit (**70°C for 2 minutes**) gehen in unserem Laborbuch Hand in Hand.",
    categories: [
      {
        id: "pioneros",
        title: "1. Pioniere & Historische Dokumentation",
        description: "Schlüsselfiguren der akademischen und historischen Erfassung.",
        personas: [
          createPersona({
            id: "barat",
            name: "José Manuel Barat Baviera",
            badge: "Geschichte",
            era: "Gegenwart (21. Jahrhundert)",
            contribution: "Als akademischer Betreuer an der Universitat Politècnica de València leitete er die wissenschaftliche Aufarbeitung der Kartoffeltortilla. Seine Forschung erhebt das Gericht von einer rein empirischen Tradition zu einem technischen Studienobjekt agrarwissenschaftlicher Standards.",
            relatedLabel: "Wissenschaft & Sicherheit"
          }),
          createPersona({
            id: "cocineras-anonimas",
            name: "Anonyme Landköchinnen",
            badge: "Tradition",
            era: "Transversal (18. - 21. Jh.)",
            contribution: "Hüterinnen des alchemistischen Gleichgewichts zwischen Ei und Kartoffel. Sie prägten den Goldenen Schnitt der Zutaten und bewahrten die häusliche Kochkunst gegenüber der Industrialisierung.",
            relatedLabel: "Geschichte & Zeitleiste"
          })
        ]
      },
      {
        id: "maestros",
        title: "2. Meister der Gastronomie & des Geschmacks",
        description: "Ikonen der traditionellen Gastronomie und Pioniere inklusiver Rezepte.",
        personas: [
          createPersona({
            id: "pepa-miranda",
            name: "Pepa Miranda (Casa Dani)",
            badge: "Tradition",
            era: "Gegenwart (21. Jahrhundert)",
            contribution: "Absoluter Maßstab für traditionelle Kartoffeltortilla in Madrid (Casa Dani). Ihre Technik zielt auf extreme Saftigkeit ab und macht ihren Betrieb zum Epizentrum der Debatte zwischen gastronomischem Genuss und thermischer Lebensmittelsicherheit.",
            relatedLabel: "Traditionelle Rezepte"
          }),
          createPersona({
            id: "cris-delantal",
            name: "Cris (Delantal de Alces)",
            badge: "Innovation",
            era: "Zeitgenössisch (21. Jahrhundert)",
            contribution: "Pionierin der inklusiven Tortilla. Sie entwickelte ein glutenfreies, veganes Rezept mit Kichererbsenmehl und Tapioka, das die Ei-Textur perfekt nachahmt.",
            relatedLabel: "Rezept-Baukasten"
          }),
          createPersona({
            id: "colectivo-excelencia",
            name: "Exzellenz-Kollektiv (Azurmendi, Mugaritz, Noor, Casa Marcial)",
            badge: "Innovation",
            era: "Zeitgenössisch (21. Jahrhundert)",
            contribution: "Diese Restaurants setzen den Goldstandard für digitale Präsentation und Transparenz der spanischen Spitzenküche auf internationaler Bühne.",
            relatedLabel: "Kochtechniken"
          })
        ]
      },
      {
        id: "ciencia",
        title: "3. Wissenschaft, Sicherheit & Forschung",
        description: "Experten für Mikrobiologie und Lebensmittelsicherheit.",
        personas: [
          createPersona({
            id: "alejandro-ortega",
            name: "Alejandro José Ortega Vargas",
            badge: "Wissenschaft",
            era: "Gegenwart (21. Jahrhundert)",
            contribution: "Forscher mit Spezialisierung auf das Risikoprofil von Salmonella spp. in flüssig gebratener Tortilla. Mithilfe von Risk Ranger dokumentierte er, dass der Verzehr mit flüssigem Ei ein kritisches Expositionsrisiko darstellt. Seine Analysen zu Ausbrüchen wie dem Trasan Fest (2025) unterstreichen die Notwendigkeit einer Kerntemperatur von **70°C for 2 minutes**.",
            relatedLabel: "Wissenschaft & Mikrobiologie"
          }),
          createPersona({
            id: "elena-sandri",
            name: "Elena Sandri",
            badge: "Wissenschaft",
            era: "Zeitgenössisch (21. Jahrhundert)",
            contribution: "Soziologische Forscherin, deren Studien zeigen, dass 40,9 % der spanischen Haushalte nicht mehr täglich kochen, was den Markt für Fertigtortillas antreibt.",
            relatedLabel: "Geschichte & Gewohnheiten"
          }),
          createPersona({
            id: "natzir-turrado",
            name: "Natzir Turrado",
            badge: "Innovation",
            era: "Zeitgenössisch (21. Jahrhundert)",
            contribution: "Foodtech- und SEO-Berater. Seine Arbeit analysiert, wie digitale Kanäle und Apps moderne Verpflegungsmodelle nachhaltig sichern.",
            relatedLabel: "Rezept-Baukasten"
          })
        ]
      },
      {
        id: "divulgacion",
        title: "4. Medien & Digitale Kultur",
        description: "Journalisten, Content-Creator und Trendanalysten.",
        personas: [
          createPersona({
            id: "bree-recker",
            name: "Bree Recker",
            badge: "Wissenschaftskommunikation",
            era: "Gegenwart (21. Jahrhundert)",
            contribution: "Food-Journalistin und Content Creatorin ('brieelikethecheese'). Sie vertritt die These, dass die Essenswahl maßgeblich visuell gesteuert wird. Ihre Arbeit stärkt die digitale Präsenz von Restaurants für ein Publikum, das 'zuerst mit den Augen isst'.",
            relatedLabel: "Zutaten & Texturen"
          }),
          createPersona({
            id: "jose-luis-nueno",
            name: "José Luis Nueno",
            badge: "Wissenschaftskommunikation",
            era: "Zeitgenössisch (21. Jahrhundert)",
            contribution: "Professor, Forscher und Spezialist für Konsumentenverhalten. Seine Studien zu Convenience, Retail-Digitalisierung und neuen Konsummodellen erklären, wie sich traditionelle Produkte wie die Kartoffeltortilla an den modernen Markt anpassen.",
            relatedLabel: "Geschichte & Trends"
          }),
          createPersona({
            id: "taz-skylar-inaki-godoy",
            name: "Taz Skylar (Sanji in One Piece) & Iñaki Godoy",
            badge: "Popkultur",
            era: "Gegenwart (21. Jahrhundert)",
            contribution: "Während der Promo-Tour für die Netflix-Live-Action-Serie One Piece löste Taz Skylar (der den Schiffskoch Sanji spielt) mit Iñaki Godoy eine humorvolle Debatte über die Zutaten der echten spanischen Tortilla aus und begeisterte ein weltweites Millionenpublikum.",
            relatedLabel: "Geschichte & Popkultur"
          }),
          createPersona({
            id: "rosalia",
            name: "Rosalía",
            badge: "Popkultur",
            era: "Gegenwart (21. Jahrhundert)",
            contribution: "Die internationale spanische Musikerin bewies die enorm kulturelle Strahlkraft dieses Gerichts in den sozialen Medien. Als sie ihre Liebe für Tortilla 'mit Brot' und 'mit Zwiebeln' verkündete, entfachte sie erneut die ewige nationale Debatte in Spanien.",
            relatedLabel: "Geschichte & Debatte"
          }),
          createPersona({
            id: "jose-andres",
            name: "José Andrés",
            badge: "Internationale Kommunikation",
            era: "Gegenwart (21. Jahrhundert)",
            contribution: "Weltberühmter spanischer Chefkoch, der sich unermüdlich für die Verbreitung der spanischen Gastronomie einsetzt. Über seine Restaurants (wie Jaleo), Bücher und TV-Auftritte bezeichnet er die Tortilla als 'das wichtigste Gericht der spanischen Küche'. Neben der traditionellen Zubereitung popularisierte er auch vanguardistische Versionen wie die 'Express-Chips-Tortilla'.",
            relatedLabel: "Rezepte & Kultur"
          })
        ]
      },
      {
        id: "empresa",
        title: "5. Wirtschaftsvision & Zukunft der Ernährung",
        description: "Unternehmer, die den Lebensmittelmarkt transformieren.",
        personas: [
          createPersona({
            id: "juan-roig",
            name: "Juan Roig (Mercadona)",
            badge: "Innovation",
            era: "Gegenwart (21. Jahrhundert)",
            contribution: "Unternehmer mit der These, dass 'Mitte des 21. Jahrhunderts keine heimischen Küchen mehr existieren werden'. Unter dieser Prämisse trieb er ein 48%iges Wachstum bei Verzehrfertiggerichten voran und etablierte abgepackte Tortillas als Stütze einer neuen Bequemlichkeitsökonomie.",
            relatedLabel: "Geschichte & Zeitleiste"
          })
        ]
      }
    ]
  }
};
