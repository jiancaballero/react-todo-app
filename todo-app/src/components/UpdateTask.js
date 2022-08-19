import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

const UpdateTask = ({ taskLists, updateTask }) => {
  const navigate = useNavigate();
  const taskCopy = [...taskLists];
  const { taskID, id } = useParams();
  const taskToEdit = taskCopy
    .filter((copy) => copy.id === taskID)
    .map((task) => task.tasks)
    .flat()
    .filter((task) => task.id === id)
    .flat();
  const taskName = Object.assign({}, ...taskToEdit);
  const [taskEdit, setTaskEdit] = useState(taskName.name);

  const getInput = (e) => {
    e.preventDefault();
    let input = e.target.value;
    setTaskEdit(input);
  };
  const newTaskCopy = {
    taskID: taskID,
    id: id,
    name: taskEdit,
    status: "pending",
  };
  const doneDuplicate = taskCopy
    .filter((copy) => copy.id === taskID)
    .map((task) => task.tasks)
    .flat()
    .filter((task) => task.status === "done")
    .flat()
    .filter(
      (task) =>
        task.name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s]/gi, "") ===
        newTaskCopy.name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s]/gi, "")
    );
  const pendingDuplicate = taskCopy
    .filter((copy) => copy.id === taskID)
    .map((task) => task.tasks)
    .flat()
    .filter((task) => task.status === "pending")
    .flat()
    .filter(
      (task) =>
        task.name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s]/gi, "") ===
        newTaskCopy.name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s]/gi, "")
    );
  const saveEdit = () => {
    if (pendingDuplicate.length) {
      alert("This task already exists");
    } else if (newTaskCopy.name.trim() === "") {
      alert("Please input a new name for the task");
      setTaskEdit(taskName.name);
    } else if (doneDuplicate.length) {
      alert("This is a done task. Please delete the task first");
    } else {
      updateTask(taskID, id, newTaskCopy);
      navigate(`/all/${taskID}`);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-title ">
          <h1>UPDATE TASK:</h1>
          <hr></hr>
        </div>
        <div className="modal-body">
          <div>
            <form autocomplete="off">
              <label>New Task Name:</label>
              <input
                type="text"
                name="name"
                value={taskEdit}
                onChange={getInput}
              ></input>
            </form>
          </div>

          <div></div>
        </div>
        <div className="modal-footer">
          <Link to={"/all/" + taskID} className="modal-cancel">
            Cancel
          </Link>
          <button className="modal-ok" onClick={saveEdit}>
            Save
          </button>{" "}
          *
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
