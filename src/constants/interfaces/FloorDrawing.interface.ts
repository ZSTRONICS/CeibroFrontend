
// -----------------------------FloorInterface-------------------------//

export interface FloorInterface {
    floors: Floor[];
}

export interface Floor {
    _id: string;
    projectId: string;
    floorName: string;
    creator: string;
    drawings: Drawing[];
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Drawing {
    _id: string;
    fileName: string;
    fileSize: string;
    fileType: string;
    fileTag: string;
    fileUrl: string;
    uploadStatus: string;
    s3Key: string;
    dziFileURL: string;
    dziTileURL?: string;
    access: string[];
    moduleType: string;
    moduleId: string | null;
    floor: Floor;
    groupId: string;
    uploaderlocalFilePath: string;
    uploaderLocalId: string;
    hasComment: boolean;
    comment: string;
    version: number;
    projectId: string;
    floorId: string;
    drawingName: string;
    drawingUrl: string;
    thumbnailId: string;
    thumbnail: string;
    uploadedBy: UploadedBy;
    overlayEdits: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Response {
    floors: Floor[];
}

// ----------------------------DrawingInterface-------------------------//

export interface DrawingInterface {
    drawing: Drawing
}

export interface UploadedBy extends UserInfo { }
export interface PinImage {
    _id: string;
    fileName: string;
    fileSize: string;
    fileType: string;
    fileTag: string;
    userFileTags: string[];
    fileUrl: string;
    uploadedBy: UserInfo;
    uploadStatus: string;
    access: string[];
    moduleType: string;
    moduleId: string;
    floor: string;
    projectId: string;
    groupId: string;
    uploaderlocalFilePath: string | null;
    uploaderLocalId: string | null;
    hasComment: boolean;
    comment: string;
    version: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface DrawingImageInterface {
    _id: string;
    pinUID: number;
    type: string;
    page_width: number;
    page_height: number;
    x_coord: number;
    y_coord: number;
    pinPhotoUrl: string;
    pinImages: PinImage[];
    isSinglePhoto: boolean;
    creator: UserInfo;
    taskData: null;
    tags: string[];
    drawingId: string;
    thumbnailId: string | null;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
}
