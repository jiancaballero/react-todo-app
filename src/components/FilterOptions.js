import React from "react";

const FilterOptions = ({value,status}) => {
  return (
    <option  value={value}>
      {value}
    </option>
  );
};

export default FilterOptions;
