import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import Tasks from "./Tasks";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import FilterStatus from "./FilterStatus";
import NoTasks from "./NoTasks";
import AllTasks from "./AllTasks";
import FilterTaskPage from "./FilterTaskPage";
const Main = ({ taskLists, getTaskID, handleTaskStatus, deleteTask,updateTask }) => {
  // FIXME: kapag pumindot ng list tas nirefresh nawawala yung content
  const params = useParams();
  const taskID = params.taskID;
  const status = params.status;

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
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    );
  });

  const getListID = () => {
    getTaskID(taskID);
  };

  return (
    <div className="main">
      <div className="MainHeader">
        <h1>{listObj.name}</h1>
      </div>
      <div className="SecondMainHeader">
        <Link to="/add-task" onClick={getListID}>
          Add Task <FontAwesomeIcon icon={faCirclePlus} />
        </Link>
        <FilterStatus taskID={taskID} status={status}/>
      </div>
      {status.toLowerCase() == "all" ? (
        <AllTasks allTasks={allTasks} />
      ) : (
        <FilterTaskPage
          tasks={taskLists}
          handleTaskStatus={handleTaskStatus}
          getTaskID={getTaskID}
          deleteTask={deleteTask}
        />
      )}
    </div>
  );
};

export default Main;
