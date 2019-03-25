import { Emails, Webhook } from "../../../../common/structs";

export type Signal = "SIGTERM" | "SIGINT" | "SIGUSR1" | "SIGUSR2" | "SIGHUP";

export interface Deploy {
  instances: number;
  constraints: Constraints | null;
  shutdown: ShutdownPolicy | null;
  restart: RestartPolicy | null;
  health_check: HealthCheck | null;
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
  tags: string[];
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

export interface Notify {
  emails: Emails;
  web_hook: Webhook;
}
