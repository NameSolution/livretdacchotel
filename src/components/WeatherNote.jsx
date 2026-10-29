import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import { useHotel } from '../lib/hotel-context';

const codeToKey = (code) => {
  if (code === 0) return 'clear';
  if (code <= 2) return 'partly';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if (code >= 95) return 'storm';
  return 'cloudy';
};

const TTL = 30 * 60 * 1000;

async function load({ lat, lon }, signal) {
  const cacheKey = `pristi-guest:weather:${lat},${lon}`;
  try {
    const cached = JSON.parse(sessionStorage.getItem(cacheKey) ?? 'null');
    if (cached && Date.now() - cached.at < TTL) return cached.data;
  } catch {
    /* pas de cache disponible */
  }
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`weather ${res.status}`);
  const json = await res.json();
  const data = { temp: Math.round(json.current.temperature_2m), code: json.current.weather_code };
  try {
    sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* ignoré */
  }
  return data;
}

/**
 * Météo discrète (Open-Meteo, sans clé). En cas d'erreur, de hors-ligne ou de lenteur,
 * rien n'est affiché : on ne montre jamais une température inventée.
 */
export default function WeatherNote() {
  const { hotel } = useHotel();
  const { t } = useI18n();
  const [data, setData] = useState(null);
  const cfg = hotel.weather;

  useEffect(() => {
    setData(null);
    if (!cfg) return undefined;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    load(cfg, ctrl.signal)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => clearTimeout(timer));
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [cfg?.lat, cfg?.lon]);

  if (!cfg || !data) return null;
  return (
    <p className="small fade-in tnum" title={`${cfg.place} — Open-Meteo`}>
      {data.temp} °C · {t(`guest.weather.${codeToKey(data.code)}`)}
    </p>
  );
}
