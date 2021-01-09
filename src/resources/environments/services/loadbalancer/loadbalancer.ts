import { Service } from "../common";
import {
  StandardParams,
  getRequest,
  links,
  postRequest,
} from "../../../../common/api";
import { ResourceId, CreatedTask } from "../../../../common/structs";

export interface LoadBalancerService extends Service {
  config: LoadBalancer | null;
}
export interface LoadBalancer {
  haproxy: HAProxyConfig | null;
  ipv4: boolean | null;
  ipv6: boolean | null;
}

export interface HAProxyConfig {
  default: HAProxyConfigSet;
  ports: Record<number, HAProxyConfigSet>;
}

export interface HAProxyConfigSet {
  frontend: HAProxyFrontend;
  backend: HAProxyBackend;
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

export interface LoadBalancerInfoReturn {
  default_config: LoadBalancer;
  service: LoadBalancerService;
}

export async function getLoadBalancerInfo(
  params: StandardParams & {
    environmentId: ResourceId;
  },
) {
  return getRequest<{ data: LoadBalancerInfoReturn }>({
    ...params,
    target: links.environments().services().lb().info(params.environmentId),
  });
}

export interface LoadBalancerReconfig {
  config?: LoadBalancer;
  high_availability?: boolean;
}

export type LoadBalancerAction = "reconfigure";

export async function reconfigureLoadBalancer(
  params: StandardParams & {
    environmentId: ResourceId;
    value: LoadBalancerReconfig;
  },
) {
  return postRequest<CreatedTask<LoadBalancerAction>>({
    ...params,
    target: links.environments().services().lb().tasks(params.environmentId),
    value: {
      action: "reconfigure",
      contents: params.value,
    },
  });
}
