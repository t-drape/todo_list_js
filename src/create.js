import { displayTasks, readyWindowFolders } from "./display.js";
import { newFolder } from "./folder.js";
import { newTask } from "./task.js";
import * as search from "./search.js";

const AllFolders = [];

const myDay = newFolder("My Day", "All your Tasks");
AllFolders.push(myDay);

const taskForm = document.querySelector(".task-form");
const folderForm = document.querySelector(".folder-form");

const homeButton = document.getElementById("home");
const projectButton = document.getElementById("projects");


const createTask = (data) => {
  const title = data.get("title");
  const dueDate = data.get("dueDate");
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

const addTaskToFolder = (task, container, folders) => {
  const project = search.findFolder(container.dataset.folderId, folders);
  project.addNewTask(task);
}

const getTaskFormData = (event) => {
  event.preventDefault();
  const data = new FormData(taskForm);
  const task = createTask(data);
  taskForm.reset();
  return task;
}

const getFolderFormData = (event) => {
  event.preventDefault();
  const data = new FormData(folderForm);
  AllFolders.push(createFolder(data));
  folderForm.reset();
}

taskForm.addEventListener("submit", (event) => {
  const task = getTaskFormData(event);
  addTaskToFolder(task, content, AllFolders);
  displayTasks(content, AllFolders);
});


folderForm.addEventListener("submit", (event) => {
  getFolderFormData(event);
  readyWindowFolders(content, AllFolders);
});


homeButton.addEventListener("click", () => {
  search.setID(content, myDay.getID());
  displayTasks(content, AllFolders);
});

projectButton.addEventListener("click", function(event) {
  readyWindowFolders(content, AllFolders);
});

export { createTask, createFolder, addTaskToFolder, getTaskFormData, getFolderFormData };