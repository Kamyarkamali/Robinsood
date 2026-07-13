// دکمه باز و بسته شدن سایدبار
import type { FC } from "react";
import { IoIosArrowBack } from "react-icons/io";
import type { openState } from "../../types/interfaces";

const BtnSaidbar: FC<openState> = ({ open, setOpen }) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className={`
        ${open ? "rotate-180" : "rotate-0"}

        flex cursor-pointer items-center justify-center

        w-10 h-10
        rounded-full
        bg-gray-500
        dark:bg-[#202024]
        text-zinc-300

        transition-all
        duration-300

        hover:text-cyan-400
        hover:scale-110

        active:scale-95



      `}
    >
      <IoIosArrowBack size={20} />
    </button>
  );
};

export default BtnSaidbar;
