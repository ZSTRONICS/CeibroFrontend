export interface Root {
    allTasks: AllTasksInterface;
}

export interface AllTasksInterface {
    ongoing: any[];
    done: any[];
    unread: Unread[];
    new: New[];
}

export interface Unread extends Task { }
export interface New extends Task { }

export interface Task {
    _id: string;
    dueDate: string;
    doneImageRequired: boolean;
    doneCommentsRequired: boolean;
    description: string;
    project?: Project;
    locations: any[];
    recentComments: any[];
    topic: Topic;
    rejectionComments: any[];
    creator: UserInfo;
    assignedToState: AssignedToState[];
    creatorState: string;
    taskUID: string;
    access: string[];
    invitedNumbers: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface AssignedToState extends UserInfo {
    userId: string;
    phoneNumber: string;
    state: string;
}

export interface Topic {
    _id: string;
    topic: string;
}

