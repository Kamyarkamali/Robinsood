import i18next from "i18next";
import TradingCover from "../module/Tradingcover ";
import CardAccounts from "./CardAccounts";
import CardComponent from "./CardComponent";
import { createAppTour } from "../components/tour/appTour";
import DashboardCards from "../components/modals/DashboardCards";

function MyAccounts() {
  const handleStartTour = () => {
    const lang = i18next.language === "fa" ? "fa" : "en";

    const theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";

    createAppTour(lang, theme).drive();
  };

  return (
    <div>
      <section className="hidden md:block">
        <TradingCover />
      </section>
      <section className="mt-5">
        <CardAccounts />
      </section>
      <section className="mt-5">
        <CardComponent onStartTour={handleStartTour} />
      </section>
      <section className="mt-4">
        {/* @ts-ignore */}
        <DashboardCards />
      </section>
    </div>
  );
}

export default MyAccounts;
