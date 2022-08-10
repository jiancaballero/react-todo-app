import React from "react";

const SideBar = () => {
  return (
    <div className="sidebar">
      <h1>You have 20 tasks</h1>
      <h1>Let's do this!</h1>
      <hr></hr>
      <div className="TaskList">
        <ul>
          <li><span><i></i>Important</span> <span>5</span></li>
          <li><span><i></i>Important</span> <span>5</span></li>
          <li><span><i></i>Important</span> <span>5</span></li>
        </ul>
      </div>
      <button>Add List</button>
    </div>
  );
};

export default SideBar;
