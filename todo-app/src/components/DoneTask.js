import React from "react";
import { useParams } from "react-router";
import Tasks from "./Tasks";

const DoneTask = ({ tasks, handleTaskStatus }) => {
  const params = useParams();
  // gets the id and status from the url
  const taskID = params.taskID;
  const status = params.status;
  console.log(tasks)
//   tasks
//     .flat()
//     .filter((task) => task.status === status)
//     .map((task) => {
//       return (
//         <Tasks
//           taskID={taskID}
//           id={task.id}
//           name={task.name}
//           status={task.status}
//           handleTaskStatus={handleTaskStatus}
//         />
//       );
//     });
  return <div></div>;
};

export default DoneTask;
