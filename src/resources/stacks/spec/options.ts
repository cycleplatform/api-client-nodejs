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
    web_hooks?: string[];
}

export interface StartEvents {
    web_hooks?: string[];
}

export interface StopEvents {
    web_hooks?: string[];
}

export interface Monitor {
    auto_restart: boolean;
    max_restarts?: number;
    restart_delay_secs?: number; // seconds
    notify: Notify;
}

export interface Notify {
    email: string;
    web_hook: string;
}
