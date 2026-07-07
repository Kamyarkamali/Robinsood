// utils/dateConverter.ts

function toPersianDigits(input: string | number): string {
  return input.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d, 10)]);
}

export function gregorianToJalali(date: Date): string {
  const gy = date.getFullYear();
  const gm = date.getMonth() + 1;
  const gd = date.getDate();

  const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0) {
    g_days_in_month[1] = 29;
  }

  let jy = gy - 621;
  let g_day_no = 0;

  for (let i = 0; i < gm - 1; i++) {
    g_day_no += g_days_in_month[i];
  }
  g_day_no += gd;

  const leap = ((jy - 1) % 33) % 4 === 0;
  const j_days_in_month = [
    31,
    31,
    31,
    31,
    31,
    31,
    30,
    30,
    30,
    30,
    30,
    leap ? 30 : 29,
  ];

  let j_day_no = g_day_no - 79;

  if (j_day_no <= 0) {
    jy--;
    j_day_no += leap ? 11 : 10;
  }

  let i = 0;
  while (j_day_no > j_days_in_month[i]) {
    j_day_no -= j_days_in_month[i];
    i++;
  }

  const jalaliMonth = i + 1;
  const jalaliDay = j_day_no;

  return `${toPersianDigits(jy)}/${toPersianDigits(jalaliMonth)}/${toPersianDigits(jalaliDay)}`;
}

export function jalaliToGregorian(jalaliDate: string): Date | null {
  try {
    const parts = jalaliDate.split("/");
    if (parts.length !== 3) return null;

    const jy = parseInt(parts[0]);
    const jm = parseInt(parts[1]);
    const jd = parseInt(parts[2]);

    if (isNaN(jy) || isNaN(jm) || isNaN(jd)) return null;

    const leap = ((jy - 1) % 33) % 4 === 0;
    const j_days_in_month = [
      31,
      31,
      31,
      31,
      31,
      31,
      30,
      30,
      30,
      30,
      30,
      leap ? 30 : 29,
    ];

    let j_day_no = 0;
    for (let i = 0; i < jm - 1; i++) {
      j_day_no += j_days_in_month[i];
    }
    j_day_no += jd;

    let g_day_no = j_day_no + 79;
    let gy = jy + 621;

    const daysInYear =
      (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 366 : 365;

    if (g_day_no > daysInYear) {
      gy++;
      g_day_no -= daysInYear;
    }

    const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0) {
      g_days_in_month[1] = 29;
    }

    let i = 0;
    while (g_day_no > g_days_in_month[i]) {
      g_day_no -= g_days_in_month[i];
      i++;
    }

    const gm = i + 1;
    const gd = g_day_no;

    return new Date(gy, gm - 1, gd);
  } catch {
    return null;
  }
}

export function isValidPersianDate(dateStr: string): boolean {
  const pattern = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
  if (!pattern.test(dateStr)) return false;

  const parts = dateStr.split("/");
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);

  if (year < 1300 || year > 1500) return false;
  if (month < 1 || month > 12) return false;

  const leap = ((year - 1) % 33) % 4 === 0;
  const daysInMonth = [
    31,
    31,
    31,
    31,
    31,
    31,
    30,
    30,
    30,
    30,
    30,
    leap ? 30 : 29,
  ];

  return day >= 1 && day <= daysInMonth[month - 1];
}
