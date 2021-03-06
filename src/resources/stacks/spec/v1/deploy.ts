import { Emails, Webhook } from "../../../../common/structs";
import { RuntimeCommand } from "./runtime";

export type Signal = "SIGTERM" | "SIGINT" | "SIGUSR1" | "SIGUSR2" | "SIGHUP";

export interface Deploy {
  instances: number;
  strategy?: DeploymentStrategy;
  stateful?: Stateful;
  constraints?: Constraints;
  shutdown?: ShutdownPolicy;
  startup?: StartupPolicy;
  restart?: RestartPolicy;
  health_check?: HealthCheck;
  telemetry?: Telemetry;
  update?: UpdatePolicy;
}

export interface Stateful {
  instances: StatefulInstance[];
}

export interface StatefulInstance {
  match: Match;
  first_start?: StatefulStart;
  default_start?: StatefulStart;
  auto_start?: StatefulStart;
}

export interface Match {
  hostname?: string;
}

export interface StatefulStart {
  command?: RuntimeCommand;
  environment_vars?: Record<string, string>;
  delay?: number;
}

export interface ShutdownPolicy {
  graceful_timeout: number;
  signals: Signal[];
}

export interface StartupPolicy {
  delay?: number;
}

export interface UpdatePolicy {
  parallelism: number;
  delay: number;
}

export interface RestartPolicy {
  condition: RestartCondition;
  delay: number;
  max_attempts: number;
  notify?: Notify;
}

export interface Constraints {
  node?: NodeConstraints;
  secrets?: string[];
  containers?: string[];
}

export interface NodeConstraints {
  tags: Tags;
}

export interface Tags {
  /** can match any server that has at least one of these tags */
  any?: string[];
  /** can only match servers that have all of the tags listed */
  all?: string[];
}

export interface HealthCheck {
  command: string;
  retries: number;
  interval: number;
  timeout: number;
  restart: boolean;
}

export interface Telemetry {
  retention: number;
  web_hook?: Webhook;
  interval: number;
  disable: boolean;
}

export enum RestartCondition {
  RSTRC_ALWAYS = "always",
  RSTRC_NEVER = "never",
  RSTRC_FAILURE = "failure",
}

/**
 * The deployment strategy Cycle will use to decide wkhere to put container instances
 *
 * @param resource-density Cycle will try to balance based on resource usage of the servers that match the tags
 * @param high-availability Cycle will try to allocate in the best way to spread out the instances
 * @param first-available Cycle will allocate to any available server that matches the tags
 * @param manual Cycle will not attempt to create or manage any instances - it will be up to the user how instances are distributed
 * @param ephemeral [COMING SOON] Turn container execution into one off processes
 */
export type DeploymentStrategy =
  | "resource-density"
  | "high-availability"
  | "first-available"
  | "manual"
  | "ephemeral";

export interface Notify {
  emails?: Emails;
  web_hook?: Webhook;
}
