import React, { useState } from "react";
import { useParams } from "react-router";
import Tasks from "./Tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import FilterStatus from "./FilterStatus";
import NoTasks from "./NoTasks";
const DoneTask = ({ tasks, handleTaskStatus, getTaskID, deleteTask }) => {
  const params = useParams();
  // gets the id and status from the url
  const taskID = params.taskID;
  const status = params.status;
  const listName = tasks.filter((task) => task.id === taskID);

  const allTasks = tasks
    .filter((task) => task.id === taskID)
    .map((task) => task.tasks)
    .flat()
    .filter((task) => task.status === status)
    .map((task) => {
      return (
        <Tasks
          taskID={taskID}
          id={task.id}
          name={task.name}
          status={task.status}
          handleTaskStatus={handleTaskStatus}
          deleteTask={deleteTask}
        />
      );
    });
  const getListID = () => {
    getTaskID(taskID);
  };

  return (
    <div className="TaskContainer">
      {allTasks.length > 0 ? allTasks : <NoTasks />}
    </div>
  );
};

export default DoneTask;
