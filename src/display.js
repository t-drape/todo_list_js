import { taskForm, folderForm, showTaskFormButton, showFolderFormButton } from "./elements.js";
import { findFolder, setID, folderNotMyDay } from "./search.js";
import { deleteFolder } from "./create.js";

const resetDisplay = (div)  => {
  div.innerHTML = "";
}

const displayTasks = (container, folders) => {
  const project = findFolder(container.dataset.folderId, folders);
  resetDisplay(container);
  for (let task of project.getTasks()) {
    const taskElement = document.createElement("div");
    taskElement.dataset.id = task.getID();

    const sepElement = document.createElement("div");
    const secSepElement = document.createElement("div");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-task-button");
    deleteButton.addEventListener("click", (event) => {
      project.deleteTask(event.target.parentElement.parentElement.dataset.id);
      displayTasks(container, folders);
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

    const changePLbutton = document.createElement("button");
    changePLbutton.textContent = "Change";
    secSepElement.appendChild(changePLbutton);

    const dueDate = document.createElement("h3");
    dueDate.textContent = "Due Date: " + task.getDate();
    secSepElement.appendChild(dueDate);

    secSepElement.classList.add("sep-two");

    taskElement.appendChild(sepElement);
    taskElement.appendChild(secSepElement);

    taskElement.classList.add("task");

    container.appendChild(taskElement);
  }
  showTaskFormButton.classList.remove("non-visible");
  showFolderFormButton.classList.add("non-visible");
  folderForm.classList.add("non-visible");
}

const displayFolders = (container, folders) => {
  for (let f of folders) {
    const newFolder = document.createElement("div");
    newFolder.dataset.folderId = f.getID();

    const every = document.createElement("div");
    const deletion = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = f.getTitle();
    every.appendChild(title);

    const description = document.createElement("p");
    description.textContent = f.getDescription();
    every.appendChild(description);


    const goButton = document.createElement("button");
    goButton.textContent = "View Project";
    goButton.addEventListener("click", function(event) {
      setID(container, newFolder.dataset.folderId);
      displayTasks(container, folders);
    });

    every.appendChild(goButton);

    every.classList.add("common-folder");

    newFolder.appendChild(every);

    if (!folderNotMyDay(folders, f)) {
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function(event) {
        deleteFolder(folders, f.getID());
        readyWindowFolders(container, folders);
      });
      deletion.appendChild(deleteButton);
    }

    deletion.classList.add("deletion-folder");

    newFolder.appendChild(deletion);

    newFolder.classList.add("folder");

    container.appendChild(newFolder);
  }
  showTaskFormButton.classList.add("non-visible");
  showFolderFormButton.classList.remove("non-visible");
  taskForm.classList.add("non-visible");
}

const readyWindowFolders = (container, folders) => {
  resetDisplay(container);
  setID(container, "");
  displayFolders(container, folders);
}

export { resetDisplay, displayTasks, displayFolders, readyWindowFolders };