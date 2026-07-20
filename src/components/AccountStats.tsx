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
      className="w-full p-3 sm:p-5 lg:p-6"
    >
      <div className="max-w-8xl step-test23 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 ">
        <div
          id="detailse7"
          className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-5 order-3 lg:order-1"
        >
          <section id="detailse8">
            <ProfitFactorCard />
          </section>

          <section id="detailse9">
            <AvgWinLossCard />
          </section>
          <section id="detailse10">
            <TradeWinCard />
          </section>
        </div>

        <div
          id="detailse11"
          className="grid grid-cols-1 gap-4 sm:gap-5 order-2 lg:order-2"
        >
          <section id="detailse12">
            <AccountTrendCard />
          </section>
          <section id="detailse13">
            <DisciplineScoreCard />
          </section>
        </div>
        <div id="detailse4" className="order-1 lg:order-3">
          <WeeklyReportPanel />
        </div>
      </div>
    </div>
  );
}
