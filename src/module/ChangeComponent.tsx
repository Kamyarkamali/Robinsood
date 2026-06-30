import { useTranslation } from "react-i18next";
import CalendarAnalysis from "../components/Calendaranalysis";
import TradingDualChart from "../components/TradingDualChart";

function ChangeComponent() {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="md:text-2xl text-md font-bold px-4 mb-4 mt-4">
        {t("tabale2.calander")}
      </h1>

      <div className="w-full grid grid-cols-1">
        <CalendarAnalysis />
        <TradingDualChart />
      </div>
    </>
  );
}

export default ChangeComponent;
