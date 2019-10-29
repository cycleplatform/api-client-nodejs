import { DataSize } from "../../../../common/structs";

export interface Resources {
  cpu: CPUResources;
  ram: RAMResources;
}

export interface CPUResources {
  shares?: CPUShares;
  /** Comma separated list of CPU cores (numbers) this container is pinned to */
  cpus: string | null;
}

export interface CPUShares {
  limit: number;
  reserve: number;
}

export interface RAMResources {
  limit: DataSize | null;
  reserve: DataSize | null;
  swappiness: number | null;
  kernel: DataSize | null;
  kernel_tcp: DataSize | null;
}
