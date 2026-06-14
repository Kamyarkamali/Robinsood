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
    <div className="p-4 flex flex-col gap-4 w-107 h-55.25 border-4 dark:bg-[#282828] bg-linear-to-t dark:from-[#1e1e1e] dark:to-[#2a2a2a] rounded-[21.24px] border-gray-300 dark:border-[#3C3C3C]">
      <div className="flex items-center justify-start gap-3">
        <h3 className="dark:text-white text-gray-500 text-lg font-semibold whitespace-nowrap">
          {i18n.language === "fa" ? data.title.fa : data.title.en}
        </h3>
        <span
          className={`text-xs px-3 py-1 rounded-full text-[10.06px] dark:text-white  text-gray-500 font-normal`}
        >
          {i18n.language === "fa" ? data.badgeText.fa : data.badgeText.en}
        </span>
      </div>

      <div
        className="flex items-center rounded-full p-1"
        style={{ background: "#A8A8A81A", height: 52 }}
      >
        <div className="flex-1 text-center text-[#888] font-medium text-sm">
          {formatValue(data.targetValue, data.unit)}
        </div>
        <div
          className={`${gradientClass} rounded-full flex items-center justify-center`}
          style={{ width: `${fillPercent}%`, height: 44, minWidth: 80 }}
        >
          <span className="text-white font-bold text-base px-4 whitespace-nowrap">
            {formatValue(data.currentValue, data.unit)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="flex flex-col items-center gap-1">
          <span className="dark:text-white text-gray-500 text-xl font-bold">
            {statValue(data.currentValue)}
          </span>
          <span className="dark:text-white text-gray-500 font-normal text-xs">
            {i18n.language === "fa"
              ? data.currentLabel.fa
              : data.currentLabel.en}
          </span>
          {data.currentPercent !== undefined && (
            <span className="dark:text-white text-gray-500 font-normal text-xs">
              ({data.currentPercent}٪)
            </span>
          )}
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-white text-xl font-bold ">
            {statValue(data.targetValue)}
          </span>
          <span className="dark:text-white text-gray-500 text-xs">
            {i18n.language === "fa" ? data.targetLabel.fa : data.targetLabel.en}
          </span>
          {data.targetPercent !== undefined && (
            <span className="dark:text-white text-gray-500 text-xs">
              ({data.targetPercent}٪)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
