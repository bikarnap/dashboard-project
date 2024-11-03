import React from 'react';
import './SekeltonJenkinsJobsBuildsTable.css'

const SkeletonJenkinsJobBuildsTable = () => {
  const rows = Array.from({ length: 10 }); // Create 10 rows as placeholders

  return (
    <div className="skeleton-table">
      <div className="skeleton-header skeleton-row">
        <div className="skeleton-cell" style={{ width: '20%' }}></div>
        <div className="skeleton-cell" style={{ width: '20%' }}></div>
        <div className="skeleton-cell" style={{ width: '20%' }}></div>
        <div className="skeleton-cell" style={{ width: '20%' }}></div>
        <div className="skeleton-cell" style={{ width: '20%' }}></div>
      </div>
      {rows.map((_, index) => (
        <div key={index} className="skeleton-row">
          <div className="skeleton-cell" style={{ width: '20%' }}></div>
          <div className="skeleton-cell" style={{ width: '20%' }}></div>
          <div className="skeleton-cell" style={{ width: '20%' }}></div>
          <div className="skeleton-cell" style={{ width: '20%' }}></div>
          <div className="skeleton-cell" style={{ width: '20%' }}></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonJenkinsJobBuildsTable;
