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

        bg-[#202024]
        text-zinc-300

        transition-all
        duration-300

        hover:text-cyan-400
        hover:scale-110

        active:scale-95

        shadow-[6px_6px_14px_#0f0f12,-6px_-6px_14px_#2b2b30]

        hover:shadow-[8px_8px_18px_#0b0b0d,-8px_-8px_18px_#2e2e34]

        active:shadow-[inset_4px_4px_8px_#111114,inset_-4px_-4px_8px_#2a2a2f]
      `}
    >
      <IoIosArrowBack size={20} />
    </button>
  );
};

export default BtnSaidbar;
