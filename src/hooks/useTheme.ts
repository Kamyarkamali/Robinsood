import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

type ResolvedTheme = "light" | "dark";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = localStorage.getItem("theme");

  if (
    storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
  ) {
    return storedTheme;
  }

  return "system";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  const [systemTheme, setSystemTheme] =
    useState<ResolvedTheme>(getSystemTheme);

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? systemTheme : theme;

  const isDark = resolvedTheme === "dark";

  // اعمال Theme روی html
  useEffect(() => {
    const root = document.documentElement;

    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, resolvedTheme]);

  // گوش دادن به تغییر Theme سیستم
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      const newSystemTheme: ResolvedTheme = event.matches
        ? "dark"
        : "light";

      setSystemTheme(newSystemTheme);
    };

    // مقدار اولیه
    setSystemTheme(media.matches ? "dark" : "light");

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  // هماهنگ کردن تغییر Theme بین Tabها
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== "theme") return;

      const newTheme = event.newValue;

      if (
        newTheme === "light" ||
        newTheme === "dark" ||
        newTheme === "system"
      ) {
        setTheme(newTheme);
      } else {
        setTheme("system");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setLight = () => {
    setTheme("light");
  };

  const setDark = () => {
    setTheme("dark");
  };

  const setSystem = () => {
    setTheme("system");
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  return {
    theme,
    resolvedTheme,
    isDark,

    toggleTheme,
    setLight,
    setDark,
    setSystem,
  };
}