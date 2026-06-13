import type { ChallengeCard, ChartData2, Progres } from "../types/interfaces";

export const buttonSection = [
  { id: 1, en: "show all items", fa: "نمایش همه آیتم ها" },
  { id: 2, en: "challenge info", fa: "اطلاعات چالش" },
  { id: 3, en: "today control params", fa: "پارامتر های کنترلی امروز" },
  { id: 4, en: "drawdown chart", fa: "چارت درادون" },
  { id: 5, en: "account stats", fa: "آمار و جزییات حساب" },
  { id: 6, en: "calendar analysis", fa: "تحلیل تقویمی" },
  { id: 7, en: "news status", fa: "وضعیت اخبار" },
  { id: 8, en: "ai trading", fa: "هوش مصنوعی ترید" },
  { id: 9, en: "comparison", fa: "مقایسه با سایرین" },
  { id: 10, en: "trades", fa: "معاملات" },
];

export const challengeCards: ChallengeCard[] = [
  {
    id: "6",
    title: {
      fa: "درادون روزانه",
      en: "Daily Drawdown",
    },
    status: "active",
    iconColor: "green",
    chart: {
      current: 1000,
      max: 5000,
      color: "#22c55e",
      bgColor: "#0a2a0a",
    },
    metrics: [
      {
        label: {
          fa: "درادون مجاز امروز",
          en: "Today's Maximum Drawdown",
        },
        value: "$9500 (5%)",
      },
      {
        label: {
          fa: "فاصله تا درادون روزانه",
          en: "Remaining Daily Drawdown",
        },
        value: "",
      },
      {
        type: "orange",
        text: {
          fa: "مصرف شده",
          en: "Used",
        },
      },
      {
        type: "blue",
        text: {
          fa: "مانده",
          en: "Remaining",
        },
      },
    ],
  },

  {
    id: "5",
    title: {
      fa: "درادون کل",
      en: "Overall Drawdown",
    },
    status: "active",
    iconColor: "green",
    chart: {
      current: 2000,
      max: 5000,
      color: "#22c55e",
      bgColor: "#0a2a0a",
    },
    metrics: [
      {
        label: {
          fa: "درادون مجاز امروز",
          en: "Maximum Daily Drawdown",
        },
        value: "$9500 (5%)",
      },
      {
        label: {
          fa: "فاصله تا درادون روزانه",
          en: "Remaining Daily Drawdown",
        },
        value: "",
      },
      {
        type: "orange",
        text: {
          fa: "مصرف شده",
          en: "Used",
        },
      },
      {
        type: "blue",
        text: {
          fa: "مانده",
          en: "Remaining",
        },
      },
    ],
  },

  {
    id: "4",
    title: {
      fa: "روزهای معاملاتی",
      en: "Trading Days",
    },
    status: "active",
    iconColor: "green",
    chart: {
      current: 3000,
      max: 5000,
      color: "#22c55e",
      bgColor: "#0a2a0a",
    },
    metrics: [
      {
        label: {
          fa: "تعداد روزهای معاملاتی",
          en: "Number of Trading Days",
        },
        value: "3 / 5",
      },
      {
        label: {
          fa: "روزهای مجاز چالش",
          en: "Required Trading Days",
        },
        value: "4 Days to Unlimited",
      },
    ],
  },

  {
    id: "3",
    title: {
      fa: "لات",
      en: "Lot",
    },
    status: "inactive",
    iconColor: "red",
    chart: {
      current: 3750,
      max: 5000,
      color: "#ef4444",
      bgColor: "#2a0a0a",
    },
    metrics: [
      {
        label: {
          fa: "لات مجاز امروز",
          en: "Maximum Lot Size Today",
        },
        value: "1.5 / 2",
      },
      {
        label: {
          fa: "تعداد معاملات امروز",
          en: "Number of Trades Today",
        },
        value: "5",
      },
      {
        label: {
          fa: "میانگین لات امروز",
          en: "Average Lot Size Today",
        },
        value: "0.3",
      },
    ],
  },

  {
    id: "1",
    title: {
      fa: "درگیری حساب",
      en: "Account Exposure",
    },
    status: "inactive",
    iconColor: "yellow",
    chart: {
      current: 2250,
      max: 5000,
      color: "#eab308",
      bgColor: "#2a2200",
    },
    metrics: [
      {
        label: {
          fa: "MDL",
          en: "MDL",
        },
        value: "300000",
      },
      {
        label: {
          fa: "",
          en: "",
        },
        value: "3900$ (5%)",
      },
      {
        label: {
          fa: "FL",
          en: "FL",
        },
        value: "",
      },
      {
        label: {
          fa: "",
          en: "",
        },
        value: "3900$ (5%)",
      },
    ],
  },

  {
    id: "2",
    title: {
      fa: "درگیری حساب",
      en: "Account Exposure",
    },
    status: "inactive",
    iconColor: "yellow",
    chart: {
      current: 1500,
      max: 5000,
      color: "#eab308",
      bgColor: "#2a2200",
    },
    metrics: [
      {
        label: {
          fa: "ریسک کل",
          en: "Total Risk",
        },
        value: "$35 (0.55%)",
      },
      {
        label: {
          fa: "SL",
          en: "SL",
        },
        value: "0.3",
      },
      {
        label: {
          fa: "ریسک مارجین",
          en: "Margin Risk",
        },
        value: "$35 (0.55%)",
      },
    ],
  },
];

