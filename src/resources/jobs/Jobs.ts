import {
    Time,
    ResourceId,
    ResourceState,
    StandardEvents,
} from "../../common/Structs";

export interface Job {
    id: ResourceId;
    queue: string;
    caption: string;
    events: {};
    schedule: Time;
    expires: Time;
    tasks: JobTask[];
    creator?: string;
    project: string;
    state: ResourceState;
}

export interface JobTask {
    id: string;
    caption: string;
    topic: string;
    action: string;
    events: StandardEvents;
    steps: TaskStep[];
    state: ResourceState;
    failable: boolean;
    contents: {};
}

export interface TaskStep {
    caption: string;
    started: Time;
    completed: Time;
}
