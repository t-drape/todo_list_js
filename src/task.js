import { uniqueID, Title, DueDate, Description, Priority } from "./comp.js";

const newTask = (title, date, description, priority) => {
  let state = {
    id: crypto.randomUUID(),
    title,
    date,
    description,
    priority,
  }

  return Object.assign(
    {},
    uniqueID(state),
    Title(state),
    DueDate(state),
    Description(state),
    Priority(state)
  )
};

export { newTask };