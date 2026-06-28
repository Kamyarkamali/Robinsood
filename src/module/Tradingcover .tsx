import { FaRegCalendarAlt } from "react-icons/fa";
import cover from "../assets/images/cover.png";

interface TradingCoverProps {
  lang?: "fa" | "en";
  accountAgeDays?: number;
  tradingDays?: number;
}

const content = {
  fa: {
    titleNormal: "مسیر",
    titleAccent: "حرفه‌ای",
    titleEnd: "تریدها",
    subtitle: "با تحلیل و آنالیز تریدهای خود مسیرت رو حرفه‌ای کن",
    badgeTemplate: (age: number, trading: number) =>
      `شما ${age} روز است که صاحب این حساب هستید\n${trading} روز در آن ترید داشتید.`,
  },
  en: {
    titleNormal: "The",
    titleAccent: "Professional",
    titleEnd: "Trading Path",
    subtitle: "Analyze your trades to master your trading journey",
    badgeTemplate: (age: number, trading: number) =>
      `You've owned this account for ${age} days\nYou traded on ${trading} of those days.`,
  },
};

export default function TradingCover({
  lang = "fa",
  accountAgeDays = 10,
  tradingDays = 8,
}: TradingCoverProps) {
  const t = content[lang];
  const isRTL = lang === "fa";
  const badgeLines = t.badgeTemplate(accountAgeDays, tradingDays).split("\n");

  const highlightNumbers = (text: string) =>
    text.split(/(\d+)/).map((part, i) =>
      /^\d+$/.test(part) ? (
        <span key={i} className="font-bold text-purple-400">
          {part}
        </span>
      ) : (
        part
      ),
    );

  return (
    <div className="relative mt-4 w-full overflow-hidden rounded-2xl">
      <div className="relative w-full aspect-4/3 sm:aspect-16/8 md:aspect-16/4.5">
        <div className="absolute inset-0">
          <img
            src={cover}
            alt="Trading cover"
            className="h-full w-full object-contain md:object-cover"
          />

          <div className="absolute inset-0" />
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isRTL
              ? "radial-gradient(ellipse 55% 65% at 75% 50%, rgba(139,92,246,.14) 0%, transparent 65%)"
              : "radial-gradient(ellipse 55% 65% at 25% 50%, rgba(139,92,246,.14) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 flex h-full w-full items-center">
          <div
            className={`${
              isRTL ? "order-last" : "order-first"
            } w-[35%] sm:w-[32%] md:w-[28%] lg:w-[26%] shrink-0`}
          />

          <div
            className={`flex flex-1 flex-col items-start gap-2 px-4 py-4 sm:px-6 md:px-8 ${
              isRTL ? "items-end text-right" : "items-start text-left"
            }`}
          >
            <h1 className="font-bold leading-tight tracking-tight text-white">
              <span className="text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
                {t.titleNormal}
              </span>

              <span className="text-xl text-purple-400 sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
                {" "}
                {t.titleAccent}
              </span>

              <span className="text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
                {" "}
                {t.titleEnd}
              </span>
            </h1>

            <p className="max-w-full text-sm leading-relaxed text-slate-300 sm:max-w-[85%] md:max-w-[75%] md:text-base">
              {t.subtitle}
            </p>

            {/* <div className="mt-2 flex items-center max-w-full gap-2 rounded-xl bg-white/5 px-3 py-2 backdrop-blur-sm sm:max-w-[80%] md:max-w-[65%]">
              <div className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                {badgeLines.map((line, i) => (
                  <div key={i}>{highlightNumbers(line)}</div>
                ))}
              </div>
              <FaRegCalendarAlt
                size={30}
                className="mt-0.5 h-4 w-4 shrink-0 text-purple-400"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
