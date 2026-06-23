import type { ChartCustomSettings } from "../components/common/ChartCustomSettings";
import type {
  AccountStatsProps,
  AccountTrendData,
  AvgWinLossData,
  BilingualText,
  BilingualTexts,
  CapitalRow,
  ChallengeCard,
  ChartData2,
  DataPoint,
  DayDatas,
  DisciplineScoreData,
  MetricRow,
  MiddleRow,
  NewsItem,
  Parameter,
  ProfitFactorData,
  Progres,
  StatsRow,
  SummaryCard,
  Trade,
  TraderScoreData,
  TradeWinData,
  WeeklyData,
  WeeklyReportRow,
} from "../types/interfaces";
import type {
  DateKey,
  Lang,
  NewsFilter,
  ParamKey,
  Period,
  TradeStatus,
  Week,
} from "../types/type";

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
  winLabel: "611 $",
  lossLabel: "-583 $",
};

export const tradeWin: TradeWinData = {
  percent: 50,
  winLabel: "$ 611",
  lossLabel: "-$ 583",
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

export const statsData: StatsRow[] = [
  { labelFa: "تعداد کل معاملات", labelEn: "Total Trades", value: "۲۱" },
  { labelFa: "معاملات موفق", labelEn: "Winning Trades", value: "۴" },
  { labelFa: "معاملات ناموفق", labelEn: "Losing Trades", value: "۱۷" },
  {
    labelFa: "بهترین معامله (دلار)",
    labelEn: "Best Trade ($)",
    value: "-۴۸.۶",
    valueColor: "red",
  },
  {
    labelFa: "بدترین معامله (دلار)",
    labelEn: "Worst Trade ($)",
    value: "-۵۱.۵۲",
    valueColor: "red",
  },
  {
    labelFa: "میانگین سود (دلار)",
    labelEn: "Avg Win ($)",
    value: "-۲۵.۱۹",
    valueColor: "red",
  },
  {
    labelFa: "میانگین ضرر (دلار)",
    labelEn: "Avg Loss ($)",
    value: "-۳۵.۱۳",
    valueColor: "red",
  },
  {
    labelFa: "میانگین سود (پیپ)",
    labelEn: "Avg Win (pip)",
    value: "-۳۵۱",
    valueColor: "red",
  },
  {
    labelFa: "میانگین ضرر (پیپ)",
    labelEn: "Avg Loss (pip)",
    value: "-۵۴",
    valueColor: "red",
  },
  {
    labelFa: "برآیند معاملات (پیپ)",
    labelEn: "Trade Result (pip)",
    value: "-۵۱۷۰",
    valueColor: "red",
  },
  {
    labelFa: "تعداد / درصد پیروزی معاملات Long",
    labelEn: "Long Win Count / %",
    value: "۳ / ۲۷%",
  },
  {
    labelFa: "تعداد / درصد پیروزی معاملات short",
    labelEn: "Short Win Count / %",
    value: "۱ / ۱۰%",
  },
];

export const middleData: MiddleRow[] = [
  {
    valueFa: "۳.۹۳",
    valueEn: "3.93",
    labelFa: "مجموع حجم معاملات (لات)",
    labelEn: "Total Volume (lot)",
  },
  {
    valueFa: "۰۰:۰۰:۳۹",
    valueEn: "00:00:39",
    labelFa: "کمترین زمان معاملات",
    labelEn: "Min Trade Duration",
  },
  {
    valueFa: "۷:۰:۰۰",
    valueEn: "7:00:00",
    labelFa: "بیشترین زمان معاملات",
    labelEn: "Max Trade Duration",
  },
  {
    valueFa: "۰۰:۵۱:۷",
    valueEn: "00:51:07",
    labelFa: "میانگین زمان معاملات",
    labelEn: "Avg Trade Duration",
  },
  {
    valueFa: "۲",
    valueEn: "2",
    labelFa: "تعداد جفت ارزها",
    labelEn: "Currency Pairs",
  },
  {
    valueFa: "XAUUSDp/۲۰",
    valueEn: "XAUUSDp/20",
    labelFa: "نوع / تعداد بیشترین نماد معاملاتی",
    labelEn: "Most Traded Symbol / Count",
  },
  {
    valueFa: "US۳۰Rollp/۱",
    valueEn: "US30Rollp/1",
    labelFa: "نوع / تعداد کمترین نماد معاملاتی",
    labelEn: "Least Traded Symbol / Count",
  },
  {
    valueFa: "-۱۲.۷۸",
    valueEn: "-12.78",
    labelFa: "مجموع کمیسیون (دلار)",
    labelEn: "Total Commission ($)",
    valueColor: "red",
  },
  {
    valueFa: "۰",
    valueEn: "0",
    labelFa: "تعداد معاملات سوآپ / در تایم خبر",
    labelEn: "Swap / News Trades",
  },
  {
    valueFa: "۴",
    valueEn: "4",
    labelFa: "تعداد معاملات بدون ریسک (Risk Free)",
    labelEn: "Risk-Free Trades",
  },
  {
    valueFa: "۲",
    valueEn: "2",
    labelFa: "تعداد معاملات بدون استاپ لاس (non-SL)",
    labelEn: "Trades Without SL (non-SL)",
  },
  {
    valueFa: "۲",
    valueEn: "2",
    labelFa: "تعداد معاملات بدون تارگت (non-TP)",
    labelEn: "Trades Without TP (non-TP)",
  },
];

export const capitalData: CapitalRow[] = [
  {
    value: "۰.۱۷",
    labelFa: "پرافیت فکتور (Profit Factor)",
    labelEn: "Profit Factor",
  },
  {
    value: "۱۹",
    labelFa: "درصد سوددهی (Profitability)",
    labelEn: "Profitability",
  },
  {
    value: "۰.۰۰",
    labelFa: "انحراف معیار (Standard Deviation)",
    labelEn: "Standard Deviation",
  },
  {
    value: "۰.۰۰",
    labelFa: "نسبت شارپ (Sharpe Ratio)",
    labelEn: "Sharpe Ratio",
  },
  {
    value: "۳۳.۲۳",
    labelFa: "انتظار سوددهی (Profit Expectancy)",
    labelEn: "Profit Expectancy",
  },
  {
    value: "۳.۶۹",
    labelFa: "شاخص سوددهی (Profit Index)",
    labelEn: "Profit Index",
  },
  {
    value: "۵۵.۴۸",
    labelFa: "شاخص ضرردهی (Loss Index)",
    labelEn: "Loss Index",
  },
  {
    value: "۱",
    labelFa: "تعداد معاملات زیر ۱ دقیقه",
    labelEn: "Trades Under 1 Min",
  },
  {
    value: "-.۳۳۳",
    labelFa: "برآیند معاملات زیر ۱ دقیقه (دلار)",
    labelEn: "Result Under 1 Min ($)",
    valueColor: "red",
  },
  {
    value: "۵۰۰۰.۰۰",
    labelFa: "بالانس معیار امروز (دلار)",
    labelEn: "Today's Balance ($)",
  },
  {
    value: "۳۲.۱۵",
    labelFa: "میانگین ریسک معاملات",
    labelEn: "Avg Trade Risk",
  },
  {
    value: "۰.۰۰",
    labelFa: "مجموع ریسک روزانه (Daily Risk)",
    labelEn: "Daily Risk",
  },
];

export const translations = {
  fa: {
    panelTitle: "ارز های معامله شده",
    cards: [
      {
        id: "riskReward",
        title: { fa: "ریسک به ریوارد", en: "Risk to Reward" },
        valueLabelSuffix: "",
      },
      {
        id: "todayTrend",
        title: { fa: "برآیند امروز", en: "Today's Result" },
        valueLabelSuffix: "",
      },
      {
        id: "todayTrades",
        title: { fa: "تعداد\nترید امروز", en: "Today's\nTrade Count" },
        valueLabelSuffix: "",
      },
      {
        id: "tradeCount",
        title: { fa: "شمارنده ترید", en: "Trade Counter" },
        valueLabelSuffix: "",
      },
      {
        id: "maxWinStreak",
        title: {
          fa: "رکورد بیشترین\nسود متوالی",
          en: "Max Consecutive\nWin Streak",
        },
        valueLabelSuffix: "",
      },
      {
        id: "maxLossStreak",
        title: {
          fa: "رکورد بیشترین\nضرر متوالی",
          en: "Max Consecutive\nLoss Streak",
        },
        valueLabelSuffix: "",
      },
    ],
    tooltipValue: "مقدار",
    tooltipTrade: "ترید",
    tooltipOpen: "باز",
    tooltipClose: "بسته",
    tooltipHigh: "بالا",
    tooltipLow: "پایین",
    tooltipDate: "تاریخ",
  },
};

export const donutAssets = [
  { name: "XAUUSD", value: 55, color: "#F5A623" },
  { name: "XAUUSD", value: 20, color: "#9B59B6" },
  { name: "XAUUSD", value: 15, color: "#5B6EF5" },
  { name: "XAUUSD", value: 10, color: "#8E8E93" },
];

export const areaDataRiskReward = [
  { t: "1", v: 10 },
  { t: "2", v: 18 },
  { t: "3", v: 15 },
  { t: "4", v: 22 },
  { t: "5", v: 28 },
  { t: "6", v: 24 },
  { t: "7", v: 33 },
  { t: "8", v: 38 },
  { t: "9", v: 42 },
  { t: "10", v: 50 },
];

export const areaDataTodayTrend = [
  { t: "1", v: 5 },
  { t: "2", v: 12 },
  { t: "3", v: 10 },
  { t: "4", v: 20 },
  { t: "5", v: 30 },
  { t: "6", v: 38 },
  { t: "7", v: 35 },
  { t: "8", v: 48 },
  { t: "9", v: 55 },
  { t: "10", v: 60 },
];

export const areaDataTodayTrades = [
  { t: "1", v: 8 },
  { t: "2", v: 15 },
  { t: "3", v: 12 },
  { t: "4", v: 22 },
  { t: "5", v: 30 },
  { t: "6", v: 28 },
  { t: "7", v: 38 },
  { t: "8", v: 45 },
  { t: "9", v: 50 },
  { t: "10", v: 58 },
];

export const areaDataMaxWin = [
  { t: "1", v: 50 },
  { t: "2", v: 42 },
  { t: "3", v: 38 },
  { t: "4", v: 28 },
  { t: "5", v: 20 },
  { t: "6", v: 15 },
  { t: "7", v: 10 },
  { t: "8", v: 8 },
  { t: "9", v: 12 },
  { t: "10", v: 5 },
];

export const areaDataMaxLoss = [
  { t: "1", v: 5 },
  { t: "2", v: 12 },
  { t: "3", v: 18 },
  { t: "4", v: 22 },
  { t: "5", v: 30 },
  { t: "6", v: 38 },
  { t: "7", v: 50 },
  { t: "8", v: 58 },
  { t: "9", v: 55 },
  { t: "10", v: 62 },
];

export const candlestickData = [
  { t: "1", open: 30, close: 45, high: 50, low: 25 },
  { t: "2", open: 45, close: 35, high: 48, low: 30 },
  { t: "3", open: 35, close: 55, high: 60, low: 32 },
  { t: "4", open: 55, close: 42, high: 58, low: 38 },
  { t: "5", open: 42, close: 62, high: 65, low: 40 },
  { t: "6", open: 62, close: 50, high: 65, low: 45 },
  { t: "7", open: 50, close: 38, high: 52, low: 35 },
  { t: "8", open: 38, close: 58, high: 62, low: 36 },
  { t: "9", open: 58, close: 45, high: 60, low: 40 },
  { t: "10", open: 45, close: 35, high: 48, low: 30 },
  { t: "11", open: 35, close: 52, high: 55, low: 32 },
  { t: "12", open: 52, close: 40, high: 55, low: 36 },
  { t: "13", open: 40, close: 60, high: 63, low: 38 },
  { t: "14", open: 60, close: 48, high: 62, low: 44 },
  { t: "15", open: 48, close: 36, high: 50, low: 32 },
];

export const defaultSettings: ChartCustomSettings = {
  colors: {
    primary: "#7c3aed",
    secondary: "#a855f7",
    accent: "#b06aff",
    grid: "#e8e2f8",
    text: "#a0a0c0",
    background: "transparent",
    candleUp: "#a855f7",
    candleDown: "#5b21b6",
  },
  lineWidths: {
    main: 2.2,
    secondary: 1.6,
    grid: 0.6,
  },
  display: {
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showLabels: true,
    showCandles: true,
    showAreas: true,
  },
  sizes: {
    chartHeight: 320,
    fontSize: 9,
    barSize: 2,
    padding: 8,
  },
  effects: {
    shadow: true,
    glow: true,
    animation: true,
    smooth: true,
  },
  axis: {
    showXAxis: true,
    showYAxis: true,
    gridLines: true,
    tickCount: 4,
  },
};

// fake data tabale2
export const i18n: Record<
  Lang,
  {
    title: string;
    pp: string;
    dp: string;
    psec: string;
    dsec: string;
    params: { v: ParamKey; l: string }[];
    dates: { v: DateKey; l: string }[];
    mpdl: string;
    stitle: string;
    du: string;
    tu: string;
    wds: string[];
  }
> = {
  fa: {
    title: "تحلیل تقویمی",
    pp: "انتخاب پارامتر",
    dp: "انتخاب تاریخ",
    psec: "پارامتر",
    dsec: "بازه زمانی",
    params: [
      { v: "pnl", l: "سود و زیان" },
      { v: "winrate", l: "نرخ برد" },
      { v: "trades", l: "تعداد معاملات" },
      { v: "rr", l: "نسبت ریسک/ریوارد" },
    ],
    dates: [
      { v: "dec24", l: "دسامبر ۲۰۲۴" },
      { v: "nov24", l: "نوامبر ۲۰۲۴" },
      { v: "oct24", l: "اکتبر ۲۰۲۴" },
      { v: "q4_24", l: "کوارتر ۴ – ۲۰۲۴" },
      { v: "q3_24", l: "کوارتر ۳ – ۲۰۲۴" },
    ],
    mpdl: "سودآورترین روز",
    stitle: "طولانی‌ترین استریک",
    du: "روز",
    tu: "معامله",
    wds: [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنج‌شنبه",
      "جمعه",
    ],
  },
  en: {
    title: "Calendar Analysis",
    pp: "Select Parameter",
    dp: "Select Date",
    psec: "Parameter",
    dsec: "Time Range",
    params: [
      { v: "pnl", l: "Profit & Loss" },
      { v: "winrate", l: "Win Rate" },
      { v: "trades", l: "Trade Count" },
      { v: "rr", l: "Risk / Reward" },
    ],
    dates: [
      { v: "dec24", l: "December 2024" },
      { v: "nov24", l: "November 2024" },
      { v: "oct24", l: "October 2024" },
      { v: "q4_24", l: "Q4 – 2024" },
      { v: "q3_24", l: "Q3 – 2024" },
    ],
    mpdl: "Most Profitable Day",
    stitle: "Longest Streak",
    du: "days",
    tu: "trade",
    wds: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  },
};

// ============== Build Days Helper ==============
export const buildDays = (
  startDay: number,
  totalDays: number,
  prevMonthDays: number,
  currentMonth: number,
) => {
  const days: DayDatas[] = [];

  for (let i = startDay; i > 0; i--) {
    days.push({ d: prevMonthDays - i + 1, m: currentMonth - 1 });
  }

  for (let i = 1; i <= totalDays; i++) {
    days.push({ d: i, m: currentMonth });
  }

  const remaining = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    days.push({ d: i, m: currentMonth + 1 });
  }

  return days;
};

