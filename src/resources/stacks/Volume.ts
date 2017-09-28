export type VolumeType = "local";

export interface Volume {
    type: VolumeType;
    read_only: boolean;
    local?: LocalVolume;
    destination: string;
    remote_access: VolumeRemoteAccess;
}

export interface LocalVolume {
    size_mb?: number;
}

export interface VolumeRemoteAccess {
    allow: boolean;
    whitelist_ips: string[];
}
