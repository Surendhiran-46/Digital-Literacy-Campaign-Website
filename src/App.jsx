import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tutorials from './pages/Tutorials';
import AIChat from './pages/AIChat';
import Feedback from './pages/Feedback';
import Navbar from './components/NavBar';
import LanguageModal from './components/LanguageModal';
import ChatBubble from './components/ChatBubble';
import FeedbackForm from './components/FeedBackForm';
import HelpCenter from './components/HelpCenter';

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const lang = localStorage.getItem("dlc_preferred_lang");
    if (!lang) setShowModal(true);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800'>
      <Router>
      {showModal && <LanguageModal onClose={() => setShowModal(false)} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedback/form" element={<FeedbackForm />} />
        <Route path="/help" element={<HelpCenter />} />
      </Routes>
      <ChatBubble />
    </Router>
    </div>
  );
}

export default App;
