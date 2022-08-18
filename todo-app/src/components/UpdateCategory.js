import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateCategory = ({ taskLists, categoryUpdate }) => {
  const navigate = useNavigate();
  const { taskID } = useParams();
  const taskCopy = [...taskLists];
  const editCategory = taskCopy.filter((task) => task.id === taskID).flat();
  const categoryObj = Object.assign({}, ...editCategory);
  const [categoryToEdit, setCategoryToEdit] = useState(categoryObj.name);
  const getInput = (e) => {
    let input = e.target.value;
    setCategoryToEdit(input);
  };
  const index = taskCopy.findIndex((task) => task.id === taskID);
  const duplicate = editCategory.filter(
    (category) =>
      category.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/gi, "") ===
      categoryToEdit
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/gi, "")
  );

  const saveEdit = () => {
    if (duplicate.length) {
      alert("Category already exists");
    } else if (categoryToEdit.trim() === "") {
      alert("Please input a new name for the category");
      setCategoryToEdit(categoryObj.name);
    } else {
      taskCopy[index].name = categoryToEdit;
      categoryUpdate(taskCopy);
      navigate(`/`);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-title ">
          <h1>UPDATE CATEGORY:</h1>
          <hr></hr>
        </div>
        <div className="modal-body">
          <div>
            <form autocomplete="off">
              <label>New Category Name:</label>
              <input
                type="text"
                name="name"
                value={categoryToEdit}
                onChange={getInput}
              ></input>
            </form>
          </div>

          <div></div>
        </div>
        <div className="modal-footer">
          <Link to={"/"} className="modal-cancel">
            Cancel
          </Link>
          <button className="modal-ok" onClick={saveEdit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
