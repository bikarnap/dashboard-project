import React from "react";
import "./SkeletonPieChart.css";

const SkeletonPieChart = () => {
  return (
    <div className="skeleton-pie-chart">
      {/* Circle skeleton to mimic a pie chart */}
      <div className="skeleton-pie"></div>
    </div>
  );
};

export default SkeletonPieChart;
