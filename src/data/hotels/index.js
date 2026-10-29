import verriere from './verriere';
import arolle from './arolle';

/** Registre des établissements de démonstration. Le premier est l'établissement par défaut. */
export const HOTELS = { verriere, arolle };
export const DEFAULT_HOTEL = 'verriere';

export const getHotel = (id) => HOTELS[id] ?? HOTELS[DEFAULT_HOTEL];
