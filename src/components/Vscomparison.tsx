import { useTranslation } from "react-i18next";
import type { MetricRow } from "../types/interfaces";
import { behaviorMetrics, performanceMetrics } from "../data/fakeData";
import UsersIcon from "../icons/UsersIcon";
import ProfileIcon from "../icons/ProfileIcon";
import VS from "../assets/images/V.S.png";
import i18next, { t } from "i18next";
import CartFacke from "../module/CartFacke";
import { useMemo, useState } from "react";

function MetricSection({ title, rows }: { title: string; rows: MetricRow[] }) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  return (
    <div
      dir="ltr"
      className="bg-[#f8fafc] shadow-xl dark:shadow-none dark:bg-[#353535] w-full border-4 dark:border-[#3A3A3A] border-gray-300 rounded-2xl p-3 sm:p-4 md:p-5 mb-4 flex-1"
    >
      <div
        className={`mb-3 sm:mb-4 md:mb-5 ${isRtl ? "text-right" : "text-left"}`}
      >
        <p className="text-center text-white text-sm sm:text-base font-semibold">
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
      {/* VALUES */}
      <div className="flex items-center justify-between">
        <span className="text-[#f5c842] text-xs sm:text-sm font-bold">
          +{row.leftValue}
        </span>

        <span className="text-[#a78bfa] text-xs sm:text-sm font-bold">
          {row.rightValue}
        </span>
      </div>

      {/* CHART ROW */}
      <div className="flex items-center gap-2 sm:gap-1">
        {/* LEFT BAR */}
        <div className="w-full sm:w-[45%] flex justify-end">
          <div className="w-full h-4 sm:h-5 rounded-lg bg-[#3F3F3F] overflow-hidden flex flex-row-reverse">
            <div
              className="h-full bg-[#FFCC00] rounded-full transition-all duration-500"
              style={{ width: `${row.leftBar}%` }}
            />
          </div>
        </div>

        <div className="flex justify-center items-center w-full sm:w-auto">
          <div className="px-3 py-1 rounded-lg bg-[#2f2f2f] dark:bg-[#444] border border-[#555]">
            <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white whitespace-nowrap">
              {i18next.language === "fa" ? row.label.fa : row.label.en}
            </span>
          </div>
        </div>

        <div className="w-full sm:w-[45%]">
          <div className="w-full h-[18px] sm:h-[24px] rounded-full bg-[#3F3F3F] overflow-hidden">
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

export default function VSComparison() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const [comparisonType, setComparisonType] = useState<
    "all" | "challenge" | "real"
  >("all");

  const comparisonTabs = [
    { id: "all", fa: "همه کاربران", en: "All Users" },
    { id: "challenge", fa: "کاربران این چالش", en: "Challenge Users" },
    { id: "real", fa: "کاربران ریل", en: "Real Users" },
  ];

  const scaleMetrics = (data: MetricRow[], factor: number) =>
    data.map((item) => ({
      ...item,
      leftValue: Math.floor(item.leftValue * factor),
      leftBar: Math.min(Math.floor(item.leftBar * factor), 100),
    }));

  const currentPerformanceMetrics = useMemo(() => {
    if (comparisonType === "all") return performanceMetrics;
    if (comparisonType === "challenge")
      return scaleMetrics(performanceMetrics, 0.8);
    return scaleMetrics(performanceMetrics, 1.15);
  }, [comparisonType]);

  const currentBehaviorMetrics = useMemo(() => {
    if (comparisonType === "all") return behaviorMetrics;
    if (comparisonType === "challenge")
      return scaleMetrics(behaviorMetrics, 0.8);
    return scaleMetrics(behaviorMetrics, 1.15);
  }, [comparisonType]);

  return (
    <>
      <h1 className="md:text-2xl text-fmd font-bold px-4 mt-3 mb-3">
        {t("labels.parametr12")}
      </h1>

      <div
        id="com1"
        className="dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030] w-full max-w-8xl rounded-2xl mt-3 border-4 dark:border-[#3C3C3C] border-gray-300 mx-auto text-white flex justify-center px-2 sm:px-4 py-4 sm:py-6"
      >
        <div className="w-full max-w-5xl px-2 sm:px-4 py-4 sm:py-6 flex flex-col gap-4">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div
              className={`flex flex-col items-center flex-1 ${isRtl ? "order-3" : "order-1"}`}
            >
              <UsersIcon />
              <span className="text-gray-400 font-bold">
                {i18n.language === "fa" ? "کاربران رابین سود" : "Robin Users"}
              </span>
            </div>

            <img src={VS} className="w-10 sm:w-12" />

            <div
              className={`flex flex-col items-center flex-1 ${isRtl ? "order-1" : "order-3"}`}
            >
              <ProfileIcon />
              <span className="text-gray-400 font-bold">
                {i18n.language === "fa" ? "شما" : "You"}
              </span>
            </div>
          </div>

          {/* FILTER */}
          <div
            id="com2"
            className="w-full flex justify-center sticky top-2 z-20"
          >
            <div className="w-full lg:w-auto bg-transparent border backdrop-blur-3xl border-[#3B3B3B] rounded-2xl p-1 grid grid-cols-1 sm:grid-cols-3 gap-1 shadow-xl">
              {comparisonTabs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setComparisonType(item.id as any)}
                  className={`px-4 py-3 rounded-2xl text-sm font-normal transition-all duration-300 ${
                    comparisonType === item.id
                      ? "bg-linear-to-r from-[#6D28D9] to-[#9333EA] text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-[#313131]"
                  }`}
                >
                  {i18n.language === "fa" ? item.fa : item.en}
                </button>
              ))}
            </div>
          </div>

          {/* METRICS */}
          <div id="com3" className="flex flex-col lg:flex-row gap-4">
            <MetricSection
              title={
                i18n.language === "fa"
                  ? "عملکرد و بازدهی"
                  : "Performance & Returns"
              }
              rows={currentPerformanceMetrics}
            />

            <MetricSection
              title={
                i18n.language === "fa" ? "رفتار معاملاتی" : "Trading Behavior"
              }
              rows={currentBehaviorMetrics}
            />
          </div>

          <CartFacke />
        </div>
      </div>
    </>
  );
}
