import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Coffee, Wifi, PawPrint, Luggage, ChevronRight } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, items, delay }) => (
  <motion.div
    className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex items-center space-x-3 mb-3">
      <div className="bg-majestic-light-gold p-3 rounded-xl">
        <Icon className="w-6 h-6 text-majestic-navy" />
      </div>
      <h3 className="font-semibold text-majestic-navy text-lg">{title}</h3>
    </div>
    <ul className="space-y-2 text-slate-700">
      {items.map((item, index) => (
        <li key={index} className="flex items-start space-x-3">
          <ChevronRight className="w-4 h-4 text-majestic-gold mt-1 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const ServicesSection = ({ t }) => {
  if (!t || !t.services) return null;

  // Modified services array to remove breakfast times and update WiFi details
  const services = [
    {
      icon: Clock,
      title: t.services.horaires_title,
      items: [t.services.checkin, t.services.checkout], // Removed breakfast related items
      delay: 0.3
    },
    {
      icon: Coffee,
      title: t.services.restauration,
      items: [t.services.breakfast_buffet],
      delay: 0.4
    },
    {
      icon: Wifi,
      title: t.services.wifi,
      items: [t.services.wifi_details, t.services.wifi_password_reception], // Updated wifi details
      delay: 0.5
    },
    {
      icon: PawPrint,
      title: t.services.animaux,
      items: [t.services.pets_accepted, t.services.pets_fee],
      delay: 0.6
    },
    {
      icon: Luggage,
      title: t.services.bagagerie,
      items: [t.services.bagagerie_details],
      delay: 0.7
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-brand text-4xl font-bold text-majestic-navy">
          {t.services.title}
        </h2>
        <p className="text-slate-600 mt-2 text-base">{t.services.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;