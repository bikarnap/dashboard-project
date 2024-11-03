import React from 'react';
import './Divider.css'; // Import CSS file for styling

const Divider = ({ orientation = 'horizontal', style = {} }) => {
  return (
    <div className={`divider ${orientation}`} style={style}></div>
  );
};

export default Divider;
