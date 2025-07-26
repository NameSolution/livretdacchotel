import React from 'react';
import { motion } from 'framer-motion';
import { Phone, AlarmPlus as FirstAidKit, Siren, ShieldAlert, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UrgencesSection = ({ t, onNotImplemented }) => {
  if (!t || !t.urgences) return null;

  const urgences = [
    { service: t.urgences.samu, numero: '15' },
    { service: t.urgences.police, numero: '17' },
    { service: t.urgences.pompier, numero: '18' },
    { service: t.urgences.europe, numero: '112' },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-brand text-4xl font-bold text-majestic-navy">
          {t.urgences.title}
        </h2>
        <p className="text-slate-600 mt-2 text-base">{t.urgences.subtitle}</p>
      </motion.div>
      
      <motion.div
        className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <Siren className="w-6 h-6 text-red-600" />
          <h3 className="font-semibold text-majestic-navy text-lg">{t.urgences.numbers_title}</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {urgences.map((u, i) => (
            <a href={`tel:${u.numero}`} key={i} className="bg-red-50 text-red-700 rounded-lg p-3 hover:bg-red-100 transition-colors">
              <p className="font-bold text-2xl">{u.numero}</p>
              <p className="text-xs font-semibold uppercase tracking-wide">{u.service}</p>
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center space-x-3 mb-2">
          <FirstAidKit className="w-5 h-5 text-majestic-gold" />
          <h3 className="font-semibold text-majestic-navy text-lg">{t.urgences.pharmacy_title}</h3>
        </div>
        <p className="text-slate-700">{t.urgences.pharmacy_details}</p>
      </motion.div>

      <motion.div
        className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <ShieldAlert className="w-5 h-5 text-majestic-gold" />
          <h3 className="font-semibold text-majestic-navy text-lg">{t.urgences.safety_title}</h3>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start space-x-3">
            <ChevronRight className="w-4 h-4 text-majestic-gold flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">{t.urgences.safety_1_title}</p>
              <p className="text-slate-700 text-sm">{t.urgences.safety_1_details}</p>
            </div>
          </li>
           <li className="flex items-start space-x-3">
            <ChevronRight className="w-4 h-4 text-majestic-gold flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">{t.urgences.safety_2_title}</p>
              <p className="text-slate-700 text-sm">{t.urgences.safety_2_details}</p>
            </div>
          </li>
        </ul>
      </motion.div>

    </div>
  );
};

export default UrgencesSection;