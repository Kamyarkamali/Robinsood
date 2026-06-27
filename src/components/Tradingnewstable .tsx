import i18next from "i18next";
import { useState } from "react";
import { FILTER_OPTIONS, WEEK_OPTIONS } from "../data/fakeData";
import { useNewsFilter } from "../hooks/useNewsFilter";
import { DropdownFainalTabale } from "../module/DropdownFainalTabale";
import { NewsTable } from "../module/NewsTable";
import type { Lang } from "../types/type";
import { FilterButtons } from "./common/FilterButtonsFainalTabal";

interface TradingNewsTableProps {
  lang?: Lang;
}

function TradingNewsTable({ lang = "fa" }: TradingNewsTableProps) {
  const {
    week,
    setWeek,
    filter,
    setFilter,
    tradeInNews,
    setTradeInNews,
    impactFilter,
    setImpactFilter,
    filteredData,
  } = useNewsFilter();

  const [isWeekOpen, setIsWeekOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  return (
    <div
      dir={i18next.language === "fa" ? "rtl" : "ltr"}
      className="bg-gray-50 rounded-[25px] border-4 dark:border-white/10 border-gray-400 dark:bg-[#2B2B2B] w-full max-w-full mx-auto rounded-2xl p-5 transition-colors"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
          <FilterButtons
            impactFilter={impactFilter}
            onFilterChange={setImpactFilter}
            lang={lang}
          />

          <button
            onClick={() => setTradeInNews((v) => !v)}
            className="flex justify-center w-full sm:w-45 h-15 dark:bg-linear-to-r items-center gap-2 font-normal bg-gray-100 dark:from-[#282828] dark:to-[#2f2f2f] border border-gray-300 dark:border-white/10 rounded-full px-3.5 py-1.5 text-gray-700 dark:text-gray-300 text-[14px] cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition"
          >
            {i18next.language === "fa"
              ? tradeInNews
                ? "ترید در خبر"
                : "ترید ممنوع"
              : tradeInNews
                ? "Trade in News"
                : "Trade Banned"}
            <span
              className="w-5.5 h-3.5 rounded-full transition-colors"
              style={{ background: tradeInNews ? "#22c55e" : "#9ca3af" }}
            />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <DropdownFainalTabale
            options={WEEK_OPTIONS}
            selected={week}
            onSelect={setWeek}
            lang={lang}
            isOpen={isWeekOpen}
            setIsOpen={setIsWeekOpen}
          />
          <DropdownFainalTabale
            options={FILTER_OPTIONS}
            selected={filter}
            onSelect={setFilter}
            lang={lang}
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
          />
        </div>
      </div>

      {!week ? (
        <div className="py-10 text-center text-gray-400 dark:text-gray-600 text-sm">
          {i18next.language === "fa"
            ? "یک هفته را انتخاب کنید"
            : "Please select a week"}
        </div>
      ) : (
        <NewsTable data={filteredData} lang={lang} />
      )}
    </div>
  );
}

export default TradingNewsTable;
