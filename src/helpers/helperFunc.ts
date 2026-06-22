import type { Lang } from "../types/type";

export function getStatusText(status: "active" | "inactive", lang: string) {
  const dict = {
    fa: {
      active: "فعال در چالش",
      inactive: "غیرفعال در چالش",
    },
    en: {
      active: "Active in Challenge",
      inactive: "Inactive in Challenge",
    },
  };

  return dict[lang === "fa" ? "fa" : "en"][status];
}

export function toPersianDigits(input: string | number): string {
  const fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(input).replace(/[0-9]/g, (d) => fa[Number(d)]);
}

export const toFa = (n: number) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

export const AN = (n: number, lang: Lang) =>
  lang === "fa" ? toFa(Math.abs(n)) : String(Math.abs(n));
