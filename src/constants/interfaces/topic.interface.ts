export interface TopicInterface {
    recentTopics: RecentTopic[]
    allTopics: AllTopic[]
}

export interface RecentTopic {
    _id: string
    topic: string
    userId: string
    deleted: boolean
    __v: number
}

export interface AllTopic {
    _id: string
    topic: string
    userId: string
}
