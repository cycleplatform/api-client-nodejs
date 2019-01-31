import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
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
  cloud_id: ResourceId;
  state: State<EnvironmentState>;
  pipeline: Pipeline | null;
  stack: Stack | null;
  events: Events;
  private_network: {
    vxlan_tag: number;
    subnet: number;
    ipv6: IPNet;
  } | null;
  services: Services;
}

export interface Pipeline {
  id: ResourceId;
  stage: string;
}

export interface Stack {
  id: ResourceId;
  build_id: ResourceId;
}

export interface Services {
  discovery: DiscoveryService | null;
  vpn: VPNService | null;
}

export interface EnvironmentIncludes {
  owners: OwnerInclude;
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

export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: EnvironmentQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links.environments().collection(),
  });
}

export async function getSingle({
  id,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  token: Token;
  query?: EnvironmentQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Single>({
    query,
    token,
    settings,
    target: links.environments().single(id),
  });
}

export async function create({
  value,
  token,
  query,
  settings,
}: {
  value: CreateParams;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.postRequest<Single>({
    value,
    query,
    token,
    settings,
    target: links.environments().collection(),
  });
}

export async function update({
  id,
  value,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  value: Partial<CreateParams>;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.patchRequest<Single>({
    value,
    query,
    token,
    settings,
    target: links.environments().single(id),
  });
}
