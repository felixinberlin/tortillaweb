import React, { useState } from 'react';
import {
  Utensils,
  Heart,
  Sparkles,
  ArrowRight,
  BookOpen,
  Scale,
  Users,
  Clock,
  ChevronRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import LocalizedLink from '@/components/navigation/LocalizedLink';

interface MainHubDirectoryProps {
  lang?: string;
}

type CravingFilter = 'all' | 'runny' | 'onion' | 'classic' | 'express' | 'country';

export default function MainHubDirectory({ lang = 'es' }: MainHubDirectoryProps) {
  const currentLang = (lang === 'es' || lang === 'en' || lang === 'de') ? lang : 'es';
  const [activeCraving, setActiveCraving] = useState<CravingFilter>('all');

  const t = {
    es: {
      recipeSectionBadge: 'Las Grandes Joyas del Cuaderno',
      recipeSectionTitle: 'Elige tu Tortilla de Hoy',
      recipeSectionSubtitle: '¿Cómo te apetece el bocado perfecto? Selecciona tu antojo o explora las recetas maestras de nuestra cocina.',
      viewAllRecipes: 'Ver las 25 recetas del cuaderno completo',
      cookThis: 'Ver receta paso a paso',
      timeLabel: 'Tiempo',
      skilletLabel: 'Sartén ideal',
      pairingLabel: 'Acompañamiento',
      
      cravings: {
        all: '✨ Todas las favoritas',
        runny: '🥖 Para mojar pan (Melosas)',
        onion: '🧅 Con cebolla caramelizada',
        classic: '⭐ Purista (Solo patata y huevo)',
        express: '⚡ Rápida en 15 minutos',
        country: '🫑 Rústica de campo & jamón',
      },

      notesSectionBadge: 'Notas al Margen de la Abuela',
      notesSectionTitle: 'Trucos que no Vienen en los Libros',
      notesSectionSubtitle: 'Consejos transmitidos de boca a oreja frente a los fogones para que nunca falle.',

      ritualSectionBadge: 'El Ritual de la Cocina Lenta',
      ritualSectionTitle: 'Los Tres Secretos de la Abuela',
      ritualSectionSubtitle: 'No hacen falta artificios: solo buen producto, paciencia y el cariño de quien cocina para los suyos.',

      doorsSectionBadge: 'Rincones del Cuaderno',
      doorsSectionTitle: 'Herramientas para Disfrutar en Casa',
      doorsSectionSubtitle: 'Calcula tus porciones a medida, únete a la tertulia más sabrosa o cocina con el temporizador al lado del fuego.',
    },
    en: {
      recipeSectionBadge: 'The Notebook’s Culinary Jewels',
      recipeSectionTitle: 'Choose Today’s Perfect Omelette',
      recipeSectionSubtitle: 'What texture are you craving right now? Pick your mood or explore our canonical kitchen recipes.',
      viewAllRecipes: 'Browse all 25 recipes in the notebook',
      cookThis: 'View step-by-step recipe',
      timeLabel: 'Total time',
      skilletLabel: 'Ideal skillet',
      pairingLabel: 'Best paired with',

      cravings: {
        all: '✨ All favorites',
        runny: '🥖 Runny yolk to dip bread',
        onion: '🧅 Sweet caramelized onion',
        classic: '⭐ Purist (Potato & egg only)',
        express: '⚡ Quick 15-minute fix',
        country: '🫑 Rustic country ham & peppers',
      },

      notesSectionBadge: 'Grandma’s Margin Notes',
      notesSectionTitle: 'Tricks You Won’t Find in Textbooks',
      notesSectionSubtitle: 'Heirloom culinary advice whispered around the kitchen stove for foolproof success.',

      ritualSectionBadge: 'The Slow Kitchen Ritual',
      ritualSectionTitle: 'Grandma’s Three Golden Secrets',
      ritualSectionSubtitle: 'No shortcuts needed: just honest ingredients, gentle patience, and the joy of feeding loved ones.',

      doorsSectionBadge: 'Kitchen Notebook Corners',
      doorsSectionTitle: 'Handy Tools to Enjoy at Home',
      doorsSectionSubtitle: 'Scale your eggs and potatoes, join the lively onion debate, or cook hands-free with the kitchen assistant.',
    },
    de: {
      recipeSectionBadge: 'Die Kronjuwelen des Kochbuchs',
      recipeSectionTitle: 'Wähle deine heutige Tortilla',
      recipeSectionSubtitle: 'Welche Textur wünschst du dir heute? Wähle deinen Heißhunger oder entdecke die Meister-Rezepte.',
      viewAllRecipes: 'Alle 25 Rezepte im Kochbuch ansehen',
      cookThis: 'Schritt-für-Schritt-Rezept',
      timeLabel: 'Zubereitungszeit',
      skilletLabel: 'Ideale Pfanne',
      pairingLabel: 'Servierempfehlung',

      cravings: {
        all: '✨ Alle Favoriten',
        runny: '🥖 Flüssiger Kern zum Eintauchen',
        onion: '🧅 Mit süß karamellisierter Zwiebel',
        classic: '⭐ Puristisch (Nur Kartoffel & Ei)',
        express: '⚡ 15-Minuten-Express',
        country: '🫑 Rustikal mit Schinken & Paprika',
      },

      notesSectionBadge: 'Omas handschriftliche Randnotizen',
      notesSectionTitle: 'Küchentricks, die in keinem Lehrbuch stehen',
      notesSectionSubtitle: 'Von Generation zu Generation weitergegebene Kniffe für das perfekte Gelingen am Herd.',

      ritualSectionBadge: 'Das Ritual der langsamen Küche',
      ritualSectionTitle: 'Omas drei goldene Geheimnisse',
      ritualSectionSubtitle: 'Keine Zauberei: nur ehrliche Rohstoffe, sanfte Geduld und Hingabe am Herd.',

      doorsSectionBadge: 'Kapitel des Notizbuchs',
      doorsSectionTitle: 'Praktische Helfer für die heimische Küche',
      doorsSectionSubtitle: 'Portionsgrößen exakt berechnen, bei der Zwiebeldebatte mitstimmen oder den Küchentimer nutzen.',
    },
  }[currentLang];

  const featuredRecipes = [
    {
      id: 'clasica',
      cravingCategory: 'classic',
      name: currentLang === 'es' ? 'La Clásica de Toda la Vida' : currentLang === 'de' ? 'Omas Goldene Klassikerin' : 'Grandma’s Golden Classic',
      badge: currentLang === 'es' ? 'Reconfortante & Dorada' : currentLang === 'de' ? 'Klassisch & Saftig' : 'Comforting & Golden',
      texture: currentLang === 'es' ? 'Tierna, jugosa y equilibrada' : currentLang === 'de' ? 'Zart, saftig und vollendet' : 'Tender, juicy, and balanced',
      desc: currentLang === 'es'
        ? 'El sabor de los domingos en familia. Patata Monalisa confitada despacio en virgen extra, huevos camperos y una pizca de sal marina.'
        : currentLang === 'de'
        ? 'Der Geschmack von sonntäglichen Familientischen. In kaltgepresstem Olivenöl geschmorte Kartoffeln und herrlich frische Freilandeier.'
        : 'The unforgettable taste of family Sundays. Potatoes poached slowly in extra virgin olive oil, rich pasture eggs, and pure sea salt.',
      href: '/recipes/tortilla-clasica',
      accent: '#FFB800',
      tag: '⭐ Canónica',
      time: '40 min',
      skillet: '24 cm',
      pairing: currentLang === 'es' ? 'Hogaza de pueblo y tomate' : currentLang === 'de' ? 'Bauernbrot & Tomaten' : 'Rustic sourdough & tomato',
    },
    {
      id: 'betanzos',
      cravingCategory: 'runny',
      name: currentLang === 'es' ? 'La Mítica Betanzos' : currentLang === 'de' ? 'Betanzos mit flüssigem Kern' : 'Legendary Betanzos Runny Yolk',
      badge: currentLang === 'es' ? 'Río de Oro Líquido' : currentLang === 'de' ? 'Goldener Schmelz' : 'River of Golden Yolk',
      texture: currentLang === 'es' ? 'Ultra melosa y desbordante' : currentLang === 'de' ? 'Flüssig-cremiger Kern' : 'Ultra runny, velvety flow',
      desc: currentLang === 'es'
        ? 'Al primer corte con el tenedor, una yema templada inunda el plato pidiendo pan a gritos. Fuego vivo, cuajado de apenas un minuto y sin cebolla.'
        : currentLang === 'de'
        ? 'Beim ersten Gabelstich fließt der lauwarme Dotter über den Teller. Scharfes Anbraten, ultrakurze Garzeit, pure Saftigkeit ohne Zwiebel.'
        : 'Upon the first fork cut, a warm stream of rich yolk cascades across the plate. High heat, one-minute lightning set, and strictly onion-free.',
      href: '/recipes/tortilla-betanzos',
      accent: '#FFA000',
      tag: '🥖 Para mojar pan',
      time: '30 min',
      skillet: '22 cm',
      pairing: currentLang === 'es' ? 'Pan gallego de corteza crujiente' : currentLang === 'de' ? 'Krustenbrot zum Tunken' : 'Crusty artisan bread',
    },
    {
      id: 'cebolla',
      cravingCategory: 'onion',
      name: currentLang === 'es' ? 'Confitada con Cebolla Dulce' : currentLang === 'de' ? 'Mit sanft geschmorter Zwiebel' : 'Slow Sweet Onion Confit',
      badge: currentLang === 'es' ? 'Dulzura Natural & Melosidad' : currentLang === 'de' ? 'Natursüß & Schmelzend' : 'Natural Sweetness & Silk',
      texture: currentLang === 'es' ? 'Sedosa, melosa y aromática' : currentLang === 'de' ? 'Seidig-weich und aromatisch' : 'Silky, tender, and fragrant',
      desc: currentLang === 'es'
        ? 'Cebolla cortada en juliana fina y caramelizada a fuego suave durante 45 minutos en su propio jugo. Un bocado suave que acaricia el paladar.'
        : currentLang === 'de'
        ? 'Fein geschnittene Zwiebeln, 45 Minuten sanft im eigenen Saft karamellisiert. Der ideale Schmelz zwischen süß und herzhaft.'
        : 'Onions thinly sliced and slow-caramelized in their natural juices for 45 minutes. A meltingly soft bite of comforting sweetness.',
      href: '/recipes/tortilla-clasica-con-cebolla',
      accent: '#8D6E63',
      tag: '🧅 Fuego lento',
      time: '55 min',
      skillet: '24 cm',
      pairing: currentLang === 'es' ? 'Vino tinto joven o sidra fresca' : currentLang === 'de' ? 'Frischer Cidre oder Rotwein' : 'Crisp cider or light red wine',
    },
    {
      id: 'express',
      cravingCategory: 'express',
      name: currentLang === 'es' ? 'La Exprés de Patatas Chips' : currentLang === 'de' ? '15-Minuten Chips-Tortilla' : 'Express Artisan Chip Omelette',
      badge: currentLang === 'es' ? 'Crujiente & Salvavidas' : currentLang === 'de' ? 'Genial & Blitzschnell' : 'Crunchy & Genius Quick',
      texture: currentLang === 'es' ? 'Sorprendentemente jugosa y aireada' : currentLang === 'de' ? 'Überraschend saftig und locker' : 'Surprisingly light and fluffy',
      desc: currentLang === 'es'
        ? 'La genialidad de Ferran Adrià para una cena imprevista. Patatas chips artesanas al punto de sal remojadas 5 minutos en huevo batido. Lista en lo que tardas en poner la mesa.'
        : currentLang === 'de'
        ? 'Die geniale Idee von Ferran Adrià für den spontanen Genuss: Hochwertige Kartoffelchips 5 Minuten in geschlagenem Ei einweichen. Fertig in 15 Minuten!'
        : 'Ferran Adrià’s legendary kitchen revelation. Premium kettle chips soaked 5 minutes in beaten eggs. Ready in less time than it takes to set the table.',
      href: '/recipes/tortilla-express-patatas-chips',
      accent: '#00A3FF',
      tag: '⚡ 15 Minutos',
      time: '15 min',
      skillet: '20 cm',
      pairing: currentLang === 'es' ? 'Caña bien tirada y aceitunas' : currentLang === 'de' ? 'Kühles Bier & Oliven' : 'Cold draft beer & olives',
    },
    {
      id: 'paisana',
      cravingCategory: 'country',
      name: currentLang === 'es' ? 'La Paisana de Huerta & Jamón' : currentLang === 'de' ? 'Paisana mit Gartengemüse & Schinken' : 'Country Paisana with Ham & Peppers',
      badge: currentLang === 'es' ? 'Alegría & Sabor de Campo' : currentLang === 'de' ? 'Rustikal & Farbenfroh' : 'Rustic Country Flavors',
      texture: currentLang === 'es' ? 'Contundente y llena de contrastes' : currentLang === 'de' ? 'Herzhaft und voller Texturen' : 'Hearty with lively contrasts',
      desc: currentLang === 'es'
        ? 'Pimientos rojos asados, taquitos de jamón ibérico y verduritas salteadas que se abrazan a la patata tierna. Rústica, colorida y reconfortante.'
        : currentLang === 'de'
        ? 'Gebratene Paprika, feine Schinkenwürfel und zarte Kartoffeln. Eine bunte, kräftige Hommage an die spanische Landschaftsküche.'
        : 'Roasted bell peppers, diced cured Iberian ham, and garden vegetables folded into tender potatoes. Vibrant, hearty, and full of soul.',
      href: '/recipes/tortilla-paisana',
      accent: '#D32F2F',
      tag: '🫑 De la huerta',
      time: '45 min',
      skillet: '26 cm',
      pairing: currentLang === 'es' ? 'Ensalada fresca de cogollos' : currentLang === 'de' ? 'Knackiger grüner Salat' : 'Crisp butter lettuce salad',
    },
  ];

  const filteredRecipes = activeCraving === 'all'
    ? featuredRecipes.slice(0, 4)
    : featuredRecipes.filter(r => r.cravingCategory === activeCraving);

  const notebookMarginNotes = [
    {
      title: currentLang === 'es' ? 'La Prueba del Aceite' : currentLang === 'de' ? 'Der Kartoffel-Öltest' : 'The Potato Oil Test',
      body: currentLang === 'es'
        ? '¿Cómo saber si el aceite está a la temperatura adecuada? Echa un trocito de patata: si sube a la superficie rodeado de un suave manto de burbujas sin dorarse de golpe, tienes los 130°C–140°C ideales para pochar sin prisa.'
        : currentLang === 'de'
        ? 'Wie erkennt man die richtige Öltemperatur? Gib ein kleines Kartoffelstück ins Öl: Steigt es sanft auf und bildet ruhige, kleine Bläschen ohne zu verbrennen, hast du die perfekten 130°C–140°C zum langsamen Pochieren.'
        : 'How to test if the oil is just right? Drop a small potato slice in: if it floats with gentle, quiet bubbles without browning immediately, your oil is at the sweet 130°C–140°C poach range.',
      pin: '📌',
    },
    {
      title: currentLang === 'es' ? 'El Truco del Plato Húmedo' : currentLang === 'de' ? 'Der feuchte Wende-Teller' : 'The Damp Plate Trick',
      body: currentLang === 'es'
        ? 'Usa un plato llano sin borde hondo, que sobresalga al menos 2 cm de la sartén. Humedécelo apenas con una gota de aceite o unas gotas de agua antes de volcar: la tortilla resbalará de nuevo a la sartén como por una pista de patinaje, sin pegarse ni romperse.'
        : currentLang === 'de'
        ? 'Nimm einen flachen Teller ohne hohen Rand, der mindestens 2 cm über die Pfanne ragt. Befeuchte ihn mit einem Tropfen Öl oder Wasser vor dem Wenden: Die Tortilla gleitet federleicht zurück in die Pfanne.'
        : 'Use a wide, rimless flat plate that extends at least 2 cm past your pan. Moisten it with a drop of olive oil or water before flipping: the omelette will slide back into the pan effortlessly without snagging.',
      pin: '🫒',
    },
    {
      title: currentLang === 'es' ? 'Seguridad & Cariño en la Mesa' : currentLang === 'de' ? 'Sicherheit & Familienglück' : 'Safety & Family Care',
      body: currentLang === 'es'
        ? 'Si te gusta bien jugosa y poco cuajada (**63°C por 20 segundos**), sírvela recién hecha y disfrútala caliente al instante. Si vas a llevarla al campo, al trabajo o guardarla, cuájala a **70°C por 2 minutos** y no la dejes más de **4 horas** fuera de la nevera.'
        : currentLang === 'de'
        ? 'Wenn du sie cremig-flüssig liebst (**63°C für 20 Sekunden**), genieße sie sofort frisch aus der Pfanne. Fürs Picknick oder den nächsten Tag durchgaren bei **70°C für 2 Minuten** und nie länger als **4 Stunden** ungekühlt stehen lassen.'
        : 'If you adore runny tortillas (**63°C for 20 seconds**), serve immediately warm at the table. If taking it to a picnic or keeping leftovers, cook through to **70°C for 2 minutes** and keep under **4 hours** at room temperature.',
      pin: '💛',
    },
    {
      title: currentLang === 'es' ? 'El Tao y el Corte Shokunin' : currentLang === 'de' ? 'Das Tao & die Schnittkunst' : 'The Tao & the Shokunin Cut',
      body: currentLang === 'es'
        ? 'Al igual que en el sushi de Sukiyabashi Jiro, la tortilla no tiene aderezos donde ocultar la mediocridad. Menos ingredientes exigen mayor atención. Descubre el Wu Wei del reposo y la anatomía del corte.'
        : currentLang === 'de'
        ? 'Wie beim Edomae-Sushi von Sukiyabashi Jiro kennt die Tortilla keine Ausreden. Weniger Zutaten verlangen höchste Hingabe: das Wu Wei des Rastens und die Kunst des Wendens.'
        : 'Much like Edomae sushi at Sukiyabashi Jiro, the Spanish tortilla has zero sauces to hide flaws. Fewer ingredients demand deeper mastery: the Wu Wei of the soak and the anatomy of the cut.',
      pin: '🥢',
      href: currentLang === 'es' ? '/guias/el-tao-de-la-tortilla-y-el-sushi' : currentLang === 'de' ? '/anleitungen/das-tao-der-tortilla-und-des-sushis' : '/guides/the-tao-of-tortilla-and-sushi',
      actionText: currentLang === 'es' ? 'Leer ensayo filosófico' : currentLang === 'de' ? 'Meisterklasse lesen' : 'Read Tao masterclass',
    },
  ];

  const secrets = [
    {
      step: '01',
      title: currentLang === 'es' ? 'La Paciencia del Pochado' : currentLang === 'de' ? 'Sanftes Garen ohne Eile' : 'The Patience of the Poach',
      desc: currentLang === 'es'
        ? 'La patata no se fríe deprisa: se confita sin prisa en abundante aceite virgen extra tibio (130°C–140°C). Debe quedar tan tierna que un tenedor la atraviese como si fuera mantequilla, con algún bordecito crujiente.'
        : currentLang === 'de'
        ? 'Die Kartoffelscheiben werden nicht kross frittiert, sondern sanft in reichlich warmem Olivenöl pochiert, bis sie butterweich zerfallen.'
        : 'Never rush the potato: simmer gently in generous warm olive oil (130°C–140°C). The slices should yield effortlessly like butter, with golden toasted edges.',
      note: currentLang === 'es' ? 'Aceite virgen extra + patata Agria o Monalisa' : currentLang === 'de' ? 'Natives Olivenöl + vorwiegend festkochende Kartoffel' : 'Extra virgin olive oil + starchy Agria potato',
    },
    {
      step: '02',
      title: currentLang === 'es' ? 'El Reposo del Huevo Caliente' : currentLang === 'de' ? 'Das 10-Minuten-Rasten' : 'The Warm Egg Soak',
      desc: currentLang === 'es'
        ? 'El gran secreto de los maestros: escurre la patata recién sacada del aceite y mézclala de inmediato con los huevos batidos. Tapa el cuenco y déjalo reposar 10 minutos. La patata absorberá la yema como una esponja tibia.'
        : currentLang === 'de'
        ? 'Heiße Kartoffeln sofort mit den verquirlten Eiern mischen und abgedeckt 10 Minuten ruhen lassen. Die Stärke saugt den Dotter wie ein Schwamm auf.'
        : 'The master cook’s secret: drain the hot potatoes and immediately fold them into gently beaten eggs. Cover and rest for 10 minutes. The potato drinks in the yolk.',
      note: currentLang === 'es' ? 'El truco que multiplica la jugosidad por diez' : currentLang === 'de' ? 'Verleiht unübertroffene Cremigkeit' : 'The single trick that guarantees maximum juiciness',
    },
    {
      step: '03',
      title: currentLang === 'es' ? 'El Volteo Decidido con Plato Llano' : currentLang === 'de' ? 'Der beherzte Pfannenschwung' : 'The Confident Flat-Plate Flip',
      desc: currentLang === 'es'
        ? 'Sartén bien engrasada y fuego vivo. Un minuto para sellar la base dorada. Coloca un plato llano más ancho que la sartén, apoya la mano con un trapo, y gira con decisión de muñeca sin vacilar.'
        : currentLang === 'de'
        ? 'Heiße, leicht geölte Pfanne. Eine Minute für die goldene Kruste. Flachen Teller auflegen, Hand mit Tuch fixieren und mit Schwung wenden.'
        : 'Hot, lightly oiled pan. One minute to set a gorgeous golden crust. Place a wide flat plate on top, secure firmly with a kitchen towel, and flip in one swift motion.',
      note: currentLang === 'es' ? 'Seguridad, cariño y aplausos en la mesa' : currentLang === 'de' ? 'Mit Freude und Selbstvertrauen' : 'Confidence, warmth, and cheers at the table',
    },
  ];

  const cozyDoors = [
    {
      icon: Scale,
      title: currentLang === 'es' ? 'Constructor a tu Medida' : currentLang === 'de' ? 'Mengen-Rechner' : 'Custom Recipe Builder',
      desc: currentLang === 'es' ? '¿Sois 2 a la mesa o 6 amigos? Calcula gramos de patatas, huevos y tamaño de sartén exacto.' : currentLang === 'de' ? 'Für 2 Personen oder das große Familienessen: Exakte Gramm und Eieranzahl berechnen.' : 'Cooking for 2 or a feast of 6? Scale exact grams of potatoes, eggs, and skillet diameter.',
      href: '/builder',
      action: currentLang === 'es' ? 'Calcular porciones' : currentLang === 'de' ? 'Portionen berechnen' : 'Calculate portions',
      accent: '#FFB800',
    },
    {
      icon: Users,
      title: currentLang === 'es' ? 'La Tertulia de la Cebolla' : currentLang === 'de' ? 'Die Zwiebel-Debatte' : 'The Onion Debate',
      desc: currentLang === 'es' ? 'El debate culinario más apasionado y entrañable. Lee los manifiestos, vota y defiende tu plato.' : currentLang === 'de' ? 'Spaniens liebste Diskussion: Mit oder ohne Zwiebel? Lies die Argumente und stimme ab.' : 'Spain’s most passionate, good-natured food debate. Read the manifestos, vote, and speak your mind.',
      href: '/facciones',
      action: currentLang === 'es' ? 'Entrar al debate' : currentLang === 'de' ? 'Zur Abstimmung' : 'Join the debate',
      accent: '#8D6E63',
    },
    {
      icon: BookOpen,
      title: currentLang === 'es' ? 'El Manuscrito de 1798' : currentLang === 'de' ? 'Das Archiv von 1798' : 'The 1798 Manuscript',
      desc: currentLang === 'es' ? 'La historia documentada en Villanueva de la Serena. Una fascinante carta de amor a la comida de verdad.' : currentLang === 'de' ? 'Die älteste schriftliche Erwähnung der Tortilla. Eine spannende Reise zu den Wurzeln.' : 'The earliest documented record in Villanueva de la Serena. A charming look at our culinary roots.',
      href: '/history',
      action: currentLang === 'es' ? 'Leer el origen' : currentLang === 'de' ? 'Geschichte lesen' : 'Read the history',
      accent: '#FFA000',
    },
    {
      icon: Clock,
      title: currentLang === 'es' ? 'Asistente de Cocina & Temporizador' : currentLang === 'de' ? 'Küchen-Begleiter mit Timer' : 'Kitchen Cooking Assistant',
      desc: currentLang === 'es' ? 'Pon el móvil junto a la hornilla. Te acompaña paso a paso con avisos cálidos y tiempos perfectos.' : currentLang === 'de' ? 'Schritt für Schritt am Herd: Sanfte Signaltöne und exakte Garzeiten für das beste Ergebnis.' : 'Prop your phone by the stove. Guided audio cues, gentle timers, and foolproof flip reminders.',
      href: '/asistente',
      action: currentLang === 'es' ? 'Cocinar con el asistente' : currentLang === 'de' ? 'Assistent starten' : 'Cook with assistant',
      accent: '#00A3FF',
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 py-12 md:py-20 bg-[#FAF7F0] dark:bg-[#1C1917] transition-colors">
      <div className="container mx-auto max-w-7xl px-4 space-y-16 md:space-y-24">

        {/* 1. INTERACTIVE RECIPE SELECTION & CRAVINGS */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFB800]/15 dark:bg-[#FFB800]/25 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold uppercase tracking-wider border border-[#FFB800]/30 shadow-2xs">
              <Utensils className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>{t.recipeSectionBadge}</span>
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2A2421] dark:text-[#F5E6BE] tracking-tight">
              {t.recipeSectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#7D7067] dark:text-[#D7CCC8] leading-relaxed">
              {t.recipeSectionSubtitle}
            </p>

            {/* Craving Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
              {(Object.keys(t.cravings) as CravingFilter[]).map((key) => {
                const isSelected = activeCraving === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveCraving(key)}
                    className={`text-xs font-bold px-3.5 py-2 rounded-full transition-all border ${
                      isSelected
                        ? 'bg-[#8D6E63] dark:bg-[#FFB800] text-white dark:text-[#1C1917] border-[#8D6E63] dark:border-[#FFB800] shadow-xs'
                        : 'bg-card text-muted-foreground hover:text-foreground border-border hover:border-[#FFB800]/50'
                    }`}
                  >
                    {t.cravings[key]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="card-notebook p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-stacked-parchment hover:shadow-md transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Top Bar with Tag and Badge */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-secondary/80 text-secondary-foreground">
                      {recipe.tag}
                    </span>
                    <span
                      className="text-xs font-bold px-2.5 py-0.5 rounded-md font-mono"
                      style={{
                        backgroundColor: `${recipe.accent}20`,
                        color: recipe.accent,
                      }}
                    >
                      {recipe.badge}
                    </span>
                  </div>

                  {/* Title & Texture */}
                  <div>
                    <h3 className="font-serif-heading text-2xl font-bold text-foreground group-hover:text-[#FFB800] transition-colors">
                      {recipe.name}
                    </h3>
                    <p className="text-xs font-script text-base text-[#8D6E63] dark:text-[#FFB800] mt-0.5">
                      {recipe.texture}
                    </p>
                  </div>

                  {/* Appetite-stimulating description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {recipe.desc}
                  </p>

                  {/* Cooking specs: Time, Skillet, Pairing */}
                  <div className="pt-2 grid grid-cols-3 gap-2 text-xs border-t border-border/40">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground/70 block">
                        {t.timeLabel}
                      </span>
                      <span className="font-bold text-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FFB800]" />
                        {recipe.time}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground/70 block">
                        {t.skilletLabel}
                      </span>
                      <span className="font-bold text-foreground flex items-center gap-1">
                        <Flame className="w-3 h-3 text-[#FF8A00]" />
                        {recipe.skillet}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground/70 block">
                        {t.pairingLabel}
                      </span>
                      <span className="font-bold text-foreground truncate block">
                        {recipe.pairing}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <LocalizedLink
                    to={recipe.href}
                    lang={currentLang}
                    className="inline-flex items-center gap-2 text-sm font-bold text-foreground group-hover:text-[#FFB800] transition-colors"
                  >
                    <span>{t.cookThis}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#FFB800]" />
                  </LocalizedLink>
                  <span className="text-xl select-none opacity-80 group-hover:scale-110 transition-transform">
                    🍳
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* All Recipes Button Banner */}
          <div className="text-center pt-4">
            <LocalizedLink
              to="/recipes"
              lang={currentLang}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-card hover:bg-secondary/70 border border-border hover:border-[#FFB800] text-foreground font-bold text-sm shadow-2xs hover:shadow-xs transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#FFB800]" />
              <span>{t.viewAllRecipes}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </LocalizedLink>
          </div>
        </section>

        {/* 2. GRANDMA'S THREE SLOW-COOKING SECRETS */}
        <section className="card-notebook p-6 sm:p-10 md:p-12 rounded-3xl bg-card border border-border shadow-stacked-parchment space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FF8A00]/15 text-[#FF8A00] text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-[#FF8A00]" />
              <span>{t.ritualSectionBadge}</span>
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
              {t.ritualSectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t.ritualSectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-2">
            {secrets.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-secondary/30 border border-border/70 space-y-3 flex flex-col justify-between hover:bg-secondary/50 transition-colors"
              >
                <div className="space-y-3">
                  <span className="text-2xl sm:text-3xl font-serif-heading font-black text-[#FFB800] block">
                    {item.step}
                  </span>
                  <h3 className="font-serif-heading text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-border/50">
                  <span className="text-[11px] font-bold text-[#8D6E63] dark:text-[#F5E6BE] block">
                    ✨ {item.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. GRANDMA'S MARGIN NOTES (PARCHMENT KITCHEN SECRETS) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8D6E63]/15 dark:bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold uppercase tracking-wider border border-[#8D6E63]/30 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>{t.notesSectionBadge}</span>
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2A2421] dark:text-[#F5E6BE] tracking-tight">
              {t.notesSectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#7D7067] dark:text-[#D7CCC8] leading-relaxed">
              {t.notesSectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {notebookMarginNotes.map((note, idx) => (
              <div
                key={idx}
                className="relative p-6 sm:p-7 rounded-2xl bg-card border border-border shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-3">
                  {/* Decorative Pin/Tape */}
                  <div className="absolute -top-3 left-6 text-xl select-none">
                    {note.pin}
                  </div>

                  <h3 className="font-serif-heading text-lg font-bold text-foreground pt-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                    <span>{note.title}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {note.body}
                  </p>
                </div>

                {note.href && (
                  <div className="pt-2 border-t border-border/40">
                    <LocalizedLink
                      to={note.href}
                      lang={currentLang}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFB800] hover:underline"
                    >
                      <span>{note.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </LocalizedLink>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4. FOUR WARM KITCHEN CORNERS */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00A3FF]/15 text-[#00A3FF] text-xs font-bold uppercase tracking-wider border border-[#00A3FF]/30 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00A3FF]" />
              <span>{t.doorsSectionBadge}</span>
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2A2421] dark:text-[#F5E6BE] tracking-tight">
              {t.doorsSectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#7D7067] dark:text-[#D7CCC8] leading-relaxed">
              {t.doorsSectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cozyDoors.map((door, i) => {
              const Icon = door.icon;
              return (
                <LocalizedLink
                  key={i}
                  to={door.href}
                  lang={currentLang}
                  className="card-notebook p-6 rounded-2xl bg-card border border-border shadow-2xs hover:shadow-xs hover:border-[#FFB800] transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-[#1C1917] shadow-2xs shrink-0"
                      style={{ backgroundColor: door.accent }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif-heading text-lg font-bold text-foreground group-hover:text-[#FFB800] transition-colors leading-snug">
                      {door.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {door.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs font-bold text-[#8D6E63] dark:text-[#FFB800] group-hover:translate-x-0.5 transition-transform">
                    <span>{door.action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </LocalizedLink>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
