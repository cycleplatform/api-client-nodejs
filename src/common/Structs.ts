/**
 * A unique identifier for this resource
 */
export type ResourceId = string;

/**
 * Time-formatted string
 */
export type Time = string;

/**
 * Field is measured in bytes
 */
export type Bytes = number;

/**
 * Field is measured in Megabytes
 */
export type Megabytes = number;

/**
 * Field is measured in Gigabytes
 */
export type Gigabytes = number;

/**
 * Field is measured in microseconds
 */
export type Microseconds = number;

/**
 * Field is measured in Mbps
 */
export type Megabits = number;

/**
 * 1/10th of a cent
 * https://en.wikipedia.org/wiki/Mill_(currency)
 */
export type Mills = number;

/**
 * Field is measured in days
 */
export type Days = number;

/**
 * Common fields that can be in any response
 */
export interface TopLevel<T extends Meta = {}, K extends Includes = {}> {
    meta?: T;
    includes?: K;
}

export interface CollectionDoc<
    T extends Resource,
    K extends Meta = {},
    P extends Includes = {}
> extends TopLevel<K, P> {
    data: T[];
}

export interface SingleDoc<
    T extends Resource | string,
    K extends Meta = {},
    P extends Includes = {}
> extends TopLevel<K, P> {
    data: T | null;
}

export interface Resource<T extends Meta={}> {
    id: ResourceId;
    meta?: T;
}

export interface Meta {
    [key: string]: any;
}

export interface Includes {
    [key: string]: {
        [key: string]: Resource;
    };
}

/**
 * Standard API call settings object.
 */
export interface Settings {
    /**
     * Overrides base url, so it can be pointed to a thin client
     */
    url?: string;

    /**
     * Sets the project scope
     */
    project?: ResourceId;
}

export interface ProjectRequiredSettings extends Settings {
    project: ResourceId;
}

/**
 * Resource Events
 */
export interface StandardEvents {
    created?: Time;
    updated?: Time;
    deleted?: Time;
}

export interface ResourceState<T extends string = ""> {
    current: T;
    changed: Time;
    job: JobInfo;
    error?: ResourceError;
}

export interface ResourceError {
    message: string;
    time: Time;
    block: boolean;
}

export interface JobInfo {
    id: string;
    queued: Time;
    queue: string;
}

export interface Task<T extends string, K = {}> {
    action: T;
    contents?: K;
}

export interface CreatedTask<T extends string, K = {}> {
    data: {
        action: T;
        contents?: K;
        job_id: ResourceId;
    };
}

export type UserScopeType = 
| "account"
| "employee"
| "api-key"
| "visitor"

export interface UserScope {
    type: UserScopeType;
    id: ResourceId;
}
