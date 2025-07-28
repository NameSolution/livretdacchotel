import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Activity, MapPin, ExternalLink, ShoppingBag, Clock, Car, Bus, Bike, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getDiscoverData } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';

const DecouvrirSection = ({ t }) => {
  const { language } = useLanguage();
  const [data, setData] = useState({
    restaurants: [],
    activites: [],
    commerces: [],
    transports: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const discoverData = await getDiscoverData(t, language);
        setData(discoverData);
      } catch (error) {
        console.error('Error loading discover data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [t, language]);

  const { restaurants, activites, commerces, transports } = data;

  const CardCarousel = ({ title, icon: Icon, items }) => (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center space-x-3">
        <Icon className="w-6 h-6 text-majestic-gold" />
        <h3 className="font-brand text-3xl font-bold text-majestic-navy">{title}</h3>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-majestic border border-white overflow-hidden flex flex-col h-full">
                  <img src={item.img} alt={item.name} className="w-full h-40 object-cover" />
                  <div className="p-4 flex flex-col flex-grow">
                    <p className="font-semibold text-majestic-navy truncate">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.type}</p>
                    <div className="flex justify-between items-center mt-auto pt-3">
                      <p className="text-xs text-majestic-gold font-semibold">{item.distance}</p>
                       <Button asChild size="sm" variant="outline">
                        <a href={item.mapLink} target="_blank" rel="noopener noreferrer">
                          <MapPin className="w-3 h-3 mr-1" />{t.recommandations.see_map}
                        </a>
                       </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
            <CarouselPrevious />
            <CarouselNext />
        </div>
      </Carousel>
    </motion.div>
  );


  if (loading) {
    return (
      <div className="space-y-12">
        <div className="text-center">
          <p className="text-slate-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
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

      <div className="space-y-6">
        <CardCarousel title={t.recommandations.restaurants} icon={Utensils} items={restaurants} />
      </div>

      <div className="space-y-6">
        <CardCarousel title={t.recommandations.activities} icon={Activity} items={activites} />
      </div>

      {/* Nouvelles sections d'informations pratiques */}
      <div className="space-y-6">
         <CardCarousel title={t.recommandations.shops_services} icon={ShoppingBag} items={commerces} />
           <CardCarousel title={t.recommandations.transport_mobility} icon={Bus} items={transports} />
      </div>

      {/* Note et bouton en bas de page */}
      <div className="text-center pt-8 space-y-4">
        <p className="text-slate-500 text-sm italic">{t.recommandations.non_exhaustive_note}</p>
        <Button asChild variant="default" className="bg-majestic-navy hover:bg-majestic-dark-navy text-base px-6 py-2">
          <a href={t.recommandations.more_info_url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            {t.recommandations.more_info}
          </a>
        </Button>
      </div>

    </div>
  );
};

export default DecouvrirSection;