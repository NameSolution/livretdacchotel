import React from 'react';
import { motion } from 'framer-motion';
import WeatherWidget from '@/components/WeatherWidget';
import { Clock, MapPin, ParkingCircle, Church, TrainFront, Plane, Car } from 'lucide-react';
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

      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img  
          className="w-full h-52 object-cover"
          alt={t.accueil.image_alt} src="https://images.unsplash.com/photo-1668109104325-3e9341bdc4b3" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="font-brand text-3xl font-bold">{t.accueil.etablissement}</h2>
        </div>
      </motion.div>
      
      <motion.div
        className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="font-brand text-2xl font-bold text-majestic-navy mb-3">{t.accueil.intro_title}</h3>
        <p className="text-slate-700 leading-relaxed">{t.accueil.intro_text}</p>
      </motion.div>

      <InfoCard title={t.services.title} delay={0.4} icon={Clock}>
        <ul className="space-y-2 text-slate-700 text-sm">
            <li><strong>{t.services.checkin.split(':')[0]}:</strong>{t.services.checkin.split(':')[1]}</li>
            <li><strong>{t.services.checkout.split(':')[0]}:</strong>{t.services.checkout.split(':')[1]}</li>
            <li><strong>{t.services.breakfast.split(':')[0]}:</strong>{t.services.breakfast.split(':')[1]}</li>
            <li><strong>{t.services.wifi.split(':')[0]}:</strong> {t.services.wifi_details} ({t.services.no_password})</li>
            <li><strong>{t.services.animaux.split(':')[0]}:</strong> {t.services.pets_accepted} ({t.services.pets_fee})</li>
            <li><strong>{t.services.bagagerie.split(':')[0]}:</strong> {t.services.bagagerie_details}</li>
        </ul>
      </InfoCard>

      <InfoCard title={t.acces.title} delay={0.5} icon={MapPin}>
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