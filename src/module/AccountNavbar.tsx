import { HiOutlineAcademicCap } from "react-icons/hi2";
import AccountPdfButton from "./DownloadPdfButton";
import i18next from "i18next";

const AccountNavbar = () => {
  const lang = i18next.language;

  return (
    <nav
      dir="ltr"
      className="
        sticky top-4 z-50
        mx-auto mb-5
        flex w-full max-w-7xl
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
        className="
          group
          mt-5
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

      <AccountPdfButton />
    </nav>
  );
};

export default AccountNavbar;
