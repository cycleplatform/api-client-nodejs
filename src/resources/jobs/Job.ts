import * as API from "../../common/Api";
import { Token } from "../../auth";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import {
    Time,
    ResourceState,
    StandardEvents,
    Resource,
    CollectionDoc,
    SingleDoc,
    Settings,
    ResourceId,
    UserScope,
} from "../../common/Structs";

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

export interface Job extends Resource {
    queue: string;
    caption: string;
    events: StandardEvents;
    schedule: Time;
    expires: Time;
    tasks: JobTask[];
    owner: UserScope;
    project_id: ResourceId;
    state: ResourceState<JobState>;
}

export type TaskState = "pending" | "error" | "running" | "completed";

export interface JobTask {
    id: string;
    caption: string;
    topic: string;
    action: string;
    events: StandardEvents;
    steps: TaskStep[];
    state: ResourceState<TaskState>;
    failable: boolean;
    contents: {};
    error?: {
        message: string;
    };
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
    return API.getRequest<Collection>({
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
    return API.getRequest<Single>({
        target: links.jobs().single(id),
        query,
        token,
        settings,
    });
}