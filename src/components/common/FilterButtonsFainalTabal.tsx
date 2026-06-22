import i18next from "i18next";
import type { FilterButtonsProps } from "../../types/interfaces";
import type { Impact } from "../../types/type";

const FILTER_OPTIONS = [
  {
    impact: "red" as Impact,
    color: "#ef4444",
    label: { fa: "قرمز", en: "High" },
  },
  {
    impact: "yellow" as Impact,
    color: "#eab308",
    label: { fa: "زرد", en: "Medium" },
  },
  {
    impact: "blue" as Impact,
    color: "#3b82f6",
    label: { fa: "متوسط", en: "Low" },
  },
];

export function FilterButtons({
  impactFilter,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <div className="flex items-center  gap-3 flex-wrap dark:bg-linear-to-t h-15 dark:from-[#282828] dark:to-[#2f2f2f] p-3 rounded-[1024px] w-full sm:w-auto justify-center sm:justify-start">
      {FILTER_OPTIONS.map((item) => {
        const isActive = impactFilter === item.impact;
        return (
          <button
            key={item.color}
            onClick={() => onFilterChange(isActive ? null : item.impact)}
            className={`flex items-center gap-1.5 text-xs transition-all cursor-pointer rounded-full px-2.5 py-1 ${
              isActive
                ? "bg-gray-200 dark:bg-white/10 ring-1 ring-gray-400 dark:ring-white/20"
                : "hover:bg-gray-200 dark:hover:bg-white/5"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full transition-all ${isActive ? "scale-125" : ""}`}
              style={{ background: item.color }}
            />
            <span
              className={
                isActive
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400"
              }
            >
              {i18next.language === "fa" ? item?.label?.fa : item?.label?.en}
            </span>
            {isActive && (
              <span
                title={i18next.language === "fa" ? "لفو فیلتر" : "Cancel filer"}
                className="text-[8px] cursor-pointer text-gray-500 dark:text-gray-400 ml-0.5"
              >
                ✕
              </span>
            )}
          </button>
        );
      })}
      {impactFilter && (
        <button
          title={i18next.language === "fa" ? "لفو فیلتر" : "Cancel filer"}
          onClick={() => onFilterChange(null)}
          className="text-[10px] text-gray-500 cursor-pointer dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition underline-offset-2 hover:underline"
        >
          {i18next.language === "fa" ? "لغو فیلتر" : "Clear filter"}
        </button>
      )}
    </div>
  );
}
