import { ResourceId } from "../../common/Structs";

export interface Config {
    hostname: string;
    user: ResourceId;
    ports: Port[];
    env: { [key: string]: string };
    labels: { [key: string]: string };
    command: string[];
    onbuild: string[];
    entrypoing: string[];
    volumes: Volume[];
    workdir: string;
    signal_stop?: string;
}

export interface Port {
    type: string;
    number: number;
}

export type VolumeMode = "ro" | "rw";

export interface Volume {
    path: string;
    mode: VolumeMode;
}
