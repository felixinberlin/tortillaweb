/**
 * Professional SVG Optimizer & Best Practices Engine
 * 
 * Provides:
 * - W3C SVG 2 / SVG 1.1 accessibility compliance (role="img", focusable="false", title, desc)
 * - Safe whitespace minification preserving <text>, <tspan>, and <style> contents
 * - Removal of empty / redundant attributes (class="", style="", id="")
 * - Precision optimization of floating point coordinates
 * - Prefers-reduced-motion CSS injection for animated SVGs
 * - XML declaration normalization for standalone vs embedded SVGs
 */

export interface SvgOptimizeOptions {
  /** Remove XML comments <!-- ... --> (defaults to true) */
  stripComments?: boolean;
  /** Collapse redundant whitespace between elements (defaults to true) */
  minifyWhitespace?: boolean;
  /** Remove empty attributes like class="" or style="" (defaults to true) */
  cleanEmptyAttributes?: boolean;
  /** Ensure accessibility attributes: role="img", focusable="false", preserveAspectRatio (defaults to true) */
  ensureA11y?: boolean;
  /** Include or ensure <title> tag inside the SVG root (defaults to true) */
  ensureTitle?: boolean;
  /** Add XML declaration <?xml version="1.0" encoding="UTF-8"?> if missing (defaults to false) */
  xmlDeclaration?: boolean;
  /** Title text fallback if not present */
  title?: string;
  /** Description text fallback if not present */
  desc?: string;
  /** Limit decimal numbers in coordinate paths to N places (defaults to 2, 0 to disable) */
  decimalPrecision?: number;
}

/**
 * Optimizes an SVG string according to web best practices
 */
export function optimizeSvg(svgString: string, options: SvgOptimizeOptions = {}): string {
  if (!svgString || typeof svgString !== "string") {
    return svgString;
  }

  const {
    stripComments = true,
    minifyWhitespace = true,
    cleanEmptyAttributes = true,
    ensureA11y = true,
    ensureTitle = true,
    xmlDeclaration = false,
    title,
    desc,
    decimalPrecision = 2,
  } = options;

  let result = svgString;

  // 1. Separate XML declaration if present
  let hasXmlDecl = false;
  if (/^<\?xml[^>]*\?>\s*/i.test(result)) {
    hasXmlDecl = true;
    result = result.replace(/^<\?xml[^>]*\?>\s*/i, "");
  }

  // 2. Protect <text>, <tspan>, and <style> blocks from destructive whitespace transformations
  const protectedBlocks: string[] = [];
  result = result.replace(/<(style|text|tspan)([\s>][\s\S]*?<\/\1>)/gi, (match) => {
    const token = `___SVG_PROTECTED_${protectedBlocks.length}___`;
    protectedBlocks.push(match);
    return token;
  });

  // 3. Strip XML comments
  if (stripComments) {
    result = result.replace(/<!--[\s\S]*?-->/g, "");
  }

  // 4. Remove empty attributes: class="", style="", id=""
  if (cleanEmptyAttributes) {
    result = result.replace(/\s+(class|style|id|filter|mask|clip-path)=["']\s*["']/gi, "");
  }

  // 5. Optimize decimal precision on numbers with more than specified decimal places
  if (decimalPrecision > 0) {
    // Matches floating point numbers with more than decimalPrecision places
    // Exclude version="1.1" or xmlns URLs
    const floatRegex = /([dD]="[^"]*"|points="[^"]*"|transform="[^"]*"|translate\([^)]*\)|matrix\([^)]*\))/g;
    result = result.replace(floatRegex, (containerMatch) => {
      return containerMatch.replace(/(-?\d+\.\d{3,})/g, (numStr) => {
        const val = parseFloat(numStr);
        if (Number.isFinite(val)) {
          return Number(val.toFixed(decimalPrecision)).toString();
        }
        return numStr;
      });
    });
  }

  // 6. Restore protected blocks with internal cleanliness
  for (let i = 0; i < protectedBlocks.length; i++) {
    let block = protectedBlocks[i];
    // For style blocks, add prefers-reduced-motion fallback if missing
    if (block.startsWith("<style") && block.includes("@keyframes") && !block.includes("prefers-reduced-motion: reduce")) {
      const reducedMotionRule = `
      @media (prefers-reduced-motion: reduce) {
        *, ::before, ::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }`;
      block = block.replace(/<\/style>/i, `${reducedMotionRule}\n    </style>`);
    }
    result = result.replace(`___SVG_PROTECTED_${i}___`, block);
  }

  // 7. Ensure A11y & responsive attributes on root <svg>
  if (ensureA11y) {
    result = result.replace(/<svg\b([^>]*)>/i, (match, attrs) => {
      let updatedAttrs = attrs;

      // Ensure xmlns
      if (!/xmlns=/i.test(updatedAttrs)) {
        updatedAttrs += ' xmlns="http://www.w3.org/2000/svg"';
      }

      // Ensure role="img"
      if (!/role=/i.test(updatedAttrs)) {
        updatedAttrs += ' role="img"';
      }

      // Ensure focusable="false" for SVG graphics
      if (!/focusable=/i.test(updatedAttrs)) {
        updatedAttrs += ' focusable="false"';
      }

      // Ensure preserveAspectRatio="xMidYMid meet"
      if (!/preserveAspectRatio=/i.test(updatedAttrs)) {
        updatedAttrs += ' preserveAspectRatio="xMidYMid meet"';
      }

      return `<svg${updatedAttrs}>`;
    });
  }

  // 8. Inject <title> and <desc> if requested and not present
  if (ensureTitle && (title || desc)) {
    const hasExistingTitle = /<title[\s>]/i.test(result);
    const hasExistingDesc = /<desc[\s>]/i.test(result);

    if (!hasExistingTitle && title) {
      const escapedTitle = title
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      const titleTag = `<title>${escapedTitle}</title>`;

      let descTag = "";
      if (!hasExistingDesc && desc) {
        const escapedDesc = desc
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        descTag = `<desc>${escapedDesc}</desc>`;
      }

      result = result.replace(/(<svg\b[^>]*>)/i, `$1\n  ${titleTag}${descTag ? `\n  ${descTag}` : ""}`);
    }
  }

  // 9. Minify redundant whitespace outside <text> and <style>
  if (minifyWhitespace) {
    // Protect text and style blocks again
    const blocks: string[] = [];
    result = result.replace(/<(style|text|tspan)([\s>][\s\S]*?<\/\1>)/gi, (m) => {
      const tok = `___MIN_PROTECT_${blocks.length}___`;
      blocks.push(m);
      return tok;
    });

    // Collapse whitespace between tags
    result = result.replace(/>\s+</g, "><");
    // Collapse multi-spaces inside tags
    result = result.replace(/\s{2,}/g, " ");
    result = result.trim();

    // Restore blocks
    for (let i = 0; i < blocks.length; i++) {
      result = result.replace(`___MIN_PROTECT_${i}___`, blocks[i]);
    }
  }

  // 10. Prepend XML declaration if requested
  const shouldHaveXml = xmlDeclaration || (hasXmlDecl && xmlDeclaration !== false);
  if (shouldHaveXml) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n${result}`;
  }

  return result;
}
