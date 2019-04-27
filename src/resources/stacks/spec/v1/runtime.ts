import {
  Namespaces,
  BaseCapabilities,
  PrivilegedCapabilities,
} from "../../../../common/structs";

export interface Runtime {
  command: RuntimeCommand | null;
  namespaces: Namespaces[] | null;
  environment_vars: Record<string, string>;
  privileged: boolean;
  capabilities: BaseCapabilities[] | PrivilegedCapabilities[] | null;
  workdir: string | null;
}

export interface RuntimeCommand {
  path: string;
  args: string;
}
