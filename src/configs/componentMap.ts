import TradingTable from "../components/trading/TradingTable";
import TradingAnalysisPanel from "../components/Tradinganalysispanel ";
import TradingChart from "../components/TradingChart";
import VSComparison from "../components/Vscomparison";
import ChangeComponent from "../module/ChangeComponent";
import ChallengeGrid from "../pages/AccountSections/ChallengeGrid";
import InformationAccount from "../pages/AccountSections/InformationAccount";
import DetailseAccount from "../pages/DetailseAccount";
import NewsComponent from "../pages/NewsComponent";
import TodayeInformation from "../pages/TodayeInformation";

export const componentMap = {
  "challenge-info": InformationAccount,
  "today-parameters": ChallengeGrid,
  "evaluation-parameters": TodayeInformation,
  "drawdown-chart": TradingChart,
  "account-statistics": DetailseAccount,
  "calendar-analysis": ChangeComponent,
  "news-status": NewsComponent,
  "ai-trading": TradingAnalysisPanel,
  comparison: VSComparison,
  trades: TradingTable,
};
