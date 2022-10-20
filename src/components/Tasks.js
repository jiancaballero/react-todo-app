import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Tasks = ({
  taskID,
  id,
  name,
  status,
  handleTaskStatus,
  deleteTask,
  updateTask,
}) => {
  // const [taskStatus,setTaskStatus] = useState(false)
  const updateStatus = (e) => {
    handleTaskStatus(taskID, id);
  };
  const getID = () => {
    deleteTask(taskID, id);
  };

  const getTaskID = () => {};

  const [checker, setChecker] = useState("");
  useEffect(() => {
    setChecker("checked");
  }, [status]);
  return (
    <div className="Task">
      <div>
        {status === "done" ? (
          <label className="checkerContainer LabelDone">
            {name}
            <input
              type="checkbox"
              onChange={updateStatus}
              checked={checker}
            ></input>
            <span className="checker"></span>
          </label>
        ) : (
          <label className="checkerContainer">
            {name}
            <input type="checkbox" onChange={updateStatus}></input>
            <span className="checker"></span>
          </label>
        )}
      </div>
      <div>
        {status === "pending" && (
          <Link to={`/update/${taskID}/${id}`} onClick={getTaskID}>
            <FontAwesomeIcon className="update-task" icon={faPencil} />
          </Link>
        )}

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
