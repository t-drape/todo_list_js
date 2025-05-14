import { Title, DueDate, Description, Priority } from "./comp.js";

const newFolder = (title, date, description) => {
  let state = {
    title,
    date,
    description,
  }

  return Object.assign(
    {},
    Title(state),
    DueDate(state),
    Description(state)
  )
};


export { newFolder };