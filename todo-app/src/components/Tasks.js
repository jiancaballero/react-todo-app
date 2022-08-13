import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
const Tasks = ({ taskID, id, name, status, handleTaskStatus, deleteTask }) => {
  // const [taskStatus,setTaskStatus] = useState(false)
  const updateStatus = (e) => {
    handleTaskStatus(taskID, id);
  };
  const getID = () => {
    deleteTask(taskID,id);
  };

  return (
    <div className="Task">
      <div>
        {/* FIXME: Some tasks automatically are checked even it is not done */}
        {status === "done" ? (
          <label className="checkerContainer LabelDone">
            {name}
            <input type="checkbox" onChange={updateStatus} checked></input>
            <span class="checker"></span>
          </label>
        ) : (
          <label className="checkerContainer">
            {name}
            <input type="checkbox" onChange={updateStatus}></input>
            <span class="checker"></span>
          </label>
        )}
      </div>
      <div>
        {/* <FontAwesomeIcon icon={faPencil} /> */}
        <FontAwesomeIcon
          className="delete-task"
          icon={faTrash}
          onClick={getID}
        />
      </div>
    </div>
  );
};

export default Tasks;
