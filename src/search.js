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

const folderNotMyDay = (folders, folder) => {
  return (folder === folders[0]);
}

export { findFolder, setID, folderNotMyDay };