type Language = "fa" | "en" | string;

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const ENGLISH_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const convertDigits = (num: string | number, lang: Language): string => {
  const strNum = String(num);

  if (lang === "fa") {
    return strNum.replace(/[0-9]/g, (d) => PERSIAN_DIGITS[parseInt(d)]);
  } else {
    return strNum.replace(/[۰-۹]/g, (d) => {
      const index = PERSIAN_DIGITS.indexOf(d);
      return index !== -1 ? ENGLISH_DIGITS[index] : d;
    });
  }
};

export const formatWithComma = (
  num: number | string,
  lang: Language,
): string => {
  const numStr = typeof num === "string" ? num.replace(/,/g, "") : String(num);
  const parts = numStr.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const result = decimalPart
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;

  return convertDigits(result, lang);
};

export const formatNumberWithSign = (
  value: string | number,
  lang: Language,
): string => {
  const strValue = String(value);

  const match = strValue.match(/^([+\-]?)([\d,.]*)(.*)$/);
  if (!match) return strValue;

  const [, sign, numberPart, suffix] = match;

  if (!numberPart) return strValue;

  const cleanNumber = numberPart.replace(/,/g, "");

  const convertedNumber = convertDigits(cleanNumber, lang);

  const convertedSuffix = convertDigits(suffix, lang);

  if (lang === "fa" && sign === "-") {
    return `-${convertedNumber}${convertedSuffix}`;
  }

  return `${sign}${convertedNumber}${convertedSuffix}`;
};

export const formatCurrency = (
  value: number | string,
  lang: Language,
  currency: string = "$",
): string => {
  const num =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;

  if (isNaN(num)) return String(value);

  const formatted = formatWithComma(Math.abs(num), lang);
  const sign = num < 0 ? "-" : "";

  if (lang === "fa") {
    return `${sign}${formatted} ${currency}`;
  }

  return `${sign}${currency}${formatted}`;
};

export const formatPercent = (
  value: number | string,
  lang: Language,
  showSign: boolean = true,
): string => {
  const num =
    typeof value === "string"
      ? parseFloat(value.replace(/%/g, "").trim())
      : value;

  if (isNaN(num)) return String(value);

  const absNum = Math.abs(num);
  const formatted = formatWithComma(absNum, lang);
  const sign = num > 0 && showSign ? "+" : num < 0 ? "-" : "";

  return `${sign}${formatted}%`;
};

export const numberToWords = (num: number): string => {
  const units = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
  const tens = [
    "",
    "ده",
    "بیست",
    "سی",
    "چهل",
    "پنجاه",
    "شصت",
    "هفتاد",
    "هشتاد",
    "نود",
  ];
  const hundreds = [
    "",
    "صد",
    "دویست",
    "سیصد",
    "چهارصد",
    "پانصد",
    "ششصد",
    "هفتصد",
    "هشتصد",
    "نهصد",
  ];

  if (num === 0) return "صفر";
  if (num < 0) return `منفی ${numberToWords(Math.abs(num))}`;
  if (num < 10) return units[num];
  if (num < 100) {
    const unit = num % 10;
    const ten = Math.floor(num / 10);
    return unit === 0 ? tens[ten] : `${tens[ten]} و ${units[unit]}`;
  }
  if (num < 1000) {
    const hundred = Math.floor(num / 100);
    const remainder = num % 100;
    return remainder === 0
      ? hundreds[hundred]
      : `${hundreds[hundred]} و ${numberToWords(remainder)}`;
  }
  return String(num);
};

export const convertNumbersInObject = <T extends object>(
  obj: T,
  lang: Language,
): T => {
  if (!obj || typeof obj !== "object") return obj;

  const result: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "string") {
      result[key] = formatNumberWithSign(value, lang);
    } else if (typeof value === "number") {
      result[key] = convertDigits(value, lang);
    } else if (typeof value === "object" && value !== null) {
      result[key] = convertNumbersInObject(value, lang);
    } else {
      result[key] = value;
    }
  }

  return result;
};

import { useMemo } from "react";
import i18next from "i18next";

export const useNumberFormatter = () => {
  const lang = i18next.language;

  return useMemo(
    () => ({
      convert: (num: string | number) => convertDigits(num, lang),
      formatWithComma: (num: number | string) => formatWithComma(num, lang),
      formatWithSign: (value: string | number) =>
        formatNumberWithSign(value, lang),
      formatCurrency: (value: number | string, currency?: string) =>
        formatCurrency(value, lang, currency),
      formatPercent: (value: number | string, showSign?: boolean) =>
        formatPercent(value, lang, showSign),
      convertObject: <T extends object>(obj: T) =>
        convertNumbersInObject(obj, lang),
    }),
    [lang],
  );
};
