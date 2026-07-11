import type { FC } from "react";
import type { openState } from "../../types/interfaces";

const ProfileSidbar: FC<openState> = ({ open }) => {
  return (
    <div
      className={`
        mb-8
        transition-all
        duration-300
        hover:scale-[1.02]
      `}
    >
      <div
        className={`${
          open ? "flex-row py-5 px-4" : "flex-col py-5"
        } flex items-center justify-center gap-4`}
      >
        <div className="relative shrink-0">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-zinc-700"
          />

          <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-zinc-900 animate-pulse"></span>
        </div>

        <div
          className={`
              overflow-hidden
              transition-all
              duration-300
              ${open ? "opacity-100 w-40" : "opacity-0 w-0 pointer-events-none"}
            `}
        >
          <h3 className="font-semibold text-white whitespace-nowrap">
            هومن حریقی
          </h3>

          <p className="text-xs text-green-400 mt-1 whitespace-nowrap">
            ● آنلاین
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidbar;
