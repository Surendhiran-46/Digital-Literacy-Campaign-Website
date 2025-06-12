import React from 'react';
import { UseLanguage } from '../context/LanguageContext';
import { motion as Motion } from 'framer-motion';
import { MessageCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Feedback = () => {
  const { t } = UseLanguage();

  const cards = [
    {
      icon: <MessageCircle size={32} className="text-emerald-600" />,
      title: t('feedback') || 'Share Feedback',
      desc:
        t('feedback_desc') ||
        'Let us know what you loved or what we can improve. Your voice matters!',
      to: '/feedback/form',
    },
    {
      icon: <HelpCircle size={32} className="text-indigo-600" />,
      title: t('help_title') || 'Need Help?',
      desc:
        t('help_desc') ||
        'Confused about something? Find quick help on using DigiBuddy or the tutorials.',
      to: '/help',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 px-6 py-12 flex flex-col items-center text-center">
      <Motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold text-emerald-700 dark:text-white mb-6"
      >
        {t('feedback_heading') || 'We’re Here for You 🙌'}
      </Motion.h1>

      <div className="grid gap-8 sm:grid-cols-2 max-w-4xl w-full">
        {cards.map(({ icon, title, desc, to }, index) => (
          <Motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-left"
          >
            <Link to={to} className="block group hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-4 mb-4">{icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-emerald-600 transition">
                {title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
            </Link>
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
