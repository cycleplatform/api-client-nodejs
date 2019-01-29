import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
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

export type Collection = CollectionDoc<Container, {}, ContainerIncludes>;
export type Single = SingleDoc<Container, {}, ContainerIncludes>;
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
  project_id: ResourceId;
  image: CondensedImage;
  load_balancer: LoadBalancer | null;
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

export interface LoadBalancer {
  container_id: ResourceId;
}

export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: ContainerQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links.containers().collection(),
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
  query?: ContainerQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Single>({
    query,
    token,
    settings,
    target: links.containers().single(id),
  });
}

export interface CreateParams {
  name: string;
  environment_id: ResourceId;
  image_id: ResourceId;
  config: Spec.Config;
  volumes: Spec.Volume[];
}

export async function create({
  value,
  token,
  query,
  settings,
}: {
  value: CreateParams;
  token: Token;
  query?: ContainerQuery;
  settings?: Settings;
}) {
  return Request.postRequest<Single>({
    value,
    query,
    token,
    settings,
    target: links.containers().collection(),
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
  value: Pick<CreateParams, "name">;
  token: Token;
  query?: ContainerQuery;
  settings?: Settings;
}) {
  return Request.patchRequest<Single>({
    value,
    query,
    token,
    settings,
    target: links.containers().single(id),
  });
}