// ============== Generate Data ==============
export const dec24Days = buildDays(1, 31, 30, 11);
dec24Days[12] = { ...dec24Days[12], p: 1250, t: 5 };
dec24Days[27] = { ...dec24Days[27], p: 1800, t: 6 };
dec24Days[28] = { ...dec24Days[28], p: -200, t: 6 };

export const nov24Days = buildDays(5, 30, 31, 10);
nov24Days[10] = { ...nov24Days[10], p: 980, t: 4 };
nov24Days[15] = { ...nov24Days[15], p: -150, t: 3 };
nov24Days[24] = { ...nov24Days[24], p: 620, t: 5 };

export const oct24Days = buildDays(2, 31, 30, 9);
oct24Days[17] = { ...oct24Days[17], p: 2100, t: 7 };
oct24Days[22] = { ...oct24Days[22], p: -400, t: 3 };
oct24Days[30] = { ...oct24Days[30], p: 750, t: 4 };

export const q4Days = buildDays(2, 92, 30, 9);
q4Days[17] = { ...q4Days[17], p: 2100, t: 7 };
q4Days[22] = { ...q4Days[22], p: -400, t: 3 };
q4Days[30] = { ...q4Days[30], p: 750, t: 4 };
q4Days[40] = { ...q4Days[40], p: 980, t: 4 };
q4Days[45] = { ...q4Days[45], p: -150, t: 3 };
q4Days[54] = { ...q4Days[54], p: 620, t: 5 };
q4Days[78] = { ...q4Days[78], p: 1250, t: 5 };
q4Days[93] = { ...q4Days[93], p: 1800, t: 6 };
q4Days[94] = { ...q4Days[94], p: -200, t: 6 };

