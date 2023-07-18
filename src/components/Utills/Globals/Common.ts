import moment from "moment-timezone";

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

export const getUserFormatedDataForAutoComplete = (arr: any) => {
  return arr?.map((member: any) => {
    return {
      label: `${member?.firstName} ${member?.surName}`,
      id: member?._id,
    };
  });
};

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


/**
 * @param taskArray the array must have _id
 * @param itemId must have comparison id string
 * @return Functino will return  -1 if task not exist
 * **/
export const findTaskIndex = (taskArray: any[], itemId: string): number => {
  const taskIndex = taskArray.findIndex((task: any) => task._id === itemId);
  return taskIndex;
};

/**
 * @param taskArray the array must have _id
 * @param eventData data to be pushed to task events
 * @param taskIndex check if task exist 
 * @return Functino will return updated task events
 * **/
export function addEventToTask(taskArray: any[], eventData: any, taskIndex: number): void {
  if (taskIndex > -1) {
    taskArray[taskIndex].events.push(eventData);
    taskArray[taskIndex].seenBy = eventData.taskData.seenBy;
  }
}

export function moveTaskToSpecifiedArr(sourceArray: any[], targetArray: any[], eventData: any): void {
  const taskIndex = findTaskIndex(sourceArray, eventData._id);
  sourceArray[taskIndex].events.push(eventData);
  const task = sourceArray.splice(taskIndex, 1)[0];
  targetArray.push(task);
}

export function moveTask(sourceArray: any[], targetArray: any[], eventData: any): void {
  const taskIndex = findTaskIndex(sourceArray, eventData.taskId);
  if (taskIndex > -1) {
    const task = sourceArray.splice(taskIndex, 1)[0];
    task.hiddenBy.push(...eventData.hiddenBy);
    targetArray.push(task);
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
export const deDateFormat = (dateStr: Date) => {
  return new Date(String(dateStr)).toLocaleString('de').slice(0, 10).replaceAll('.', '-')
}
// de date format using moment of utc time mongodb
/**
 * @return dd.mm.yyyy
 * @param mongodbUtc date string is required
 * **/
export const momentdeDateFormat = (createdAt: Date | any) => {
  let localTime = moment.utc(moment(createdAt)).toDate()
  return moment(localTime).local().format("DD.MM.YYYY")
}
// de date format using moment of utc time mongodb
/**
 * @return 12:00AM
 * @param mongodbUtc date string is required
 * **/
export const momentTimeFormat = (createdAt: Date | any) => {
  let localTime = moment.utc(moment(createdAt)).toDate()
  return moment(localTime).local().format('HH:mm');
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

export { formatDropdownData }