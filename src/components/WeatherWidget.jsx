import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WeatherWidget = ({ t }) => {
  const { language } = useLanguage();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Mettre à jour l'heure chaque minute (pas chaque seconde pour économiser les ressources)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // 1 minute

    return () => clearInterval(timer);
  }, []);

  // Fonction pour obtenir l'icône météo
  const getWeatherIcon = (condition, size = "w-6 h-6") => {
    switch (condition) {
      case 'Clear':
        return <Sun className={`${size} text-yellow-500`} />;
      case 'Clouds':
        return <Cloud className={`${size} text-gray-500`} />;
      case 'Rain':
        return <CloudRain className={`${size} text-blue-500`} />;
      case 'Snow':
        return <CloudSnow className={`${size} text-gray-300`} />;
      default:
        return <Wind className={`${size} text-gray-400`} />;
    }
  };

  // Fonction pour convertir le code météo avec traduction
  const getWeatherCondition = (weathercode) => {
    let condition = 'Clear';
    let descriptionKey = 'sunny';

    if (weathercode >= 61 && weathercode <= 67) {
      condition = 'Rain';
      descriptionKey = 'rainy';
    } else if (weathercode >= 71 && weathercode <= 77) {
      condition = 'Snow';
      descriptionKey = 'snowy';
    } else if (weathercode >= 1 && weathercode <= 3) {
      condition = 'Clouds';
      descriptionKey = 'cloudy';
    } else if (weathercode >= 45 && weathercode <= 48) {
      condition = 'Clouds';
      descriptionKey = 'foggy';
    }

    // Traductions selon la langue
    const descriptions = {
      sunny: {
        fr: 'Ensoleillé',
        en: 'Sunny',
        es: 'Soleado',
        it: 'Soleggiato',
        de: 'Sonnig',
        pl: 'Słonecznie',
        pt: 'Ensolarado'
      },
      rainy: {
        fr: 'Pluvieux',
        en: 'Rainy',
        es: 'Lluvioso',
        it: 'Piovoso',
        de: 'Regnerisch',
        pl: 'Deszczowo',
        pt: 'Chuvoso'
      },
      snowy: {
        fr: 'Neigeux',
        en: 'Snowy',
        es: 'Nevoso',
        it: 'Nevoso',
        de: 'Schnee',
        pl: 'Śnieżnie',
        pt: 'Nevado'
      },
      cloudy: {
        fr: 'Nuageux',
        en: 'Cloudy',
        es: 'Nublado',
        it: 'Nuvoloso',
        de: 'Bewölkt',
        pl: 'Pochmurno',
        pt: 'Nublado'
      },
      foggy: {
        fr: 'Brouillard',
        en: 'Foggy',
        es: 'Niebla',
        it: 'Nebbia',
        de: 'Nebelig',
        pl: 'Mgliście',
        pt: 'Nevoeiro'
      }
    };

    // Utiliser directement la langue du contexte
    const description = descriptions[descriptionKey][language] || descriptions[descriptionKey].fr;

    return { condition, description };
  };

  // Fonction pour obtenir la météo de Lourdes avec prévisions
  const fetchWeather = async () => {
    try {
      // API avec données actuelles + prévisions 3 jours
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=43.09&longitude=-0.05&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FParis&forecast_days=3'
      );

      if (response.ok) {
        const data = await response.json();
        const current = data.current_weather;
        const { condition, description } = getWeatherCondition(current.weathercode);

        // Données actuelles
        setWeatherData({
          temperature: Math.round(current.temperature),
          condition,
          description
        });

        // Prévisions 3 jours (aujourd'hui + 2 jours suivants)
        if (data.daily) {
          const forecast = data.daily.weathercode.map((code, index) => {
            const { condition: dayCondition } = getWeatherCondition(code);
            const date = new Date();
            date.setDate(date.getDate() + index);

            // Labels traduits selon la langue
            const dayLabels = {
              today: { fr: 'Auj.', en: 'Today', es: 'Hoy', it: 'Oggi', de: 'Heute', pl: 'Dziś', pt: 'Hoje' },
              tomorrow: { fr: 'Dem.', en: 'Tom.', es: 'Mañ.', it: 'Dom.', de: 'Morg.', pl: 'Jutro', pt: 'Amanhã' }
            };

            let dayLabel;
            if (index === 0) {
              dayLabel = dayLabels.today[language];
            } else if (index === 1) {
              dayLabel = dayLabels.tomorrow[language];
            } else {
              // Utiliser la locale correspondante pour les jours de la semaine
              const locales = { fr: 'fr-FR', en: 'en-US', es: 'es-ES', it: 'it-IT', de: 'de-DE', pl: 'pl-PL', pt: 'pt-PT' };
              dayLabel = date.toLocaleDateString(locales[language], { weekday: 'short' });
            }

            return {
              day: dayLabel,
              condition: dayCondition,
              maxTemp: Math.round(data.daily.temperature_2m_max[index]),
              minTemp: Math.round(data.daily.temperature_2m_min[index])
            };
          });
          setForecastData(forecast);
        }
      } else {
        // Données par défaut avec traduction
        const { description: defaultDescription } = getWeatherCondition(0); // Code 0 = ensoleillé
        setWeatherData({
          temperature: 18,
          condition: 'Clear',
          description: defaultDescription
        });
        setForecastData([
          { day: 'Auj.', condition: 'Clear', maxTemp: 18, minTemp: 12 },
          { day: 'Dem.', condition: 'Clouds', maxTemp: 17, minTemp: 10 },
          { day: 'Mer.', condition: 'Rain', maxTemp: 15, minTemp: 8 }
        ]);
      }
    } catch (error) {
      console.log('Erreur météo:', error);
      // Données par défaut en cas d'erreur avec traduction
      const { description: errorDescription } = getWeatherCondition(0);
      setWeatherData({
        temperature: 18,
        condition: 'Clear',
        description: errorDescription
      });
      setForecastData([
        { day: 'Auj.', condition: 'Clear', maxTemp: 18, minTemp: 12 },
        { day: 'Dem.', condition: 'Clouds', maxTemp: 17, minTemp: 10 },
        { day: 'Mer.', condition: 'Rain', maxTemp: 15, minTemp: 8 }
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
    // Actualiser toutes les 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [language]); // Re-fetch when language changes

  if (loading) {
    return (
      <motion.div
        className="bg-white p-4 rounded-xl shadow-majestic flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="animate-pulse flex items-center space-x-4">
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow-majestic"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* En-tête avec date et heure - côte à côte */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-majestic-gold" />
          <span className="text-sm font-semibold text-majestic-navy">
            {currentDateTime.toLocaleDateString('fr-FR', { 
              weekday: 'short', 
              day: 'numeric', 
              month: 'short' 
            })}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-majestic-gold">
          <Clock className="w-4 h-4" />
          <span className="font-mono text-sm font-semibold">
            {currentDateTime.toLocaleTimeString('fr-FR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>

      {/* Tout côte à côte : Météo actuelle + Prévisions */}
      <div className="flex items-center justify-between">
        {/* Météo actuelle */}
        <div className="flex items-center space-x-3">
          {getWeatherIcon(weatherData.condition)}
          <div>
            <p className="font-semibold text-majestic-navy">Lourdes</p>
            <p className="text-sm text-slate-600">{weatherData.description}</p>
            <p className="text-2xl font-bold text-majestic-navy">{weatherData.temperature}°C</p>
          </div>
        </div>

        {/* Prévisions 3 jours côte à côte */}
        <div className="flex space-x-3">
          {forecastData.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-xs font-semibold text-slate-600 mb-1">{day.day}</p>
              <div className="flex justify-center mb-1">
                {getWeatherIcon(day.condition, "w-4 h-4")}
              </div>
              <div className="text-xs">
                <p className="font-semibold text-majestic-navy">{day.maxTemp}°</p>
                <p className="text-slate-500">{day.minTemp}°</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </motion.div>
  );
};

export default WeatherWidget;