import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./common/LanguageSwitcher";
import ThemeToggle from "./common/ThemeToggle";
import Button from "./ui/Button";
import ArrowIcon from "../icons/ArrowIcon";
import { FiMenu } from "react-icons/fi";
import HamburgerMenu from "./HamburgerMenu";
import UserMenu from "../module/UserMenu";

function Navbar() {
  const [menu, setMenu] = useState(false);

  const { i18n } = useTranslation();

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <UserMenu />
      <div className="pt-4 flex items-center justify-between">
        <section className="flex items-center gap-1 lg:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </section>

        {/* desktop button */}
        <section className="hidden lg:block">
          <Button
            href="#"
            className="cursor-pointer"
            bgColor="bg-[#FF2D55]"
            hover="hover:bg-[#FF2D55]"
            textStyle="text-xl"
            width="w-[266.64px]"
            height="h-[64.4px]"
            fontBold="font-bold"
            borderRadios="rounded-[16.1px]"
          >
            {t("navButton.platform")}
            <div className={`${i18n.language === "fa" ? "mr-4" : "ml-4"}`}>
              <ArrowIcon size={24} />
            </div>
          </Button>
        </section>

        {/* hamburger button */}
        <section className="lg:hidden">
          <button
            onClick={() => setMenu(true)}
            className="
            relative p-3 rounded-2xl
            cursor-pointer
            bg-white/90 dark:bg-[#2a2a2a]/80
            backdrop-blur-xl
            border border-gray-200/60 dark:border-gray-700/50
            shadow-[0_8px_30px_rgb(0,0,0,0.08)]
            hover:shadow-[0_10px_40px_rgb(0,0,0,0.15)]
            transition-all duration-300
            text-gray-900 dark:text-white
            active:scale-95
          "
          >
            <FiMenu size={20} />

            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>
        </section>

        <HamburgerMenu menu={menu} setMenu={setMenu} />
      </div>
    </React.Fragment>
  );
}

export default Navbar;
