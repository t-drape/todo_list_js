import { findFolder, setID } from "./search.js";
import { showTaskFormButton, showFolderFormButton } from "./elements.js";

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
}

const displayFolders = (container, folders) => {
  for (let f of folders) {
    const newFolder = document.createElement("div");
    newFolder.dataset.folderId = f.getID();

    const title = document.createElement("h1");
    title.textContent = f.getTitle();
    newFolder.appendChild(title);

    const description = document.createElement("p");
    description.textContent = f.getDescription();
    newFolder.appendChild(description);


    const goButton = document.createElement("button");
    goButton.textContent = "View Project";
    goButton.addEventListener("click", function(event) {
      setID(container, newFolder.dataset.folderId);
      displayTasks(container, folders);
    });

    newFolder.appendChild(goButton);

    container.appendChild(newFolder);
  }
  showTaskFormButton.classList.add("non-visible");
  showFolderFormButton.classList.remove("non-visible");
}

const readyWindowFolders = (container, folders) => {
  resetDisplay(container);
  setID(container, "");
  displayFolders(container, folders);
}

export { resetDisplay, displayTasks, displayFolders, readyWindowFolders };