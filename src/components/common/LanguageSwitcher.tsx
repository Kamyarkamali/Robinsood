import { useState, useRef, useEffect } from "react";
import i18n from "../../i18n";

// پرچم ها برای زبان
import fa from "../../assets/images/fa.png";
import en from "../../assets/images/en.jpg";

function LanguageSwitcher() {
  const [open, setOpen] = useState<boolean>(false);
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
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl
        cursor-pointer
                   bg-white dark:bg-gray-900
                   border border-gray-200 dark:border-gray-700
                   shadow-sm hover:shadow-md
                   transition-all duration-300
                   min-w-35 justify-between"
      >
        <div className="flex items-center gap-2">
          <img
            src={currentLang === "fa" ? fa : en}
            alt="current language"
            className="w-5 h-5 rounded-full object-cover
                       border border-gray-300 dark:border-gray-600"
          />

          <span className="text-sm font-medium">
            {currentLang === "fa" ? "فارسی" : "English"}
          </span>
        </div>

        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
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

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-44
        rounded-xl overflow-hidden
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-700
        shadow-xl
        transition-all duration-200 origin-top-right
        ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* فارسی */}
        <button
          onClick={() => changeLang("fa")}
          className={`w-full flex items-center gap-3 px-4 py-3
          transition-all duration-200
          cursor-pointer
          hover:bg-gray-100 dark:hover:bg-gray-800
          ${currentLang === "fa" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
        >
          <img
            src={fa}
            alt="Persian"
            className="w-7 h-6 rounded-full object-fill
                       border border-gray-300 dark:border-gray-600"
          />
          <span className="text-sm font-medium">فارسی</span>
        </button>

        {/* انگلیسی */}
        <button
          onClick={() => changeLang("en")}
          className={`w-full flex items-center gap-3 px-4 py-3
          transition-all duration-200
          cursor-pointer
          hover:bg-gray-100 dark:hover:bg-gray-800
          ${currentLang === "en" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
        >
          <img
            src={en}
            alt="English"
            className="w-7 h-6 rounded-full object-fill
                       border border-gray-300 dark:border-gray-600"
          />
          <span className="text-sm font-medium">English</span>
        </button>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
