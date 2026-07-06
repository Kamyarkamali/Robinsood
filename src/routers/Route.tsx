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
import DashboardWindows from "../components/modals/DashboardWindows";

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

  console.log(activeComponent);

  return (
    <div className="pr-4 pl-4 min-h-screen">
      <div className="w-full max-w-372.5 mx-auto px-4 md:pt-2">
        <Navbar activeComponent={activeComponent} />
      </div>

      <div className="flex flex-col items-center">
        <TradingCover />
        <CardComponent onStartTour={handleStartTour} />
      </div>

      <DashboardCards
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
      <DashboardWindows
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />

      {activeComponent === "ShowAllComponents" && (
        <div>
          <HomePage />
        </div>
      )}

      {activeComponent === "InformationAccount" && (
        <div id="InformationAccount">
          <InformationAccount />
        </div>
      )}

      {activeComponent === "ChallengeGrid" && (
        <div id="ChallengeGrid">
          <ChallengeGrid />
        </div>
      )}

      {activeComponent === "ProgressCardsSection" && (
        <div id="ProgressCardsSection">
          <TodayeInformation />
        </div>
      )}

      {activeComponent === "chart" && (
        <div id="chart">
          <TradingChart />
        </div>
      )}

      {activeComponent === "detailseAc" && (
        <div id="detailseAc">
          <DetailseAccount />
        </div>
      )}

      {activeComponent === "detaileCalendre" && (
        <div id="detaileCalendre">
          <ChangeComponent />
        </div>
      )}

      {activeComponent === "newsComponent" && (
        <div id="newsComponent">
          <NewsComponent />
        </div>
      )}

      {activeComponent === "AiComponent" && (
        <div id="AiComponent">
          <TradingAnalysisPanel />
        </div>
      )}

      {activeComponent === "Comparison" && (
        <div id="Comparison">
          <VSComparison />
        </div>
      )}

      {activeComponent === "TransactionList" && (
        <div id="TransactionList">
          <TradingTable />
        </div>
      )}
    </div>
  );
}

export default Route;
