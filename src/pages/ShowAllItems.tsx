import { useState } from "react";
import { useTranslation } from "react-i18next";
import ChallengeGrid from "../components/ChallengeGrid";
import DetailseComponent from "../components/DetailseComponent";
import InformationAccount from "../components/InformationAccount";
import ProgressCardsSection from "../components/ProgressCardsSection";
import TradingChart from "../components/TradingChart";
import TradingChartsGrid from "../components/TradingChartsGrid";
import WellcomeComponent from "../components/WellcomeComponent";
import TraderScoreCard from "../components/TraderScoreCard";
import AccountStats from "../components/AccountStats";
import TradingStatsTable from "../components/TradingStatsTable";
import ChangeTabale from "../module/ChangeTabale";
import TradingPanel from "../components/charts/TradingPanel";
import CalendarAnalysis from "../components/Calendaranalysis";
import TradingDualChart from "../components/TradingDualChart";
import TradingNewsTable from "../components/Tradingnewstable ";
import TradingAnalysisPanel from "../components/Tradinganalysispanel ";
import VSComparison from "../components/Vscomparison";
import TradingTable from "../components/trading/TradingTable";

function ShowAllItems() {
  const { t } = useTranslation();

  const [showTabale, setShowTabale] = useState<string>("عددی");

  return (
    <div>
      <div className="w-full lg:w-auto flex justify-start lg:justify-end">
        <WellcomeComponent />
      </div>
      <div className="w-full lg:w-auto flex justify-start mt-8">
        <DetailseComponent />
      </div>
      <div className="w-full lg:w-auto flex justify-start mt-8">
        <InformationAccount />
      </div>
      <div className="w-full lg:w-auto flex justify-start mt-8">
        <ChallengeGrid />
      </div>
      <div className="w-full mt-8">
        <h1 className=" dark:text-white text-gray-700 lg:px-8 md:px-3 sm:px-5 px-8  mb-4 text-[15px] sm:text-[17px] md:text-[25px] lg:text-[32px] font-bold">
          {t("labels.parametr3")}
        </h1>

        <div className="flex flex-col items-center lg:flex-row lg:mt-8">
          <ProgressCardsSection />
          <TradingChartsGrid />
        </div>
      </div>
      <div className="w-full max-w-350 mx-auto mt-8 px-2 sm:px-3 lg:px-4">
        <h1 className="dark:text-white text-gray-700 text-[15px] sm:text-[17px] md:text-[25px] lg:px-8 md:px-3 sm:px-5 px-5 lg:text-[32px] font-bold mb-4">
          {t("labels.parametr4")}
        </h1>
        <div className="w-full">
          <TradingChart />
        </div>
        <div className="w-full flex flex-col lg:w-auto justify-start mt-8">
          <div className="w-full flex flex-col md:flex-row items-center">
            <h1 className="dark:text-white text-gray-700 text-[15px] sm:text-[17px] md:text-[25px] lg:px-8 md:px-3 sm:px-5 px-5 lg:text-[32px] font-bold mb-4">
              {t("items.item5")}
            </h1>
            <ChangeTabale
              showTabale={showTabale}
              setShowTabale={setShowTabale}
            />
          </div>

          {showTabale === "عددی" ? (
            <>
              <AccountStats />
              <TraderScoreCard />
              <TradingPanel />
            </>
          ) : (
            <TradingStatsTable />
          )}
        </div>

        <div className="w-full mt-8">
          <h1 className=" dark:text-white text-gray-700 lg:px-8 md:px-3 sm:px-5 px-8 text-[15px] sm:text-[17px] md:text-[25px] lg:text-[32px] font-bold">
            {t("tabale2.calander")}
          </h1>
        </div>
      </div>
      <div className="w-full grid grid-cols-1">
        <CalendarAnalysis />
        <TradingDualChart />
      </div>
      <div className="flex flex-col pr-4 pl-4">
        <h1 className=" dark:text-white text-gray-700 lg:px-8 md:px-3 sm:px-5 px-8  mb-4 text-[15px] sm:text-[17px] md:text-[25px] lg:text-[32px] font-bold">
          {t("card9.title")}
        </h1>
        <TradingNewsTable />
      </div>

      <div className="mt-8">
        <h1 className=" dark:text-white text-gray-700 lg:px-8 md:px-3 sm:px-5 px-8  mb-4 text-[15px] sm:text-[17px] md:text-[25px] lg:text-[32px] font-bold">
          {t("labels.parametr7")}
        </h1>
        <TradingAnalysisPanel />
      </div>
      <div className="mt-8">
        <h1 className=" dark:text-white text-gray-700 lg:px-8 md:px-3 sm:px-5 px-8  mb-4 text-[15px] sm:text-[17px] md:text-[25px] lg:text-[32px] font-bold">
          {t("labels.paramer8")}
        </h1>
        <VSComparison />
      </div>
      <div className="mt-8">
        <h1 className=" dark:text-white text-gray-700 lg:px-8 md:px-3 sm:px-5 px-8  mb-4 text-[15px] sm:text-[17px] md:text-[25px] lg:text-[32px] font-bold">
          {t("labels.parametr9")}
        </h1>
        <TradingTable />
      </div>
    </div>
  );
}

export default ShowAllItems;
