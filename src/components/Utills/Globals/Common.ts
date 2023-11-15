import { ITask } from "constants/interfaces";
import moment from "moment-timezone";
import { AxiosV2 } from "utills/axios";

declare global {
  var isSocketConnecting: boolean; // 👈️ disables type checking for property
}
global.isSocketConnecting = false;
export { };

export const getSelectedProjectMembers = (projectId: string, projectWithMembers: any[]): any[] => {
  // eslint-disable-next-line array-callback-return
  let projectMembers: any[] = []

  projectWithMembers.every((project: any) => {
    if (String(project._id) === String(projectId)) {
      projectMembers = project.projectMembers;
      return false
    }
    return true
  })
  return projectMembers;
};

function countUnseenTasksFromLists(taskLists: any) {
  return countUnseenTasks(
    taskLists.reduce(
      (accumulated: any, current: any) => [...accumulated, ...current],
      []
    )
  );
}

const updateLocalStorageObject = (updateObject: any) => {
  try {
    let storedString = localStorage.getItem("unSeenTasks");
    let storedObject = {};
    if (storedString) {
      storedObject = JSON.parse(storedString);
      if (typeof storedObject !== 'object' || storedObject === null) {
        throw new Error('Data in local storage is not an object.');
      }
    }
    Object.assign(storedObject, updateObject);
    localStorage.setItem("unSeenTasks", JSON.stringify(storedObject));
    return storedObject;
  } catch (error) {
    console.error('Error updating local storage:', error);
    return {};
  }
};

export const getUserFormatedDataForAutoComplete = (arr: any) => {
  return arr?.map((member: any) => {
    return {
      label: `${member?.firstName} ${member?.surName}`,
      id: member?._id,
    };
  });
};

function countUnseenTasks(tasks: any[]) {
  // count is the accumulator, which starts at 0
  return tasks.reduce((count, task) => (task.isSeenByMe ? count : count + 1), 0);
}

/**
  * @param array pass the array of objects 
  * @return Functino will return the unique objects
  * **/

export const getUniqueObjectsFromArr = (arr: any[], removeMember = {}) => {
  let distinctArray: any = []
  arr.forEach((member: any) => {
    let addToArr = true
    distinctArray.every((added: any) => {
      if (added.id === member.id) {
        addToArr = false
        return false
      }
      return true
    })
    if (addToArr) {
      distinctArray.push(member)
    }
  })

  return distinctArray
}



/**
  * @param array pass the string array  
  * @return Functino will return the unique array of elements
 **/

export const uniqueStringArray = (arr: any[]) => {
  const seen = new Map();  // create a new Map object to keep track of the seen elements
  const result = [];       // create an empty array to store the unique elements
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];               // get the current element
    if (!seen.has(element)) {             // check if the element has not been seen before
      seen.set(element, true);            // add the element to the seen Map object
      result.push(element);               // add the element to the result array
    }
  }
  return result;          // return the array of unique elements
};


/**
  * @param array pass the array of objects 
  * @return Functino will return the unique objects
 **/
export const getDistinctFromTwoArr = (arr: any[], arr2: any[]) => {
  let distinctArray: any = []
  arr.forEach((member: any) => {
    let addToArr = true
    arr2.every((added: any) => {
      if (added.id === member.id) {
        addToArr = false
        return false
      }
      return true
    })
    if (addToArr) {
      distinctArray.push(member)
    }
  })


  arr2.forEach((member: any) => {
    let addToArr = true
    arr.every((added: any) => {
      if (added.id === member.id) {
        addToArr = false
        return false
      }
      return true
    })
    if (addToArr) {
      distinctArray.push(member)
    }
  })
  return distinctArray
}


/**
 * @param dataArray the array must have _id
 * @param labelKey must have  string
 * @param valueKey must have  string
 * @param {string} topicKey - An optional string param
 * @returns - Functino will return { label: "", value: "" }
  **/
