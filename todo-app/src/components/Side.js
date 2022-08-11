import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const Side = ({ taskLists, taskCount }) => {
  return (
    <ul>
    
      {taskLists.map((list) => (
        <li>
          <Link to={list.id} >
            <span>
              <span className="task-menu-icon">
                <FontAwesomeIcon icon={faBars} />
              </span>
              {list.name}
            </span>
            <span>{taskCount}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Side;
