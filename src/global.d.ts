declare interface UserInfo {
  _id: string;
  firstName: string;
  surName: string;
  profilePic: string;
  companyName: string;
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
  drawings: string[];
  deleted: boolean;
  isPublicGroup: boolean;
  sharedWith: string[];
  createdAt: string;
  updatedAt: string;
  isFavoriteByMe: boolean;
}
