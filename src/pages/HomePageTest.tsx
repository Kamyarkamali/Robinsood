import TradingChart from "../components/TradingChart";
import TradingAnalysisPanel from "../components/Tradinganalysispanel ";
import VSComparison from "../components/Vscomparison";
import TradingTable from "../components/trading/TradingTable";
import ChangeComponent from "../module/ChangeComponent";
import TodayeInformation from "./TodayeInformation";
import DetailseAccount from "./DetailseAccount";
import NewsComponent from "./NewsComponent";
import InformationAccount from "./AccountSections/InformationAccount";
import ChallengeGrid from "./AccountSections/ChallengeGrid";

function HomePageTest() {
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

export default HomePageTest;
