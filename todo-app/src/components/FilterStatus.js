import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, useNavigate } from "react-router-dom";

const FilterStatus = ({ taskID }) => {
  const navigate = useNavigate();
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    navigate(`${filterValue}`);
    // get status from Link
    //pass the taskID and setState as a url
  };

  return (
    <select onChange={handleFilter}>
      <option selected="selected" value="all">
        All
      </option>
      <option value="pending">Pending</option>
      <option value="done">Done</option>
    </select>
  );
};

export default FilterStatus;
