// SkeletonVmTable.js
import React from 'react';
import '/home/administrator/my_learning/dashboard-project/src/components/SekeltonJenkinsJobsBuildsTable.css'; // Use the same SkeletonTable.css created earlier

const SkeletonVmTable = () => {
  const rows = Array.from({ length: 10 }); // Create 10 rows as placeholders

  return (
    <div className="skeleton-table">
      <div className="skeleton-header skeleton-row">
        <div className="skeleton-cell" style={{ width: '40%' }}></div>
        <div className="skeleton-cell" style={{ width: '30%' }}></div>
        <div className="skeleton-cell" style={{ width: '30%' }}></div>
      </div>
      {rows.map((_, index) => (
        <div key={index} className="skeleton-row">
          <div className="skeleton-cell" style={{ width: '40%' }}></div>
          <div className="skeleton-cell" style={{ width: '30%' }}></div>
          <div className="skeleton-cell" style={{ width: '30%' }}></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonVmTable;
