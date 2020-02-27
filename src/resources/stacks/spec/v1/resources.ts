import { DataSize } from "../../../../common/structs";

export interface Resources {
  cpu: CPUResources;
  ram: RAMResources;
}

export interface CPUResources {
  shares?: CPUShares;
  /** Comma separated list of CPU cores (numbers) this container is pinned to */
  cpus?: string;
}

export interface CPUShares {
  limit: number;
  reserve: number;
}

export interface RAMResources {
  limit?: DataSize;
  reserve?: DataSize;
  swappiness?: number;
  kernel?: DataSize;
  kernel_tcp?: DataSize;
}
