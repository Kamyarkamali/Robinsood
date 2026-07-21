import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useTheme } from "./hooks/useTheme";
import TradeLoader from "./module/TradeLoading";
import HomePage from "./pages/HomePage";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { i18n } = useTranslation();

  useTheme();

  // loader fake
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    const all = document.querySelectorAll("*");

    all.forEach((el) => {
      const rect = el.getBoundingClientRect();

      if (rect.right > window.innerWidth) {
        console.log("overflow:", el, rect.width);
      }
    });
  }, []);

  if (loading) return <TradeLoader />;

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-black dark:bg-[#202020] dark:text-white transition-colors">
      <HomePage />
    </div>
  );
}

export default App;
