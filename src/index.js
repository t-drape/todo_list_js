import { content, taskForm, folderForm, homeButton, projectButton, showTaskFormButton, showFolderFormButton } from "./elements.js";
import { getTaskFormData, getFolderFormData, addTaskToFolder } from "./create.js";
import { displayTasks, readyWindowFolders } from "./display.js";
import { newFolder } from "./folder.js";
import { setID } from "./search.js";

import "./styles.css";

const allFolders = [];

const myDay = newFolder("My Day", "All your Tasks");
allFolders.push(myDay);

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
  setID(content, myDay.getID());
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

taskForm.classList.add("non-visible");
folderForm.classList.add("non-visible");
homeButton.click();
