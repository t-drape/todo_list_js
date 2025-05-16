import { newTask } from "./task.js";
import { newFolder } from "./folder.js";
import { displayWindow } from "./display.js";

const AllFolders = [];

let curFolder;
// Default folder for all tasks
const myDay = newFolder("My Day", "All your Tasks");

const totalDelete = (event) => {
  const taskID = event.target.parentElement.dataset.id;
  myDay.deleteTask(taskID);
  displayTasks();
}

const content = document.getElementById("content");
const displayTasks = () => {
  content.innerHTML = "";
  for (let task of myDay.getTasks()) {
    console.log(task.getID());
    const taskElement = document.createElement("div");
    taskElement.dataset.id = task.getID();

    const title = document.createElement("h1");
    title.textContent = task.getTitle();
    taskElement.appendChild(title);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", totalDelete);
    taskElement.appendChild(deleteButton);


    content.appendChild(taskElement);
  }
}

const createTask = (data) => {
  const title = data.get("title");
  const dueDate = data.get("dueDate");
  const priority = data.get("priority");
  const description = data.get("description");
  // When a new task is created, add it automatically to myDay
  const task = newTask(title, dueDate, description, priority);
  myDay.addNewTask(task);
  displayTasks();
}

const getFormData = (event) => {
  event.preventDefault();
  const data = new FormData(form);
  console.log(data.get("title"));
  console.log(data.get("dueDate"));
  console.log(data.get("priority"));
  console.log(data.get("description"));
  createTask(data);
  form.reset();
}

const form = document.querySelector("form");

form.addEventListener("submit", getFormData);

const t = newTask("Test", 2, "First One!", 10);
myDay.addNewTask(t);
displayTasks();

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
