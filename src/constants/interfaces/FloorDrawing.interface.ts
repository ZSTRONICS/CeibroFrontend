
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
}

export interface Response {
    floors: Floor[];
}

// ----------------------------DrawingInterface-------------------------//

export interface DrawingInterface {
    drawing: Drawing
}

export interface Drawing {
    _id: string
    projectId: string
    floorId: string
    drawingName: string
    drawingUrl: string
    uploadedBy: UploadedBy
    overlayEdits: any[]
    access: any[]
    createdAt: string
    updatedAt: string
}

export interface UploadedBy extends UserInfo { }