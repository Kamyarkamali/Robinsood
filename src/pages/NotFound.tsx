import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const isFa = i18n.language === "fa";

  return (
    <main
      dir={isFa ? "rtl" : "ltr"}
      className="
        relative min-h-screen overflow-hidden
        transition-colors duration-500
      "
    >
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-[420px] w-[420px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#7C5CFA]/10
          blur-[110px]
          dark:bg-[#7C5CFA]/15
        "
      />

      <div
        className="
          absolute left-[12%] top-[20%]
          h-2 w-2 rounded-full
          bg-[#7C5CFA]
          opacity-60
          animate-float-slow
        "
      />

      <div
        className="
          absolute right-[16%] top-[28%]
          h-1.5 w-1.5 rounded-full
          bg-[#28B5A8]
          opacity-70
          animate-float
        "
      />

      <div
        className="
          absolute bottom-[22%] left-[20%]
          h-1.5 w-1.5 rounded-full
          bg-[#4F7CFF]
          opacity-50
          animate-float-reverse
        "
      />

      <div
        className="
          absolute bottom-[28%] right-[20%]
          h-2 w-2 rounded-full
          bg-[#7C5CFA]
          opacity-50
          animate-float-slow
        "
      />

      <section
        className="
          relative z-10
          flex min-h-screen
          items-center justify-center
          px-6 py-16
        "
      >
        <div
          className="
            flex w-full max-w-2xl
            flex-col items-center
            text-center
          "
        >
          <div className="relative mb-10">
            <div
              className="
                absolute inset-0
                scale-75
                rounded-full
                bg-[#7C5CFA]/15
                blur-3xl
                animate-pulse-soft
              "
            />

            <div
              className="
                relative
                flex h-52 w-52
                items-center justify-center
                rounded-full
                border border-[var(--border)]
                bg-[var(--card-bg)]
                shadow-[0_20px_70px_rgba(31,36,48,0.08)]
                dark:shadow-[0_20px_70px_rgba(0,0,0,0.25)]
                animate-404
              "
            >
              {/* Inner circle */}
              <div
                className="
                  absolute inset-5
                  rounded-full
                  border border-[#7C5CFA]/15
                "
              />

              <div
                className="
                  absolute inset-0
                  rounded-full
                  border border-transparent
                  border-t-[#7C5CFA]/40
                  animate-spin-slow
                "
              />

              <div className="relative flex flex-col items-center">
                <span
                  className="
                    bg-gradient-to-br
                    from-[#5A3FE0]
                    via-[#7C5CFA]
                    to-[#9A86FF]
                    bg-clip-text
                    text-7xl font-black
                    tracking-[-0.08em]
                    text-transparent
                  "
                >
                  404
                </span>

                <span
                  className="
                    mt-1 text-[11px]
                    font-medium uppercase
                    tracking-[0.3em]
                    text-[var(--text-tertiary)]
                  "
                >
                  NOT FOUND
                </span>
              </div>
            </div>

            <span
              className="
                absolute -right-1 top-10
                h-3 w-3 rounded-full
                bg-[#7C5CFA]
                shadow-[0_0_18px_rgba(124,92,250,0.6)]
                animate-orbit-dot
              "
            />

            <span
              className="
                absolute -left-2 bottom-12
                h-2.5 w-2.5 rounded-full
                bg-[#28B5A8]
                shadow-[0_0_16px_rgba(40,181,168,0.5)]
                animate-orbit-dot-reverse
              "
            />
          </div>

          <div className="animate-fade-up">
            <h1
              className="
                text-2xl font-bold
                tracking-tight
                text-[var(--text-primary)]
                sm:text-3xl
              "
            >
              {isFa ? "صفحه پیدا نشد" : "Page not found"}
            </h1>

            <p
              className="
                mx-auto mt-4 max-w-md
                text-sm leading-7
                text-[var(--text-secondary)]
                sm:text-base
              "
            >
              {isFa
                ? "به نظر می‌رسد صفحه‌ای که به دنبال آن هستید وجود ندارد یا جابه‌جا شده است."
                : "The page you're looking for doesn't exist or may have been moved."}
            </p>
          </div>

          <div
            className="
              mt-8 flex
              flex-col items-center
              gap-3
              sm:flex-row
              animate-fade-up-delay
            "
          >
            <Link
              to="/"
              className="
                group inline-flex
                h-11 items-center
                justify-center gap-2
                rounded-xl
                bg-[#7C5CFA]
                px-5
                text-sm font-semibold
                text-white
                shadow-[0_8px_24px_rgba(124,92,250,0.22)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-[#6B4DF0]
                hover:shadow-[0_12px_30px_rgba(124,92,250,0.3)]
                active:translate-y-0
                active:bg-[#5A3FE0]
              "
            >
              <Home
                size={17}
                strokeWidth={2}
                className="
                  transition-transform duration-300
                  group-hover:-translate-y-0.5
                "
              />

              <span>{isFa ? "بازگشت به خانه" : "Back to Home"}</span>
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
                group inline-flex
                h-11 items-center
                justify-center gap-2
                rounded-xl
                border border-[var(--border)]
                bg-[var(--card-bg)]
                px-5
                text-sm font-semibold
                text-[var(--text-primary)]
                shadow-sm
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-[#7C5CFA]/30
                hover:bg-[#7C5CFA]/5
                active:translate-y-0
              "
            >
              {isFa ? (
                <ArrowRight
                  size={17}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              ) : (
                <ArrowLeft
                  size={17}
                  className="
                    transition-transform duration-300
                    group-hover:-translate-x-1
                  "
                />
              )}

              <span>{isFa ? "صفحه قبل" : "Go Back"}</span>
            </button>
          </div>

          <div
            className="
              mt-12 flex items-center
              gap-2 text-xs
              text-[var(--text-tertiary)]
              animate-fade-in
            "
          >
            <span
              className="
                h-1.5 w-1.5
                rounded-full
                bg-[#22B36B]
              "
            />

            <span>
              {isFa
                ? "نگران نباش، می‌تونی به مسیرت ادامه بدی."
                : "Don't worry, you can continue from here."}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
