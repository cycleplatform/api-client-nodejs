import { DataSize, CPUShares } from "../../../common/structs";

export interface Resources {
    cpu: CPUResources;
    ram: RAMResources;
}

export interface CPUResources {
    limit?: CPUShares;
    reserve?: CPUShares;
    /** Comma separated list of CPU cores (numbers) this container is pinned to */
    cpus: string;
}

export interface RAMResources {
    limit?: DataSize;
    reserve?: DataSize;
    swappiness?: number;
}
