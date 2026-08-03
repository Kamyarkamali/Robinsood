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
      fa: "وضعیت لحظه ای حساب",
      en: "Real-Time Account Status",
    },

    description: {
      fa: "بالانس,اکوییتی و وضعیت فعلی حسابت رو همین جا لحظه ای چک کن",
      en: "Check your account's balance, equity, and current status in real time right here.",
    },
  },

  {
    id: "challenge-info-2",
    scope: "challenge-info",
    order: 2,

    element: "#step-title2",

    side: "left",

    title: {
      fa: "نوع مرحله و چالش",
      en: "Challenge Type and Stage",
    },

    description: {
      fa: "این کارت می گه توی کدوم چالشی و الان دقیقا کجای مسیرش قرار داری.",
      en: "This card shows which challenge you're currently in and exactly where you are in its progress.",
    },
  },

  {
    id: "challenge-info-3",
    scope: "challenge-info",
    order: 3,

    element: "#step-title3",

    side: "top",

    title: {
      fa: "اطلاعات پایه حساب",
      en: "Download Report",
    },

    description: {
      fa: "اینجا بالانس اولیه,شماره اکانت و تاریخ ثبت نام حسابت رو یک جا میبینی.",
      en: "Here you can see your account's initial balance, account number, and registration date all in one place.",
    },
  },

  {
    id: "dashboard-3",
    scope: "today-parameters",
    order: 4,

    element: "#today1",

    side: "right",

    title: {
      fa: " درادون روزانه",
      en: "Daily Drawdown",
    },

    description: {
      fa: "اینجا میبینی امروز چقدر از حد ضررت روانه ات استفاده کردی و چقدر دیگه فرصت داری.",
      en: "Here you can see how much of your daily loss limit you have used today and how much remaining allowance you have.",
    },
  },

  {
    id: "dashboard-3",
    scope: "today-parameters",
    order: 5,

    element: "#today2",

    side: "right",

    title: {
      fa: "درادون کل",
      en: "Overall Drawdown",
    },

    description: {
      fa: "اینجا میبینی چقدر از حد ضرر کل حسابت استفاده کردی و تا خط قرمز چقدر فاصله داری",
      en: "Here you can see how much of your account's total drawdown limit you've used and how far you are from the maximum allowed loss.",
    },
  },

  {
    id: "dashboard-3",
    scope: "today-parameters",
    element: "#today3",
    order: 6,

    side: "right",

    title: {
      fa: "روزهای معاملاتی",
      en: "Trading Days",
    },

    description: {
      fa: "تعداد روزهای معاملاتی معتبر.روزهای مجاز و زمان باقی مانده حسابت رو از اینجا چک کن.",
      en: "Check your valid trading days, the required number of trading days, and the remaining time on your account here.",
    },
  },

  {
    id: "dashboard-3",
    scope: "today-parameters",
    element: "#today4",
    order: 7,

    side: "top",

    title: {
      fa: "لات",
      en: "Lot",
    },

    description: {
      fa: "لات مجاز.حجم استفاده شده و میانگین لات امروز;همه چی همین جا زیر نظرته",
      en: "Keep track of your maximum allowed lot size, the volume you've used, and today's average lot size—all in one place.",
    },
  },

  {
    id: "dashboard-3",
    scope: "today-parameters",
    element: "#today5",
    order: 8,

    side: "top",

    title: {
      fa: "درگیری حساب",
      en: "Account Exposure",
    },

    description: {
      fa: "ریسک کل, ریسک مارجین و وضعیت MDL و FL حسابت رو یکجا اینجا می بینی",
      en: "View your total risk, margin risk, and the current status of your MDL and FL limits—all in one place.",
    },
  },

  {
    id: "dashboard-3",
    scope: "today-parameters",
    element: "#today6",
    order: 9,

    side: "bottom",

    title: {
      fa: "ترید در خبر",
      en: "News Trading",
    },

    description: {
      fa: "اینجا میبینی چند معامله در خبرهای پراهیمت متوسط یا کم اهمیت داشتی",
      en: "Here you can see how many trades you have made during high-impact, medium-impact, or low-impact news events.",
    },
  },

  {
    id: "dashboard-4",
    scope: "evaluation-parameters",
    element: "#section1",
    order: 10,

    side: "bottom",

    title: {
      fa: "مسیر رسیدن به تارگت",
      en: "Path to Target Achievement",
    },

    description: {
      fa: "درصد تارگت, مقدار هدف و میزان پیشرفت تا رسیده به سود نهایی رو اینجا ببین.",
      en: "Track your target percentage, goal amount, and progress toward reaching your final profit target here.",
    },
  },

  {
    id: "dashboard-4",
    scope: "evaluation-parameters",
    element: "#section2",
    order: 11,

    side: "bottom",

    title: {
      fa: "روزهای معاملاتی",
      en: "Trading Days",
    },

    description: {
      fa: "تعداد روزهای تایید شده,روزهای لازم برای قبولی و زمان باقی مانده رو یک جا ببین",
      en: "View your confirmed trading days, the required days to pass, and the remaining time all in one place.",
    },
  },

  {
    id: "dashboard-4",
    scope: "evaluation-parameters",
    element: "#section3",
    order: 12,

    side: "bottom",

    title: {
      fa: "میانگین لات",
      en: "Average Lot Size",
    },

    description: {
      fa: "میانگین حجم معاملاتت در هر روز و فاصله اش با محدودیت های ارزیابی رو نشون میدده.",
      en: "Shows your average trading volume per day and its distance from the evaluation limits.",
    },
  },

  {
    id: "dashboard-4",
    scope: "evaluation-parameters",
    element: "#section4",
    order: 13,

    side: "left",

    title: {
      fa: "مجموع لات",
      en: "Total Lot Size",
    },

    description: {
      fa: "جمع کل حجم معاملات هر روز و فاصله اش با محدودیت های ارزیابی رو اینجا ببین.",
      en: "View your total trading volume for each day and its distance from the evaluation limits here.",
    },
  },

  {
    id: "account-chart",
    scope: "evaluation-parameters",

    element: "#section5",
    order: 14,

    side: "left",

    title: {
      fa: "میانگین زمان معاملات",
      en: "Average Trade Duration",
    },

    description: {
      fa: "میانگین مدت باز بودن معاملات در هر روز و فاصله اش با محدوده مجاز رو میبینی.",
      en: "Shows the average time your trades remain open each day and their distance from the allowed range.",
    },
  },
  {
    id: "account-chart",
    scope: "evaluation-parameters",

    element: "#section6",
    order: 15,

    side: "left",

    title: {
      fa: "مجموع زمان معاملات",
      en: "Total Trade Duration",
    },

    description: {
      fa: "مجموع زمان باز بودن همه معاملات هر روز رو اینجا میبینی;حتی اگر هم زمان باز بوده باشن.",
      en: "View the total time all your trades remained open each day, even if multiple trades were open simultaneously.",
    },
  },

  {
    id: "account-chart",
    scope: "evaluation-parameters",

    element: "#section7",
    order: 16,

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
    scope: "evaluation-parameters",

    element: "#section8",
    order: 17,

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
    scope: "evaluation-parameters",

    element: "#section9",
    order: 18,

    side: "left",

    title: {
      fa: "میانگین قدرت مطلق",
      en: "Average Absolute Strength",
    },

    description: {
      fa: "میانگین اندازه سود یا زیان هر معامله رو بدون توجه به مثبت یا منفی بودنش نشون میده.",
      en: "Shows the average size of profit or loss per trade, regardless of whether it is positive or negative.",
    },
  },
  {
    id: "account-chart",
    scope: "evaluation-parameters",
    element: "#section10",

    order: 19,

    side: "left",

    title: {
      fa: "قدرت مطلق برآیند",
      en: "Average Absolute Outcome",
    },

    description: {
      fa: "میانگین اندازه نتیجه نهایی هر روز معاملاتی رو بدون توجه به سودده یا زیان ده بودنش رو میبنی.",
      en: "Shows the average size of the final result for each trading day, regardless of whether it was profitable or resulted in a loss.",
    },
  },
  {
    id: "account-chart2",
    scope: "drawdown-chart",
    element: "#chart1",

    order: 20,

    side: "left",

    title: {
      fa: "بازه زمانی نمودار",
      en: "Chart Time Range",
    },

    description: {
      fa: "از یک دقیقه تا یک روز;بازه درخواست رو انتخاب کن و حرکت حساب رو دقیق تر ببین.",
      en: "Select your preferred time range from one minute to one day and view your account's performance movement more accurately.",
    },
  },
  {
    id: "account-chart2",
    scope: "drawdown-chart",
    element: "#chart2",

    order: 21,

    side: "left",

    title: {
      fa: "موجودی یا سود؟",
      en: "Balance or Profit?",
    },

    description: {
      fa: "با یک کلیک,نمودار رو ببین تغیرات موجودی و سود حسابت رو جابجا کن.",
      en: "With one click, switch the chart view between your account balance changes and profit changes.",
    },
  },
  {
    id: "account-chart2",
    scope: "drawdown-chart",
    element: "#chart3",
    order: 22,

    side: "left",

    title: {
      fa: "نقشه حرکت حسابت",
      en: "Account Movement Map",
    },

    description: {
      fa: "خط موجودی اکوییتی,هدف و محدوده های درادون رو کنار هم ببین و مسیر حسابت رو بخون.",
      en: "View the balance line, equity, target, and drawdown zones together to track and understand your account's journey.",
    },
  },

  {
    id: "account-chart2",
    scope: "drawdown-chart",
    element: "#chart4",
    order: 23,

    side: "left",

    title: {
      fa: "جزئیات هر لحظه",
      en: "Real-Time Details",
    },

    description: {
      fa: "روی نمودار حرکت کن تا موجودی,هدف,درادون ها و قیمت های باز و بسته شدن رو همون لحظه ببینی.",
      en: "Hover over the chart to view your balance, target, drawdowns, and opening/closing prices at that exact moment.",
    },
  },
  {
    id: "account-chart2",
    scope: "drawdown-chart",
    element: "#chart5",
    order: 24,

    side: "left",

    title: {
      fa: "ابزارهای چارت",
      en: "Chart Tools",
    },

    description: {
      fa: "نمودار رو زومکن, تنظیماتش رو تغیر بده یا گزارش کاملش رو به صورت PDF بگیر.",
      en: "Zoom in on the chart, customize its settings, or export a complete report as a PDF—all from one place.",
    },
  },

  {
    id: "account-sections",
    scope: "account-statistics",
    element: "#account1",
    order: 25,

    side: "left",

    title: {
      fa: "سوددهی معاملات چطوره؟",
      en: "Trading Profitability?",
    },

    description: {
      fa: "اینجا ضریب سودآوری و نرخ برد حسابت رو یک جا میبینی;یعنی چقدر از معاملاتت بنده بوده و سودها چقدر ضررهارو پوشش داده اند.",
      en: "View your account's profit factor and win rate in one place — see how many of your trades were successful and how much your profits have covered your losses.",
    },
  },

  {
    id: "account-sections",
    scope: "account-statistics",
    element: "#account2",
    order: 26,

    side: "left",

    title: {
      fa: "هرباخت معمولا چقدر هزینه داره ؟",
      en: "Average Loss per Losing Trade?",
    },

    description: {
      fa: "این کارت میانگین ضرر معاملات ناموفق رو نشون میده و کمک میکنه بفهمی اندازه باخت ها تحت کنترله یا نه.",
      en: "This card shows the average loss of unsuccessful trades and helps you understand whether your losing trades are under control or not.",
    },
  },
  {
    id: "account-sections",
    scope: "account-statistics",
    element: "#account3",
    order: 27,

    side: "left",

    title: {
      fa: "سوددهی معاملات تو چه وضعیه ؟",
      en: "Trading Profitability Status?",
    },

    description: {
      fa: "این درصد نشون میده نتیجه کلی حسابت چقدر سوده بوده;هرچی بالاتر باشه,عملکرد نهایی قوی تره.",
      en: "This percentage shows how profitable your overall account performance has been. The higher it is, the stronger your final performance.",
    },
  },
  {
    id: "account-sections",
    scope: "account-statistics",
    element: "#account4",
    order: 28,

    side: "left",

    title: {
      fa: "حسابت در مجموع کجای کاره ؟",
      en: "Overall Account Performance",
    },

    description: {
      fa: "اینجا سود یا زیان نهایی حساب,درصد و عملکرد و تغیرش نسبت به آخرین ترید رو یک جا میبینی",
      en: "View your account's overall profit or loss, performance percentage, and how it has changed since your last trade—all in one place.",
    },
  },
  {
    id: "account-sections",
    scope: "account-statistics",
    element: "#account5",
    order: 29,
    side: "left",

    title: {
      fa: "چقدر با ثبات ترید میکنی؟",
      en: "How Consistent Is Your Trading?",
    },

    description: {
      fa: "این امتیاز نشون میده عملکردت چقدر منظم و پایدار بوده.هدف اینه که کم کم خودت رو به محدوده سبز برسونی",
      en: "This score shows how consistent and disciplined your trading performance has been. The goal is to gradually improve your score and reach the green zone.",
    },
  },
  {
    id: "account-sections",
    scope: "account-statistics",
    element: "#account6",
    order: 30,

    side: "left",

    title: {
      fa: "هفته ات رو زیر ذره بین ببر!",
      en: "Put Your Week Under the Microscope!",
    },

    description: {
      fa: "اینجا عملکرد هر روز هفته رو میبینی. بازه رو انتخاب کن و بین نمای ریسک و سود و ضرر جابه جا شو تا الگوی رفتارت رو پیدا کنی.",
      en: "Review your performance for each day of the week. Select a time range and switch between Risk and Profit/Loss views to uncover your trading patterns.",
    },
  },
  {
    id: "calendar-analysis1",
    scope: "calendar-analysis",
    element: "#analysis1",
    order: 31,

    side: "left",

    title: {
      fa: "فیلترها دست توئه",
      en: "You're in Control of the Filters",
    },

    description: {
      fa: "از اینجا سال,ماه و نوع داده را انتخاب کن تا تقویم دقیقا همان بازه ای را نشان بدهد که میخواهی.",
      en: "Select the year, month, and data type to display exactly the time period you want on the calendar.",
    },
  },
  {
    id: "calendar-analysis1",
    scope: "calendar-analysis",
    element: "#analysis2",
    order: 32,

    side: "left",

    title: {
      fa: "خلاصه ماه در یک نگاه",
      en: "Monthly Summary at a Glance",
    },

    description: {
      fa: "بهترین روز معاملاتی و تعداد روزهای مثبت و منفی این ماه را همنی جا یکجا میبینی.",
      en: "See your best trading day, along with the number of profitable and losing days this month—all in one place.",
    },
  },
  // ================= Modal =================

  {
    id: "calendar-analysis1",
    scope: "calendar-analysis",
    element: "#analysis3",
    order: 33,

    side: "bottom",

    title: {
      fa: "تقویم عملکرد روزانه",
      en: "Daily Performance Calendar",
    },

    description: {
      fa: "هرخانه نتیجه همان روز است;سبز یعنی سود,قرمز یعنی ضرر و خانه های خاکستری روزهای بدون معامله اند.",
      en: "Each cell represents the result of that day: green means profit, red means loss, and gray cells indicate days with no trades.",
    },
  },

  {
    id: "calendar-analysis1",
    scope: "calendar-analysis",
    element: "#analysis4",
    order: 34,

    side: "bottom",

    title: {
      fa: "نمودار رو تنظیم کن",
      en: "Configure the Chart",
    },

    description: {
      fa: "متغیرهای دو محور را انتخاب کن و نمایش روزانه,هفتگی یا ماهانه را بزن تا مقایسه دقیق تری داشته باشی.",
      en: "Select the variables for both axes and choose a daily, weekly, or monthly view for a more accurate comparison.",
    },
  },

  {
    id: "calendar-analysis1",
    scope: "calendar-analysis",
    element: "#analysis5",
    order: 35,

    side: "bottom",

    title: {
      fa: "رابطه رو دو شاخص رو ببین",
      en: "View the Relationship Between Two Metrics",
    },

    description: {
      fa: "میله ها و خط دوشاخص انتخابی را کنارهم نشان میدهند;برای نگهداشتن گزارش هم PDF را دانلود کن.",
      en: "The bars and line display the two selected metrics together. Download the PDF to keep the report for future reference.",
    },
  },

  {
    id: "news-page",
    scope: "news-status",
    element: "#news1",
    order: 36,

    side: "bottom",

    title: {
      fa: "ساعت فعلی بازار",
      en: "Current Market Time",
    },

    description: {
      fa: "اینجا ساعت لحظه ای بازار و جایگاه امروزت روی خط زمانی جهانی رو میبینی.",
      en: "View the live market time and your position on today's global trading timeline.",
    },
  },

  {
    id: "news-page",
    scope: "news-status",
    element: "#news2",
    order: 37,

    side: "bottom",

    title: {
      fa: "سشن های معاملاتی",
      en: "Trading Sessions",
    },

    description: {
      fa: "زمان باز و بسته شدن سشن های سیدنی,توکیو,لندن و نیویورک رو یک جا مقایسه کن.",
      en: "Compare the opening and closing times of the Sydney, Tokyo, London, and New York sessions all in one place.",
    },
  },

  {
    id: "news-page",
    scope: "news-status",
    element: "#news3",
    order: 38,

    side: "bottom",

    title: {
      fa: "فیلترنماشی سشن ها",
      en: "Session Display Filter",
    },

    description: {
      fa: "هرسشن را روشن یا خاموش کن تا فقط زمان های مورد نظرت روی نمودار دیده شوند.",
      en: "Turn each session on or off to show only the trading hours you want to see on the chart.",
    },
  },

  {
    id: "news-page",
    scope: "news-status",
    element: "#news4",
    order: 39,

    side: "bottom",

    title: {
      fa: "فیلترنماشی سشن ها",
      en: "Session Display Filter",
    },

    description: {
      fa: "هرسشن را روشن یا خاموش کن تا فقط زمان های مورد نظرت روی نمودار دیده شوند.",
      en: "Turn each session on or off to show only the trading hours you want to see on the chart.",
    },
  },

  {
    id: "ai-page",
    scope: "ai-trading",
    element: "#ai1",
    order: 40,

    side: "top",

    title: {
      fa: "جدول رویدادهای خبری",
      en: "News Event Calendar",
    },

    description: {
      fa: "جزئیات هر خبر میزان تاثیر و وضعیت معاملات را اینجا ببین;برای رویدادهای بیشتر ببین صفحه ها جابه جا شو.",
      en: "View each news event’s details, impact level, and trading status here. Navigate between pages to explore more events.",
    },
  },

  {
    id: "ai-page",
    scope: "ai-trading",
    element: "#ai2",
    order: 41,

    side: "top",

    title: {
      fa: "امتیازهای هوشمند حساب",
      en: "Smart Account Scores",
    },

    description: {
      fa: "نظم,میزان ریسک و احتمال موفقیتت اینجا امتیازدهی میشن;نمره کل هم جمع بندی وضعیت حسابته.",
      en: "Your discipline, risk management, and success probability are scored here. The overall score provides a complete summary of your account status.",
    },
  },

  {
    id: "ai-page",
    scope: "ai-trading",
    element: "#ai3",
    order: 42,

    side: "top",

    title: {
      fa: "نقشه رفتار معامله گر",
      en: "Trader Behavior Map",
    },

    description: {
      fa: "این نمودار شش ویژگی رفتاری تو رو کنار هم نشون میده تا نقاط قوت و بخش های نیازمند بهبود رو سریع ببینی.",
      en: "This chart displays six behavioral traits side by side, helping you quickly identify your strengths and areas that need improvement.",
    },
  },

  {
    id: "comparison-page",
    scope: "comparison",
    element: "#comp1",
    order: 43,

    side: "top",

    title: {
      fa: "گروه مقایسه را انتخاب کن",
      en: "Choose a Comparison Group",
    },

    description: {
      fa: "مشخص کن عملکرت با همه کاربران,کاربران همین چالش,کاربران چالش, کاربران ریل یا سابقه خودت مقایسه شود.",
      en: "Select whether to compare your performance with all users, users in the same challenge, challenge participants, live account traders, or your own historical performance.",
    },
  },

  {
    id: "comparison-page",
    scope: "comparison",
    element: "#comp2",
    order: 44,

    side: "top",

    title: {
      fa: "عملکرد و بازدهی",
      en: "Performance & Returns",
    },

    description: {
      fa: "میانگین سود هرمعامله,تعداد معاملات سودده,ریسک به ریوارد و زمان معاملات را با جامعه کاربران مقایسه کن",
      en: "Compare your average profit per trade, number of winning trades, risk-to-reward ratio, and trade duration against the broader trading community.",
    },
  },

  {
    id: "comparison-page",
    scope: "comparison",
    element: "#comp3",
    order: 45,

    side: "top",

    title: {
      fa: "رفتار معاملاتی",
      en: "Trading Behavior",
    },

    description: {
      fa: "تعداد معاملات روزانه,اندازه پوزیشن,نسبت خرید به فروش و معاملات بدون حدضرر را با کاربران مقایسه کن.",
      en: "Compare your daily trade count, position size, buy-to-sell ratio, and the number of trades placed without a stop loss against other traders.",
    },
  },

  {
    id: "comparison-page",
    scope: "comparison",
    element: "#comp4",
    order: 46,

    side: "top",

    title: {
      fa: "آمار کاربران رابین سود",
      en: "Robinsood User Statistics",
    },

    description: {
      fa: "درصد کاربران در سود,میانگین حجم و سود یا ضرر,نسبت خرید و فروش و تعداد معاملات باز را یکجا ببین.",
      en: "View the percentage of profitable users, average trading volume, average profit or loss, buy-to-sell ratio, and the number of open trades—all in one place.",
    },
  },

  {
    id: "trades-page",
    scope: "trades",
    element: "#trades1",
    order: 47,

    side: "top",

    title: {
      fa: "فیلتر معاملات",
      en: "Trade Filter",
    },

    description: {
      fa: "هرمعامله ای که میخوای رو سریع با فیلتر پیدا کن.",
      en: "Quickly find any trade you're looking for using powerful filters.",
    },
  },

  {
    id: "trades-page",
    scope: "trades",
    element: "#trades2",
    order: 48,

    side: "top",

    title: {
      fa: "وضع معاملات",
      en: "Trade Status",
    },

    description: {
      fa: "یه نگاه کافیه تا ببینی چندمعامله باز,بسته یا برنامه ریزی شده داری.",
      en: "A quick glance is all you need to see how many trades you have open, closed, or scheduled.",
    },
  },
  {
    id: "trades-page",
    scope: "trades",
    element: "#trades3",
    order: 49,

    side: "top",

    title: {
      fa: "جزئیات هر معامله",
      en: "Trade Details",
    },

    description: {
      fa: "از ورود و ریسک تا خروج و و سود و زیان; همه چی توی یک ردیفه.",
      en: "View everything about each trade in a single row — from entry and risk to exit, profit, and loss.",
    },
  },
  {
    id: "trades-page",
    scope: "trades",
    element: "#trades4",
    order: 50,

    side: "top",

    title: {
      fa: "صفحه بندی معاملات",
      en: "Trade Pagination",
    },

    description: {
      fa: "بین صفحه ها حرکت کن و تعداد کل معاملات رو هم یکجا ببین.",
      en: "Navigate between pages and view the total number of trades all in one place.",
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
