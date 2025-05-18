import { content, taskForm, folderForm, homeButton, projectButton, showTaskFormButton, showFolderFormButton } from "./elements.js";
import { getTaskFormData, getFolderFormData, addTaskToFolder } from "./create.js";
import { displayTasks, readyWindowFolders } from "./display.js";
import { newFolder } from "./folder.js";
import { setID } from "./search.js";

import "./styles.css";

const AllFolders = [];

const myDay = newFolder("My Day", "All your Tasks");
AllFolders.push(myDay);

taskForm.addEventListener("submit", (event) => {
  const task = getTaskFormData(event);
  addTaskToFolder(task, content, AllFolders);
  displayTasks(content, AllFolders);
  taskForm.classList.add("non-visible");
});


folderForm.addEventListener("submit", (event) => {
  getFolderFormData(event, AllFolders);
  readyWindowFolders(content, AllFolders);
  folderForm.classList.add("non-visible");
});

homeButton.addEventListener("click", () => {
  setID(content, myDay.getID());
  displayTasks(content, AllFolders);
});

projectButton.addEventListener("click", function(event) {
  readyWindowFolders(content, AllFolders);
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
