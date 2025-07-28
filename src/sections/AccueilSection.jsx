import React from 'react';
import { motion } from 'framer-motion';
import WeatherWidget from '@/components/WeatherWidget';
import { Clock, MapPin, ParkingCircle, Church, TrainFront, Plane, Car, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InfoCard = ({ icon: Icon, title, children, delay }) => (
  <motion.div
    className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex items-center space-x-3 mb-3">
        <Icon className="w-5 h-5 text-majestic-gold" />
        <h3 className="font-semibold text-majestic-navy text-lg">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const AccessItem = ({ icon: Icon, title, details, href, buttonText }) => (
    <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-2">
      <div>
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-majestic-navy flex-shrink-0" />
          <p className="font-semibold text-majestic-navy">{title}</p>
        </div>
        <p className="text-sm text-slate-600 pl-6">{details}</p>
      </div>
      {href && buttonText && (
        <Button asChild variant="outline" size="sm" className="mt-2 sm:mt-0 ml-6 sm:ml-0 flex-shrink-0">
          <a href={href} target="_blank" rel="noopener noreferrer">
            {buttonText}
          </a>
        </Button>
      )}
    </div>
);

const AccueilSection = ({ t }) => {
  if (!t || !t.accueil || !t.services || !t.acces) {
    return null;
  }

  const quickAccessItems = [
    {
      icon: ParkingCircle,
      title: t.acces.parking_title,
      details: t.acces.parking_details,
      href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Parking Hélios, Lourdes")}`,
      buttonText: t.acces.get_directions
    },
    {
      icon: Church,
      title: t.acces.sanctuaires_title,
      details: t.acces.sanctuaires_details,
      href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Sanctuaires Notre-Dame de Lourdes")}`,
      buttonText: t.acces.get_directions
    },
    {
        icon: TrainFront,
        title: t.acces.train_station_title,
        details: t.acces.train_station_details,
        href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Gare de Lourdes")}`,
        buttonText: t.acces.get_directions
    },
    {
        icon: Plane,
        title: t.acces.airport_title,
        details: t.acces.airport_details,
        href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Aéroport Tarbes-Lourdes-Pyrénées")}`,
        buttonText: t.acces.get_directions
    },
    {
        icon: Car,
        title: t.acces.taxi_title,
        details: t.acces.taxi_details,
        href: "tel:+33562420808",
        buttonText: t.contact.call_now
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-majestic-gold font-semibold">{t.accueil.greeting}</p>
        <h1 className="font-brand text-4xl font-bold text-majestic-navy mt-1">
          {t.accueil.welcome}
        </h1>
        <p className="text-slate-600 mt-2 text-base">{t.accueil.subtitle}</p>
      </motion.div>

      <WeatherWidget t={t} />

      {/* Section Promotion Petit-Déjeuner - Design amélioré */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-majestic border border-white/50 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image côté gauche */}
          <div className="md:w-2/5 relative">
            <img  
              className="w-full h-48 md:h-full object-cover"
              alt={t.accueil.breakfast_image_alt} 
              src="/assets/images/petit-dejeuner.jpg" 
            />
            <div className="absolute top-3 left-3">
              <div className="bg-majestic-gold px-3 py-1 rounded-full shadow-lg">
                <span className="text-white font-bold text-sm">{t.accueil.breakfast_price}</span>
              </div>
            </div>
          </div>
          
          {/* Contenu côté droit */}
          <div className="md:w-3/5 p-6">
            <div className="flex items-center space-x-2 mb-3">
              <Coffee className="w-5 h-5 text-majestic-gold" />
              <h3 className="font-brand text-2xl font-bold text-majestic-navy">{t.accueil.breakfast_title}</h3>
            </div>
            
            <p className="text-slate-700 mb-4 leading-relaxed">{t.accueil.breakfast_description}</p>
            
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-2 bg-slate-100 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-majestic-navy" />
                <span className="text-majestic-navy font-medium text-sm">{t.accueil.breakfast_hours}</span>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 leading-relaxed">{t.accueil.breakfast_details}</p>
          </div>
        </div>
      </motion.div>
      
      <InfoCard title={t.services.title} delay={0.3} icon={Clock}>
        <ul className="space-y-2 text-slate-700 text-sm">
            <li>{t.services.checkin}</li>
            <li>{t.services.checkout}</li>
            <li><strong>{t.services.breakfast.split(':')[0]}:</strong>{t.services.breakfast.split(':')[1]}</li>
            <li><strong>{t.services.wifi.split(':')[0]}:</strong> {t.services.wifi_details} ({t.services.no_password})</li>
            <li><strong>{t.services.animaux.split(':')[0]}:</strong> {t.services.pets_accepted} ({t.services.pets_fee})</li>
            <li><strong>{t.services.bagagerie.split(':')[0]}:</strong> {t.services.bagagerie_details}</li>
        </ul>
      </InfoCard>

      <InfoCard title={t.acces.title} delay={0.4} icon={MapPin}>
        <div className="space-y-4">
          {quickAccessItems.map((item, index) => (
            <AccessItem key={index} {...item} />
          ))}
        </div>
      </InfoCard>

    </div>
  );
};

export default AccueilSection;