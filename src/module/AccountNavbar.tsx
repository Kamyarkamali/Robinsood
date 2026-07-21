import { HiOutlineAcademicCap } from "react-icons/hi2";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import AccountPdfButton from "./DownloadPdfButton";
import i18next from "i18next";
import { createAppTour } from "../components/tour/appTour";
import type { Lang } from "../types/type";
import type { TourScope } from "../components/tour/tourSteps";

import { useParams, useNavigate } from "react-router-dom";
import { routesData } from "../data/routeData";
import { useEffect, useState } from "react";

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

  const current = routesData[currentIndex];
  const prevRoute = currentIndex > 0 ? routesData[currentIndex - 1] : null;
  const nextRoute =
    currentIndex < routesData.length - 1 ? routesData[currentIndex + 1] : null;

  const handleStartTour = () => {
    createAppTour(lang as Lang, theme, scope).drive();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && prevRoute) {
        handleNavigate(prevRoute.path);
      } else if (e.key === "ArrowRight" && nextRoute) {
        handleNavigate(nextRoute.path);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevRoute, nextRoute]);

  return (
    <nav
      dir="ltr"
      className="
        mx-auto mb-5
        flex w-full max-w-326.5
        items-center justify-between
        rounded-2xl
        md:border md:border-white/15
        md:bg-[#1c1c1c]/70
        md:backdrop-blur-xl
        px-4 py-3
        md:shadow-lg md:shadow-black/20
        sm:px-5
      "
    >
      <button
        onClick={handleStartTour}
        className="
          group
          mt-11
          md:mt-0
          flex items-center gap-2
          rounded-xl
          border border-white/10
          bg-white/10
          backdrop-blur-md
          px-4 py-2.5
          text-sm font-medium
          text-white
          transition-all duration-300
          hover:bg-white/20
          hover:scale-[1.03]
          max-sm:px-3
        "
      >
        <HiOutlineAcademicCap
          className="
            text-xl
            transition-transform
            duration-300
            group-hover:-rotate-12
          "
        />
        <span className="max-sm:hidden">
          {lang === "fa" ? "آموزش" : "Tutorial"}
        </span>
      </button>

      <div className="flex items-center gap-4 mt-11 md:mt-0">
        <div className="relative">
          <button
            onClick={() => prevRoute && handleNavigate(prevRoute.path)}
            disabled={!prevRoute}
            onMouseEnter={() => setIsHoveringPrev(true)}
            onMouseLeave={() => setIsHoveringPrev(false)}
            className={`
              flex items-center justify-center
              w-10 h-10 rounded-full
              transition-all duration-300
              ${
                prevRoute
                  ? "bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
              }
              ${isHoveringPrev && prevRoute ? "scale-110 shadow-[0_0_20px_rgba(139,92,246,0.2)]" : ""}
            `}
            title={lang === "fa" ? "صفحه قبلی" : "Previous"}
          >
            {lang === "fa" ? (
              <HiOutlineChevronLeft className="w-5 h-5" />
            ) : (
              <HiOutlineChevronRight className="w-5 h-5" />
            )}
          </button>

          {prevRoute && isHoveringPrev && (
            <div
              className="
              absolute -top-10 left-1/2 -translate-x-1/2
              bg-black/90 text-white text-xs px-2 py-1 rounded
              whitespace-nowrap
              pointer-events-none
            "
            >
              {lang === "fa" ? prevRoute.title.fa : prevRoute.title.en}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <h1 className="whitespace-nowrap text-xl font-semibold text-white">
            {i18next.language === "fa"
              ? current?.title?.fa
              : current?.title?.en}
          </h1>
        </div>

        <div className="relative">
          <button
            onClick={() => nextRoute && handleNavigate(nextRoute.path)}
            disabled={!nextRoute}
            onMouseEnter={() => setIsHoveringNext(true)}
            onMouseLeave={() => setIsHoveringNext(false)}
            className={`
              flex items-center justify-center
              w-10 h-10 rounded-full
              transition-all duration-300
              ${
                nextRoute
                  ? "bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
              }
              ${isHoveringNext && nextRoute ? "scale-110 shadow-[0_0_20px_rgba(139,92,246,0.2)]" : ""}
            `}
            title={lang === "fa" ? "صفحه بعدی" : "Next"}
          >
            {lang === "fa" ? (
              <HiOutlineChevronRight className="w-5 h-5" />
            ) : (
              <HiOutlineChevronLeft className="w-5 h-5" />
            )}
          </button>

          {nextRoute && isHoveringNext && (
            <div
              className="
              absolute -top-10 left-1/2 -translate-x-1/2
              bg-black/90 text-white text-xs px-2 py-1 rounded
              whitespace-nowrap
              pointer-events-none
            "
            >
              {lang === "fa" ? nextRoute.title.fa : nextRoute.title.en}
            </div>
          )}
        </div>
      </div>

      <AccountPdfButton />
    </nav>
  );
};

export default AccountNavbar;
