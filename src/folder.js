import { Title, DueDate } from "./comp.js";


const newFolder = (title, date) => {
  let state = {
    title,
    date
  }
  return Object.assign(
    state,
    Title(state),
    DueDate(state),
  )
};


export { newFolder };