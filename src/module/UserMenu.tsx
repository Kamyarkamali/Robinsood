import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiCheck, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import type { AvatarItem, Lang } from "../types/type";
import { avatarData } from "../data/fakeData";
import i18next from "i18next";

export default function UserMenu() {
  const { i18n } = useTranslation();
  const DEFAULT_AVATAR = avatarData[1].dark;

  const [open, setOpen] = useState(false);

  const [lang, setLang] = useState<Lang>(
    (localStorage.getItem("lang") as Lang) || "en",
  );

  const theme = (localStorage.getItem("theme") as "dark" | "light") || "dark";

  const [selectedAvatar, setSelectedAvatar] = useState<string>(() => {
    return localStorage.getItem("avatar") || DEFAULT_AVATAR;
  });
  const [setSelectedName] = useState("Select Profile");

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const setTheme = (t: "dark" | "light") => {
    localStorage.setItem("theme", t);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(t);
  };

  const changeLang = (lng: Lang) => {
    setLang(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  const getSrc = (item: AvatarItem) =>
    theme === "dark" ? item.dark : item.light;

  const handleSelect = (item: AvatarItem) => {
    const src = theme === "dark" ? item.dark : item.light;

    setSelectedAvatar(src);

    localStorage.setItem("avatar", src);
    // @ts-ignore
    setSelectedName(lang === "fa" ? item.fa : item.en);

    setOpen(false);
  };

  const list = useMemo(() => avatarData, []);

  return (
    <div className="relative z-100">
      <button
        onClick={() => setOpen(true)}
        className="
          flex items-center gap-2
          px-2 py-1 rounded-full
          dark:bg-[#2b2b2bb4]
          bg-[#ebe1e1]
          dark:border border-2 border-gray-400 dark:border-white/10
          dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.65),inset_-2px_-2px_6px_rgba(255,255,255,0.05)]
        "
      >
        <div className="relative">
          <img
            src={selectedAvatar || DEFAULT_AVATAR}
            className="w-8 h-8 rounded-full object-cover"
          />

          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#2B2B2B2B]" />
        </div>

        <span className="dark:text-white text-gray-700 text-xs whitespace-nowrap">
          {i18next.language === "fa" ? "انتخاب پروفایل" : "Select Profile"}
        </span>

        <FiChevronDown className="dark:text-white text-gray-600" />
      </button>

      {open && (
        <div
          className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/60 backdrop-blur-sm
          p-4
        "
        >
          <div
            ref={modalRef}
            className="
              w-full max-w-md
              rounded-2xl
              bg-[#2B2B2B2B]
              border border-white/10
              shadow-[0_20px_60px_rgba(0,0,0,0.7)]
              overflow-hidden
            "
          >
            <div className="flex justify-between items-center p-3 border-b border-white/10">
              <p className="text-white/70 text-xs">
                {i18next.language === "fa"
                  ? "انتخاب پروفایل"
                  : "Select Profile"}
              </p>

              <button className="cursor-pointer" onClick={() => setOpen(false)}>
                <FiX className="text-white" />
              </button>
            </div>

            <div className="flex justify-between p-2 border-b border-white/10">
              <div className="flex gap-1">
                <button
                  onClick={() => changeLang("en")}
                  className={`px-2 py-1 text-[10px] rounded-lg border border-white/10 ${
                    lang === "en"
                      ? "bg-green-500/20 text-green-400"
                      : "text-white/70"
                  }`}
                >
                  {i18next.language === "fa" ? "انگلیسی" : "EN"}
                </button>

                <button
                  onClick={() => changeLang("fa")}
                  className={`px-2 py-1 text-[10px] rounded-lg border border-white/10 ${
                    lang === "fa"
                      ? "bg-green-500/20 text-green-400"
                      : "text-white/70"
                  }`}
                >
                  {i18next.language === "fa" ? "فارسی" : "FA"}
                </button>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => setTheme("dark")}
                  className={`px-2 py-1 text-[10px] rounded-lg border border-white/10 ${
                    theme === "dark"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "text-white/70"
                  }`}
                >
                  {i18next.language === "fa" ? "تیره" : "Dark"}
                </button>

                <button
                  onClick={() => setTheme("light")}
                  className={`px-2 py-1 text-[10px] rounded-lg border border-white/10 ${
                    theme === "light"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "text-white/70"
                  }`}
                >
                  {i18next.language === "fa" ? "روشن" : "Ligth"}
                </button>
              </div>
            </div>

            <div className="p-2 max-h-105 overflow-y-auto">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {list.map((item) => {
                  const src = getSrc(item);

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="
                        relative cursor-pointer
                        rounded-lg overflow-hidden
                        border border-white/10
                        p-1
                        hover:scale-[1.03] transition
                        flex flex-col items-center
                      "
                    >
                      <img
                        src={src}
                        className="w-full h-12 object-cover rounded-md"
                      />

                      <span className="text-[8px] text-white/70 mt-1 text-center">
                        {lang === "fa" ? item.fa : item.en}
                      </span>

                      {selectedAvatar === src && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <FiCheck className="text-green-400 w-3 h-3" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
