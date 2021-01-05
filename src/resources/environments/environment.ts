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

export interface Environment extends Resource<EnvironmentMeta> {
  name: string;
  cluster: Cluster;
  about: {
    description: string;
    favorite: boolean;
  };
  creator: UserScope;
  hub_id: ResourceId;
  state: State<EnvironmentState>;
  events: Events;
  features: Features;
  stack: StackSummary | null;
  services: Services;
  private_network: PrivateNetwork | null;
}

export type NewEnvironment = {
  name: string;
  about: About;
  cluster: Cluster;
  stack: StackSummary | null;
  features: Features;
};

type About = {
  description: string;
  favorite: boolean;
};

export interface PrivateNetwork {
  vxlan_tag: number;
  subnet: string;
  ipv6: IPNet;
  legacy: Legacy | null;
}

export interface Legacy {
  subnet: number;
  ipv4: IPNet;
}

export interface Features {
  legacy_networking: boolean;
}

export interface StackSummary {
  id: ResourceId;
  build_id: ResourceId;
}

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
      container_subnet?: string;
      ipv6?: IPNet;
      legacy: Legacy | null;
    };
  }[];
}

export interface CreateParams {
  name: string;
  cluster: Cluster;
  about: {
    description: string;
  };
  features: {
    // IPv4 Support - limits the number of containers that can be deployed
    legacy_networking: boolean;
  };
  stack?: {
    /** The id of the stack you want to apply to this environment (if any) */
    id: ResourceId;
    /** The id of the build you want to apply to this environment (if any) */
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
