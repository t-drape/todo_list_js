import { content, taskForm, folderForm, homeButton, projectButton, showTaskFormButton, showFolderFormButton } from "./elements.js";
import { getTaskFormData, getFolderFormData, addTaskToFolder } from "./create.js";
import { displayTasks, readyWindowFolders } from "./display.js";
import { newFolder } from "./folder.js";
import { setID } from "./search.js";
import { newTask } from "./task.js";


import "./styles.css";

let allFolders = [];

window.addEventListener('beforeunload', function (e) {
  console.log("This is whats saved: ", allFolders);
  localStorage.setItem("allFolders", JSON.stringify(allFolders));
});

const checkIfFolders = localStorage.getItem("allFolders");
if (checkIfFolders !== null && checkIfFolders != '[]') {
  const retrieved = JSON.parse(checkIfFolders);
  for (let folder of retrieved) {
    const buildFolder = newFolder(folder.title, folder.description);
    for (let task of folder.tasks) {
      const buildTask = newTask(task.title, task.date, task.description, task.priority);
      buildFolder.addNewTask(buildTask);
    }
    allFolders.push(buildFolder);
  }
} else {
  const myDay = newFolder("My Day", "All your Tasks");
  allFolders.push(myDay);
}

taskForm.addEventListener("submit", (event) => {
  const task = getTaskFormData(event);
  addTaskToFolder(task, content, allFolders);
  displayTasks(content, allFolders);
  taskForm.classList.add("non-visible");
});


folderForm.addEventListener("submit", (event) => {
  getFolderFormData(event, allFolders);
  readyWindowFolders(content, allFolders);
  folderForm.classList.add("non-visible");
});

homeButton.addEventListener("click", () => {
  setID(content, allFolders[0].getID());
  displayTasks(content, allFolders);
});

projectButton.addEventListener("click", function(event) {
  readyWindowFolders(content, allFolders);
});

showTaskFormButton.addEventListener("click", () => {
  taskForm.classList.remove("non-visible");
});

showFolderFormButton.addEventListener("click", () => {
  folderForm.classList.remove("non-visible");
});

homeButton.click();
taskForm.classList.add("non-visible");
folderForm.classList.add("non-visible");
