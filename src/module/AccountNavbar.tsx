import { HiOutlineAcademicCap } from "react-icons/hi2";
import AccountPdfButton from "./DownloadPdfButton";
import i18next from "i18next";
import { createAppTour } from "../components/tour/appTour";
import type { Lang } from "../types/type";
import type { TourScope } from "../components/tour/tourSteps";
import { routes } from "../data/fakeData";
import { useParams } from "react-router-dom";
interface AccountNavbarProps {
  scope: TourScope;
}
const AccountNavbar = ({ scope }: AccountNavbarProps) => {
  const lang = i18next.language;

  const theme: "dark" | "light" = "dark";

  const handleStartTour = () => {
    createAppTour(lang as Lang, theme, scope).drive();
  };

  const { section } = useParams();
  const current = routes.find((route) => route.path === `/account/${section}`);

  return (
    <nav
      dir="ltr"
      className="
        sticky top-0 z-20
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

      <div
        className="flex items-center gap-4  mt-11
          md:mt-0"
      >
        <div className="h-px w-12 bg-white/10" />

        <h1 className="whitespace-nowrap  text-xl font-semibold text-white">
          {i18next.language === "fa" ? current?.title?.fa : current?.title?.en}
        </h1>

        <div className="h-px w-12 bg-white/10" />
      </div>

      <AccountPdfButton />
    </nav>
  );
};

export default AccountNavbar;
