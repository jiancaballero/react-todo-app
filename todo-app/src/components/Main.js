import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Tasks from "./Tasks";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import FilterStatus from "./FilterStatus";
const Main = ({ taskLists, taskCount, getTaskList, handleTaskStatus }) => {
  const { taskID } = useParams();
  const lists = taskLists.filter((list) => list.id === taskID);
  const listObj = Object.assign({}, ...lists);
  const tasks = listObj.tasks;
  const allTasks = tasks.map((task) => {
    return (
      <Tasks
        taskID={taskID}
        id={task.id}
        name={task.name}
        status={task.status}
        handleTaskStatus={handleTaskStatus}
      />
    );
  });

  const getList = () => {
    getTaskList(taskID);
  };

  return (
    <div className="main">
      <div className="MainHeader">
        <h1>{listObj.name}</h1>
        <h1>{taskCount}</h1>
      </div>
      <div className="SecondMainHeader">
        <Link to="/add-task" onClick={getList}>
          Add Task <FontAwesomeIcon icon={faCirclePlus} />
        </Link>

        <FilterStatus taskID={taskID} />
      </div>

      <div className="TaskContainer">{allTasks}</div>
    </div>
  );
};

export default Main;
