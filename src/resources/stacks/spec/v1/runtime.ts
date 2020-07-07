import {
  Namespaces,
  BaseCapabilities,
  PrivilegedCapabilities,
} from "../../../../common/structs";

export interface Runtime {
  workdir?: string;
  command?: RuntimeCommand;
  environment_vars?: Record<string, string>;
  namespaces?: Namespaces[];
  sysctl?: Record<string, string>;
  rlimits?: Record<string, RLimit>;
  privileged: boolean;
  capabilities?: BaseCapabilities[] | PrivilegedCapabilities[];
}

export interface RuntimeCommand {
  path: string;
  args: string;
}

export interface RLimit {
  hard: number;
  soft: number;
}
