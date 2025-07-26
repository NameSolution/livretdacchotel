import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Car, Train, Bus, Bike } from 'lucide-react';
import { Icon } from 'leaflet';

const MapWrapper = ({t}) => {
  const position = [43.0964, -0.0456]; // Coordonnées de l'Hôtel Majestic
  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
    iconSize: [38, 38],
  });

  return (
    <motion.div
      className="rounded-2xl h-64 overflow-hidden shadow-lg border-4 border-white"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <MapContainer center={position} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            Hôtel Majestic <br /> 9 avenue Maransin, 65100 Lourdes
          </Popup>
        </Marker>
      </MapContainer>
    </motion.div>
  );
}


const AccesSection = ({ t }) => {
  if (!t || !t.acces) return null;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-brand text-4xl font-bold text-majestic-navy">
          {t.acces.title}
        </h2>
        <p className="text-slate-600 mt-2 text-base">{t.acces.subtitle}</p>
      </motion.div>

      <MapWrapper t={t} />

      <div className="space-y-4">
        <motion.div
          className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <Car className="w-5 h-5 text-majestic-gold" />
            <h3 className="font-semibold text-majestic-navy text-lg">{t.acces.by_car}</h3>
          </div>
          <p className="text-slate-700">{t.acces.parking}</p>
          <p className="text-sm text-slate-500 mt-1">
            <strong>{t.acces.parking_tip_title}</strong> {t.acces.parking_tip}
          </p>
        </motion.div>

        <motion.div
          className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <Train className="w-5 h-5 text-majestic-gold" />
            <h3 className="font-semibold text-majestic-navy text-lg">{t.acces.public_transport}</h3>
          </div>
          <div className="space-y-1 text-slate-700">
            <p><strong>{t.acces.train}:</strong> {t.acces.train_details}</p>
            <p><strong>{t.acces.bus}:</strong> {t.acces.bus_details}</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <Bike className="w-5 h-5 text-majestic-gold" />
            <h3 className="font-semibold text-majestic-navy text-lg">{t.acces.by_bike}</h3>
          </div>
          <p className="text-slate-700">{t.acces.bike_details}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AccesSection;