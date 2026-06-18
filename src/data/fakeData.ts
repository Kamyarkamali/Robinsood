import type {
  AccountTrendData,
  AvgWinLossData,
  ChallengeCard,
  ChartData2,
  DisciplineScoreData,
  ProfitFactorData,
  Progres,
  TraderScoreData,
  TradeWinData,
  WeeklyData,
  WeeklyReportRow,
} from "../types/interfaces";

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
          fa: "بالانس 12 شب معیار",
          en: "Midnight Reference Balance",
        },
        value: "$1061.24",
      },
      {
        label: {
          fa: "درادون مجاز روزانه",
          en: "Maximum Daily Drawdown",
        },
        value: "$1,008.18 (5%)",
      },
      {
        label: {
          fa: "فاصله=اکوییتی درادون",
          en: "Distance = Equity - Drawdown",
        },
        value: "$1008.18 - $1070.18 = $62",
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
          fa: "بالانس اولیه",
          en: "Initial Balance",
        },
        value: "$1000",
      },
      {
        label: {
          fa: "درادون مجاز کل",
          en: "Maximum Overall Drawdown",
        },
        value: "$880 (12%)",
      },

      {
        label: {
          fa: "فاصله = اکوییتی - درادون",
          en: "Distance = Equity - Drawdown",
        },
        value: "$190.18 = $1070.18 - $880",
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
          en: "Trading Days",
        },
        value: "8 از 5",
      },
      {
        label: {
          fa: "روزهای مجاز چالش",
          en: "Required Trading Days",
        },
        value: "∞ روز",
      },
      {
        label: {
          fa: "باقی‌مانده تا انفعال",
          en: "Remaining Until Inactive",
        },
        value: "∞",
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
        value: "0.03 از ∞",
      },
      {
        label: {
          fa: "تعداد معاملات امروز",
          en: "Number of Trades Today",
        },
        value: "3",
      },
      {
        label: {
          fa: "میانگین لات امروز",
          en: "Average Lot Size Today",
        },
        value: "0.01",
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
          fa: "ریسک کل",
          en: "Total Risk",
        },
        value: "$6.82",
      },
      {
        label: {
          fa: "ریسک مارجین",
          en: "Margin Risk | SL Risk",
        },
        value: "$1.67 | $5.15",
      },
      {
        label: {
          fa: "MDL | FL",
          en: "MDL | FL",
        },
        value: "(0%) | (0%)",
      },
    ],
  },

  {
    id: "7",
    title: {
      fa: "ترید در خبر",
      en: "News Trading",
    },
    status: "inactive",
    iconColor: "green",
    chart: {
      current: 0,
      max: 7,
      color: "#22c55e",
      bgColor: "#0a2a0a",
    },
    metrics: [
      {
        label: {
          fa: "پر اهمیت",
          en: "High Importance",
        },
        value: "0 از 1",
      },
      {
        label: {
          fa: "اهمیت متوسط",
          en: "Medium Importance",
        },
        value: "0 از 2",
      },
      {
        label: {
          fa: "کم اهمیت",
          en: "Low Importance",
        },
        value: "0 از 7",
      },
    ],
  },
];
// دیتاهای چارت دوم