export const q3Days = buildDays(1, 92, 30, 6);
q3Days[12] = { ...q3Days[12], p: 550, t: 3 };
q3Days[18] = { ...q3Days[18], p: -200, t: 2 };
q3Days[24] = { ...q3Days[24], p: 1100, t: 5 };
q3Days[25] = { ...q3Days[25], p: 3200, t: 8 };
q3Days[30] = { ...q3Days[30], p: -90, t: 1 };

// ============== Calendar Data with Lang Support ==============
type StrData = {
  s: string;
  e: string;
  d: number;
  t: number;
  w: number;
  l: number;
};

type MpdData = {
  date: string;
  pnl: number;
};

export const CD: Record<
  DateKey,
  {
    mpd: MpdData;
    str: StrData;
    cur: number;
    days: DayDatas[];
  }
> = {
  dec24: {
    mpd: { date: "Dec 10, 2024", pnl: 1250 },
    str: { s: "Dec 10, 2024", e: "Dec 19, 2024", d: 7, t: 19, w: 20, l: 1 },
    cur: 11,
    days: dec24Days,
  },
  nov24: {
    mpd: { date: "Nov 5, 2024", pnl: 980 },
    str: { s: "Nov 4, 2024", e: "Nov 9, 2024", d: 5, t: 14, w: 12, l: 2 },
    cur: 10,
    days: nov24Days,
  },
  oct24: {
    mpd: { date: "Oct 15, 2024", pnl: 2100 },
    str: { s: "Oct 14, 2024", e: "Oct 18, 2024", d: 4, t: 11, w: 9, l: 2 },
    cur: 9,
    days: oct24Days,
  },
  q4_24: {
    mpd: { date: "Oct 15, 2024", pnl: 2100 },
    str: { s: "Dec 10, 2024", e: "Dec 19, 2024", d: 7, t: 19, w: 20, l: 1 },
    cur: 11,
    days: q4Days,
  },
  q3_24: {
    mpd: { date: "Aug 22, 2024", pnl: 3200 },
    str: { s: "Aug 20, 2024", e: "Aug 27, 2024", d: 6, t: 22, w: 18, l: 4 },
    cur: 7,
    days: q3Days,
  },
};

