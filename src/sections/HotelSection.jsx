import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, BookOpen, ChevronRight, Tv, Wind, ShieldCheck, Coffee, GlassWater, Utensils, Bike, Luggage, Presentation } from 'lucide-react';

const EquipementItem = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-3">
    <Icon className="w-5 h-5 text-majestic-gold flex-shrink-0" />
    <span className="text-slate-700">{text}</span>
  </div>
);

const HotelSection = ({ t }) => {
  if (!t || !t.hotel) return null;

  const roomEquipements = [
    { icon: Tv, text: t.hotel.room_1 },
    { icon: Wind, text: t.hotel.room_2 },
    { icon: ShieldCheck, text: t.hotel.room_3 },
    { icon: Coffee, text: t.hotel.room_5 },
  ];

  const hotelFacilities = [
    { icon: GlassWater, text: t.hotel.facilities_1 },
    { icon: Utensils, text: t.hotel.facilities_2 },
    { icon: Presentation, text: t.hotel.facilities_3 },
    { icon: Bike, text: t.hotel.facilities_4 },
    { icon: Luggage, text: t.hotel.facilities_5 },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-brand text-4xl font-bold text-majestic-navy">
          {t.hotel.title}
        </h2>
        <p className="text-slate-600 mt-2 text-base">{t.hotel.subtitle}</p>
      </motion.div>

      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img
          className="w-full h-52 object-cover"
          alt={t.hotel.image_alt}
          src="https://images.unsplash.com/photo-1679494850246-0a4ed72264c5"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-brand text-3xl font-bold">{t.hotel.image_title}</h3>
          <p className="text-sm opacity-90">{t.hotel.image_subtitle}</p>
        </div>
      </motion.div>

      <div className="space-y-4">
        <motion.div
          className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <MapPin className="w-5 h-5 text-majestic-gold" />
            <h3 className="font-semibold text-majestic-navy text-lg">{t.hotel.address}</h3>
          </div>
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">{t.hotel.address_details}</p>
        </motion.div>

        <motion.div
          className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <Star className="w-5 h-5 text-majestic-gold" />
            <h3 className="font-semibold text-majestic-navy text-lg">{t.hotel.engagement}</h3>
          </div>
          <p className="text-slate-700 leading-relaxed">{t.hotel.engagement_details}</p>
        </motion.div>

        <motion.div
          className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="font-semibold text-majestic-navy text-lg mb-4">{t.hotel.amenities}</h3>
          <p className="text-slate-600 mb-4 text-base">{t.hotel.amenities_subtitle}</p>
          <div className="mb-6">
            <h4 className="font-medium text-majestic-navy mb-2">{t.hotel.in_your_room}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roomEquipements.map((item, index) => <EquipementItem key={index} {...item} />)}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-majestic-navy mb-2">{t.hotel.hotel_facilities}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hotelFacilities.map((item, index) => <EquipementItem key={index} {...item} />)}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <BookOpen className="w-5 h-5 text-majestic-gold" />
            <h3 className="font-semibold text-majestic-navy text-lg">{t.hotel.rules}</h3>
          </div>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start space-x-3">
              <ChevronRight className="w-4 h-4 text-majestic-gold flex-shrink-0 mt-1" />
              <span>{t.hotel.rules_1}</span>
            </li>
            <li className="flex items-start space-x-3">
              <ChevronRight className="w-4 h-4 text-majestic-gold flex-shrink-0 mt-1" />
              <span>{t.hotel.rules_2}</span>
            </li>
            <li className="flex items-start space-x-3">
              <ChevronRight className="w-4 h-4 text-majestic-gold flex-shrink-0 mt-1" />
              <span>{t.hotel.rules_3}</span>
            </li>
            <li className="flex items-start space-x-3">
              <ChevronRight className="w-4 h-4 text-majestic-gold flex-shrink-0 mt-1" />
              <span>{t.hotel.rules_4}</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default HotelSection;