import { useState, useRef, useEffect } from "react";
import i18n from "../../i18n";

import fa from "../../assets/images/fa.png";
import en from "../../assets/images/en.jpg";

function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = i18n.language;

  const changeLang = (lang: "fa" | "en") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block z-2000">
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center justify-between gap-3
          px-3 py-2 rounded-xl
          min-w-32.5
          bg-white/80  dark:bg-linear-to-b
        dark:from-[#353535]
       dark: via-[#2D2D2D]
       dark: to-[#252525]
          backdrop-blur-md
          border border-gray-200 dark:border-gray-700
          shadow-sm hover:shadow-lg
          transition-all duration-300
          hover:scale-[1.02]
        "
      >
        <div className="flex items-center gap-2 ">
          <img
            src={currentLang === "fa" ? fa : en}
            className="
              w-5 h-5 rounded-full object-cover
              border border-gray-300 dark:border-gray-600
            "
          />

          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {currentLang === "fa" ? "FA" : "EN"}
          </span>
        </div>

        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* DROPDOWN */}
      <div
        className={`
          absolute right-0 mt-2 w-40
          rounded-2xl overflow-hidden
          bg-white/90  dark:bg-linear-to-b
        dark:from-[#353535]
       dark: via-[#2D2D2D]
       dark: to-[#252525]
          backdrop-blur-xl
          border border-gray-200 dark:border-gray-700
          shadow-2xl
          transition-all duration-200 origin-top-right
          ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        {/* FA */}
        <button
          onClick={() => changeLang("fa")}
          className={`
            w-full flex items-center gap-3 px-3 py-3
            transition-all duration-200
            hover:bg-gray-100 dark:hover:bg-white/5
          `}
        >
          <img
            src={fa}
            className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
          />

          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            فارسی
          </span>

          {currentLang === "fa" && (
            <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
          )}
        </button>

        {/* EN */}
        <button
          onClick={() => changeLang("en")}
          className={`
            w-full flex items-center gap-3 px-3 py-3
            transition-all duration-200
            hover:bg-gray-100 dark:hover:bg-white/5
          `}
        >
          <img
            src={en}
            className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
          />

          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            English
          </span>

          {currentLang === "en" && (
            <div className="ml-auto w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
          )}
        </button>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