// ============== Localized Calendar Data ==============
export const CDLocalized: Record<
  Lang,
  Record<
    DateKey,
    {
      mpd: { date: string; pnl: number };
      str: { s: string; e: string; d: number; t: number; w: number; l: number };
      cur: number;
      days: DayDatas[];
    }
  >
> = {
  fa: {
    dec24: {
      mpd: { date: "۱۰ دسامبر ۲۰۲۴", pnl: 1250 },
      str: {
        s: "۱۰ دسامبر ۲۰۲۴",
        e: "۱۹ دسامبر ۲۰۲۴",
        d: 7,
        t: 19,
        w: 20,
        l: 1,
      },
      cur: 11,
      days: dec24Days,
    },
    nov24: {
      mpd: { date: "۵ نوامبر ۲۰۲۴", pnl: 980 },
      str: { s: "۴ نوامبر ۲۰۲۴", e: "۹ نوامبر ۲۰۲۴", d: 5, t: 14, w: 12, l: 2 },
      cur: 10,
      days: nov24Days,
    },
    oct24: {
      mpd: { date: "۱۵ اکتبر ۲۰۲۴", pnl: 2100 },
      str: { s: "۱۴ اکتبر ۲۰۲۴", e: "۱۸ اکتبر ۲۰۲۴", d: 4, t: 11, w: 9, l: 2 },
      cur: 9,
      days: oct24Days,
    },
    q4_24: {
      mpd: { date: "۱۵ اکتبر ۲۰۲۴", pnl: 2100 },
      str: {
        s: "۱۰ دسامبر ۲۰۲۴",
        e: "۱۹ دسامبر ۲۰۲۴",
        d: 7,
        t: 19,
        w: 20,
        l: 1,
      },
      cur: 11,
      days: q4Days,
    },
    q3_24: {
      mpd: { date: "۲۲ آگوست ۲۰۲۴", pnl: 3200 },
      str: { s: "۲۰ آگوست ۲۰۲۴", e: "۲۷ آگوست ۲۰۲۴", d: 6, t: 22, w: 18, l: 4 },
      cur: 7,
      days: q3Days,
    },
  },
  en: {
    dec24: {
      mpd: { date: "Dec 10, 2024", pnl: 1250 },
      str: { s: "Dec 10, 2024", e: "Dec 19, 2024", d: 7, t: 19, w: 20, l: 1 },
      cur: 11,
      days: dec24Days,
    },
    nov24: {
      mpd: { date: "Nov 5, 2024", pnl: 980 },
      str: { s: "Nov 4, 2024", e: "Nov 9, 2024", d: 5, t: 14, w: 12, l: 2 },
      cur: 10,
      days: nov24Days,
    },
    oct24: {
      mpd: { date: "Oct 15, 2024", pnl: 2100 },
      str: { s: "Oct 14, 2024", e: "Oct 18, 2024", d: 4, t: 11, w: 9, l: 2 },
      cur: 9,
      days: oct24Days,
    },
    q4_24: {
      mpd: { date: "Oct 15, 2024", pnl: 2100 },
      str: { s: "Dec 10, 2024", e: "Dec 19, 2024", d: 7, t: 19, w: 20, l: 1 },
      cur: 11,
      days: q4Days,
    },
    q3_24: {
      mpd: { date: "Aug 22, 2024", pnl: 3200 },
      str: { s: "Aug 20, 2024", e: "Aug 27, 2024", d: 6, t: 22, w: 18, l: 4 },
      cur: 7,
      days: q3Days,
    },
  },
};
// fake data chaart 3
export const DAILY_DATA: DataPoint[] = [
  {
    date: { fa: "شنبه ۱۴۰۳/۱۰/۳۰", en: "Sat 2025/01/19" },
    param1: 100,
    param2: 75,
  },
  {
    date: { fa: "شنبه ۱۴۰۳/۱۰/۳۰", en: "Sat 2025/01/20" },
    param1: 130,
    param2: 110,
  },
  {
    date: { fa: "شنبه ۱۴۰۳/۱۰/۳۰", en: "Sat 2025/01/21" },
    param1: 165,
    param2: 220,
  },
  {
    date: { fa: "شنبه ۱۴۰۳/۱۰/۳۰", en: "Sat 2025/01/22" },
    param1: 30,
    param2: 45,
  },
  {
    date: { fa: "شنبه ۱۴۰۳/۱۰/۳۰", en: "Sat 2025/01/23" },
    param1: 150,
    param2: 195,
  },
  {
    date: { fa: "شنبه ۱۴۰۳/۱۰/۳۰", en: "Sat 2025/01/24" },
    param1: 145,
    param2: 195,
  },
  {
    date: { fa: "شنبه ۱۴۰۳/۱۰/۳۰", en: "Sat 2025/01/25" },
    param1: 40,
    param2: 55,
  },
];

export const WEEKLY_DATA: DataPoint[] = [
  { date: { fa: "هفته ۱", en: "Week 1" }, param1: 420, param2: 310 },
  { date: { fa: "هفته ۲", en: "Week 2" }, param1: 380, param2: 490 },
  { date: { fa: "هفته ۳", en: "Week 3" }, param1: 510, param2: 420 },
  { date: { fa: "هفته ۴", en: "Week 4" }, param1: 290, param2: 600 },
];

export const MONTHLY_DATA: DataPoint[] = [
  { date: { fa: "فروردین", en: "Apr" }, param1: 1200, param2: 980 },
  { date: { fa: "اردیبهشت", en: "May" }, param1: 1540, param2: 1200 },
  { date: { fa: "خرداد", en: "Jun" }, param1: 980, param2: 1450 },
  { date: { fa: "تیر", en: "Jul" }, param1: 1750, param2: 1100 },
  { date: { fa: "مرداد", en: "Aug" }, param1: 1380, param2: 1680 },
  { date: { fa: "شهریور", en: "Sep" }, param1: 2100, param2: 1900 },
];

export const PARAMETERS: Parameter[] = [
  { id: "volume", label: { fa: "پارامتر 2", en: "Parametr 2" } },
  { id: "price", label: { fa: "پارامتر 1", en: "Parametr 1" } },
  { id: "turnover", label: { fa: "ارزش معاملات", en: "Turnover" } },
  { id: "trades", label: { fa: "تعداد معاملات", en: "Trades" } },
  { id: "change", label: { fa: "درصد تغییر", en: "% Change" } },
];

