import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import pattern from "patternomaly";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const passwordHealth = 65;

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  cutout: "80%",
  rotation: -90,
  circumference: 180,
  layout: {
    padding: 0,
  },
};

export default function PasswordHealthChart() {
  const { isDarkMode } = useDarkMode();
  const [chartKey, setChartKey] = useState(0); // Key to force re-render

  // const passwordHealth = Math.round(
  //   Math.max(
  //     0,
  //     Math.min(
  //       100,
  //       ((stats.veryStrong * 1.2 +
  //         stats.strong +
  //         stats.resilient * 0.8 +
  //         stats.moderate * 0.5 -
  //         (stats.weak * 1.5 + stats.reused * 1.5 + stats.breached * 2)) /
  //         stats.total) *
  //         100,
  //     ),
  //   ),
  // );

  useEffect(() => {
    setChartKey((prevKey) => prevKey + 1); // Change key when theme changes
  }, [isDarkMode]);

  const chartTextPlugin = {
    id: "chartTextPlugin",
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;

      if (!chartArea) return;

      const xCoor = chartArea.left + (chartArea.right - chartArea.left) / 2;
      const yCoor =
        chartArea.top + (chartArea.bottom - chartArea.top) * 0.8 - 10;
      const secondLineY = yCoor + 24;

      ctx.save();

      // First line: Percentage
      ctx.font = "600 32px Work Sans";
      ctx.fillStyle = isDarkMode ? "#edeeee" : "#0b0f14";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${passwordHealth}%`, xCoor, yCoor);

      // Second line: "Password Health"
      ctx.font = "14px Work Sans";
      ctx.fillStyle = isDarkMode ? "#8d9094" : "#3d3f42";
      ctx.fillText("Password Health", xCoor, secondLineY);

      ctx.restore();
    },
  };

  const data = {
    labels: [""],
    datasets: [
      {
        data: [passwordHealth, 100 - passwordHealth],
        backgroundColor: [
          isDarkMode ? "#01AA23" : "#00C628",
          pattern.draw(
            "diagonal-right-left",
            isDarkMode ? "#1a1c21" : "#fafcff",
            isDarkMode ? "#01AA23" : "#01AA23",
            10,
          ),
        ],
        borderWidth: 0,
        borderRadius: 16,
        spacing: 2,
      },
    ],
  };

  return (
    <div className="flex h-[110px] w-[220px] items-center justify-center overflow-hidden">
      <Doughnut
        key={chartKey} // Forces re-render on theme change
        data={data}
        options={options}
        plugins={[chartTextPlugin]}
        width={200}
        height={200}
      />
    </div>
  );
}
