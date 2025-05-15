import { Title, Description } from "./comp.js";

const newFolder = (title, date, description) => {
  let state = {
    tasks: [],
    title,
    date,
    description,
  }

  const Tasks = (state) => ({
    getTasks: () => state.tasks,
    addNewTask: (newTask) => state.tasks.push(newTask),
    deleteTask: (task) => state.tasks.splice(state.tasks.indexOf(task), 1),
  })

  return Object.assign(
    {},
    Title(state),
    Description(state),
    Tasks(state),
  )
};


export { newFolder };