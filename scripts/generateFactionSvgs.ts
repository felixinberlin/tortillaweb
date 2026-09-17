#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { optimizeSvg } from '../src/domain/svg/svgOptimizer';

const outputDir = path.join(process.cwd(), 'public', 'images', 'factions');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

interface FactionSvgDef {
  filename: string;
  title: string;
  motto: string;
  badge: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  emblemSvg: string;
}

const FACTIONS: FactionSvgDef[] = [
  {
    filename: 'faction-purist.svg',
    title: 'La Santa Trinidad (Puristas)',
    motto: 'SOLO TRES: HUEVO, PATATA Y ACEITE',
    badge: 'PURISTAS',
    primaryColor: '#FFB800',
    secondaryColor: '#F5E6BE',
    accentColor: '#2E7D32',
    emblemSvg: `
      <!-- Golden Cast Iron Pan with 3 Sacred Components -->
      <circle cx="200" cy="140" r="68" fill="#1C1917" stroke="#FFB800" stroke-width="4" filter="url(#dropSh)" />
      <circle cx="200" cy="140" r="58" fill="#2E241E" />
      <!-- Pan handle -->
      <path d="M268 140 L318 140" stroke="#78350F" stroke-width="12" stroke-linecap="round" />
      <circle cx="312" cy="140" r="3" fill="#F5E6BE" />
      
      <!-- 3 Sacred Rays & Elements -->
      <path d="M 200 100 L 200 120 M 165 160 L 180 150 M 235 160 L 220 150" stroke="#FFB800" stroke-width="2.5" stroke-linecap="round" opacity="0.8" />
      
      <!-- Egg Yolk (Center) -->
      <circle cx="200" cy="140" r="22" fill="#FFB800" stroke="#FF8A00" stroke-width="2" />
      <ellipse cx="194" cy="134" rx="6" ry="3.5" fill="#FFFFFF" opacity="0.9" transform="rotate(-20 194 134)" />
      
      <!-- Golden Potato Disks flanking -->
      <ellipse cx="178" cy="146" rx="14" ry="10" fill="#F5E6BE" stroke="#D8C7A0" stroke-width="1.5" opacity="0.95" />
      <ellipse cx="222" cy="146" rx="14" ry="10" fill="#F5E6BE" stroke="#D8C7A0" stroke-width="1.5" opacity="0.95" />

      <!-- Olive Leaf Wreath of Purity -->
      <path d="M 136 140 C 136 182 165 210 200 215 C 235 210 264 182 264 140" fill="none" stroke="#2E7D32" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 6" />
      <circle cx="145" cy="175" r="4" fill="#2E7D32" />
      <circle cx="255" cy="175" r="4" fill="#2E7D32" />
    `,
  },
  {
    filename: 'faction-onion.svg',
    title: 'La Hermandad de la Cebolla',
    motto: '70.4% DEL PUEBLO · DULZOR POCHADO',
    badge: 'CONCEBOLLISTAS',
    primaryColor: '#FFB800',
    secondaryColor: '#8D6E63',
    accentColor: '#D97706',
    emblemSvg: `
      <!-- Skillet with Caramelized Onion Crown -->
      <circle cx="200" cy="140" r="68" fill="#1C1917" stroke="#D97706" stroke-width="4" filter="url(#dropSh)" />
      <circle cx="200" cy="140" r="58" fill="#261C14" />
      <!-- Pan handle -->
      <path d="M268 140 L318 140" stroke="#78350F" stroke-width="12" stroke-linecap="round" />
      <circle cx="312" cy="140" r="3" fill="#F5E6BE" />

      <!-- Caramelized Onion Ribbons -->
      <path d="M165 145 C175 120 225 120 235 145 C215 160 185 160 165 145 Z" fill="#8D6E63" opacity="0.9" />
      <path d="M175 142 C182 128 218 128 225 142" stroke="#FFB800" stroke-width="2.5" stroke-linecap="round" fill="none" />
      
      <!-- Onion Bulb Shape -->
      <path d="M200 95 C180 115 170 135 175 152 C182 170 218 170 225 152 C230 135 220 115 200 95 Z" fill="url(#onionGrad)" stroke="#B45309" stroke-width="2" />
      <path d="M200 95 L200 168" stroke="#FEF08A" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.7" />
      <path d="M190 115 C185 130 185 150 192 162" stroke="#FEF08A" stroke-width="1.2" fill="none" opacity="0.6" />
      <path d="M210 115 C215 130 215 150 208 162" stroke="#FEF08A" stroke-width="1.2" fill="none" opacity="0.6" />

      <!-- Molten Sweet Yolk pool -->
      <circle cx="200" cy="142" r="14" fill="#FFB800" stroke="#EA580C" stroke-width="1.5" />
      <ellipse cx="196" cy="138" rx="4" ry="2" fill="#FFFFFF" opacity="0.85" />
    `,
  },
  {
    filename: 'faction-pimientos.svg',
    title: 'El Tercio del Pimiento (Navarra & Padrón)',
    motto: 'FUEGO Y HUERTA · PIQUILLO Y PADRÓN',
    badge: 'PIMIENTISTAS',
    primaryColor: '#D32F2F',
    secondaryColor: '#2E7D32',
    accentColor: '#FFB800',
    emblemSvg: `
      <!-- Skillet with Crossed Charred Peppers -->
      <circle cx="200" cy="140" r="68" fill="#1C1917" stroke="#D32F2F" stroke-width="4" filter="url(#dropSh)" />
      <circle cx="200" cy="140" r="58" fill="#201515" />
      <!-- Pan handle -->
      <path d="M268 140 L318 140" stroke="#78350F" stroke-width="12" stroke-linecap="round" />
      <circle cx="312" cy="140" r="3" fill="#F5E6BE" />

      <!-- Piquillo Red Pepper (Left) -->
      <g transform="translate(182, 138) rotate(-28)">
        <path d="M0 -36 C-12 -18 -14 10 0 32 C14 10 12 -18 0 -36 Z" fill="#DC2626" stroke="#991B1B" stroke-width="2" />
        <path d="M0 -36 L0 -44" stroke="#15803D" stroke-width="3.5" stroke-linecap="round" />
        <ellipse cx="-3" cy="0" rx="3" ry="12" fill="#EF4444" opacity="0.8" />
        <!-- Char marks -->
        <ellipse cx="2" cy="8" rx="2" ry="4" fill="#1C1917" opacity="0.6" />
      </g>

      <!-- Padrón Green Pepper (Right) -->
      <g transform="translate(218, 138) rotate(28)">
        <path d="M0 -34 C-10 -16 -12 8 0 28 C12 8 10 -16 0 -34 Z" fill="#16A34A" stroke="#166534" stroke-width="2" />
        <path d="M0 -34 L0 -42" stroke="#14532D" stroke-width="3" stroke-linecap="round" />
        <ellipse cx="-2" cy="-2" rx="2.5" ry="10" fill="#4ADE80" opacity="0.8" />
        <!-- Char marks -->
        <ellipse cx="2" cy="4" rx="2" ry="3" fill="#1C1917" opacity="0.5" />
      </g>

      <!-- Golden Yolk droplets below -->
      <circle cx="200" cy="165" r="8" fill="#FFB800" stroke="#D97706" stroke-width="1.5" />
    `,
  },
  {
    filename: 'faction-garlic.svg',
    title: 'Los Alquimistas del Ajo (Ajo & Ajetes)',
    motto: 'AROMA Y TEMPERAMENTO · EL DIENTE DORADO',
    badge: 'AJISTAS',
    primaryColor: '#F5E6BE',
    secondaryColor: '#689F38',
    accentColor: '#8D6E63',
    emblemSvg: `
      <!-- Skillet with Fragrant Sliced Garlic Bulb -->
      <circle cx="200" cy="140" r="68" fill="#1C1917" stroke="#F5E6BE" stroke-width="4" filter="url(#dropSh)" />
      <circle cx="200" cy="140" r="58" fill="#1F1E1A" />
      <!-- Pan handle -->
      <path d="M268 140 L318 140" stroke="#78350F" stroke-width="12" stroke-linecap="round" />
      <circle cx="312" cy="140" r="3" fill="#F5E6BE" />

      <!-- Green Tender Ajetes Spears -->
      <path d="M162 165 Q180 120 188 95" stroke="#65A30D" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M238 165 Q220 120 212 95" stroke="#4D7C0F" stroke-width="4" stroke-linecap="round" fill="none" />

      <!-- Sliced Garlic Bulb with Cloves -->
      <ellipse cx="200" cy="142" rx="28" ry="24" fill="#FEF3C7" stroke="#D97706" stroke-width="2" />
      <!-- Cloves inside -->
      <circle cx="200" cy="142" r="7" fill="#FDE68A" />
      <ellipse cx="186" cy="140" rx="6" ry="10" fill="#FFFBEB" stroke="#D97706" stroke-width="1" />
      <ellipse cx="214" cy="140" rx="6" ry="10" fill="#FFFBEB" stroke="#D97706" stroke-width="1" />
      <ellipse cx="200" cy="128" rx="8" ry="5" fill="#FFFBEB" stroke="#D97706" stroke-width="1" />
      <ellipse cx="200" cy="154" rx="8" ry="5" fill="#FFFBEB" stroke="#D97706" stroke-width="1" />

      <!-- Sizzling Oil Micro-Bubbles -->
      <circle cx="170" cy="130" r="2.5" fill="#FACC15" />
      <circle cx="228" cy="132" r="3" fill="#FACC15" />
      <circle cx="198" cy="112" r="2" fill="#FACC15" />
    `,
  },
  {
    filename: 'faction-cosas.svg',
    title: 'La Vanguardia Libre (Con-Cosistas)',
    motto: 'INNOVACIÓN · LIBERTAD EN LA SARTÉN',
    badge: 'CON-COSAS',
    primaryColor: '#00A3FF',
    secondaryColor: '#FFB800',
    accentColor: '#D32F2F',
    emblemSvg: `
      <!-- Skillet with Avant-Garde Ingredient Constellation -->
      <circle cx="200" cy="140" r="68" fill="#1C1917" stroke="#00A3FF" stroke-width="4" filter="url(#dropSh)" />
      <circle cx="200" cy="140" r="58" fill="#181D24" />
      <!-- Pan handle -->
      <path d="M268 140 L318 140" stroke="#78350F" stroke-width="12" stroke-linecap="round" />
      <circle cx="312" cy="140" r="3" fill="#F5E6BE" />

      <!-- Dynamic Orbit Ring -->
      <ellipse cx="200" cy="140" rx="46" ry="24" fill="none" stroke="#00A3FF" stroke-width="1.5" stroke-dasharray="4 4" transform="rotate(-25 200 140)" />

      <!-- Constellation Ingredients: Truffle, Jamón, Chorizo, Queso -->
      <!-- Center Yolk with Pilot Light Spark -->
      <circle cx="200" cy="140" r="16" fill="#FFB800" stroke="#00A3FF" stroke-width="2" />
      <circle cx="196" cy="136" r="3" fill="#FFFFFF" />

      <!-- Truffle Fleck (Top) -->
      <ellipse cx="190" cy="108" rx="8" ry="6" fill="#262626" stroke="#525252" stroke-width="1.5" />
      <!-- Chorizo slice (Right) -->
      <circle cx="230" cy="130" r="9" fill="#DC2626" stroke="#991B1B" stroke-width="1.5" />
      <circle cx="228" cy="128" r="2" fill="#FDE047" />
      <!-- Jamón Ibérico sliver (Left) -->
      <path d="M165 142 Q175 148 170 156 Q160 150 165 142 Z" fill="#991B1B" stroke="#FCA5A5" stroke-width="1" />
      <!-- Melted cheese thread (Bottom) -->
      <path d="M192 154 Q204 168 214 158" stroke="#FEF08A" stroke-width="3" stroke-linecap="round" fill="none" />
    `,
  },
];

