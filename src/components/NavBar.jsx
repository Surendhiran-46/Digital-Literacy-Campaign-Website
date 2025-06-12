import React, { useState } from "react";
import { UseLanguage } from "../context/LanguageContext";
import {
  Home,
  BookOpen,
  Bot,
  MessageCircle,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import LanguageModal from "./LanguageModal";
import { motion as Motion } from "framer-motion";
import { UseTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { t, language } = UseLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = UseTheme();

  const navLinks = [
    { name: t("home"), path: "/", icon: <Home size={18} /> },
    { name: t("tutorials"), path: "/tutorials", icon: <BookOpen size={18} /> },
    { name: t("ai_chat"), path: "/ai-chat", icon: <Bot size={18} /> },
    {
      name: t("feedback"),
      path: "/feedback",
      icon: <MessageCircle size={18} />,
    },
  ];

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 w-full flex items-center justify-between sticky top-0 z-50">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-emerald-600 dark:text-white tracking-wide flex items-center gap-1">
          DLC
        </div>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex space-x-6 text-base items-center font-medium text-gray-800 dark:text-gray-200">
          {navLinks.map(({ name, path, icon }) => (
            <li key={name}>
              <Link
                to={path}
                className="flex items-center gap-2 hover:text-emerald-500 transition-all"
              >
                {icon} {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Language Code + Globe */}
          <button
            onClick={() => setShowLanguageModal(true)}
            className="flex items-center gap-1 text-gray-700 hover:text-indigo-500 dark:text-gray-200 dark:hover:text-indigo-400 transition-all"
            aria-label="Change language"
          >
            <Globe size={22} />
            <span className="font-semibold text-sm uppercase">
              {language || "EN"}
            </span>
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <Motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="sm:hidden bg-white dark:bg-gray-900 px-6 pt-4 pb-6 space-y-3 text-center shadow-md z-40"
        >
          {navLinks.map(({ name, path, icon }) => (
            <li key={name}>
              <Link
                to={path}
                onClick={() => setIsMobileMenuOpen(false)} // close menu on click
                className="flex items-center justify-center gap-2 text-base text-gray-800 dark:text-gray-200 hover:text-emerald-500 transition-all"
              >
                {icon} {name}
              </Link>
            </li>
          ))}
        </Motion.ul>
      )}

      {/* Language Modal */}
      {showLanguageModal && (
        <LanguageModal onClose={() => setShowLanguageModal(false)} />
      )}
    </>
  );
};

export default Navbar;
