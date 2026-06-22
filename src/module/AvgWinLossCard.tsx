import { t } from "i18next";
import { avgWinLoss } from "../data/fakeData";
import CardShell from "./CardShell";
import SplitBar from "./SplitBar";

function AvgWinLossCard() {
  return (
    <CardShell className="flex flex-col h-full">
      <h3 className="dark:text-white text-gray-500 text-sm sm:text-base font-normal">
        {t("cart6.win")}
      </h3>

      <div className="flex-1 flex items-center py-3">
        <span
          style={{
            textShadow:
              "0 0 10px rgba(52,199,89,.7), 0 0 25px rgba(52,199,89,.4)",
          }}
          className="text-emerald-400 bg-linear-to-b
            from-[#34C759]
            to-[#3ADE63]
            bg-clip-text text-4xl lg:text-5xl font-bold"
        >
          {avgWinLoss.value}
        </span>
      </div>

      <div className="flex items-center justify-between mb-2 text-xs sm:text-sm">
        <span className="text-emerald-400 font-medium bg-[#00A65626] px-2 py-1 rounded-lg">
          {avgWinLoss.winLabel}
        </span>
        <span className="text-red-400 font-medium bg-[#FF383C26] px-2 py-1 rounded-lg">
          {avgWinLoss.lossLabel}
        </span>
      </div>
      <SplitBar
        winColor="#34C759"
        winColorTo="#3ADE63"
        winShadow="#34C759"
        winPercent={avgWinLoss.winPercent}
        lossPercent={avgWinLoss.lossPercent}
      />
    </CardShell>
  );
}

export default AvgWinLossCard;
