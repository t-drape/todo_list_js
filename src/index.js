import { taskForm, folderForm, homeButton, projectButton } from "./elements.js";
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
});


folderForm.addEventListener("submit", (event) => {
  getFolderFormData(event, AllFolders);
  readyWindowFolders(content, AllFolders);
});

homeButton.addEventListener("click", () => {
  setID(content, myDay.getID());
  displayTasks(content, AllFolders);
});

projectButton.addEventListener("click", function(event) {
  readyWindowFolders(content, AllFolders);
});
