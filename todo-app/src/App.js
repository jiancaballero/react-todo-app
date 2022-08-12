import { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/Main";
import { v4 as uuidv4 } from "uuid";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Side from "./components/Side";
import AddTaskList from "./components/AddTaskList";
import AddTask from "./components/AddTask";

function App() {
  const [taskLists, setTaskLists] = useState([
    {
      id: uuidv4(),
      name: "Important",
      color: "red",
      tasks: [
        {
          taskID: 0,
          id: uuidv4(),
          name: "Pay Bills",
          status: "pending",
        },
        {
          taskID: 0,
          id: uuidv4(),
          name: "Pay Rent",
          status: "pending",
        },
        {
          taskID: 0,
          id: uuidv4(),
          name: "Visit Clinic",
          status: "done",
        },
      ],
    },
    {
      id: uuidv4(),
      name: "Work",
      color: "yellow",
      tasks: [
        {
          taskID: 0,
          id: uuidv4(),
          name: "Add a feature",
          status: "pending",
        },
        {
          taskID: 0,
          id: uuidv4(),
          name: "Debug Code",
          status: "done",
        },
      ],
    },
    {
      id: uuidv4(),
      name: "Travel",
      color: "green",
      tasks: [
        {
          taskID: 0,
          id: uuidv4(),
          name: "Book a Ticket",
          status: "pending",
        },
      ],
    },
  ]);

  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [listID, setListID] = useState("");
  const getTaskList = (id) => {
    const listsCopy = [...taskLists];
    const list = listsCopy.filter((copy) => copy.id === id);
    const listObj = Object.assign({}, ...list);
    setTasks(listObj.tasks);
    setListID(listObj.id);
  };

  const addNewTaskList = (taskList) => {
    const taskCopy = [...taskLists, taskList];
    console.log(taskList);
    setTaskLists(taskCopy);
  };

  const addNewTask = (taskID, newTask) => {
    if (newTask) {
      const taskCopy = [...taskLists];
      let allTasks = [];
      let replaceTask = {};

      taskCopy.forEach((copy) => {
        if (copy.id === taskID) {
          allTasks = [...copy.tasks, ...newTask];
          replaceTask = { ...copy, tasks: allTasks };
        }
      });
      const index = taskCopy.findIndex((copy) => copy.id === taskID);
      taskCopy.splice(index, 1, replaceTask);
      return setTaskLists(taskCopy);
    }
  };

  // CHECK AND UPDATE STATUS
  const doneTasks = taskLists
    .map((task) => task.tasks)
    .flat()
    .filter((task) => task.status === "done");
  const pendingTasks = taskLists
    .map((task) => task.tasks)
    .flat()
    .filter((task) => task.status === "pending");

  const handleTaskStatus = (taskID, id) => {
    let listCopy = [...taskLists];
    const tasks = listCopy
      .filter((list) => list.id === taskID)
      .map((list) => list.tasks)
      .flat();
    const index = tasks.findIndex((task) => task.id === id);
    if (tasks[index].status === "done") {
      tasks[index].status = "pending";
      return setTaskLists(listCopy);
    }
    if (tasks[index].status === "pending") {
      tasks[index].status = "done";
      return setTaskLists(listCopy);
    }
  };
  return (
    <div className="container">
      <div className="grid">
        <div className="sidebar">
          <h1>You have 20 tasks</h1>
          <h1>Let's do this!</h1>
          <hr></hr>
          <Link to="/add-task-list">
            Add List <FontAwesomeIcon icon={faCirclePlus} />
          </Link>
          <div className="TaskList">
            <Side taskLists={taskLists} taskCount={taskCount} />
          </div>
        </div>
        <Routes>
          <Route
            path=":taskID/tasks"
            element={
              <Main
                taskLists={taskLists}
                taskCount={taskCount}
                getTaskList={getTaskList}
                handleTaskStatus={handleTaskStatus}
              />
            }
          ></Route>
          <Route
            path="/add-task-list"
            element={
              <AddTaskList id={uuidv4()} addNewTaskList={addNewTaskList} />
            }
          />
          <Route
            path="/add-task"
            element={
              <AddTask
                id={uuidv4()}
                listID={listID}
                addNewTask={addNewTask}
                tasks={tasks}
              />
            }
          />
        </Routes>

        {/* <SideBar
          taskLists={taskLists}
          getTaskList={getTaskList}
          taskCount={taskCount}
        /> */}
        {/* <Main subtasks={subTasks} task={taskProperty} taskCount={taskCount} /> */}
      </div>
    </div>
  );
}

export default App;
