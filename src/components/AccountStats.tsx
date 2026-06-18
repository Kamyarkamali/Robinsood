import { useTranslation } from "react-i18next";
import AccountTrendCard from "../module/AccountTrendCard";
import AvgWinLossCard from "../module/AvgWinLossCard";
import DisciplineScoreCard from "../module/DisciplineScoreCard";
import ProfitFactorCard from "../module/ProfitFactorCard";
import TradeWinCard from "../module/TradeWinCard";
import WeeklyReportPanel from "../module/WeeklyReportPanel";

export default function AccountStats() {
  const { i18n } = useTranslation();

  return (
    <div
      dir={i18n.language === "fa" ? "ltr" : "rtl"}
      className="min-h-screen w-full p-3 sm:p-5 lg:p-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-5 order-3 lg:order-1">
          <ProfitFactorCard />
          <AvgWinLossCard />
          <TradeWinCard />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 order-2 lg:order-2">
          <AccountTrendCard />
          <DisciplineScoreCard />
        </div>
        <div className="order-1 lg:order-3">
          <WeeklyReportPanel />
        </div>
      </div>
    </div>
  );
}
