import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
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
} from "../../common/structs";
import { ContainerState, Instances, ContainerSummary } from "../containers";
import { IPNet, Kind, IPState } from "../network";
import { DiscoveryService, VPNService } from "./services";
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
  about: {
    description: string;
  };
  owner: OwnerScope;
  hub_id: ResourceId;
  state: State<EnvironmentState>;
  project: ProjectSummary | null;
  stack: StackSummary | null;
  events: Events;
  private_network: {
    vxlan_tag: number;
    subnet: number;
    ipv6: IPNet;
  } | null;
  services: Services;
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
  about: {
    description: string;
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
