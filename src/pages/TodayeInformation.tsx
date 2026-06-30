import { useTranslation } from "react-i18next";
import ProgressCardsSection from "../components/ProgressCardsSection";
import TradingChartsGrid from "../components/TradingChartsGrid";

function TodayeInformation() {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="md:text-2xl text-md font-bold px-4 mb-4 mt-4">
        {t("labels.parametr3")}
      </h1>
      <div className="flex flex-col items-center w-full mx-auto">
        <ProgressCardsSection />
        <TradingChartsGrid />
      </div>
    </>
  );
}

export default TodayeInformation;
