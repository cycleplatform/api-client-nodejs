import { Emails, Webhook } from "../../../../common/structs";
import { RuntimeCommand } from "./runtime";

export type Signal = "SIGTERM" | "SIGINT" | "SIGUSR1" | "SIGUSR2" | "SIGHUP";

export interface Deploy {
  instances: number;
  strategy: DeploymentStrategy | null;
  stateful: Stateful | null;
  constraints: Constraints | null;
  shutdown: ShutdownPolicy | null;
  restart: RestartPolicy | null;
  health_check: HealthCheck | null;
}

export interface Stateful {
  increment_hostnames: boolean;
  instances: Record<string, StatefulInstance>;
}

export interface StatefulInstance {
  command: RuntimeCommand;
  environment_vars: Record<string, string>;
}

export interface ShutdownPolicy {
  graceful_timeout: number;
  signals: Signal[];
}

export interface RestartPolicy {
  condition: RestartCondition;
  delay: number;
  max_attempts: number;
  notify: Notify | null;
}

export interface Constraints {
  node: NodeConstraints | null;
  secrets: string[];
  containers: string[];
}

export interface NodeConstraints {
  tags: Tags;
}

export interface Tags {
  /** can match any server that has at least one of these tags */
  any: string[];
  /** can only match servers that have all of the tags listed */
  all: string[];
}

export interface HealthCheck {
  command: string;
  retries: number;
  interval: number;
  timeout: number;
  restart: boolean;
}

export enum RestartCondition {
  RSTRC_ALWAYS = "always",
  RSTRC_NEVER = "never",
  RSTRC_FAILURE = "failure",
}

export enum DeploymentStrategy {
  /** Cycle will try to balance based on resource usage of the servers that match the tags */
  DS_RESOURCE_DENSITY = "resource-density",
  /** Cycle will try to allocate in the best way to spread out the instances */
  DS_HIGH_AVAILABILITY = "high-availability",
  /** Just allocate ASAP to any available server */
  DS_FIRST_AVAILABLE = "first-available",
}

export interface Notify {
  emails: Emails;
  web_hook: Webhook;
}
