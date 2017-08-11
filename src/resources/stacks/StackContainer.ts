import { StackImage } from "./StackImage";

export interface StackContainer {
    image: StackImage;
    volumes: Volume[];
    tags: Tags;
    hostname?: string;
    instances: number;
    options: ContainerOptions;
}

export interface Tags {
    require: string[];
    allow: string[];
}

export type VolumeType = string;

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

export interface ContainerOptions {
    on_deploy: OnDeployOptions;
    monitor: MonitorOptions;
}

export interface OnDeployOptions {
    start: boolean;
}

export interface MonitorOptions {
    auto_restart: boolean;
    notify: NotifyOptions;
}

export interface NotifyOptions {
    email: string;
    web_hook: string;
}
