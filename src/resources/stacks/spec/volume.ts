import { DataSize, Webhook } from "../../../common/structs";

export interface Volume {
    read_only: boolean;
    local?: LocalVolume;
    destination: string;
    remote_access: VolumeRemoteAccess;
}

export interface LocalVolume {
    max_size: DataSize;
}

export interface VolumeRemoteAccess {
    enable: boolean;
    whitelist_ips?: WhiteListIp[];
    webhook: Webhook;
    default_password?: string;
}

export interface WhiteListIp {
    ip: string;
    read_only: boolean;
    default_password?: string;
}