// دیتاهای چارت دوم

export const chartsData: ChartData2[] = [
  {
    id: 1,
    title: "میانگین معاملات",
    days: [
      { label: "روز اول", value: 0.18, color: "#E53935" },
      { label: "روز دوم", value: 0.52, color: "#FDD835" },
      { label: "روز سوم", value: 0.72, color: "#1E88E5" },
      { label: "روز چهارم", value: 1.0, color: "#43A047" },
    ],
    averageLine: 0.68,
    plusPercent: 20,
    minusPercent: -20,
  },
  {
    id: 2,
    title: "میانگین معاملات",
    days: [
      { label: "روز اول", value: 0.18, color: "#E53935" },
      { label: "روز دوم", value: 0.52, color: "#FDD835" },
      { label: "روز سوم", value: 0.72, color: "#1E88E5" },
      { label: "روز چهارم", value: 1.0, color: "#43A047" },
    ],
    averageLine: 0.68,
    plusPercent: 20,
    minusPercent: -20,
  },
  {
    id: 3,
    title: "میانگین معاملات",
    days: [
      { label: "روز اول", value: 0.18, color: "#E53935" },
      { label: "روز دوم", value: 0.52, color: "#FDD835" },
      { label: "روز سوم", value: 0.72, color: "#1E88E5" },
      { label: "روز چهارم", value: 1.0, color: "#43A047" },
    ],
    averageLine: 0.68,
    plusPercent: 20,
    minusPercent: -20,
  },
  {
    id: 4,
    title: "میانگین معاملات",
    days: [
      { label: "روز اول", value: 0.18, color: "#E53935" },
      { label: "روز دوم", value: 0.52, color: "#FDD835" },
      { label: "روز سوم", value: 0.72, color: "#1E88E5" },
      { label: "روز چهارم", value: 1.0, color: "#43A047" },
    ],
    averageLine: 0.68,
    plusPercent: 20,
    minusPercent: -20,
  },
  {
    id: 5,
    title: "میانگین معاملات",
    days: [
      { label: "روز اول", value: 0.18, color: "#E53935" },
      { label: "روز دوم", value: 0.52, color: "#FDD835" },
      { label: "روز سوم", value: 0.72, color: "#1E88E5" },
      { label: "روز چهارم", value: 1.0, color: "#43A047" },
    ],
    averageLine: 0.68,
    plusPercent: 20,
    minusPercent: -20,
  },
  {
    id: 6,
    title: "میانگین معاملات",
    days: [
      { label: "روز اول", value: 0.18, color: "#E53935" },
      { label: "روز دوم", value: 0.52, color: "#FDD835" },
      { label: "روز سوم", value: 0.72, color: "#1E88E5" },
      { label: "روز چهارم", value: 1.0, color: "#43A047" },
    ],
    averageLine: 0.68,
    plusPercent: 20,
    minusPercent: -20,
  },
];

export const progressCardsData: Progres[] = [
  {
    id: "profit",
    title: "سود",
    badgeText: "عالی داری پیش میری . چند تا تارگت باقی مونده .",
    badgeType: "success",
    currentValue: 653,
    targetValue: 800,
    currentLabel: "پیشرفت شما",
    targetLabel: "تارگت",
    currentPercent: 5,
    targetPercent: 8,
    unit: "currency",
  },
  {
    id: "tradingDay",
    title: "روز معاملاتی",
    badgeText: "نیاز داری که تایم بیشتری صرف کنی .",
    badgeType: "danger",
    currentValue: 2,
    targetValue: 5,
    currentLabel: "تعداد روز معاملاتی شما",
    targetLabel: "تعداد روز مورد نیاز",
    unit: "day",
  },
];
