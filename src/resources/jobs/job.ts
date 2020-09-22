import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import {
  Time,
  State,
  Events,
  Resource,
  CollectionDoc,
  SingleDoc,
  ResourceId,
  CreatorScope,
  CreatorIncludes,
} from "../../common/structs";

export type Collection = CollectionDoc<Job, JobIncludes>;
export type Single = SingleDoc<Job, JobIncludes>;
export type JobState =
  | "new"
  | "queued"
  | "error"
  | "scheduled"
  | "expired"
  | "running"
  | "completed";
export type JobEvent = "queued" | "completed" | "started";

export interface Job extends Resource {
  queue: string;
  caption: string;
  events: Events<JobEvent>;
  schedule: Time;
  expires: Time;
  tasks: JobTask[];
  hash: string;
  limit_duplicates: boolean;
  creator: CreatorScope;
  hub_id: ResourceId;
  state: State<JobState>;
}

export type TaskState = "pending" | "error" | "running" | "completed";

export interface JobTask {
  id: string;
  caption: string;
  header: string;
  action: string;
  events: {
    queued: Time;
    started: Time;
    completed: Time;
  };
  steps: TaskStep[];
  state: State<TaskState>;
  failable: boolean;
  input: { [key: string]: any };
  output: { [key: string]: any };
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

export interface JobIncludes {
  creators: CreatorIncludes;
}

export async function getCollection(params: StandardParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.jobs().collection(),
  });
}

export async function getSingle(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.jobs().single(params.id),
  });
}

export async function lookup(
  params: StandardParams & {
    lookupId: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    query: {
      ...params.query,
      ["task-object-id"]: params.lookupId,
    } as any,
    target: links.jobs().latest(),
  });
}
