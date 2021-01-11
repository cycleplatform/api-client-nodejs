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

export type LoadBalanceDeploymentStrategy =
  | "single"
  | "per-provider"
  | "per-location";

/**
 * If null is passed to any og these keys, the platform default will
 *  be used and current settings will be overwritten. To keep current
 *  config, submit null for the entire config, rather than individual
 *  items with the config
 */
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

export type ReconfigureLoadBalancerParams = StandardParams & {
  environmentId: ResourceId;
  value: LoadBalancerReconfig;
};
/**
 *
 * ### Important Notes
 * - Please refer to `params.value.config` before submitting any values
 *  to make sure you are not resetting values to platform defaults which
 *  you do not intend too
 *
 * ---
 *
 * ## Params
 *
 * @param params is an object containing standard necessary params to
 *  reconfigure the desired lb
 *
 * @param params.environmentId is the environment id of in which the lb you
 *  want to reconfigure lives
 *
 * @param params.value is is an object containing the possible values with
 *  which you can reconfigure the desired lb
 *
 * @param params.value.config __IMPORTANT:__ to keep the current settings with
 *  the config object, leave config as null: `config: null`. If you mark
 *  an individual item within config as null, the platform will set that
 *  items values to the defaults
 *
 * @param params.value.high_availability mark this item as true or false to
 *  to set the desired lb to be put into HA mode (`true`) or not (`false`)
 *
 * ---
 *
 * ## Usage
 * @example
 *  ```ts
 *  const reconfigParams: Environments.Services.ReconfigureLoadBalancerParams = {
 *    ...YOUR_BASE_PARAMS,
 *    environmentId: `SOME_ENV_ID`,
 *    values: {
 *      // NOTE: leave the config object out if you do not want the platform to
 *      //  potential reset to the default values. Refer to the params declaration
 *      //  above for more info.
 *      config: {
 *        haproxy: { ... },
 *        ipv4: false,
 *        ipv6: true
 *      },
 *      high_availability: true
 *    }
 *  }
 *
 *  async function() {
 *    const job = await Environments.Services.reconfigureLoadBalancer(reconfigParams);
 *
 *    try {
 *      // use our future helper lib job tracker here
 *      const jobData = await jobTrack(job);
 *    } catch(e) {
 *      // do something if job errors
 *     console.error(e);
 *    }
 *  }
 *  ```
 *
 * ---
 *
 * ## Cycle Info
 *
 * __Something doesn't look right or work as intended?__ \
 * Help us make a better Node API Interface by submitting a PR on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs/pulls)
 *
 * ### Websites
 * - [__Docs__](https://docs.cycle.io)
 * - [__Main Website__](https://cycle.io)
 *
 * ---
 *
 * Last Updated: 2021.01.11 — Grady S
 */
export async function reconfigureLoadBalancer(
  params: ReconfigureLoadBalancerParams,
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
