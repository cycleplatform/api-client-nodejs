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
 * Field denoting an IP
 */
export type IP = string;

/**
 * a url that cycle is able to call out to
 */
export type Webhook = string;

/**
 * Denotes size of data, i.e.
 * 10G = 10 Gigabytes
 * 50M = 50 Megabytes etc
 */
export type DataSize = string;

export enum DataSizeUnits {
    KB = "K",
    MB = "M",
    GB = "G",
    TB = "T",
}

/**
 * Denotes a unit of cpu compute time i.e.
 * 1cores
 * 2seconds
 */
export type CPUShares = string;

export enum CPUShareUnits {
    CORES = "cores",
    SECONDS = "seconds",
}
