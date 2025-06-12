// src/pages/Tutorials.jsx
import React, { useState } from "react";
import { UseLanguage } from "../context/LanguageContext";
import { motion as Motion } from "framer-motion";
import { tutorialsData } from "../locales/tutorialsData";
import { FaWhatsapp, FaGooglePay, FaMapMarkedAlt } from "react-icons/fa";

const IconMap = {
  whatsapp: <FaWhatsapp />,
  paytm: <FaGooglePay />,
  maps: <FaMapMarkedAlt />,
};

const categories = ["All", "Communication", "Finance", "Navigation"];

const Tutorials = () => {
  const { t } = UseLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTutorials =
    selectedCategory === "All"
      ? tutorialsData
      : tutorialsData.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-white mb-4">
        {t("tutorials")} 🎓
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        {t("tutorial_subtext") ||
          "Learn popular apps with simple videos & guides."}
      </p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              selectedCategory === cat
                ? "bg-emerald-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-emerald-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {filteredTutorials.map((tutorial, index) => (
          <Motion.div
            key={tutorial.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition"
          >
            {/* Video or Icon */}
            <div className="aspect-video w-full overflow-hidden bg-black">
              {tutorial.video ? (
                <iframe
                  src={tutorial.video}
                  title={tutorial.title}
                  className="w-full h-full object-cover"
                  allowFullScreen
                />
              ) : (
                <div className="h-full flex items-center justify-center text-white text-6xl">
                  {IconMap[tutorial.iconKey]}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 text-left">
              <h2 className="text-xl font-semibold text-emerald-700 dark:text-white mb-2">
                {tutorial.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {tutorial.description}
              </p>
            </div>
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