export const chartsData: ChartData2[] = [
  {
    id: 1,
    title: {
      fa: "میانگین لات",
      en: "Average lot",
    },
    unit: "lot",
    days: [
      { label: { fa: "1 روز", en: "1 day" }, value: 0.01 },
      { label: { fa: "4 روز", en: "4 days" }, value: 0.01 },
      { label: { fa: "6 روز", en: "6 days" }, value: 0.01 },
      { label: { fa: "8 روز", en: "8 days" }, value: 0.01 },
    ],
    averageLine: 0.01,
    maxAllowedLine: 0.008,
    averageValue: 0.01,
    maxAllowedValue: 0.008,
    requiredDays: 8,
    acceptedDays: 5,
  },
  {
    id: 2,
    title: { fa: "مجموع لات", en: "Total Lot" },
    unit: "lot",
    days: [
      { label: { fa: "2 روز", en: "2 days" }, value: 0.04, belowAverage: true },
      { label: { fa: "4 روز", en: "4 days" }, value: 0.1 },
      { label: { fa: "6 روز", en: "6 days" }, value: 0.14 },
      { label: { fa: "8 روز", en: "8 days" }, value: 0.09 },
      { label: { fa: "10 روز", en: "10 days" }, value: 0.08 },
      { label: { fa: "4 روز", en: "4 days" }, value: 0.03, belowAverage: true },
      { label: { fa: "6 روز", en: "6 days" }, value: 0.02, belowAverage: true },
      { label: { fa: "11 روز", en: "11 days" }, value: 0.16, isCurrent: true },
    ],
    averageLine: 0.077,
    maxAllowedLine: 0.062,
    averageValue: 0.077,
    maxAllowedValue: 0.062,
    requiredDays: 5,
    acceptedDays: 5,
  },
  {
    id: 3,
    title: {
      fa: "میانگین زمان",
      en: "Average Time",
    },
    unit: "time",
    days: [
      { label: { fa: "2 روز", en: "2 days" }, value: 56 * 60 + 0 },
      {
        label: { fa: "4 روز", en: "4 days" },
        value: 28 * 60 + 0,
        belowAverage: true,
      },
      {
        label: { fa: "8 روز", en: "8 days" },
        value: 31 * 60 + 0,
        belowAverage: true,
      },
      {
        label: { fa: "11 روز", en: "11 days" },
        value: 1 * 60 + 0,
        belowAverage: true,
      },
    ],
    averageLine: 21 * 60,
    maxAllowedLine: 26 * 60 + 35,
    averageValue: 21 * 60 + 16,
    maxAllowedValue: 26 * 60 + 35,
    requiredDays: 6,
    acceptedDays: 5,
  },
  {
    id: 4,
    title: {
      fa: "مجموع زمان",
      en: "Total Time",
    },
    unit: "time",
    days: [
      { label: { fa: "2 روز", en: "2 days" }, value: 3 * 3600 + 12 * 60 },
      { label: { fa: "4 روز", en: "4 days" }, value: 4 * 3600 + 35 * 60 },
      { label: { fa: "10 روز", en: "10 days" }, value: 3 * 3600 + 18 * 60 },
      { label: { fa: "6 روز", en: "6 days" }, value: 3 * 3600 + 22 * 60 },
      { label: { fa: "8 روز", en: "8 days" }, value: 4 * 3600 + 6 * 60 },
      { label: { fa: "8 روز", en: "8 days" }, value: 0, belowAverage: true },
    ],
    averageLine: 3 * 3600 + 36 * 60,
    maxAllowedLine: 2 * 3600 + 53 * 60 + 20,
    averageValue: 3 * 3600 + 36 * 60 + 40,
    maxAllowedValue: 2 * 3600 + 53 * 60 + 20,
    requiredDays: 6,
    acceptedDays: 5,
  },
  {
    id: 5,
    title: {
      fa: "میانگین قدرت مطلق",
      en: "Average result",
    },
    unit: "currency",
    days: [
      { label: { fa: "2 روز", en: "2 days" }, value: 0.6, belowAverage: true },
      { label: { fa: "5 روز", en: "5 روز" }, value: 2.2 },
      { label: { fa: "6 روز", en: "6 days" }, value: 1.3, belowAverage: true },
      { label: { fa: "10 روز", en: "10 days" }, value: 1.8 },
      { label: { fa: "8 روز", en: "8 days" }, value: 1.4, belowAverage: true },
      { label: { fa: "8 روز", en: "8 days" }, value: 3.5, isCurrent: true },
    ],
    averageLine: 2.45,
    maxAllowedLine: 1.96,
    averageValue: 2.45,
    maxAllowedValue: 1.96,
    requiredDays: 6,
    acceptedDays: 5,
  },
  {
    id: 6,
    title: {
      fa: "میانگین قدرمطلق برایند",
      en: "Total absolute result",
    },
    unit: "currency",
    days: [
      { label: { fa: "2 روز", en: "2 days" }, value: 4, belowAverage: true },
      { label: { fa: "4 روز", en: "4 days" }, value: 32 },
      { label: { fa: "6 روز", en: "6 days" }, value: 29 },
      { label: { fa: "6 روز", en: "6 days" }, value: 18 },
      { label: { fa: "8 روز", en: "8 days" }, value: 18 },
      { label: { fa: "8 روز", en: "8 days" }, value: 8, belowAverage: true },
    ],
    averageLine: 18.06,
    maxAllowedLine: 14.45,
    averageValue: 18.06,
    maxAllowedValue: 14.45,
    requiredDays: 6,
    acceptedDays: 5,
  },
];

