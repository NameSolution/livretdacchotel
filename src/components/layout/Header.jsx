import React from 'react';
import { motion } from 'framer-motion';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getLogoUrl } from '@/lib/data';

const Header = ({ t }) => {
  const logoUrl = getLogoUrl();

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm shadow-header z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 bg-majestic-navy rounded-xl flex items-center justify-center shadow-inner overflow-hidden">
              <img className="w-full h-full object-cover" alt="Hotel Majestic Logo" src="/assets/images/logo.png" />
            </div>
            <div>
              <h1 className="font-brand text-xl font-bold text-majestic-navy">Hôtel Majestic</h1>
            </div>
          </motion.div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;