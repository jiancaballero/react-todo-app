import React from "react";
import { useParams } from "react-router";
import Tasks from "./Tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import FilterStatus from "./FilterStatus";
const DoneTask = ({ tasks, handleTaskStatus, getTaskID }) => {
  const params = useParams();
  // gets the id and status from the url
  const taskID = params.taskID;
  const status = params.status;
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
        />
      );
    });
  const getListID = () => {
    getTaskID(taskID);
  };

  return (
    <div className="main">
      <div className="MainHeader">
        <h1></h1>
        <h1></h1>
      </div>
      <div className="SecondMainHeader">
        <Link to="/add-task" onClick={getListID}>
          Add Task <FontAwesomeIcon icon={faCirclePlus} />
        </Link>

        <FilterStatus taskID={taskID} />
      </div>

      <div className="TaskContainer">{allTasks}</div>
    </div>
  );
};

export default DoneTask;
