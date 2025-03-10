import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDarkMode } from "../../contexts/DarkModeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function PasswordsByVaultChart() {
  const { isDarkMode } = useDarkMode();

  const data = {
    labels: ["Vault 1", "Vault 2", "Vault 3", "Vault 4", "Vault 5"],
    datasets: [
      {
        label: "Passwords by vault",
        data: [10, 15, 8, 20, 12],
        backgroundColor: "#306CD3",
        hoverBackgroundColor: "#0049c6",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
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
          ? "rgba(26,28,33, 0.9)"
          : "rgba(228,238,254,0.9)",
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
            return ` ${value} password${value > 1 ? "s" : ""}`; // Add a space after the color box and value
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? "#dddfe2" : "#0b0f14",
          font: {
            family: "Work Sans",
            size: 12,
          },
        },
        grid: {
          display: false,
          borderColor: isDarkMode ? "#676a6f" : "#8d9094",
          borderWidth: 1,
        },
        border: {
          color: isDarkMode ? "#676a6f" : "#8d9094",
          width: 1,
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? "#dddfe2" : "#0b0f14",
          font: {
            family: "Work Sans",
            size: 12,
          },
        },
        grid: {
          display: false,
          borderColor: isDarkMode ? "#676a6f" : "#8d9094",
          borderWidth: 1,
        },
        border: {
          color: isDarkMode ? "#676a6f" : "#8d9094",
          width: 1,
        },
      },
    },
  };

  return <Bar data={data} options={options} className="h-50" />;
}

export default PasswordsByVaultChart;
