import { t } from "i18next";
import { tradeWin } from "../data/fakeData";
import CardShell from "./CardShell";
import Pill from "./Pill";
import QuarterGauge from "./QuarterGauge";

function TradeWinCard() {
  return (
    <CardShell
      className="flex flex-col  dark:border-4 border-2 dark:border-[#3C3C3C] border-[#D6DCE8] 
         step-test31 justify-center h-full"
    >
      <div className="flex items-start justify-between gap-3 sm:gap-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8">
          <h3 className="dark:text-[#ffffff] text-[#5B657A] text-sm sm:text-sm lg:text-[17px] font-medium">
            {t("card8.title1")}
          </h3>

          <span
            style={{
              textShadow:
                "0 0 10px rgba(52,199,89,.7), 0 0 25px rgba(52,199,89,.4)",
            }}
            className="
                text-green-500
                 bg-linear-to-b
               from-[#34C759]
              to-[#3ADE63]
                bg-clip-text
                text-xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                whitespace-nowrap
              "
          >
            {tradeWin.percent}%
          </span>
        </div>

        <div className="relative flex items-center justify-center flex-1">
          <div className="relative w-30 sm:w-35 lg:w-[160px]">
            <div className="absolute -top-2 -right-3">
              <Pill tone="red">{tradeWin.lossLabel}</Pill>
            </div>

            <div className="absolute -top-2 -left-5">
              <Pill tone="green">{tradeWin.winLabel}</Pill>
            </div>

            <QuarterGauge percent={tradeWin.percent} />
          </div>
        </div>
      </div>
    </CardShell>
  );
}
export default TradeWinCard;
