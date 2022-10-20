import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, useNavigate } from "react-router-dom";

const FilterStatus = ({ taskID, status }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(status);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    navigate(`/${filterValue}/${taskID}`);
  };

  useEffect(() => {
    // set the default value or selected value
  }, [status]);

  return (
    <select onChange={handleFilter}>
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="done">Done</option>
    </select>
  );
};

export default FilterStatus;
