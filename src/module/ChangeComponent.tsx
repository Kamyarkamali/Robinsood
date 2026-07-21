import CalendarAnalysis from "../components/Calendaranalysis";
import TradingDualChart from "../components/TradingDualChart";

function ChangeComponent() {
  return (
    <>
      <div className="w-full grid grid-cols-1">
        <CalendarAnalysis />
        <TradingDualChart />
      </div>
    </>
  );
}

export default ChangeComponent;
