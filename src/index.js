import { newTask } from "./task.js";
import { newFolder } from "./folder.js";
import * as display from "./display.js";
import * as create from "./create.js";
import * as search from "./search.js";

import "./styles.css";

const AllFolders = [];

// Default folder for all tasks
const myDay = newFolder("My Day", "All your Tasks");
const newDay = newFolder("NEW Day", "All your Tasks");
AllFolders.push(myDay);
AllFolders.push(newDay);
const content = document.getElementById("content");
content.dataset.folderId = myDay.getID();

// Move to create module
const createTask = (data) => {
  const title = data.get("title");
  const dueDate = data.get("dueDate");
  const priority = data.get("priority");
  const description = data.get("description");
  // When a new task is created, add it automatically to myDay
  return newTask(title, dueDate, description, priority);
}

// Move to create module
const createFolder = (data) => {
  const title = data.get("title");
  const description = data.get("description");
  const folder = newFolder(title, description);
  return folder;
}


// Move to create module
const taskForm = document.querySelector(".task-form");
const folderForm = document.querySelector(".folder-form");

// Move to create module
const addTaskToFolder = (task, container, folders) => {
  const project = search.findFolder(container.dataset.folderId, folders);
  project.addNewTask(task);
}

// Move to create module
const getTaskFormData = (event) => {
  event.preventDefault();
  const data = new FormData(taskForm);
  const task = createTask(data);
  taskForm.reset();
  return task;
}

// Move to create module
const getFolderFormData = (event) => {
  event.preventDefault();
  const data = new FormData(folderForm);
  AllFolders.push(createFolder(data));
  folderForm.reset();
}

taskForm.addEventListener("submit", (event) => {
  const task = getTaskFormData(event);
  addTaskToFolder(task, content, AllFolders);
  display.displayTasks(content, AllFolders);
});


folderForm.addEventListener("submit", (event) => {
  getFolderFormData(event);
  display.readyWindowFolders(content, AllFolders);
});


const t = newTask("Test", "04-03-2025", "This is a test of the american broadcasting station", 10);
myDay.addNewTask(t);
newDay.addNewTask(newTask("NTest", "04-03-2025", "This is a test of the american broadcasting station", 10))
display.displayTasks(content, AllFolders);

const homeButton = document.getElementById("home");
homeButton.addEventListener("click", () => {
  search.setID(content, myDay.getID());
  display.displayTasks(content, AllFolders);
});

const projectButton = document.getElementById("projects");
projectButton.addEventListener("click", function(event) {
  display.readyWindowFolders(content, AllFolders);
});

// myDay.addNewTask(t);
// const t = newTask("Test", 2, "First One!", 10);
// console.log(t.getTitle());
// t.changeTitle("NotaTest");
// console.log(t.getTitle());
// console.log(t.getDate());
// console.log("Description: " + t.getDescription());
// t.changeDescription("Hola");
// console.log("Description: " + t.getDescription());
// t.changeDate(3);
// console.log(t.getDate());
// console.log("Priority Level: " + t.getPriorityLevel());
// t.changePriorityLevel(1);
// console.log("Priority Level: " + t.getPriorityLevel());

// AllFolders.push(newFolder("Folder", 5, "Second One!"));
// console.log(AllFolders[0].getTitle());
// AllFolders[0].changeTitle("NotaTest");
// console.log(AllFolders[0].getTitle());
// console.log("Description: " + AllFolders[0].getDescription());
// AllFolders[0].changeDescription("Hola");
// console.log("Description: " + AllFolders[0].getDescription());
// console.log(AllFolders[0].getTasks());
// AllFolders[0].addNewTask(t);
// console.log(AllFolders[0].getTasks());
// AllFolders[0].deleteTask(t);
// console.log(AllFolders[0].getTasks());

// AllFolders.push(newFolder("Folder2", 5, "Third One!"));
// console.log(AllFolders[0].getTitle());
// console.log(AllFolders[1].getTitle());
