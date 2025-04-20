import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useDarkMode } from "../../contexts/DarkModeContext";
import DashboardBox from "./DashboardBox";
import { usePasswordStats } from "./usePasswordsStats";
import DashboardLoader from "./DashboardLoader";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

function getPasswordAgeGroups(passwords) {
  const today = new Date();
  const passwordAgeDistribution = {
    "0-6 months": 0,
    "6-12 months": 0,
    "1-2 years": 0,
    "2+ years": 0,
  };
  const passwordCreationTimeline = {
    "0-6 months": 0,
    "6-12 months": 0,
    "1-2 years": 0,
    "2+ years": 0,
  };

  passwords?.forEach((password) => {
    const updatedAt = new Date(password.updatedAt);
    const updateAgeMonths = (today - updatedAt) / (1000 * 60 * 60 * 24 * 30);

    const createdAt = new Date(password.createdAt);
    const creationAgeMonths = (today - createdAt) / (1000 * 60 * 60 * 24 * 30);

    if (updateAgeMonths < 6) {
      passwordAgeDistribution["0-6 months"]++;
    } else if (updateAgeMonths < 12) {
      passwordAgeDistribution["6-12 months"]++;
    } else if (updateAgeMonths < 24) {
      passwordAgeDistribution["1-2 years"]++;
    } else {
      passwordAgeDistribution["2+ years"]++;
    }

    if (creationAgeMonths < 6) {
      passwordCreationTimeline["0-6 months"]++;
    } else if (creationAgeMonths < 12) {
      passwordCreationTimeline["6-12 months"]++;
    } else if (creationAgeMonths < 24) {
      passwordCreationTimeline["1-2 years"]++;
    } else {
      passwordCreationTimeline["2+ years"]++;
    }
  });

  return { passwordAgeDistribution, passwordCreationTimeline };
}

function PasswordAgeChart() {
  const { isDarkMode } = useDarkMode();
  const { passwordsStats, isPending } = usePasswordStats();

  const { passwordAgeDistribution, passwordCreationTimeline } =
    getPasswordAgeGroups(
      passwordsStats?.map((p) => {
        return { createdAt: p.created_at, updatedAt: p.last_updated };
      }),
    );

  const data = {
    labels: Object.keys(passwordAgeDistribution),
    datasets: [
      {
        label: "Current Password Age",
        data: Object.values(passwordAgeDistribution),
        borderDash: [5, 5],
        borderColor: "#003ca4",
        backgroundColor: "#003ca4",
        tension: 0.3,
      },
      {
        label: "Password Creation History",
        data: Object.values(passwordCreationTimeline),
        backgroundColor: "#306cd3",
        borderColor: "#306cd3",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          boxWidth: 12,
          boxHeight: 12,
          color: isDarkMode ? "#dddfe2" : "#0b0f14",
          font: {
            family: "Work Sans",
            size: 12,
          },
          generateLabels: (chart) => {
            const labels =
              ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
            return labels.map((label) => ({
              ...label,
              pointStyle: "rect",
              rotation: 0,
            }));
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: isDarkMode
          ? "rgba(36 ,39, 44, 0.8)"
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
          title: (context) => context[0].label,
          label: (context) => {
            const datasetLabel = context.dataset.label;
            const value = context.parsed.y;

            if (value === 0) {
              return datasetLabel === "Current Password Age"
                ? " No Updated Passwords"
                : " No Created Passwords";
            }

            if (datasetLabel === "Current Password Age") {
              return ` ${value} Updated Password${value !== 1 ? "s" : ""}`;
            }
            return ` ${value} Created Password${value !== 1 ? "s" : ""}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDarkMode ? "rgba(61,63, 66, 0.4)" : "rgba(103,106,111, 0.2)",
        },
        title: {
          display: true,
          text: "Number of Passwords",
          font: {
            family: "Work Sans",
            size: 12,
            weight: 500,
          },
          color: isDarkMode ? "#c6c7ca" : "#24272c",
        },

        ticks: {
          stepSize: 1,
          precision: 0,
          color: isDarkMode ? "#dddfe2" : "#0b0f14",
          font: {
            family: "Work Sans",
            size: 12,
          },
        },
        border: {
          color: isDarkMode ? "#676a6f" : "#8d9094",
          width: 1,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDarkMode ? "#dddfe2" : "#0b0f14",
          font: {
            family: "Work Sans",
            size: 12,
          },
        },
        border: {
          color: isDarkMode ? "#676a6f" : "#8d9094",
          width: 1,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
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
        Password age and creation analysis
      </h4>
      <div className="h-56">
        <Line data={data} options={options} />
      </div>
    </DashboardBox>
  );
}

export default PasswordAgeChart;
