"use client";

import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fa" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "fa" ? "rtl" : "ltr"; // Optional
  };

  return (
    <button onClick={toggleLanguage} className="text-sm font-medium">
      {i18n.language === "en" ? "FA" : "EN"}
    </button>
  );
};

export default LanguageToggle;
