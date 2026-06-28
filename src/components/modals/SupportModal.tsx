import { Play, Headphones } from "lucide-react";
import { useTranslation } from "react-i18next";

const content = {
  fa: {
    title: "سامانه پگاه",
    desc: `
در این سامانه شما می‌توانید با مراجعه به بخش پشتیبانی
به صورت لحظه‌ای با کارشناسان در ارتباط باشید.
    `,
    button: "ورود به سامانه پگاه",
    videoLabel: "ویدئوی معرفی سامانه",
  },

  en: {
    title: "Pegah Support System",
    desc: `
In this system, you can communicate with our support
experts instantly through the support section.
    `,
    button: "Enter Pegah System",
    videoLabel: "System Introduction",
  },
};

function SupportModalContent() {
  const { i18n } = useTranslation();

  const lang = i18n.language.startsWith("fa") ? "fa" : "en";
  const t = content[lang];

  return (
    <div
      dir={lang === "fa" ? "rtl" : "ltr"}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        className="
          rounded-3xl
          border border-zinc-200 dark:border-zinc-800
          bg-white dark:bg-[#0B1120]
          p-5 sm:p-6
          shadow-xl
        "
      >
        {/* هنگام اتصال بک‌اند این بخش را با تگ video جایگزین کنید */}
        <div className="flex justify-center">
          <div
            className="
              relative
              w-full
              max-w-[520px]
              overflow-hidden
              rounded-3xl
              h-[150px]
              sm:h-[180px]
              lg:h-[190px]
              bg-gradient-to-br
              from-emerald-500/20
              via-emerald-500/5
              to-transparent
              border border-emerald-500/20
            "
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_70%)]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="
                  flex h-14 w-14
                  sm:h-16 sm:w-16
                  items-center justify-center
                  rounded-full
                  bg-white/90
                  dark:bg-zinc-900/90
                  shadow-xl
                  backdrop-blur-xl
                  transition
                  hover:scale-110
                "
              >
                <Play
                  size={28}
                  className="ml-1 text-emerald-500 fill-emerald-500"
                />
              </button>
            </div>

            <div className="absolute bottom-3 right-3">
              <div
                className="
                  flex items-center gap-2
                  rounded-xl
                  bg-black/40
                  px-3 py-1.5
                  text-white
                  backdrop-blur-xl
                "
              >
                <Headphones size={16} />

                <span className="text-xs sm:text-sm font-medium">
                  {t.videoLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
            {t.title}
          </h2>

          <p
            className="
              mt-4
              text-sm sm:text-base
              leading-8
              text-zinc-500 dark:text-zinc-400
              whitespace-pre-line
            "
          >
            {t.desc}
          </p>
        </div>

        {/* Button */}
        <button
          className="
            mt-8
            w-full
            rounded-2xl
            bg-emerald-500
            py-3.5
            font-medium
            text-white
            shadow-lg shadow-emerald-500/25
            transition-all duration-300
            hover:-translate-y-1
            hover:bg-emerald-600
            hover:shadow-[0_15px_40px_rgba(16,185,129,0.35)]
          "
        >
          {t.button}
        </button>
      </div>
    </div>
  );
}

export default SupportModalContent;
