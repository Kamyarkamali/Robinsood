import { FiX } from "react-icons/fi";
import type { Props } from "../types/interfaces";
import { useTranslation } from "react-i18next";

function HamburgerMenu({ menu, setMenu }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <div
        onClick={() => setMenu(false)}
        className={`
          fixed inset-0
          bg-black/40
          backdrop-blur-sm
          z-40
          transition-opacity duration-300

          ${menu ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      <div
        className={`
          fixed top-0 right-0
          h-full w-70

          bg-white dark:bg-[#202020]
          border-l border-gray-200 dark:border-gray-700/40

          shadow-2xl
          z-50

          transform transition-transform duration-300 ease-in-out

          ${menu ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700/40">
          <h2 className="text-lg font-bold text-black dark:text-white">
            {t("hamburgermenu.start")}
          </h2>

          <button
            onClick={() => setMenu(false)}
            className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* آیتم های داخل همبرگرمنو */}
        <div className="p-4 flex flex-col gap-3">
          <a className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
            Home
          </a>

          <a className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
            Market
          </a>

          <a className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
            Trade
          </a>
        </div>
      </div>
    </>
  );
}

export default HamburgerMenu;
