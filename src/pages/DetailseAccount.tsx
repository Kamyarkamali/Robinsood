import { useState } from "react";
import ChangeTabale from "../module/ChangeTabale";
import AccountStats from "../components/AccountStats";
import TraderScoreCard from "../components/TraderScoreCard";
import TradingStatsTable from "../components/TradingStatsTable";
import TradingPanel from "../components/charts/TradingPanel";

function DetailseAccount() {
  const [showTabale, setShowTabale] = useState<string>("عددی");
  return (
    <section>
      <ChangeTabale showTabale={showTabale} setShowTabale={setShowTabale} />
      {showTabale === "عددی" ? (
        <>
          <AccountStats />
          <TraderScoreCard />
          <TradingPanel />
        </>
      ) : (
        <section>
          <TradingStatsTable />
        </section>
      )}
    </section>
  );
}

export default DetailseAccount;