//labelKey for get the value from object and store in label
//valueKey for get the value from object and store in value
const formatDropdownData = (
  data: any[] | any,
  labelKey: string,
  valueKey: string,
  topicKey?: string
) => {
  if (data) {
    return (
      data &&
      data.map((item: any) => {
        const topic = topicKey ? item[topicKey][topicKey] || "" : "";
        const label = item[labelKey] || "";
        const value = item[valueKey] || "";
        return { label: `${label.toString()}  ${topic.toString()}`, value: value.toString() };
      })
    );
  } else {
    return null;
  }
};

export function pushSeenBy(task: any, eventData: any) {
  const seenBy = task.seenBy;
  if (!seenBy.includes(eventData.userId)) {
    seenBy.push(eventData.userId);
  }
}
/**
 * @param taskArray the array must have _id
 * @param eventData data to be pushed to task events
 * @param taskIndex check if task exist 
 * @return Functino will return updated task events
 * **/
export function addEventToTask(task: any, eventData: any, taskIndex: number): void {
  if (taskIndex > -1) {
    // console.log('existingEvents', task.events)
    const isUniqueEvent = task.events?.some((event: any) => String(event._id) === String(eventData._id));
    if (!isUniqueEvent) {
      task.events?.push(eventData);
      // sort task events by createdAt with latest on bottom
      const events = task.events?.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      task.events = events;
      task.seenBy = eventData.taskData.seenBy;
    } else {
      // console.log("Event already exists ", eventData, task, taskIndex)
    }
  }
}
/**
 * @param taskArray the array must have _id
 * @param eventData data to be pushed to task events
 * @param taskIndex check if task exist 
 * @return Functino will return updated task events
 * **/
export function addUniqueEventToTask(task: any, forwardedTask: any): void {
  // console.log('existingEvents', task.events)
  const isUniqueEvent = task.events?.some((event: any) => String(event._id) === String(forwardedTask._id));
  if (!isUniqueEvent) {
    const updatedEvent = {
      _id: forwardedTask._id,
      taskId: forwardedTask.taskId,
      eventType: forwardedTask.eventType,
      initiator: forwardedTask.initiator,
      eventData: forwardedTask.eventData,
      commentData: forwardedTask.commentData,
      invitedMembers: forwardedTask.invitedMembers,
      createdAt: forwardedTask.createdAt,
      updatedAt: forwardedTask.updatedAt,
    }
    task.events?.push(updatedEvent);
    // sort task events by createdAt with latest on bottom
    const events = task.events?.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    task.events = events;
    task.seenBy = forwardedTask.taskData.seenBy;
  } else {
    // console.log("Event already exists ", task.events);
  }
}


export function moveTaskOnTopByIndex(taskArray: any, taskIndex: number): void {
  if (taskIndex > 0) {
    const task = taskArray[taskIndex]
    taskArray.splice(taskIndex, 1);
    taskArray.unshift(task);
  }
}


/**
 * @param task taks object
 * @param taskIndex 
 * @param eventData 
 * **/
export function updateTaskOnCancelEvent(task: any, taskIndex: any, eventData: any) {
  if (taskIndex > -1) {
    addEventToTask(task, eventData, taskIndex);
    task.creatorState = "canceled";
    task.userSubState = "canceled";
  }
}

/**
 * @param array the array must have _id
 * @param itemId must have comparison id string
 * @return Functino will return true or false
 * **/
export const isTrue = (arr: any[], itemId: string) => {
  return arr.some((item: any) => item._id === itemId)
}

// de date format 
/**
 * @return dd-mm-yyyy
 * @param dateString date string is required
 * **/
export const deDateFormat = (dateStr: Date | string) => {
  return new Date(String(dateStr)).toLocaleString('de').slice(0, 10).replaceAll('.', '-')
}
// de date format using moment of utc time mongodb
/**
 * @return dd.mm.yyyy
 * @param mongodbUtc date string is required
 * **/
