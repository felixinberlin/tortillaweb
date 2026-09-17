#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { optimizeSvg } from '../src/domain/svg/svgOptimizer';

const outputDir = path.join(process.cwd(), 'public', 'images', 'personas');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

interface PersonaDef {
  filename: string;
  name: string;
  role: string;
  era: string;
  badge: string;
  primaryColor: string;
  secondaryColor: string;
  iconSymbol: string;
}

const PERSONAS: PersonaDef[] = [
  {
    filename: 'barat.svg',
    name: 'D. Joseph de Barat',
    role: 'Cronista Fundacional (1798)',
    era: 'Siglo XVIII · Villanueva de la Serena',
    badge: 'DOCUMENTO FUNDACIONAL 1798',
    primaryColor: '#8D6E63',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <!-- 18th Century Quill & Agrarian Parchment -->
      <circle cx="150" cy="95" r="48" fill="#2E241E" stroke="#8D6E63" stroke-width="3" />
      <path d="M130 115 L145 75 L165 65 Q160 85 140 110 Z" fill="#F5E6BE" stroke="#8D6E63" stroke-width="1.5" />
      <!-- Quill feather line -->
      <path d="M145 75 Q170 50 178 40" stroke="#FFB800" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <!-- Parchment Scroll -->
      <rect x="125" y="112" width="50" height="18" rx="4" fill="#F5E6BE" stroke="#8D6E63" stroke-width="1.5" />
      <line x1="132" y1="118" x2="168" y2="118" stroke="#8D6E63" stroke-width="1" stroke-dasharray="2 2" />
      <line x1="132" y1="123" x2="160" y2="123" stroke="#8D6E63" stroke-width="1" stroke-dasharray="2 2" />
    `,
  },
  {
    filename: 'cocineras.svg',
    name: 'Las Cocineras Anónimas',
    role: 'Matriarcas de la Tradición Oral',
    era: 'Tradición Viva · Hogares Españoles',
    badge: 'MEMORIA CULINARIA',
    primaryColor: '#D32F2F',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <!-- Traditional Wooden Spoon & Grandmother Copper Pan -->
      <circle cx="150" cy="95" r="48" fill="#261A18" stroke="#D32F2F" stroke-width="3" />
      <!-- Copper skillet -->
      <ellipse cx="150" cy="100" rx="32" ry="20" fill="#B45309" stroke="#FFB800" stroke-width="2" />
      <ellipse cx="150" cy="100" rx="26" ry="15" fill="#FFB800" />
      <!-- Wooden spoon crossed -->
      <path d="M125 125 L165 70" stroke="#78350F" stroke-width="5" stroke-linecap="round" />
      <ellipse cx="168" cy="66" rx="8" ry="12" fill="#78350F" transform="rotate(-30 168 66)" />
      <ellipse cx="168" cy="66" rx="5" ry="8" fill="#F5E6BE" transform="rotate(-30 168 66)" />
    `,
  },
  {
    filename: 'pepa-miranda.svg',
    name: 'Pepa Miranda',
    role: 'Reina del Estilo Betanzos',
    era: 'Betanzos, Galicia · Oro Líquido',
    badge: 'MAESTRA DE BETANZOS',
    primaryColor: '#FFB800',
    secondaryColor: '#00A3FF',
    iconSymbol: `
      <!-- Blazing Gas Flame & Molten Yolk Waterfall -->
      <circle cx="150" cy="95" r="48" fill="#1C1917" stroke="#FFB800" stroke-width="3" />
      <!-- Blue Flame of Betanzos burner -->
      <path d="M135 125 Q140 108 145 118 Q150 102 155 118 Q160 108 165 125 Z" fill="#00A3FF" opacity="0.9" />
      <!-- Skillet with Liquid Center -->
      <ellipse cx="150" cy="90" rx="34" ry="18" fill="#2E241E" stroke="#FFB800" stroke-width="2" />
      <ellipse cx="150" cy="90" rx="28" ry="13" fill="#F5E6BE" />
      <!-- Molten egg yolk explosion -->
      <circle cx="150" cy="90" r="12" fill="#FFB800" stroke="#EA580C" stroke-width="1.5" />
      <path d="M148 94 Q150 115 152 105" stroke="#FFB800" stroke-width="3" stroke-linecap="round" />
    `,
  },
  {
    filename: 'cris.svg',
    name: 'Cris del Delantal',
    role: 'Defensora del Mercado & Monalisa',
    era: 'Maestría Contemporánea',
    badge: 'SELECCIÓN DE ORIGEN',
    primaryColor: '#2E7D32',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <!-- Wicker Basket & Farm Egg Harvest -->
      <circle cx="150" cy="95" r="48" fill="#1A241C" stroke="#2E7D32" stroke-width="3" />
      <!-- Woven Basket -->
      <path d="M125 95 Q150 120 175 95 Z" fill="#78350F" stroke="#F5E6BE" stroke-width="1.5" />
      <!-- Three Fresh Eggs peaking out -->
      <ellipse cx="140" cy="90" rx="7" ry="10" fill="#FEF3C7" stroke="#D97706" stroke-width="1" />
      <ellipse cx="150" cy="86" rx="8" ry="11" fill="#FEF3C7" stroke="#D97706" stroke-width="1" />
      <ellipse cx="160" cy="90" rx="7" ry="10" fill="#FEF3C7" stroke="#D97706" stroke-width="1" />
    `,
  },
  {
    filename: 'colectivo.svg',
    name: 'Colectivo de Excelencia',
    role: 'Gremio de Taberneros Tradicionales',
    era: 'Patrimonio Popular Compartido',
    badge: 'GREMIO TABERNERO',
    primaryColor: '#D97706',
    secondaryColor: '#8D6E63',
    iconSymbol: `
      <!-- Crossed Twin Spatulas with Golden Laurel -->
      <circle cx="150" cy="95" r="48" fill="#201C19" stroke="#D97706" stroke-width="3" />
      <!-- Crossed spatulas -->
      <path d="M125 125 L175 65" stroke="#E5E7EB" stroke-width="4" stroke-linecap="round" />
      <path d="M175 125 L125 65" stroke="#E5E7EB" stroke-width="4" stroke-linecap="round" />
      <!-- Laurel circle -->
      <circle cx="150" cy="95" r="28" fill="none" stroke="#FFB800" stroke-width="2" stroke-dasharray="4 4" />
      <circle cx="150" cy="95" r="8" fill="#FFB800" />
    `,
  },
  {
    filename: 'alejandro.svg',
    name: 'Alejandro Ortega',
    role: 'Físico Culinario & Viscosidad',
    era: 'Termodinámica Aplicada',
    badge: 'CIENCIA & TERMODINÁMICA',
    primaryColor: '#00A3FF',
    secondaryColor: '#D32F2F',
    iconSymbol: `
      <!-- Digital Probe Thermometer reading 70°C for 2 min -->
      <circle cx="150" cy="95" r="48" fill="#141E28" stroke="#00A3FF" stroke-width="3" />
      <!-- Probe Needle -->
      <path d="M135 120 L155 75" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
      <!-- Digital Gauge Head -->
      <rect x="145" y="58" width="30" height="20" rx="4" fill="#0F172A" stroke="#00A3FF" stroke-width="1.5" />
      <text x="160" y="72" fill="#38BDF8" font-family="monospace" font-size="9" font-weight="bold" text-anchor="middle">70°C</text>
      <!-- Coagulation Heat Waves -->
      <path d="M128 105 Q135 98 142 105 Q149 112 156 105" fill="none" stroke="#EF4444" stroke-width="1.5" />
    `,
  },
  {
    filename: 'elena.svg',
    name: 'Elena Sandri',
    role: 'Historiadora & Etnógrafa Gastronómica',
    era: 'Investigación Archivística CSIC',
    badge: 'ETNOGRAFÍA HISTÓRICA',
    primaryColor: '#8D6E63',
    secondaryColor: '#2E7D32',
    iconSymbol: `
      <!-- Compass Rose & Historical Treaty -->
      <circle cx="150" cy="95" r="48" fill="#241E1C" stroke="#8D6E63" stroke-width="3" />
      <!-- Compass 4 Points -->
      <polygon points="150,60 154,90 150,95 146,90" fill="#FFB800" />
      <polygon points="150,130 154,100 150,95 146,100" fill="#94A3B8" />
      <polygon points="115,95 145,91 150,95 145,99" fill="#94A3B8" />
      <polygon points="185,95 155,91 150,95 155,99" fill="#FFB800" />
      <circle cx="150" cy="95" r="5" fill="#1C1917" stroke="#FFB800" stroke-width="1.5" />
    `,
  },
  {
    filename: 'natzir.svg',
    name: 'Natzir Turrado',
    role: 'Científico de Datos & Ratio Áureo',
    era: 'Algoritmos Sensoriales',
    badge: 'RATIO MATEMÁTICO',
    primaryColor: '#FFB800',
    secondaryColor: '#00A3FF',
    iconSymbol: `
      <!-- Fibonacci Spiral & Precision Ratio Chart -->
      <circle cx="150" cy="95" r="48" fill="#1A1C24" stroke="#FFB800" stroke-width="3" />
      <!-- Golden Spiral Curve -->
      <path d="M150 95 A 10 10 0 0 1 160 105 A 20 20 0 0 1 140 125 A 35 35 0 0 1 120 75" fill="none" stroke="#FFB800" stroke-width="2" />
      <!-- Data Nodes -->
      <circle cx="150" cy="95" r="3" fill="#00A3FF" />
      <circle cx="160" cy="105" r="3" fill="#00A3FF" />
      <circle cx="140" cy="125" r="3" fill="#00A3FF" />
      <circle cx="120" cy="75" r="3" fill="#00A3FF" />
    `,
  },
  {
    filename: 'bree-recker.svg',
    name: 'Bree Recker',
    role: 'Exploradora Gastronómica & Street Food',
    era: 'Perspectiva Global',
    badge: 'CRÓNICA VIAJERA',
    primaryColor: '#EA580C',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <!-- Camera Lens Frame & Artisanal Bocadillo Pincho -->
      <circle cx="150" cy="95" r="48" fill="#241C18" stroke="#EA580C" stroke-width="3" />
      <!-- Camera Aperture Hexagon -->
      <polygon points="150,68 175,82 175,108 150,122 125,108 125,82" fill="none" stroke="#F5E6BE" stroke-width="2" />
      <!-- Bocadillo wedge inside lens -->
      <path d="M138 90 L162 90 L150 105 Z" fill="#FFB800" stroke="#EA580C" stroke-width="1.5" />
    `,
  },
  {
    filename: 'nueno.svg',
    name: 'Prof. José Luis Nueno',
    role: 'Catedrático de Mercado & Sociología',
    era: 'Consumo & Demografía de la Tapa',
    badge: 'ESTUDIO DE CONSUMO',
    primaryColor: '#475569',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <!-- Sociological Bar Chart & Spanish Flag Color Ribbon -->
      <circle cx="150" cy="95" r="48" fill="#1E293B" stroke="#94A3B8" stroke-width="3" />
      <!-- 3 Bar Columns: 70.4% cebolla, 29.6% sin, etc -->
      <rect x="130" y="95" width="10" height="25" fill="#FFB800" rx="2" />
      <rect x="145" y="75" width="10" height="45" fill="#EA580C" rx="2" />
      <rect x="160" y="85" width="10" height="35" fill="#2E7D32" rx="2" />
      <line x1="125" y1="120" x2="175" y2="120" stroke="#94A3B8" stroke-width="1.5" />
    `,
  },
  {
    filename: 'taz.svg',
    name: 'Taz Skylar & Iñaki Godoy',
    role: 'Cultura Pop & Cocineros de Navío',
    era: 'Energía Joven & Fuego Vivo',
    badge: 'CULTURA POP & VANGUARDIA',
    primaryColor: '#DC2626',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <!-- Dynamic Anime Flame & Black Leg Skillet Kick -->
      <circle cx="150" cy="95" r="48" fill="#1C1917" stroke="#DC2626" stroke-width="3" />
      <!-- Bursting dynamic flame -->
      <path d="M150 60 Q165 80 155 95 Q175 90 165 115 Q145 130 135 110 Q125 90 145 80 Z" fill="#EA580C" />
      <path d="M150 72 Q158 85 152 95 Q162 95 155 108 Q142 118 138 105 Z" fill="#FACC15" />
    `,
  },
  {
    filename: 'rosalia.svg',
    name: 'Rosalía',
    role: 'Icono Motomami & Devota de la Cebolla',
    era: 'Vanguardia Global Flamenca',
    badge: 'MOTOMAMI CON CEBOLLA',
    primaryColor: '#D32F2F',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <!-- Golden Fork, Butterfly & Red Gloss Nail -->
      <circle cx="150" cy="95" r="48" fill="#1C1818" stroke="#D32F2F" stroke-width="3" />
      <!-- Golden Fork -->
      <path d="M150 62 L150 128" stroke="#FFB800" stroke-width="3" stroke-linecap="round" />
      <path d="M142 62 L142 80 Q150 86 158 80 L158 62" stroke="#FFB800" stroke-width="2.5" fill="none" />
      <!-- Butterfly wings silhouette -->
      <path d="M136 90 Q120 75 130 105 Q142 100 145 92" fill="#DC2626" opacity="0.8" />
      <path d="M164 90 Q180 75 170 105 Q158 100 155 92" fill="#DC2626" opacity="0.8" />
    `,
  },
  {
    filename: 'jose-andres.svg',
    name: 'José Andrés',
    role: 'Embajador Global de la Tortilla',
    era: 'World Central Kitchen & Solidaridad',
    badge: 'HUMANITARIO & CHEF GLOBAL',
    primaryColor: '#0284C7',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <!-- World Globe Skillet & Olive Branch of Peace -->
      <circle cx="150" cy="95" r="48" fill="#0C2538" stroke="#0284C7" stroke-width="3" />
      <!-- Globe Meridian Lines -->
      <ellipse cx="150" cy="95" rx="34" ry="34" fill="none" stroke="#38BDF8" stroke-width="1.5" />
      <ellipse cx="150" cy="95" rx="16" ry="34" fill="none" stroke="#38BDF8" stroke-width="1.2" />
      <line x1="116" y1="95" x2="184" y2="95" stroke="#38BDF8" stroke-width="1.2" />
      <!-- Heart Center in Skillet -->
      <path d="M150 90 Q145 80 138 85 Q132 92 150 108 Q168 92 162 85 Q155 80 150 90 Z" fill="#FFB800" />
    `,
  },
  {
    filename: 'juan-roig.svg',
    name: 'Juan Roig',
    role: 'Optimizador Logístico & Cadena de Suministro',
    era: 'Distribución & Tortilla Lista para Comer',
    badge: 'LOGÍSTICA & DISTRIBUCIÓN',
    primaryColor: '#059669',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <!-- Geometric Egg Carton Precision Grid -->
      <circle cx="150" cy="95" r="48" fill="#13261E" stroke="#059669" stroke-width="3" />
      <!-- 2x3 egg crate pattern -->
      <g transform="translate(132, 78)">
        <circle cx="8" cy="8" r="6" fill="#FEF3C7" stroke="#059669" stroke-width="1.5" />
        <circle cx="28" cy="8" r="6" fill="#FEF3C7" stroke="#059669" stroke-width="1.5" />
        <circle cx="8" cy="26" r="6" fill="#FEF3C7" stroke="#059669" stroke-width="1.5" />
        <circle cx="28" cy="26" r="6" fill="#FEF3C7" stroke="#059669" stroke-width="1.5" />
      </g>
      <!-- Calibration arrow / gauge -->
      <path d="M125 118 L175 118" stroke="#10B981" stroke-width="2" stroke-dasharray="2 4" />
    `,
  },
  {
    filename: 'chef-enrique.svg',
    name: 'Chef Enrique',
    role: 'Maestro de la Estrella Michelin',
    era: 'Alta Cocina Técnica',
    badge: 'ESTRELLA MICHELIN',
    primaryColor: '#B45309',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <circle cx="150" cy="95" r="48" fill="#241B12" stroke="#B45309" stroke-width="3" />
      <!-- Chef Toque Hat -->
      <path d="M135 112 L165 112 L168 95 C174 95 178 88 172 80 C172 70 160 66 150 72 C140 66 128 70 128 80 C122 88 126 95 132 95 Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1.5" />
      <line x1="135" y1="108" x2="165" y2="108" stroke="#FFB800" stroke-width="2" />
    `,
  },
  {
    filename: 'elena-berlin.svg',
    name: 'Elena Berlin',
    role: 'Embajadora de la Tortilla en Centroeuropa',
    era: 'Fusión Cosmopolita',
    badge: 'DIÁSPORA EUROPEA',
    primaryColor: '#475569',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <circle cx="150" cy="95" r="48" fill="#1E293B" stroke="#94A3B8" stroke-width="3" />
      <!-- European Skyline & Skillet Emblem -->
      <ellipse cx="150" cy="95" rx="30" ry="18" fill="#FFB800" stroke="#F5E6BE" stroke-width="2" />
      <polygon points="146,65 154,65 150,55" fill="#38BDF8" />
    `,
  },
  {
    filename: 'rosa-maria.svg',
    name: 'Rosa María',
    role: 'Defensora del Producto Ecológico',
    era: 'Agricultura Regenerativa',
    badge: 'HUEVOS CAMPEROS 0',
    primaryColor: '#15803D',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <circle cx="150" cy="95" r="48" fill="#142618" stroke="#15803D" stroke-width="3" />
      <!-- Sprout & Golden Egg -->
      <ellipse cx="150" cy="95" rx="18" ry="24" fill="#FEF08A" stroke="#CA8A04" stroke-width="2" />
      <path d="M150 70 Q142 55 135 60 Q145 65 150 70 Z" fill="#22C55E" />
      <path d="M150 70 Q158 55 165 60 Q155 65 150 70 Z" fill="#22C55E" />
    `,
  },
  {
    filename: 'pepe-madrid.svg',
    name: 'Pepe Madrid',
    role: 'Leyenda de la Barra Madrileña',
    era: 'Tradición Castiza',
    badge: 'TABERNA CASTIZA',
    primaryColor: '#B91C1C',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <circle cx="150" cy="95" r="48" fill="#241414" stroke="#B91C1C" stroke-width="3" />
      <!-- Madrid Bear & Skillet Silhouette -->
      <ellipse cx="150" cy="100" rx="30" ry="18" fill="#FFB800" stroke="#B91C1C" stroke-width="2" />
      <!-- Castizo Cap outline -->
      <path d="M130 78 Q150 68 170 78 Q174 86 160 84 Q140 84 130 78 Z" fill="#4B5563" />
    `,
  },
  {
    filename: 'javier-sevilla.svg',
    name: 'Javier Sevilla',
    role: 'Técnica de la Fritura Andaluza',
    era: 'Aceite de Oliva & Maestría del Fuego',
    badge: 'AOVE ANDALUZ',
    primaryColor: '#D97706',
    secondaryColor: '#15803D',
    iconSymbol: `
      <circle cx="150" cy="95" r="48" fill="#241C12" stroke="#D97706" stroke-width="3" />
      <!-- Golden Olive Droplet with Andalusian Sun -->
      <path d="M150 62 C135 85 130 102 138 114 C145 125 155 125 162 114 C170 102 165 85 150 62 Z" fill="#FBBF24" stroke="#D97706" stroke-width="2" />
      <circle cx="150" cy="100" r="6" fill="#15803D" />
    `,
  },
  {
    filename: 'abuela-maria.svg',
    name: 'Abuela María',
    role: 'El Alma de la Casa y el Fuego Lento',
    era: 'Cocina de Afecto & Memoria',
    badge: 'RECETA DE LA ABUELA',
    primaryColor: '#BE123C',
    secondaryColor: '#FFB800',
    iconSymbol: `
      <circle cx="150" cy="95" r="48" fill="#24141A" stroke="#BE123C" stroke-width="3" />
      <!-- Heart & Traditional Steaming Skillet -->
      <ellipse cx="150" cy="102" rx="32" ry="18" fill="#FFB800" stroke="#BE123C" stroke-width="2" />
      <path d="M150 82 Q144 72 136 78 Q130 86 150 100 Q170 86 164 78 Q156 72 150 82 Z" fill="#BE123C" />
      <!-- Steam curls -->
      <path d="M142 66 Q146 56 142 48" stroke="#F5E6BE" stroke-width="1.8" stroke-linecap="round" fill="none" />
      <path d="M158 64 Q162 54 158 46" stroke="#F5E6BE" stroke-width="1.8" stroke-linecap="round" fill="none" />
    `,
  },
];

function generatePersonaSvg(p: PersonaDef): string {
  const rawSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220" width="300" height="220" fill="none" role="img" focusable="false" preserveAspectRatio="xMidYMid meet" aria-labelledby="p_${p.filename.replace('.svg','')}_t">
  <title id="p_${p.filename.replace('.svg','')}_t">${p.name} - ${p.role}</title>
  <desc>${p.badge} · ${p.era}</desc>

  <defs>
    <linearGradient id="pParchment" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCF9F2" />
      <stop offset="60%" stop-color="#F5E6BE" />
      <stop offset="100%" stop-color="#EAD7A6" />
    </linearGradient>

    <linearGradient id="pGoldBar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFD54F" />
      <stop offset="100%" stop-color="#FFB800" />
    </linearGradient>

    <filter id="pCardSh" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#78350F" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Parchment Card Frame -->
  <rect x="6" y="6" width="288" height="208" rx="14" fill="url(#pParchment)" stroke="#D8C7A0" stroke-width="1.8" filter="url(#pCardSh)" />

  <!-- Top Badge Ribbon -->
  <g transform="translate(150, 24)">
    <rect x="-80" y="-12" width="160" height="22" rx="11" fill="#1C1917" stroke="${p.primaryColor}" stroke-width="1.5" />
    <text x="0" y="3" text-anchor="middle" fill="${p.primaryColor}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="8.5" letter-spacing="1.2">${p.badge}</text>
  </g>

  <!-- Central Persona Heraldic Icon -->
  ${p.iconSymbol}

  <!-- Persona Name Header -->
  <text x="150" y="162" text-anchor="middle" fill="#1C1917" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="14" letter-spacing="-0.2">${p.name}</text>

  <!-- Role Subtitle -->
  <text x="150" y="179" text-anchor="middle" fill="#78350F" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="9.5">${p.role}</text>

  <!-- Era / Heritage Tag -->
  <g transform="translate(150, 198)">
    <rect x="-95" y="-9" width="190" height="18" rx="9" fill="#1C1917" opacity="0.08" />
    <text x="0" y="3" text-anchor="middle" fill="#57534E" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="8">${p.era}</text>
  </g>
</svg>
  `.trim();

  return optimizeSvg(rawSvg, {
    xmlDeclaration: true,
    stripComments: true,
    minifyWhitespace: true,
    cleanEmptyAttributes: true,
    ensureA11y: true,
    title: `${p.name} - ${p.role}`,
  });
}

console.log('[generatePersonaSvgs] Generating Persona Vector SVGs...');
for (const p of PERSONAS) {
  const content = generatePersonaSvg(p);
  const outPath = path.join(outputDir, p.filename);
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`  ✓ Generated ${p.filename}`);
}
console.log('[generatePersonaSvgs] Done!');
