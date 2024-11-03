import React from "react";
import "./SkeletonChart.css"; // Import the CSS file for the skeleton styles

const SkeletonChart = () => {
  return (
    <div className="skeleton-chart">
      {/* Skeleton for the chart title */}
      <div className="skeleton-title"></div>

      {/* Skeleton for the chart body */}
      <div className="skeleton-bars">
        {/* Skeleton bars to mimic chart data */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="skeleton-bar"></div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonChart;
