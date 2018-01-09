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
    allow: boolean;
    whitelist_ips: WhiteListIp[];
}

export interface WhiteListIp {
    ip: string;
    auto_login: boolean;
    read_only: boolean;
    webhook: Webhook;
    default_password?: string;
}
