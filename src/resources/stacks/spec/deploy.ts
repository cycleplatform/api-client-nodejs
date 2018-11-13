import { Emails, Webhooks } from "../../../common/structs";

export interface Deploy {
  instances: number;
  constraints: Constraints | null;
  tls: TLS | null;
  restart: RestartPolicy | null;
  health_check: HealthCheck | null;
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

export interface TLS {
  enable: boolean;
  certificate_path?: string;
  key_path?: string;
  bundle_path?: string;
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
  web_hooks: Webhooks;
}
