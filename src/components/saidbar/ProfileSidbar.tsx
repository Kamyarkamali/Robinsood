import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { avatarData } from "../../data/fakeData";
import { useUser } from "../../hooks/useUser";

interface ProfileSidbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ProfileSidbar({ open }: ProfileSidbarProps) {
  const { user } = useUser();
  const { i18n } = useTranslation();

  const avatarName = useMemo(() => {
    const current = avatarData.find(
      (a) => a.dark === user.avatar || a.light === user.avatar,
    );

    if (current) {
      return i18n.language === "fa" ? current.fa : current.en;
    }
    return null;
  }, [user.avatar, i18n.language]);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-zinc-800">
      <div className="relative shrink-0">
        <div className="p-0.5 rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-fuchsia-500">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
        </div>
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
      </div>

      <div
        className={`
          overflow-hidden
          transition-all
          flex flex-col items-center
          duration-300
          ${open ? "opacity-100 w-auto" : "opacity-0 w-0"}
        `}
      >
        <p className="text-[10px] sm:text-[11px] text-green-400 truncate">
          آنلاین
        </p>
        {avatarName && (
          <p className="text-[10px] sm:text-[11px] text-cyan-400 truncate">
            {avatarName}
          </p>
        )}
      </div>
    </div>
  );
}
