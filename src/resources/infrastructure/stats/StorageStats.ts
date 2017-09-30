export interface StorageStats {
    mounts: {[key: string]: MountedFS};
}

export interface MountedFS {
    device?: string;
    type: string;
    mountpoint?: string;
    total: number;
    free: number;
    used: number;
}