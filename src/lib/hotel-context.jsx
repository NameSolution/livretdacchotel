import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_HOTEL, HOTELS, getHotel } from '../data/hotels';
import { applyTheme } from './theme';

const HotelContext = createContext(null);

const readParams = () => new URLSearchParams(window.location.search);

/**
 * Fournit l'établissement actif et le mode prévisualisation.
 * - `?hotel=arolle` choisit le jeu de données ;
 * - `?preview` affiche la barre de bascule (toujours active en développement).
 * Ces deux paramètres sont recopiés sur chaque lien interne (voir `useHref`).
 */
export function HotelProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [hotelId, setHotelId] = useState(() => {
    const id = readParams().get('hotel');
    return id && HOTELS[id] ? id : DEFAULT_HOTEL;
  });
  const [preview] = useState(() => import.meta.env.DEV || readParams().has('preview'));
  const hotel = getHotel(hotelId);

  useLayoutEffect(() => {
    applyTheme(document.documentElement, hotel.theme);
    document.title = `${hotel.name} — Pristi Guest`;
  }, [hotel]);

  const keep = useMemo(() => {
    const p = new URLSearchParams();
    if (hotelId !== DEFAULT_HOTEL) p.set('hotel', hotelId);
    if (preview && !import.meta.env.DEV) p.set('preview', '1');
    return p;
  }, [hotelId, preview]);

  const setHotel = useCallback(
    (id) => {
      if (!HOTELS[id] || id === hotelId) return;
      setHotelId(id);
      const params = new URLSearchParams(location.search);
      if (id === DEFAULT_HOTEL) params.delete('hotel');
      else params.set('hotel', id);
      ['place', 'cat', 'go'].forEach((k) => params.delete(k));
      const search = params.toString();
      navigate({ pathname: location.pathname, search: search ? `?${search}` : '' }, { replace: true });
    },
    [hotelId, location.pathname, location.search, navigate],
  );

  const value = useMemo(() => ({ hotel, hotels: Object.values(HOTELS), setHotel, preview, keep }), [hotel, setHotel, preview, keep]);
  return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>;
}

export const useHotel = () => {
  const ctx = useContext(HotelContext);
  if (!ctx) throw new Error('useHotel doit être utilisé dans <HotelProvider>');
  return ctx;
};

/** Ajoute à `to` les paramètres d'aperçu à conserver (`hotel`, `preview`). */
export function useHref() {
  const { keep } = useHotel();
  return useCallback(
    (to) => {
      const [pathAndSearch, hash] = to.split('#');
      const [path, search = ''] = pathAndSearch.split('?');
      const params = new URLSearchParams(search);
      keep.forEach((v, k) => params.set(k, v));
      const qs = params.toString();
      return `${path}${qs ? `?${qs}` : ''}${hash ? `#${hash}` : ''}`;
    },
    [keep],
  );
}

/** Lien interne qui conserve l'établissement de prévisualisation. */
export function AppLink({ to, ...props }) {
  const href = useHref();
  return <Link to={href(to)} {...props} />;
}

/** Retour à la page précédente de l'application, ou à l'accueil si on arrive directement. */
export function useBack() {
  const navigate = useNavigate();
  const href = useHref();
  return useCallback(() => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate(href('/'));
  }, [navigate, href]);
}
