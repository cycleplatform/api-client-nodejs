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
type GetSingleParams = BaseSingleDocParams;
type GetTagParams = StandardParams;
type GetClusterParams = StandardParams;
type StandardCreateParams = BaseCollectionParams & { value: CreateParams };
type AdvancedCreateParams = BaseCollectionParams & {
  value: AdvancedServerCreateValue;
};
type UpdateServerParams = BaseSingleDocParams & { value: UpdateParams };
interface RemoveServerParams extends BaseSingleDocParams {
  value?: RemoveServerValue;
}
export interface UpdateParams {
  constraints: Constraints;
}

export interface ServerCreate {
  /** "equinix-metal" | "vultr" | "aws" */
  provider: ProviderIdentifier;
  /** id of the desired server */
  model_id: string;
  /** location id of the desired server */
  location_id: string;
  /** number of desired servers of this `model_id` at `location_id` */
  quantity: number;
  /** must have equal number of hostnames as quantity */
  hostnames?: string[];
}

export interface CreateParams {
  servers: ServerCreate[];
  cluster: Cluster;
}

export interface AdvancedServerCreateValue {
  servers: AdvancedServerCreate[];
  cluster: Cluster;
}

export interface RemoveServerValue {
  force: boolean;
}

/** */
export interface AdvancedServerCreate extends ServerCreate {
  /** an array of provision options */
  advanced: Advanced[];
}

export interface Advanced {
  provision_options?: ProvisionOptions;
}

/** */
export interface ProvisionOptions {
  /** Specific to AWS. Refers the ebs size in GB as an int*/
  aws_ebs_size?: number;
  /** If the provider you deploying servers to have a reservation id */
  reservation_id?: string;
}

export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.infrastructure().servers().collection(),
  });
}

export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.infrastructure().servers().single(params.id),
  });
}

export async function getTags(params: GetTagParams) {
  return Request.getRequest<{ data: string[] }>({
    ...params,
    target: links.infrastructure().servers().tags(),
  });
}

export async function getClusters(params: GetClusterParams) {
  return Request.getRequest<{ data: string[] }>({
    ...params,
    target: links.infrastructure().servers().clusters(),
  });
}

export async function create(params: StandardCreateParams) {
  return Request.postRequest<CreatedTask<any>>({
    ...params,
    target: links.infrastructure().servers().collection(),
  });
}

/**
 * Advanced server create allows you to specify reservation ids or if deploying to AWS
 * allows you to specify EBS volume size under the advanced object
 *
 * @see AdvancedServerCreate struct <br/>
 *
 * @example
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

export async function update(params: UpdateServerParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.infrastructure().servers().single(params.id),
  });
}

export async function remove(params: RemoveServerParams) {
  return Request.deleteRequest({
    ...params,
    target: links.infrastructure().servers().single(params.id),
  });
}
