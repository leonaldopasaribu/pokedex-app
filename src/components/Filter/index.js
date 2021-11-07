import React from "react";

const Filter = ({ valueType, typesSelect, types }) => {
  return (
    <>
      <div className="filter__container noselect">
        <div className="filter__items">
          <p>Filter by type</p>
          <select value={valueType} onChange={typesSelect}>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Filter;
