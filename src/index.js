import { newTask } from "./task.js";
import { newFolder } from "./folder.js";

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

const f = newFolder("Folder", 5, "Second One!", 4);
console.log(f.getTitle());
f.changeTitle("NotaTest");
console.log(f.getTitle());
console.log(f.getDate());
console.log("Description: " + f.getDescription());
f.changeDescription("Hola");
console.log("Description: " + f.getDescription());
f.changeDate(3);
console.log(f.getDate());

