export interface Runtime {
    command?: RuntimeCommand;
    namespaces: Namespaces[];
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
