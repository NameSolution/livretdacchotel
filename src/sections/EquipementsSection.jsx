import React from 'react';
import { motion } from 'framer-motion';
import { Tv, Wind, ShieldCheck, Thermometer, Coffee, GlassWater, Building, Utensils, Bike, Luggage, Presentation } from 'lucide-react';

const EquipementItem = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-3">
    <Icon className="w-5 h-5 text-majestic-gold flex-shrink-0" />
    <span className="text-slate-700">{text}</span>
  </div>
);

const EquipementsSection = ({ t }) => {
  if (!t || !t.equipements) return null;

  const roomEquipements = [
    { icon: Tv, text: t.equipements.room_1 },
    { icon: Wind, text: t.equipements.room_2 },
    { icon: ShieldCheck, text: t.equipements.room_3 },
    { icon: Thermometer, text: t.equipements.room_4 },
    { icon: Coffee, text: t.equipements.room_5 },
  ];

  const hotelFacilities = [
    { icon: GlassWater, text: t.equipements.facilities_1 },
    { icon: Utensils, text: t.equipements.facilities_2 },
    { icon: Presentation, text: t.equipements.facilities_3 },
    { icon: Bike, text: t.equipements.facilities_4 },
    { icon: Luggage, text: t.equipements.facilities_5 },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-brand text-4xl font-bold text-majestic-navy">
          {t.equipements.title}
        </h2>
        <p className="text-slate-600 mt-2 text-base">{t.equipements.subtitle}</p>
      </motion.div>

      <motion.div
        className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="font-semibold text-majestic-navy text-lg mb-4">{t.equipements.in_your_room}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roomEquipements.map((item, index) => <EquipementItem key={index} {...item} />)}
        </div>
      </motion.div>
      
      <motion.div
        className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="font-semibold text-majestic-navy text-lg mb-4">{t.equipements.hotel_facilities}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hotelFacilities.map((item, index) => <EquipementItem key={index} {...item} />)}
        </div>
      </motion.div>

    </div>
  );
};

export default EquipementsSection;