// توضیحات
// -----------------------------------------------------------------
// جناب حریقی برای تغیر موارد آموزش این موارد رو لحاظ بفرماید:برای عنوان آموزش مقادیر داخل تایتل رو تغیر بدید هر دو به زبان فارسی و انگلیسی هستن
// برتی تغیر توضیحات آموزشی دیسکریپشن هارو تغیر بدید که هر دو به زبان فارسی و انگلیسی هستن
// آیدی و المنت تغیر نکند
// ----------------------------------------------------------------

import type { Lang } from "../../types/type";

export type TourScope =
  | "news-status"
  | "challenge-info"
  | "today-parameters"
  | "evaluation-parameters"
  | "drawdown-chart"
  | "account-statistics"
  | "calendar-analysis"
  | "home"
  | "challengeModal"
  | "TourScope"
  | "trades"
  | "comparison"
  | "ai-trading";

export interface TourStep {
  id: string;

  scope: TourScope;

  element: string;

  order?: number;

  enabled?: boolean;

  side?: "top" | "bottom" | "left" | "right" | "over";

  title: Record<Lang, string>;

  description: Record<Lang, string>;
}

export const tourSteps: TourStep[] = [
  {
    id: "challenge-info-1",
    scope: "challenge-info",
    order: 1,
    // @ts-ignore
    media: { type: "image", src: "/tour/challenge-info-1.png" },
    element: ".step-title",

    side: "bottom",

    title: {
      fa: "اطلاعات چالش",
      en: "Challenge Information",
    },

    description: {
      fa: "در این قسمت اطلاعات کلی چالش نمایش داده می‌شود.",
      en: "General information about the challenge is shown here.",
    },
  },

  {
    id: "challenge-info-2",
    scope: "challenge-info",
    order: 2,

    element: "#step-title2",

    side: "left",

    title: {
      fa: "جدول اطلاعات",
      en: "Information Table",
    },

    description: {
      fa: "تمام اطلاعات حساب در این جدول قرار دارد.",
      en: "All account information is displayed in this table.",
    },
  },

  {
    id: "challenge-info-3",
    scope: "challenge-info",
    order: 3,

    element: "#step-title3",

    side: "top",

    title: {
      fa: "دانلود گزارش",
      en: "Download Report",
    },

    description: {
      fa: "از این قسمت می‌توانید گزارش را دانلود کنید.",
      en: "Download the report from here.",
    },
  },

  {
    id: "dashboard-3",
    scope: "today-parameters",
    order: 4,

    element: "#today1",

    side: "right",

    title: {
      fa: "پارامتر",
      en: "Mentor",
    },

    description: {
      fa: "پارامترهای کنلرلی",
      en: "Contact your mentor here.",
    },
  },

  {
    id: "dashboard-3",
    scope: "today-parameters",
    order: 5,

    element: "#today2",

    side: "right",

    title: {
      fa: "پارامتر",
      en: "Mentor",
    },

    description: {
      fa: "پارامترهای کنلرلی",
      en: "Contact your mentor here.",
    },
  },

  {
    id: "dashboard-3",
    scope: "today-parameters",
    order: 6,

    element: "#today3",

    side: "right",

    title: {
      fa: "پارامتر",
      en: "Mentor",
    },

    description: {
      fa: "پارامترهای کنلرلی",
      en: "Contact your mentor here.",
    },
  },

  {
    id: "dashboard-4",
    scope: "evaluation-parameters",
    order: 7,

    element: "#order1",

    side: "top",

    title: {
      fa: "ارزیابی",
      en: "Education",
    },

    description: {
      fa: "پارامتر ارزیابی-تست",
      en: "Education section",
    },
  },

  {
    id: "dashboard-4",
    scope: "evaluation-parameters",
    order: 8,

    element: "#order2",

    side: "top",

    title: {
      fa: "ارزیابی",
      en: "Education",
    },

    description: {
      fa: "پارامتر ارزیابی-تست",
      en: "Education section",
    },
  },

  {
    id: "account-download",
    scope: "drawdown-chart",
    order: 9,

    element: "#chart1",

    side: "bottom",

    title: {
      fa: "چارت",
      en: "chart",
    },

    description: {
      fa: "توضیحات چارت-تست",
      en: "chart-test",
    },
  },

  {
    id: "account-download",
    scope: "drawdown-chart",
    order: 10,

    element: "#chart2",

    side: "bottom",

    title: {
      fa: "چارت",
      en: "chart",
    },

    description: {
      fa: "توضیحات چارت-تست",
      en: "chart-test",
    },
  },

  {
    id: "account-download",
    scope: "drawdown-chart",
    order: 11,

    element: "#chart3",

    side: "bottom",

    title: {
      fa: "چارت",
      en: "chart",
    },

    description: {
      fa: "توضیحات چارت-تست",
      en: "chart-test",
    },
  },

  {
    id: "account-download",
    scope: "drawdown-chart",
    order: 12,

    element: "#chart4",

    side: "bottom",

    title: {
      fa: "چارت",
      en: "chart",
    },

    description: {
      fa: "توضیحات چارت-تست",
      en: "chart-test",
    },
  },

  {
    id: "account-chart",
    scope: "account-statistics",
    order: 13,

    element: "#detailse1",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },

  {
    id: "account-chart",
    scope: "account-statistics",
    order: 14,

    element: "#detailse2",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  {
    id: "account-chart",
    scope: "account-statistics",
    order: 15,

    element: "#detailse3",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },

  {
    id: "account-chart",
    scope: "account-statistics",
    order: 16,

    element: "#detailse4",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },

  {
    id: "account-chart",
    scope: "account-statistics",
    order: 17,

    element: "#detailse5",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  {
    id: "account-chart",
    scope: "account-statistics",
    order: 18,

    element: "#detailse6",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  {
    id: "account-chart",
    scope: "account-statistics",
    order: 19,

    element: "#detailse7",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  {
    id: "account-chart",
    scope: "account-statistics",
    order: 20,

    element: "#detailse8",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  {
    id: "account-chart",
    scope: "account-statistics",
    order: 21,

    element: "#detailse9",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  {
    id: "account-chart",
    scope: "account-statistics",
    order: 22,

    element: "#detailse10",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },

  {
    id: "account-chart",
    scope: "account-statistics",
    order: 23,

    element: "#detailse11",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  {
    id: "account-chart",
    scope: "account-statistics",
    order: 24,

    element: "#detailse12",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },

  {
    id: "account-chart",
    scope: "account-statistics",
    order: 25,

    element: "#detailse13",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },

  {
    id: "account-chart",
    scope: "account-statistics",
    order: 26,

    element: "#detailse14",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  {
    id: "account-chart",
    scope: "account-statistics",
    order: 27,

    element: "#detailse15",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  {
    id: "account-chart",
    scope: "account-statistics",
    order: 28,

    element: "#detailse16",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  {
    id: "account-chart",
    scope: "account-statistics",
    order: 29,

    element: "#detailse17",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  {
    id: "account-chart",
    scope: "account-statistics",
    order: 30,

    element: "#detailse18",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  {
    id: "account-chart",
    scope: "account-statistics",
    order: 31,

    element: "#detailse19",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  {
    id: "account-chart",
    scope: "account-statistics",
    order: 32,

    element: "#detailse20",

    side: "left",

    title: {
      fa: "آمار",
      en: "Chart",
    },

    description: {
      fa: "آمار-تست",
      en: "Trading chart.",
    },
  },
  // ================= Modal =================

  {
    id: "modal-title",
    scope: "calendar-analysis",
    order: 33,

    element: "#date1",

    side: "bottom",

    title: {
      fa: "تقویمی",
      en: "Modal",
    },

    description: {
      fa: "تحلیل تقویمی",
      en: "This is the first modal section.",
    },
  },

  {
    id: "modal-title",
    scope: "calendar-analysis",
    order: 34,

    element: "#date2",

    side: "bottom",

    title: {
      fa: "تقویمی",
      en: "Modal",
    },

    description: {
      fa: "تحلیل تقویمی",
      en: "This is the first modal section.",
    },
  },

  {
    id: "modal-title",
    scope: "calendar-analysis",
    order: 35,

    element: "#date3",

    side: "bottom",

    title: {
      fa: "تقویمی",
      en: "Modal",
    },

    description: {
      fa: "تحلیل تقویمی",
      en: "This is the first modal section.",
    },
  },

  {
    id: "modal-title",
    scope: "calendar-analysis",
    order: 36,

    element: "#date4",

    side: "bottom",

    title: {
      fa: "تقویمی",
      en: "Modal",
    },

    description: {
      fa: "تحلیل تقویمی",
      en: "This is the first modal section.",
    },
  },

  {
    id: "modal-title",
    scope: "calendar-analysis",
    order: 37,

    element: "#date5",

    side: "bottom",

    title: {
      fa: "تقویمی",
      en: "Modal",
    },

    description: {
      fa: "تحلیل تقویمی",
      en: "This is the first modal section.",
    },
  },

  {
    id: "modal-title",
    scope: "calendar-analysis",
    order: 38,

    element: "#date6",

    side: "bottom",

    title: {
      fa: "تقویمی",
      en: "Modal",
    },

    description: {
      fa: "تحلیل تقویمی",
      en: "This is the first modal section.",
    },
  },

  {
    id: "modal-title",
    scope: "calendar-analysis",
    order: 39,

    element: "#date7",

    side: "bottom",

    title: {
      fa: "تقویمی",
      en: "Modal",
    },

    description: {
      fa: "تحلیل تقویمی",
      en: "This is the first modal section.",
    },
  },

  {
    id: "modal-submit",
    scope: "news-status",
    order: 40,

    element: "#tabale1",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "news-status",
    order: 41,

    element: "#tabale2",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "news-status",
    order: 42,

    element: "#tabale3",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "news-status",
    order: 43,

    element: "#tabale4",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "news-status",
    order: 44,

    element: "#tabale5",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "news-status",
    order: 45,

    element: "#tabale6",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "news-status",
    order: 46,

    element: "#tabale7",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "ai-trading",
    order: 47,

    element: "#ai",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "comparison",
    order: 48,

    element: "#com1",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },
  {
    id: "modal-submit",
    scope: "comparison",
    order: 49,

    element: "#com2",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },
  {
    id: "modal-submit",
    scope: "comparison",
    order: 50,

    element: "#com3",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "comparison",
    order: 51,

    element: "#com4",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "trades",
    order: 52,

    element: "#trade1",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "trades",
    order: 53,

    element: "#trade2",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "trades",
    order: 54,

    element: "#trade3",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  // آموزش صفحه اصلی
  {
    id: "modal-submit",
    scope: "home",
    order: 55,

    element: "#home1",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "home",
    order: 56,

    element: "#home2",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "home",
    order: 57,

    element: "#home3",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },

  {
    id: "modal-submit",
    scope: "home",
    order: 58,

    element: "#home4",

    side: "top",

    title: {
      fa: "ثبت",
      en: "Submit",
    },

    description: {
      fa: "برای ثبت اطلاعات روی این دکمه کلیک کنید.",
      en: "Click here to submit.",
    },
  },
];
