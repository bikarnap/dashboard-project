import './DropDownSelect.css';

const DropDownSelect = ({ options, handleSelectOption, label, filterName }) => {
  return (
    <div className="dropdown-select-container">
      <select className="dropdown-select" onChange={handleSelectOption} value={label}>
        <option value="">{filterName || 'Select'}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDownSelect;
