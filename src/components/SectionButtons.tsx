import { useState } from "react";
import { buttonSection } from "../data/fakeData";
import Button from "./ui/Button";
import { useTranslation } from "react-i18next";
import ShowSectionItems from "./ShowSectionItems";
import WellcomeComponent from "./WellcomeComponent";
import { buttonStyles } from "../styles/buttonStyles";
import DetailseComponent from "./DetailseComponent";
import InformationAccount from "./InformationAccount";
import ChallengeGrid from "./ChallengeGrid";
import TradingChartsGrid from "./TradingChartsGrid";
import ProgressCardsSection from "./ProgressCardsSection";
import TradingChart from "./TradingChart";

function SectionButtons() {
  const [activeId, setActiveId] = useState<number>(1);
  const { i18n } = useTranslation();

  // استایل های تعریف شده برای دکمه ها
  const { active, darkInactive, lightInactive } = buttonStyles;

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5 font-lahzeh font-extrabold">
        {buttonSection.map((items) => {
          const isActive = activeId === items.id;

          return (
            <Button
              key={items.id}
              onClick={() => setActiveId(items.id)}
              hoverVariant="trading"
              className={`cursor-pointer transition-all  duration-300 ${
                isActive ? "scale-[1.03]" : "hover:-translate-y-1"
              }`}
              borderRadios="rounded-3xl"
              fontBold="font-bold"
              textStyle="text-[14px] sm:text-[18px]"
              bgColor={isActive ? active : lightInactive + " " + darkInactive}
              width="w-full"
              height="h-[80px]"
            >
              <div className="flex flex-col items-center text-center">
                <span
                  className={`leading-tight font-bold transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-200"
                  }`}
                >
                  {i18n.language === "fa" ? items.fa : items.en}
                </span>

                <span
                  className={`border-t-3 rounded-2xl w-24 sm:w-32 mt-1 transition-all duration-300 ${
                    isActive
                      ? "border-[#FFCC00] w-28"
                      : "border-gray-200 dark:border-[#D9D9D914] group-hover:border-[#8777FF] group-hover:w-28"
                  }`}
                />
              </div>
            </Button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* قسمت آیتم ها */}
        <div className="w-full lg:flex-1 min-w-0">
          <ShowSectionItems activeId={activeId} />
        </div>

        {/* کامپوننت خوش امدگویی */}
        <div className="w-full lg:w-auto flex justify-start lg:justify-end">
          <WellcomeComponent />
        </div>
      </div>
      <div className="w-full lg:w-auto flex justify-start mt-8">
        <DetailseComponent />
      </div>

      {/* اطلاعات حساب */}
      <div className="w-full lg:w-auto flex justify-start mt-8">
        <InformationAccount />
      </div>

      <div className="w-full lg:w-auto flex justify-start mt-8">
        <ChallengeGrid />
      </div>
      <div className="w-full lg:w-auto flex flex-col lg:flex-row mt-8">
        <ProgressCardsSection />
        <TradingChartsGrid />
      </div>

      <div className="w-full mx-auto mt-8">
        <TradingChart />
      </div>
    </div>
  );
}

export default SectionButtons;

// ----------------------------------------------------------------------------------
// دیتاهای گرفته شده هر آیتم برای نمایش باید به خط 75 به صورت پراپس پاس داده بشن
//دیتا نام کاربر برایی خوش آمدگویی  باید در کامپوننت خط 62 نمایش داده بشه
//اطلاعات حساب کاربر-کارت ها باید خط 80 داده بشه
