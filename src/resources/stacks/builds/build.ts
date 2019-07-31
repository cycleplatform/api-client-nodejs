import { QueryParams, links, StandardParams, getRequest } from "common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State,
  OwnerScope,
  StatefulCounts,
  Time,
  StandardEvents,
} from "common/structs";
import { Spec } from "../spec";
import { ContainerState } from "resources/containers";

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
  owner: OwnerScope;
  source: Source;
  events: StandardEvents;
  state: State<BuildState>;
}

export interface Source {
  hook_id: ResourceId;
  repo: RepoVersion | null;
  spec: Spec | null;
}

export interface RepoVersion {
  url: string;
  tag: string;
  commit: GitCommit | null;
}

export interface GitCommit {
  id: string;
  message: string;
  timestamp: Time;
  url: string;
  author: {
    name: string;
    email: string;
  };
  added: string[];
  modified: string[];
  removed: string[];
}

export interface BuildMetas {
  container_counts: StatefulCounts<ContainerState>;
}

export async function getCollection(
  params: StandardParams<BuildsQuery> & {
    stackId: ResourceId;
  },
) {
  return getRequest<Collection>({
    ...params,
    target: links
      .stacks()
      .builds(params.stackId)
      .collection(),
  });
}

export async function getSingle(
  params: StandardParams<BuildsQuery> & {
    id: ResourceId;
    stackId: ResourceId;
  },
) {
  return getRequest<Single>({
    ...params,
    target: links
      .stacks()
      .builds(params.stackId)
      .single(params.id),
  });
}
