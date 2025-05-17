import { unique } from "webpack-merge";
import { uniqueID, Title, Description } from "./comp.js";

const newFolder = (title, date, description) => {
  let state = {
    id: crypto.randomUUID(),
    tasks: [],
    title,
    description,
  }

  const Tasks = (state) => ({
    getTasks: () => state.tasks,
    addNewTask: (newTask) => state.tasks.push(newTask),
    // deleteTask: (taskID) => state.tasks.splice(state.tasks.indexOf(taskID), 1),
    deleteTask: (taskID) => {
      let index = 0;
      for (let task of state.tasks) {
        if (task.getID() == taskID) {
          state.tasks.splice(index, 1);
        }
        index++;
      }
    },
  });

  return Object.assign(
    {},
    uniqueID(state),
    Title(state),
    Description(state),
    Tasks(state),
  )
};


export { newFolder };