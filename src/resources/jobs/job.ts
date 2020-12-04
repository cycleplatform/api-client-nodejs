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
  UserScope,
  UserIncludes,
} from "../../common/structs";

export type Collection = CollectionDoc<Job, JobIncludes>;
export type Single = SingleDoc<Job, JobIncludes>;
/**
 * A Job state
 */
export type JobState =
  | "new"
  | "queued"
  | "error"
  | "scheduled"
  | "expired"
  | "running"
  | "completed";

/**
 * A Job event
 */
export type JobEvent = "queued" | "completed" | "started";

/**
 * An extended resource including information about a job
 */
export interface Job extends Resource {
  /**
   * A dash separated string showing the environment-ID where the job is taking place
   */
  queue: string;
  /** A short description of the job */
  caption: string;

  events: Events<JobEvent>;
  schedule: Time;
  expires: Time;
  tasks: JobTask[];
  /** A combination of the individual task details and job details */
  hash: string;
  /** A boolean, where true indicates that the job is set to prevent duplicate jobs quickly */
  limit_duplicates: boolean;
  creator: UserScope;
  hub_id: ResourceId;
  state: State<JobState>;
}

/**
 * A tasks state
 */
export type TaskState = "pending" | "error" | "running" | "completed";

/** Information about a job task */
export interface JobTask {
  /** The ID of the job task */
  id: string;
  /** A short description of the job task */
  caption: string;
  /** The API function called */
  header: string;
  /**  The action being handled by the job */
  action: string;
  /** An event object for the job task */
  events: {
    queued: Time;
    started: Time;
    completed: Time;
  };
  /** An array of job task steps */
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
  creators: UserIncludes;
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
