import { useEffect } from 'react';
import Rich, { stripRich } from './Rich';
import { useHotel } from '../../lib/hotel-context';

/** En-tête de page éditorial : surtitre optionnel, grand titre, chapeau. */
export function PageHeader({ eyebrow, title, lead, className = '' }) {
  return (
    <header className={`pb-6 pt-4 lg:pt-12 ${className}`}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h1 className="display h-page">
        <Rich text={title} />
      </h1>
      {lead ? <p className="lead mt-4 max-w-[34rem]">{lead}</p> : null}
    </header>
  );
}

/** Définit le titre du document (utile aux lecteurs d'écran et à l'historique du navigateur). */
export function useDocumentTitle(title) {
  const { hotel } = useHotel();
  useEffect(() => {
    document.title = `${stripRich(title)} — ${hotel.name}`;
  }, [title, hotel.name]);
}

/** Ligne « libellé / valeur » des fiches d'information. */
export function Fact({ label, children }) {
  if (children == null || children === false || children === '') return null;
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-x-4 border-b border-line py-3.5 sm:grid-cols-[8rem_1fr]">
      <dt className="eyebrow pt-[0.2rem]">{label}</dt>
      <dd className="body m-0">{children}</dd>
    </div>
  );
}
