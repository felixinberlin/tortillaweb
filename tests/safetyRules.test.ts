import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Safety Rules & Design System Compliance Tests', () => {
  const rootDir = process.cwd();

  const getFilesRecursively = (dir: string, fileList: string[] = []): string[] => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.startsWith('.') || file === 'node_modules' || file === 'dist') continue;
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        getFilesRecursively(filePath, fileList);
      } else if (file.endsWith('.json') || file.endsWith('.astro') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        fileList.push(filePath);
      }
    }
    return fileList;
  };

  it('should contain mandatory temperature standards (70°C for 2 minutes or 63°C for 20 seconds)', () => {
    const files = getFilesRecursively(path.join(rootDir, 'src'));
    let found70C = false;
    let found63C = false;

    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content.includes('70°C for 2 minutes') || content.includes('70°C durante 2 minutos')) {
        found70C = true;
      }
      if (content.includes('63°C for 20 seconds') || content.includes('63°C durante 20 segundos')) {
        found63C = true;
      }
    }

    expect(found70C).toBe(true);
    expect(found63C).toBe(true);
  });

  it('should contain mandatory 4 hours ambient threshold standard', () => {
    const files = getFilesRecursively(path.join(rootDir, 'src'));
    let found4h = false;

    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content.includes('4 hours') || content.includes('4 horas')) {
        found4h = true;
      }
    }

    expect(found4h).toBe(true);
  });

  it('should adhere to brand safety status color hex values', () => {
    const dangerColor = '#b00020';
    const warningColor = '#ffc107';
    const safeColor = '#2e7d32';

    const indexCssPath = path.join(rootDir, 'src', 'index.css');
    if (fs.existsSync(indexCssPath)) {
      const cssContent = fs.readFileSync(indexCssPath, 'utf-8').toLowerCase();
      expect(cssContent.includes(dangerColor) || cssContent.includes(warningColor) || cssContent.includes(safeColor)).toBe(true);
    }
  });

  it('should adhere to brand palette hex values', () => {
    const gold = '#ffb800';
    const cream = '#f5e6be';
    const umber = '#8d6e63';

    const indexCssPath = path.join(rootDir, 'src', 'index.css');
    if (fs.existsSync(indexCssPath)) {
      const cssContent = fs.readFileSync(indexCssPath, 'utf-8').toLowerCase();
      expect(cssContent.includes(gold) || cssContent.includes(cream) || cssContent.includes(umber)).toBe(true);
    }
  });
});
