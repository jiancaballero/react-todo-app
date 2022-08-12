import React, { useState } from "react";
import { Link } from "react-router-dom";
const AddTask = ({ id, listID, addNewTask }) => {
  const [newTask, setNewTask] = useState([]);
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
    addNewTask(listID, newTask);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-title">
          <h1>NEW TASK</h1>
          <hr></hr>
        </div>
        <div className="modal-body">
          <div>
            <label>New Task:</label>
            <input type="text" name="name" onChange={getInput}></input>
          </div>

          <div></div>
        </div>
        <div className="modal-footer">
          {/* <Link to="/" className="modal-cancel">
            Cancel
          </Link>
          */}
          <Link to={listID} className="modal-ok" onClick={taskAdd}>
            OK
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
