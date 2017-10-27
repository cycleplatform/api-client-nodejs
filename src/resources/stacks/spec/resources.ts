export interface Resources {
    cpu: CPUResources;
    ram: RAMResources;
}

export interface CPUResources {
    limit?: string;
    reserve?: string;
}

export interface RAMResources {
    limit?: string;
    reserve?: string;
    swappiness?: number;
}
