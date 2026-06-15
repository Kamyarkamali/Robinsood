import React from "react";
import type { Progres } from "../types/interfaces";
import { useTranslation } from "react-i18next";

interface Props {
  data: Progres;
}

const formatValue = (value: number, unit: Progres["unit"]) => {
  if (unit === "currency") return `$${value.toLocaleString("fa-IR")}`;
  return `${value.toLocaleString("fa-IR")} روز`;
};

const ProgressCard: React.FC<Props> = ({ data }) => {
  const { i18n } = useTranslation();

  const fillPercent = Math.round((data.currentValue / data.targetValue) * 100);

  const isSuccess = data.badgeType === "success";

  const gradientClass = isSuccess
    ? "bg-gradient-to-r from-violet-600 to-cyan-400"
    : "bg-gradient-to-r from-red-500 to-orange-400";

  const statValue = (val: number) =>
    data.unit === "currency"
      ? `$${val.toLocaleString("fa-IR")}`
      : val.toLocaleString("fa-IR");

  return (
    <div
      className="
        w-full
        min-h-[220px]
        p-3 sm:p-4 lg:p-5
        flex flex-col
        gap-4
        rounded-2xl
        border-2
        dark:bg-[#282828]
        bg-white
        dark:border-[#3C3C3C]
        border-gray-300
        shadow-sm
      "
    >
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <h3
          className="
            dark:text-white
            text-gray-700
            font-semibold
            text-sm
            sm:text-base
            lg:text-lg
          "
        >
          {i18n.language === "fa" ? data.title.fa : data.title.en}
        </h3>

        <span
          className="
            px-2 py-1
            sm:px-3
            rounded-full
            text-[10px]
            sm:text-xs
            dark:text-white
            text-gray-600
            bg-gray-100
            dark:bg-[#3A3A3A]
          "
        >
          {i18n.language === "fa" ? data.badgeText.fa : data.badgeText.en}
        </span>
      </div>

      {/* Progress */}
      <div className="flex items-center rounded-full p-1 bg-[#A8A8A81A] h-[48px] sm:h-[52px] overflow-hidden">
        <div
          className="
            flex-1
            text-center
            text-[#888]
            font-medium
            text-[11px]
            sm:text-sm
            px-2
          "
        >
          {formatValue(data.targetValue, data.unit)}
        </div>

        <div
          className={`${gradientClass} rounded-full flex items-center justify-center transition-all duration-500`}
          style={{
            width: `${fillPercent}%`,
            minWidth: "70px",
            height: "100%",
          }}
        >
          <span
            className="
              text-white
              font-bold
              text-xs
              sm:text-sm
              lg:text-base
              px-2 sm:px-4
              whitespace-nowrap
            "
          >
            {formatValue(data.currentValue, data.unit)}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 text-center mt-auto">
        <div className="flex flex-col items-center gap-1">
          <span
            className="
              dark:text-white
              text-gray-700
              font-bold
              text-lg
              sm:text-xl
            "
          >
            {statValue(data.targetValue)}
          </span>

          <span className="dark:text-gray-300 text-gray-500 text-xs sm:text-sm">
            {i18n.language === "fa" ? data.targetLabel.fa : data.targetLabel.en}
          </span>

          {data.targetPercent !== undefined && (
            <span className="dark:text-gray-400 text-gray-500 text-xs">
              ({data.targetPercent}٪)
            </span>
          )}
        </div>

        <div className="flex flex-col items-center gap-1">
          <span
            className="
              dark:text-white
              text-gray-700
              font-bold
              text-lg
              sm:text-xl
            "
          >
            {statValue(data.currentValue)}
          </span>

          <span className="dark:text-gray-300 text-gray-500 text-xs sm:text-sm">
            {i18n.language === "fa"
              ? data.currentLabel.fa
              : data.currentLabel.en}
          </span>

          {data.currentPercent !== undefined && (
            <span className="dark:text-gray-400 text-gray-500 text-xs">
              ({data.currentPercent}٪)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
