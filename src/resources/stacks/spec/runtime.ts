export interface Runtime {
    command?: RuntimeCommand;
}

export interface RuntimeCommand {
    path: string;
    args: string;
}
