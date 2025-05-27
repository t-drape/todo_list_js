import { taskForm, folderForm, showTaskFormButton, showFolderFormButton, titlePart, topDisplay, backButton } from "./elements.js";
import { findFolder, setID, folderNotMyDay } from "./search.js";
import { deleteFolder, changePL, finalChangePL, finalChangeDate, finalChangeDescription, finalChangeTitle } from "./create.js";
import { save } from "./index.js";
import { format } from "date-fns";

const resetDisplay = (div)  => {
  div.innerHTML = "";
}

const viewTask = (task, container, folders) => {

  const backFolder = container.dataset.folderId;

  viewTaskTop(container, backFolder, folders);
  
  resetDisplay(container);

  const backButton = document.createElement("button");

  backButton.textContent = "Project";
  backButton.addEventListener("click", () => {
    setID(container, backFolder);
    displayTasks(container, folders);
  });

  const total = document.createElement("div");

  total.appendChild(backButton);

  const title = document.createElement("div");

  const titleForm = document.createElement("form");
  titleForm.id = crypto.randomUUID();

  const writeTitle = document.createElement("input");
  writeTitle.type = "text";
  writeTitle.placeholder = "Title";
  writeTitle.name = "title";
  writeTitle.id = "title";
  writeTitle.setAttribute('required', '');


  const submitTitle = document.createElement("input");
  submitTitle.type = "submit";

  titleForm.appendChild(writeTitle);
  titleForm.appendChild(submitTitle);

  titleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    finalChangeTitle(task, event);
    save(folders);
    viewTask(task, container, folders);
  });

  titleForm.classList.add("non-visible");

  title.appendChild(titleForm);

  const titleText = document.createElement("h1");
  titleText.textContent = task.getTitle();


  titleText.addEventListener("click", (event) => {
    changePL(event, titleForm.id);
  });

  title.appendChild(titleText);

  total.appendChild(title);

  const description = document.createElement("div");

  const descriptionForm = document.createElement("form");
  descriptionForm.id = crypto.randomUUID();

  const writeDescription = document.createElement("textarea");
  writeDescription.name = "description";
  writeDescription.setAttribute('required', '');
  writeDescription.id = "description";
  writeDescription.placeholder = "Enter description";

  const submitDescription = document.createElement("input");
  submitDescription.type = "submit";

  descriptionForm.appendChild(writeDescription);
  descriptionForm.appendChild(submitDescription);

  descriptionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    finalChangeDescription(task, event);
    save(folders);
    viewTask(task, container, folders);
  });

  descriptionForm.classList.add("non-visible");
  
  description.appendChild(descriptionForm);

  total.appendChild(description);


  const descriptionText = document.createElement("p");
  descriptionText.textContent = task.getDescription();
  description.appendChild(descriptionText);

  descriptionText.addEventListener("click", (event) => {
    changePL(event, descriptionForm.id);
  })


  const dueDate = document.createElement("div");

  const showDueDate = document.createElement("p");
  showDueDate.textContent = "Due: " + format(task.getDate(), "MMMM dd, yyyy");
  dueDate.appendChild(showDueDate);

  const dueDateForm = document.createElement("form");
  dueDateForm.id = crypto.randomUUID();
  const selectDate = document.createElement("input");
  selectDate.setAttribute('required', '');
  selectDate.type = "date";
  selectDate.id = "date";
  selectDate.name = "date";
  const submitDate = document.createElement("input");
  submitDate.type = "submit";

  dueDateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    finalChangeDate(task, event);
    save(folders);
    viewTask(task, container, folders);
  })

  showDueDate.addEventListener("click", (event) => {
    changePL(event, dueDateForm.id);
  })

  dueDateForm.appendChild(selectDate);
  dueDateForm.appendChild(submitDate);

  dueDateForm.classList.add("non-visible");

  dueDate.appendChild(dueDateForm);
  total.appendChild(dueDate);

  const priorityLevel = document.createElement("div");
  const priorityLevelNormal = document.createElement("h3");
  const changeLink = document.createElement("a");
  changeLink.textContent = task.getPriorityLevel();
  priorityLevelNormal.textContent = "Priority Level: ";
  priorityLevel.appendChild(priorityLevelNormal);
  priorityLevel.appendChild(changeLink);
  priorityLevel.classList.add("priority-level");

  const priorityLevelForm = document.createElement("form");
  const selectLevel = document.createElement("select");
  selectLevel.id = "priority";
  selectLevel.name = "priority";
  const sub = document.createElement("input");
  sub.type = "submit";

  for (let option of [1,2,3,4,5]) {
    const op = document.createElement("option");
    op.value = option;
    op.text = option;
    selectLevel.appendChild(op);
  }
  priorityLevelForm.classList.add("priority-form");
  priorityLevelForm.id = crypto.randomUUID();
  priorityLevelForm.classList.add("non-visible");

  priorityLevelForm.appendChild(selectLevel);
  priorityLevelForm.appendChild(sub);

  priorityLevelForm.addEventListener("submit", (event) => {
    event.preventDefault();
    finalChangePL(task, event);
    save(folders);
    viewTask(task, container, folders);
  });

  changeLink.addEventListener("click", function(event) {
    changePL(event, priorityLevelForm.id);
  })

  priorityLevel.appendChild(priorityLevelForm);
  total.appendChild(priorityLevel);


  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("task-view-delete-task-button");
  deleteButton.addEventListener("click", (event) => {
    const project = findFolder(backFolder, folders);
    project.deleteTask(task.getID());
    save(folders);
    setID(container, backFolder);
    displayTasks(container, folders);
  });

  total.appendChild(deleteButton);

  total.classList.add("task-view");
  container.appendChild(total);
}

