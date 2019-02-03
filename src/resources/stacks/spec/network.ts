export interface Network {
  public: NetworkPublicMode;
  hostname: string;
  ports: string[];
  load_balancer: LoadBalancer | null;
}

export type NetworkPublicMode = "enable" | "disable" | "egress-only";

export type LoadBalanceDeploymentStrategy =
  | "single"
  | "per-provider"
  | "per-location"
  | "per-server";

export interface LoadBalancer {
  deploy: LoadBalanceDeploymentStrategy;
  haproxy: HAProxyConfig | null;
  ipv4: boolean | null;
  ipv6: boolean | null;
}

export interface HAProxyConfig {
  frontend: HAProxyFrontend | null;
  backend: HAProxyBackend | null;
}

export type HAProxyMode = "tcp" | "http";
export interface HAProxyFrontend {
  mode: HAProxyMode;
  max_connections: number | null;
  timeouts: FrontendTimeouts | null;
}

export interface FrontendTimeouts {
  client_secs: number | null;
  client_fin_ms: number | null;
  http_keep_alive_ms: number | null;
  http_request_ms: number | null;
}

export type HAProxyBalanceMode =
  | "roundrobin"
  | "static-rr"
  | "leastconn"
  | "first"
  | "source";
export interface HAProxyBackend {
  balance: HAProxyBalanceMode;
  timeouts: BackendTimeouts | null;
}

export interface BackendTimeouts {
  server_secs: number | null;
  server_fin_ms: number | null;
  connect_ms: number | null;
  queue_ms: number | null;
  tunnel_secs: number | null;
}
