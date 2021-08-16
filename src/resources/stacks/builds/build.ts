import * as Request from "../../../common/api/request";
import {
  QueryParams,
  links,
  StandardParams,
  OptionalPostParam,
} from "../../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State,
  StatefulCounts,
  Time,
  StandardEvents,
} from "../../../common/structs";
import { Spec } from "../spec";
import { ContainerState } from "../../containers";
import { Ref } from "../../images/origin";

export * from "./tasks/build";

export type Collection = CollectionDoc<Build>;
export type Single = SingleDoc<Build>;
export type BuildState =
  | "new"
  | "importing"
  | "building"
  | "verifying"
  | "saving"
  | "live"
  | "deploying"
  | "deleting"
  | "deleted";

export type BuildsQuery = QueryParams<string, keyof BuildMetas>;

export interface Build extends Resource<BuildMetas> {
  stack_id: ResourceId;
  hub_id: ResourceId;
  spec: Spec;
  about: About;
  instructions: Instructions;
  events: StandardEvents;
  state: State<BuildState>;
}

// Includes for builds do not have the build spec
export interface BuildInclude extends Resource<BuildMetas> {
  stack_id: ResourceId;
  hub_id: ResourceId;
  about: About;
  instructions: Instructions;
  events: StandardEvents;
  state: State<BuildState>;
}


export interface About {
  version: string;
  description: string;
  git_commit?: GitCommit;
}

export interface Source {
  repo: RepoVersion | null;
  spec: Spec;
}

export interface RepoVersion {
  url: string;
  tag: string;
  commit: GitCommit | null;
}

export interface GitCommit {
  hash: string;
  message: string;
  time: Time;
  author: GitCommitAuthor;
}

export interface GitCommitAuthor {
  name: string;
  email: string;
}

export interface Instructions {
  /**
   * @see /resources/images/origin.ts for the Ref interface
   */
  git?: Ref;
}

export interface BuildMetas {
  containers_count: StatefulCounts<ContainerState>;
}

export async function getCollection(
  params: StandardParams<BuildsQuery> & {
    stackId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.stacks().builds(params.stackId).collection(),
  });
}

/**
 * If a stack id is not know it can be omitted, however this behavior is not
 * recommended unless absolutely necessary.
 */
export async function getSingle(
  params: StandardParams<BuildsQuery> & {
    id: ResourceId;
    stackId?: ResourceId;
  },
) {
  if (!params.stackId) {
    return Request.getRequest<Single>({
      ...params,
      target: links.stacks().buildLookup(params.id),
    });
  } else {
    return Request.getRequest<Single>({
      ...params,
      target: links.stacks().builds(params.stackId).single(params.id),
    });
  }
}

export interface CreateParams {
  instructions?: Instructions;
  about?: About;
}

export async function create(
  params: OptionalPostParam<CreateParams> & {
    stackId: ResourceId;
  },
) {
  return Request.postRequest<Single>({
    ...params,
    target: links.stacks().builds(params.stackId).collection(),
  });
}
