import { avgWinLoss } from "../data/fakeData";
import CardShell from "./CardShell";
import SplitBar from "./SplitBar";

function AvgWinLossCard() {
  return (
    <CardShell className="flex flex-col h-full">
      <h3 className="text-zinc-400 text-sm sm:text-base font-medium">
        Avg win -loss
      </h3>

      <div className="flex-1 flex items-center py-3">
        <span className="text-emerald-400 text-4xl sm:text-5xl font-bold tabular-nums">
          {avgWinLoss.value}
        </span>
      </div>

      <div className="flex items-center justify-between mb-2 text-xs sm:text-sm">
        <span className="text-emerald-400 font-medium">
          {avgWinLoss.winLabel}
        </span>
        <span className="text-red-400 font-medium">{avgWinLoss.lossLabel}</span>
      </div>
      <SplitBar
        winPercent={avgWinLoss.winPercent}
        lossPercent={avgWinLoss.lossPercent}
      />
    </CardShell>
  );
}

export default AvgWinLossCard;
