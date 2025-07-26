import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Activity, ExternalLink, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RecommandationsSection = ({ t, onNotImplemented }) => {
  const restaurants = [
    { name: 'Le Majestic Restaurant', type: t.recommandations.french_cuisine, distance: `0 ${t.recommandations.walk_distance}` },
    { name: 'Brasserie de l\'Hôtel de Ville', type: t.recommandations.traditional_brasserie, distance: `5 ${t.recommandations.walk_distance}` },
    { name: 'Restaurant Alexandra', type: t.recommandations.regional_cuisine, distance: `8 ${t.recommandations.walk_distance}` },
  ];

  const activites = [
    { name: 'Sanctuaires de Lourdes', type: t.recommandations.spiritual, distance: `10 ${t.recommandations.car_distance}` },
    { name: 'Château fort de Lourdes', type: t.recommandations.historical, distance: `15 ${t.recommandations.car_distance}` },
    { name: 'Pic du Jer', type: t.recommandations.nature_panorama, distance: `20 ${t.recommandations.car_distance}` },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-brand text-4xl font-bold text-majestic-navy">
          {t.recommandations.title}
        </h2>
        <p className="text-slate-600 mt-2 text-base">{t.recommandations.subtitle}</p>
      </motion.div>

      <div className="space-y-4">
        <motion.div
          className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <Utensils className="w-5 h-5 text-majestic-gold" />
            <h3 className="font-semibold text-majestic-navy text-lg">{t.recommandations.restaurants}</h3>
          </div>
          <div className="space-y-3">
            {restaurants.map((r, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-800">{r.name}</p>
                  <p className="text-sm text-slate-500">{r.type}</p>
                </div>
                <p className="text-sm text-majestic-gold font-semibold">{r.distance}</p>
              </div>
            ))}
          </div>
          <Button onClick={onNotImplemented} variant="outline" className="w-full mt-4">{t.recommandations.see_more_restaurants} <ExternalLink className="w-4 h-4 ml-2" /></Button>
        </motion.div>

        <motion.div
          className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <Activity className="w-5 h-5 text-majestic-gold" />
            <h3 className="font-semibold text-majestic-navy text-lg">{t.recommandations.activities}</h3>
          </div>
          <div className="space-y-3">
            {activites.map((a, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-800">{a.name}</p>
                  <p className="text-sm text-slate-500">{a.type}</p>
                </div>
                <p className="text-sm text-majestic-gold font-semibold">{a.distance}</p>
              </div>
            ))}
          </div>
          <Button onClick={onNotImplemented} variant="outline" className="w-full mt-4">{t.recommandations.discover_more} <ExternalLink className="w-4 h-4 ml-2" /></Button>
        </motion.div>
      </div>
    </div>
  );
};

export default RecommandationsSection;