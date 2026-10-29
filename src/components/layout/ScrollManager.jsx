import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/** À chaque changement de page : retour en haut et focus sur le contenu (accessibilité clavier / lecteur d'écran). */
export default function ScrollManager() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}
