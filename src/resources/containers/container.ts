import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import { Spec, Builds, Stack } from "../stacks";
import { Image } from "../images";
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
} from "../../common/structs";
import { Features } from "./features";
import { IPNet } from "../network";
import { InstanceState } from "./instances";
import { Service } from "./services";
import { ContainerVolume } from "./volumes";

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
  keyof ContainerMetas
>;

export interface Container extends Resource<ContainerMetas> {
  name: string;
  identifier: Spec.ContainerIdentifier;
  owner: OwnerScope;
  environment: CondensedEnvironment;
  hub_id: ResourceId;
  image: CondensedImage;
  stack?: CondensedStack;
  features: Features;
  config: Spec.Config;
  instances: number;
  volumes?: ContainerVolume[];
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
}

export interface ContainerMetas {
  instance_counts?: StatefulCounts<InstanceState>;
  domain?: string;
}

export interface CondensedStack {
  id: ResourceId;
  image: {
    id: ResourceId;
  };
  build_id: ResourceId;
  identifier: "db";
}

export interface CondensedImage {
  id?: ResourceId;
  service: Service | null;
}

export interface CondensedEnvironment {
  id: ResourceId;
  container_subnet: string;
  ipv6: IPNet | null;
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
  config: Spec.Config;
  volumes: Spec.Volume[];
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
