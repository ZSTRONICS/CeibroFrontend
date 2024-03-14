// const windowsMap = new Map();

import { AssignedUserState, ITask, InvitedNumber, TaskRootState, TaskState } from "constants/interfaces";
import _ from "lodash";
import { MutableRefObject } from "react";
import { taskConstantEn, taskConstantEt } from "translation/TaskConstant";

export const openFormInNewWindow = (path: string, windowTitle: string) => {
  let width = 900;
  let height = 782;
  const leftOffset = (window.screen.width - width) / 2 + window.screenX;
  const topOffset = (window.screen.height - height) / 2 + window.screenY;

  // if (window.innerWidth < 900) {
  //   width = window.innerWidth - 50;
  // }
  // if (window.innerHeight < 782) {
  //   height = window.innerHeight - 50;
  // }
  const newWindow = window.open(
    path,
    "",
    `width=${width}, height=${height}, left=${leftOffset}, top=${topOffset}, toolbar=no, location=no, resizable=no, status=no`
  );

  // Set the title of the new window
  if (newWindow != null) {
    newWindow.addEventListener("load", () => {
      newWindow.document.title = windowTitle;
    });
  } else {
    alert("The new window was blocked. Please allow pop-ups for this site.");
  }
};

// Now this function for handle contacts search
export const handleGroupSearch = (
  searchText: string,
  sortedData: { [key: string]: any[] },
  searchKey: string | undefined
) => {
  if (searchText === "" || !searchKey) return sortedData;

  // const searchCharacter = searchText.charAt(0).toLowerCase();
  const filteredData: { [key: string]: any[] } = {};

  Object.entries(sortedData).forEach(([groupLetter, groupOptions]) => {
    // if (groupLetter.startsWith(searchCharacter.toUpperCase())) {
    const filteredOptions = groupOptions.filter((groupOption) =>
      groupOption[searchKey].toLowerCase().includes(searchText.toLowerCase())
    );
    if (filteredOptions.length > 0) {
      filteredData[groupLetter] = filteredOptions;
    }
    //this return for break the forEach loop
    // return;
  });
  // });
  return filteredData;
};
/**
 * Checks if the given string includes the search value, ignoring case.
 *
 * @param {string} str - The string to search in.
 * @param {string} searchValue - The value to search for.
 * @return {boolean} Returns true if the string contains the search value,
 *                    Otherwise, returns false.
 */
export function includesIgnoreCase(str: string, searchValue: string): boolean {
  const lowerStr = str.toLowerCase();
  const lowerSearchValue = searchValue.toLowerCase();
  return lowerStr.includes(lowerSearchValue);
}

//handle remove Item from File array fo image and doc
export const removeItem = (data: File[] | any, removeFile: File) => {
  const filteredData = data.filter((item: File) => {
    return removeFile.name !== item.name;
  });
  return filteredData;
};

export const taskConstants: any = {
  allTaskFromMe: {
    ongoing: [
      {
        heading: taskConstantEt.FromMe_Ongoing_Qestion_et,
        description: taskConstantEt.FromMe_Ongoing_desc_et,
      },
      {
        heading: taskConstantEn.FromMe_Ongoing_Qestion_en,
        description: taskConstantEn.FromMe_Ongoing_desc_en,
      },
    ],
    done: [
      {
        heading: taskConstantEt.FromMe_Done_Qestion_et,
        description: taskConstantEt.FromMe_Done_desc_et,
      },
      {
        heading: taskConstantEn.FromMe_Done_Qestion_en,
        description: taskConstantEn.FromMe_Done_desc_en,
      },
    ],
  },
  allTaskToMe: {
    ongoing: [
      {
        heading: taskConstantEt.To_Me_Ongoing_Qestion_et,
        description: taskConstantEt.To_Me_Ongoing_desc_et,
      },
      {
        heading: taskConstantEn.To_Me_Ongoing_Qestion_en,
        description: taskConstantEn.To_Me_Ongoing_desc_en,
      },
    ],
    done: [
      {
        heading: taskConstantEt.To_Me_Done_Qestion_et,
        description: taskConstantEt.To_Me_Done_desc_et,
      },
      {
        heading: taskConstantEn.To_Me_Done_Qestion_en,
        description: taskConstantEn.To_Me_Done_desc_en,
      },
    ],
  },
  allTaskHidden: {
    canceled: [
      {
        heading: taskConstantEt.Hidden_Canceled_Qestion_et,
        description: taskConstantEt.Hidden_Canceled_desc_et,
      },
      {
        heading: taskConstantEn.Hidden_Canceled_Qestion_en,
        description: taskConstantEn.Hidden_Canceled_desc_en,
      },
    ],
    done: [
      {
        heading: taskConstantEt.Hidden_Done_Qestion_et,
        description: taskConstantEt.Hidden_Done_desc_et,
      },
      {
        heading: taskConstantEn.Hidden_Done_Qestion_en,
        description: taskConstantEn.Hidden_Done_desc_en,
      },
    ],
    ongoing: [
      {
        heading: taskConstantEt.Hidden_Ongoing_Qestion_et,
        description: taskConstantEt.Hidden_Ongoing_Qestion_et,
      },
      {
        heading: taskConstantEn.Hidden_Ongoing_Qestion_en,
        description: taskConstantEn.Hidden_Ongoing_desc_en,
      },
    ],
  },
};
export const MUI_TASK_CARD_COLOR_MAP: Map<string, string> = new Map([
  ["ongoing", "#F1B740"],
  ["new", "#CFECFF"],
  ["canceled", "#E85555"],
  ["unread", "#E2E4E5"],
  ["done", "#55BCB3"],
  // verify and updated color
  ["in-review", "#CFECFF"],
  ["to-review", "#CFECFF"],
]);

