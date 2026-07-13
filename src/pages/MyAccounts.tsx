import TradingCover from "../module/Tradingcover ";
import CardAccounts from "./CardAccounts";

function MyAccounts() {
  return (
    <div>
      <TradingCover />
      <section className="mt-5">
        <CardAccounts />
      </section>
    </div>
  );
}

export default MyAccounts;
