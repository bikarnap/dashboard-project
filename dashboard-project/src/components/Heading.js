import React from 'react';

const Heading = ({ heading, text }) => {
  // Determine the element type dynamically using React.createElement
  const HeadingTag = heading; // e.g., 'h1', 'h2', etc.

  return (
    <HeadingTag>{text}</HeadingTag>
  );
};

export default Heading;
