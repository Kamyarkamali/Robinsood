import i18next from "i18next";
import { useTranslation } from "react-i18next";

function TrendUpIcon() {
  return <span>▲</span>;
}

function TrendDownIcon() {
  return <span>▲</span>;
}

export default function CartFacke() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const cardStyle = `
    min-w-0
    rounded-2xl
    p-3 sm:p-4
    h-[130px] sm:h-[145px]
    transition-all duration-300
    dark:bg-[#363636]
    overflow-hidden
    w-full
  `;

  const positiveBadge = `
    flex items-center gap-1
    px-2 py-1
    rounded-full
    bg-green-500/10
    border border-green-500/20
    text-green-400
    text-[8px] sm:text-[10px]
    font-semibold
    whitespace-nowrap
    shrink-0
  `;

  const negativeBadge = `
    flex items-center gap-1
    px-2 py-1
    rounded-full
    bg-red-500/10
    border border-red-500/20
    text-red-400
    text-[8px] sm:text-[10px]
    font-semibold
    whitespace-nowrap
    shrink-0
  `;

  const titleClass =
    "text-[10px] sm:text-xs text-center dark:text-white leading-5";

  const valueClass =
    "text-lg sm:text-2xl xl:text-[28px] font-bold text-white tabular-nums leading-none";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="w-full px-3 py-4 md:px-4">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-3
        "
      >
        {/* Card 1 */}
        <div className="flex flex-col items-center gap-2">
          <div className={cardStyle}>
            <div className="h-full flex items-center justify-between gap-2">
              <div className={positiveBadge}>
                <TrendUpIcon />
                +32%
              </div>

              <h2 className={valueClass}>18/420</h2>
            </div>
          </div>

          <p className={titleClass}>
            {isRtl ? "تعداد معاملات باز" : "Total Trades"}
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center gap-2">
          <div className={cardStyle}>
            <div className="h-full flex items-center justify-between gap-2">
              <div className="space-y-2">
                <p className="text-[9px] sm:text-xs dark:text-white">
                  {isRtl ? "خرید" : "Buy"}
                </p>

                <p className="text-[9px] sm:text-xs dark:text-white">
                  {isRtl ? "فروش" : "Sell"}
                </p>
              </div>

              <div className="flex flex-col gap-1 text-right">
                <h2 className="text-lg sm:text-2xl font-bold text-green-400 tabular-nums">
                  58%
                </h2>

                <h2 className="text-lg sm:text-2xl font-bold text-red-400 tabular-nums">
                  42%
                </h2>
              </div>
            </div>
          </div>

          <p className={titleClass}>
            {isRtl ? "درصد معاملات باز" : "Open Trades Percentage"}
          </p>
        </div>

        {/* Card 3 */}
        <div
          dir={i18next.language === "fa" ? "ltr" : "rtl"}
          className="flex flex-col items-center gap-2"
        >
          <div className={cardStyle}>
            <div className="h-full flex items-center justify-between gap-2">
              <h2 className={valueClass}>+13.1%</h2>

              <div className={positiveBadge}>
                <TrendUpIcon />
                +20%
              </div>
            </div>
          </div>

          <p className={titleClass}>
            {isRtl ? "میانگین سود/ضرر لحظه‌ای کل کاربران" : "Average Live P/L"}
          </p>
        </div>

        {/* Card 4 */}
        <div
          dir={i18next.language === "fa" ? "ltr" : "rtl"}
          className="flex flex-col items-center gap-2"
        >
          <div className={cardStyle}>
            <div className="h-full flex items-center justify-between gap-2">
              <h2 className={valueClass}>$360</h2>

              <div className={positiveBadge}>
                <TrendUpIcon />
                +20%
              </div>
            </div>
          </div>

          <p className={titleClass}>
            {isRtl ? "میانگین حجم ولات" : "Average Volume"}
          </p>
        </div>

        {/* Card 5 */}
        <div
          dir={i18next.language === "fa" ? "ltr" : "rtl"}
          className="flex flex-col items-center gap-2"
        >
          <div className={cardStyle}>
            <div className="h-full flex items-center justify-between gap-2">
              <h2 className={valueClass}>53%</h2>

              <div className={negativeBadge}>
                <TrendDownIcon />
                -27.2
              </div>
            </div>
          </div>

          <p className={titleClass}>
            {isRtl ? "درصد کاربران در سود لحظه‌ای" : "Users in Profit"}
          </p>
        </div>
      </div>
    </div>
  );
}
