import { RadialBarChart, RadialBar } from "recharts";

const ParametrComponent = () => {
  const مقدارفعلی = 900;
  const ماکزیمم = 5000;
  const درصد = (مقدارفعلی / ماکزیمم) * 100;

  const data = [
    { name: "FL", value: درصد, fill: "#10b981" }, // سبز
    { name: "باقیمانده", value: 100 - درصد, fill: "#1a1a1a" }, // سیاه برای قسمت خالی
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ position: "relative", width: 160, height: 160 }}>
          <RadialBarChart
            width={160}
            height={160}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            barSize={15}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar dataKey="value" cornerRadius={10} stackId="a" />
          </RadialBarChart>

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}
            >
              {مقدارفعلی}
            </div>
            <div style={{ fontSize: "12px", color: "#94a3b8" }}>(%)</div>
          </div>
        </div>
        <div style={{ marginTop: "8px", fontWeight: "500", color: "white" }}>
          FL
        </div>
      </div>
    </div>
  );
};

export default ParametrComponent;
