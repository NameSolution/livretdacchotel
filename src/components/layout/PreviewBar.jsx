import { useHotel } from '../../lib/hotel-context';

/** Barre réservée à la prévisualisation : bascule entre les deux établissements de démonstration. */
export default function PreviewBar() {
  const { hotel, hotels, setHotel, preview } = useHotel();
  if (!preview) return null;
  return (
    <div className="flex min-h-9 flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-ink px-3 py-1.5 text-[0.8125rem] text-paper" role="region" aria-label="Prévisualisation">
      <span className="opacity-70">Aperçu · établissement fictif</span>
      <span className="flex gap-1">
        {hotels.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => setHotel(h.id)}
            aria-pressed={h.id === hotel.id}
            className={`min-h-7 rounded px-2.5 font-semibold ${h.id === hotel.id ? 'bg-paper text-ink' : 'text-paper/80 hover:text-paper'}`}
          >
            {h.name}
          </button>
        ))}
      </span>
    </div>
  );
}
