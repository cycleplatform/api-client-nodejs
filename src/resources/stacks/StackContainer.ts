import { StackImage } from "./StackImage";

export interface StackContainer {
    image: StackImage;
    volumes: Volume[];
    tags: Tags;
    environment_vars: { [key: string]: string };
    required_secrets: string[];
    hostname: string;
    instances: number;
    options: ContainerOptions;
}

export interface Tags {
    require: string[];
    allow: string[];
}

export type VolumeType = "local";

export interface Volume {
    type: VolumeType;
    read_only: boolean;
    local?: LocalVolume;
    destination: string;
    remote_access: VolumeRemoteAccess;
}

export interface LocalVolume {
    size_mb: number;
}

export interface VolumeRemoteAccess {
    allow: boolean;
    whitelist_ips: string[];
}

export interface ContainerOptions {
    on_deploy: OnDeployOptions;
    monitoring: MonitoringOptions;
    networking: NetworkingOptions;
    dns: DNSOptions;
}

export interface OnDeployOptions {
    start: boolean;
}

export interface MonitoringOptions {
    auto_restart: boolean;
    notify: NotifyOptions;
}

export interface NotifyOptions {
    email: string;
    web_hook: string;
}

export interface NetworkingOptions {
    public: boolean;
}

export interface DNSOptions {
    domain: string;
}

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
