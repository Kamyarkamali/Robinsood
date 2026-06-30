import i18next, { t } from "i18next";
import { disciplineScore } from "../data/fakeData";
import { toPersianDigits } from "../helpers/helperFunc";
import TriangleIcon from "../icons/TriangleIcon";
import CardShell from "./CardShell";

function DisciplineScoreCard() {
  return (
    <CardShell
      dir="ltr"
      className="
      step-test33
        flex flex-col
        items-center
        justify-center
        h-auto
        step-test28
        min-h-65
        sm:min-h-70
        lg:min-h-75
        p-3 sm:p-4
      "
    >
      <h3
        className={`${i18next.language === "fa" ? "text-right" : "text-left"} w-full text-zinc-200 text-sm sm:text-base font-bold mb-6`}
      >
        {t("card7.title")}
      </h3>

      <div className="w-full flex justify-center mt-4 sm:mt-6 mb-6">
        <div className="relative flex items-center justify-center w-full max-w-162.5">
          {disciplineScore.ranges.map((r) => (
            <div className="relative flex-1 flex justify-center" key={r.label}>
              <span
                className={`
                  h-10 sm:h-12 lg:h-13
                  text-[10px] sm:text-xs lg:text-sm
                  flex items-center justify-center
                  font-medium
                  px-2
                  text-white

                  ${
                    r.label === "۸۰ - ۱۰۰٪"
                      ? `
                        rounded-l-none
                        rounded-r-2xl
                        bg-linear-to-l
                        from-[#34C759]
                        to-[#3ADE63]
                      `
                      : r.label === "۳۰ - ۸۰٪"
                        ? `
                          rounded-none
                          bg-linear-to-r
                          from-[#FF8D28]
                          to-[#FFA759]
                        `
                        : `
                          rounded-r-none
                          rounded-l-2xl
                          bg-linear-to-l
                          from-[#FF383C]
                          to-[#CD3538]
                        `
                  }

                  w-full
                `}
              >
                {toPersianDigits(r.label)}
              </span>

              {r.label === "۰ - ۳۰٪" && (
                <div
                  className="
                    absolute
                    left-1/3
                    -translate-x-1/2
                    sm:top-9
                    top-7
                    mt-3

                    w-13
                    h-13
                    md:w-13.25
                    md:h-13.5

                    bg-[#0088FF]
                    text-white
                    rounded-lg

                    flex
                    flex-col
                    items-center
                    justify-center

                    text-[10px]
                    sm:text-[11px]
                    font-semibold
                    leading-tight
                    z-10
                  "
                >
                  <div className="absolute -top-2">
                    <TriangleIcon />
                  </div>

                  <span>{t("card7.title2")}</span>

                  <span>{toPersianDigits(disciplineScore.score)}٪</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className="
          mt-auto
          w-full
          bg-[#223E55]
          rounded-lg
          p-3
          sm:p-2
          text-center
        "
      >
        <p
          className="
            text-white
            sm:text-[10.4px]
            text-[8px]
            text-right
            leading-6
          "
        >
          {t("card7.title3")}
        </p>
      </div>
    </CardShell>
  );
}

export default DisciplineScoreCard;
