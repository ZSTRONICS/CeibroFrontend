export function getfilteredTasks(tasks, filters) {
  const filteredTasks = {
    fromMe: {},
    toMe: {},
    hidden: {},
  };
  let filteredDrawingTasks = [];

  tasks.forEach((task) => {
    const { fromMeState, toMeState, hiddenState } = task;

    if (fromMeState !== "NA") {
      filteredTasks.fromMe[fromMeState] =
        filteredTasks.fromMe[fromMeState] || [];
      filteredTasks.fromMe[fromMeState].push(task);
    } else if (toMeState !== "NA") {
      filteredTasks.toMe[toMeState] = filteredTasks.toMe[toMeState] || [];
      filteredTasks.toMe[toMeState].push(task);
    } else if (hiddenState !== "NA") {
      filteredTasks.hidden[hiddenState] =
        filteredTasks.hidden[hiddenState] || [];
      filteredTasks.hidden[hiddenState].push(task);
    }
  });

  if (filters.isAllSelected) {
    return tasks;
  } else {
    // Iterate through filteredTasks and apply filters
    for (const key in filteredTasks) {
      const filter = filters[key];
      for (const subKey in filter) {
        if (filter[subKey]) {
          // If the filter is true, push tasks to filteredDrawingTasks
          if (filteredTasks[key][subKey]) {
            filteredDrawingTasks = filteredDrawingTasks.concat(
              filteredTasks[key][subKey]
            );
          }
        }
      }
    }
  }
  return filteredDrawingTasks;
}
