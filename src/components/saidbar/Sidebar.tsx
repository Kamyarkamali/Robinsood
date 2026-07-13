import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import BtnSaidbar from "../ui/BtnSaidbar";
import { sidebarItems } from "../../data/fakeData";
import ProfileSidbar from "./ProfileSidbar";
import UserMenu from "../../module/UserMenu";
import i18next from "i18next";

export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const lang = i18next.language;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    console.log(window.innerWidth);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileOpen && isMobile) {
        const target = e.target as HTMLElement;
        if (!target.closest("aside") && !target.closest("button")) {
          setMobileOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen, isMobile]);

  useEffect(() => {
    if (mobileOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen, isMobile]);

  const neumorphicActive = `
    shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]
    bg-zinc-800/50
    text-white
    border border-white/5
  `;

  const neumorphicHover = `
    hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]
    hover:bg-zinc-800/30
  `;

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setMobileOpen(true)}
          className={`
            fixed top-4 left-4 z-50
            p-2.5 rounded-xl
            bg-[#3B3B3B] text-white
            border border-zinc-800
            cursor-pointer
            shadow-lg
            ${mobileOpen ? "hidden" : "block"}
          `}
        >
          <FiMenu size={24} />
        </button>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <aside
          className={`
            fixed top-0 left-0 z-50
            w-72 h-full
            dark:bg-zinc-900
            p-4
            dark:text-white
            border-r border-zinc-800
            flex flex-col
            transition-transform duration-300 ease-in-out
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-zinc-800 transition-colors"
          >
            <FiX size={22} />
          </button>

          <ProfileSidbar open={true} setOpen={setOpen} />

          <nav className="space-y-2 flex-1 overflow-y-auto mt-12">
            {sidebarItems.map(({ title, path, icon: Icon }) => (
              <NavLink
                title={lang === "fa" ? title?.fa : title?.en}
                key={lang === "fa" ? title?.fa : title?.en}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    px-5
                    py-3
                    transition-all
                    duration-300
                    min-w-0
                    ${
                      isActive
                        ? neumorphicActive
                        : `text-zinc-300 ${neumorphicHover}`
                    }
                  `
                }
              >
                <Icon size={22} className="shrink-0" />
                <span className="whitespace-nowrap overflow-hidden text-[12px] font-normal">
                  {lang === "fa" ? title?.fa : title?.en}
                </span>
              </NavLink>
            ))}
          </nav>

          <UserMenu isSidebarOpen={true} />
        </aside>
      </>
    );
  }

  return (
    <aside
      className={`
        ${open ? "w-72" : "w-24"}
        relative
        text-gray-500
        transition-all
        duration-300
       dark:bg-zinc-900
       bg-[#F3F4F6]
        p-4
        dark:text-white
        border-r
        border-zinc-800
        flex flex-col
        min-h-screen
        sticky top-0
      `}
    >
      <ProfileSidbar open={open} setOpen={setOpen} />

      <div
        className={`
          absolute
            top-28
            transition-all
            duration-300
             ${
               lang === "fa"
                 ? open
                   ? "-translate-x-61"
                   : "-translate-x-14"
                 : open
                   ? "translate-x-63"
                   : "translate-x-14"
             }
`}
      >
        <BtnSaidbar open={open} setOpen={setOpen} />
      </div>

      <nav className="space-y-2 flex-1 overflow-y-auto mt-12">
        {sidebarItems.map(({ title, path, icon: Icon }) => (
          <NavLink
            title={lang === "fa" ? title?.fa : title?.en}
            key={title.en}
            to={path}
            className={({ isActive }) =>
              `
                flex
                items-center
                gap-4
                rounded-2xl
                px-5
                py-3
                transition-all
                duration-300
                min-w-0
                ${
                  isActive
                    ? neumorphicActive
                    : `dark:text-zinc-300 text-zinc-700 ${neumorphicHover}`
                }
              `
            }
          >
            <Icon size={22} className="shrink-0" />

            <span
              className={`
                whitespace-nowrap
                text-[13px]
                overflow-hidden
                transition-all
                duration-300
                ${
                  open
                    ? "opacity-100 w-44"
                    : "opacity-0 w-0 pointer-events-none"
                }
              `}
            >
              {lang === "fa" ? title?.fa : title?.en}
            </span>
          </NavLink>
        ))}
      </nav>

      <UserMenu isSidebarOpen={open} />
    </aside>
  );
}
