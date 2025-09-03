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
import DashboardBox from "./DashboardBox";
import { useAllVaults } from "../vaults/useAllVaults";
import DashboardLoader from "./DashboardLoader";

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
  const { vaults, isPending } = useAllVaults();

  const vaultsWithPasswords = vaults?.filter((v) => v.password_count > 0) || [];

  const data = {
    labels: vaultsWithPasswords?.map((v) => v.name),
    datasets: [
      {
        label: "Passwords by vault",
        data: vaultsWithPasswords?.map((v) => v.password_count),
        backgroundColor: "#306CD3",
        hoverBackgroundColor: "#0049c6",
        borderRadius: 8,
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

  if (isPending)
    return (
      <DashboardBox extraStyles="col-span-4 row-span-2 px-4 py-3 lg:col-span-5">
        <DashboardLoader />
      </DashboardBox>
    );

  return (
    <DashboardBox extraStyles="col-span-4 row-span-2 px-4 py-3 lg:col-span-5">
      <h4 className="font-heading dark:text-charcoal-100 pb-1 text-xl font-semibold">
        Passwords by vault
      </h4>
      {vaultsWithPasswords.length ? (
        <div className="h-56">
          <Bar data={data} options={options} className="h-50" />
        </div>
      ) : (
        <div className="flex w-full items-center justify-center text-center sm:h-fit lg:h-full">
          No passwords in your vaults yet. Add some to see them here.
        </div>
      )}
    </DashboardBox>
  );
}

export default PasswordsByVaultChart;
