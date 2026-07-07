import { useTranslation } from "react-i18next";
import { capitalData, middleData, statsData } from "../data/fakeData";

const vc = (c?: "green" | "red") =>
  c === "green"
    ? "text-emerald-500 dark:text-emerald-400"
    : c === "red"
      ? "text-red-500 dark:text-red-400"
      : "text-gray-900 dark:text-white";

const ROW_BASE =
  "flex items-center border-b last:border-0 border-gray-200 dark:border-white/5";

const EVEN_BG = "bg-gray-100 dark:bg-[#282828]";

const ODD_BG = "bg-gray-200/60 dark:bg-[#313131]";

const TEXT_MAIN = "text-gray-900 dark:text-gray-100";

const TEXT_SECONDARY = "text-gray-600 dark:text-gray-400";

const StatsTable = ({
  title,
  data,
  valueKey = "value",
  labelKeyFa = "labelFa",
  labelKeyEn = "labelEn",
  valueColorKey = "valueColor",
  showValue = true,
  hasHeader = true,
}: {
  title?: string;
  data: any[];
  valueKey?: string;
  labelKeyFa?: string;
  labelKeyEn?: string;
  valueColorKey?: string;
  showValue?: boolean;
  hasHeader?: boolean;
}) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {hasHeader && title && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2B2B2B]">
          <span className={`text-sm block text-center font-bold ${TEXT_MAIN}`}>
            {title}
          </span>
        </div>
      )}

      {!hasHeader && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2B2B2B]">
          <span className="text-sm block text-center text-transparent select-none">
            ‌
          </span>
        </div>
      )}

      {/* ردیف‌ها */}
      {data.map((row, i) => (
        <div
          key={i}
          className={`${ROW_BASE} ${i % 2 === 0 ? EVEN_BG : ODD_BG}`}
        >
          <div className="w-full flex items-center justify-center px-3 py-2 gap-3">
            {showValue && (
              <span className={`text-sm font-bold ${vc(row[valueColorKey])}`}>
                {row[valueKey]}
              </span>
            )}
            <span className={`text-xs ${TEXT_SECONDARY}`}>
              {isRtl ? row[labelKeyFa] : row[labelKeyEn]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function TradingStatsTable() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "fa";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="p-2 sm:p-4">
      <div className="md:hidden space-y-4">
        <StatsTable
          title={t("labaleTabale.labale1")}
          data={statsData}
          valueKey="value"
          valueColorKey="valueColor"
        />

        <StatsTable
          data={middleData}
          valueKey={isRtl ? "valueFa" : "valueEn"}
          valueColorKey="valueColor"
          labelKeyFa="labelFa"
          labelKeyEn="labelEn"
          hasHeader={false}
        />

        <StatsTable
          title={t("labaleTabale.labale2")}
          data={capitalData}
          valueKey="value"
          valueColorKey="valueColor"
        />
      </div>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsTable
          title={t("labaleTabale.labale1")}
          data={statsData}
          valueKey="value"
          valueColorKey="valueColor"
        />

        <StatsTable
          data={middleData}
          valueKey={isRtl ? "valueFa" : "valueEn"}
          valueColorKey="valueColor"
          labelKeyFa="labelFa"
          labelKeyEn="labelEn"
          hasHeader={false}
        />

        <StatsTable
          title={t("labaleTabale.labale2")}
          data={capitalData}
          valueKey="value"
          valueColorKey="valueColor"
        />
      </div>
    </div>
  );
}
