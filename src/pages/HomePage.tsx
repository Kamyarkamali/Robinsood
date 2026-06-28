import { useState } from "react";
import ChallengeGrid from "../components/ChallengeGrid";
import DetailseComponent from "../components/DetailseComponent";
import InformationAccount from "../components/InformationAccount";
import Navbar from "../components/Navbar";
import ProgressCardsSection from "../components/ProgressCardsSection";
import TradingChart from "../components/TradingChart";
import TradingChartsGrid from "../components/TradingChartsGrid";
import WellcomeComponent from "../components/WellcomeComponent";
import ChangeTabale from "../module/ChangeTabale";
import TradingCover from "../module/Tradingcover ";
import CardComponent from "./CardComponent";
import AccountStats from "../components/AccountStats";
import TraderScoreCard from "../components/TraderScoreCard";
import TradingPanel from "../components/charts/TradingPanel";
import TradingStatsTable from "../components/TradingStatsTable";
import CalendarAnalysis from "../components/Calendaranalysis";
import TradingDualChart from "../components/TradingDualChart";
import TradingSessionsMap from "../components/Tradingsessionsmap";
import TradingNewsTable from "../components/Tradingnewstable ";
import TradingAnalysisPanel from "../components/Tradinganalysispanel ";
import VSComparison from "../components/Vscomparison";
import TradingTable from "../components/trading/TradingTable";

function HomePage() {
  const [showTabale, setShowTabale] = useState<string>("عددی");

  return (
    <div className="w-full max-w-372.5 mx-auto px-4 md:pt-5 ">
      <Navbar />
      <div className="flex flex-col items-center">
        <TradingCover />
        <CardComponent />
      </div>
      <WellcomeComponent />
      <DetailseComponent />
      <InformationAccount />
      <ChallengeGrid />
      <div className="flex flex-col items-center lg:mt-8 w-full mx-auto">
        <ProgressCardsSection />
        <TradingChartsGrid />
      </div>
      <TradingChart />
      <section>
        <ChangeTabale showTabale={showTabale} setShowTabale={setShowTabale} />
        {showTabale === "عددی" ? (
          <>
            <AccountStats />
            <TraderScoreCard />
            <TradingPanel />
          </>
        ) : (
          <TradingStatsTable />
        )}
      </section>
      <div className="w-full grid grid-cols-1">
        <CalendarAnalysis />
        <TradingDualChart />
      </div>
      <TradingSessionsMap />

      <TradingNewsTable />
      <TradingAnalysisPanel />
      <VSComparison />
      <TradingTable />
    </div>
  );
}

export default HomePage;
