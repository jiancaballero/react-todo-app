import React from "react";
import NoTasks from "./NoTasks";

const AllAtasks = ({ allTasks }) => {
  return <div className="TaskContainer">{allTasks.length >0 ? allTasks : <NoTasks/>}</div>;
};

export default AllAtasks;