export const ALL_FLOOR_NAMES = Array.from(
  { length: 29 },
  (_, index) => `${index - 3}`
).filter((num) => num !== "0");
export const HEADER_HEIGHT = 87;

/**
 * Searches an array of ITask objects based on the specified properties and searchText.
 */
export function searchInData(
  data: ITask[],
  searchText: string,
  properties: string[]
): ITask[] {
  if (!searchText.trim()) {
    return data;
  }
  const lowerSearchText = searchText.toLowerCase();
  return data.filter((item: ITask) => {
    return properties.some((property) => {
      const searchValue: string | UserInfo = _.get(item, property);
      // If the searchValue is a string, check if it includes the lowerSearchText
      if (_.isString(searchValue)) {
        return includesIgnoreCase(searchValue, lowerSearchText);
      }
      // If the searchValue is an object, check if it has firstName and surName properties
      else if (_.isObject(searchValue)) {
        if (searchValue.firstName) {
          const fullName = `${searchValue.firstName} ${searchValue.surName}`;
          return includesIgnoreCase(fullName, lowerSearchText);
        }
      }
      return false;
    });
  });
}

export const updateTaskListFilter = (filter: any) => {
  const isAnyStateFalse = Object.values(filter).some((TaskFilter: any) =>
    Object.values(TaskFilter).some((state) => state === false)
  );
  return !isAnyStateFalse;
};

/**
 * Creates a dropdown option for each floor in the project, based on the provided project floors and all floor names.
 *
 * @param {Array} projectFloors - An array of objects representing the project floors
 * @param {Array} allFloorNames - An array of strings representing all floor names
 * @return {Array} An array of dropdown options for each floor
 */
export const createFloorDropdownOption = (
  allFloors: Floor[],
  allFloorNames: string[]
) => {
  const floorNames = allFloors.map((floor) => floor.floorName);
  return allFloorNames.map((item) => {
    const isShown = floorNames.includes(item);
    return {
      label: "*",
      value: item,
      _id: "",
      isShown,
      isPermanenetOption: isShown,
    };
  });
};

export const fetchDrawingTaskList = (
  projectData: any,
  allTasksAllEvents: any
) => {
  const selectedDrawingPins = allTasksAllEvents.allPins.filter(
    (pin: any) => pin.drawingId === projectData.selectedDrawing._id
  );
  const drawingTaskList = allTasksAllEvents.allTasks.filter((task: any) =>
    selectedDrawingPins.some((pin: any) => pin.taskData._id === task._id)
  );
  return drawingTaskList;
};

export const filterTasksByCondition = (
  tasks: ITask[],
  condition: (task: ITask) => boolean
): ITask[] => {
  return tasks.filter(condition);
};

export const formatUserName = (
  user: AssignedUserState | InvitedNumber | any
) => {
  const { firstName, surName, phoneNumber } = user;
  if (firstName && surName) {
    return `${firstName} ${surName}`;
  } else if (firstName) {
    return firstName;
  } else if (surName) {
    return surName;
  } else {
    return phoneNumber;
  }
};

/**
 * Calculate the width of the HTMLDivElement including margin and padding.
 *
 * @param {MutableRefObject<HTMLDivElement | null>} compRef - reference to the HTMLDivElement
 * @return {number} the width of the HTMLDivElement including margin and padding, or 0 if the reference is null
 */
