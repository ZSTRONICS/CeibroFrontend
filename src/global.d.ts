
declare interface UserInfo {
  _id: string;
  firstName: string;
  surName: string;
  profilePic: string;
  companyName: string;
}
declare interface MenuOption {
  menuName: string;
  callBackHandler: (e?: any) => void;
}

declare interface Project {
  _id: string
  title: string
  description: string;
  creator: UserInfo;
  projectPic: string;
  docsCount: number;
  isHiddenByMe: boolean;
  isFavoriteByMe: boolean;
  isRecentlyUsedByMe: boolean;
  createdAt: string;
  updatedAt: string;
}

declare interface Floor {
  _id: string;
  projectId: string;
  floorName: string;
  creator: string;
  drawings: string[];
  createdAt: string;
  updatedAt: string;
}
declare interface Group {
  _id: string;
  projectId: string;
  groupName: string;
  creator: UserInfo;
  drawings: any[];
  deleted: boolean;
  publicGroup: boolean;
  isCreator: boolean;
  sharedWith: string[];
  createdAt: string;
  updatedAt: string;
  isFavoriteByMe: boolean;
}

