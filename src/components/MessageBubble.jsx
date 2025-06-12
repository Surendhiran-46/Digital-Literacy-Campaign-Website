import React from 'react';
import { motion as Motion } from 'framer-motion';

const MessageBubble = ({ text, type }) => {
  if (type === 'typing') {
    return (
      <div className="flex items-center gap-2 mb-3">
        <div className="w-4 h-4 bg-emerald-500 animate-ping rounded-full" />
        <div className="text-gray-500 text-sm">DigiBuddy is typing...</div>
      </div>
    );
  }

  const isBot = type === 'bot';

  return (
    <Motion.div
      initial={{ x: isBot ? -50 : 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`my-2 px-4 py-3 rounded-xl text-left text-sm leading-relaxed shadow-md max-w-[75%] break-words ${
          isBot
            ? 'bg-emerald-100 dark:bg-emerald-800 text-gray-900 dark:text-white rounded-bl-none'
            : 'bg-blue-100 dark:bg-blue-600 text-gray-900 dark:text-white rounded-br-none'
        }`}
      >
        {text}
      </div>
    </Motion.div>
  );
};

export default MessageBubble;
