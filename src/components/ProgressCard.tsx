import React from "react";
import type { Progres } from "../types/interfaces";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface Props {
  data: Progres;
}

const formatValue = (
  value: number,
  unit: Progres["unit"],
  language: string,
) => {
  const locale = language === "fa" ? "fa-IR" : "en-US";

  if (unit === "currency") {
    return `$${value.toLocaleString(locale)}`;
  }

  return i18next.language === "fa"
    ? `${value.toLocaleString(locale)} روز`
    : `${value.toLocaleString(locale)} Day`;
};
const ProgressCard: React.FC<Props> = ({ data }) => {
  const { i18n } = useTranslation();

  const getBadgeGradient = (faText?: string, enText?: string) => {
    const fa = faText || "";
    const en = enText || "";

    if (fa.includes("عالی داری پیش میری") || en.includes("Great job")) {
      return "from-sky-500 to-indigo-500";
    }

    if (fa.includes("نیاز داری که تایم") || en.includes("You need to spend ")) {
      return "from-orange-500 to-orange-600";
    }

    return "from-gray-500 to-gray-400";
  };

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
      id={data.id}
      className="
        w-full
        min-h-55
        p-3 sm:p-4 lg:p-6
        flex flex-col
        gap-4
        rounded-2xl
        dark:border-4
        border
        border-[#E3E7F0]
        dark:border-[#3C3C3C]
        dark:bg-[#282828]
        bg-white
        transition-all
        duration-300
      "
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <h3
          className="
            dark:text-white
            text-[#1F2430]
            font-semibold
            text-sm
            sm:text-base
            lg:text-lg
          "
        >
          {i18n.language === "fa" ? data?.title?.fa : data?.title?.en}
        </h3>

        <span
          className={`
           ${getBadgeGradient(data.badgeText?.fa, data.badgeText?.en)}
            px-2 py-1
            sm:px-3
            rounded-full
            text-[10px]
            sm:text-xs
            text-[#1F2430]
            dark:text-white
            dark:bg-[#383737]
            bg-[#E3E7F0]
          `}
        >
          {i18n.language === "fa" ? data.badgeText.fa : data.badgeText.en}
        </span>
      </div>

      <div className="flex items-center rounded-full p-1 bg-[#A8A8A81A] h-12 sm:h-13 overflow-hidden">
        <div
          className="
            flex-1
            text-center
            text-[#1F2430]
            dark:text-[#888]
            font-medium
            text-[11px]
            sm:text-sm
            px-2
          "
        >
          {/* @ts-ignore */}
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
            {/* @ts-ignore */}
            {formatValue(data.currentValue, data.unit)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center mt-auto">
        <div
          className="
            flex flex-col items-center justify-center gap-0.5 sm:gap-1
            p-1.5 sm:p-2 lg:p-3
            rounded-xl
            transition-all
            duration-300
            min-h-15 sm:min-h-17.5
          "
        >
          <span className="text-[#D9A441] font-semibold text-xs sm:text-sm lg:text-base">
            {data?.bestegor?.value}
          </span>
          <span className="dark:text-[#99A1AF] text-[#1F2430] text-[10px] whitespace-nowrap">
            {i18n.language === "fa" ? data.bestegor?.fa : data.bestegor?.en}
          </span>
        </div>

        <div
          className="
            flex flex-col items-center justify-center gap-0.5 sm:gap-1
            p-1.5 sm:p-2 lg:p-3
            rounded-xl
            transition-all
            duration-300
            min-h-15 sm:min-h-17.5
          "
        >
          <span
            className="
              dark:text-white
              text-[#1F2430]
              font-semibold
              text-sm
              sm:text-base
              lg:text-lg
            "
          >
            {statValue(data.targetValue)}
          </span>

          <span
            className="dark:text-gray-300  text-[#1F2430]
 text-[10px] whitespace-nowrap"
          >
            {i18n.language === "fa" ? data.targetLabel.fa : data.targetLabel.en}
          </span>

          {data.targetPercent !== undefined && (
            <span className="dark:text-[#99A1AF] text-[#1F2430] text-[8px] sm:text-[10px]">
              ({data.targetPercent}٪)
            </span>
          )}
        </div>

        <div
          className="
            flex flex-col items-center justify-center gap-0.5 sm:gap-1
            p-1.5 sm:p-2 lg:p-3
            rounded-xl
            transition-all
            duration-300
            min-h-15 sm:min-h-17.5
          "
        >
          <span
            className="
              dark:text-white
              text-[#1F2430]
              font-semibold
              text-sm
              sm:text-base
              lg:text-lg
            "
          >
            7
          </span>

          <span className="dark:text-[#99A1AF] text-[#1F2430] text-[10px] whitespace-nowrap">
            {i18n.language === "fa"
              ? "روز معاملاتی قابل قبول"
              : "	Valid Trading Day"}
          </span>

          {data.currentPercent !== undefined && (
            <span className="dark:text-[#99A1AF] text-[#1F2430] text-[8px] sm:text-[10px]">
              ({data.currentPercent}٪)
            </span>
          )}
        </div>

        <div
          className="
            flex flex-col items-center justify-center gap-0.5 sm:gap-1
            p-1.5 sm:p-2 lg:p-3
            rounded-xl
            transition-all
            duration-300
            min-h-15 sm:min-h-17.5
          "
        >
          <span
            className="
              dark:text-white
              text-gray-700
              font-semibold
              text-sm
              sm:text-base
              lg:text-lg
            "
          >
            {statValue(data.currentValue)}
          </span>

          <span className="dark:text-[#99A1AF] text-[#1F2430] text-[10px] whitespace-nowrap">
            {i18n.language === "fa"
              ? data.currentLabel.fa
              : data.currentLabel.en}
          </span>

          {data.currentPercent !== undefined && (
            <span className="dark:text-[#99A1AF] text-[#1F2430] text-[8px] sm:text-[10px]">
              ({data.currentPercent}٪)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
