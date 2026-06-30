import { useTranslation } from "react-i18next";
import type { MetricRow } from "../types/interfaces";
import { behaviorMetrics, performanceMetrics } from "../data/fakeData";
import UsersIcon from "../icons/UsersIcon";
import ProfileIcon from "../icons/ProfileIcon";
import VS from "../assets/images/V.S.png";
import i18next, { t } from "i18next";
import CartFacke from "../module/CartFacke";

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
          <div className="w-30 sm:w-35 md:w-40 p-3 sm:p-4 md:p-5 absolute -top-2 left-[50%] sm:left-42.5 transform -translate-x-1/2 sm:translate-x-0 rounded-lg h-4.5 sm:h-5 dark:bg-linear-to-l dark:from-[#494949] dark:to-[#C4C4C426] dark:backdrop-blur-md bg-[#a1a6ac] shrink-0 flex items-center justify-center">
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

// function SummaryCardItem({ card }: { card: any }) {
//   return (
//     <div className="w-full">
//       <CartFacke />
//     </div>
//   );
// }

export default function VSComparison() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  return (
    <>
      <h1 className="md:text-2xl text-md font-bold px-4 mt-3 mb-3">
        {t("labels.parametr12")}
      </h1>
      <div className=" dark:bg-[#2B2B2B] step-test48 w-full max-w-388.5 rounded-2xl mt-3 border-4 dark:border-white/10 border-gray-400 mx-auto text-white font-normal flex justify-center px-2 sm:px-4 py-4 sm:py-6">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-5xl px-2 sm:px-4 py-4 sm:py-6 flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center justify-between px-1 sm:px-2">
            <div
              className={`flex flex-col items-center gap-1 ${isRtl ? "order-3" : "order-1"} flex-1`}
            >
              <div className="w-8  h-8 sm:w-10 sm:h-10 rounded-full flex items-center flex-col text-base sm:text-lg">
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

          <div className="flex step-test49 flex-col lg:flex-row gap-4">
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
          <CartFacke />
        </div>
      </div>
    </>
  );
}
