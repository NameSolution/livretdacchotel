
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Map, Phone } from 'lucide-react';

const MobileNav = ({ activeSection, setActiveSection, t }) => {
  const navItems = [
    { id: 'accueil', label: t.nav.accueil, icon: Home },
    { id: 'decouvrir', label: t.nav.decouvrir, icon: Map },
    { id: 'contact', label: t.nav.contact, icon: Phone },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-background/80 backdrop-blur-sm border-t border-slate-200/80 z-50">
      <div className="max-w-4xl mx-auto h-full px-2">
        <div className="grid grid-cols-3 h-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="relative flex flex-col items-center justify-center text-slate-500 transition-colors duration-300 focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-12 h-10">
                {activeSection === item.id && (
                  <motion.div
                    layoutId="active-nav-bg"
                    className="absolute inset-0 bg-majestic-navy/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <item.icon className={`w-5 h-5 z-10 transition-colors duration-300 ${activeSection === item.id ? 'text-majestic-navy' : ''}`} />
              </div>
              <span className={`text-xs mt-1 text-center transition-colors duration-300 ${activeSection === item.id ? 'text-majestic-navy font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