export const PERIOD_LABELS: Record<Period, { fa: string; en: string }> = {
  daily: { fa: "روزانه", en: "Daily" },
  weekly: { fa: "هفتگی", en: "Weekly" },
  monthly: { fa: "ماهانه", en: "Monthly" },
};

export const DATA_MAP: Record<Period, DataPoint[]> = {
  daily: DAILY_DATA,
  weekly: WEEKLY_DATA,
  monthly: MONTHLY_DATA,
};

export const FA_DIGITS: Record<string, string> = {
  "0": "۰",
  "1": "۱",
  "2": "۲",
  "3": "۳",
  "4": "۴",
  "5": "۵",
  "6": "۶",
  "7": "۷",
  "8": "۸",
  "9": "۹",
};

// fainal tabale
export const ALL_DATA: Record<Week, NewsItem[]> = {
  week1: [
    {
      symbol: "USD",
      flag: "🇺🇸",
      day: { fa: "سه‌شنبه ۱۴۰۴/۰۷/۰۱", en: "Tue 2025/09/23" },
      time: "۱۷:۲۵",
      news: { fa: "شاخص فروش اتومبیل آمریکا", en: "US Auto Sales Index" },
      impact: "red",
      tradeable: true,
      status: { fa: "معامله نشده", en: "No Trade" },
    },
    {
      symbol: "EUR",
      flag: "🇪🇺",
      day: { fa: "سه‌شنبه ۱۴۰۴/۰۷/۰۱", en: "Tue 2025/09/23" },
      time: "۱۸:۰۰",
      news: { fa: "نرخ تورم منطقه یورو", en: "Eurozone Inflation Rate" },
      impact: "red",
      tradeable: false,
      status: { fa: "ترید ممنوع", en: "Trade Banned" },
    },
    {
      symbol: "GBP",
      flag: "🇬🇧",
      day: { fa: "چهارشنبه ۱۴۰۴/۰۷/۰۳", en: "Wed 2025/09/24" },
      time: "۱۴:۳۰",
      news: { fa: "نرخ بهره بانک انگلستان", en: "Bank of England Rate" },
      impact: "yellow",
      tradeable: true,
      status: { fa: "معامله نشده", en: "No Trade" },
    },
    {
      symbol: "JPY",
      flag: "🇯🇵",
      day: { fa: "پنج‌شنبه ۱۴۰۴/۰۷/۰۴", en: "Thu 2025/09/25" },
      time: "۰۵:۳۰",
      news: { fa: "اشتغال‌زایی ژاپن", en: "Japan Employment" },
      impact: "blue",
      tradeable: true,
      status: { fa: "معامله شده", en: "Traded" },
    },
    {
      symbol: "USD",
      flag: "🇺🇸",
      day: { fa: "جمعه ۱۴۰۴/۰۷/۰۵", en: "Fri 2025/09/26" },
      time: "۱۶:۳۰",
      news: { fa: "شاخص مسکن آمریکا", en: "US Housing Index" },
      impact: "yellow",
      tradeable: false,
      status: { fa: "ترید ممنوع", en: "Trade Banned" },
    },
    {
      symbol: "CAD",
      flag: "🇨🇦",
      day: { fa: "جمعه ۱۴۰۴/۰۷/۰۵", en: "Fri 2025/09/26" },
      time: "۱۶:۳۰",
      news: { fa: "اشتغال کانادا", en: "Canada Employment" },
      impact: "red",
      tradeable: true,
      status: { fa: "معامله نشده", en: "No Trade" },
    },
  ],
  week2: [
    {
      symbol: "USD",
      flag: "🇺🇸",
      day: { fa: "دوشنبه ۱۴۰۴/۰۷/۰۸", en: "Mon 2025/09/29" },
      time: "۱۵:۴۵",
      news: { fa: "داده‌های تولیدی ISM آمریکا", en: "US ISM Manufacturing" },
      impact: "blue",
      tradeable: true,
      status: { fa: "معامله شده", en: "Traded" },
    },
    {
      symbol: "EUR",
      flag: "🇪🇺",
      day: { fa: "سه‌شنبه ۱۴۰۴/۰۷/۰۹", en: "Tue 2025/09/30" },
      time: "۱۲:۰۰",
      news: { fa: "نرخ بیکاری آلمان", en: "Germany Unemployment Rate" },
      impact: "yellow",
      tradeable: false,
      status: { fa: "ترید ممنوع", en: "Trade Banned" },
    },
    {
      symbol: "GBP",
      flag: "🇬🇧",
      day: { fa: "سه‌شنبه ۱۴۰۴/۰۷/۰۹", en: "Tue 2025/09/30" },
      time: "۱۱:۳۰",
      news: { fa: "تولید ناخالص داخلی انگلستان", en: "UK GDP" },
      impact: "red",
      tradeable: true,
      status: { fa: "معامله نشده", en: "No Trade" },
    },
    {
      symbol: "AUD",
      flag: "🇦🇺",
      day: { fa: "چهارشنبه ۱۴۰۴/۰۷/۱۰", en: "Wed 2025/10/01" },
      time: "۰۳:۳۰",
      news: { fa: "تصمیم نرخ بهره استرالیا", en: "Australia Rate Decision" },
      impact: "red",
      tradeable: false,
      status: { fa: "ترید ممنوع", en: "Trade Banned" },
    },
    {
      symbol: "JPY",
      flag: "🇯🇵",
      day: { fa: "پنج‌شنبه ۱۴۰۴/۰۷/۱۱", en: "Thu 2025/10/02" },
      time: "۰۶:۰۰",
      news: { fa: "اعتماد مصرف‌کننده ژاپن", en: "Japan Consumer Confidence" },
      impact: "blue",
      tradeable: true,
      status: { fa: "معامله شده", en: "Traded" },
    },
    {
      symbol: "USD",
      flag: "🇺🇸",
      day: { fa: "جمعه ۱۴۰۴/۰۷/۱۲", en: "Fri 2025/10/03" },
      time: "۱۶:۳۰",
      news: { fa: "نرخ اشتغال غیرکشاورزی", en: "US Non-Farm Payrolls" },
      impact: "red",
      tradeable: false,
      status: { fa: "ترید ممنوع", en: "Trade Banned" },
    },
    {
      symbol: "CHF",
      flag: "🇨🇭",
      day: { fa: "جمعه ۱۴۰۴/۰۷/۱۲", en: "Fri 2025/10/03" },
      time: "۰۹:۳۰",
      news: { fa: "تورم سوئیس", en: "Switzerland Inflation" },
      impact: "yellow",
      tradeable: true,
      status: { fa: "معامله نشده", en: "No Trade" },
    },
  ],
  week3: [
    {
      symbol: "USD",
      flag: "🇺🇸",
      day: { fa: "دوشنبه ۱۴۰۴/۰۷/۱۵", en: "Mon 2025/10/06" },
      time: "۱۶:۰۰",
      news: { fa: "سخنرانی رئیس فدرال رزرو", en: "Fed Chair Speech" },
      impact: "red",
      tradeable: false,
      status: { fa: "ترید ممنوع", en: "Trade Banned" },
    },
    {
      symbol: "EUR",
      flag: "🇪🇺",
      day: { fa: "دوشنبه ۱۴۰۴/۰۷/۱۵", en: "Mon 2025/10/06" },
      time: "۱۰:۳۰",
      news: { fa: "تولید صنعتی اروپا", en: "EU Industrial Production" },
      impact: "yellow",
      tradeable: true,
      status: { fa: "معامله نشده", en: "No Trade" },
    },
    {
      symbol: "GBP",
      flag: "🇬🇧",
      day: { fa: "سه‌شنبه ۱۴۰۴/۰۷/۱۶", en: "Tue 2025/10/07" },
      time: "۰۸:۳۰",
      news: { fa: "شاخص قیمت مصرف‌کننده UK", en: "UK CPI" },
      impact: "red",
      tradeable: true,
      status: { fa: "معامله شده", en: "Traded" },
    },
    {
      symbol: "CAD",
      flag: "🇨🇦",
      day: { fa: "سه‌شنبه ۱۴۰۴/۰۷/۱۶", en: "Tue 2025/10/07" },
      time: "۱۶:۳۰",
      news: { fa: "تورم کانادا", en: "Canada CPI" },
      impact: "blue",
      tradeable: true,
      status: { fa: "معامله شده", en: "Traded" },
    },
    {
      symbol: "AUD",
      flag: "🇦🇺",
      day: { fa: "چهارشنبه ۱۴۰۴/۰۷/۱۷", en: "Wed 2025/10/08" },
      time: "۰۳:۰۰",
      news: { fa: "شاخص دستمزد استرالیا", en: "Australia Wage Index" },
      impact: "yellow",
      tradeable: false,
      status: { fa: "ترید ممنوع", en: "Trade Banned" },
    },
    {
      symbol: "USD",
      flag: "🇺🇸",
      day: { fa: "پنج‌شنبه ۱۴۰۴/۰۷/۱۸", en: "Thu 2025/10/09" },
      time: "۱۶:۳۰",
      news: { fa: "درخواست بیکاری آمریکا", en: "US Jobless Claims" },
      impact: "blue",
      tradeable: true,
      status: { fa: "معامله نشده", en: "No Trade" },
    },
  ],
  week4: [
    {
      symbol: "JPY",
      flag: "🇯🇵",
      day: { fa: "دوشنبه ۱۴۰۴/۰۷/۲۲", en: "Mon 2025/10/13" },
      time: "۰۳:۳۰",
      news: { fa: "صادرات ژاپن", en: "Japan Exports" },
      impact: "yellow",
      tradeable: true,
      status: { fa: "معامله نشده", en: "No Trade" },
    },
    {
      symbol: "EUR",
      flag: "🇪🇺",
      day: { fa: "سه‌شنبه ۱۴۰۴/۰۷/۲۳", en: "Tue 2025/10/14" },
      time: "۱۱:۰۰",
      news: { fa: "احساسات اقتصادی ZEW آلمان", en: "Germany ZEW Sentiment" },
      impact: "blue",
      tradeable: true,
      status: { fa: "معامله شده", en: "Traded" },
    },
    {
      symbol: "USD",
      flag: "🇺🇸",
      day: { fa: "سه‌شنبه ۱۴۰۴/۰۷/۲۳", en: "Tue 2025/10/14" },
      time: "۱۴:۳۰",
      news: { fa: "شاخص قیمت تولیدکننده آمریکا", en: "US PPI" },
      impact: "yellow",
      tradeable: false,
      status: { fa: "ترید ممنوع", en: "Trade Banned" },
    },
    {
      symbol: "GBP",
      flag: "🇬🇧",
      day: { fa: "چهارشنبه ۱۴۰۴/۰۷/۲۴", en: "Wed 2025/10/15" },
      time: "۰۸:۳۰",
      news: { fa: "حساب جاری انگلستان", en: "UK Current Account" },
      impact: "blue",
      tradeable: true,
      status: { fa: "معامله شده", en: "Traded" },
    },
    {
      symbol: "USD",
      flag: "🇺🇸",
      day: { fa: "پنج‌شنبه ۱۴۰۴/۰۷/۲۵", en: "Thu 2025/10/16" },
      time: "۱۶:۳۰",
      news: { fa: "فروش خرده‌فروشی آمریکا", en: "US Retail Sales" },
      impact: "red",
      tradeable: false,
      status: { fa: "ترید ممنوع", en: "Trade Banned" },
    },
    {
      symbol: "CHF",
      flag: "🇨🇭",
      day: { fa: "جمعه ۱۴۰۴/۰۷/۲۶", en: "Fri 2025/10/17" },
      time: "۰۹:۰۰",
      news: { fa: "اشتغال سوئیس", en: "Switzerland Employment" },
      impact: "yellow",
      tradeable: true,
      status: { fa: "معامله نشده", en: "No Trade" },
    },
    {
      symbol: "CAD",
      flag: "🇨🇦",
      day: { fa: "جمعه ۱۴۰۴/۰۷/۲۶", en: "Fri 2025/10/17" },
      time: "۱۶:۳۰",
      news: { fa: "تولید ناخالص داخلی ماهانه", en: "Canada Monthly GDP" },
      impact: "red",
      tradeable: true,
      status: { fa: "معامله نشده", en: "No Trade" },
    },
  ],
};

