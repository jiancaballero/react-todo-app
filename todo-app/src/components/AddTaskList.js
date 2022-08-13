import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
const AddTaskList = ({ id, addNewTaskList, taskList }) => {
  // const [duplicate,setDuplicate]=useState(false);
  // const[hasTask,setHasTask]=useState(false);

  const navigate = useNavigate();
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
    }
  };
  const duplicate = taskList.filter(
    (list) =>
      list.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/gi, "") ===
      task.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/gi, "")
  );
  const addTask = (e) => {
    if (duplicate.length) {
      alert("Category already exists.");
    } else if (task.name === "") {
      alert("Please input a name for the category.");
    } else {
      addNewTaskList(task);
      navigate(`/${id}`);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-title">
          <h1>NEW CATEGORY</h1>
          <hr></hr>
        </div>
        <div className="modal-body">
          <div>
            <form autocomplete="off">
              <label>Category:</label>
              <input type="text" name="name" onChange={getInput}></input>
            </form>
          </div>
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
