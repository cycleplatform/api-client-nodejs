import { Time } from "./basic";

/**
 * Main API Return.
 */
export interface TopLevel<T extends Meta = {}, K extends Includes = {}> {
  meta?: T;
  includes?: K;
}

/**
 * A collection document refers to a return of multiple resources of the same type.
 */
export interface CollectionDoc<
  T extends Resource,
  K extends Meta = {},
  P extends Includes = {}
> extends TopLevel<K, P> {
  data: T[];
}

/**
 * A single document refers to a return of a single resource
 */
export interface SingleDoc<
  T extends Resource | string | null,
  K extends Meta = {},
  P extends Includes = {}
> extends TopLevel<K, P> {
  data: T;
}

/**
 * A resource is a specific type of data.
 */
export interface Resource<T extends Meta = {}> {
  id: ResourceId;
  meta?: T;
}

/**
 * Meta information is extra information attached to the document.
 */
export interface Meta {
  [key: string]: any;
}

/**
 * Includes are expanded resources referenced by ID in the original resource.
 */
// tslint:disable-next-line:no-empty-interface
export interface Includes {}

/**
 * A unique identifier for resources
 */
export type ResourceId = string;

/**
 * Standard events nearly every resource has.
 */
export interface StandardEvents {
  created?: Time;
  updated?: Time;
  deleted?: Time;
}

/**
 * Cycle resources usually contain an events field,
 * the event being the key and a formatted time string
 * being the value.
 */
export type Events<T extends string = ""> = StandardEvents &
  { [P in T]?: Time };

/**
 * Most Cycle resources contain a state field
 * describing what the object is doing,
 * if there is an error, a job, etc.
 */
export interface State<T extends string = ""> {
  current: T;
  changed: Time;
  job: JobInfo;
  error?: ResourceError;
}

/**
 * Errors attached to a specific resource
 */
export interface ResourceError {
  message: string;
  time: Time;
  block: boolean;
}

/**
 * Information about a job attached to a resource
 */
export interface JobInfo {
  id: string;
  queued: Time;
  queue: string;
}