export const WEEK_OPTIONS: { key: Week; label: BilingualText }[] = [
  {
    key: "week1",
    label: { fa: "هفته ۱ – ۱۴۰۴/۰۷/۰۱", en: "Week 1 – 2025/09/23" },
  },
  {
    key: "week2",
    label: { fa: "هفته ۲ – ۱۴۰۴/۰۷/۰۸", en: "Week 2 – 2025/09/29" },
  },
  {
    key: "week3",
    label: { fa: "هفته ۳ – ۱۴۰۴/۰۷/۱۵", en: "Week 3 – 2025/10/06" },
  },
  {
    key: "week4",
    label: { fa: "هفته ۴ – ۱۴۰۴/۰۷/۲۲", en: "Week 4 – 2025/10/13" },
  },
];

export const FILTER_OPTIONS: { key: NewsFilter; label: BilingualText }[] = [
  { key: "all", label: { fa: "اخبار ترید ممنوع و ترید مجاز", en: "All News" } },
  { key: "banned", label: { fa: "فقط ترید ممنوع", en: "Trade Banned Only" } },
  { key: "allowed", label: { fa: "فقط ترید مجاز", en: "Tradeable Only" } },
];

// chart static
export const RADAR_VALUES = [65, 72, 55, 48, 60, 70];

