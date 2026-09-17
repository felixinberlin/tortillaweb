/**
 * Shared SVG definitions, textures, and filters for photorealistic skeuomorphic styling
 */
export function getSharedDefs(id: string = "ing_shared"): string {
  return `
    <!-- Master Drop Shadow with Warm Ambient Occlusion -->
    <filter id="${id}_dropShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#1C0A00" floodOpacity="0.38" />
      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.25" />
    </filter>

    <!-- Deep 3D Shadow for Floating Objects -->
    <filter id="${id}_deepShadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="2" dy="8" stdDeviation="8" floodColor="#1A0D00" floodOpacity="0.45" />
      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
    </filter>

    <!-- Soft Organic Shadow -->
    <filter id="${id}_softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="3" stdDeviation="3.5" floodColor="#271505" floodOpacity="0.3" />
    </filter>

    <!-- Glossy Specular Highlight Filter -->
    <filter id="${id}_glossHighlight" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <!-- Subtle Food Glisten Filter -->
    <filter id="${id}_glistenGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Organic Natural Texture Filter -->
    <filter id="${id}_organicTexture" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feColorMatrix type="matrix" values="0 0 0 0 0.5   0 0 0 0 0.4   0 0 0 0 0.3  0 0 0 0.12 0" />
      <feComposite in2="SourceGraphic" in="noise" operator="in" />
    </filter>
  `;
}

export function wrapSvg(
  content: string,
  width: number | string = 100,
  height: number | string = 100,
  viewBox: string = "0 0 100 100",
  ariaLabel: string = "Ingredient",
  className: string = "",
  theme: "dark" | "parchment" | "transparent" = "transparent"
): string {
  const bg =
    theme === "dark"
      ? '<rect width="100%" height="100%" rx="14" fill="#1C1917" stroke="#292524" stroke-width="1.5" />'
      : theme === "parchment"
      ? '<rect width="100%" height="100%" rx="14" fill="#F5E6BE" stroke="#D8C7A0" stroke-width="1.5" />'
      : "";

  const classAttr = className && className.trim().length > 0 ? ` class="${className.trim()}"` : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" fill="none" role="img" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${ariaLabel}"${classAttr}>
<title>${ariaLabel}</title>
${bg}
${content}
</svg>`;
}
