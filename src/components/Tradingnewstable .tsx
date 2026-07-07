import i18next from "i18next";
import { useState, useMemo } from "react";
import { FILTER_OPTIONS, WEEK_OPTIONS } from "../data/fakeData";
import { useNewsFilter } from "../hooks/useNewsFilter";
import { DropdownFainalTabale } from "../module/DropdownFainalTabale";
import { NewsTable } from "../module/NewsTable";
import type { Lang } from "../types/type";
import { FilterButtons } from "./common/FilterButtonsFainalTabal";
import { DateRangePicker } from "../module/DateRangePicker";
import { QuickAccessButtons } from "../module/QuickAccessButtons";

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
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({ key: "", direction: null });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

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
      dir={i18next.language === "fa" ? "rtl" : "ltr"}
      className="bg-gray-50 step-test44 rounded-2xl mt-3 border-4
      dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030]
        dark:border-[#3C3C3C]
        border-gray-300 w-full max-w-full mx-auto p-5 transition-colors"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex step-test45 items-center gap-3 flex-wrap w-full md:w-auto">
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

        <div className="flex flex-wrap step-test46 gap-2 w-full md:w-auto">
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

      <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-white/50 dark:bg-white/5 rounded-xl border border-gray-200/50 dark:border-white/5">
        <DateRangePicker
          dateRange={dateRange}
          setDateRange={setDateRange}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          // lang={lang}
        />
        <QuickAccessButtons setDateRange={setDateRange} lang={lang} />
        {(dateRange.start || dateRange.end) && (
          <button
            onClick={() => {
              setDateRange({ start: null, end: null });
              setShowDatePicker(false);
            }}
            className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition"
          >
            {lang === "fa" ? "پاک کردن فیلتر" : "Clear Filter"}
          </button>
        )}
      </div>

      {!week ? (
        <div className="py-10 text-center text-gray-400 dark:text-gray-600 text-sm">
          {i18next.language === "fa"
            ? "یک هفته را انتخاب کنید"
            : "Please select a week"}
        </div>
      ) : (
        <>
          <NewsTable
            data={paginatedData}
            lang={lang}
            sortConfig={sortConfig}
            requestSort={requestSort}
            getSortIcon={getSortIcon}
          />

          {sortedData.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-gray-200 dark:border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {lang === "fa" ? "تعداد در صفحه:" : "Rows per page:"}
                </span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 text-xs rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#2B2B2B] text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  ⟪
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  ⟨
                </button>

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {lang === "fa"
                    ? `صفحه ${currentPage} از ${totalPages}`
                    : `Page ${currentPage} of ${totalPages}`}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  ⟩
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  ⟫
                </button>
              </div>

              <div className="text-xs text-gray-400 dark:text-gray-500">
                {lang === "fa"
                  ? `نمایش ${(currentPage - 1) * rowsPerPage + 1} - ${Math.min(currentPage * rowsPerPage, sortedData.length)} از ${sortedData.length}`
                  : `Showing ${(currentPage - 1) * rowsPerPage + 1} - ${Math.min(currentPage * rowsPerPage, sortedData.length)} of ${sortedData.length}`}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TradingNewsTable;