export const LABELS: Record<Lang, string[]> = {
  fa: [
    "تصمیم‌گیری احتمالی",
    "خودآگاهی ذهنی",
    "تفکر سیستمی",
    "مدیریت ریسک",
    "درک نقدینگی",
    "ثبات رفتاری",
  ],
  en: [
    "Prob. Decision",
    "Self-Awareness",
    "Systems Thinking",
    "Risk Mgmt",
    "Liquidity",
    "Behavior Stab.",
  ],
};

export const STATS: Record<Lang, { label: string; value: number }[]> = {
  fa: [
    { label: "نظم حساب", value: 31 },
    { label: "ریسک حساب", value: 61 },
    { label: "احتمال موفقیت", value: 43 },
  ],
  en: [
    { label: "Account Order", value: 31 },
    { label: "Account Risk", value: 61 },
    { label: "Success Prob.", value: 43 },
  ],
};

export const TOTAL: Record<Lang, { label: string; value: number }> = {
  fa: { label: "نمره", value: 61 },
  en: { label: "Score", value: 61 },
};

export const DATE: Record<Lang, string> = {
  fa: "۱۴۰۴/۱۰/۱۲",
  en: "2026-01-02",
};

export const COMMENT: Record<
  Lang,
  { bold: string; body: string; daily: string }
> = {
  fa: {
    bold: "کامنت AI بر اساس تحلیل پنل",
    body: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چایگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می‌باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده.",
    daily: "به صورت روزانه",
  },
  en: {
    bold: "AI Comment based on Panel Analysis. ",
    body: "Lorem ipsum is dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s, when an unknown printer scrambled type to make a specimen book. It has survived five centuries.",
    daily: "Updated Daily",
  },
};

// -----------------------------------------------------
export const performanceMetrics: MetricRow[] = [
  {
    id: "avg_profit",
    label: { fa: "میانگین سود هر معامله", en: "Avg Profit per Trade" },
    leftValue: 21,
    rightValue: 5,
    leftBar: 85,
    rightBar: 22,
  },
  {
    id: "daily_profit_trades",
    label: { fa: "تعداد معاملات روزانه سود ده", en: "Daily Profitable Trades" },
    leftValue: 18,
    rightValue: 15,
    leftBar: 72,
    rightBar: 60,
  },
  {
    id: "avg_risk_reward",
    label: { fa: "میانگین ریسک به ریوارد", en: "Avg Risk to Reward" },
    leftValue: 12,
    rightValue: 7,
    leftBar: 50,
    rightBar: 30,
  },
  {
    id: "avg_trade_time",
    label: { fa: "میانگین زمان معاملات", en: "Avg Trade Duration" },
    leftValue: 21,
    rightValue: 5,
    leftBar: 85,
    rightBar: 22,
  },
];

export const behaviorMetrics: MetricRow[] = [
  {
    id: "daily_trades",
    label: { fa: "تعداد معاملات روزانه", en: "Daily Trades Count" },
    leftValue: 21,
    rightValue: 5,
    leftBar: 85,
    rightBar: 22,
  },
  {
    id: "avg_position_size",
    label: { fa: "سایز میانگین پوزیشن", en: "Avg Position Size" },
    leftValue: 18,
    rightValue: 15,
    leftBar: 72,
    rightBar: 60,
  },
  {
    id: "consecutive_loss",
    label: { fa: "درصد معاملات خرید به فروش", en: "Buy to Sell Trade Ratio" },
    leftValue: 12,
    rightValue: 7,
    leftBar: 50,
    rightBar: 30,
  },
  {
    id: "trades_without_sl",
    label: { fa: "درصد معاملات بدون SL", en: "Trades without SL %" },
    leftValue: 21,
    rightValue: 5,
    leftBar: 85,
    rightBar: 22,
  },
];

export const summaryCards: SummaryCard[] = [
  {
    id: "session_loss",
    title: {
      fa: "درصد کاربران لحظه سود در سود لحظه ای",
      en: "Users in Profit %",
    },
    value: { fa: "۵۸٪", en: "58%" },
    buy: { fa: "۵۸", en: "58" },
    sell: { fa: "۵۸", en: "58" },
    unit: { fa: "درصد کاربران", en: "Users %" },
  },
  {
    id: "avg_volume",
    title: { fa: "میانگین حجم ثبت", en: "Avg Volume" },
    value: { fa: "۵۸٪", en: "58%" },
    buy: { fa: "۵۸", en: "58" },
    sell: { fa: "۵۸", en: "58" },
    unit: { fa: "میانگین حجم ثبت", en: "Avg Volume" },
  },
  {
    id: "avg_pnl",
    title: { fa: "میانگین سود/ضرر لحظه ای کاربران", en: "Avg PnL" },
    value: { fa: "۱۸٫۱۴۷۰", en: "18.1470" },
    buy: { fa: "۵۸", en: "58" },
    sell: { fa: "۵۸", en: "58" },
    unit: { fa: "معامله", en: "Trade" },
  },
  {
    id: "open_trades_pct",
    title: { fa: "درصد معاملات باز", en: "Open Trades %" },
    value: { fa: "۵۸٪", en: "58%" },
    buy: { fa: "۵۸", en: "58" },
    sell: { fa: "۵۸", en: "58" },
    unit: { fa: "درصد معاملات باز", en: "Open Trades %" },
  },
  {
    id: "open_trades_count",
    title: { fa: "تعداد معاملات باز", en: "Open Trades Count" },
    value: { fa: "۱۸٫۱۴۷۰", en: "18.1470" },
    buy: { fa: "۵۸", en: "58" },
    sell: { fa: "۵۸", en: "58" },
    unit: { fa: "معامله", en: "Trade" },
  },
];

