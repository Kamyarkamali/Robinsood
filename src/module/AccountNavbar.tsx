import { HiOutlineAcademicCap } from "react-icons/hi2";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import AccountPdfButton from "./DownloadPdfButton";
import i18next from "i18next";
import { createAppTour } from "../components/tour/appTour";
import type { Lang } from "../types/type";
import type { TourScope } from "../components/tour/tourSteps";
import { useParams, useNavigate } from "react-router-dom";
import { routesData } from "../data/routeData";
import { useState, useMemo } from "react";

interface AccountNavbarProps {
  scope: TourScope;
}

const AccountNavbar = ({ scope }: AccountNavbarProps) => {
  const lang = i18next.language;
  const navigate = useNavigate();
  const { section } = useParams();

  const [isHoveringPrev, setIsHoveringPrev] = useState(false);
  const [isHoveringNext, setIsHoveringNext] = useState(false);

  const theme: "dark" | "light" = "dark";

  const currentIndex = routesData.findIndex(
    (route) => route.path === `/account/${section}`,
  );

  const current = currentIndex >= 0 ? routesData[currentIndex] : null;

  const prevRoute = currentIndex > 0 ? routesData[currentIndex - 1] : null;
  const nextRoute =
    currentIndex >= 0 && currentIndex < routesData.length - 1
      ? routesData[currentIndex + 1]
      : null;

  const displayTitle = useMemo(() => {
    if (!current) return "";

    if (
      section === "compare" ||
      section === "comparison" ||
      section === "compare-users"
    ) {
      return lang === "fa" ? "مقایسه با سایرین" : "Compare with others";
    }

    return lang === "fa" ? current.title.fa : current.title.en;
  }, [current, lang, section]);

  const handleStartTour = () => {
    // @ts-ignore
    createAppTour(lang as Lang, theme, scope).drive();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <nav
      className="
      flex 
      items-center 
      justify-between 
      pt-4 
      p-2 sm:p-3 md:p-4 lg:p-5
      rounded-xl sm:rounded-2xl md:rounded-3xl
      md:border-2 
      border-[#EDF1F5] 
      dark:border-[#353535]
      flex-wrap 
      gap-2 sm:gap-3 md:gap-4
      w-full
    "
    >
      <button
        type="button"
        onClick={handleStartTour}
        className="
          group
          mt-11
          md:mt-0
          flex items-center gap-2
          cursor-pointer
          rounded-xl
          border border-white/10
          dark:bg-white/10
          bg-[#7C5CFA]
          backdrop-blur-md
          px-3 sm:px-4 py-2 sm:py-2.5
          text-xs sm:text-sm font-medium
          text-white
          transition-all duration-300
          hover:scale-[1.03]
          max-sm:px-3
        "
      >
        <HiOutlineAcademicCap className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:block">
          {lang === "fa" ? "آموزش" : "Tutorial"}
        </span>
      </button>

      <div className="flex-1 flex items-center justify-center md:ml-22 gap-2 sm:gap-3 md:gap-4 mt-11 md:mt-0">
        <div className="relative">
          <button
            type="button"
            disabled={!prevRoute}
            onClick={() => {
              if (prevRoute) {
                handleNavigate(prevRoute.path);
              }
            }}
            onMouseEnter={() => {
              if (prevRoute) {
                setIsHoveringPrev(true);
              }
            }}
            onMouseLeave={() => {
              setIsHoveringPrev(false);
            }}
            className={`
              flex items-center justify-center
              w-8 sm:w-9 md:w-10
              h-8 sm:h-9 md:h-10
              rounded-full
              transition-all duration-300

              ${
                prevRoute
                  ? `
                    bg-[#EEF1F7]
                    dark:bg-white/10
                    hover:bg-white/20
                    cursor-pointer
                    hover:scale-110
                    hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]
                  `
                  : `
                    bg-[#EEF1F7]/40
                    dark:bg-white/5
                    opacity-40
                    cursor-not-allowed
                  `
              }
            `}
          >
            {lang === "fa" ? (
              <HiOutlineChevronRight
                className="
                  w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5
                  text-[#1F2430]
                  dark:text-white
                "
              />
            ) : (
              <HiOutlineChevronLeft
                className="
                  w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5
                  text-[#1F2430]
                  dark:text-white
                "
              />
            )}
          </button>

          {prevRoute && isHoveringPrev && (
            <div
              className="
                absolute
                bottom-full
                left-1/2
                -translate-x-1/2
                mb-2
                z-50
                px-2 sm:px-3
                py-1 sm:py-1.5
                rounded-lg
                bg-[#1F2430]
                dark:bg-white
                text-white
                dark:text-[#1F2430]
                text-[10px] sm:text-xs
                whitespace-nowrap
                shadow-lg
                pointer-events-none
                animate-in
                fade-in
                zoom-in-95
                duration-150
              "
            >
              {lang === "fa" ? prevRoute.title.fa : prevRoute.title.en}
              <span
                className="
                  absolute
                  top-full
                  left-1/2
                  -translate-x-1/2
                  border-[5px]
                  border-transparent
                  border-t-[#1F2430]
                  dark:border-t-white
                "
              />
            </div>
          )}
        </div>

        <h1
          className="
            whitespace-nowrap
            text-xs sm:text-sm md:text-lg lg:text-xl
            font-normal sm:font-medium md:font-semibold
            font-lahzeh
            text-[#1F2430]
            dark:text-white
          "
        >
          {displayTitle}
        </h1>

        <div className="relative">
          <button
            type="button"
            disabled={!nextRoute}
            onClick={() => {
              if (nextRoute) {
                handleNavigate(nextRoute.path);
              }
            }}
            onMouseEnter={() => {
              if (nextRoute) {
                setIsHoveringNext(true);
              }
            }}
            onMouseLeave={() => {
              setIsHoveringNext(false);
            }}
            className={`
              flex items-center justify-center
              w-8 sm:w-9 md:w-10
              h-8 sm:h-9 md:h-10
              rounded-full
              transition-all duration-300

              ${
                nextRoute
                  ? `
                    bg-[#EEF1F7]
                    dark:bg-white/10
                    hover:bg-white/20
                    cursor-pointer
                    hover:scale-110
                    hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]
                  `
                  : `
                    bg-[#EEF1F7]/40
                    dark:bg-white/5
                    opacity-40
                    cursor-not-allowed
                  `
              }
            `}
          >
            {lang === "fa" ? (
              <HiOutlineChevronLeft
                className="
                  w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5
                  text-[#1F2430]
                  dark:text-white
                "
              />
            ) : (
              <HiOutlineChevronRight
                className="
                  w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5
                  text-[#1F2430]
                  dark:text-white
                "
              />
            )}
          </button>

          {nextRoute && isHoveringNext && (
            <div
              className="
                absolute
                bottom-full
                left-1/2
                -translate-x-1/2
                mb-2
                z-50
                px-2 sm:px-3
                py-1 sm:py-1.5
                rounded-lg
                bg-[#1F2430]
                dark:bg-white
                text-white
                dark:text-[#1F2430]
                text-[10px] sm:text-xs
                whitespace-nowrap
                shadow-lg
                pointer-events-none
                animate-in
                fade-in
                zoom-in-95
                duration-150
              "
            >
              {lang === "fa" ? nextRoute.title.fa : nextRoute.title.en}
              <span
                className="
                  absolute
                  top-full
                  left-1/2
                  -translate-x-1/2
                  border-[5px]
                  border-transparent
                  border-t-[#1F2430]
                  dark:border-t-white
                "
              />
            </div>
          )}
        </div>
      </div>

      <AccountPdfButton />
    </nav>
  );
};

export default AccountNavbar;
