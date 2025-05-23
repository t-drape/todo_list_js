import { taskForm, folderForm } from "./elements.js";
import { newFolder } from "./folder.js";
import { newTask } from "./task.js";
import * as search from "./search.js";


// const allFolders = [];
// let retrieved = localStorage.getItem("folders");
// let allFolders;
// if (retrieved == null) {
//   allFolders = [];
//   const myDay = newFolder("My Day", "All your Tasks");
//   myDay.addNewTask("Hello There", "0050-05-04", "Jello", 4);
//   allFolders.push(myDay);
//   localStorage.setItem("folders", JSON.stringify(allFolders));
// } else {
//   console.log(retrieved);
//   allFolders = JSON.parse(retrieved);
// }

const createTask = (data) => {
  const title = data.get("title");
  const dueDate = new Date(data.get("dueDate"));
  const priority = data.get("priority");
  const description = data.get("description");
  // When a new task is created, add it automatically to myDay
  return newTask(title, dueDate, description, priority);
}

const createFolder = (data) => {
  const title = data.get("title");
  const description = data.get("description");
  const folder = newFolder(title, description);
  return folder;
}

const deleteFolder = (folders, folderID) => {
  let index = 0;
  for (let folder of folders) {
    if (folder.getID() == folderID) {
      folders.splice(index, 1);
    }
    index++;
  }
}

const addTaskToFolder = (task, container, folders) => {
  const project = search.findFolder(container.dataset.folderId, folders);
  project.addNewTask(task);
  localStorage.setItem("allFolders", JSON.stringify(folders));
}

const getTaskFormData = (event) => {
  event.preventDefault();
  const data = new FormData(taskForm);
  const task = createTask(data);
  taskForm.reset();
  return task;
}

const getFolderFormData = (event, folders) => {
  event.preventDefault();
  const data = new FormData(folderForm);
  folders.push(createFolder(data));
  localStorage.setItem("allFolders", JSON.stringify(folders));
  folderForm.reset();
}

const changePL = (event, formID) => {
  const form = document.getElementById(formID);
  form.classList.remove("non-visible");
  event.target.classList.add("non-visible");
}

const finalChangePL = (task, event) => {
  event.preventDefault();
  const f = event.target.parentElement;
  const data = new FormData(f);
  const pl = data.get("priority");
  task.changePriorityLevel(pl);
  f.reset();
}

const finalChangeDate = (task, event) => {
  const f = event.target;
  const date = new FormData(f).get("date");
  const dateFromDate = new Date(date);
  task.changeDate(dateFromDate);
  f.reset();
}

const finalChangeDescription = (task, event) => {
  event.preventDefault();
  const f = event.target.parentElement;
  const data = new FormData(f);
  const description = data.get("description");
  task.changeDescription(description);
  f.reset();
}

const finalChangeTitle = (task, event) => {
  event.preventDefault();
  const f = event.target.parentElement;
  const data = new FormData(f);
  const title = data.get("title");
  task.changeTitle(title);
  f.reset();
}

export { addTaskToFolder, getTaskFormData, getFolderFormData, deleteFolder, changePL, finalChangePL, finalChangeDate, finalChangeDescription, finalChangeTitle };