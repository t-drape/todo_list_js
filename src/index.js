import { newTask } from "./task.js";
import { newFolder } from "./folder.js";
import { displayWindow } from "./display.js";

import "./styles.css";

const AllFolders = [];

// let curFolder;
// Default folder for all tasks
const myDay = newFolder("My Day", "All your Tasks");
const newDay = newFolder("NEW Day", "All your Tasks");
AllFolders.push(myDay);
AllFolders.push(newDay);
const content = document.getElementById("content");
const folder = document.createElement("div");
folder.classList.add("folder");

content.dataset.folderId = myDay.getID();
// content.appendChild(folder);

// Change to current folder

// const performDelete = (event) => {
//   // totalDelete(event.target);
//   // displayTasks(event.target.parentElement.parentElement.parentElement.dataset.folderId);
// }

const findFolder = (folderID) => {
  for (let folder of AllFolders) {
    if (folder.getID() == folderID) {
      return folder;
    }
  }
}

const setID = (container, folderID) => {
  container.dataset.folderId = folderID;
}

const resetDisplay = (div)  => {
  div.innerHTML = "";
}
// const folder = content.childNodes;
// console.log(folder);
const displayTasks = (container) => {
  const project = findFolder(container.dataset.folderId);
  resetDisplay(container);
  for (let task of project.getTasks()) {
    const taskElement = document.createElement("div");
    taskElement.dataset.id = task.getID();

    const sepElement = document.createElement("div");
    const secSepElement = document.createElement("div");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", (event) => {
      project.deleteTask(event.target.parentElement.parentElement.dataset.id);
      displayTasks(container);
    });

    sepElement.appendChild(deleteButton);

    const title = document.createElement("h1");
    title.textContent = task.getTitle();
    sepElement.appendChild(title);

    const description = document.createElement("p");
    description.textContent = task.getDescription();
    sepElement.appendChild(description);


    sepElement.classList.add("sep-one");


    const priorityLevel = document.createElement("h3");
    priorityLevel.textContent = "Priority Level: " + task.getPriorityLevel();
    secSepElement.appendChild(priorityLevel);

    const dueDate = document.createElement("h3");
    dueDate.textContent = "Due Date: " + task.getDate();
    secSepElement.appendChild(dueDate);

    secSepElement.classList.add("sep-two");

    taskElement.appendChild(sepElement);
    taskElement.appendChild(secSepElement);

    taskElement.classList.add("task");

    container.appendChild(taskElement);
  }
}

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

const displayFolders = (container, folders) => {
  for (let f of folders) {
    const newFolder = document.createElement("div");
    newFolder.dataset.folderId = f.getID();

    const title = document.createElement("h1");
    title.textContent = f.getTitle();

    newFolder.appendChild(title);
    newFolder.addEventListener("click", function(event) {
      setID(container, newFolder.dataset.folderId);
      displayTasks(container, newFolder.dataset.folderId);
    });

    container.appendChild(newFolder);
  }
}

const taskForm = document.querySelector(".task-form");
const folderForm = document.querySelector(".folder-form");

const addTaskToFolder = (task, folder) => {
  const project = findFolder(folder.dataset.folderId);
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
  addTaskToFolder(task, folder);
  displayTasks(content, folder);
});

const readyWindowFolders = (container) => {
  resetDisplay(container);
  setID(container, "");
  displayFolders(container, AllFolders);
}

folderForm.addEventListener("submit", (event) => {
  getFolderFormData(event);
  readyWindowFolders(content);
});


const t = newTask("Test", "04-03-2025", "This is a test of the american broadcasting station", 10);
newDay.addNewTask(t);
myDay.addNewTask(t);
displayTasks(content, folder.dataset.folderId);

const homeButton = document.getElementById("home");

homeButton.addEventListener("click", () => {
  setID(content, myDay.getID());
  displayTasks(content)
});

const projectButton = document.getElementById("projects");
projectButton.addEventListener("click", function(event) {
  readyWindowFolders(content);
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
