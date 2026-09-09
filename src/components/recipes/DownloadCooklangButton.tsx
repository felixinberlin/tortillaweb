import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  exportToCooklang,
  exportTortillaConfigToCooklang,
} from '@/lib/translator';
import type { RawRecipeInput } from '@/lib/translator/types';
import type { TortillaConfiguration } from '@/domain/builder/types';

export interface DownloadCooklangButtonProps {
  recipe?: RawRecipeInput;
  config?: TortillaConfiguration;
  lang?: string;
  filename?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  label?: string;
}

export function DownloadCooklangButton({
  recipe,
  config,
  lang = 'es',
  filename,
  className = '',
  variant = 'outline',
  size = 'sm',
  label,
}: DownloadCooklangButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    let cookText = '';
    let defaultFilename = 'receta';

    if (config) {
      cookText = exportTortillaConfigToCooklang(config, {
        lang,
        authorName: 'tortilladepatatas.org - Tortilla Creator',
        sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
      });
      defaultFilename = 'tortilla-personalizada';
    } else if (recipe) {
      cookText = exportToCooklang(recipe, {
        authorName: recipe.authorName || 'tortilladepatatas.org',
        sourceUrl: recipe.url || (typeof window !== 'undefined' ? window.location.href : undefined),
      });
      defaultFilename = recipe.name
        ? recipe.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : 'receta';
    }

    if (!cookText) return;

    const blob = new Blob([cookText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename || defaultFilename}.cook`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const isEs = lang.startsWith('es');
  const isDe = lang.startsWith('de');

  const defaultLabel = label || (downloaded
    ? (isEs ? '¡Descargado!' : isDe ? 'Heruntergeladen!' : 'Downloaded!')
    : (isEs ? 'Descargar .cook' : isDe ? 'Herunterladen .cook' : 'Download .cook'));

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      className={className}
      title={isEs ? 'Descargar receta en formato estándar Cooklang (.cook)' : 'Download recipe in standard Cooklang (.cook) format'}
    >
      {downloaded ? (
        <Check className="w-4 h-4 mr-1 text-emerald-600" />
      ) : (
        <Download className="w-4 h-4 mr-1" />
      )}
      <span>{defaultLabel}</span>
    </Button>
  );
}

export default DownloadCooklangButton;
