import { t } from "i18next";
import { profitFactor } from "../data/fakeData";
import CardShell from "./CardShell";
import FullDonut from "./FullDonut";
import Pill from "./Pill";

function ProfitFactorCard() {
  return (
    <CardShell
      className="relative
         step-test29 flex items-center justify-center h-full rounded-2xl"
    >
      <div className="flex flex-col gap-3 items-start justify-between">
        <h3 className="font-normal text-center w-full dark:text-[#ffffff] text-[#5B657A] text-sm md:text-[20px]">
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

      <div className="flex-1 ml-3 flex items-center justify-center py-2">
        <div className="relative w-37.5 h-37.5 flex items-center justify-center">
          <FullDonut
            winPercent={profitFactor.winPercent}
            size={190}
            strokeWidth={14}
          />

          <div className="absolute top-13 -left-14">
            <Pill tone="red">{profitFactor.lossLabel}</Pill>
          </div>

          <div className="absolute top-10 -right-10">
            <Pill tone="green">{profitFactor.winLabel}</Pill>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

export default ProfitFactorCard;
