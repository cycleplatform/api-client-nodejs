export interface Runtime {
    command: RuntimeCommand | null;
    namespaces: Namespaces[];
    environment_vars: { [key: string]: string };
    privileged: boolean;
}

export enum Namespaces {
    IPC = "ipc",
    PID = "pid",
    UTS = "uts",
    NETWORK = "network",
    MOUNT = "mount",
    USER = "user",
}

export interface RuntimeCommand {
    path: string;
    args: string;
}
