import { t } from "i18next";
import { tradeWin } from "../data/fakeData";
import CardShell from "./CardShell";
import Pill from "./Pill";
import QuarterGauge from "./QuarterGauge";

function TradeWinCard() {
  return (
    <CardShell className="flex flex-col justify-center h-full">
      <div className="flex items-start justify-between">
        <div className="flex flex-col items-center gap-8">
          <h3 className="dark:text-[#ffffff] text-gray-500 text-sm sm:text-base lg:text-[22px] font-medium">
            {t("card8.title1")}
          </h3>
          <span className="text-zinc-100 text-3xl sm:text-4xl lg:text-[48px] font-bold">
            {tradeWin.percent}%
          </span>
        </div>
        <div className="flex flex-col relative items-end justify-center flex-1 gap-1 py-1 mr-1">
          <div className="absolute top-0 left-4">
            <Pill tone="red">{tradeWin.lossLabel}</Pill>
          </div>
          <div className="absolute top-0 -right-5">
            <Pill tone="green">{tradeWin.winLabel}</Pill>
          </div>
          <QuarterGauge percent={tradeWin.percent} />
        </div>
      </div>
    </CardShell>
  );
}

export default TradeWinCard;
