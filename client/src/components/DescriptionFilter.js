import React from 'react';

export default function DescriptionFilter({ onFilterChange }) {
  const handleTextChange = (event) => {
    onFilterChange(event.target.value);
  };
  return (
    <div className="input-field col s6" style={{ margin: '10px' }}>
      <input
        placeholder="Filtro"
        id="filter_description"
        type="text"
        className="validate"
        onChange={handleTextChange}
      />
      <label htmlFor="filter_description"></label>
    </div>
  );
}
