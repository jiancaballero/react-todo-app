import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil,faTrash } from "@fortawesome/free-solid-svg-icons";
const Tasks = ({taskID, id,name,status,handleTaskStatus}) => {
  // const [taskStatus,setTaskStatus] = useState(false) 
  const updateStatus = (e) => {
   
    handleTaskStatus(taskID, id);
  }
  return (
    <div className="Task">
      <div>
        <label className="checkerContainer">
          {name}
          <input type="checkbox" name="" onChange={updateStatus}></input>
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
