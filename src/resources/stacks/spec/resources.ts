import { DataSize, CPUShares } from "../../../common/structs";

export interface Resources {
    cpu: CPUResources;
    ram: RAMResources;
}

export interface CPUResources {
    limit?: CPUShares;
    reserve?: CPUShares;
}

export interface RAMResources {
    limit?: DataSize;
    reserve?: DataSize;
    swappiness?: number;
}
