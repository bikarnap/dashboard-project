const ClearFilter = ({ clearLabel, handleClick }) => {
  return (
    <button className="clear-filter-button" onClick={handleClick}>
      {clearLabel || 'X'}
    </button>
  );
};

export default ClearFilter;