export const progressCardsData: Progres[] = [
  {
    id: "profit",
    title: {
      fa: "سود",
      en: "Profit",
    },
    bestegor: {
      fa: "تراکم سوددهی",
      en: "Profit Density",
      value: "25.55%",
    },
    badgeText: {
      fa: "عالی داری پیش میری 👌 چند تا تارگت باقی مونده",
      en: "Great job! You're making excellent progress. Only a few targets remain.",
    },
    badgeType: "success",
    currentValue: 653,
    targetValue: 800,
    currentLabel: {
      fa: "پیشرفت شما",
      en: "Your Progress",
    },

    targetLabel: {
      fa: "تارگت",
      en: "Target",
    },
    currentPercent: 5,
    targetPercent: 8,
    unit: "currency",
  },
  {
    id: "tradingDay",
    title: {
      fa: "روز معاملاتی",
      en: "Trading Days",
    },

    bestegor: {
      fa: "پارامترهای تایید شده",
      en: "Verified Parameters",
      value: "25.55%",
    },
    badgeText: {
      fa: "نیاز داری که تایم بیشتری صرف کنی",
      en: "You need to spend more time trading.",
    },
    badgeType: "danger",
    currentValue: 2,
    targetValue: 5,
    currentLabel: {
      fa: "تعداد روز معاملاتی شما",
      en: "Your Trading Days",
    },

    targetLabel: {
      fa: "تعداد روز مورد نیاز",
      en: "Required Trading Days",
    },
    unit: "day",
  },
];

export const traderScoreData: TraderScoreData = {
  gauges: {
    hopeOfSuccess: 63,
    greedIndex: 20,
    chartUnderstanding: 63,
    tradingSystem: 63,
  },
  stats: {
    bestSymbol: "XAUUSD",
    bestTrade: 342,
    worstTrade: -241,
    totalLots: 32,
  },
  radar: {
    winPercent: 72,
    profitFactor: 55,
    avgWinLoss: 60,
  },
  totalScore: 47.1,
};

export const enTranslations = {
  score: {
    hopeOfSuccess: "Hope of Success",
    greedIndex: "Greed Index",
    chartUnderstanding: "Chart Understanding",
    tradingSystem: "Trading System",
    bestSymbol: "Best Trading Symbol",
    bestTrade: "Best Trade",
    worstTrade: "Worst Trade",
    totalLots: "Total Lots",
    radarTitle: "Trader Score",
    winPercent: "Win %",
    profitFactor: "profit factor",
    avgWinLoss: "avg win/loss",
    yourScore: "Your Score",
  },
};

export const faTranslations = {
  score: {
    hopeOfSuccess: "امید به موفقیت",
    greedIndex: "شاخص طمع",
    chartUnderstanding: "توانایی درک چارت",
    tradingSystem: "نظم معاملاتی",
    bestSymbol: "بیشترین نماد معاملاتی",
    bestTrade: "بهترین معامله",
    worstTrade: "بدترین معامله",
    totalLots: "جمع لات",
    radarTitle: "امتیاز رابین",
    winPercent: "Win %",
    profitFactor: "profit factor",
    avgWinLoss: "avg win/loss",
    yourScore: "امتیاز شما",
  },
};

// -------------------------------------------------------------------
export const accountStatsData: AccountStatsProps = {
  weeklyProfit: 345,
  weeklyLoss: 120,
  weeklyRisk: 2.5,
  accountBalance: 3275,
  accountChange: 1.5,
  totalTrades: 12,
  winRate: 65,
  profitFactor: 1.8,
  avgWinLoss: 2.3,
  tradeWin: 58,
  stabilityScore: 75,
  lastDeposit: 1500,
  initialDeposit: 2500,
};

export const weeklyData: WeeklyData[] = [
  { day: "شنبه", profit: 45, loss: -20 },
  { day: "یکشنبه", profit: 30, loss: -15 },
  { day: "دوشنبه", profit: 60, loss: -25 },
  { day: "سه شنبه", profit: 20, loss: -10 },
  { day: "چهارشنبه", profit: 80, loss: -30 },
  { day: "پنجشنبه", profit: 40, loss: -18 },
  { day: "جمعه", profit: 70, loss: -22 },
];

