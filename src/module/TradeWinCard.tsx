import { tradeWin } from "../data/fakeData";
import CardShell from "./CardShell";
import Pill from "./Pill";
import QuarterGauge from "./QuarterGauge";

function TradeWinCard() {
  return (
    <CardShell className="flex flex-col h-full">
      <div className="flex items-start justify-between">
        <h3 className="text-zinc-400 text-sm sm:text-base font-medium">
          Trade Win
        </h3>
        <Pill tone="green">{tradeWin.winLabel}</Pill>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 gap-1 relative py-1">
        <Pill tone="red">{tradeWin.lossLabel}</Pill>
        <QuarterGauge percent={tradeWin.percent} />
        <span className="text-zinc-100 text-3xl sm:text-4xl font-bold -mt-6 tabular-nums">
          {tradeWin.percent}%
        </span>
      </div>
    </CardShell>
  );
}

export default TradeWinCard;
