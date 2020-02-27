export interface LoadBalancer {
  haproxy?: HAProxyConfig;
  ipv4?: boolean;
  ipv6?: boolean;
}

export interface EgressGateway {
  name: string;
  /** An array of hostnames */
  destinations: string[];
  ports: {
    internal: string;
    external: string;
  };
}

export interface HAProxyConfig {
  default: HAProxyConfigSet;
  ports: Record<number, HAProxyConfigSet>;
}

export interface HAProxyConfigSet {
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
