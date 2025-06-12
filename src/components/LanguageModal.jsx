import React from 'react';
import { UseLanguage } from '../context/LanguageContext';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', label: 'English', emoji: '🇬🇧', bg: 'bg-blue-600' },
  { code: 'ta', label: 'தமிழ்', emoji: '🇮🇳', bg: 'bg-green-600' },
  { code: 'hi', label: 'हिंदी', emoji: '🇮🇳', bg: 'bg-orange-500' },
];

const LanguageModal = ({ onClose }) => {
  const { t, setLanguage } = UseLanguage();

  const handleSelect = (lang) => {
    setLanguage(lang);
    localStorage.setItem("dlc_preferred_lang", lang);
    onClose(); // close the modal
  };

  return (
    <AnimatePresence>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4"
      >
        <Motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8 rounded-2xl shadow-2xl max-w-md w-full"
        >
          <h2 className="text-2xl font-bold mb-2 text-center text-blue-700">
            {t('language_modal') || '🌍 Empower Your Digital Journey'}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
              {t("language_modal_desc") || "Select your preferred language to personalize your learning experience"}
          </p>

          <div className="flex flex-col space-y-4">
            {languages.map(({ code, label, emoji, bg }) => (
              <button
                key={code}
                onClick={() => handleSelect(code)}
                className={`flex justify-between items-center px-6 py-3 rounded-xl text-white font-semibold text-lg focus:outline-none hover:scale-105 transition transform ${bg}`}
              >
                <span>{label}</span>
                <span className="text-2xl">{emoji}</span>
              </button>
            ))}
          </div>
        </Motion.div>
      </Motion.div>
    </AnimatePresence>
  );
};

export default LanguageModal;
