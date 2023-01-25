import React from 'react'
import { UserInfo } from "constants/interfaces/subtask.interface";




export const getSelectedProjectMembers = (projectId: string, projectWithMembers: []): any => {
  // eslint-disable-next-line array-callback-return
  return projectWithMembers.filter((proj: any) => {
    if (projectId && proj) {
      if (String(proj._id) === String(projectId)) {
        return proj.projectMembers;
      }
    }
  }).find((proj: any) => proj);
};

export const getUserFormatedDataForAutoComplete = (arr: any) => {
  
  return arr?.map((member: any) => {
    return {
      label: `${member?.firstName} ${member?.surName}`,
      id: member?._id,
    };
  });
};


// get unique array of object 
export const getUniqueObjectsFromArr =(arr:any[])=>{
  return arr.filter((obj, i, self) => self.findIndex(t => JSON.stringify(t) === JSON.stringify(obj)) === i);
}