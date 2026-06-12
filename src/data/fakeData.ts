import type { ChallengeCard } from "../types/interfaces";

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
    title: "درادون روزانه",
    status: "active",
    iconColor: "green",
    chart: { current: 1000, max: 5000, color: "#22c55e", bgColor: "#0a2a0a" },
    metrics: [
      { label: "درادون مجاز امروز", value: "$۹۵۰۰ = (۵%)" },
      { label: "فاصله تا درادون روزانه", value: "" },
      { type: "orange", text: "$۲۰۰(۲%) مصرف شده" },
      { type: "blue", text: "$۳۰۰(۵%) مانده" },
    ],
  },
  {
    id: "5",
    title: "درادون کل",
    status: "active",
    iconColor: "green",
    chart: { current: 2000, max: 5000, color: "#22c55e", bgColor: "#0a2a0a" },
    metrics: [
      { label: "درادون مجاز امروز", value: "$۹۵۰۰ = (۵%)" },
      { label: "فاصله تا درادون روزانه", value: "" },
      { type: "orange", text: "$۲۰۰(۲%) مصرف شده" },
      { type: "blue", text: "$۳۰۰(۵%) مانده" },
    ],
  },
  {
    id: "4",
    title: "روز های معاملاتی",
    status: "active",
    iconColor: "green",
    chart: { current: 3000, max: 5000, color: "#22c55e", bgColor: "#0a2a0a" },
    metrics: [
      { label: "تعداد روزهای معاملاتی", value: "۳ / ۵" },
      { label: "روزهای مجاز چالش", value: "۴ روز الی بی‌نهایت" },
    ],
  },
  {
    id: "3",
    title: "لات",
    status: "inactive",
    iconColor: "red",
    chart: { current: 3750, max: 5000, color: "#ef4444", bgColor: "#2a0a0a" },
    metrics: [
      { label: "لات مجاز امروز", value: "۱.۵ / ۲" },
      { label: "تعداد معاملات امروز", value: "۵" },
      { label: "میانگین لات امروز", value: "۰.۳" },
    ],
  },
  {
    id: "1",
    title: "درگیری حساب",
    status: "inactive",
    iconColor: "yellow",
    chart: { current: 2250, max: 5000, color: "#eab308", bgColor: "#2a2200" },
    metrics: [
      { label: "MDL", value: "" },
      { label: "", value: "۳۹۰۰$(۵%)" },
      { label: "FL", value: "" },
      { label: "", value: "۳۹۰۰$(۵%)" },
    ],
  },
  {
    id: "2",
    title: "درگیری حساب",
    status: "inactive",
    iconColor: "yellow",
    chart: { current: 1500, max: 5000, color: "#eab308", bgColor: "#2a2200" },
    metrics: [
      { label: "ریسک کل", value: "$۳۵(۰.۵۵%)" },
      { label: "SL", value: "۰.۳" },
      { label: "ریسک مارجین", value: "$۳۵(۰.۵۵%)" },
    ],
  },
];
