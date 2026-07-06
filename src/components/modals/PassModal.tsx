import {
  Clock3,
  TrendingUp,
  XCircle,
  CheckCircle2,
  FileText,
  Search,
  UserCheck,
  Flag,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type Status = "reviewing" | "trading" | "rejectedTrading" | "passed";

interface PassAccountModalContentProps {
  status?: Status;
}

const content = {
  fa: {
    title: "وضعیت",
    description: "پس از ثبت درخواست، حساب شما توسط تیم ارزیابی بررسی خواهد شد.",
    button: "ثبت درخواست",
    accountSteps: "مراحل بررسی حساب",

    statuses: {
      reviewing: "درحال بررسی",
      trading: "درحال ترید",
      rejectedTrading: "رد درخواست (درحال ترید)",
      passed: "پاس مرحله",
    },

    steps: [
      "درحال ترید",
      "ثبت درخواست پاسی",
      "بررسی کارشناسی فنی",
      "بررسی منتور",
      "پاس مرحله",
    ],
  },

  en: {
    title: "Account Pass Request",
    description:
      "After submitting your request, your account will be reviewed by the evaluation team.",
    button: "Submit Request",
    accountSteps: "Account Review Process",

    statuses: {
      reviewing: "Under Review",
      trading: "Trading",
      rejectedTrading: "Rejected (Continue Trading)",
      passed: "Passed",
    },

    steps: [
      "Trading",
      "Submit Pass Request",
      "Technical Review",
      "Mentor Review",
      "Passed",
    ],
  },
} as const;

function PassAccountModalContent({
  status = "trading",
}: PassAccountModalContentProps) {
  const { i18n } = useTranslation();

  const lang = i18n.language.startsWith("fa") ? "fa" : "en";
  const t = content[lang];

  const statusConfig = {
    reviewing: {
      icon: Clock3,
      classes:
        "bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-blue-500/10",
    },

    trading: {
      icon: TrendingUp,
      classes:
        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-emerald-500/10",
    },

    rejectedTrading: {
      icon: XCircle,
      classes: "bg-red-500/10 text-red-500 border-red-500/20 shadow-red-500/10",
    },

    passed: {
      icon: CheckCircle2,
      classes:
        "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-amber-500/10",
    },
  };

  const currentStep =
    status === "trading"
      ? 0
      : status === "reviewing"
        ? 3
        : status === "passed"
          ? 4
          : 1;

  const stepIcons = [TrendingUp, FileText, Search, UserCheck, Flag];

  const StatusIcon = statusConfig[status].icon;
  const steps = t.steps;

  return (
    <div
      dir={lang === "fa" ? "rtl" : "ltr"}
      className="mx-auto w-full max-w-4xl"
    >
      <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-800 dark:bg-[#2e2b2b]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-normal text-zinc-900 dark:text-white">
              {t.title}
            </p>
          </div>

          <div
            className={`
            inline-flex w-fit items-center gap-2
            rounded-xl border px-3 py-2 shadow-lg
            ${statusConfig[status].classes}
          `}
          >
            <StatusIcon size={18} />

            <span className="whitespace-nowrap text-xs font-medium">
              {t.statuses[status]}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-[#2e2b2b]">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
          {t.accountSteps}
        </h3>

        <div className="mt-5 space-y-3">
          {steps.map((step, index) => {
            const Icon = stepIcons[index];
            const active = index <= currentStep;

            return (
              <div key={index} className="flex items-start gap-3">
                <div className="flex shrink-0 flex-col items-center">
                  <div
                    className={`
                    flex h-7 w-7 items-center justify-center
                    rounded-xl transition-all duration-300
                    ${
                      active
                        ? "bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                        : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                    }
                  `}
                  >
                    <Icon size={15} />
                  </div>

                  {index !== steps.length - 1 && (
                    <div
                      className={`
                      mt-1.5 h-4 w-0.5
                      ${
                        active ? "bg-amber-500" : "bg-zinc-200 dark:bg-zinc-700"
                      }
                    `}
                    />
                  )}
                </div>

                <div className="pt-1">
                  <p
                    className={`
                    text-xs sm:text-sm
                    ${
                      active
                        ? "font-semibold text-zinc-900 dark:text-white"
                        : "text-zinc-500 dark:text-zinc-400"
                    }
                  `}
                  >
                    {step}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="
        mt-4 h-10 w-full rounded-xl
        bg-amber-500 text-sm font-medium text-white
        shadow-lg shadow-amber-500/20
        transition-all duration-300
        hover:bg-amber-600
      "
      >
        {t.button}
      </button>
    </div>
  );
}

export default PassAccountModalContent;
