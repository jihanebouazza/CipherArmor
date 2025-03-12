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

  passwords.forEach((password) => {
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

const passwordData = [
  {
    createdAt: "2024-02-10T00:00:00+00:00",
    updatedAt: "2024-02-20T00:00:00+00:00",
  }, // Recently updated
  {
    createdAt: "2023-10-05T00:00:00+00:00",
    updatedAt: "2024-01-10T00:00:00+00:00",
  }, // Updated 3 months ago
  {
    createdAt: "2023-06-15T00:00:00+00:00",
    updatedAt: "2023-06-15T00:00:00+00:00",
  }, // Never updated
  {
    createdAt: "2023-03-20T00:00:00+00:00",
    updatedAt: "2024-01-05T00:00:00+00:00",
  }, // Updated 6 months ago
  {
    createdAt: "2022-12-10T00:00:00+00:00",
    updatedAt: "2023-12-10T00:00:00+00:00",
  }, // 1 year, updated last year
  {
    createdAt: "2022-06-25T00:00:00+00:00",
    updatedAt: "2022-06-25T00:00:00+00:00",
  }, // Never updated
  {
    createdAt: "2021-12-05T00:00:00+00:00",
    updatedAt: "2022-12-05T00:00:00+00:00",
  }, // Updated 1 year ago
  {
    createdAt: "2021-04-18T00:00:00+00:00",
    updatedAt: "2021-04-18T00:00:00+00:00",
  }, // Never updated
];

function PasswordAgeChart() {
  const { passwordAgeDistribution, passwordCreationTimeline } =
    getPasswordAgeGroups(passwordData);

  const data = {
    labels: Object.keys(passwordAgeDistribution),
    datasets: [
      {
        label: "Current Password Age",
        data: Object.values(passwordAgeDistribution),
        borderColor: "#4caf50",
        borderDash: [5, 5],
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointStyle: "rectRounded",
        borderRadius: 4,
        rotation: 0,
      },
      {
        label: "Password Creation History",
        data: Object.values(passwordCreationTimeline),
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointStyle: "rectRounded",
        borderRadius: 4,
        rotation: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          boxWidth: 16,
          boxHeight: 16,
          borderRadius: 4,
          pointStyle: "rectRounded",
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        usePointStyle: true,
        callbacks: {
          labelColor: (context) => ({
            borderColor: context.dataset.borderColor,
            backgroundColor: context.dataset.backgroundColor,
            borderWidth: 2,
            borderRadius: 4,
            borderDash: context.dataset.borderDash || [],
            width: 16,
            height: 16,
            pointStyle: "rectRounded",
            rotation: 0,
          }),
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
        title: {
          display: true,
          text: "Number of Passwords",
        },
      },
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Age Categories",
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return <Line data={data} options={options} />;
}

export default PasswordAgeChart;
