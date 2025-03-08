import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PasswordStatusChart() {
  const data = {
    labels: ["Very Strong", "Strong", "Resilient", "Moderate", "Weak"],
    datasets: [
      {
        data: [25, 40, 10, 15, 10],
        backgroundColor: [
          "#36A2EB", // Very Strong
          "#4BC0C0", // Strong
          "#FFCE56", // Resilient
          "#FF9F40", // Moderate
          "#FF6384", // Weak
        ],
        hoverOffset: 4,
        borderRadius: 4,
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
          borderRadius: 16,
          boxWidth: 12,
          boxHeight: 12,
          color: "#1a1a1a",
          font: {
            family: "Work Sans",
            size: 12,
          },
        },
      },
      tooltip: {
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
            return ` ${value}%`; // Add a space after the color box and value
          },
        },
      },
    },
    cutout: "65%",
  };

  return <Doughnut data={data} options={options} className="h-50" />;
}

export default PasswordStatusChart;
