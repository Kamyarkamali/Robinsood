import React, { useMemo, useState, useEffect } from "react";
import { BsGrid, BsTable } from "react-icons/bs";
import type {
  FilterStage,
  FilterStatus,
  FilterType,
  ViewMode,
} from "../types/interfaces";
import Filters from "../components/ChallengeAccountsTable/Filters";
import CardView from "../components/ChallengeAccountsTable/CardView";
import TableView from "../components/ChallengeAccountsTable/TableView";
import { fakeChallengeAccounts } from "../data/fakeData";
import i18next from "i18next";

const ChallengeAccountsTable: React.FC = () => {
  const [type, setType] = useState<FilterType>("all");
  const [status, setStatus] = useState<FilterStatus>("all");
  const [stage, setStage] = useState<FilterStage>("all");
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const lang = i18next.language;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setViewMode("card");
    } else {
      setViewMode("table");
    }
  }, [isMobile]);

  const filteredAccounts = useMemo(() => {
    return fakeChallengeAccounts.filter((item) => {
      const matchType = type === "all" || item.accountType === type;
      const matchStatus = status === "all" || item.tableStatus === status;
      const matchStage = stage === "all" || item.stage === stage;
      const matchSearch =
        item.accountNumber.includes(search) ||
        item.title.fa.includes(search) ||
        item.title.en.toLowerCase().includes(search.toLowerCase());

      return matchType && matchStatus && matchStage && matchSearch;
    });
  }, [type, status, stage, search]);

  const toggleViewMode = (): void => {
    if (!isMobile) {
      setViewMode(viewMode === "table" ? "card" : "table");
    }
  };

  return (
    <div
      dir="rtl"
      className="
        rounded-[28px]
        p-3 sm:p-4 md:p-6
        bg-[#e9edf5]
        dark:bg-[#2B2B2B]
        shadow-[8px_8px_20px_#c5cad5,-8px_-8px_20px_#fff]
        dark:shadow-[8px_8px_20px_#070b12,-8px_-8px_20px_#273449]
        transition-all
        duration-300
      "
    >
      <Filters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
        stage={stage}
        setStage={setStage}
      />

      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div
          className="
            text-[10px] sm:text-xs md:text-sm
            text-gray-500
            dark:text-gray-400
            font-medium
          "
        >
          <span className="font-bold mx-1 text-gray-700 dark:text-gray-300">
            {filteredAccounts.length}
          </span>
          {lang === "fa" ? "اکانت" : "Account"}
        </div>

        {!isMobile && (
          <button
            onClick={toggleViewMode}
            className="
              hidden sm:flex
              items-center
              gap-2
              px-4
              py-2
              rounded-lg
              cursor-pointer
              bg-white
              dark:bg-[#2B2B2B]
              border
              border-gray-500
              text-gray-600
              dark:text-gray-300
              text-xs
              font-medium
              transition-all
              hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.04),inset_-2px_-2px_6px_rgba(255,255,255,0.9)]
              dark:hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.03)]
            "
          >
            {viewMode === "table" ? (
              <>
                <BsGrid size={16} />
                <span className="hidden md:inline">
                  {lang === "fa" ? "نمایش کارتی" : "Card display"}
                </span>
              </>
            ) : (
              <>
                <BsTable size={16} />
                <span className="hidden md:inline">
                  {lang === "fa" ? "نمایش جدولی" : "Show Tabale"}
                </span>
              </>
            )}
          </button>
        )}
      </div>

      {viewMode === "card" ? (
        // @ts-ignore
        <CardView accounts={filteredAccounts} />
      ) : (
        // @ts-ignore
        <TableView accounts={filteredAccounts} />
      )}
    </div>
  );
};

export default ChallengeAccountsTable;
