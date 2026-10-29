import { describe, expect, it } from 'vitest';
import { HOTELS } from '../data/hotels';
import { breakfastToday, findInfo, indexEntries } from './selectors';
import { formatRange, formatTime } from './format';

describe('breakfastToday', () => {
  const { breakfast } = HOTELS.verriere;
  it('distingue semaine et week-end', () => {
    expect(breakfastToday(breakfast, new Date('2026-10-28T12:00:00')).from).toBe('07:00'); // mercredi
    expect(breakfastToday(breakfast, new Date('2026-10-31T12:00:00')).from).toBe('07:30'); // samedi
  });
  it('retourne null sans horaires (champ masqué)', () => {
    expect(breakfastToday({})).toBeNull();
  });
});

describe('formatage des heures', () => {
  it('français : 7 h 30, 11 h', () => {
    expect(formatTime('07:30', 'fr')).toBe('7 h 30');
    expect(formatTime('11:00', 'fr')).toBe('11 h');
    expect(formatRange('07:00', '10:30', 'fr')).toBe('7 h – 10 h 30');
  });
  it('anglais : 12 h am/pm', () => {
    expect(formatTime('15:00', 'en')).toBe('3:00 pm');
    expect(formatTime('00:00', 'en')).toBe('12:00 am');
  });
});

describe('cohérence des données d’établissement', () => {
  describe.each(Object.values(HOTELS))('$name', (hotel) => {
    it('toutes les images référencées existent dans le registre', () => {
      hotel.discover.places.filter((p) => p.image).forEach((p) => expect(hotel.images[p.image], p.id).toBeDefined());
      Object.values(hotel.aside).forEach((key) => expect(hotel.images[key], key).toBeDefined());
      expect(hotel.images[hotel.breakfast.image]).toBeDefined();
    });
    it('les sélections de l’accueil et les liens de services existent', () => {
      hotel.home.featured.forEach((id) => expect(hotel.discover.places.find((p) => p.id === id), id).toBeDefined());
      hotel.services.forEach((s) => expect(findInfo(hotel, s.id), s.id).not.toBeNull());
      indexEntries(hotel).forEach((e) => expect(e.to).toMatch(/^\/(infos|decouvrir)\?/));
    });
    it('les identifiants de rubriques sont uniques', () => {
      const ids = hotel.info.groups.flatMap((g) => [g.id, ...g.items.map((i) => i.id)]);
      expect(new Set(ids).size).toBe(ids.length);
    });
    it('chaque lieu a un nom, une catégorie valide et une description', () => {
      hotel.discover.places.forEach((p) => {
        expect(['restaurants', 'sights', 'transport', 'services']).toContain(p.cat);
        expect(p.name).toBeTruthy();
        expect(p.description).toBeTruthy();
      });
    });
    it('les contenus visibles ont une version française et anglaise', () => {
      const missing = [];
      const walk = (node, path) => {
        if (node && typeof node === 'object') {
          const keys = Object.keys(node);
          if (keys.includes('fr') || keys.includes('en')) {
            if (!node.fr || !node.en) missing.push(path);
          } else keys.forEach((k) => walk(node[k], `${path}.${k}`));
        }
      };
      ['welcome', 'breakfast', 'info', 'discover', 'services', 'descriptor'].forEach((k) => walk(hotel[k], k));
      expect(missing).toEqual([]);
    });
  });

  it('les deux établissements utilisent exactement la même structure', () => {
    const shape = (h) => Object.keys(h).sort().join();
    expect(shape(HOTELS.verriere)).toBe(shape(HOTELS.arolle));
  });
});
