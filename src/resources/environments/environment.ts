import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State,
  Events,
  UserScope,
  StatefulCounts,
  UserIncludes,
  Cluster,
} from "../../common/structs";
import { ContainerState, Instances, Service } from "../containers";
import { IPNet } from "../infrastructure/ips";
import { LoadBalancerService, VPNService, DiscoveryService } from "./services";
import { Stack } from "../stacks";

export type Collection = CollectionDoc<Environment, EnvironmentIncludes>;
export type Single = SingleDoc<Environment, EnvironmentIncludes>;
export type EnvironmentState =
  | "new"
  | "live"
  | "cloning"
  | "deleting"
  | "deleted";
export type EnvironmentQuery = QueryParams<
  keyof EnvironmentIncludes,
  keyof EnvironmentMeta
>;

/**
 * An extended resource which includes information about an environment
 */
export interface Environment extends Resource<EnvironmentMeta> {
  /** The name of the environment */
  name: string;
  cluster: Cluster;
  /** Additional about information for an environment */
  about: About;
  creator: UserScope;
  hub_id: ResourceId;
  state: State<EnvironmentState>;
  events: Events;
  features: Features;
  services: Services;
  private_network: PrivateNetwork | null;
}

export interface About {
  /** An environment description */
  description: string;
  /** A boolean, where true represents the environment being set to favorite */
  favorite: boolean;
}

/** Information about a private network */
export interface PrivateNetwork {
  /** The vxlan tag added to each packet to help identify the network */
  vxlan_tag: number;
  /** The subnet ID associated with the network */
  subnet: string;
  ipv6: IPNet;
  legacy: Legacy | null;
}
/**
 * Legacy network information, including subnet and IP
 */

export interface Legacy {
  /** The subnet ID */
  subnet: number;
  ipv4: IPNet;
}

/** Environment features information */
export interface Features {
  /** A boolean, where true represents that legacy networking has been enabled */
  legacy_networking: boolean;
}

/** Information about the service containers of the environment */
export interface Services {
  discovery: DiscoveryService | null;
  vpn: VPNService | null;
  loadbalancer: LoadBalancerService | null;
}

export interface EnvironmentIncludes {
  creators: UserIncludes;
  stacks: Record<ResourceId, Stack>;
}

export interface EnvironmentMeta {
  containers_count?: StatefulCounts<ContainerState>;
  instances_count?: StatefulCounts<Instances.InstanceState>;
  containers?: {
    id: ResourceId;
    name: string;
    state: State<ContainerState> & {
      desired: ContainerState;
    };
    image: {
      id: ResourceId;
      service: Service | null;
    };
    environment: {
      id: ResourceId;
      cluster: string;
      container_subnet?: string;
      ipv6?: IPNet;
      legacy: Legacy | null;
    };
  }[];
}

/** Information for creating an environment */
export interface CreateParams {
  /** The name of the environment */
  name: string;
  cluster: Cluster;
  /** Extra optional about information  */
  about: {
    /** A description of the environment */
    description: string;
  };
  /** A list of enabled features for the environment */
  features: {
    /** A boolean, where true represents legacy networking will be enabled and each container can have a maximum of 255 instances */
    legacy_networking: boolean;
  };
  /** Stack information - if this environment will be used to deploy a stack */
  stack?: {
    id: ResourceId;
    build_id: ResourceId;
  };
}

export async function getCollection(params: StandardParams<EnvironmentQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.environments().collection(),
  });
}

export async function getSingle(
  params: StandardParams<EnvironmentQuery> & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.environments().single(params.id),
  });
}

export async function create(
  params: StandardParams<EnvironmentQuery> & {
    value: CreateParams;
  },
) {
  return Request.postRequest<Single>({
    ...params,
    target: links.environments().collection(),
  });
}

export async function update(
  params: StandardParams & {
    id: ResourceId;
    value: Partial<CreateParams>;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.environments().single(params.id),
  });
}
