import { useTranslation } from "react-i18next";
import { cards } from "../../data/fakeData";
import { type FC } from "react";
import type { ComponentState } from "../../types/interfaces";
import { Link } from "react-router-dom";

const DashboardCards: FC<ComponentState> = ({ activeComponent }) => {
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";

  return (
    <section
      dir={isFa ? "rtl" : "ltr"}
      className="
        w-full
        mt-3
        rounded-2xl sm:rounded-[30px]
        p-4 sm:p-5 md:p-6
      "
    >
      <div
        dir={isFa ? "ltr" : "rtl"}
        className={`flex flex-col gap-1 mb-3 ${
          isFa ? "items-end" : "items-start"
        }`}
      >
        <p
          className={`${isFa ? "text-right" : "text-left"} w-full text-md sm:text-xl dark:text-white font-bold`}
        >
          {isFa ? "دسته بندی ها" : "Categories"}
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-8
          gap-3 md:gap-4
        "
      >
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              to={`/account/${item.slug}`}
              // onClick={() => setActiveComponent(item?.components)}
              key={item.id}
              className={`
                ${
                  activeComponent === item?.components
                    ? "border border-dashed border-violet-500/70"
                    : "border border-zinc-700/70"
                }
                group
                relative
                overflow-hidden
                w-full
                cursor-pointer
                min-h-45
                sm:min-h-47.5
                md:min-h-52.5
                lg:min-h-55
                rounded-[20px] sm:rounded-2xl
                transition-all
                duration-300
                hover:-translate-y-1
                
                dark:bg-linear-to-b
               dark: from-[#363636]
               dark: via-[#2D2D2D]
               dark: to-[#242424]
                shadow-[0_8px_30px_rgba(0,0,0,0.35)]
              `}
            >
              <div className="absolute inset-0 bg-linear-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

              <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                <div
                  className={`
                    mb-4
                    flex
                    h-12 w-12
                    sm:h-14 sm:w-14
                    md:h-16 md:w-16
                    items-center justify-center
                    rounded-2xl
                    bg-black/20
                    ${item.color}
                  `}
                >
                  <Icon
                    strokeWidth={1.8}
                    className="
                      h-7 w-7
                      sm:h-8 sm:w-8
                      md:h-10 md:w-10
                      transition-all
                      duration-300
                      group-hover:scale-110
                      drop-shadow-[0_0_12px_currentColor]
                    "
                  />
                </div>

                <h3
                  className="
                    text-xs
                    sm:text-sm
                    md:text-[15px]
                    font-medium
                    dark:text-white
                    mb-2
                    leading-6
                  "
                >
                  {isFa ? item.fa : item.en}
                </h3>

                <p
                  className="
                    text-[10px]
                    sm:text-xs
                   dark:text-zinc-400
                    leading-5
                  "
                >
                  {isFa ? item.descFa : item.descEn}
                </p>
              </div>

              <span
                className={`
                  absolute
                  bottom-4
                  left-1/2
                  -translate-x-1/2
                  h-0.75
                  w-10 sm:w-12
                  rounded-full
                  ${item.line}
                `}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardCards;
