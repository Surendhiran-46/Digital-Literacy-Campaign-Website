import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UseLanguage } from '../context/LanguageContext';
import { Bot } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const ChatBubble = () => {
    const { t } = UseLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on /ai-chat page
  if (location.pathname === '/ai-chat') return null;

  return (
    <Motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={() => navigate('/ai-chat')}
      className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-xl flex items-center justify-center focus:outline-none"
      aria-label="Open DigiBuddy Chat"
    >
      <Bot size={24} />
      <span className="ml-2 text-sm font-medium hidden sm:inline-block">
        {t('chatbubble') || 'Need help? Ask DigiBuddy!'}
      </span>
    </Motion.button>
  );
};

export default ChatBubble;
