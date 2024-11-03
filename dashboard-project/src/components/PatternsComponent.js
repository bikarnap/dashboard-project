import React from 'react';
import './PatternsComponent.css'; // Import CSS file for styling

const PatternsComponent = () => {
  return (
    <div className="patterns-container">
      <div className="pattern-item">
        <svg width="200" height="200">
          <defs>
            <pattern id="stripes" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="gray" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#stripes)"/>
        </svg>
      </div>

      {/* <div className="pattern-item">
        <h3>Dots</h3>
        <svg width="200" height="200">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="5" fill="blue"/>
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#dots)"/>
        </svg>
      </div>

      <div className="pattern-item">
        <h3>Diagonal Lines</h3>
        <svg width="200" height="200">
          <defs>
            <pattern id="diagonals" width="20" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="20" x2="20" y2="0" stroke="red" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#diagonals)"/>
        </svg>
      </div>

      <div className="pattern-item">
        <h3>Grid</h3>
        <svg width="200" height="200">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="20" y2="0" stroke="green" strokeWidth="2"/>
              <line x1="0" y1="0" x2="0" y2="20" stroke="green" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#grid)"/>
        </svg>
      </div> */}
    </div>
  );
};

export default PatternsComponent;
