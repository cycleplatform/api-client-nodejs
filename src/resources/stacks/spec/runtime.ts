export interface Runtime {
    command?: RuntimeCommand;
    namespaces: Namespace;
    privileged: boolean;
}

export type Namespace = "ipc" | "pid" | "uts" | "network" | "mount" | "user";

export interface RuntimeCommand {
    path: string;
    args: string;
}
