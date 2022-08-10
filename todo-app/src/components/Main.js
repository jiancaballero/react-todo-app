import React from "react";

const Main = () => {
  return (
    <div className="main">
      <div className="MainHeader">
        <h1>Weekend Todo</h1>
        <h1>5</h1>
      </div>
      <div className="SecondMainHeader">
        <button>Add Task</button>
        <select>
          <option selected>All</option>
          <option>Pending</option>
          <option>Done</option>
        </select>
      </div>

      <div className="TaskContainer">
        <div className="Task">
          <div>
            <label className="checkerContainer">
              Wash Car
              <input type="checkbox" name=""></input>
              <span class="checker"></span>
            </label>
          </div>
          <div>
            <span>CHuchu</span>
            <span>Wash Car</span>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default Main;