export const getTranslatedData = (lang: "fa" | "en") => {
  const translations = {
    fa: {
      title: "آمار و جزئیات حساب",
      weeklyReport: "گزارش هفتگی",
      profit: "سود",
      loss: "ضرر",
      risk: "ریسک",
      selectDate: "انتخاب تاریخ",
      days: [
        "شنبه",
        "یکشنبه",
        "دوشنبه",
        "سه شنبه",
        "چهارشنبه",
        "پنجشنبه",
        "جمعه",
      ],
      accountSummary: "برآیند حساب",
      totalBalance: "۱۲ شش معیار",
      vsInitial: "نسبت به دیزوز",
      vsLastDeposit: "نسبت به آخرین تزریق",
      stabilityTitle: "امتیاز ثبات معامله گری",
      stabilityRanges: ["۰ - ۳۰%", "۳۰ - ۵۰%", "۵۰ - ۱۰۰%", "۱۰۰ - ۱۵۰%"],
      profitFactor: "Profit Factor",
      avgWinLoss: "Avg win-loss",
      tradeWin: "Trade Win",
      stabilityNote:
        "در نظر گرفتن امتیاز ثبات معامله گری به بهبود عملکرد شما کمک می‌کند.",
    },
    en: {
      title: "Account Statistics & Details",
      weeklyReport: "Weekly Report",
      profit: "Profit",
      loss: "Loss",
      risk: "Risk",
      selectDate: "Select Date",
      days: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
      accountSummary: "Account Summary",
      totalBalance: "12 Trades",
      vsInitial: "vs Initial",
      vsLastDeposit: "vs Last Deposit",
      stabilityTitle: "Trading Stability Score",
      stabilityRanges: ["0 - 30%", "30 - 50%", "50 - 100%", "100 - 150%"],
      profitFactor: "Profit Factor",
      avgWinLoss: "Avg Win-Loss",
      tradeWin: "Trade Win",
      stabilityNote:
        "Considering the trading stability score helps improve your performance.",
    },
  };
  return translations[lang];
};

export const profitFactor: ProfitFactorData = {
  value: 1.08,
  winPercent: 58,
  lossPercent: 42,
  winLabel: "$911",
  lossLabel: "-$583",
};

export const avgWinLoss: AvgWinLossData = {
  value: 1.06,
  winPercent: 55,
  lossPercent: 45,
  winLabel: "$911",
  lossLabel: "-$583",
};

export const tradeWin: TradeWinData = {
  percent: 50,
  winLabel: "$911",
  lossLabel: "-$583",
};

export const accountTrend: AccountTrendData = {
  amount: 384,
  percentLabel: "۷.۱٪",
  balanceStandard: 10273,
  vsYesterdayPercent: 1.5,
  vsLastTradePercent: -4.3,
};

export const disciplineScore: DisciplineScoreData = {
  score: 0,
  ranges: [
    { label: "۰ - ۳۰٪", color: "red" },
    { label: "۳۰ - ۸۰٪", color: "orange" },
    { label: "۸۰ - ۱۰۰٪", color: "green" },
  ],
};

export const weeklyReport: WeeklyReportRow[] = [
  {
    day: { fa: "شنبه", en: "Saturday" },
    amount: 0,
    winPercent: 0,
    losePercent: 0,
  },
  {
    day: { fa: "یکشنبه", en: "Sunday" },
    amount: 220,
    winPercent: 70,
    losePercent: 30,
  },
  {
    day: { fa: "", en: "Monday" },
    amount: 220,
    winPercent: 70,
    losePercent: 30,
  },
  {
    day: { fa: "سه‌شنبه", en: "Tuesday" },
    amount: 220,
    winPercent: 70,
    losePercent: 30,
  },
  {
    day: { fa: "چهارشنبه", en: "Wednesday" },
    amount: 220,
    winPercent: 70,
    losePercent: 30,
  },
  {
    day: { fa: "پنجشنبه", en: "Thursday" },
    amount: 220,
    winPercent: 70,
    losePercent: 30,
  },
  {
    day: { fa: "جمعه", en: "Friday" },
    amount: 220,
    winPercent: 70,
    losePercent: 30,
  },
];
