import { useEffect, useMemo, useState } from "react";
import { TiArrowRight } from "react-icons/ti";

import Icon1 from "../assets/3D-icon/3dicons-shield-front-color.png";
import Icon2 from "../assets/3D-icon/3dicons-headphone-front-color.png";
import Icon3 from "../assets/3D-icon/3dicons-chat-dynamic-gradient.png";
import Icon4 from "../assets/3D-icon/3dicons-notebook-dynamic-color.png";

import SupportModalContent from "../components/modals/SupportModal";
import MentorModalContent from "../components/modals/MentorModal";
import PassAccountModalContent from "../components/modals/PassModal";
import EducationModalContent from "../components/modals/EducationModal";
import Modal from "../components/modals/ModalComponent";

import type { ModalType } from "../types/type";
import type { CardComponentProps } from "../types/interfaces";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function CardComponent({ onStartTour }: CardComponentProps) {
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleStartTour = () => {
    setModalType(null);

    setTimeout(() => {
      onStartTour();
    }, 500);
  };

  const cards = useMemo(
    () => [
      {
        type: "passAccount" as const,
        step: "step-pass-account",
        component: <PassAccountModalContent />,
        title: {
          fa: "درخواست پاس حساب و رفتن به مرحله بعد",
          en: "Pass Account Request & Proceed to the Next Stage",
        },
        desc: {
          fa: "بررسی شرایط و ارزیابی عملکرد حساب",
          en: "Review account conditions and performance evaluation",
        },
        icon: Icon1,
        border:
          "bg-gradient-to-r from-amber-500/60 via-amber-500/20 to-transparent",
        glow: "bg-amber-500/20",
        arrow:
          "bg-amber-500/15 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]",
      },
      {
        type: "support" as const,
        step: "step-support",
        component: <SupportModalContent />,
        title: {
          fa: "درخواست پشتیبانی",
          en: "Support Request",
        },
        desc: {
          fa: "سامانه پشتیبانی، تیکت و تماس",
          en: "Support system, tickets and contact options",
        },
        icon: Icon3,
        border:
          "bg-gradient-to-r from-emerald-500/60 via-emerald-500/20 to-transparent",
        glow: "bg-emerald-500/20",
        arrow:
          "bg-emerald-500/15 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
      },
      {
        type: "mentor" as const,
        step: "step-mentor",
        component: <MentorModalContent />,
        title: {
          fa: "درخواست منتور و تراپیست",
          en: "Mentor & Therapist Request",
        },
        desc: {
          fa: "منتور اختصاصی و جلسات تراپیست",
          en: "Dedicated mentor and therapist sessions",
        },
        icon: Icon2,
        border:
          "bg-gradient-to-r from-blue-500/60 via-blue-500/20 to-transparent",
        glow: "bg-blue-500/20",
        arrow:
          "bg-blue-500/15 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.25)]",
      },
      {
        type: "education" as const,
        step: "step-education",
        component: <EducationModalContent onStartTour={handleStartTour} />,
        title: {
          fa: "آموزش و راهنما",
          en: "Education & Guide",
        },
        desc: {
          fa: "ویدیوهای آموزشی و مقالات",
          en: "Educational videos and articles",
        },
        icon: Icon4,
        border:
          "bg-gradient-to-r from-violet-500/60 via-violet-500/20 to-transparent",
        glow: "bg-violet-500/20",
        arrow:
          "bg-violet-500/15 text-violet-400 shadow-[0_0_20px_rgba(168,85,247,0.25)]",
      },
    ],
    [handleStartTour],
  );
  const currentCard = cards.find((card) => card.type === modalType);

  const {
    i18n: { language },
  } = useTranslation();

  const lang = i18next.language;

  return (
    <>
      <h1 className="font-bold text-md md:text-xl">
        {lang === "fa" ? "امکانات" : "Facilities"}
      </h1>
      <section className="mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
          {cards.map((card) => (
            <div
              key={card.type}
              onClick={() => setModalType(card.type)}
              className={`
                ${card.step}
                group relative overflow-hidden
                rounded-[30px]
                p-px
                cursor-pointer
                ${card.border}
                transition-all duration-500
                hover:-translate-y-1.5
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
                    <h2 className="text-sm md:text-[12px] font-bold text-zinc-900 dark:text-white leading-7 line-clamp-2">
                      {language === "fa" ? card?.title?.fa : card.title?.en}
                    </h2>

                    <p className="mt-3 text-sm md:text-[12px] font-normal leading-6 text-zinc-500 dark:text-zinc-400">
                      {language === "fa" ? card?.desc?.fa : card.desc?.en}
                    </p>
                  </div>

                  <div className="relative shrink-0 w-20 sm:w-24 flex items-center justify-center">
                    <img
                      src={card.icon}
                      alt={card.title.fa}
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
                        rotate-180
                        ${
                          language === "fa"
                            ? "left-20 -bottom-5"
                            : "right-10 -bottom-9"
                        }
                       
                        flex
                        h-10 w-10
                        backdrop-blur-2xl
                        sm:h-7 sm:w-7
                        items-center justify-center
                        rounded-full
                        transition-all duration-300
                        group-hover:scale-110
                        ${card.arrow}
                      `}
                    >
                      <TiArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:-translate-x-0.5"
                      />
                    </button>
                  </div>
                </div>

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

      <Modal open={modalType !== null} onClose={() => setModalType(null)}>
        {currentCard && (
          <div className={currentCard.step}>{currentCard.component}</div>
        )}
      </Modal>
    </>
  );
}

export default CardComponent;
