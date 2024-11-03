import React from 'react';
import './SkeletonCard.css'; // Add styles for skeleton loading

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-title"></div>
      <div className="skeleton-content"></div>
    </div>
  );
};

export default SkeletonCard;
