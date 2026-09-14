/**
 * Lightweight Zero-Dependency XLIFF 1.2 / 2.0 Parser
 * Extracts trans-units (source, target, notes) into structured JSON for TypeScript or runtime consumption.
 */

export interface XlfUnit {
  id: string;
  source: string;
  target: string;
  note?: string;
}

export interface ParsedXlf {
  sourceLanguage: string;
  targetLanguage: string;
  units: Record<string, XlfUnit>;
}

export function parseXlf(xlfXmlContent: string): ParsedXlf {
  const result: ParsedXlf = {
    sourceLanguage: 'es',
    targetLanguage: 'en',
    units: {},
  };

  // Match file tag for language attributes
  const fileMatch = xlfXmlContent.match(/<file[^>]*source-language=["']([^"']+)["'][^>]*target-language=["']([^"']+)["']/i);
  if (fileMatch) {
    result.sourceLanguage = fileMatch[1];
    result.targetLanguage = fileMatch[2];
  }

  // Regex to extract trans-unit blocks
  const transUnitRegex = /<trans-unit\s+id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/trans-unit>/gi;
  let match: RegExpExecArray | null;

  while ((match = transUnitRegex.exec(xlfXmlContent)) !== null) {
    const id = match[1];
    const body = match[2];

    const sourceMatch = body.match(/<source>([\s\S]*?)<\/source>/i);
    const targetMatch = body.match(/<target>([\s\S]*?)<\/target>/i);
    const noteMatch = body.match(/<note[^>]*>([\s\S]*?)<\/note>/i);

    const source = sourceMatch ? decodeXml(sourceMatch[1].trim()) : '';
    const target = targetMatch ? decodeXml(targetMatch[1].trim()) : '';
    const note = noteMatch ? decodeXml(noteMatch[1].trim()) : undefined;

    result.units[id] = {
      id,
      source,
      target,
      note,
    };
  }

  return result;
}

function decodeXml(str: string): string {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}
