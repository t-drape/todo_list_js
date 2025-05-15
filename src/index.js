import { newTask } from "./task.js";
import { newFolder } from "./folder.js";

let myArray = [];

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

myArray.push(newFolder("Folder", 5, "Second One!", 4));
console.log(myArray[0].getTitle());
myArray[0].changeTitle("NotaTest");
console.log(myArray[0].getTitle());
console.log(myArray[0].getDate());
console.log("Description: " + myArray[0].getDescription());
myArray[0].changeDescription("Hola");
console.log("Description: " + myArray[0].getDescription());
myArray[0].changeDate(3);
console.log(myArray[0].getDate());
console.log(myArray[0].getTasks());
myArray[0].addNewTask(t);
console.log(myArray[0].getTasks());
myArray[0].deleteTask(t);
console.log(myArray[0].getTasks());