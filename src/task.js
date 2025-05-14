import { Title, DueDate, Description, Priority } from "./comp.js";

const newTask = (title, date, description, priority) => {
  let state = {
    title,
    date,
    description,
    priority,
  }

  const Priority = (state) => ({
    getPriorityLevel: () => state.priority,
    changePriorityLevel: (newPriorityLevel) => state.priority = newPriorityLevel,
  });

  return Object.assign(
    {},
    Title(state),
    DueDate(state),
    Description(state),
    Priority(state)
  )
};

export { newTask };