import { useEffect, useRef } from "react";
import type { BilingualText } from "../types/interfaces";
import type { Lang } from "../types/type";
import i18next from "i18next";

interface DropdownProps<T extends string> {
  options: { key: T; label: BilingualText }[];
  selected: T | null;
  onSelect: (key: T) => void;
  lang: Lang;
  icon?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function DropdownFainalTabale<T extends string>({
  options,
  selected,
  onSelect,
  icon,
  isOpen,
  setIsOpen,
}: DropdownProps<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cur = options.find((o) => o.key === selected);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-auto">
      <button
        dir={i18next.language === "fa" ? "rtl" : "ltr"}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between sm:justify-center lg:h-fit gap-2 w-full text-[10px] lg:text-[11px] font-normal sm:w-auto dark:bg-transparent bg-gray-100 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-lg px-3.5 py-2 text-gray-700 dark:text-white text-sm cursor-pointer transition"
      >
        {icon && (
          <span className="text-gray-500 dark:text-gray-500 text-sm">
            {icon}
          </span>
        )}
        <span className="text-[8px] font-normal">
          {cur
            ? i18next.language === "fa"
              ? cur.label.fa
              : cur.label.en
            : i18next.language === "en"
              ? options[0]?.label.en
              : options[0]?.label.fa}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-gray-500 dark:text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1.5 z-50 bg-white dark:bg-transparent backdrop-blur-3xl cursor-pointer border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-45 w-full sm:w-auto">
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                onSelect(opt.key);
                setIsOpen(false);
              }}
              className={`block w-full px-4 ${
                i18next.language === "fa" ? "text-right" : "text-left"
              } py-2.5 lg:text-[12px] text-[11px] hover:bg-gray-100 dark:hover:bg-white/10 transition ${
                opt.key === selected
                  ? "text-violet-600 dark:text-violet-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {i18next.language === "fa" ? opt?.label?.fa : opt?.label?.en}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
