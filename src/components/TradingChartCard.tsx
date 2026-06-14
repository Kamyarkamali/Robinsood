import React from "react";
import type { ChartData2 } from "../types/interfaces";

interface Props {
  data: ChartData2;
}

const Y_LABELS = ["مجموع", "لات", "روزانه"];

const TradingChartCard: React.FC<Props> = ({ data }) => {
  const chartHeight = 120;
  const barWidth = 14;
  const gap = 34;
  const paddingLeft = 52;
  const paddingBottom = 28;
  const paddingTop = 16;
  const paddingRight = 72;

  const totalBars = data.days.length;

  const svgWidth =
    paddingLeft + totalBars * (barWidth + gap) - gap + paddingRight;

  const BASE_WIDTH = svgWidth;

  const svgHeight = chartHeight + paddingTop + paddingBottom;

  const yPositions = [
    paddingTop,
    paddingTop + chartHeight * 0.5,
    paddingTop + chartHeight,
  ];

  const avgY = paddingTop + chartHeight * (1 - data.averageLine);

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <h3
        className="text-center dark:text-white text-gray-600 text-sm sm:text-base lg:text-lg font-normal tracking-wide"
        style={{
          direction: "rtl",
          fontFamily: "inherit",
        }}
      >
        {data.title}
      </h3>

      <div className="w-full flex items-center justify-center p-3 dark:bg-[#282828] bg-linear-to-t dark:from-[#1e1e1e] dark:to-[#2a2a2a] border-4 rounded-[21.24px] border-gray-300 dark:border-[#3C3C3C] overflow-hidden">
        <svg
          className="w-full h-auto"
          viewBox={`0 0 ${BASE_WIDTH} ${svgHeight}`}
          preserveAspectRatio="xMidYMid meet"
          style={{
            overflow: "visible",
            direction: "ltr",
          }}
        >
          {yPositions.map((y, i) => (
            <line
              key={i}
              x1={paddingLeft}
              y1={y}
              x2={svgWidth - paddingRight}
              y2={y}
              stroke="#444"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {Y_LABELS.map((label, i) => (
            <text
              key={i}
              x={paddingLeft - 6}
              y={yPositions[i] + 4}
              textAnchor="end"
              fill="#aaa"
              fontSize="10"
              fontFamily="inherit"
            >
              {label}
            </text>
          ))}

          {data.days.map((day, i) => {
            const barH = day.value * chartHeight;
            const x = paddingLeft + i * (barWidth + gap);
            const y = paddingTop + chartHeight - barH;

            return (
              <g key={i}>
                <path
                  d={`
                    M ${x} ${y + barH}
                    L ${x} ${y + 8}
                    Q ${x} ${y} ${x + 8} ${y}
                    L ${x + barWidth - 8} ${y}
                    Q ${x + barWidth} ${y} ${x + barWidth} ${y + 8}
                    L ${x + barWidth} ${y + barH}
                    Z
                  `}
                  fill={day.color}
                />

                <text
                  x={x + barWidth / 2}
                  y={svgHeight - 6}
                  textAnchor="middle"
                  fill="#aaa"
                  fontSize="9"
                  fontFamily="inherit"
                >
                  {day.label}
                </text>
              </g>
            );
          })}

          <line
            x1={paddingLeft}
            y1={avgY}
            x2={svgWidth - paddingRight}
            y2={avgY}
            stroke="#29b6f6"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />

          <text
            x={svgWidth - paddingRight + 6}
            y={paddingTop + 6}
            fill="#43A047"
            fontSize="11"
            fontWeight="bold"
            fontFamily="inherit"
          >
            +{data.plusPercent}٪
          </text>

          <text
            x={svgWidth - paddingRight + 6}
            y={avgY + 4}
            fill="#29b6f6"
            fontSize="10"
            fontFamily="inherit"
          >
            میانگین
          </text>

          <text
            x={svgWidth - paddingRight + 6}
            y={paddingTop + chartHeight + 4}
            fill="#E53935"
            fontSize="11"
            fontWeight="bold"
            fontFamily="inherit"
          >
            -{Math.abs(data.minusPercent)}٪
          </text>
        </svg>
      </div>
    </div>
  );
};

export default TradingChartCard;
