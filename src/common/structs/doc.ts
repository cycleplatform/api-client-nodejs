import { Time } from "./basic";

/**
 * Main API Return
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
    T extends Resource | string | null,
    K extends Meta = {},
    P extends Includes = {}
> extends TopLevel<K, P> {
    data: T;
}

export interface Resource<T extends Meta = {}> {
    id: ResourceId;
    meta?: T;
}

export interface Meta {
    [key: string]: any;
}

// tslint:disable-next-line:no-empty-interface
export interface Includes {}

/**
 * A unique identifier for resources
 */
export type ResourceId = string;

export interface StandardEvents {
    created?: Time;
    updated?: Time;
    deleted?: Time;
}

export type Events<T extends string = ""> = StandardEvents &
    { [P in T]?: Time };

export interface State<T extends string = ""> {
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
