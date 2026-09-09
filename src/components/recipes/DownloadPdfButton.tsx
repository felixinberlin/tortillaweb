import React, { useState } from 'react';
import { FileDown, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportRecipeToPdf } from '@/lib/pdf/recipePdfGenerator';
import type { RawRecipeInput } from '@/lib/translator/types';
import type { TortillaConfiguration } from '@/domain/builder/types';

export interface DownloadPdfButtonProps {
  recipe?: RawRecipeInput;
  config?: TortillaConfiguration;
  lang?: string;
  filename?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  label?: string;
}

export function DownloadPdfButton({
  recipe,
  config,
  lang = 'es',
  filename,
  className = '',
  variant = 'outline',
  size = 'sm',
  label,
}: DownloadPdfButtonProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const isEs = lang.startsWith('es');
  const isDe = lang.startsWith('de');

  const defaultLabel = isEs
    ? 'Descargar PDF'
    : isDe
    ? 'PDF Herunterladen'
    : 'Download PDF';

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);

    try {
      const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
      await exportRecipeToPdf({
        recipe,
        config,
        lang,
        filename,
        shareUrl,
      });

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      disabled={downloading}
      className={`inline-flex items-center gap-1.5 cursor-pointer font-bold transition-all ${className}`}
      title={
        isEs
          ? 'Descargar ficha de receta en PDF imprimible'
          : 'Download printable recipe specification in PDF'
      }
    >
      {downloading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : downloaded ? (
        <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
      ) : (
        <FileDown className="w-3.5 h-3.5 text-[#FFB800]" />
      )}
      <span>
        {downloading
          ? isEs
            ? 'Generando...'
            : 'Generating...'
          : downloaded
          ? isEs
            ? '¡Descargado!'
            : 'Downloaded!'
          : label || defaultLabel}
      </span>
    </Button>
  );
}

export default DownloadPdfButton;
