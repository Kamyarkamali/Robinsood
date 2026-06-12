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
