import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
const AddTaskList = ({ id, addNewTaskList }) => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    id: "",
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
    }
  };

  const addTask = (e) => {
    const hasTask = checkHasTask(task);
    const hasDuplicate = checkDuplicateTask(task);

    if (hasTask && hasDuplicate) {
      addNewTaskList(task);
      navigate(`/${id}`);
    }
  };

  function checkHasTask(task) {
    if (task.name) {
      addNewTaskList(task);
      navigate(`/${id}`);
    } else {
      alert("Please input a task!");
    }
  }
  function checkDuplicateTask(task) {
    // TODO:check for duplicate
  }
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-title">
          <h1>NEW LIST</h1>
          <hr></hr>
        </div>
        <div className="modal-body">
          <div>
            <form autocomplete="off">
              <label>List Name :</label>
              <input type="text" name="name" onChange={getInput}></input>
            </form>
          </div>
          {/* <div>
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
          </div> */}
        </div>
        <div className="modal-footer">
          <Link to="/" className="modal-cancel">
            Cancel
          </Link>
          <button onClick={addTask} className="modal-ok">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskList;
