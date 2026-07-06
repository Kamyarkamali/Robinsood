import { accountTrend } from "../data/fakeData";
import { toPersianDigits } from "../helpers/helperFunc";
import CardShell from "./CardShell";
import TrendUpIcon from "../icons/TrendUpIcon";
import TrendDownIcon from "../icons/TrendDownIcon";
import { t } from "i18next";

function AccountTrendCard() {
  return (
    <CardShell
      dir="rtl"
      className="
      step-test32
        relative overflow-hidden
        flex flex-col
        border-4
        dark:border-[#3C3C3C]
        border-gray-300
        w-full
        max-w-105 sm:max-w-120 lg:max-w-130

        min-h-fit sm:min-h-fit lg:min-h-fit

        mx-auto
        rounded-4xl
       
        bg-linear-to-br
      "
    >
      <div
        className="
           z-10
          flex flex-col
          justify-center items-center
          px-4 sm:px-6 lg:px-8
          py-6
          gap-3
          text-center
        "
      >
        <h3 className="dark:text-zinc-200 text-center text-gray-500 font-bold text-sm sm:text-base lg:text-lg w-full">
          {t("cart4.AccountResult")}
        </h3>

        <p
          className="
            inline-block
            text-center
            w-full
            font-extrabold tabular-nums

            text-[32px] sm:text-[44px] lg:text-[60px]

            bg-linear-to-b
            from-[#34C759]
            to-[#3ADE63]
            bg-clip-text
            text-transparent
          "
          style={{
            textShadow:
              "0 0 10px rgba(52,199,89,.7), 0 0 25px rgba(52,199,89,.4)",
          }}
        >
          $ {toPersianDigits(accountTrend.amount)} +
        </p>

        <p className="dark:text-white/90 text-gray-500 text-center text-xs sm:text-sm lg:text-base w-full">
          ({accountTrend.percentLabel})
        </p>

        <div
          className="
            lg:w-93.5
            w-full
            bg-linear-to-l
            to-[#37dd6133]
            from-[#47d96c88]
            
            dark:text-white text-gray-500
            text-xs sm:text-sm
            rounded-xl
            font-normal
            p-3 sm:p-4
            text-center

          "
        >
          {t("cart4.Yesterday")}= ${" "}
          {toPersianDigits(accountTrend.balanceStandard)}
        </div>

        <div
          className="
            w-full
            flex items-center justify-center
            gap-2 sm:gap-3

            bg-[#2D4332]
            text-[#34C759]
            text-xs sm:text-sm
            font-semibold

            rounded-xl
            border border-[#3D5B45]
            p-3 sm:p-4
          "
        >
          <TrendUpIcon size={18} />
          {toPersianDigits(accountTrend.vsYesterdayPercent)}٪{" "}
          {t("cart4.Yesterday")}
        </div>

        <div
          className="
            w-full
            flex items-center justify-center
            gap-2 sm:gap-3

            bg-red-600/20
            text-[#FF383C]
            text-xs sm:text-sm
            font-semibold

            rounded-xl
            border border-red-600
            p-3 sm:p-4
          "
        >
          <TrendDownIcon size={18} />
          {toPersianDigits(Math.abs(accountTrend.vsLastTradePercent))}٪{" "}
          {t("cart4.LastTrade")}
        </div>
      </div>
    </CardShell>
  );
}

export default AccountTrendCard;
