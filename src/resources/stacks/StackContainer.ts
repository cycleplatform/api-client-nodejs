import { StackImage } from "./StackImage";
import { Volume } from "./Volume";

export interface StackContainer {
    name: string;
    image: StackImage;
    config: Config;
}

export interface Config {
    instances?: number;
    volumes: Volume[];
    tags: Tags;
    runtime: Runtime;
    environment_vars: { [key: string]: string };
    required_secrets: string[];
    network: Network;
    resources?: Resources;
    options?: Options;
}

export interface Runtime {
    command?: RuntimeCommand;
}

export interface RuntimeCommand {
    path: string;
    args: string;
}

export interface Tags {
    require: string[];
    allow: string[];
}

export interface Network {
    public: boolean;
    hostname?: string;
    ports?: string[];
    dns: DNS;
}

export interface DNS {
    domain?: string;
    nameservers: string[];
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

export interface Options {
    events: Events;
    monitor: Monitor;
}

export interface Events {
    deploy: DeployEvents;
    start: StartEvents;
    stop: StopEvents;
}

export interface DeployEvents {
    auto_start: boolean;
    web_hooks: string[];
}

export interface StartEvents {
    web_hooks: string[];
}

export interface StopEvents {
    web_hooks: string[];
}

export interface Monitor {
    max_restarts?: number;
    notify: Notify;
}

export interface Notify {
    email: string;
    web_hook: string;
}
