import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const Side = ({ taskLists, deleteList }) => {
  return (
    <ul>
      {taskLists.map((list) => (
        <li>
          <span className="task-menu-icon">
            <Link to="/" className="side-delete-link">
              <FontAwesomeIcon
                className="side-delete-task"
                icon={faTrash}
                onClick={() => deleteList(list.id)}
              />
            </Link>
          </span>

          <div>
            <Link to={'/all/'+list.id} className="side-bar-tasks">
              <span>{list.name}</span>
              <span>
                {list.tasks.filter((task) => task.status === "pending").length}
              </span>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Side;
