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
  UserScope,
  UserIncludes,
  StatefulCounts,
  ContainerIdentifier,
} from "../../common/structs";
import { IPNet } from "../infrastructure/ips";
import { InstanceState } from "./instances";
import { Service } from "./services";
import { Config, Volumes } from "./config";
import { IP } from "../infrastructure/ips";
import { ContainerRole } from "../stacks/spec/v1/container";
import { Environment } from "../environments";

export type Collection = CollectionDoc<Container, ContainerIncludes>;
export type Single = SingleDoc<Container, ContainerIncludes>;

/**
 * Possible states the container can be in
 */
export type ContainerState =
  | "new"
  | "starting"
  | "running"
  | "stopping"
  | "stopped"
  | "reimaging"
  | "deleting"
  | "deleted";
/**
 * Possible container events
 */
export type ContainerEvent = "started";

// todo am i doing querys
export type ContainerQuery = QueryParams<
  keyof ContainerIncludes,
  keyof ContainerMetas,
  "image" | "environment" | "state"
>;
/**
 * Container resource information
 */
export interface Container extends Resource<ContainerMetas> {
  /** The name of the container */
  name: string;

  identifier: ContainerIdentifier;
  creator: UserScope;
  environment: EnvironmentSummary;
  hub_id: ResourceId;
  image: ImageSummary;
  stack?: StackSummary;
  config: Config;
  /** The number of instances of this container */

  instances: number;
  volumes?: VolumeSummary[];
  role: ContainerRole | null;
  /** A boolean where true represents the container is stateful */
  stateful: boolean;
  // todo
  requirements?: string[];
  /** Annotation notes for this contianer */
  annotations: Record<string, any> | null;
  /** A boolean where true means the container is marked deprecated */
  deprecate?: boolean;
  state: State<ContainerState> & {
    desired: ContainerState | "";
  };
  events: Events<ContainerEvent>;
}

export type NewContainer = {
  name: string;
  environment_id: ResourceId;
  image_id: ResourceId;
  stateful: boolean;
  annotations: Record<string, any> | null;
  config: Config;
  volumes?: VolumeSummary[];
};

export interface ContainerIncludes {
  creators?: UserIncludes;
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

// todo am i doing metas
export interface ContainerMetas {
  instance_counts?: StatefulCounts<InstanceState>;
  domain?: string;
  domains?: { fqdn: string; record: Zones.Records.Record | null }[];
  ips?: IP[];
}

/**
 * Information about the stack
 */
export interface StackSummary {
  id: ResourceId;
  // todo not sure what this is
  image: {
    id: ResourceId;
  };
  build_id: ResourceId;
  identifier: string;
}
/**
 * Information about the image used for the container
 */
export interface ImageSummary {
  id?: ResourceId;
  service: Service | null;
}

/** Information about the environment this container is deployed to  */
export interface EnvironmentSummary {
  id: ResourceId;
  /** The cluster this environment has access to resources from */
  cluster: string;
  /** The subnet used for this container */
  container_subnet: string | null;
  ipv6: IPNet | null;
  legacy: Legacy | null;
}

/**
 * Legacy networking informaiton
 */
export interface Legacy {
  subnet: number;
  ipv4: IPNet | null;
}

/**
 * A summary of information about a volume
 */
export interface VolumeSummary {
  // todo - why isnt this resource ID
  id: string;
  // todo - what is this
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
  annotations?: Record<string, any>;
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
    value: Pick<CreateParams, "name" | "annotations">;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.containers().single(params.id),
  });
}
