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
  * @param return Functino will return the unique objects
  * **/
export const getUniqueObjectsFromArr = (arr: any[]) => {
  return arr.filter((obj, i, self) => self.findIndex(t => JSON.stringify(t) === JSON.stringify(obj)) === i);
}

/**
 * @param array the array must have _id
 * @param itemId must have comparison id string
 * @param return Functino will return true or false
 * **/
export const isTrue = (arr: any[], itemId: string) => {
  return arr.some((item: any) => item._id === itemId)
}

// de date format 
/**
 * @param return dd-mm-yyyy
 * @param dateString date string is required
 * **/
export const deDateFormat = (dateStr: Date) => {
  return new Date(String(dateStr)).toLocaleString('de').slice(0, 10).replaceAll('.', '-')
}
// de date format using moment of utc time mongodb
/**
 * @param return dd.mm.yyyy
 * @param mongodbUtc date string is required
 * **/
export const momentdeDateFormat = (createdAt: Date | any) => {
  let localTime = moment.utc(moment(createdAt)).toDate()
  return moment(localTime).local().format("DD.MM.YYYY")
}
// de date format using moment of utc time mongodb
/**
 * @param return 12:00AM
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
  // const dueDate = new Date().toLocaleDateString("de-DE", {
  //   day: "numeric",
  //   month: "numeric",
  //   year: "numeric",
  // });

