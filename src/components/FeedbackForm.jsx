import React, { useState } from 'react';
import { UseLanguage } from '../context/LanguageContext';
import { motion as Motion } from 'framer-motion';
import { CheckCircle2, Star } from 'lucide-react';

const FeedbackForm = () => {
  const { t } = UseLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, rating };

    try {
      const response = await fetch('https://digital-literacy-campaign-website.onrender.com/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setRating(0);
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 bg-gradient-to-br from-sky-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-xl w-full"
      >
        <h2 className="text-2xl font-bold text-emerald-600 dark:text-white mb-6">
          {t('feedback_form_heading') || 'Share Your Thoughts ✨'}
        </h2>

        {submitted && (
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-4 py-3 rounded-lg mb-4">
            <CheckCircle2 size={20} /> {t('feedback_success') || 'Thank you for your feedback!'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800 dark:text-white">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400"
            ></textarea>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-2 mt-2">
            <span className="font-medium text-base">Rating:</span>
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                onMouseEnter={() => setHoverRating(num)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(num)}
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  (hoverRating || rating) >= num
                    ? 'text-yellow-400'
                    : 'text-gray-400 dark:text-gray-600'
                }`}
                fill={(hoverRating || rating) >= num ? 'currentColor' : 'none'}
              />
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
          >
            {t('submit') || 'Submit'}
          </button>
        </form>
      </Motion.div>
    </div>
  );
};

export default FeedbackForm;