const viewFoldersTop = () => {
  taskForm.classList.add("non-visible");
  showTaskFormButton.classList.add("non-visible");
  showFolderFormButton.classList.remove("non-visible");
  titlePart.textContent = "Your Folders";
  topDisplay.classList.add("folders-view");
}

const viewTaskTop = () => {
  showTaskFormButton.classList.add("non-visible");
  showFolderFormButton.classList.add("non-visible");
  taskForm.classList.add("non-visible");
  titlePart.textContent = "";
  topDisplay.classList.add("single-task");
}

const viewProjectTop = (title) => {
  backButton.classList.add("non-visible");
  showTaskFormButton.classList.remove("non-visible");
  titlePart.textContent = title;
  topDisplay.classList.add("project-view");
}

const displayTasks = (container, folders) => {
  const project = findFolder(container.dataset.folderId, folders);

  resetDisplay(container);

  viewProjectTop(project.getTitle());


  for (let task of project.getTasks()) {
    const taskElement = document.createElement("div");
    taskElement.dataset.id = task.getID();

    const sepElement = document.createElement("div");
    // const secSepElement = document.createElement("div");
    // sepElement.classList.add("sep-one");
    // secSepElement.classList.add("sep-two");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("short-delete-task-button");
    deleteButton.addEventListener("click", (event) => {
      project.deleteTask(event.target.parentElement.parentElement.dataset.id);
      save(folders);
      displayTasks(container, folders);
    });
    sepElement.appendChild(deleteButton);

    const title = document.createElement("h1");
    title.textContent = task.getTitle();
    title.classList.add("short-task-title")

    title.addEventListener("click", () => {
      viewTask(task, container, folders);
    });
    sepElement.appendChild(title);

    sepElement.classList.add("project-style-first");

    taskElement.appendChild(sepElement);

    // const description = document.createElement("p");
    // description.textContent = task.getDescription();
    // sepElement.appendChild(description);

    // const priorityLevel = document.createElement("div");
    // const priorityLevelNormal = document.createElement("h3");
    // const changeLink = document.createElement("a");
    // changeLink.textContent = task.getPriorityLevel();
    // priorityLevelNormal.textContent = "Priority Level: ";
    // priorityLevel.appendChild(priorityLevelNormal);
    // priorityLevel.appendChild(changeLink);
    // priorityLevel.classList.add("priority-level");

    // const priorityLevelForm = document.createElement("form");
    // const selectLevel = document.createElement("select");
    // selectLevel.id = "priority";
    // selectLevel.name = "priority";
    // const sub = document.createElement("input");
    // sub.type = "submit";

    // sub.addEventListener("click", (event) => {
    //   finalChangePL(task, event);
    //   displayTasks(container, folders);
    // });
    // priorityLevelForm.appendChild(sub);

    // for (let option of [1,2,3,4,5]) {
    //   const op = document.createElement("option");
    //   op.value = option;
    //   op.text = option;
    //   selectLevel.appendChild(op);
    // }
    // priorityLevelForm.classList.add("priority-form");
    // priorityLevelForm.id = crypto.randomUUID();
    // priorityLevelForm.classList.add("non-visible");

    // priorityLevelForm.appendChild(selectLevel);

    // changeLink.addEventListener("click", function(event) {
    //   changePL(event, priorityLevelForm.id);
    // })

    // priorityLevel.appendChild(priorityLevelForm);

    // secSepElement.appendChild(priorityLevel);

    const dueDate = document.createElement("h3");
    dueDate.textContent = "Due: " + format(task.getDate(), "MMMM dd, yyyy");
    dueDate.classList.add("short-due-date")
    taskElement.appendChild(dueDate);

    // taskElement.appendChild(sepElement);
    // taskElement.appendChild(secSepElement);

    taskElement.classList.add("task");



    container.appendChild(taskElement);
  }

  showTaskFormButton.classList.remove("non-visible");
  showFolderFormButton.classList.add("non-visible");
  folderForm.classList.add("non-visible");
}

const displayFolders = (container, folders) => {

  viewFoldersTop();

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
        save(folders);
        readyWindowFolders(container, folders);
      });
      deletion.appendChild(deleteButton);
    }

    deletion.classList.add("deletion-folder");

    newFolder.appendChild(deletion);

    newFolder.classList.add("folder");

    container.appendChild(newFolder);
  }
}

const readyWindowFolders = (container, folders) => {
  resetDisplay(container);
  setID(container, "");
  displayFolders(container, folders);
}

export { resetDisplay, displayTasks, displayFolders, readyWindowFolders };