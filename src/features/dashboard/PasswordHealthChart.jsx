import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import pattern from "patternomaly";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useState, useEffect } from "react";
import DashboardLoader from "./DashboardLoader";
import { usePasswordStrength } from "./usePasswordStrength";

ChartJS.register(ArcElement, Tooltip, Legend);

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
  const { passwordsCount, isPending, strengthPercentages, passwordsStats } =
    usePasswordStrength();

  const breachedPasswords =
    (passwordsStats?.filter((p) => p.is_breached === true).length * 100) /
    passwordsCount;
  const reusedPasswords =
    (passwordsStats?.filter((p) => p.is_reused === true).length * 100) /
    passwordsCount;

  const passwordHealth = Math.round(
    Math.max(
      0,
      Math.min(
        100,
        strengthPercentages["Very Strong"] * 1.4 +
          strengthPercentages["Strong"] * 1.2 +
          strengthPercentages["Resilient"] * 0.8 +
          strengthPercentages["Moderate"] * 0.5 -
          (strengthPercentages["Weak"] * 1.2 +
            reusedPasswords * 1.5 +
            breachedPasswords * 1.8),
      ),
    ),
  );

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
          passwordHealth < 40
            ? isDarkMode
              ? "#c60003"
              : "#b00609"
            : passwordHealth >= 40 && passwordHealth < 60
              ? isDarkMode
                ? "#d6410b"
                : "#bd3605"
              : passwordHealth >= 60 && passwordHealth < 80
                ? isDarkMode
                  ? "#ffce73"
                  : "#f4bf5d"
                : isDarkMode
                  ? "#00c628"
                  : "#01aa23",

          pattern.draw(
            "diagonal-right-left",
            isDarkMode ? "#1a1c21" : "#fafcff",
            passwordHealth < 40
              ? isDarkMode
                ? "#c60003"
                : "#b00609"
              : passwordHealth >= 40 && passwordHealth < 60
                ? isDarkMode
                  ? "#d6410b"
                  : "#bd3605"
                : passwordHealth >= 60 && passwordHealth < 80
                  ? isDarkMode
                    ? "#ffce73"
                    : "#f4bf5d"
                  : isDarkMode
                    ? "#00c628"
                    : "#01aa23",
            10,
          ),
        ],
        borderWidth: 0,
        borderRadius: 16,
        spacing: 2,
      },
    ],
  };

  if (isPending) return <DashboardLoader />;

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
