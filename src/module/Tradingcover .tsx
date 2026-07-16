import { useTranslation } from "react-i18next";
import cover from "../assets/images/cover.png";
import i18next from "i18next";

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

export default function TradingCover() {
  const { i18n } = useTranslation();

  const langs = i18n.language === "fa" ? "fa" : "en";
  const t = content[langs];

  return (
    <div className="relative mt-2 w-full overflow-hidden rounded-2xl">
      <div className="relative w-full aspect-7/3 sm:aspect-20/8 md:aspect-23/4.5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              i18next.language === "fa"
                ? "radial-gradient(ellipse 55% 65% at 75% 50%, rgba(139,92,246,.14) 0%, transparent 65%)"
                : "radial-gradient(ellipse 55% 65% at 25% 50%, rgba(139,92,246,.14) 0%, transparent 65%)",
          }}
        />

        <div
          className={`relative z-10 flex h-full w-full items-center ${
            i18next.language === "fa" ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <div
            className={`flex flex-1 flex-col gap-2 px-4 py-4 sm:px-6 md:px-8 ${
              i18next.language === "fa" ? "items-start" : "items-start"
            }`}
          >
            <h1 className="font-bold leading-tight tracking-tight text-white">
              <span className="text-sm sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
                {t.titleNormal}
              </span>

              <span className="text-sm text-purple-400 sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
                {" "}
                {t.titleAccent}
              </span>

              <span className="text-sm sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
                {" "}
                {t.titleEnd}
              </span>
            </h1>

            <p className="max-w-full text-[12px] leading-relaxed text-slate-300 sm:max-w-[85%] md:max-w-[75%] md:text-base">
              {t.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
