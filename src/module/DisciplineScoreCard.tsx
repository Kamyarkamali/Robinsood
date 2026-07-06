import i18next from "i18next";
import { t } from "i18next";
import { disciplineScore } from "../data/fakeData";
import { toPersianDigits } from "../helpers/helperFunc";
import TriangleIcon from "../icons/TriangleIcon";
import CardShell from "./CardShell";

function DisciplineScoreCard() {
  const score = disciplineScore.score;

  const getWidth = (min: number, max: number) => {
    return `${max - min}%`;
  };

  const getPointerPosition = (score: number) => {
    return `${score}%`;
  };

  return (
    <CardShell
      dir="ltr"
      className="
        flex flex-col
        items-center
        justify-center
        h-auto
        min-h-65
        sm:min-h-70
        lg:min-h-75
        p-3 sm:p-4
        border-4
        dark:border-[#3C3C3C]
        border-gray-300
      "
    >
      <h3
        className={`${
          i18next.language === "fa" ? "text-right" : "text-left"
        } w-full text-zinc-200 text-sm sm:text-base font-bold mb-6`}
      >
        {t("card7.title")}
      </h3>

      {/* BAR */}
      <div className="w-full flex justify-center mt-4 sm:mt-6 mb-6">
        <div className="relative flex items-center w-full max-w-162.5">
          {disciplineScore.ranges.map((r) => (
            <div
              key={r.label}
              className="relative flex justify-center"
              style={{
                width: getWidth(r.min, r.max),
              }}
            >
              <span
                className={`
                  h-10 sm:h-12 lg:h-13
                  w-full
                  flex items-center justify-center
                  text-[10px] sm:text-xs lg:text-sm
                  font-medium
                  text-white
                  px-2

                  ${
                    r.color === "green"
                      ? "rounded-r-2xl bg-linear-to-l from-[#34C759] to-[#3ADE63]"
                      : r.color === "orange"
                        ? "bg-linear-to-r from-[#FF8D28] to-[#FFA759]"
                        : "rounded-l-2xl bg-linear-to-l from-[#FF383C] to-[#CD3538]"
                  }
                `}
              >
                {toPersianDigits(r.label)}
              </span>
            </div>
          ))}

          <div
            className="absolute -bottom-12 left-0 right-12/12 transition-all duration-300"
            style={{
              left: getPointerPosition(score),
              transform: "translateX(-50%)",
            }}
          >
            <div className="w-12 h-12 bg-[#0088FF] text-white rounded-lg flex flex-col items-center justify-center text-[10px] font-semibold relative">
              <div className="absolute -top-2">
                <TriangleIcon />
              </div>

              <span>{t("card7.title2")}</span>
              <span>{toPersianDigits(score)}٪</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto w-full bg-[#223E55] rounded-lg p-3 text-center">
        <p className="text-white text-[8px] sm:text-[10px] leading-6 text-right">
          {t("card7.title3")}
        </p>
      </div>
    </CardShell>
  );
}

export default DisciplineScoreCard;
