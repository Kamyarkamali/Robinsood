import { useTranslation } from "react-i18next";
import type { MetricRow, SummaryCard } from "../types/interfaces";
import {
  behaviorMetrics,
  performanceMetrics,
  summaryCards,
} from "../data/fakeData";
import UsersIcon from "../icons/UsersIcon";
import ProfileIcon from "../icons/ProfileIcon";
import VS from "../assets/images/V.S.png";
import TrendUpIcon from "../icons/TrendUpIcon";
import i18next from "i18next";

function MetricSection({ title, rows }: { title: string; rows: MetricRow[] }) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  return (
    <div
      dir="ltr"
      className="bg-[#f8fafc] shadow-xl dark:shadow-none dark:bg-[#353535] w-full border-4 dark:border-[#3A3A3A] border-gray-300 light:bg-[#f0f4ff] rounded-2xl p-3 sm:p-4 md:p-5 mb-4 flex-1"
    >
      <div
        className={`text-right mb-3 sm:mb-4 md:mb-5 ${isRtl ? "text-right" : "text-left"}`}
      >
        <p
          className={`${isRtl ? "text-right" : "text-left"} text-white dark:text-white text-sm sm:text-base font-semibold`}
        >
          {title}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
        {rows.map((row) => (
          <MetricRow key={row.id} row={row} />
        ))}
      </div>
    </div>
  );
}

function MetricRow({ row }: { row: MetricRow }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[#f5c842] text-xs sm:text-sm font-bold">
          +{row.leftValue}
        </span>

        <span className="text-[#a78bfa] dark:text-[#a78bfa] text-xs sm:text-sm font-bold min-w-[30px] sm:min-w-[36px]">
          {row.rightValue}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-1 relative">
        <div className="w-full sm:w-[45%] flex justify-end relative">
          <div className="w-full sm:w-57.25 h-4.5 sm:h-5 rounded-lg bg-[#3F3F3F] overflow-hidden flex flex-row-reverse">
            <div
              className="h-full bg-[#FFCC00] rounded-full transition-all duration-500"
              style={{ width: `${row.leftBar}%` }}
            />
          </div>
          <div className="w-30 sm:w-35 md:w-40 p-3 sm:p-4 md:p-5 absolute -top-2 left-[50%] sm:left-42.5 transform -translate-x-1/2 sm:translate-x-0 rounded-lg h-4.5 sm:h-5 dark:bg-linear-to-l daek:from-[#494949] dark:to-[#C4C4C426] dark:backdrop-blur-md bg-[#a1a6ac] shrink-0 flex items-center justify-center">
            <span className="text-[10px] sm:text-[11px] md:text-[12px] text-center font-normal whitespace-nowrap">
              {i18next.language === "fa" ? row?.label?.fa : row?.label?.en}
            </span>
          </div>
        </div>

        <div className="w-full sm:w-[45%]">
          <div className="w-full sm:w-[229px] h-[18px] sm:h-[24px] rounded-full bg-[#3F3F3F] overflow-hidden">
            <div
              className="h-full bg-[#7c3aed] transition-all duration-500"
              style={{ width: `${row.rightBar}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCardItem({ card }: { card: SummaryCard }) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="
      bg-[#f8fafc] dark:bg-[#303030]
      border-2 border-gray-300
      dark:border-none
      shadow-lg
      rounded-xl
      p-2 sm:p-3 md:p-4
      flex items-center justify-between
      w-full max-w-[220px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[300px]
      aspect-square
      overflow-hidden
    "
      >
        <div className="flex flex-col gap-1.5 items-end">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="
            bg-[#314746]
            w-11.5 sm:w-12.5 md:w-13.5
            h-6 sm:h-7
            rounded-lg
            flex items-center justify-center gap-1
          "
            >
              <TrendUpIcon />
              <span className="text-[#34CB5A] text-[9px] sm:text-[10px]">
                32%
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <span
            className="
          text-[#34CB5A]
          text-xl sm:text-2xl md:text-3xl
          font-bold
          drop-shadow-[0_0_6px_#34CB5A]
        "
          >
            {i18n.language === "fa" ? "۵۸٪" : "58%"}
          </span>
        </div>

        <div className="flex flex-col items-start gap-0.5">
          <span className="dark:text-white text-gray-500 text-sm sm:text-base md:text-lg font-bold leading-tight">
            {i18next.language === "fa" ? "خرید" : "Buy"}
          </span>
          <span className="dark:text-white text-gray-500 text-sm sm:text-base md:text-lg font-bold leading-tight">
            {i18next.language === "fa" ? "فروش" : "Sell"}
          </span>
        </div>
      </div>

      <div
        className={`
      text-[10px] sm:text-xs md:text-sm
      text-gray-400 leading-snug
      w-full max-w-[220px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[300px]
      ${isRtl ? "text-right" : "text-left"}
    `}
      >
        <span className="flex items-center justify-center dark:text-white text-gray-500 font-bold mt-2 text-xs sm:text-sm">
          {i18next.language === "fa" ? card?.title?.fa : card?.title?.en}
        </span>
      </div>
    </div>
  );
}

export default function VSComparison() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  return (
    <div className=" dark:bg-[#2B2B2B] w-full max-w-388.5 rounded-[25px] border-4 dark:border-white/10 border-gray-400 mx-auto text-white font-normal flex justify-center px-2 sm:px-4 py-4 sm:py-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-5xl px-2 sm:px-4 py-4 sm:py-6 flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center justify-between px-1 sm:px-2">
          <div
            className={`flex flex-col items-center gap-1 ${isRtl ? "order-3" : "order-1"} flex-1`}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center flex-col text-base sm:text-lg">
              <UsersIcon />
            </div>
            <span className="dark:text-[#ffffff] text-gray-500 text-base sm:text-lg md:text-xl font-bold whitespace-nowrap text-center">
              {i18n.language === "fa" ? "کاربران رابین سود" : "Robin's Users"}
            </span>
          </div>

          <div className="order-2 shrink-0 px-1 sm:px-2">
            <img src={VS} alt="VS" className="w-8 sm:w-10 md:w-12" />
          </div>

          <div
            className={`flex flex-col items-center gap-1 ${isRtl ? "order-1" : "order-3"} flex-1`}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-base sm:text-lg">
              <ProfileIcon />
            </div>
            <span className="text-base sm:text-lg md:text-xl font-bold dark:text-white text-gray-500">
              {i18n.language === "fa" ? "شما" : "You"}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <MetricSection
            title={
              i18n.language === "fa"
                ? "عملکرد و بازدهی"
                : "Performance & Returns"
            }
            rows={performanceMetrics}
          />

          <MetricSection
            title={
              i18n.language === "fa" ? "رفتار معاملاتی" : "Trading Behavior"
            }
            rows={behaviorMetrics}
          />
        </div>

        <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {summaryCards.map((card) => (
            <div
              key={card.id}
              className={
                card.id === 5 ? "col-span-2 sm:col-span-3 lg:col-span-1" : ""
              }
            >
              <SummaryCardItem card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
