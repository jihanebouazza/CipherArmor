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

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function PasswordsByVaultChart() {
  const data = {
    labels: ["Vault 1", "Vault 2", "Vault 3", "Vault 4", "Vault 5"], // List of vaults
    datasets: [
      {
        label: "Passwords by Vault",
        data: [10, 15, 8, 20, 12],
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Color of the bars
        borderColor: "rgba(75, 192, 192, 1)", // Border color of the bars
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} className="h-50" />;
}

export default PasswordsByVaultChart;
