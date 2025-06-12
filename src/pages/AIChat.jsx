import React, { useState, useEffect, useRef } from 'react';
import { UseLanguage } from '../context/LanguageContext';
import { motion as Motion } from 'framer-motion';
import MessageBubble from '../components/MessageBubble';
import { Bot, Send, Mic, MessageSquare } from 'lucide-react';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

const AIChat = () => {
  const { t, language } = UseLanguage();
  const [messages, setMessages] = useState([
    { type: 'bot', text: t('welcome_chat') || "Hi! I'm DigiBuddy 👋 How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [app, setApp] = useState('general');
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);
  const azureKey = import.meta.env.VITE_AZURE_SPEECH_KEY;
  const azureRegion = import.meta.env.VITE_AZURE_SPEECH_REGION;

  const synthesizerRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      synthesizerRef.current?.close();
    };
  }, []);

  const getVoiceByLang = (lang) => {
    switch (lang) {
      case 'ta': return 'ta-IN-PallaviNeural';
      case 'hi': return 'hi-IN-SwaraNeural';
      default: return 'en-IN-NeerjaNeural';
    }
  };

  const speakWithAzure = async (text) => {
    return new Promise((resolve, reject) => {
      try {
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(azureKey, azureRegion);
        speechConfig.speechSynthesisVoiceName = getVoiceByLang(language);
        const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
        synthesizerRef.current = synthesizer;

        synthesizer.speakTextAsync(
          text,
          result => {
            synthesizer.close();
            resolve(result);
          },
          error => {
            synthesizer.close();
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setInput('');
    setMessages(prev => [...prev, { type: 'typing' }]);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMsg,
          app: app,
          lang: language,
        }),
      });

      const data = await response.json();
      const steps = data.steps || ["Sorry, I couldn't find an answer."];
      const spokenSteps = [];

      for (const step of steps) {
        try {
          await speakWithAzure(step);
        } catch {
          const fallback = new SpeechSynthesisUtterance(step);
          fallback.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
          window.speechSynthesis.speak(fallback);
        }
        spokenSteps.push({ type: 'bot', text: step });
      }

      setMessages(prev => [...prev.filter(m => m.type !== 'typing'), ...spokenSteps]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev.filter(m => m.type !== 'typing'),
        { type: 'bot', text: 'Server error. Please try again later.' }
      ]);
    }
  };

  const handleMicInput = () => {
    if (listening) return;
    setListening(true);
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(azureKey, azureRegion);
    speechConfig.speechRecognitionLanguage = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(result => {
      setInput(result.text);
      setListening(false);
      recognizer.close();
    }, err => {
      console.error('STT Error:', err);
      setListening(false);
      recognizer.close();
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleAppClick = (appName) => {
    setApp(appName);
    const prompt = `I want help using ${appName}`;
    setInput(prompt);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 px-4 py-6 flex flex-col items-center">
      <Motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 text-3xl font-bold text-emerald-600 dark:text-white mb-4"
      >
        <Bot size={32} /> DigiBuddy – {t('ai_chat')}
      </Motion.div>

      {/* App Shortcuts */}
      <div className="flex gap-3 mb-4">
        {['WhatsApp', 'Paytm', 'Google Maps'].map(appName => (
          <button
            key={appName}
            onClick={() => handleAppClick(appName.toLowerCase())}
            className="bg-white text-sm text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-emerald-100 dark:bg-gray-700 dark:text-white"
          >
            {appName}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[75vh]">
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50 dark:bg-gray-800">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} text={msg.text} type={msg.type} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center gap-2 px-4 py-3 border-t bg-white dark:bg-gray-900">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-grow px-4 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md outline-none"
            placeholder="Type your question..."
          />
          <button
            onClick={handleSend}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-md transition-all"
            aria-label="Send"
          >
            <Send size={20} />
          </button>
          <button
            onClick={handleMicInput}
            className={`p-3 rounded-full ${listening ? 'bg-red-500' : 'bg-blue-500'} text-white shadow-md`}
            aria-label="Speak"
          >
            <Mic size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
