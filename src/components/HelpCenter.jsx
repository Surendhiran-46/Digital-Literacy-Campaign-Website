import React from 'react';
import { motion as Motion } from 'framer-motion';
import { UseLanguage } from '../context/LanguageContext';
import { Lightbulb, Smartphone, Bot, MessageCircle, ShieldCheck } from 'lucide-react';

const HelpCenter = () => {
  const { t } = UseLanguage();

  const helpTopics = [
    {
      icon: <Smartphone size={28} />,
      title: t('help_card1_title'),
      description: t('help_card1_desc'),
    },
    {
      icon: <Bot size={28} />,
      title: t('help_card2_title'),
      description: t('help_card2_desc'),
    },
    {
      icon: <MessageCircle size={28} />,
      title: t('help_card3_title'),
      description: t('help_card3_desc'),
    },
    {
      icon: <ShieldCheck size={28} />,
      title: t('help_card4_title'),
      description: t('help_card4_desc'),
    },
    {
      icon: <Lightbulb size={28} />,
      title: t('help_card5_title'),
      description: t('help_card5_desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <Motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-emerald-600 dark:text-white mb-10"
      >
        🧠 {t('help_title')}
      </Motion.h2>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {helpTopics.map((topic, idx) => (
          <Motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-900/70 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all"
          >
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 mb-3">
              {topic.icon}
              <h3 className="text-lg font-semibold">{topic.title}</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {topic.description}
            </p>
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;