function generateFactionSvg(def: FactionSvgDef): string {
  const rawSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280" fill="none" role="img" focusable="false" preserveAspectRatio="xMidYMid meet" aria-labelledby="f_${def.badge}_t f_${def.badge}_d">
  <title id="f_${def.badge}_t">${def.title}</title>
  <desc id="f_${def.badge}_d">${def.motto} - Escudo heráldico culinario</desc>

  <defs>
    <!-- Parchment & Kitchen Gradients -->
    <linearGradient id="parchmentBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCF9F2" />
      <stop offset="50%" stop-color="#F5E6BE" />
      <stop offset="100%" stop-color="#EEDCB0" />
    </linearGradient>

    <linearGradient id="onionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="45%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#8D6E63" />
    </linearGradient>

    <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFD54F" />
      <stop offset="50%" stop-color="#FFB800" />
      <stop offset="100%" stop-color="#FF8A00" />
    </linearGradient>

    <filter id="dropSh" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.35" />
    </filter>

    <filter id="cardSh" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#8D6E63" flood-opacity="0.2" />
    </filter>
  </defs>

  <!-- Parchment Card Background -->
  <rect x="8" y="8" width="384" height="264" rx="16" fill="url(#parchmentBg)" stroke="#D8C7A0" stroke-width="2" filter="url(#cardSh)" />

  <!-- Subtle kitchen grid / notebook guide lines -->
  <g opacity="0.12" stroke="#8D6E63" stroke-width="0.8">
    <line x1="8" y1="56" x2="392" y2="56" />
    <line x1="8" y1="104" x2="392" y2="104" />
    <line x1="8" y1="152" x2="392" y2="152" />
    <line x1="8" y1="200" x2="392" y2="200" />
  </g>

  <!-- Top Badge Pill -->
  <g transform="translate(200, 32)">
    <rect x="-70" y="-14" width="140" height="28" rx="14" fill="#1C1917" stroke="${def.primaryColor}" stroke-width="1.5" />
    <text x="0" y="5" text-anchor="middle" fill="${def.primaryColor}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="11" letter-spacing="2">${def.badge}</text>
  </g>

  <!-- Central Emblem Group -->
  ${def.emblemSvg}

  <!-- Bottom Heraldic Banner Ribbon -->
  <g transform="translate(200, 240)">
    <!-- Banner Ribbon Shadow -->
    <path d="M-155 0 L155 0 L145 18 L-145 18 Z" fill="#000000" opacity="0.15" />
    <!-- Main Ribbon -->
    <path d="M-160 -12 L160 -12 L150 14 L-150 14 Z" fill="url(#goldRibbon)" stroke="#B45309" stroke-width="1.5" />
    <text x="0" y="4" text-anchor="middle" fill="#1C1917" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="9" letter-spacing="1">${def.motto}</text>
  </g>
</svg>
  `.trim();

  return optimizeSvg(rawSvg, {
    xmlDeclaration: true,
    stripComments: true,
    minifyWhitespace: true,
    cleanEmptyAttributes: true,
    ensureA11y: true,
    title: def.title,
  });
}

console.log('[generateFactionSvgs] Generating 5 Faction Heraldic SVGs...');
for (const f of FACTIONS) {
  const content = generateFactionSvg(f);
  const outPath = path.join(outputDir, f.filename);
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`  ✓ Generated ${f.filename}`);
}
console.log('[generateFactionSvgs] Done!');