export const getWidthWithMarginAndPadding = (
  compRef: MutableRefObject<HTMLDivElement | null>
) => {
  if (compRef.current) {
    const width = compRef.current.clientWidth;
    return width;
  }
  return 0;
};



/**
 * Returns a record of task filters based on the provided parameters.
 *
 * @param {any} rootStateLocal - the local root state
 * @param {any} userSubStateLocal - the local user sub state
 * @param {boolean} isCanceled - flag indicating if the task is canceled
 * @return {Record<string, any>} a record of task filters
 */
export const getTaskFilters = (
  rootStateLocal: any,
  userSubStateLocal: any,
  isCanceled: boolean
): Record<string, any> => {
  return {
    All: {
      rootState: rootStateLocal,
      isCreator: false,
      isAssignedToMe: false,
      userSubState: null,
      toMeState: null,
      fromMeState: null,
    },
    "To me": {
      rootState: rootStateLocal,
      isAssignedToMe: true,
      userSubState: userSubStateLocal,
      toMeState: isCanceled ? null : userSubStateLocal,
      fromMeState: null,
    },
    "From me": {
      rootState: rootStateLocal,
      isCreator: true,
      userSubState: userSubStateLocal,
      toMeState: null,
      fromMeState: isCanceled ? null : userSubStateLocal,
    },
    "To Review": {
      rootState: rootStateLocal,
      userSubState: TaskState.TOREVIEW,
      toMeState: null,
      fromMeState: null,
    },
    Pending: {
      rootState: rootStateLocal,
      userSubState: TaskState.INREVIEW,
      toMeState: null,
      fromMeState: null,
    },
  };
};

export const TaskRootSateLocal: Record<string, string> = {
  Ongoing: TaskRootState.Ongoing,
  Approval: TaskRootState.Approval,
  Closed: TaskRootState.Closed,
  Canceled: TaskRootState.Canceled,
  Hidden: TaskRootState.Hidden,
};
export const calcUserSubState: Record<string, string> = {
  Ongoing: TaskState.ONGOING || TaskState.NEW,
  Approval: TaskState.TOREVIEW,
  Pending: TaskState.INREVIEW,
  Closed: TaskState.DONE,
  Canceled: TaskState.CANCELED,
};

/**
 * Filters tasks based on specified criteria.
 *
 * @param {ITask[]} allTasks - array of all tasks to filter
 * @param {TaskRootState} rootStateTag - root state tag to filter tasks by
 * @param {boolean} isHiddenByMe - flag to filter tasks hidden by user
 * @param {string | null} userSubState - user sub state to filter tasks by
 * @param {TaskState | null} toMeState - status to filter tasks to 'to me'
 * @param {TaskState | null} fromMeState - status to filter tasks from 'from me'
 * @param {boolean} isCreator - flag to filter tasks if is isCreator
 * @param {boolean} isAssignedToMe - flag to filter tasks if is isAssignedToMe
 * @return {ITask[]} filtered array of tasks
 */
export function filterTasks(
  allTasks: ITask[],
  rootStateTag: TaskRootState,
  isHiddenByMe: boolean = false,
  userSubState: string | null = null,
  toMeState: TaskState | null = null,
  fromMeState: TaskState | null = null,
  isCreator: boolean = false,
  isAssignedToMe: boolean = false,
): ITask[] {
  const preFilterTask = (task: ITask) => {
    const isRootStateMatch = task.taskRootState === rootStateTag;
    const isHiddenByMeMatch = isHiddenByMe ? task.isHiddenByMe === true : true;
    const isCreatorMatch = isCreator ? task.isCreator === true : true;
    const isAssignedToMeMatch = isAssignedToMe ? task.isAssignedToMe === true : true;
    const isUserSubStateMatch = userSubState ? task.userSubState === userSubState : true;
    const isToMeStatusMatch = toMeState ? task.toMeState === toMeState : true;
    const isFromMeStatusMatch = fromMeState ? task.fromMeState === fromMeState : true;
    return isRootStateMatch && isCreatorMatch && isAssignedToMeMatch && isHiddenByMeMatch && isToMeStatusMatch && isFromMeStatusMatch && isUserSubStateMatch;
  };

  const filteredTasks: ITask[] = [];
  for (const task of allTasks) {
    if (preFilterTask(task)) {
      filteredTasks.push(task);
    }
  }

  filteredTasks.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  return filteredTasks;
}
