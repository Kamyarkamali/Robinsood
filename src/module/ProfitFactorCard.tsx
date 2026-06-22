import { t } from "i18next";
import { profitFactor } from "../data/fakeData";
import CardShell from "./CardShell";
import FullDonut from "./FullDonut";
import Pill from "./Pill";

function ProfitFactorCard() {
  return (
    <CardShell className="relative flex items-center justify-center h-full rounded-[24.14px] border-4 dark:border-[#303030] border-gray-400">
      <div className="flex flex-col gap-3 items-start justify-between">
        <h3 className="font-normal text-center w-full dark:text-[#ffffff] text-gray-500 text-sm md:text-[24px]">
          {t("cart5.profit")}
        </h3>

        <span
          style={{
            textShadow:
              "0 0 10px rgba(52,199,89,.7), 0 0 25px rgba(52,199,89,.4)",
          }}
          className="
            font-bold
            text-[32px]
            lg:text-[44px]
            lg:text-[40px]
            bg-linear-to-b
            from-[#34C759]
            to-[#3ADE63]
            bg-clip-text
            text-transparent
          "
        >
          {profitFactor.value}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center py-2">
        <div className="relative w-37.5 h-37.5 flex items-center justify-center">
          <FullDonut
            winPercent={profitFactor.winPercent}
            size={150}
            strokeWidth={14}
          />

          <div className="absolute -top-8 -left-10">
            <Pill tone="red">{profitFactor.lossLabel}</Pill>
          </div>

          <div className="absolute -bottom-8 -right-10">
            <Pill tone="green">{profitFactor.winLabel}</Pill>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

export default ProfitFactorCard;
