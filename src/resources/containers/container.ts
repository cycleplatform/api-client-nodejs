import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import { Builds, Stack } from "../stacks";
import { Image } from "../images";
import { Zones } from "../dns";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State,
  Events,
  OwnerScope,
  OwnerInclude,
  StatefulCounts,
  ContainerIdentifier,
} from "../../common/structs";
import { Features } from "./features";
import { IPNet } from "../infrastructure/ips";
import { InstanceState } from "./instances";
import { Service } from "./services";
import { Config, Volumes } from "./config";
import { IP } from "../infrastructure/ips";
import { ContainerRole } from "../stacks/spec/v1/container";
import { Environment } from "../environments";

export type Collection = CollectionDoc<Container, ContainerIncludes>;
export type Single = SingleDoc<Container, ContainerIncludes>;
export type ContainerState =
  | "new"
  | "starting"
  | "running"
  | "stopping"
  | "stopped"
  | "deleting"
  | "deleted";
export type ContainerEvent = "started";
export type ContainerQuery = QueryParams<
  keyof ContainerIncludes,
  keyof ContainerMetas,
  "image" | "environment" | "state"
>;

export interface Container extends Resource<ContainerMetas> {
  name: string;
  identifier: ContainerIdentifier;
  owner: OwnerScope;
  environment: EnvironmentSummary;
  hub_id: ResourceId;
  image: ImageSummary;
  stack?: StackSummary;
  features: Features;
  config: Config;
  instances: number;
  volumes?: VolumeSummary[];
  role: ContainerRole;
  stateful: boolean;
  state: State<ContainerState>;
  events: Events<ContainerEvent>;
}

export interface ContainerIncludes {
  owners?: OwnerInclude;
  images?: {
    [key: string]: Image;
  };
  stack_builds?: {
    [key: string]: Builds.Build;
  };
  stacks?: {
    [key: string]: Stack;
  };
  environments?: Record<ResourceId, Environment>;
}

export interface ContainerMetas {
  instance_counts?: StatefulCounts<InstanceState>;
  domain?: string;
  domains?: { fqdn: string; record: Zones.Records.Record | null };
  ips?: IP[];
}

export interface StackSummary {
  id: ResourceId;
  image: {
    id: ResourceId;
  };
  build_id: ResourceId;
  identifier: "db";
}

export interface ImageSummary {
  id?: ResourceId;
  service: Service | null;
}

export interface EnvironmentSummary {
  id: ResourceId;
  container_subnet: string;
  ipv6: IPNet | null;
  legacy: Legacy | null;
}

export interface Legacy {
  subnet: number;
  ipv4: IPNet | null;
}

export interface VolumeSummary {
  id: string;
  hash: string;
  config: Volumes.Volume;
}

export async function getCollection(params: StandardParams<ContainerQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.containers().collection(),
  });
}

export async function getSingle(
  params: StandardParams<ContainerQuery> & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.containers().single(params.id),
  });
}

export interface CreateParams {
  name: string;
  environment_id: ResourceId;
  image_id: ResourceId;
  stateful: boolean;
  config: Config;
  volumes: Volumes.Volume[];
}

export async function create(
  params: StandardParams<ContainerQuery> & { value: CreateParams },
) {
  return Request.postRequest<Single>({
    ...params,
    target: links.containers().collection(),
  });
}

export async function update(
  params: StandardParams<ContainerQuery> & {
    id: ResourceId;
    value: Pick<CreateParams, "name">;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.containers().single(params.id),
  });
}
