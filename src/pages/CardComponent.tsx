import { TiArrowRight } from "react-icons/ti";
import Icon1 from "../assets/3D-icon/3dicons-shield-front-color.png";
import Icon2 from "../assets/3D-icon/3dicons-headphone-front-color.png";
import Icon3 from "../assets/3D-icon/3dicons-chat-dynamic-gradient.png";
import Icon4 from "../assets/3D-icon/3dicons-notebook-dynamic-color.png";

const cards = [
  {
    title: "درخواست پاس حساب و رفتن به مرحله بعد",
    desc: "بررسی شرایط و ارزیابی عملکرد حساب",
    icon: Icon1,
    border:
      "bg-gradient-to-r from-amber-500/60 via-amber-500/20 to-transparent",
    glow: "bg-amber-500/20",
    arrow:
      "bg-amber-500/15 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]",
  },
  {
    title: "درخواست پشتیبانی",
    desc: "سامانه پشتیبانی، تیکت و تماس",
    icon: Icon3,
    border:
      "bg-gradient-to-r from-emerald-500/60 via-emerald-500/20 to-transparent",
    glow: "bg-emerald-500/20",
    arrow:
      "bg-emerald-500/15 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
  },
  {
    title: "درخواست منتور و ترباپیست",
    desc: "منتور اختصاصی و جلسات ترباپیست",
    icon: Icon2,
    border: "bg-gradient-to-r from-blue-500/60 via-blue-500/20 to-transparent",
    glow: "bg-blue-500/20",
    arrow:
      "bg-blue-500/15 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.25)]",
  },
  {
    title: "آموزش و راهنما",
    desc: "ویدیوهای آموزشی و مقالات",
    icon: Icon4,
    border:
      "bg-gradient-to-r from-violet-500/60 via-violet-500/20 to-transparent",
    glow: "bg-violet-500/20",
    arrow:
      "bg-violet-500/15 text-violet-400 shadow-[0_0_20px_rgba(168,85,247,0.25)]",
  },
];

function CardComponent() {
  return (
    <section dir="rtl" className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`
              group relative overflow-hidden
              rounded-[30px]
              p-px
              ${card.border}
              transition-all duration-500
              hover:-translate-y-1.5
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)]
              dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]
            `}
          >
            <div
              className="
                relative
                min-h-45
                rounded-[29px]
                overflow-hidden
                bg-white/95
                dark:bg-[#070B14]
                backdrop-blur-xl
                p-5
                flex items-center
              "
            >
              <div
                className={`
                  absolute
                  -left-16
                  top-1/2
                  h-44
                  w-44
                  -translate-y-1/2
                  rounded-full
                  blur-[90px]
                  opacity-60
                  ${card.glow}
                `}
              />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.05),transparent_55%)]" />

              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

              <div className="relative flex items-center justify-between w-full gap-4">
                <div className="flex-1 min-w-0 text-right">
                  <h2
                    className="
                      text-sm md:text-base
                      font-normal
                      text-zinc-900 dark:text-white
                      leading-7
                      line-clamp-2
                    "
                  >
                    {card.title}
                  </h2>

                  <p
                    className="
                      mt-3
                      text-xs md:text-sm
                      leading-6
                      text-zinc-500 dark:text-zinc-400
                    "
                  >
                    {card.desc}
                  </p>
                </div>

                <div className="relative shrink-0 w-20 sm:w-24 flex items-center justify-center">
                  <img
                    src={card.icon}
                    alt={card.title}
                    className="
                      w-20 sm:w-24
                      object-contain
                      drop-shadow-[0_20px_25px_rgba(0,0,0,0.45)]
                      transition-all duration-500
                      group-hover:scale-110
                      group-hover:-translate-y-1
                    "
                  />

                  <button
                    className={`
                      absolute
                      left-18
                      -bottom-5
                      flex
                      h-10 w-10
                      sm:h-11 sm:w-11
                      items-center justify-center
                      rounded-full
                      backdrop-blur-xl
                      transition-all duration-300
                      group-hover:scale-110
                      ${card.arrow}
                    `}
                  >
                    <TiArrowRight
                      size={20}
                      className="transition-transform duration-300 group-hover:-translate-x-0.5"
                    />
                  </button>
                </div>
              </div>

              {/* Hover Glow */}
              <div
                className={`
                  absolute inset-0
                  opacity-0
                  transition duration-500
                  group-hover:opacity-100
                  ${card.glow}
                  blur-[140px]
                `}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardComponent;
