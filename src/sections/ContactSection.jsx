import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Globe, Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const ContactSection = ({ t }) => {
  const contactItems = [
    { icon: Phone, title: t.contact.phone, value: "+33 (0)5 62 94 27 23", buttonText: t.contact.call_now, href: "tel:+33562942723" },
    { icon: Mail, title: t.contact.email, value: "hotel@majestic-lourdes.com", buttonText: t.contact.send_email, href: "mailto:hotel@majestic-lourdes.com" },
    { icon: Globe, title: t.contact.website, value: t.contact.website_url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, ''), buttonText: t.contact.visit_website, href: t.contact.website_url },
  ];

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
    { q: t.faq.q7, a: t.faq.a7 },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-brand text-4xl font-bold text-majestic-navy">
          {t.contact.title}
        </h2>
        <p className="text-slate-600 mt-2 text-base">{t.contact.subtitle}</p>
      </motion.div>

      <div className="space-y-6">
        <motion.div
            className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <Phone className="w-5 h-5 text-majestic-gold" />
              <h3 className="font-semibold text-majestic-navy text-lg">{t.contact.contact_info}</h3>
            </div>
            <div className="divide-y divide-slate-200">
              {contactItems.map(item => (
                <div key={item.title} className="flex items-center justify-between py-3 gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-500 text-sm">{item.title}</p>
                    <p className="text-slate-800 font-semibold truncate">{item.value}</p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="flex-shrink-0">
                    <a href={item.href} target="_blank" rel="noopener noreferrer">{item.buttonText}</a>
                  </Button>
                </div>
              ))}
            </div>
        </motion.div>

        <motion.div
          className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <Star className="w-5 h-5 text-majestic-gold" />
            <h3 className="font-semibold text-majestic-navy text-lg">{t.contact.reviews}</h3>
          </div>
          <p className="text-slate-600 mb-3 text-sm">{t.contact.reviews_details}</p>
          <div className="grid grid-cols-2 gap-3">
            <Button asChild variant="secondary" className="w-full">
              <a href={t.contact.google_reviews_url} target="_blank" rel="noopener noreferrer">Google</a>
            </Button>
            <Button asChild variant="secondary" className="w-full">
              <a href={t.contact.tripadvisor_reviews_url} target="_blank" rel="noopener noreferrer">TripAdvisor</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-majestic border border-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <MessageSquare className="w-5 h-5 text-majestic-gold" />
            <h3 className="font-semibold text-majestic-navy text-lg">{t.faq.title}</h3>
          </div>
           <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-majestic-navy">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-slate-700">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;