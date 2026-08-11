import i18next from "i18next";
import { useState, useMemo } from "react";
import { FILTER_OPTIONS } from "../data/fakeData";
import { useNewsFilter } from "../hooks/useNewsFilter";
import { DropdownFainalTabale } from "../module/DropdownFainalTabale";
import { NewsTable } from "../module/NewsTable";
import { FilterButtons } from "./common/FilterButtonsFainalTabal";
import { DateRangePicker } from "../module/DateRangePicker";
import { QuickAccessButtons } from "../module/QuickAccessButtons";

function TradingNewsTable() {
  const {
    week,
    filter,
    setFilter,
    tradeInNews,
    setTradeInNews,
    impactFilter,
    setImpactFilter,
    filteredData,
  } = useNewsFilter();

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const lang = i18next.language;

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({ key: "", direction: null });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const tradeButtonText = {
    fa: tradeInNews ? "ترید در خبر" : "ترید ممنوع",
    en: tradeInNews ? "Trade in News" : "Trade Banned",
  };

  const clearButtonText = {
    fa: "🗑️ پاک کردن",
    en: "🗑️ Clear",
  };

  const noWeekText = {
    fa: "یک هفته را انتخاب کنید",
    en: "Please select a week",
  };

  const rowsPerPageText = {
    fa: "تعداد در صفحه:",
    en: "Rows:",
  };

  const pageInfoText = (start: number, end: number, total: number) => {
    return {
      fa: `نمایش ${start} - ${end} از ${total}`,
      en: `Showing ${start} - ${end} of ${total}`,
    };
  };

  const pageNumberText = (current: number, total: number) => {
    return {
      fa: `صفحه ${current} از ${total}`,
      en: `Page ${current} of ${total}`,
    };
  };

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null;
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return "↕";
    if (sortConfig.direction === "asc") return "↑";
    if (sortConfig.direction === "desc") return "↓";
    return "↕";
  };

  const dateFilteredData = useMemo(() => {
    if (!dateRange.start || !dateRange.end) return filteredData;

    return filteredData.filter((item) => {
      const itemDate = new Date(item.date?.fa || item.date?.en);
      return itemDate >= dateRange.start! && itemDate <= dateRange.end!;
    });
  }, [filteredData, dateRange]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return dateFilteredData;

    return [...dateFilteredData].sort((a, b) => {
      let aValue = a[sortConfig.key as keyof typeof a];
      let bValue = b[sortConfig.key as keyof typeof b];

      if (sortConfig.key === "day") {
        aValue = a.day?.fa || a.day?.en || "";
        bValue = b.day?.fa || b.day?.en || "";
      }

      if (sortConfig.key === "news") {
        aValue = a.news?.fa || a.news?.en || "";
        bValue = b.news?.fa || b.news?.en || "";
      }

      if (sortConfig.key === "impact") {
        const impactOrder = { red: 3, yellow: 2, blue: 1 };
        aValue = impactOrder[a.impact as keyof typeof impactOrder] || 0;
        bValue = impactOrder[b.impact as keyof typeof impactOrder] || 0;
      }

      if (sortConfig.key === "tradeable") {
        aValue = a.tradeable ? 1 : 0;
        bValue = b.tradeable ? 1 : 0;
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [dateFilteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  return (
    <div
      id="news5"
      dir={i18next.language === "fa" ? "rtl" : "ltr"}
      className="bg-gray-50  rounded-2xl mt-3 border-4
      dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030]
      dark:border-[#3C3C3C]
      border-gray-300 w-full max-w-full mx-auto p-3 sm:p-4 md:p-5 transition-colors"
    >
      <div
        className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 p-2 sm:p-3 
          bg-white/50 dark:bg-white/5 
          rounded-xl border border-gray-200/50 dark:border-white/5"
      >
        <div className="w-full lg:w-auto lg:flex-1 min-w-[180px]">
          <DateRangePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
          />
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <QuickAccessButtons setDateRange={setDateRange} />
        </div>

        {(dateRange.start || dateRange.end) && (
          <button
            onClick={() => {
              setDateRange({ start: null, end: null });
              setShowDatePicker(false);
            }}
            className="h-12 px-3 sm:px-4 text-[12px] sm:text-[13px] 
              text-red-500 hover:text-red-600 
              dark:text-red-400 dark:hover:text-red-300 
              transition whitespace-nowrap
              bg-gray-100 dark:bg-[#282828]
              border border-gray-300 dark:border-white/10 
              rounded-full
              hover:bg-gray-200 dark:hover:bg-white/10
              flex items-center justify-center
              w-full sm:w-auto lg:flex-1 min-w-[100px] lg:min-w-[120px]"
          >
            {lang === "fa" ? clearButtonText.fa : clearButtonText.en}
          </button>
        )}

        <div className="w-full lg:w-auto lg:flex-1 min-w-[150px]">
          <DropdownFainalTabale
            options={FILTER_OPTIONS}
            selected={filter}
            onSelect={setFilter}
            // @ts-ignore
            lang={lang}
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
          />
        </div>

        <button
          onClick={() => setTradeInNews((v) => !v)}
          className="flex justify-center items-center gap-2 px-3 sm:px-4 py-2 
            h-fit 
            dark:bg-linear-to-r 
            font-normal bg-gray-100 dark:from-[#282828] dark:to-[#2f2f2f] 
            border border-gray-300 dark:border-white/10 
            rounded-full 
            text-gray-700 dark:text-gray-300 
            text-[12px] sm:text-[13px] md:text-[14px] 
            cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 
            transition-all duration-200
            whitespace-nowrap
            w-full sm:w-auto lg:flex-1 min-w-[120px] lg:min-w-[140px]"
        >
          <span className="whitespace-nowrap">
            {lang === "fa" ? tradeButtonText.fa : tradeButtonText.en}
          </span>
          <span
            className="w-4 h-4 sm:w-5.5 sm:h-2.5 rounded-full transition-colors shrink-0"
            style={{ background: tradeInNews ? "#22c55e" : "#9ca3af" }}
          />
        </button>

        <section className="flex flex-wrap items-center gap-1 w-full sm:w-auto lg:flex-1">
          <FilterButtons
            impactFilter={impactFilter}
            onFilterChange={setImpactFilter}
          />
        </section>
      </div>

      {!week ? (
        <div className="py-8 sm:py-10 text-center text-gray-400 dark:text-gray-600 text-xs sm:text-sm">
          {lang === "fa" ? noWeekText.fa : noWeekText.en}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <NewsTable
              data={paginatedData}
              // @ts-ignore
              lang={lang}
              sortConfig={sortConfig}
              requestSort={requestSort}
              getSortIcon={getSortIcon}
            />
          </div>

          {sortedData.length > 0 && (
            <div
              className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3 mt-4 pt-3 
              border-t border-gray-200 dark:border-white/5"
            >
              <div className="flex items-center gap-2 order-2 sm:order-1">
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {lang === "fa" ? rowsPerPageText.fa : rowsPerPageText.en}
                </span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs rounded-lg 
                    border border-gray-200 dark:border-white/10 
                    bg-white dark:bg-[#2B2B2B] 
                    text-gray-700 dark:text-gray-300 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <div className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 order-1 sm:order-2">
                {(() => {
                  const start = (currentPage - 1) * rowsPerPage + 1;
                  const end = Math.min(
                    currentPage * rowsPerPage,
                    sortedData.length,
                  );
                  const info = pageInfoText(start, end, sortedData.length);
                  return lang === "fa" ? info.fa : info.en;
                })()}
              </div>

              <div className="flex items-center gap-1 sm:gap-2 order-3">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs rounded-lg 
                    hover:bg-gray-100 dark:hover:bg-white/5 
                    disabled:opacity-50 disabled:cursor-not-allowed 
                    transition"
                >
                  ⟪
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs rounded-lg 
                    hover:bg-gray-100 dark:hover:bg-white/5 
                    disabled:opacity-50 disabled:cursor-not-allowed 
                    transition"
                >
                  ⟨
                </button>

                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {(() => {
                    const pageText = pageNumberText(currentPage, totalPages);
                    return lang === "fa" ? pageText.fa : pageText.en;
                  })()}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs rounded-lg 
                    hover:bg-gray-100 dark:hover:bg-white/5 
                    disabled:opacity-50 disabled:cursor-not-allowed 
                    transition"
                >
                  ⟩
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs rounded-lg 
                    hover:bg-gray-100 dark:hover:bg-white/5 
                    disabled:opacity-50 disabled:cursor-not-allowed 
                    transition"
                >
                  ⟫
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TradingNewsTable;
