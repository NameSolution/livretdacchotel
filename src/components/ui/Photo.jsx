import { useEffect, useRef, useState } from 'react';
import { ImageOff } from 'lucide-react';
import { useI18n } from '../../i18n';

/**
 * Photographie responsive : deux largeurs WebP, réserve d'espace (pas de décalage de mise en page),
 * fondu à l'arrivée et repli propre si le fichier est introuvable.
 */
export default function Photo({ image, ratio = '4 / 3', sizes = '100vw', priority = false, className = '', alt }) {
  const { t, L } = useI18n();
  const ref = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    if (ref.current?.complete && ref.current.naturalWidth > 0) setStatus('loaded');
  }, [image?.base]);

  if (!image) return null;
  const description = alt ?? L(image.alt);

  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`} style={ratio === 'fill' ? undefined : { aspectRatio: ratio }}>
      {status === 'error' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-2" role="img" aria-label={description}>
          <ImageOff size={22} strokeWidth={1.5} aria-hidden />
          <span className="small">{t('guest.common.imageUnavailable')}</span>
        </div>
      ) : (
        <img
          ref={ref}
          src={`${image.base}-1280.webp`}
          srcSet={`${image.base}-640.webp 640w, ${image.base}-1280.webp 1280w`}
          sizes={sizes}
          alt={description}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectPosition: image.position }}
        />
      )}
    </div>
  );
}
