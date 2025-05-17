import { newFolder } from "./folder.js";


const findFolder = (folderID, folders) => {
  for (let folder of folders) {
    if (folder.getID() == folderID) {
      return folder;
    }
  }
}

const setID = (container, folderID) => {
  container.dataset.folderId = folderID;
}

export {findFolder, setID};