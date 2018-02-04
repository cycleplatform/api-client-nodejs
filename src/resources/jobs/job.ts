import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { links, Settings, QueryParams } from "../../common/api";
import {
    Time,
    State,
    Events,
    Resource,
    CollectionDoc,
    SingleDoc,
    ResourceId,
    UserScope,
} from "../../common/structs";

export type Collection = CollectionDoc<Job>;
export type Single = SingleDoc<Job>;
export type JobState =
    | "new"
    | "queued"
    | "error"
    | "scheduled"
    | "expired"
    | "running"
    | "completed";
export type JobEvent = "queued";

export interface Job extends Resource {
    queue: string;
    caption: string;
    events: Events<JobEvent>;
    schedule: Time;
    expires: Time;
    tasks: JobTask[];
    owner: UserScope;
    project_id: ResourceId;
    state: State<JobState>;
}

export type TaskState = "pending" | "error" | "running" | "completed";

export interface JobTask {
    id: string;
    caption: string;
    topic: string;
    action: string;
    events: Events;
    steps: TaskStep[];
    state: State<TaskState>;
    failable: boolean;
    contents: {};
    error: {
        message: string;
    } | null;
}

export interface TaskStep {
    caption: string;
    description: string;
    started: Time;
    completed: Time;
}

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<Collection>({
        target: links.jobs().collection(),
        query,
        token,
        settings,
    });
}

export async function getSingle({
    id,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<Single>({
        target: links.jobs().single(id),
        query,
        token,
        settings,
    });
}
