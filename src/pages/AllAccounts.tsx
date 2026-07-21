import React, { useMemo, useState, useEffect } from "react";
import { BsGrid, BsTable, BsX } from "react-icons/bs";
import type {
  FilterStage,
  FilterStatus,
  FilterType,
  ViewMode,
} from "../types/interfaces";
import Filters from "../components/ChallengeAccountsTable/Filters";
import CardView from "../components/ChallengeAccountsTable/CardView";
import TableView from "../components/ChallengeAccountsTable/TableView";
import i18next from "i18next";
import { fakeChallengeAccounts } from "../data/fakeData";

interface ChallengeAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChallengeAccountsModal: React.FC<ChallengeAccountsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [type, setType] = useState<FilterType>("all");
  const [status, setStatus] = useState<FilterStatus>("all");
  const [stage, setStage] = useState<FilterStage>("all");
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  // NEW: track which account is currently selected
  const [selectedAccountNumber, setSelectedAccountNumber] = useState<
    string | null
  >(null);
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSelectAccount = (accountNumber: string): void => {
    setSelectedAccountNumber((prev) =>
      prev === accountNumber ? null : accountNumber,
    );
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      <div
        className={`
          fixed
          inset-0
          z-50
          bg-black/50
          backdrop-blur-lg
          transition-opacity
          duration-300
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
        onClick={onClose}
      />

      <div
        className={`
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          p-4
          transition-all
          duration-300
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        onClick={onClose}
      >
        <div
          className="
            relative
            w-full
            max-w-7xl
            max-h-[90vh]
            rounded-[28px]
            p-3 sm:p-4 md:p-6
            bg-[#e9edf5]
            dark:bg-[#2B2B2B]
            shadow-[8px_8px_20px_#c5cad5,-8px_-8px_20px_#fff]
            dark:shadow-[8px_8px_20px_#070b12,-8px_-8px_20px_#273449]
            transition-all
            duration-300
            overflow-y-auto
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
            [&::-webkit-scrollbar-thumb]:rounded-full
          "
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="
              absolute
              top-3
              left-3
              z-10
              p-2
              rounded-full
              bg-white/80
              dark:bg-[#2B2B2B]/80
              border
              border-gray-200
              dark:border-gray-700
              text-gray-600
              dark:text-gray-300
              hover:bg-gray-100
              dark:hover:bg-gray-700
              transition-all
              duration-200
              hover:scale-110
              shadow-md
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500
            "
            aria-label="Close modal"
          >
            <BsX size={24} />
          </button>

          <div className="mb-4 text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {lang === "fa" ? "سایر اکانت ها" : "All Accounts"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {lang === "fa"
                ? "لیست کامل اکانت‌های شما"
                : "Complete list of your accounts"}
            </p>
          </div>

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
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-500
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
                      {lang === "fa" ? "نمایش جدولی" : "Show Table"}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="transition-all duration-300">
            {viewMode === "card" ? (
              <CardView
                // @ts-ignore
                accounts={filteredAccounts}
                selectedAccountNumber={selectedAccountNumber}
                onSelectAccount={handleSelectAccount}
              />
            ) : (
              <TableView
                // @ts-ignore
                accounts={filteredAccounts}
                selectedAccountNumber={selectedAccountNumber}
                onSelectAccount={handleSelectAccount}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChallengeAccountsModal;
