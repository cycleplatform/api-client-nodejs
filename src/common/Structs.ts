/**
 * A unique identifier for this resource
 */
export type ResourceId = string;

/**
 * Time-formatted string
 */
export type Time = string;

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
export interface TopLevel {
    meta?: Meta;
    includes?: Includes;
}

export interface CollectionDoc<T extends Resource> extends TopLevel {
    data: T[];
}

export interface SingleDoc<T extends Resource | string> extends TopLevel {
    data: T | null;
}

export interface Resource {
    id: ResourceId;
    meta?: Meta;
}

export interface Meta {
    [key: string]: any;
}

export interface Includes {
    [key: string]: {
        [key: string]: Resource | { [key: string]: Resource };
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

export interface StandardEvents {
    created: Time;
    updated: Time;
    deleted: Time;
}

export type CommonStates = "new" | "live" | "deleted";

export interface ResourceState<T extends string = ""> {
    current: CommonStates & T;
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
