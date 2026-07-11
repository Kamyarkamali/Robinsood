import ChallengeGrid from "../components/ChallengeGrid";
import InformationAccount from "../components/InformationAccount";
import TradingTable from "../components/trading/TradingTable";
import TradingAnalysisPanel from "../components/Tradinganalysispanel ";
import TradingChart from "../components/TradingChart";
import VSComparison from "../components/Vscomparison";
import ChangeComponent from "../module/ChangeComponent";
import DetailseAccount from "./DetailseAccount";
import NewsComponent from "./NewsComponent";
import TodayeInformation from "./TodayeInformation";

function Dashboard() {
  return (
    <div>
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

export default Dashboard;
