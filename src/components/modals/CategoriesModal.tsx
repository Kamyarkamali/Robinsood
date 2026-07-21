import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X, Search, Grid3x3, LayoutList } from "lucide-react";
import { cards } from "../../data/fakeData";

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoriesModal({
  isOpen,
  onClose,
}: CategoriesModalProps) {
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const filteredCards = cards.filter((item) => {
    const search = searchTerm.toLowerCase();
    const label = isFa ? item.fa : item.en;
    const desc = isFa ? item.descFa : item.descEn;
    return (
      label.toLowerCase().includes(search) ||
      desc.toLowerCase().includes(search)
    );
  });

  const handleCardClick = (slug: string) => {
    onClose();
    setTimeout(() => {
      navigate(`/account/${slug}`);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="
          fixed inset-0 z-100
          bg-black/60 backdrop-blur-sm
          animate-in fade-in duration-300
        "
        onClick={onClose}
      />

      <div
        className="
          fixed inset-x-0 bottom-0 z-101
          max-h-[92vh] md:max-h-[85vh]
          rounded-t-3xl md:rounded-3xl
          bg-linear-to-b
from-[#353535]/95
to-[#242424]/95
backdrop-blur-xl
border border-white/10
shadow-[0_20px_60px_rgba(0,0,0,0.5)]
          animate-in slide-in-from-bottom duration-400
          md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          md:max-w-4xl md:w-full
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-12 h-1 rounded-full bg-white/20" />
        </div>

        <div className="sticky top-0 z-10 px-4 md:px-6 pt-4 pb-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2  -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder={
                  isFa ? "جستجوی دسته‌بندی..." : "Search categories..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                placeholder:text-sm
                  w-full pl-10 pr-4 py-2.5
                  bg-white/5 border border-white/10
                  rounded-xl
                  text-white placeholder:text-white/30
                  focus:outline-none focus:border-violet-500/50
                  transition-all duration-200
                "
                autoFocus
              />
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="
                  p-2 rounded-xl
                  bg-white/5 hover:bg-white/10
                  transition-all duration-200
                  text-white/60 hover:text-white
                "
              >
                {viewMode === "grid" ? (
                  <LayoutList className="w-5 h-5" />
                ) : (
                  <Grid3x3 className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={onClose}
                className="
                  p-2 rounded-xl
                  bg-white/5 hover:bg-white/10
                  transition-all duration-200
                  text-white/60 hover:text-white
                  hover:rotate-90
                "
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          className="
            overflow-y-auto px-4 md:px-6 pb-6
            scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
            max-h-[calc(92vh-120px)] md:max-h-[calc(85vh-120px)]
          "
        >
          <div
            className={`
              grid gap-3
              ${
                viewMode === "grid"
                  ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                  : "grid-cols-1"
              }
            `}
          >
            {filteredCards.map((item) => {
              const Icon = item.icon;
              const isHovered = hoveredId === item.id;
              const label = isFa ? item.fa : item.en;
              const desc = isFa ? item.descFa : item.descEn;

              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item.slug)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`
                    group relative cursor-pointer
                    rounded-2xl
                    bg-linear-to-br from-white/5 to-white/0
                    border border-white/10
                    transition-all duration-300
                    hover:scale-[1.02] hover:border-violet-500/30
                    hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]
                    ${viewMode === "list" ? "flex items-center gap-4 p-4" : "p-4 flex flex-col items-center text-center"}
                  `}
                >
                  <div
                    className={`
                      absolute inset-0 rounded-2xl
                      bg-linear-to-br from-violet-500/0 via-violet-500/0 to-violet-500/0
                      transition-all duration-500
                      ${isHovered ? "from-violet-500/5 via-violet-500/0 to-transparent" : ""}
                    `}
                  />

                  <div
                    className={`
                      absolute top-0 left-4 right-4 h-0.5
                      rounded-full
                      transition-all duration-300
                      ${item.line} 
                      ${isHovered ? "opacity-100 scale-x-100" : "opacity-30 scale-x-75"}
                    `}
                  />

                  <div
                    className={`
                      relative
                      ${viewMode === "list" ? "shrink-0" : "mt-3"}
                    `}
                  >
                    <div
                      className={`
                        relative flex items-center justify-center
                        w-12 h-12 rounded-2xl
                        bg-white/5
                        transition-all duration-300
                        ${isHovered ? "scale-110 rotate-6" : ""}
                      `}
                    >
                      <Icon
                        className={`
                          w-6 h-6
                          transition-all duration-300
                          ${item.color}
                          ${isHovered ? "scale-110" : ""}
                        `}
                      />

                      {isHovered && (
                        <div
                          className={`
                            absolute inset-0 rounded-2xl
                            ${item.color.replace("text-", "bg-")}
                            opacity-10 blur-xl scale-150
                            animate-pulse
                          `}
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      viewMode === "list" ? "flex-1 min-w-0" : "mt-2 w-full"
                    }
                  >
                    <h3
                      className={`
                        font-medium text-sm
                        transition-colors duration-200
                        ${isHovered ? "text-white" : "text-white/80"}
                      `}
                    >
                      {label}
                    </h3>
                    <p className="text-xs text-white/40 mt-0.5 line-clamp-1">
                      {desc}
                    </p>
                  </div>

                  <div
                    className={`
                      ${viewMode === "list" ? "shrink-0" : "mt-1"}
                      transition-all duration-300
                      ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
                    `}
                  >
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-violet-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={isFa ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCards.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-white/40">
              <Search className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">
                {isFa ? "دسته‌بندی‌ای پیدا نشد" : "No categories found"}
              </p>
              <p className="text-sm mt-1">
                {isFa
                  ? "سعی کنید با کلمه دیگری جستجو کنید"
                  : "Try searching with another keyword"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
