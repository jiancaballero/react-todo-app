import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddTask = ({ id, listID, addNewTask, taskList }) => {
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
  const tasks = taskList.filter(task=>task.id===listID).map((list) => list.tasks).flat();
  const newTaskObj = Object.assign({}, ...newTask);
  const duplicate = tasks.filter(
    (task) =>
      task.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/gi, "") ===
      newTaskObj.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/gi, "")
  );

  const taskAdd = () => {
    if (newTaskObj.name.trim() === "") {
      alert("Please input a task.");
    } else if (duplicate.length) {
      alert("Task already exists");
    } else {
      addNewTask(listID, newTask);
      navigate(`/all/${listID}`);
    }
  };



  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-title ">
          <h1>NEW TASK</h1>
          <hr></hr>
        </div>
        <div className="modal-body">
          <div>
            <form autocomplete="off">
              <label>Task Name:</label>
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