export const momentdeDateFormat = (value: Date | any) => {
  if (!moment(value).isValid()) {
    return "N/A"
  }
  let localTime = moment.utc(moment(value)).toDate()
  return moment(localTime).local().format("DD.MM.YYYY")
}
/**
 * @return dd.mm.yy
 * @param mongodbUtc date string is required
 * **/
export const dateFormatWithYearSplit = (value: Date | any) => {
  if (!moment(value).isValid()) {
    return "N/A"
  }
  let localTime = moment.utc(moment(value)).toDate()
  return moment(localTime).local().format("DD.MM.YY")
}
// de date format using moment of utc time mongodb
/**
 * @return dd.mm.yyyy
 * @param mongodbUtc date string is required
 * **/
const momentdeDateFormatWithDay = (value: Date | any) => {
  let localTime = moment.utc(moment(value)).toDate();
  return moment(localTime).format("ddd, DD.MM.YYYY");
};

export const getTaskCardHeight = (task: ITask) => {
  try {
    const SINGLE_LINE_DESCRIPTION_CARD_HEIGHT = 90;
    const DOUBLE_LINE_DESCRIPTION_CARD_HEIGHT = 107;
    const NO_DESCRIPTION_CARD_HEIGHT = 72;
    const CHAR_COUNT_DESCRIPTION = 57;
    const height = task.description.length > 0 ? (task.description.length > CHAR_COUNT_DESCRIPTION ? DOUBLE_LINE_DESCRIPTION_CARD_HEIGHT : SINGLE_LINE_DESCRIPTION_CARD_HEIGHT) : NO_DESCRIPTION_CARD_HEIGHT;
    return height;
  } catch (error) {
    console.log("error calculating task card height => ", error);
    return 100;
  }
}

/**
 * @return 12:00AM
 * @param mongodbUtc date string is required
 * **/
export const momentTimeFormat = (createdAt: Date | any) => {
  let localTime = moment.utc(moment(createdAt)).toDate()
  return moment(localTime).local().format('HH:mm');
}

/**
 * @return Monday 13:30 
 * @param mongodbUtc date string is required
 * **/
export const momentLocalDateTime = (createdAt: Date | any) => {
  if (!moment(createdAt).isValid()) {
    return "N/A"
  }
  const currentDate = moment();
  const inputDate = moment(createdAt);
  if (currentDate.isSame(inputDate, 'day')) {
    return 'Today ' + inputDate.format('HH:mm');
  } else if (currentDate.clone().subtract(1, 'day').isSame(inputDate, 'day')) {
    return 'Yesterday ' + inputDate.format('HH:mm');
  } else if (currentDate.isSame(inputDate, 'week')) {
    return inputDate.format('dddd HH:mm');
  } else {
    return inputDate.format('DD.MM.YY HH:mm');
  }
}

// calculate file size 
/**
 * @param bytes bytes required
 * **/

