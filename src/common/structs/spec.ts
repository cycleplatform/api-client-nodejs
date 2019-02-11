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

/**
 * Units avaialble for CPU shares
 */
export enum CPUShareUnits {
  CORES = "cores",
  SECONDS = "seconds",
}

export type Algorithm = "raw" | "sha512" | "md5";

export type ContainerIdentifier = string;
