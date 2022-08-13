import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddTask = ({ id, listID, addNewTask }) => {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState([
    {
      id: "",
      listID: "",
      name: "",
      status: "",
    },
  ]);
  const getInput = (e) => {
    e.preventDefault();
    const nameInput = e.target.value;
    const newTaskObj = {
      id: id,
      listID: listID,
      name: nameInput,
      status: "pending",
    };
    const allTasks = [newTaskObj];
    setNewTask(allTasks);
  };

  const taskAdd = (e) => {
    const hasTask = checkHasTask(newTask)
    const hasDuplicate = checkDuplicateTask(newTask)

    if(hasTask && hasDuplicate) {
      addNewTask(listID, newTask);
      navigate(`/${listID}`);
    
    }
  };

  function checkHasTask(newTask) {
    if (newTask[0].name !== "") {
      return true;
    } else {
      alert("Please input a task!");
      return false;
    }
  }
  function checkDuplicateTask(newTask){
    // TODO:check for duplicates
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-title">
          <h1>NEW TASK</h1>
          <hr></hr>
        </div>
        <div className="modal-body">
          <div>
            <form autocomplete="off">
              <label>New Task:</label>
              <input type="text" name="name" onChange={getInput}></input>
            </form>
          </div>

          <div></div>
        </div>
        <div className="modal-footer">
          <Link to={"/" + listID} className="modal-cancel">
            Cancel
          </Link>

          <button className="modal-ok" onClick={taskAdd}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
