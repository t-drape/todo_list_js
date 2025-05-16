const uniqueID = (state) => ({
  getID: () => state.id,
});

const Title = (state) => ({
  getTitle: () => state.title,
  changeTitle: (newTitle) => state.title = newTitle,
});

const DueDate = (state) => ({
  getDate: () => state.date,
  changeDate: (newDate) => state.date = newDate,
});

const Description = (state) => ({
  getDescription: () => state.description,
  changeDescription: (newDescription) => state.description = newDescription,
});

const Priority = (state) => ({
  getPriorityLevel: () => state.priority,
  changePriorityLevel: (newPriorityLevel) => state.priority = newPriorityLevel,
});

export { uniqueID, Title, DueDate, Description, Priority };