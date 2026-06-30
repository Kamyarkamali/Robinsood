import InformationAccount from "../components/InformationAccount";
import ChallengeGrid from "../components/ChallengeGrid";
import TradingChart from "../components/TradingChart";
import TradingAnalysisPanel from "../components/Tradinganalysispanel ";
import VSComparison from "../components/Vscomparison";
import TradingTable from "../components/trading/TradingTable";
import ChangeComponent from "../module/ChangeComponent";
import TodayeInformation from "./TodayeInformation";
import DetailseAccount from "./DetailseAccount";
import NewsComponent from "./NewsComponent";

function HomePage() {
  return (
    <div>
      {/* <WellcomeComponent /> */}
      {/* <DetailseComponent /> */}
      <InformationAccount />
      <ChallengeGrid />
      <TodayeInformation />
      <TradingChart />
      <DetailseAccount />
      <ChangeComponent />
      <NewsComponent />
      <TradingAnalysisPanel />
      <VSComparison />
      <TradingTable />
    </div>
  );
}

export default HomePage;
