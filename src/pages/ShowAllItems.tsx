import { useTranslation } from "react-i18next";
import ChallengeGrid from "../components/ChallengeGrid";
import DetailseComponent from "../components/DetailseComponent";
import InformationAccount from "../components/InformationAccount";
import ProgressCardsSection from "../components/ProgressCardsSection";
import TradingChart from "../components/TradingChart";
import TradingChartsGrid from "../components/TradingChartsGrid";
import WellcomeComponent from "../components/WellcomeComponent";

function ShowAllItems() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="w-full lg:w-auto flex justify-start lg:justify-end">
        <WellcomeComponent />
      </div>
      <div className="w-full lg:w-auto flex justify-start mt-8">
        <DetailseComponent />
      </div>
      <div className="w-full lg:w-auto flex justify-start mt-8">
        <InformationAccount />
      </div>
      <div className="w-full lg:w-auto flex justify-start mt-8">
        <ChallengeGrid />
      </div>
      <div className="w-full mt-8">
        <h1 className=" dark:text-white text-gray-700 lg:px-8 md:px-3 sm:px-5 px-8  mb-4 text-[15px] sm:text-[17px] md:text-[25px] lg:text-[32px] font-bold">
          {t("labels.parametr3")}
        </h1>

        <div className="flex flex-col items-center lg:flex-row lg:mt-8">
          <ProgressCardsSection />
          <TradingChartsGrid />
        </div>
      </div>
      <div className="w-full max-w-350 mx-auto mt-8 px-2 sm:px-3 lg:px-4">
        <h1 className="dark:text-white text-gray-700 text-[15px] sm:text-[17px] md:text-[25px] lg:px-8 md:px-3 sm:px-5 px-5 lg:text-[32px] font-bold mb-4">
          {t("labels.parametr4")}
        </h1>
        <div className="w-full">
          <TradingChart />
        </div>
      </div>
    </div>
  );
}

export default ShowAllItems;
