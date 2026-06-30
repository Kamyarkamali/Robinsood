import { useState } from "react";
import i18next from "i18next";
import { createAppTour } from "../components/tour/appTour";

import Navbar from "../components/Navbar";
import TradingCover from "../module/Tradingcover ";
import CardComponent from "../pages/CardComponent";
import DashboardCards from "../components/modals/DashboardCards";
import HomePage from "../pages/HomePage";
import InformationAccount from "../components/InformationAccount";
import ChallengeGrid from "../components/ChallengeGrid";
import TodayeInformation from "../pages/TodayeInformation";
import TradingChart from "../components/TradingChart";
import DetailseAccount from "../pages/DetailseAccount";
import ChangeComponent from "../module/ChangeComponent";
import NewsComponent from "../pages/NewsComponent";
import TradingAnalysisPanel from "../components/Tradinganalysispanel ";
import VSComparison from "../components/Vscomparison";
import TradingTable from "../components/trading/TradingTable";

function Route() {
  const [activeComponent, setActiveComponent] =
    useState<string>("ShowAllComponents");

  const handleStartTour = () => {
    const lang = i18next.language === "fa" ? "fa" : "en";

    const theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";

    createAppTour(lang, theme).drive();
  };
  return (
    <div className="pr-4 pl-4">
      <div className="w-full max-w-372.5 mx-auto px-4 md:pt-2 ">
        <Navbar />
      </div>
      <div className="flex flex-col items-center">
        <TradingCover />
        <CardComponent onStartTour={handleStartTour} />
      </div>
      <DashboardCards
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
      {/* نمایش صفحات بر اساس نیاز-تغیر داده نشود */}

      {/* ---------------------------------------------------------------------- */}
      {activeComponent === "ShowAllComponents" && <HomePage />}
      {activeComponent === "InformationAccount" && <InformationAccount />}
      {activeComponent === "ChallengeGrid" && <ChallengeGrid />}
      {activeComponent === "ProgressCardsSection" && <TodayeInformation />}
      {activeComponent === "chart" && <TradingChart />}
      {activeComponent === "detailseAc" && <DetailseAccount />}
      {activeComponent === "detaileCalendre" && <ChangeComponent />}
      {activeComponent === "newsComponent" && <NewsComponent />}
      {activeComponent === "AiComponent" && <TradingAnalysisPanel />}
      {activeComponent === "Comparison" && <VSComparison />}
      {activeComponent === "TransactionList" && <TradingTable />}
    </div>
  );
}

export default Route;
