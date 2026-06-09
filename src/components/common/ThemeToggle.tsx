import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useTranslation } from "react-i18next";

function ThemeToggle() {
  const { theme, setLight, setDark, setSystem } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  // بستن بیرون کلیک
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    {
      label: t("theme.light"),
      icon: "☀️",
      onClick: setLight,
      value: "light",
    },
    {
      label: t("theme.dark"),
      icon: "🌙",
      onClick: setDark,
      value: "dark",
    },
    {
      label: t("theme.system"),
      icon: "🖥",
      onClick: setSystem,
      value: "system",
    },
  ];

  const current = options.find((o) => o.value === theme);

  return (
    <div ref={ref} className="relative inline-block text-left">
      {/* دکمه اصلی */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2
                   px-3 py-2 rounded-xl
                   bg-white dark:bg-gray-900
                   border border-gray-200 dark:border-gray-700
                   shadow-sm hover:shadow-md
                   transition-all duration-300
                   min-w-[130px]
                   text-sm"
      >
        <span className="flex items-center gap-2">
          <span>{current?.icon}</span>
          <span>{current?.label}</span>
        </span>

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
        className={`absolute right-0 mt-2 w-40
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
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => {
              opt.onClick();
              setOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3
            text-sm transition-all duration-200
            hover:bg-gray-100 dark:hover:bg-gray-800
            ${
              theme === opt.value
                ? "bg-gray-100 dark:bg-gray-800 font-medium"
                : ""
            }`}
          >
            <span className="text-base">{opt.icon}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeToggle;
