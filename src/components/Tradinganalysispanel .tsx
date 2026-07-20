import i18next from "i18next";
import {
  COMMENT,
  DATE,
  LABELS,
  RADAR_VALUES,
  STATS,
  TOTAL,
} from "../data/fakeData";
import type { Lang } from "../types/type";
import { useTranslation } from "react-i18next";

const toFa = (n: number) =>
  n.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
const numStr = (n: number, lang: Lang) => (lang === "fa" ? toFa(n) : String(n));

function polarXY(deg: number, r: number, cx = 135, cy = 135) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function RadarChart({ labels }: { labels: string[] }) {
  const cx = 135,
    cy = 135,
    R = 70,
    n = 6;
  const rings = [17.5, 35, 52.5, 70];

  const ringPts = (r: number) =>
    Array.from({ length: n }, (_, i) => {
      const p = polarXY(60 * i, r);
      return `${p.x},${p.y}`;
    }).join(" ");

  const dataPts = RADAR_VALUES.map((v, i) => {
    const p = polarXY(60 * i, (v / 100) * R);
    return `${p.x},${p.y}`;
  }).join(" ");

  return (
    <div className="w-full h-full overflow-visible">
      <svg viewBox="0 0 270 270" className="w-full h-full overflow-visible">
        {rings.map((r) => (
          <polygon
            className="radar-grid"
            key={r}
            points={ringPts(r)}
            fill="none"
            stroke="rgba(255,255,255,0.13)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: n }, (_, i) => {
          const p = polarXY(60 * i, R);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.13)"
              strokeWidth="1"
            />
          );
        })}
        <polygon
          points={dataPts}
          fill="rgba(180,30,40,0.55)"
          stroke="#c0392b"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {RADAR_VALUES.map((v, i) => {
          const p = polarXY(60 * i, (v / 100) * R);
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={4} fill="#c0392b" />
              <circle cx={p.x} cy={p.y} r={2} fill="#fff" />
            </g>
          );
        })}
        {labels.map((lbl, i) => {
          const p = polarXY(60 * i, R + 32);
          const anchor =
            Math.abs(p.x - cx) < 10 ? "middle" : p.x < cx ? "end" : "start";
          const dy = Math.abs(p.y - cy) < 10 ? "0.3em" : "0";
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize="9"
              dy={dy}
              className="fill-black/70 dark:fill-white"
              style={{
                paintOrder: "stroke",
                strokeWidth: "3px",
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }}
            >
              {lbl}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default function TradingAnalysisPanel() {
  const lang = i18next.language as Lang;
  const c = COMMENT[lang];
  const mx = numStr(100, lang);
  const { t } = useTranslation();

  return (
    <>
      <h1 className="md:text-2xl text-md font-bold px-4 mb-4 mt-4">
        {t("labels.parametr11")}
      </h1>
      <div id="ai" className="w-full mx-auto mt-3 ">
        <div
          dir={lang === "fa" ? "ltr" : "rtl"}
          className="
          w-full
          step-test47
          rounded-3xl
          bg-white
          dark:bg-[#2b2b2b]
          text-gray-800
          dark:text-white
          flex flex-col
          lg:flex-row
          relative
          p-0.5
        "
          style={{
            background: `linear-gradient(135deg, #CB30E0, #FF2D55)`,
          }}
        >
          <div className="flex-1 bg-white dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030] rounded-3xl overflow-hidden flex flex-col lg:flex-row">
            <section
              className="
            w-full
            lg:w-[40%]
            flex items-center justify-center
            p-2 sm:p-4 md:p-6
            border-b lg:border-b-0 lg:border-r
            border-gray-200
            dark:border-white/10
            overflow-visible
          "
            >
              <div className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] aspect-square overflow-visible">
                <RadarChart labels={LABELS[lang]} />
              </div>
            </section>

            <section
              className="
            w-full
            lg:w-[25%]
            flex flex-col justify-center
            px-4 sm:px-6 md:px-8
            py-4 sm:py-6 md:py-8
            border-b lg:border-b-0 lg:border-r
            border-gray-200
            dark:border-white/10
          "
            >
              <div className="space-y-3 sm:space-y-4 md:space-y-5 flex flex-col items-center">
                {STATS[lang].map((s, i) => (
                  <div
                    key={i}
                    className="text-center flex items-center justify-center sm:text-right w-full"
                  >
                    <span
                      className={`
                    text-[18px] sm:text-[20px] md:text-[23px] font-normal
                    ${
                      i === 0
                        ? "text-[#FFD233] dark:text-[#FFD233]"
                        : i === 1
                          ? "text-[#00E1D4] dark:text-[#00E1D4]"
                          : "text-[#29D8FF] dark:text-[#29D8FF]"
                    }
                  `}
                    >
                      {numStr(s.value, lang)}
                      <span className="text-[18px] sm:text-[20px] md:text-[23px] font-normal opacity-70 text-gray-600 dark:text-white">
                        /{mx}
                      </span>
                      <span className="font-normal text-center text-[18px] sm:text-[20px] md:text-[23px] text-gray-800 dark:text-white block sm:inline">
                        {s.label}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#00C8B3] dark:text-[#00C8B3]">
                    {numStr(TOTAL[lang].value, lang)}
                    <span className="text-base sm:text-lg md:text-xl opacity-70 text-gray-600 dark:text-white">
                      /{mx}
                    </span>
                    <span className="font-bold ml-2 sm:ml-4 text-base sm:text-lg md:text-xl text-gray-800 dark:text-white">
                      {TOTAL[lang].label}
                    </span>
                  </span>
                </div>
              </div>
            </section>

            <section
              className="
            w-full
            lg:w-[35%]
            flex flex-col
            justify-between
            px-4 sm:px-6 md:px-8
            py-4 sm:py-6 md:py-8
          "
            >
              <div className="flex flex-col w-full items-end">
                <div className="text-right font-normal text-[14px] sm:text-[16px] md:text-[18px] text-gray-700 dark:text-white mb-4 sm:mb-6">
                  {DATE[lang]}
                </div>

                <div
                  className="w-full text-right"
                  dir={lang === "fa" ? "rtl" : "ltr"}
                >
                  <p
                    className={` ${i18next.language === "fa" ? "text-right" : "text-left"} text-gray-900 dark:text-white text-[13px] sm:text-[14px] md:text-[15px] font-bold mb-2`}
                  >
                    {c.bold}
                  </p>
                  <p className="text-gray-600 dark:text-white/72 text-[11px] sm:text-[12px] md:text-[13px] leading-[1.8] sm:leading-[2] md:leading-[2.1] font-normal text-justify">
                    {c.body}
                  </p>
                  <p
                    className={` ${i18next.language === "fa" ? "text-right" : "text-left"} text-gray-700 dark:text-white/90 text-[13px] sm:text-[14px] md:text-[15px] mt-3 sm:mt-4`}
                  >
                    {c.daily}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
