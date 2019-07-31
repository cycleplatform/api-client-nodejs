import {
  QueryParams,
  links,
  StandardParams,
  getRequest,
  postRequest,
  patchRequest,
} from "common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State,
  Events,
  OwnerScope,
  StatefulCounts,
  OwnerInclude,
  IP,
  Cluster,
} from "common/structs";
import {
  ContainerState,
  Instances,
  ContainerSummary,
} from "resources/containers";
import { IPNet, Kind, IPState, FloatingIP } from "resources/infrastructure/ips";
import { LoadBalancerService, VPNService, DiscoveryService } from "./services";
import { Stack } from "resources/stacks";

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
  };
  owner: OwnerScope;
  hub_id: ResourceId;
  project: ProjectSummary | null;
  state: State<EnvironmentState>;
  events: Events;
  features: Features;
  stack: StackSummary | null;
  services: Services;
  private_network: PrivateNetwork | null;
}

export interface PrivateNetwork {
  vxlan_tag: number;
  subnet: number;
  ipv6: IPNet;
  legacy: Legacy | null;
}

export interface Legacy {
  subnet: number;
  ipv4: IPNet;
}

export interface Features {
  legacy_networking: boolean;
  floating_ips: FloatingIP[];
}

export interface ProjectSummary {
  id: ResourceId;
  tag: string;
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
  owners: OwnerInclude;
  stacks: Record<ResourceId, Stack>;
}

export interface EnvironmentMeta {
  counts?: {
    containers: StatefulCounts<ContainerState>;
    instances: StatefulCounts<Instances.InstanceState>;
  };
  containers?: ContainerSummary[];
  ips?: {
    kind: Kind;
    ip: IPNet;
    gateway: IP;
    netmask: IP;
    network: IP;
    state: State<IPState>;
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
  return getRequest<Collection>({
    ...params,
    target: links.environments().collection(),
  });
}

export async function getSingle(
  params: StandardParams<EnvironmentQuery> & {
    id: ResourceId;
  },
) {
  return getRequest<Single>({
    ...params,
    target: links.environments().single(params.id),
  });
}

export async function create(
  params: StandardParams<EnvironmentQuery> & {
    value: CreateParams;
  },
) {
  return postRequest<Single>({
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
  return patchRequest<Single>({
    ...params,
    target: links.environments().single(params.id),
  });
}
