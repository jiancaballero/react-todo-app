import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
const Modal = () => {
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-title">
          <h1>NEW LIST</h1>
          <hr></hr>
        </div>
        <div className="modal-body">
          <div>
            <label>
              List Name:
              <input type="text" name="name"></input>
            </label>
          </div>
          <div>
            <label>
              Color:
              <input type="radio" name="color" id="red-radio"></input>
              <input type="radio" name="color" id="yellow-radio"></input>
              <input type="radio" name="color" id="blue-radio"></input>
              <input type="radio" name="color" id="green-radio"></input>

            </label>
          </div>
          <div></div>
        </div>
        <div className="modal-footer">
          <button>Cancel</button>
          <button>OK</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
