import { useTranslation } from "react-i18next";
import { capitalData, middleData, statsData } from "../data/fakeData";
import i18next from "i18next";

const vc = (c?: "green" | "red") =>
  c === "green"
    ? "text-emerald-500 dark:text-emerald-400"
    : c === "red"
      ? "text-red-500 dark:text-red-400"
      : "text-gray-900 dark:text-white";

const ROW_BASE =
  "flex items-center border-b last:border-0 border-gray-200 dark:border-white/5";

const EVEN_BG = "bg-gray-100 dark:bg-[#282828]";

const ODD_BG = "bg-gray-200/60 dark:bg-[#313131]";

const SECTION_HEADER = `px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2B2B2B] ${i18next.language === "fa" ? "text-right" : "text-left"}`;

const TEXT_MAIN = "text-gray-900 dark:text-gray-100";

const TEXT_SECONDARY = "text-gray-600 dark:text-gray-400";

export default function TradingStatsTable() {
  const { i18n, t } = useTranslation();

  return (
    <div dir="rtl" className="p-2 sm:p-4">
      <div className="w-full rounded-md overflow-hidden dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr]">
          <div className="border-b md:-b-0 md:border-l border-gray-200 dark:border-gray-700">
            <div className={SECTION_HEADER}>
              <span
                className={`text-sm block p-3.5 text-center font-bold text-gray-700 ${TEXT_MAIN}`}
              >
                {t("labaleTabale.labale1")}
              </span>
            </div>

            {statsData.map((row, i) => (
              <div
                dir={i18n.language === "fa" ? "ltr" : "rtl"}
                key={i}
                className={`${ROW_BASE} ${i % 2 === 0 ? EVEN_BG : ODD_BG}`}
              >
                <div className="w-[30%] tex-center flex justify-center px-3 py-2">
                  <span className={`text-sm font-bold ${vc(row.valueColor)}`}>
                    {row.value}
                  </span>
                </div>

                <div className="w-px self-stretch bg-gray-300 dark:bg-white/10" />

                <div className="flex-1 px-3 py-2 text-center">
                  <span className={`text-xs ${TEXT_SECONDARY}`}>
                    {i18n.language === "fa" ? row.labelFa : row.labelEn}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-b md:border-b-0 md:border-l border-gray-200 dark:border-gray-700">
            <div className={SECTION_HEADER}>
              <span className="text-sm font-bold text-transparent select-none">
                ‌
              </span>
            </div>

            {middleData.map((row, i) => (
              <div
                dir={i18n.language === "fa" ? "ltr" : "rtl"}
                key={i}
                className={`${ROW_BASE} ${i % 2 === 0 ? EVEN_BG : ODD_BG}`}
              >
                <div className="w-[38%] px-3 py-2">
                  <span
                    className={`text-sm font-bold flex justify-center ${vc(row.valueColor)}`}
                  >
                    {i18n.language === "fa" ? row.valueFa : row.valueEn}
                  </span>
                </div>

                <div className="w-px self-stretch bg-gray-300 dark:bg-white/10" />

                <div className="flex-1 px-3 py-2 text-center">
                  <span className={`text-xs text-center ${TEXT_SECONDARY}`}>
                    {i18n.language === "fa" ? row.labelFa : row.labelEn}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ستون سوم با مارجین و گردی کامل */}
          <div className="md:mr-3 mt-5 md:mt-0">
            <div className="rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className={SECTION_HEADER}>
                <span
                  className={`text-sm text-center block p-3.5 font-bold ${TEXT_MAIN}`}
                >
                  {t("labaleTabale.labale2")}
                </span>
              </div>

              {capitalData.map((row, i) => (
                <div
                  key={i}
                  dir={i18n.language === "fa" ? "ltr" : "rtl"}
                  className={`${ROW_BASE} ${i % 2 === 0 ? EVEN_BG : ODD_BG}`}
                >
                  <div className="w-[30%] px-3 py-2">
                    <span
                      className={`text-sm font-bold tabular-nums ${vc(row.valueColor)}`}
                    >
                      {row.value}
                    </span>
                  </div>

                  <div className="w-px self-stretch bg-gray-300 dark:bg-white/10" />

                  <div className="flex-1 px-3 py-2 text-center">
                    <span className={`text-xs ${TEXT_SECONDARY}`}>
                      {i18n.language === "fa" ? row.labelFa : row.labelEn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
