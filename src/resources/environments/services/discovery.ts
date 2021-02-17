import { Service } from "./common";
import { StandardParams, links, postRequest } from "../../../common/api";
import { ResourceId, CreatedTask } from "../../../common/structs";

/**
 * Information about a discovery service configuration
 */
export interface DiscoveryService extends Service {
  config: DiscoveryConfig | null;
}

// // tslint:disable-next-line:no-empty-interface
export interface DiscoveryConfig {}

/**
 * Information about a discovery services deployment state
 */
export interface DiscoveryReconfig {
  /** A boolean where true represents this service is deployed in high availability mode */
  high_availability?: boolean;
}

/**
 * A Discovery service container action
 */
export type DiscoveryAction = "reconfigure";

export type ServicesReconfigureDiscoveryParams = StandardParams & {
  environmentId: ResourceId;
  value: DiscoveryReconfig;
};
export async function reconfigureDiscovery(
  params: ServicesReconfigureDiscoveryParams,
) {
  return postRequest<CreatedTask<DiscoveryAction>>({
    ...params,
    target: links
      .environments()
      .services()
      .discovery()
      .tasks(params.environmentId),
    value: {
      action: "reconfigure",
      contents: params.value,
    },
  });
}
