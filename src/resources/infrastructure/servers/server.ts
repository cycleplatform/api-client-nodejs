import * as Request from "../../../common/api/request";
import { links, StandardParams, QueryParams } from "../../../common/api";
import {
  CollectionDoc,
  SingleDoc,
  Resource,
  ResourceId,
  State,
  Events,
  Time,
  Includes,
  CreatedTask,
  StatefulCounts,
  UserScope,
  Cluster,
  Gigabytes,
} from "../../../common/structs";
import { Stats, Telemetry } from "../stats";
import {
  Locations,
  ProviderIdentifier,
  Servers as ProviderServers,
  Provider,
} from "../provider";
import { InstanceState } from "../../containers/instances";

export type Collection = CollectionDoc<Server, ServerIncludes>;
export type Single = SingleDoc<Server, ServerIncludes>;

/**
 * Filters: [tags]
 */
export type ServerQuery = QueryParams<keyof ServerIncludes, keyof ServerMeta>;

export { Telemetry, Stats };

export type Server = Resource<ServerMeta> & {
  hostname: string;
  creator: UserScope;
  hub_id: ResourceId;
  provider: ServerProvider;
  location_id: ResourceId;
  model_id: ResourceId;
  node_id: ResourceId | null;
  cluster: Cluster;
  features: Features;
  constraints: Constraints;
  state: State<ServerState>;
  events: Events & {
    provisioning: {
      started: Time;
      completed: Time;
    };
  };
};

export type ServerIncludes = Includes & {
  locations: Record<ResourceId, Locations.Location>;
  models: Record<ResourceId, ProviderServers.Server>;
  providers: Record<ResourceId, Provider>;
};

export type ServerMeta = {
  node?: NodeMetaStats;
  instances_count?: StatefulCounts<InstanceState>;
};

export type NodeMetaStats = {
  last_checkin: Time;
  state: State<ServerState>;
  stats: Stats;
  healthy: boolean;
  online: boolean;
};

export type Features = {
  sftp: boolean;
  base_volume_gb: Gigabytes | null;
};

export type ServerState =
  | "new"
  | "live"
  | "provisioning"
  | "offline"
  | "deleting"
  | "deleted";

export type ServerProvider = {
  identifier: ProviderIdentifier;
  model: string;
  location: string;
  server: string;
  init_ips?: string[];
  mac_addr?: string;
  extra?: object;
};

export type Constraints = {
  tags: string[];
  allow: ConstraintsAllow;
};

export type ConstraintsAllow = {
  /** Allow pooled containers? */
  pool: boolean;
  /** Allow services? */
  services: boolean;
  /** Allow 2x overcommit? */
  overcommit: boolean;
};

type BaseCollectionParams = StandardParams<ServerQuery>;
type BaseSingleDocParams = StandardParams<ServerQuery> & {
  id: ResourceId;
};

type GetCollectionParams = BaseCollectionParams;
export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.infrastructure().servers().collection(),
  });
}

type GetSingleParams = BaseSingleDocParams;
export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.infrastructure().servers().single(params.id),
  });
}

type GetTagParams = StandardParams;
export async function getTags(params: GetTagParams) {
  return Request.getRequest<{ data: string[] }>({
    ...params,
    target: links.infrastructure().servers().tags(),
  });
}

type GetClusterParams = StandardParams;
export async function getClusters(params: GetClusterParams) {
  return Request.getRequest<{ data: string[] }>({
    ...params,
    target: links.infrastructure().servers().clusters(),
  });
}

/**
 * @param provider "equinix-metal" | "vultr" | "aws"
 * @param model_id of the desired server
 * @param location_id location of the desired server
 * @param quantity number of desired servers
 * @param hostnames must have equal number of hostnames as quantity
 */
export type ServerCreate = {
  provider: ProviderIdentifier;
  model_id: string;
  location_id: string;
  /** number of desired servers of this model id at location_id */
  quantity: number;
  /** must have equal number of hostnames as quantity */
  hostnames?: string[];
};

export type CreateParams = {
  servers: ServerCreate[];
  cluster: Cluster;
};

/**
 * @param advanced an array of provision options
 * @param provider "equinix-metal" | "vultr" | "aws"
 * @param model_id of the desired server
 * @param location_id location of the desired server
 * @param quantity number of desired servers
 * @param hostnames must have equal number of hostnames as quantity
 */
export type AdvancedServerCreate = {
  advanced: Advanced[];
} & ServerCreate;

export type Advanced = {
  provision_options?: ProvisionOptions;
};

/**
 * @param aws_ebs_size an int in GB
 * @param reservation_id string
 */
export type ProvisionOptions = {
  aws_ebs_size?: number;
  reservation_id?: string;
};

type StandardCreateParams = BaseCollectionParams & { value: CreateParams };
export async function create(params: StandardCreateParams) {
  return Request.postRequest<CreatedTask<any>>({
    ...params,
    target: links.infrastructure().servers().collection(),
  });
}

type AdvancedCreateParams = BaseCollectionParams & {
  value: AdvancedServerCreate;
};
/**
 * Advanced server create allows you to specify reservation ids or if deploying to AWS
 * allows you to specify EBS volume size under the advanced object
 *
 * @see AdvancedServerCreate struct <br/>
 *
 * Example:
 * ```ts
 * servers: [
 *  {
 *    provider: "aws",
 *    model_id: "<resource_id>",
 *    location_id: "<resource_id>",
 *    quantity: 2,
 *    advanced: [
 *      {
 *        provision_options: {
 *          aws_ebs_size: 90,
 *          reservation_id: "<resource_id>",
 *        }
 *      }
 *    ]
 *  }
 * ],
 * cluster: "advanced"
 * ```
 */
export async function advancedCreate(params: AdvancedCreateParams) {
  return Request.postRequest<CreatedTask<any>>({
    ...params,
    target: links.infrastructure().servers().collection(),
  });
}

export interface UpdateParams {
  constraints: Constraints;
}

type UpdateServerParams = BaseSingleDocParams & { value: UpdateParams };
export async function update(params: UpdateServerParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.infrastructure().servers().single(params.id),
  });
}

type RemoveServerParams = BaseSingleDocParams;
export async function remove(params: RemoveServerParams) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.infrastructure().servers().single(params.id),
  });
}