export const filesizes = (bytes: any) => {
  let decimals = 2
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const onlyUnique = (value: any, index: any, array: any) => {
  return array.indexOf(value) === index;
}

// const distinctArray = Array.from(new Set(array));

// const dueDate = new Date().toLocaleDateString("de-DE", {
//   day: "numeric",
//   month: "numeric",
//   year: "numeric",
// });

export const DOC_EXT = ['.pdf', '.svg', '.doc', '.docx', '.xls', '.xlsx', '.txt', '.rtf', '.ppt', '.pptx', '.csv', '.psd', '.ai', '.eps', '.cdr', '.dwg', '.dxf', '.odt', '.ods', '.odp', '.odg', '.djvu', '.keynote']
export const MEDIA_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov', '.avi', '.flv', '.mp3', '.wav', '.indd']
const imageFileRegex = /\.(jpg|jpeg|png)$/i;
export const validTypes = [
  "image/*",
  "application/zip",
  "application/x-zip-compressed",
  "text/plain",
  "text/csv",
  "application/pdf",
  "application/rtf",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.presentation",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-word.document.macroEnabled.12",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel.sheet.macroEnabled.12",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint.presentation.macroEnabled.12"
];
/**
 * @param fileName 
 * @return return true or false
 * **/
export const IS_IMAGE = (fileName: string) => imageFileRegex.test(fileName.toLowerCase())
/**
 * @param fileType 
 * @return return true or false
 * **/
export function isValidImageType(fileType: string) {
  return fileType.startsWith('image/');
}

/**
 * @param fileType 
 * @return return true or false
 * **/
export function isValidDocumentType(fileType: string) {
  return validTypes.includes(fileType);
}
/**
 * @param inputString 
 * @return return true or false
 * **/
function hasOnlySpaces(inputString: string) {
  return /^\s*$/.test(inputString);
}

/**
 * @param extensionKeys array of extension
 * @param dataSource array of object 
 * @return array of filtered data
 * **/
export const FILTER_DATA_BY_EXT = (extensionKeys: string[], dataSource: any) => {
  let filesWithExtension: any = [];
  if (extensionKeys.length === 0) {
    return dataSource
  }
  for (let object of dataSource) {
    if (extensionKeys.includes(object.fileType.toLowerCase())) {
      filesWithExtension.push(object);
    }
  }
  return filesWithExtension
};

export const openFormWindow = (content: string) => {
  const windowWidth = 900;
  const windowHeight = 782;
  const windowLeft = (window.innerWidth - windowWidth) / 2;
  const windowTop = (window.innerHeight - windowHeight) / 2;
  const url = AxiosV2.defaults.baseURL;
  const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop},resizable=no,scrollbars=no,status=no`;
  const formWindow: Window | null = window.open(undefined, '_blank', windowFeatures);

  // Check if the window was blocked (only for modern browsers)
  if (!formWindow || formWindow.closed || typeof formWindow.closed === 'undefined') {
    alert('The new window was blocked. Please allow pop-ups for this site.');
  } else {
    const titleTag = `<title>Ceibro</title>`;
    const baseTag = `<base href="${url}" target="_blank">`;

    const fullContent = `
      <!DOCTYPE html>
      <html>
        <head>
          ${titleTag}
          ${baseTag}
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;
    formWindow.document.write(fullContent);
  }
};


/**
 * @param SubtaskMembersArr array of extension
 * @param SubtaskUserSate array of object 
 * @return array of members with state
 * **/
export const combinedMemberArrayWithState = (membersArr: any[], state: any[]) => {

  let combinedArray = membersArr.map((member: any) => {
    let tempState = ""
    state.every((user: any) => { if (String(member._id) === String(user.userId)) { tempState = user.userState; return false } return true; });
    return {
      ...member,
      userState: tempState,
    };
  });
  return combinedArray
}

export const tabsIndexProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// dynamically calculate height of container

// const containerRef = useRef<HTMLDivElement>(null);

// useEffect(() => {
//   if (containerRef.current) {
//     const headerHeight = document.querySelector('header')?.offsetHeight || 0;
//     const visibleHeight = window.innerHeight - headerHeight;
//     containerRef.current.style.height = `${visibleHeight}px`;
//   }
// }, []);

const optionMapping: { [key: string]: { [key: string]: string } } = {
  allTaskToMe: {
    ongoing: "Hide",
    done: "Hide",
  },
  allTaskFromMe: {
    ongoing: "Cancel",
    unread: "Cancel",
  },
  allTaskHidden: {
    ongoing: "Un-hide",
    done: "Un-hide",
    canceled: "Un-cancel",
  },
};

export {
  countUnseenTasks, countUnseenTasksFromLists, formatDropdownData, hasOnlySpaces, momentdeDateFormatWithDay, optionMapping, updateLocalStorageObject
};

