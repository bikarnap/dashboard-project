import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Chart } from "react-chartjs-2";
import "./ChartCard.css"; // Import the CSS file
import Heading from "./Heading";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function ChartCard({ type, data, options, title }) {
  return (
    <div className="chart-card">
      <Heading heading="h3" text={title} />
      <div className="chart-container">
        <Chart type={type} data={data} options={options} />
      </div>
    </div>
  );
}

export default ChartCard;
