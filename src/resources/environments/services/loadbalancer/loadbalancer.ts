import { Service } from "../common";
import {
  StandardParams,
  getRequest,
  links,
  postRequest,
} from "../../../../common/api";
import { ResourceId, CreatedTask } from "../../../../common/structs";

/**
 * A resource with information about load balancer service configuration
 */
export interface LoadBalancerService extends Service {
  config: LoadBalancer | null;
}

/**
 * The possible load balancer deployment strategies available
 */
/** @description - accepts only single, others are deprecated */
export type LoadBalanceDeploymentStrategy =
  | "single"
  | "per-provider"
  | "per-location";

/**
 * Information about load balancer deployment, networking, and configuration
 */
export interface LoadBalancer {
  deploy: LoadBalanceDeploymentStrategy;
  haproxy: HAProxyConfig | null;
  /** A boolean, where true means there is a publicly available IPv4 address assigned to the load balancer */
  ipv4: boolean | null;
  /** A boolean, where true means there is a publicly available IPv6 address assigned to the load balancer */
  ipv6: boolean | null;
}
/**
 * HAProxy configuration information
 */
export interface HAProxyConfig {
  default: HAProxyConfigSet;
  ports: Record<number, HAProxyConfigSet>;
}

/**
 * A collection of HAProxy configurations for backend and frontend settings
 */
export interface HAProxyConfigSet {
  frontend: HAProxyFrontend;
  backend: HAProxyBackend;
}

/**
 * All HAProxy modes available to the load balancer
 */
export type HAProxyMode = "tcp" | "http";
/**
 * Frontend configuration information for the load balancer - based on HAProxy
 */
export interface HAProxyFrontend {
  mode: HAProxyMode;
  /** The maximum number of simultaneous connections the load balancer can handle */
  max_connections: number | null;
  timeouts: FrontendTimeouts | null;
}
/**
 * Information for connection settings and timeouts for the load balancer frontend - based on HAProxy
 */
export interface FrontendTimeouts {
  /** The number of seconds the load balancer will wait for a response from a client before disconnecting */
  client_secs: number | null;
  /**  The number of milliseconds the load balancer will wait for a client to send it data when one direction is already closed. This is particularly useful to avoid keeping connections in a waiting state for too long when clients do not disconnect cleanly */
  client_fin_ms: number | null;
  /** The number of milliseconds the load balancer will wait for a new HTTP request to start coming after a response was set */
  http_keep_alive_ms: number | null;
  /** The number of milliseconds the load balancer will wait for a complete HTTP request */
  http_request_ms: number | null;
}

/**
 * The possible types of routing available for the load balancer
 */
export type HAProxyBalanceMode =
  | "roundrobin"
  | "static-rr"
  | "leastconn"
  | "first"
  | "source";

/**
 * Load balancer backend configuration information - based on HAProxy
 */
export interface HAProxyBackend {
  balance: HAProxyBalanceMode;
  timeouts: BackendTimeouts | null;
}

export interface BackendTimeouts {
  /** The number of seconds the load balancer will wait for a response */
  server_secs: number | null;
  /** The number of milliseconds the load balancer will wait for the server to send data when one direction is already closed */
  server_fin_ms: number | null;
  /** The number of milliseconds the load balancer will wait for a successful connection to a container instance  */
  connect_ms: number | null;
  /** The number of milliseconds the load balancer will hold connections in a queue when the maximum number of connections has been reached */
  queue_ms: number | null;
  /** The number of milliseconds the load balancer will allow for inactivity on a bidirectional tunnel  */
  tunnel_secs: number | null;
}

/**
 * Information about both current and default settings for load balancers
 */

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
