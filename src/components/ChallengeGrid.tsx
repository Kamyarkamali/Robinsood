import { useState } from "react";
import { challengeCards } from "../data/fakeData";
import ChallengeCardComponent from "./ChallengeCard";
import { useTranslation } from "react-i18next";

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

  return (
    <div className="flex flex-col justify-start w-full max-w-350 mx-auto">
      <h1 className="px-2 dark:text-white text-gray-500 sm:px-3 lg:px-8 mb-4 text-[15px] sm:text-[17px] md:text-[25px] lg:text-[32px] font-bold">
        {t("labels.parametr2")}
      </h1>

      <div className="flex items-center gap-3 px-4 mb-4">
        <button
          onClick={() => toggle("active")}
          className={`
      relative flex items-center gap-2 px-4 py-2 rounded-xl
      text-sm font-semibold transition-all duration-300
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
        w-2.5 h-2.5 rounded-full transition-all
        ${hidden.active ? "bg-gray-400" : "bg-green-500 animate-pulse"}
      `}
          />
          {t("btn.active")}
        </button>

        <button
          onClick={() => toggle("inactive")}
          className={`
      relative flex items-center gap-2 px-4 py-2 rounded-xl
      text-sm font-semibold transition-all duration-300
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
        w-2.5 h-2.5 rounded-full transition-all
        ${hidden.inactive ? "bg-gray-400" : "bg-red-500 animate-pulse"}
      `}
          />
          {t("btn.inactive")}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 p-2 sm:p-3 lg:p-4 w-full place-items-center">
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
    </div>
  );
}
