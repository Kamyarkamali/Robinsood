import { useTranslation } from "react-i18next";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { i18n } = useTranslation();

  useTheme();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#202020] dark:text-white transition-colors">
      <HomePage />
    </div>
  );
}

export default App;
