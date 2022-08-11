import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil,faTrash } from "@fortawesome/free-solid-svg-icons";
const Tasks = ({id,name,status}) => {
  return (
    <div className="Task">
      <div>
        <label className="checkerContainer">
          {name}
          <input type="checkbox" name=""></input>
          <span class="checker"></span>
        </label>
      </div>
      <div>
       <FontAwesomeIcon icon={faPencil}/>
       <FontAwesomeIcon icon={faTrash}/>
      </div>
    </div>
  );
};

export default Tasks;
