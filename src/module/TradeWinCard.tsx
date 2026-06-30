import { t } from "i18next";
import { tradeWin } from "../data/fakeData";
import CardShell from "./CardShell";
import Pill from "./Pill";
import QuarterGauge from "./QuarterGauge";

function TradeWinCard() {
  return (
    <CardShell className="flex flex-col step-test31 justify-center h-full">
      <div className="flex items-start justify-between gap-3 sm:gap-6">
        {/* Left */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8">
          <h3 className="dark:text-[#ffffff] text-gray-500 text-sm sm:text-base lg:text-[22px] font-medium">
            {t("card8.title1")}
          </h3>

          <span className="text-zinc-100 text-lg sm:text-4xl lg:text-[48px] font-bold">
            {tradeWin.percent}%
          </span>
        </div>

        <div className="relative flex items-center justify-center flex-1">
          <div className="relative w-[120px] sm:w-[140px] lg:w-[160px]">
            <div className="absolute -top-2 -right-7">
              <Pill tone="green">{tradeWin.winLabel}</Pill>
            </div>

            <div className="absolute -top-2 -left-10">
              <Pill tone="red">{tradeWin.lossLabel}</Pill>
            </div>

            <QuarterGauge percent={tradeWin.percent} />
          </div>
        </div>
      </div>
    </CardShell>
  );
}
export default TradeWinCard;
