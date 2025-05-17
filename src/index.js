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

// Change to current folder
const totalDelete = (target) => {
  const taskID = target.parentElement.parentElement.dataset.id;
  const folder = findFolder(target.parentElement.parentElement.parentElement.dataset.folderId);
  folder.deleteTask(taskID);
  // displayTasks();
}

const performDelete = (event) => {
  totalDelete(event.target);
  displayTasks();
}

folder.dataset.folderId = newDay.getID();
content.appendChild(folder);

const findFolder = (folderID) => {
  for (let folder of AllFolders) {
    if (folder.getID() == folderID) {
      return folder;
    }
  }
}

const setFolderID = (folderID) => {
  folder.dataset.folderId = folderID;
}
// const folder = content.childNodes;
// console.log(folder);
const displayTasks = (folderID) => {
  const project = findFolder(folderID);
  // console.log(project.getTitle());
  folder.innerHTML = "";
  for (let task of project.getTasks()) {
    const taskElement = document.createElement("div");
    taskElement.dataset.id = task.getID();

    const sepElement = document.createElement("div");
    const secSepElement = document.createElement("div");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", performDelete);

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

    folder.appendChild(taskElement);
  }
}

const createTask = (data) => {
  const title = data.get("title");
  const dueDate = data.get("dueDate");
  const priority = data.get("priority");
  const description = data.get("description");
  // When a new task is created, add it automatically to myDay
  const task = newTask(title, dueDate, description, priority);
  const project = findFolder(folder.dataset.folderId);
  project.addNewTask(task);
  displayTasks();
}

const getFormData = (event) => {
  event.preventDefault();
  const data = new FormData(form);
  createTask(data);
  form.reset();
}

const form = document.querySelector("form");

form.addEventListener("submit", getFormData);

const t = newTask("Test", "04-03-2025", "This is a test of the american broadcasting station", 10);
newDay.addNewTask(t);
myDay.addNewTask(t);
displayTasks(folder.dataset.folderId);

const displayFolders = (allFolders) => {
  // folder.innerHTML = "";
  // folder.dataset.id = "";
  for (let f of allFolders) {
    const newFolder = document.createElement("div");
    newFolder.dataset.folderId = f.id;

    const title = document.createElement("h1");
    title.textContent = f.getTitle();

    newFolder.appendChild(title);
    console.log(newFolder.dataset.folderId)
    newFolder.addEventListener("click", function(event) {
      displayTasks(newFolder.dataset.folderId)
    });

    folder.appendChild(newFolder);
  }
}


const myDayWindow = () => {
  console.log("H")
  setFolderID(myDay.getID());
  displayTasks(myDay.getID());
}

const homeButton = document.getElementById("home");
homeButton.addEventListener("click", myDayWindow);

const projectButton = document.getElementById("projects");
projectButton.addEventListener("click", function(event) {
  displayFolders(AllFolders);
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
