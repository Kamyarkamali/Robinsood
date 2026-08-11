import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";
import { BsBarChartFill, BsPeopleFill } from "react-icons/bs";
import { FaExchangeAlt, FaDollarSign } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export default function CartFacke() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const cardStyle = `
    w-full
    h-[180px]
    rounded-3xl
    border-[#D6DCE8]
    border dark:border-white/10
    bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030]
    backdrop-blur-xl
    flex flex-col
    justify-center
    items-center
    text-center
    px-4 py-4
    transition-all
    duration-300
    hover:-translate-y-1
  `;

  const positiveBadge = `
    flex items-center gap-1
    px-2.5 py-1
    rounded-full
    bg-[#16C784]/15
    border border-[#16C784]/30
    text-[#2FE38A]
    text-[11px] sm:text-xs
    font-semibold
  `;

  const negativeBadge = `
    flex items-center gap-1
    px-2.5 py-1
    rounded-full
    bg-[#EA3943]/15
    border border-[#EA3943]/30
    text-[#FF5B6B]
    text-[11px] sm:text-xs
    font-semibold
  `;

  const titleClass = "text-[11px] sm:text-xs text-zinc-400 font-medium mt-2";

  const valueClass =
    "text-2xl sm:text-3xl font-bold dark:text-white text-[#5B657A] tabular-nums mt-2";

  return (
    <>
      <h1 className="text-center text-[#5B657A] dark:text-white font-black text-sm md:text-lg">
        {i18next.language === "fa"
          ? "آمار کاربران رابین  سون"
          : "Robinhood Users Stats"}
      </h1>
      <div id="comp4" dir={isRtl ? "rtl" : "ltr"}>
        <div
          className="
          rounded-2xl
    border-[#D6DCE8]
          backdrop-blur-xl
          p-3 sm:p-5 lg:p-6
        "
        >
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-5
            gap-3 sm:gap-4
          "
          >
            {/* Card 1 */}
            <div className={cardStyle}>
              <BsBarChartFill size={26} className="text-indigo-400" />
              <h2 className={valueClass}>18.420</h2>
              <p className={titleClass}>
                {isRtl ? "تعداد معاملات باز" : "Total Trades"}
              </p>
              <div className="mt-3">
                <div className={positiveBadge}>
                  <HiArrowTrendingUp />
                  32% +
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className={cardStyle}>
              <FaExchangeAlt size={26} className="text-cyan-400" />

              <div className="w-full mt-3 space-y-3">
                <div>
                  <div className="flex justify-between text-[11px] sm:text-xs text-white mb-1">
                    <span>{isRtl ? "خرید" : "Buy"}</span>
                    <span className="text-[#2FE38A] font-bold">58%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-[#16C784]"
                      style={{ width: "58%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] sm:text-xs text-white mb-1">
                    <span>{isRtl ? "فروش" : "Sell"}</span>
                    <span className="text-[#FF5B6B] font-bold">42%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-[#EA3943]"
                      style={{ width: "42%" }}
                    />
                  </div>
                </div>
              </div>

              <p className={titleClass}>
                {isRtl ? "درصد معاملات باز" : "Open Trades"}
              </p>
            </div>

            {/* Card 3 */}
            <div className={cardStyle}>
              <HiArrowTrendingUp size={26} className="text-[#16C784]" />

              <h2
                className="
                text-2xl sm:text-3xl font-bold mt-2
                text-transparent bg-gradient-to-r from-[#16C784] to-emerald-300 bg-clip-text
              "
              >
                13.1% $ +
              </h2>

              <p className={titleClass}>
                {isRtl ? "میانگین سود/ضرر" : "Average Live P/L"}
              </p>

              <div className="mt-3">
                <div className={positiveBadge}>
                  <HiArrowTrendingUp />
                  20% +
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className={cardStyle}>
              <FaDollarSign size={26} className="text-yellow-400" />

              <h2 className={valueClass}>$360</h2>

              <p className={titleClass}>
                {isRtl ? "میانگین حجم" : "Average Volume"}
              </p>

              <div className="mt-3">
                <div className={positiveBadge}>
                  <HiArrowTrendingUp />
                  20% +
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className={cardStyle}>
              <BsPeopleFill size={26} className="text-pink-400" />

              <h2 className={valueClass}>53%</h2>

              <p className={titleClass}>
                {isRtl ? "کاربران در سود" : "Users in Profit"}
              </p>

              <div className="mt-3">
                <div className={negativeBadge}>
                  <HiArrowTrendingDown />
                  27.2% -
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
