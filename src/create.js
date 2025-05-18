import { taskForm, folderForm } from "./elements.js";
import { newFolder } from "./folder.js";
import { newTask } from "./task.js";
import * as search from "./search.js";

const AllFolders = [];

const myDay = newFolder("My Day", "All your Tasks");
AllFolders.push(myDay);


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

const getFolderFormData = (event, folders) => {
  event.preventDefault();
  const data = new FormData(folderForm);
  folders.push(createFolder(data));
  folderForm.reset();
}

export { addTaskToFolder, getTaskFormData, getFolderFormData };