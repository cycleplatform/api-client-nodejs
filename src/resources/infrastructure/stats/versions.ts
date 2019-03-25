export type CycleService =
  | "factory"
  | "compute"
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
  | "nexus";

export interface Versions {
  services: Record<CycleService, string>;
}
