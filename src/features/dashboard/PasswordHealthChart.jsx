import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import pattern from "patternomaly";
import { useDarkMode } from "../../contexts/DarkModeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const passwordHealth = 65;

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  cutout: "80%",
  rotation: -90,
  circumference: 180,
  layout: {
    padding: 0, // Remove any extra space around the chart
  },
};

export default function PasswordHealthChart() {
  const { isDarkMode } = useDarkMode();

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
    <div className="flex h-[200px] justify-center">
      <Doughnut data={data} options={options} width={224} />
    </div>
  );
}
