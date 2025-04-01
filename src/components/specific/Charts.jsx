import React from "react";
import { Line, Doughnut, Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend,
} from "chart.js";
import { purpleLight, orange, purple } from "../../ constants/colors";
import { getLast7Days } from "../../lib/features";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Messages Count",
        data: value,
        backgroundColor: purpleLight,
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  cutout: 120,
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Total Chats vs Group Chats",
        data: value,
        offset: 40,
        backgroundColor: [purpleLight, orange],
        borderColor: [purple, orange],
      },
    ],
  };
  return <Doughnut style={{zIndex : 10}} data={data} options={options} />;
};

export { LineChart, DoughnutChart };
