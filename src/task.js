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
    state,
    uniqueID(state),
    Title(state),
    DueDate(state),
    Description(state),
    Priority(state),
  )
};

// class newTask {
//   constructor(title, date, description, priority) {
//     this.id = crypto.randomUUID(),
//     this.title = title,
//     this.date = date,
//     this.description = description,
//     this.priority = priority
//   }


//   getID = () => this.id;
//   getTitle = () => this.title;
//   changeTitle = (newTitle) => this.title = newTitle;
//   getDate = () => this.date;
//   changeDate = (newDate) => this.date = newDate;
//   getDescription = () => this.description;
//   changeDescription = (newDescription) => this.description = newDescription;
//   getPriorityLevel = () => this.priority;
//   changePriorityLevel = (newPriorityLevel) => this.priority = newPriorityLevel;
// }


export { newTask };