import { useState } from "react";
import { NavLink } from "react-router-dom";
import BtnSaidbar from "../ui/BtnSaidbar";
import { sidebarItems } from "../../data/fakeData";
import ProfileSidbar from "./ProfileSidbar";

export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <aside
      className={`
      ${open ? "w-72" : "w-24"}
      relative
      transition-all
      duration-300
      bg-zinc-900
      p-4
      text-white
      min-h-screen
      border-r
      border-zinc-800
    `}
    >
      {/* Profile */}
      <ProfileSidbar open={open} setOpen={setOpen} />

      {/* Toggle */}
      <section
        className={`
    absolute
    top-28
    transition-all
    duration-300
    ${open ? "right-67" : "right-18"}
  `}
      >
        <BtnSaidbar open={open} setOpen={setOpen} />
      </section>

      {/* Menu */}
      <nav className="space-y-2">
        {sidebarItems.map(({ title, path, icon: Icon }) => (
          <NavLink
            title={title.fa}
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
              ${
                isActive
                  ? "bg-zinc-700 text-white shadow-lg"
                  : "hover:bg-zinc-800 text-zinc-300"
              }
            `
            }
          >
            <Icon size={22} className="shrink-0" />

            <span
              className={`
                whitespace-nowrap
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
              {title.fa}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
