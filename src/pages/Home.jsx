// src/pages/Home.jsx
import React from 'react';
import { UseLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Bot, BookOpen } from 'lucide-react';
import Home_pic from '../assets/home.jpg'; // Vector of elderly learning

const Home = () => {
  const { t } = UseLanguage();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-teal-50 via-blue-50 to-beige-100 dark:from-gray-900 dark:to-gray-800 px-6 py-16 flex flex-col items-center justify-center text-center">
      {/* Decorative glow background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-32 left-[-5rem] w-96 h-96 opacity-20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-20 right-[-4rem] w-80 h-80 opacity-30 blur-[80px] rounded-full"></div>
      </div>

      {/* Hero Title */}
      <Motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[2.5rem] sm:text-5xl md:text-4xl font-extrabold text-emerald-700 dark:text-white drop-shadow-md"
      >
        {t('tagline') || 'Empowering Digital Literacy!'}
      </Motion.h1>

      {/* Subtext */}
      <Motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4 text-gray-700 dark:text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed"
      >
        {t('welcome_message') ||
          'Helping elders embrace technology through simple, accessible tutorials and friendly AI conversations.'}
      </Motion.p>

      {/* CTA Buttons */}
      <Motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center"
      >
        <Link
          to="/tutorials"
          className="bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 text-white text-lg px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg transition-all"
        >
          <BookOpen size={22} /> {t('tutorials') || 'Start Learning'}
        </Link>

        <Link
          to="/ai-chat"
          className="bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white text-lg px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg transition-all"
        >
          <Bot size={22} /> {t('ai_chat') || 'Ask DigiBuddy'}
        </Link>
      </Motion.div>

      {/* Hero Image */}
      <Motion.img
        src={Home_pic}
        alt="Elder learning illustration"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="mt-14 w-5/6 max-w-md md:max-w-lg rounded-xl shadow-xl object-cover ring-4 ring-white dark:ring-gray-700"
      />
    </div>
  );
};

export default Home;