// -----------------------trading table data ────────────────────────────────────
export const trades: Trade[] = [
  {
    id: 1,
    symbol: { fa: "بیت‌کوین", en: "Bitcoin" },
    symbolIcon: "₿",
    direction: "sell",
    status: "active",
    volume: 0.1,
    sl: -13.54,
    tp: 263,
    commission: -0.3,
    profitLoss: -0.3,
    points: 4890,
    pointBadgeLabel: { fa: "+۰.۳", en: "+0.3" },
  },
  {
    id: 2,
    symbol: { fa: "بیت‌کوین", en: "Bitcoin" },
    symbolIcon: "₿",
    direction: "sell",
    status: "active",
    volume: 0.1,
    sl: -13.54,
    tp: 263,
    commission: -0.3,
    profitLoss: -0.3,
    points: 4890,
    pointBadgeLabel: { fa: "+۰.۳", en: "+0.3" },
  },
  {
    id: 3,
    symbol: { fa: "بیت‌کوین", en: "Bitcoin" },
    symbolIcon: "₿",
    direction: "sell",
    status: "active",
    volume: 0.1,
    sl: -13.54,
    tp: 263,
    commission: -0.3,
    profitLoss: -0.3,
    points: 4890,
    pointBadgeLabel: { fa: "+۰.۳", en: "+0.3" },
  },
  {
    id: 4,
    symbol: { fa: "اتریوم", en: "Ethereum" },
    symbolIcon: "Ξ",
    direction: "buy",
    status: "closed",
    volume: 0.5,
    sl: -8.2,
    tp: 180,
    commission: -0.15,
    profitLoss: 4.7,
    points: 3210,
    pointBadgeLabel: { fa: "+۴.۷", en: "+4.7" },
  },
  {
    id: 5,
    symbol: { fa: "اتریوم", en: "Ethereum" },
    symbolIcon: "Ξ",
    direction: "buy",
    status: "closed",
    volume: 1.0,
    sl: -5.0,
    tp: 300,
    commission: -0.2,
    profitLoss: 12.1,
    points: 5600,
    pointBadgeLabel: { fa: "+۱۲.۱", en: "+12.1" },
  },
  {
    id: 6,
    symbol: { fa: "ریپل", en: "Ripple" },
    symbolIcon: "✕",
    direction: "sell",
    status: "closed",
    volume: 200,
    sl: -2.4,
    tp: 50,
    commission: -0.05,
    profitLoss: -1.8,
    points: 980,
    pointBadgeLabel: { fa: "-۱.۸", en: "-1.8" },
  },
  {
    id: 7,
    symbol: { fa: "لایت‌کوین", en: "Litecoin" },
    symbolIcon: "Ł",
    direction: "buy",
    status: "planned",
    volume: 2,
    sl: -6.5,
    tp: 130,
    commission: -0.1,
    profitLoss: 0,
    points: 1500,
    pointBadgeLabel: { fa: "+۰.۰", en: "+0.0" },
  },
  {
    id: 8,
    symbol: { fa: "دوج‌کوین", en: "Dogecoin" },
    symbolIcon: "Ð",
    direction: "buy",
    status: "planned",
    volume: 500,
    sl: -0.9,
    tp: 20,
    commission: -0.02,
    profitLoss: 0,
    points: 420,
    pointBadgeLabel: { fa: "+۰.۰", en: "+0.0" },
  },
  {
    id: 9,
    symbol: { fa: "سولانا", en: "Solana" },
    symbolIcon: "◎",
    direction: "sell",
    status: "active",
    volume: 3,
    sl: -15.0,
    tp: 400,
    commission: -0.4,
    profitLoss: -2.1,
    points: 7200,
    pointBadgeLabel: { fa: "-۲.۱", en: "-2.1" },
  },
  {
    id: 10,
    symbol: { fa: "کاردانو", en: "Cardano" },
    symbolIcon: "₳",
    direction: "buy",
    status: "closed",
    volume: 150,
    sl: -3.3,
    tp: 80,
    commission: -0.08,
    profitLoss: 5.5,
    points: 2100,
    pointBadgeLabel: { fa: "+۵.۵", en: "+5.5" },
  },
  {
    id: 11,
    symbol: { fa: "پولکادات", en: "Polkadot" },
    symbolIcon: "●",
    direction: "sell",
    status: "closed",
    volume: 10,
    sl: -7.8,
    tp: 210,
    commission: -0.25,
    profitLoss: -3.4,
    points: 1850,
    pointBadgeLabel: { fa: "-۳.۴", en: "-3.4" },
  },
  {
    id: 12,
    symbol: { fa: "چین‌لینک", en: "Chainlink" },
    symbolIcon: "⬡",
    direction: "buy",
    status: "planned",
    volume: 25,
    sl: -4.1,
    tp: 110,
    commission: -0.12,
    profitLoss: 0,
    points: 3300,
    pointBadgeLabel: { fa: "+۰.۰", en: "+0.0" },
  },
];

// ─── Tab Config ───────────────────────────────────────────────────────────────

export const tabs: {
  key: TradeStatus | "all";
  label: BilingualText;
  count: number;
}[] = [
  { key: "all", label: { fa: "همه", en: "All" }, count: 12 },
  { key: "active", label: { fa: "درحال ترید", en: "Active" }, count: 2 },
  { key: "closed", label: { fa: "بسته شده", en: "Closed" }, count: 9 },
  { key: "planned", label: { fa: "برنامه‌ریزی شده", en: "Planned" }, count: 1 },
];

export const columns: {
  key: keyof Trade | "colorBar";
  label: BilingualTexts;
}[] = [
  { key: "colorBar", label: { fa: "رنگ سود و ضرر", en: "P&L Color" } },
  { key: "id", label: { fa: "ردیف", en: "Row" } },
  { key: "symbol", label: { fa: "نماد", en: "Symbol" } },
  { key: "volume", label: { fa: "حجم", en: "Volume" } },
  { key: "sl", label: { fa: "SL", en: "SL" } },
  { key: "tp", label: { fa: "TP", en: "TP" } },
  { key: "commission", label: { fa: "کمیسیون", en: "Commission" } },
  { key: "profitLoss", label: { fa: "سود / ضرر", en: "P&L" } },
  { key: "points", label: { fa: "پوینت", en: "Points" } },
];
