import { useState } from "react";
import { useTranslation } from "react-i18next";
import { challengeCards } from "../../data/fakeData";
import ChallengeCardComponent from "../../components/ChallengeCard";
import { FiCalendar } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";

export default function ChallengeGrid() {
  const [hidden, setHidden] = useState<{
    active: boolean;
    inactive: boolean;
  }>({
    active: false,
    inactive: false,
  });

  const { t } = useTranslation();

  const toggle = (type: "active" | "inactive") => {
    setHidden((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const persianDate = "۱۴۰۴/۱۰/۲۲";
  const persianTime = "۲۲:۴۸";

  return (
    <div className="flex flex-col justify-start w-full max-w-350 mx-auto min-h-screen py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 mb-4 mt-3">
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
          <button
            onClick={() => toggle("active")}
            className={`
              relative flex items-center step-test11 gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl
              text-[11px] sm:text-sm font-semibold transition-all duration-300
              border backdrop-blur-md
              ${
                hidden.active
                  ? "bg-transparent border-gray-300 text-gray-400 dark:border-gray-600"
                  : "bg-green-500/10 border-green-500 text-green-500 shadow-md shadow-green-500/20"
              }
              hover:scale-[1.03] active:scale-[0.98]
            `}
          >
            <span
              className={`
                w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all
                ${hidden.active ? "bg-gray-400" : "bg-green-500 animate-pulse"}
              `}
            />
            {t("btn.active")}
          </button>

          <button
            onClick={() => toggle("inactive")}
            className={`
              relative flex items-center step-test12 gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl
              text-[11px] sm:text-sm font-semibold transition-all duration-300
              border backdrop-blur-md
              ${
                hidden.inactive
                  ? "bg-transparent border-gray-300 text-gray-400 dark:border-gray-600"
                  : "bg-red-500/10 border-red-500 text-red-500 shadow-md shadow-red-500/20"
              }
              hover:scale-[1.03] active:scale-[0.98]
            `}
          >
            <span
              className={`
                w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all
                ${hidden.inactive ? "bg-gray-400" : "bg-red-500 animate-pulse"}
              `}
            />
            {t("btn.inactive")}
          </button>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-linear-to-br from-[#f0f4ff] to-[#d9dfe8] dark:from-[#2a2a2a] dark:to-[#323232] shadow-sm w-full sm:w-auto justify-center">
          <FiCalendar
            size={12}
            className="text-blue-500 dark:text-blue-400 sm:w-3.5 sm:h-3.5"
          />
          <span className="text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
            {persianDate}
          </span>
          <span className="text-gray-300 dark:text-gray-600 text-[10px] sm:text-xs">
            |
          </span>
          <IoTimeOutline
            size={12}
            className="text-orange-500 dark:text-orange-400 sm:w-3.5 sm:h-3.5"
          />
          <span className="text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
            {persianTime}
          </span>
        </div>

        <div className="hidden lg:block w-[160px]"></div>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-3 lg:p-4 w-full place-items-center flex-1 min-h-[500px]">
        {challengeCards
          .filter((card) => {
            if (hidden.active && card.status === "active") return false;
            if (hidden.inactive && card.status === "inactive") return false;
            return true;
          })
          .map((card) => (
            <ChallengeCardComponent key={card.id} card={card} />
          ))}
      </div>

      <div className="h-12 sm:h-16 lg:h-20"></div>
    </div>
  );
}
