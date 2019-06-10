export type CycleService =
  | "factory"
  | "compute"
  | "compute-spawner"
  | "compute-proxy"
  | "public-api"
  | "admin-api"
  | "admin-portal"
  | "oauth"
  | "portal"
  | "console"
  | "manager"
  | "dns"
  | "agent"
  | "agent-spawner"
  | "nexus";

export interface Versions {
  services: Partial<Record<CycleService, string>>;
}
