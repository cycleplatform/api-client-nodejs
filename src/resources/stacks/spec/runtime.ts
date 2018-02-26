export interface Runtime {
    command: RuntimeCommand | null;
    namespaces: Namespaces[] | null;
    environment_vars: { [key: string]: string };
    privileged: boolean;
    capabilities: Array<BaseCapabilities | PrivilegedCapabilities> | null;
}

export enum BaseCapabilities {
    CAP_CHOWN = "CAP_CHOWN",
    CAP_FSETID = "CAP_FSETID",
    CAP_DAC_OVERRIDE = "CAP_DAC_OVERRIDE",
    CAP_FOWNER = "CAP_FOWNER",
    CAP_SETFCAP = "CAP_SETFCAP",
    CAP_SETGID = "CAP_SETGID",
    CAP_SETUID = "CAP_SETUID",
    CAP_KILL = "CAP_KILL",
    CAP_MKNOD = "CAP_MKNOD",
    CAP_NET_BIND_SERVICE = "CAP_NET_BIND_SERVICE",
    CAP_AUDIT_WRITE = "CAP_AUDIT_WRITE",
}

export enum PrivilegedCapabilities {
    CAP_SETPCAP = "CAP_SETPCAP",
    CAP_DAC_READ_SEARCH = "CAP_DAC_READ_SEARCH",
    CAP_NET_ADMIN = "CAP_NET_ADMIN",
    CAP_NET_RAW = "CAP_NET_RAW",
    CAP_SYS_ADMIN = "CAP_SYS_ADMIN",
    CAP_SYS_MODULE = "CAP_SYS_MODULE",
    CAP_SYS_NICE = "CAP_SYS_NICE",
    CAP_SYS_PACCT = "CAP_SYS_PACCT",
    CAP_SYS_PTRACE = "CAP_SYS_PTRACE",
    CAP_SYS_RAWIO = "CAP_SYS_RAWIO",
    CAP_SYS_RESOURCE = "CAP_SYS_RESOURCE",
    CAP_SYSLOG = "CAP_SYSLOG",
    CAP_AUDIT_CONTROL = "CAP_AUDIT_CONTROL",
    CAP_AUDIT_READ = "CAP_AUDIT_READ",
    CAP_IPC_LOCK = "CAP_IPC_LOCK",
    CAP_IPC_OWNER = "CAP_IPC_OWNER",
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
