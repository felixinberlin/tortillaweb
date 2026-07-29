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
          {
            id: "barat",
            name: "José Manuel Barat Baviera",
            badge: "Historia",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/barat.jpg",
            contribution: "Como tutor académico en la Universitat Politècnica de València, ha liderado la formalización científica del plato a través de la tutela de investigaciones críticas. Su labor es fundamental para elevar la tortilla de un saber empírico a un objeto de estudio técnico bajo estándares de ingeniería agronómica.",
            relatedPage: {
              label: "Ver Ciencia & Seguridad",
              href: "/science"
            },
            category: "pioneros"
          },
          {
            id: "cocineras-anonimas",
            name: "Cocineras de pueblo anónimas",
            badge: "Tradición",
            era: "Transversal (Siglos XVIII - XXI)",
            imageUrl: "/images/personas/cocineras.jpg",
            contribution: "Custodias del equilibrio alquímico entre el huevo y la patata. El contexto histórico y los estudios de hábitos culinarios reconocen en su figura la estandarización de la proporción áurea que define la identidad del plato, manteniendo viva la técnica doméstica frente a la industrialización.",
            relatedPage: {
              label: "Ver Historia & Cronología",
              href: "/history"
            },
            category: "pioneros"
          }
        ]
      },
      {
        id: "maestros",
        title: "2. Maestros de la Restauración y el Sabor",
        description: "Iconos de la gastronomía tradicional y creadores de la reinterpretación inclusiva.",
        personas: [
          {
            id: "pepa-miranda",
            name: "Pepa Miranda (Casa Dani)",
            badge: "Tradición",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/pepa-miranda.jpg",
            contribution: "Referente absoluto de la tortilla de estilo tradicional en Madrid. Su técnica busca el punto de jugosidad extrema, situando su establecimiento como el epicentro del debate entre el placer gastronómico y el rigor térmico necesario para la seguridad alimentaria.",
            relatedPage: {
              label: "Ver Recetas Tradicionales",
              href: "/recipes"
            },
            category: "maestros"
          },
          {
            id: "cris-delantal",
            name: "Cris (Delantal de Alces)",
            badge: "Innovación",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/cris.jpg",
            contribution: "Pionera en la reinterpretación inclusiva de la tortilla. Ha perfeccionado una fórmula vegana y sin gluten utilizando harina de garbanzo y tapioca para emular la textura del huevo, permitiendo que personas con alergias o dietas éticas accedan a este baluarte culinario sin perder la esencia del sabor tradicional.",
            relatedPage: {
              label: "Ver Constructor de Recetas",
              href: "/builder"
            },
            category: "maestros"
          },
          {
            id: "colectivo-excelencia",
            name: "Colectivo de la Excelencia (Azurmendi, Mugaritz, Noor, Casa Marcial)",
            badge: "Innovación",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/colectivo.jpg",
            contribution: "Estos establecimientos representan el estándar de oro en la presentación y digitalización de la gastronomía española. Su apuesta por la calidad visual y la transparencia informativa en sus plataformas define cómo se percibe la tortilla y otros platos icónicos en el escenario de la alta cocina internacional.",
            relatedPage: {
              label: "Ver Técnicas Culinarias",
              href: "/techniques"
            },
            category: "maestros"
          }
        ]
      },
      {
        id: "ciencia",
        title: "3. Ciencia, Seguridad e Investigación",
        description: "Investigadores y consultores centrados en la microbiología y la seguridad alimentaria.",
        personas: [
          {
            id: "alejandro-ortega",
            name: "Alejandro José Ortega Vargas",
            badge: "Ciencia",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/alejandro.jpg",
            contribution: "Investigador especializado en el perfil de riesgo de Salmonella spp. en la tortilla poco cuajada. Mediante el uso de la herramienta Risk Ranger, ha documentado que el consumo tradicional (huevo líquido) es un escenario crítico de exposición. Su trabajo analiza brotes recientes de gran impacto, como el del Trasan Fest en Galicia (2025), donde la falta de tratamiento térmico adecuado resultó en más de 150 afectados, subrayando la urgencia de alcanzar los **70°C** en el centro del producto por **2 minutes**.",
            relatedPage: {
              label: "Ver Ciencia & Microbiología",
              href: "/science"
            },
            category: "ciencia"
          },
          {
            id: "elena-sandri",
            name: "Elena Sandri",
            badge: "Ciencia",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/elena.jpg",
            contribution: "Investigadora sociológica cuyo estudio en The International Journal of Gastronomy and Food Science revela la actual transformación del hogar español: mientras el 59,1% aún cocina a diario, un significativo 40,9% ha abandonado esta práctica, impulsando el auge de las tortillas preparadas y el sector de platos listos para el consumo.",
            relatedPage: {
              label: "Ver Historia & Hábitos",
              href: "/history"
            },
            category: "ciencia"
          },
          {
            id: "natzir-turrado",
            name: "Natzir Turrado",
            badge: "Innovación",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/natzir.jpg",
            contribution: "Consultor experto en Foodtech y SEO internacional. Su análisis destaca que la supervivencia de los negocios de tortilla en la era digital depende de la integración del canal orgánico con la experiencia móvil. Subraya que en el sector de suscripciones de comida saludable, el éxito reside en capturar el tráfico informativo para derivarlo a aplicaciones propias que fidelicen al usuario fuera del vaivén de los algoritmos.",
            relatedPage: {
              label: "Ver Constructor & Personalización",
              href: "/builder"
            },
            category: "ciencia"
          }
        ]
      },
      {
        id: "divulgacion",
        title: "4. Divulgación y Cultura Digital",
        description: "Periodistas, creadores y analistas del ecosistema gastronómico contemporáneo.",
        personas: [
          {
            id: "bree-recker",
            name: "Bree Recker",
            badge: "Divulgación",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/bree-recker.jpg",
            contribution: "Periodista gastronómica y creadora de contenidos ('brieelikethecheese'). Defiende que la 'elección de comida se guía por el sistema visual', por lo que la divulgación de la tortilla debe apoyarse en imágenes de alta fidelidad. Su labor educativa se centra en mejorar la presencia digital de los restaurantes para atraer a un comensal que, en el siglo XXI, 'come primero con los ojos'.",
            relatedPage: {
              label: "Ver Ingredientes & Texturas",
              href: "/ingredients"
            },
            category: "divulgacion"
          },
          {
            id: "jose-luis-nueno",
            name: "José Luis Nueno",
            badge: "Divulgación",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/nueno.jpg",
            contribution: "Profesor, investigador y especialista en comportamiento del consumidor. Sus estudios sobre conveniencia, digitalización del retail y nuevos modelos de consumo ayudan a comprender cómo la tortilla de patatas se adapta al mercado contemporáneo: supermercados online, platos preparados, delivery y soluciones listas para consumir dentro de una industria guiada por la rapidez y comodidad.",
            relatedPage: {
              label: "Ver Historia & Tendencias",
              href: "/history"
            },
            category: "divulgacion"
          },
          {
            id: "taz-skylar-inaki-godoy",
            name: "Taz Skylar (Sanji en One Piece) e Iñaki Godoy",
            badge: "Cultura Pop",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/taz.jpg",
            contribution: "Durante la promoción de la serie live-action de One Piece en Netflix, Taz Skylar (quien interpreta al chef de la tripulación, Sanji, y creció familiarizado con la gastronomía española) protagonizó un debate con su compañero Iñaki Godoy. Su intercambio humorístico cuestionando los ingredientes exactos de la tortilla demostró cómo la pasión, la simplicidad y la confusión que rodean a esta receta tradicional española logran captar la atención de estrellas globales y de las nuevas generaciones.",
            relatedPage: {
              label: "Ver Historia & Cultura",
              href: "/history"
            },
            category: "divulgacion"
          },
          {
            id: "rosalia",
            name: "Rosalía",
            badge: "Cultura Pop",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
            contribution: "La artista internacional catalana demostró el inmenso poder social de este plato al revolucionar Twitter con una simple declaración. Al proclamar públicamente su amor por la tortilla de patatas 'con pan' y especificar rápidamente que la prefiere 'con cebollita', reabrió el eterno debate nacional, logrando miles de retuits y arrastrando a otras celebridades a posicionarse en el bando concebollista o sincebollista.",
            relatedPage: {
              label: "Ver El Eterno Debate",
              href: "/history"
            },
            category: "divulgacion"
          },
          {
            id: "jose-andres",
            name: "José Andrés",
            badge: "Divulgación Internacional",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
            contribution: "Chef español reconocido mundialmente por su incansable labor de difusión de la gastronomía de nuestro país. A través de sus restaurantes (como Jaleo), libros y apariciones públicas, ha defendido este plato como una expresión cultural capaz de viajar más allá de sus fronteras, refiriéndose a la tortilla como 'el plato más importante de la cocina española'. Su visión representa la transición exacta de la tortilla desde la cocina familiar hacia un icono gastronómico internacional. Además de la receta tradicional, ha popularizado versiones de vanguardia, como la famosa 'tortilla exprés' con patatas chips de bolsa, y variantes de autor incorporando ingredientes como atún blanco, queso Idiazábal y pimientos del piquillo asados.",
            relatedPage: {
              label: "Ver Recetas & Cultura",
              href: "/recipes"
            },
            category: "divulgacion"
          }
        ]
      },
      {
        id: "empresa",
        title: "5. Visión Empresarial y Futuro Alimentario",
        description: "Líderes de la industria e impulsores de las nuevas dinámicas de consumo.",
        personas: [
          {
            id: "juan-roig",
            name: "Juan Roig (Mercadona)",
            badge: "Innovación",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
            contribution: "Líder empresarial con la visión disruptiva de que 'a mitad del siglo XXI no habrá cocinas en los hogares'. Bajo esta premisa, ha impulsado un crecimiento del 48% en el sector de platos listos para comer en solo dos años, posicionando la tortilla envasada como el pilar fundamental de una nueva economía de consumo donde la eficiencia y la inmediatez sustituyen a la preparación tradicional.",
            relatedPage: {
              label: "Ver Historia & Cronología",
              href: "/history"
            },
            category: "empresa"
          }
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
          {
            id: "barat",
            name: "José Manuel Barat Baviera",
            badge: "Historia",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/barat.jpg",
            contribution: "Como tutor académico en la Universitat Politècnica de València, ha liderado la formalización científica del plato a través de la tutela de investigaciones críticas. Su labor es fundamental para elevar la tortilla de un saber empírico a un objeto de estudio técnico bajo estándares de ingeniería agronómica.",
            relatedPage: {
              label: "Ver Ciencia & Seguridad",
              href: "/science"
            },
            category: "pioneros"
          },
          {
            id: "cocineras-anonimas",
            name: "Anonymous Village Cooks",
            badge: "Tradición",
            era: "Transversal (18th - 21st Century)",
            imageUrl: "/images/personas/cocineras.jpg",
            contribution: "Guardians of the alchemical balance between egg and potato. Historical studies recognize them for standardizing the golden ratio that defines the dish's identity, keeping domestic technique alive against industrialization.",
            relatedPage: {
              label: "View History & Timeline",
              href: "/history"
            },
            category: "pioneros"
          }
        ]
      },
      {
        id: "maestros",
        title: "2. Master Culinary Craftsmen",
        description: "Icons of traditional gastronomy and pioneers of inclusive culinary reinterpretation.",
        personas: [
          {
            id: "pepa-miranda",
            name: "Pepa Miranda (Casa Dani)",
            badge: "Tradición",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/pepa-miranda.jpg",
            contribution: "Referente absoluto de la tortilla de estilo tradicional en Madrid. Su técnica busca el punto de jugosidad extrema, situando su establecimiento como el epicentro del debate entre el placer gastronómico y el rigor térmico necesario para la seguridad alimentaria.",
            relatedPage: {
              label: "Ver Recetas Tradicionales",
              href: "/recipes"
            },
            category: "maestros"
          },
          {
            id: "cris-delantal",
            name: "Cris (Delantal de Alces)",
            badge: "Innovación",
            era: "Contemporary (21st Century)",
            imageUrl: "/images/personas/cris.jpg",
            contribution: "Pioneer in inclusive reinterpretation. She perfected an allergen-free, vegan formula using chickpea flour and tapioca starch to mimic egg texture without sacrificing traditional taste.",
            relatedPage: {
              label: "View Recipe Builder",
              href: "/builder"
            },
            category: "maestros"
          },
          {
            id: "colectivo-excelencia",
            name: "Excellence Collective (Azurmendi, Mugaritz, Noor, Casa Marcial)",
            badge: "Innovación",
            era: "Contemporary (21st Century)",
            imageUrl: "/images/personas/colectivo.jpg",
            contribution: "These establishments set the gold standard in digital presentation and transparency for Spanish gastronomy, elevating iconic dishes on the international fine-dining stage.",
            relatedPage: {
              label: "View Culinary Techniques",
              href: "/techniques"
            },
            category: "maestros"
          }
        ]
      },
      {
        id: "ciencia",
        title: "3. Science, Safety & Research",
        description: "Researchers and consultants focused on microbiology and food safety.",
        personas: [
          {
            id: "alejandro-ortega",
            name: "Alejandro José Ortega Vargas",
            badge: "Ciencia",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/alejandro.jpg",
            contribution: "Investigador especializado en el perfil de riesgo de Salmonella spp. en la tortilla poco cuajada. Mediante el uso de la herramienta Risk Ranger, ha documentado que el consumo tradicional (huevo líquido) es un escenario crítico de exposición. Su trabajo analiza brotes recientes de gran impacto, como el del Trasan Fest en Galicia (2025), donde la falta de tratamiento térmico adecuado resultó en más de 150 afectados, subrayando la urgencia de alcanzar los **70°C** en el centro del producto por **2 minutes**.",
            relatedPage: {
              label: "Ver Ciencia & Microbiología",
              href: "/science"
            },
            category: "ciencia"
          },
          {
            id: "elena-sandri",
            name: "Elena Sandri",
            badge: "Ciencia",
            era: "Contemporary (21st Century)",
            imageUrl: "/images/personas/elena.jpg",
            contribution: "Sociological researcher whose study in The International Journal of Gastronomy and Food Science reveals how 40.9% of Spanish households no longer cook daily, driving the rise of pre-made ready-to-eat tortillas.",
            relatedPage: {
              label: "View History & Habits",
              href: "/history"
            },
            category: "ciencia"
          },
          {
            id: "natzir-turrado",
            name: "Natzir Turrado",
            badge: "Innovación",
            era: "Contemporary (21st Century)",
            imageUrl: "/images/personas/natzir.jpg",
            contribution: "Foodtech and international SEO consultant. His insights demonstrate how digital channels and mobile apps sustain modern food businesses in healthy subscription markets.",
            relatedPage: {
              label: "View Recipe Builder",
              href: "/builder"
            },
            category: "ciencia"
          }
        ]
      },
      {
        id: "divulgacion",
        title: "4. Media & Digital Culture",
        description: "Journalists, creators, and analysts in the modern food ecosystem.",
        personas: [
          {
            id: "bree-recker",
            name: "Bree Recker",
            badge: "Divulgación",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/bree-recker.jpg",
            contribution: "Periodista gastronómica y creadora de contenidos ('brieelikethecheese'). Defiende que la 'elección de comida se guía por el sistema visual', por lo que la divulgación de la tortilla debe apoyarse en imágenes de alta fidelidad. Su labor educativa se centra en mejorar la presencia digital de los restaurantes para atraer a un comensal que, en el siglo XXI, 'come primero con los ojos'.",
            relatedPage: {
              label: "Ver Ingredientes & Texturas",
              href: "/ingredients"
            },
            category: "divulgacion"
          },
          {
            id: "jose-luis-nueno",
            name: "José Luis Nueno",
            badge: "Divulgación",
            era: "Contemporary (21st Century)",
            imageUrl: "/images/personas/nueno.jpg",
            contribution: "Professor, researcher, and consumer behavior specialist. His studies on convenience, retail digitization, and new consumption models explain how traditional items like the Spanish tortilla adapt to contemporary markets: online supermarkets, ready-to-eat meals, delivery services, and instant food solutions.",
            relatedPage: {
              label: "View History & Trends",
              href: "/history"
            },
            category: "divulgacion"
          },
          {
            id: "taz-skylar-inaki-godoy",
            name: "Taz Skylar (Sanji in One Piece) & Iñaki Godoy",
            badge: "Cultura Pop",
            era: "Contemporary (21st Century)",
            imageUrl: "/images/personas/taz.jpg",
            contribution: "During the promotional tour for Netflix's live-action One Piece series, Taz Skylar (who plays crew cook Sanji and grew up familiar with Spanish cuisine) sparked an animated debate with co-star Iñaki Godoy. Their humorous exchange over traditional tortilla ingredients demonstrated how the passion and debate surrounding this iconic dish capture global audiences.",
            relatedPage: {
              label: "View History & Culture",
              href: "/history"
            },
            category: "divulgacion"
          },
          {
            id: "rosalia",
            name: "Rosalía",
            badge: "Cultura Pop",
            era: "Contemporary (21st Century)",
            imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
            contribution: "The international Spanish music star demonstrated the immense cultural power of this dish by setting social media ablaze. Publicly declaring her love for tortilla 'with bread' and clarifying she prefers it 'with onion', she reignited the eternal national debate on Spanish Twitter, drawing widespread global attention.",
            relatedPage: {
              label: "View Eternal Debate",
              href: "/history"
            },
            category: "divulgacion"
          },
          {
            id: "jose-andres",
            name: "José Andrés",
            badge: "Divulgación Internacional",
            era: "Contemporary (21st Century)",
            imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
            contribution: "World-renowned Spanish chef celebrated for his global promotion of Spanish culinary heritage. Through his restaurants (such as Jaleo), books, and media appearances, he has championed the tortilla as 'the most important dish in Spanish cuisine'. His advocacy highlights the transition of the tortilla from a humble home dish to a global culinary icon. Beyond classic recipes, he popularized innovative variations like the famous 'express potato chip tortilla' and gourmet versions featuring white tuna, Idiazábal cheese, and roasted piquillo peppers.",
            relatedPage: {
              label: "View Recipes & Culture",
              href: "/recipes"
            },
            category: "divulgacion"
          }
        ]
      },
      {
        id: "empresa",
        title: "5. Business Vision & Future Food",
        description: "Industry leaders reshaping modern food consumption.",
        personas: [
          {
            id: "juan-roig",
            name: "Juan Roig (Mercadona)",
            badge: "Innovación",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
            contribution: "Líder empresarial con la visión disruptiva de que 'a mitad del siglo XXI no habrá cocinas en los hogares'. Bajo esta premisa, ha impulsado un crecimiento del 48% en el sector de platos listos para comer en solo dos años, posicionando la tortilla envasada como el pilar fundamental de una nueva economía de consumo donde la eficiencia y la inmediatez sustituyen a la preparación tradicional.",
            relatedPage: {
              label: "Ver Historia & Cronología",
              href: "/history"
            },
            category: "empresa"
          }
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
          {
            id: "barat",
            name: "José Manuel Barat Baviera",
            badge: "Historia",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/barat.jpg",
            contribution: "Como tutor académico en la Universitat Politècnica de València, ha liderado la formalización científica del plato a través de la tutela de investigaciones críticas. Su labor es fundamental para elevar la tortilla de un saber empírico a un objeto de estudio técnico bajo estándares de ingeniería agronómica.",
            relatedPage: {
              label: "Ver Ciencia & Seguridad",
              href: "/science"
            },
            category: "pioneros"
          },
          {
            id: "cocineras-anonimas",
            name: "Anonyme Landköchinnen",
            badge: "Tradición",
            era: "Transversal (18. - 21. Jh.)",
            imageUrl: "/images/personas/cocineras.jpg",
            contribution: "Hüterinnen des alchemistischen Gleichgewichts zwischen Ei und Kartoffel. Sie prägten den Goldenen Schnitt der Zutaten und bewahrten die häusliche Kochkunst gegenüber der Industrialisierung.",
            relatedPage: {
              label: "Geschichte & Zeitleiste",
              href: "/history"
            },
            category: "pioneros"
          }
        ]
      },
      {
        id: "maestros",
        title: "2. Meister der Gastronomie & des Geschmacks",
        description: "Ikonen der traditionellen Gastronomie und Pioniere inklusiver Rezepte.",
        personas: [
          {
            id: "pepa-miranda",
            name: "Pepa Miranda (Casa Dani)",
            badge: "Tradición",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/pepa-miranda.jpg",
            contribution: "Referente absoluto de la tortilla de estilo tradicional en Madrid. Su técnica busca el punto de jugosidad extrema, situando su establecimiento como el epicentro del debate entre el placer gastronómico y el rigor térmico necesario para la seguridad alimentaria.",
            relatedPage: {
              label: "Ver Recetas Tradicionales",
              href: "/recipes"
            },
            category: "maestros"
          },
          {
            id: "cris-delantal",
            name: "Cris (Delantal de Alces)",
            badge: "Innovación",
            era: "Zeitgenössisch (21. Jahrhundert)",
            imageUrl: "/images/personas/cris.jpg",
            contribution: "Pionierin der inklusiven Tortilla. Sie entwickelte ein glutenfreies, veganes Rezept mit Kichererbsenmehl und Tapioka, das die Ei-Textur perfekt nachahmt.",
            relatedPage: {
              label: "Rezept-Baukasten",
              href: "/builder"
            },
            category: "maestros"
          },
          {
            id: "colectivo-excelencia",
            name: "Exzellenz-Kollektiv (Azurmendi, Mugaritz, Noor, Casa Marcial)",
            badge: "Innovación",
            era: "Zeitgenössisch (21. Jahrhundert)",
            imageUrl: "/images/personas/colectivo.jpg",
            contribution: "Diese Restaurants setzen den Goldstandard für digitale Präsentation und Transparenz der spanischen Spitzenküche auf internationaler Bühne.",
            relatedPage: {
              label: "Kochtechniken",
              href: "/techniques"
            },
            category: "maestros"
          }
        ]
      },
      {
        id: "ciencia",
        title: "3. Wissenschaft, Sicherheit & Forschung",
        description: "Experten für Mikrobiologie und Lebensmittelsicherheit.",
        personas: [
          {
            id: "alejandro-ortega",
            name: "Alejandro José Ortega Vargas",
            badge: "Ciencia",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/alejandro.jpg",
            contribution: "Investigador especializado en el perfil de riesgo de Salmonella spp. en la tortilla poco cuajada. Mediante el uso de la herramienta Risk Ranger, ha documentado que el consumo tradicional (huevo líquido) es un escenario crítico de exposición. Su trabajo analiza brotes recientes de gran impacto, como el del Trasan Fest en Galicia (2025), donde la falta de tratamiento térmico adecuado resultó en más de 150 afectados, subrayando la urgencia de alcanzar los **70°C** en el centro del producto por **2 minutes**.",
            relatedPage: {
              label: "Ver Ciencia & Microbiología",
              href: "/science"
            },
            category: "ciencia"
          },
          {
            id: "elena-sandri",
            name: "Elena Sandri",
            badge: "Ciencia",
            era: "Zeitgenössisch (21. Jahrhundert)",
            imageUrl: "/images/personas/elena.jpg",
            contribution: "Soziologische Forscherin, deren Studien zeigen, dass 40,9 % der spanischen Haushalte nicht mehr täglich kochen, was den Markt für Fertigtortillas antreibt.",
            relatedPage: {
              label: "Geschichte & Gewohnheiten",
              href: "/history"
            },
            category: "ciencia"
          },
          {
            id: "natzir-turrado",
            name: "Natzir Turrado",
            badge: "Innovación",
            era: "Zeitgenössisch (21. Jahrhundert)",
            imageUrl: "/images/personas/natzir.jpg",
            contribution: "Foodtech- und SEO-Berater. Seine Arbeit analysiert, wie digitale Kanäle und Apps moderne Verpflegungsmodelle nachhaltig sichern.",
            relatedPage: {
              label: "Rezept-Baukasten",
              href: "/builder"
            },
            category: "ciencia"
          }
        ]
      },
      {
        id: "divulgacion",
        title: "4. Medien & Digitale Kultur",
        description: "Journalisten, Content-Creator und Trendanalysten.",
        personas: [
          {
            id: "bree-recker",
            name: "Bree Recker",
            badge: "Divulgación",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "/images/personas/bree-recker.jpg",
            contribution: "Periodista gastronómica y creadora de contenidos ('brieelikethecheese'). Defiende que la 'elección de comida se guía por el sistema visual', por lo que la divulgación de la tortilla debe apoyarse en imágenes de alta fidelidad. Su labor educativa se centra en mejorar la presencia digital de los restaurantes para atraer a un comensal que, en el siglo XXI, 'come primero con los ojos'.",
            relatedPage: {
              label: "Ver Ingredientes & Texturas",
              href: "/ingredients"
            },
            category: "divulgacion"
          },
          {
            id: "jose-luis-nueno",
            name: "José Luis Nueno",
            badge: "Divulgación",
            era: "Zeitgenössisch (21. Jahrhundert)",
            imageUrl: "/images/personas/nueno.jpg",
            contribution: "Professor, Forscher und Spezialist für Konsumentenverhalten. Seine Studien zu Convenience, Retail-Digitalisierung und neuen Konsummodellen erklären, wie sich traditionelle Produkte wie die Kartoffeltortilla an den modernen Lebensmittelmarkt anpassen: Online-Supermärkte, Fertiggerichte und Lieferdienste.",
            relatedPage: {
              label: "Geschichte & Trends",
              href: "/history"
            },
            category: "divulgacion"
          },
          {
            id: "taz-skylar-inaki-godoy",
            name: "Taz Skylar (Sanji in One Piece) & Iñaki Godoy",
            badge: "Cultura Pop",
            era: "Gegenwart (21. Jahrhundert)",
            imageUrl: "/images/personas/taz.jpg",
            contribution: "Während der Promo-Tour für die Netflix-Live-Action-Serie One Piece löste Taz Skylar (der den Schiffskoch Sanji spielt) mit seinem Co-Star Iñaki Godoy eine humorvolle Debatte über die Zutaten der echten spanischen Tortilla de Patatas aus und begeisterte ein weltweites Millionenpublikum.",
            relatedPage: {
              label: "Geschichte & Popkultur",
              href: "/history"
            },
            category: "divulgacion"
          },
          {
            id: "rosalia",
            name: "Rosalía",
            badge: "Cultura Pop",
            era: "Gegenwart (21. Jahrhundert)",
            imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
            contribution: "Die internationale spanische Musikerin bewies die enorm kulturelle Strahlkraft dieses Gerichts in den sozialen Medien. Als sie ihre Liebe für Tortilla 'mit Brot' und 'mit Zwiebeln' verkündete, entfachte sie erneut die ewige nationale Debatte in Spanien und zog weltweite Aufmerksamkeit auf sich.",
            relatedPage: {
              label: "Geschichte & Debatte",
              href: "/history"
            },
            category: "divulgacion"
          },
          {
            id: "jose-andres",
            name: "José Andrés",
            badge: "Divulgación Internacional",
            era: "Gegenwart (21. Jahrhundert)",
            imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
            contribution: "Weltberühmter spanischer Chefkoch, der sich unermüdlich für die Verbreitung der spanischen Gastronomie einsetzt. Über seine Restaurants (wie Jaleo), Bücher und TV-Auftritte bezeichnet er die Tortilla als 'das wichtigste Gericht der spanischen Küche'. Neben der traditionellen Zubereitung popularisierte er auch vanguardistische Versionen wie die 'Express-Chips-Tortilla' sowie Kreationen mit Bonito, Idiazábal-Käse und gerösteten Piquillo-Paprikas.",
            relatedPage: {
              label: "Rezepte & Kultur",
              href: "/recipes"
            },
            category: "divulgacion"
          }
        ]
      },
      {
        id: "empresa",
        title: "5. Wirtschaftsvision & Zukunft der Ernährung",
        description: "Unternehmer, die den Lebensmittelmarkt transformieren.",
        personas: [
          {
            id: "juan-roig",
            name: "Juan Roig (Mercadona)",
            badge: "Innovación",
            era: "Contemporánea (Siglo XXI)",
            imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
            contribution: "Líder empresarial con la visión disruptiva de que 'a mitad del siglo XXI no habrá cocinas en los hogares'. Bajo esta premisa, ha impulsado un crecimiento del 48% en el sector de platos listos para comer en solo dos años, posicionando la tortilla envasada como el pilar fundamental de una nueva economía de consumo donde la eficiencia y la inmediatez sustituyen a la preparación tradicional.",
            relatedPage: {
              label: "Ver Historia & Cronología",
              href: "/history"
            },
            category: "empresa"
          }
        ]
      }
    ]
  },
};
