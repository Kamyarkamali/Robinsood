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
    <div className="flex items-center gap-1 h-fit justify-center sm:gap-1.5 flex-nowrap px-2 sm:px-3 bg-gray-100 dark:bg-[#282828] border border-gray-300 dark:border-white/10 rounded-full w-full overflow-hidden min-w-[120px]">
      {FILTER_OPTIONS.map((item) => {
        const isActive = impactFilter === item.impact;
        return (
          <button
            key={item.color}
            onClick={() => onFilterChange(isActive ? null : item.impact)}
            className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] transition-all cursor-pointer rounded-full px-1.5 sm:px-2 py-0.5 h-7 sm:h-8 shrink-0 ${
              isActive
                ? "bg-gray-200 dark:bg-white/10 ring-1 ring-gray-400 dark:ring-white/20"
                : "hover:bg-gray-200 dark:hover:bg-white/5"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all shrink-0 ${isActive ? "scale-125" : ""}`}
              style={{ background: item.color }}
            />
            <span className="whitespace-nowrap text-[10px] sm:text-xs">
              {i18next.language === "fa" ? item?.label?.fa : item?.label?.en}
            </span>
            {isActive && (
              <span className="text-[7px] sm:text-[8px] cursor-pointer text-gray-500 dark:text-gray-400 shrink-0">
                ✕
              </span>
            )}
          </button>
        );
      })}
      {impactFilter && (
        <button
          onClick={() => onFilterChange(null)}
          className="text-[9px] sm:text-[10px] text-red-500 cursor-pointer hover:text-red-600 transition whitespace-nowrap px-1 shrink-0"
        >
          ✕
        </button>
      )}
    </div>
  );
}
