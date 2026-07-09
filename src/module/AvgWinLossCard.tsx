import { t } from "i18next";
import { avgWinLoss } from "../data/fakeData";
import CardShell from "./CardShell";
import SplitBar from "./SplitBar";

function AvgWinLossCard() {
  return (
    <CardShell
      className="flex step-test30 flex-col h-full
        border-4 dark:border-[#3C3C3C] border-gray-300"
    >
      <div className="flex flex-col h-full justify-center py-2 sm:py-3 gap-2">
        <h3 className="dark:text-white text-gray-500 text-sm sm:text-base font-normal">
          {t("cart6.win")}
        </h3>

        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          <div className="flex items-center h-full shrink-0">
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
              {avgWinLoss.value}
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center min-w-0">
            <SplitBar
              winColor="#34C759"
              winColorTo="#3ADE63"
              winShadow="#34C759"
              winPercent={avgWinLoss.winPercent}
              lossPercent={avgWinLoss.lossPercent}
            />

            <div className="flex items-center lg:justify-between justify-around gap-2 mt-2">
              <span
                className="
                  text-emerald-400
                  font-medium
                  bg-[#00A65626]
                  px-2
                  py-0.5
                  rounded-lg
                  text-[10px]
                  sm:text-xs
                  whitespace-nowrap
                "
              >
                {avgWinLoss.winLabel}
              </span>

              <span
                className="
                  text-red-400
                  font-medium
                  bg-[#FF383C26]
                  px-2
                  py-0.5
                  rounded-lg
                  text-[10px]
                  sm:text-xs
                  whitespace-nowrap
                "
              >
                {avgWinLoss.lossLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

export default AvgWinLossCard;
