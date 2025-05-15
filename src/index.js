import { newTask } from "./task.js";
import { newFolder } from "./folder.js";

const AllFolders = [];

const t = newTask("Test", 2, "First One!", 10);
console.log(t.getTitle());
t.changeTitle("NotaTest");
console.log(t.getTitle());
console.log(t.getDate());
console.log("Description: " + t.getDescription());
t.changeDescription("Hola");
console.log("Description: " + t.getDescription());
t.changeDate(3);
console.log(t.getDate());
console.log("Priority Level: " + t.getPriorityLevel());
t.changePriorityLevel(1);
console.log("Priority Level: " + t.getPriorityLevel());

AllFolders.push(newFolder("Folder", 5, "Second One!"));
console.log(AllFolders[0].getTitle());
AllFolders[0].changeTitle("NotaTest");
console.log(AllFolders[0].getTitle());
console.log(AllFolders[0].getDate());
console.log("Description: " + AllFolders[0].getDescription());
AllFolders[0].changeDescription("Hola");
console.log("Description: " + AllFolders[0].getDescription());
AllFolders[0].changeDate(3);
console.log(AllFolders[0].getDate());
console.log(AllFolders[0].getTasks());
AllFolders[0].addNewTask(t);
console.log(AllFolders[0].getTasks());
AllFolders[0].deleteTask(t);
console.log(AllFolders[0].getTasks());

AllFolders.push(newFolder("Folder2", 5, "Third One!"));
console.log(AllFolders[0].getTitle());
console.log(AllFolders[1].getTitle());
