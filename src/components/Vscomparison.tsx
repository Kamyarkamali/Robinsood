import { useTranslation } from "react-i18next";
import type { MetricRow } from "../types/interfaces";
import { behaviorMetrics, performanceMetrics } from "../data/fakeData";
import UsersIcon from "../icons/UsersIcon";
import ProfileIcon from "../icons/ProfileIcon";
import VS from "../assets/images/V.S.png";
import i18next from "i18next";
import CartFacke from "../module/CartFacke";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function MetricSection({
  title,
  rows,
  id = "comp2",
}: {
  title: string;
  rows: MetricRow[];
  id?: string;
}) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  return (
    <div
      id={id}
      dir="ltr"
      className="bg-[#f8fafc] shadow-sm dark:shadow-none dark:bg-[#353535] w-full dark:border-4 border-2 border-[#D6DCE8]
 dark:border-[#3A3A3A] rounded-2xl p-3 sm:p-4 md:p-5 mb-4 flex-1"
    >
      <div dir="rtl" className="flex items-center justify-between w-full">
        <div className="flex flex-col items-center">
          <ProfileIcon />
          <span className="text-[#5B657A] font-bold md:block hidden">
            {i18n.language === "fa" ? "شما" : "You"}
          </span>
        </div>

        <div
          className={`flex flex-col items-center flex-1 ${
            isRtl ? "order-3" : "order-1"
          }`}
        >
          <UsersIcon />
          <span className="text-[#5B657A] text-sm whitespace-nowrap font-bold md:block hidden">
            {i18n.language === "fa" ? "کاربران رابین سود" : "Robin Users"}
          </span>
        </div>

        <div className="flex-4 flex items-center justify-center md:mr-4 mx-auto">
          <img src={VS} className="w-10 sm:w-10 object-contain" alt="VS" />
        </div>
      </div>

      <div
        className={`mb-3 sm:mb-4 md:mb-5 ${isRtl ? "text-right" : "text-left"}`}
      >
        <p className="text-center text-[#5B657A] dark:text-white text-sm sm:text-base font-semibold">
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
        <span className="text-[#a78bfa] text-xs sm:text-sm font-bold">
          {row.rightValue}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-1">
        <div className="w-full sm:w-[45%] flex justify-end">
          <div className="w-full h-4 sm:h-5 rounded-lg dark:bg-[#3F3F3F] bg-[#726e6e] overflow-hidden flex flex-row-reverse">
            <div
              className="h-full bg-[#FFCC00] rounded-xl transition-all duration-500"
              style={{ width: `${row.leftBar}%` }}
            />
          </div>
        </div>

        <div className="flex justify-center items-center w-full sm:w-auto">
          <div className="px-3 py-1 rounded-lg bg-[#EAF0FF] dark:bg-[#444] border dark:border-[#555]">
            <span className="text-[10px] sm:text-[11px] md:text-[12px] dark:text-white text-[#5B657A] whitespace-nowrap">
              {i18next.language === "fa" ? row.label.fa : row.label.en}
            </span>
          </div>
        </div>

        <div className="w-full sm:w-[45%]">
          <div className="w-full h-[18px] sm:h-[24px] rounded-full dark:bg-[#3F3F3F] bg-[#726e6e] overflow-hidden">
            <div
              className="h-full bg-[#7c3aed] rounded-xl transition-all duration-500"
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [comparisonType, setComparisonType] = useState<
    "all" | "challenge" | "real" | "self"
  >("all");

  const comparisonTabs = [
    { id: "all", fa: "همه کاربران", en: "All Users" },
    { id: "challenge", fa: "کاربران این چالش", en: "Challenge Users" },
    { id: "real", fa: "کاربران ریل", en: "Real Users" },
    { id: "self", fa: "مقایسه با خود", en: "Compare with Self" },
  ];

  const activeTab = comparisonTabs.find((tab) => tab.id === comparisonType);
  const activeLabel = i18n.language === "fa" ? activeTab?.fa : activeTab?.en;

  const scaleMetrics = (data: MetricRow[], factor: number) =>
    data.map((item) => ({
      ...item,
      leftValue: Math.floor(item.leftValue * factor),
      leftBar: Math.min(Math.floor(item.leftBar * factor), 100),
    }));

  const getSelfMetrics = (data: MetricRow[]) => {
    return data.map((item) => ({
      ...item,
      leftValue: Math.floor(item.leftValue * 0.9),
      leftBar: Math.min(Math.floor(item.leftBar * 0.9), 100),
      rightValue: Math.floor(item.rightValue * 1.1),
      rightBar: Math.min(Math.floor(item.rightBar * 1.1), 100),
    }));
  };

  const currentPerformanceMetrics = useMemo(() => {
    if (comparisonType === "all") return performanceMetrics;
    if (comparisonType === "challenge")
      return scaleMetrics(performanceMetrics, 0.8);
    if (comparisonType === "real")
      return scaleMetrics(performanceMetrics, 1.15);
    if (comparisonType === "self") return getSelfMetrics(performanceMetrics);
    return performanceMetrics;
  }, [comparisonType]);

  const currentBehaviorMetrics = useMemo(() => {
    if (comparisonType === "all") return behaviorMetrics;
    if (comparisonType === "challenge")
      return scaleMetrics(behaviorMetrics, 0.8);
    if (comparisonType === "real") return scaleMetrics(behaviorMetrics, 1.15);
    if (comparisonType === "self") return getSelfMetrics(behaviorMetrics);
    return behaviorMetrics;
  }, [comparisonType]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="dark:bg-linear-to-b w-full max-w-8xl rounded-2xl mt-3 text-white flex justify-center px-2 sm:px-4 py-4 sm:py-6">
        <div className="w-full max-w-5xl px-2 sm:px-4 py-4 sm:py-6 flex flex-col gap-4">
          <div className="w-full flex justify-center">
            <div className="w-full lg:hidden">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-[#3B3B3B] bg-transparent backdrop-blur-3xl text-white text-sm font-medium transition-all hover:border-[#6D28D9]"
                >
                  <span>
                    {activeLabel ||
                      (i18n.language === "fa" ? "انتخاب کنید" : "Select")}
                  </span>
                  <MdKeyboardArrowDown
                    className={`text-xl transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#2B2B2B] border border-[#3B3B3B] rounded-2xl shadow-xl overflow-hidden">
                    {comparisonTabs.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setComparisonType(item.id as any);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-sm text-right transition-all hover:bg-[#3A3A3A]
                          ${
                            comparisonType === item.id
                              ? "bg-[#6D28D9] text-white"
                              : "text-gray-300"
                          }
                        `}
                      >
                        {i18n.language === "fa" ? item.fa : item.en}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              id="comp1"
              className="hidden lg:flex w-full lg:w-auto bg-transparent border backdrop-blur-3xl border-[#3B3B3B] rounded-2xl p-1 gap-1 shadow-xl"
            >
              {comparisonTabs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setComparisonType(item.id as any)}
                  className={`px-4 py-2.5 cursor-pointer rounded-2xl text-sm font-normal transition-all duration-300 whitespace-nowrap ${
                    comparisonType === item.id
                      ? "bg-linear-to-r from-[#6D28D9] to-[#9333EA] text-white shadow-lg"
                      : "text-[#5B657A] hover:text-white"
                  }`}
                >
                  {i18n.language === "fa" ? item.fa : item.en}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <MetricSection
              id="comp2"
              title={
                i18n.language === "fa"
                  ? "عملکرد و بازدهی"
                  : "Performance & Returns"
              }
              rows={currentPerformanceMetrics}
            />

            <MetricSection
              id="comp3"
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
