import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const AddTaskList = ({ id, addNewTaskList }) => {
  const [task, setTask] = useState({
    id: id,
    name: "",
    color: "",
    tasks: [],
  });
  const getInput = (e) => {
    switch (e.target.name) {
      case "name":
        setTask({ ...task, name: e.target.value });
        console.log(e.target.value);
        break;
      case "color":
        setTask({ ...task, color: e.target.value });
        console.log(e.target.value);
        break;
    }
  };

  const addTask = (e) => {
    // e.preventDefault();
    if (task.name) {
      addNewTaskList(task);
    }
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-title">
          <h1>NEW LIST</h1>
          <hr></hr>
        </div>
        <div className="modal-body">
          <div>
            <label>List Name :</label>
            <input type="text" name="name" onChange={getInput}></input>
          </div>
          <div>
            <label>Color :</label>
            <div>
              <input
                type="radio"
                name="color"
                id="red-radio"
                value="red"
                onChange={getInput}
              ></input>
              <input
                type="radio"
                name="color"
                id="yellow-radio"
                value="yellow"
                onChange={getInput}
              ></input>
              <input
                type="radio"
                name="color"
                id="blue-radio"
                value="blue"
                onChange={getInput}
              ></input>
              <input
                type="radio"
                name="color"
                id="green-radio"
                value="green"
                onChange={getInput}
              ></input>
            </div>
          </div>
          <div></div>
        </div>
        <div className="modal-footer">
          <Link to="/" className="modal-cancel">
            Cancel
          </Link>
          <Link to={id} onClick={addTask} className="modal-ok">
            OK
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddTaskList;
