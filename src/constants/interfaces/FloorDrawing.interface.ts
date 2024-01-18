
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