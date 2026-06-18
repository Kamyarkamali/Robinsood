import { accountTrend } from "../data/fakeData";
import { toPersianDigits } from "../helpers/helperFunc";
import CardShell from "./CardShell";
import logo from "../assets/images/logo.png";
import TrendUpIcon from "../icons/TrendUpIcon";
import TrendDownIcon from "../icons/TrendDownIcon";
import { t } from "i18next";

function AccountTrendCard() {
  return (
    <CardShell
      dir="rtl"
      className="
        relative overflow-hidden
        flex flex-col

        w-full
        max-w-105 sm:max-w-120 lg:max-w-130

        min-h-105 sm:min-h-120 lg:min-h-135

        mx-auto
        rounded-4xl
        border-4 dark:border-[#303030] border-gray-400
        bg-linear-to-br
      "
    >
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

      <div
        className="absolute top-0 right-0 w-24 sm:w-28 h-24 sm:h-32 dark:bg-[#202020]"
        style={{
          clipPath: "path('M112 0 H112 V112 H52 Q0 112 0 60 V0 Z')",
        }}
      />

      <img
        src={logo}
        alt="logo"
        className="absolute top-2 sm:top-3 right-0 w-20 sm:w-24 md:w-28 z-10"
      />

      <div
        className="absolute top-0 right-0 w-24 sm:w-28 h-24 sm:h-28 border-t border-r border-slate-600/40 pointer-events-none"
        style={{
          clipPath: "path('M112 0 H112 V112 H52 Q0 112 0 60 V0 Z')",
        }}
      />

      <div
        className="
          relative z-10
          flex flex-col
          justify-center items-center
          flex-1
          px-4 sm:px-6 lg:px-8
          py-6 sm:py-8
          gap-3 sm:gap-4
          text-center
        "
      >
        <h3 className="dark:text-zinc-200 text-gray-500 text-left font-bold text-sm sm:text-base lg:text-lg w-full">
          {t("cart4.AccountResult")}
        </h3>

        <span
          className="
            inline-block
            text-left
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
          +{toPersianDigits(accountTrend.amount)} $
        </span>

        <p className="dark:text-white/90 text-gray-500 text-right text-xs sm:text-sm lg:text-base w-full">
          ({accountTrend.percentLabel})
        </p>

        <div
          className="
            lg:w-93.5
            w-full
            bg-[#39DC6233]
            border border-emerald-600/40
            dark:text-white/90 text-gray-500
            text-xs sm:text-sm
            rounded-xl
            font-normal
            p-3 sm:p-4
            text-center
          "
        >
          {t("cart4.Yesterday")}={" "}
          {toPersianDigits(accountTrend.balanceStandard)}$
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
