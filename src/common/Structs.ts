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

export interface CollectionDoc<T extends Resource | string> extends TopLevel {
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

/**
 * includes: {
 *  environments: {
 *      5cdfwe8h3oih: Environment,
 *      5cdfwe8h3oih: Environment
 *  }
 * }
 */
export interface Includes {
    [key: string]: {
        [key: string]: Resource | { [key: string]: Resource };
    };
}

export interface Settings {
    url?: string;
}
