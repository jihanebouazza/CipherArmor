import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDarkMode } from "../../contexts/DarkModeContext";
import DashboardBox from "./DashboardBox";
import DashboardLoader from "./DashboardLoader";
import { useDashboardStats } from "../../contexts/DashboardStatsContext ";

ChartJS.register(ArcElement, Tooltip, Legend);

function PasswordStatusChart() {
  const { isDarkMode } = useDarkMode();
  const { isPendingPasswords, strengthPercentages } = useDashboardStats();

  const data = {
    labels: Object.keys(strengthPercentages),
    datasets: [
      {
        data: Object.values(strengthPercentages),
        backgroundColor: [
          "#306CD3", // Very Strong
          "#00c628", // Strong
          "#ffce73", // Resilient
          "#d6410b", // Moderate
          "#c60003", // Weak
        ],
        hoverBackgroundColor: [
          "#0049c6",
          "#01aa23",
          "#f4bf5d",
          "#bd3605",
          "#b00609",
        ],
        hoverOffset: 4,
        borderRadius: 6,
        borderColor: isDarkMode ? "#1a1c21" : "#fafcff",
        borderWidth: 2,
        hoverBorderColor: isDarkMode ? "#24272c" : "#e4eefe",
        borderAlign: "inner",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          color: isDarkMode ? "#dddfe2" : "#0b0f14",
          font: {
            family: "Work Sans",
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: isDarkMode
          ? "rgba(26,28,33, 0.8)"
          : "rgba(250,252, 255,0.8)",
        titleColor: isDarkMode ? "#edeeee" : "#0b0f14",
        bodyColor: isDarkMode ? "#dddfe2" : "#1a1c21",
        titleFont: {
          family: "Work Sans",
          weight: "600",
          size: 14,
        },
        bodyFont: {
          family: "Work Sans",
        },
        callbacks: {
          label: function (context) {
            const value = context.raw || "";
            return ` ${value}%`;
          },
        },
      },
    },
    cutout: "65%",
  };

  if (isPendingPasswords)
    return (
      <DashboardBox extraStyles="col-span-4 row-span-2 px-4 py-3 lg:col-span-3">
        <DashboardLoader />
      </DashboardBox>
    );

  return (
    <DashboardBox extraStyles="col-span-4 row-span-2 px-4 py-3 lg:col-span-3">
      <h4 className="font-heading dark:text-charcoal-100 pb-1 text-xl font-semibold">
        Password status overview
      </h4>
      <div>
        <Doughnut data={data} options={options} className="h-50" />
      </div>
    </DashboardBox>
  );
}

export default PasswordStatusChart;
